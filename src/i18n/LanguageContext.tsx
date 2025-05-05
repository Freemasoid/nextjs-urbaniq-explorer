import React, {
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import { enUS } from "./languages/enUS";
import { deDE } from "./languages/deDE";
import { ruRU } from "./languages/ruRU";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setLanguage } from "@/lib/features";
import type { Language } from "@/lib/features";

type TranslationValue = string | { [key: string]: TranslationValue };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const translations = {
  enUS,
  deDE,
  ruRU,
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.languageState.language);

  const handleSetLanguage = useCallback(
    (lang: Language) => {
      dispatch(setLanguage(lang));
    },
    [dispatch]
  );

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const keys = key.split(".");
      let value: TranslationValue = translations[language];

      for (const k of keys) {
        if (value === undefined || typeof value === "string") {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
        value = value[k];
      }

      if (typeof value !== "string") {
        console.warn(`Translation value is not a string: ${key}`);
        return key;
      }

      if (params) {
        return value.replace(/\{\{(\w+)\}\}/g, (_, key) => {
          const param = params[key];
          return param !== undefined ? String(param) : `{{${key}}}`;
        });
      }

      return value;
    },
    [language]
  );

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
