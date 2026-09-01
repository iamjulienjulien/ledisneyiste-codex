import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodexFiche } from "@/components/codex/CodexFiche/CodexFiche";
import { CodexFicheHeader } from "@/components/codex/CodexFiche/CodexFicheHeader";
import { CodexFicheReperes } from "@/components/codex/CodexFiche/CodexFicheReperes";
import { CodexCommonReferenceLink } from "@/components/codex/CodexCommon/CodexCommonReferenceLink";
import { CodexFicheSources } from "@/components/codex/CodexFiche/CodexFicheSources";
import { CodexFicheBlocsEditoriaux } from "@/components/codex/CodexFiche/CodexFicheBlocsEditoriaux";
import { CodexFicheRecompenses } from "@/components/codex/CodexFiche/CodexFicheRecompenses";
import { CodexFicheOeuvreDetails } from "@/components/codex/CodexFiche/CodexFicheOeuvreDetails";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { getEpoquePourDate } from "@/data/epoques/relations";
import { getOeuvreBySlug, oeuvres } from "@/data/catalogues";
import { getFicheOeuvreBySlug } from "@/data/oeuvres";
import { getRecompensesPourOeuvre } from "@/data/recompenses/relations";
import { getSourcesByIds } from "@/data/sources";
import { formatDateHistorique } from "@/lib/date";
import { getFicheSourceIds } from "@/lib/source";

export const dynamicParams = false;

export function generateStaticParams() {
    return oeuvres.map((oeuvre) => ({
        slug: oeuvre.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const oeuvre = getOeuvreBySlug(slug);

    if (!oeuvre) {
        return {};
    }

    return {
        title: oeuvre.nom,
        description:
            oeuvre.sousTitre ||
            `Découvrir ${oeuvre.nom} dans Le Codex du Disneyiste.`,
    };
}

export default async function OeuvrePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const oeuvre = getOeuvreBySlug(slug);
    const fiche = getFicheOeuvreBySlug(slug);

    if (!oeuvre || !fiche) {
        notFound();
    }

    const recompenses = getRecompensesPourOeuvre(slug);
    const sources = getSourcesByIds([
        ...new Set([
            ...getFicheSourceIds(fiche),
            ...recompenses.flatMap((recompense) => recompense.sources),
        ]),
    ]);
    const epoque = getEpoquePourDate(fiche.sortie.date);
    const hasGroupedCredits = fiche.contributions.some(
        (contribution) => contribution.domaine,
    );

    return (
        <CodexFiche family="oeuvres">
            <CodexFicheHeader
                family="oeuvres"
                eyebrow="Œuvre"
                titre={oeuvre.nom}
                sousTitre={oeuvre.sousTitre}
                introduction={fiche.introduction}
                badges={
                    <ul
                        aria-label="Métadonnées de l’œuvre"
                        className="flex flex-wrap gap-2"
                    >
                        <li>
                            <PixieBadge
                                registry="oeuvres"
                                collection="collections"
                                slug={oeuvre.metadata.collection}
                                size="sm"
                                shape="pill"
                            />
                        </li>
                        <li>
                            <PixieBadge
                                registry="oeuvres"
                                collection="types"
                                slug={oeuvre.metadata.type}
                                size="sm"
                                shape="pill"
                            />
                        </li>
                        <li>
                            <PixieBadge
                                registry="oeuvres"
                                collection="sons"
                                slug={oeuvre.metadata.son}
                                size="sm"
                                shape="pill"
                            />
                        </li>
                        <li>
                            <PixieBadge
                                registry="oeuvres"
                                collection="couleurs"
                                slug={oeuvre.metadata.couleur}
                                size="sm"
                                shape="pill"
                            />
                        </li>
                    </ul>
                }
            />

            <CodexFicheReperes
                reperes={[
                    {
                        label: "Sortie",
                        value: formatDateHistorique(fiche.sortie.date),
                    },
                    {
                        label: "Format",
                        value: fiche.format,
                    },
                    ...(!hasGroupedCredits
                        ? [
                              {
                                  label: "Contributions",
                                  value: (
                                      <div className="space-y-3">
                                          {fiche.contributions.map(
                                              (contribution) => (
                                                  <div
                                                      key={
                                                          contribution
                                                              .contributeur.nom
                                                      }
                                                  >
                                                      <CodexCommonReferenceLink
                                                          reference={
                                                              contribution.contributeur
                                                          }
                                                      />

                                                      <p className="mt-1 text-sm text-muted">
                                                          {contribution.roles.join(
                                                              ", ",
                                                          )}
                                                      </p>
                                                  </div>
                                              ),
                                          )}
                                      </div>
                                  ),
                              },
                          ]
                        : []),
                    {
                        label: "Personnages",
                        value: (
                            <span className="flex flex-wrap gap-x-2">
                                {fiche.personnages.map((personnage, index) => (
                                    <span key={personnage.nom}>
                                        <CodexCommonReferenceLink
                                            reference={personnage}
                                        />
                                        {index < fiche.personnages.length - 1 &&
                                            ","}
                                    </span>
                                ))}
                            </span>
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

            <CodexFicheOeuvreDetails fiche={fiche} sources={sources} />

            <CodexFicheRecompenses recompenses={recompenses} />

            <CodexFicheBlocsEditoriaux
                collection="oeuvres"
                blocs={fiche.blocsEditoriaux}
                sources={sources}
            />

            <CodexFicheSources sources={sources} />
        </CodexFiche>
    );
}
