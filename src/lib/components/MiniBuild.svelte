<script lang="ts">
import { page } from "$app/stores";
import { empty, serialize, type Build } from "$lib/build/Build";
import { armourStatsForLevel, getCellPerks, mergePerksArray, sortPerkSetByName } from "$lib/data/levels";
import { translatableString } from "$lib/utils/translatable-string";
import LazyImage from "./LazyImage.svelte";

interface Props {
    title?: string;
    build: Build;
    link?: string;
}

const { title, build, link }: Props = $props();

const buildId = $derived(serialize(build));

// same as in PerkList
const perkSet = $derived(
    sortPerkSetByName(
        $page.data.perks,
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
    ),
);

const imgClasses = "w-12 h-12";
</script>

<a class="flex flex-col card-btn w-full" href={link ?? `/b/${buildId.unwrapOr(empty())}`}>
    <div class="py-2">
        {#if title}
            {title}
        {:else if build.weapon1.id !== 0 || build.weapon2.id !== 0}
            {translatableString($page.data.weapons[build.weapon1.id].name)}
            {#if build.weapon1.id !== 0 && build.weapon2.id !== 0}
                &nbsp;/&nbsp;
            {/if}
            {translatableString($page.data.weapons[build.weapon2.id].name)}
        {/if}
    </div>
    <div class="flex flex-row flex-wrap gap-2 justify-center sm:justify-start max-w-64 sm:max-w-full mb-2">
        {#if build.weapon1.id !== 0}
            <LazyImage class={imgClasses} src={$page.data.weapons[build.weapon1.id]?.icon ?? `/icons/${$page.data.weapons[build.weapon1.id].type}.png`} alt={translatableString($page.data.weapons[build.weapon1.id].name)} />
        {/if}
        {#if build.weapon2.id !== 0}
            <LazyImage class={imgClasses} src={$page.data.weapons[build.weapon2.id]?.icon ?? `/icons/${$page.data.weapons[build.weapon2.id].type}.png`} alt={translatableString($page.data.weapons[build.weapon2.id].name)} />
        {/if}
        {#if build.head.id !== 0}
            <LazyImage class={imgClasses} src={$page.data.armours[build.head.id]?.icon ?? `/icons/${$page.data.armours[build.head.id].type}.png`} alt={translatableString($page.data.armours[build.head.id].name)} />
        {/if}
        {#if build.torso.id !== 0}
            <LazyImage class={imgClasses} src={$page.data.armours[build.torso.id]?.icon ?? `/icons/${$page.data.armours[build.torso.id].type}.png`} alt={translatableString($page.data.armours[build.torso.id].name)} />
        {/if}
        {#if build.arms.id !== 0}
            <LazyImage class={imgClasses} src={$page.data.armours[build.arms.id]?.icon ?? `/icons/${$page.data.armours[build.arms.id].type}.png`} alt={translatableString($page.data.armours[build.arms.id].name)} />
        {/if}
        {#if build.legs.id !== 0}
            <LazyImage class={imgClasses} src={$page.data.armours[build.legs.id]?.icon ?? `/icons/${$page.data.armours[build.legs.id].type}.png`} alt={translatableString($page.data.armours[build.legs.id].name)} />
        {/if}
        {#if build.lanternCore.id !== 0}
            <LazyImage class={imgClasses} src={$page.data.lantern_cores[build.lanternCore.id].icon ?? `/icons/${$page.data.lantern_cores[build.lanternCore.id].type}.png`} alt={translatableString($page.data.lantern_cores[build.lanternCore.id].name)} />
        {/if}
    </div>
    <div class="flex flex-row flex-wrap gap-2 justify-center">
        {#each Object.entries(perkSet) as [perkId, amount]}
            <div class="badge" class:badge-primary={amount == $page.data.perks[perkId].threshold} class:badge-error={amount > $page.data.perks[perkId].threshold}>
                {translatableString($page.data.perks[perkId].name)}
                {amount}/{$page.data.perks[perkId].threshold}
            </div>
        {/each}
    </div>
</a>
