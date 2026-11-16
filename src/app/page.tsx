import type { Metadata } from "next";

import { ExplorerProvider } from "@/components/explorer/explorer-context";
import { InquiryProvider } from "@/components/inquiry/inquiry-context";
import { CatalogSection } from "@/components/sections/catalog-section";
import { Criteria } from "@/components/sections/criteria";
import { ExplorerSection } from "@/components/sections/explorer-section";
import { Hero } from "@/components/sections/hero";
import { HowWeHelp } from "@/components/sections/how-we-help";
import { NewsletterSection, NewsSection } from "@/components/sections/news-section";
import { Professionals } from "@/components/sections/professionals";
import { TechnologiesSection } from "@/components/sections/technologies-section";
import { ValueStrip } from "@/components/sections/value-strip";
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
    <ExplorerProvider>
      <InquiryProvider>
        <Hero />
        <ValueStrip />
        <ExplorerSection />
        <TechnologiesSection />
        <CatalogSection />
        <HowWeHelp />
        <Criteria />
        <Professionals />
        <NewsSection />
        <NewsletterSection />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </InquiryProvider>
    </ExplorerProvider>
  );
}
