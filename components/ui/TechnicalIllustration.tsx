import { cn } from "@/lib/utils";

type TechnicalIllustrationProps = {
  variant: "meridian" | "aurora" | "lumen";
  className?: string;
};

const CONFIG: Record<
  TechnicalIllustrationProps["variant"],
  { seed: number; label: string }
> = {
  meridian: { seed: 7, label: "M—01" },
  aurora: { seed: 13, label: "A—02" },
  lumen: { seed: 21, label: "L—03" },
};

function seededRand(seed: number, i: number) {
  const x = Math.sin(seed * 999 + i * 17.3) * 10000;
  return x - Math.floor(x);
}

export function TechnicalIllustration({
  variant,
  className,
}: TechnicalIllustrationProps) {
  const { seed } = CONFIG[variant];
  const stars = Array.from({ length: 46 }, (_, i) => ({
    x: seededRand(seed, i) * 100,
    y: seededRand(seed, i + 100) * 100,
    r: seededRand(seed, i + 200) * 0.7 + 0.2,
    o: seededRand(seed, i + 300) * 0.6 + 0.15,
  }));

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Ilustración técnica del proyecto"
    >
      <defs>
        <pattern
          id={`grid-${variant}`}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M20 0 L0 0 0 20"
            fill="none"
            stroke="rgba(95,125,255,0.10)"
            strokeWidth="0.5"
          />
        </pattern>
        <pattern
          id={`dither-${variant}`}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.4" fill="rgba(95,125,255,0.18)" />
          <circle cx="3" cy="3" r="0.4" fill="rgba(95,125,255,0.10)" />
        </pattern>
        <radialGradient id={`glow-${variant}`} cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="rgba(95,125,255,0.35)" />
          <stop offset="55%" stopColor="rgba(24,42,115,0.18)" />
          <stop offset="100%" stopColor="rgba(2,5,13,0)" />
        </radialGradient>
      </defs>

      <rect width="400" height="300" fill="#050914" />
      <rect width="400" height="300" fill={`url(#grid-${variant})`} />
      <rect width="400" height="300" fill={`url(#glow-${variant})`} />
      <rect width="400" height="300" fill={`url(#dither-${variant})`} />

      {/* orbital arcs */}
      <g
        fill="none"
        stroke="rgba(95,125,255,0.45)"
        strokeWidth="0.8"
        transform="translate(200 126)"
      >
        <circle r="40" />
        <ellipse rx="92" ry="44" transform="rotate(-18)" />
        <ellipse rx="150" ry="70" transform="rotate(14)" opacity="0.6" />
        <line x1="-130" y1="0" x2="130" y2="0" strokeDasharray="2 4" />
        <line x1="0" y1="-80" x2="0" y2="80" strokeDasharray="2 4" />
      </g>

      {/* central star */}
      <g transform="translate(200 126)" fill="#d2d5df">
        <circle r="3.5" />
        <circle
          r="9"
          fill="none"
          stroke="rgba(242,241,236,0.4)"
          strokeWidth="0.6"
        />
        <g stroke="rgba(242,241,236,0.5)" strokeWidth="0.6">
          <line x1="0" y1="-22" x2="0" y2="22" />
          <line x1="-22" y1="0" x2="22" y2="0" />
        </g>
      </g>

      {/* scattered stars */}
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x * 4}
          cy={s.y * 3}
          r={s.r}
          opacity={s.o}
          fill="#d2d5df"
        />
      ))}

      {/* coordinate ticks bottom */}
      <g
        fill="none"
        stroke="rgba(141,149,168,0.4)"
        strokeWidth="0.5"
        fontFamily="monospace"
        fontSize="7"
      >
        <line x1="0" y1="270" x2="400" y2="270" />
        {[0, 80, 160, 240, 320, 400].map((x) => (
          <g key={x} stroke="rgba(141,149,168,0.5)">
            <line x1={x} y1="270" x2={x} y2="276" />
          </g>
        ))}
        <text x="12" y="288" fill="rgba(141,149,168,0.7)" stroke="none">
          RA 12h 15m 09s
        </text>
        <text x="300" y="288" fill="rgba(141,149,168,0.7)" stroke="none">
          δ -58°44′
        </text>
      </g>
    </svg>
  );
}
