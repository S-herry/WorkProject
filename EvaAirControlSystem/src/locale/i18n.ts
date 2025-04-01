import { initReactI18next } from "react-i18next";
import i18n from "i18next";

import en from "./en.json";
import tw from "./tw.json";

export const resources = {
  en: {
    translation: en,
  },
  tw: {
    translation: tw,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "tw",
  lng: "tw",
});

export default i18n;
