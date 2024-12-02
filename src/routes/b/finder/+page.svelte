<script lang="ts">
import { page } from "$app/stores";
import FinderItemFilter from "$lib/components/FinderItemFilter.svelte";
import MiniBuild from "$lib/components/MiniBuild.svelte";
import PerkSelect from "$lib/components/PerkSelect.svelte";
import type { Perk } from "$lib/data/phalanx-types";
import { findBuilds, findAvailablePerks, type WhitelistedItems } from "$lib/finder/finder.svelte";

// TODO: determine pre selected perk ids from url
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

const onPerkSelected = (perkId: number): void => {
    if (selectedPerks.indexOf(perkId) > -1) {
        selectedPerks = selectedPerks.filter((perk) => perk !== perkId);
        disabledPerks = [];
    } else {
        selectedPerks.push(perkId);
    }

    const allPerks = Object.values<Perk>($page.data.perks).map((perk) => perk.id);

    const availablePerks = findAvailablePerks(
        selectedPerks.filter((a) => a),
        allPerks
            .filter((perkId) => selectedPerks.indexOf(perkId) === -1)
            .filter((perkId) => disabledPerks.indexOf(perkId) === -1),
        whitelist,
    );

    disabledPerks = allPerks
        .filter((perkId) => selectedPerks.indexOf(perkId) === -1)
        .filter((perkId) => availablePerks.indexOf(perkId) === -1);
};

const clearPerks = (): void => {
    selectedPerks = [];
    disabledPerks = [];
};
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
</div>
