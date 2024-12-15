import { get } from "svelte/store";
import { language } from "./state.svelte";
import type { Language } from "./data/phalanx-types";
import { page } from "$app/stores";
import { renderSimpleVarsTemplate, type Vars } from "./utils/template-renderer";

export const currentLanguage = (): Language => {
    return get(language);
};

export const __ = (key: string, vars: Vars = {}): string => {
    const data = get(page).data.i18nData;
    const curr = get(language);

    const notFound = `{{${key}}}`;

    if (!(curr in data)) {
        if (!(key in data[curr as Language])) {
            return notFound;
        }

        return renderSimpleVarsTemplate(data[curr as Language][key], vars);
    }

    if (key in data["en"]) {
        return renderSimpleVarsTemplate(data["en"][key], vars);
    }

    return notFound;
};
