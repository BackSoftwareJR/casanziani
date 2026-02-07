/**
 * API tracking eventi click (sostituisce track_event.php).
 * Usa solo variabili d'ambiente: DB_*, PROJECT_ID. Il project_id viene preso dal server, non dal client.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDB, getProjectId } from '@/lib/db';

const RATE_LIMIT_MS = 2_000;
const VALID_EVENT_TYPES = [
  'phone_click', 'whatsapp_click', 'email_click',
  'form_submit', 'callback_request', 'contact_form', 'other',
] as const;
const VALID_DEVICES = ['desktop', 'tablet', 'mobile', 'unknown'] as const;

const sessionLastRequest = new Map<string, number>();

function getOrCreateSessionId(request: NextRequest): { sessionId: string; setCookie: boolean } {
  const cookieStore = cookies();
  const existing = cookieStore.get('track_sid')?.value;
  if (existing) return { sessionId: existing, setCookie: false };
  return { sessionId: crypto.randomUUID(), setCookie: true };
}

export async function POST(request: NextRequest) {
  const { sessionId, setCookie: needSetCookie } = getOrCreateSessionId(request);
  const now = Date.now();
  const last = sessionLastRequest.get(sessionId);
  if (last != null && now - last < RATE_LIMIT_MS) {
    return NextResponse.json(
      { error: 'Rate limit exceeded', retry_after: 2 },
      { status: 429 }
    );
  }
  sessionLastRequest.set(sessionId, now);

  let body: {
    project_id?: number | null;
    event_type?: string;
    event_value?: string | null;
    page_path?: string;
    referrer?: string | null;
    device_type?: string;
  } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const projectId = body.project_id ?? getProjectId();
  if (projectId == null || projectId <= 0) {
    return NextResponse.json({ success: false, error: 'project_id non valido' }, { status: 400 });
  }
  const eventType = (body.event_type ?? '').trim();
  if (!VALID_EVENT_TYPES.includes(eventType as (typeof VALID_EVENT_TYPES)[number])) {
    return NextResponse.json({ success: false, error: 'event_type non valido' }, { status: 400 });
  }
  const eventValue = body.event_value != null ? String(body.event_value).slice(0, 255) : null;
  const pagePath = (body.page_path ?? request.nextUrl?.pathname ?? '/').slice(0, 500);
  const referrer = body.referrer != null ? String(body.referrer).slice(0, 500) : null;
  const deviceType = VALID_DEVICES.includes((body.device_type as (typeof VALID_DEVICES)[number]) ?? 'unknown')
    ? (body.device_type as (typeof VALID_DEVICES)[number])
    : 'unknown';

  try {
    const pool = await getDB();
    const [rows] = await pool.query(
      'SELECT id FROM projects WHERE id = ? AND is_active = 1 LIMIT 1',
      [projectId]
    );
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Progetto non trovato o non attivo' }, { status: 400 });
    }

    const [tables] = await pool.query("SHOW TABLES LIKE 'statistics_events'");
    if (!Array.isArray(tables) || tables.length === 0) {
      return NextResponse.json({ success: false, error: 'Tabella statistics_events non trovata' }, { status: 500 });
    }

    const [result] = await pool.execute(
      `INSERT INTO statistics_events (
        project_id, session_id, event_type, event_value,
        page_path, referrer, device_type, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [projectId, sessionId, eventType, eventValue, pagePath, referrer, deviceType]
    );
    const insertResult = result as { insertId?: number };
    const eventId = insertResult.insertId ?? 0;

    const res = NextResponse.json({
      success: true,
      event_id: eventId,
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
    console.error('Track event error:', e);
    return NextResponse.json(
      { success: false, error: 'Database error', message: 'Errore nel salvataggio dell\'evento' },
      { status: 500 }
    );
  }
}
