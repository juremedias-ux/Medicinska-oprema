import type { ReactNode, SVGProps } from "react";

import type { TechnologyIcon } from "@/types/technology";

/**
 * Line icons for technology categories (32×32, currentColor).
 * Each depicts the actual device or principle, not a generic symbol.
 */
type IconProps = SVGProps<SVGSVGElement>;

const paths: Record<TechnologyIcon, ReactNode> = {
  // Two electrode pads connected to a stimulator.
  electrodes: (
    <>
      <rect x="4" y="6" width="9" height="9" rx="2.5" />
      <rect x="19" y="6" width="9" height="9" rx="2.5" />
      <path d="M8.5 15v4.5a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3V15" />
      <rect x="12" y="22.5" width="8" height="5" rx="1.5" />
      <path d="M7 10.5h3M22 10.5h3" />
    </>
  ),
  // Shockwave applicator emitting arcs.
  waves: (
    <>
      <path d="M4 22l8-8" />
      <rect x="10" y="9" width="7" height="7" rx="1.5" transform="rotate(45 13.5 12.5)" />
      <path d="M19 11.5a6 6 0 0 1 0 8.5" />
      <path d="M22.5 8a11 11 0 0 1 0 15.5" />
      <path d="M26 5a15.5 15.5 0 0 1 0 21.5" />
    </>
  ),
  // Joint with range-of-motion arc.
  joint: (
    <>
      <path d="M5 16h10" />
      <path d="M15 16l9 7" />
      <circle cx="15" cy="16" r="2.5" />
      <path d="M25 16a10 10 0 0 0-3.1-7.2" strokeDasharray="1.5 2.5" />
      <path d="M25 16a10 10 0 0 1-2 6" />
    </>
  ),
  // Lower-limb exoskeleton frame.
  exoskeleton: (
    <>
      <circle cx="16" cy="5" r="2.5" />
      <path d="M11 10h10l-1 7h-8z" />
      <path d="M12.5 17l-1.5 6 1.5 5M19.5 17l1.5 6-1.5 5" />
      <circle cx="11" cy="23" r="1.5" />
      <circle cx="21" cy="23" r="1.5" />
    </>
  ),
  // Wearable sensor with live signal.
  sensor: (
    <>
      <rect x="9" y="3" width="14" height="10" rx="3" />
      <path d="M12 8h2l1.5-2.5 2 5L19 8h1" />
      <path d="M4 22h4l2.5-4 3 8 3-12 3 8 2.5-4H28" />
    </>
  ),
  // VR headset.
  headset: (
    <>
      <path d="M5 13a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-4.5l-2-2.5h-3l-2 2.5H8a3 3 0 0 1-3-3z" />
      <path d="M3 15v3M29 15v3" />
      <circle cx="11" cy="16" r="1.5" />
      <circle cx="21" cy="16" r="1.5" />
    </>
  ),
  // Compression sleeve with pressure chambers.
  compression: (
    <>
      <path d="M10 4h12l-2 24h-8z" />
      <path d="M10.8 10h10.4M11.3 16h9.4M11.8 22h8.4" />
      <path d="M4 9v4M6 7v8M26 7v8M28 9v4" />
    </>
  ),
  // Hinged knee brace.
  brace: (
    <>
      <path d="M11 4v8M21 4v8M11 20v8M21 20v8" />
      <circle cx="11" cy="16" r="3" />
      <circle cx="21" cy="16" r="3" />
      <path d="M11 7h10M11 25h10" />
    </>
  ),
  // Layered wound dressing.
  dressing: (
    <>
      <rect x="4" y="7" width="24" height="18" rx="4" />
      <rect x="10" y="12" width="12" height="8" rx="2" />
      <path d="M13 15h.01M16 17h.01M19 15h.01" strokeWidth="2.4" />
    </>
  ),
  // Sensor disc with glucose trend.
  glucose: (
    <>
      <circle cx="10" cy="16" r="6" />
      <circle cx="10" cy="16" r="1.5" />
      <path d="M19 21l3-5 3 2 3-6" />
    </>
  ),
  // Chamber with UV light.
  uv: (
    <>
      <rect x="7" y="3" width="18" height="26" rx="3" />
      <rect x="11" y="7" width="10" height="14" rx="1.5" />
      <path d="M16 9v10M13.5 10v8M18.5 10v8" strokeDasharray="1 2" />
      <path d="M12 25h4" />
    </>
  ),
};

export function TechIcon({ icon, ...props }: IconProps & { icon: TechnologyIcon }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[icon]}
    </svg>
  );
}
