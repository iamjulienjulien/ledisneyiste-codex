import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustInsetElement = "div" | "section" | "aside";

export type PixieDustInsetVariant = "subtle" | "recessed" | "groove" | "accent";

export type PixieDustInsetDepth = "shallow" | "medium" | "deep";

export type PixieDustInsetPadding = "none" | "sm" | "md" | "lg";

export type PixieDustInsetRadius = "none" | "small" | "medium" | "large";

export type PixieDustInsetColor = AtelierAnimationColorSlug | false;

export type PixieDustInsetStyle = CSSProperties & {
    "--pixie-inset-color"?: string;
};

export type PixieDustInsetProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color"> & {
        as?: PixieDustInsetElement;
        variant?: PixieDustInsetVariant;
        depth?: PixieDustInsetDepth;
        padding?: PixieDustInsetPadding;
        radius?: PixieDustInsetRadius;
        color?: PixieDustInsetColor;
        children: ReactNode;
    }
>;
