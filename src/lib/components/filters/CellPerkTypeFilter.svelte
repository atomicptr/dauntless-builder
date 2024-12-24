<script lang="ts">
import { perkTypeValues } from "$lib/data/phalanx-types";
import { perkIcon } from "$lib/data/static-data";
import { t } from "$lib/i18n.svelte";
import LazyImage from "../LazyImage.svelte";
import type { FilterData } from "../PickerModal.svelte";

interface Props {
    filterData: FilterData;
    updateFilter?: (filterData: FilterData) => void;
}

const { filterData, updateFilter }: Props = $props();
const sort = (a: string, b: string) => $t(`perk-type-${a}`).localeCompare($t(`perk-type-${b}`));
</script>

<div class="overflow-x-auto">
    <div class="join w-full">
        {#each perkTypeValues.sort(sort) as perkType}
            <button class="btn join-item grow hover:btn-secondary" class:btn-primary={filterData.perkType === perkType} onclick={updateFilter ? () => updateFilter({perkType: filterData.perkType === perkType ? null : perkType}) : undefined}>
                <LazyImage class="w-6 h-6 light:invert" src={perkIcon(perkType)} alt={$t(`perk-type-${perkType}`)} />
            </button>
        {/each}
    </div>
</div>
