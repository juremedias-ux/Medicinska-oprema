import { Container } from "@/components/ui/container";
import { LifeBuoyIcon, ShieldCheckIcon, SparkleIcon, UsersIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";

const benefits = [
  {
    title: "Zgodnji dostop do inovacij",
    description:
      "Uvajamo produkte, ki na slovenskem trgu še niso splošno dostopni in lahko uporabnikom prinesejo tehnično ali klinično prednost.",
    icon: SparkleIcon,
  },
  {
    title: "Izbrani proizvajalci",
    description:
      "Sodelujemo z razvijalci, ki vlagajo v raziskave, kakovost, regulativo in klinično validacijo.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Rešitve za zdravstvene strokovnjake in uporabnike",
    description:
      "Naši produkti so namenjeni bolnišnicam, ambulantam, fizioterapevtskim ordinacijam, domovom za starejše ter izbranim končnim uporabnikom.",
    icon: UsersIcon,
  },
  {
    title: "Podpora pri uvajanju",
    description:
      "Pomagamo pri predstavitvi produkta, izobraževanju, tehnični podpori in uvajanju v lokalno prakso.",
    icon: LifeBuoyIcon,
  },
];

export function WhyMedcore() {
  return (
    <section
      id={sectionIds.why}
      aria-labelledby="zakaj-medcore-naslov"
      className="relative overflow-hidden bg-ink-950 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_bottom_left,black_5%,transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -bottom-56 size-[40rem] rounded-full bg-accent-600/20 blur-3xl"
      />

      <Container className="relative">
        <SectionHeading
          id="zakaj-medcore-naslov"
          eyebrow="Prednosti"
          title="Zakaj Medcore"
          tone="dark"
          className="reveal"
        />

        <ul className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map(({ title, description, icon: Icon }, index) => (
            <li
              key={title}
              className="reveal group relative flex flex-col rounded-3xl bg-white/[0.035] p-7 ring-1 ring-white/10 transition duration-500 ring-inset hover:bg-white/[0.06] hover:ring-white/20 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-accent-500/15 text-accent-300 ring-1 ring-accent-300/20 ring-inset">
                  <Icon className="size-6" />
                </span>
                <span className="font-mono text-xs tracking-[0.16em] text-ink-400">0{index + 1}</span>
              </div>
              <h3 className="mt-10 text-xl leading-snug font-semibold tracking-tight text-white">{title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-300">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
