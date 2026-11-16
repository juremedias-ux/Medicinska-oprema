import type { Product } from "@/types/product";

import { plural } from "./format";
import { getEvidenceCounts } from "./products";

/** e.g. "2 raziskavi · 1 navedba proizvajalca" — or a clear "no sources reviewed" statement. */
export function summarizeEvidence(product: Product): string {
  const counts = getEvidenceCounts(product);
  const parts: string[] = [];
  if (counts.regulativa) {
    parts.push(
      `${counts.regulativa} ${plural(counts.regulativa, ["regulativni vir", "regulativna vira", "regulativni viri", "regulativnih virov"])}`,
    );
  }
  if (counts.raziskava) {
    parts.push(
      `${counts.raziskava} ${plural(counts.raziskava, ["raziskava", "raziskavi", "raziskave", "raziskav"])}`,
    );
  }
  if (counts.proizvajalec) {
    parts.push(
      `${counts.proizvajalec} ${plural(counts.proizvajalec, ["navedba proizvajalca", "navedbi proizvajalca", "navedbe proizvajalca", "navedb proizvajalca"])}`,
    );
  }
  if (counts.medij) {
    parts.push(
      `${counts.medij} ${plural(counts.medij, ["poročilo medijev", "poročili medijev", "poročila medijev", "poročil medijev"])}`,
    );
  }
  return parts.length > 0 ? parts.join(" · ") : "Virov še nismo pregledali";
}
