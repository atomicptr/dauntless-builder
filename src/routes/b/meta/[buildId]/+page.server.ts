import { fetchBuildsData } from "$lib/data/phalanx";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = async () => {
    const buildsData = await fetchBuildsData();
    return Object.values(buildsData.meta).map((build) => ({ buildId: build.id.toString() }));
};

export const load: PageServerLoad = async ({ params }) => {
    const buildsData = await fetchBuildsData();
    const build = buildsData.meta.filter((b) => b.id.toString() === params.buildId)[0];
    return { build };
};
