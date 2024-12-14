import { get } from "svelte/store";
import { language } from "./state.svelte";
import type { I18nData, Language } from "./i18n";

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
