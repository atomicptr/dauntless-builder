import type { TranslatableString } from "$lib/data/phalanx-types";
import { translatableString } from "./translatable-string";

export const searchInStrings = (search: string, strings: string[]): boolean =>
    strings.some((string) => string.toLowerCase().indexOf(search.toLowerCase()) >= 0);

export const searchInTranslatableStrings = (search: string, strings: (TranslatableString | null)[]): boolean =>
    searchInStrings(search, strings.filter((string) => string !== null).map(translatableString));
