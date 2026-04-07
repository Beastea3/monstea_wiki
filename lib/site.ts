/**
 * Base URL for public metadata, sitemap, and robots.
 * Set `NEXT_PUBLIC_SITE_URL` in production (e.g. https://wiki.example.com).
 */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (url) {
    return url.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}

export const SITE_NAME = "Monstea Wiki";
