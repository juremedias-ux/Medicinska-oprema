import type { EvidenceKind, RegulatoryEntry } from "@/types/product";

type Basis = EvidenceKind | RegulatoryEntry["basis"];

/** Labels that tell visitors where a statement comes from. */
export const evidenceLabels: Record<Basis, { label: string; description: string }> = {
  regulativa: {
    label: "Regulativni podatek",
    description: "Status iz uradnih registrov ali objavljenih odločitev regulatorjev (npr. FDA, oznaka CE).",
  },
  raziskava: {
    label: "Raziskava",
    description: "Objava v strokovni reviji ali vpis v register kliničnih raziskav, z navedenimi omejitvami.",
  },
  proizvajalec: {
    label: "Navedba proizvajalca",
    description: "Podatki iz gradiv ali sporočil proizvajalca, ki jih nismo neodvisno preverili.",
  },
  medij: {
    label: "Poročanje medijev",
    description: "Povzetek poročanja; izvirnega vira še nismo pregledali.",
  },
  "v-preverjanju": {
    label: "V preverjanju",
    description: "Podatka še nimamo ali ga preverjamo. Ne nadomeščamo ga z oglasnim besedilom.",
  },
};

export function getEvidenceLabel(kind: Basis): string {
  return evidenceLabels[kind].label;
}
