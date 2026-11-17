import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InquiryProvider } from "@/components/inquiry/inquiry-context";
import {
  ProductClaimsAndLimits,
  ProductDownloads,
  ProductEvidence,
  ProductFaq,
  ProductGallery,
  ProductHowItWorks,
  ProductPurpose,
  ProductRegulatory,
  ProductSpecifications,
} from "@/components/products/detail/product-content-sections";
import { ProductHero } from "@/components/products/detail/product-hero";
import { ProductKeyFacts } from "@/components/products/detail/product-key-facts";
import { RelatedProducts } from "@/components/products/detail/related-products";
import { InquiryBlock } from "@/components/sections/how-we-help";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { InfoIcon } from "@/components/ui/icons";
import { medicalDisclaimer, sectionIds } from "@/config/site";
import {
  getProductBySlug,
  getProductPath,
  getProductSlugs,
  getRelatedProducts,
  hasPendingData,
} from "@/lib/products";
import { breadcrumbJsonLd, buildPageMetadata, productPageJsonLd } from "@/lib/seo";

/**
 * Product pages are fully prerendered at build time, so the complete content
 * is in the initial HTML (best for SEO and first paint). Navigations into a
 * product page may wait for its static payload instead of showing a skeleton;
 * product links use full prefetching to keep that wait negligible.
 */
export const instant = false;

/** All product pages are prerendered at build time from src/data/products.ts. */
export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Izdelek ni najden", robots: { index: false } };

  return buildPageMetadata({
    title: product.seo?.title ?? `${product.productName} — ${product.manufacturer}`,
    description: product.seo?.description ?? product.shortDescription,
    path: getProductPath(product.slug),
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const details = product.details;
  const path = getProductPath(product.slug);
  // Product-specific ids: routes kept alive by <Activity> must not share anchors.
  const sid = (name: string) => `${product.slug}-${name}`;
  const inquirySectionId = sid("povprasevanje");

  return (
    <InquiryProvider
      initialPreset={{ inquiryType: "katalog", productSlug: product.slug }}
      sectionId={inquirySectionId}
    >
      <ProductHero product={product} />

      <div className="bg-ink-50 py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-16 lg:col-span-8">
            {hasPendingData(product) ? (
              <p className="flex items-start gap-3 rounded-2xl bg-white p-5 text-[0.9375rem] leading-relaxed text-ink-700 ring-1 ring-ink-200/70">
                <InfoIcon className="mt-0.5 size-5 shrink-0 text-accent-700" />
                Nekateri podatki o tem produktu so v preverjanju in so tako tudi označeni. Odsotnost podatka
                ne pomeni, da ga ni, temveč da ga še nismo preverili.
              </p>
            ) : null}
            <ProductPurpose
              id={sid("namen")}
              intendedUse={product.intendedUse}
              environment={product.environment}
            />
            <ProductHowItWorks id={sid("delovanje")} text={product.howItWorks} />
            {details?.gallery?.length ? (
              <ProductGallery id={sid("fotografije")} images={details.gallery} />
            ) : null}
            <ProductClaimsAndLimits
              id={sid("koristi-omejitve")}
              claims={product.manufacturerClaims}
              limitations={product.limitations}
              warnings={product.warnings}
            />
            <ProductEvidence id={sid("dokazi")} evidence={product.evidence} />
            <ProductRegulatory id={sid("regulativa")} entries={product.regulatory} />
            {details?.specifications?.length ? (
              <ProductSpecifications id={sid("specifikacije")} groups={details.specifications} />
            ) : null}
            {details?.downloads?.length ? (
              <ProductDownloads id={sid("dokumentacija")} downloads={details.downloads} />
            ) : null}
            {details?.faq?.length ? <ProductFaq id={sid("vprasanja")} items={details.faq} /> : null}
          </div>

          <aside aria-label="Povzetek izdelka" className="lg:col-span-4">
            <div className="flex flex-col gap-5 lg:sticky lg:top-24">
              <ProductKeyFacts product={product} />
              <p className="flex gap-3 rounded-3xl bg-white p-5 text-sm leading-relaxed text-ink-600 ring-1 ring-ink-200/70">
                <InfoIcon className="mt-0.5 size-4 shrink-0 text-ink-500" />
                {medicalDisclaimer}
              </p>
            </div>
          </aside>
        </Container>
      </div>

      <div className="bg-ink-50 pb-24 sm:pb-32">
        <Container>
          <InquiryBlock
            sectionId={inquirySectionId}
            source="website:product-page"
            title={`Povpraševanje za ${product.productName}`}
          />
        </Container>
      </div>

      <RelatedProducts products={getRelatedProducts(product.slug)} />

      <JsonLd
        data={[
          productPageJsonLd(product),
          breadcrumbJsonLd([
            { name: "Domov", path: "/" },
            { name: "Produkti", path: `/#${sectionIds.products}` },
            { name: product.productName, path },
          ]),
        ]}
      />
    </InquiryProvider>
  );
}
