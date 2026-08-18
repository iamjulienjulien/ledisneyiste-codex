import type { ComponentProps, CSSProperties, ReactNode } from "react";
import type Link from "next/link";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustLinkVariant = "inline" | "action" | "surface";

export type PixieDustLinkColor = AtelierAnimationColorSlug | false;

export type PixieDustLinkIndicator =
    "none" | "arrow" | "chevron" | "back" | "external" | "anchor";

export type PixieDustLinkProps = Readonly<
    Omit<ComponentProps<typeof Link>, "children" | "className" | "color"> & {
        children: ReactNode;
        variant?: PixieDustLinkVariant;
        color?: PixieDustLinkColor;
        indicator?: PixieDustLinkIndicator;
        className?: string;
    }
>;

export type PixieDustLinkStyle = CSSProperties & {
    "--pixie-link-color"?: string;
};
