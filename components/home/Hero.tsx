import { HERO } from "@/data/site";
import { HeroArt } from "./HeroArt";
import { Pill } from "@/components/ui/Pill";

export function Hero() {
  return (
    <section
      id="inicio"
      data-tone="light"
      className="relative min-h-[860px] md:min-h-[1260px]"
    >
      <HeroArt />

      {/* Carril de la copia: se queda fija mientras el arte pasa por detras. */}
      <div className="absolute inset-x-0 top-0 bottom-[160px] z-10">
        <div
          className="sticky w-full"
          style={{
            top: "max(calc(var(--header-h) + 1.5rem), calc((100svh - 26rem) / 2))",
          }}
        >
          <div className="site">
            <div className="relative mx-auto max-w-[52rem] text-center">
              {/* Halo de fondo: en vez de recortar el haz, el original
                  pone un degradado del color de pagina tras la copia. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-[70px] -bottom-[65px] left-1/2 -z-10 w-[min(960px,100vw)] -translate-x-1/2"
                style={{
                  background:
                    "radial-gradient(var(--color-bone) 20%, color-mix(in srgb, var(--color-bone) 93%, transparent) 42%, transparent 72%)",
                }}
              />

              <h1 className="display-xl text-ink">{HERO.title}</h1>

              <p className="text-ink/65 mx-auto mt-8 max-w-[33rem] text-[15px] leading-relaxed">
                {HERO.subtitle}
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Pill href={HERO.primary.href} variant="solid">
                  {HERO.primary.label}
                </Pill>
                <Pill href={HERO.secondary.href} variant="ghost">
                  {HERO.secondary.label}
                </Pill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
