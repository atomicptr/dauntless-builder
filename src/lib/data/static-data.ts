import { match } from "ts-pattern";
import type { Element } from "./phalanx-types";

export const weaponMaxLevel = 60;
export const armourMaxLevel = 20;

const unknownLevel = (category: string, level: number) => () => {
    console.error(`${category}: Unknown level selected ${level}`);
    return 0;
};

export const powerLevel = (level: number): number =>
    match(level)
        .with(1, () => 10)
        .with(2, () => 30)
        .with(3, () => 50)
        .with(4, () => 70)
        .with(5, () => 90)
        .with(6, () => 110)
        .with(7, () => 120)
        .with(8, () => 130)
        .with(9, () => 140)
        .with(10, () => 150)
        .with(11, () => 160)
        .with(12, () => 170)
        .with(13, () => 180)
        .with(14, () => 190)
        .with(15, () => 200)
        .with(16, () => 210)
        .with(17, () => 220)
        .with(18, () => 230)
        .with(19, () => 240)
        .with(20, () => 250)
        .with(21, () => 260)
        .with(22, () => 270)
        .with(23, () => 280)
        .with(24, () => 290)
        .with(25, () => 300)
        .with(26, () => 310)
        .with(27, () => 320)
        .with(28, () => 330)
        .with(29, () => 340)
        .with(30, () => 350)
        .with(31, () => 360)
        .with(32, () => 370)
        .with(33, () => 380)
        .with(34, () => 390)
        .with(35, () => 400)
        .with(36, () => 410)
        .with(37, () => 420)
        .with(38, () => 430)
        .with(39, () => 440)
        .with(40, () => 450)
        .with(41, () => 460)
        .with(42, () => 470)
        .with(43, () => 480)
        .with(44, () => 490)
        .with(45, () => 500)
        .with(46, () => 510)
        .with(47, () => 520)
        .with(48, () => 530)
        .with(49, () => 540)
        .with(50, () => 550)
        .with(51, () => 555)
        .with(52, () => 560)
        .with(53, () => 565)
        .with(54, () => 570)
        .with(55, () => 575)
        .with(56, () => 580)
        .with(57, () => 585)
        .with(58, () => 590)
        .with(59, () => 595)
        .with(60, () => 600)
        .otherwise(unknownLevel("powerLevel", level));

export const elementPowerLevel = (level: number): [number, number] => {
    const val = Math.min(Math.max(level, 1), weaponMaxLevel);
    return [val, Math.ceil(val / 2.0)];
}

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
