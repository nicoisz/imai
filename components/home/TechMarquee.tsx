import { TECHNOLOGIES } from "@/data/site";

export function TechMarquee() {
  const row = [...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <section
      id="tecnologia"
      data-tone="dark"
      className="relative scroll-mt-24 py-16 md:py-24"
      aria-label="Tecnología"
    >
      <div className="site">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-14">
          <span className="chip shrink-0">Con lo que trabajamos</span>

          <div className="mask-fade-x min-w-0 flex-1 overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-12">
              {row.map((tech, i) => (
                <span
                  key={tech + i}
                  className="whitespace-nowrap font-serif text-2xl tracking-[-0.03em] text-fg/55 md:text-[28px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
