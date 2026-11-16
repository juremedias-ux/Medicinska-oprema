import { bodyHotspots } from "@/data/needs";
import { cn } from "@/lib/utils";
import type { Need } from "@/types/technology";

type BodyMapProps = {
  regions: Need[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  className?: string;
};

/**
 * Front-view figure with one button per body region. Mirrored points
 * (e.g. the second knee) are clickable but hidden from assistive technology
 * so every region is announced once. The region list next to the map is
 * the equivalent text alternative.
 */
export function BodyMap({ regions, selectedId, onSelect, className }: BodyMapProps) {
  return (
    <div className={cn("relative mx-auto aspect-[240/520] w-full max-w-[15rem] sm:max-w-[17rem]", className)}>
      <svg viewBox="0 0 240 520" aria-hidden="true" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="body-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ebedef" />
          </linearGradient>
        </defs>
        <g stroke="#b6bbc2" strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round">
          {/* Limbs: outline stroke + fill stroke */}
          {[
            "M66 120 L50 212 L42 292",
            "M174 120 L190 212 L198 292",
            "M97 312 L94 410",
            "M143 312 L146 410",
          ].map((d) => (
            <g key={d}>
              <path d={d} fill="none" strokeWidth="27" stroke="#b6bbc2" />
              <path d={d} fill="none" strokeWidth="24.5" stroke="url(#body-fill)" />
            </g>
          ))}
          {["M94 410 L93 490", "M146 410 L147 490"].map((d) => (
            <g key={d}>
              <path d={d} fill="none" strokeWidth="23" stroke="#b6bbc2" />
              <path d={d} fill="none" strokeWidth="20.5" stroke="url(#body-fill)" />
            </g>
          ))}
          <ellipse cx="41" cy="304" rx="11" ry="14" fill="url(#body-fill)" />
          <ellipse cx="199" cy="304" rx="11" ry="14" fill="url(#body-fill)" />
          <ellipse cx="88" cy="500" rx="17" ry="8" fill="url(#body-fill)" />
          <ellipse cx="152" cy="500" rx="17" ry="8" fill="url(#body-fill)" />
          {/* Torso */}
          <path
            d="M74 102 C88 95 102 93 108 91 L132 91 C138 93 152 95 166 102 C178 108 182 118 180 132 L172 200 C168 226 166 246 168 262 C172 280 174 296 170 314 L70 314 C66 296 68 280 72 262 C74 246 72 226 68 200 L60 132 C58 118 62 108 74 102 Z"
            fill="url(#body-fill)"
          />
          {/* Neck and head */}
          <path d="M108 72 L108 92 L132 92 L132 72" fill="url(#body-fill)" />
          <ellipse cx="120" cy="47" rx="24" ry="29" fill="url(#body-fill)" />
        </g>
        {/* Spine hint */}
        <path d="M120 112 L120 290" stroke="#d9dce0" strokeWidth="1.5" strokeDasharray="3 5" />
      </svg>

      {regions.map((region) => {
        const points = bodyHotspots[region.id] ?? [];
        const selected = region.id === selectedId;
        return points.map((point, index) => (
          <button
            key={`${region.id}-${index}`}
            type="button"
            onClick={() => onSelect(region.id)}
            aria-pressed={index === 0 ? selected : undefined}
            aria-label={index === 0 ? region.label : undefined}
            aria-hidden={index === 0 ? undefined : true}
            tabIndex={index === 0 ? 0 : -1}
            title={region.label}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            className={cn(
              "group absolute flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full outline-offset-2 transition",
              "focus-visible:outline-2 focus-visible:outline-accent-600",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute rounded-full transition",
                selected
                  ? "inset-1.5 bg-accent-500/20 ring-2 ring-accent-600"
                  : "inset-2.5 group-hover:bg-white group-hover:ring-1 group-hover:ring-accent-600",
              )}
            />
            {selected ? (
              <span
                aria-hidden="true"
                className="absolute inset-2 animate-pulse-ring rounded-full bg-accent-500/40"
              />
            ) : null}
            <span
              aria-hidden="true"
              className={cn(
                "relative rounded-full transition",
                selected
                  ? "size-3 bg-accent-600"
                  : "size-2 bg-ink-400 ring-4 ring-ink-400/15 group-hover:bg-accent-600",
              )}
            />
          </button>
        ));
      })}
    </div>
  );
}
