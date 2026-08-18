import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { formatDateHistorique } from "@/lib/date";
import type { CodexOeuvreCardProps } from "@/types/codex-cards";
import styles from "./CodexOeuvreCard.module.css";

export function CodexOeuvreCard({
    oeuvre,
    fiche,
    recompenses,
}: CodexOeuvreCardProps) {
    return (
        <PixieLink
            href={`/oeuvres/${oeuvre.slug}`}
            variant="surface"
            color="gouache"
            className={`${styles.root} group p-6 sm:p-7`}
        >
            <div className="flex items-start justify-between gap-5">
                <div className="min-w-0">
                    <PixieBadge
                        registry="oeuvres"
                        collection="collections"
                        slug={oeuvre.metadata.collection}
                        size="xs"
                        shape="pill"
                    />

                    <h2 className="mt-5 text-3xl text-ink transition-colors group-hover:text-famille-oeuvres group-focus-visible:text-famille-oeuvres">
                        {oeuvre.nom}
                    </h2>
                </div>

                <PixieSymbol
                    registry="codex"
                    collection="index"
                    slug="oeuvres"
                    size="lg"
                />
            </div>

            <p className="mt-3 leading-7 text-ink-soft">{oeuvre.sousTitre}</p>

            <div className="mt-8 mb-5">
                <PixieSeparator
                    variant="fade"
                    color="gouache"
                    position="start"
                    spacing="none"
                    decorative
                />
            </div>

            <dl className="grid gap-5 sm:grid-cols-2">
                <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                        Sortie
                    </dt>
                    <dd className="mt-2 text-sm text-ink">
                        {formatDateHistorique(fiche.sortie.date)}
                    </dd>
                </div>
                <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                        Format
                    </dt>
                    <dd className="mt-2 text-sm text-ink">{fiche.format}</dd>
                </div>
            </dl>

            <ul
                aria-label="Caractéristiques techniques"
                className="mt-5 flex flex-wrap gap-2"
            >
                <li>
                    <PixieBadge
                        registry="oeuvres"
                        collection="sons"
                        slug={oeuvre.metadata.son}
                        size="xs"
                        shape="pill"
                    />
                </li>
                <li>
                    <PixieBadge
                        registry="oeuvres"
                        collection="couleurs"
                        slug={oeuvre.metadata.couleur}
                        size="xs"
                        shape="pill"
                    />
                </li>
            </ul>

            {recompenses.length > 0 && (
                <div>
                    <div className={styles.recompensesBoundary}>
                        <PixieSeparator
                            variant="fade"
                            color="gouache"
                            position="start"
                            spacing="none"
                            decorative
                        />
                    </div>

                    <div className={styles.recompenses}>
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                            {recompenses.length}{" "}
                            {recompenses.length > 1
                                ? "récompenses"
                                : "récompense"}
                        </p>

                        <ul
                            aria-label="Récompenses obtenues"
                            className={styles.recompensesList}
                        >
                            {recompenses.map((recompense) => (
                                <li
                                    key={recompense.id}
                                    className={styles.recompense}
                                >
                                    <PixieSymbol
                                        registry="recompenses"
                                        collection="trophees"
                                        slug={recompense.trophee}
                                        size="sm"
                                    />

                                    <span className={styles.recompenseLabel}>
                                        {recompense.categorie ??
                                            recompense.motif}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <span className="mt-auto pt-8 text-sm font-medium text-famille-oeuvres">
                Ouvrir la fiche →
            </span>
        </PixieLink>
    );
}
