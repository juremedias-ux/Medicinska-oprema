import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { InfoIcon, LinkedInIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { footerNav, legalNav, medicalDisclaimer, sectionIds, siteConfig } from "@/config/site";

import { CurrentYear } from "./current-year";
import { Logo } from "./logo";

const linkClass =
  "text-[0.9375rem] text-ink-400 transition-colors duration-200 hover:text-white focus-visible:text-white";

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-ink-400 uppercase">{title}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

export function SiteFooter() {
  const { contact } = siteConfig;

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      <Container className="relative pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ink-400">
              {siteConfig.shortDescription}
            </p>
            <Link
              href={`/#${sectionIds.newsletter}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition hover:bg-white/10"
            >
              Naročite se na novičke
            </Link>
          </div>

          <nav aria-label="Noga strani" className="grid gap-10 sm:grid-cols-2 lg:col-span-5">
            <FooterColumn title="Platforma">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
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

          <div className="lg:col-span-3">
            <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-ink-400 uppercase">
              Kontakt
            </h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-ink-300 hover:text-white"
                >
                  <MailIcon className="size-4 text-ink-400" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="flex items-center gap-3 text-ink-300 hover:text-white"
                >
                  <PhoneIcon className="size-4 text-ink-400" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3 text-ink-300">
                <MapPinIcon className="size-4 text-ink-400" />
                {contact.location}
              </li>
              <li>
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-ink-300 hover:text-white"
                >
                  <LinkedInIcon className="size-4 text-ink-400" />
                  LinkedIn
                  <span className="sr-only">(odpre se v novem oknu)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          <InfoIcon className="mt-0.5 size-5 shrink-0 text-accent-300" />
          <p className="text-sm leading-relaxed text-ink-400">
            <span className="font-medium text-white">Pomembno. </span>
            {medicalDisclaimer}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.legal.companyName}. Vse pravice pridržane.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
