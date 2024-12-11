<script lang="ts">
import type { Build } from "$lib/build/Build";
import { powerLevel, resistanceLevel } from "$lib/data/static-data";

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
        resistanceLevel(build.head.level),
        resistanceLevel(build.torso.level),
        resistanceLevel(build.arms.level),
        resistanceLevel(build.legs.level),
    ].reduce((acc, curr) => acc + curr, 0),
);
</script>

<div class="stats stats-vertical sm:stats-horizontal bg-base-200/75 shadow">
    {#if hasWeapon}
        <div class="stat">
            <div class="stat-value">{weaponPower}</div>
            <div class="stat-desc">Power</div>
        </div>
    {/if}

    {#if hasArmour}
        <div class="stat">
            <div class="stat-value">{armourResistance}</div>
            <div class="stat-desc">Resistance</div>
        </div>
    {/if}
</div>
