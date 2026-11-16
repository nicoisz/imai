"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Part = {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  text: string;
};

type LitBlockProps = {
  parts: Part[];
  className?: string;
};

/**
 * Texto que se enciende palabra a palabra con el scroll.
 *
 * Cada palabra sale en su propio <span> con su indice en `--i`; el
 * contenedor avanza `--lit` y el color de cada palabra se resuelve en
 * CSS con la misma formula del original (ver `.lit` en globals.css):
 * de 32% a 100% del color heredado, con una rampa de tres palabras.
 *
 * El indice es continuo entre partes, asi que el titular y el parrafo
 * se encienden como un solo bloque, igual que en reflection.ai.
 */
export function LitBlock({ parts, className }: LitBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  let cursor = 0;
  const rendered = parts.map((part, partIndex) => {
    const Tag = part.as ?? "p";
    const words = part.text.split(/\s+/).filter(Boolean);
    return (
      <Tag key={partIndex} className={part.className}>
        {words.map((word) => {
          const index = cursor;
          cursor += 1;
          return (
            <span key={index} style={{ "--i": index } as CSSProperties}>
              {word}{" "}
            </span>
          );
        })}
      </Tag>
    );
  });

  // +2 para que la ultima palabra llegue al 100% (la rampa es de 3).
  const full = cursor + 2;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--lit", String(full));
      return;
    }

    let frame = 0;

    const apply = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Empieza cuando el bloque entra en la mitad baja del viewport y
      // termina cuando llega al tercio superior.
      const start = vh * 0.72;
      const end = vh * 0.26;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      el.style.setProperty("--lit", (p * full).toFixed(3));
    };

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [full]);

  return (
    <div ref={ref} className={cn("lit", className)}>
      {rendered}
    </div>
  );
}
