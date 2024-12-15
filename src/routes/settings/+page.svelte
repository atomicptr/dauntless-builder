<script lang="ts">
import PageTitle from "$lib/components/PageTitle.svelte";
import { languageValues, type Language } from "$lib/data/phalanx-types";
import { nativeLanguageName } from "$lib/i18n";
import { __ } from "$lib/i18n.svelte";
import { configViewWeaponAbilities, configViewWeaponTalents, language, theme } from "$lib/state.svelte";
</script>

<PageTitle title={__("menu-settings")} />

<div class="flex flex-col gap-2">
    <div class="form-control max-w-64">
        <label class="form-control w-full max-w-xs">
        <div class="label">
            <span class="label-text">{ __("page-settings-language")}</span>
        </div>
            <select class="select select-bordered" value={$language} onchange={(ev) => language.set(ev.currentTarget.value as Language)}>
                {#each languageValues as lang}
                    <option value={lang}>{ __(`page-settings-language-${lang}`)} ({nativeLanguageName(lang)})</option>
                {/each}
            </select>
        </label>
    </div>
    
    <div class="form-control max-w-64">
        <label class="label cursor-pointer">
            <span class="label-text">{ __("page-settings-use-dark-mode") }</span>
            <input type="checkbox" class="toggle toggle-primary" checked={$theme === "dark"} onchange={() => theme.set($theme === "dark" ? "light" : "dark")} />
        </label>
    </div>

    <div class="form-control max-w-64">
        <label class="label cursor-pointer">
            <span class="label-text">{ __("page-settings-view-weapon-abilities") }</span>
            <input type="checkbox" class="toggle toggle-primary" checked={$configViewWeaponAbilities} onchange={() => configViewWeaponAbilities.set(!$configViewWeaponAbilities)} />
        </label>
    </div>

    <div class="form-control max-w-64">
        <label class="label cursor-pointer">
            <span class="label-text">{ __("page-settings-view-weapon-talents") }</span>
            <input type="checkbox" class="toggle toggle-primary" checked={$configViewWeaponTalents} onchange={() => configViewWeaponTalents.set(!$configViewWeaponTalents)} />
        </label>
    </div>
</div>
