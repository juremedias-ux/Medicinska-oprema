/**
 * Product data model.
 *
 * Every product lives in `src/data/products.ts`. The homepage portfolio,
 * the notification form options, the sitemap and the `/products/[slug]`
 * detail pages are all generated from this single structure.
 *
 * Fields under `details` are optional: a detail-page section is rendered
 * only when its data is present, so content can be added gradually
 * without touching any component.
 */

/** Market availability. Labels live in `src/lib/products.ts`. */
export type AvailabilityStatus = "coming-soon" | "available" | "on-request";

export interface ProductImage {
  /** Path under /public (e.g. "/images/products/piomic-coms-one.jpg") or an allowed remote URL. */
  src: string;
  /** Descriptive Slovenian alt text. */
  alt: string;
  width: number;
  height: number;
  /** Marks a temporary illustration that must be replaced with real product photography. */
  isPlaceholder?: boolean;
}

export interface ProductKeyBenefit {
  title: string;
  description: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductSpecificationGroup {
  /** Optional group heading, e.g. "Mere in teža". */
  title?: string;
  items: ProductSpecification[];
}

export interface ProductIntendedUse {
  /** Intended-use statement as defined in the manufacturer's documentation. */
  summary?: string;
  indications?: string[];
  contraindications?: string[];
  /** Additional regulatory or safety note shown below the lists. */
  note?: string;
}

export interface ProductDownload {
  title: string;
  description?: string;
  /** Path under /public (e.g. "/downloads/piomic/brosura.pdf") or an external URL. */
  href: string;
  /** Display label, e.g. "PDF". */
  fileType: string;
  /** Display label, e.g. "2,4 MB". */
  fileSize?: string;
}

export interface ProductFaqItem {
  question: string;
  answer: string;
}

/** Extended content for the individual product page. */
export interface ProductDetails {
  /** Large hero visual; falls back to `Product.image`. */
  heroImage?: ProductImage;
  keyBenefits?: ProductKeyBenefit[];
  specifications?: ProductSpecificationGroup[];
  intendedUse?: ProductIntendedUse;
  downloads?: ProductDownload[];
  faq?: ProductFaqItem[];
}

export interface Product {
  /** URL segment for /products/[slug]. Must be unique, lowercase, hyphenated. */
  slug: string;
  manufacturer: string;
  /** Display name used on the website (Slovenian where the original is descriptive). */
  productName: string;
  /** Official product name as used by the manufacturer. */
  originalName: string;
  /** Short label for the notification form, e.g. "Piomic — COMS® One". */
  formLabel: string;
  /** Therapeutic / functional area, used as an eyebrow and for future filtering. */
  category: string;
  shortDescription: string;
  /** Paragraphs separated by an empty line ("\n\n"). */
  longDescription: string;
  /** Benefit tags shown on cards (2–4 recommended). */
  benefits: string[];
  image: ProductImage;
  availabilityStatus: AvailabilityStatus;
  ctaLabel: string;
  externalManufacturerUrl: string;
  /** Short regulatory note shown on the card and the detail page. */
  regulatoryNote?: string;
  details?: ProductDetails;
  /** Optional SEO overrides for the detail page. */
  seo?: {
    title?: string;
    description?: string;
  };
}
