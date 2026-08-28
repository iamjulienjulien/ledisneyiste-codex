import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieSelectVariant = "outline" | "filled" | "underline";

export type PixieSelectSize = "sm" | "md" | "lg";

export type PixieSelectColor = AtelierAnimationColorSlug | false;

export type PixieSelectMode = "native" | "popover";

export type PixieSelectProps = Readonly<
    Omit<
        ComponentPropsWithRef<"select">,
        "children" | "className" | "color" | "multiple" | "size"
    > & {
        children: ReactNode;
        variant?: PixieSelectVariant;
        size?: PixieSelectSize;
        color?: PixieSelectColor;
        mode?: PixieSelectMode;
        portal?: boolean;
        placeholder?: string;
        invalid?: boolean;
        className?: string;
        selectClassName?: string;
    }
>;

export type PixieSelectStyle = CSSProperties & {
    "--pixie-select-color"?: string;
};

export type PixieSelectPortalStyle = CSSProperties &
    Partial<Record<`--${string}`, string>>;

export type PixieSelectOption = Readonly<{
    kind: "option";
    value: string;
    label: string;
    disabled: boolean;
    placeholder: boolean;
    index: number;
}>;

export type PixieSelectOptionGroup = Readonly<{
    kind: "group";
    label: string;
    disabled: boolean;
    options: readonly PixieSelectOption[];
}>;

export type PixieSelectItem = PixieSelectOption | PixieSelectOptionGroup;
