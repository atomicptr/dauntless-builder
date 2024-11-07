<script lang="ts">
import { page } from "$app/stores";
import type { Build } from "$lib/build/Build";
import { armourStatsForLevel, getCellPerks, mergePerksArray } from "$lib/data/levels";
import { translatableString } from "$lib/utils/translatable-string";

interface PerkListProps {
    build: Build;
}

const { build }: PerkListProps = $props();

const perkSet = $derived(
    mergePerksArray([
        $page.data.armours[build.head.id]
            ? (armourStatsForLevel($page.data.armours[build.head.id], build.head.level) ?? {})
            : {},
        getCellPerks(build.head.cells),
        $page.data.armours[build.torso.id]
            ? (armourStatsForLevel($page.data.armours[build.torso.id], build.torso.level) ?? {})
            : {},
        getCellPerks(build.torso.cells),
        $page.data.armours[build.arms.id]
            ? (armourStatsForLevel($page.data.armours[build.arms.id], build.arms.level) ?? {})
            : {},
        getCellPerks(build.arms.cells),
        $page.data.armours[build.legs.id]
            ? (armourStatsForLevel($page.data.armours[build.legs.id], build.legs.level) ?? {})
            : {},
        getCellPerks(build.legs.cells),
    ]),
);
</script>

<div class="text-xl mb-4 pl-4">
    Perks
</div>

<ul class="list-disc pl-8">
    {#each Object.entries(perkSet) as [perkId, amount]}
        <li
            class="ml-4"
            class:text-error={amount > $page.data.perks[perkId].threshold}
            class:text-gray-500={amount < $page.data.perks[perkId].threshold}
        >
            {translatableString($page.data.perks[perkId].name)} x{amount}
        </li>
    {/each}
</ul>
