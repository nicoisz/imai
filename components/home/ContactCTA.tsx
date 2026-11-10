import { CONTACT } from "@/data/site";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { DotField } from "./DotField";

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
            className="relative overflow-hidden rounded-2xl bg-olive px-6 py-14 md:px-16 md:py-24"
          >
            <div
              className="pointer-events-none absolute -right-[12%] top-1/2 hidden aspect-square w-[52%] -translate-y-1/2 text-lime/50 md:block"
              aria-hidden="true"
            >
              <DotField />
            </div>

            <div className="relative">
              <h2 className="display-lg max-w-[14ch] text-bone">{CONTACT.title}</h2>
              <p className="mt-7 max-w-[42ch] text-[14px] leading-relaxed text-bone/65">
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
