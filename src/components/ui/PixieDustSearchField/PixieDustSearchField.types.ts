import type { ChangeEventHandler, FormEventHandler, ReactNode } from "react";
import type {
    PixieDustInputSize,
    PixieDustInputVariant,
} from "@/components/ui/PixieDustInput";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustSearchFieldLayout = "inline" | "stacked" | "responsive";

export type PixieDustSearchFieldMethod = "get" | "post";

export type PixieDustSearchFieldColor = AtelierAnimationColorSlug | false;

export type PixieDustSearchFieldProps = Readonly<{
    label: ReactNode;
    id?: string;
    name?: string;
    action?: string;
    method?: PixieDustSearchFieldMethod;
    value?: string;
    defaultValue?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onSubmit?: FormEventHandler<HTMLFormElement>;
    onClear?: () => void;
    placeholder?: string;
    description?: ReactNode;
    error?: ReactNode;
    variant?: PixieDustInputVariant;
    size?: PixieDustInputSize;
    color?: PixieDustSearchFieldColor;
    layout?: PixieDustSearchFieldLayout;
    submitLabel?: string;
    clearLabel?: string;
    clearable?: boolean;
    labelHidden?: boolean;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    formClassName?: string;
    inputClassName?: string;
}>;
