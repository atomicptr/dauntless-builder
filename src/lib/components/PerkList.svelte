<script lang="ts">
import { page } from "$app/stores";
import type { Build } from "$lib/build/Build";
import { armourStatsForLevel, getCellPerks, mergePerksArray, sortPerkSetByName } from "$lib/data/levels";
import PerkItem from "./PerkItem.svelte";

interface PerkListProps {
    build: Build;
}

const { build }: PerkListProps = $props();

const perkSet = $derived(
    sortPerkSetByName(
        $page.data.perks,
        mergePerksArray([
            $page.data.armours[build.head.id]
                ? (armourStatsForLevel($page.data.armours[build.head.id], build.head.level) ?? {})
                : {},
            getCellPerks(build.head.cells),
            $page.data.armours[build.torso.id]
                ? (armourStatsForLevel($page.data.armours[build.torso.id], build.torso.level) ?? {})
                : {},
            getCellPerks(build.torso.cells),
            $page.data.armours[build.arms.id]
                ? (armourStatsForLevel($page.data.armours[build.arms.id], build.arms.level) ?? {})
                : {},
            getCellPerks(build.arms.cells),
            $page.data.armours[build.legs.id]
                ? (armourStatsForLevel($page.data.armours[build.legs.id], build.legs.level) ?? {})
                : {},
            getCellPerks(build.legs.cells),
        ]),
    ),
);
</script>

{#if Object.values(perkSet).length > 0}
<div class="card shadow bg-base-200">
    <div class="card-body">
        <div class="card-title">
            Perks
        </div>

        <ul class="list-disc pl-8">
            {#each Object.entries(perkSet) as [perkId, amount]}
                <li
                    class="ml-4"
                    class:text-error={amount > $page.data.perks[perkId].threshold}
                    class:text-gray-500={amount < $page.data.perks[perkId].threshold}
                >
                    <PerkItem {perkId} {amount} />
                </li>
            {/each}
        </ul>
    </div>
</div>
{/if}
