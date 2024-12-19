import buildsJson from "$lib/static/builds.json";
import type { BuildsData } from "./phalanx-types";
export const phalanxBuilds = buildsJson as unknown as BuildsData;
