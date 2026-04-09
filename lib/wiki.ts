import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { normalizeSlugPart, normalizeSlugSegments } from "@/lib/wiki-slug";

const WIKI_ROOT = path.join(process.cwd(), "content", "wiki");

export type WikiDoc = {
  /** URL segments under /wiki; empty = /wiki (from index.md) */
  slug: string[];
  title: string;
  description?: string;
  order: number;
  body: string;
};

function listMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(full);
    }
  }

  return files;
}

function filePathToSlug(absPath: string): string[] {
  const rel = path.relative(WIKI_ROOT, absPath);
  const dir = path.dirname(rel);
  const base = path.basename(rel, ".md");
  /** Normalize to NFC so slugs match URL params / macOS NFD filenames. */
  const normSeg = (s: string) => normalizeSlugPart(s);
  const dirParts =
    dir === "." ? [] : dir.split(path.sep).filter(Boolean).map(normSeg);

  if (base === "index") {
    return dirParts;
  }
  return [...dirParts, normSeg(base)];
}

function slugsEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((segment, i) => segment === b[i]);
}

export function getAllWikiDocs(): WikiDoc[] {
  const paths = listMarkdownFiles(WIKI_ROOT);
  const docs = paths.map((absPath) => {
    const slug = filePathToSlug(absPath);
    const raw = fs.readFileSync(absPath, "utf8");
    const { data, content } = matter(raw);
    const title =
      (typeof data.title === "string" && data.title) ||
      (slug.length ? slug[slug.length - 1] : "Wiki");
    const description =
      typeof data.description === "string" ? data.description : undefined;
    const order = typeof data.order === "number" ? data.order : 0;

    return {
      slug,
      title,
      description,
      order,
      body: content,
    };
  });

  return docs.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    const ap = a.slug.join("/") || "/";
    const bp = b.slug.join("/") || "/";
    return ap.localeCompare(bp);
  });
}

export function getWikiDocBySlug(segments: string[] | undefined): WikiDoc | null {
  const target = normalizeSlugSegments(segments);
  const docs = getAllWikiDocs();
  return docs.find((d) => slugsEqual(d.slug, target)) ?? null;
}
