# Hostinger: hasProjectId false e hasDbConfig false

Se **/api/track/status** restituisce `hasProjectId: false` e `hasDbConfig: false`, l'app Node **non sta ricevendo** le variabili d'ambiente a runtime.

## Cosa fare su Hostinger

1. Accedi all'**hPanel** (pannello di controllo Hostinger).
2. Apri la sezione **Node.js** (o **Application Manager** / **Applicazioni**).
3. Seleziona l'**applicazione Node.js** collegata al tuo dominio (es. casanziani.com).
4. Cerca la voce **"Environment variables"** / **"Variabili d'ambiente"** / **"Env"** (può essere in un tab "Settings", "Configurazione" o "Advanced").
5. Aggiungi **tutte** le variabili con **i nomi esatti**:
   - `DB_HOST` = `127.0.0.1`
   - `DB_PORT` = `3306`
   - `DB_NAME` = `u589701076_salute`
   - `DB_USER` = `u589701076_usersalute`
   - `DB_PASSWORD` = *(la password del database MySQL)*
   - `PROJECT_ID` = `6`
6. **Salva** le modifiche.
7. **Riavvia** (restart) l'applicazione Node. Senza riavvio le variabili nuove di solito non vengono lette.
8. Attendi 10–20 secondi e riprova: **https://casanziani.com/api/track/status**

## Nomi corretti

- Usa **DB_PASSWORD** (non `DB_PASS` come nel PHP).
- I nomi devono essere **esattamente** quelli sopra (maiuscolo/minuscolo).

## Se non trovi "Environment variables"

Nella documentazione Hostinger cerca "Node.js environment variables" o "variabili d'ambiente applicazione Node". Su alcuni piani le variabili si impostano da "Advanced" o "Configurazione" dell'app Node. Se il deploy è fatto con GitHub, a volte le variabili si impostano nella sezione "Deploy" o "Build" dell'app collegata al repository.
