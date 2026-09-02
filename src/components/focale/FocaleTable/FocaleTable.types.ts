import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type FocaleTableDensity = "compact" | "comfortable";
export type FocaleTableAlignment = "start" | "center" | "end";

export type FocaleTableColumn<Row> = Readonly<{
    id: string;
    header: ReactNode;
    render: (row: Row) => ReactNode;
    align?: FocaleTableAlignment;
}>;

export type FocaleTableProps<Row> = Readonly<
    Omit<ComponentPropsWithoutRef<"div">, "children"> & {
        caption: ReactNode;
        captionHidden?: boolean;
        columns: readonly FocaleTableColumn<Row>[];
        rows: readonly Row[];
        getRowId: (row: Row) => string;
        density?: FocaleTableDensity;
        emptyLabel?: ReactNode;
    }
>;
