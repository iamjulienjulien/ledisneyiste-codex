import type { AriaAttributes, ReactElement, ReactNode } from "react";

export type PixieDustFieldSpacing = "sm" | "md" | "lg";

export type PixieDustFieldControlProps = Readonly<{
    id?: string;
    "aria-describedby"?: AriaAttributes["aria-describedby"];
    "aria-errormessage"?: AriaAttributes["aria-errormessage"];
    "aria-invalid"?: AriaAttributes["aria-invalid"];
    "aria-labelledby"?: AriaAttributes["aria-labelledby"];
    "aria-required"?: AriaAttributes["aria-required"];
}>;

type PixieDustFieldRequirement =
    | Readonly<{ required: true; optional?: never }>
    | Readonly<{ optional: true; required?: never }>
    | Readonly<{ required?: false; optional?: false }>;

type PixieDustFieldBaseProps = Readonly<{
    controlId: string;
    label: ReactNode;
    children: ReactElement<PixieDustFieldControlProps>;
    description?: ReactNode;
    error?: ReactNode;
    labelHidden?: boolean;
    spacing?: PixieDustFieldSpacing;
    className?: string;
}>;

export type PixieDustFieldProps = PixieDustFieldBaseProps &
    PixieDustFieldRequirement;
