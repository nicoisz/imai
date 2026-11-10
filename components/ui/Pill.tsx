import Link from "next/link";
import { cn } from "@/lib/utils";

type PillVariant = "solid" | "lime" | "ghost";

type PillProps = {
  href: string;
  children: React.ReactNode;
  variant?: PillVariant;
  className?: string;
};

function ArrowGlyph() {
  return (
    <span className="pill__icon" aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path
          d="M3.2 8.8 8.8 3.2M4.4 3.2h4.4v4.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Pill({
  href,
  children,
  variant = "solid",
  className,
}: PillProps) {
  const classes = cn("pill", "pill--" + variant, className);
  const inner = (
    <>
      <span>{children}</span>
      <ArrowGlyph />
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {inner}
    </a>
  );
}
