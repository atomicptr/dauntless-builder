import { sqids } from "$lib/sqids";

export interface FinderInitialData {
    perks: number[];
    items: {
        heads: number[];
        torsos: number[];
        arms: number[];
        legs: number[];
    };
}

export const finderDefaultData = (): FinderInitialData => ({
    perks: [],
    items: {
        heads: [],
        torsos: [],
        arms: [],
        legs: [],
    },
});

export const finderPageDataSerialize = (pageData: FinderInitialData) =>
    sqids.encode([
        pageData.perks.length,
        ...pageData.perks,
        pageData.items.heads.length,
        ...pageData.items.heads,
        pageData.items.torsos.length,
        ...pageData.items.torsos,
        pageData.items.arms.length,
        ...pageData.items.arms,
        pageData.items.legs.length,
        ...pageData.items.legs,
    ]);

export const finderPageDataDeserialize = (data: string) => {
    const res = sqids.decode(data);

    const finderData = finderDefaultData();

    const perksLen = res.shift() as number;
    for (let i = 0; i < perksLen; i++) {
        finderData.perks.push(res.shift() as number);
    }

    const headLen = res.shift() as number;
    for (let i = 0; i < headLen; i++) {
        finderData.items.heads.push(res.shift() as number);
    }

    const torsoLen = res.shift() as number;
    for (let i = 0; i < torsoLen; i++) {
        finderData.items.torsos.push(res.shift() as number);
    }

    const armsLen = res.shift() as number;
    for (let i = 0; i < armsLen; i++) {
        finderData.items.arms.push(res.shift() as number);
    }

    const legsLen = res.shift() as number;
    for (let i = 0; i < legsLen; i++) {
        finderData.items.legs.push(res.shift() as number);
    }

    return finderData;
};
