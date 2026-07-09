'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * POWDER SPLASH MOMENT – full-bleed pás; Higgsfield video (Seedance 2.0,
 * slow-motion exploze prášku) jako autoplay muted loop na pozadí,
 * přes něj jediný obří claim.
 * Asset: /assets/powder_splash.mp4
 */
export default function PowderSplash() {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Pojistka autoplay pro prohlížeče, které pozastaví offscreen video. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative z-10 flex h-[85vh] items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src="/assets/powder_splash.mp4"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-transparent to-abyss" />
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 px-6 text-center text-4xl font-black leading-tight md:text-7xl"
      >
        ELEKTROLYTY.
        <br />
        <span className="ice-text">RETENCE VODY 77&nbsp;%.</span>
      </motion.h2>
    </section>
  );
}
