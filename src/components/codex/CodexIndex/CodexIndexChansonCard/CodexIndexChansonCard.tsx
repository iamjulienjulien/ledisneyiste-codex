import { CodexCommonIdentite } from "@/components/codex/CodexCommon/CodexCommonIdentite";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import styles from "./CodexIndexChansonCard.module.css";
import type { CodexIndexChansonCardProps } from "./CodexIndexChansonCard.types";

const roleLabels = {
    composition: "composition",
    paroles: "paroles",
    traduction: "traduction",
    "adaptation-lyrique": "adaptation lyrique",
} as const;

export function CodexIndexChansonCard({
    chanson,
    fiche,
    identite,
}: CodexIndexChansonCardProps) {
    return (
        <PixieCard
            asChild
            variant="accent"
            color="rose-aerographe"
            padding="md"
            effect="projector"
        >
            <PixieLink
                href={`/chansons/${chanson.slug}`}
                variant="surface"
                color="rose-aerographe"
                className={`${styles.root} group`}
            >
                <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                        <PixieBadge
                            variant="soft"
                            size="xs"
                            shape="pill"
                            color="rose-aerographe"
                        >
                            {chanson.oeuvreOrigine.nom}
                        </PixieBadge>
                        <CodexCommonIdentite
                            identite={identite}
                            niveau="h2"
                            presence="card"
                            className="mt-5"
                        />
                    </div>

                    <PixieSymbol
                        registry="index"
                        collection="chansons"
                        slug="principal"
                        size="lg"
                    />
                </div>

                <p className="mt-4 leading-7 text-ink-soft">
                    {chanson.sousTitre}
                </p>

                <ul aria-label="Auteurs" className={styles.authors}>
                    {fiche.auteurs.map((auteur) => (
                        <li
                            key={`${auteur.personne.nom}-${auteur.roles.join("-")}`}
                            className="flex items-baseline justify-between gap-4 text-sm"
                        >
                            <span className="text-ink">
                                {auteur.personne.nom}
                            </span>
                            <span className="text-muted">
                                {auteur.roles
                                    .map((role) => roleLabels[role])
                                    .join(", ")}
                            </span>
                        </li>
                    ))}
                </ul>

                <span className="mt-auto pt-8 text-sm font-medium text-[var(--atelier-animation-rose-aerographe)]">
                    Ouvrir la fiche →
                </span>
            </PixieLink>
        </PixieCard>
    );
}
