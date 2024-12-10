<script lang="ts">
import { perkTypeValues, type PerkType } from "$lib/data/phalanx-types";
import { perkNameMap } from "$lib/data/static-data";
import LazyImage from "../LazyImage.svelte";
import type { FilterData } from "../PickerModal.svelte";

interface Props {
    filterData: FilterData;
    updateFilter?: (filterData: FilterData) => void;
}

const { filterData, updateFilter }: Props = $props();
</script>

<div class="overflow-x-auto">
    <div class="join w-full">
        {#each perkTypeValues.sort((a, b) => perkNameMap[a as PerkType].localeCompare(perkNameMap[b as PerkType])) as perkType}
            <button class="btn join-item grow hover:btn-secondary" class:btn-primary={filterData.perkType === perkType} onclick={updateFilter ? () => updateFilter({perkType: filterData.perkType === perkType ? null : perkType}) : undefined}>
                <LazyImage class="w-6 h-6 light:invert" src={`/icons/${perkType}.png`} alt={perkNameMap[perkType]} />
            </button>
        {/each}
    </div>
</div>
