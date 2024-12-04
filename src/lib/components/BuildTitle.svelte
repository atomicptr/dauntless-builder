<script lang="ts">
import { page } from "$app/stores";
import { deserialize, empty } from "$lib/build/Build";
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

    let res = "";

    if (build.weapon1.id !== 0) {
        res += translatableString($page.data.weapons[build.weapon1.id].name);
    }

    if (build.weapon1.id !== 0 && build.weapon2.id !== 0) {
        res += " / ";
    }

    if (build.weapon2.id !== 0) {
        res += translatableString($page.data.weapons[build.weapon2.id].name);
    }

    return res + " Build";
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
