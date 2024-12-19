<script lang="ts">
import { page } from "$app/stores";
import { phalanxData } from "$lib/data/phalanx-data";
import { type LanternCore } from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";
import LazyImage from "../LazyImage.svelte";
import type { FilterData } from "../PickerModal.svelte";

interface Props {
    filterData: FilterData;
    updateFilter?: (filterData: FilterData) => void;
}

const { filterData, updateFilter }: Props = $props();
const lanternCores = Object.values<LanternCore>(phalanxData.lantern_cores).sort((a, b) =>
    translatableString(a.name).localeCompare(translatableString(b.name)),
);
</script>

<div class="overflow-x-auto">
    <div class="join w-full">
        {#each lanternCores as lanternCore}
            <button class="btn join-item grow" class:btn-primary={filterData.lanternCore === lanternCore.id} onclick={updateFilter ? () => updateFilter({lanternCore: filterData.lanternCore === lanternCore.id ? null : lanternCore.id}) : undefined}>
                <LazyImage class="w-6 h-6" src={lanternCore.icon ?? "/icons/lantern.png"} alt={translatableString(lanternCore.name)} />
            </button>
        {/each}
    </div>
</div>
