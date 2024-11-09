<script lang="ts">
import HamburgerIcon from "$lib/components/icons/HamburgerIcon.svelte";
import AppIcon from "$lib/components/AppIcon.svelte";
import CloseIcon from "./icons/CloseIcon.svelte";
import { drawerOpen } from "$lib/state.svelte";
</script>

<div class="navbar w-full sticky top-0 z-20 bg-base-100 bg-opacity-90 backdrop-blur">
    <div class="flex-none lg:hidden">
        <button class="btn btn-square btn-ghost" onclick={() => drawerOpen.update(val => !val)}>
            {#if $drawerOpen}
                <CloseIcon />
            {:else}
                <HamburgerIcon />
            {/if}
        </button>
    </div>

    <div class="mx-2 flex-1 px-2 lg:hidden">
        <AppIcon />
    </div>

    <div class="mx-2 flex-1 hidden lg:block"></div>
</div>
