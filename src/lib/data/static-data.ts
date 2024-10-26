import { match } from "ts-pattern";
import type { Element } from "./phalanx-types";

export const powerLevel = (level: number): number =>
    match(level)
        .with(1, () => 10)
        .with(3, () => 50)
        .with(5, () => 90)
        .with(7, () => 120)
        .with(8, () => 130)
        .with(10, () => 150)
        .with(12, () => 170)
        .otherwise(() => 69);

export const resistanceLevel = (level: number): number =>
    match(level)
        .with(1, () => 10)
        .with(5, () => 50)
        .with(9, () => 90)
        .with(10, () => 100)
        .with(15, () => 125)
        .with(20, () => 150)
        .otherwise(() => 69);

export const elementResistanceLevel = (level: number): number =>
    match(level)
        .with(1, () => 2)
        .with(5, () => 8)
        .with(10, () => 17)
        .with(15, () => 21)
        .with(20, () => 25)
        .otherwise(() => 69);

export const oppositeElement = (element: Element) =>
    match(element)
        .with("blaze", () => "frost")
        .with("frost", () => "blaze")
        .with("shock", () => "terra")
        .with("terra", () => "shock")
        .with("umbral", () => "radiant")
        .with("radiant", () => "umbral")
        .run();
