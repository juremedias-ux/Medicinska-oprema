import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { InfoIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";
import { footerNav, legalNav, medicalDisclaimer, siteConfig } from "@/config/site";
import { getAllProducts, getProductPath } from "@/lib/products";

import { CurrentYear } from "./current-year";
import { Logo } from "./logo";

const linkClass =
  "text-[0.9375rem] text-ink-300 transition-colors duration-200 hover:text-white focus-visible:text-white";

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-ink-400 uppercase">{title}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

export function SiteFooter() {
  const products = getAllProducts();

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      <div
        aria-hidden="true"
        className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)] opacity-40"
      />
      <Container className="relative pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ink-300">
              {siteConfig.shortDescription}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white ring-1 ring-white/10 transition hover:bg-white/10"
              >
                <MailIcon className="size-4" />
                {siteConfig.contact.email}
              </a>
              <a
                href={siteConfig.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Medcore na LinkedInu (odpre se v novem oknu)"
                className="inline-flex size-9 items-center justify-center rounded-full bg-white/5 text-white ring-1 ring-white/10 transition hover:bg-white/10"
              >
                <LinkedInIcon className="size-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Noga strani" className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            <FooterColumn title="Medcore">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>
            <FooterColumn title="Portfolio">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link href={getProductPath(product.slug)} prefetch className={linkClass}>
                    {product.manufacturer}
                  </Link>
                </li>
              ))}
            </FooterColumn>
            <FooterColumn title="Pravno">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>
          </nav>
        </div>

        <div className="mt-16 flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <InfoIcon className="mt-0.5 size-5 shrink-0 text-accent-300" />
          <p className="text-sm leading-relaxed text-ink-300">
            <span className="font-medium text-white">Medicinsko obvestilo. </span>
            {medicalDisclaimer}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.legal.companyName}. Vse pravice pridržane.
          </p>
          <p>{siteConfig.contact.location}</p>
        </div>
      </Container>
    </footer>
  );
}
