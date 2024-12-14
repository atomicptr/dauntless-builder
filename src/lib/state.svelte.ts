import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";
import { determineBrowserLanguage, type Language } from "./i18n";

const determineThemePreference = () => {
    if (!browser) {
        return "dark";
    }

    const theme = localStorage.getItem("theme");
    if (theme === "dark" || theme === "light") {
        return theme;
    }

    // try to determine from browser
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
    }

    return "dark";
};

export let drawerOpen = writable(false);

const storagable = <T>(key: string, defaultValue: T): Writable<T> => {
    let value = defaultValue;

    try {
        value = browser
            ? key in localStorage
                ? JSON.parse(localStorage.getItem(key) ?? JSON.stringify(defaultValue))
                : defaultValue
            : defaultValue;
    } catch (err) {
        console.error(`Could not read item "${key}" from local storage, because: `, err, "removing it...");
        localStorage.removeItem(key);
    }

    const store = writable<T>(value);

    store.subscribe((newValue) => {
        if (browser) {
            localStorage.setItem(key, JSON.stringify(newValue));
        }
    });

    return store;
};

export let theme = storagable<"light" | "dark">("theme", determineThemePreference());
export let language = storagable<Language>("lang", determineBrowserLanguage());
export let configViewWeaponAbilities = storagable<boolean>("config.builder.view-weapon-abilities", true);
export let configViewWeaponTalents = storagable<boolean>("config.builder.view-weapon-talents", true);
