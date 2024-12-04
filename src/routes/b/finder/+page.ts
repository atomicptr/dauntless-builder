import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { finderDefaultData, finderPageDataSerialize } from "$lib/finder/initial";

export const load: PageLoad = () => {
    const options = finderPageDataSerialize(finderDefaultData());
    return redirect(302, `/b/finder/${options}`);
};
