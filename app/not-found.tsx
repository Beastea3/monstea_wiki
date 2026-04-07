import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SITE_NAME } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[1.4px] text-[var(--text-tertiary)]">
        404
      </p>
      <h1 className="mt-4 font-sans text-[1.875rem] font-normal text-[var(--text-primary)]">
        Page not found
      </h1>
      <p className="mt-3 max-w-md font-sans text-base text-[var(--text-secondary)]">
        This URL is not part of {SITE_NAME}.
      </p>
      <ThemeToggle className="mt-10 w-full max-w-xs" />
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex h-12 items-center border border-[var(--border-strong)] px-6 font-mono text-sm uppercase tracking-[1.4px] text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]"
        >
          Home
        </Link>
        <Link
          href="/wiki"
          className="inline-flex h-12 items-center bg-[var(--text-primary)] px-6 font-mono text-sm uppercase tracking-[1.4px] text-[var(--bg-canvas)] hover:bg-[var(--btn-primary-hover)]"
        >
          Wiki
        </Link>
      </div>
    </div>
  );
}
