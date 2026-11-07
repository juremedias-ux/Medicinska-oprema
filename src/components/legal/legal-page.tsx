import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";

type LegalPageProps = {
  title: string;
  intro: string;
  children: ReactNode;
};

export function LegalPage({ title, intro, children }: LegalPageProps) {
  return (
    <article className="bg-white">
      <header className="relative overflow-hidden bg-gradient-to-b from-ink-50 to-white">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_65%)]"
        />
        <Container size="narrow" className="relative pt-32 pb-12 sm:pt-40 sm:pb-16">
          <nav aria-label="Drobtinice" className="text-sm text-ink-500">
            <Link href="/" className="transition-colors hover:text-ink-950">
              Domov
            </Link>
            <span aria-hidden="true" className="mx-2 text-ink-300">
              /
            </span>
            <span aria-current="page" className="font-medium text-ink-800">
              {title}
            </span>
          </nav>
          <Eyebrow className="mt-10">Pravne informacije</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-ink-950 sm:text-5xl">{title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-600">{intro}</p>
          <p className="mt-6 font-mono text-xs tracking-wide text-ink-500">
            Zadnja posodobitev: {siteConfig.legal.lastUpdated}
          </p>
        </Container>
      </header>
      <Container size="narrow" className="pb-24 sm:pb-32">
        <div className="prose-medcore max-w-3xl">{children}</div>
      </Container>
    </article>
  );
}

/** Company identification block, built from siteConfig.legal (empty fields are skipped). */
export function CompanyDetails() {
  const { companyName, address, registrationNumber, vatId } = siteConfig.legal;
  return (
    <ul>
      <li>
        <strong>{companyName}</strong>
      </li>
      <li>{address}</li>
      {registrationNumber ? <li>Matična številka: {registrationNumber}</li> : null}
      {vatId ? <li>ID za DDV: {vatId}</li> : null}
      <li>
        E-pošta: <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
      </li>
    </ul>
  );
}
