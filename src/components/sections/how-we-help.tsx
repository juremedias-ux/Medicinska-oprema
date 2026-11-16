import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import type { FormSource } from "@/lib/forms";
import { getProductOptions } from "@/lib/products";
import { getRehabilitationTechnologies } from "@/lib/technologies";

const steps = [
  {
    title: "Raziščete možnosti",
    text: "Glede na predel telesa, stanje ali cilj pregledate tehnologije in predstavljene produkte.",
  },
  {
    title: "Razjasnimo zahteve",
    text: "Skupaj razjasnimo vaše zahteve in preverimo informacije o izbranem produktu.",
  },
  {
    title: "Pripravimo ponudbo",
    text: "Preverimo možnosti dobave in vam pripravimo ponudbo.",
  },
  {
    title: "Uredimo dobavo",
    text: "Po vaši potrditvi organiziramo naročilo, uvoz in dostavo v dogovorjenem obsegu.",
  },
];

const afterInquiry = [
  "Povpraševanje preberemo in po potrebi postavimo dodatna vprašanja.",
  "Preverimo informacije proizvajalca in možnosti dobave v Slovenijo.",
  "Odgovorimo vam po e-pošti s ponudbo ali pojasnilom, zakaj dobava ni mogoča.",
];

export function InquiryBlock({
  sectionId = sectionIds.inquiry,
  source = "website",
  title = "Pošljite povpraševanje za produkt",
}: {
  sectionId?: string;
  source?: FormSource;
  title?: string;
}) {
  const technologies = getRehabilitationTechnologies().map((technology) => ({
    value: technology.id,
    label: technology.name,
  }));

  return (
    <section id={sectionId} aria-labelledby={`${sectionId}-naslov`} className="scroll-mt-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h3
            id={`${sectionId}-naslov`}
            className="text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl"
          >
            {title}
          </h3>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">
            Povejte nam, kateri produkt vas zanima. Povprašate lahko tudi za produkt, ki ga na platformi še
            ni.
          </p>
          <h4 className="mt-10 text-sm font-semibold tracking-wide text-ink-900 uppercase">Kaj sledi</h4>
          <ul className="mt-4 space-y-3">
            {afterInquiry.map((item) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-700">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ink-950 text-accent-300">
                  <CheckIcon className="size-3" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-2xl bg-white p-4 text-sm leading-relaxed text-ink-600 ring-1 ring-ink-200 ring-inset">
            Ne svetujemo glede zdravljenja. O primernosti rešitve se posvetujte z zdravnikom ali
            fizioterapevtom.
          </p>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-4xl bg-white p-6 shadow-lift ring-1 ring-ink-200/70 sm:p-10">
            <InquiryForm products={getProductOptions()} technologies={technologies} source={source} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowWeHelp() {
  return (
    <section
      id={sectionIds.howWeHelp}
      aria-labelledby="kako-pomagamo-naslov"
      className="bg-ink-50 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="kako-pomagamo-naslov"
          eyebrow="Kako pomagamo"
          title="Od raziskovanja do dostave."
          description="Ne ostanemo pri informacijah. Pomagamo vam pri pridobitvi izbranega produkta, tudi če ga v Sloveniji še ni mogoče kupiti."
          className="reveal"
        />

        <ol className="relative mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <span
            aria-hidden="true"
            className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-ink-200 lg:block"
          />
          {steps.map((step, index) => (
            <li key={step.title} className="reveal relative rounded-3xl bg-white p-7 ring-1 ring-ink-200/80">
              <span className="relative flex size-10 items-center justify-center rounded-full bg-ink-950 font-mono text-sm text-accent-300">
                {index + 1}
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink-950">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-24 sm:mt-28">
          <InquiryBlock />
        </div>
      </Container>
    </section>
  );
}
