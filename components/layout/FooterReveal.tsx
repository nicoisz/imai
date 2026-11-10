import { SITE } from "@/data/site";

/**
 * Banda fija al fondo del viewport, por detras de todo (-z-30). No se
 * mueve nunca: la descubre el contenido al terminar, porque la capa de
 * fondo se corta justo antes (ver .page-bg en globals.css).
 */
export function FooterReveal() {
  return (
    <div className="footer-reveal" aria-hidden="true">
      <span className="absolute inset-x-0 bottom-[-0.17em] block text-center font-serif text-[clamp(7rem,26vw,22rem)] font-normal leading-[0.8] tracking-[-0.06em] text-bone/90">
        {SITE.name}
      </span>
    </div>
  );
}
