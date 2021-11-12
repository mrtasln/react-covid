import React from 'react';
import {useTranslation} from "react-i18next";
import flagTr from '../images/tr.svg';
import flagEn from '../images/en.svg';

function Header() {
    const { i18n } = useTranslation();
    const handleChangeLanguage = (lang:string) => () => {
        return i18n.changeLanguage(lang);
    };
    return (
        <div className="app-title">
            <img src={flagTr} className="translation-flag" alt="logo" onClick={handleChangeLanguage('tr')} />
            <img src={flagEn} className="translation-flag en" alt="logo" onClick={handleChangeLanguage('en')} />
        </div>
    );
}
export default Header;