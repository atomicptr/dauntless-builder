<script lang="ts">
import type { Build } from "$lib/build/Build";
import { phalanxData } from "$lib/data/phalanx-data";
import type { Element } from "$lib/data/phalanx-types";
import { elementResistanceLevel, oppositeElement, powerLevel, resistanceLevel } from "$lib/data/static-data";
import { t } from "$lib/i18n.svelte";
import LazyImage from "./LazyImage.svelte";

interface PerkListProps {
    build: Build;
}

const { build }: PerkListProps = $props();

const hasWeapon = $derived(build.weapon1.id !== 0 || build.weapon2.id !== 0);

const weaponMaxLvl = $derived(Math.max(build.weapon1.level, build.weapon2.level));
const weaponPower = $derived(powerLevel(weaponMaxLvl));

const hasArmour = $derived(build.head.id !== 0 || build.torso.id !== 0 || build.arms.id !== 0 || build.legs.id !== 0);

const armourResistance = $derived(
    [
        build.head.id !== 0 ? resistanceLevel(build.head.level) : 0,
        build.torso.id !== 0 ? resistanceLevel(build.torso.level) : 0,
        build.torso.id !== 0 ? resistanceLevel(build.arms.level) : 0,
        build.torso.id !== 0 ? resistanceLevel(build.legs.level) : 0,
    ].reduce((acc, curr) => acc + curr, 0),
);

type ElementalResistanceMap = {
    [element in Element]: number;
};

const elementalResistances = $derived(
    [
        build.head.id in phalanxData.armours
            ? [phalanxData.armours[build.head.id].element, elementResistanceLevel(build.head.level)]
            : null,
        build.torso.id in phalanxData.armours
            ? [phalanxData.armours[build.torso.id].element, elementResistanceLevel(build.torso.level)]
            : null,
        build.arms.id in phalanxData.armours
            ? [phalanxData.armours[build.arms.id].element, elementResistanceLevel(build.arms.level)]
            : null,
        build.legs.id in phalanxData.armours
            ? [phalanxData.armours[build.legs.id].element, elementResistanceLevel(build.legs.level)]
            : null,
    ]
        .filter((elem) => elem !== null)
        .reduce((acc, item) => {
            const [element, value] = item as [Element, number];

            if (!(element in acc)) {
                acc[element] = 0;
            }

            acc[element] += value;

            const opposite = oppositeElement(element);

            if (!(opposite in acc)) {
                acc[opposite] = 0;
            }

            acc[opposite] -= value;

            return acc;
        }, {} as ElementalResistanceMap),
);

const elementalResSortFunc = ([a, aValue]: [Element, number], [b, bValue]: [Element, number]): -1 | 0 | 1 => {
    const compare = aValue > bValue ? -1 : aValue < bValue ? 1 : 0;

    if (compare === 0) {
        return $t(`element-${a}`).localeCompare($t(`element-${b}`)) as -1 | 0 | 1;
    }

    return compare;
};
</script>

<div class="stats stats-vertical sm:stats-horizontal bg-base-200/50 shadow !overflow-hidden">
    {#if hasWeapon}
        <div class="stat">
            <div class="stat-value">{weaponPower}</div>
            <div class="stat-desc">{$t("term-power")}</div>
        </div>
    {/if}

    {#if hasArmour}
        <div class="stat">
            <div class="stat-value">{armourResistance}</div>
            <div class="stat-desc">{$t("term-resistance")}</div>
        </div>
    {/if}
</div>

<div class="flex flex-col gap-2 card bg-base-200/50 shadow">
    <div class="card-body">
        <div class="card-title">{$t("term-elemental-res")}</div>
        
        {#each (Object.entries(elementalResistances) as [Element, number][]).sort(elementalResSortFunc) as [element, value]}
            <div class={`flex flex-row gap-2 justify-between element-text-${element}`}>
                <div class="flex flex-row justify-center items-center"><LazyImage class="w-4 h-4" src={`/icons/${element}.png`} alt={`element-${element}`} /></div>
                <div class="grow align-left">{$t(`element-${element}`)}</div>
                <div class="font-bold">{value > 0 ? `+${value}` : value}</div>
            </div>
        {/each}
    </div>
</div>
