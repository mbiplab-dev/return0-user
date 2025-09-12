// Install dependencies first:
// npm install react-i18next i18next i18next-browser-languagedetector i18next-http-backend

// =============================================================================
// FILE: src/i18n/index.ts
// =============================================================================

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import all translation files
import en from './locales/en.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import or from './locales/or.json';
import as from './locales/as.json';
import gu from './locales/gu.json';
import kn from './locales/kn.json';
import ml from './locales/ml.json';
import mr from './locales/mr.json';
import pa from './locales/pa.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import ur from './locales/ur.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi }, // Hindi
  bn: { translation: bn }, // Bengali
  or: { translation: or }, // Odia
  as: { translation: as }, // Assamese
  gu: { translation: gu }, // Gujarati
  kn: { translation: kn }, // Kannada
  ml: { translation: ml }, // Malayalam
  mr: { translation: mr }, // Marathi
  pa: { translation: pa }, // Punjabi
  ta: { translation: ta }, // Tamil
  te: { translation: te }, // Telugu
  ur: { translation: ur }, // Urdu
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    detection: {
      order: ['localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      caches: ['localStorage', 'sessionStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
