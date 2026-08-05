"use client";

import { motion } from "framer-motion";
import { containerParent, lineChild, EASE } from "@/lib/anim";
import { cn } from "@/lib/utils";

type AnimatedHeadingProps = {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
};

export function AnimatedHeading({
  lines,
  className,
  lineClassName,
  stagger = 0.1,
  delay = 0.15,
  once = true,
}: AnimatedHeadingProps) {
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const line = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.85, ease: EASE },
    },
  };

  return (
    <motion.h1
      className={cn("font-serif font-normal", className)}
      variants={container}
      initial="hidden"
      whileInView={once ? "visible" : undefined}
      animate={once ? undefined : "visible"}
      viewport={{ once, amount: 0.3 }}
    >
      {lines.map((content, i) => (
        <span
          key={i}
          className="block overflow-hidden pb-[0.12em] motion-reduce:overflow-visible"
        >
          <motion.span
            className={cn(
              "block will-change-transform motion-reduce:translate-y-0 motion-reduce:opacity-100",
              lineClassName,
            )}
            variants={line}
          >
            {content}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

export { containerParent, lineChild };
