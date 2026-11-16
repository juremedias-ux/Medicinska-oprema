import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/**
 * Button styles. Use <Button> for actions and `buttonVariants()` on
 * <Link>/<a> for navigation so semantics stay correct.
 */
export const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap",
    "transition-[background-color,color,box-shadow,transform] duration-300 ease-out-quart",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-500",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        /** Dark button for light surfaces. */
        primary:
          "bg-ink-950 text-white shadow-[0_1px_2px_rgb(7_8_10/0.2)] hover:bg-ink-800 hover:shadow-[0_10px_30px_-12px_rgb(7_8_10/0.55)]",
        /** Luminous cyan button for dark surfaces. */
        accent:
          "bg-accent-300 text-ink-950 shadow-[0_0_0_1px_rgb(106_215_231/0.4)] hover:bg-accent-200 hover:shadow-[0_12px_40px_-12px_rgb(52_191_212/0.7)]",
        secondary: "bg-white text-ink-950 ring-1 ring-ink-200 ring-inset hover:bg-ink-50 hover:ring-ink-300",
        ghost: "text-ink-700 hover:bg-ink-100 hover:text-ink-950",
        light: "bg-white text-ink-950 hover:bg-accent-50",
        "outline-light":
          "text-white ring-1 ring-white/20 ring-inset hover:bg-white/[0.06] hover:ring-white/40",
        "ghost-light": "text-ink-300 hover:bg-white/[0.06] hover:text-white",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[0.9375rem]",
        lg: "h-13 px-7 text-base",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariantProps;

export function Button({ className, variant, size, fullWidth, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size, fullWidth }), className)} {...props} />
  );
}

/** Arrow that nudges forward on hover of the parent button/link. */
export function ButtonArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "transition-transform duration-300 ease-out-quart group-hover/button:translate-x-0.5",
        className,
      )}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
