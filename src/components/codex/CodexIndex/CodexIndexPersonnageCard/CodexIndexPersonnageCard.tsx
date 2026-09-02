import { CodexCommonIdentite } from "@/components/codex/CodexCommon/CodexCommonIdentite";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { formatDateHistorique } from "@/lib/date";
import { construireRouteCanoniqueCodex } from "@/lib/navigation/routes-codex";
import styles from "./CodexIndexPersonnageCard.module.css";
import type { CodexIndexPersonnageCardProps } from "./CodexIndexPersonnageCard.types";

export function CodexIndexPersonnageCard({
    personnage,
    fiche,
    identite,
}: CodexIndexPersonnageCardProps) {
    return (
        <PixieCard
            asChild
            variant="accent"
            color="rouge-crayon"
            padding="md"
            effect="projector"
        >
            <PixieLink
                href={construireRouteCanoniqueCodex(
                    "personnages",
                    personnage.slug,
                )}
                variant="surface"
                color="rouge-crayon"
                className={`${styles.root} group`}
            >
                <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                        <ul
                            aria-label="Catégories"
                            className="flex flex-wrap gap-2"
                        >
                            {personnage.metadata.categories.map((category) => (
                                <li key={category}>
                                    <PixieBadge
                                        registry="personnages"
                                        collection="categories"
                                        slug={category}
                                        size="xs"
                                        shape="pill"
                                    />
                                </li>
                            ))}
                        </ul>

                        <CodexCommonIdentite
                            identite={identite}
                            niveau="h2"
                            presence="card"
                            className="mt-5"
                            titleClassName="transition-colors group-hover:text-famille-personnages group-focus-visible:text-famille-personnages"
                        />
                    </div>

                    <PixieSymbol
                        registry="index"
                        collection="personnages"
                        slug="principal"
                        size="lg"
                    />
                </div>

                <p className="mt-3 leading-7 text-ink-soft">
                    {personnage.sousTitre}
                </p>

                <div className="mt-8 mb-5">
                    <PixieSeparator
                        variant="fade"
                        color="rouge-crayon"
                        position="start"
                        spacing="none"
                        decorative
                    />
                </div>

                <dl className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <dt className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                            Espèce
                        </dt>
                        <dd className="mt-2 text-sm text-ink">
                            {fiche.espece}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                            Première apparition
                        </dt>
                        <dd className="mt-2 text-sm leading-6 text-ink">
                            {fiche.premiereApparition.oeuvre.nom}
                            <span className="block text-muted">
                                {formatDateHistorique(
                                    fiche.premiereApparition.date,
                                )}
                            </span>
                        </dd>
                    </div>
                </dl>

                <span className="mt-auto pt-8 text-sm font-medium text-famille-personnages">
                    Ouvrir la fiche →
                </span>
            </PixieLink>
        </PixieCard>
    );
}
