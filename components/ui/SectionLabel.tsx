import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  index?: string;
  className?: string;
};

export function SectionLabel({
  children,
  index,
  className,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-ultra-wide text-muted",
        className,
      )}
    >
      {index && (
        <>
          <span className="text-foreground-soft">{index}</span>
          <span className="h-px w-6 bg-border-strong" />
        </>
      )}
      <span>{children}</span>
    </div>
  );
}
