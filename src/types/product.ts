/**
 * Product data model — built for understanding, not only for sale.
 *
 * Every product lives in `src/data/products.ts`. Missing information is
 * stored as `null` / empty arrays and shown on the site as "v preverjanju";
 * it is never replaced with marketing copy.
 */
import type { TechnologyId } from "./technology";

/** Market availability. Labels live in `src/lib/products.ts`. */
export type AvailabilityStatus = "coming-soon" | "available" | "on-request";

/** Where a piece of information comes from — shown as a label next to it. */
export type EvidenceKind =
  /** Official register entries or documented approvals (CE, FDA …). */
  | "regulativa"
  /** Peer-reviewed publication or trial registry entry. */
  | "raziskava"
  /** Manufacturer material or press release, not independently verified. */
  | "proizvajalec"
  /** Media report relaying information; original not yet reviewed. */
  | "medij";

export interface SourceLink {
  label: string;
  url: string;
}

export interface EvidenceItem {
  kind: EvidenceKind;
  title: string;
  /** Plain-language summary, including size and limitations when known. */
  summary: string;
  /** ISO date or partial date ("2025", "2025-07"). */
  date?: string;
  sources: SourceLink[];
}

export interface RegulatoryEntry {
  /** Market, e.g. "EU" or "ZDA". */
  region: string;
  status: string;
  /** Who states it: register/regulator, manufacturer, or not yet verified. */
  basis: Exclude<EvidenceKind, "raziskava"> | "v-preverjanju";
  source?: SourceLink;
}

export interface ProductImage {
  /** Path under /public or an allowed remote URL. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Marks a temporary illustration that must be replaced with real product photography. */
  isPlaceholder?: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductSpecificationGroup {
  title?: string;
  items: ProductSpecification[];
}

export interface ProductDownload {
  title: string;
  description?: string;
  href: string;
  fileType: string;
  fileSize?: string;
}

export interface ProductFaqItem {
  question: string;
  answer: string;
}

/** Optional extended content for the product page (rendered only when present). */
export interface ProductDetails {
  heroImage?: ProductImage;
  specifications?: ProductSpecificationGroup[];
  downloads?: ProductDownload[];
  faq?: ProductFaqItem[];
}

export interface Product {
  /** URL segment for /products/[slug]. Unique, lowercase, hyphenated. */
  slug: string;
  manufacturer: string;
  /** Display name used on the website. */
  productName: string;
  /** Official product name as used by the manufacturer. */
  originalName: string;
  /** Technology category (see `src/data/technologies.ts`). */
  technology: TechnologyId;
  shortDescription: string;
  /** Intended purpose in plain language (as stated by the manufacturer). */
  intendedUse: string;
  /** Intended user environment; null = not yet verified. */
  environment: string | null;
  /** How it works in plain language; null = not yet verified. */
  howItWorks: string | null;
  /** Benefits as stated by the manufacturer — always labelled as such. */
  manufacturerClaims: string[];
  limitations: string[];
  warnings: string[];
  evidence: EvidenceItem[];
  regulatory: RegulatoryEntry[];
  /** Short tags for cards. */
  tags: string[];
  image: ProductImage;
  availabilityStatus: AvailabilityStatus;
  externalManufacturerUrl: string;
  /** Date the product information was last updated (ISO). */
  updatedAt: string;
  details?: ProductDetails;
  seo?: {
    title?: string;
    description?: string;
  };
}
