import { finderPageDataDeserialize } from "$lib/finder/initial";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, params, data }) => {
    const { perks, armours } = await parent();
    const { finderData } = data;

    const finderPageData = finderPageDataDeserialize(params.options);

    // filter out invalid items
    finderPageData.perks = finderPageData.perks.filter((perkId) => perkId in perks);
    finderPageData.items.heads = finderPageData.items.heads.filter((armourId) => armourId in armours);
    finderPageData.items.torsos = finderPageData.items.torsos.filter((armourId) => armourId in armours);
    finderPageData.items.arms = finderPageData.items.arms.filter((armourId) => armourId in armours);
    finderPageData.items.legs = finderPageData.items.legs.filter((armourId) => armourId in armours);

    return { finderData, finderPageData };
};
