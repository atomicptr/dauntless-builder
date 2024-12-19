import { phalanxData } from "$lib/data/phalanx-data";
import { phalanxFinderData } from "$lib/data/phalanx-finder-data";
import { finderPageDataDeserialize } from "$lib/finder/initial";
import { createETag } from "$lib/json";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, setHeaders }) => {
    const { perks, armours } = phalanxData;

    setHeaders({
        ETag: createETag(params.options + phalanxFinderData.__meta?.buildTime.toString()),
        "Cache-Control": "max-age=3600, must-revalidate",
    });

    const finderPageData = finderPageDataDeserialize(params.options);

    // filter out invalid items
    finderPageData.perks = finderPageData.perks.filter((perkId) => perkId in perks);
    finderPageData.items.heads = finderPageData.items.heads.filter((armourId) => armourId in armours);
    finderPageData.items.torsos = finderPageData.items.torsos.filter((armourId) => armourId in armours);
    finderPageData.items.arms = finderPageData.items.arms.filter((armourId) => armourId in armours);
    finderPageData.items.legs = finderPageData.items.legs.filter((armourId) => armourId in armours);

    return { finderPageData };
};
