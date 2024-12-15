<script lang="ts">
import PageTitle from "$lib/components/PageTitle.svelte";
import { crowdinLink, discordLink, githubLink } from "$lib/constants";
import { t } from "$lib/i18n.svelte";

// this is to keep this in the project for tailwind
// link-primary
</script>

<PageTitle title={ $t("menu-home") } remove />

<h1 class="text-2xl mb-8 font-bold">{ $t("page-home-welcome") }</h1>

<p>{ $t("page-home-description") }</p>

<h2 class="text-xl my-4 font-bold">{ $t("page-home-support-title") }</h2>

<p>{@html $t("page-home-support", {discordLink})}</p>

<h2 class="text-xl my-4 font-bold">{ $t("page-home-contributing") }</h2>

<p>{@html $t("page-home-contribute", {githubLink, crowdinLink})}</p>
