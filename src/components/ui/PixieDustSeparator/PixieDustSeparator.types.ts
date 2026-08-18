import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustSeparatorVariant =
    "line" | "section" | "beam" | "fade" | "film" | "splice" | "leader";

export type PixieDustSeparatorIntensity = "subtle" | "strong";

export type PixieDustSeparatorColor = AtelierAnimationColorSlug | false;

export type PixieDustSeparatorSpacing = "none" | "sm" | "md" | "lg";

export type PixieDustSeparatorWidth = "full" | "medium" | "short";

export type PixieDustSeparatorAlign = "start" | "center" | "end";

export type PixieDustSeparatorPosition = "start" | "center" | "end";

export type PixieDustSeparatorProps = Readonly<
    Omit<ComponentPropsWithoutRef<"hr">, "color"> & {
        variant?: PixieDustSeparatorVariant;
        intensity?: PixieDustSeparatorIntensity;
        color?: PixieDustSeparatorColor;
        spacing?: PixieDustSeparatorSpacing;
        width?: PixieDustSeparatorWidth;
        align?: PixieDustSeparatorAlign;
        position?: PixieDustSeparatorPosition;
        decorative?: boolean;
    }
>;

export type PixieDustSeparatorStyle = CSSProperties & {
    "--pixie-dust-separator-color"?: string;
};
