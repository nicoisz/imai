"use client";

import { useEffect, useRef, useState } from "react";

type StarSpec = {
  x: number;
  y: number;
  r: number;
  o: number;
  tw: number;
  td: number;
};

const STARS: StarSpec[] = Array.from({ length: 70 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 91.7 + n * 13.1) * 10000;
    return x - Math.floor(x);
  };
  return {
    x: r(1) * 100,
    y: r(2) * 100,
    r: r(3) * 0.9 + 0.25,
    o: r(4) * 0.5 + 0.2,
    tw: r(5) * 4 + 3,
    td: r(6) * 3,
  };
});

export function StarfieldBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      for (const s of STARS) {
        const twinkle = 0.5 + 0.5 * Math.sin((t / s.tw + s.td) * Math.PI * 2);
        ctx.globalAlpha = s.o * (0.5 + twinkle * 0.5);
        ctx.fillStyle = "#f2f1ec";
        ctx.beginPath();
        ctx.arc((s.x / 100) * w, (s.y / 100) * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        aria-hidden="true"
      >
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-foreground"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.r * 2}px`,
              height: `${s.r * 2}px`,
              opacity: s.o,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-full opacity-60"
      aria-hidden="true"
    />
  );
}
