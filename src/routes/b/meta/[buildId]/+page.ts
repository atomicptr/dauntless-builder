import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, parent }) => {
    const { buildsData } = await parent();
    const build = buildsData.meta.filter((b) => b.id.toString() === params.buildId)[0];
    return { build };
};
