<script lang="ts">
import { deserialize, empty } from "$lib/build/Build";
import { phalanxArmours } from "$lib/data/phalanx-armours";
import { phalanxLanternCores } from "$lib/data/phalanx-lantern-cores";
import { phalanxWeapons } from "$lib/data/phalanx-weapons";
import { t } from "$lib/i18n.svelte";
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
        return $t("page-build-one-item-title", { weapon: translatableString(phalanxWeapons[ids[0]].name) });
    }

    if (ids.length === 2) {
        return $t("page-build-two-items-title", {
            weapon1: translatableString(phalanxWeapons[ids[0]].name),
            weapon2: translatableString(phalanxWeapons[ids[1]].name),
        });
    }

    return $t("page-build-no-items-title");
});

const iconPath = $derived(
    build.weapon1.id !== 0
        ? phalanxWeapons[build.weapon1.id].icon
        : build.weapon2.id !== 0
          ? phalanxWeapons[build.weapon2.id].icon
          : defaultIconPath,
);

const metaDescription = $derived(
    "⚔️ " +
        [
            build.head.id !== 0 ? translatableString(phalanxArmours[build.head.id].name) : null,
            build.torso.id !== 0 ? translatableString(phalanxArmours[build.torso.id].name) : null,
            build.arms.id !== 0 ? translatableString(phalanxArmours[build.arms.id].name) : null,
            build.legs.id !== 0 ? translatableString(phalanxArmours[build.legs.id].name) : null,
            build.lanternCore.id !== 0 ? translatableString(phalanxLanternCores[build.lanternCore.id].name) : null,
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
