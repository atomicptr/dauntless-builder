<script lang="ts">
import { envBool } from "$lib/utils/env-helper";
import { sha3_256 } from "@noble/hashes/sha3";
import { bytesToHex } from "@noble/hashes/utils";
import { onDestroy, onMount } from "svelte";
import PrivacyIcon from "./icons/PrivacyIcon.svelte";
import log from "$lib/utils/logger";

export type UnitType = "bottom_rail" | "sky_atf" | "med_rect_atf" | "right_rail";

interface Props {
    name: string;
    type: UnitType;
}

const unitSize: { [type in UnitType]: { width: number; height: number } } = {
    bottom_rail: { width: 320, height: 50 },
    sky_atf: { width: 160, height: 600 },
    med_rect_atf: { width: 300, height: 250 },
    right_rail: { width: 120, height: 600 },
};

const { name, type }: Props = $props();

const displayPlaceholders = envBool("DB_DISPLAY_AD_PLACEHOLDERS");

const selectorName = $derived.by(() => {
    const base = name + ":" + type;
    const hash = bytesToHex(sha3_256(base));
    return `dbu_${hash}`;
});

const size = $derived(unitSize[type]);

onMount(async () => {
    if (displayPlaceholders) {
        return;
    }

    try {
        await window.ramp.addUnits([
            {
                selectorId: selectorName,
                type,
            },
        ]);
        window.ramp.displayUnits();
        log.debug(`ramp: initialized unit ${name} (${type})`);
    } catch (error) {
        log.error("ramp: could not add  unit", { error });
        window.ramp.displayUnits();
    }
});

onDestroy(() => {
    if (displayPlaceholders) {
        return;
    }

    const elem = document.getElementById(selectorName);

    if (!elem) {
        return;
    }

    window.ramp.destroyUnits(selectorName).then(() => {
        window.ramp.processPage(window.location.pathname);
    });
});
</script>

{#if displayPlaceholders}
    <div
        class="flex justify-center items-center border-dashed border-4 border-primary m-2 bg-base-100"
        style={`min-width: ${size.width}px !important; min-height: ${size.height}px !important;`}
    >
        <div class="text-primary scale-[2.0]">
            <PrivacyIcon />
        </div>
    </div>
{:else}
    <div id={selectorName}></div>
{/if}
