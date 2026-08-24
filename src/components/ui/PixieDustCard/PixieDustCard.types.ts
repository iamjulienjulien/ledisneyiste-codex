import type {
    CSSProperties,
    HTMLAttributes,
    ReactElement,
    ReactNode,
} from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustCardElement = "div" | "article" | "section" | "li";

export type PixieDustCardVariant =
    "surface" | "muted" | "outline" | "elevated" | "accent" | "tinted";

export type PixieDustCardPadding = "none" | "sm" | "md" | "lg" | "xl";

export type PixieDustCardRadius = "none" | "small" | "medium" | "large";

export type PixieDustCardAccentPosition = "top" | "end" | "bottom" | "start";

export type PixieDustCardEffect =
    "none" | "lift" | "glow" | "reveal" | "projector";

export type PixieDustCardEffectIntensity = "subtle" | "medium" | "strong";

export type PixieDustCardColor = AtelierAnimationColorSlug | false;

export type PixieDustCardStyle = CSSProperties & {
    "--pixie-card-color"?: string;
};

type PixieDustCardCommonProps = Omit<
    HTMLAttributes<HTMLElement>,
    "children" | "color"
> & {
    variant?: PixieDustCardVariant;
    color?: PixieDustCardColor;
    padding?: PixieDustCardPadding;
    radius?: PixieDustCardRadius;
    accentPosition?: PixieDustCardAccentPosition;
    effect?: PixieDustCardEffect;
    effectIntensity?: PixieDustCardEffectIntensity;
};

type PixieDustCardElementProps = PixieDustCardCommonProps & {
    asChild?: false;
    as?: PixieDustCardElement;
    children: ReactNode;
};

type PixieDustCardSlottedProps = PixieDustCardCommonProps & {
    asChild: true;
    as?: never;
    children: ReactElement;
};

export type PixieDustCardProps = Readonly<
    PixieDustCardElementProps | PixieDustCardSlottedProps
>;
