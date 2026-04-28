# DESIGN SYSTEM SPECIFICATIONS
**Progetto:** Casanziani (Casa Famiglia Boutique - 4 Ospiti)
**Ruolo:** Art Director & Lead UX/UI Designer

## 1. Visione Artistica e Linee Guida
Il design è concepito per comunicare in modo viscerale **Fiducia, Calore e Protezione**. Lo stile adottato è il **Rustico-Moderno / Organico**, caratterizzato dall'assenza totale di spigoli vivi e dall'impiego esclusivo di tonalità naturali. 
*Zero Emoji policy rigorosamente applicata.* L'obiettivo funzionale primario è la rassicurazione del Caregiver (figlio/a) e la conversione diretta (Lead Generation).

## 2. Palette Colori (No-Black / No-White Policy)
Tutti i colori sono stati selezionati per garantire accessibilità (WCAG AA) mantenendo un'atmosfera serena e "terrena". Nessun bianco o nero puro.

*   **Background (Sfondo Pagina):** `Cream Sand` `#F9F6F0`
*   **Surface (Card e Modali):** `Panna` `#FAF8F5` (Leggero stacco dallo sfondo per creare profondità senza ombre pesanti)
*   **Testo Principale (Body test):** `Antracite Caldo` `#2A2826`
*   **Testo Titoli (Headings) / Alternative test:** `Testa di Moro` `#3E2C20`
*   **Accento 1 (Natura/Rassicurazione):** `Verde Salvia` `#788E7B`
*   **Accento 2 (Calore/Tradizione):** `Terracotta` `#BA6B57`
*   **Primary CTA (Azione - Alto Contrasto):** `Arancio Bruciato` `#C95A2B` (Testo interno: `#F9F6F0`). Questo colore attira l'occhio istantaneamente garantendo un'eccellente leggibilità.
*   **Secondary CTA / Bordo Input:** `Oro Antico` `#B88A44`

## 3. Tipografia e Leggibilità
L'attenzione all'accessibilità visiva è massima, rivolgendosi anche a un pubblico maturo.

*   **Primary Font (Titoli):** `Montserrat`
    *   Carattere geometrico ma con curve morbide e accoglienti.
    *   H1: `3.5rem` (Desktop) / `2.5rem` (Mobile) - Weight: `600 (SemiBold)`
    *   H2: `2.5rem` (Desktop) / `2rem` (Mobile) - Weight: `500 (Medium)`
    *   Letter-spacing: `-1px` per compattezza visiva elegante.
*   **Secondary Font (Corpo del Testo):** `Inter` o `Geist`
    *   Perfetta leggibilità a schermo.
    *   Base size (Body): `1.125rem` (18px) per facilitare la lettura.
    *   Line-height: `1.7` (Arioso e rilassante).
    *   Weight: `400 (Regular)` e `500 (Medium)` per enfasi.

## 4. Spaziature, Griglie e Geometrie
Il layout deve respirare, trasmettendo calma.

*   **Grid System:** 12 colonne Flexbox/CSS Grid.
*   **Spaziatura Base (Spacing Scale):** Multipli di `8px`.
    *   Margin tra le sezioni (Section Gap): `120px` (Desktop) / `80px` (Mobile).
*   **Geometrie (Border-Radius Organico):**
    *   Bottoni (Pill-shape): `100px` (Completamente arrotondati)
    *   Cards (Superfici contenitore): `24px`
    *   Immagini fotografiche: `32px` (Mai foto con spigoli vivi)

## 5. Componenti e Micro-Interazioni
L'interfaccia deve apparire "fluida" e viva, ma senza animazioni scattanti o eccessive.
**Curva di transizione globale:** `cubic-bezier(0.4, 0, 0.2, 1)`, durata `300ms`.

### A. Bottoni CTA (Call to Action)
*   **Default:** Sfondo `#C95A2B`, Testo `#F9F6F0`. Nessuna ombra esterna pesante.
*   **Hover State:** Sfondo che si scurisce leggermente `#A8481F`. Il bottone subisce una traslazione sull'asse Y (`transform: translateY(-2px)`) e un'ombra morbida appare (`box-shadow: 0px 8px 24px rgba(201, 90, 43, 0.25)`).
*   **Focus State (Accessibilità):** Bordo esterno (outline) di `3px solid #788E7B` (Verde Salvia) distanziato di `2px` dal bottone (`outline-offset: 2px`).
*   **Active State:** `transform: translateY(0)` e riduzione opacità `0.9`.

### B. Sticky Header (Obiettivo Conversione)
*   Barra di navigazione che rimane agganciata in alto durante lo scroll.
*   Sfondo traslucido `#FAF8F5` con `backdrop-filter: blur(12px)` per l'effetto glassmorphism organico.
*   Presenza **costante** del bottone Primary CTA "Prenota Visita" o "Chiama Ora" allineato a destra.

### C. Cards (Es: "I Nostri Servizi" o "I 3 Pilastri")
*   **Sfondo:** `#FAF8F5` posato su background `#F9F6F0`.
*   **Bordo:** Sottilissimo bordo per definire l'area, es. `1px solid rgba(62, 44, 32, 0.08)`.
*   **Hover State:** Leggerissima elevazione con ombra color terra `box-shadow: 0px 12px 32px rgba(62, 44, 32, 0.06)`.

### D. Input Form (Area Contatti)
*   **Default:** Background trasparente, Bordo `1px solid #B88A44` (Oro Antico), radius `16px`.
*   **Focus State:** Il bordo diventa `2px solid #788E7B` (Verde Salvia), sfondo passa a bianco panna `#FAF8F5`.
*   Testi placeholder in grigio molto caldo, mai nero opacizzato.

## 6. Iconografia e Fotografia
*   **Icone:** Esclusivamente set lineari (es. *Phosphor Icons* o *Lucide*), con spessore `stroke-width: 1.5px` o `2px`. Devono avere angoli arrotondati (es. `stroke-linejoin="round"`). Devono rappresentare elementi di cura: foglie, mani, casa, tazzina di caffè. *Nessuna icona medica (es. croci, stetoscopi).*
*   **Fotografia:** Obbligo di color grading caldo. Applicare sempre un lievissimo filtro seppia o aumento temperatura colore (+15%) sulle foto per uniformarle all'estetica "Sabbia/Legno" del sito.

## 7. Breakpoint Sensibili
*   **Mobile (M-First):** `320px - 767px`
*   **Tablet:** `768px - 1023px` (Formattazione tipografica a colonne accoppiate per ridurre la lunghezza riga testuale).
*   **Desktop:** `1024px - 1439px`
*   **Ultrawide:** `>= 1440px` (Max-width del container fissato a `1200px` per mantenere il sito raggruppato e intimo, non dispersivo).
