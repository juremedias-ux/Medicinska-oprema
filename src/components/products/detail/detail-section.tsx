import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Consistent wrapper for product-page content sections. */
export function DetailSection({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-28", className)}>
      <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink-950 sm:text-[1.75rem]">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
