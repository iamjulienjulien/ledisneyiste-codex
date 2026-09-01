import { preparerAffichageIdentiteCodex } from "@/lib/identites/preparer-affichage-identite";
import styles from "./CodexCommonIdentite.module.css";
import type { CodexCommonIdentiteProps } from "./CodexCommonIdentite.types";

export function CodexCommonIdentite({
    identite,
    niveau,
    presence,
    className,
    titleClassName,
}: CodexCommonIdentiteProps) {
    const Heading = niveau;
    const affichage = preparerAffichageIdentiteCodex(identite);

    return (
        <div
            className={`${styles.root} ${className ?? ""}`.trim()}
            data-presence={presence}
        >
            <Heading
                lang={affichage.principale.langue ?? undefined}
                className={`${styles.title} ${titleClassName ?? ""}`.trim()}
            >
                {affichage.principale.libelle}
            </Heading>

            {affichage.originale ? (
                <p className={styles.originale}>
                    <span
                        lang={affichage.originale.langue ?? undefined}
                        className={styles.originaleValue}
                    >
                        {affichage.originale.libelle}
                    </span>
                    <span className={styles.originaleMeta}>
                        {affichage.originale.qualification}
                    </span>
                </p>
            ) : null}
        </div>
    );
}
