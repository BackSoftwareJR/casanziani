# 📸 Istruzioni per Copiare le Immagini

## File da Copiare

### 1. Immagini del Sito Esistente

Dalla cartella `public_html/images/` copiare in `public/images/`:

```bash
# Da eseguire nella root del progetto
cp -r ../public_html/images/* public/images/
```

File da copiare:
- `/images/gallery/*` - Tutte le immagini della galleria
- `/images/converted/*` - Immagini convertite
- `/images/logo.jpg` - Logo
- `/images/hero-fallback.jpg` - Immagine hero
- `/images/screenshot-*.png` - Screenshot
- `/images/avatars/*` - Avatar per testimonianze

### 2. Immagini del Blog

Le immagini del blog sono già in `foto_blog/` e devono essere copiate in `public/foto_blog/`:

```bash
# Da eseguire nella root del progetto
cp -r foto_blog/* public/foto_blog/
```

File da copiare (10 immagini):
- `AdobeStock_120201098_Preview.webp`
- `AdobeStock_155405621_Preview.webp`
- `AdobeStock_332269749_Preview.webp`
- `AdobeStock_361420830_Preview.webp`
- `AdobeStock_547340066_Preview.webp`
- `AdobeStock_560060526_Preview.webp`
- `AdobeStock_601869653_Preview.webp`
- `AdobeStock_722441630_Preview.webp`
- `AdobeStock_77107461_Preview.webp`
- `AdobeStock_980779267_Preview.webp`

### 3. Video Hero

Dalla cartella `public_html/videos/` copiare in `public/videos/`:

```bash
cp -r ../public_html/videos/* public/videos/
```

File:
- `desktop.mp4`
- `mobile.mp4`

### 4. Icone e Favicon

Dalla cartella `public_html/icons/` copiare in `public/icons/`:

```bash
cp -r ../public_html/icons/* public/icons/
```

## Struttura Finale

Dopo la copia, la struttura dovrebbe essere:

```
public/
├── images/
│   ├── gallery/
│   ├── converted/
│   ├── avatars/
│   ├── logo.jpg
│   ├── hero-fallback.jpg
│   └── screenshot-*.png
├── foto_blog/
│   └── AdobeStock_*.webp (10 file)
├── videos/
│   ├── desktop.mp4
│   └── mobile.mp4
└── icons/
    ├── favicon.png
    ├── favicon.svg
    └── *.svg
```

## Verifica

Dopo la copia, verifica che:
- ✅ Tutte le immagini siano accessibili
- ✅ I percorsi nel codice corrispondano ai file
- ✅ Le immagini del blog siano in formato WebP
- ✅ I video siano presenti

## Note

- Le immagini del blog sono già in formato WebP (ottimizzato)
- Le immagini del sito potrebbero necessitare ottimizzazione
- Next.js Image component ottimizzerà automaticamente le immagini
