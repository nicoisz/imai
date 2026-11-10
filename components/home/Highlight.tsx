import { HIGHLIGHT } from "@/data/site";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { DotField } from "./DotField";

export function Highlight() {
  return (
    <section
      id="trabajos"
      data-tone="dark"
      className="relative scroll-mt-24 overflow-hidden py-16 md:py-24"
    >
      <div className="site">
        <Reveal className="relative grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <span className="chip">{HIGHLIGHT.label}</span>
            <h2 className="display-lg mt-6 max-w-[12ch] text-fg">
              {HIGHLIGHT.title}
            </h2>
            <p className="mt-6 max-w-[38ch] text-[14px] leading-relaxed text-muted">
              {HIGHLIGHT.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Pill href={HIGHLIGHT.primary.href} variant="lime">
                {HIGHLIGHT.primary.label}
              </Pill>
              <Pill href={HIGHLIGHT.secondary.href} variant="ghost">
                {HIGHLIGHT.secondary.label}
              </Pill>
            </div>
          </div>

          <div
            className="pointer-events-none relative hidden h-[300px] w-full text-lime/70 md:block"
            aria-hidden="true"
          >
            <DotField />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
