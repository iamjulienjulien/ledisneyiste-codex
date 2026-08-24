import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustSelectVariant = "outline" | "filled" | "underline";

export type PixieDustSelectSize = "sm" | "md" | "lg";

export type PixieDustSelectColor = AtelierAnimationColorSlug | false;

export type PixieDustSelectProps = Readonly<
    Omit<
        ComponentPropsWithRef<"select">,
        "children" | "className" | "color" | "multiple" | "size"
    > & {
        children: ReactNode;
        variant?: PixieDustSelectVariant;
        size?: PixieDustSelectSize;
        color?: PixieDustSelectColor;
        placeholder?: string;
        invalid?: boolean;
        className?: string;
        selectClassName?: string;
    }
>;

export type PixieDustSelectStyle = CSSProperties & {
    "--pixie-select-color"?: string;
};
