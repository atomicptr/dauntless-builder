<script lang="ts">
import { page } from "$app/stores";
import type { BuildWeapon } from "$lib/build/Build";
import { elementResistanceLevel, oppositeElement, powerLevel } from "$lib/data/static-data";
import { translatableString } from "$lib/utils/translatable-string";

interface WeaponPickerProps {
    selected: BuildWeapon;
    onWeaponClick: () => void;
    onTalentClick: () => void;
}

const { selected, onWeaponClick, onTalentClick }: WeaponPickerProps = $props();
const weapon = $derived(selected.id !== 0 ? $page.data.weapons[selected.id] : null);
const icon = $derived(weapon.icon ?? "/icon.png");
</script>

{#if weapon}
    <div class="flex flex-col sm:flex-row gap-2 min-h-20">
        <button class="card-btn grow element-border element-border-{weapon.element}" onclick={onWeaponClick}>
            <div class="w-16 ml-2">
                <img src="{icon}" alt="{translatableString(weapon.name)}" />
            </div>
            <div class="grow">
                {translatableString(weapon.name)}
                {#if selected.level > 1}
                    +{selected.level}
                {/if}
            </div>
            <div class="mr-4 flex flex-col align-center">
                <div class="text-xl">
                    {powerLevel(selected.level)}
                </div>
                <div class="element-text-{oppositeElement(weapon.element)}">
                    +{elementResistanceLevel(selected.level)}
                </div>
                <div class="element-text-{weapon.element}">
                    -{elementResistanceLevel(selected.level)}
                </div>
            </div>
        </button>
        <button class="card-btn sm:max-w-32 grow" onclick={onTalentClick} aria-label="Talents">
            <div class="grid grid-cols-5 gap-1">
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[0][0] ? "bg-primary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[0][1] ? "bg-primary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[0][2] ? "bg-primary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[0][3] ? "bg-primary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[0][4] ? "bg-primary" : "bg-base-100")}></div>

                <div class={"w-2 h-2 rounded-sm " + (selected.talents[1][0] ? "bg-secondary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[1][1] ? "bg-secondary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[1][2] ? "bg-secondary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[1][3] ? "bg-secondary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[1][4] ? "bg-secondary" : "bg-base-100")}></div>

                <div class={"w-2 h-2 rounded-sm " + (selected.talents[2][0] ? "bg-primary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[2][1] ? "bg-primary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[2][2] ? "bg-primary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[2][3] ? "bg-primary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[2][4] ? "bg-primary" : "bg-base-100")}></div>

                <div class={"w-2 h-2 rounded-sm " + (selected.talents[3][0] ? "bg-secondary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[3][1] ? "bg-secondary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[3][2] ? "bg-secondary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[3][3] ? "bg-secondary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[3][4] ? "bg-secondary" : "bg-base-100")}></div>

                <div class={"w-2 h-2 rounded-sm " + (selected.talents[4][0] ? "bg-primary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[4][1] ? "bg-primary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[4][2] ? "bg-primary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[4][3] ? "bg-primary" : "bg-base-100")}></div>
                <div class={"w-2 h-2 rounded-sm " + (selected.talents[4][4] ? "bg-primary" : "bg-base-100")}></div>
            </div>
        </button>
    </div>

    <div>
        SELECTED TALENTS
    </div>
{:else}
    <div class="flex flex-row gap-2 min-h-20">
        <button class="card-btn grow" onclick={onWeaponClick}>
            <div class="w-16 ml-2">
                <img src="/icons/weapons.png" alt="Weapon" />
            </div>
            <div class="grow">
                Select a weapon
            </div>
        </button>
    </div>
{/if}
