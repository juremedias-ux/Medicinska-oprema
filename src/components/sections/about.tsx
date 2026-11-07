import { Container } from "@/components/ui/container";
import { GlobeIcon, LayersIcon, MapPinIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";

const valuePoints = [
  { title: "Izbrani globalni proizvajalci", icon: GlobeIcon },
  { title: "Inovativne tehnološko podprte rešitve", icon: LayersIcon },
  { title: "Lokalna distribucija in podpora", icon: MapPinIcon },
];

export function About() {
  return (
    <section
      id={sectionIds.about}
      aria-labelledby="o-nas-naslov"
      className="relative bg-white py-24 sm:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            id="o-nas-naslov"
            eyebrow="O nas"
            title="Dostop do tehnologij, ki spreminjajo oskrbo"
            className="reveal lg:col-span-5"
          />
          <div className="reveal space-y-6 text-lg leading-relaxed text-ink-600 lg:col-span-7 lg:pt-12">
            <p>
              Medcore zastopa izbrane proizvajalce in inovativne medicinske tehnologije iz Evrope ter ZDA. Naš
              portfolio vključuje produkte z močno tehnološko, znanstveno ali klinično podlago, vključno z
              rešitvami podjetij, ki so razvijala svoje tehnologije s podporo venture kapitala.
            </p>
            <p>
              Naš cilj je na slovenski trg uvajati diferencirane produkte, ki prinašajo dodano vrednost v
              sodobni zdravstveni oskrbi.
            </p>
          </div>
        </div>

        <ul className="reveal mt-16 grid overflow-hidden rounded-3xl bg-ink-50 ring-1 ring-ink-200/70 sm:mt-20 md:grid-cols-3">
          {valuePoints.map(({ title, icon: Icon }, index) => (
            <li
              key={title}
              className="flex items-center gap-5 border-ink-200/70 p-6 not-first:border-t sm:p-8 md:not-first:border-t-0 md:not-first:border-l"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-accent-700 shadow-soft ring-1 ring-ink-200/60">
                <Icon className="size-6" />
              </span>
              <div>
                <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-ink-500">0{index + 1}</p>
                <p className="mt-1 text-[1.0625rem] leading-snug font-semibold text-ink-950">{title}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
