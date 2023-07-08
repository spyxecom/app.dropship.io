import i18n from 'i18next';
//import Backend from 'i18next-http-backend';
//import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationRU from './locales/ru.json';
import translationES from './locales/es.json';
import translationDE from './locales/de.json';

import translationFR from './locales/fr.json';
import translationIT from './locales/it.json';
import translationNL from './locales/nl.json';
import translationZH from './locales/zh-cn.json';
import translationPT from './locales/pt.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
  es: {
    translation: translationES,
  },
  de: {
    translation: translationDE,
  },
  fr: {
    translation: translationFR,
  },
  it: {
    translation: translationIT,
  },
  nl: {
    translation: translationNL,
  },
  zh: {
    translation: translationZH,
  },
  pt: {
    translation: translationPT,
  },
};

/*let language = window.navigator ? (window.navigator.language ||
  window.navigator.systemLanguage ||
  window.navigator.userLanguage) : "en";*/

//language = language.substr(0, 2).toLowerCase();

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  //.use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  //.use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: resources,
    supportedLngs: ['en', 'ru', 'es', 'de', 'fr', 'it', 'nl', 'zh', 'pt'],
    fallbackLng: 'en',
    //lng: language,
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    detection: {
      caches: ['localStorage'],
    },

    /*backend: {
      path: '/locales/{{lng}}.json'
    },*/

    //react: {useSuspense: false}
  });

export default i18n;
