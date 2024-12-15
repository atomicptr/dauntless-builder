<script lang="ts">
import { page } from "$app/stores";
import { deserialize, empty } from "$lib/build/Build";
import { __ } from "$lib/i18n.svelte";
import { translatableString } from "$lib/utils/translatable-string";

interface Props {
    title?: string;
    buildId: string;
    hidden?: boolean;
}

const { title, buildId, hidden }: Props = $props();

const defaultIconPath = "https://dauntless-builder.com/icon.png";

const build = $derived(deserialize(buildId).unwrapOr(empty()));

const buildTitle = $derived.by(() => {
    if (title) {
        return title;
    }

    const ids = [build.weapon1.id, build.weapon2.id].filter((id) => id !== 0);

    if (ids.length === 1) {
        return __("page-build-one-item-title", { weapon: translatableString($page.data.weapons[ids[0]].name) });
    }

    if (ids.length === 2) {
        return __("page-build-two-items-title", {
            weapon1: translatableString($page.data.weapons[ids[0]].name),
            weapon2: translatableString($page.data.weapons[ids[1]].name),
        });
    }

    return __("page-build-no-items-title");
});

const iconPath = $derived(
    build.weapon1.id !== 0
        ? $page.data.weapons[build.weapon1.id].icon
        : build.weapon2.id !== 0
          ? $page.data.weapons[build.weapon2.id].icon
          : defaultIconPath,
);

const metaDescription = $derived(
    "⚔️ " +
        [
            build.head.id !== 0 ? translatableString($page.data.armours[build.head.id].name) : null,
            build.torso.id !== 0 ? translatableString($page.data.armours[build.torso.id].name) : null,
            build.arms.id !== 0 ? translatableString($page.data.armours[build.arms.id].name) : null,
            build.legs.id !== 0 ? translatableString($page.data.armours[build.legs.id].name) : null,
            build.lanternCore.id !== 0 ? translatableString($page.data.lantern_cores[build.lanternCore.id].name) : null,
        ]
            .filter((p) => !!p)
            .join(", "),
);
</script>

<svelte:head>
    <title>{buildTitle} - Dauntless Builder</title>

    <meta
        content="Dauntless Builder"
        property="og:site_name"
    />

    <meta
        content={buildTitle}
        property="og:title"
    />

    <meta
        content={metaDescription}
        name="description"
    />

    <meta
        content={metaDescription}
        property="og:description"
    />

    <meta
        content={iconPath}
        property="og:image"
    />
</svelte:head>

<h1 class="text-2xl mb-8" class:hidden={hidden}>{buildTitle}</h1>
