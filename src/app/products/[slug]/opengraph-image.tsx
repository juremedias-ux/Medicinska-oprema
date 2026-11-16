import { getAvailabilityLabel, getProductBySlug, getProductSlugs } from "@/lib/products";
import { getTechnology } from "@/lib/technologies";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Medcore — izdelek";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return renderOgImage({ eyebrow: "Medcore", title: "Napredne tehnologije za rehabilitacijo" });
  }

  return renderOgImage({
    eyebrow: `${product.manufacturer} · ${getTechnology(product.technology).shortName}`,
    title: product.productName,
    description: product.shortDescription,
    footnote: getAvailabilityLabel(product.availabilityStatus),
  });
}
