# 🖥️ Stato Server di Sviluppo

## ✅ Server Avviato

Il server Next.js è stato avviato in background.

## 🌐 Accesso

Apri il browser e vai su:
**http://localhost:3000**

## 📋 Checklist Pre-Avvio

- [x] Dipendenze installate (`npm install`)
- [x] Server avviato (`npm run dev`)
- [x] Immagini blog aggiornate con percorsi corretti
- [ ] Immagini del sito copiate (vedi COPY_IMAGES.md)
- [ ] Video hero copiati
- [ ] Icone copiate

## 🔍 Verifica Funzionamento

### Pagine da Testare

1. **Homepage**: http://localhost:3000
   - Hero section
   - Tutte le sezioni
   - Accessibilità toolbar

2. **Blog**: http://localhost:3000/blog
   - Lista articoli
   - Categorie
   - Featured articles

3. **Singolo Articolo**: http://localhost:3000/blog/[slug]
   - Contenuto formattato
   - Immagini
   - Articoli correlati

### Funzionalità da Testare

- [ ] Ingrandimento testo (toolbar in basso a sinistra)
- [ ] Menu mobile
- [ ] Form callback
- [ ] Link WhatsApp
- [ ] Navigazione tra pagine
- [ ] Immagini caricate correttamente

## ⚠️ Problemi Comuni

### Immagini non caricate
- Verifica che le immagini siano in `public/foto_blog/`
- Controlla i percorsi nei componenti
- Riavvia il server dopo aver copiato le immagini

### Errori TypeScript
- Controlla la console del terminale
- Verifica che tutti i file siano salvati
- Esegui `npm run type-check` per vedere gli errori

### Porta già in uso
```bash
# Ferma il server (Ctrl+C) e riavvia su porta diversa
npm run dev -- -p 3001
```

## 🛑 Fermare il Server

Premi `Ctrl+C` nel terminale dove è avviato il server.

## 📝 Note

- Il server si ricarica automaticamente quando modifichi i file
- Le modifiche ai file TypeScript/React richiedono un refresh del browser
- Le modifiche ai file CSS vengono applicate automaticamente
