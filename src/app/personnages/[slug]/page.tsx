import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPersonnageBySlug, personnages } from "@/data/catalogues";
import { getFichePersonnageBySlug } from "@/data/personnages";
import { getSourcesByIds } from "@/data/sources";
import { getOeuvresAvecPersonnage } from "@/data/relations";
import { CodexFiche } from "@/components/codex/CodexFiche";
import { CodexFicheHeader } from "@/components/codex/CodexFicheHeader";
import { CodexReferenceLink } from "@/components/codex/CodexReferenceLink";
import { CodexSources } from "@/components/codex/CodexSources";
import { CodexRelations } from "@/components/codex/CodexRelations";
import { CodexEpoque } from "@/components/codex/CodexEpoque";
import { CodexBlocsEditoriaux } from "@/components/codex/CodexBlocsEditoriaux";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { getEpoquePourDate } from "@/data/epoques/relations";
import { formatDateHistorique } from "@/lib/date";

export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const personnage = getPersonnageBySlug(slug);

    if (!personnage) {
        return {};
    }

    return {
        title: personnage.nom,
        description:
            personnage.sousTitre ||
            `Découvrir ${personnage.nom} dans Le Codex du Disneyiste.`,
    };
}

export function generateStaticParams() {
    return personnages.map((personnage) => ({
        slug: personnage.slug,
    }));
}

export default async function PersonnagePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const personnage = getPersonnageBySlug(slug);
    const fiche = getFichePersonnageBySlug(slug);

    if (!personnage || !fiche) {
        notFound();
    }

    const sources = getSourcesByIds(fiche.sources);
    const oeuvres = getOeuvresAvecPersonnage(slug);
    const epoque = getEpoquePourDate(fiche.premiereApparition.date);

    return (
        <CodexFiche family="personnages">
            <CodexFicheHeader
                family="personnages"
                eyebrow="Personnage"
                titre={personnage.nom}
                sousTitre={personnage.sousTitre}
                introduction={fiche.introduction}
                badges={
                    <ul
                        aria-label="Métadonnées du personnage"
                        className="flex flex-wrap gap-2"
                    >
                        {personnage.metadata.categories.map((category) => (
                            <li key={category}>
                                <PixieBadge
                                    registry="personnages"
                                    collection="categories"
                                    slug={category}
                                    size="sm"
                                    shape="pill"
                                />
                            </li>
                        ))}
                    </ul>
                }
            />

            <dl className="mt-12 grid gap-8 sm:grid-cols-2">
                <div>
                    <dt className="text-sm text-muted">Espèce</dt>
                    <dd className="mt-1 text-lg">{fiche.espece}</dd>
                </div>

                <div>
                    <dt className="text-sm text-muted">Création</dt>
                    <dd className="mt-1 text-lg">
                        {formatDateHistorique(fiche.creation.date)}
                    </dd>
                </div>

                <div>
                    <dt className="text-sm text-muted">Créateurs</dt>

                    <dd className="mt-1 flex flex-wrap gap-x-2 text-lg text-ink">
                        {fiche.creation.createurs.map((createur, index) => (
                            <span key={createur.nom}>
                                <CodexReferenceLink reference={createur} />
                                {index < fiche.creation.createurs.length - 1 &&
                                    ","}
                            </span>
                        ))}
                    </dd>
                </div>

                <div>
                    <dt className="text-sm text-muted">Première apparition</dt>

                    <dd className="mt-1 text-lg text-ink">
                        <CodexReferenceLink
                            reference={fiche.premiereApparition.oeuvre}
                        />
                        {" · "}
                        {formatDateHistorique(fiche.premiereApparition.date)}
                    </dd>
                </div>

                <CodexEpoque epoque={epoque} />
            </dl>

            <CodexBlocsEditoriaux
                collection="personnages"
                blocs={fiche.blocsEditoriaux}
            />

            <CodexRelations
                groupes={[
                    {
                        family: "oeuvres",
                        titre: "Œuvres",
                        references: oeuvres,
                    },
                ]}
            />

            <CodexSources sources={sources} />
        </CodexFiche>
    );
}
