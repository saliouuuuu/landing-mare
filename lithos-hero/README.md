# Lithos — hero con spotlight

Hero a schermo intero con **spotlight che segue il cursore** e rivela una seconda
immagine attraverso una maschera circolare sfumata.

Progetto a sé, separato dalla landing di Marea: React 18 + TypeScript + Vite +
Tailwind CSS + lucide-react.

## Avvio

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # bundle di produzione in dist/
```

## Struttura

```
src/
  constants.ts              SPOTLIGHT_R e URL delle due immagini
  App.tsx                   wrapper
  components/
    Nav.tsx                 barra fissa: logo, pill centrale, Sign Up, hamburger
    Hero.tsx                sezione, strati, testi, tracciamento del mouse
    RevealLayer.tsx         la maschera spotlight
  index.css                 font, Tailwind, animazioni d'ingresso
```

## Come riusarlo su un altro sito

Servono tre cose:

1. `components/Hero.tsx`, `components/RevealLayer.tsx`, `constants.ts`
2. Il blocco font + `@keyframes` in cima a `index.css`
3. Tailwind configurato, e `lucide-react` solo se porti anche `Nav.tsx`

Per cambiare le immagini basta modificare `BG_IMAGE_1` (quella di base) e
`BG_IMAGE_2` (quella rivelata) in `src/constants.ts`. Il raggio dello spotlight
è `SPOTLIGHT_R` nello stesso file.

## Una scelta tecnica da conoscere

La specifica originale prevedeva `canvas.toDataURL()` **dentro il render**, cioè
a ogni frame, con il canvas dimensionato al viewport.

Non l'ho implementato così, e il motivo è concreto: sarebbe una codifica PNG più
stringa base64 su circa 2 milioni di pixel, in modo sincrono, 60 volte al
secondo — e il browser dovrebbe poi ridecodificare quel data URL da diversi
megabyte come immagine di maschera, sempre a ogni frame. Su un portatile
normale o su un telefono il frame rate crolla e l'effetto scatta.

Lo spotlight però è una **forma fissa**: quando muovi il mouse cambia solo la
sua posizione, non il suo disegno. Quindi il gradiente viene rasterizzato sul
canvas e convertito in data URL **una volta sola**, al mount, e per ogni frame
resta solo da spostare la maschera con `mask-position`.

Gli stop del gradiente sono quelli della specifica (`0 → 1`, `0.4 → 1`,
`0.6 → 0.75`, `0.75 → 0.4`, `0.88 → 0.12`, `1 → 0`), quindi la resa visiva è
identica. Misurato con Chromium: main thread libero, l'easing `0.1` per frame
si comporta come previsto.

Il loop di animazione si spegne da solo quando lo spotlight ha raggiunto il
cursore, e riparte al `mousemove` successivo: senza questo, React
ri-renderizzerebbe la hero 60 volte al secondo anche con il mouse fermo.

Se per qualche motivo ti serve la versione letterale con l'encode a ogni frame,
si cambia solo `RevealLayer.tsx`.

## Note

- Il container usa `height: 100dvh` così le barre del browser su mobile non
  tagliano la sezione.
- Su mobile la pill centrale e il pulsante Sign Up sono nascosti (`md:`), al
  loro posto compare l'hamburger.
- `prefers-reduced-motion: reduce` disattiva le animazioni d'ingresso.
- Le due immagini sono ospitate su `images.higgs.ai`. Per un sito di produzione
  conviene scaricarle e servirle dal proprio dominio, così non dipendi da un
  host esterno.
