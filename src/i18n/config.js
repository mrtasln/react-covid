import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    fallbackLng: 'tr',
    lng: 'tr',
    resources: {
        tr: {
            translations: require('./locales/tr/translations.json')
        },
        en: {
            translations: require('./locales/en/translations.json')
        }
    },
    ns: ['translations'],
    defaultNS: 'translations'
});

i18n.languages = ['tr', 'en'];

export default i18n;