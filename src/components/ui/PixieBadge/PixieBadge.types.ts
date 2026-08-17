import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";
import type { MetadataSelection } from "@/types/metadata";

export type PixieBadgeVariant = "soft" | "outline" | "plain" | "solid";

export type PixieBadgeTone = "neutral" | "color" | "inherit";

export type PixieBadgeSize = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieBadgeShape = "rounded" | "pill";

export type PixieBadgeCommonProps = Readonly<
    Omit<ComponentPropsWithoutRef<"span">, "children" | "color"> & {
        variant?: PixieBadgeVariant;
        size?: PixieBadgeSize;
        shape?: PixieBadgeShape;
        icon?: ReactNode;
    }
>;

export type PixieBadgeRegistryProps = Readonly<
    MetadataSelection &
        PixieBadgeCommonProps & {
            children?: never;
            tone?: never;
            color?: never;
        }
>;

export type PixieBadgeCustomProps = Readonly<
    PixieBadgeCommonProps & {
        children: ReactNode;
        tone?: PixieBadgeTone;
        color?: AtelierAnimationColorSlug;
        registry?: never;
        collection?: never;
        slug?: never;
    }
>;

export type PixieBadgeProps = PixieBadgeRegistryProps | PixieBadgeCustomProps;

export type PixieBadgeStyle = CSSProperties & {
    "--pixie-badge-color"?: string;
    "--pixie-badge-foreground": string;
};
