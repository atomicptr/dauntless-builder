import type { TranslatableString } from "$lib/data/phalanx-types";
import { currentLanguage } from "$lib/i18n.svelte";

export const translatableString = (str: TranslatableString | null): string => {
    if (!str) {
        return "";
    }

    const curr = currentLanguage();

    if (curr in str) {
        return str[curr];
    }

    return str["en"];
};
