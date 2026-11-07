import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { getProductPath } from "@/lib/products";
import type { Product } from "@/types/product";

import { ProductImage } from "../product-image";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-ink-50 py-24 sm:py-28">
      <Container>
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink-950 sm:text-3xl">
          Drugi izdelki v portfoliu
        </h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {products.map((product) => (
            <li key={product.slug}>
              <Link
                href={getProductPath(product.slug)}
                prefetch
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink-200/70 transition duration-500 hover:shadow-lift"
              >
                <ProductImage
                  image={product.image}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="aspect-[4/3] bg-ink-50"
                />
                <span className="flex flex-1 flex-col p-6">
                  <span className="text-sm font-semibold text-accent-700">{product.manufacturer}</span>
                  <span className="mt-1.5 text-lg leading-snug font-semibold text-ink-950">
                    {product.productName}
                  </span>
                  <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-medium text-ink-700 transition group-hover:text-ink-950">
                    Več o izdelku
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
