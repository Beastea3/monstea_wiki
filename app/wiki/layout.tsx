import { WikiChrome } from "@/components/WikiChrome";
import { getAllWikiDocs } from "@/lib/wiki";

export default function WikiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navDocs = getAllWikiDocs().map((d) => ({
    slug: d.slug,
    title: d.title,
  }));

  return (
    <WikiChrome docs={navDocs}>
      <div className="min-h-full px-6 py-10 md:px-12 md:py-12">
        {children}
      </div>
    </WikiChrome>
  );
}
