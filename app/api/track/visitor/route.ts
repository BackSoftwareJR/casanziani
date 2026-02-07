/**
 * API tracking visitatori online (sostituisce track_visitor.php).
 * Usa solo variabili d'ambiente lato server: DB_*, PROJECT_ID. Non esporre .env.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDB, getProjectId } from '@/lib/db';
import { anonymizeIp } from '@/lib/tracking-server';

const RATE_LIMIT_MS = 10_000;
const sessionLastRequest = new Map<string, number>();

function getOrCreateSessionId(request: NextRequest): { sessionId: string; setCookie: boolean } {
  const cookieStore = cookies();
  const existing = cookieStore.get('track_sid')?.value;
  if (existing) return { sessionId: existing, setCookie: false };
  const newId = crypto.randomUUID();
  return { sessionId: newId, setCookie: true };
}

export async function POST(request: NextRequest) {
  const { sessionId, setCookie: needSetCookie } = getOrCreateSessionId(request);
  const now = Date.now();
  const last = sessionLastRequest.get(sessionId);
  if (last != null && now - last < RATE_LIMIT_MS) {
    return NextResponse.json(
      { error: 'Rate limit exceeded', retry_after: 10 },
      { status: 429 }
    );
  }
  sessionLastRequest.set(sessionId, now);
  if (sessionLastRequest.size > 5000) {
    const cutoff = now - 60_000;
    for (const [k, v] of sessionLastRequest.entries()) {
      if (v < cutoff) sessionLastRequest.delete(k);
    }
  }

  let body: { page?: string; referrer?: string | null; project_id?: number | null } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const currentPage = (body.page ?? request.url ?? '/').slice(0, 255);
  const referrer = body.referrer != null ? String(body.referrer).slice(0, 255) : null;
  const projectId = body.project_id ?? getProjectId();

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? request.headers.get('x-real-ip')
    ?? '0.0.0.0';
  const userAgent = request.headers.get('user-agent') ?? 'Unknown';
  const ipAnon = anonymizeIp(ip);
  const ipHash = await hashSha256(ipAnon);
  const userAgentHash = await hashSha256(userAgent);

  try {
    const pool = await getDB();
    const [cols] = await pool.query(
      "SHOW COLUMNS FROM online_users LIKE 'project_id'"
    );
    const hasProjectId = Array.isArray(cols) && cols.length > 0;

    let inserted = false;
    if (hasProjectId && projectId != null && projectId > 0) {
      const [rows] = await pool.query(
        'SELECT id FROM projects WHERE id = ? AND is_active = 1 LIMIT 1',
        [projectId]
      );
      const ok = Array.isArray(rows) && rows.length > 0;
      if (ok) {
        await pool.execute(
          `INSERT INTO online_users (
            project_id, session_id, ip_address, ip_hash, user_agent_hash,
            current_page, referrer, first_seen, last_activity
          ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
          ON DUPLICATE KEY UPDATE
            project_id = VALUES(project_id), ip_address = VALUES(ip_address),
            ip_hash = VALUES(ip_hash), user_agent_hash = VALUES(user_agent_hash),
            current_page = VALUES(current_page), referrer = VALUES(referrer),
            last_activity = NOW()`,
          [projectId, sessionId, ip, ipHash, userAgentHash, currentPage, referrer]
        );
        inserted = true;
      }
    }

    if (!inserted) {
      await pool.execute(
        `INSERT INTO online_users (
          session_id, ip_address, ip_hash, user_agent_hash,
          current_page, referrer, first_seen, last_activity
        ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
        ON DUPLICATE KEY UPDATE
          ip_address = VALUES(ip_address), ip_hash = VALUES(ip_hash),
          user_agent_hash = VALUES(user_agent_hash), current_page = VALUES(current_page),
          referrer = VALUES(referrer), last_activity = NOW()`,
        [sessionId, ip, ipHash, userAgentHash, currentPage, referrer]
      );
    }

    if (Math.random() < 0.1) {
      await pool.execute(
        'DELETE FROM online_users WHERE last_activity < DATE_SUB(NOW(), INTERVAL 5 MINUTE)'
      );
    }

    const [countRows] = await pool.query(
      'SELECT COUNT(*) as count FROM online_users WHERE last_activity >= DATE_SUB(NOW(), INTERVAL 2 MINUTE)'
    );
    const count = Number(Array.isArray(countRows) && countRows[0] ? (countRows[0] as { count: number }).count : 0);

    const res = NextResponse.json({
      success: true,
      online_count: count,
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
    });
    if (needSetCookie) {
      res.cookies.set('track_sid', sessionId, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 365 * 24 * 60 * 60,
        path: '/',
      });
    }
    return res;
  } catch (e) {
    console.error('Track visitor error:', e);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Tracking temporarily unavailable' },
      { status: 500 }
    );
  }
}

async function hashSha256(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
