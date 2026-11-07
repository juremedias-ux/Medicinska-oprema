import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-xs font-medium tracking-[0.18em] uppercase",
        tone === "light" ? "text-accent-700" : "text-accent-300",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-6", tone === "light" ? "bg-accent-600/60" : "bg-accent-300/60")}
      />
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  tone?: Tone;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  tone = "light",
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Eyebrow tone={tone} className={align === "center" ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "mt-5 text-[2rem] leading-[1.1] font-semibold tracking-[-0.025em] sm:text-4xl lg:text-[2.75rem]",
          tone === "light" ? "text-ink-950" : "text-white",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className={cn("mt-5 text-lg leading-relaxed", tone === "light" ? "text-ink-600" : "text-ink-300")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
