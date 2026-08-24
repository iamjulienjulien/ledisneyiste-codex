import type {
    CSSProperties,
    HTMLAttributes,
    ReactElement,
    ReactNode,
} from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieCardElement = "div" | "article" | "section" | "li";

export type PixieCardVariant =
    "surface" | "muted" | "outline" | "elevated" | "accent" | "tinted";

export type PixieCardPadding = "none" | "sm" | "md" | "lg" | "xl";

export type PixieCardRadius = "none" | "small" | "medium" | "large";

export type PixieCardAccentPosition = "top" | "end" | "bottom" | "start";

export type PixieCardEffect = "none" | "lift" | "glow" | "reveal" | "projector";

export type PixieCardEffectIntensity = "subtle" | "medium" | "strong";

export type PixieCardColor = AtelierAnimationColorSlug | false;

export type PixieCardStyle = CSSProperties & {
    "--pixie-card-color"?: string;
};

type PixieCardCommonProps = Omit<
    HTMLAttributes<HTMLElement>,
    "children" | "color"
> & {
    variant?: PixieCardVariant;
    color?: PixieCardColor;
    padding?: PixieCardPadding;
    radius?: PixieCardRadius;
    accentPosition?: PixieCardAccentPosition;
    effect?: PixieCardEffect;
    effectIntensity?: PixieCardEffectIntensity;
};

type PixieCardElementProps = PixieCardCommonProps & {
    asChild?: false;
    as?: PixieCardElement;
    children: ReactNode;
};

type PixieCardSlottedProps = PixieCardCommonProps & {
    asChild: true;
    as?: never;
    children: ReactElement;
};

export type PixieCardProps = Readonly<
    PixieCardElementProps | PixieCardSlottedProps
>;
