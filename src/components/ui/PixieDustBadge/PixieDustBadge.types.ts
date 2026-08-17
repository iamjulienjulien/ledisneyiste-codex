import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";
import type { MetadataSelection } from "@/types/metadata";

export type PixieDustBadgeVariant = "soft" | "outline" | "plain" | "solid";

export type PixieDustBadgeTone = "neutral" | "color" | "inherit";

export type PixieDustBadgeSize = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustBadgeShape = "rounded" | "pill";

export type PixieDustBadgeCommonProps = Readonly<
    Omit<ComponentPropsWithoutRef<"span">, "children" | "color"> & {
        variant?: PixieDustBadgeVariant;
        size?: PixieDustBadgeSize;
        shape?: PixieDustBadgeShape;
        icon?: ReactNode;
    }
>;

export type PixieDustBadgeRegistryProps = Readonly<
    MetadataSelection &
        PixieDustBadgeCommonProps & {
            children?: never;
            tone?: never;
            color?: never;
        }
>;

export type PixieDustBadgeCustomProps = Readonly<
    PixieDustBadgeCommonProps & {
        children: ReactNode;
        tone?: PixieDustBadgeTone;
        color?: AtelierAnimationColorSlug;
        registry?: never;
        collection?: never;
        slug?: never;
    }
>;

export type PixieDustBadgeProps =
    PixieDustBadgeRegistryProps | PixieDustBadgeCustomProps;

export type PixieDustBadgeStyle = CSSProperties & {
    "--pixie-dust-badge-color"?: string;
    "--pixie-dust-badge-foreground": string;
};
