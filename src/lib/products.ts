import { products } from "@/data/products";
import type { AvailabilityStatus, Product } from "@/types/product";

export const availabilityLabels: Record<AvailabilityStatus, string> = {
  "coming-soon": "Prihaja na slovenski trg",
  available: "Na voljo v Sloveniji",
  "on-request": "Na voljo na povpraševanje",
};

/** Value stored when a visitor wants updates about the whole portfolio. */
export const ALL_PRODUCTS_VALUE = "vsi-produkti";

export interface ProductInterestOption {
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

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  return products.filter((product) => product.slug !== slug).slice(0, limit);
}

export function getProductPath(slug: string): `/products/${string}` {
  return `/products/${slug}`;
}

export function getAvailabilityLabel(status: AvailabilityStatus): string {
  return availabilityLabels[status];
}

/** Options for the notification form, in portfolio order, plus "Vsi produkti". */
export function getProductInterestOptions(): ProductInterestOption[] {
  return [
    ...products.map((product) => ({ value: product.slug, label: product.formLabel })),
    { value: ALL_PRODUCTS_VALUE, label: "Vsi produkti" },
  ];
}

export function getProductInterestValues(): string[] {
  return getProductInterestOptions().map((option) => option.value);
}

/** Splits `longDescription` into paragraphs. */
export function getDescriptionParagraphs(product: Product): string[] {
  return product.longDescription
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

/** Two-digit portfolio index, e.g. "01". */
export function formatProductIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}
