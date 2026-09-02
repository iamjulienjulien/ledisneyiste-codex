import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodexFiche } from "@/components/codex/CodexFiche/CodexFiche";
import { CodexFicheChansonDetails } from "@/components/codex/CodexFiche/CodexFicheChansonDetails";
import { CodexFicheHeader } from "@/components/codex/CodexFiche/CodexFicheHeader";
import { CodexFicheRelations } from "@/components/codex/CodexFiche/CodexFicheRelations";
import { CodexFicheReperes } from "@/components/codex/CodexFiche/CodexFicheReperes";
import { CodexFicheSources } from "@/components/codex/CodexFiche/CodexFicheSources";
import { CodexCommonReferenceLink } from "@/components/codex/CodexCommon/CodexCommonReferenceLink";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { getFicheChansonBySlug } from "@/data/chansons";
import { chansons, getChansonBySlug } from "@/data/catalogues";
import { getSourcesByIds } from "@/data/sources";
import { formatDateHistorique } from "@/lib/date";
import { resoudreIdentiteCodex } from "@/lib/identites/server";
import { getFicheSourceIds } from "@/lib/source";
import type { ReferenceCodex } from "@/types/reference";

export const dynamicParams = false;

export function generateStaticParams() {
    return chansons.map((chanson) => ({ slug: chanson.slug }));
}

export async function generateMetadata({
    params,
}: PageProps<"/chansons/[slug]">): Promise<Metadata> {
    const { slug } = await params;
    const chanson = getChansonBySlug(slug);

    return chanson
        ? { title: chanson.nom, description: chanson.sousTitre }
        : {};
}

export default async function ChansonPage({
    params,
}: PageProps<"/chansons/[slug]">) {
    const { slug } = await params;
    const chanson = getChansonBySlug(slug);
    const fiche = getFicheChansonBySlug(slug);
    const identite = resoudreIdentiteCodex("chansons", slug);

    if (!chanson || !fiche || !identite) {
        notFound();
    }

    const sources = getSourcesByIds(getFicheSourceIds(fiche));
    const versionOriginale = fiche.versions.find(
        (version) => version.nature === "originale",
    );
    const auteursPublies = fiche.auteurs
        .map((auteur) => auteur.personne)
        .filter(
            (
                reference,
            ): reference is ReferenceCodex & { type: "contributeur" } =>
                reference.type === "contributeur",
        );
    const oeuvrePubliee =
        fiche.oeuvreOrigine.type === "oeuvre" ? [fiche.oeuvreOrigine] : [];

    return (
        <CodexFiche family="chansons">
            <CodexFicheHeader
                family="chansons"
                eyebrow="Chanson"
                identite={identite}
                sousTitre={chanson.sousTitre}
                introduction={fiche.introduction}
                badges={
                    <PixieBadge
                        variant="soft"
                        size="sm"
                        shape="pill"
                        color="rose-aerographe"
                    >
                        {chanson.oeuvreOrigine.nom}
                    </PixieBadge>
                }
            />

            <CodexFicheReperes
                reperes={[
                    {
                        label: "Œuvre d’origine",
                        value:
                            fiche.oeuvreOrigine.type === "oeuvre" ? (
                                <CodexCommonReferenceLink
                                    reference={fiche.oeuvreOrigine}
                                />
                            ) : (
                                fiche.oeuvreOrigine.nom
                            ),
                    },
                    ...(versionOriginale?.date
                        ? [
                              {
                                  label: "Première version",
                                  value: formatDateHistorique(
                                      versionOriginale.date,
                                  ),
                              },
                          ]
                        : []),
                    {
                        label: "Auteurs",
                        value: fiche.auteurs
                            .map((auteur) => auteur.personne.nom)
                            .join(", "),
                        width: "full",
                    },
                ]}
            />

            <CodexFicheChansonDetails fiche={fiche} sources={sources} />

            <CodexFicheRelations
                groupes={[
                    {
                        family: "oeuvres",
                        titre: "Œuvres",
                        references: oeuvrePubliee,
                    },
                    {
                        family: "createurs",
                        titre: "Créateurs",
                        references: auteursPublies,
                    },
                ]}
            />

            <CodexFicheSources sources={sources} />
        </CodexFiche>
    );
}
