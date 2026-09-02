import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";

export type FocaleViewportOverflow = "auto" | "clip";
export type FocaleViewportHeight = "none" | "sm" | "md" | "lg";

export type FocaleViewportProps = Readonly<
    Omit<ComponentPropsWithoutRef<"figure">, "children"> & {
        label: string;
        description?: ReactNode;
        children: ReactNode;
        overflow?: FocaleViewportOverflow;
        maxHeight?: FocaleViewportHeight;
        minWidth?: string;
    }
>;

export type FocaleViewportStyle = CSSProperties & {
    "--focale-viewport-min-width"?: string;
};
