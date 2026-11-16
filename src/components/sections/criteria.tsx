import type { ComponentType, SVGProps } from "react";

import { EvidenceBadge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import {
  AlertCircleIcon,
  BuildingIcon,
  FileTextIcon,
  ScaleIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { evidenceLabels } from "@/lib/evidence";

const criteria: { title: string; text: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  {
    title: "Namen uporabe",
    text: "Za koga in za kaj je produkt namenjen po navedbah proizvajalca ter v kakšnem okolju se uporablja.",
    icon: FileTextIcon,
  },
  {
    title: "Kakovost dokazov",
    text: "Ali obstajajo objavljene raziskave, kako obsežne so in ali gre za navedbe proizvajalca ali neodvisne vire.",
    icon: ScaleIcon,
  },
  {
    title: "Omejitve",
    text: "Česa produkt ne nadomešča, pri kom ni primeren in katerih podatkov še ni.",
    icon: AlertCircleIcon,
  },
  {
    title: "Varnostne informacije",
    text: "Opozorila, kontraindikacije in pogoji varne uporabe iz dokumentacije proizvajalca.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Proizvajalec",
    text: "Kdo produkt razvija, kakšen je njegov regulativni status in na katerih trgih je na voljo.",
    icon: BuildingIcon,
  },
  {
    title: "Možnosti dobave",
    text: "Ali in kako je produkt mogoče pridobiti v Sloveniji ter kaj obsega dobava.",
    icon: TruckIcon,
  },
];

const legend = ["regulativa", "raziskava", "proizvajalec", "v-preverjanju"] as const;

export function Criteria() {
  return (
    <section
      id={sectionIds.criteria}
      aria-labelledby="merila-naslov"
      className="surface-dark relative overflow-hidden py-24 sm:py-32"
    >
      <Container className="relative">
        <SectionHeading
          id="merila-naslov"
          tone="dark"
          size="display"
          eyebrow="Kako presojamo tehnologije"
          title={
            <>
              Naprednost ni isto
              <span className="block text-ink-400">kot učinkovitost.</span>
            </>
          }
          description="Zato vsako tehnologijo predstavimo po enakih merilih in ne objavljamo lestvic »najboljših« produktov brez pregledne metodologije in primerjalnih dokazov."
          className="reveal max-w-4xl"
        />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {criteria.map(({ title, text, icon: Icon }) => (
            <li key={title} className="bg-ink-950 p-7 sm:p-9">
              <Icon className="size-6 text-accent-300" />
              <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">{text}</p>
            </li>
          ))}
        </ul>

        <div className="reveal mt-16 rounded-3xl bg-white p-7 text-ink-900 sm:p-10">
          <h3 className="text-xl font-semibold tracking-tight">Kako označujemo informacije</h3>
          <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-600">
            Ob vsakem podatku o produktu navedemo, od kod izvira. Tako lahko sami presodite, koliko mu
            zaupate.
          </p>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {legend.map((kind) => (
              <div key={kind}>
                <dt>
                  <EvidenceBadge kind={kind} />
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink-600">
                  {evidenceLabels[kind].description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
