import type { AriaAttributes, ReactElement, ReactNode } from "react";

export type PixieFieldSpacing = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieFieldLayout = "stacked" | "side";

export type PixieFieldRequirementDisplay = "text" | "mark" | "hidden";

export type PixieFieldFeedbackTone = "success" | "warning";

export type PixieFieldControlProps = Readonly<{
    id?: string;
    "aria-describedby"?: AriaAttributes["aria-describedby"];
    "aria-errormessage"?: AriaAttributes["aria-errormessage"];
    "aria-invalid"?: AriaAttributes["aria-invalid"];
    "aria-labelledby"?: AriaAttributes["aria-labelledby"];
    "aria-required"?: AriaAttributes["aria-required"];
    disabled?: boolean;
    readOnly?: boolean;
}>;

export type PixieFieldRequirement =
    | Readonly<{ required: true; optional?: never }>
    | Readonly<{ optional: true; required?: never }>
    | Readonly<{ required?: false; optional?: false }>;

export type PixieFieldFeedback =
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

type PixieFieldBaseProps = Readonly<{
    controlId?: string;
    label: ReactNode;
    children: ReactElement<PixieFieldControlProps>;
    description?: ReactNode;
    meta?: ReactNode;
    labelHidden?: boolean;
    layout?: PixieFieldLayout;
    spacing?: PixieFieldSpacing;
    requirementDisplay?: PixieFieldRequirementDisplay;
    requiredLabel?: ReactNode;
    optionalLabel?: ReactNode;
    className?: string;
}>;

export type PixieFieldProps = PixieFieldBaseProps &
    PixieFieldRequirement &
    PixieFieldFeedback;
