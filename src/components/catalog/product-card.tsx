import Link from "next/link";
import type { ReactNode } from "react";

import { InquiryLink } from "@/components/inquiry/inquiry-context";
import { ProductImage } from "@/components/products/product-image";
import { EvidenceBadge, StatusPill } from "@/components/ui/badge";
import { ButtonArrow, buttonVariants } from "@/components/ui/button";
import { InfoIcon } from "@/components/ui/icons";
import { summarizeEvidence } from "@/lib/evidence-summary";
import { getAvailabilityLabel, getProductPath, hasPendingData } from "@/lib/products";
import { getTechnology } from "@/lib/technologies";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-3 py-2.5">
      <dt className="text-[0.8125rem] text-ink-500">{label}</dt>
      <dd className="text-[0.875rem] leading-snug text-ink-900">{children}</dd>
    </div>
  );
}

/** Product card focused on understanding: purpose, environment, regulation, evidence. */
export function ProductCard({ product }: { product: Product }) {
  const technology = getTechnology(product.technology);
  const regulatory = product.regulatory[0];
  const pending = hasPendingData(product);

  return (
    <article
      aria-labelledby={`produkt-${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-4xl bg-white ring-1 ring-ink-200/80 transition duration-500 hover:shadow-lift"
    >
      <Link
        href={getProductPath(product.slug)}
        prefetch
        tabIndex={-1}
        aria-hidden="true"
        className="block bg-ink-50"
      >
        <ProductImage
          image={product.image}
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          className="aspect-[4/3] transition-transform duration-700 ease-out-quart group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-500 uppercase">
            {technology.shortName}
          </p>
          <StatusPill>{getAvailabilityLabel(product.availabilityStatus)}</StatusPill>
        </div>
        <p className="mt-5 text-sm font-semibold text-accent-700">{product.manufacturer}</p>
        <h3
          id={`produkt-${product.slug}`}
          className="mt-1 text-2xl leading-tight font-semibold tracking-tight text-ink-950"
        >
          <Link href={getProductPath(product.slug)} prefetch className="hover:text-accent-800">
            {product.productName}
          </Link>
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{product.intendedUse}</p>

        <dl className="mt-5 divide-y divide-ink-100 border-y border-ink-100">
          <Fact label="Okolje uporabe">
            {product.environment ?? <span className="text-ink-500 italic">v preverjanju</span>}
          </Fact>
          <Fact label="Regulativa">
            {regulatory ? (
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>
                  {regulatory.region}: {regulatory.status}
                </span>
                <EvidenceBadge kind={regulatory.basis} />
              </span>
            ) : (
              <span className="text-ink-500 italic">v preverjanju</span>
            )}
          </Fact>
          <Fact label="Viri">{summarizeEvidence(product)}</Fact>
        </dl>

        {pending ? (
          <p className="mt-4 flex items-start gap-2 text-[0.8125rem] leading-snug text-ink-500">
            <InfoIcon className="mt-0.5 size-4 shrink-0" />
            Nekateri podatki so v preverjanju; odsotnost podatka je označena.
          </p>
        ) : null}

        <div className="mt-auto flex flex-col items-center gap-3 pt-6">
          <InquiryLink
            preset={{ inquiryType: "katalog", productSlug: product.slug }}
            className={cn(buttonVariants({ variant: "primary", size: "md", fullWidth: true }))}
          >
            Pošljite povpraševanje
          </InquiryLink>
          <Link
            href={getProductPath(product.slug)}
            prefetch
            className="group/link inline-flex items-center gap-1.5 py-1 text-sm font-medium text-ink-800 hover:text-ink-950"
            aria-label={`Podrobnosti in viri: ${product.productName}`}
          >
            Podrobnosti in viri
            <ButtonArrow className="size-4 group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
