# Deploy tracking PHP su Hostinger (configurazione sicura)

Hai pubblicato l’app Node tramite GitHub; i file PHP per il tracking non sono ancora sul server. Questa guida dice **cosa** caricare, **dove** e **come** metterli in sicurezza.

---

## 1. Dove mettere i file PHP su Hostinger

Su Hostinger, la cartella da cui vengono servite le pagine PHP è di solito la **document root** del dominio (es. **`public_html`**).

- **Pannello Hostinger** → **File** (File Manager) → apri la cartella del dominio (es. **`domains/casanziani.com/public_html`**).
- Se il dominio oggi punta **solo** all’app Node, può essere che non esista ancora `public_html` per quel dominio, o che il dominio sia associato solo al “Node.js application”. In quel caso:
  - **Opzione A:** Crea la cartella **`public_html`** (o il path che Hostinger indica come “root web” per il dominio) e metti lì **solo** i file sotto elencati. Poi, nel pannello dominio, assicurati che le richieste a `https://casanziani.com/*.php` vengano servite da PHP (es. documento root = quella cartella, o regole che inviano `*.php` a PHP).
  - **Opzione B:** Se il dominio è solo Node e non puoi usare la stessa root per PHP, crea un **sottodominio** (es. `track.casanziani.com`) che punti a una cartella con PHP e usa quello per il tracking (in quel caso serve anche impostare `NEXT_PUBLIC_TRACKING_BASE_URL` nel frontend – da fare a parte).

**In sintesi:** i file sotto vanno nella **stessa cartella** che il server usa come root per eseguire PHP per `https://casanziani.com/` (di solito `public_html`).  
Path tipico: **`/domains/casanziani.com/public_html/`** (o equivalente nel tuo account).

---

## 2. Cosa caricare (solo questi file)

Carica **solo** questi file dalla cartella **`public_html`** del repo (nessun altro file, nessun `.env` da git):

| File | Descrizione |
|------|-------------|
| **config.php** | Configurazione DB e progetto (legge solo da `.env`; nessuna password nel file). |
| **track_visitor.php** | Endpoint utenti online (heartbeat). |
| **track_statistics.php** | Endpoint statistiche visita. |
| **track_event.php** | Endpoint eventi (click telefono, WhatsApp, CTA, ecc.). |
| **.htaccess** | Regole Apache per proteggere `.env` e `config.php`. |

- **Non** caricare mai `.env` da repository: il file `.env` va **creato solo sul server** (vedi sotto).
- Non servono per il tracking: `index.php`, `galleria.php`, `save_contact.php`, JS, CSS, immagini, ecc.

---

## 3. File `.htaccess` (sicurezza)

Nella **stessa cartella** dei file PHP metti un file **`.htaccess`** con questo contenuto (blocca l’accesso web a `.env` e a `config.php`):

```apache
# Blocca accesso a .env (credenziali)
<FilesMatch "^\.env">
    Require all denied
</FilesMatch>

# Blocca accesso diretto a config.php (usato solo via include dagli script)
<Files "config.php">
    Require all denied
</Files>
```

Se il server usa sintassi “Order/Deny” invece di “Require”:

```apache
<FilesMatch "^\.env|^config\.php">
    Order allow,deny
    Deny from all
</FilesMatch>
```

Così:
- **`.env`** non è scaricabile da browser.
- **`config.php`** non è richiamabile direttamente; viene solo incluso da `track_*.php`.

---

## 4. Creare `.env` sul server (solo lì, mai da git)

Il file **`.env`** contiene le credenziali. Va **creato a mano sul server** e **non** deve essere in Git.

1. Nella **stessa cartella** dove hai messo `config.php` (es. `public_html`), crea un file chiamato esattamente **`.env`**.
2. Contenuto (sostituisci con i valori reali del tuo MySQL su Hostinger):

```ini
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=u589701076_salute
DB_USER=u589701076_usersalute
DB_PASS=la_tua_password_MySQL_reale
DB_CHARSET=utf8mb4
PROJECT_ID=6
```

- Su Hostinger usa **`DB_HOST=127.0.0.1`** (evita problemi con IPv6).
- **`DB_PASS`** (nel .env puoi usare anche `DB_PASSWORD`): stessa password che usi per MySQL nel pannello Hostinger.
- **`PROJECT_ID=6`**: ID del progetto C.A.S.A nel DB (tabella `projects`).

3. **Permessi (sicurezza):**
   - Imposta il file in modo che **solo** l’utente del server possa leggerlo:
     - **chmod 600** su `.env` (da SSH: `chmod 600 .env`).
   - Dal File Manager Hostinger, se possibile, imposta “Permission” del file `.env` a **600** (read+write solo proprietario).

Così solo PHP (eseguito dall’utente del server) può leggere `.env`; il web non può scaricarlo (e `.htaccess` nega l’accesso).

---

## 5. Riepilogo path e file sul server

Struttura obbligatoria (esempio con root `public_html`):

```
public_html/
├── .env              ← CREATO A MANO, chmod 600, mai da Git
├── .htaccess         ← caricato (protegge .env e config.php)
├── config.php        ← caricato
├── track_visitor.php ← caricato
├── track_statistics.php
└── track_event.php
```

Nessun altro file in quella cartella è necessario per il tracking.

---

## 6. Abilitare il tracking PHP nell’app Node

L’app Next.js deve sapere di usare gli endpoint PHP invece delle API Node.

1. Nella **configurazione dell’applicazione Node** su Hostinger (o nel tuo metodo di build), imposta la variabile d’ambiente **a build time**:
   - Nome: **`NEXT_PUBLIC_USE_PHP_TRACKING`**
   - Valore: **`1`**
2. Esegui di nuovo **build** e **deploy** (es. push su GitHub se il deploy è automatico).

Dopo il deploy, il frontend chiamerà:
- `https://casanziani.com/track_statistics.php`
- `https://casanziani.com/track_visitor.php`
- `https://casanziani.com/track_event.php`

Quindi il dominio deve servire questi path tramite PHP (stessa root dove hai messo i file).

---

## 7. Verifica

1. **PHP raggiungibili:** Apri in browser (o con curl):
   - `https://casanziani.com/track_statistics.php`  
   Con una POST (o anche GET) non dovresti ottenere 404; puoi ottenere 200 o 500 (es. se manca sessione/DB), ma **non** “pagina Node”.
2. **`.env` non scaricabile:** Apri `https://casanziani.com/.env` → deve rispondere **403 Forbidden** (o 404), mai il contenuto del file.
3. **Status tracking:** Apri `https://casanziani.com/api/track/status`. Con `NEXT_PUBLIC_USE_PHP_TRACKING=1` e build aggiornato dovresti vedere **200** e `"backend": "php"`.

---

## 8. Checklist sicurezza

- [ ] `.env` **solo** sul server, **mai** committato in Git.
- [ ] **chmod 600** su `.env`.
- [ ] **`.htaccess`** che nega l’accesso a `.env` e a `config.php`.
- [ ] In `config.php` **nessuna** password o credenziale hardcoded (nel repo è già così).
- [ ] Caricati **solo** i 5 file indicati (config, 3× track_*.php, .htaccess); niente altro dalla cartella PHP se non necessario.

Se segui questi passi, il tracking userà il backend PHP in modo sicuro e separato dall’app Node.
