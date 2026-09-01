import { CodexCommonIdentite } from "@/components/codex/CodexCommon/CodexCommonIdentite";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import styles from "./CodexFicheHeader.module.css";
import type { CodexFicheHeaderProps } from "./CodexFicheHeader.types";

export function CodexFicheHeader({
    family,
    identite,
    eyebrow,
    sousTitre,
    introduction,
    badges,
}: CodexFicheHeaderProps) {
    return (
        <header className={styles.root}>
            <div className={styles.heading}>
                <div className={styles.symbol}>
                    <PixieSymbol
                        registry="index"
                        collection={family}
                        slug="principal"
                        size={72}
                    />
                </div>

                <div className={styles.identity}>
                    <p className={styles.eyebrow}>{eyebrow}</p>

                    <CodexCommonIdentite
                        identite={identite}
                        niveau="h1"
                        presence="hero"
                        className="mt-3"
                    />

                    {sousTitre && (
                        <p className="mt-3 text-xl leading-8 text-ink-soft">
                            {sousTitre}
                        </p>
                    )}

                    {badges ? (
                        <div className={styles.badges}>{badges}</div>
                    ) : null}
                </div>
            </div>

            {introduction && (
                <div className={styles.introduction}>
                    <p className="text-lg leading-8 text-ink sm:text-xl sm:leading-9">
                        {introduction}
                    </p>
                </div>
            )}
        </header>
    );
}
