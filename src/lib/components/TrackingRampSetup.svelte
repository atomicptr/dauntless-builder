<script lang="ts">
import { afterNavigate } from "$app/navigation";
import { env, envBool } from "$lib/utils/env-helper";
import log from "$lib/utils/logger";

let initialized = $state(false);
let adsEnabledForUser = $state(true); // TODO: default this to false, check with "backend" and then load stuff

const adsEnabled = envBool("DB_ENABLE_ADS");
const displayPlaceholders = envBool("DB_DISPLAY_AD_PLACEHOLDERS");

const publisherId = env("DB_PW_PUBLISHER_ID");
const websiteId = env("DB_PW_WEBSITE_ID");
const ga4MeasurementId = env("DB_GA4_MEASUREMENT_ID");

const init = async () => {
    window.gtag("js", new Date());
    window.gtag("config", ga4MeasurementId);

    log.debug("ga4 initialized");

    // feature flag hasn't been enabled
    if (!adsEnabled) {
        log.debug("ads: disabled");
        return;
    }

    // user doesnt have ads so stop here, might want to check here :)
    if (!adsEnabledForUser) {
        log.debug("ads: disabled for user");
        return;
    }

    // if we are displaying placeholders instead, just stop here
    if (displayPlaceholders) {
        log.debug("ads: display placeholder");
        return;
    }

    // not properly set up?
    if (!publisherId || !websiteId) {
        log.debug("ads: pw data not setup correctly");
        return;
    }

    // ramp has already been initialized
    if (window.ramp) {
        return;
    }

    window.ramp = window.ramp ?? {};
    window.ramp.que = window.ramp.que ?? [];
    window.ramp.passiveMode = true;

    const gtagFunc = (...args: unknown[]) => window.dataLayer.push(args);

    window._pwGA4PageviewId = Date.now().toString();
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || gtagFunc;
    window.gtag("js", new Date());
    window.gtag("config", ga4MeasurementId, { send_page_view: false });
    window.gtag("event", "ramp_js", {
        pageview_id: window._pwGA4PageviewId,
        send_to: ga4MeasurementId,
    });

    window.ramp.que.push(() => {
        log.debug("playwire has been setup");
        initialized = true;
    });

    const rampScript = document.createElement("script");
    rampScript.src = `https://cdn.intergient.com/${publisherId}/${websiteId}/ramp.js`;
    rampScript.async = true;
    document.body.appendChild(rampScript);
};

afterNavigate(() => {
    if (!initialized) {
        return;
    }

    window.ramp.processPage(window.location.pathname);
});
</script>

<svelte:head>
    {#if ga4MeasurementId}
        <script>
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || (function () {
                window.dataLayer.push(arguments);
            });
        </script>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`} onload={init}></script>
    {/if}
</svelte:head>
