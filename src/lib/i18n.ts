import { browser } from "$app/environment";
import { match } from "ts-pattern";
import { languageValues, type Language } from "./data/phalanx-types";

export const nativeLanguageName = (lang: Language) =>
    match(lang)
        .with("en", () => "English")
        .with("de", () => "Deutsch")
        .with("es", () => "Español")
        .with("fr", () => "Français")
        .with("it", () => "Italiano")
        .with("ja", () => "日本語")
        .with("pt", () => "Português")
        .with("ru", () => "русский")
        .with("zh", () => "汉语")
        .with("zx", () => "漢語")
        .with("tr", () => "Türkçe")
        .with("hu", () => "magyar nyelv")
        .run();

export const determineBrowserLanguage = (): Language => {
    if (!browser) {
        return "en"; // TODO: read Accept-Language header?
    }

    const lang = navigator.language.substring(0, 2) as Language;

    if (languageValues.indexOf(lang) > -1) {
        return lang as Language;
    }

    return "en";
};
