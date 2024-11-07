<script lang="ts">
import { page } from "$app/stores";
import { empty, serialize, type Build } from "$lib/build/Build";
import { armourStatsForLevel, getCellPerks, mergePerksArray } from "$lib/data/levels";
import { translatableString } from "$lib/utils/translatable-string";

interface Props {
    title?: string;
    build: Build;
}

const { title, build }: Props = $props();

const buildId = $derived(serialize(build));

// same as in PerkList
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

const imgClasses = "w-12 h-12";
</script>

<a class="flex flex-col card-btn w-full" href={`/b/${buildId.unwrapOr(empty())}`}>
    {#if title}
        <div>
            {title}
        </div>
    {:else if build.weapon1.id !== 0 || build.weapon2.id !== 0}
        <div>
            {translatableString($page.data.weapons[build.weapon1.id].name)}
            {#if build.weapon1.id !== 0 && build.weapon2.id !== 0}
                &nbsp;/&nbsp;
            {/if}
            {translatableString($page.data.weapons[build.weapon2.id].name)}
        </div>
    {/if}
    <div class="flex flex-row gap-2">
        {#if build.weapon1.id !== 0}
            <img class={imgClasses} src={$page.data.weapons[build.weapon1.id].icon ?? `/icons/${$page.data.weapons[build.weapon1.id].type}.png`} alt={translatableString($page.data.weapons[build.weapon1.id].name)} />
        {/if}
        {#if build.weapon2.id !== 0}
            <img class={imgClasses} src={$page.data.weapons[build.weapon2.id].icon ?? `/icons/${$page.data.weapons[build.weapon2.id].type}.png`} alt={translatableString($page.data.weapons[build.weapon2.id].name)} />
        {/if}
        {#if build.head.id !== 0}
            <img class={imgClasses} src={$page.data.armours[build.head.id].icon ?? `/icons/${$page.data.armours[build.head.id].type}.png`} alt={translatableString($page.data.armours[build.head.id].name)} />
        {/if}
        {#if build.torso.id !== 0}
            <img class={imgClasses} src={$page.data.armours[build.torso.id].icon ?? `/icons/${$page.data.armours[build.torso.id].type}.png`} alt={translatableString($page.data.armours[build.torso.id].name)} />
        {/if}
        {#if build.arms.id !== 0}
            <img class={imgClasses} src={$page.data.armours[build.arms.id].icon ?? `/icons/${$page.data.armours[build.arms.id].type}.png`} alt={translatableString($page.data.armours[build.arms.id].name)} />
        {/if}
        {#if build.legs.id !== 0}
            <img class={imgClasses} src={$page.data.armours[build.legs.id].icon ?? `/icons/${$page.data.armours[build.legs.id].type}.png`} alt={translatableString($page.data.armours[build.legs.id].name)} />
        {/if}
        {#if build.lanternCore.id !== 0}
            <img class={imgClasses} src={$page.data.lantern_cores[build.lanternCore.id].icon ?? `/icons/${$page.data.lantern_cores[build.lanternCore.id].type}.png`} alt={translatableString($page.data.lantern_cores[build.lanternCore.id].name)} />
        {/if}
    </div>
    <div class="flex flex-row flex-wrap gap-2">
        {#each Object.entries(perkSet) as [perkId, amount]}
            <div class="badge" class:badge-primary={amount == $page.data.perks[perkId].threshold} class:badge-error={amount > $page.data.perks[perkId].threshold}>
                {translatableString($page.data.perks[perkId].name)}

                {#if amount !== $page.data.perks[perkId].threshold}
                    {amount}/{$page.data.perks[perkId].threshold}
                {/if}
            </div>
        {/each}
    </div>
</a>
