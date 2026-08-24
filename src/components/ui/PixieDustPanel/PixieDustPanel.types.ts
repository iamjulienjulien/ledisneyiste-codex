import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustPanelElement = "div" | "section" | "aside" | "article";

export type PixieDustPanelVariant =
    "plain" | "surface" | "muted" | "outline" | "accent" | "tinted";

export type PixieDustPanelPadding = "none" | "sm" | "md" | "lg" | "xl";

export type PixieDustPanelRadius = "none" | "small" | "medium" | "large";

export type PixieDustPanelColor = AtelierAnimationColorSlug | false;

export type PixieDustPanelAccentPosition = "top" | "end" | "bottom" | "start";

export type PixieDustPanelElevation = "none" | "soft" | "strong";

export type PixieDustPanelDividers = "none" | "header" | "footer" | "both";

export type PixieDustPanelScroll = "none" | "body";

export type PixieDustPanelStyle = CSSProperties & {
    "--pixie-panel-color"?: string;
};

export type PixieDustPanelProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color"> & {
        as?: PixieDustPanelElement;
        variant?: PixieDustPanelVariant;
        padding?: PixieDustPanelPadding;
        headerPadding?: PixieDustPanelPadding;
        bodyPadding?: PixieDustPanelPadding;
        footerPadding?: PixieDustPanelPadding;
        radius?: PixieDustPanelRadius;
        color?: PixieDustPanelColor;
        accentPosition?: PixieDustPanelAccentPosition;
        elevation?: PixieDustPanelElevation;
        dividers?: PixieDustPanelDividers;
        scroll?: PixieDustPanelScroll;
        maxHeight?: CSSProperties["maxHeight"];
        header?: ReactNode;
        footer?: ReactNode;
        children: ReactNode;
    }
>;
