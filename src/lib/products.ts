import { products } from "@/data/products";
import type { AvailabilityStatus, EvidenceKind, Product } from "@/types/product";
import type { TechnologyId } from "@/types/technology";

export const availabilityLabels: Record<AvailabilityStatus, string> = {
  "coming-soon": "Prihaja na slovenski trg",
  available: "Na voljo v Sloveniji",
  "on-request": "Dobava na povpraševanje",
};

export interface ProductOption {
  value: string;
  label: string;
}

export function getAllProducts(): readonly Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductSlugs(): string[] {
  return products.map((product) => product.slug);
}

export function getProductsByTechnology(technology: TechnologyId): Product[] {
  return products.filter((product) => product.technology === technology);
}

/** Products of the same technology first, then the rest. */
export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const current = getProductBySlug(slug);
  const others = products.filter((product) => product.slug !== slug);
  if (!current) return others.slice(0, limit);
  const sameTechnology = others.filter((product) => product.technology === current.technology);
  const rest = others.filter((product) => product.technology !== current.technology);
  return [...sameTechnology, ...rest].slice(0, limit);
}

export function getProductPath(slug: string): `/products/${string}` {
  return `/products/${slug}`;
}

export function getAvailabilityLabel(status: AvailabilityStatus): string {
  return availabilityLabels[status];
}

export function getProductLabel(product: Pick<Product, "manufacturer" | "productName">): string {
  return `${product.manufacturer} — ${product.productName}`;
}

/** Options for the inquiry form, in catalogue order. */
export function getProductOptions(): ProductOption[] {
  return products.map((product) => ({ value: product.slug, label: getProductLabel(product) }));
}

export type EvidenceCounts = Partial<Record<EvidenceKind, number>>;

export function getEvidenceCounts(product: Product): EvidenceCounts {
  return product.evidence.reduce<EvidenceCounts>((counts, item) => {
    counts[item.kind] = (counts[item.kind] ?? 0) + 1;
    return counts;
  }, {});
}

/** True when key information is still being verified. */
export function hasPendingData(product: Product): boolean {
  return (
    product.environment === null ||
    product.howItWorks === null ||
    product.evidence.length === 0 ||
    product.warnings.length === 0 ||
    product.regulatory.some((entry) => entry.basis === "v-preverjanju")
  );
}
