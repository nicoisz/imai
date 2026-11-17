"use client";

import { useEffect, useRef } from "react";
import { SphereField } from "./SphereField";

/**
 * El arte del hero baja 1:1 con el scroll (no lleva transform propio) y
 * se desvanece. El efecto de parallax nace de que la copia queda fija
 * con position:sticky mientras esto pasa por detras.
 *
 * La escena es ahora un campo de esferas de borde a borde: se reparte
 * por toda la seccion y reacciona al cursor con parallax, empuje y
 * crecimiento cerca del puntero.
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
      className="text-olive pointer-events-none absolute inset-0 will-change-[opacity]"
      aria-hidden="true"
    >
      <SphereField />
    </div>
  );
}
