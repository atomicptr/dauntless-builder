<script lang="ts">
import { pwInitialized } from "$lib/state.svelte";
import { envBool } from "$lib/utils/env-helper";
import AdInternals, { type UnitType } from "./AdInternals.svelte";

interface Props {
    name: string;
    type: UnitType;
    wrapperClasses?: string;
}

const { name, type, wrapperClasses }: Props = $props();

const adsEnabled = envBool("DB_ENABLE_ADS");
</script>

{#if adsEnabled && $pwInitialized}
    <div class={"ads " + (wrapperClasses ?? "")}>
        <AdInternals {name} {type} />
    </div>
{/if}
