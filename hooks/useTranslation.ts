import { useCallback } from "react";
import useLanguageStore from "@/store/language";
import { translations, TranslationKey } from "@/i18n/translations";

export function useTranslation() {
  const { language } = useLanguageStore();
  
  const t = useCallback((key: TranslationKey): string => {
    return translations[language][key] || key;
  }, [language]);
  
  return { t, language };
}