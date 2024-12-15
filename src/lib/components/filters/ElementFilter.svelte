<script lang="ts">
import { elementValues } from "$lib/data/phalanx-types";
import { t } from "$lib/i18n.svelte";
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
        {#each elementValues as element}
            <button class="btn join-item grow" class:btn-primary={filterData.element === element} onclick={updateFilter ? () => updateFilter({element: filterData.element === element ? null : element}) : undefined}>
                <LazyImage class="w-4 h-4" src={`/icons/${element}.png`} alt={$t(`element-${element}`)} />
            </button>
        {/each}
    </div>
</div>
