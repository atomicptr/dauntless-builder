import { finderPageDataDeserialize } from "$lib/finder/initial";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
    return { finderPageData: finderPageDataDeserialize(params.options) };
};
