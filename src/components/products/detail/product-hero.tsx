import { NotifyLink } from "@/components/forms/notify-context";
import { StatusPill } from "@/components/ui/badge";
import { ButtonArrow, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { getAvailabilityLabel } from "@/lib/products";
import type { Product } from "@/types/product";

import { ProductImage } from "../product-image";
import { ProductTags } from "../product-tags";
import { RegulatoryNote } from "../regulatory-note";
import { ProductBreadcrumb } from "./product-breadcrumb";

export function ProductHero({ product }: { product: Product }) {
  const heroImage = product.details?.heroImage ?? product.image;
  const headingId = `${product.slug}-naslov`;

  return (
    <section
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-gradient-to-b from-ink-50 to-white"
    >
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_60%)]"
      />
      <Container className="relative pt-28 pb-12 sm:pt-32 lg:pb-16">
        <ProductBreadcrumb productName={product.productName} />

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold tracking-wide text-accent-700">{product.manufacturer}</p>
              <span aria-hidden="true" className="text-ink-300">
                ·
              </span>
              <p className="text-sm text-ink-500">{product.category}</p>
            </div>
            <h1
              id={headingId}
              className="mt-4 text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.03em] text-ink-950 sm:text-5xl lg:text-[3.5rem]"
            >
              {product.productName}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">{product.shortDescription}</p>

            <div className="mt-7">
              <StatusPill>{getAvailabilityLabel(product.availabilityStatus)}</StatusPill>
            </div>

            <ProductTags tags={product.benefits} className="mt-6" />

            {product.regulatoryNote ? (
              <RegulatoryNote className="mt-6 max-w-xl">{product.regulatoryNote}</RegulatoryNote>
            ) : null}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <NotifyLink productSlug={product.slug} className={buttonVariants({ size: "lg" })}>
                {product.ctaLabel}
                <ButtonArrow />
              </NotifyLink>
              <a
                href={product.externalManufacturerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                Spletna stran proizvajalca
                <ArrowUpRightIcon />
                <span className="sr-only">(odpre se v novem oknu)</span>
              </a>
            </div>
          </div>

          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-6 rounded-[3rem] bg-accent-200/20 blur-2xl" />
            <ProductImage
              image={heroImage}
              priority
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
              className="relative aspect-[4/3] rounded-4xl shadow-lift ring-1 ring-ink-200/70"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
