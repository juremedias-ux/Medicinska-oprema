import Link from "next/link";

import { NotifyLink } from "@/components/forms/notify-context";
import { StatusPill } from "@/components/ui/badge";
import { ButtonArrow, buttonVariants } from "@/components/ui/button";
import { formatProductIndex, getAvailabilityLabel, getProductPath } from "@/lib/products";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

import { ProductImage } from "./product-image";
import { ProductTags } from "./product-tags";
import { RegulatoryNote } from "./regulatory-note";

type ProductShowcaseCardProps = {
  product: Product;
  index: number;
  total: number;
};

/**
 * Editorial product block: large visual + text, alternating sides on desktop.
 */
export function ProductShowcaseCard({ product, index, total }: ProductShowcaseCardProps) {
  const isReversed = index % 2 === 1;
  const headingId = `izdelek-${product.slug}-naslov`;

  return (
    <article
      id={`izdelek-${product.slug}`}
      aria-labelledby={headingId}
      className="reveal group/card relative grid scroll-mt-28 overflow-hidden rounded-4xl bg-white ring-1 ring-ink-200/70 transition-shadow duration-500 hover:shadow-lift lg:grid-cols-2"
    >
      <Link
        href={getProductPath(product.slug)}
        prefetch
        tabIndex={-1}
        aria-hidden="true"
        className={cn("relative block overflow-hidden bg-ink-50", isReversed && "lg:order-2")}
      >
        <ProductImage
          image={product.image}
          sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/3] h-full transition-transform duration-700 ease-out-quart group-hover/card:scale-[1.025] lg:aspect-auto lg:min-h-[30rem]"
        />
      </Link>

      <div className="flex flex-col p-7 sm:p-10 lg:p-12 xl:p-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs tracking-[0.14em] text-ink-500">
            <span className="text-ink-950">{formatProductIndex(index)}</span> /{" "}
            {String(total).padStart(2, "0")}
            <span className="mx-2 text-ink-300">·</span>
            {product.category}
          </p>
          <StatusPill>{getAvailabilityLabel(product.availabilityStatus)}</StatusPill>
        </div>

        <p className="mt-8 text-sm font-semibold tracking-wide text-accent-700">{product.manufacturer}</p>
        <h3
          id={headingId}
          className="mt-2 text-[1.75rem] leading-tight font-semibold tracking-[-0.02em] text-ink-950 sm:text-3xl"
        >
          <Link
            href={getProductPath(product.slug)}
            prefetch
            className="transition-colors hover:text-accent-800"
          >
            {product.productName}
          </Link>
        </h3>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-600">{product.shortDescription}</p>

        <ProductTags tags={product.benefits} className="mt-6" />

        {product.regulatoryNote ? (
          <RegulatoryNote className="mt-6">{product.regulatoryNote}</RegulatoryNote>
        ) : null}

        <div className="mt-auto flex flex-col gap-3 pt-9 sm:flex-row sm:items-center">
          <NotifyLink
            productSlug={product.slug}
            className={buttonVariants({ variant: "primary", size: "md" })}
          >
            {product.ctaLabel}
            <ButtonArrow />
          </NotifyLink>
          <Link
            href={getProductPath(product.slug)}
            prefetch
            className={buttonVariants({ variant: "ghost", size: "md" })}
            aria-label={`Več o izdelku ${product.productName}`}
          >
            Več o izdelku
            <ButtonArrow />
          </Link>
        </div>
      </div>
    </article>
  );
}
