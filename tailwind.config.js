import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["selector", '[data-theme="dark"]'],
    content: ["./src/**/*.{svelte,ts,js}"],
    theme: {
        extend: {},
    },
    plugins: [
        daisyui,
        function ({ addVariant }) {
            addVariant("light", '[data-theme="light"] &');
        },
    ],
    daisyui: {
        themes: ["dark", "light"],
    },
};
