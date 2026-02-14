import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "staple-theme";

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return "system";
}

function applyTheme(resolved: ResolvedTheme) {
  document.documentElement.setAttribute("data-theme", resolved);
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);

  const resolved: ResolvedTheme =
    theme === "system" ? getSystemTheme() : theme;

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    const r = next === "system" ? getSystemTheme() : next;
    applyTheme(r);
  }, []);

  const cycle = useCallback(() => {
    setThemeState((prev) => {
      const order: Theme[] = ["light", "dark", "system"];
      const idx = order.indexOf(prev);
      const next = order[(idx + 1) % order.length]!;
      localStorage.setItem(STORAGE_KEY, next);
      const r = next === "system" ? getSystemTheme() : next;
      applyTheme(r);
      return next;
    });
  }, []);

  useEffect(() => {
    applyTheme(resolved);
  }, [resolved]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") {
        applyTheme(getSystemTheme());
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  return { theme, resolved, setTheme, cycle } as const;
}
