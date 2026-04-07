export const THEME_STORAGE_KEY = "monstea-wiki-theme";

export type ThemePreference = "system" | "light" | "dark";

export const THEME_CHANGE_EVENT = "monstea-wiki-theme-change";

export function isThemePreference(v: string | null): v is ThemePreference {
  return v === "light" || v === "dark" || v === "system";
}

/** Inline IIFE for next/script `beforeInteractive` (runs before first paint). */
export function getThemeInitScript(): string {
  const key = JSON.stringify(THEME_STORAGE_KEY);
  return `(function(){try{var k=${key};var v=localStorage.getItem(k);var t=v==='light'||v==='dark'||v==='system'?v:'system';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;
}

export function applyThemePreference(theme: ThemePreference): void {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* ignore quota / private mode */
  }
  window.dispatchEvent(
    new CustomEvent<ThemePreference>(THEME_CHANGE_EVENT, { detail: theme }),
  );
}

export function readStoredTheme(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemePreference(v)) {
      return v;
    }
  } catch {
    /* ignore */
  }
  return "system";
}

export function readDocumentTheme(): ThemePreference {
  if (typeof document === "undefined") {
    return "system";
  }
  const attr = document.documentElement.getAttribute("data-theme");
  return isThemePreference(attr) ? attr : "system";
}
