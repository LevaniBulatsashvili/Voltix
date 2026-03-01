import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./lngs/en.json";
import ka from "./lngs/ka.json";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "ka",
    resources: {
      en: {
        translation: en,
      },
      ka: {
        translation: ka,
      },
    },
  });
