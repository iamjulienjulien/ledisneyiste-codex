import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FocaleMarkShape } from "@/components/focale/FocaleMark";

export type FocaleLegendOrientation = "horizontal" | "vertical";

export type FocaleLegendItem = Readonly<{
    id: string;
    label: ReactNode;
    description?: ReactNode;
    color?: string;
    shape?: FocaleMarkShape;
}>;

export type FocaleLegendProps = Readonly<
    Omit<ComponentPropsWithoutRef<"section">, "children" | "title"> & {
        title: ReactNode;
        items: readonly FocaleLegendItem[];
        orientation?: FocaleLegendOrientation;
        emptyLabel?: ReactNode;
    }
>;
