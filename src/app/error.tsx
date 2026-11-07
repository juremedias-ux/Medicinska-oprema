"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-gradient-to-b from-ink-50 to-white">
      <Container
        size="narrow"
        className="flex min-h-[70vh] flex-col items-center justify-center pt-32 pb-24 text-center"
      >
        <Eyebrow>Napaka</Eyebrow>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-ink-950 sm:text-5xl">
          Prišlo je do nepričakovane napake
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
          Opravičujemo se za nevšečnosti. Poskusite znova ali se vrnite na začetno stran.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={() => retry()}>
            Poskusi znova
          </Button>
          <Link href="/" className={buttonVariants({ variant: "secondary", size: "lg" })}>
            Na začetno stran
          </Link>
        </div>
      </Container>
    </section>
  );
}
