# Tracking e variabili d’ambiente

Backend di tracking **dentro** il repo Next.js (API routes in Node.js). Stesso DB e stesse tabelle del vecchio sito PHP; niente PHP da deployare.

## Variabili d’ambiente (solo server)

**Non committare mai `.env` o `.env.local`.** Su Hostinger (o altro host) imposti le variabili nella dashboard; il codice le legge con `process.env` solo lato server.

| Variabile   | Obbligatoria | Descrizione |
|------------|--------------|-------------|
| `DB_HOST`  | Sì           | Host MySQL (es. `localhost`) |
| `DB_NAME`  | Sì           | Nome database |
| `DB_USER`  | Sì           | Utente MySQL |
| `DB_PASSWORD` | Sì        | Password MySQL |
| `DB_CHARSET`  | No (default utf8mb4) | Charset connessione |
| `PROJECT_ID`  | Sì (per tracking) | ID progetto C.A.S.A in tabella `projects` (es. `6`) |

### Come le usa il codice (backend Node.js)

Le API in `app/api/track/*` usano:

```ts
// lib/db.ts
const host = process.env.DB_HOST ?? 'localhost';
const user = process.env.DB_USER ?? '';
const password = process.env.DB_PASSWORD ?? '';
const database = process.env.DB_NAME ?? '';
// ...
const projectId = process.env.PROJECT_ID; // numero, es. 6
```

Il **frontend React** non vede queste variabili e non parla mai al DB: chiama solo le API Next.js (`/api/track/statistics`, `/api/track/visitor`, `/api/track/event`) via fetch sullo stesso dominio.

## Deploy da GitHub su Hostinger

1. Committi il repo **senza** `.env` / `.env.local` (sono in `.gitignore`).
2. Su Hostinger colleghi il repo e imposti le **variabili d’ambiente** nella sezione del progetto (es. “Environment variables” / “Env”).
3. Il build e il runtime leggono `process.env.DB_HOST`, `process.env.PROJECT_ID`, ecc. solo sul server.

## Cosa viene tracciato

- **Visite** → `POST /api/track/statistics` → tabella `statistics_visits`
- **Utenti online** (heartbeat) → `POST /api/track/visitor` → tabella `online_users`
- **Eventi** (click telefono/WhatsApp/email, form) → `POST /api/track/event` → tabella `statistics_events`

Il `PROJECT_ID` viene applicato solo nelle API (da `process.env.PROJECT_ID`), mai inviato dal browser.
