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
import { CodexFicheRelations } from "@/components/codex/CodexFiche/CodexFicheRelations";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { getEpoquePourDate } from "@/data/epoques/relations";
import { getOeuvreBySlug, oeuvres } from "@/data/catalogues";
import { getFicheOeuvreBySlug } from "@/data/oeuvres";
import { getRecompensesPourOeuvre } from "@/data/recompenses/relations";
import { getSourcesByIds } from "@/data/sources";
import { formatDateHistorique } from "@/lib/date";
import { codexPlanArchives, deriveGeneriqueVivant } from "@/lib/plans";
import { resoudreIdentiteCodex } from "@/lib/identites/server";
import { getFicheSourceIds } from "@/lib/source";
import { getChansonsPourOeuvre } from "@/data/relations";
import {
    creerRegistreOeuvresSources,
    resoudreOeuvreSource,
} from "@/lib/oeuvres-sources";
import { fichesOeuvresSources } from "@/registry/oeuvres-sources";
import type { CodexPlanConfiguration } from "@/types/codex-plans";

export const dynamicParams = false;

const registreOeuvresSources =
    creerRegistreOeuvresSources(fichesOeuvresSources);
const generiqueVivantConfiguration = {
    plan: "generique-vivant",
    subject: {
        family: "oeuvres",
        slug: "pinocchio",
    },
    angle: "departments",
    objective: "understand",
    frame: {
        label: "Le générique humain de Pinocchio",
        description:
            "Lire les contributions documentées par domaines sans leur attribuer de hiérarchie ni de valeur.",
    },
    matter: { kind: "archives" },
} as const satisfies CodexPlanConfiguration;

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
    const identite = resoudreIdentiteCodex("oeuvres", slug);

    if (!oeuvre || !identite) {
        return {};
    }

    return {
        title: identite.principale.libelle,
        description:
            oeuvre.sousTitre ||
            `Découvrir ${identite.principale.libelle} dans Le Codex du Disneyiste.`,
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
    const identite = resoudreIdentiteCodex("oeuvres", slug);

    if (!oeuvre || !fiche || !identite) {
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
    const chansons = getChansonsPourOeuvre(slug);
    const oeuvresSources = (fiche.relationsOeuvres ?? []).flatMap((relation) =>
        relation.oeuvre.type === "oeuvre-source"
            ? [resoudreOeuvreSource(relation.oeuvre, registreOeuvresSources)]
            : [],
    );
    const generiqueVivant =
        slug === "pinocchio"
            ? deriveGeneriqueVivant(generiqueVivantConfiguration, {
                  kind: "archives",
                  archives: codexPlanArchives,
              })
            : undefined;

    return (
        <CodexFiche family="oeuvres">
            <CodexFicheHeader
                family="oeuvres"
                eyebrow="Œuvre"
                identite={identite}
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

            <CodexFicheOeuvreDetails
                fiche={fiche}
                sources={sources}
                oeuvresSources={oeuvresSources}
                generiqueVivant={generiqueVivant}
            />

            <CodexFicheRecompenses recompenses={recompenses} />

            <CodexFicheRelations
                groupes={[
                    {
                        family: "chansons",
                        titre: "Chansons",
                        references: chansons,
                    },
                ]}
            />

            <CodexFicheBlocsEditoriaux
                collection="oeuvres"
                blocs={fiche.blocsEditoriaux}
                sources={sources}
                withEvidenceMap={fiche.slug === "pinocchio"}
            />

            <CodexFicheSources sources={sources} />
        </CodexFiche>
    );
}
