import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setTheme } from "@/lib/features/theme/themeSlice";
import type { Theme } from "@/lib/features/theme/themeSlice";

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector((state) => state.themeState.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = getSystemTheme();
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return children;
}

export const useTheme = () => {
  const theme = useAppSelector((state) => state.themeState.theme);
  const dispatch = useAppDispatch();
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
    if (theme === "system") {
      return getSystemTheme();
    }
    return theme;
  });

  useEffect(() => {
    if (theme === "system") {
      const updateResolvedTheme = () => {
        setResolvedTheme(getSystemTheme());
      };

      // Set initial resolved theme
      updateResolvedTheme();

      // Listen for system theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateResolvedTheme);

      return () => {
        mediaQuery.removeEventListener("change", updateResolvedTheme);
      };
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  return {
    theme,
    resolvedTheme,
    setTheme: (newTheme: Theme) => {
      dispatch(setTheme(newTheme));
    },
  };
};
