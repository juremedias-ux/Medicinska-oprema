import { NextResponse, type NextRequest } from "next/server";

import { getProductSlugs } from "@/lib/products";

const knownSlugs = new Set(getProductSlugs());

/**
 * Returns a real HTTP 404 for unknown product slugs.
 *
 * With Cache Components, product pages are prerendered and `notFound()` for
 * an unknown slug would stream the 404 UI with a 200 status (a "soft 404").
 * Rewriting to a path that does not exist renders the custom not-found page
 * with the correct status code.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2] ?? "";
  if (knownSlugs.has(slug)) return NextResponse.next();

  return NextResponse.rewrite(new URL("/izdelek-ne-obstaja", request.url));
}

export const config = {
  matcher: "/products/:slug",
};
