import Image from "next/image";
import type { ReactNode } from "react";

import { EvidenceBadge } from "@/components/ui/badge";
import { AlertCircleIcon, ArrowUpRightIcon, DownloadIcon, FileTextIcon } from "@/components/ui/icons";
import { formatDate } from "@/lib/format";
import type {
  EvidenceItem,
  ProductDownload,
  ProductFaqItem,
  ProductGalleryImage,
  ProductSpecificationGroup,
  RegulatoryEntry,
} from "@/types/product";

import { DetailSection } from "./detail-section";

/*
 * Product page sections. Missing information is shown explicitly as
 * "v preverjanju" instead of being hidden or replaced with marketing copy.
 */

export function Missing({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-ink-300 bg-ink-50/60 p-5">
      <EvidenceBadge kind="v-preverjanju" />
      <p className="text-[0.9375rem] leading-relaxed text-ink-600">{children}</p>
    </div>
  );
}

export function ProductPurpose({
  id,
  intendedUse,
  environment,
}: {
  id: string;
  intendedUse: string;
  environment: string | null;
}) {
  return (
    <DetailSection id={id} title="Namen in okolje uporabe">
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-ink-200/70">
          <dt className="text-xs font-semibold tracking-wide text-ink-500 uppercase">Namen uporabe</dt>
          <dd className="mt-2 text-[1.0625rem] leading-relaxed text-ink-900">{intendedUse}</dd>
        </div>
        <div className="rounded-2xl bg-white p-6 ring-1 ring-ink-200/70">
          <dt className="text-xs font-semibold tracking-wide text-ink-500 uppercase">Predvideno okolje</dt>
          <dd className="mt-2 text-[1.0625rem] leading-relaxed text-ink-900">
            {environment ?? <span className="text-ink-500 italic">V preverjanju pri proizvajalcu.</span>}
          </dd>
        </div>
      </dl>
    </DetailSection>
  );
}

export function ProductHowItWorks({ id, text }: { id: string; text: string | null }) {
  return (
    <DetailSection id={id} title="Kako deluje">
      {text ? (
        <p className="max-w-3xl text-[1.0625rem] leading-relaxed text-ink-700">{text}</p>
      ) : (
        <Missing>Podrobnosti o načinu delovanja preverjamo v dokumentaciji proizvajalca.</Missing>
      )}
    </DetailSection>
  );
}

export function ProductClaimsAndLimits({
  id,
  claims,
  limitations,
  warnings,
}: {
  id: string;
  claims: string[];
  limitations: string[];
  warnings: string[];
}) {
  return (
    <DetailSection id={id} title="Koristi, omejitve in opozorila">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-ink-200/70">
          <div className="flex flex-col items-start gap-2">
            <h3 className="text-base font-semibold text-ink-950">Možne koristi</h3>
            <EvidenceBadge kind="proizvajalec" />
          </div>
          {claims.length > 0 ? (
            <ul className="mt-4 space-y-2.5">
              {claims.map((claim) => (
                <li key={claim} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-700">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                  {claim}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-[0.9375rem] text-ink-500 italic">Ni podatka.</p>
          )}
          <p className="mt-4 text-xs leading-relaxed text-ink-500">
            Navedbe proizvajalca, ki jih nismo neodvisno preverili.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 ring-1 ring-ink-200/70">
          <h3 className="text-base font-semibold text-ink-950">Omejitve</h3>
          {limitations.length > 0 ? (
            <ul className="mt-4 space-y-2.5">
              {limitations.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-700">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ink-400" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4">
              <Missing>Omejitev iz dokumentacije še nismo pregledali.</Missing>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 ring-1 ring-ink-200/70">
          <h3 className="flex items-center gap-2 text-base font-semibold text-ink-950">
            <AlertCircleIcon className="size-5 text-amber-700" />
            Opozorila
          </h3>
          {warnings.length > 0 ? (
            <ul className="mt-4 space-y-2.5">
              {warnings.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-700">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-amber-600" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4">
              <Missing>Opozorila iz navodil za uporabo bomo objavili po pregledu dokumentacije.</Missing>
            </div>
          )}
        </div>
      </div>
    </DetailSection>
  );
}

function SourceLinks({ sources }: { sources: { label: string; url: string }[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {sources.map((source) => (
        <li key={source.url}>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-ink-900 underline decoration-ink-300 underline-offset-4 hover:decoration-ink-900"
          >
            {source.label}
            <ArrowUpRightIcon className="size-3.5" />
            <span className="sr-only">(odpre se v novem oknu)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ProductEvidence({ id, evidence }: { id: string; evidence: EvidenceItem[] }) {
  const independent = evidence.filter((item) => item.kind === "raziskava" || item.kind === "regulativa");
  const manufacturer = evidence.filter((item) => item.kind === "proizvajalec" || item.kind === "medij");

  const renderItems = (items: EvidenceItem[]) => (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.title} className="rounded-2xl bg-white p-6 ring-1 ring-ink-200/70">
          <div className="flex flex-wrap items-center gap-3">
            <EvidenceBadge kind={item.kind} />
            {item.date ? (
              <time dateTime={item.date} className="text-sm text-ink-500">
                {formatDate(item.date)}
              </time>
            ) : null}
          </div>
          <h4 className="mt-3 text-[1.0625rem] font-semibold text-ink-950">{item.title}</h4>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-700">{item.summary}</p>
          <SourceLinks sources={item.sources} />
        </li>
      ))}
    </ul>
  );

  return (
    <DetailSection id={id} title="Dokazi in viri">
      <p className="max-w-3xl text-[0.9375rem] leading-relaxed text-ink-600">
        Ločeno prikazujemo raziskave in regulativne podatke ter navedbe proizvajalca. Število ali obseg virov
        ni ocena učinkovitosti.
      </p>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-ink-900 uppercase">
            Raziskave in regulativa
          </h3>
          <div className="mt-4">
            {independent.length > 0 ? (
              renderItems(independent)
            ) : (
              <Missing>Objavljenih raziskav ali regulativnih virov še nismo pregledali.</Missing>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-ink-900 uppercase">Navedbe proizvajalca</h3>
          <div className="mt-4">
            {manufacturer.length > 0 ? (
              renderItems(manufacturer)
            ) : (
              <Missing>Dodatnih navedb proizvajalca z viri še nismo zbrali.</Missing>
            )}
          </div>
        </div>
      </div>
    </DetailSection>
  );
}

export function ProductRegulatory({ id, entries }: { id: string; entries: RegulatoryEntry[] }) {
  return (
    <DetailSection id={id} title="Regulativni status">
      {entries.length > 0 ? (
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-ink-200/70">
          <table className="w-full text-left text-[0.9375rem]">
            <caption className="sr-only">Regulativni status po trgih</caption>
            <thead className="bg-ink-50 text-xs tracking-wide text-ink-500 uppercase">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">
                  Trg
                </th>
                <th scope="col" className="px-5 py-3 font-semibold">
                  Status
                </th>
                <th scope="col" className="hidden px-5 py-3 font-semibold sm:table-cell">
                  Vir podatka
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {entries.map((entry) => (
                <tr key={`${entry.region}-${entry.status}`} className="align-top">
                  <td className="px-5 py-4 font-medium text-ink-950">{entry.region}</td>
                  <td className="px-5 py-4 text-ink-700">
                    {entry.status}
                    <div className="mt-2 sm:hidden">
                      <EvidenceBadge kind={entry.basis} />
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 sm:table-cell">
                    <EvidenceBadge kind={entry.basis} />
                    {entry.source ? (
                      <a
                        href={entry.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex items-center gap-1 text-sm text-ink-700 underline decoration-ink-300 underline-offset-4 hover:decoration-ink-900"
                      >
                        {entry.source.label}
                        <ArrowUpRightIcon className="size-3.5" />
                      </a>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Missing>Regulativni status preverjamo.</Missing>
      )}
      <p className="mt-4 text-sm leading-relaxed text-ink-500">
        Regulativna odobritev določa namen in pogoje trženja; ni primerjava učinkovitosti z drugimi rešitvami.
      </p>
    </DetailSection>
  );
}

export function ProductSpecifications({ id, groups }: { id: string; groups: ProductSpecificationGroup[] }) {
  return (
    <DetailSection id={id} title="Tehnične specifikacije">
      <div className="space-y-6">
        {groups.map((group, index) => (
          <div
            key={group.title ?? index}
            className="overflow-hidden rounded-2xl bg-white ring-1 ring-ink-200/70"
          >
            {group.title ? (
              <h3 className="border-b border-ink-100 bg-ink-50 px-6 py-3 text-sm font-semibold text-ink-900">
                {group.title}
              </h3>
            ) : null}
            <dl className="divide-y divide-ink-100">
              {group.items.map((item) => (
                <div key={item.label} className="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-6">
                  <dt className="text-sm text-ink-500">{item.label}</dt>
                  <dd className="text-[0.9375rem] font-medium text-ink-950 sm:col-span-2">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </DetailSection>
  );
}

export function ProductDownloads({ id, downloads }: { id: string; downloads: ProductDownload[] }) {
  return (
    <DetailSection id={id} title="Dokumentacija za prenos">
      <ul className="grid gap-3">
        {downloads.map((file) => {
          const isExternal = /^https?:\/\//.test(file.href);
          return (
            <li key={file.href}>
              <a
                href={file.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
                className="group flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink-200/70 transition hover:shadow-soft hover:ring-ink-300"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ink-50 text-ink-700">
                  <FileTextIcon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-ink-950">{file.title}</span>
                  {file.description ? (
                    <span className="mt-0.5 block text-sm text-ink-500">{file.description}</span>
                  ) : null}
                </span>
                <span className="hidden font-mono text-xs text-ink-500 sm:block">
                  {[file.fileType, file.fileSize].filter(Boolean).join(" · ")}
                </span>
                <DownloadIcon className="size-5 shrink-0 text-ink-400 transition group-hover:text-accent-700" />
              </a>
            </li>
          );
        })}
      </ul>
    </DetailSection>
  );
}

export function ProductFaq({ id, items }: { id: string; items: ProductFaqItem[] }) {
  return (
    <DetailSection id={id} title="Pogosta vprašanja">
      <div className="divide-y divide-ink-200/70 rounded-2xl bg-white ring-1 ring-ink-200/70">
        {items.map((item) => (
          <details key={item.question} className="group px-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] font-medium text-ink-950">
              {item.question}
              <span
                aria-hidden="true"
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-600 transition group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-6 text-[0.9375rem] leading-relaxed text-ink-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </DetailSection>
  );
}

/**
 * Product photos without cropping. On wider screens each photo's share of the
 * row follows its aspect ratio, so photos of different formats end up the
 * same height.
 */
export function ProductGallery({ id, images }: { id: string; images: ProductGalleryImage[] }) {
  return (
    <DetailSection id={id} title="Fotografije">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {images.map((image) => (
          <figure
            key={image.src}
            className="min-w-0 sm:basis-0"
            style={{ flexGrow: image.width / image.height }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 560px, (min-width: 640px) 60vw, 100vw"
              className="h-auto w-full rounded-2xl bg-white ring-1 ring-ink-200/70"
            />
            {image.caption || image.credit ? (
              <figcaption className="mt-3 text-sm leading-relaxed text-ink-600">
                {image.caption}
                {image.caption && image.credit ? " · " : null}
                {image.credit ? <span className="text-ink-500">{image.credit}</span> : null}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </DetailSection>
  );
}
