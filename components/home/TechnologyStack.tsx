"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TECHNOLOGIES } from "@/data/site";
import { EASE } from "@/lib/anim";

export function TechnologyStack() {
  return (
    <section id="tecnologia" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-editorial">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-end">
          <Reveal>
            <SectionLabel index="§ 04">Tecnología</SectionLabel>
            <h2 className="mt-5 max-w-[18ch] font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.03em]">
              Herramientas que dominamos.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[36ch] text-sm leading-relaxed text-muted">
              Una pila moderna y probada. Elegimos cada pieza por su solidez, no
              por su tendencia.
            </p>
          </Reveal>
        </div>

        <div className="mt-2 overflow-hidden rounded-[3px] border border-border">
          {/* Header row */}
          <div className="hidden grid-cols-12 border-b border-border bg-surface px-6 py-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted sm:grid">
            <span className="col-span-1">#</span>
            <span className="col-span-6">Tecnología</span>
            <span className="col-span-3">Categoría</span>
            <span className="col-span-2 text-right">Coordenada</span>
          </div>

          {TECHNOLOGIES.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: EASE, delay: (i % 6) * 0.05 }}
              className="group grid grid-cols-12 items-center border-b border-border px-6 py-4 transition-colors duration-300 last:border-b-0 hover:bg-surface"
            >
              <span className="col-span-2 font-mono text-[0.62rem] tracking-[0.2em] text-muted sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-10 font-serif text-xl text-foreground transition-colors duration-300 group-hover:text-primary-bright sm:col-span-6 sm:text-2xl">
                {tech.name}
              </span>
              <span className="col-span-6 mt-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted sm:col-span-3 sm:mt-0">
                {tech.category}
              </span>
              <span className="col-span-6 mt-1 text-right font-mono text-[0.62rem] tracking-[0.1em] text-muted sm:col-span-2 sm:mt-0">
                {coord(i)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function coord(i: number) {
  const a = ((i * 37) % 360).toString().padStart(3, "0");
  const b = (((i * 53) % 90) + 10).toString().padStart(2, "0");
  return `${a}° · ${b}′`;
}
