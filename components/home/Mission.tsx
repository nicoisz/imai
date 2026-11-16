import { MISSION } from "@/data/site";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { LitBlock } from "@/components/ui/LitBlock";

export function Mission() {
  return (
    <section
      data-tone="light"
      className="relative py-28 md:py-[200px]"
      aria-label="Misión"
    >
      <div className="site">
        <div className="mx-auto max-w-[52rem] text-center">
          {/* Las palabras se encienden con el scroll; el titular y el
              parrafo comparten la misma cuenta, como en el original. */}
          <LitBlock
            className="text-ink"
            parts={[
              { as: "h2", className: "display-lg", text: MISSION.statement },
              {
                as: "p",
                className:
                  "mx-auto mt-6 max-w-[32rem] text-[15px] leading-relaxed",
                text: MISSION.subtitle,
              },
            ]}
          />
          <Reveal className="mt-10 flex justify-center">
            <Pill href={MISSION.cta.href} variant="lime">
              {MISSION.cta.label}
            </Pill>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
