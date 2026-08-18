import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustCardElement = "div" | "article" | "section" | "li";

export type PixieDustCardVariant =
    "surface" | "outline" | "elevated" | "accent";

export type PixieDustCardPadding = "none" | "sm" | "md" | "lg";

export type PixieDustCardRadius = "none" | "small" | "medium" | "large";

export type PixieDustCardEffect = "none" | "lift" | "projector";

export type PixieDustCardColor = AtelierAnimationColorSlug | false;

export type PixieDustCardStyle = CSSProperties & {
    "--pixie-card-color"?: string;
};

export type PixieDustCardProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color"> & {
        as?: PixieDustCardElement;
        variant?: PixieDustCardVariant;
        color?: PixieDustCardColor;
        padding?: PixieDustCardPadding;
        radius?: PixieDustCardRadius;
        effect?: PixieDustCardEffect;
        children: ReactNode;
    }
>;
