import { PixieCluster } from "@/components/ui/PixieCluster";
import { PixieContainer } from "@/components/ui/PixieContainer";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import styles from "./CodexLayoutFooter.module.css";
import type { CodexLayoutFooterProps } from "./CodexLayoutFooter.types";

export function CodexLayoutFooter({
    gutter = "md",
    className = "",
}: CodexLayoutFooterProps) {
    return (
        <footer
            aria-label="À propos du Codex"
            className={`${styles.root} ${className}`.trim()}
        >
            <PixieContainer
                width="72"
                gutter={gutter}
                className={styles.container}
            >
                <PixieSeparator
                    variant="fade"
                    intensity="subtle"
                    color="graphite"
                    spacing="none"
                    decorative
                />

                <PixieCluster
                    gap="md"
                    justify="between"
                    align="center"
                    className={styles.content}
                >
                    <p className={styles.disclaimer}>
                        Le Disneyiste est un projet éditorial personnel,
                        indépendant et non officiel.
                    </p>

                    <nav aria-label="Navigation de fin de page">
                        <PixieCluster
                            as="ul"
                            gap="md"
                            align="center"
                            className={styles.links}
                        >
                            <li>
                                <PixieLink
                                    href="/"
                                    variant="action"
                                    indicator="back"
                                >
                                    Revenir au Codex
                                </PixieLink>
                            </li>

                            <li>
                                <PixieLink
                                    href="/recherche"
                                    variant="action"
                                    indicator="arrow"
                                >
                                    Rechercher
                                </PixieLink>
                            </li>

                            <li>
                                <PixieLink
                                    href="https://julienjulien.fr"
                                    target="_blank"
                                    rel="noreferrer"
                                    variant="action"
                                    indicator="external"
                                >
                                    Julien Julien
                                </PixieLink>
                            </li>
                        </PixieCluster>
                    </nav>
                </PixieCluster>
            </PixieContainer>
        </footer>
    );
}
