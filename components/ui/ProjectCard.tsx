"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/site";
import { TechnicalIllustration } from "@/components/ui/TechnicalIllustration";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const variant = project.id as "meridian" | "aurora" | "lumen";

  return (
    <Link
      ref={ref}
      href={project.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group block border-t border-border pt-6 outline-none",
        className,
      )}
      aria-label={`Ver proyecto ${project.name}`}
    >
      <div className="relative overflow-hidden rounded-[3px] border border-border transition-colors duration-300 group-hover:border-primary-bright">
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="h-full w-full transition-transform duration-[400ms] ease-editorial group-hover:scale-[1.025]">
            <TechnicalIllustration variant={variant} />
          </div>

          {/* overlay coordinates revealed on hover */}
          <div className="pointer-events-none absolute inset-0 bg-background/10 transition-colors duration-300 group-hover:bg-background/25" />

          <div className="absolute left-4 top-4 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-foreground/80">
            {project.catalog}
          </div>
          <div className="absolute right-4 top-4 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
            {project.year}
          </div>

          {/* technical data revealed on hover */}
          <div className="absolute inset-x-4 bottom-4 translate-y-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground-soft opacity-0 transition-all duration-[400ms] ease-editorial group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {project.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          {/* hover cursor label */}
          <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/70 bg-background/40 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            Ver
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
            {project.category}
          </p>
          <h3 className="mt-2 font-serif text-[1.75rem] leading-tight tracking-[-0.02em] text-foreground transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-[2rem]">
            {project.name}
          </h3>
          <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-muted">
            {project.description}
          </p>
        </div>
        <span className="mt-2 inline-flex shrink-0 items-center gap-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground-soft transition-colors group-hover:text-primary-bright">
          Ver proyecto
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.5}
          />
        </span>
      </div>

      {/* bottom expanding line */}
      <span className="mt-5 block h-px w-full origin-left scale-x-0 bg-border-strong transition-transform duration-[400ms] ease-editorial group-hover:scale-x-100" />
      {hovered ? null : null}
    </Link>
  );
}
