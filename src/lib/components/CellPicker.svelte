<script lang="ts">
import { page } from "$app/stores";
import type { ArmourType } from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";
import LazyImage from "./LazyImage.svelte";

interface CellPickerProps {
    type: ArmourType;
    selected: number;
    index: number;
    onClick?: (type: ArmourType, index: number) => void;
}

const { type, selected, index, onClick }: CellPickerProps = $props();
const perk = $derived(selected !== 0 ? $page.data.perks[selected] : null);
</script>

<button class="card-btn sm:max-w-32 grow flex flex-col" onclick={onClick ? () => onClick(type, index) : undefined}>
    {#if perk}
        <LazyImage class="w-8 h-8" src={`/icons/${perk.type}.png`} alt={translatableString(perk.name)} />
        <div>{translatableString(perk.name)}</div>
    {:else}
        <LazyImage class="w-8 h-8" src={`/icons/prismatic.png`} alt="None" />
    {/if}
</button>
