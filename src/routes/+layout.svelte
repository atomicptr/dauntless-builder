<script lang="ts">
import "../app.css";
import AppIcon from "$lib/components/AppIcon.svelte";
import DrawerMenu from "$lib/components/DrawerMenu.svelte";
import Navbar from "$lib/components/Navbar.svelte";
import Container from "$lib/components/Container.svelte";
import { drawerOpen, language, showLanguageWarning, theme } from "$lib/state.svelte";
import { afterNavigate } from "$app/navigation";
import { onMount } from "svelte";
import { browser } from "$app/environment";
import ExclamationTriangle from "$lib/components/icons/ExclamationTriangle.svelte";
import { t } from "$lib/i18n.svelte";
import { crowdinLink } from "$lib/constants";
import { phalanxData } from "$lib/data/phalanx-data";
import { phalanxI18nData } from "$lib/data/phalanx-i18n";

const { children } = $props();

const hasSufficientLanguageProgress = $derived(
    "__stats" in phalanxI18nData
        ? $language in phalanxI18nData.__stats
            ? phalanxI18nData.__stats[$language].progress >= 95
            : false
        : false,
);

afterNavigate(() => {
    if (!$drawerOpen) {
        return;
    }
    drawerOpen.set(false);
});

onMount(() => {
    if (!browser) return;
    document.documentElement.dataset["theme"] = $theme;
});

theme.subscribe((theme) => {
    if (!browser) return;
    document.documentElement.dataset["theme"] = theme;
});

// tailwind classes to keep in memory: underline
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
                    <noscript>
                        <div class="alert alert-error mb-4">
                            <ExclamationTriangle />
                            It looks like you have disabled JavaScript in your browser, this website requires JavaScript to run properly.
                        </div>
                    </noscript>

                    {#if $showLanguageWarning && $language !== "en" && !hasSufficientLanguageProgress}
                        <div class="alert alert-warning mb-4">
                            <ExclamationTriangle />
                            <div>
                                {@html $t("alert-translation-warning", {crowdinLink, language: $t(`page-settings-language-${$language}`)})}
                            </div>
                            <div>
                                <button class="btn btn-sm" onclick={() => showLanguageWarning.set(false)}>
                                    {$t("term-close")}
                                </button>
                            </div>
                        </div>
                    {/if}
                    
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

            <button class="drawer-overlay" onclick={() => drawerOpen.set(false)} aria-label="close drawer"></button>

            <DrawerMenu
                patch={phalanxData.patch}
            />
        </div>
    </div>
</main>
