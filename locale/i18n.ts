import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './translation/en_GB.json';
import krTranslations from './translation/ko_KR.json';
import jpTranslations from './translation/ja_JP.json';

const resources = {
  GB: {
    translation: enTranslations,
  },
  KR: {
    translation: krTranslations,
  },
  JP: {
    translation: jpTranslations,
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'GB',
  fallbackLng: 'KR',
  debug: true,
  interpolation: { escapeValue: true },
  returnObjects: true,
  returnEmptyString: true,
  returnNull: true,
});

export default i18n;