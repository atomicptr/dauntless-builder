import type { ValuesType } from "$lib/data/phalanx-types";

export interface Vars {
    [key: string]: string;
}

export const renderSimpleVarsTemplate = (text: string, vars: Vars): string => {
    let res = text;

    Object.entries(vars).forEach(([key, value]) => {
        res = res.replaceAll(`{${key}}`, value);
    });

    return res;
};

export const renderTemplate = (text: string, vars: ValuesType[]): string => {
    let res = text;

    vars.forEach((v) => {
        res = res.replaceAll(`{${v.name}}`, v.value.toString());
    });

    return res;
};
