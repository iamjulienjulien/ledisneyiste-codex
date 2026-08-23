import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustPanelElement = "div" | "section" | "aside";

export type PixieDustPanelVariant = "surface" | "outline" | "accent";

export type PixieDustPanelPadding = "none" | "sm" | "md" | "lg" | "xl";

export type PixieDustPanelRadius = "none" | "small" | "medium" | "large";

export type PixieDustPanelColor = AtelierAnimationColorSlug | false;

export type PixieDustPanelStyle = CSSProperties & {
    "--pixie-panel-color"?: string;
};

export type PixieDustPanelProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color"> & {
        as?: PixieDustPanelElement;
        variant?: PixieDustPanelVariant;
        padding?: PixieDustPanelPadding;
        radius?: PixieDustPanelRadius;
        color?: PixieDustPanelColor;
        dividers?: boolean;
        header?: ReactNode;
        footer?: ReactNode;
        children: ReactNode;
    }
>;
