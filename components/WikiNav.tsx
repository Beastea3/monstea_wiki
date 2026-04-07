"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { slugToWikiPath, type WikiNavItem } from "@/lib/wiki-paths";

type WikiNavProps = {
  docs: WikiNavItem[];
  onNavigate?: () => void;
};

export function WikiNav({ docs, onNavigate }: WikiNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6" aria-label="Wiki pages">
      <div>
        <Link
          href="/wiki"
          className="font-mono text-xs uppercase tracking-[1.4px] text-[var(--text-primary)] hover:text-[var(--text-muted)]"
          onClick={onNavigate}
        >
          Monstea Wiki
        </Link>
        <p className="mt-2 font-sans text-sm leading-normal text-[var(--text-secondary)]">
          Knowledge base
        </p>
      </div>
      <ul className="flex flex-col gap-1 font-sans text-sm">
        {docs.map((doc) => {
          const href = slugToWikiPath(doc.slug);
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onNavigate}
                className={[
                  "block border-l-2 py-1.5 pl-3 transition-colors",
                  active
                    ? "border-[var(--text-primary)] text-[var(--text-primary)]"
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-muted)]",
                ].join(" ")}
              >
                {doc.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <ThemeToggle className="border-t border-[var(--border-default)] pt-6" />
      <Link
        href="/"
        onClick={onNavigate}
        className="font-sans text-sm text-[var(--text-tertiary)] hover:text-[var(--text-muted)]"
      >
        ← Home
      </Link>
    </nav>
  );
}
