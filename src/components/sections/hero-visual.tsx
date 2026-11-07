import { StatusPill } from "@/components/ui/badge";
import { LayersIcon, ShieldCheckIcon } from "@/components/ui/icons";

/**
 * Abstract medtech hero composition (pure SVG + CSS, no image request).
 * Decorative: all information is repeated in the page content.
 */
export function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[34rem] select-none lg:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden rounded-5xl bg-ink-950 shadow-lift sm:aspect-square lg:aspect-[4/5]">
        <div className="bg-grid-light absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)] opacity-70" />

        <svg
          viewBox="0 0 480 600"
          className="absolute inset-0 size-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="hero-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d5f5ef" />
              <stop offset="35%" stopColor="#38b9ab" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0d7f76" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hero-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#179c90" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#179c90" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hero-wave" x1="0" x2="1">
              <stop offset="0%" stopColor="#73d5c8" stopOpacity="0" />
              <stop offset="45%" stopColor="#73d5c8" />
              <stop offset="100%" stopColor="#73d5c8" stopOpacity="0" />
            </linearGradient>
          </defs>

          <circle cx="240" cy="290" r="230" fill="url(#hero-halo)" />

          <g fill="none" stroke="#ffffff">
            <circle cx="240" cy="290" r="200" strokeOpacity="0.07" />
            <circle
              cx="240"
              cy="290"
              r="160"
              strokeOpacity="0.1"
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
            <circle cx="240" cy="290" r="120" strokeOpacity="0.14" />
            <circle cx="240" cy="290" r="80" strokeOpacity="0.2" />
          </g>

          <g className="origin-[240px_290px] animate-[spin_60s_linear_infinite] motion-reduce:animate-none">
            <circle cx="240" cy="90" r="5" fill="#73d5c8" />
            <circle cx="400" cy="290" r="3.5" fill="#ffffff" fillOpacity="0.7" />
            <circle cx="127" cy="403" r="4" fill="#38b9ab" />
          </g>
          <g className="origin-[240px_290px] animate-[spin_40s_linear_infinite_reverse] motion-reduce:animate-none">
            <circle cx="240" cy="170" r="3" fill="#ffffff" fillOpacity="0.8" />
            <circle cx="325" cy="375" r="4.5" fill="#73d5c8" />
          </g>

          <circle cx="240" cy="290" r="64" fill="url(#hero-core)" />
          <circle cx="240" cy="290" r="18" fill="#effbf9" />

          <path
            d="M20 470 C 70 470, 90 470, 120 470 S 150 420, 165 470 S 185 520, 200 470 S 215 380, 235 470 S 260 500, 275 470 S 330 470, 460 470"
            fill="none"
            stroke="url(#hero-wave)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
          <StatusPill tone="dark">Prihaja na slovenski trg</StatusPill>
        </div>
      </div>

      {/* Floating detail cards */}
      <div className="absolute -bottom-6 -left-3 animate-float rounded-2xl bg-white/95 p-4 whitespace-nowrap shadow-lift ring-1 ring-ink-200/60 backdrop-blur motion-reduce:animate-none sm:-left-8">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
            <LayersIcon className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink-950">5 izbranih tehnologij</p>
            <p className="text-xs text-ink-500">Oskrba ran · CGM · Dezinfekcija</p>
          </div>
        </div>
      </div>

      <div className="absolute top-[18%] -right-3 hidden animate-float rounded-2xl bg-white/95 p-4 whitespace-nowrap shadow-lift ring-1 ring-ink-200/60 backdrop-blur [animation-delay:-3.5s] motion-reduce:animate-none sm:-right-6 sm:block">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-ink-950 text-accent-300">
            <ShieldCheckIcon className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink-950">Lokalna podpora</p>
            <p className="text-xs text-ink-500">Uvajanje in izobraževanje</p>
          </div>
        </div>
      </div>
    </div>
  );
}
