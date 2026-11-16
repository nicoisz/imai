import { SERVICES, SOLUTIONS_INTRO } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function Solutions() {
  return (
    <section
      id="soluciones"
      data-tone="dark"
      className="relative scroll-mt-24 pt-20 pb-24 md:pt-[120px] md:pb-[120px]"
    >
      <div className="site">
        <Reveal>
          <span className="chip">{SOLUTIONS_INTRO.label}</span>
          <h2 className="display-lg text-fg mt-6 max-w-[22ch]">
            {SOLUTIONS_INTRO.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-3 md:mt-20 md:grid-cols-2">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.id} delay={i * 0.06}>
                <article className="card h-full p-6 md:p-8">
                  <span className="bg-lime-deep text-olive grid h-11 w-11 place-items-center rounded-xl">
                    <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="text-fg mt-7 font-sans text-[19px] font-medium tracking-[-0.02em]">
                    {service.title}
                  </h3>
                  <p className="text-muted mt-3 max-w-[46ch] text-[14px] leading-relaxed">
                    {service.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
