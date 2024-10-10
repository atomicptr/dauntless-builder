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
    import { discordLink, githubLink, patreonLink, xcomLink } from "$lib/constants";
    import PatchIcon from "./icons/PatchIcon.svelte";
</script>

<ul class="menu w-80 p-4 bg-base-100 sticky top-0 z-20 bg-opacity-90 backdrop-blur min-h-screen lg:min-h-max">
    <div class="w-full block lg:hidden" style="height: 68px !important;"></div>

    <li>
        <a href="/">
            <HomeIcon />
            Home
        </a>
    </li>

    <li>
        <a href="/b/new" class="disabled">
            <NewIcon />
            New Build
        </a>
    </li>
    <li>
        <a href="/b/favorites" class="disabled">
            <MyBuildsIcon />
            My Builds
        </a>
    </li>
    <li>
        <a href="/b/finder" class="disabled">
            <BuildFinderIcon />
            Build Finder
        </a>
    </li>

    <li></li>

    <li>
        <a href="/b/meta" class="disabled">
            <MetaBuildsIcon />
            Meta Builds
        </a>
    </li>
    <li>
        <a href="/b/progression" class="disabled">
            <ProgressionBuildsIcon />
            Progression Builds
        </a>
    </li>
    <li>
        <a href="/b/trials" class="disabled">
            <TrialBuildsIcon />
            Trial Builds
        </a>
    </li>

    <li></li>

    <li>
        <a href="/about" class="disabled">
            <AboutIcon />
            About
        </a>
    </li>
    <li>
        <a href="/privacy" class="disabled">
            <PrivacyIcon />
            Privacy
        </a>
    </li>
    <li>
        <a href="/settings" class="disabled">
            <SettingsIcon />
            Settings
        </a>
    </li>

    <li></li>

    <li>
        <a href={patreonLink} target="_blank" class="disabled">
            <SupportUsIcon />
            Support Us
        </a>
    </li>
    <li>
        <a href={discordLink} target="_blank">
            <DiscordIcon />
            Join our Discord
        </a>
    </li>
    <li>
        <a href={githubLink} target="_blank">
            <GithubIcon />
            GitHub
        </a>
    </li>
    <li>
        <a href={xcomLink} target="_blank">
            <XIcon />
            Follow me on X/Twitter
        </a>
    </li>

    <li></li>

    <li>
        <a href="https://playdauntless.com/patch-notes/1-14-6/" target="_blank">
            <PatchIcon />
            Dauntless v1.14.6
        </a>
    </li>
</ul>
