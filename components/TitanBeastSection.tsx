'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * TITANBEAST MOMENT – návrat do tmy. Higgsfield video (Seedance 2.0,
 * ožívající ledový beast z etikety) přes celou obrazovku, parallax
 * nadpis „PROBUĎ TITÁNA". Čistá emoce, žádná informace.
 * Asset: /assets/titanbeast.mp4 (poster: beast still z nano_banana_pro)
 */
export default function TitanBeastSection() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.4]);

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
    <section
      id="pribeh"
      ref={ref}
      className="relative z-10 flex h-screen items-center justify-center overflow-hidden"
    >
      <motion.video
        ref={videoRef}
        src="/assets/titanbeast.mp4"
        poster="/assets/titanbeast_still.webp"
        style={{ opacity: videoOpacity }}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-transparent to-abyss" />
      <motion.h2
        style={{ y: titleY }}
        className="ice-text relative z-10 px-6 text-center text-6xl font-black tracking-tight md:text-[9rem]"
      >
        PROBUĎ TITÁNA
      </motion.h2>
    </section>
  );
}
