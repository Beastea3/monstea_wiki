"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  type ThemePreference,
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  applyThemePreference,
  readDocumentTheme,
} from "@/lib/theme";

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

function subscribe(onStoreChange: () => void) {
  const onTheme = () => onStoreChange();
  const onStorage = (e: StorageEvent) => {
    if (e.key === THEME_STORAGE_KEY) {
      onStoreChange();
    }
  };
  window.addEventListener(THEME_CHANGE_EVENT, onTheme);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onTheme);
    window.removeEventListener("storage", onStorage);
  };
}

function getThemeSnapshot(): ThemePreference {
  return readDocumentTheme();
}

function getServerThemeSnapshot(): ThemePreference {
  return "system";
}

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const onSelect = useCallback((next: ThemePreference) => {
    applyThemePreference(next);
  }, []);

  return (
    <div
      className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}
      role="group"
      aria-label="Color theme"
      suppressHydrationWarning
    >
      <p className="font-mono text-[0.65rem] uppercase tracking-[1px] text-[var(--text-tertiary)]">
        Theme
      </p>
      <div className="flex border border-[var(--border-default)]">
        {OPTIONS.map((opt) => {
          const selected = theme === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              aria-pressed={selected}
              className={[
                "min-h-[44px] flex-1 px-2 py-2 font-mono text-[0.65rem] uppercase tracking-[1px] transition-colors",
                "border-0 border-r border-[var(--border-default)] last:border-r-0",
                selected
                  ? "bg-[var(--surface-hover)] text-[var(--text-primary)]"
                  : "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-muted)]",
              ].join(" ")}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
