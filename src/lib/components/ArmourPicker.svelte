<script lang="ts">
import { page } from "$app/stores";
import type { BuildArmourPiece } from "$lib/build/Build";
import type { ArmourType } from "$lib/data/phalanx-types";
import { elementResistanceLevel, oppositeElement, powerLevel, resistanceLevel } from "$lib/data/static-data";

interface ArmourPiecePickerProps {
    type: ArmourType;
    selected: BuildArmourPiece;
    onArmourPieceClick: (type: ArmourType) => void;
    onCellClick: (type: ArmourType, index: number, cellId: number) => void;
}

const { type, selected, onArmourPieceClick, onCellClick }: ArmourPiecePickerProps = $props();
const armour = $derived(selected.id !== 0 ? $page.data.armours[selected.id] : null);
const icon = $derived(armour.icon ?? "/icon.png");
</script>

{#if armour}
    <div class="flex flex-row gap-2 min-h-20">
        <button class="card-btn grow element-border element-border-{armour.element}" onclick={() => onArmourPieceClick(type)}>
            <div class="w-16 ml-2">
                <img src="{icon}" alt="{armour.name}" />
            </div>
            <div class="grow">
                {armour.name}
                {#if selected.level > 1}
                    +{selected.level}
                {/if}
            </div>
            <div class="mr-4 flex flex-col align-center">
                <div class="text-xl">
                    {resistanceLevel(selected.level)}
                </div>
                <div class="element-text-{oppositeElement(armour.element)}">
                    +{elementResistanceLevel(selected.level)}
                </div>
                <div class="element-text-{armour.element}">
                    -{elementResistanceLevel(selected.level)}
                </div>
            </div>
        </button>
        {#each selected.cells as cellId, index}
            <button class="card-btn max-w-32 grow" onclick={() => onCellClick(type, index, cellId)} aria-label="Cells">
                {#if cellId !== 0}
                    <div>ICON</div>
                    <div>+1 Super Duper Speed</div>
                {:else}
                    None
                {/if}
            </button>
        {/each}
    </div>
{:else}
    <div class="flex flex-row gap-2 min-h-20">
        <button class="card-btn grow" onclick={() => onArmourPieceClick(type)}>
            <div class="w-16 ml-2">
                Placeholder icon
            </div>
            <div class="grow">
                Select an armour piece
            </div>
        </button>
    </div>
{/if}
