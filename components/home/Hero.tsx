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
      <div className="absolute inset-x-0 bottom-[160px] top-0 z-10">
        <div
          className="sticky w-full"
          style={{
            top: "max(calc(var(--header-h) + 1.5rem), calc((100svh - 26rem) / 2))",
          }}
        >
          <div className="site">
            <div className="mx-auto max-w-[52rem] text-center">
              <h1 className="display-xl text-ink">{HERO.title}</h1>

              <p className="mx-auto mt-8 max-w-[33rem] text-[15px] leading-relaxed text-ink/65">
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
