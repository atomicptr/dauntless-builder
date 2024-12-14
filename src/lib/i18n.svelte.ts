import { get } from "svelte/store";
import { language } from "./state.svelte";
import { match } from "ts-pattern";

export type Language = "en" | "de" | "es" | "fr" | "it" | "ja" | "pt" | "ru" | "tr" | "hu";
export const languageValues: Language[] = ["en", "de", "es", "fr", "it", "ja", "pt", "ru", "tr", "hu"];

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
        .with("tr", () => "Türkçe")
        .with("hu", () => "magyar nyelv")
        .run();

export type I18nData = {
    [lang in Language]: {
        [key: string]: string;
    };
};

export const currentLanguage = (): Language => {
    return get(language);
};

export const t = (data: I18nData, key: string): string => {
    const curr = get(language);

    const notFound = `{{${key}}}`;

    if (!(curr in data)) {
        if (!(key in data[curr])) {
            return notFound;
        }

        return data[curr][key];
    }

    if (key in data["en"]) {
        return data["en"][key];
    }

    return notFound;
};
