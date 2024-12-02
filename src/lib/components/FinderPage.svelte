<script lang="ts">
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import FinderItemFilter from "$lib/components/FinderItemFilter.svelte";
import ExclamationTriangle from "$lib/components/icons/ExclamationTriangle.svelte";
import MiniBuild from "$lib/components/MiniBuild.svelte";
import PerkSelect from "$lib/components/PerkSelect.svelte";
import type { Perk } from "$lib/data/phalanx-types";
import { findBuilds, findAvailablePerks, type WhitelistedItems } from "$lib/finder/finder.svelte";
import { finderPageDataSerialize, type FinderInitialData } from "$lib/finder/initial";
import { onMount } from "svelte";

interface Props {
    initialFinderData: FinderInitialData;
}

const { initialFinderData }: Props = $props();

let selectedPerks = $state([] as number[]);
let disabledPerks = $state([] as number[]);

let whitelistedHeads = $state([] as number[]);
let whitelistedTorsos = $state([] as number[]);
let whitelistedArms = $state([] as number[]);
let whitelistedLegs = $state([] as number[]);

const whitelist: WhitelistedItems = $derived({
    heads: whitelistedHeads,
    torsos: whitelistedTorsos,
    arms: whitelistedArms,
    legs: whitelistedLegs,
});

const builds = $derived(
    findBuilds(selectedPerks, {
        heads: whitelistedHeads,
        torsos: whitelistedTorsos,
        arms: whitelistedArms,
        legs: whitelistedLegs,
    }),
);

const calculateDisabledPerks = () => {
    const allPerks = Object.values<Perk>($page.data.perks).map((perk) => perk.id);

    const availablePerks = findAvailablePerks(
        selectedPerks.filter((a) => a),
        allPerks
            .filter((perkId) => selectedPerks.indexOf(perkId) === -1)
            .filter((perkId) => disabledPerks.indexOf(perkId) === -1),
        whitelist,
    );

    return allPerks
        .filter((perkId) => selectedPerks.indexOf(perkId) === -1)
        .filter((perkId) => availablePerks.indexOf(perkId) === -1);
};

const onPerkSelected = (perkId: number): void => {
    if (selectedPerks.indexOf(perkId) > -1) {
        selectedPerks = selectedPerks.filter((perk) => perk !== perkId);
        disabledPerks = [];
    } else {
        selectedPerks.push(perkId);
    }

    disabledPerks = calculateDisabledPerks();
};

const clearPerks = (): void => {
    selectedPerks = [];
    disabledPerks = [];
};

onMount(() => {
    whitelistedHeads = initialFinderData.items.head;
    whitelistedTorsos = initialFinderData.items.torso;
    whitelistedArms = initialFinderData.items.arms;
    whitelistedLegs = initialFinderData.items.legs;
    selectedPerks = initialFinderData.perks;
    disabledPerks = calculateDisabledPerks();
});

$effect(() => {
    const packData = (): FinderInitialData => ({
        perks: selectedPerks,
        items: {
            head: whitelistedHeads,
            torso: whitelistedTorsos,
            arms: whitelistedArms,
            legs: whitelistedLegs,
        },
    });

    goto(`/b/finder/${finderPageDataSerialize(packData())}`);
});
</script>

<div class="flex flex-col gap-2 mb-8 w-full">
    <FinderItemFilter bind:heads={whitelistedHeads} bind:torsos={whitelistedTorsos} bind:arms={whitelistedArms} bind:legs={whitelistedLegs} />

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
