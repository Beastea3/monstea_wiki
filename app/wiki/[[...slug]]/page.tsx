import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { SITE_NAME, getSiteUrl } from "@/lib/site";
import { getAllWikiDocs, getWikiDocBySlug } from "@/lib/wiki";

type WikiPageProps = {
  params: Promise<{ slug?: string[] }>;
};

export function generateStaticParams() {
  const docs = getAllWikiDocs();
  return docs.map((doc) => ({
    slug: doc.slug.length ? doc.slug : undefined,
  }));
}

export async function generateMetadata({
  params,
}: WikiPageProps): Promise<Metadata> {
  const { slug: segments } = await params;
  const doc = getWikiDocBySlug(segments);

  if (!doc) {
    return { title: `Not found | ${SITE_NAME}` };
  }

  const url = new URL(
    segments?.length
      ? `/wiki/${segments.map(encodeURIComponent).join("/")}`
      : "/wiki",
    getSiteUrl(),
  );

  return {
    title: `${doc.title} | ${SITE_NAME}`,
    description: doc.description ?? `${doc.title} — ${SITE_NAME}`,
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: url.toString(),
      type: "article",
    },
    alternates: { canonical: url.toString() },
  };
}

export default async function WikiPage({ params }: WikiPageProps) {
  const { slug: segments } = await params;
  const doc = getWikiDocBySlug(segments);

  if (!doc) {
    notFound();
  }

  return (
    <article className="min-w-0 max-w-full">
      <header className="mb-10 min-w-0 max-w-[var(--content-max)] border-b border-[var(--border-default)] pb-8">
        <h1 className="break-words font-sans text-[1.875rem] font-normal leading-tight text-[var(--text-primary)]">
          {doc.title}
        </h1>
        {doc.description ? (
          <p className="mt-3 max-w-2xl font-sans text-base leading-normal text-[var(--text-secondary)]">
            {doc.description}
          </p>
        ) : null}
      </header>
      <MarkdownContent source={doc.body} />
    </article>
  );
}
