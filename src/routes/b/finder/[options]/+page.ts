import { phalanxArmours } from "$lib/data/phalanx-armours";
import { phalanxFinderData } from "$lib/data/phalanx-finder-data";
import { phalanxPerks } from "$lib/data/phalanx-perks";
import { finderPageDataDeserialize } from "$lib/finder/initial";
import { createETag } from "$lib/json";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, setHeaders }) => {
    setHeaders({
        ETag: createETag(params.options + phalanxFinderData.__meta?.buildTime.toString()),
        "Cache-Control": "max-age=3600, must-revalidate",
    });

    const finderPageData = finderPageDataDeserialize(params.options);

    // filter out invalid items
    finderPageData.perks = finderPageData.perks.filter((perkId) => perkId in phalanxPerks);
    finderPageData.items.heads = finderPageData.items.heads.filter((armourId) => armourId in phalanxArmours);
    finderPageData.items.torsos = finderPageData.items.torsos.filter((armourId) => armourId in phalanxArmours);
    finderPageData.items.arms = finderPageData.items.arms.filter((armourId) => armourId in phalanxArmours);
    finderPageData.items.legs = finderPageData.items.legs.filter((armourId) => armourId in phalanxArmours);

    return { finderPageData };
};
