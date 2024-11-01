<script lang="ts">
import type { BuildWeapon } from "$lib/build/Build";
import { translatableString } from "$lib/utils/translatable-string";

interface TalentModalProps {
    weapon: BuildWeapon;
    onSelected?: (row: number, col: number, value: boolean) => void;
    onClose?: () => void;
}

const { weapon, onSelected, onClose }: TalentModalProps = $props();
const cellColor = (rowIndex: number, value: boolean): string =>
    value ? (rowIndex % 2 === 0 ? " btn-primary" : " btn-secondary") : "";
</script>

<dialog class="modal modal-top sm:modal-middle bg-base-300/80" open>
    <div class="modal-box">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onclick={onClose ? () => onClose() : undefined}>✕</button>

        <div class="mt-8"></div>

        <div class="grid grid-cols-5 gap-1">
            {#each weapon.talents as row, rowIndex}
                {#each row as col, colIndex}
                    <button
                        class={"btn" + cellColor(rowIndex, col)}
                        disabled={!col && row.filter(b => b).length === 3}
                        onclick={onSelected ? () => onSelected(rowIndex, colIndex, !col) : undefined}>
                        {col}
                    </button>
                {/each}
            {/each}
        </div>
    </div>
</dialog>
