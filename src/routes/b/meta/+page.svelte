<script lang="ts">
import PageTitle from "$lib/components/PageTitle.svelte";
import { page } from "$app/stores";
import { deserialize, empty } from "$lib/build/Build";
import MiniBuild from "$lib/components/MiniBuild.svelte";
import WeaponTypeFilter from "$lib/components/filters/WeaponTypeFilter.svelte";
import type { FilterData } from "$lib/components/PickerModal.svelte";
import type { Build } from "$lib/data/phalanx-types";
import LanternCoreFilter from "$lib/components/filters/LanternCoreFilter.svelte";
import ExclamationTriangle from "$lib/components/icons/ExclamationTriangle.svelte";
import { translatableString } from "$lib/utils/translatable-string";
import { __ } from "$lib/i18n.svelte";

let filterData = $state<FilterData>({
    weaponType: null,
    lanternCore: null,
});

const builds = $derived(
    ($page.data.buildsData.meta as Build[])
        .filter((build) => {
            if (!filterData.weaponType) {
                return true;
            }

            const b = deserialize(build.buildId).unwrapOr(empty());
            const w1 = b.weapon1.id in $page.data.weapons ? $page.data.weapons[b.weapon1.id] : null;
            const w2 = b.weapon2.id in $page.data.weapons ? $page.data.weapons[b.weapon2.id] : null;
            return w1?.type === filterData.weaponType || w2?.type === filterData.weaponType;
        })
        .filter((build) => {
            if (!filterData.lanternCore) {
                return true;
            }
            const b = deserialize(build.buildId).unwrapOr(empty());
            return b.lanternCore.id === filterData.lanternCore;
        }),
);

const updateFilter = (fd: FilterData) => {
    filterData = { ...filterData, ...fd };
};
</script>

<PageTitle title={__("menu-meta-builds")} />

<div class="flex flex-col gap-2">
    <WeaponTypeFilter {filterData} {updateFilter} />
    <LanternCoreFilter {filterData} {updateFilter} />
</div>

<div class="flex flex-col gap-2 mt-2">
    {#each builds as {id, name, buildId}}
        <MiniBuild title={translatableString(name) === "" ? undefined : translatableString(name)} build={deserialize(buildId).unwrapOr(empty())} link={`/b/meta/${id}`} />
    {/each}

    {#if builds.length === 0}
        <div class="alert alert-warning mt-2">
            <ExclamationTriangle />
            {__("page-builds-no-builds")}
        </div>
    {/if}
</div>
