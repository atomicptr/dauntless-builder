import { sha3_256 } from "@noble/hashes/sha3";
import * as env from "$env/dynamic/public";
import { bytesToHex } from "@noble/hashes/utils";

export const createETag = (forContent: string): string => {
    return bytesToHex(sha3_256((env.CF_PAGES_COMMIT_SHA ?? "dev") + ":" + forContent));
};

export const makeJsonResponse = (data: object): Response => {
    const content = JSON.stringify(data, null, "    ");
    return new Response(content, {
        headers: {
            ETag: createETag(content),
            "Cache-Control": "max-age=3600, must-revalidate",
            "Content-Type": "application/json",
        },
    });
};
