import type { Metadata } from "next";

import { NotifyProvider } from "@/components/forms/notify-context";
import { About } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact-section";
import { Hero } from "@/components/sections/hero";
import { NotifySection } from "@/components/sections/notify-section";
import { Portfolio } from "@/components/sections/portfolio";
import { WhyMedcore } from "@/components/sections/why-medcore";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { buildPageMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  absoluteTitle: siteConfig.title,
  description: siteConfig.description,
});

export default function HomePage() {
  return (
    <NotifyProvider>
      <Hero />
      <About />
      <WhyMedcore />
      <Portfolio />
      <NotifySection />
      <ContactSection />
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
    </NotifyProvider>
  );
}
