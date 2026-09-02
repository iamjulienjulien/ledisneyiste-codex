import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type FocaleAnnotationTone = "info" | "uncertainty" | "warning";

export type FocaleAnnotationProps = Readonly<
    Omit<ComponentPropsWithoutRef<"aside">, "children" | "title"> & {
        title: ReactNode;
        children: ReactNode;
        tone?: FocaleAnnotationTone;
        provenance?: ReactNode;
    }
>;
