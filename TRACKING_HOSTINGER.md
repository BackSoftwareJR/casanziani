# Tracking su Hostinger – verifica e risoluzione problemi

Se dopo il deploy su Hostinger **non si registrano** visite, utenti online o click (WhatsApp, telefono, email), segui questi passi.

---

## 1. L’app deve girare come **Node.js**, non come sito statico

Le API di tracking (`/api/track/statistics`, `/api/track/visitor`, `/api/track/event`) **esistono solo se l’app Next.js è in esecuzione con Node.js**.

- **Sito statico** (solo file HTML/JS/CSS): le richieste a `/api/...` danno **404** e il tracking non funziona.
- **App Node.js** (`npm run build` + `npm run start`, o equivalente su Hostinger): le API rispondono e il tracking può funzionare.

Su Hostinger, nella sezione **Node.js** (o “Applicazioni”):

- Deve essere abilitata un’**applicazione Node.js** per il tuo dominio/sottodominio.
- Il **punto di ingresso** deve essere il server Next (es. `npm run start` dopo `npm run build`, o lo script che avvia Next).
- **Non** usare solo “Deploy da GitHub” come **sito statico** (solo upload della cartella `out` o `build` senza avviare Node).

Se non sei sicuro, passa allo step 2: se l’endpoint di diagnostica non risponde, quasi certamente l’app non sta girando come Node.

---

## 2. Controlla che le API rispondano

Apri nel browser (sostituisci con il tuo dominio):

**https://casanziani.com/api/track/status**

- **Se vedi 404**  
  Le API non esistono: l’app non è in esecuzione come Node.js. Torna allo step 1 e configura l’app Node su Hostinger.

- **Se la pagina si carica e vedi un JSON**  
  Le API ci sono. Leggi il contenuto (vedi sotto).

---

## 3. Interpretare la risposta di `/api/track/status`

Esempio di risposta **tutto ok**:

```json
{
  "ok": true,
  "api": true,
  "hasProjectId": true,
  "hasDbConfig": true,
  "dbReachable": true
}
```

- **`ok: true`** → configurazione e DB ok, il tracking può funzionare.
- **`ok: false`** → qualcosa manca o non funziona; usa gli altri campi per capire.

Cosa controllare:

| Campo           | Significato |
|----------------|-------------|
| `hasProjectId` | Variabile `PROJECT_ID` impostata e valida (es. 6). |
| `hasDbConfig`   | Presenti `DB_HOST`, `DB_USER`, `DB_NAME` (e in pratica anche la password). |
| `dbReachable`  | L’app riesce a connettersi al database MySQL. |
| `dbError`      | Se la connessione fallisce, qui c’è il messaggio di errore (es. “Access denied”, “Unknown database”). |

Se **`dbReachable` è false** e c’è `dbError`:

- Controlla su Hostinger le **variabili d’ambiente** dell’**applicazione Node** (non solo del build):
  - `DB_HOST` (es. `localhost` o l’host MySQL indicato da Hostinger)
  - `DB_PORT` (se Hostinger lo richiede, es. `3306`)
  - `DB_USER`
  - `DB_PASSWORD`
  - `DB_NAME`
  - `PROJECT_ID` (es. `6`)
- Su Hostinger il MySQL ha spesso un host tipo `localhost` o un host dedicato; usa quello indicato nel pannello database.
- Se il DB è su un altro server, verifica che l’hosting Node possa raggiungerlo (firewall, whitelist IP se previste).

---

## 4. Verifica che il frontend chiami le API (Network)

1. Apri il sito (es. https://casanziani.com).
2. Apri **DevTools** (F12) → scheda **Rete / Network**.
3. Ricarica la pagina e filtra per “track” o “api”.
4. Dovresti vedere richieste tipo:
   - `POST .../api/track/statistics`
   - `POST .../api/track/visitor`
   - E, quando clicchi su telefono/WhatsApp/email: `POST .../api/track/event`

Se queste richieste:

- **Non compaiono**  
  Il frontend non sta chiamando le API (problema di build/cache o di blocco script).
- **Compaiono ma in rosso (404)**  
  Le API non esistono: l’app non gira come Node (step 1).
- **Compaiono ma 500**  
  Errore lato server (es. DB non raggiungibile, variabili mancanti): usa di nuovo `/api/track/status` e `dbError` per capire.

---

## 5. Tracciare tutte le pagine (blog, galleria, mappa)

Il tracking è già attivo su **tutte le pagine** perché è incluso nel **layout radice** (`app/layout.tsx`) tramite `TrackingProvider`. Quindi:

- Home, blog, galleria, dove-siamo (mappa), ecc. usano tutte le stesse API.
- Ogni cambio pagina (navigazione lato client) invia una nuova visita a `/api/track/statistics` con il `path` corretto (es. `/blog`, `/galleria`, `/dove-siamo`).

Non serve configurare nulla di diverso per singola pagina: basta che le API rispondano e che le variabili d’ambiente (incluso `PROJECT_ID`) siano impostate per l’**ambiente di esecuzione Node** su Hostinger.

---

## Riepilogo checklist

- [ ] Su Hostinger è configurata un’**applicazione Node.js** che avvia Next (es. `npm run start` dopo il build).
- [ ] **Variabili d’ambiente** impostate per l’app in **esecuzione** (non solo per il build): `DB_HOST`, `DB_PORT` (se serve), `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PROJECT_ID`.
- [ ] **https://tuodominio.com/api/track/status** risponde con **200** e `"ok": true`, `"dbReachable": true`.
- [ ] In DevTools → Rete si vedono le richieste `POST` verso `/api/track/statistics` e `/api/track/visitor` (e `/api/track/event` quando clicchi su link/telefono/WhatsApp/email).

Se tutti i punti sono ok e ancora non vedi dati in DB, controlla che le tabelle (es. `statistics_visits`, `online_users`, `statistics_events`) esistano e che `PROJECT_ID` corrisponda a un progetto attivo nella tabella `projects`.
