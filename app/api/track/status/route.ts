/**
 * Diagnostica tracking: verifica che API, variabili d'ambiente e DB siano ok.
 * Apri nel browser: https://tuosito.com/api/track/status
 * Non espone password né dati sensibili.
 */

import { NextResponse } from 'next/server';
import { getDB, getDbConfig, getProjectId } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const ENV_KEYS = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_CHARSET', 'PROJECT_ID'] as const;

/** Restituisce quali chiavi env sono presenti (solo nomi, nessun valore esposto) */
function getEnvKeysPresent(): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  for (const key of ENV_KEYS) {
    const v = process.env[key];
    out[key] = v !== undefined && v !== '';
  }
  return out;
}

/** Elenca le chiavi in process.env che assomigliano a DB_ o PROJECT (per capire prefissi/nomi usati da Hostinger) */
function getRelevantEnvKeyNames(): string[] {
  const lower = (s: string) => s.toLowerCase();
  return Object.keys(process.env).filter((k) => {
    const l = lower(k);
    return l.includes('db_') || l.includes('database') || l.includes('project');
  }).sort();
}

export async function GET() {
  const envKeysPresent = getEnvKeysPresent();
  const relevantEnvKeyNames = getRelevantEnvKeyNames();

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

  let hint: string | undefined;
  if (!ok) {
    if (!hasDbConfig || !hasProjectId) {
      const missing = ENV_KEYS.filter((k) => !envKeysPresent[k]);
      hint = missing.length > 0
        ? `Chiavi mancanti in process.env: ${missing.join(', ')}. Nomi devono essere ESATTI (es. DB_PASSWORD non DB_PASS). Se in Hostinger le vedi tutte, probabilmente le variabili sono solo per il build: devono essere impostate per il processo che esegue "npm start" (runtime). Controlla anche se le chiavi hanno prefissi (es. vedi envKeyNamesConDB).`
        : "Le variabili ci sono ma hasDbConfig/hasProjectId sono false: controlla che i valori non siano vuoti e che PROJECT_ID sia un numero. Riavvia l'app Node dopo aver modificato.";
    } else if (dbError && (dbError.includes("'::1'") || dbError.includes('Access denied'))) {
      hint =
        "MySQL rifiuta la connessione (es. da ::1). Imposta DB_HOST=127.0.0.1 invece di localhost, poi riavvia l'app Node.";
    } else {
      hint =
        "Controlla DB_HOST, DB_USER, DB_PASSWORD, DB_NAME. Imposta DB_HOST=127.0.0.1 se usi localhost. Riavvia l'app dopo aver modificato le variabili.";
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
