import Image from "next/image";
import { CONVICTIONS, CONVICTIONS_INTRO } from "@/data/site";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";

export function Convictions() {
  return (
    <section
      id="convicciones"
      data-tone="light"
      className="relative scroll-mt-24 pb-20 pt-24 md:pb-[100px] md:pt-[140px]"
    >
      <div className="site">
        {/* Portada con duotono oliva */}
        <Reveal>
          <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-olive md:aspect-[21/9]">
            <Image
              src="/bosque.jpg"
              alt="Bosque al anochecer"
              fill
              priority={false}
              sizes="(max-width: 768px) 100vw, 1728px"
              className="object-cover opacity-80 mix-blend-luminosity [filter:grayscale(1)_contrast(1.05)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive/90 via-olive/20 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-12">
              <h2 className="display-lg max-w-[18ch] text-bone">
                {CONVICTIONS_INTRO.statement}
              </h2>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-20">
          <Reveal>
            <span className="chip">{CONVICTIONS_INTRO.label}</span>
            <p className="mt-8 max-w-[40ch] text-[15px] leading-relaxed text-ink/70">
              {CONVICTIONS_INTRO.body}
            </p>
            <div className="mt-9">
              <Pill href={CONVICTIONS_INTRO.cta.href} variant="ghost">
                {CONVICTIONS_INTRO.cta.label}
              </Pill>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10 md:gap-16">
            {CONVICTIONS.map((conviction, i) => {
              const Icon = conviction.icon;
              return (
                <Reveal key={conviction.title} delay={i * 0.07}>
                  <article className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                    <span className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-lime text-olive">
                      <Icon size={34} strokeWidth={1.3} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-sans text-[19px] font-medium tracking-[-0.02em] text-ink">
                        {conviction.title}
                      </h3>
                      <p className="mt-3 max-w-[44ch] text-[14px] leading-relaxed text-ink/60">
                        {conviction.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
