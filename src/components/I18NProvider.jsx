import React from "react";
import PropTypes from "prop-types";
import { IntlProvider } from "react-intl";
import SettingsUtility from "../utility/SettingsUtility";
import DataUtility from "../utility/DataUtility";

import langs from "../../i18n/langs.json";

const toLanguageString = (language) => language.split(/[-_]/)[0];

export const availableLanguages = () => langs.map(lang => lang.code);

export const languageDescriptions = () => langs.map(({name, code}) => ({value: code, label: name}));

export function detectLanguage() {
    const languages = [...navigator.languages];
    const avail = availableLanguages();
    while (languages.length) {
        let language = toLanguageString(languages.shift());
        if (avail.includes(language)) {
            return language;
        }
    }
    return "en"; // Default language
}

export class I18NProvider extends React.PureComponent {
    render() {
        const language = SettingsUtility.getLanguage();
        const { children } = this.props;

        const messages = DataUtility.langSite();

        return (
            <IntlProvider locale={language} messages={messages}>
                {children}
            </IntlProvider>
        );
    }
}

I18NProvider.propTypes = {
    children: PropTypes.element.isRequired
};
