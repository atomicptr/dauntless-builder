import { fetchBuildsData } from "$lib/data/phalanx";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => { 
    const buildsData = await fetchBuildsData();
    const build = buildsData.meta.filter((b) => b.id.toString() === params.buildId)[0];
    return { build };
};
