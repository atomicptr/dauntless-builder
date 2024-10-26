export const btflgHas = (num: number, flag: number): boolean => (num & flag) >= 1;

export const btflgAdd = (num: number, flag: number): number => num | flag;

export const btflgRemove = (num: number, flag: number): number => (btflgHas(num, flag) ? num ^ flag : num);
