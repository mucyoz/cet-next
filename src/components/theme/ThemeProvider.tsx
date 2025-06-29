// src/components/theme/ThemeProvider.tsx

"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  // FIX: Step 1 -> Initialize state with a non-browser value first.
  // We can't know the stored theme on the server, so we start with the default.
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // FIX: Step 2 -> Use useEffect to access localStorage only on the client.
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [storageKey]); // Run this effect only once on mount to get the stored theme.

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      // No need to save to localStorage here, that's what the user chose.
      return;
    }

    root.classList.add(theme);
    // When the theme changes (and it's not 'system'), save it.
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const value = {
    theme,
    // The setTheme function is now simpler.
    // The useEffect above will handle saving to localStorage.
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
