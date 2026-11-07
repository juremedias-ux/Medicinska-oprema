import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import type { Product } from "@/types/product";
import { getProductPath } from "./products";

/**
 * Canonical site origin.
 * 1. NEXT_PUBLIC_SITE_URL (set this once the custom domain is live)
 * 2. Vercel production domain (system env var, available at build time)
 * 3. Local development
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return new URL(`https://${vercelProduction}`);

  return new URL(`http://localhost:${process.env.PORT ?? 3000}`);
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, getSiteUrl()).toString();
}

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    description: siteConfig.shortDescription,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneHref,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ljubljana",
      addressCountry: "SI",
    },
    areaServed: { "@type": "Country", name: "Slovenija" },
    sameAs: [siteConfig.contact.linkedinUrl],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    inLanguage: siteConfig.language,
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productPageJsonLd(product: Product): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(getProductPath(product.slug)),
    url: absoluteUrl(getProductPath(product.slug)),
    name: `${product.productName} — ${product.manufacturer}`,
    description: product.shortDescription,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: {
      "@type": "Thing",
      name: product.originalName,
      description: product.shortDescription,
    },
  };
}

type PageMetadataInput = {
  /** Page title without the brand suffix (the root template appends "| Medcore"). */
  title?: string;
  description?: string;
  path: string;
  /** Use the full default title (homepage). */
  absoluteTitle?: string;
  noIndex?: boolean;
};

/**
 * Consistent per-page metadata: canonical URL, Open Graph and Twitter card.
 * Open Graph images come from the `opengraph-image` file conventions.
 */
export function buildPageMetadata({
  title,
  description = siteConfig.description,
  path,
  absoluteTitle,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const socialTitle = absoluteTitle ?? (title ? `${title} | ${siteConfig.name}` : siteConfig.title);

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: socialTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
