<script lang="ts">
import "../app.css";
import AppIcon from "$lib/components/AppIcon.svelte";
import DrawerMenu from "$lib/components/DrawerMenu.svelte";
import Navbar from "$lib/components/Navbar.svelte";
import { page } from "$app/stores";
import Container from "$lib/components/Container.svelte";

const { children } = $props();
</script>

<svelte:head>
    <title>Dauntless Builder</title>
</svelte:head>

<main>
    <div class="drawer lg:drawer-open">
        <input id="drawer" type="checkbox" class="drawer-toggle" />

        <div class="drawer-content flex flex-col">
            <Navbar />

            <div class="p-2">
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

            <DrawerMenu patch={$page.data.patch}/>
        </div>
    </div>
</main>
