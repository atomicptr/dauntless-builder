<script lang="ts">
import { page } from "$app/stores";
import type { BuildArmourPiece } from "$lib/build/Build";
import { armourStatsForLevel, getCellPerks, mergePerks, sortPerkSetByName } from "$lib/data/levels";
import { translatableString } from "$lib/utils/translatable-string";
import PerkTooltip from "./PerkTooltip.svelte";

interface Props {
    selected: BuildArmourPiece;
}

const { selected }: Props = $props();
const armour = $derived(selected.id !== 0 ? $page.data.armours[selected.id] : null);
const perks = $derived(armourStatsForLevel(armour, selected.level) ?? {});
const perkSet = $derived(sortPerkSetByName($page.data.perks, mergePerks(perks, getCellPerks(selected.cells))));
</script>

{#if Object.keys(perkSet).length > 0}
    <div class="pl-4">
        <ul class="list-disc p-4">
            {#each Object.entries(perkSet) as [perkId, amount]}
                <li class:text-secondary={perkId in getCellPerks(selected.cells)}>
                    <PerkTooltip {perkId}>
                        {translatableString($page.data.perks[perkId].name)} x{amount}
                    </PerkTooltip>
                </li>
            {/each}
        </ul>
    </div>
{/if}
