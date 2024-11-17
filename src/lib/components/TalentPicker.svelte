<script lang="ts">
import type { TalentGrid } from "$lib/build/talents";

interface TalentPickerProps {
    talents: TalentGrid;
    onClick?: () => void;
}

const { talents, onClick }: TalentPickerProps = $props();
const disabled = $derived(onClick === undefined);
</script>

<button class="card-btn sm:max-w-32 grow" onclick={onClick} aria-label="Talents" {disabled}>
    <div class="grid grid-cols-5 gap-1">
        <div class={"w-2 h-2 rounded-sm " + (talents[0][0] ? "bg-primary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[0][1] ? "bg-primary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[0][2] ? "bg-primary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[0][3] ? "bg-primary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[0][4] ? "bg-primary" : "bg-base-100")}></div>

        <div class={"w-2 h-2 rounded-sm " + (talents[1][0] ? "bg-secondary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[1][1] ? "bg-secondary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[1][2] ? "bg-secondary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[1][3] ? "bg-secondary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[1][4] ? "bg-secondary" : "bg-base-100")}></div>

        <div class={"w-2 h-2 rounded-sm " + (talents[2][0] ? "bg-primary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[2][1] ? "bg-primary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[2][2] ? "bg-primary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[2][3] ? "bg-primary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[2][4] ? "bg-primary" : "bg-base-100")}></div>

        <div class={"w-2 h-2 rounded-sm " + (talents[3][0] ? "bg-secondary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[3][1] ? "bg-secondary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[3][2] ? "bg-secondary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[3][3] ? "bg-secondary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[3][4] ? "bg-secondary" : "bg-base-100")}></div>

        <div class={"w-2 h-2 rounded-sm " + (talents[4][0] ? "bg-primary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[4][1] ? "bg-primary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[4][2] ? "bg-primary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[4][3] ? "bg-primary" : "bg-base-100")}></div>
        <div class={"w-2 h-2 rounded-sm " + (talents[4][4] ? "bg-primary" : "bg-base-100")}></div>
    </div>
</button>
