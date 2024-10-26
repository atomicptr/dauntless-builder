import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { empty, serialize } from "$lib/build/Build";

export const load: PageLoad = () => {
    const buildId = serialize(empty()).unwrapOr("what-the-fuck");

    return redirect(302, `/b/${buildId}`);
};
