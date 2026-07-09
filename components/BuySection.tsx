'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PRODUCT } from '@/lib/data';

const TRUST = [
  { icon: '🇸🇪', label: 'Made in Sweden' },
  { icon: '⚗️', label: 'Klinické dávky' },
  { icon: '🔍', label: 'Plná transparentnost' },
];

/**
 * NÁKUPNÍ SEKCE – buy box: velká fotka dózy s glow (remove_background PNG),
 * cena, quantity selector, pulzující CTA, trust ikonky.
 * Demo – tlačítko nikam neodesílá.
 */
/* Mini galerie buy boxu – doplňkové Higgsfield rendery. */
const GALLERY = [
  { src: '/assets/jar_front_cutout.webp', alt: 'Dóza – čelní pohled' },
  { src: '/assets/jar_open.webp', alt: 'Otevřená dóza s práškem' },
  { src: '/assets/label_detail.webp', alt: 'Detail etikety' },
];

export default function BuySection() {
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);

  return (
    <section id="koupit" className="relative z-10 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        {/* Fotka s glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 -z-10 scale-90 rounded-full bg-frost/15 blur-[100px]" />
          <div className="flex flex-col items-center gap-5">
            <Image
              src={GALLERY[img].src}
              alt={GALLERY[img].alt}
              width={520}
              height={680}
              className={`h-[52vh] w-auto object-contain drop-shadow-[0_0_80px_rgba(79,195,247,0.45)] ${
                img > 0 ? 'rounded-2xl' : ''
              }`}
            />
            <div className="flex gap-3">
              {GALLERY.map((g, i) => (
                <button
                  key={g.src}
                  onClick={() => setImg(i)}
                  aria-label={g.alt}
                  className={`h-16 w-16 overflow-hidden rounded-xl border transition ${
                    img === i
                      ? 'border-frost shadow-frost'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={g.src}
                    alt=""
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Buy box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="font-mono text-xs tracking-[0.4em] text-frost">
            PRE-WORKOUT V2 · {PRODUCT.weight}
          </p>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            {PRODUCT.name}
            <span className="ice-text block">{PRODUCT.variant}</span>
          </h2>

          <div className="mt-6 flex items-center gap-3">
            <span className="rounded-full border border-frost/40 bg-frost/10 px-4 py-1.5 text-sm font-semibold text-frost">
              White TitanBeast
            </span>
            <span className="text-sm text-white/50">jediná varianta – žádné kompromisy</span>
          </div>

          <p className="mt-8 font-mono text-5xl font-bold">{PRODUCT.price}</p>
          <p className="mt-1 text-sm text-white/50">vč. DPH · ~31 plných dávek</p>

          <div className="mt-8 flex items-center gap-4">
            {/* Quantity selector */}
            <div className="flex items-center rounded-xl border border-white/15 font-mono">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-4 py-3 text-white/60 transition hover:text-frost"
                aria-label="Méně"
              >
                −
              </button>
              <span className="w-10 text-center text-lg font-bold">{qty}</span>
              <button
                onClick={() => setQty(Math.min(9, qty + 1))}
                className="px-4 py-3 text-white/60 transition hover:text-frost"
                aria-label="Více"
              >
                +
              </button>
            </div>

            <button className="frost-pulse flex-1 rounded-xl bg-gradient-to-r from-frost to-frostDeep px-8 py-4 text-lg font-black tracking-wide text-abyss transition hover:brightness-110">
              PŘIDAT DO KOŠÍKU
            </button>
          </div>

          {/* Trust ikonky */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {TRUST.map((t) => (
              <div
                key={t.label}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center"
              >
                <div className="text-2xl">{t.icon}</div>
                <div className="mt-2 text-xs font-semibold text-white/70">{t.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
