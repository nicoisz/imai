"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EASE } from "@/lib/anim";

const TRAITS = [
  { k: "Precisión técnica", v: "Rigor en cada decisión" },
  { k: "Inteligencia artificial", v: "Modelos con propósito" },
  { k: "Sensibilidad humana", v: "Software para personas" },
  { k: "Exploración", v: "Mirar más allá" },
];

export function PhilosophySection() {
  return (
    <section id="empresa" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-editorial">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Illustration */}
          <Reveal className="lg:col-span-5" amount={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] border border-border bg-surface">
              <HumanCosmosIllustration />
            </div>
          </Reveal>

          {/* Copy */}
          <div className="lg:col-span-7 lg:pl-8">
            <Reveal>
              <SectionLabel index="§ 03">Empresa</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-[14ch] font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.0] tracking-[-0.03em]">
                Tecnología con propósito humano
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-[55ch] text-pretty text-base leading-relaxed text-foreground-soft sm:text-lg">
                Creemos en la tecnología que potencia personas, equipos y
                organizaciones. Diseñamos y construimos software que resuelve
                problemas reales y abre nuevas posibilidades.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[3px] border border-border sm:grid-cols-2">
              {TRAITS.map((t, i) => (
                <Reveal key={t.k} delay={i * 0.08} amount={0.1}>
                  <div className="flex h-full flex-col gap-2 bg-surface p-6">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-primary-bright">
                      0{i + 1}
                    </span>
                    <span className="font-serif text-xl text-foreground">
                      {t.k}
                    </span>
                    <span className="text-sm text-muted">{t.v}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HumanCosmosIllustration() {
  const nodes = [
    { x: 50, y: 26 },
    { x: 50, y: 38 },
    { x: 38, y: 50 },
    { x: 62, y: 50 },
    { x: 28, y: 64 },
    { x: 72, y: 64 },
    { x: 42, y: 70 },
    { x: 58, y: 70 },
    { x: 50, y: 82 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 5],
    [2, 6],
    [3, 7],
    [6, 8],
    [7, 8],
    [4, 6],
    [5, 7],
  ];

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="Figura humana abstracta construida como una constelación"
    >
      <defs>
        <radialGradient id="phil-glow" cx="60%" cy="28%" r="60%">
          <stop offset="0%" stopColor="rgba(95,125,255,0.30)" />
          <stop offset="100%" stopColor="rgba(2,5,13,0)" />
        </radialGradient>
        <pattern
          id="phil-grid"
          width="25"
          height="25"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M25 0 L0 0 0 25"
            fill="none"
            stroke="rgba(95,125,255,0.08)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      <rect width="400" height="500" fill="#080d19" />
      <rect width="400" height="500" fill="url(#phil-grid)" />
      <rect width="400" height="500" fill="url(#phil-glow)" />

      {/* distant star top-right */}
      <g transform="translate(320 90)">
        <motion.path
          d="M0 -16 C 2 -4, 4 -2, 16 0 C 4 2, 2 4, 0 16 C -2 4, -4 2, -16 0 C -4 -2, -2 -4, 0 -16 Z"
          fill="#f2f1ec"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
        />
        <text
          x="22"
          y="4"
          fill="rgba(141,149,168,0.7)"
          fontSize="9"
          fontFamily="var(--font-mono), monospace"
          letterSpacing="1"
        >
          Imai
        </text>
      </g>

      {/* constellation edges */}
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x * 4}
          y1={nodes[a].y * 5}
          x2={nodes[b].x * 4}
          y2={nodes[b].y * 5}
          stroke="rgba(95,125,255,0.45)"
          strokeWidth={0.8}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 + i * 0.06 }}
        />
      ))}

      {/* nodes */}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x * 4}
          cy={n.y * 5}
          r={i === 0 ? 5 : 3}
          fill={i === 0 ? "#f2f1ec" : "#d2d5df"}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.6 + i * 0.05 }}
        />
      ))}

      {/* faint orbit around the head */}
      <motion.ellipse
        cx="200"
        cy="140"
        rx="120"
        ry="48"
        fill="none"
        stroke="rgba(180,195,255,0.22)"
        strokeWidth="0.6"
        strokeDasharray="2 5"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
      />
    </svg>
  );
}
