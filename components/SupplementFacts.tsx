'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { FACTS } from '@/lib/data';

/**
 * „TRANSPARENTNOST" – světlý zlom. Čistě bílá sekce (kontrast po tmě),
 * dóza (Higgsfield remove_background) na bílém, vedle SUPPLEMENT FACTS
 * jako laboratorní protokol: tenké linky, monospace, toggle 16 g / 32 g
 * s count-up animací čísel.
 */

/* Count-up číslo – animuje se při změně cílové hodnoty. */
function CountUp({ value, decimals }: { value: number; decimals: number }) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    if (from === value) return;
    const start = performance.now();
    const dur = 550;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (value - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <>{display.toLocaleString('cs-CZ', { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}</>
  );
}

export default function SupplementFacts() {
  const [dose, setDose] = useState<16 | 32>(16);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="relative z-10 bg-[#F4F9FD] py-28 text-[#0A1628]">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="font-mono text-xs tracking-[0.4em] text-frostDeep">
            LABORATORNÍ PROTOKOL
          </p>
          <h2 className="mt-3 text-5xl font-black md:text-6xl">Transparentnost</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-[#0A1628]/60">
            Žádné proprietární směsi. Každá dávka odpovídá klinickým studiím.
          </p>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Dóza na bílém – Higgsfield remove_background PNG */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex justify-center"
          >
            <Image
              src="/assets/jar_front_cutout.webp"
              alt="PRE-WORKOUT White TitanBeast"
              width={480}
              height={620}
              className="h-auto w-full max-w-sm drop-shadow-[0_25px_50px_rgba(21,101,192,0.25)]"
            />
          </motion.div>

          {/* Laboratorní tabulka */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="border border-[#0A1628]/15 bg-white p-6 md:p-8"
          >
            <div className="flex items-center justify-between border-b-2 border-[#0A1628] pb-4">
              <h3 className="font-mono text-lg font-bold tracking-wide">
                SUPPLEMENT FACTS
              </h3>
              {/* Toggle dávky */}
              <div className="flex overflow-hidden rounded-md border border-[#0A1628]/25 font-mono text-xs">
                {([16, 32] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDose(d)}
                    className={`px-4 py-1.5 transition ${
                      dose === d
                        ? 'bg-frostDeep text-white'
                        : 'bg-white text-[#0A1628]/60 hover:bg-[#F4F9FD]'
                    }`}
                  >
                    {d} g
                  </button>
                ))}
              </div>
            </div>

            <table className="w-full font-mono text-sm">
              <tbody>
                {FACTS.map((row) => {
                  const value = dose === 16 ? row.per16 : row.per32;
                  const decimals = Number.isInteger(row.per16) && Number.isInteger(row.per32) ? 0 : 1;
                  return (
                    <tr
                      key={row.name}
                      className="border-b border-[#0A1628]/10 last:border-0"
                    >
                      <td className="py-2.5 pr-3">
                        {row.name}
                        {row.note && (
                          <span className="block text-[10px] text-[#0A1628]/45">
                            {row.note}
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap py-2.5 text-right font-bold text-frostDeep">
                        <CountUp value={value} decimals={decimals} /> {row.unit}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="mt-4 text-[10px] text-[#0A1628]/45">
              * Denní referenční hodnota nestanovena. Dávka = {dose} g prášku.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
