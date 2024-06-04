import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const handleChangeLanguage = (event) => {
        const newLanguage = event.target.value;
        setCurrentLanguage(newLanguage);
        localStorage.setItem("locales", newLanguage);
        i18n.changeLanguage(newLanguage);
    };
    return (
        <LocaleContext.Provider value={{ currentLanguage, handleChangeLanguage }}>
            {children}
        </LocaleContext.Provider>
    );
};
