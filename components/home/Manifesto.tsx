"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/anim";

const LINES = [
  { text: "No construimos software", italic: false },
  { text: "para seguir tendencias.", italic: false },
  { text: "", spacer: true },
  { text: "Construimos sistemas que aprenden,", italic: true, accent: false },
  { text: "escalan y ", italic: true, accent: false, tail: "permanecen." },
];

export function Manifesto() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const line = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.9, ease: EASE },
    },
  };

  return (
    <section className="relative overflow-hidden py-28 sm:py-40">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(100% 60% at 50% 50%, rgba(24,42,115,0.20), transparent 70%)",
        }}
      />
      <div className="container-editorial">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={line}
            className="mb-10 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-ultra-wide text-muted"
          >
            <span className="h-px w-8 bg-border-strong" />
            Manifiesto
          </motion.div>

          <h2 className="font-serif text-[clamp(2rem,6vw,5.25rem)] leading-[1.05] tracking-[-0.035em]">
            {LINES.map((l, i) =>
              l.spacer ? (
                <span key={i} className="block h-[0.6em]" />
              ) : (
                <span key={i} className="block overflow-hidden pb-[0.1em]">
                  <motion.span
                    variants={line}
                    className={`block ${l.italic ? "italic" : ""}`}
                  >
                    {l.tail ? (
                      <>
                        {l.text}
                        <span className="accent-blue">{l.tail}</span>
                      </>
                    ) : (
                      l.text
                    )}
                  </motion.span>
                </span>
              ),
            )}
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
