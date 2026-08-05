"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
  icon?: ReactNode;
  showIcon?: boolean;
};

export function MagneticButton({
  children,
  href,
  variant = "primary",
  className,
  icon,
  showIcon = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.18, y: y * 0.18 });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.4 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-[3px] px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300",
        variant === "primary"
          ? "bg-foreground text-background hover:text-background"
          : "border border-border-strong text-foreground hover:border-foreground",
        className,
      )}
    >
      {/* sweeping star highlight */}
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary-bright opacity-0 transition-all duration-300 group-hover:opacity-100">
        <StarSpark className="h-2.5 w-2.5" />
      </span>
      <span className="relative z-10">{children}</span>
      {showIcon && (
        <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1">
          {icon ?? <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />}
        </span>
      )}
      <span className="pointer-events-none absolute inset-0 -z-0 translate-y-full bg-primary transition-transform duration-300 group-hover:translate-y-0" />
    </motion.a>
  );
}

function StarSpark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 1 C 12.8 8, 16 11.2, 23 12 C 16 12.8, 12.8 16, 12 23 C 11.2 16, 8 12.8, 1 12 C 8 11.2, 11.2 8, 12 1 Z" />
    </svg>
  );
}
