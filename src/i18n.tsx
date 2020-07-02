import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import de from "./locales/de/translation.json";
import en from "./locales/en/translation.json";

const languageDetector = new LanguageDetector(null, { order: ["cookie"] });

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "de",
    debug: false,
    lowerCaseLng: true,
    interpolation: {
      escapeValue: false,
    },
    load: "languageOnly",
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
