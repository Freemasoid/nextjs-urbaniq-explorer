import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setTheme } from "@/lib/features/theme/themeSlice";
import type { Theme } from "@/lib/features/theme/themeSlice";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector((state) => state.themeState.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

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

  return {
    theme,
    setTheme: (newTheme: Theme) => {
      dispatch(setTheme(newTheme));
    },
  };
};
