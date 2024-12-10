<script lang="ts">
import { afterNavigate, goto } from "$app/navigation";
import { page } from "$app/stores";
import FinderItemFilter from "$lib/components/FinderItemFilter.svelte";
import ExclamationTriangle from "$lib/components/icons/ExclamationTriangle.svelte";
import MiniBuild from "$lib/components/MiniBuild.svelte";
import PageTitle from "$lib/components/PageTitle.svelte";
import PerkSelect from "$lib/components/PerkSelect.svelte";
import type { Perk } from "$lib/data/phalanx-types";
import { findBuilds, findAvailablePerks, type WhitelistedItems } from "$lib/finder/finder.svelte";
import { finderPageDataSerialize, type FinderInitialData } from "$lib/finder/initial";
import { translatableString } from "$lib/utils/translatable-string.js";
import { onMount } from "svelte";

const { data } = $props();

const selectedPerks = $derived(data.finderPageData.perks);
let disabledPerks = $state([] as number[]);

const whitelist: WhitelistedItems = $derived({
    heads: data.finderPageData.items.heads,
    torsos: data.finderPageData.items.torsos,
    arms: data.finderPageData.items.arms,
    legs: data.finderPageData.items.legs,
});

const metaDescription = $derived(
    selectedPerks
        .filter((perk) => perk in $page.data.perks)
        .map((perk) => $page.data.perks[perk] as Perk)
        .map((perk) => translatableString(perk.name))
        .sort((a, b) => a.localeCompare(b))
        .join(", "),
);

const updateFinderState = (perks: number[], whitelist: WhitelistedItems) => {
    const packData = (): FinderInitialData => ({
        perks,
        items: whitelist,
    });

    goto(`/b/finder/${finderPageDataSerialize(packData())}`, { noScroll: true });
};

const builds = $derived(findBuilds(selectedPerks, whitelist));

const calculateDisabledPerks = () => {
    const allPerks = Object.values<Perk>($page.data.perks).map((perk) => perk.id);

    const availablePerks = findAvailablePerks(
        selectedPerks.filter((a) => a),
        allPerks.filter((perkId) => selectedPerks.indexOf(perkId) === -1),
        whitelist,
    );

    return allPerks
        .filter((perkId) => selectedPerks.indexOf(perkId) === -1)
        .filter((perkId) => availablePerks.indexOf(perkId) === -1);
};

const onPerkSelected = (perkId: number): void => {
    let newSelectedPerks = selectedPerks;

    if (selectedPerks.indexOf(perkId) > -1) {
        newSelectedPerks = selectedPerks.filter((perk) => perk !== perkId);
    } else {
        selectedPerks.push(perkId);
    }

    updateFinderState(newSelectedPerks, whitelist);
};

const clearPerks = (): void => {
    updateFinderState([], whitelist);
};

const onItemFilterChange = (whitelist: WhitelistedItems) => {
    updateFinderState(selectedPerks, whitelist);
};

onMount(() => {
    disabledPerks = calculateDisabledPerks();
});

afterNavigate(() => {
    disabledPerks = calculateDisabledPerks();
});
</script>

<PageTitle title={"Finder"} description={metaDescription.length === 0 ? undefined : metaDescription} hidden />

<div class="flex flex-col gap-2 mb-8 w-full">
    <FinderItemFilter heads={whitelist.heads} torsos={whitelist.torsos} arms={whitelist.arms} legs={whitelist.legs} onChange={onItemFilterChange} />

    <PerkSelect 
        perks={selectedPerks}
        {disabledPerks}
        onSelect={onPerkSelected}
        onClear={clearPerks}
    />

    {#if builds.length > 0 && selectedPerks.length > 0}
        <h2 class="text-2xl mt-8">Builds ({builds.length})</h2>

        {#each builds as build}
            <MiniBuild {build} />
        {/each}
    {/if}

    {#if selectedPerks.length === 0}
        <div class="alert alert-warning mt-4">
            <ExclamationTriangle />
            No perks have been selected, please select one above.
        </div>
    {/if}

    {#if selectedPerks.length > 0 && builds.length === 0}
        <div class="alert alert-warning mt-4">
            <ExclamationTriangle />
            No builds have been found, please change your filter options.
        </div>
    {/if}
</div>
