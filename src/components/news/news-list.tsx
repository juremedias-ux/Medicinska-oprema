"use client";

import Link from "next/link";
import { useState } from "react";

import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { NewsItem, NewsKind } from "@/data/news";
import { newsKindLabels } from "@/data/news";
import { cn } from "@/lib/utils";

export type NewsListItem = NewsItem & { formattedDate: string; productName?: string; productPath?: string };

const filters: (NewsKind | "vse")[] = ["vse", "trg", "regulativa", "raziskava"];

const kindStyles: Record<NewsKind, string> = {
  trg: "bg-ink-100 text-ink-700",
  regulativa: "bg-accent-50 text-accent-800",
  raziskava: "bg-ink-950 text-white",
};

/** News cards with a filter that separates market news, regulation and research. */
export function NewsList({ items }: { items: NewsListItem[] }) {
  const [filter, setFilter] = useState<NewsKind | "vse">("vse");
  const visible = filter === "vse" ? items : items.filter((item) => item.kind === filter);

  return (
    <div>
      <div
        role="group"
        aria-label="Vrsta novice"
        className="-mx-5 flex scrollbar-none gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0"
      >
        {filters.map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium ring-1 transition ring-inset",
              filter === id
                ? "bg-ink-950 text-white ring-ink-950"
                : "bg-white text-ink-700 ring-ink-200 hover:ring-ink-300",
            )}
          >
            {id === "vse" ? "Vse" : newsKindLabels[id]}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{`Prikazanih novic: ${visible.length}`}</p>

      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <li key={item.id}>
            <article className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-ink-200/80 sm:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={cn(
                    "rounded-md px-2 py-0.5 font-mono text-[0.6875rem] font-medium tracking-wide uppercase",
                    kindStyles[item.kind],
                  )}
                >
                  {newsKindLabels[item.kind]}
                </span>
                <time dateTime={item.date} className="text-sm text-ink-500">
                  {item.formattedDate}
                </time>
              </div>
              <h3 className="mt-5 text-lg leading-snug font-semibold tracking-tight text-ink-950">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{item.summary}</p>
              <p className="mt-4 rounded-2xl bg-ink-50 p-4 text-sm leading-relaxed text-ink-700">
                <span className="font-semibold text-ink-900">Kaj to pomeni: </span>
                {item.meaning}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm">
                <a
                  href={item.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-ink-900 underline decoration-ink-300 underline-offset-4 hover:decoration-ink-900"
                >
                  Vir: {item.source.label}
                  <ArrowUpRightIcon className="size-3.5" />
                  <span className="sr-only">(odpre se v novem oknu)</span>
                </a>
                {item.productPath ? (
                  <Link href={item.productPath} prefetch className="text-accent-700 hover:text-accent-900">
                    {item.productName}
                  </Link>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
