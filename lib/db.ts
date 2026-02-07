/**
 * Connessione al database - SOLO lato server (API routes).
 * Legge le variabili d'ambiente; non committare mai .env su GitHub.
 * Su Hostinger imposti: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME (e opzionale DB_CHARSET, PROJECT_ID).
 */

import mysql from 'mysql2/promise';

function getEnv(name: string): string | undefined {
  return process.env[name];
}

export function getDbConfig(): {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  charset: string;
} {
  const host = getEnv('DB_HOST') ?? 'localhost';
  const portRaw = getEnv('DB_PORT');
  const port = portRaw ? parseInt(portRaw, 10) : 3306;
  const user = getEnv('DB_USER') ?? '';
  const password = getEnv('DB_PASSWORD') ?? '';
  const database = getEnv('DB_NAME') ?? '';
  const charset = getEnv('DB_CHARSET') ?? 'utf8mb4';
  return { host, port: Number.isNaN(port) ? 3306 : port, user, password, database, charset };
}

let pool: mysql.Pool | null = null;

export async function getDB(): Promise<mysql.Pool> {
  if (pool) return pool;
  const config = getDbConfig();
  pool = mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    charset: config.charset,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000,
  });
  return pool;
}

/** PROJECT_ID del progetto C.A.S.A (tabella projects). Usato solo dal backend. */
export function getProjectId(): number | null {
  const v = getEnv('PROJECT_ID');
  if (v === undefined || v === '') return null;
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? null : n;
}
