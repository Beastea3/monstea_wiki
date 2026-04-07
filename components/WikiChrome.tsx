"use client";

import { useState } from "react";
import type { WikiNavItem } from "@/lib/wiki-paths";
import { WikiNav } from "@/components/WikiNav";

type WikiChromeProps = {
  docs: WikiNavItem[];
  children: React.ReactNode;
};

export function WikiChrome({ docs, children }: WikiChromeProps) {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <div className="flex min-h-0 flex-1">
      <button
        type="button"
        className="fixed bottom-6 right-6 z-50 flex h-12 min-h-[44px] items-center border border-[var(--border-default)] bg-[var(--surface-elevated)] px-4 font-mono text-xs uppercase tracking-[1.4px] text-[var(--text-primary)] md:hidden"
        aria-expanded={open}
        aria-controls="wiki-sidebar"
        onClick={() => setOpen((v) => !v)}
      >
        Menu
      </button>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-[var(--scrim)] md:hidden"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}
      <aside
        id="wiki-sidebar"
        className={[
          "fixed inset-y-0 left-0 z-40 w-[min(100%,18rem)] shrink-0 overflow-y-auto border-r border-[var(--border-default)] bg-[var(--bg-canvas)] px-6 py-8 transition-transform duration-200 md:static md:z-0 md:w-64 md:translate-x-0 md:px-6",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <WikiNav docs={docs} onNavigate={closeMenu} />
      </aside>
      <div className="min-h-0 flex-1 md:pl-0">{children}</div>
    </div>
  );
}
