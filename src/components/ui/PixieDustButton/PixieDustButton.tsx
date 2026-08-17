import type { ReactNode } from "react";
import styles from "./PixieDustButton.module.css";

export type PixieDustButtonVariant = "principal" | "secondaire" | "discret";

export type PixieDustButtonSize = "petit" | "moyen" | "grand";

export type PixieDustButtonProps = Readonly<{
    children: ReactNode;
    variante?: PixieDustButtonVariant;
    taille?: PixieDustButtonSize;
    disabled?: boolean;
    miseAuPoint?: boolean;
}>;

export function PixieDustButton({
    children,
    variante = "principal",
    taille = "moyen",
    disabled = false,
    miseAuPoint = false,
}: PixieDustButtonProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            className={`${styles.root} ${styles[variante]} ${styles[taille]} ${miseAuPoint ? styles.miseAuPoint : ""}`}
        >
            {children}
        </button>
    );
}
