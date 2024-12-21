<script lang="ts">
import { empty, serialize, type Build } from "$lib/build/Build";
import { armourStatsForLevel, getCellPerks, mergePerksArray, sortPerkSetByName } from "$lib/data/levels";
import { phalanxData } from "$lib/data/phalanx-data";
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
        phalanxData.perks,
        mergePerksArray([
            phalanxData.armours[build.head.id]
                ? (armourStatsForLevel(phalanxData.armours[build.head.id], build.head.level) ?? {})
                : {},
            getCellPerks(build.head.cells),
            phalanxData.armours[build.torso.id]
                ? (armourStatsForLevel(phalanxData.armours[build.torso.id], build.torso.level) ?? {})
                : {},
            getCellPerks(build.torso.cells),
            phalanxData.armours[build.arms.id]
                ? (armourStatsForLevel(phalanxData.armours[build.arms.id], build.arms.level) ?? {})
                : {},
            getCellPerks(build.arms.cells),
            phalanxData.armours[build.legs.id]
                ? (armourStatsForLevel(phalanxData.armours[build.legs.id], build.legs.level) ?? {})
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
            {translatableString(phalanxData.weapons[build.weapon1.id].name)}
            {#if build.weapon1.id !== 0 && build.weapon2.id !== 0}
                &nbsp;/&nbsp;
            {/if}
            {translatableString(phalanxData.weapons[build.weapon2.id].name)}
        {/if}
    </div>
    <div class="flex flex-row flex-wrap gap-2 justify-center sm:justify-start max-w-64 sm:max-w-full mb-2">
        {#if build.weapon1.id !== 0}
            <LazyImage class={imgClasses} src={phalanxData.weapons[build.weapon1.id]?.icon ?? `/icons/${phalanxData.weapons[build.weapon1.id].type}.png`} alt={translatableString(phalanxData.weapons[build.weapon1.id].name)} />
        {/if}
        {#if build.weapon2.id !== 0}
            <LazyImage class={imgClasses} src={phalanxData.weapons[build.weapon2.id]?.icon ?? `/icons/${phalanxData.weapons[build.weapon2.id].type}.png`} alt={translatableString(phalanxData.weapons[build.weapon2.id].name)} />
        {/if}
        {#if build.head.id !== 0}
            <LazyImage class={imgClasses} src={phalanxData.armours[build.head.id]?.icon ?? `/icons/${phalanxData.armours[build.head.id].type}.png`} alt={translatableString(phalanxData.armours[build.head.id].name)} />
        {/if}
        {#if build.torso.id !== 0}
            <LazyImage class={imgClasses} src={phalanxData.armours[build.torso.id]?.icon ?? `/icons/${phalanxData.armours[build.torso.id].type}.png`} alt={translatableString(phalanxData.armours[build.torso.id].name)} />
        {/if}
        {#if build.arms.id !== 0}
            <LazyImage class={imgClasses} src={phalanxData.armours[build.arms.id]?.icon ?? `/icons/${phalanxData.armours[build.arms.id].type}.png`} alt={translatableString(phalanxData.armours[build.arms.id].name)} />
        {/if}
        {#if build.legs.id !== 0}
            <LazyImage class={imgClasses} src={phalanxData.armours[build.legs.id]?.icon ?? `/icons/${phalanxData.armours[build.legs.id].type}.png`} alt={translatableString(phalanxData.armours[build.legs.id].name)} />
        {/if}
        {#if build.lanternCore.id !== 0}
            <LazyImage class={imgClasses} src={phalanxData.lantern_cores[build.lanternCore.id].icon ?? `/icons/lantern.png`} alt={translatableString(phalanxData.lantern_cores[build.lanternCore.id].name)} />
        {/if}
    </div>
    <div class="flex flex-row flex-wrap gap-2 justify-center">
        {#each Object.entries(perkSet) as [perkId, amount]}
            <div 
                class="badge" 
                class:badge-primary={amount >= phalanxData.perks[perkId].threshold}
            >
                {translatableString(phalanxData.perks[perkId].name)}
                {amount}/{phalanxData.perks[perkId].threshold}
            </div>
        {/each}
    </div>
</a>
