import { expect, test } from "vitest";
import { talentEmpty, talentParse, talentSerialize, talentSet } from "./talents";

test("talentSet", () => {
    expect(talentSet(talentEmpty(), 0, 0, true)).toStrictEqual([
        [true, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
    ]);

    expect(talentSet(talentEmpty(), 1, 1, true)).toStrictEqual([
        [false, false, false, false, false],
        [false, true, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
    ]);

    expect(talentSet(talentEmpty(), 4, 4, true)).toStrictEqual([
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, true],
    ]);
});

test("talentParse", () => {
    const resMatrix = [
        {
            input: 0,
            expected: talentEmpty(),
        },
        {
            input: 1,
            expected: [
                [true, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ],
        },
        {
            input: 0b1111111111111111111111111,
            expected: [
                [true, true, true, true, true],
                [true, true, true, true, true],
                [true, true, true, true, true],
                [true, true, true, true, true],
                [true, true, true, true, true],
            ],
        },
    ];

    resMatrix.forEach(({ input, expected }) => {
        expect(talentParse(input)).toStrictEqual(expected);
    });
});

test("talentSerialize", () => {
    expect(
        talentSerialize([
            [true, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
        ]),
    ).toBe(1);
});
