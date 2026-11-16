import { cn } from "@/lib/utils";

/**
 * Hero illustration: a seated knee extension with a range-of-motion arc.
 * Pure SVG + CSS (no image request). The lower leg moves slowly between
 * extension and flexion; with reduced motion it stays still.
 * Decorative: the information is in the page text.
 */
const KNEE = { x: 300, y: 250 };
const TICK_ANGLES = Array.from({ length: 25 }, (_, index) => index * 5); // 0°–120°
const LABEL_ANGLES = [0, 30, 60, 90, 120];

function polar(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: Math.round((KNEE.x + radius * Math.cos(radians)) * 10) / 10,
    y: Math.round((KNEE.y + radius * Math.sin(radians)) * 10) / 10,
  };
}

function arcPath(from: number, to: number, radius: number) {
  const start = polar(from, radius);
  const end = polar(to, radius);
  const largeArc = to - from > 180 ? 1 : 0;
  return `M${start.x} ${start.y} A${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export function HeroVisual({ className }: { className?: string }) {
  return (
    <figure aria-hidden="true" className={cn("relative mx-auto w-full max-w-[34rem] select-none", className)}>
      <svg viewBox="0 0 560 560" className="h-auto w-full overflow-visible">
        <defs>
          <radialGradient id="hero-stage" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#34bfd4" stopOpacity="0.16" />
            <stop offset="70%" stopColor="#34bfd4" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#34bfd4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hero-knee-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6ad7e7" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#6ad7e7" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hero-limb" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="hero-range" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6ad7e7" />
            <stop offset="100%" stopColor="#18a1b8" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <circle cx={KNEE.x} cy={KNEE.y} r="250" fill="url(#hero-stage)" />

        {/* Range-of-motion scale */}
        <g stroke="#ffffff" strokeLinecap="round">
          {TICK_ANGLES.map((angle) => {
            const major = angle % 30 === 0;
            const inner = polar(angle, 214);
            const outer = polar(angle, major ? 232 : 222);
            return (
              <line
                key={angle}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                strokeOpacity={major ? 0.45 : 0.2}
                strokeWidth={major ? 1.6 : 1}
              />
            );
          })}
        </g>
        <g fill="#ffffff" fillOpacity="0.45" fontFamily="var(--font-geist-mono), monospace" fontSize="12">
          {LABEL_ANGLES.map((angle) => {
            const point = polar(angle, 254);
            return (
              <text key={angle} x={point.x} y={point.y} textAnchor="middle" dominantBaseline="middle">
                {angle}°
              </text>
            );
          })}
        </g>
        <path
          d={arcPath(12, 92, 198)}
          fill="none"
          stroke="url(#hero-range)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Thigh */}
        <rect
          x="96"
          y="214"
          width="204"
          height="72"
          rx="36"
          fill="url(#hero-limb)"
          stroke="#ffffff"
          strokeOpacity="0.2"
        />
        <line
          x1="132"
          y1="250"
          x2="270"
          y2="250"
          stroke="#6ad7e7"
          strokeOpacity="0.25"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Lower leg — rotates around the knee */}
        <g
          className="animate-knee motion-reduce:animate-none"
          style={{ transformOrigin: `${KNEE.x}px ${KNEE.y}px`, transform: "rotate(40deg)" }}
        >
          <rect
            x="300"
            y="223"
            width="202"
            height="54"
            rx="27"
            fill="url(#hero-limb)"
            stroke="#ffffff"
            strokeOpacity="0.2"
          />
          <line
            x1="330"
            y1="250"
            x2="476"
            y2="250"
            stroke="#6ad7e7"
            strokeOpacity="0.25"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect
            x="488"
            y="168"
            width="34"
            height="86"
            rx="17"
            fill="url(#hero-limb)"
            stroke="#ffffff"
            strokeOpacity="0.2"
          />
          <circle cx="500" cy="250" r="5" fill="#6ad7e7" />
        </g>

        {/* Knee joint */}
        <circle cx={KNEE.x} cy={KNEE.y} r="70" fill="url(#hero-knee-glow)" />
        <circle cx={KNEE.x} cy={KNEE.y} r="26" fill="#07080a" stroke="#6ad7e7" strokeWidth="2" />
        <circle cx={KNEE.x} cy={KNEE.y} r="7" fill="#6ad7e7" />
      </svg>

      <figcaption className="absolute bottom-2 left-0 font-mono text-[0.6875rem] tracking-[0.14em] text-ink-400 uppercase">
        Ponazoritev · obseg gibanja kolena
      </figcaption>
    </figure>
  );
}
