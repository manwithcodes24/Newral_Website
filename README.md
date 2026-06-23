# Newral Website — React + Vite

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Get images working

Images point to Figma's local asset server (`localhost:3845`).
Run this **once** with Figma desktop open:

```bash
node fetch-assets.js
```

This saves all 40 assets to `public/assets/`.
Then open `src/lib/assets.js` and change the first line:

```js
// Before
const BASE = 'http://localhost:3845/assets'

// After
const BASE = '/assets'
```

Refresh — all images load from your own server permanently.

## Project structure

```
src/
├── components/       One file + one CSS module per section
│   ├── Nav
│   ├── StickyTag
│   ├── Hero          Plainthing-style flip animation
│   ├── VideoSection  Scroll-perspective tilt
│   ├── Logos         Marquee strips
│   ├── Pricing
│   ├── Projects      Auto-scroll slider
│   ├── StatsSection  Pinned scroll animation (Desktop 1→2→3)
│   ├── Services      Sticky card stacking
│   ├── HowWeWork
│   ├── Testimonial
│   ├── FooterCTA
│   └── Footer
├── hooks/
│   └── useReveal.js  IntersectionObserver scroll fade-in
├── lib/
│   └── assets.js     Central asset URL map — swap BASE to go live
└── styles/
    ├── globals.css   Base reset, shared buttons, section heading
    └── tokens.css    CSS vars, font faces, fluid scale
```

## Fonts

Instrument Serif + Satoshi load from Google Fonts / Fontshare (no install needed).
Aeonik is a licensed font. Drop your `.woff2` files in `public/fonts/`:
- `Aeonik-Regular.woff2`
- `Aeonik-Medium.woff2`
- `Aeonik-Light.woff2`

Falls back to Inter if the files aren't present.
