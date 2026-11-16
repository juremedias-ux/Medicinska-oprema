import { InquiryLink } from "@/components/inquiry/inquiry-context";
import { EvidenceBadge, StatusPill } from "@/components/ui/badge";
import { ButtonArrow, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { getAvailabilityLabel } from "@/lib/products";
import { getTechnology } from "@/lib/technologies";
import type { Product } from "@/types/product";

import { ProductImage } from "../product-image";
import { ProductBreadcrumb } from "./product-breadcrumb";

export function ProductHero({ product }: { product: Product }) {
  const heroImage = product.details?.heroImage ?? product.image;
  const headingId = `${product.slug}-naslov`;
  const technology = getTechnology(product.technology);

  return (
    <section aria-labelledby={headingId} className="surface-dark relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_80%_20%,black_10%,transparent_65%)]"
      />
      <Container className="relative pt-28 pb-16 sm:pt-32 lg:pb-24">
        <ProductBreadcrumb productName={product.productName} />

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-semibold text-accent-300">{product.manufacturer}</span>
              <span aria-hidden="true" className="text-ink-600">
                ·
              </span>
              <span className="text-ink-400">{technology.name}</span>
            </p>
            <h1
              id={headingId}
              className="mt-4 text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl"
            >
              {product.productName}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">{product.shortDescription}</p>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              <StatusPill tone="dark">{getAvailabilityLabel(product.availabilityStatus)}</StatusPill>
              {product.regulatory.slice(0, 2).map((entry) => (
                <span
                  key={`${entry.region}-${entry.status}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] py-1 pr-1 pl-3 text-xs text-ink-200 ring-1 ring-white/10 ring-inset"
                >
                  {entry.region}: {entry.status}
                  <EvidenceBadge kind={entry.basis} className="bg-white/90" />
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <InquiryLink
                preset={{ inquiryType: "katalog", productSlug: product.slug }}
                className={buttonVariants({ variant: "accent", size: "lg" })}
              >
                Pošljite povpraševanje
                <ButtonArrow />
              </InquiryLink>
              <a
                href={product.externalManufacturerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline-light", size: "lg" })}
              >
                Spletna stran proizvajalca
                <ArrowUpRightIcon />
                <span className="sr-only">(odpre se v novem oknu)</span>
              </a>
            </div>
          </div>

          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-8 rounded-[3rem] bg-accent-400/10 blur-3xl" />
            <ProductImage
              image={heroImage}
              priority
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
              className="relative aspect-[4/3] rounded-4xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
