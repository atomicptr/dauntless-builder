<script lang="ts">
import { page } from "$app/stores";
import type { Build } from "$lib/build/Build";
import { armourStatsForLevel, getCellPerks, mergePerksArray, sortPerkSetByName } from "$lib/data/levels";
import { type Perk } from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";
import LazyImage from "./LazyImage.svelte";
import PerkItem from "./PerkItem.svelte";
import ValuesText from "./ValuesText.svelte";

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
    <div class="card bg-base-200/75 shadow">
        <div class="card-body">
            <div class="card-title">
                Perks
            </div>

            {#each Object.entries(perkSet) as [perkId, amount]}
                <PerkItem {perkId} {amount}>
                    {#snippet item(perk: Perk, amount: number)}
                        <div
                            class="flex flex-row gap-2 items-center py-2"
                            class:text-error={amount < perk.threshold}
                            class:text-warning={amount > perk.threshold}
                        >
                            <div>
                                <LazyImage class="w-6 h-6" src={`/icons/${perk.type}.png`} />
                            </div>
                            <div class="grow">
                                {translatableString(perk.name)}
                            </div>
                            <div class="flex flex-row gap-1">
                                <span class="font-bold">
                                    {amount}
                                </span>
                                <span>
                                    /
                                </span>
                                <span>
                                    {perk.threshold}
                                </span>
                            </div>
                        </div>
                        <div class="sm:hidden mb-4 sm:mb-0">
                            <ValuesText text={perk.effect} values={perk.values} />
                        </div>
                    {/snippet}
                </PerkItem>
            {/each}
        </div>
    </div>
{/if}
