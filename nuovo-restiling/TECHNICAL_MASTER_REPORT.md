# TECHNICAL MASTER REPORT
**Progetto:** Casanziani.com (Restyling)
**Ruolo:** Chief Technical Architect

## A. Strategia "Static-First" (SEO & Performance)
L'architettura proposta segue rigorosamente il paradigma "Static-First". Dato l'esplicito requisito di **escludere la sezione Blog e le API di tracciamento**, il sistema massimizza le performance riducendo al minimo i colli di bottiglia causati dalle query al database.

* **TTFB (Time To First Byte) Inferiore a 100ms:** Senza query su database per il caricamento dei contenuti testuali e delle pagine, l'intero payload HTML viene generato e servito istantaneamente. Tutti i testi, inclusi i contenuti informativi e le FAQ, risiedono localmente all'interno dei componenti React.
* **Ottimizzazione Media:** Le immagini vengono processate in formati next-gen (WebP/AVIF) e servite direttamente dalla public directory del frontend.
* **Assenza di Tracking Esterno:** In conformità alle richieste, l'architettura omette qualsiasi API di tracciamento (es. assenza di script client-side invasivi), migliorando la compliance GDPR e riducendo ulteriormente il peso delle pagine per ottimizzare i Core Web Vitals.

## B. Architettura Frontend (React + Vite)
L'interfaccia utente è progettata per la massima reattività e modularità, con contenuti esclusivamente hardcoded o gestiti staticamente.

* **Component Hierarchy:**
  * `App`
    * `HeroSection` (Componente ad alto impatto visivo)
    * `ServicesOverview` (Componenti statici descrittivi)
    * `AboutSection`
    * `ContactForm` (Punto di contatto dinamico isolato)
    * `Footer`
* **Routing:** Architettura SPA con React Router configurata solo per le Landing e le sezioni istituzionali. Conformemente alla richiesta dell'utente, è stata rimossa ogni struttura di routing dedicata ad articoli o blog.
* **State Management:** Isolato localmente nei singoli componenti. React Hook Form e Yup vengono impiegati per la gestione dello stato del `ContactForm` e la validazione client-side prima dell'invio dei payload al backend.

## C. Backend Laravel (Logic Layer)
Il backend interviene esclusivamente come strato logico per transazioni e sicurezza.

* **Isolamento delle Responsabilità:** Nessuna renderizzazione di viste o somministrazione di contenuti testuali.
* **Sicurezza API:** Autenticazione basata su Laravel Sanctum per l'accesso protetto dell'amministratore (Admin Login per visualizzazione CRM Lead).
* **Flusso dei Contatti:**
  1. Ricezione POST `/api/v1/contact`.
  2. Validazione rigorosa e Rate Limiting (es. massimo 5 tentativi per minuto per IP).
  3. Sanitizzazione input per evitare XSS o SQL Injection.
  4. Inserimento record nella tabella `contacts`.
  5. **Strategia di Notifica:** Trigger asincrono (tramite jobs/queue per non bloccare la UI) per l'invio di notifiche push o email all'amministrazione all'arrivo di un nuovo lead.
