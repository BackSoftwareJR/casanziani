/**
 * Diagnostica tracking. Con NEXT_PUBLIC_TRACKING_API_URL risponde subito senza caricare il DB (meno memoria).
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const ENV_KEYS = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_CHARSET', 'PROJECT_ID'] as const;

function getEnvKeysPresent(): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  for (const key of ENV_KEYS) {
    const v = process.env[key];
    out[key] = v !== undefined && v !== '';
  }
  return out;
}

function getRelevantEnvKeyNames(): string[] {
  const lower = (s: string) => s.toLowerCase();
  return Object.keys(process.env).filter((k) => {
    const l = lower(k);
    return l.includes('db_') || l.includes('database') || l.includes('project');
  }).sort();
}

export async function GET() {
  const trackingApiUrl = process.env.NEXT_PUBLIC_TRACKING_API_URL?.replace(/\/$/, '') || '';
  const usePhpTracking =
    process.env.NEXT_PUBLIC_USE_PHP_TRACKING === '1' || process.env.NEXT_PUBLIC_USE_PHP_TRACKING === 'true';

  if (trackingApiUrl) {
    return NextResponse.json({
      ok: true,
      api: true,
      backend: 'external',
      trackingApiUrl,
      hasProjectId: true,
      hasDbConfig: true,
      dbReachable: true,
      message: 'Tracking gestito da ' + trackingApiUrl + '. Nessun DB richiesto da Node.',
    });
  }
  if (usePhpTracking) {
    return NextResponse.json({
      ok: true,
      api: true,
      backend: 'php',
      hasProjectId: true,
      hasDbConfig: true,
      dbReachable: true,
      message: 'Tracking gestito dai file PHP (stesso dominio). Nessun DB richiesto da Node.',
    });
  }

  const { getDB, getDbConfig, getProjectId } = await import('@/lib/db');
  const envKeysPresent = getEnvKeysPresent();
  const relevantEnvKeyNames = getRelevantEnvKeyNames();
  const projectId = getProjectId();
  const hasProjectId = projectId != null && projectId > 0;
  const config = getDbConfig();
  const hasDbConfig = Boolean(config.host && config.user && config.database);

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
  let hint: string | undefined;
  if (!ok) {
    if (!hasDbConfig || !hasProjectId) {
      const missing = ENV_KEYS.filter((k) => !envKeysPresent[k]);
      hint = missing.length > 0
        ? `Chiavi mancanti in process.env: ${missing.join(', ')}. Usa api.casanziani.com (NEXT_PUBLIC_TRACKING_API_URL) per non usare il DB su Node.`
        : "Variabili presenti ma hasDbConfig/hasProjectId false. Riavvia l'app Node.";
    } else if (dbError && (dbError.includes("'::1'") || dbError.includes('Access denied'))) {
      hint = "MySQL rifiuta la connessione. Imposta DB_HOST=127.0.0.1, poi riavvia.";
    } else {
      hint = "Controlla DB e variabili. Riavvia l'app.";
    }
  }

  return NextResponse.json(
    {
      ok,
      api: true,
      hasProjectId,
      hasDbConfig,
      dbReachable,
      dbError: dbError ?? undefined,
      hint,
      envKeysPresent,
      envKeyNamesConDB: relevantEnvKeyNames,
    },
    { status: ok ? 200 : 503 }
  );
}
