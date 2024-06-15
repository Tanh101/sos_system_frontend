import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enJSON from './locales/en/en.json'


const getLngLocal = (lng) => {
    let lngLocal = localStorage.getItem('locales')
    return lngLocal ? lngLocal : lng
}

i18n.use(initReactI18next).init({
    resources: {
        en: { ...enJSON },
    },
    lng: getLngLocal("vn"),
});
