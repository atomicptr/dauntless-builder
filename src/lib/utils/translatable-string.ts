import type { TranslatableString } from "$lib/data/phalanx-types";

export const translatableString = (str: TranslatableString): string => {
    return str["en"];
};
