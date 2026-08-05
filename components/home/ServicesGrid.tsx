import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceItem } from "@/components/ui/ServiceItem";
import { SERVICES } from "@/data/site";

export function ServicesGrid() {
  return (
    <section id="soluciones" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-editorial">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-end">
          <Reveal>
            <SectionLabel index="§ 01">Soluciones</SectionLabel>
            <h2 className="mt-5 max-w-[16ch] font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.03em]">
              Cuatro disciplinas, un mismo rigor.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[40ch] text-sm leading-relaxed text-muted">
              Trabajamos de extremo a extremo: desde la primera línea de código
              hasta la operación en producción.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.08} amount={0.15}>
              <ServiceItem
                service={service}
                className={i % 2 === 1 ? "sm:border-l" : ""}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
