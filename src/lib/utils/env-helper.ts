import { browser } from "$app/environment";
import { env as envVar } from "$env/dynamic/public";

export const env = (name: string) => {
    if (!browser) {
        return null;
    }

    return envVar[`PUBLIC_${name}`] ?? null;
};

export const envBool = (name: string) => env(name) === "true";
