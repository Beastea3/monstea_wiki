/** Pure path helpers — safe to import from Client Components. */

import {
  normalizeSlugPart,
  slugToDecodedWikiPathname,
} from "@/lib/wiki-slug";

export type WikiNavItem = {
  slug: string[];
  title: string;
};

export function slugToWikiPath(slug: string[]): string {
  if (!slug.length) {
    return "/wiki";
  }
  return `/wiki/${slug.map((s) => encodeURIComponent(normalizeSlugPart(s))).join("/")}`;
}

export { slugToDecodedWikiPathname };

/** Compare Next.js pathname (usually decoded UTF-8) with a wiki link. */
export function isActiveWikiPath(
  pathname: string,
  slug: string[],
  encodedHref: string,
): boolean {
  if (pathname === slugToDecodedWikiPathname(slug)) {
    return true;
  }
  try {
    return pathname === decodeURIComponent(encodedHref);
  } catch {
    return false;
  }
}
