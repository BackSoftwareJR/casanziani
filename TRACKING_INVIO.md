# Come funziona l’invio del tracking e perché non arriva nulla

## Flusso (frontend leggero, niente API Node per il tracking)

1. **Build del sito (Next.js)**  
   Durante `npm run build`, Next legge **NEXT_PUBLIC_TRACKING_API_URL** e la “cuce” nel bundle JavaScript.  
   Se è impostata (es. `https://api.casanziani.com`), il client invierà **tutte** le richieste di tracking lì.

2. **In visita sul sito (casanziani.com)**  
   - **VisitorTracker** (in layout): alla prima pagina invia **statistiche**; poi ogni ~30 s invia **heartbeat** (visitor); al cambio tab o beforeunload invia di nuovo usando gli **stessi URL** (ora corretti anche in beforeunload).  
   - **EventTracker**: ai click su telefono/WhatsApp/email/CTA invia **eventi**.  
   - Gli URL usati sono **sempre** quelli restituiti da `getTrackingUrl('statistics' | 'visitor' | 'event')`, che a sua volta dipende da **NEXT_PUBLIC_TRACKING_API_URL** **al momento del build**.

3. **API (api.casanziani.com)**  
   Riceve le richieste su `/track/statistics.php`, `/track/visitor.php`, `/track/event.php`, le logga in `logs/incoming.log` e scrive nel DB.

## Perché “Nessuna richiesta ricevuta ancora”

Quasi sempre: **la variabile non è stata impostata (o non è disponibile) durante il build.**

- **NEXT_PUBLIC_*** viene letta **solo a build time** (quando esegui `next build`).  
- Se su Hostinger imposti le variabili solo per l’**esecuzione** (runtime) e non per il **build**, il bundle avrà base URL vuota e invierà a **casanziani.com/api/track/...** (che può dare 410/503 e non tocca api.casanziani.com).

Cosa fare:

1. Su Hostinger, nella sezione dell’app Node, cerca **“Environment variables” / “Variabili d’ambiente”** e verifica che ci sia una voce **per il build** (Build / Build settings), non solo per l’avvio.
2. Aggiungi: **NEXT_PUBLIC_TRACKING_API_URL** = **https://api.casanziani.com**
3. **Esegui di nuovo il build** (e il deploy). Senza un nuovo build dopo aver impostato la variabile, il vecchio bundle (senza base URL) resta in uso.

## Come verificare

1. Apri **https://casanziani.com/test**  
   - Nella sezione **“Invii tracking (dal bundle)”** vedi **Base URL:**  
     - Se vedi **https://api.casanziani.com** → il build è corretto; le richieste partono verso l’API.  
     - Se vedi **(stesso dominio – /api/track/…)** → il build **non** aveva la variabile; rifai build con NEXT_PUBLIC_TRACKING_API_URL impostata.
2. Con Base URL corretta, apri **casanziani.com**, naviga qualche pagina, poi controlla **https://api.casanziani.com/test.php** → sezione “Debug – Ultime richieste ricevute”: dovrebbero comparire le richieste.
3. In alternativa: su casanziani.com apri DevTools (F12) → scheda **Rete/Network**, filtra per “track” o “api” o “casanziani” e verifica che le richieste vadano a **api.casanziani.com/track/...**.

## Service Unavailable (es. su /galleria)

“The server is temporarily busy” di solito indica che il **processo Node** su Hostinger è sotto carico, in timeout o out of memory.  
Con il tracking spostato su api.casanziani.com, Node non usa più il DB per il tracking; se il problema resta, controlla i log dell’app su Hostinger e le risorse (memoria) dell’istanza. La pagina /galleria (immagini, Framer Motion) può essere più pesante; assicurati che il build abbia **NEXT_PUBLIC_TRACKING_API_URL** così da non aggiungere carico DB su Node.
