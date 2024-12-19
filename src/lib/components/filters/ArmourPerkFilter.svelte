<script lang="ts">
import { page } from "$app/stores";
import { phalanxData } from "$lib/data/phalanx-data";
import { type Armour, type Perk } from "$lib/data/phalanx-types";
import { t } from "$lib/i18n.svelte";
import { translatableString } from "$lib/utils/translatable-string";
import type { FilterData } from "../PickerModal.svelte";

interface Props {
    filterData: FilterData;
    updateFilter?: (filterData: FilterData) => void;
}

const { filterData, updateFilter }: Props = $props();

const perks = Object.values<Perk>(phalanxData.perks)
    .filter((perk) =>
        Object.values<Armour>(phalanxData.armours)
            .filter((armour) => armour.type === filterData.type)
            .some((armour) => armour.stats.some((stats) => perk.id in stats.perks)),
    )
    .sort((a, b) => translatableString(a.name).localeCompare(translatableString(b.name)));
</script>

<select class="select select-bordered" onchange={updateFilter ? (ev) => updateFilter({perkType: (ev.target as HTMLSelectElement).value}) : undefined}>
    <option>{$t("page-build-select-perk")}</option>

    {#each perks as perk}
        <option value={perk.id} selected={filterData.perkType === perk.id.toString()}>{translatableString(perk.name)}</option>
    {/each}
</select>
