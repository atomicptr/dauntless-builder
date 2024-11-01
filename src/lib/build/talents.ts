export type TalentGrid = boolean[][];

export const talentEmpty = (): TalentGrid => [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
];

export const talentSet = (grid: TalentGrid, row: number, col: number, value: boolean): TalentGrid => {
    const newGrid = structuredClone(grid);
    newGrid[row][col] = value;
    return newGrid;
};

export const talentParse = (data: number): TalentGrid => {
    let talents = talentEmpty();

    for (let i = 0; i < 25; i++) {
        const row = Math.floor(i / 5);
        const col = i % 5;
        const value = (data & (1 << i)) !== 0;

        if (!value) {
            continue;
        }

        talents = talentSet(talents, row, col, value);
    }

    return talents;
};

export const talentSerialize = (grid: TalentGrid): number => {
    let number = 0;

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (grid[i][j]) {
                number |= 1 << (i * 5 + j);
            }
        }
    }

    return number;
};
