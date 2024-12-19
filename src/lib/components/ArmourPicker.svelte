<script lang="ts">
import { page } from "$app/stores";
import type { BuildArmourPiece } from "$lib/build/Build";
import { itemIconSize } from "$lib/constants";
import { phalanxData } from "$lib/data/phalanx-data";
import type { ArmourType } from "$lib/data/phalanx-types";
import { t } from "$lib/i18n.svelte";
import { translatableString } from "$lib/utils/translatable-string";
import ArmourPerks from "./ArmourPerks.svelte";
import ArmourResistance from "./ArmourResistance.svelte";
import CellPicker from "./CellPicker.svelte";
import LazyImage from "./LazyImage.svelte";
import Level from "./Level.svelte";

interface ArmourPiecePickerProps {
    type: ArmourType;
    selected: BuildArmourPiece;
    onArmourPieceClick?: (type: ArmourType) => void;
    onCellClick?: (type: ArmourType, index: number) => void;
}

const { type, selected, onArmourPieceClick, onCellClick }: ArmourPiecePickerProps = $props();
const armour = $derived(selected.id !== 0 ? phalanxData.armours[selected.id] : null);
const icon = $derived(armour?.icon ?? `/icons/${type}.png`);
const disabled = $derived(onArmourPieceClick === undefined);
</script>

{#if armour}
    <div class="flex flex-col sm:flex-row gap-2 min-h-20 flex-wrap">
        <button class="card-btn grow element-border element-border-{armour.element}" onclick={onArmourPieceClick ? () => onArmourPieceClick(type) : undefined} {disabled}>
            <LazyImage class={`${itemIconSize} ml-2`} src={icon} alt={translatableString(armour.name)} />
            <div class="grow">
                {translatableString(armour.name)}
                <Level level={selected.level} />
            </div>
            <ArmourResistance level={selected.level} element={armour.element} />
        </button>
        {#each selected.cells as cellId, index}
            <CellPicker type={type} index={index} selected={cellId} onClick={onCellClick} />
        {/each}
    </div>

    <ArmourPerks {selected} />
{:else if !disabled}
    <div class="flex flex-row gap-2 min-h-20">
        <button class="card-btn grow" onclick={onArmourPieceClick ? () => onArmourPieceClick(type) : undefined}>
            <LazyImage src={`/icons/${type}.png`} alt={$t(`term-${type}`)} class={`${itemIconSize} ml-2 light:invert`} />
            <div class="grow">
                { $t("page-build-select-armour") }
            </div>
        </button>
    </div>
{/if}
