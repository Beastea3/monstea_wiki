/** Unicode + URL helpers for wiki path segments (works in browser and Node). */

export function normalizeSlugPart(segment: string): string {
  return segment.normalize("NFC").trim();
}

/**
 * Route params may arrive percent-encoded and/or unnormalized; filenames can be NFD on macOS.
 */
export function normalizeSlugSegments(
  segments: string[] | undefined,
): string[] {
  if (!segments?.length) {
    return [];
  }
  return segments.map((raw) => {
    let s = raw;
    try {
      s = decodeURIComponent(raw);
    } catch {
      s = raw;
    }
    return normalizeSlugPart(s);
  });
}

/**
 * Pathname as Next.js reports it (decoded UTF-8), e.g. /wiki/中文/foo
 */
export function slugToDecodedWikiPathname(slug: string[]): string {
  if (!slug.length) {
    return "/wiki";
  }
  return `/wiki/${slug.map(normalizeSlugPart).join("/")}`;
}
