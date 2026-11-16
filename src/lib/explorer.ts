import { needs } from "@/data/needs";
import { technologies } from "@/data/technologies";
import type { Need, NeedType, Technology } from "@/types/technology";

export const needTypeLabels: Record<NeedType, { tab: string; kicker: string }> = {
  predel: { tab: "Predel telesa", kicker: "Predel telesa" },
  stanje: { tab: "Stanje", kicker: "Stanje ali poškodba" },
  cilj: { tab: "Cilj", kicker: "Cilj rehabilitacije" },
};

export function getNeedsByType(type: NeedType): Need[] {
  return needs.filter((need) => need.type === type);
}

export function getNeed(id: string): Need | undefined {
  return needs.find((need) => need.id === id);
}

/** Lowercase and strip diacritics so "koleno", "Kolenó" and "kolenu" match predictably. */
export function normalizeSearch(value: string): string {
  return value.toLocaleLowerCase("sl").normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
}

export interface ExplorerSearchResult {
  needs: Need[];
  technologies: Technology[];
}

export function searchExplorer(query: string): ExplorerSearchResult {
  const term = normalizeSearch(query);
  if (term.length < 2) return { needs: [], technologies: [] };

  const matches = (values: string[]) => values.some((value) => normalizeSearch(value).includes(term));

  return {
    needs: needs.filter((need) => matches([need.label, ...need.keywords])),
    technologies: technologies.filter(
      (technology) =>
        technology.rehabilitation && matches([technology.name, technology.shortName, technology.usedFor]),
    ),
  };
}
