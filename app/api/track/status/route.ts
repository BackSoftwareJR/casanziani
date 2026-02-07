/**
 * Diagnostica tracking: verifica che API, variabili d'ambiente e DB siano ok.
 * Apri nel browser: https://tuosito.com/api/track/status
 * Non espone password né dati sensibili.
 */

import { NextResponse } from 'next/server';
import { getDB, getDbConfig, getProjectId } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const projectId = getProjectId();
  const hasProjectId = projectId != null && projectId > 0;
  const config = getDbConfig();
  const hasDbConfig =
    Boolean(config.host && config.user && config.database);

  let dbReachable = false;
  let dbError: string | null = null;

  if (hasDbConfig) {
    try {
      const pool = await getDB();
      const [rows] = await pool.query('SELECT 1 as ok');
      dbReachable = Array.isArray(rows) && rows.length > 0;
    } catch (e) {
      dbError = e instanceof Error ? e.message : String(e);
    }
  }

  const ok = hasProjectId && hasDbConfig && dbReachable;

  return NextResponse.json(
    {
      ok,
      api: true,
      hasProjectId,
      hasDbConfig,
      dbReachable,
      dbError: dbError ?? undefined,
      hint: !ok
        ? 'Controlla le variabili d\'ambiente su Hostinger (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PROJECT_ID) e che l\'app sia in esecuzione come Node.js (non solo sito statico).'
        : undefined,
    },
    { status: ok ? 200 : 503 }
  );
}
