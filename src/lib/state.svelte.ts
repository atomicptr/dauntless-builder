import { browser } from "$app/environment";
import { writable } from "svelte/store";

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
