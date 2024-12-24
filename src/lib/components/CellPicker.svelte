<script lang="ts">
import { phalanxData } from "$lib/data/phalanx-data";
import type { ArmourType } from "$lib/data/phalanx-types";
import { perkIcon } from "$lib/data/static-data";
import { translatableString } from "$lib/utils/translatable-string";
import LazyImage from "./LazyImage.svelte";

interface CellPickerProps {
    type: ArmourType;
    selected: number;
    index: number;
    onClick?: (type: ArmourType, index: number) => void;
}

const { type, selected, index, onClick }: CellPickerProps = $props();
const perk = $derived(selected !== 0 ? phalanxData.perks[selected] : null);
const disabled = $derived(onClick === undefined);
</script>

<button class="card-btn sm:w-24 grow flex flex-col" onclick={onClick ? () => onClick(type, index) : undefined} {disabled}>
    {#if perk}
        <LazyImage class="w-8 h-8 light:invert" src={perkIcon(perk)} alt={translatableString(perk.name)} />
        <div>{translatableString(perk.name)}</div>
    {:else}
        <LazyImage class="w-8 h-8 light:invert" src={`/icons/prismatic.png`} alt="None" />
    {/if}
</button>
