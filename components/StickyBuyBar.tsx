'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { PRODUCT } from '@/lib/data';

/**
 * Sticky mini-lišta dole: objeví se od sekce „Anatomie síly" (#slozeni) dál,
 * skryje se v nákupní sekci (#koupit), aby nedublovala hlavní CTA.
 * Asset: cutout dózy (Higgsfield remove_background z přední fotky).
 */
export default function StickyBuyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const from = document.querySelector('#slozeni');
      const until = document.querySelector('#koupit');
      if (!from || !until) return;
      const passedFrom = from.getBoundingClientRect().top < window.innerHeight * 0.5;
      const beforeBuy = until.getBoundingClientRect().top > window.innerHeight * 0.7;
      setVisible(passedFrom && beforeBuy);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-x-0 bottom-4 z-50 px-4"
        >
          <div className="mx-auto flex max-w-xl items-center gap-4 rounded-2xl border border-white/10 bg-navy/85 px-4 py-3 shadow-frostLg backdrop-blur-md">
            <Image
              src="/assets/jar_front_cutout.webp"
              alt=""
              width={44}
              height={56}
              className="h-12 w-auto drop-shadow-[0_0_10px_rgba(79,195,247,0.5)]"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">
                {PRODUCT.name} · {PRODUCT.variant}
              </p>
              <p className="font-mono text-xs text-frost">{PRODUCT.price}</p>
            </div>
            <a
              href="#koupit"
              className="whitespace-nowrap rounded-lg bg-frost px-4 py-2 text-sm font-bold text-abyss transition hover:bg-white"
            >
              Koupit
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
