<script lang="ts">
import { page } from "$app/stores";
import type { BuildWeapon } from "$lib/build/Build";
import { translatableString } from "$lib/utils/translatable-string";
import LazyImage from "./LazyImage.svelte";
import Shape from "./Shape.svelte";
import TalentOptionText from "./TalentOptionText.svelte";

interface TalentModalProps {
    weapon: BuildWeapon;
    onSelected?: (row: number, col: number, value: boolean) => void;
    onClose?: () => void;
}

const { weapon, onSelected, onClose }: TalentModalProps = $props();
const weaponData = $derived($page.data.weapons[weapon.id] ?? null);
const cellColor = (rowIndex: number, value: boolean): string =>
    value ? (rowIndex % 2 === 0 ? " btn-primary" : " btn-secondary") : "";
const cellTextColor = (rowIndex: number, value: boolean): string =>
    value ? (rowIndex % 2 === 0 ? " text-primary-content" : " text-secondary-content") : "";
const cellIconShape = (colIndex: number): "square" | "pentagon" | "hexagon" | "octagon" | "circle" =>
    ["square", "pentagon", "hexagon", "octagon", "circle"][colIndex] as
        | "square"
        | "pentagon"
        | "hexagon"
        | "octagon"
        | "circle";
</script>

<dialog class="modal bg-base-300/80" open>
    <div class="modal-box w-5xl max-w-5xl">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onclick={onClose ? () => onClose() : undefined}>✕</button>

        <div class="mt-8"></div>

        <div class="grid sm:grid-cols-5 gap-2">
            {#each weapon.talents as row, rowIndex}
                <div class="text-xl my-4 sm:hidden">{translatableString(weaponData.talents[rowIndex].name)}</div>
                
                {#each row as col, colIndex}
                    {#if weaponData.talents[rowIndex].options[colIndex]}
                        <button
                            class={"card-btn flex flex-col " + cellColor(rowIndex, col)}
                            disabled={!col && row.filter(b => b).length === 3}
                            onclick={onSelected ? () => onSelected(rowIndex, colIndex, !col) : undefined}
                        >
                            <div>
                                <Shape type={cellIconShape(colIndex)}>
                                    <LazyImage class="w-6 h-6 dark:invert" src="/icons/noicon.png" alt={"Talent"} />
                                </Shape>
                            </div>
                            <TalentOptionText class={cellTextColor(rowIndex, col)} option={weaponData.talents[rowIndex].options[colIndex]} />
                        </button>
                    {:else}
                        <button class="card-btn" disabled>x</button>
                    {/if}
                {/each}
            {/each}
        </div>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button class="cursor-default" onclick={onClose}>close</button>
    </form>
</dialog>
