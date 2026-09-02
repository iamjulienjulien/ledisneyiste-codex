import { useId } from "react";
import styles from "./FocaleTable.module.css";
import type {
    FocaleTableAlignment,
    FocaleTableDensity,
    FocaleTableProps,
} from "./FocaleTable.types";

const densityClasses = {
    compact: styles.compact,
    comfortable: styles.comfortable,
} as const satisfies Record<FocaleTableDensity, string>;

const alignmentClasses = {
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
} as const satisfies Record<FocaleTableAlignment, string>;

export function FocaleTable<Row>({
    caption,
    captionHidden = false,
    columns,
    rows,
    getRowId,
    density = "comfortable",
    emptyLabel = "Aucune donnée à restituer.",
    className = "",
    ...elementProps
}: FocaleTableProps<Row>) {
    const captionId = useId();

    if (columns.length === 0) {
        throw new Error("FocaleTable requiert au moins une colonne.");
    }

    return (
        <div
            {...elementProps}
            className={`${styles.viewport} ${className}`.trim()}
            role="region"
            aria-labelledby={captionId}
            tabIndex={0}
            data-focale-table-density={density}
        >
            <table className={`${styles.table} ${densityClasses[density]}`}>
                <caption
                    id={captionId}
                    className={
                        captionHidden ? styles.captionHidden : styles.caption
                    }
                >
                    {caption}
                </caption>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                className={
                                    alignmentClasses[column.align ?? "start"]
                                }
                                key={column.id}
                                scope="col"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows.map((row) => (
                            <tr key={getRowId(row)}>
                                {columns.map((column) => (
                                    <td
                                        className={
                                            alignmentClasses[
                                                column.align ?? "start"
                                            ]
                                        }
                                        key={column.id}
                                    >
                                        {column.render(row)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                className={styles.empty}
                                colSpan={columns.length}
                            >
                                {emptyLabel}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
