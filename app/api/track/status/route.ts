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

  let hint: string | undefined;
  if (!ok) {
    if (!hasDbConfig || !hasProjectId) {
      hint =
        "Le variabili d'ambiente non arrivano all'app Node. Su Hostinger: apri la sezione Node.js (o Application Manager), seleziona la tua app, cerca 'Environment variables' / 'Variabili d'ambiente' e aggiungi DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PROJECT_ID con i valori corretti. Salva e RIAVVIA l'applicazione Node (restart). Le variabili devono essere impostate per l'esecuzione (runtime), non solo per il build.";
    } else if (dbError && (dbError.includes("'::1'") || dbError.includes('Access denied'))) {
      hint =
        "MySQL rifiuta la connessione (es. da ::1). Imposta DB_HOST=127.0.0.1 invece di localhost, poi riavvia l'app Node.";
    } else {
      hint =
        "Controlla DB_HOST, DB_USER, DB_PASSWORD, DB_NAME (e che l'app Node possa raggiungere MySQL). Imposta DB_HOST=127.0.0.1 se usi localhost. Riavvia l'app dopo aver modificato le variabili.";
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
    },
    { status: ok ? 200 : 503 }
  );
}
