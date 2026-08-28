import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustSelectVariant = "outline" | "filled" | "underline";

export type PixieDustSelectSize = "sm" | "md" | "lg";

export type PixieDustSelectColor = AtelierAnimationColorSlug | false;

export type PixieDustSelectMode = "native" | "popover";

export type PixieDustSelectProps = Readonly<
    Omit<
        ComponentPropsWithRef<"select">,
        "children" | "className" | "color" | "multiple" | "size"
    > & {
        children: ReactNode;
        variant?: PixieDustSelectVariant;
        size?: PixieDustSelectSize;
        color?: PixieDustSelectColor;
        mode?: PixieDustSelectMode;
        portal?: boolean;
        placeholder?: string;
        invalid?: boolean;
        className?: string;
        selectClassName?: string;
    }
>;

export type PixieDustSelectStyle = CSSProperties & {
    "--pixie-select-color"?: string;
};

export type PixieDustSelectPortalStyle = CSSProperties &
    Partial<Record<`--${string}`, string>>;

export type PixieDustSelectOption = Readonly<{
    kind: "option";
    value: string;
    label: string;
    disabled: boolean;
    placeholder: boolean;
    index: number;
}>;

export type PixieDustSelectOptionGroup = Readonly<{
    kind: "group";
    label: string;
    disabled: boolean;
    options: readonly PixieDustSelectOption[];
}>;

export type PixieDustSelectItem =
    PixieDustSelectOption | PixieDustSelectOptionGroup;
