/**
 * Tracking statistiche. Con NEXT_PUBLIC_TRACKING_API_URL il tracking è su api.casanziani.com:
 * questa route risponde 410 e non carica mai il DB (meno memoria su Node).
 */

import { NextRequest, NextResponse } from 'next/server';

const TRACKING_API = process.env.NEXT_PUBLIC_TRACKING_API_URL?.replace(/\/$/, '') || '';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  if (TRACKING_API) {
    return NextResponse.json(
      { migrated: true, use: TRACKING_API + '/track/statistics.php' },
      { status: 410 }
    );
  }

  const { getDB, getProjectId } = await import('@/lib/db');
  const { detectDeviceType, detectBrowser, detectOS, isBot } = await import('@/lib/tracking-server');
  const { cookies } = await import('next/headers');

  const cookieStore = await cookies();
  const existing = cookieStore.get('track_sid')?.value;
  const sessionId = existing ?? crypto.randomUUID();
  const needSetCookie = !existing;

  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const pagePath = String(body.page ?? request.nextUrl?.pathname ?? '/').slice(0, 500);
  const referrer = body.referrer != null ? String(body.referrer).slice(0, 500) : null;
  const projectId = body.project_id != null ? Number(body.project_id) : getProjectId();
  const screenWidth = body.screen_width != null ? Number(body.screen_width) : null;
  const screenHeight = body.screen_height != null ? Number(body.screen_height) : null;
  const userAgent = request.headers.get('user-agent') ?? 'Unknown';

  const deviceType = detectDeviceType(userAgent);
  const browser = detectBrowser(userAgent);
  const os = detectOS(userAgent);
  const bot = isBot(userAgent);
  const visitDatetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const visitDate = visitDatetime.slice(0, 10);
  const visitTime = visitDatetime.slice(11);

  try {
    const pool = await getDB();
    const [tables] = await pool.query("SHOW TABLES LIKE 'statistics_visits'");
    if (!Array.isArray(tables) || tables.length === 0) {
      return NextResponse.json({ success: false, error: 'Table not found' }, { status: 500 });
    }

    let projectIdToUse: number | null = null;
    if (projectId != null && projectId > 0) {
      const [rows] = await pool.query(
        'SELECT id FROM projects WHERE id = ? AND is_active = 1 LIMIT 1',
        [projectId]
      );
      if (Array.isArray(rows) && rows.length > 0) projectIdToUse = projectId;
    }

    const [cols] = await pool.query("SHOW COLUMNS FROM statistics_visits LIKE 'project_id'");
    const hasProjectId = Array.isArray(cols) && cols.length > 0;

    if (hasProjectId && projectIdToUse != null) {
      await pool.execute(
        `INSERT INTO statistics_visits (
          project_id, session_id, page_path, page_title, referrer,
          device_type, browser, os, screen_width, screen_height,
          is_bot, visit_date, visit_time, visit_datetime
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          projectIdToUse, sessionId, pagePath, null, referrer,
          deviceType, browser, os, screenWidth, screenHeight,
          bot ? 1 : 0, visitDate, visitTime, visitDatetime,
        ]
      );
    } else {
      await pool.execute(
        `INSERT INTO statistics_visits (
          session_id, page_path, page_title, referrer,
          device_type, browser, os, screen_width, screen_height,
          is_bot, visit_date, visit_time, visit_datetime
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          sessionId, pagePath, null, referrer,
          deviceType, browser, os, screenWidth, screenHeight,
          bot ? 1 : 0, visitDate, visitTime, visitDatetime,
        ]
      );
    }

    const res = NextResponse.json({
      success: true,
      device_type: deviceType,
      timestamp: visitDatetime,
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
    console.error('Track statistics error:', e);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}
