import { CheckIcon, DownloadIcon, FileTextIcon, InfoIcon } from "@/components/ui/icons";
import type {
  ProductDownload,
  ProductFaqItem,
  ProductIntendedUse,
  ProductKeyBenefit,
  ProductSpecificationGroup,
} from "@/types/product";

import { DetailSection } from "./detail-section";

/*
 * Product detail sections. Each renders only when its data exists in
 * `src/data/products.ts` → `details`, so pages grow with the content.
 */

export function ProductOverview({ paragraphs }: { paragraphs: string[] }) {
  return (
    <DetailSection id="opis" title="Opis izdelka">
      <div className="prose-medcore max-w-none">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </DetailSection>
  );
}

export function ProductKeyBenefits({ benefits }: { benefits: ProductKeyBenefit[] }) {
  return (
    <DetailSection id="kljucne-prednosti" title="Ključne prednosti">
      <ul className="grid gap-4 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="rounded-2xl bg-white p-6 ring-1 ring-ink-200/70">
            <span className="flex size-9 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
              <CheckIcon className="size-4" strokeWidth={2.25} />
            </span>
            <h3 className="mt-5 text-[1.0625rem] font-semibold text-ink-950">{benefit.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{benefit.description}</p>
          </li>
        ))}
      </ul>
    </DetailSection>
  );
}

export function ProductSpecifications({ groups }: { groups: ProductSpecificationGroup[] }) {
  return (
    <DetailSection id="tehnicne-specifikacije" title="Tehnične specifikacije">
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

function BulletList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-[1.0625rem] font-semibold text-ink-950">{title}</h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-600">
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductIntendedUseSection({ intendedUse }: { intendedUse: ProductIntendedUse }) {
  return (
    <DetailSection id="namen-uporabe" title="Namen uporabe in indikacije">
      <div className="space-y-8 rounded-2xl bg-white p-6 ring-1 ring-ink-200/70 sm:p-8">
        {intendedUse.summary ? (
          <p className="text-[1.0625rem] leading-relaxed text-ink-700">{intendedUse.summary}</p>
        ) : null}
        {intendedUse.indications?.length ? (
          <BulletList title="Indikacije" items={intendedUse.indications} />
        ) : null}
        {intendedUse.contraindications?.length ? (
          <BulletList title="Kontraindikacije" items={intendedUse.contraindications} />
        ) : null}
        {intendedUse.note ? (
          <p className="flex gap-3 rounded-xl bg-ink-50 px-4 py-3 text-sm leading-relaxed text-ink-600">
            <InfoIcon className="mt-0.5 size-4 shrink-0 text-accent-700" />
            {intendedUse.note}
          </p>
        ) : null}
      </div>
    </DetailSection>
  );
}

export function ProductDownloads({ downloads }: { downloads: ProductDownload[] }) {
  return (
    <DetailSection id="dokumentacija" title="Dokumentacija za prenos">
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

export function ProductFaq({ items }: { items: ProductFaqItem[] }) {
  return (
    <DetailSection id="pogosta-vprasanja" title="Pogosta vprašanja">
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

const pendingLabels = {
  specifications: "Tehnične specifikacije",
  intendedUse: "Namen uporabe in indikacije",
  downloads: "Dokumentacija za prenos",
  faq: "Pogosta vprašanja",
} as const;

export type PendingSection = keyof typeof pendingLabels;

/** Communicates which detail sections will be published at market launch. */
export function ProductPendingInfo({ sections }: { sections: PendingSection[] }) {
  if (sections.length === 0) return null;

  return (
    <section className="rounded-3xl border border-dashed border-ink-300 bg-ink-50/60 p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-ink-950">Podrobne informacije so v pripravi</h2>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
        Ob uvedbi izdelka na slovenski trg bomo na tej strani objavili še naslednje vsebine:
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {sections.map((section) => (
          <li
            key={section}
            className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink-700 ring-1 ring-ink-200/80"
          >
            {pendingLabels[section]}
          </li>
        ))}
      </ul>
    </section>
  );
}
