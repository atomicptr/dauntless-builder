<script lang="ts">
import { weaponTypeValues } from "$lib/data/phalanx-types";
import LazyImage from "../LazyImage.svelte";
import type { FilterData } from "../PickerModal.svelte";

interface Props {
    filterData: FilterData;
    updateFilter?: (filterData: FilterData) => void;
}

const { filterData, updateFilter }: Props = $props();
</script>

<div class="join w-full">
    {#each weaponTypeValues as weaponType}
        <button class="btn join-item grow hover:btn-secondary" class:btn-primary={filterData.weaponType === weaponType} onclick={updateFilter ? () => updateFilter({weaponType: filterData.weaponType === weaponType ? null : weaponType}) : undefined}>
            <LazyImage class="w-6 h-6" src={`/icons/${weaponType}.png`} alt={weaponType} />
        </button>
    {/each}
</div>
