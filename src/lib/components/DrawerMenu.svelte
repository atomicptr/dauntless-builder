<script lang="ts">
import HomeIcon from "$lib/components/icons/HomeIcon.svelte";
import NewIcon from "$lib/components/icons/NewIcon.svelte";
import MyBuildsIcon from "$lib/components/icons/MyBuildsIcon.svelte";
import BuildFinderIcon from "$lib/components/icons/BuildFinderIcon.svelte";
import MetaBuildsIcon from "$lib/components/icons/MetaBuildsIcon.svelte";
import ProgressionBuildsIcon from "$lib/components/icons/ProgressionBuildsIcon.svelte";
import TrialBuildsIcon from "$lib/components/icons/TrialBuildsIcon.svelte";
import AboutIcon from "$lib/components/icons/AboutIcon.svelte";
import PrivacyIcon from "$lib/components/icons/PrivacyIcon.svelte";
import SettingsIcon from "$lib/components/icons/SettingsIcon.svelte";
import GithubIcon from "$lib/components/icons/GithubIcon.svelte";
import DiscordIcon from "$lib/components/icons/DiscordIcon.svelte";
import XIcon from "$lib/components/icons/XIcon.svelte";
import SupportUsIcon from "$lib/components/icons/SupportUsIcon.svelte";
import { discordLink, githubLink, supportUsLink, xcomLink } from "$lib/constants";
import PatchIcon from "./icons/PatchIcon.svelte";
import type { BuildsData, Patch } from "$lib/data/phalanx-types";
import { __ } from "$lib/i18n.svelte";

const { patch, buildsData }: { patch: Patch; buildsData: BuildsData } = $props();

const version = patch?.version;
</script>

<ul class="menu w-80 p-4 bg-base-100 sticky top-0 z-20 bg-opacity-90 backdrop-blur min-h-screen lg:min-h-max">
    <div class="w-full block lg:hidden" style="height: 68px !important;"></div>

    <li>
        <a href="/">
            <HomeIcon />
            { __("menu-home") }
        </a>
    </li>

    <li>
        <a href="/b/new">
            <NewIcon />
            { __("menu-new-build") }
        </a>
    </li>
    <li>
        <a href="/b/favorites" class="disabled">
            <MyBuildsIcon />
            { __("menu-my-builds") }
            <span class="badge badge-ghost">soon&trade;</span>
        </a>
    </li>
    <li>
        <a href="/b/finder">
            <BuildFinderIcon />
            { __("menu-build-finder") }
        </a>
    </li>

    <li></li>

    <li>
        <a href="/b/meta" class:disabled={Object.keys(buildsData?.meta ?? {}).length === 0}>
            <MetaBuildsIcon />
            { __("menu-meta-builds") }
        </a>
    </li>
    <li>
        <a href="/b/progression" class="disabled">
            <ProgressionBuildsIcon />
            { __("menu-progression-builds") }
            <span class="badge badge-ghost">soon&trade;</span>
        </a>
    </li>
    <li>
        <a href="/b/trials" class="disabled">
            <TrialBuildsIcon />
            { __("menu-trial-builds") }
            <span class="badge badge-ghost">soon&trade;</span>
        </a>
    </li>

    <li></li>

    <li>
        <a href="/settings">
            <SettingsIcon />
            { __("menu-settings") }
        </a>
    </li>
    <li>
        <a href="/about" class="disabled">
            <AboutIcon />
            { __("menu-about") }
            <span class="badge badge-ghost">soon&trade;</span>
        </a>
    </li>
    <li>
        <a href="/privacy" class="disabled">
            <PrivacyIcon />
            { __("menu-privacy") }
            <span class="badge badge-ghost">soon&trade;</span>
        </a>
    </li>

    <li></li>

    <li>
        <a href={supportUsLink} target="_blank">
            <SupportUsIcon />
            { __("menu-support-us") }
        </a>
    </li>
    <li>
        <a href={discordLink} target="_blank">
            <DiscordIcon />
            { __("menu-discord") }
        </a>
    </li>
    <li>
        <a href={githubLink} target="_blank">
            <GithubIcon />
            { __("menu-github") }
        </a>
    </li>
    <li>
        <a href={xcomLink} target="_blank">
            <XIcon />
            { __("menu-follow-on-x") }
        </a>
    </li>

    <li></li>

    {#if version}
        <li>
            <a href="https://playdauntless.com/patch-notes/{version.major}-{version.minor}-{version.patch}/" target="_blank">
                <PatchIcon />
                { __("menu-dauntless") } v{version.major}.{version.minor}.{version.patch}
            </a>
        </li>
    {/if}
</ul>
