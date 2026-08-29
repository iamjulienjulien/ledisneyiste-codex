import type { AriaAttributes, ReactElement, ReactNode } from "react";

export type PixieDustFieldSpacing = "xs" | "sm" | "md" | "lg" | "xl";

export type PixieDustFieldLayout = "stacked" | "side";

export type PixieDustFieldRequirementDisplay = "text" | "mark" | "hidden";

export type PixieDustFieldFeedbackTone = "success" | "warning";

export type PixieDustFieldControlProps = Readonly<{
    id?: string;
    "aria-describedby"?: AriaAttributes["aria-describedby"];
    "aria-errormessage"?: AriaAttributes["aria-errormessage"];
    "aria-invalid"?: AriaAttributes["aria-invalid"];
    "aria-labelledby"?: AriaAttributes["aria-labelledby"];
    "aria-required"?: AriaAttributes["aria-required"];
    disabled?: boolean;
    readOnly?: boolean;
}>;

export type PixieDustFieldRequirement =
    | Readonly<{ required: true; optional?: never }>
    | Readonly<{ optional: true; required?: never }>
    | Readonly<{ required?: false; optional?: false }>;

export type PixieDustFieldFeedback =
    | Readonly<{
          error: ReactNode;
          feedback?: never;
          feedbackTone?: never;
      }>
    | Readonly<{
          error?: never;
          feedback: ReactNode;
          feedbackTone?: PixieDustFieldFeedbackTone;
      }>
    | Readonly<{
          error?: never;
          feedback?: never;
          feedbackTone?: never;
      }>;

type PixieDustFieldBaseProps = Readonly<{
    controlId?: string;
    label: ReactNode;
    children: ReactElement<PixieDustFieldControlProps>;
    description?: ReactNode;
    meta?: ReactNode;
    labelHidden?: boolean;
    layout?: PixieDustFieldLayout;
    spacing?: PixieDustFieldSpacing;
    requirementDisplay?: PixieDustFieldRequirementDisplay;
    requiredLabel?: ReactNode;
    optionalLabel?: ReactNode;
    className?: string;
}>;

export type PixieDustFieldProps = PixieDustFieldBaseProps &
    PixieDustFieldRequirement &
    PixieDustFieldFeedback;
