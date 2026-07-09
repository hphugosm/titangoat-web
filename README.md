# PRE-WORKOUT | White TitanBeast — TitanGOAT

Vizuálně oslnivá produktová landing page pro doplněk stravy **PRE-WORKOUT | White TitanBeast** značky TitanGOAT. Koncept **„Sestup do ledu"** – jeden souvislý scroll příběh od vesmíru přes zamrzání a rozklad produktu na složky až po „probuzení titána", v ledově-modrém *frost beast* vizuálním světě. Inspirováno Apple product pages (scroll-driven video) a Humane AI Pin.

🔗 **Live:** https://titangoat-web.vercel.app

> Ukázkový/demo projekt. Vizuály (produktové fotky, scroll video, powder splash, ledová bytost) byly vygenerovány přes Higgsfield. Nákupní tlačítka nikam neodesílají.

---

## Co stránka umí

- **Hero „Vstup do mrazu"** – hvězdné částice; dóza se při prvním scrollu **zmaterializuje z částic** do siluety a prolne do reálné fotky.
- **Scroll-video sekce** (styl Apple AirPods/MacBook) – `<canvas>` přehrává snímky produktového videa podle scroll progressu (přednačtené `Image` objekty, kreslení přes `requestAnimationFrame`, žádné trhané seekování `<video>`). V klíčových bodech se prolínají textové claimy.
- **„Anatomie síly"** – z dózy se rozletí složení jako levitující glass-morphism karty s ledovým glow; klik kartu rozbalí.
- **Powder splash moment** – full-bleed video loop na pozadí + jeden úderný claim.
- **Světlý zlom „Transparentnost"** – laboratorní SUPPLEMENT FACTS tabulka s toggle 16 g / 32 g a count-up animací čísel.
- **TitanBeast moment** – celoobrazovkové video ožívající ledové bytosti, parallax nadpis.
- **Nákupní sekce** – buy box s cenou, quantity selectorem, pulzujícím CTA a trust ikonkami.
- **Hvězdné pozadí** – lehký canvas particle systém (max ~180 částic, pomalý drift).
- **Sticky mini-lišta** s cenou a tlačítkem koupit od sekce složení dál.

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) – `useScroll`, `useTransform`, `useInView`
- [Lenis](https://github.com/darkroomengineering/lenis) – smooth scroll
- `<canvas>` + `requestAnimationFrame` – scroll-scrubbed video a particle systémy

## Spuštění lokálně

```bash
npm install
npm run dev
```

Otevři http://localhost:3100.

Produkční build:

```bash
npm run build && npm run start
```

## Struktura

```
titangoat-web/
├── app/                    layout.tsx, page.tsx, globals.css
├── components/             Navbar, StickyBuyBar, SmoothScroll, StarField,
│                           HeroSection, ScrollVideoSection, IngredientCards,
│                           PowderSplash, SupplementFacts, TitanBeastSection,
│                           BuySection, Footer
├── lib/data.ts             produkt, složení, supplement facts, claimy scroll-videa
└── public/
    ├── assets/             cutout dózy, videa (powder_splash, titanbeast), rendery
    ├── frames/             241× WebP snímek scroll-videa (1280px, desktop)
    └── frames-sm/          121× WebP snímek (640px, mobil – méně dat)
```

Obsah, dávky a claimy scroll-videa (s progress body) upravíš v [`lib/data.ts`](lib/data.ts).

## Poznámky

- Scroll-video je rozsekané z Higgsfield klipu na WebP snímky (ffmpeg → cwebp), desktop i lehčí mobilní sada.
- Hero materializace vzorkuje alfu z cutout WebP a částice lerpují do siluety dózy, poté crossfade do fotky.
- Videa lazy-load (`preload="none"`), obrázky přes `next/image`, jazyk UI čeština.
