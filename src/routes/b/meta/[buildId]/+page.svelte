<script lang="ts">
import { page } from "$app/stores";
import { deserialize, empty } from "$lib/build/Build";
import ArmourPicker from "$lib/components/ArmourPicker.svelte";
import LinkIcon from "$lib/components/icons/LinkIcon.svelte";
import LanternCorePicker from "$lib/components/LanternCorePicker.svelte";
import Loading from "$lib/components/Loading.svelte";
import PerkList from "$lib/components/PerkList.svelte";
import ValuesText from "$lib/components/ValuesText.svelte";
import WeaponPicker from "$lib/components/WeaponPicker.svelte";
import YoutubeEmbed from "$lib/components/YoutubeEmbed.svelte";
import { translatableString } from "$lib/utils/translatable-string.js";

const { data } = $props();

const build = $derived(deserialize(data.build.buildId).unwrapOr(empty()));
</script>

{#if data.build}
    <div class="flex flex-col gap-2">
        <h1 class="text-2xl mb-8">
            {#if data.build.name}
                {data.build.name}
            {:else if build.weapon1.id !== 0 || build.weapon2.id !== 0}
                {translatableString($page.data.weapons[build.weapon1.id].name)}
                {#if build.weapon1.id !== 0 && build.weapon2.id !== 0}
                    &nbsp;/&nbsp;
                {/if}
                {translatableString($page.data.weapons[build.weapon2.id].name)}
            {/if}
        </h1>

        {#if data.build.description}
            <div class="p-4 mb-8 grow">
                <ValuesText text={{en: data.build.description}} values={[]} classOverwrite={{p: ""}} />
            </div>
        {/if}

        {#if data.build.youtube}
            <div class="p-4 mb-8">
                <h2 class="text-xl mb-4">
                    Video
                </h2>
                <YoutubeEmbed id={data.build.youtube} title="Build Video" />
            </div>
        {/if}

        <div class="mb-8">
            <h2 class="text-xl mb-4">
                Build
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
                <div class="w-1/3 p-4">
                    <PerkList build={build} />
                </div>
            </div>
        </div>

        <div class="w-full flex flex-row justify-center">
            <a href={`/b/${data.build.buildId}`} class="btn btn-primary">
                <LinkIcon />
                Open in Builder
            </a>
        </div>
    </div>
{:else}
    <Loading />
{/if}
