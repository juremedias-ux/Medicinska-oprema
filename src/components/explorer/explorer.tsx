"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

import { CloseIcon, SearchIcon } from "@/components/ui/icons";
import { TechIcon } from "@/components/ui/tech-icons";
import { getNeed, getNeedsByType, needTypeLabels, searchExplorer } from "@/lib/explorer";
import { revealSection } from "@/lib/scroll";
import { getTechnologyAnchor } from "@/lib/technologies";
import { cn } from "@/lib/utils";
import type { Need, NeedType } from "@/types/technology";

import { BodyMap } from "./body-map";
import { useExplorer } from "./explorer-context";
import { ExplorerResults } from "./explorer-results";

const tabOrder: NeedType[] = ["predel", "stanje", "cilj"];

function OptionButton({
  need,
  selected,
  onSelect,
  tone = "list",
}: {
  need: Need;
  selected: boolean;
  onSelect: (id: string) => void;
  tone?: "list" | "chip";
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(need.id)}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center justify-between gap-3 text-left transition",
        tone === "list"
          ? "rounded-2xl px-4 py-3.5 text-[0.9375rem] font-medium ring-1 ring-inset"
          : "rounded-full px-4 py-2 text-sm font-medium ring-1 ring-inset",
        selected
          ? "bg-ink-950 text-white ring-ink-950"
          : "bg-white text-ink-800 ring-ink-200 hover:bg-ink-50 hover:ring-ink-300",
      )}
    >
      <span>{need.label}</span>
      {tone === "list" ? (
        <span
          aria-hidden="true"
          className={cn("text-lg leading-none", selected ? "text-accent-300" : "text-ink-300")}
        >
          →
        </span>
      ) : null}
    </button>
  );
}

/**
 * Needs explorer: body map, condition and goal lists, and free-text search.
 * Selecting a need is navigation through the content, not a diagnosis.
 */
export function Explorer() {
  const baseId = useId();
  const { tab, setTab, selectedNeedId, selectNeed, resultsRef } = useExplorer();
  const [query, setQuery] = useState("");
  const tabRefs = useRef<Record<NeedType, HTMLButtonElement | null>>({
    predel: null,
    stanje: null,
    cilj: null,
  });

  const search = searchExplorer(query);
  const isSearching = query.trim().length >= 2;
  const selectedNeed = selectedNeedId ? getNeed(selectedNeedId) : undefined;

  function handleSelect(id: string) {
    selectNeed(id);
    setQuery("");
    // On narrow screens the results sit below the options: bring them into view.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => revealSection(resultsRef.current, resultsRef.current));
    }
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const index = tabOrder.indexOf(tab);
    let next: NeedType | undefined;
    if (event.key === "ArrowRight") next = tabOrder[(index + 1) % tabOrder.length];
    if (event.key === "ArrowLeft") next = tabOrder[(index - 1 + tabOrder.length) % tabOrder.length];
    if (event.key === "Home") next = tabOrder[0];
    if (event.key === "End") next = tabOrder[tabOrder.length - 1];
    if (!next) return;
    event.preventDefault();
    setTab(next);
    tabRefs.current[next]?.focus();
  }

  const searchId = `${baseId}-search`;
  const panelId = (type: NeedType) => `${baseId}-panel-${type}`;
  const tabId = (type: NeedType) => `${baseId}-tab-${type}`;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Selection */}
      <div className="rounded-4xl bg-white p-5 shadow-soft ring-1 ring-ink-200/70 sm:p-7 lg:sticky lg:top-24 lg:col-span-5">
        <label htmlFor={searchId} className="text-sm font-medium text-ink-900">
          Poiščite predel, stanje, cilj ali tehnologijo
        </label>
        <div className="relative mt-2">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-400" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="npr. koleno, bolečina, elektrostimulacija"
            autoComplete="off"
            className="h-12 w-full rounded-full border border-ink-200 bg-ink-50 pr-11 pl-12 text-[0.9375rem] text-ink-950 placeholder:text-ink-400 focus:border-accent-600 focus:bg-white focus:ring-4 focus:ring-accent-600/12 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100 hover:text-ink-900"
            >
              <CloseIcon className="size-4" />
              <span className="sr-only">Počisti iskanje</span>
            </button>
          ) : null}
        </div>

        {isSearching ? (
          <div className="mt-6" aria-live="polite">
            <p className="text-sm text-ink-600">
              {search.needs.length + search.technologies.length === 0
                ? "Ni zadetkov. Poskusite z drugim izrazom ali izberite spodaj."
                : `Zadetki: ${search.needs.length + search.technologies.length}`}
            </p>
            {search.needs.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {search.needs.map((need) => (
                  <li key={need.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(need.id)}
                      className="flex w-full items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 text-left ring-1 ring-ink-200 ring-inset hover:bg-ink-50"
                    >
                      <span className="text-[0.9375rem] font-medium text-ink-900">{need.label}</span>
                      <span className="font-mono text-[0.6875rem] tracking-wide text-ink-500 uppercase">
                        {needTypeLabels[need.type].kicker}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            {search.technologies.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {search.technologies.map((technology) => (
                  <li key={technology.id}>
                    <a
                      href={`#${getTechnologyAnchor(technology.id)}`}
                      className="flex items-center gap-3 rounded-2xl bg-ink-50 px-4 py-3 ring-1 ring-ink-200 ring-inset hover:bg-ink-100"
                    >
                      <TechIcon icon={technology.icon} className="size-6 text-accent-700" />
                      <span className="flex-1 text-[0.9375rem] font-medium text-ink-900">
                        {technology.name}
                      </span>
                      <span className="font-mono text-[0.6875rem] tracking-wide text-ink-500 uppercase">
                        Tehnologija
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : (
          <>
            <div
              role="tablist"
              aria-label="Način raziskovanja"
              className="mt-6 grid grid-cols-3 gap-1 rounded-full bg-ink-100 p-1"
            >
              {tabOrder.map((type) => (
                <button
                  key={type}
                  ref={(element) => {
                    tabRefs.current[type] = element;
                  }}
                  id={tabId(type)}
                  type="button"
                  role="tab"
                  aria-selected={tab === type}
                  aria-controls={panelId(type)}
                  tabIndex={tab === type ? 0 : -1}
                  onClick={() => setTab(type)}
                  onKeyDown={handleTabKeyDown}
                  className={cn(
                    "min-h-10 rounded-full px-2 text-[0.8125rem] leading-tight font-medium transition sm:text-sm",
                    tab === type ? "bg-white text-ink-950 shadow-soft" : "text-ink-600 hover:text-ink-950",
                  )}
                >
                  {needTypeLabels[type].tab}
                </button>
              ))}
            </div>

            {tabOrder.map((type) => (
              <div
                key={type}
                id={panelId(type)}
                role="tabpanel"
                aria-labelledby={tabId(type)}
                hidden={tab !== type}
                className="mt-6"
              >
                {type === "predel" ? (
                  <div className="grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                    <BodyMap
                      regions={getNeedsByType("predel")}
                      selectedId={selectedNeedId}
                      onSelect={handleSelect}
                      className="max-sm:max-w-[11rem]"
                    />
                    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
                      {getNeedsByType("predel").map((need) => (
                        <li key={need.id}>
                          <OptionButton
                            need={need}
                            selected={need.id === selectedNeedId}
                            onSelect={handleSelect}
                            tone="chip"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <ul className="grid gap-2">
                    {getNeedsByType(type).map((need) => (
                      <li key={need.id}>
                        <OptionButton
                          need={need}
                          selected={need.id === selectedNeedId}
                          onSelect={handleSelect}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}

        <p className="mt-6 text-[0.8125rem] leading-relaxed text-ink-500">
          Izbira je pomoč pri iskanju vsebin in ne pomeni diagnoze.
        </p>
      </div>

      {/* Results */}
      <div ref={resultsRef} tabIndex={-1} className="scroll-mt-24 outline-none lg:col-span-7">
        <ExplorerResults need={selectedNeed} onSelect={handleSelect} />
      </div>
    </div>
  );
}
