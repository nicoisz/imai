import Link from "next/link";
import { cn } from "@/lib/utils";

type PillVariant = "solid" | "lime" | "ghost";

type PillProps = {
  href: string;
  children: React.ReactNode;
  variant?: PillVariant;
  className?: string;
};

/**
 * La etiqueta reserva 76px a la derecha; dentro de ese hueco vive un
 * punto de 6px. Al pasar el cursor la etiqueta encoge su padding, el
 * hueco sale de ella (margin-left de -3.25rem a 0) y el punto crece
 * hasta ser un circulo de 52px con la flecha dentro. Todo el gesto
 * esta en `.pill` (app/globals.css); aqui solo va la estructura.
 */
function Slot() {
  return (
    <span className="pill__slot" aria-hidden="true">
      <span className="pill__dot" />
      <svg
        className="pill__arrow"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
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
      <span className="pill__label">{children}</span>
      <Slot />
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
