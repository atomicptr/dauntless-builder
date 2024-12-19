import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import path from "path";
import fs from "fs/promises";

export default defineConfig(({ command }) => ({
    plugins: [
        {
            name: "fetch-data",
            async buildStart() {
                const fetchEndpoint = async (endpoint: string): Promise<object> => {
                    const baseUrl = process.env["PHALANX_BASE_URL"] ?? "https://dauntless-builder.com";
                    const apiKey = process.env["PHALANX_API_KEY"] ?? "static";

                    const endpointExt = apiKey === "static" ? ".json" : "";

                    const url = baseUrl + endpoint + endpointExt;

                    const res = await fetch(url, {
                        headers: {
                            "X-Phalanx-Api-Key": apiKey,
                        },
                    });

                    if (command === "build") {
                        console.log(`fetching ${url}...`);
                    }

                    if (!res.ok) {
                        throw new Error(`HTTP error: ${res.status}`);
                    }

                    return await res.json();
                };

                const fetchAndWrite = async (endpoint: string, filepath: string) => {
                    const data = await fetchEndpoint(endpoint);
                    await fs.writeFile(filepath, JSON.stringify(data, null, "    "), "utf8");
                    console.log(`written to ${filepath}`);
                };

                const buildStaticData = async () => {
                    const baseDir = path.join(__dirname, "src", "lib", "static");
                    await fs.mkdir(baseDir, { recursive: true });

                    fetchAndWrite("/api/data", path.join(baseDir, "data.json"));
                    fetchAndWrite("/api/i18n", path.join(baseDir, "i18n.json"));
                    fetchAndWrite("/api/finder-data", path.join(baseDir, "finder-data.json"));
                    fetchAndWrite("/api/builds", path.join(baseDir, "builds.json"));
                };

                buildStaticData();

                if (command === "serve") {
                    // TODO: check if files have changed, if yes redownload
                }
            },
        },
        sveltekit(),
    ],
}));
