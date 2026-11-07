import { NotifyForm } from "@/components/forms/notify-form";
import { Container } from "@/components/ui/container";
import { BellIcon, CheckIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import type { SignupSource } from "@/lib/forms";
import { getProductInterestOptions } from "@/lib/products";
import { cn } from "@/lib/utils";

const updates = [
  "Obvestilo, ko bo izdelek na voljo",
  "Dodatne informacije ob objavi",
  "Možnosti za sodelovanje",
];

type NotifySectionProps = {
  /** Must match the `sectionId` of the surrounding NotifyProvider. */
  id?: string;
  title?: string;
  description?: string;
  source?: SignupSource;
  className?: string;
};

export function NotifySection({
  id = sectionIds.notify,
  title = "Bodite med prvimi, ki izkoristijo nove tehnologije",
  description = "Nove produkte na slovenski trg uvajamo postopoma. Pustite nam svoje podatke in izberite izdelek, za katerega želite prejemati obvestila. Obvestili vas bomo, ko bo izdelek na voljo, ko bomo objavili dodatne informacije ali ko se bodo odprle možnosti za sodelovanje.",
  source = "website",
  className,
}: NotifySectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-naslov`}
      className={cn("relative overflow-hidden bg-white py-24 sm:py-32", className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-px w-[min(80rem,100%)] -translate-x-1/2 bg-gradient-to-r from-transparent via-ink-200 to-transparent"
      />
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-5">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-accent-50 text-accent-700 ring-1 ring-accent-200 ring-inset">
            <BellIcon className="size-6" />
          </span>
          <SectionHeading
            id={`${id}-naslov`}
            eyebrow="Obvestila"
            title={title}
            description={description}
            className="mt-8"
          />
          <ul className="mt-10 space-y-4">
            {updates.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[0.9375rem] font-medium text-ink-800">
                <span className="flex size-6 items-center justify-center rounded-full bg-ink-950 text-white">
                  <CheckIcon className="size-3.5" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal lg:col-span-7">
          <div className="rounded-4xl bg-white p-6 shadow-lift ring-1 ring-ink-200/70 sm:p-10">
            <NotifyForm options={getProductInterestOptions()} source={source} />
          </div>
        </div>
      </Container>
    </section>
  );
}
