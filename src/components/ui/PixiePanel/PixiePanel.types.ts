import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixiePanelElement = "div" | "section" | "aside" | "article";

export type PixiePanelVariant =
    "plain" | "surface" | "muted" | "outline" | "accent" | "tinted";

export type PixiePanelPadding = "none" | "sm" | "md" | "lg" | "xl";

export type PixiePanelRadius = "none" | "small" | "medium" | "large";

export type PixiePanelColor = AtelierAnimationColorSlug | false;

export type PixiePanelAccentPosition = "top" | "end" | "bottom" | "start";

export type PixiePanelElevation = "none" | "soft" | "strong";

export type PixiePanelDividers = "none" | "header" | "footer" | "both";

export type PixiePanelScroll = "none" | "body";

export type PixiePanelStyle = CSSProperties & {
    "--pixie-panel-color"?: string;
};

export type PixiePanelProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children" | "color"> & {
        as?: PixiePanelElement;
        variant?: PixiePanelVariant;
        padding?: PixiePanelPadding;
        headerPadding?: PixiePanelPadding;
        bodyPadding?: PixiePanelPadding;
        footerPadding?: PixiePanelPadding;
        radius?: PixiePanelRadius;
        color?: PixiePanelColor;
        accentPosition?: PixiePanelAccentPosition;
        elevation?: PixiePanelElevation;
        dividers?: PixiePanelDividers;
        scroll?: PixiePanelScroll;
        maxHeight?: CSSProperties["maxHeight"];
        header?: ReactNode;
        footer?: ReactNode;
        children: ReactNode;
    }
>;
