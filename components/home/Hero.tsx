"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StellarDiagram } from "@/components/home/StellarDiagram";
import { EASE } from "@/lib/anim";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36">
      {/* faint background radial */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 20%, rgba(24,42,115,0.25), transparent 60%)",
        }}
      />

      <div className="container-editorial">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Left: copy */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-ultra-wide text-muted"
            >
              <span className="h-px w-8 bg-border-strong" />
              IM AI · Desarrollo de software
            </motion.p>

            <div className="mt-7">
              <AnimatedHeading
                once={false}
                stagger={0.12}
                delay={0.45}
                className="text-balance font-serif text-[clamp(3rem,8vw,8.25rem)] leading-[0.9] tracking-[-0.045em]"
                lines={[
                  "Software inteligente",
                  "para un mundo",
                  <>
                    en <span className="accent-blue italic">expansión</span>
                    <span className="accent-blue">.</span>
                  </>,
                ]}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
              className="mt-8 max-w-[52ch] text-pretty text-base leading-relaxed text-foreground-soft sm:text-lg"
            >
              Combinamos experiencia humana con inteligencia artificial para
              crear soluciones escalables, robustas y significativas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 1.05 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton href="#soluciones" variant="primary">
                Explorar soluciones
              </MagneticButton>
              <MagneticButton
                href="#trabajos"
                variant="ghost"
                showIcon={false}
                icon={<ArrowDown className="h-4 w-4" strokeWidth={1.5} />}
              >
                Ver trabajos recientes
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right: stellar diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
            className="relative order-1 lg:order-2 lg:col-span-5"
          >
            <StellarDiagram />
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.5 }}
          className="mt-16 flex items-center gap-3 border-t border-border pt-6 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted"
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
          </motion.span>
          Desplázate para explorar
        </motion.div>
      </div>
    </section>
  );
}
