"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE } from "@/lib/anim";
import { SITE } from "@/data/site";

const STARS = [
  { x: 12, y: 30 },
  { x: 28, y: 18 },
  { x: 44, y: 40 },
  { x: 60, y: 22 },
  { x: 76, y: 46 },
  { x: 88, y: 28 },
  { x: 22, y: 62 },
  { x: 50, y: 72 },
  { x: 70, y: 64 },
  { x: 84, y: 78 },
];
const LINES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [0, 6],
  [2, 7],
  [4, 8],
  [6, 7],
  [7, 8],
  [8, 9],
];

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-40">
      {/* constellation background */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        aria-hidden="true"
      >
        {LINES.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={STARS[a].x}
            y1={STARS[a].y}
            x2={STARS[b].x}
            y2={STARS[b].y}
            stroke="rgba(180,195,255,0.18)"
            strokeWidth="0.08"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE, delay: i * 0.08 }}
          />
        ))}
        {STARS.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={i === 2 ? 0.5 : 0.3}
            fill={i === 2 ? "#5f7dff" : "#f2f1ec"}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 + i * 0.05 }}
          />
        ))}
      </svg>

      {/* center animated star */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[18%] -translate-x-1/2"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 60 60" className="h-12 w-12 text-foreground/70">
          <path
            d="M30 4 C 34 22, 38 26, 56 30 C 38 34, 34 38, 30 56 C 26 38, 22 34, 4 30 C 22 26, 26 22, 30 4 Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      <div className="container-editorial relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-[0.7rem] uppercase tracking-ultra-wide text-muted">
              {SITE.coordinates}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-[16ch] font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.0] tracking-[-0.035em]">
              ¿Tenemos algo grande en mente?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-7 max-w-[48ch] text-pretty text-base leading-relaxed text-foreground-soft sm:text-lg">
              Hablemos sobre tu proyecto y sobre cómo podemos convertir una idea
              compleja en una solución clara.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <MagneticButton href={`mailto:${SITE.email}`} variant="primary">
                Iniciar una conversación
              </MagneticButton>
              <a
                href={`mailto:${SITE.email}`}
                className="group inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
              >
                {SITE.email}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
