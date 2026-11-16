import type { ReactNode } from "react";

import { getEvidenceLabel } from "@/lib/evidence";
import { cn } from "@/lib/utils";
import type { EvidenceKind, RegulatoryEntry } from "@/types/product";

type Tone = "light" | "dark";

export function Tag({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.8125rem] leading-5 font-medium ring-1 ring-inset",
        tone === "light"
          ? "bg-ink-50 text-ink-700 ring-ink-200/80"
          : "bg-white/[0.04] text-ink-300 ring-white/10",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusPill({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs leading-5 font-medium ring-1 ring-inset",
        tone === "light"
          ? "bg-accent-50 text-accent-800 ring-accent-200/80"
          : "bg-white/5 text-accent-200 ring-white/15",
        className,
      )}
    >
      <span aria-hidden="true" className="relative flex size-1.5">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-500" />
        <span className="relative size-1.5 rounded-full bg-accent-500" />
      </span>
      {children}
    </span>
  );
}

type Basis = EvidenceKind | RegulatoryEntry["basis"];

const evidenceStyles: Record<Basis, string> = {
  regulativa: "bg-accent-50 text-accent-800 ring-accent-200",
  raziskava: "bg-ink-950 text-white ring-ink-950",
  proizvajalec: "bg-white text-ink-700 ring-ink-300",
  medij: "bg-white text-ink-600 ring-ink-200",
  "v-preverjanju": "bg-transparent text-ink-600 ring-ink-300",
};

/** Label that shows where a statement comes from. */
export function EvidenceBadge({ kind, className }: { kind: Basis; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md px-2 py-0.5 font-mono text-[0.6875rem] font-medium tracking-wide uppercase ring-1 ring-inset",
        kind === "v-preverjanju" && "border border-dashed border-ink-300 ring-0",
        evidenceStyles[kind],
        className,
      )}
    >
      {getEvidenceLabel(kind)}
    </span>
  );
}
