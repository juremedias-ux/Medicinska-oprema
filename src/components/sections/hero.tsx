import { ExplorerLink } from "@/components/explorer/explorer-context";
import { ButtonArrow, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { getNeedsByType } from "@/lib/explorer";

import { NewsletterForm } from "@/components/newsletter/newsletter-form";

import { HeroVisual } from "./hero-visual";

/** Short labels for the entry chips (full labels appear in the explorer). */
const chipLabels: Record<string, string> = {
  glava: "Nevrološka rehabilitacija",
  roka: "Komolec in roka",
  stopalo: "Gleženj in stopalo",
  hrbet: "Hrbet",
  kolk: "Kolk",
};

export function Hero() {
  const regions = getNeedsByType("predel");

  return (
    <section aria-labelledby="hero-title" className="surface-dark relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,black_10%,transparent_65%)]"
      />
      <Container className="relative grid items-center gap-14 pt-28 pb-20 sm:pt-32 lg:min-h-[min(100svh,58rem)] lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:pb-12">
        <div className="lg:col-span-7">
          <Eyebrow tone="dark" className="animate-fade-up">
            Medcore · Tehnologije za rehabilitacijo
          </Eyebrow>

          <h1
            id="hero-title"
            className="mt-6 text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.045em] text-white sm:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]"
          >
            Napredna tehnologija.
            <span className="block text-ink-400">Nove možnosti za vaše okrevanje.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300 sm:text-[1.1875rem] sm:leading-relaxed">
            Odkrijte sodobne rešitve za rehabilitacijo z vsega sveta. Pomagamo vam razumeti možnosti, izbrati
            ustrezen produkt ter urediti njegov uvoz in dobavo.
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-4 [animation-delay:120ms]">
            <ExplorerLink className={buttonVariants({ variant: "accent", size: "lg" })}>
              Raziščite rešitve
              <ButtonArrow />
            </ExplorerLink>
            <a
              href={`#${sectionIds.howWeHelp}`}
              className="group inline-flex items-center gap-2 text-base font-medium text-white underline decoration-white/25 underline-offset-[6px] transition hover:decoration-accent-300"
            >
              Kako vam pomagamo
            </a>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <p id="hero-entry" className="text-sm font-medium text-ink-300">
              Začnite pri predelu telesa
            </p>
            <ul aria-labelledby="hero-entry" className="mt-4 flex flex-wrap gap-2">
              {regions.map((region) => (
                <li key={region.id}>
                  <ExplorerLink
                    needId={region.id}
                    className="inline-flex min-h-10 items-center rounded-full bg-white/[0.04] px-4 text-sm text-ink-200 ring-1 ring-white/10 transition ring-inset hover:bg-white/10 hover:text-white hover:ring-accent-300/50"
                  >
                    {chipLabels[region.id] ?? region.label}
                  </ExplorerLink>
                </li>
              ))}
            </ul>
            <ExplorerLink
              tab="cilj"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-300 transition hover:text-accent-200"
            >
              ali izberite cilj rehabilitacije
              <span aria-hidden="true">→</span>
            </ExplorerLink>
          </div>
        </div>

        <div className="flex animate-fade-up flex-col gap-10 [animation-delay:200ms] lg:col-span-5 lg:gap-6">
          <HeroVisual className="order-last max-w-[22rem] lg:order-first lg:max-w-[25rem]" />
          <section
            aria-labelledby="hero-novicke"
            className="order-first rounded-3xl bg-white/[0.03] p-5 ring-1 ring-white/10 ring-inset sm:p-6 lg:order-last"
          >
            <h2 id="hero-novicke" className="text-base font-semibold text-white">
              Novičke o napredku rehabilitacije
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-ink-400">
              Nove tehnologije, obetavni produkti in pomembne novosti na vaš e-poštni naslov.
            </p>
            <div className="mt-4">
              <NewsletterForm compact />
            </div>
          </section>
        </div>
      </Container>
    </section>
  );
}
