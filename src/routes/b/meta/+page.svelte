<script lang="ts">
import PageTitle from "$lib/components/PageTitle.svelte";
import { page } from "$app/stores";
import { deserialize, empty } from "$lib/build/Build";
import MiniBuild from "$lib/components/MiniBuild.svelte";
import WeaponTypeFilter from "$lib/components/filters/WeaponTypeFilter.svelte";
import type { FilterData } from "$lib/components/PickerModal.svelte";
import type { Build } from "$lib/data/phalanx-types";

let filterData = $state<FilterData>({
    weaponType: null,
});

const builds = $derived(
    ($page.data.buildsData.meta as Build[]).filter((build) => {
        if (filterData.weaponType === null) {
            return true;
        }

        const b = deserialize(build.buildId).unwrapOr(empty());
        const w1 = b.weapon1.id in $page.data.weapons ? $page.data.weapons[b.weapon1.id] : null;
        const w2 = b.weapon2.id in $page.data.weapons ? $page.data.weapons[b.weapon2.id] : null;
        return w1?.type === filterData.weaponType || w2?.type === filterData.weaponType;
    }),
);
</script>

<PageTitle title="Meta Builds" />

<WeaponTypeFilter {filterData} updateFilter={fd => filterData = fd} />

<div class="flex flex-col gap-2 mt-4">
    {#each builds as {id, name, buildId}}
        <MiniBuild title={name ?? undefined} build={deserialize(buildId).unwrapOr(empty())} link={`/b/meta/${id}`} />
    {/each}
</div>
