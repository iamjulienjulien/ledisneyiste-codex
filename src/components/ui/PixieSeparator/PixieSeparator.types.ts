import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieSeparatorVariant =
    "line" | "section" | "beam" | "fade" | "film" | "splice" | "leader";

export type PixieSeparatorIntensity = "subtle" | "strong";

export type PixieSeparatorColor = AtelierAnimationColorSlug | false;

export type PixieSeparatorSpacing = "none" | "sm" | "md" | "lg";

export type PixieSeparatorWidth = "full" | "medium" | "short";

export type PixieSeparatorAlign = "start" | "center" | "end";

export type PixieSeparatorPosition = "start" | "center" | "end";

export type PixieSeparatorProps = Readonly<
    Omit<ComponentPropsWithoutRef<"hr">, "color"> & {
        variant?: PixieSeparatorVariant;
        intensity?: PixieSeparatorIntensity;
        color?: PixieSeparatorColor;
        spacing?: PixieSeparatorSpacing;
        width?: PixieSeparatorWidth;
        align?: PixieSeparatorAlign;
        position?: PixieSeparatorPosition;
        decorative?: boolean;
    }
>;

export type PixieSeparatorStyle = CSSProperties & {
    "--pixie-separator-color"?: string;
};
