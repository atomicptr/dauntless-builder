import { browser } from "$app/environment";
import { match } from "ts-pattern";

export type Language = "en" | "de" | "es" | "fr" | "it" | "ja" | "pt" | "ru" | "zh" | "zx" | "tr" | "hu";
export const languageValues: Language[] = ["en", "de", "es", "fr", "it", "ja", "pt", "ru", "zh", "zx", "tr", "hu"];

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

export type I18nData = {
    [lang in Language]: {
        [key: string]: string;
    };
};

export const determineBrowserLanguage = (): Language => {
    if (!browser) {
        return "en";
    }

    const lang = navigator.language.substring(0, 2) as Language;

    if (languageValues.indexOf(lang) > -1) {
        return lang as Language;
    }

    return "en";
};
