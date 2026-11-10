"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Campo de puntos animado sobre canvas 2D (sin WebGL, igual que el
 * original que imitamos). La geometria base se genera con un PRNG
 * sembrado y cada punto deriva con su propia fase, de modo que el
 * conjunto respira en vez de quedarse quieto.
 */

const VIEW = 1200;
const TAU = Math.PI * 2;

type Lobe = { cx: number; cy: number; r: number; density: number };

const LOBES: Lobe[] = [
  { cx: 596, cy: 548, r: 442, density: 1 },
  { cx: 502, cy: 414, r: 286, density: 0.64 },
  { cx: 716, cy: 648, r: 352, density: 0.78 },
  { cx: 420, cy: 702, r: 212, density: 0.5 },
  { cx: 646, cy: 318, r: 158, density: 0.4 },
  { cx: 600, cy: 592, r: 566, density: 0.3 },
];

function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Dot = {
  cx: number;
  cy: number;
  angle: number;
  radius: number;
  phase: number;
  swirl: number;
  breathe: number;
};

type Group = { size: number; alpha: number; dots: Dot[] };

function buildGroups(): Group[] {
  const random = mulberry32(20260413);
  const groups: Group[] = [
    { size: 1, alpha: 0.11, dots: [] },
    { size: 1.4, alpha: 0.18, dots: [] },
    { size: 1.9, alpha: 0.27, dots: [] },
    { size: 2.4, alpha: 0.4, dots: [] },
  ];

  for (const lobe of LOBES) {
    const rings = 52;
    for (let i = 0; i < rings; i += 1) {
      const t = i / (rings - 1);
      const radius = lobe.r * (0.42 + 0.58 * t);
      const weight = Math.exp(-Math.pow((t - 0.82) / 0.27, 2)) * lobe.density;
      const count = Math.round(((TAU * radius) / 8.5) * weight);
      if (count < 3) continue;

      const offset = random() * TAU;
      for (let j = 0; j < count; j += 1) {
        const angle = offset + (j / count) * TAU + (random() - 0.5) * 0.09;
        const rr = radius + (random() - 0.5) * 7;
        const level = weight * (0.65 + random() * 0.6);
        const index = level > 0.82 ? 3 : level > 0.58 ? 2 : level > 0.34 ? 1 : 0;

        groups[index].dots.push({
          cx: lobe.cx,
          cy: lobe.cy,
          angle,
          radius: rr,
          phase: random() * TAU,
          swirl: 0.1 + random() * 0.17,
          breathe: 0.07 + random() * 0.14,
        });
      }
    }
  }

  return groups;
}

const GROUPS = buildGroups();

export function DotField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let color = "currentColor";
    let frame = 0;
    let onScreen = true;
    const started = performance.now();

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      // El color lo hereda del contenedor via la propiedad CSS `color`,
      // igual que hacia la version en SVG con currentColor.
      color = getComputedStyle(canvas).color;
    };

    const render = (now: number) => {
      const seconds = reduceMotion ? 0 : (now - started) / 1000;
      const scale = Math.min(width, height) / VIEW;
      const ox = (width - VIEW * scale) / 2;
      const oy = (height - VIEW * scale) / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;

      for (const group of GROUPS) {
        ctx.globalAlpha = group.alpha;
        ctx.beginPath();
        const dotRadius = Math.max(0.35, group.size * scale);
        for (const dot of group.dots) {
          const angle =
            dot.angle + Math.sin(seconds * dot.swirl + dot.phase) * 0.055;
          const radius =
            dot.radius *
            (1 + Math.sin(seconds * dot.breathe + dot.phase) * 0.028);
          const x = ox + (dot.cx + Math.cos(angle) * radius) * scale;
          const y = oy + (dot.cy + Math.sin(angle) * radius) * scale;
          ctx.moveTo(x + dotRadius, y);
          ctx.arc(x, y, dotRadius, 0, TAU);
        }
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      render(now);
      frame = onScreen && !reduceMotion ? requestAnimationFrame(loop) : 0;
    };

    const start = () => {
      if (frame === 0) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (frame !== 0) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    measure();
    render(performance.now());
    if (!reduceMotion) start();

    const resizeObserver = new ResizeObserver(() => {
      measure();
      render(performance.now());
    });
    resizeObserver.observe(canvas);

    // Fuera de pantalla no gastamos cuadros.
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
        if (onScreen && !reduceMotion) start();
        else stop();
      },
      { rootMargin: "120px" },
    );
    intersectionObserver.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen && !reduceMotion) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={cn("block h-full w-full", className)}
      role="presentation"
      aria-hidden="true"
    />
  );
}
