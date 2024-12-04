import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import { defineConfig } from "vitest/config";

const maximumFileSizeToCacheInBytes = 5 * 1024 * 1024; // 5 MB

export default defineConfig({
    plugins: [
        sveltekit(),
        SvelteKitPWA({
            registerType: "autoUpdate",
            includeAssets: ["static/*.png", "static/icons/*.png"],
            manifest: {
                name: "Dauntless Builder",
                background_color: "#1D232A",
                icons: [
                    {
                        "src": "https://www.dauntless-builder.com/icon.png",
                    }
                ],
                shortcuts: [
                    {
                        description: "Create a new build!",
                        icons: [],
                        name: "New Build",
                        url: "/b/new",
                    },
                    {
                        description: "Know what perks you want? Find a fitting build right here!",
                        icons: [],
                        name: "Build Finder",
                        url: "/b/finder",
                    },
                    {
                        description: "The best builds made by the community!",
                        icons: [],
                        name: "Meta Builds",
                        url: "/b/meta",
                    },
                ],
                categories: ["games", "utilities"],
                screenshots: [
                    {
                        label: "Screenshot of an build in Dauntless Builder",
                        platform: "wide",
                        sizes: "1903x992",
                        src: "https://raw.githubusercontent.com/atomicptr/dauntless-builder/master/.github/screenshot.png",
                        type: "image/png",
                    },
                ],
            },
            workbox: {
                cleanupOutdatedCaches: true,
                clientsClaim: true,
                maximumFileSizeToCacheInBytes,
                sourcemap: true,
            },
        }),
    ],
    test: {
        globalSetup: ["./src/lib/test/data.ts"],
    },
});
