# Tracking via PHP (alternativa a Node/DB)

Se su Hostinger le variabili d'ambiente **non arrivano** al processo Node (o vuoi ridurre carico/memoria), puoi usare il **backend PHP** già presente in `public_html` per il tracking. Stesso database, stesse tabelle.

## Cosa fare

1. **Variabile a build time**  
   Imposta **`NEXT_PUBLIC_USE_PHP_TRACKING=1`** prima del build (o nella dashboard Hostinger come variabile di build). Poi rifai il build e il deploy.

2. **Rendere raggiungibili i file PHP**  
   Il frontend chiamerà:
   - `https://tuodominio.com/track_statistics.php`
   - `https://tuodominio.com/track_visitor.php`
   - `https://tuodominio.com/track_event.php`  

   Questi file devono essere nella root web **servita da PHP** (es. la stessa `public_html` dove hai già `config.php` e il vecchio sito).  
   - Se il dominio punta ancora alla cartella con i PHP (es. `public_html`), va bene: le richieste a `/track_*.php` verranno eseguite da PHP.  
   - Se il dominio punta **solo** all’app Node (e i PHP non sono più raggiungibili), devi configurare il server in modo che le richieste a `/track_*.php` vengano gestite da PHP (es. regola sul reverse proxy o path separato che punta a `public_html`).

3. **Config PHP**  
   In `public_html` devono esserci `config.php` e il file `.env` (o le costanti) con DB e `PROJECT_ID=6`. I tre script PHP usano già quella config.

4. **Verifica**  
   Dopo il deploy, apri `https://tuodominio.com/api/track/status`: con `NEXT_PUBLIC_USE_PHP_TRACKING=1` la risposta sarà **200** con `backend: 'php'` e non verrà usato il DB da Node per il tracking.

## Vantaggi

- Nessuna variabile d’ambiente DB richiesta sul processo Node.
- Nessuna connessione MySQL da Next.js per il tracking (meno memoria e meno punti di errore).
- Stesso database e stesse tabelle (`statistics_visits`, `online_users`, `statistics_events`).

## File modificati (PHP)

- `track_event.php`: legge `project_id` da config se non arriva nel body; accetta anche gli eventi `cta_click` e `nav_click`.
- `track_statistics.php`: legge `project_id` da config se non arriva nel body; salva `page_title` se inviato dal client.
