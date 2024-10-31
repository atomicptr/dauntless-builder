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
                <div class="w-2 h-2 rounded-sm bg-base-100"></div>
                <div class="w-2 h-2 rounded-sm bg-primary"></div>
                <div class="w-2 h-2 rounded-sm bg-primary"></div>
                <div class="w-2 h-2 rounded-sm bg-primary"></div>
                <div class="w-2 h-2 rounded-sm bg-base-100"></div>

                <div class="w-2 h-2 rounded-sm bg-base-100"></div>
                <div class="w-2 h-2 rounded-sm bg-base-100"></div>
                <div class="w-2 h-2 rounded-sm bg-secondary"></div>
                <div class="w-2 h-2 rounded-sm bg-secondary"></div>
                <div class="w-2 h-2 rounded-sm bg-secondary"></div>

                <div class="w-2 h-2 rounded-sm bg-primary"></div>
                <div class="w-2 h-2 rounded-sm bg-base-100"></div>
                <div class="w-2 h-2 rounded-sm bg-primary"></div>
                <div class="w-2 h-2 rounded-sm bg-base-100"></div>
                <div class="w-2 h-2 rounded-sm bg-primary"></div>

                <div class="w-2 h-2 rounded-sm bg-base-100"></div>
                <div class="w-2 h-2 rounded-sm bg-secondary"></div>
                <div class="w-2 h-2 rounded-sm bg-secondary"></div>
                <div class="w-2 h-2 rounded-sm bg-secondary"></div>
                <div class="w-2 h-2 rounded-sm bg-base-100"></div>

                <div class="w-2 h-2 rounded-sm bg-base-100"></div>
                <div class="w-2 h-2 rounded-sm bg-primary"></div>
                <div class="w-2 h-2 rounded-sm bg-primary"></div>
                <div class="w-2 h-2 rounded-sm bg-primary"></div>
                <div class="w-2 h-2 rounded-sm bg-base-100"></div>
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
                Placeholder icon
            </div>
            <div class="grow">
                Select a weapon
            </div>
        </button>
    </div>
{/if}
