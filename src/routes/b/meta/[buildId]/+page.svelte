<script lang="ts">
import { deserialize, empty } from "$lib/build/Build";
import ArmourPicker from "$lib/components/ArmourPicker.svelte";
import BuildStats from "$lib/components/BuildStats.svelte";
import BuildTitle from "$lib/components/BuildTitle.svelte";
import LinkIcon from "$lib/components/icons/LinkIcon.svelte";
import LanternCorePicker from "$lib/components/LanternCorePicker.svelte";
import Loading from "$lib/components/Loading.svelte";
import PerkList from "$lib/components/PerkList.svelte";
import ValuesText from "$lib/components/ValuesText.svelte";
import WeaponPicker from "$lib/components/WeaponPicker.svelte";
import YoutubeEmbed from "$lib/components/YoutubeEmbed.svelte";
import { t } from "$lib/i18n.svelte.js";
import { translatableString } from "$lib/utils/translatable-string";
import { phalanxWeapons } from "$lib/data/phalanx-weapons";

const { data } = $props();

const build = $derived(deserialize(data.build.buildId).unwrapOr(empty()));
</script>

{#if data.build}
    <div class="flex flex-col gap-2">
        <BuildTitle title={translatableString(data.build?.name) === "" ? undefined : translatableString(data.build?.name)} buildId={data.build.buildId} />

        {#if data.build.description}
            <div class="mb-8 grow">
                <ValuesText text={data.build.description} values={[]} classOverwrite={{p: ""}} />
            </div>
        {/if}

        {#if data.build.youtube}
            <div class="mb-8">
                <h2 class="text-xl mb-4">
                    {$t("page-builds-video")}
                </h2>
                <div class="max-w-lg">
                    <YoutubeEmbed id={data.build.youtube} title={$t("page-builds-video")} />
                </div>
            </div>
        {/if}

        <div class="mb-8">
            <h2 class="text-xl mb-4">
                {$t("term-build")}
            </h2>

            <div class="flex flex-col sm:flex-row">
                <div class="flex flex-col gap-2 sm:w-2/3">
                    <WeaponPicker
                        selected={build.weapon1}
                    />
                    <WeaponPicker
                        selected={build.weapon2}
                    />
                    <ArmourPicker
                        type="head"
                        selected={build.head}
                    />
                    <ArmourPicker
                        type="torso"
                        selected={build.torso}
                    />
                    <ArmourPicker
                        type="arms"
                        selected={build.arms}
                    />
                    <ArmourPicker
                        type="legs"
                        selected={build.legs}
                    />
                    <LanternCorePicker
                        selected={build.lanternCore}
                    />
                </div>
                <div class="w-full sm:w-1/3 px-2 flex flex-col gap-2">
                    <BuildStats build={build} />

                    <PerkList build={build} />
                </div>
            </div>
        </div>

        <div class="w-full flex flex-row justify-center">
            <a href={`/b/${data.build.buildId}`} class="btn btn-primary">
                <LinkIcon />
                {$t("page-builds-open-in-builder")}
            </a>
        </div>
    </div>
{:else}
    <Loading />
{/if}
