import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackendOptions from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(HttpBackendOptions) 
  .use(LanguageDetector)// passes i18n down to react-i18next
  .init({
    
    detection:{
      order: ['localStorage'],
      caches: ['localStorage']
    },

    fallbackLng: "en",
    
    backend: {
      loadPath: "/{{lng}}.json",
    },
  });

export default i18n;
