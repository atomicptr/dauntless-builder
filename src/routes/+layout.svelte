<script lang="ts">
import "../app.css";
import AppIcon from "$lib/components/AppIcon.svelte";
import DrawerMenu from "$lib/components/DrawerMenu.svelte";
import Navbar from "$lib/components/Navbar.svelte";
import Container from "$lib/components/Container.svelte";
import { page } from "$app/stores";
import { drawerOpen, theme } from "$lib/state.svelte";
import { afterNavigate } from "$app/navigation";

const { children } = $props();

afterNavigate(() => {
    if (!$drawerOpen) {
        return;
    }
    drawerOpen.set(false);
});
</script>

<svelte:head>
    <title>Dauntless Builder</title>
</svelte:head>

<main data-theme={$theme}>
    <div class="drawer lg:drawer-open">
        <input id="drawer" type="checkbox" class="drawer-toggle" checked={$drawerOpen} />
        
        <div class="drawer-content flex flex-col">
            <Navbar />

            <div class="p-2 mb-8">
                <Container>
                    {@render children()}
                </Container>
            </div>
        </div>

        <div class="drawer-side">
            <div class="navbar sticky top-0 z-30 bg-opacity-90 backdrop-blur" style="height: 68px !important;">
                <div class="mx-2 flex-1 px-2 hidden lg:block">
                    <AppIcon />
                </div>
            </div>

            <label for="drawer" class="drawer-overlay"></label>

            <DrawerMenu
                patch={$page.data.patch}
                buildsData={$page.data.buildsData}
            />
        </div>
    </div>
</main>
