import type { TranslatableString } from "$lib/data/phalanx-types";

export const translatableString = (str: TranslatableString | null): string => {
    if (!str) {
        return "";
    }

    return str["en"];
};
