import { ProductShowcaseCard } from "@/components/products/product-showcase-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { formatProductIndex, getAllProducts } from "@/lib/products";

export function Portfolio() {
  const products = getAllProducts();

  return (
    <section
      id={sectionIds.products}
      aria-labelledby="portfolio-naslov"
      className="relative bg-ink-50 py-24 sm:py-32"
    >
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="portfolio-naslov"
            eyebrow="Izdelki"
            title="Naš portfolio"
            description="Pet izbranih inovativnih rešitev za sodobno zdravstveno oskrbo."
            className="reveal"
          />

          <nav aria-label="Izdelki v portfoliu" className="reveal lg:max-w-md">
            <ol className="flex flex-wrap gap-2 lg:justify-end">
              {products.map((product, index) => (
                <li key={product.slug}>
                  <a
                    href={`#izdelek-${product.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-ink-700 ring-1 ring-ink-200/80 transition hover:text-ink-950 hover:ring-ink-300"
                  >
                    <span className="font-mono text-[0.6875rem] text-accent-700">
                      {formatProductIndex(index)}
                    </span>
                    {product.manufacturer}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-6 sm:mt-16 lg:gap-8">
          {products.map((product, index) => (
            <ProductShowcaseCard key={product.slug} product={product} index={index} total={products.length} />
          ))}
        </div>
      </Container>
    </section>
  );
}
