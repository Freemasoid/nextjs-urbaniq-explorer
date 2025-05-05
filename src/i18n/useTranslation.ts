import { useLanguage } from "./LanguageContext";

export const useTranslation = () => {
  const { t, language, setLanguage } = useLanguage();

  return {
    t,
    language,
    setLanguage,
  };
};
