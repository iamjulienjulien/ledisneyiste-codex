import type { HTMLAttributes, ReactNode } from "react";

export type PixieDustContainerElement = "div" | "main" | "section";

export type PixieDustContainerWidth = "42" | "56" | "72" | "full";

export type PixieDustContainerGutter = "none" | "sm" | "md" | "lg";

export type PixieDustContainerProps = Readonly<
    Omit<HTMLAttributes<HTMLElement>, "children"> & {
        as?: PixieDustContainerElement;
        width?: PixieDustContainerWidth;
        gutter?: PixieDustContainerGutter;
        children: ReactNode;
    }
>;
