import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light";

/** Medcore mark: an open ring around a teal core. */
export function LogoMark({ tone = "dark", className }: { tone?: Tone; className?: string }) {
  const background = tone === "dark" ? "#0b1b2b" : "#ffffff";
  const ring = tone === "dark" ? "#ffffff" : "#0b1b2b";

  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={cn("size-8 shrink-0", className)}
    >
      <rect width="32" height="32" rx="9" fill={background} />
      <path
        d="M22.96 11.12A8.5 8.5 0 1 0 22.96 20.88"
        fill="none"
        stroke={ring}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3.2" fill="#179c90" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: Tone; className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — na začetno stran`}
      className={cn("group inline-flex items-center gap-2.5 rounded-lg", className)}
    >
      <LogoMark
        tone={tone}
        className="transition-transform duration-500 ease-out-quart group-hover:rotate-[-8deg]"
      />
      <span
        className={cn(
          "text-[1.3rem] leading-none font-semibold tracking-[-0.035em]",
          tone === "dark" ? "text-ink-950" : "text-white",
        )}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}
