<script lang="ts">
import { perkTypeValues } from "$lib/data/phalanx-types";
import LazyImage from "../LazyImage.svelte";
import type { FilterData } from "../PickerModal.svelte";

interface Props {
    filterData: FilterData;
    updateFilter?: (filterData: FilterData) => void;
}

const { filterData, updateFilter }: Props = $props();
</script>

<div class="join w-full">
    {#each perkTypeValues as perkType}
        <button class="btn join-item grow hover:btn-secondary" class:btn-primary={filterData.perkType === perkType} onclick={updateFilter ? () => updateFilter({perkType: filterData.perkType === perkType ? null : perkType}) : undefined}>
            <LazyImage class="w-6 h-6" src={`/icons/${perkType}.png`} alt={perkType} />
        </button>
    {/each}
</div>
