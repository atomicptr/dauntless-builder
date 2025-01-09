import { browser } from "$app/environment";

export const env = (name: string) => {
    if (!browser) {
        return null;
    }

    return import.meta.env[name];
};

export const envBool = (name: string) => env(name) === "true";
