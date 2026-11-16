"use client";

import { useEffect, useRef } from "react";
import { BeamField } from "./BeamField";

/** Opacidad en reposo del haz, como el `opacity-40` del original. */
const BASE_OPACITY = 0.45;

/**
 * El arte del hero baja 1:1 con el scroll (no lleva transform propio) y
 * se desvanece. El efecto de parallax nace de que la copia queda fija
 * con position:sticky mientras esto pasa por detras.
 *
 * La caja tiene la proporcion de la escena del original (1153/1638) y
 * el lienzo va girado -90deg, asi que el haz apunta hacia arriba.
 */
export function HeroArt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () => {
      const span = Math.max(1, window.innerHeight * 0.9);
      const fade = Math.min(1, Math.max(0, window.scrollY / span));
      el.style.opacity = String(BASE_OPACITY * (1 - fade));
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
      className="text-olive pointer-events-none absolute top-[-10px] left-1/2 aspect-[1153/1638] w-[max(980px,98%)] -translate-x-1/2 will-change-[opacity]"
      style={{ opacity: BASE_OPACITY }}
      aria-hidden="true"
    >
      <BeamField rotate />
    </div>
  );
}
