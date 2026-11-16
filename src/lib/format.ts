const months = [
  "januar",
  "februar",
  "marec",
  "april",
  "maj",
  "junij",
  "julij",
  "avgust",
  "september",
  "oktober",
  "november",
  "december",
];

/**
 * Formats full or partial ISO dates in Slovenian:
 * "2026-09-17" → "17. september 2026", "2025-07" → "julij 2025", "2025" → "2025".
 * Implemented without Intl so server and browser output are identical.
 */
export function formatDate(value: string): string {
  const [year, month, day] = value.split("-");
  if (!month) return year;
  const monthName = months[Number(month) - 1] ?? month;
  if (!day) return `${monthName} ${year}`;
  return `${Number(day)}. ${monthName} ${year}`;
}

/**
 * Slovenian plural forms: [ednina, dvojina, množina 3–4, množina 5+].
 * plural(2, ["raziskava", "raziskavi", "raziskave", "raziskav"]) → "raziskavi"
 */
export function plural(count: number, forms: [string, string, string, string]): string {
  const rest = Math.abs(count) % 100;
  if (rest === 1) return forms[0];
  if (rest === 2) return forms[1];
  if (rest === 3 || rest === 4) return forms[2];
  return forms[3];
}
