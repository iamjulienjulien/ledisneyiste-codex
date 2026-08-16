import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPersonnageBySlug, personnages } from "@/data/catalogues";
import { getFichePersonnageBySlug } from "@/data/personnages";
import { getSourcesByIds } from "@/data/sources";
import { getOeuvresAvecPersonnage } from "@/data/relations";
import CodexFicheHeader from "@/components/codex/CodexFicheHeader";
import ReferenceCodexLink from "@/components/codex/ReferenceCodexLink";
import SourcesCodex from "@/components/codex/SourcesCodex";
import RelationsCodex from "@/components/codex/RelationsCodex";
import EpoqueCodex from "@/components/codex/EpoqueCodex";
import BlocsEditoriauxCodex from "@/components/codex/BlocsEditoriauxCodex";
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
        <main className="mx-auto w-full max-w-5xl px-6 py-16">
            <CodexFicheHeader
                eyebrow="Personnage"
                titre={personnage.nom}
                sousTitre={personnage.sousTitre}
                introduction={fiche.introduction}
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
                                <ReferenceCodexLink reference={createur} />
                                {index < fiche.creation.createurs.length - 1 &&
                                    ","}
                            </span>
                        ))}
                    </dd>
                </div>

                <div>
                    <dt className="text-sm text-muted">Première apparition</dt>

                    <dd className="mt-1 text-lg text-ink">
                        <ReferenceCodexLink
                            reference={fiche.premiereApparition.oeuvre}
                        />
                        {" · "}
                        {formatDateHistorique(fiche.premiereApparition.date)}
                    </dd>
                </div>

                <EpoqueCodex epoque={epoque} />
            </dl>

            <BlocsEditoriauxCodex blocs={fiche.blocsEditoriaux} />

            <RelationsCodex
                groupes={[
                    {
                        titre: "Œuvres",
                        references: oeuvres,
                    },
                ]}
            />

            <SourcesCodex sources={sources} />
        </main>
    );
}
