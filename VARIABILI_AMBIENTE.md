# Variabili d'ambiente – cosa mettere su Hostinger

Queste sono le **stesse informazioni** che usava il PHP in `public_html` (file `.env` e `config.php`), adattate al nuovo sito Next.js.

---

## 1. PROJECT_ID (ID del progetto)

Nel PHP era impostato così:

- **Valore usato:** `6`
- **Significato:** è l’`id` del progetto "C.A.S.A - Casa Anziani Abbiategrasso" nella tabella **`projects`** del database.

Se non sei sicuro del valore corretto, nel database esegui:

```sql
SELECT id, name, slug FROM projects WHERE slug = 'casa-anziani-abbiategrasso';
```

Il numero nella colonna **`id`** è il **PROJECT_ID** da usare (nel tuo caso, dal PHP risulta **6**).

---

## 2. Variabili da impostare su Hostinger

Imposta queste variabili nell’app Node.js su Hostinger (stesso database del vecchio sito PHP):

| Variabile    | Cosa mettere | Esempio (dal PHP) |
|-------------|--------------|--------------------|
| **DB_HOST** | Host MySQL. **Su Hostinger usa `127.0.0.1`** invece di `localhost` per evitare "Access denied ... @'::1'" (IPv6). | `127.0.0.1` |
| **DB_PORT** | Porta MySQL (solo se Hostinger la richiede) | `3306` |
| **DB_NAME** | Nome del database | `u589701076_salute` |
| **DB_USER** | Utente MySQL | `u589701076_usersalute` |
| **DB_PASSWORD** | Password MySQL | *(la stessa che avevi nel .env PHP, dove c’era **DB_PASS**)* |
| **DB_CHARSET** | Charset (opzionale) | `utf8mb4` |
| **PROJECT_ID** | ID progetto C.A.S.A (numero, es. 6) | `6` |

**Nota:** nel PHP la password era in **DB_PASS**; nel nuovo sito la variabile si chiama **DB_PASSWORD**. Usa la **stessa password** che avevi nel `.env` del PHP, ma inseriscila nella variabile **DB_PASSWORD** su Hostinger.

---

## 3. Riepilogo veloce

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=u589701076_salute
DB_USER=u589701076_usersalute
DB_PASSWORD=<la_tua_password_MySQL>
DB_CHARSET=utf8mb4
PROJECT_ID=6
```

**Importante:** usa **DB_HOST=127.0.0.1** (non `localhost`). Su Hostinger con `localhost` il sistema usa IPv6 (`::1`) e MySQL spesso nega l’accesso con "Access denied for user ... @'::1'".

Sostituisci `<la_tua_password_MySQL>` con la password reale del database (quella che usavi nel file `.env` del PHP, in `DB_PASS`).

---

## 4. Come verificare

Dopo il deploy, apri:

**https://tuodominio.com/api/track/status**

Se tutto è configurato bene vedrai qualcosa tipo:

- `hasProjectId: true`
- `hasDbConfig: true`
- `dbReachable: true`
- `ok: true`

Se `dbReachable` è `false`, controlla host, user, password e nome database (e che l’app Node su Hostinger possa raggiungere il MySQL).

---

## 5. Fallback: file `.env` sul server

Se su Hostinger le variabili d'ambiente **non arrivano** al processo Node (es. sono solo per il build), l'app può leggere un file **`.env`** come fallback.

- **Dove metterlo:** nella **stessa cartella da cui parte l'app**. Se avvii con `npm start` dalla root del progetto (dove c'è `package.json`), metti `.env` lì. Se avvii da un'altra cartella (es. dopo un deploy in `.next/standalone`), metti `.env` in quella cartella (es. accanto a `server.js`).
- **Contenuto:** le stesse righe del riepilogo in sezione 3 (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_CHARSET, PROJECT_ID).
- **Sicurezza:** non committare mai `.env` (è in `.gitignore`). Sul server crealo a mano o tramite script di deploy.
- Il fallback viene usato **solo** se DB_HOST, DB_USER o DB_NAME non sono già in `process.env`; le variabili già impostate non vengono sovrascritte.
