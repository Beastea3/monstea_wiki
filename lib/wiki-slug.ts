/**
 * Slug normalization for wiki URLs and filesystem-derived slugs.
 * Uses NFC so filenames (e.g. NFD on macOS) match URL segments.
 */

export function normalizeSlugPart(s: string): string {
  return s.normalize("NFC");
}

export function normalizeSlugSegments(
  segments: string[] | undefined,
): string[] {
  if (!segments?.length) {
    return [];
  }
  return segments
    .filter((s): s is string => typeof s === "string" && s.length > 0)
    .map((s) => normalizeSlugPart(s));
}

/** Pathname as returned by the browser / `usePathname()` for a wiki doc. */
export function slugToDecodedWikiPathname(slug: string[]): string {
  if (!slug.length) {
    return "/wiki";
  }
  return `/wiki/${slug.map((s) => normalizeSlugPart(s)).join("/")}`;
}
