'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import { VIDEO_CLAIMS } from '@/lib/data';

/**
 * SCROLL-VIDEO SEKCE (hlavní flex) – styl Apple AirPods/MacBook.
 * Výška 400vh, obsah sticky. <canvas> kreslí snímky hlavního Higgsfield
 * videa (Seedance 2.0: rotující dóza + vířící prášek) podle scroll
 * progressu přes requestAnimationFrame. Žádné seekování <video> elementu.
 *
 * Snímky: /frames/frame_001.webp … (ffmpeg, 24 fps, 1280px)
 * Mobil (<768px): poloviční sada (každý druhý snímek) v 640px
 * z /frames-sm/, kvůli datům a výkonu.
 */
const FRAME_COUNT = 240;
const MOBILE_FRAME_COUNT = 120;

function framePath(i: number, mobile: boolean) {
  const n = String(i + 1).padStart(3, '0');
  return mobile ? `/frames-sm/frame_${n}.webp` : `/frames/frame_${n}.webp`;
}

function Claim({
  progress,
  at,
  title,
  sub,
}: {
  progress: MotionValue<number>;
  at: number;
  title: string;
  sub: string;
}) {
  /* Každý claim žije v okně ±0.09 kolem svého bodu. */
  const opacity = useTransform(
    progress,
    [at - 0.09, at - 0.03, at + 0.05, at + 0.11],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [at - 0.09, at + 0.11], [30, -30]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 top-[14%] z-10 px-6 text-center"
    >
      <h3 className="ice-text text-4xl font-black md:text-6xl">{title}</h3>
      <p className="mt-3 font-mono text-xs tracking-[0.35em] text-frost md:text-sm">
        {sub}
      </p>
    </motion.div>
  );
}

export default function ScrollVideoSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef(0);
  const progressRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v;
  });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  /* Přednačtení snímků do Image objektů + rAF kreslení dle progressu. */
  useEffect(() => {
    const count = isMobile ? MOBILE_FRAME_COUNT : FRAME_COUNT;
    const imgs: HTMLImageElement[] = [];
    loadedRef.current = 0;
    for (let i = 0; i < count; i++) {
      const img = new window.Image();
      img.src = framePath(i, isMobile);
      img.onload = () => {
        loadedRef.current += 1;
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let raf = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.offsetWidth * dpr;
      const ch = canvas.offsetHeight * dpr;
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }
      const idx = Math.min(
        count - 1,
        Math.floor(progressRef.current * (count - 1))
      );
      const img = imagesRef.current[idx];
      if (!img || !img.complete || !img.naturalWidth) return;

      /* cover-fit */
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [isMobile]);

  return (
    <div ref={wrapRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full" />
        {/* Vinětace okrajů, ať snímky plynule sedí do tmavého pozadí */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,#050A14_100%)]" />
        {VIDEO_CLAIMS.map((c) => (
          <Claim
            key={c.at}
            progress={scrollYProgress}
            at={c.at}
            title={c.title}
            sub={c.sub}
          />
        ))}
      </div>
    </div>
  );
}
