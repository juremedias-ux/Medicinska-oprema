import Link from "next/link";

import { sectionIds } from "@/config/site";

export function ProductBreadcrumb({ productName }: { productName: string }) {
  return (
    <nav aria-label="Drobtinice">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-500">
        <li>
          <Link href="/" className="transition-colors hover:text-ink-950">
            Domov
          </Link>
        </li>
        <li aria-hidden="true" className="text-ink-300">
          /
        </li>
        <li>
          <Link href={`/#${sectionIds.products}`} className="transition-colors hover:text-ink-950">
            Izdelki
          </Link>
        </li>
        <li aria-hidden="true" className="text-ink-300">
          /
        </li>
        <li aria-current="page" className="font-medium text-ink-800">
          {productName}
        </li>
      </ol>
    </nav>
  );
}
