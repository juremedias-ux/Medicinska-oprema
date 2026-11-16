"use client";

import { useId, useState } from "react";

import { SearchIcon } from "@/components/ui/icons";
import { normalizeSearch } from "@/lib/explorer";
import { getTechnology } from "@/lib/technologies";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import type { TechnologyId } from "@/types/technology";

import { ProductCard } from "./product-card";

/** Catalogue with category filter and text search (client-side). */
export function ProductCatalog({ products }: { products: Product[] }) {
  const searchId = useId();
  const [category, setCategory] = useState<TechnologyId | "vse">("vse");
  const [query, setQuery] = useState("");

  const categories = Array.from(new Set(products.map((product) => product.technology)));
  const term = normalizeSearch(query);

  const visible = products.filter((product) => {
    if (category !== "vse" && product.technology !== category) return false;
    if (term.length < 2) return true;
    const haystack = [product.productName, product.manufacturer, product.originalName, ...product.tags]
      .map(normalizeSearch)
      .join(" ");
    return haystack.includes(term);
  });

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filtrirajte po kategoriji"
          className="-mx-5 flex scrollbar-none gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {(["vse", ...categories] as const).map((id) => {
            const active = category === id;
            const count = id === "vse" ? products.length : products.filter((p) => p.technology === id).length;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ring-1 transition ring-inset",
                  active
                    ? "bg-ink-950 text-white ring-ink-950"
                    : "bg-white text-ink-700 ring-ink-200 hover:ring-ink-300",
                )}
              >
                {id === "vse" ? "Vse" : getTechnology(id).shortName}
                <span className={cn("font-mono text-xs", active ? "text-accent-300" : "text-ink-400")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <div className="relative w-full lg:max-w-xs">
          <label htmlFor={searchId} className="sr-only">
            Poiščite produkt
          </label>
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-400" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Poiščite produkt ali proizvajalca"
            className="h-11 w-full rounded-full border border-ink-200 bg-white pr-4 pl-12 text-[0.9375rem] text-ink-950 placeholder:text-ink-400 focus:border-accent-600 focus:ring-4 focus:ring-accent-600/12 focus:outline-none"
          />
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {`Prikazanih produktov: ${visible.length}`}
      </p>

      {visible.length > 0 ? (
        <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-3xl border border-dashed border-ink-300 p-10 text-center text-ink-600">
          Ni produktov, ki bi ustrezali iskanju. Če iščete produkt, ki ga še ni na platformi, nam pošljite
          povpraševanje.
        </p>
      )}
    </div>
  );
}
