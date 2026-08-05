"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/data/site";
import { StarMark } from "@/components/ui/StarIcon";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { EASE } from "@/lib/anim";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "transition-all duration-500 ease-editorial",
          scrolled
            ? "border-b border-border bg-background/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-editorial flex items-center justify-between transition-all duration-500",
            scrolled ? "h-14" : "h-[76px]",
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="Imai — inicio"
          >
            <motion.span
              className="text-primary-bright"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <StarMark className="h-3.5 w-3.5" />
            </motion.span>
            <span className="font-serif text-xl tracking-[-0.02em] text-foreground">
              imai
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Principal"
          >
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative font-mono text-[0.72rem] uppercase tracking-[0.18em] transition-colors duration-300",
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-1 w-1 rounded-full bg-primary-bright transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="#contacto"
              className="group hidden items-center gap-2 rounded-[3px] bg-foreground px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-background transition-colors hover:bg-primary-bright sm:inline-flex"
            >
              Hablemos
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>

            <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
