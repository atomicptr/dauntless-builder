import type { GlobalSetupContext } from "vitest/node";
import type { Data, FinderData } from "$lib/data/phalanx-types";
import { fetchData, fetchFinderData } from "$lib/data/phalanx";

export default async function setup({ provide }: GlobalSetupContext) {
    provide("builderData", await fetchData());
    provide("finderData", await fetchFinderData());
}

declare module "vitest" {
    export interface ProvidedContext {
        builderData: Data;
        finderData: FinderData;
    }
}
