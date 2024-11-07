<script lang="ts">
import { page } from "$app/stores";
import MiniBuild from "$lib/components/MiniBuild.svelte";
import PerkSelect from "$lib/components/PerkSelect.svelte";
import type { Perk } from "$lib/data/phalanx-types";
import { findAvailablePerks, findBuilds } from "$lib/finder/finder.svelte";

// TODO: determine pre selected perk ids from url
let selectedPerks = $state([] as number[]);
let disabledPerks = $state([] as number[]);

const builds = $derived(findBuilds(selectedPerks));

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
    );

    disabledPerks = allPerks
        .filter((perkId) => selectedPerks.indexOf(perkId) === -1)
        .filter((perkId) => availablePerks.indexOf(perkId) === -1);
};
</script>

<div class="flex flex-col gap-2 mb-8">
    <h2 class="text-2xl">Perks</h2>

    <PerkSelect perks={selectedPerks} {disabledPerks} onSelect={onPerkSelected} />

    {#if builds.length > 0}
        <h2 class="text-2xl mt-8">Builds</h2>

        {#each builds as build}
            <MiniBuild {build} />
        {/each}
    {/if}
</div>
