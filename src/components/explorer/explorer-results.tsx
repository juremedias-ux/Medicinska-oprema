"use client";

import Link from "next/link";
import { useId, useState } from "react";

import { InquiryLink } from "@/components/inquiry/inquiry-context";
import { AlertCircleIcon, ArrowRightIcon, ChevronDownIcon } from "@/components/ui/icons";
import { TechIcon } from "@/components/ui/tech-icons";
import { getNeed, needTypeLabels } from "@/lib/explorer";
import { getProductPath, getProductsByTechnology } from "@/lib/products";
import { getTechnology } from "@/lib/technologies";
import { cn } from "@/lib/utils";
import type { Need, TechnologyId } from "@/types/technology";

const quickPicks = ["koleno", "mozganska-kap", "manj-bolecine"];

function TechnologyResult({ id }: { id: TechnologyId }) {
  const technology = getTechnology(id);
  const products = getProductsByTechnology(id);
  const [open, setOpen] = useState(false);
  const detailsId = useId();

  return (
    <li className="rounded-3xl bg-white p-5 ring-1 ring-ink-200/80 sm:p-6">
      <div className="flex gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-ink-950 text-accent-300">
          <TechIcon icon={technology.icon} className="size-7" />
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="text-lg leading-snug font-semibold text-ink-950">{technology.name}</h4>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">
            <span className="font-medium text-ink-900">Zakaj je povezano: </span>
            {technology.usedFor}
          </p>
          <p className="mt-2 text-sm text-ink-500">
            <span className="font-medium text-ink-700">Kje se uporablja: </span>
            {technology.environment}
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={() => setOpen((value) => !value)}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full px-1 text-sm font-medium text-accent-700 hover:text-accent-900"
      >
        {open ? "Manj podrobnosti" : "Kako deluje, dokazi in kaj upoštevati"}
        <ChevronDownIcon className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>

      <div
        id={detailsId}
        hidden={!open}
        className="mt-4 space-y-4 border-t border-ink-100 pt-4 text-[0.9375rem] leading-relaxed"
      >
        <p className="text-ink-700">
          <span className="block text-xs font-semibold tracking-wide text-ink-500 uppercase">
            Kako deluje
          </span>
          {technology.howItWorks}
        </p>
        <p className="text-ink-700">
          <span className="block text-xs font-semibold tracking-wide text-ink-500 uppercase">
            Dokazi na splošno
          </span>
          {technology.evidence}
        </p>
        <p className="text-ink-700">
          <span className="block text-xs font-semibold tracking-wide text-ink-500 uppercase">
            Kaj upoštevati
          </span>
          {technology.professionalNote}
        </p>
        {products.length > 0 ? (
          <div>
            <span className="block text-xs font-semibold tracking-wide text-ink-500 uppercase">
              Predstavljeni produkti
            </span>
            <ul className="mt-2 flex flex-wrap gap-2">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={getProductPath(product.slug)}
                    prefetch
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 px-3 py-1.5 text-sm font-medium text-ink-800 ring-1 ring-ink-200 ring-inset hover:bg-ink-100"
                  >
                    {product.manufacturer} — {product.productName}
                    <ArrowRightIcon className="size-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-ink-500">
            Produktov iz te kategorije na platformi še ne predstavljamo. Lahko nam pošljete povpraševanje.
          </p>
        )}
        <InquiryLink
          preset={{ inquiryType: "pomoc-pri-izbiri", technology: id }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-950 underline decoration-ink-300 underline-offset-4 hover:decoration-ink-950"
        >
          Vprašajte nas o tej tehnologiji
        </InquiryLink>
      </div>
    </li>
  );
}

export function ExplorerResults({ need, onSelect }: { need?: Need; onSelect: (id: string) => void }) {
  if (!need) {
    return (
      <div className="flex min-h-[28rem] flex-col justify-center rounded-4xl border border-dashed border-ink-300 bg-white/60 p-8 sm:p-12">
        <p className="font-mono text-xs tracking-[0.18em] text-ink-500 uppercase">Rezultati</p>
        <h3 className="mt-4 max-w-md text-2xl leading-snug font-semibold tracking-tight text-ink-950 sm:text-3xl">
          Izberite predel telesa, stanje ali cilj.
        </h3>
        <p className="mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-ink-600">
          Prikazali vam bomo tehnologije, ki se pri izbrani potrebi uporabljajo, z razlago, kje se uporabljajo
          in kdaj je potrebna strokovna presoja.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Predlogi za začetek">
          {quickPicks.map((id) => {
            const pick = getNeed(id);
            if (!pick) return null;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onSelect(id)}
                  className="rounded-full bg-ink-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-ink-800"
                >
                  {pick.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <article
      aria-labelledby="explorer-result-title"
      className="rounded-4xl bg-white p-6 shadow-soft ring-1 ring-ink-200/70 sm:p-10"
    >
      <p className="sr-only" aria-live="polite">
        {`Prikazanih ${need.technologies.length} tehnologij za: ${need.label}`}
      </p>
      <p className="font-mono text-xs tracking-[0.18em] text-accent-700 uppercase">
        {needTypeLabels[need.type].kicker}
      </p>
      <h3
        id="explorer-result-title"
        className="mt-3 text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl"
      >
        {need.label}
      </h3>
      <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-600">{need.intro}</p>

      <div className="mt-6 flex gap-3 rounded-2xl bg-amber-50 p-4 text-[0.9375rem] leading-relaxed text-amber-950 ring-1 ring-amber-200 ring-inset">
        <AlertCircleIcon className="mt-0.5 size-5 shrink-0 text-amber-700" />
        <p>
          <span className="font-semibold">Kdaj je potrebna strokovna presoja: </span>
          {need.seekCare}
        </p>
      </div>

      <h4 className="mt-10 text-sm font-semibold tracking-wide text-ink-900 uppercase">
        Tehnologije, ki se uporabljajo ({need.technologies.length})
      </h4>
      <ul className="mt-4 space-y-3">
        {need.technologies.map((id) => (
          <TechnologyResult key={id} id={id} />
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-4 border-t border-ink-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm leading-relaxed text-ink-500">
          Seznam ni razvrščen po učinkovitosti. O primernosti rešitve se posvetujte z zdravnikom ali
          fizioterapevtom.
        </p>
        <InquiryLink
          preset={{ inquiryType: "pomoc-pri-izbiri" }}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
        >
          Potrebujem pomoč pri izbiri
          <ArrowRightIcon className="size-4" />
        </InquiryLink>
      </div>
    </article>
  );
}
