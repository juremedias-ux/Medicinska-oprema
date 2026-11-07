import { getAvailabilityLabel } from "@/lib/products";
import type { Product } from "@/types/product";

export function ProductKeyFacts({ product }: { product: Product }) {
  const facts = [
    { label: "Proizvajalec", value: product.manufacturer },
    { label: "Uradno ime izdelka", value: product.originalName },
    { label: "Področje", value: product.category },
    { label: "Status v Sloveniji", value: getAvailabilityLabel(product.availabilityStatus) },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-200/70 sm:p-7">
      <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-ink-500 uppercase">
        Osnovni podatki
      </h2>
      <dl className="mt-5 divide-y divide-ink-100">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0">
            <dt className="text-xs font-medium text-ink-500">{fact.label}</dt>
            <dd className="text-[0.9375rem] font-medium text-ink-950">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
