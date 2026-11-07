import { cacheLife } from "next/cache";

/**
 * Current year for the copyright notice.
 * Cached (Cache Components) so the page stays statically prerendered;
 * revalidated daily so the year rolls over without a redeploy.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
