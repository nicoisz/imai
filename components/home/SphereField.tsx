"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Campo de esferas del hero.
 *
 * Sustituye el haz por una nube de esferas repartidas por toda la
 * primera seccion. Las esferas ondulan juntas, como una corriente lenta,
 * y al mover el cursor reaccionan con tres gestos a la vez:
 *   - parallax por profundidad (las de delante recorren mas),
 *   - un empuje suave alrededor del puntero, como si apartara el aire,
 *   - un leve crecimiento cerca del cursor, el efecto de una lente.
 *
 * La geometria vive en un canvas 2D. Cada esfera es un sprite ya
 * sombreado (luz arriba a la izquierda, borde en penumbra y un punto
 * especular) que se dibuja escalado, asi que el coste por cuadro no
 * crece con el radio.
 */

const TAU = Math.PI * 2;

/** Lado menor de referencia para escalar tamanos y recorridos. */
const REF_SIZE = 900;

/** Poblacion maxima del campo; el resto se muestrea por area. */
const MAX_SPHERES = 300;

/** Area que corresponde a una esfera: fija la densidad en cualquier
 *  viewport. */
const AREA_PER_SPHERE = 9200;

/** Recorrido del parallax, en px a tamano de referencia. */
const PARALLAX_X = 90;
const PARALLAX_Y = 60;

/** Radio de influencia del cursor y empuje maximo, en px. */
const PUSH_RADIUS = 115;
const PUSH_DEPTH = 120;
const PUSH_MAX = 26;

type Rgb = [number, number, number];

type Sphere = {
  /** Posicion en reposo, normalizada sobre la seccion. */
  nx: number;
  ny: number;
  /** Profundidad: 0 al fondo, 1 delante. */
  z: number;
  /** Radio en px a tamano de referencia. */
  r: number;
  /** Indice de tono: oliva, lima o lila. */
  tone: 0 | 1 | 2;
  alpha: number;
  /** Amplitud, velocidad y desfase de la deriva. */
  amp: number;
  speed: number;
  phase: number;
  /** Retardo de entrada, en segundos. */
  delay: number;
  /** Desvanecido por orillas y por la zona de la copia. */
  mask: number;
  flat: boolean;
};

const WHITE: Rgb = [255, 255, 255];
const BLACK: Rgb = [0, 0, 0];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function fract(value: number) {
  return value - Math.floor(value);
}

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

function mix(a: Rgb, b: Rgb, k: number): Rgb {
  return [
    Math.round(a[0] + (b[0] - a[0]) * k),
    Math.round(a[1] + (b[1] - a[1]) * k),
    Math.round(a[2] + (b[2] - a[2]) * k),
  ];
}

function css(color: Rgb, alpha = 1) {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

/** Acepta `rgb()/rgba()` y `#rrggbb`; si no, devuelve el respaldo. */
function parseColor(value: string, fallback: Rgb): Rgb {
  const hex = value.trim().replace("#", "");
  if (/^[0-9a-f]{6}$/i.test(hex)) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }
  const parts = value.match(/\d+(\.\d+)?/g);
  if (!parts || parts.length < 3) return fallback;
  return [Number(parts[0]), Number(parts[1]), Number(parts[2])];
}

/**
 * Esfera sombreada en un sprite de 128 px. Se dibuja con recorte
 * circular: el borde queda limpio y el degradado hace el volumen.
 */
function makeSprite(base: Rgb, size = 128) {
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const g = sprite.getContext("2d");
  if (!g) return sprite;

  const c = size / 2;
  const radius = c - 1;

  g.save();
  g.beginPath();
  g.arc(c, c, radius, 0, TAU);
  g.clip();

  const body = g.createRadialGradient(
    c * 0.72,
    c * 0.64,
    radius * 0.05,
    c,
    c,
    radius * 1.1,
  );
  body.addColorStop(0, css(mix(base, WHITE, 0.46)));
  body.addColorStop(0.34, css(mix(base, WHITE, 0.1)));
  body.addColorStop(0.72, css(base));
  body.addColorStop(0.93, css(mix(base, BLACK, 0.36)));
  body.addColorStop(1, css(mix(base, BLACK, 0.5)));
  g.fillStyle = body;
  g.fillRect(0, 0, size, size);

  // Punto especular: pequeno y descentrado hacia la luz.
  const spec = g.createRadialGradient(
    c * 0.66,
    c * 0.58,
    0,
    c * 0.66,
    c * 0.58,
    radius * 0.3,
  );
  spec.addColorStop(0, css(WHITE, 0.6));
  spec.addColorStop(0.45, css(WHITE, 0.14));
  spec.addColorStop(1, css(WHITE, 0));
  g.fillStyle = spec;
  g.fillRect(0, 0, size, size);

  // Luz reflejada en el borde opuesto, muy tenue.
  const bounce = g.createRadialGradient(
    c * 1.36,
    c * 1.34,
    0,
    c * 1.36,
    c * 1.34,
    radius * 0.95,
  );
  bounce.addColorStop(0, css(mix(base, WHITE, 0.38), 0.4));
  bounce.addColorStop(1, css(mix(base, WHITE, 0.38), 0));
  g.fillStyle = bounce;
  g.fillRect(0, 0, size, size);

  g.restore();
  return sprite;
}

/**
 * Reparte las esferas con la secuencia R2 (cuasi-aleatoria de baja
 * discrepancia): cubre la seccion de forma pareja, sin grumos ni
 * huecos, y es estable entre recargas.
 */
function buildLayout(): Sphere[] {
  const random = mulberry32(20261116);
  const spheres: Sphere[] = [];

  for (let i = 0; i < MAX_SPHERES; i += 1) {
    const nx = clamp(
      fract(0.37 + i * 0.7548776662466927) + (random() - 0.5) * 0.03,
      0.01,
      0.99,
    );
    const ny = clamp(
      fract(0.61 + i * 0.5698402909980532) + (random() - 0.5) * 0.03,
      0.01,
      0.99,
    );
    const z = Math.pow(random(), 1.35);

    // Gradiente de escala: las esferas crecen hacia la esquina inferior
    // izquierda. Da profundidad y enmarca la copia, que va centrada.
    const bias = 0.72 + 0.55 * (1 - nx) * (0.35 + 0.65 * ny);

    const roll = random();
    let r: number;
    if (roll > 0.95) r = 17 + random() * 12;
    else if (roll > 0.8) r = 9 + random() * 7;
    else if (roll > 0.45) r = 4.6 + random() * 4.4;
    else r = 2.2 + random() * 2.4;
    r *= bias;

    // Las grandes van mas transparentes: son fondo, no confeti.
    const weight = r > 16 ? 0.42 : r > 8 ? 0.6 : r > 4 ? 0.9 : 1;
    const alpha = (0.24 + random() * 0.3) * weight;

    const toneRoll = random();
    const tone: 0 | 1 | 2 = toneRoll > 0.95 ? 1 : toneRoll > 0.9 ? 2 : 0;

    // La copia del hero se queda despejada: un ovalo central resta
    // presencia a las esferas que caen justo detras del titular.
    const dx = (nx - 0.5) / 0.3;
    const dy = (ny - 0.36) / 0.22;
    const copyMask = 0.18 + 0.82 * smoothstep(0.7, 1.55, Math.hypot(dx, dy));

    const edgeX = smoothstep(0, 0.022, Math.min(nx, 1 - nx));
    const edgeY = smoothstep(0, 0.045, ny) * (1 - smoothstep(0.945, 1, ny));

    spheres.push({
      nx,
      ny,
      z,
      r,
      tone,
      alpha,
      amp: Math.min(22, 3 + 12 * z + r * 0.45),
      speed: 0.06 + random() * 0.22,
      phase: random() * TAU,
      delay: 0.1 + random() * 0.9,
      mask: copyMask * edgeX * edgeY,
      flat: r < 2,
    });
  }

  return spheres;
}

const LAYOUT = buildLayout();

type SphereFieldProps = {
  className?: string;
};

export function SphereField({ className }: SphereFieldProps) {
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

    const styles = getComputedStyle(canvas);
    const rootStyles = getComputedStyle(document.documentElement);
    const tones: Rgb[] = [
      parseColor(styles.color, [30, 50, 7]),
      parseColor(rootStyles.getPropertyValue("--color-lime"), [220, 239, 84]),
      parseColor(rootStyles.getPropertyValue("--color-lilac"), [201, 189, 240]),
    ];
    const sprites = tones.map((tone) => makeSprite(tone));
    const flats = tones.map((tone) => css(tone));
    const toneCount = tones.length;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let scale = 1;
    let visible: Sphere[] = [];
    let frame = 0;
    let onScreen = true;
    let last = 0;
    let seconds = 0;
    let scrollProgress = 0;

    // Cursor: objetivo crudo, version suavizada y version con inercia.
    let pointerOn = false;
    let lastPointer = { x: 0, y: 0 };
    let targetX = 0.5;
    let targetY = 0.5;
    let smoothX = 0.5;
    let smoothY = 0.5;
    let driftX = 0.5;
    let driftY = 0.5;

    const measure = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      scale = clamp(Math.min(width, height) / REF_SIZE, 0.6, 1.6);

      // Se elige un subconjunto del reparto fijo tomando uno de cada
      // `stride`: la densidad baja, la composicion no cambia.
      const count = Math.round(
        clamp((width * height) / AREA_PER_SPHERE, 72, MAX_SPHERES),
      );
      const stride = LAYOUT.length / Math.min(count, LAYOUT.length);
      visible = [];
      for (let i = 0; i < count && i < LAYOUT.length; i += 1) {
        visible.push(LAYOUT[Math.round(i * stride) % LAYOUT.length]);
      }
      // De atras hacia delante: las grandes y cercanas tapan a las
      // pequenas del fondo.
      visible.sort((a, b) => a.z - b.z);

      syncPointer();
      updateScroll();
    };

    const syncPointer = () => {
      if (!pointerOn) return;
      const rect = wrap.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      targetX = clamp((lastPointer.x - rect.left) / rect.width, -0.15, 1.15);
      targetY = clamp((lastPointer.y - rect.top) / rect.height, -0.15, 1.15);
    };

    const updateScroll = () => {
      const rect = wrap.getBoundingClientRect();
      scrollProgress = clamp(-rect.top / Math.max(1, rect.height), 0, 1);
    };

    const render = (t: number) => {
      if (width === 0 || height === 0) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const px = (pointerOn ? driftX : 0.5) * width;
      const py = (pointerOn ? driftY : 0.5) * height;
      const parX = (driftX - 0.5) * PARALLAX_X * scale;
      const parY = (driftY - 0.5) * PARALLAX_Y * scale;

      for (const sphere of visible) {
        const intro = reduceMotion
          ? 1
          : smoothstep(0, 1, (t - sphere.delay) / 0.9);
        if (intro <= 0.001) continue;

        // Deriva coherente: la fase nace de la posicion, asi que las
        // esferas vecinas ondulan juntas como una corriente lenta.
        const wave = t * (0.18 + sphere.speed * 0.5);
        const wanderX =
          Math.sin(wave + sphere.ny * 3.2 + sphere.phase * 0.25) *
          sphere.amp *
          scale;
        const wanderY =
          Math.cos(wave * 0.82 + sphere.nx * 2.9 + sphere.phase * 0.25) *
          sphere.amp *
          0.8 *
          scale;

        // Parallax y deriva de scroll comparten la profundidad.
        const depth = 0.15 + 0.85 * sphere.z;
        let x = sphere.nx * width + wanderX + parX * depth;
        let y =
          sphere.ny * height +
          wanderY +
          parY * depth -
          scrollProgress * (10 + 58 * sphere.z) * scale;

        let near = 0;
        if (pointerOn) {
          const radius = (PUSH_RADIUS + PUSH_DEPTH * sphere.z) * scale;
          const dx = x - px;
          const dy = y - py;
          const dist = Math.hypot(dx, dy);
          if (dist < radius && dist > 0.001) {
            near = 1 - dist / radius;
            const push = near * near * (PUSH_MAX + 30 * sphere.z) * scale;
            x += (dx / dist) * push;
            y += (dy / dist) * push;
          }
        }

        const radius =
          sphere.r * scale * (0.55 + 0.45 * intro) * (1 + 0.34 * near * near);
        const alpha = Math.min(
          1,
          sphere.alpha * sphere.mask * intro * (1 + 0.55 * near * near),
        );
        if (alpha <= 0.004 || radius <= 0.3) continue;

        ctx.globalAlpha = alpha;

        if (sphere.flat || radius < 2) {
          ctx.fillStyle = flats[sphere.tone % toneCount];
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, TAU);
          ctx.fill();
        } else {
          const size = radius * 2;
          ctx.drawImage(
            sprites[sphere.tone % toneCount],
            x - radius,
            y - radius,
            size,
            size,
          );
        }
      }

      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      const dt = last === 0 ? 0 : Math.min(0.035, (now - last) / 1000);
      last = now;
      seconds += dt;

      const tx = pointerOn ? targetX : 0.5;
      const ty = pointerOn ? targetY : 0.5;
      const k1 = Math.min(1, 6 * dt);
      smoothX += (tx - smoothX) * k1;
      smoothY += (ty - smoothY) * k1;
      const k2 = 1 - Math.exp(-2.6 * dt);
      driftX += (smoothX - driftX) * k2;
      driftY += (smoothY - driftY) * k2;

      render(seconds);
      frame = onScreen ? requestAnimationFrame(step) : 0;
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

    if (reduceMotion) {
      render(2.5);
    } else {
      start();
    }

    const onPointerMove = (event: PointerEvent) => {
      lastPointer.x = event.clientX;
      lastPointer.y = event.clientY;
      pointerOn = true;
      syncPointer();
    };

    const onPointerLeave = () => {
      pointerOn = false;
    };

    const onScroll = () => {
      updateScroll();
      syncPointer();
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
      if (reduceMotion) render(2.5);
    });
    resizeObserver.observe(wrap);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
        if (onScreen && !reduceMotion) start();
        else stop();
      },
      { rootMargin: "200px" },
    );
    intersectionObserver.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen && !reduceMotion) start();
    };

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("blur", onPointerLeave);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{ width: "100%", height: "100%" }}
        role="presentation"
        aria-hidden="true"
      />
    </div>
  );
}
