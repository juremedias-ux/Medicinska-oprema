import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NotifyLink, NotifyProvider } from "@/components/forms/notify-context";
import {
  ProductDownloads,
  ProductFaq,
  ProductIntendedUseSection,
  ProductKeyBenefits,
  ProductOverview,
  ProductPendingInfo,
  ProductSpecifications,
  type PendingSection,
} from "@/components/products/detail/product-content-sections";
import { ProductContactCta } from "@/components/products/detail/product-contact-cta";
import { ProductHero } from "@/components/products/detail/product-hero";
import { ProductKeyFacts } from "@/components/products/detail/product-key-facts";
import { RelatedProducts } from "@/components/products/detail/related-products";
import { NotifySection } from "@/components/sections/notify-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { sectionIds } from "@/config/site";
import {
  getDescriptionParagraphs,
  getProductBySlug,
  getProductPath,
  getProductSlugs,
  getRelatedProducts,
} from "@/lib/products";
import { breadcrumbJsonLd, buildPageMetadata, productPageJsonLd } from "@/lib/seo";
import type { Product } from "@/types/product";

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

function getPendingSections(product: Product): PendingSection[] {
  const details = product.details;
  const pending: PendingSection[] = [];
  if (!details?.specifications?.length) pending.push("specifications");
  if (!details?.intendedUse) pending.push("intendedUse");
  if (!details?.downloads?.length) pending.push("downloads");
  if (!details?.faq?.length) pending.push("faq");
  return pending;
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const details = product.details;
  const path = getProductPath(product.slug);
  // Product-specific id: routes preserved by <Activity> must not share anchors.
  const notifySectionId = `obvestila-${product.slug}`;

  return (
    <NotifyProvider initialProduct={product.slug} sectionId={notifySectionId}>
      <ProductHero product={product} />

      <div className="bg-white pt-8 pb-16 sm:pt-12 sm:pb-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-16 lg:col-span-8">
            <ProductOverview paragraphs={getDescriptionParagraphs(product)} />
            {details?.keyBenefits?.length ? <ProductKeyBenefits benefits={details.keyBenefits} /> : null}
            {details?.specifications?.length ? (
              <ProductSpecifications groups={details.specifications} />
            ) : null}
            {details?.intendedUse ? <ProductIntendedUseSection intendedUse={details.intendedUse} /> : null}
            {details?.downloads?.length ? <ProductDownloads downloads={details.downloads} /> : null}
            {details?.faq?.length ? <ProductFaq items={details.faq} /> : null}
            <ProductPendingInfo sections={getPendingSections(product)} />
          </div>

          <aside aria-label="Povzetek izdelka" className="lg:col-span-4">
            <div className="flex flex-col gap-5 lg:sticky lg:top-28">
              <ProductKeyFacts product={product} />
              <NotifyLink
                productSlug={product.slug}
                className="group rounded-3xl bg-accent-50 p-6 ring-1 ring-accent-200/80 transition hover:bg-accent-100/70 sm:p-7"
              >
                <span className="block text-[1.0625rem] font-semibold text-ink-950">
                  Želite biti obveščeni?
                </span>
                <span className="mt-2 block text-[0.9375rem] leading-relaxed text-ink-600">
                  Sporočili vam bomo, ko bo izdelek na voljo v Sloveniji.
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-800">
                  Na prijavni obrazec
                  <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">
                    ↓
                  </span>
                </span>
              </NotifyLink>
            </div>
          </aside>
        </Container>
      </div>

      <NotifySection
        id={notifySectionId}
        title={`Obvestite me, ko bo ${product.productName} na voljo`}
        description="Pustite nam svoje podatke in obvestili vas bomo, ko bo izdelek na voljo v Sloveniji, ko bomo objavili dodatne informacije ali ko se bodo odprle možnosti za sodelovanje."
        source="website:product-page"
      />

      <ProductContactCta productName={product.productName} />
      <RelatedProducts products={getRelatedProducts(product.slug)} />

      <JsonLd
        data={[
          productPageJsonLd(product),
          breadcrumbJsonLd([
            { name: "Domov", path: "/" },
            { name: "Izdelki", path: `/#${sectionIds.products}` },
            { name: product.productName, path },
          ]),
        ]}
      />
    </NotifyProvider>
  );
}
