import type { Metadata } from "next";
import Link from "next/link";

import { ButtonArrow, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";

export const metadata: Metadata = {
  title: "Stran ni najdena",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ink-50 to-white">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]"
      />
      <Container
        size="narrow"
        className="relative flex min-h-[70vh] flex-col items-center justify-center pt-32 pb-24 text-center"
      >
        <Eyebrow>Napaka 404</Eyebrow>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-ink-950 sm:text-5xl">
          Strani, ki jo iščete, ni mogoče najti
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
          Povezava je morda zastarela ali pa je bila stran premaknjena. Nadaljujte na začetni strani ali si
          oglejte naš portfolio.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            Na začetno stran
            <ButtonArrow />
          </Link>
          <Link
            href={`/#${sectionIds.products}`}
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Ogled izdelkov
          </Link>
        </div>
      </Container>
    </section>
  );
}
