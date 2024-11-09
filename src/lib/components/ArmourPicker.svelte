<script lang="ts">
import { page } from "$app/stores";
import type { BuildArmourPiece } from "$lib/build/Build";
import { armourStatsForLevel, getCellPerks, mergePerks } from "$lib/data/levels";
import type { ArmourType } from "$lib/data/phalanx-types";
import { elementResistanceLevel, oppositeElement, resistanceLevel } from "$lib/data/static-data";
import { translatableString } from "$lib/utils/translatable-string";
import CellPicker from "./CellPicker.svelte";

interface ArmourPiecePickerProps {
    type: ArmourType;
    selected: BuildArmourPiece;
    onArmourPieceClick: (type: ArmourType) => void;
    onCellClick: (type: ArmourType, index: number) => void;
}

const { type, selected, onArmourPieceClick, onCellClick }: ArmourPiecePickerProps = $props();
const armour = $derived(selected.id !== 0 ? $page.data.armours[selected.id] : null);
const icon = $derived(armour.icon ?? `/icons/${type}.png`);
const perks = $derived(armourStatsForLevel(armour, selected.level) ?? {});
const perkSet = $derived(mergePerks(perks, getCellPerks(selected.cells)));
</script>

{#if armour}
    <div class="flex flex-col sm:flex-row gap-2 min-h-20">
        <button class="card-btn grow element-border element-border-{armour.element}" onclick={() => onArmourPieceClick(type)}>
            <div class="w-16 ml-2">
                <img src="{icon}" alt="{translatableString(armour.name)}" />
            </div>
            <div class="grow">
                {translatableString(armour.name)}
                {#if selected.level > 1}
                    +{selected.level}
                {/if}
            </div>
            <div class="mr-4 flex flex-col align-center">
                <div class="text-xl">
                    {resistanceLevel(selected.level)}
                </div>
                <div class="element-text-{armour.element}">
                    +{elementResistanceLevel(selected.level)}
                </div>
                <div class="element-text-{oppositeElement(armour.element)}">
                    -{elementResistanceLevel(selected.level)}
                </div>
            </div>
        </button>
        {#each selected.cells as cellId, index}
            <CellPicker type={type} index={index} selected={cellId} onClick={onCellClick} />
        {/each}
    </div>

    <div class="pl-4">
        <ul class="list-disc p-4">
            {#each Object.entries(perkSet) as [perkId, amount]}
                <li class:text-secondary={perkId in getCellPerks(selected.cells)}>{translatableString($page.data.perks[perkId].name)} x{amount}</li>
            {/each}
        </ul>
    </div>
{:else}
    <div class="flex flex-row gap-2 min-h-20">
        <button class="card-btn grow" onclick={() => onArmourPieceClick(type)}>
            <div class="w-16 ml-2">
                <img src={`/icons/${type}.png`} alt={type} class="invert dark:invert-0" />
            </div>
            <div class="grow">
                Select an armour piece
            </div>
        </button>
    </div>
{/if}
