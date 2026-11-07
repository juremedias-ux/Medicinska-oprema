import Link from "next/link";

import { ButtonArrow, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MailIcon } from "@/components/ui/icons";
import { sectionIds, siteConfig } from "@/config/site";

export function ProductContactCta({ productName }: { productName: string }) {
  return (
    <section className="bg-white pb-24 sm:pb-32">
      <Container>
        <div className="relative overflow-hidden rounded-4xl bg-ink-950 px-7 py-12 sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_right,black,transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-accent-600/25 blur-3xl"
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Imate vprašanje o izdelku {productName}?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-300">
                Predstavimo vam izdelek, možnosti sodelovanja in podporo pri uvajanju v vašo prakso.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/#${sectionIds.contact}`}
                className={buttonVariants({ variant: "light", size: "lg" })}
              >
                Kontaktirajte nas
                <ButtonArrow />
              </Link>
              <a
                href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(`Vprašanje: ${productName}`)}`}
                className={buttonVariants({ variant: "outline-light", size: "lg" })}
              >
                <MailIcon />
                Pišite nam
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
