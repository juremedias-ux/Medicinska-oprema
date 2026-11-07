import { getAvailabilityLabel, getProductBySlug, getProductSlugs } from "@/lib/products";
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
    return renderOgImage({ eyebrow: "Medcore", title: "Inovativne medicinske tehnologije" });
  }

  return renderOgImage({
    eyebrow: `${product.manufacturer} · ${product.category}`,
    title: product.productName,
    description: product.shortDescription,
    footnote: getAvailabilityLabel(product.availabilityStatus),
  });
}
