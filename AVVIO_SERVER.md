# 🚀 Avvio Server di Sviluppo

## Comando

```bash
cd "nuovo sito"
npm run dev
```

## URL

Il server sarà disponibile su:
- **http://localhost:3000**

## Note

### Prima di Avviare

1. **Installa dipendenze** (già fatto):
   ```bash
   npm install
   ```

2. **Copia le immagini** (vedi `COPY_IMAGES.md`):
   ```bash
   # Copia immagini dal sito esistente
   cp -r ../public_html/images/* public/images/
   cp -r ../public_html/videos/* public/videos/
   cp -r ../public_html/icons/* public/icons/
   cp -r foto_blog/* public/foto_blog/
   ```

### Durante lo Sviluppo

- Il server si ricarica automaticamente quando modifichi i file
- Controlla la console per eventuali errori
- Usa `Ctrl+C` per fermare il server

### Problemi Comuni

#### Porta 3000 già in uso
```bash
# Usa una porta diversa
npm run dev -- -p 3001
```

#### Errori di compilazione
- Controlla la console per errori TypeScript
- Verifica che tutti i file siano salvati
- Riavvia il server

#### Immagini non trovate
- Verifica che le immagini siano in `public/`
- Controlla i percorsi nei componenti
- Riavvia il server dopo aver copiato le immagini

## Build per Produzione

```bash
npm run build
npm start
```

## Comandi Utili

- `npm run dev` - Avvia server sviluppo
- `npm run build` - Build per produzione
- `npm run start` - Avvia server produzione
- `npm run lint` - Controlla errori di codice
- `npm run type-check` - Verifica TypeScript
