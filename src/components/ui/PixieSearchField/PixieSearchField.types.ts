import type {
    ChangeEventHandler,
    ComponentProps,
    FormEventHandler,
    ReactNode,
} from "react";
import type { PixieButtonVariant } from "@/components/ui/PixieButton";
import type { PixieFieldFeedbackTone } from "@/components/ui/PixieField";
import type {
    PixieInputShape,
    PixieInputSize,
    PixieInputTone,
    PixieInputVariant,
} from "@/components/ui/PixieInput";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export type PixieSearchFieldComposition = "separate" | "joined" | "embedded";

export type PixieSearchFieldLayout = "inline" | "stacked" | "responsive";

export type PixieSearchFieldMethod = "get" | "post";

export type PixieSearchFieldColor = AtelierAnimationColorSlug | false;

export type PixieSearchFieldFeedback =
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

type PixieSearchFieldBaseProps = Readonly<{
    label: ReactNode;
    id?: string;
    name?: string;
    action?: string;
    method?: PixieSearchFieldMethod;
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
    color?: PixieSearchFieldColor;
    composition?: PixieSearchFieldComposition;
    layout?: PixieSearchFieldLayout;
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
    enterKeyHint?: ComponentProps<"input">["enterKeyHint"];
    autoFocus?: boolean;
    minLength?: number;
    maxLength?: number;
    spellCheck?: boolean;
    className?: string;
    formClassName?: string;
    inputClassName?: string;
}>;

export type PixieSearchFieldProps = PixieSearchFieldBaseProps &
    PixieSearchFieldFeedback;
