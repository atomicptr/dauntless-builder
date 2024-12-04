<script lang="ts">
import { page } from "$app/stores";
import { type Armour, type Perk } from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";
import type { FilterData } from "../PickerModal.svelte";

interface Props {
    filterData: FilterData;
    updateFilter?: (filterData: FilterData) => void;
}

const { filterData, updateFilter }: Props = $props();

const perks = Object.values<Perk>($page.data.perks).filter((perk) =>
    Object.values<Armour>($page.data.armours)
        .filter((armour) => armour.type === filterData.type)
        .some((armour) => armour.stats.some((stats) => perk.id in stats.perks)),
);
</script>

<select class="select select-bordered" onchange={updateFilter ? (ev) => updateFilter({perkType: (ev.target as HTMLSelectElement).value}) : undefined}>
    <option>Select perk</option>

    {#each perks as perk}
        <option value={perk.id} selected={filterData.perkType === perk.id.toString()}>{translatableString(perk.name)}</option>
    {/each}
</select>
