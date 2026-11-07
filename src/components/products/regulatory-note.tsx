import { ShieldCheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function RegulatoryNote({ children, className }: { children: string; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-start gap-2.5 rounded-xl bg-ink-50 px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-600 ring-1 ring-ink-200/70 ring-inset",
        className,
      )}
    >
      <ShieldCheckIcon className="mt-0.5 size-4 shrink-0 text-accent-700" />
      {children}
    </p>
  );
}
