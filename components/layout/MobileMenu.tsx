"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/data/site";
import { StarMark } from "@/components/ui/StarIcon";
import { EASE } from "@/lib/anim";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const t = window.setTimeout(() => closeBtnRef.current?.focus(), 120);
      return () => {
        document.body.style.overflow = prev;
        window.clearTimeout(t);
      };
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const btn = (
    <button
      type="button"
      onClick={() => onOpenChange(!open)}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-[3px] border border-border text-foreground transition-colors hover:border-border-strong md:hidden"
    >
      {open ? (
        <X className="h-5 w-5" strokeWidth={1.5} />
      ) : (
        <Menu className="h-5 w-5" strokeWidth={1.5} />
      )}
    </button>
  );

  if (!mounted) {
    return <div className="md:hidden">{btn}</div>;
  }

  return (
    <div className="md:hidden">
      {btn}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
              onClick={() => onOpenChange(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col border-l border-border bg-surface px-6 pb-8 pt-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary-bright">
                  <StarMark className="h-3.5 w-3.5" />
                  <span className="font-serif text-lg text-foreground">
                    imai
                  </span>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => onOpenChange(false)}
                  aria-label="Cerrar menú"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[3px] border border-border text-foreground"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>

              <span className="mt-6 block h-px w-full bg-border" />

              <nav
                className="mt-6 flex flex-1 flex-col gap-1"
                aria-label="Navegación móvil"
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.07,
                      duration: 0.5,
                      ease: EASE,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => onOpenChange(false)}
                      className="flex items-baseline justify-between border-b border-border py-4 font-serif text-2xl text-foreground"
                    >
                      {link.label}
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-5">
                <Link
                  href="#contacto"
                  onClick={() => onOpenChange(false)}
                  className="flex h-12 items-center justify-center rounded-[3px] bg-foreground font-mono text-xs uppercase tracking-[0.2em] text-background"
                >
                  Hablemos
                </Link>
                <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                  <span>{SITE.location}</span>
                  <div className="flex gap-4">
                    {SOCIAL_LINKS.map((s) => (
                      <span key={s.label}>{s.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
