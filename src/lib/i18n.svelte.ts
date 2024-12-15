import { get } from "svelte/store";
import { language } from "./state.svelte";
import type { Language } from "./data/phalanx-types";
import { page } from "$app/stores";
import { renderSimpleVarsTemplate, type Vars } from "./utils/template-renderer";
import { derived } from "svelte/store";

export const currentLanguage = (): Language => {
    return get(language);
};

export const format = (key: string, vars: Vars = {}): string => {
    const data = get(page).data.i18nData;
    const curr = get(language);

    if (curr in data && key in data[curr]) {
        return renderSimpleVarsTemplate(data[curr][key], vars);
    }

    if (key in data["en"]) {
        return renderSimpleVarsTemplate(data["en"][key], vars);
    }

    return `{{${key}}}`;
};

export const t = derived([page, language], () => format);
