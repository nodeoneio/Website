import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ukTranslations from './translation/en_UK.json';
import krTranslations from './translation/ko_KR.json';
import jpTranslations from './translation/ja_JP.json';

const resources = {
  en_UK: {
    translation: ukTranslations,
  },
  ko_KR: {
    translation: krTranslations,
  },
  ja_JP: {
    translation: jpTranslations,
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en_UK',
  fallbackLng: 'ko_KR',
  debug: true,
  interpolation: { escapeValue: true },
  returnObjects: true,
  returnEmptyString: true,
  returnNull: true,
});

export default i18n;