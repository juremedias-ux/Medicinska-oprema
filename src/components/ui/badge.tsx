import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-ink-50 px-3 py-1 text-[0.8125rem] leading-5 font-medium text-ink-700 ring-1 ring-ink-200/80 ring-inset",
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
  tone?: "light" | "dark";
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
