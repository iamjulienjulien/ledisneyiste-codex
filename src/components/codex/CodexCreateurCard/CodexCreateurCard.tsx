import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { formatDateHistorique } from "@/lib/date";
import type { CodexCreateurCardProps } from "@/types/codex-cards";
import styles from "./CodexCreateurCard.module.css";

export function CodexCreateurCard({
    contributeur,
    fiche,
    epoques,
    recompenses,
}: CodexCreateurCardProps) {
    return (
        <PixieCard
            asChild
            variant="accent"
            color="jaune-lampe"
            padding="md"
            effect="projector"
        >
            <PixieLink
                href={`/contributeurs/${contributeur.slug}`}
                variant="surface"
                color="jaune-lampe"
                className={`${styles.root} group`}
            >
                <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                        <ul
                            aria-label="Catégories"
                            className="flex flex-wrap gap-2"
                        >
                            {contributeur.metadata.categories.map(
                                (category) => (
                                    <li key={category}>
                                        <PixieBadge
                                            registry="contributeurs"
                                            collection="categories"
                                            slug={category}
                                            size="xs"
                                            shape="pill"
                                        />
                                    </li>
                                ),
                            )}
                        </ul>

                        <h2 className="mt-5 text-3xl text-ink transition-colors group-hover:text-famille-createurs group-focus-visible:text-famille-createurs">
                            {contributeur.nom}
                        </h2>
                    </div>

                    <PixieSymbol
                        registry="index"
                        collection="createurs"
                        slug="principal"
                        size="lg"
                    />
                </div>

                <p className="mt-3 leading-7 text-ink-soft">
                    {contributeur.sousTitre}
                </p>

                <div className="mt-8 mb-5">
                    <PixieSeparator
                        variant="fade"
                        color="jaune-lampe"
                        position="start"
                        spacing="none"
                        decorative
                    />
                </div>

                <dl className="space-y-5">
                    <div>
                        <dt className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                            Rôles
                        </dt>
                        <dd className="mt-2 text-sm leading-6 text-ink">
                            {fiche.roles.join(", ")}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                            Période d’activité
                        </dt>
                        <dd className="mt-2 text-sm leading-6 text-ink">
                            {fiche.periodesActivite.map((periode) => (
                                <span
                                    key={periode.debut.valeur}
                                    className="block"
                                >
                                    {formatDateHistorique(periode.debut)}
                                    {"–"}
                                    {periode.fin
                                        ? formatDateHistorique(periode.fin)
                                        : "aujourd’hui"}
                                </span>
                            ))}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                            Époques traversées
                        </dt>
                        <dd className="mt-2 text-sm leading-6 text-ink">
                            {epoques.map((epoque) => epoque.nom).join(", ") ||
                                "—"}
                        </dd>
                    </div>
                </dl>

                {recompenses.length > 0 && (
                    <div className={styles.recompenses}>
                        <PixieSeparator
                            variant="fade"
                            color="jaune-lampe"
                            position="start"
                            spacing="none"
                            decorative
                        />

                        <p className={styles.recompensesTitle}>
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
                                    <span>
                                        {recompense.categorie ??
                                            recompense.motif}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <span className="mt-auto pt-8 text-sm font-medium text-famille-createurs">
                    Ouvrir la fiche →
                </span>
            </PixieLink>
        </PixieCard>
    );
}
