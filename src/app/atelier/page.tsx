import { BoutonDossier } from "./_components/BoutonDossier";

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
        statut: "Plateau prêt",
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

const couleurs = [
    {
        nom: "Canvas",
        token: "bg-canvas",
        classe: "bg-canvas",
        usage: "Fond général",
    },
    {
        nom: "Surface",
        token: "bg-surface",
        classe: "bg-surface",
        usage: "Premier niveau",
    },
    {
        nom: "Surface muted",
        token: "bg-surface-muted",
        classe: "bg-surface-muted",
        usage: "Second niveau",
    },
    {
        nom: "Ink",
        token: "text-ink",
        classe: "bg-ink",
        usage: "Texte principal",
    },
    {
        nom: "Ink soft",
        token: "text-ink-soft",
        classe: "bg-ink-soft",
        usage: "Texte courant",
    },
    {
        nom: "Muted",
        token: "text-muted",
        classe: "bg-muted",
        usage: "Information discrète",
    },
    {
        nom: "Accent",
        token: "text-accent",
        classe: "bg-accent",
        usage: "Action et repère",
    },
    {
        nom: "Line",
        token: "border-line",
        classe: "bg-line",
        usage: "Séparation",
    },
] as const;

const accessoires = [
    {
        nom: "Bouton",
        role: "Déclencher une action",
        statut: "Esquisse",
    },
    {
        nom: "Lien",
        role: "Conduire vers une autre scène",
        statut: "À inventorier",
    },
    {
        nom: "Cartouche",
        role: "Qualifier une information brève",
        statut: "À inventorier",
    },
    {
        nom: "Séparateur",
        role: "Marquer un changement de séquence",
        statut: "À inventorier",
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
                        Les fondations de la Projection Originale
                    </h2>
                    <p className="mt-5 leading-7 text-ink-soft">
                        Ces tokens sémantiques forment le contrat entre la
                        projection et l’interface. Les futurs composants les
                        utiliseront sans dépendre directement de leurs valeurs.
                    </p>
                </div>

                <div className="mt-10">
                    <h3 className="text-2xl text-ink">Lumières et encres</h3>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {couleurs.map((couleur) => (
                            <article
                                key={couleur.nom}
                                className="border border-line bg-surface p-4"
                            >
                                <div
                                    aria-hidden="true"
                                    className={`h-20 border border-line ${couleur.classe}`}
                                />
                                <h4 className="mt-4 text-lg text-ink">
                                    {couleur.nom}
                                </h4>
                                <p className="mt-1 font-mono text-xs text-accent">
                                    {couleur.token}
                                </p>
                                <p className="mt-3 text-sm text-muted">
                                    {couleur.usage}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                    <article className="border border-line bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                            Typographie d’affiche
                        </p>
                        <p className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                            Il était une fois…
                        </p>
                        <p className="mt-5 font-mono text-xs text-accent">
                            font-display
                        </p>
                    </article>

                    <article className="border border-line bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                            Typographie de lecture
                        </p>
                        <p className="mt-5 max-w-lg text-lg leading-8 text-ink-soft">
                            Une voix claire et posée accompagne les archives,
                            leurs relations et les récits qui les traversent.
                        </p>
                        <p className="mt-5 font-mono text-xs text-accent">
                            font-sans
                        </p>
                    </article>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                    {[
                        ["Petit", "rounded-small"],
                        ["Moyen", "rounded-medium"],
                        ["Grand", "rounded-large"],
                    ].map(([nom, classe]) => (
                        <article
                            key={nom}
                            className={`border border-line bg-surface-muted p-6 ${classe}`}
                        >
                            <p className="text-lg font-medium text-ink">
                                {nom}
                            </p>
                            <p className="mt-2 font-mono text-xs text-accent">
                                {classe}
                            </p>
                        </article>
                    ))}
                </div>
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
                        Le plateau attend ses premières primitives
                    </h2>
                    <p className="mt-5 leading-7 text-ink-soft">
                        Aucun composant n’est encore déclaré prêt. Le premier
                        clap ouvrira une fiche complète avec ses essais, ses
                        états, sa régie et son générique technique.
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
                                    Rôle pressenti
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
                                        {accessoire.nom === "Bouton" ? (
                                            <a
                                                href="#bouton"
                                                className="text-accent underline underline-offset-4 hover:text-accent-hover"
                                            >
                                                {accessoire.nom} →
                                            </a>
                                        ) : (
                                            accessoire.nom
                                        )}
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

                <BoutonDossier />
            </section>
        </div>
    );
}
