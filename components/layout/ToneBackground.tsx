"use client";

import { useEffect } from "react";

/**
 * Capa de fondo fija que cruza de hueso a oliva segun el tono de la
 * seccion que ocupa el centro del viewport. Cada seccion declara su
 * tono con data-tone="light" | "dark"; ese mismo atributo cambia los
 * tokens de texto en globals.css.
 */
export function ToneBackground() {
  useEffect(() => {
    // Solo las secciones de primer nivel mandan sobre el fondo. Las islas
    // internas (por ejemplo la tarjeta oliva de contacto) tambien declaran
    // data-tone para sus textos, pero no deben tenir la pagina entera.
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main > [data-tone], footer[data-tone]",
      ),
    );
    if (sections.length === 0) return;

    const apply = () => {
      const mid = window.innerHeight / 2;
      let tone = "light";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          tone = section.dataset.tone === "dark" ? "dark" : "light";
        }
      }
      document.documentElement.dataset.pageTone = tone;
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);

    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
      delete document.documentElement.dataset.pageTone;
    };
  }, []);

  return <div className="page-bg" aria-hidden="true" />;
}
