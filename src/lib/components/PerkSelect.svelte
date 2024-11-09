<script lang="ts">
import { page } from "$app/stores";
import type { Perk } from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";
import ValuesText from "./ValuesText.svelte";

interface Props {
    perks: number[];
    disabledPerks?: number[];
    onSelect?: (perkId: number) => void;
}

const { perks, disabledPerks, onSelect }: Props = $props();
const perkGroups = Object.groupBy(Object.values($page.data.perks) as Perk[], (perk) => perk.type);
</script>

<div class="flex flex-col sm:flex-row gap-2 w-full">
    {#each Object.keys(perkGroups) as perkGroupName}
        <div class="flex flex-col gap-2 grow basis-0">
            <div class="flex flex-col items-center gap-2">
                <img class="w-8 h-8" src={`/icons/${perkGroupName}.png`} alt={perkGroupName} />
                <div>{perkGroupName[0].toUpperCase() + perkGroupName.slice(1)}</div>
            </div>

            <div class="flex flex-col gap-1">
                {#each perkGroups[perkGroupName as keyof typeof perkGroups] as Perk[] as perk}
                    <button class="card-btn disabled:hidden sm:disabled:flex flex-col" class:btn-primary={perks.indexOf(perk.id) > -1} onclick={onSelect ? () => onSelect(perk.id) : undefined} disabled={(disabledPerks ?? []).indexOf(perk.id) > -1}>
                        {translatableString(perk.name)}

                        <div class="text-xs text-base-content/75 mt-2 block sm:hidden">
                            <ValuesText text={perk.effect} values={perk.values} />
                        </div>
                    </button>
                {/each}
            </div>
        </div>
    {/each}
</div>
