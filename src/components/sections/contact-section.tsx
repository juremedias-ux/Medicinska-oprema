import type { ComponentType, SVGProps } from "react";

import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { LinkedInIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds, siteConfig } from "@/config/site";

type ContactItem = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const contactItems: ContactItem[] = [
  {
    label: "E-pošta",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    icon: MailIcon,
  },
  {
    label: "Telefon",
    value: siteConfig.contact.phoneDisplay,
    href: `tel:${siteConfig.contact.phoneHref}`,
    icon: PhoneIcon,
  },
  {
    label: "Lokacija",
    value: siteConfig.contact.location,
    icon: MapPinIcon,
  },
  {
    label: "LinkedIn",
    value: "Medcore na LinkedInu",
    href: siteConfig.contact.linkedinUrl,
    external: true,
    icon: LinkedInIcon,
  },
];

export function ContactSection() {
  return (
    <section
      id={sectionIds.contact}
      aria-labelledby="kontakt-naslov"
      className="relative bg-ink-50 py-24 sm:py-32"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-5">
          <SectionHeading
            id="kontakt-naslov"
            eyebrow="Kontakt"
            title="Pogovorimo se o sodelovanju"
            description="Ste zdravstveni strokovnjak, fizioterapevt, lastnik ambulante, predstavnik bolnišnice, distributer ali potencialni partner? Pišite nam in predstavili vam bomo rešitve, najbolj relevantne za vaše potrebe."
          />

          <ul className="mt-10 divide-y divide-ink-200/80 border-y border-ink-200/80">
            {contactItems.map(({ label, value, href, external, icon: Icon }) => {
              const content = (
                <>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-accent-700 shadow-soft ring-1 ring-ink-200/60">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium tracking-wide text-ink-500">{label}</span>
                    <span className="block truncate text-[1.0625rem] font-medium text-ink-950">{value}</span>
                  </span>
                </>
              );

              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(external
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                            "aria-label": `${value} (odpre se v novem oknu)`,
                          }
                        : {})}
                      className="group flex items-center gap-4 py-4 transition-colors hover:text-accent-800"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 py-4">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="reveal lg:col-span-7">
          <div className="rounded-4xl bg-white p-6 shadow-soft ring-1 ring-ink-200/70 sm:p-10">
            <h3 className="text-xl font-semibold tracking-tight text-ink-950">
              Želite, da vas kontaktiramo?
            </h3>
            <p className="mt-2 text-[0.9375rem] text-ink-600">
              Pustite nam svoj e-poštni naslov in oglasili se vam bomo.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
