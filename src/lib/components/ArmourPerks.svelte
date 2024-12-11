<script lang="ts">
import { page } from "$app/stores";
import type { BuildArmourPiece } from "$lib/build/Build";
import { armourStatsForLevel, getCellPerks, mergePerks, sortPerkSetByName } from "$lib/data/levels";
import { type Perk } from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";
import LazyImage from "./LazyImage.svelte";
import PerkItem from "./PerkItem.svelte";
import ValuesText from "./ValuesText.svelte";

interface Props {
    selected: BuildArmourPiece;
}

const { selected }: Props = $props();
const armour = $derived(selected.id !== 0 ? $page.data.armours[selected.id] : null);
const perks = $derived(armourStatsForLevel(armour, selected.level) ?? {});
const perkSet = $derived(sortPerkSetByName($page.data.perks, mergePerks(perks, getCellPerks(selected.cells))));
</script>

{#if Object.keys(perkSet).length > 0}
    <div class="card bg-base-200/50 shadow">
        <div class="card-body">
            {#each Object.entries(perkSet) as [perkId, amount]}
                <PerkItem {perkId} {amount}>
                    {#snippet item(perk: Perk, amount: number)}
                        <div
                            class="flex flex-row gap-2 items-center py-2 sm:py-0"
                            class:text-secondary={perk.id in getCellPerks(selected.cells)}
                        >
                            <div>
                                <LazyImage class="w-6 h-6" src={`/icons/${perk.type}.png`} />
                            </div>
                            <div class="grow text-left">
                                {translatableString(perk.name)}
                            </div>
                            <div class="flex flex-row gap-1">
                                <span class="font-bold">
                                    {amount}
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
