'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { INGREDIENTS, type Ingredient } from '@/lib/data';

/**
 * „ANATOMIE SÍLY" – dóza uprostřed (Higgsfield remove_background PNG),
 * na scroll se z ní rozletí ingredience jako levitující glass-morphism
 * karty s ledovým glow (staggered Framer Motion). Klik kartu rozbalí.
 */

/* Rozmístění karet kolem dózy (desktop) – poloměry v % kontejneru. */
const POSITIONS = [
  { x: -38, y: -32 },
  { x: 38, y: -30 },
  { x: -44, y: 0 },
  { x: 44, y: 2 },
  { x: -36, y: 30 },
  { x: 36, y: 32 },
  { x: -14, y: -42 },
  { x: 14, y: 42 },
  { x: -16, y: 40 },
  { x: 16, y: -44 },
];

function Card({
  ing,
  i,
  inView,
  open,
  onToggle,
}: {
  ing: Ingredient;
  i: number;
  inView: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const pos = POSITIONS[i % POSITIONS.length];
  return (
    <motion.button
      onClick={onToggle}
      initial={false}
      animate={
        inView
          ? { x: `${pos.x}vw`, y: `${pos.y * 0.7}vh`, opacity: 1, scale: 1 }
          : { x: 0, y: 0, opacity: 0, scale: 0.3 }
      }
      transition={{
        delay: inView ? 0.15 + i * 0.07 : 0,
        duration: 0.7,
        type: 'spring',
        bounce: 0.25,
      }}
      className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-left"
      style={{ maxWidth: open ? 320 : 200 }}
    >
      <div
        className={`float-slow rounded-2xl border border-frost/25 bg-white/[0.06] p-4 backdrop-blur-md transition-shadow ${
          open ? 'shadow-frostLg' : 'shadow-frost'
        }`}
        style={{ animationDelay: `${i * 0.4}s` }}
      >
        <div className="flex items-baseline gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-frost" />
          <span className="text-sm font-bold text-white">{ing.name}</span>
        </div>
        <div className="mt-1 font-mono text-lg font-bold text-frost">{ing.dose}</div>
        <AnimatePresence>
          {open && ing.detail && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 overflow-hidden text-xs leading-relaxed text-white/70"
            >
              {ing.detail} →
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

export default function IngredientCards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-25% 0px -25% 0px', once: false });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="slozeni" className="relative z-10 py-24">
      <div className="mb-4 text-center">
        <p className="font-mono text-xs tracking-[0.4em] text-frost">SLOŽENÍ</p>
        <h2 className="ice-text mt-3 text-5xl font-black md:text-7xl">
          ANATOMIE SÍLY
        </h2>
      </div>

      <div
        ref={ref}
        className="relative mx-auto flex h-[110vh] max-w-6xl items-center justify-center overflow-visible"
      >
        {/* Dóza uprostřed – Higgsfield remove_background PNG */}
        <motion.div
          animate={inView ? { scale: 1 } : { scale: 0.92 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="absolute inset-0 -z-10 scale-125 rounded-full bg-frost/10 blur-3xl" />
          <Image
            src="/assets/jar_front_cutout.webp"
            alt="PRE-WORKOUT White TitanBeast – složení"
            width={420}
            height={540}
            className="h-[52vh] w-auto drop-shadow-[0_0_50px_rgba(79,195,247,0.4)]"
          />
        </motion.div>

        {/* Desktop: karty rozletěné kolem dózy */}
        <div className="hidden md:block">
          {INGREDIENTS.map((ing, i) => (
            <Card
              key={ing.name}
              ing={ing}
              i={i}
              inView={inView}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>

      {/* Mobil: karty v gridu pod dózou */}
      <div className="mx-auto mt-[-30vh] grid max-w-md grid-cols-2 gap-3 px-5 md:hidden">
        {INGREDIENTS.map((ing, i) => (
          <motion.button
            key={ing.name}
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-frost/25 bg-white/[0.06] p-4 text-left backdrop-blur-md"
          >
            <span className="text-sm font-bold">{ing.name}</span>
            <div className="mt-1 font-mono text-base font-bold text-frost">
              {ing.dose}
            </div>
            {openIdx === i && ing.detail && (
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                {ing.detail} →
              </p>
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
