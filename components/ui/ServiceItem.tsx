import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/site";
import { cn } from "@/lib/utils";

type ServiceItemProps = {
  service: Service;
  className?: string;
};

export function ServiceItem({ service, className }: ServiceItemProps) {
  const Icon = service.icon;
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between border-t border-border p-7 transition-colors duration-300 sm:p-9",
        className,
      )}
    >
      {/* hover accent border on the left */}
      <span className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-primary-bright transition-all duration-[400ms] ease-editorial group-hover:w-full" />

      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.2em] text-muted">
          {service.code}
        </span>
        <span className="text-muted transition-colors duration-300 group-hover:text-primary-bright">
          <Icon className="h-6 w-6" strokeWidth={1} />
        </span>
      </div>

      <div className="mt-16 sm:mt-24">
        <h3 className="font-serif text-[2rem] leading-[1.05] tracking-[-0.02em] text-foreground transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-[2.4rem]">
          {service.title}
        </h3>
        <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted">
          {service.description}
        </p>
      </div>

      <Link
        href={service.href}
        className="mt-8 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-foreground-soft transition-colors duration-300 hover:text-primary-bright"
        aria-label={`Ver más sobre ${service.title}`}
      >
        <span className="h-px w-5 bg-border-strong transition-all duration-300 group-hover:w-8 group-hover:bg-primary-bright" />
        Explorar
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      </Link>
    </div>
  );
}
