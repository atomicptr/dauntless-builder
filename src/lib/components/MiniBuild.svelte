<script lang="ts">
import { empty, serialize, type Build } from "$lib/build/Build";
import { armourStatsForLevel, getCellPerks, mergePerksArray, sortPerkSetByName } from "$lib/data/levels";
import { phalanxArmours } from "$lib/data/phalanx-armours";
import { phalanxLanternCores } from "$lib/data/phalanx-lantern-cores";
import { phalanxPerks } from "$lib/data/phalanx-perks";
import { phalanxWeapons } from "$lib/data/phalanx-weapons";
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
        phalanxPerks,
        mergePerksArray([
            phalanxArmours[build.head.id]
                ? (armourStatsForLevel(phalanxArmours[build.head.id], build.head.level) ?? {})
                : {},
            getCellPerks(build.head.cells),
            phalanxArmours[build.torso.id]
                ? (armourStatsForLevel(phalanxArmours[build.torso.id], build.torso.level) ?? {})
                : {},
            getCellPerks(build.torso.cells),
            phalanxArmours[build.arms.id]
                ? (armourStatsForLevel(phalanxArmours[build.arms.id], build.arms.level) ?? {})
                : {},
            getCellPerks(build.arms.cells),
            phalanxArmours[build.legs.id]
                ? (armourStatsForLevel(phalanxArmours[build.legs.id], build.legs.level) ?? {})
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
            {translatableString(phalanxWeapons[build.weapon1.id].name)}
            {#if build.weapon1.id !== 0 && build.weapon2.id !== 0}
                &nbsp;/&nbsp;
            {/if}
            {translatableString(phalanxWeapons[build.weapon2.id].name)}
        {/if}
    </div>
    <div class="flex flex-row flex-wrap gap-2 justify-center sm:justify-start max-w-64 sm:max-w-full mb-2">
        {#if build.weapon1.id !== 0}
            <LazyImage class={imgClasses} src={phalanxWeapons[build.weapon1.id]?.icon ?? `/icons/${phalanxWeapons[build.weapon1.id].type}.png`} alt={translatableString(phalanxWeapons[build.weapon1.id].name)} />
        {/if}
        {#if build.weapon2.id !== 0}
            <LazyImage class={imgClasses} src={phalanxWeapons[build.weapon2.id]?.icon ?? `/icons/${phalanxWeapons[build.weapon2.id].type}.png`} alt={translatableString(phalanxWeapons[build.weapon2.id].name)} />
        {/if}
        {#if build.head.id !== 0}
            <LazyImage class={imgClasses} src={phalanxArmours[build.head.id]?.icon ?? `/icons/${phalanxArmours[build.head.id].type}.png`} alt={translatableString(phalanxArmours[build.head.id].name)} />
        {/if}
        {#if build.torso.id !== 0}
            <LazyImage class={imgClasses} src={phalanxArmours[build.torso.id]?.icon ?? `/icons/${phalanxArmours[build.torso.id].type}.png`} alt={translatableString(phalanxArmours[build.torso.id].name)} />
        {/if}
        {#if build.arms.id !== 0}
            <LazyImage class={imgClasses} src={phalanxArmours[build.arms.id]?.icon ?? `/icons/${phalanxArmours[build.arms.id].type}.png`} alt={translatableString(phalanxArmours[build.arms.id].name)} />
        {/if}
        {#if build.legs.id !== 0}
            <LazyImage class={imgClasses} src={phalanxArmours[build.legs.id]?.icon ?? `/icons/${phalanxArmours[build.legs.id].type}.png`} alt={translatableString(phalanxArmours[build.legs.id].name)} />
        {/if}
        {#if build.lanternCore.id !== 0}
            <LazyImage class={imgClasses} src={phalanxLanternCores[build.lanternCore.id].icon ?? `/icons/lantern.png`} alt={translatableString(phalanxLanternCores[build.lanternCore.id].name)} />
        {/if}
    </div>
    <div class="flex flex-row flex-wrap gap-2 justify-center">
        {#each Object.entries(perkSet) as [perkId, amount]}
            <div 
                class="badge" 
                class:badge-primary={amount >= phalanxPerks[perkId].threshold}
            >
                {translatableString(phalanxPerks[perkId].name)}
                {amount}/{phalanxPerks[perkId].threshold}
            </div>
        {/each}
    </div>
</a>
