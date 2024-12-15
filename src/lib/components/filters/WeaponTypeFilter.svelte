<script lang="ts">
import { weaponTypeValues } from "$lib/data/phalanx-types";
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
        {#each weaponTypeValues as weaponType}
            <button class="btn join-item grow" class:btn-primary={filterData.weaponType === weaponType} onclick={updateFilter ? () => updateFilter({weaponType: filterData.weaponType === weaponType ? null : weaponType}) : undefined}>
                <LazyImage class="w-6 h-6" src={`/icons/${weaponType}.png`} alt={$t(`weapon-type-${weaponType.replace("_", "-")}`)} />
            </button>
        {/each}
    </div>
</div>
