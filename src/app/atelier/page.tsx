import { PixieDustButtonDossier } from "./_components/PixieDustButtonDossier";
import { PixieBadgeDossier } from "./_components/PixieBadgeDossier";
import { PixieLinkDossier } from "./_components/PixieLinkDossier";
import { PixieDustSeparatorDossier } from "./_components/PixieDustSeparatorDossier";
import { PixieSymbolDossier } from "./_components/PixieSymbolDossier";
import { PalettesPellicule } from "./_components/PalettesPellicule";

const categories = [
    {
        numero: "01",
        nom: "La Pellicule",
        domaine: "Fondations",
        description:
            "Couleurs, typographies, formes et rythmes qui donnent sa matière à la Projection Originale.",
        statut: "En projection",
        href: "#pellicule",
    },
    {
        numero: "02",
        nom: "Les Accessoires",
        domaine: "Primitives",
        description:
            "Les éléments simples et réutilisables qui entreront bientôt dans toutes les scènes du Codex.",
        statut: "En projection",
        href: "#accessoires",
    },
    {
        numero: "03",
        nom: "Les Décors",
        domaine: "Surfaces",
        description:
            "Cartes, panneaux et cadres qui organisent les espaces éditoriaux.",
        statut: "Hors champ",
        href: null,
    },
    {
        numero: "04",
        nom: "Les Dialogues",
        domaine: "Formulaires",
        description:
            "Champs, choix et contrôles par lesquels le public répond au Codex.",
        statut: "Hors champ",
        href: null,
    },
    {
        numero: "05",
        nom: "Le Montage",
        domaine: "Composition",
        description:
            "Assemblages et rythmes qui transforment les éléments isolés en séquences lisibles.",
        statut: "Hors champ",
        href: null,
    },
    {
        numero: "06",
        nom: "Les Effets",
        domaine: "Retours système",
        description:
            "États, alertes et transitions qui rendent visibles les réactions de l’interface.",
        statut: "Hors champ",
        href: null,
    },
] as const;

const accessoires = [
    {
        nom: "PixieSymbol",
        role: "Projeter un symbole du registre",
        statut: "Prêt à projeter",
        href: "#pixie-symbol",
    },
    {
        nom: "PixieDustButton",
        role: "Déclencher une action",
        statut: "Esquisse",
        href: "#bouton",
    },
    {
        nom: "PixieLink",
        role: "Conduire vers une autre scène",
        statut: "Prêt à projeter",
        href: "#lien",
    },
    {
        nom: "PixieBadge",
        role: "Qualifier une information brève",
        statut: "Prêt à projeter",
        href: "#cartouche",
    },
    {
        nom: "PixieDustSeparator",
        role: "Marquer un changement de séquence",
        statut: "Esquisse",
        href: "#separateur",
    },
] as const;

export default function AtelierPage() {
    return (
        <div className="py-12 sm:py-16">
            <section aria-labelledby="atelier-introduction">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
                    Note d’intention
                </p>

                <h1
                    id="atelier-introduction"
                    className="mt-3 max-w-4xl text-4xl text-ink sm:text-6xl"
                >
                    Mettre chaque détail à l’épreuve avant la première
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-soft">
                    L’Atelier rassemble les fondations et les composants du
                    Codex dans un espace de répétition. Chaque élément pourra y
                    être observé seul, essayé dans ses différents états puis
                    documenté avant d’entrer dans l’interface publique.
                </p>
            </section>

            <section
                id="programme"
                aria-labelledby="programme-title"
                className="mt-20 scroll-mt-8"
            >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
                            Programme
                        </p>
                        <h2
                            id="programme-title"
                            className="mt-3 text-3xl text-ink"
                        >
                            Les six plateaux de travail
                        </h2>
                    </div>

                    <p className="text-sm text-muted">
                        2 plateaux ouverts · 4 à venir
                    </p>
                </div>

                <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
                    {categories.map((categorie) => {
                        const contenu = (
                            <>
                                <div className="flex items-start justify-between gap-6">
                                    <p className="font-mono text-xs text-muted">
                                        {categorie.numero}
                                    </p>
                                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                                        {categorie.statut}
                                    </p>
                                </div>

                                <h3 className="mt-8 text-2xl text-ink">
                                    {categorie.nom}
                                </h3>
                                <p className="mt-1 text-sm font-medium text-accent">
                                    {categorie.domaine}
                                </p>
                                <p className="mt-4 leading-7 text-ink-soft">
                                    {categorie.description}
                                </p>
                            </>
                        );

                        return categorie.href ? (
                            <a
                                key={categorie.numero}
                                href={categorie.href}
                                className="group bg-surface p-6 transition-colors hover:bg-surface-muted"
                            >
                                {contenu}
                                <p className="mt-8 text-sm font-medium text-accent group-hover:text-accent-hover">
                                    Entrer sur le plateau →
                                </p>
                            </a>
                        ) : (
                            <article
                                key={categorie.numero}
                                className="bg-surface p-6 opacity-60"
                            >
                                {contenu}
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                id="pellicule"
                aria-labelledby="pellicule-title"
                className="mt-24 scroll-mt-8 border-t border-line pt-12"
            >
                <div className="max-w-3xl">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                        01 · La Pellicule
                    </p>
                    <h2 id="pellicule-title" className="mt-3 text-4xl text-ink">
                        Les voix qui donnent corps à ce qui est projeté
                    </h2>
                    <p className="mt-5 leading-7 text-ink-soft">
                        Deux typographies se partagent le travail. La
                        typographie d’affiche ouvre les séquences et installe
                        leur ton ; la typographie de lecture accompagne les
                        archives, leurs relations et leurs récits.
                    </p>
                </div>

                <PalettesPellicule />
            </section>

            <section
                id="accessoires"
                aria-labelledby="accessoires-title"
                className="mt-24 scroll-mt-8 border-t border-line pt-12"
            >
                <div className="max-w-3xl">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                        02 · Les Accessoires
                    </p>
                    <h2
                        id="accessoires-title"
                        className="mt-3 text-4xl text-ink"
                    >
                        Les premières primitives passent devant la caméra
                    </h2>
                    <p className="mt-5 leading-7 text-ink-soft">
                        Le premier composant est prêt à projeter tandis que les
                        suivants poursuivent leurs essais. Chaque clap ouvre une
                        fiche complète avec ses états, sa régie et son générique
                        technique.
                    </p>
                </div>

                <div className="mt-10 overflow-x-auto border border-line">
                    <table className="w-full min-w-xl border-collapse text-left">
                        <thead className="bg-surface-muted text-xs uppercase tracking-[0.16em] text-muted">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Accessoire
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Rôle
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    État
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line bg-surface">
                            {accessoires.map((accessoire) => (
                                <tr key={accessoire.nom}>
                                    <th
                                        scope="row"
                                        className="px-5 py-4 font-medium text-ink"
                                    >
                                        <a
                                            href={accessoire.href}
                                            className="text-accent underline underline-offset-4 hover:text-accent-hover"
                                        >
                                            {accessoire.nom} →
                                        </a>
                                    </th>
                                    <td className="px-5 py-4 text-ink-soft">
                                        {accessoire.role}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-muted">
                                        {accessoire.statut}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <PixieSymbolDossier />
                <PixieDustButtonDossier />
                <PixieLinkDossier />
                <PixieBadgeDossier />
                <PixieDustSeparatorDossier />
            </section>
        </div>
    );
}
