import type { ComponentPropsWithoutRef, CSSProperties } from "react";

export type FocaleMarkShape = "dot" | "bar" | "line";
export type FocaleMarkSize = "sm" | "md" | "lg";

type FocaleMarkBaseProps = Readonly<
    Omit<ComponentPropsWithoutRef<"span">, "children" | "color"> & {
        shape?: FocaleMarkShape;
        size?: FocaleMarkSize;
        color?: string;
        value?: number;
    }
>;

export type FocaleMarkInformativeProps = FocaleMarkBaseProps &
    Readonly<{
        decorative?: false;
        label: string;
    }>;

export type FocaleMarkDecorativeProps = FocaleMarkBaseProps &
    Readonly<{
        decorative: true;
        label?: never;
    }>;

export type FocaleMarkProps =
    FocaleMarkInformativeProps | FocaleMarkDecorativeProps;

export type FocaleMarkStyle = CSSProperties & {
    "--focale-mark-color"?: string;
    "--focale-mark-value": number;
};
