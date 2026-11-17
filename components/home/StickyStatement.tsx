"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ShootingStars } from "./ShootingStars";

/**
 * Portada con el titular pegado por delante.
 *
 * Replica el relevo del original: el titular claro queda fijo a media
 * pantalla mientras la imagen pasa por detras y, cuando se despega y
 * se va hacia arriba, se desenfoca y se apaga. Justo debajo, la
 * columna izquierda tiene el mismo titular en oscuro ya fijado (ver
 * Convictions), asi que uno cede el relevo al otro.
 *
 * Medido en el original: el estado fijado es blur(0px)/opacidad 1 y el
 * de salida blur(2px)/opacidad 0.6.
 */

const MAX_BLUR = 2;
const MIN_OPACITY = 0.6;
/** Recorrido en px sobre el que se completa la salida. */
const EXIT_SPAN = 140;

type StickyStatementProps = {
  text: string;
  src: string;
  alt: string;
};

export function StickyStatement({ text, src, alt }: StickyStatementProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const apply = () => {
      frame = 0;
      // Posicion en la que el sticky queda clavado, resuelta desde el
      // CSS para no duplicar el valor aqui.
      const pinned = parseFloat(getComputedStyle(el).top);
      if (!Number.isFinite(pinned)) return;

      const top = el.getBoundingClientRect().top;
      // Mientras esta clavado, top == pinned. Al despegarse hacia
      // arriba top baja y empieza la salida.
      const gone = Math.min(1, Math.max(0, (pinned - top) / EXIT_SPAN));

      el.style.filter = "blur(" + (MAX_BLUR * gone).toFixed(2) + "px)";
      el.style.opacity = String(1 - (1 - MIN_OPACITY) * gone);
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
  }, []);

  return (
    <div className="relative aspect-[13/19] w-full rounded-3xl md:aspect-[16/10] lg:aspect-[5535/3000]">
      {/* El recorte vive solo alrededor de la imagen. Si envolviera
          tambien al titular, el overflow:hidden romperia su sticky. */}
      <div className="bg-olive absolute inset-0 overflow-hidden rounded-3xl">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1728px"
          className="object-cover opacity-80 mix-blend-luminosity [filter:grayscale(1)_contrast(1.05)]"
        />
        <div className="from-olive/90 via-olive/25 absolute inset-0 bg-gradient-to-t to-transparent" />

        {/* Estrella fugaz: se dispara al entrar en pantalla y no se
            repite hasta volver a salir y entrar de nuevo. */}
        <ShootingStars />
      </div>

      {/* El carril empieza a media caja: por eso el titular se clava
          cuando la imagen ya ocupa la pantalla, no antes. */}
      <div className="absolute inset-x-0 top-[40%] bottom-0 lg:top-[calc(50%-2rem)]">
        {/* Copia visual del titular que vive en la columna de abajo:
            se oculta a lectores de pantalla para no anunciarlo dos
            veces. */}
        <p
          ref={ref}
          aria-hidden="true"
          className="text-bone display-md sticky top-[120px] max-w-xl px-6 lg:top-[calc(50svh-2rem)] lg:min-w-[576px] lg:px-[60px]"
          style={{ filter: "blur(0px)", opacity: 1 }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
