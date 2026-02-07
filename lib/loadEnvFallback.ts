/**
 * Fallback: se le variabili DB_* e PROJECT_ID non sono in process.env (es. Hostinger
 * non le inietta a runtime), carica un file .env dalla root del progetto.
 * Il file va creato sul server a mano (o tramite deploy) e non va mai committato.
 *
 * Posizione: stessa cartella di package.json, nome file: .env
 * Esempio contenuto:
 *   DB_HOST=127.0.0.1
 *   DB_PORT=3306
 *   DB_NAME=u589701076_salute
 *   DB_USER=...
 *   DB_PASSWORD=...
 *   PROJECT_ID=6
 */

const ENV_KEYS = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_CHARSET', 'PROJECT_ID'];

function needsFallback(): boolean {
  if (typeof process === 'undefined' || !process.env) return false;
  return !process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME;
}

function loadEnvFile(): void {
  try {
    const fs = require('fs');
    const path = require('path');
    const cwd = process.cwd();
    const envPath = path.join(cwd, '.env');
    if (!fs.existsSync(envPath)) return;
    const raw = fs.readFileSync(envPath, 'utf8');
    const lines = raw.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!ENV_KEYS.includes(key)) continue;
      if (process.env[key] === undefined || process.env[key] === '') {
        process.env[key] = value;
      }
    }
  } catch {
    // ignore: file non trovato o permessi
  }
}

if (needsFallback()) {
  loadEnvFile();
}
