import { CONVICTIONS, CONVICTIONS_INTRO } from "@/data/site";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { StickyStatement } from "./StickyStatement";

export function Convictions() {
  return (
    <section
      id="convicciones"
      data-tone="light"
      className="relative scroll-mt-24 pt-24 pb-20 md:pt-[140px] md:pb-[100px]"
    >
      <div className="site">
        {/* Portada con el titular claro pegado por delante. Al salir se
            desenfoca y le cede el relevo al titular oscuro de abajo. */}
        <StickyStatement
          text={CONVICTIONS_INTRO.statement}
          src="/bosque.jpg"
          alt="Bosque al anochecer"
        />

        <div className="mt-16 grid items-start gap-12 md:mt-24 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-20">
          {/* Se queda fija justo donde se clava el titular claro, para
              que el cambio se lea como un relevo y no como un salto. */}
          <div className="lg:sticky lg:top-[calc(50svh-2rem-54px)] lg:self-start">
            <span className="chip">{CONVICTIONS_INTRO.label}</span>
            <h2 className="display-md text-ink mt-6 max-w-xl">
              {CONVICTIONS_INTRO.statement}
            </h2>
            <p className="text-ink/70 mt-8 max-w-[40ch] text-[15px] leading-relaxed">
              {CONVICTIONS_INTRO.body}
            </p>
            <div className="mt-9">
              <Pill href={CONVICTIONS_INTRO.cta.href} variant="ghost">
                {CONVICTIONS_INTRO.cta.label}
              </Pill>
            </div>
          </div>

          {/* La separacion grande es lo que da el parallax: la columna
              de la izquierda se queda fija mientras estas pasan. */}
          <div className="flex flex-col gap-10 md:gap-16 lg:ml-[10%] lg:gap-[200px]">
            {CONVICTIONS.map((conviction, i) => {
              const Icon = conviction.icon;
              return (
                <Reveal key={conviction.title} delay={i * 0.07}>
                  <article className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                    {/* Cuadros grandes como en el original: alargan la
                        lista y dan recorrido a la columna fija. */}
                    <span className="bg-lime text-olive grid h-24 w-24 shrink-0 place-items-center rounded-2xl lg:h-[180px] lg:w-[180px]">
                      <Icon
                        size={34}
                        strokeWidth={1.3}
                        aria-hidden="true"
                        className="lg:h-[72px] lg:w-[72px]"
                      />
                    </span>
                    <div>
                      <h3 className="text-ink font-sans text-[19px] font-medium tracking-[-0.02em]">
                        {conviction.title}
                      </h3>
                      <p className="text-ink/60 mt-3 max-w-[44ch] text-[14px] leading-relaxed">
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
