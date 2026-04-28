# Motion Design Report — Casanziani

Questo documento descrive le scelte logiche e tecniche effettuate per elevare l'esperienza visiva del progetto Casanziani, puntando a un feeling "Premium Apple-style" che trasmetta fiducia, modernità e cura del dettaglio.

## 1. Filosofia del Movimento
L'interfaccia è stata trasformata da un layout statico a un ambiente vivo e reattivo. Ogni animazione segue principi di fisica reale per evitare scatti o movimenti artificiali, garantendo che l'utente percepisca la qualità del brand attraverso la fluidità del tocco e dello scorrimento.

## 2. Logiche di Easing e Fisica
Abbiamo implementato un sistema di utility centralizzato (`motion-variants.ts`) che utilizza esclusivamente proprietà accelerate dalla GPU (`transform`, `opacity`) per mantenere i 60fps costanti.

- **Apple-Standard Easing:** Utilizziamo la curva `[0.23, 1, 0.32, 1]` per tutti i reveal. Questo garantisce un'accelerazione iniziale rapida seguita da una decelerazione estremamente morbida, tipica delle interfacce high-end.
- **Spring Physics:** Per le micro-interazioni (Bottoni, FAB, Card) abbiamo configurato preset di "Spring" (Molla) con diverse rigidità:
    - *Bouncy:* Per il FAB e le icone, per un feedback energetico.
    - *Gentle:* Per i reveal delle sezioni, per un ingresso organico e rassicurante.

## 3. Tipografia Dinamica (Text Reveals)
I titoli H1 e H2 non appaiono semplicemente; vengono "rivelati".
- **Masked Line Reveal:** Ogni riga di testo è avvolta in una maschera invisibile (`overflow-hidden`). Le parole scivolano dal basso verso l'alto, creando un effetto cinematografico che guida l'occhio durante la lettura.
- **Staggering:** Le righe di testo sono sfasate temporalmente di 80ms, rendendo l'apparizione del copy fluida e meno "bloccata".

## 4. Esperienza Immersiva
- **Soft Parallax:** Le immagini dei giardini e degli interni utilizzano un effetto parallasse scroll-based. L'immagine si muove leggermente a una velocità diversa rispetto allo scroll, aggiungendo profondità spaziale al design.
- **Organic Pulse:** Nella sezione "Scarcity", il numero **4** e il bagliore radiale sottostante "respirano" con un ciclo infinito. Questo attira l'attenzione sulla scarsità dell'offerta in modo elegante e non invasivo.

## 5. Micro-Interazioni Apple-Style
- **Magnetic Interaction:** I bottoni principali e il FAB implementano un effetto magnetico. Al passaggio del mouse, il contenuto del bottone viene attratto verso il cursore, creando una connessione fisica tra utente e interfaccia.
- **Tilt Effect:** Le card dei servizi e delle FAQ rispondono alla posizione del cursore inclinandosi leggermente in 3D. Questo rende l'interazione tattile e soddisfacente.
- **Thumb-Driven Mobile UX:** Il menu mobile e il FAB utilizzano transizioni spring ottimizzate per il tocco, garantendo reattività immediata.

## 6. Ottimizzazione Performance
- **Viewport Execution:** Tutte le animazioni pesanti vengono attivate solo quando l'elemento entra nel viewport e vengono eseguite una sola volta (`once: true`) per non appesantire la navigazione successiva.
- **GPU-Only:** Nessuna animazione modifica proprietà che causano il "layout reflow" (come width, height o top/left), garantendo stabilità visiva totale.

---
*Il risultato finale è un'interfaccia che non solo informa, ma emoziona, posizionando Casanziani come una scelta d'eccellenza e di estrema cura.*
