import type { ValuesType } from "$lib/data/phalanx-types";

export const renderTemplate = (text: string, vars: ValuesType[]): string => {
    let res = text;

    vars.forEach((v) => {
        res = res.replaceAll(`{${v.name}}`, v.value.toString());
    });

    return res;
};
