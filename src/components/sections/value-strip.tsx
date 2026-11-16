import type { ComponentType, SVGProps } from "react";

import { Container } from "@/components/ui/container";
import { CompassIcon, LayersIcon, ShieldCheckIcon, TruckIcon } from "@/components/ui/icons";

const points: { title: string; text: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  {
    title: "Kaj najdete",
    text: "Pregled sodobnih tehnologij in produktov za rehabilitacijo z vsega sveta.",
    icon: LayersIcon,
  },
  {
    title: "Kako začnete",
    text: "Izberete predel telesa, stanje ali cilj in pregledate povezane rešitve.",
    icon: CompassIcon,
  },
  {
    title: "Zakaj lahko zaupate",
    text: "Navajamo vire, ločimo navedbe proizvajalcev od raziskav in označimo, česar še ne vemo.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Pomoč pri pridobitvi",
    text: "Preverimo možnosti dobave, pripravimo ponudbo ter po potrditvi uredimo uvoz in dostavo.",
    icon: TruckIcon,
  },
];

/** Answers the four first-visit questions directly below the hero. */
export function ValueStrip() {
  return (
    <section aria-labelledby="ponudba-naslov" className="bg-ink-950 pb-20 sm:pb-24">
      <Container>
        <h2 id="ponudba-naslov" className="sr-only">
          Kaj ponuja Medcore
        </h2>
        <ul className="grid gap-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ title, text, icon: Icon }) => (
            <li key={title} className="bg-ink-950 p-7 sm:p-8">
              <Icon className="size-6 text-accent-300" />
              <h3 className="mt-6 text-base font-semibold text-white">{title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
