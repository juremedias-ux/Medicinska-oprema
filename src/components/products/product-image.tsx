import Image from "next/image";

import type { ProductImage as ProductImageData } from "@/types/product";
import { cn } from "@/lib/utils";

type ProductImageProps = {
  image: ProductImageData;
  sizes: string;
  priority?: boolean;
  className?: string;
};

const showPlaceholderBadge = process.env.NODE_ENV !== "production";

/**
 * Product visual. Placeholder illustrations get a visible badge during
 * local development (never in production) so they are not forgotten.
 */
export function ProductImage({ image, sizes, priority = false, className }: ProductImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="size-full object-cover"
      />
      {image.isPlaceholder && showPlaceholderBadge ? (
        <span className="absolute top-3 left-3 rounded-md bg-amber-300 px-2 py-1 font-mono text-[0.625rem] font-semibold tracking-wider text-amber-950 uppercase shadow-sm">
          Nadomestna slika
        </span>
      ) : null}
    </div>
  );
}
