import { useId } from "react";
import styles from "./FocaleAnnotation.module.css";
import type {
    FocaleAnnotationProps,
    FocaleAnnotationTone,
} from "./FocaleAnnotation.types";

const toneLabels = {
    info: "Information",
    uncertainty: "Incertitude",
    warning: "Point de vigilance",
} as const satisfies Record<FocaleAnnotationTone, string>;

export function FocaleAnnotation({
    title,
    children,
    tone = "info",
    provenance,
    className = "",
    ...elementProps
}: FocaleAnnotationProps) {
    const titleId = useId();

    return (
        <aside
            {...elementProps}
            className={`${styles.root} ${styles[tone]} ${className}`.trim()}
            role="note"
            data-focale-annotation={tone}
            aria-labelledby={titleId}
        >
            <span className={styles.tone}>{toneLabels[tone]}</span>
            <strong className={styles.title} id={titleId}>
                {title}
            </strong>
            <div className={styles.body}>{children}</div>
            {provenance ? (
                <footer className={styles.provenance}>{provenance}</footer>
            ) : null}
        </aside>
    );
}
