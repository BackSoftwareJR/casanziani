# C.A.S.A. - Nuovo Sito Web

Sito web moderno e performante per C.A.S.A. (Comunità Alloggio Sociale per Anziani) realizzato con Next.js 14, React, TypeScript e Tailwind CSS.

## 🚀 Caratteristiche Principali

### Performance
- **Next.js 14** con App Router per SSR/SSG
- **Image Optimization** automatica con Next.js Image
- **Code Splitting** automatico
- **Lazy Loading** componenti e immagini
- **Font Optimization** con next/font
- **Compressione** automatica

### Accessibilità
- **Ingrandimento testo** (5 livelli: small, normal, large, xlarge, xxlarge)
- **Alto contrasto** opzionale
- **Riduzione animazioni** per utenti sensibili
- **Navigazione da tastiera** completa
- **ARIA labels** e semantic HTML
- **Skip to main content** link
- **Focus visible** su tutti gli elementi interattivi

### SEO Avanzato
- **Meta tags** ottimizzati
- **Schema.org** markup (LocalBusiness, FAQPage)
- **Open Graph** e Twitter Cards
- **Sitemap dinamico**
- **Robots.txt** configurabile
- **Canonical URLs**

### Design
- **Design system** completo con palette colori
- **Responsive** mobile-first
- **Animazioni** fluide con Framer Motion
- **Tipografia** ottimizzata (Open Sans + Merriweather)
- **Componenti riutilizzabili**

### Funzionalità
- **Blog system** completo
- **Galleria foto** ottimizzata
- **Form di contatto** con validazione
- **FAQ** interattive
- **Testimonianze**
- **Timeline giornata tipo**
- **Sezione parco/giardino**

## 📦 Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build

# Avvia il server di produzione
npm start
```

## 🏗️ Struttura del Progetto

```
nuovo sito/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principale
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Stili globali
│   ├── blog/              # Pagine blog
│   └── galleria/          # Pagina galleria
├── components/            # Componenti React
│   ├── layout/           # Header, Footer, Navigation
│   ├── sections/         # Sezioni homepage
│   ├── ui/               # Componenti UI riutilizzabili
│   └── providers/        # Context providers
├── data/                 # Dati e contenuti
├── public/              # File statici
│   ├── images/          # Immagini
│   ├── videos/          # Video
│   └── icons/           # Icone
└── types/               # TypeScript types
```

## 🎨 Design System

### Colori
- **Primary**: Beige/Marrone (#C3B091, #8A795D)
- **Secondary**: Tonalità calde
- **Accent**: Beige chiaro (#F5F5DC)

### Tipografia
- **Sans**: Open Sans (testo)
- **Serif**: Merriweather (titoli)

### Spacing
- Sistema di spacing coerente basato su rem

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibilità

Il sito è completamente accessibile con:
- Supporto screen reader
- Navigazione da tastiera
- Controllo dimensione testo
- Alto contrasto opzionale
- Riduzione animazioni

## 🔧 Configurazione

### Variabili d'ambiente

Crea un file `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://casanziani.com
NEXT_PUBLIC_GA_ID=AW-17576720313
```

### Personalizzazione

Modifica i contenuti in `data/content.ts` per personalizzare:
- Informazioni struttura
- Servizi
- FAQ
- Testimonianze
- Timeline giornata

## 📈 Performance

Il sito è ottimizzato per:
- **Lighthouse Score**: 90+ su tutte le metriche
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1

## 🚀 Deploy

### Vercel (Consigliato)

```bash
npm install -g vercel
vercel
```

### Altri provider

```bash
npm run build
# I file sono in .next/
```

## 📝 TODO

- [ ] Implementare sistema blog completo
- [ ] Aggiungere CMS headless (opzionale)
- [ ] Integrare tracking eventi
- [ ] Aggiungere form callback
- [ ] Ottimizzare immagini esistenti
- [ ] Aggiungere più testimonianze
- [ ] Implementare prenotazione visite online

## 📄 Licenza

Proprietario: C.A.S.A - Comunità Alloggio Sociale per Anziani

## 👨‍💻 Sviluppato da

Backsoftware
# casanziani
