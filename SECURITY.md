# Sicurezza – nuovo-sito (solo questa cartella su GitHub)

**Nessun PHP.** Tutto il backend è dentro questo progetto Next.js (API routes Node.js). La cartella `public_html` con il PHP non serve e può essere eliminata.

## Cosa non va mai su GitHub

- **File `.env` e `.env.local`** – Contengono credenziali DB e PROJECT_ID. Sono in `.gitignore`; non committarli mai.
- **Password, chiavi API, segreti** – Solo come variabili d’ambiente sul server (Hostinger / altro host).

## Come è gestita la sicurezza

### 1. Credenziali solo sul server

- **DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PROJECT_ID** sono letti solo nelle API (file in `app/api/` e `lib/db.ts`) con **`process.env`**.
- Il frontend React **non** legge mai il database né queste variabili: fa solo `fetch('/api/...')` verso il tuo stesso dominio.

### 2. Validazione e sanitizzazione lato server

- **`/api/contact`** e **`/api/callback`**: lunghezze max, formato email, trim, rimozione caratteri pericolosi. Gli input vengono sanitizzati prima di essere scritti in DB.
- **`/api/track/*`**: campi limitati in lunghezza, tipi controllati, `project_id` preso da `process.env.PROJECT_ID` (non dal client).

### 3. Database

- Tutte le query usano **prepared statements** (parametri legati), niente concatenazione di stringhe con input utente, per evitare SQL injection.

### 4. Deploy (es. Hostinger)

- Dopo il deploy da GitHub imposti le **variabili d’ambiente** nella dashboard (DB_*, PROJECT_ID).
- Il codice non contiene segreti: legge tutto da `process.env` a runtime.

## Riepilogo API (tutto in questo repo)

| Endpoint | Sostituisce (PHP) | Uso |
|----------|--------------------|-----|
| `POST /api/track/statistics` | track_statistics.php | Statistiche visite |
| `POST /api/track/visitor` | track_visitor.php | Utenti online |
| `POST /api/track/event` | track_event.php | Eventi / click |
| `POST /api/contact` | save_contact.php | Form contatti |
| `POST /api/callback` | save_callback.php | Richieste callback (tel/email) |

Nessuno di questi richiede PHP: tutto è gestito dalle API Next.js in modo sicuro.
