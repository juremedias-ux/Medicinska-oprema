import { NotifyLink } from "@/components/forms/notify-context";
import { ButtonArrow, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/section-heading";
import { notifyCtaLabel, sectionIds, siteConfig } from "@/config/site";

import { HeroVisual } from "./hero-visual";

const highlights = [
  "5 izbranih tehnologij",
  "Lokalna distribucija in podpora",
  "Za strokovnjake in uporabnike",
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-b from-ink-50 via-white to-white"
    >
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-accent-200/30 blur-3xl"
      />

      <Container className="relative grid items-center gap-16 pt-32 pb-24 sm:pt-36 lg:grid-cols-12 lg:gap-12 lg:pt-40 lg:pb-32">
        <div className="lg:col-span-7">
          <Eyebrow className="animate-fade-up">{siteConfig.tagline}</Eyebrow>

          <h1
            id="hero-title"
            className="mt-6 text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.035em] text-ink-950 sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]"
          >
            Vrhunske medicinske tehnologije{" "}
            <span className="text-ink-500">za hitrejše celjenje in natančnejšo diagnostiko.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-600 sm:text-xl sm:leading-relaxed">
            Medcore na slovenski trg uvaja izbrane inovativne medicinske in fizioterapevtske produkte iz
            Evrope in ZDA. Zastopamo tehnologije, ki zdravstvenim strokovnjakom in uporabnikom prinašajo
            dostop do naprednejših rešitev.
          </p>

          <div className="mt-10 flex animate-fade-up flex-col gap-3 [animation-delay:120ms] sm:flex-row">
            <a href={`#${sectionIds.products}`} className={buttonVariants({ size: "lg" })}>
              Raziskuj izdelke
              <ButtonArrow />
            </a>
            <NotifyLink className={buttonVariants({ variant: "secondary", size: "lg" })}>
              {notifyCtaLabel}
            </NotifyLink>
          </div>

          <ul className="mt-12 flex flex-col gap-3 text-sm text-ink-600 sm:flex-row sm:flex-wrap sm:gap-x-7">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-accent-100 text-accent-700">
                  <CheckIcon className="size-3" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up [animation-delay:200ms] lg:col-span-5">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
