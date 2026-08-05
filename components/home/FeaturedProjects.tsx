import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PROJECTS } from "@/data/site";

export function FeaturedProjects() {
  return (
    <section id="trabajos" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-editorial">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-end">
          <Reveal>
            <SectionLabel index="§ 02">Trabajos</SectionLabel>
            <h2 className="mt-5 max-w-[18ch] font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.03em]">
              Soluciones que generan impacto
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[38ch] text-sm leading-relaxed text-muted">
              Una selección de sistemas que diseñamos y construimos junto a
              equipos que operan a gran escala.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 0.1} amount={0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <MagneticButton href="#contacto" variant="ghost">
            Conversemos sobre tu proyecto
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
