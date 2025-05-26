"use client";

import { useTheme } from "@/hooks/use-theme";
import Logo from "@/components/Logo";
import { Sun, Moon, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { useTranslation } from "@/i18n/useTranslation";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useTranslation();

  const languages = [
    { code: "enUS" as const, label: "English" },
    { code: "deDE" as const, label: "Deutsch" },
    { code: "ruRU" as const, label: "Русский" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
      <div className="flex w-full h-14 items-center">
        <div className="flex flex-1 items-center justify-between px-4">
          <Logo />

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground"
                  aria-label="Toggle language"
                >
                  <Languages size={20} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={
                      language === lang.code ? "bg-black text-white" : ""
                    }
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
