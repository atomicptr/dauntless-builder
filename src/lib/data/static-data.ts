import { match } from "ts-pattern";
import type { Element } from "./phalanx-types";

export const weaponMaxLevel = 60;
export const armourMaxLevel = 20;

const unknownLevel = (category: string, level: number) => () =>{
    console.error(`${category}: Unknown level selected ${level}`);
    return 0;
}

export const powerLevel = (level: number): number =>
    match(level)
        .with(1, () => 10)
        .with(3, () => 50)
        .with(5, () => 90)
        .with(7, () => 120)
        .with(8, () => 130)
        .with(10, () => 150)
        .with(12, () => 170)
        .with(15, () => 200)
        .otherwise(unknownLevel("powerLevel", level));

export const resistanceLevel = (level: number): number =>
    match(level)
        .with(1, () => 10)
        .with(2, () => 20)
        .with(3, () => 30)
        .with(4, () => 40)
        .with(5, () => 50)
        .with(6, () => 60)
        .with(7, () => 70)
        .with(8, () => 80)
        .with(9, () => 90)
        .with(10, () => 100)
        .with(11, () => 105)
        .with(12, () => 110)
        .with(13, () => 115)
        .with(14, () => 120)
        .with(15, () => 125)
        .with(16, () => 130)
        .with(17, () => 135)
        .with(18, () => 140)
        .with(19, () => 145)
        .with(20, () => 150)
        .otherwise(unknownLevel("resistanceLevel", level));

export const elementResistanceLevel = (level: number): number =>
    match(level)
        .with(1, () => 2)
        .with(2, () => 3)
        .with(3, () => 5)
        .with(4, () => 7)
        .with(5, () => 8)
        .with(6, () => 10)
        .with(7, () => 12)
        .with(8, () => 8)
        .with(9, () => 8)
        .with(10, () => 17)
        .with(11, () => 18)
        .with(12, () => 18)
        .with(13, () => 19)
        .with(14, () => 20)
        .with(15, () => 21)
        .with(16, () => 22)
        .with(17, () => 23)
        .with(18, () => 24)
        .with(19, () => 24)
        .with(20, () => 25)
        .otherwise(unknownLevel("elementResistanceLevel", level));

export const oppositeElement = (element: Element) =>
    match(element)
        .with("blaze", () => "frost")
        .with("frost", () => "blaze")
        .with("shock", () => "terra")
        .with("terra", () => "shock")
        .with("umbral", () => "radiant")
        .with("radiant", () => "umbral")
        .run();
