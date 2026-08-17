type CouleurReference = {
    nom: string;
    token: `--${string}`;
    valeur: `#${string}`;
    encre: "claire" | "sombre";
};

const projectionSombre = [
    {
        nom: "Noir de salle",
        token: "--projection-originale-noir-de-salle",
        valeur: "#111018",
        encre: "claire",
    },
    {
        nom: "Ombre projetée",
        token: "--projection-originale-ombre-projetee",
        valeur: "#181621",
        encre: "claire",
    },
    {
        nom: "Pellicule",
        token: "--projection-originale-pellicule",
        valeur: "#201D29",
        encre: "claire",
    },
    {
        nom: "Perforation",
        token: "--projection-originale-perforation",
        valeur: "#302B3A",
        encre: "claire",
    },
    {
        nom: "Bobine",
        token: "--projection-originale-bobine",
        valeur: "#4B4359",
        encre: "claire",
    },
    {
        nom: "Argentique",
        token: "--projection-originale-argentique",
        valeur: "#91899B",
        encre: "sombre",
    },
    {
        nom: "Intertitre",
        token: "--projection-originale-intertitre",
        valeur: "#C9C2CE",
        encre: "sombre",
    },
    {
        nom: "Écran",
        token: "--projection-originale-ecran",
        valeur: "#F6F1E8",
        encre: "sombre",
    },
    {
        nom: "Lueur Technicolor",
        token: "--projection-originale-lueur-technicolor",
        valeur: "#B7A2DF",
        encre: "sombre",
    },
    {
        nom: "Halo Technicolor",
        token: "--projection-originale-halo-technicolor",
        valeur: "#D0C0EF",
        encre: "sombre",
    },
    {
        nom: "Bain violet",
        token: "--projection-originale-bain-violet",
        valeur: "#282137",
        encre: "claire",
    },
    {
        nom: "Contrechamp",
        token: "--projection-originale-contrechamp",
        valeur: "#16131D",
        encre: "claire",
    },
] as const satisfies readonly CouleurReference[];

const projectionClaire = [
    {
        nom: "Papier de projection",
        token: "--projection-originale-papier-projection",
        valeur: "#F7F4EE",
        encre: "sombre",
    },
    {
        nom: "Toile",
        token: "--projection-originale-toile",
        valeur: "#FFFDF8",
        encre: "sombre",
    },
    {
        nom: "Nitrate",
        token: "--projection-originale-nitrate",
        valeur: "#F0ECE5",
        encre: "sombre",
    },
    {
        nom: "Encre",
        token: "--projection-originale-encre",
        valeur: "#211E26",
        encre: "claire",
    },
    {
        nom: "Encre douce",
        token: "--projection-originale-encre-douce",
        valeur: "#5F5966",
        encre: "claire",
    },
    {
        nom: "Poussière",
        token: "--projection-originale-poussiere",
        valeur: "#857E8B",
        encre: "sombre",
    },
    {
        nom: "Filet",
        token: "--projection-originale-filet",
        valeur: "#DED8E1",
        encre: "sombre",
    },
    {
        nom: "Bobine claire",
        token: "--projection-originale-bobine-claire",
        valeur: "#C7BDCD",
        encre: "sombre",
    },
    {
        nom: "Violet générique",
        token: "--projection-originale-violet-generique",
        valeur: "#51446F",
        encre: "claire",
    },
    {
        nom: "Violet profond",
        token: "--projection-originale-violet-generique-profond",
        valeur: "#403657",
        encre: "claire",
    },
    {
        nom: "Lavande diffuse",
        token: "--projection-originale-lavande-diffuse",
        valeur: "#EDE8F3",
        encre: "sombre",
    },
    {
        nom: "Carton lumière",
        token: "--projection-originale-carton-lumiere",
        valeur: "#FFFAF2",
        encre: "sombre",
    },
    {
        nom: "Violet repère",
        token: "--projection-originale-violet-repere",
        valeur: "#75658F",
        encre: "claire",
    },
] as const satisfies readonly CouleurReference[];

const atelierAnimation = [
    {
        nom: "Encre",
        token: "--atelier-animation-encre",
        valeur: "#15171D",
        encre: "claire",
    },
    {
        nom: "Table lumineuse",
        token: "--atelier-animation-table-lumineuse",
        valeur: "#252A32",
        encre: "claire",
    },
    {
        nom: "Graphite",
        token: "--atelier-animation-graphite",
        valeur: "#88838C",
        encre: "sombre",
    },
    {
        nom: "Papier animation",
        token: "--atelier-animation-papier-animation",
        valeur: "#F1E7D2",
        encre: "sombre",
    },
    {
        nom: "Bleu repérage",
        token: "--atelier-animation-bleu-reperage",
        valeur: "#5E88AD",
        encre: "sombre",
    },
    {
        nom: "Rouge crayon",
        token: "--atelier-animation-rouge-crayon",
        valeur: "#C06464",
        encre: "sombre",
    },
    {
        nom: "Jaune lampe",
        token: "--atelier-animation-jaune-lampe",
        valeur: "#D3AC55",
        encre: "sombre",
    },
    {
        nom: "Vert cellulo",
        token: "--atelier-animation-vert-cellulo",
        valeur: "#6E9A87",
        encre: "sombre",
    },
    {
        nom: "Gouache",
        token: "--atelier-animation-gouache",
        valeur: "#9172A7",
        encre: "sombre",
    },
    {
        nom: "Corail cel",
        token: "--atelier-animation-corail-cel",
        valeur: "#C5785C",
        encre: "sombre",
    },
] as const satisfies readonly CouleurReference[];

const rolesSemantiques = [
    ["Canvas", "bg-canvas", "bg-canvas", "Fond général"],
    ["Surface", "bg-surface", "bg-surface", "Premier niveau"],
    ["Surface muted", "bg-surface-muted", "bg-surface-muted", "Second niveau"],
    ["Ink", "text-ink", "bg-ink", "Texte principal"],
    ["Ink soft", "text-ink-soft", "bg-ink-soft", "Texte courant"],
    ["Muted", "text-muted", "bg-muted", "Information discrète"],
    ["Accent", "text-accent", "bg-accent", "Action et repère"],
    ["Line", "border-line", "bg-line", "Séparation"],
] as const;

const portes = [
    ["Personnages", "Rouge crayon", "--atelier-famille-personnages"],
    ["Créateurs", "Jaune lampe", "--atelier-famille-createurs"],
    ["Œuvres", "Gouache", "--atelier-famille-oeuvres"],
    ["Époques", "Vert cellulo", "--atelier-famille-epoques"],
] as const;

function Nuancier({ couleurs }: { couleurs: readonly CouleurReference[] }) {
    return (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {couleurs.map((couleur) => (
                <article
                    key={couleur.token}
                    className="overflow-hidden border border-line bg-surface"
                >
                    <div
                        className="flex min-h-28 flex-col justify-end p-4"
                        style={{
                            backgroundColor: `var(${couleur.token})`,
                            color:
                                couleur.encre === "claire"
                                    ? "var(--projection-originale-ecran)"
                                    : "var(--projection-originale-noir-de-salle)",
                        }}
                    >
                        <h5 className="font-sans text-sm font-semibold tracking-normal">
                            {couleur.nom}
                        </h5>
                        <p className="mt-1 font-mono text-xs opacity-75">
                            {couleur.valeur}
                        </p>
                    </div>
                    <p className="overflow-x-auto px-4 py-3 font-mono text-[0.6875rem] text-muted">
                        {couleur.token}
                    </p>
                </article>
            ))}
        </div>
    );
}

export function PalettesPellicule() {
    return (
        <div className="mt-12 space-y-16">
            <section aria-labelledby="projection-originale-palette">
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <div className="max-w-3xl">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                            Palette d’interface
                        </p>
                        <h3
                            id="projection-originale-palette"
                            className="mt-3 text-3xl text-ink"
                        >
                            Projection Originale
                        </h3>
                        <p className="mt-4 leading-7 text-ink-soft">
                            Elle construit la salle : surfaces, encres, lignes,
                            accents et lumières. Ses références alimentent les
                            rôles sémantiques sans entrer directement dans les
                            composants.
                        </p>
                    </div>
                    <p className="font-mono text-xs text-muted">
                        25 références · 2 lumières
                    </p>
                </div>

                <div className="mt-8">
                    <h4 className="text-xl text-ink">Lumière sombre</h4>
                    <p className="mt-2 text-sm text-muted">
                        La salle s’efface pour laisser le contenu devenir la
                        lumière.
                    </p>
                    <Nuancier couleurs={projectionSombre} />
                </div>

                <div className="mt-10">
                    <h4 className="text-xl text-ink">Lumière claire</h4>
                    <p className="mt-2 text-sm text-muted">
                        Le même langage posé sur le papier, la toile et les
                        encres d’un dossier de projection.
                    </p>
                    <Nuancier couleurs={projectionClaire} />
                </div>

                <div className="mt-12">
                    <h4 className="text-xl text-ink">
                        Le contrat de projection
                    </h4>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                        Ces rôles restent les seuls points d’entrée des
                        composants. La palette peut évoluer sans réécrire leurs
                        styles.
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {rolesSemantiques.map(([nom, token, classe, usage]) => (
                            <article
                                key={nom}
                                className="border border-line bg-surface p-4"
                            >
                                <div
                                    aria-hidden="true"
                                    className={`h-20 border border-line ${classe}`}
                                />
                                <h5 className="mt-4 font-sans text-lg font-medium tracking-normal text-ink">
                                    {nom}
                                </h5>
                                <p className="mt-1 font-mono text-xs text-accent">
                                    {token}
                                </p>
                                <p className="mt-3 text-sm text-muted">
                                    {usage}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section
                aria-labelledby="atelier-animation-palette"
                className="border-t border-line pt-12"
            >
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <div className="max-w-3xl">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                            Palette éditoriale
                        </p>
                        <h3
                            id="atelier-animation-palette"
                            className="mt-3 text-3xl text-ink"
                        >
                            L’Atelier d’animation
                        </h3>
                        <p className="mt-4 leading-7 text-ink-soft">
                            Elle colore ce qui est projeté : familles,
                            métadonnées, badges et futurs symboles. Elle apporte
                            des repères sans repeindre la salle.
                        </p>
                    </div>
                    <p className="font-mono text-xs text-muted">
                        10 références éditoriales
                    </p>
                </div>

                <Nuancier couleurs={atelierAnimation} />

                <div className="mt-10">
                    <h4 className="text-xl text-ink">Les quatre portes</h4>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                        Les premiers alias donnent une identité stable aux
                        familles tout en conservant le nom technique «
                        contributeurs » derrière la porte des Créateurs.
                    </p>
                    <div className="mt-6 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                        {portes.map(([famille, couleur, token]) => (
                            <article
                                key={famille}
                                className="bg-surface p-5"
                                style={{ borderTop: `4px solid var(${token})` }}
                            >
                                <p className="text-lg font-medium text-ink">
                                    {famille}
                                </p>
                                <p
                                    className="mt-2 text-sm font-medium"
                                    style={{ color: `var(${token})` }}
                                >
                                    {couleur}
                                </p>
                                <p className="mt-4 overflow-x-auto font-mono text-[0.6875rem] text-muted">
                                    {token}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
