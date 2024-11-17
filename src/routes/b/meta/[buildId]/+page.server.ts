import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent, params }) => {
    const parentData = await parent();
    const build = parentData.buildsData.meta.filter((b) => b.id.toString() === params.buildId)[0];
    return { build };
};
