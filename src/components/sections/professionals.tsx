import { InquiryLink } from "@/components/inquiry/inquiry-context";
import { ButtonArrow, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";

const points = [
  "Informacije proizvajalca, regulativni status in viri na enem mestu",
  "Povpraševanje za produkte s platforme in zunaj nje",
  "Preverjanje možnosti dobave in ponudba za vašo ustanovo",
];

/** Secondary path for physiotherapists, clinics and other professional users. */
export function Professionals() {
  return (
    <section
      id={sectionIds.professionals}
      aria-labelledby="strokovnjaki-naslov"
      className="bg-white py-24 sm:py-28"
    >
      <Container>
        <div className="reveal grid gap-10 rounded-4xl bg-ink-50 p-8 ring-1 ring-ink-200/70 sm:p-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <Eyebrow>Za strokovne uporabnike</Eyebrow>
            <h2
              id="strokovnjaki-naslov"
              className="mt-5 text-3xl leading-tight font-semibold tracking-[-0.03em] text-ink-950 sm:text-4xl"
            >
              Fizioterapevti, klinike in druge ustanove
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              Iščete tehnologijo za svojo prakso? Pomagamo vam pridobiti informacije proizvajalca, preveriti
              možnosti dobave in pripraviti ponudbo.
            </p>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <ul className="space-y-3">
              {points.map((point) => (
                <li key={point} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-700">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-600" />
                  {point}
                </li>
              ))}
            </ul>
            <InquiryLink
              preset={{ requesterType: "strokovnjak" }}
              className={buttonVariants({
                variant: "primary",
                size: "lg",
                className: "mt-8 h-auto min-h-13 w-full py-3 text-center whitespace-normal sm:w-auto",
              })}
            >
              Povpraševanje za strokovne uporabnike
              <ButtonArrow />
            </InquiryLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
