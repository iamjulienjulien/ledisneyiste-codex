import type { ComponentProps, CSSProperties, ReactNode } from "react";
import type Link from "next/link";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieLinkVariant = "inline" | "action" | "surface";

export type PixieLinkColor = AtelierAnimationColorSlug | false;

export type PixieLinkIndicator =
    "none" | "arrow" | "chevron" | "back" | "external" | "anchor";

export type PixieLinkProps = Readonly<
    Omit<ComponentProps<typeof Link>, "children" | "className" | "color"> & {
        children: ReactNode;
        variant?: PixieLinkVariant;
        color?: PixieLinkColor;
        indicator?: PixieLinkIndicator;
        className?: string;
    }
>;

export type PixieLinkStyle = CSSProperties & {
    "--pixie-link-color"?: string;
};
