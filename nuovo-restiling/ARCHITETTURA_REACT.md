# ARCHITETTURA REACT E API (Security & Performance Audit)

Questo documento definisce l'architettura frontend React e l'integrazione sicura delle API, iper-ottimizzata per scalabilità e performance su infrastrutture Cloud (es. Hostinger).

## 1. Ottimizzazione API e Sicurezza
L'integrazione tra il frontend (React/Vite) e il backend (Laravel) segue standard di sicurezza Enterprise-level.

*   **Autenticazione SPA (Single Page Application):** L'utilizzo di JWT è **vietato** in quanto prono a vulnerabilità (XSS/CSRF). L'autenticazione del CRM (Admin) avviene esclusivamente tramite **Laravel Sanctum**, utilizzando cookie HttpOnly basati su sessione per proteggere i token da script malevoli.
*   **Gestione CSRF:** React è configurato per richiedere il cookie `XSRF-TOKEN` via endpoint `/sanctum/csrf-cookie` prima di ogni transazione di autenticazione, inviando automaticamente l'intestazione `X-XSRF-TOKEN` tramite Axios.
*   **Rate Limiting e Retry Logic:** 
    *   Tutte le chiamate all'endpoint `/api/v1/contact` dispongono di un limite configurato su Laravel (es. `ThrottleRequests: 5,1`).
    *   Nel frontend, Axios è esteso con un interceptor che gestisce gli errori 429 (Too Many Requests), mostrando un feedback utente pulito per prevenire il brute force del form.
*   **Sanitizzazione e Validazione:** Non ci si fida mai dell'input client. Tuttavia, il frontend usa `Yup` per prevenire payload non validi al server.

## 2. Performance Frontend (React + Vite)
Per abbattere il TTFB (Time To First Byte) e alleggerire il carico sul server Hostinger, il bundle JavaScript è ottimizzato ai massimi livelli.

*   **Code Splitting (Lazy Loading):** L'applicazione non viene caricata in un singolo blocco monolitico. Viene implementato `React.lazy()` combinato con `<Suspense>` per caricare in modo asincrono:
    *   Pannelli di amministrazione (CRM).
    *   Componenti pesanti al di sotto della piega della pagina (Below The Fold).
    *   Modali e componenti non immediatamente necessari al First Contentful Paint (FCP).
*   **Gestione della Cache Client-Side:**
    *   Uso strategico di **SWR** (o React Query) per le sezioni CRM, così da riutilizzare i dati in cache (Stale-While-Revalidate) evitando di interrogare il backend se non sono avvenute mutazioni.
    *   Il form "Contacts" non memorizza la cache ma disabilita esplicitamente gli stati di rinvio per evitare richieste POST duplicate.
*   **Assets e Pre-Fetching:** Direttive Vite per il prefetching dei chunk critici (`<link rel="prefetch">`) per azzerare il tempo di navigazione tra le pagine. Le immagini sono generate in WebP e caricate in lazy mode.
