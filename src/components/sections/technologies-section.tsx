import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ChevronDownIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechIcon } from "@/components/ui/tech-icons";
import { sectionIds } from "@/config/site";
import { getProductPath, getProductsByTechnology } from "@/lib/products";
import { getRehabilitationTechnologies, getTechnologyAnchor } from "@/lib/technologies";

/** Overview of rehabilitation technology categories with progressive disclosure. */
export function TechnologiesSection() {
  const technologies = getRehabilitationTechnologies();

  return (
    <section
      id={sectionIds.technologies}
      aria-labelledby="tehnologije-naslov"
      className="surface-dark relative overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]"
      />
      <Container className="relative">
        <SectionHeading
          id="tehnologije-naslov"
          tone="dark"
          size="display"
          eyebrow="Tehnologije"
          title={
            <>
              Od elektrostimulacije
              <span className="block text-ink-400">do robotske rehabilitacije.</span>
            </>
          }
          description="Pregled tehnologij, ki se uporabljajo v sodobni rehabilitaciji. Pri vsaki pojasnimo delovanje, okolje uporabe in stanje dokazov. Naprednost tehnologije še ne pomeni večje učinkovitosti."
          className="reveal max-w-4xl"
        />

        <ul className="mt-16 grid gap-4 sm:mt-20 md:grid-cols-2 xl:grid-cols-3">
          {technologies.map((technology) => {
            const products = getProductsByTechnology(technology.id);
            return (
              <li
                key={technology.id}
                id={getTechnologyAnchor(technology.id)}
                className="reveal group flex scroll-mt-24 flex-col rounded-3xl bg-white/[0.03] p-7 ring-1 ring-white/10 transition duration-500 ring-inset hover:bg-white/[0.05] hover:ring-white/20 sm:p-8"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl bg-accent-300/10 text-accent-300 ring-1 ring-accent-300/20 ring-inset">
                  <TechIcon icon={technology.icon} className="size-8" />
                </span>
                <h3 className="mt-8 text-xl leading-snug font-semibold tracking-tight text-white">
                  {technology.name}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-300">{technology.howItWorks}</p>
                <p className="mt-4 text-sm text-ink-400">
                  <span className="text-ink-300">Kje: </span>
                  {technology.environment}
                </p>

                <details className="group/details mt-auto pt-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 border-t border-white/10 pt-5 text-sm font-medium text-accent-300 hover:text-accent-200">
                    Dokazi in kaj upoštevati
                    <ChevronDownIcon className="size-4 transition-transform group-open/details:rotate-180" />
                  </summary>
                  <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-ink-300">
                    <p>
                      <span className="block text-xs font-semibold tracking-wide text-ink-400 uppercase">
                        Uporaba
                      </span>
                      {technology.usedFor}
                    </p>
                    <p>
                      <span className="block text-xs font-semibold tracking-wide text-ink-400 uppercase">
                        Dokazi
                      </span>
                      {technology.evidence}
                    </p>
                    <p>
                      <span className="block text-xs font-semibold tracking-wide text-ink-400 uppercase">
                        Kaj upoštevati
                      </span>
                      {technology.professionalNote}
                    </p>
                    {products.length > 0 ? (
                      <p>
                        <span className="block text-xs font-semibold tracking-wide text-ink-400 uppercase">
                          Na platformi
                        </span>
                        {products.map((product, index) => (
                          <span key={product.slug}>
                            {index > 0 ? ", " : null}
                            <Link
                              href={getProductPath(product.slug)}
                              prefetch
                              className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-accent-300"
                            >
                              {product.productName}
                            </Link>
                          </span>
                        ))}
                      </p>
                    ) : null}
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
