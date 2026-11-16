"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * El haz ("beam") de puntos.
 *
 * La geometria son contornos elipticos anidados y tangentes en un mismo
 * vertice: el conjunto se abre por un lado y converge en punta por el
 * otro, que es la silueta del original. Cada contorno se dibuja como un
 * anillo de puntos a paso de arco constante.
 *
 * El original lo resuelve con un motor WebGL2 propio; aqui va sobre
 * canvas 2D, pero con los mismos tres gestos:
 *   - cada punto deriva y respira con su propia fase,
 *   - el cursor arrastra los anillos con parallax por profundidad
 *     (los de fuera se mueven mas que los de dentro),
 *   - y empuja los puntos que tiene cerca, que luego vuelven.
 *
 * Las constantes de parallax (0.32 en x, 0.55 en y sobre el tamano de
 * la escena) y el suavizado exponencial son los del original.
 */

/** Proporcion de la escena, ancho/alto, con el haz apuntando a +x. */
const AR = 1638 / 1153;

/** Alto de referencia en px para fijar la densidad de puntos. */
const REF_H = 1100;
/** Paso de arco entre puntos, en px a tamano de referencia. */
const SPACING = 12;

const TAU = Math.PI * 2;

/**
 * Vertice donde convergen todos los contornos, en espacio normalizado.
 * El contorno exterior va de x = APEX_X - 2*MAX_RX a x = APEX_X, asi
 * que estos valores hacen que el haz ocupe la caja casi entera.
 */
const APEX_X = 0.97;
const APEX_Y = 0.5;
const MAX_RX = 0.475;
const MAX_RY = 0.47;

/** Numero de contornos y profundidad del mas interno. */
const RINGS = 16;
const T_MIN = 0.16;

/** Cursor: radio de influencia y empuje maximo, en unidades de alto. */
const PUSH_RADIUS = 0.17;
const PUSH_MAX = 0.03;

/**
 * Fraccion del lienzo que ocupa el haz en reposo. El resto es el
 * margen por el que se mueve con el parallax: sin el, los contornos
 * exteriores se salen del lienzo y se ven cortados por los lados.
 */
const FIT = 0.84;

/** Recorrido del parallax, en fraccion de la caja del haz. */
const PARALLAX_X = 0.18;
const PARALLAX_Y = 0.22;

type Dot = {
  /** Profundidad del contorno, 0 dentro, 1 fuera. */
  t: number;
  angle: number;
  phase: number;
  swirl: number;
  breathe: number;
  jitter: number;
};

type Group = { alpha: number; size: number; dots: Dot[] };

function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** Perimetro de elipse (aproximacion de Ramanujan). */
function perimeter(a: number, b: number) {
  return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
}

function buildGroups(): Group[] {
  const random = mulberry32(20260413);
  const groups: Group[] = [
    { alpha: 0.16, size: 1.2, dots: [] },
    { alpha: 0.26, size: 1.5, dots: [] },
    { alpha: 0.38, size: 1.8, dots: [] },
    { alpha: 0.55, size: 2.1, dots: [] },
  ];

  for (let i = 0; i < RINGS; i += 1) {
    const t = T_MIN + (1 - T_MIN) * Math.pow(i / (RINGS - 1), 0.8);
    const rx = MAX_RX * t;
    const ry = MAX_RY * t;
    // El perimetro se mide en unidades de alto: rx va escalado por AR.
    const count = Math.round((perimeter(rx * AR, ry) * REF_H) / SPACING);
    if (count < 8) continue;

    const offset = random() * TAU;
    for (let j = 0; j < count; j += 1) {
      const angle = offset + (j / count) * TAU;

      // Los contornos se aclaran al acercarse al vertice: ahi se apinan
      // y, sin esto, la punta queda como un borron.
      const x = APEX_X - rx + Math.cos(angle) * rx;
      const fade = 1 - smoothstep(0.62, 0.95, x) * 0.78;

      // El cuerpo medio del haz es el que mas peso tiene.
      const depth = 0.45 + 0.55 * smoothstep(0.1, 0.8, t);
      const level = fade * depth * (0.6 + random() * 0.7);
      if (level < 0.14) continue;

      const index = level > 0.72 ? 3 : level > 0.5 ? 2 : level > 0.3 ? 1 : 0;
      groups[index].dots.push({
        t,
        angle,
        phase: random() * TAU,
        swirl: 0.1 + random() * 0.17,
        breathe: 0.07 + random() * 0.14,
        jitter: (random() - 0.5) * 0.004,
      });
    }
  }

  return groups;
}

const GROUPS = buildGroups();

type BeamFieldProps = {
  className?: string;
  /** Gira el lienzo -90deg: el haz apunta hacia arriba (hero). */
  rotate?: boolean;
};

export function BeamField({ className, rotate = false }: BeamFieldProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let color = "currentColor";
    let frame = 0;
    let onScreen = true;
    let last = 0;
    let seconds = 0;

    // Cursor: objetivo crudo, version suavizada y version con inercia
    // (la que mueve el parallax). Igual que el original.
    let hasPointer = false;
    let targetX = 0.5;
    let targetY = 0.5;
    let smoothX = 0.5;
    let smoothY = 0.5;
    let driftX = 0.5;
    let driftY = 0.5;

    const measure = () => {
      const rect = wrap.getBoundingClientRect();
      const cssW = rotate ? rect.height : rect.width;
      const cssH = rotate ? rect.width : rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = cssW;
      height = cssH;
      canvas.style.width = cssW + "px";
      canvas.style.height = cssH + "px";
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round(cssH * dpr));
      // El color lo hereda del contenedor, como `currentColor`.
      color = getComputedStyle(canvas).color;
    };

    const render = () => {
      if (width === 0 || height === 0) return;

      // La escena se encaja por "contain" y ademas se reduce a FIT,
      // para que el parallax tenga por donde moverse sin que los
      // contornos exteriores salgan del lienzo.
      const boxH = Math.min(height, width / AR) * FIT;
      const boxW = boxH * AR;
      const ox = (width - boxW) / 2;
      const oy = (height - boxH) / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;

      const pushR = PUSH_RADIUS;
      const pushR2 = pushR * pushR;

      for (const group of GROUPS) {
        ctx.globalAlpha = group.alpha;
        ctx.beginPath();
        const radius = Math.max(0.4, (group.size * boxH) / REF_H);

        for (const dot of group.dots) {
          const t = dot.t;
          const angle =
            dot.angle + Math.sin(seconds * dot.swirl + dot.phase) * 0.05;
          const grow =
            1 +
            Math.sin(seconds * dot.breathe + dot.phase) * 0.025 +
            dot.jitter;
          const rx = MAX_RX * t * grow;
          const ry = MAX_RY * t * grow;

          let nx = APEX_X - MAX_RX * t + Math.cos(angle) * rx;
          let ny = APEX_Y + Math.sin(angle) * ry;

          // Parallax por profundidad: los contornos de fuera siguen al
          // cursor mas que los de dentro.
          nx += (driftX - 0.5) * PARALLAX_X * t;
          ny += (driftY - 0.5) * PARALLAX_Y * t;

          // Empuje local alrededor del cursor. La distancia se mide en
          // unidades de alto, por eso x se corrige por AR.
          if (hasPointer) {
            const dx = (nx - driftX) * AR;
            const dy = ny - driftY;
            const d2 = dx * dx + dy * dy;
            if (d2 < pushR2 && d2 > 1e-9) {
              const d = Math.sqrt(d2);
              const falloff = 1 - d / pushR;
              const push = (falloff * falloff * PUSH_MAX) / d;
              nx += (dx * push) / AR;
              ny += dy * push;
            }
          }

          const x = ox + nx * boxW;
          const y = oy + ny * boxH;
          ctx.moveTo(x + radius, y);
          ctx.arc(x, y, radius, 0, TAU);
        }

        ctx.fill();
      }

      // Un par de contornos continuos muy tenues, como en el original.
      ctx.globalAlpha = 0.16;
      ctx.lineWidth = Math.max(0.5, boxH / 1400);
      ctx.strokeStyle = color;
      for (const t of [0.56, 1]) {
        const rx = MAX_RX * t;
        const ry = MAX_RY * t;
        const cx = ox + (APEX_X - rx + (driftX - 0.5) * PARALLAX_X * t) * boxW;
        const cy = oy + (APEX_Y + (driftY - 0.5) * PARALLAX_Y * t) * boxH;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx * boxW, ry * boxH, 0, 0, TAU);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      const dt = last === 0 ? 0 : Math.min(0.035, (now - last) / 1000);
      last = now;
      seconds += dt;

      // Dos etapas de suavizado: la primera sigue al cursor de cerca,
      // la segunda le da inercia al parallax.
      const tx = hasPointer ? targetX : 0.5;
      const ty = hasPointer ? targetY : 0.5;
      const k1 = Math.min(1, 8 * dt);
      smoothX += (tx - smoothX) * k1;
      smoothY += (ty - smoothY) * k1;
      const k2 = 1 - Math.exp(-3 * dt);
      driftX += (smoothX - driftX) * k2;
      driftY += (smoothY - driftY) * k2;

      render();
      frame = onScreen && !reduceMotion ? requestAnimationFrame(step) : 0;
    };

    const start = () => {
      if (frame === 0) {
        last = 0;
        frame = requestAnimationFrame(step);
      }
    };
    const stop = () => {
      if (frame !== 0) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    measure();
    render();
    if (!reduceMotion) start();

    const onPointerMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const u = (event.clientX - rect.left) / rect.width;
      const v = (event.clientY - rect.top) / rect.height;
      // Con el lienzo girado -90deg los ejes se intercambian.
      const nx = rotate ? 1 - v : u;
      const ny = rotate ? u : v;
      targetX = Math.min(1, Math.max(0, nx));
      targetY = Math.min(1, Math.max(0, ny));
      hasPointer = true;
    };

    const onPointerLeave = () => {
      hasPointer = false;
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
      render();
    });
    resizeObserver.observe(wrap);

    // Fuera de pantalla no gastamos cuadros.
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
        if (onScreen && !reduceMotion) start();
        else stop();
      },
      { rootMargin: "120px" },
    );
    intersectionObserver.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen && !reduceMotion) start();
    };

    // El color cambia cuando la pagina cruza de hueso a oliva.
    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName === "color") {
        color = getComputedStyle(canvas).color;
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("transitionend", onTransitionEnd);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("transitionend", onTransitionEnd);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
    };
  }, [rotate]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={
          rotate
            ? {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%) rotate(-90deg)",
              }
            : { width: "100%", height: "100%" }
        }
        role="presentation"
        aria-hidden="true"
      />
    </div>
  );
}
