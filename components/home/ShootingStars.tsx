"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Estrella fugaz que cruza el cielo de la portada.
 *
 * Se dispara cuando la portada entra en pantalla, una sola vez por
 * pasada: una o dos estrellas, nunca mas. Al salir de la vista se
 * desarman y se limpian, asi que al volver a pasar por la imagen
 * vuelven a aparecer.
 *
 * La estrella es una linea con degradado (la cola) y un punto brillante
 * al final (la cabeza). El contenedor va girado y la animacion empuja
 * la linea a lo largo de ese eje.
 */

type Star = {
  id: number;
  /** Punto de partida dentro de la portada, en porcentaje. */
  left: number;
  top: number;
  /** Direccion, recorrido y duracion. */
  angle: number;
  length: number;
  travel: number;
  duration: number;
  delay: number;
};

/** Fraccion visible a partir de la cual se dispara. */
const TRIGGER_RATIO = 0.15;

function buildStar(id: number, delay: number): Star {
  return {
    id,
    left: 8 + Math.random() * 56,
    top: 2 + Math.random() * 26,
    angle: 15 + Math.random() * 22,
    length: 110 + Math.random() * 120,
    travel: 200 + Math.random() * 190,
    duration: 1100 + Math.random() * 700,
    delay,
  };
}

export function ShootingStars() {
  const ref = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let armed = true;
    let visible = false;
    let scrolled = false;
    let timers: number[] = [];

    const clearTimers = () => {
      for (const timer of timers) window.clearTimeout(timer);
      timers = [];
    };

    const shoot = () => {
      // Una pasada por entrada: si ya se disparo, espera a salir y
      // volver a entrar.
      if (!armed || !visible || !scrolled) return;
      armed = false;

      const count = Math.random() < 0.5 ? 1 : 2;
      const batch: Star[] = [];
      for (let i = 0; i < count; i += 1) {
        batch.push(
          buildStar(
            nextId.current++,
            i === 0 ? 120 : 420 + Math.random() * 520,
          ),
        );
      }
      setStars((prev) => [...prev, ...batch]);

      const life =
        Math.max(...batch.map((star) => star.delay + star.duration)) + 250;
      timers.push(
        window.setTimeout(() => {
          setStars((prev) =>
            prev.filter((star) => !batch.some((done) => done.id === star.id)),
          );
        }, life),
      );
    };

    const arm = () => {
      visible = false;
      armed = true;
      clearTimers();
      setStars([]);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (!entry.isIntersecting) {
          // Fuera de la vista: se rearma para la proxima pasada.
          arm();
          return;
        }

        visible = entry.intersectionRatio > TRIGGER_RATIO;
        if (visible) shoot();
      },
      { threshold: [0, TRIGGER_RATIO] },
    );
    observer.observe(el);

    const onScroll = () => {
      scrolled = true;
      if (visible) shoot();
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      clearTimers();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            transform: `rotate(${star.angle}deg)`,
            transformOrigin: "left center",
          }}
        >
          <span
            className="shooting-star"
            style={
              {
                width: `${star.length}px`,
                animationDuration: `${star.duration}ms`,
                animationDelay: `${star.delay}ms`,
                "--star-travel": `${star.travel}px`,
              } as CSSProperties
            }
          />
        </div>
      ))}
    </div>
  );
}
