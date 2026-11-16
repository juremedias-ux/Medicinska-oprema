import { NewsList, type NewsListItem } from "@/components/news/news-list";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { news } from "@/data/news";
import { formatDate } from "@/lib/format";
import { getProductBySlug, getProductPath } from "@/lib/products";

export function NewsSection() {
  const items: NewsListItem[] = [...news]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((item) => {
      const product = item.productSlug ? getProductBySlug(item.productSlug) : undefined;
      return {
        ...item,
        formattedDate: formatDate(item.date),
        productName: product?.productName,
        productPath: product ? getProductPath(product.slug) : undefined,
      };
    });

  return (
    <section id={sectionIds.news} aria-labelledby="novosti-naslov" className="bg-ink-50 py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="novosti-naslov"
          eyebrow="Novosti"
          title="Novosti iz sveta tehnologij."
          description="Nove tehnologije, produkti, regulativne odločitve in raziskave. Pri vsaki novici navedemo datum in vir ter ločimo novost na trgu od dokazanega napredka pri zdravljenju."
          className="reveal"
        />
        <div className="mt-12">
          <NewsList items={items} />
        </div>
      </Container>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section id={sectionIds.newsletter} aria-labelledby="novicke-naslov" className="bg-ink-50 pb-24 sm:pb-32">
      <Container>
        <div className="surface-dark relative overflow-hidden rounded-5xl px-6 py-14 sm:px-14 sm:py-20">
          <div
            aria-hidden="true"
            className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
          />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <h2
                id="novicke-naslov"
                className="text-3xl leading-tight font-semibold tracking-[-0.03em] text-white sm:text-4xl"
              >
                Ostanite v koraku z napredkom rehabilitacije.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-300">
                Spremljajte nove tehnologije, obetavne produkte in pomembne novosti s področja rehabilitacije.
                Naročite se na novičke.
              </p>
            </div>
            <div className="lg:col-span-7">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
