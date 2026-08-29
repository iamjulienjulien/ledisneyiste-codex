import type { ChangeEventHandler, FormEventHandler, ReactNode } from "react";
import type { PixieButtonVariant } from "@/components/ui/PixieButton";
import type { PixieFieldFeedbackTone } from "@/components/ui/PixieField";
import type {
    PixieInputShape,
    PixieInputSize,
    PixieInputTone,
    PixieInputVariant,
} from "@/components/ui/PixieInput";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieDustSearchFieldComposition =
    "separate" | "joined" | "embedded";

export type PixieDustSearchFieldLayout = "inline" | "stacked" | "responsive";

export type PixieDustSearchFieldMethod = "get" | "post";

export type PixieDustSearchFieldColor = AtelierAnimationColorSlug | false;

export type PixieDustSearchFieldFeedback =
    | Readonly<{
          error: ReactNode;
          feedback?: never;
          feedbackTone?: never;
      }>
    | Readonly<{
          error?: never;
          feedback: ReactNode;
          feedbackTone?: PixieFieldFeedbackTone;
      }>
    | Readonly<{
          error?: never;
          feedback?: never;
          feedbackTone?: never;
      }>;

type PixieDustSearchFieldBaseProps = Readonly<{
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
    meta?: ReactNode;
    variant?: PixieInputVariant;
    size?: PixieInputSize;
    shape?: PixieInputShape;
    tone?: PixieInputTone;
    color?: PixieDustSearchFieldColor;
    composition?: PixieDustSearchFieldComposition;
    layout?: PixieDustSearchFieldLayout;
    submitVariant?: PixieButtonVariant;
    submitLabel?: string;
    submitIcon?: ReactNode;
    submitLabelHidden?: boolean;
    searchIcon?: ReactNode;
    clearIcon?: ReactNode;
    clearLabel?: string;
    clearable?: boolean;
    clearOnEscape?: boolean;
    labelHidden?: boolean;
    busy?: boolean;
    disabled?: boolean;
    required?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;
    minLength?: number;
    maxLength?: number;
    spellCheck?: boolean;
    className?: string;
    formClassName?: string;
    inputClassName?: string;
}>;

export type PixieDustSearchFieldProps = PixieDustSearchFieldBaseProps &
    PixieDustSearchFieldFeedback;
