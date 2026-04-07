/** Pure path helpers — safe to import from Client Components. */

export type WikiNavItem = {
  slug: string[];
  title: string;
};

export function slugToWikiPath(slug: string[]): string {
  if (!slug.length) {
    return "/wiki";
  }
  return `/wiki/${slug.map(encodeURIComponent).join("/")}`;
}
