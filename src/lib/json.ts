import { sha3_256 } from "@noble/hashes/sha3";
import { bytesToHex } from "@noble/hashes/utils";

export const createETag = (forContent: string): string => {
    return bytesToHex(sha3_256(forContent));
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
