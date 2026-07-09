'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { PRODUCT } from '@/lib/data';

/* Cílová pozice částice = pixel siluety dózy (navzorkováno z cutout PNG). */
type P = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  r: number;
  a: number;
};

/**
 * HERO – „VSTUP DO MRAZU".
 * Dóza není na začátku vidět; při prvním scrollu se zmaterializuje z částic:
 * částice se slétnou do siluety dózy (pozice navzorkované z transparentního
 * PNG /assets/jar_front_cutout.webp – Higgsfield remove_background) a poté
 * se prolne skutečná fotka (crossfade).
 * Sekce má 220vh, obsah je sticky – progress 0→1 řídí celou animaci.
 */
export default function HeroSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<P[]>([]);
  const progressRef = useRef(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v;
  });

  /* Texty mizí, jakmile začne materializace. */
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.35], [0, -60]);
  /* Reálná fotka se prolne v závěru materializace. */
  const jarOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  /* Navzorkuj siluetu dózy z cutout PNG a rozjeď particle smyčku. */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;

    const img = new window.Image();
    img.src = '/assets/jar_front_cutout.webp';

    const sample = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      if (!img.naturalWidth) return;

      /* Dóza zabírá ~55 % výšky plátna, vycentrovaná. */
      const targetH = h * 0.58;
      const scale = targetH / img.naturalHeight;
      const targetW = img.naturalWidth * scale;
      const ox = (w - targetW) / 2;
      const oy = (h - targetH) / 2 + h * 0.04;

      const off = document.createElement('canvas');
      const step = 6; // hustota vzorkování → ~1500-2500 částic
      off.width = Math.ceil(targetW / step);
      off.height = Math.ceil(targetH / step);
      const octx = off.getContext('2d');
      if (!octx) return;
      octx.drawImage(img, 0, 0, off.width, off.height);
      const data = octx.getImageData(0, 0, off.width, off.height).data;

      const pts: P[] = [];
      for (let y = 0; y < off.height; y++) {
        for (let x = 0; x < off.width; x++) {
          const alpha = data[(y * off.width + x) * 4 + 3];
          if (alpha > 120) {
            pts.push({
              x: Math.random() * w,
              y: Math.random() * h,
              tx: ox + x * step,
              ty: oy + y * step,
              r: 0.7 + Math.random() * 1.3,
              a: 0.4 + Math.random() * 0.6,
            });
          }
        }
      }
      particlesRef.current = pts;
      setReady(true);
    };

    img.onload = sample;
    const onResize = () => sample();
    window.addEventListener('resize', onResize);

    const ease = (t: number) => t * t * (3 - 2 * t);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const p = progressRef.current;
      /* Materializace probíhá v progress 0.1 → 0.7; pak částice slábnou,
         jak se prolíná reálná fotka. */
      const m = ease(Math.min(Math.max((p - 0.1) / 0.6, 0), 1));
      const fade = 1 - Math.min(Math.max((p - 0.62) / 0.25, 0), 1);

      if (m > 0.01 && fade > 0.01) {
        for (const pt of particlesRef.current) {
          const x = pt.x + (pt.tx - pt.x) * m;
          const y = pt.y + (pt.ty - pt.y) * m;
          ctx.beginPath();
          ctx.arc(x, y, pt.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160, 216, 250, ${pt.a * fade * (0.25 + 0.75 * m)})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section ref={wrapRef} id="produkt" className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Obří nadpis s ledovou texturou */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="relative z-20 px-4 text-center"
        >
          <p className="mb-4 font-mono text-sm tracking-[0.4em] text-frost">
            {PRODUCT.brand.toUpperCase()} · SESTUP DO LEDU
          </p>
          <h1 className="ice-text text-[15vw] font-black leading-none tracking-tight md:text-[10rem]">
            {PRODUCT.name}
          </h1>
          <p className="mt-5 font-mono text-base tracking-[0.25em] text-white/70 md:text-lg">
            WHITE TITANBEAST&nbsp;&nbsp;|&nbsp;&nbsp;{PRODUCT.weight}
          </p>
        </motion.div>

        {/* Particle canvas – materializace dózy */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 z-10 h-full w-full ${ready ? '' : 'opacity-0'}`}
          aria-hidden
        />

        {/* Reálná fotka dózy – crossfade po částicích
            Asset: jar_front_cutout.webp (Higgsfield remove_background) */}
        <motion.img
          src="/assets/jar_front_cutout.webp"
          alt="Dóza PRE-WORKOUT White TitanBeast"
          style={{ opacity: jarOpacity }}
          className="absolute left-1/2 top-1/2 z-10 h-[58vh] w-auto -translate-x-1/2 -translate-y-[46%] drop-shadow-[0_0_60px_rgba(79,195,247,0.35)]"
        />

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 z-20 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="font-mono text-xs tracking-[0.3em]">SCROLLUJ</span>
          <span className="block h-8 w-px animate-pulse bg-gradient-to-b from-frost to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
