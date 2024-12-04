<script lang="ts">
import PageTitle from "$lib/components/PageTitle.svelte";
import { discordLink, githubLink } from "$lib/constants";
</script>

<PageTitle title="Home" remove />

<h1 class="text-2xl mb-8 font-bold">Welcome to Dauntless Builder,</h1>

<p>a free and open source web application for creating and sharing builds for the popular free to play monster hunting game Dauntless.</p>

<h2 class="text-xl my-4 font-bold">Support</h2>

<p>If you have a problem and/or need help, just jump into our <a class="link-primary" href={discordLink} target="_blank">Discord</a> and ask :).</p>

<h2 class="text-xl my-4 font-bold">Contributing</h2>

<p>If you're interested in contributing code or especially localizations please head over to our <a class="link-primary" href={githubLink} target="_blank">Github</a>!</p>
