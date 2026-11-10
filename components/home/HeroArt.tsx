"use client";

import { useEffect, useRef } from "react";
import { DotField } from "./DotField";

/** Aclara el centro del campo de puntos para que la copia respire. */
const MASK =
  "radial-gradient(58% 48% at 50% 44%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.5) 45%, #000 78%)";

/**
 * El arte del hero baja 1:1 con el scroll (no lleva transform propio) y
 * se desvanece. El efecto de parallax nace de que la copia queda fija
 * con position:sticky mientras esto pasa por detras.
 */
export function HeroArt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () => {
      const span = Math.max(1, window.innerHeight * 0.9);
      const fade = Math.min(1, Math.max(0, window.scrollY / span));
      el.style.opacity = String(1 - fade);
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);

    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute left-1/2 top-[-10%] w-[min(1240px,158vw)] -translate-x-1/2 text-olive will-change-[opacity]"
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
      aria-hidden="true"
    >
      <div className="aspect-square w-full">
        <DotField />
      </div>
    </div>
  );
}
