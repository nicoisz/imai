"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { STELLAR_META } from "@/data/site";
import { EASE } from "@/lib/anim";

const CENTER = 300;

function Ring({
  r,
  delay,
  className,
  dashed,
  rotate,
}: {
  r: number;
  delay: number;
  className?: string;
  dashed?: boolean;
  rotate?: string;
}) {
  return (
    <motion.circle
      cx={CENTER}
      cy={CENTER}
      r={r}
      fill="none"
      stroke="rgba(180,195,255,0.22)"
      strokeWidth={0.6}
      strokeDasharray={dashed ? "2 5" : undefined}
      className={className}
      style={
        rotate ? { transformOrigin: `${CENTER}px ${CENTER}px` } : undefined
      }
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  );
}

const RADIAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

const ORBIT_POINTS = [
  { ring: 90, angle: 35, label: "δ Cru", delay: 1.2 },
  { ring: 150, angle: 200, label: "HD 106490", delay: 1.4 },
  { ring: 220, angle: 110, delay: 1.6 },
  { ring: 290, angle: 300, delay: 1.8 },
];

export function StellarDiagram({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function onMove(e: MouseEvent) {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setPointer({ x, y });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const px = (depth: number) => pointer.x * depth;
  const py = (depth: number) => pointer.y * depth;

  return (
    <div
      ref={wrapRef}
      className={
        "relative mx-auto aspect-square w-full max-w-[560px] select-none " +
        (className ?? "")
      }
    >
      {/* background grid ring */}
      <svg
        viewBox="0 0 600 600"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="stellar-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(95,125,255,0.55)" />
            <stop offset="35%" stopColor="rgba(52,93,255,0.18)" />
            <stop offset="100%" stopColor="rgba(2,5,13,0)" />
          </radialGradient>
        </defs>

        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r="290"
          fill="url(#stellar-glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />

        {/* coordinate cross lines */}
        {RADIAL_ANGLES.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = CENTER + Math.cos(rad) * 295;
          const y = CENTER + Math.sin(rad) * 295;
          return (
            <motion.line
              key={deg}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="rgba(180,195,255,0.10)"
              strokeWidth={0.5}
              strokeDasharray="1 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            />
          );
        })}

        {/* parallax: rings layer */}
        <motion.g
          animate={{ x: px(8), y: py(8) }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        >
          <Ring r={90} delay={0.4} />
          <Ring r={150} delay={0.55} dashed />
          {/* slow rotating dashed ring */}
          <g
            className="animate-spin-slow"
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          >
            <Ring r={220} delay={0.7} dashed />
          </g>
          <Ring r={290} delay={0.85} />

          {/* tick marks on outer ring */}
          {Array.from({ length: 48 }).map((_, i) => {
            const a = (i / 48) * Math.PI * 2;
            const inner = 286;
            const outer = i % 4 === 0 ? 296 : 292;
            return (
              <line
                key={i}
                x1={CENTER + Math.cos(a) * inner}
                y1={CENTER + Math.sin(a) * inner}
                x2={CENTER + Math.cos(a) * outer}
                y2={CENTER + Math.sin(a) * outer}
                stroke="rgba(141,149,168,0.4)"
                strokeWidth={0.6}
              />
            );
          })}

          {/* orbit data points */}
          {ORBIT_POINTS.map((p, i) => {
            const a = (p.angle * Math.PI) / 180;
            const x = CENTER + Math.cos(a) * p.ring;
            const y = CENTER + Math.sin(a) * p.ring;
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: p.delay }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                <circle cx={x} cy={y} r={2.4} fill="#d2d5df" />
                <circle
                  cx={x}
                  cy={y}
                  r={6}
                  fill="none"
                  stroke="rgba(210,213,223,0.4)"
                  strokeWidth={0.5}
                />
                {p.label && (
                  <text
                    x={x + 12}
                    y={y + 3}
                    fill="rgba(141,149,168,0.85)"
                    fontSize="9"
                    fontFamily="var(--font-mono), monospace"
                    letterSpacing="1"
                  >
                    {p.label}
                  </text>
                )}
              </motion.g>
            );
          })}
        </motion.g>
      </svg>

      {/* central star — separate SVG so it can pulse independently */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ x: px(4), y: py(4) }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="relative h-[120px] w-[120px]"
        >
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 120 120"
              className="h-full w-full"
              aria-hidden="true"
            >
              <g
                stroke="rgba(242,241,236,0.5)"
                strokeWidth="0.6"
                strokeLinecap="round"
              >
                <line x1="60" y1="6" x2="60" y2="114" />
                <line x1="6" y1="60" x2="114" y2="60" />
                <line x1="22" y1="22" x2="98" y2="98" opacity="0.5" />
                <line x1="98" y1="22" x2="22" y2="98" opacity="0.5" />
              </g>
              <path
                d="M60 16 C 64 50, 70 56, 104 60 C 70 64, 64 70, 60 104 C 56 70, 50 64, 16 60 C 50 56, 56 50, 60 16 Z"
                fill="#f2f1ec"
              />
              <circle cx="60" cy="60" r="4" fill="#5f7dff" opacity="0.9" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* technical metadata labels */}
      <div className="pointer-events-none absolute inset-0 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
        <Label className="left-2 top-2 sm:left-0 sm:top-0">
          <span className="text-foreground-soft">{STELLAR_META.name}</span>
        </Label>
        <Label className="right-2 top-8 text-right sm:right-0">
          {STELLAR_META.bayer}
        </Label>
        <Label className="bottom-10 left-2 sm:bottom-12 sm:left-0">
          {STELLAR_META.temperature}
        </Label>
        <Label className="bottom-2 right-2 text-right sm:bottom-0 sm:right-0">
          {STELLAR_META.luminosity}
        </Label>
        <Label className="left-1/2 top-1/2 hidden -translate-x-[calc(50%+150px)] text-foreground-soft lg:block">
          {STELLAR_META.catalog}
        </Label>
      </div>
    </div>
  );
}

function Label({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={"absolute " + className}>
      <span className="mr-2 inline-block h-1 w-1 translate-y-[-2px] rounded-full bg-primary-bright" />
      {children}
    </span>
  );
}
