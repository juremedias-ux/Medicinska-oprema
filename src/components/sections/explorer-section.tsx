"use client";

import { Explorer } from "@/components/explorer/explorer";
import { useExplorer } from "@/components/explorer/explorer-context";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";

export function ExplorerSection() {
  const { sectionRef } = useExplorer();

  return (
    <section
      ref={sectionRef}
      id={sectionIds.explorer}
      aria-labelledby="raziskovanje-naslov"
      className="relative scroll-mt-16 bg-ink-50 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="raziskovanje-naslov"
          eyebrow="Raziskovanje"
          title="Začnite pri tem, kar potrebujete."
          description="Izberite predel telesa, znano stanje ali cilj rehabilitacije. Za vsako izbiro pojasnimo, katere tehnologije se uporabljajo, zakaj in kdaj je potrebna strokovna presoja."
          className="reveal"
        />
        <div className="mt-14 sm:mt-16">
          <Explorer />
        </div>
      </Container>
    </section>
  );
}
