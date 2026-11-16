/**
 * Scrolls a section into view (respecting reduced motion) and optionally
 * moves focus to an element inside it without a second scroll jump.
 * Used instead of URL hashes because Cache Components keeps recently
 * visited routes mounted, which can leave hidden duplicate ids.
 */
export function revealSection(section: HTMLElement | null, focusTarget?: HTMLElement | null) {
  if (!section) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  focusTarget?.focus({ preventScroll: true });
}
