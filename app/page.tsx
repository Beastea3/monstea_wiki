import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SITE_NAME, getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE_NAME,
  description:
    "Public knowledge base — static pages from Markdown in Git, built with Next.js.",
  openGraph: {
    url: getSiteUrl(),
    title: SITE_NAME,
    description:
      "Public knowledge base — static pages from Markdown in Git, built with Next.js.",
    type: "website",
  },
  alternates: {
    canonical: getSiteUrl(),
  },
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-[var(--border-default)]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between md:px-12 md:py-16">
          <div className="max-md:order-2 md:flex-1">
            <p className="font-mono text-xs uppercase tracking-[1.4px] text-[var(--text-primary)]">
              {SITE_NAME}
            </p>
            <h1 className="mt-4 max-w-xl font-mono text-[clamp(3rem,12vw,12.5rem)] font-light leading-none tracking-tight text-[var(--text-primary)]">
              Wiki
            </h1>
            <p className="mt-6 max-w-md font-sans text-base leading-normal text-[var(--text-secondary)]">
              Docs and notes published as static HTML. Content lives in the repo;
              the site is rebuilt when pages change.
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col items-stretch gap-6 md:w-auto md:items-end max-md:order-1">
            <ThemeToggle className="w-full md:max-w-[16rem]" />
            <Link
              href="/wiki"
              className="inline-flex h-12 min-h-[44px] w-full items-center justify-center bg-[var(--text-primary)] px-6 font-mono text-sm uppercase tracking-[1.4px] text-[var(--bg-canvas)] hover:bg-[var(--btn-primary-hover)] md:w-auto"
            >
              Open wiki
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-12 md:px-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <section className="border border-[var(--border-default)] bg-[var(--surface-card)] p-6">
            <h2 className="font-sans text-[1.375rem] font-normal leading-tight text-[var(--text-primary)]">
              For readers
            </h2>
            <p className="mt-3 font-sans text-base leading-normal text-[var(--text-secondary)]">
              Browse articles under{" "}
              <Link
                href="/wiki"
                className="text-[var(--text-primary)] hover:text-[var(--text-muted)]"
              >
                /wiki
              </Link>
              . Every page is pre-rendered for fast loads and clear SEO.
            </p>
          </section>
          <section className="border border-[var(--border-default)] bg-[var(--surface-card)] p-6">
            <h2 className="font-sans text-[1.375rem] font-normal leading-tight text-[var(--text-primary)]">
              For editors
            </h2>
            <p className="mt-3 font-sans text-base leading-normal text-[var(--text-secondary)]">
              Add Markdown under <code className="font-mono text-sm">content/wiki/</code>{" "}
              and ship with your usual Git workflow. See{" "}
              <Link
                href="/wiki/getting-started"
                className="text-[var(--text-primary)] hover:text-[var(--text-muted)]"
              >
                Getting started
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
