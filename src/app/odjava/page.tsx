import type { Metadata } from "next";
import Link from "next/link";

import { UnsubscribeForm } from "@/components/newsletter/unsubscribe-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Odjava od novičk",
  description: "Odjava od prejemanja novičk Medcore.",
  path: "/odjava",
  noIndex: true,
});

export default function UnsubscribePage() {
  return (
    <section className="bg-ink-50">
      <Container size="narrow" className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <nav aria-label="Drobtinice" className="text-sm text-ink-500">
          <Link href="/" className="hover:text-ink-950">
            Domov
          </Link>
          <span aria-hidden="true" className="mx-2 text-ink-300">
            /
          </span>
          <span aria-current="page" className="font-medium text-ink-800">
            Odjava od novičk
          </span>
        </nav>
        <Eyebrow className="mt-10">Novičke</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-ink-950 sm:text-5xl">
          Odjava od novičk
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
          Vpišite e-poštni naslov, s katerim ste se prijavili. Novičk na ta naslov ne bomo več pošiljali. Iz
          varnostnih razlogov ne razkrijemo, ali je bil naslov prijavljen.
        </p>
        <div className="mt-10 max-w-xl rounded-4xl bg-white p-6 shadow-soft ring-1 ring-ink-200/70 sm:p-10">
          <UnsubscribeForm />
        </div>
      </Container>
    </section>
  );
}
