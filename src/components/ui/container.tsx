import type { ElementType, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  size?: "default" | "narrow" | "wide";
};

const sizes = {
  narrow: "max-w-4xl",
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
} as const;

export function Container({ as: Component = "div", size = "default", className, ...props }: ContainerProps) {
  return (
    <Component className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", sizes[size], className)} {...props} />
  );
}
