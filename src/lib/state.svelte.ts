import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

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
export let theme = writable(determineThemePreference());

const storagable = <T>(key: string, defaultValue: T): Writable<T> => {
    const value = browser
        ? key in localStorage
            ? JSON.parse(localStorage.getItem(key) ?? JSON.stringify(defaultValue))
            : defaultValue
        : defaultValue;

    const store = writable<T>(value);

    store.subscribe((newValue) => {
        if (browser) {
            localStorage.setItem(key, JSON.stringify(newValue));
        }
    });

    return store;
};

export let configViewWeaponAbilities = storagable<boolean>("config.builder.view-weapon-abilities", true);
