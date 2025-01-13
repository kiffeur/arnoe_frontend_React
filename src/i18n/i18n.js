import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importation des traductions
import translationFR from './locales/fr/translation.json';
import translationEN from './locales/en/translation.json';
import translationDE from './locales/de/translation.json';

const resources = {
  fr: {
    translation: translationFR
  },
  en: {
    translation: translationEN
  },
  de: {
    translation: translationDE
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // Langue par défaut
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    },
    debug: true // Ajout du mode débogage
  });

// Écouteur de changement de langue
i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
  document.documentElement.lang = lng; // Mise à jour de l'attribut lang du html
  document.documentElement.dir = i18n.dir(lng); // Mise à jour de la direction du texte
});

export default i18n;
