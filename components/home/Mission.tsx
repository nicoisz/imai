import { MISSION } from "@/data/site";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";

export function Mission() {
  return (
    <section
      data-tone="light"
      className="relative py-28 md:py-[200px]"
      aria-label="Misión"
    >
      <div className="site">
        <Reveal className="mx-auto max-w-[52rem] text-center">
          <h2 className="display-lg text-ink/70">{MISSION.statement}</h2>
          <p className="mx-auto mt-8 max-w-[32rem] text-[15px] leading-relaxed text-ink/65">
            {MISSION.subtitle}
          </p>
          <div className="mt-10 flex justify-center">
            <Pill href={MISSION.cta.href} variant="lime">
              {MISSION.cta.label}
            </Pill>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
