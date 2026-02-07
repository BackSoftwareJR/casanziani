# 🚀 Istruzioni per Completare il Nuovo Sito C.A.S.A.

## ✅ Cosa è Stato Completato

### Struttura Base
- ✅ Next.js 14 con App Router configurato
- ✅ TypeScript configurato
- ✅ Tailwind CSS configurato
- ✅ Design system completo
- ✅ Layout principale (Header, Footer)
- ✅ Sistema accessibilità completo

### Homepage - Tutte le Sezioni
- ✅ Hero section con video background
- ✅ Chi Siamo (About)
- ✅ Servizi (6 card)
- ✅ Timeline Giornata Tipo (DailyRoutine)
- ✅ Sezione Parco/Giardino (Garden)
- ✅ Anteprima Galleria (GalleryPreview)
- ✅ Testimonianze (Testimonials)
- ✅ FAQ (10 domande)
- ✅ Ti Richiamiamo Noi (Callback)
- ✅ Contatti (Contact)

### Componenti UI
- ✅ AccessibilityToolbar
- ✅ WhatsAppFloat
- ✅ CookieBanner
- ✅ Header con menu mobile
- ✅ Footer completo

### Dati e Contenuti
- ✅ `data/content.ts` con tutti i contenuti strutturati

## 📋 Prossimi Passi da Completare

### 1. Copiare File Statici

```bash
# Dalla cartella public_html copiare in public/
cp -r public_html/images public/
cp -r public_html/videos public/
cp -r public_html/icons public/
```

### 2. Installare Dipendenze

```bash
cd "nuovo sito"
npm install
```

### 3. Creare File Mancanti

#### A. Pagina Galleria Completa
Creare `app/galleria/page.tsx` con:
- Griglia masonry di tutte le immagini
- Lightbox per visualizzazione fullscreen
- Navigazione tra immagini

#### B. Sistema Blog
Creare:
- `app/blog/page.tsx` - Lista articoli
- `app/blog/[slug]/page.tsx` - Singolo articolo
- `data/blog/` - Cartella con articoli in markdown o JSON

#### C. Pagine Legali
Creare:
- `app/privacy-policy/page.tsx`
- `app/cookie-policy/page.tsx`
- `app/termini-condizioni/page.tsx`

### 4. Ottimizzazioni SEO

#### A. Sitemap Dinamico
Creare `app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://casanziani.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // ... altre pagine
  ];
}
```

#### B. Robots.txt
Creare `app/robots.ts`:
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://casanziani.com/sitemap.xml',
  };
}
```

### 5. Form e API

#### A. API Route per Callback
Creare `app/api/callback/route.ts` per gestire form callback

#### B. API Route per Contatti
Creare `app/api/contact/route.ts` per gestire form contatti

#### C. Validazione Form
Implementare validazione con `react-hook-form` e `zod`

### 6. Testing e Ottimizzazioni

#### A. Test Performance
- Eseguire `npm run build`
- Verificare Lighthouse score
- Ottimizzare immagini se necessario

#### B. Test Accessibilità
- Testare con screen reader
- Verificare navigazione da tastiera
- Testare ingrandimento testo

### 7. Deploy

#### Opzione A: Vercel (Consigliato)
```bash
npm install -g vercel
vercel
```

#### Opzione B: Altri Provider
```bash
npm run build
# Deploy la cartella .next/
```

## 🎨 Personalizzazioni

### Modificare Contenuti
Tutti i contenuti sono in `data/content.ts`. Modifica:
- `siteConfig` - Informazioni struttura
- `services` - Servizi offerti
- `dailyRoutine` - Timeline giornata
- `testimonials` - Testimonianze
- `faqs` - Domande frequenti
- `galleryImages` - Immagini galleria

### Modificare Colori
Modifica `tailwind.config.js` nella sezione `colors`:
```javascript
colors: {
  primary: {
    // Modifica i colori qui
  }
}
```

### Modificare Font
I font sono configurati in `app/layout.tsx`. Per cambiarli:
1. Importa nuovo font da `next/font/google`
2. Aggiungi alla variabile CSS
3. Aggiorna `globals.css`

## 📝 Note Importanti

### Immagini
- Usa sempre il componente `Image` di Next.js per ottimizzazione automatica
- Formati supportati: JPG, PNG, WebP, AVIF
- Dimensioni consigliate: max 1920px per larghezza

### Performance
- Il sito è già ottimizzato per performance
- Code splitting automatico
- Lazy loading componenti
- Image optimization automatica

### Accessibilità
- Il sistema di accessibilità è già implementato
- Toolbar accessibile in basso a sinistra
- Supporta 5 livelli di ingrandimento testo
- Alto contrasto opzionale
- Riduzione animazioni

## 🐛 Risoluzione Problemi

### Errore: Module not found
```bash
npm install
```

### Errore: Image optimization
Verifica che le immagini siano in `public/images/`

### Errore: Font non caricati
Verifica connessione internet per Google Fonts

## 📞 Supporto

Per domande o problemi, consulta:
- `README.md` - Documentazione generale
- `PROGETTO.md` - Stato del progetto
- Documentazione Next.js: https://nextjs.org/docs

## ✨ Funzionalità Avanzate da Aggiungere (Opzionale)

- [ ] CMS headless per blog (Strapi, Contentful)
- [ ] Sistema prenotazione visite online
- [ ] Integrazione Google Maps
- [ ] Chat live
- [ ] Newsletter
- [ ] Multilingua (IT/EN)
- [ ] PWA (Progressive Web App)
