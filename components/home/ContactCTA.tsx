import { CONTACT } from "@/data/site";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { BeamField } from "./BeamField";

export function ContactCTA() {
  return (
    <section
      id="contacto"
      data-tone="light"
      className="relative scroll-mt-24 px-2 pb-16 md:px-[var(--gutter)] md:pb-[140px]"
    >
      <div className="mx-auto w-full max-w-[var(--container-site)]">
        <Reveal>
          <div
            data-tone="dark"
            className="bg-olive relative overflow-hidden rounded-2xl px-6 py-14 md:px-16 md:py-24"
          >
            <div
              className="text-lime/50 pointer-events-none absolute top-1/2 -right-[10%] hidden aspect-[1638/1153] w-[56%] -translate-y-1/2 md:block"
              aria-hidden="true"
            >
              <BeamField />
            </div>

            <div className="relative">
              <h2 className="display-lg text-bone max-w-[14ch]">
                {CONTACT.title}
              </h2>
              <p className="text-bone/65 mt-7 max-w-[42ch] text-[14px] leading-relaxed">
                {CONTACT.body}
              </p>
              <div className="mt-10">
                <Pill href={CONTACT.cta.href} variant="lime">
                  {CONTACT.cta.label}
                </Pill>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
