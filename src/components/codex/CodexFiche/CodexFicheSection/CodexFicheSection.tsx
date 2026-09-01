import { PixieSeparator } from "@/components/ui/PixieSeparator";
import { PixieSection } from "@/components/ui/PixieSection";
import { PixieStack } from "@/components/ui/PixieStack";
import styles from "./CodexFicheSection.module.css";
import type { CodexFicheSectionProps } from "./CodexFicheSection.types";

export function CodexFicheSection({
    eyebrow,
    titre,
    description,
    symbole,
    children,
}: CodexFicheSectionProps) {
    const hasHeader = Boolean(symbole || eyebrow || titre || description);

    return (
        <PixieSection
            width="full"
            gutter="none"
            spacingStart="lg"
            spacingEnd="none"
            gap="lg"
        >
            <PixieSeparator
                variant="beam"
                spacing="none"
                style={{
                    color: "var(--codex-fiche-color, var(--color-accent))",
                }}
                decorative
            />

            {hasHeader ? (
                <header
                    className={
                        symbole ? styles.headerWithSymbol : styles.header
                    }
                >
                    {symbole ? (
                        <div className={styles.symbol}>{symbole}</div>
                    ) : null}

                    <PixieStack gap={symbole ? "xs" : "sm"}>
                        {eyebrow ? (
                            <p className={styles.eyebrow}>{eyebrow}</p>
                        ) : null}

                        {titre ? (
                            <h2 className="text-3xl text-ink">{titre}</h2>
                        ) : null}

                        {description ? (
                            <p
                                className={`${styles.description} leading-7 text-ink-soft`}
                            >
                                {description}
                            </p>
                        ) : null}
                    </PixieStack>
                </header>
            ) : null}

            <div>{children}</div>
        </PixieSection>
    );
}
