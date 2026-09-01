import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPersonnageBySlug, personnages } from "@/data/catalogues";
import { getFichePersonnageBySlug } from "@/data/personnages";
import { getSourcesByIds } from "@/data/sources";
import { getOeuvresAvecPersonnage } from "@/data/relations";
import { CodexFiche } from "@/components/codex/CodexFiche/CodexFiche";
import { CodexFicheHeader } from "@/components/codex/CodexFiche/CodexFicheHeader";
import { CodexFicheReperes } from "@/components/codex/CodexFiche/CodexFicheReperes";
import { CodexCommonReferenceLink } from "@/components/codex/CodexCommon/CodexCommonReferenceLink";
import { CodexFicheSources } from "@/components/codex/CodexFiche/CodexFicheSources";
import { CodexFicheRelations } from "@/components/codex/CodexFiche/CodexFicheRelations";
import { CodexFicheBlocsEditoriaux } from "@/components/codex/CodexFiche/CodexFicheBlocsEditoriaux";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { getEpoquePourDate } from "@/data/epoques/relations";
import { formatDateHistorique } from "@/lib/date";
import { resoudreIdentiteCodex } from "@/lib/identites/server";
import { getFicheSourceIds } from "@/lib/source";

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
    const identite = resoudreIdentiteCodex("personnages", slug);

    if (!personnage || !fiche || !identite) {
        notFound();
    }

    const sources = getSourcesByIds(getFicheSourceIds(fiche));
    const oeuvres = getOeuvresAvecPersonnage(slug);
    const epoque = getEpoquePourDate(fiche.premiereApparition.date);

    return (
        <CodexFiche family="personnages">
            <CodexFicheHeader
                family="personnages"
                eyebrow="Personnage"
                identite={identite}
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

            <CodexFicheReperes
                reperes={[
                    {
                        label: "Espèce",
                        value: fiche.espece,
                    },
                    {
                        label: "Création",
                        value: formatDateHistorique(fiche.creation.date),
                    },
                    {
                        label: "Créateurs",
                        value: (
                            <span className="flex flex-wrap gap-x-2">
                                {fiche.creation.createurs.map(
                                    (createur, index) => (
                                        <span key={createur.nom}>
                                            <CodexCommonReferenceLink
                                                reference={createur}
                                            />
                                            {index <
                                                fiche.creation.createurs
                                                    .length -
                                                    1 && ","}
                                        </span>
                                    ),
                                )}
                            </span>
                        ),
                    },
                    {
                        label: "Première apparition",
                        value: (
                            <>
                                <CodexCommonReferenceLink
                                    reference={fiche.premiereApparition.oeuvre}
                                />
                                {" · "}
                                {formatDateHistorique(
                                    fiche.premiereApparition.date,
                                )}
                            </>
                        ),
                    },
                    ...(epoque
                        ? [
                              {
                                  label: "Époque",
                                  value: (
                                      <CodexCommonReferenceLink
                                          reference={epoque}
                                      />
                                  ),
                              },
                          ]
                        : []),
                ]}
            />

            <CodexFicheBlocsEditoriaux
                collection="personnages"
                blocs={fiche.blocsEditoriaux}
                sources={sources}
            />

            <CodexFicheRelations
                groupes={[
                    {
                        family: "oeuvres",
                        titre: "Œuvres",
                        references: oeuvres,
                    },
                ]}
            />

            <CodexFicheSources sources={sources} />
        </CodexFiche>
    );
}
