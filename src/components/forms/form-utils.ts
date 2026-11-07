/** Focuses the first field (in visual order) that has a validation error. */
export function focusFirstError(
  form: HTMLFormElement,
  errors: Partial<Record<string, string>>,
  fieldOrder: readonly string[],
) {
  const firstInvalid = fieldOrder.find((name) => errors[name]);
  if (!firstInvalid) return;
  const element = form.elements.namedItem(firstInvalid);
  if (element instanceof HTMLElement) element.focus();
}
