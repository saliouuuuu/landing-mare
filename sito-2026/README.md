# Marea Creative · sito 2026

Sito statico di Marea Creative: HTML, CSS e JavaScript senza framework. Il contatto passa da WhatsApp (350 592 0776) e dall'email.

## Struttura

- `src/index.src.html`, `src/app.css`, `src/app.js`: il sito
- `assets/`: immagini (screenshot del lavoro per Lisa Garden, anteprima per i social) e icona
- `build.py`: copia tutto in `dist/` (nessuna dipendenza, solo Python 3)
- `build-worker.py`: mette `dist/` dentro un unico Worker Cloudflare (`worker.js`)
- `worker.template.js`: il codice del Worker
- `wrangler.jsonc`: configurazione Cloudflare

## Costruire e pubblicare

```bash
python3 build.py && python3 build-worker.py
npx wrangler deploy
```

Con la connessione GitHub di Cloudflare (Workers Builds): comando di build `python3 build.py && python3 build-worker.py`, comando di deploy `npx wrangler deploy`, cartella radice `sito-2026`.

## Dominio

Il Worker legge il dominio dalla richiesta: `canonical`, `og:url`, dati strutturati e `sitemap.xml` si aggiornano da soli.
Su `*.workers.dev` il sito è `noindex`; sul dominio vero è indicizzabile. Dopo aver collegato il dominio da Cloudflare (Workers → marea-creative → Settings → Domains & Routes), si può disattivare l'indirizzo `workers.dev`.

## Cosa aggiornare ogni mese

In `src/app.js`:
- `OFFER_END`: data di fine dell'offerta. Dopo quella data il sito mostra da solo i prezzi pieni e nasconde l'avviso.
- `PIANI`: prezzi (`vecchio` = prezzo pieno, `prezzo` = prezzo in offerta) e voci dei pacchetti.
- `FAQ`, `GAIN`, `HOW`: testi delle sezioni.

## Da sapere

- I punteggi Lighthouse nella hero e nella sezione "Un lavoro recente" sono quelli misurati il 13 novembre 2026 sul sito di Lisa Garden: vanno rimisurati se il sito cambia.
- Il calcolo "Quanto rende" usa i numeri scelti da chi visita; non promette clienti.
