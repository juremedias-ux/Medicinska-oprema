import { ProductCatalog } from "@/components/catalog/product-catalog";
import { InquiryLink } from "@/components/inquiry/inquiry-context";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { getAllProducts } from "@/lib/products";

export function CatalogSection() {
  return (
    <section id={sectionIds.products} aria-labelledby="produkti-naslov" className="bg-white py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="produkti-naslov"
            eyebrow="Produkti"
            title="Predstavljeni produkti."
            description="Pri vsakem produktu navedemo namen uporabe, delovanje, omejitve, regulativni status in vire. Kjer podatka še nimamo, to jasno označimo."
            className="reveal"
          />
          <p className="reveal max-w-sm text-[0.9375rem] leading-relaxed text-ink-600 lg:text-right">
            Iščete produkt, ki ga tu ni?{" "}
            <InquiryLink
              preset={{ inquiryType: "drug-produkt" }}
              className="font-semibold text-ink-950 underline decoration-ink-300 underline-offset-4 hover:decoration-ink-950"
            >
              Povprašajte nas
            </InquiryLink>
            .
          </p>
        </div>
        <div className="mt-12">
          <ProductCatalog products={[...getAllProducts()]} />
        </div>
      </Container>
    </section>
  );
}
