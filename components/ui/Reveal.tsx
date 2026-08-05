"use client";

import { motion, type Variants } from "framer-motion";
import { reveal as revealVariant, viewportOnce } from "@/lib/anim";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: "div" | "section" | "li" | "span" | "p";
  amount?: number;
};

export function Reveal({
  children,
  className,
  variants = revealVariant,
  delay = 0,
  amount = 0.2,
}: RevealProps) {
  const custom: Variants = {
    hidden: variants.hidden,
    visible: {
      ...(variants.visible as object),
      transition: {
        ...((variants.visible as { transition?: object }).transition ?? {}),
        delay,
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={custom}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportOnce, amount }}
    >
      {children}
    </motion.div>
  );
}

export { viewportOnce };
