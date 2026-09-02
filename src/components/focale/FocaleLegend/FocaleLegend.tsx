import { useId } from "react";
import { FocaleMark } from "@/components/focale/FocaleMark";
import styles from "./FocaleLegend.module.css";
import type {
    FocaleLegendOrientation,
    FocaleLegendProps,
} from "./FocaleLegend.types";

const orientationClasses = {
    horizontal: styles.horizontal,
    vertical: styles.vertical,
} as const satisfies Record<FocaleLegendOrientation, string>;

export function FocaleLegend({
    title,
    items,
    orientation = "horizontal",
    emptyLabel = "Aucun encodage à expliquer.",
    className = "",
    ...elementProps
}: FocaleLegendProps) {
    const titleId = useId();

    return (
        <section
            {...elementProps}
            className={`${styles.root} ${orientationClasses[orientation]} ${className}`.trim()}
            data-focale-legend={orientation}
            aria-labelledby={titleId}
        >
            <div className={styles.title} id={titleId}>
                {title}
            </div>
            {items.length > 0 ? (
                <ul className={styles.list}>
                    {items.map((item) => (
                        <li className={styles.item} key={item.id}>
                            <FocaleMark
                                decorative
                                shape={item.shape}
                                color={item.color}
                                size="sm"
                            />
                            <span className={styles.copy}>
                                <span className={styles.label}>
                                    {item.label}
                                </span>
                                {item.description ? (
                                    <span className={styles.description}>
                                        {item.description}
                                    </span>
                                ) : null}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.empty}>{emptyLabel}</p>
            )}
        </section>
    );
}
