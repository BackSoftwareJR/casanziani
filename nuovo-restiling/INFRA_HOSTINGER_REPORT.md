# INFRA HOSTINGER CLOUD REPORT

**A: Sviluppatori / DevOps**
**Da: Tech Lead & Security Auditor**

Questo documento elenca le direttive infrastrutturali rigorose da applicare durante il deploy sul Cloud Panel di Hostinger o ambiente VPS.

*   **PHP-FPM e Opcache:** 
    *   Assicurarsi che Opcache sia attivo e ottimizzato. Impostare `opcache.memory_consumption=256` e `opcache.max_accelerated_files=10000` per massimizzare la velocità di esecuzione del core Laravel.
    *   Modificare le risorse PHP-FPM: aumentare `pm.max_children` in base alla RAM disponibile per gestire picchi di traffico.
*   **Caching LiteSpeed / Nginx:**
    *   Se l'ambiente usa LiteSpeed, configurare il plugin LS Cache per intercettare il routing React e delegare a Vite la cache dei bundle JS/CSS.
    *   Impostare gli Header `Cache-Control: public, max-age=31536000, immutable` per tutti i file all'interno della cartella `dist/assets` di Vite.
*   **Gestione Code Asincrone (Redis):**
    *   **Cruciale:** Le email di notifica al ricevimento dei form non devono bloccare il thread PHP.
    *   Installare/Attivare **Redis** sul server Hostinger.
    *   Modificare il file `.env` di Laravel impostando `QUEUE_CONNECTION=redis`.
    *   Assicurarsi che Supervisor sia configurato per mantenere attivo il comando `php artisan queue:work --tries=3 --timeout=90`.
*   **Sicurezza Database & Directory:**
    *   Proteggere la cartella root bloccando l'accesso diretto ai file `.env` e ai `.git`.
    *   Il server MySQL/MariaDB deve accettare solo connessioni da localhost (`bind-address = 127.0.0.1`).
*   **Certificati SSL / TLS:**
    *   Forzare l'HSTS (HTTP Strict Transport Security) aggiungendo l'header nel file di configurazione server.
    *   Forzare tutti i re-indirizzamenti su HTTPS (niente chiamate miste che bloccherebbero Sanctum o i cookie secure).
