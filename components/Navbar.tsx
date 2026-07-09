'use client';

import { useEffect, useState } from 'react';
import { PRODUCT } from '@/lib/data';

/**
 * Fixní navigace: zpočátku průhledná, po scrollu tmavá s backdrop-blur.
 * StickyBuyBar (mini-lišta s cenou) je samostatná komponenta.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/5 bg-abyss/70 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="text-lg font-extrabold tracking-wide">
          Titan<span className="text-frost">GOAT</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#produkt" className="transition hover:text-frost">
            Produkt
          </a>
          <a href="#slozeni" className="transition hover:text-frost">
            Složení
          </a>
          <a href="#pribeh" className="transition hover:text-frost">
            Příběh
          </a>
        </div>
        <a
          href="#koupit"
          className="rounded-lg bg-frost/15 px-5 py-2 text-sm font-semibold text-frost shadow-frost transition hover:bg-frost hover:text-abyss"
        >
          Do košíku · {PRODUCT.price}
        </a>
      </nav>
    </header>
  );
}
