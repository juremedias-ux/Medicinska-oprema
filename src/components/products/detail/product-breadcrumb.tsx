import Link from "next/link";

import { sectionIds } from "@/config/site";

export function ProductBreadcrumb({ productName }: { productName: string }) {
  return (
    <nav aria-label="Drobtinice">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-400">
        <li>
          <Link href="/" className="transition-colors hover:text-white">
            Domov
          </Link>
        </li>
        <li aria-hidden="true" className="text-ink-600">
          /
        </li>
        <li>
          <Link href={`/#${sectionIds.products}`} className="transition-colors hover:text-white">
            Produkti
          </Link>
        </li>
        <li aria-hidden="true" className="text-ink-600">
          /
        </li>
        <li aria-current="page" className="font-medium text-ink-200">
          {productName}
        </li>
      </ol>
    </nav>
  );
}
