import type { HTMLAttributes, ReactNode } from "react";

export type PixieContainerElement = "div" | "main" | "section";

export type PixieContainerWidth = "42" | "56" | "72" | "full";

export type PixieContainerGutter = "none" | "sm" | "md" | "lg";

export type PixieContainerProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieContainerElement;
        width?: PixieContainerWidth;
        gutter?: PixieContainerGutter;
        children: ReactNode;
    }
>;
