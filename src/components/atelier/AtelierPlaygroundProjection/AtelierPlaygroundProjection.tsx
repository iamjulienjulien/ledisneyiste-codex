import type { AtelierPlaygroundProjectionProps } from "./AtelierPlaygroundProjection.types";
import styles from "./AtelierPlaygroundProjection.module.css";

export function AtelierPlaygroundProjection({
    children,
    className,
}: AtelierPlaygroundProjectionProps) {
    return (
        <div className={[styles.root, className].filter(Boolean).join(" ")}>
            {children}
        </div>
    );
}
