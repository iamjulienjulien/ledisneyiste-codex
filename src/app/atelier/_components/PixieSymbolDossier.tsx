import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { getSymbol, getSymbolSlugs } from "@/registry/symbols";
import { PixieSymbolPlayground } from "./PixieSymbolPlayground";

const generalLogoSymbolSlugs = getSymbolSlugs("general", "logos");
const generalCinemaSymbolSlugs = getSymbolSlugs("general", "cinema");
const generalArchiveSymbolSlugs = getSymbolSlugs("general", "archives");
const generalEcritureSymbolSlugs = getSymbolSlugs("general", "ecriture");
const animationTechniqueSymbolSlugs = getSymbolSlugs("techniques", "animation");
const imageTechniqueSymbolSlugs = getSymbolSlugs("techniques", "images");
const couleurTechniqueSymbolSlugs = getSymbolSlugs("techniques", "couleur");
const sonTechniqueSymbolSlugs = getSymbolSlugs("techniques", "son");
const effetsTechniqueSymbolSlugs = getSymbolSlugs("techniques", "effets");
const imagineeringTechniqueSymbolSlugs = getSymbolSlugs(
    "techniques",
    "imagineering",
);
const indexSymbolSlugs = getSymbolSlugs("codex", "index");
const recompenseTrophySymbolSlugs = getSymbolSlugs("recompenses", "trophees");
const contributeurBlockSymbolSlugs = getSymbolSlugs("blocs", "contributeurs");
const epoqueBlockSymbolSlugs = getSymbolSlugs("blocs", "epoques");
const oeuvreBlockSymbolSlugs = getSymbolSlugs("blocs", "oeuvres");
const personnageBlockSymbolSlugs = getSymbolSlugs("blocs", "personnages");

const dimensions = [
    ["xs", "24 px"],
    ["sm", "32 px"],
    ["md", "48 px"],
    ["lg", "64 px"],
    ["xl", "96 px"],
] as const;

const proprietes = [
    {
        name: "registry",
        type: "SymbolRegistryName",
        defaultValue: "—",
        description: "Registre qui contient la famille de symboles.",
    },
    {
        name: "collection",
        type: "SymbolCollectionName<Registry>",
        defaultValue: "—",
        description: "Collection disponible dans le registre sélectionné.",
    },
    {
        name: "slug",
        type: "SymbolSlug<Registry, Collection>",
        defaultValue: "—",
        description: "Identifiant typé du symbole dans le registre.",
    },
    {
        name: "size",
        type: "PixieSymbolSize",
        defaultValue: '"md"',
        description: "Taille extérieure du symbole en preset ou en pixels.",
    },
    {
        name: "decorative",
        type: "boolean",
        defaultValue: "true",
        description: "Masque le symbole aux technologies d’assistance.",
    },
    {
        name: "label",
        type: "string",
        defaultValue: "libellé du registre",
        description: "Texte alternatif lorsque le symbole est informatif.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au conteneur extérieur.",
    },
] as const;

const typesSpecifiques = [
    {
        name: "PixieSymbolSize",
        values: ['"xs"', '"sm"', '"md"', '"lg"', '"xl"', "number"],
        description: "Tailles prédéfinies ou dimension libre en pixels.",
    },
    {
        name: "SymbolRegistryName",
        values: [
            '"blocs"',
            '"codex"',
            '"general"',
            '"recompenses"',
            '"techniques"',
        ],
        description: "Registres de symboles actuellement disponibles.",
    },
    {
        name: 'SymbolCollectionName<"blocs">',
        values: ['"contributeurs"', '"epoques"', '"oeuvres"', '"personnages"'],
        description: "Collections exposées par le registre des blocs.",
    },
    {
        name: 'SymbolCollectionName<"codex">',
        values: ['"index"'],
        description: "Collections exposées par le registre Codex.",
    },
    {
        name: 'SymbolCollectionName<"general">',
        values: ['"archives"', '"cinema"', '"ecriture"', '"logos"'],
        description: "Collections exposées par le registre Général.",
    },
    {
        name: 'SymbolCollectionName<"recompenses">',
        values: ['"trophees"'],
        description: "Collections exposées par le registre des Récompenses.",
    },
    {
        name: 'SymbolCollectionName<"techniques">',
        values: [
            '"animation"',
            '"images"',
            '"couleur"',
            '"son"',
            '"effets"',
            '"imagineering"',
        ],
        description: "Collections exposées par le registre des Techniques.",
    },
    {
        name: 'SymbolSlug<"codex", "index">',
        values: ['"personnages"', '"createurs"', '"oeuvres"', '"epoques"'],
        description: "Symboles disponibles dans la collection des index.",
    },
    {
        name: 'SymbolSlug<"general", "logos">',
        values: ['"le-codex-du-disneyiste"'],
        description: "Logos généraux disponibles dans le registre.",
    },
    {
        name: 'SymbolSlug<"general", "cinema">',
        values: [
            '"bobine"',
            '"camera-cinema"',
            '"casque-studio"',
            '"clap"',
            '"fauteuil-realisateur"',
            '"haut-parleur"',
            '"megaphone"',
            '"micro-perche"',
            '"pellicule"',
            '"projecteur-cinema"',
            '"projecteur-plateau"',
            '"rideau-cinema"',
            '"scenario"',
            '"storyboard"',
            '"ticket-cinema"',
        ],
        description: "Accessoires généraux du langage cinématographique.",
    },
    {
        name: 'SymbolSlug<"general", "archives">',
        values: [
            '"boite-archives"',
            '"chemise-archives"',
            '"dossier-ficelle"',
            '"registre-relie"',
            '"porte-fiches"',
            '"fichier-bois"',
            '"classeur-anneaux"',
            '"tube-plans"',
            '"boite-photographies"',
            '"bobine-film-archive"',
            '"lecteur-microfilm"',
            '"tampon-dateur"',
            '"presse-a-sec"',
            '"gants-conservation"',
            '"loupe-archiviste"',
            '"pinceau-depoussierage"',
            '"scanner-documents"',
            '"thermo-hygrometre"',
        ],
        description:
            "Objets de classement, consultation, datation et conservation des archives.",
    },
    {
        name: 'SymbolSlug<"general", "ecriture">',
        values: [
            '"carnet-travail"',
            '"crayon-bleu"',
            '"machine-a-ecrire"',
            '"manuscrit-corrige"',
            '"plume-ecriture"',
            '"stylo-plume"',
            '"storyboard"',
            '"bloc-notes"',
            '"presse-typographique"',
            '"marque-page"',
            '"encrier"',
            '"pile-epreuves"',
        ],
        description:
            "Outils de conception, correction, mise en forme et transmission des idées.",
    },
    {
        name: 'SymbolSlug<"techniques", "animation">',
        values: [
            '"camera-banc-titre"',
            '"camera-multiplane"',
            '"camera-pencil-test"',
            '"cellulo-peint"',
            '"crayons-animation"',
            '"disque-animation"',
            '"feuille-animation"',
            '"feuille-exposition"',
            '"kit-encrage-cellulo"',
            '"metronome-synchronisation"',
            '"pile-cellulos"',
            '"planche-modele"',
            '"regle-a-tenons"',
            '"rotoscope"',
            '"station-caps"',
            '"table-lumineuse"',
            '"taille-crayon-mecanique"',
            '"xerographie"',
        ],
        description: "Outils et procédés de la chaîne de l’animation.",
    },
    {
        name: 'SymbolSlug<"techniques", "images">',
        values: [
            '"objectif-iris"',
            '"posemetre"',
            '"filtres-optiques"',
            '"viseur-composition"',
            '"matte-painting"',
            '"retroprojection"',
            '"perspective-forcee"',
            '"maquette-miniature"',
            '"fond-bleu"',
            '"incrustation-sodium"',
            '"tireuse-optique"',
            '"compositing-calques"',
            '"cache-contre-cache"',
            '"etalonnage"',
            '"scanner-pellicule"',
            '"restauration-image"',
        ],
        description: "Outils de prise de vues, compositing et restauration.",
    },
    {
        name: 'SymbolSlug<"techniques", "couleur">',
        values: [
            '"cercle-chromatique"',
            '"nuancier-production"',
            '"palette-harmonique"',
            '"charte-colorimetrique"',
            '"teintage-pellicule"',
            '"virage-pellicule"',
            '"colorisation-pochoir"',
            '"separation-trichrome"',
            '"prisme-trichrome"',
            '"camera-trois-bandes"',
            '"matrices-colorants"',
            '"transfert-colorants"',
            '"color-script"',
            '"palette-personnage"',
            '"densitometre"',
            '"calibration-ecran"',
        ],
        description:
            "Outils de conception, production et contrôle des couleurs.",
    },
    {
        name: 'SymbolSlug<"techniques", "son">',
        values: [
            '"microphone-ruban"',
            '"enregistreur-optique"',
            '"synchroniseur-image-son"',
            '"console-mixage"',
            '"microphone-condensateur"',
            '"perche-studio"',
            '"paravent-acoustique"',
            '"graveur-disque"',
            '"magnetophone-bande"',
            '"matrice-multicanale"',
            '"piste-densite-variable"',
            '"piste-surface-variable"',
            '"generateur-click-track"',
            '"banc-montage-son"',
            '"reverberation-plaque"',
            '"atelier-bruitage"',
        ],
        description:
            "Outils d’enregistrement, synchronisation, montage et bruitage.",
    },
    {
        name: 'SymbolSlug<"techniques", "effets">',
        values: [
            '"verre-matte-painting"',
            '"cuve-effets-aquatiques"',
            '"canon-particules"',
            '"machine-fumee"',
            '"generateur-eclairs"',
            '"rampe-pluie"',
            '"soufflerie-plateau"',
            '"projecteur-flammes"',
            '"bassin-tempete-miniature"',
            '"plateau-miniature"',
            '"mecanisme-destruction-miniature"',
            '"tambour-nuages"',
            '"disque-halo-lumineux"',
            '"banc-surimpression"',
            '"station-incrustation"',
            '"simulateur-particules-numeriques"',
        ],
        description:
            "Outils d’effets physiques, optiques et numériques de plateau.",
    },
    {
        name: 'SymbolSlug<"techniques", "imagineering">',
        values: [
            '"table-plans-techniques"',
            '"maquette-conceptuelle"',
            '"audio-animatronic-generique"',
            '"panneau-controle-attraction"',
            '"vehicule-parcours-guide"',
            '"module-rail-aiguillage"',
            '"plateforme-mouvement"',
            '"maquette-circulation-visiteurs"',
            '"facade-perspective-forcee"',
            '"echantillon-roche-sculptee"',
            '"decor-escamotable"',
            '"banc-illusion-optique"',
            '"console-programmation-spectacle"',
            '"rack-show-control"',
            '"banc-essai-animatronic"',
            '"poste-diagnostic-maintenance"',
        ],
        description:
            "Outils de conception, programmation, illusion et maintenance des attractions.",
    },
    {
        name: 'SymbolSlug<"recompenses", "trophees">',
        values: [
            '"statuette-oscar"',
            '"plaque-technique-multiplane"',
            '"medaille-societe-des-nations"',
            '"medaille-or-venise"',
        ],
        description: "Symboles des trophées présents dans les archives.",
    },
    {
        name: 'SymbolSlug<"blocs", "contributeurs">',
        values: ['"debuts"', '"signature"', '"trajectoire"', '"transmission"'],
        description: "Symboles des blocs éditoriaux des Contributeurs.",
    },
    {
        name: 'SymbolSlug<"blocs", "epoques">',
        values: ['"fondations"', '"mutations"', '"tensions"'],
        description: "Symboles des blocs éditoriaux des Époques.",
    },
    {
        name: 'SymbolSlug<"blocs", "oeuvres">',
        values: ['"repere"', '"langage"', '"relations"'],
        description: "Symboles des blocs éditoriaux des Œuvres.",
    },
    {
        name: 'SymbolSlug<"blocs", "personnages">',
        values: ['"genese"', '"caractere"', '"trajectoire"'],
        description: "Symboles des blocs éditoriaux des Personnages.",
    },
] as const;

function CodeExemple({ children }: Readonly<{ children: string }>) {
    return (
        <pre className="overflow-x-auto border border-line bg-canvas p-5 font-mono text-sm leading-6 text-ink-soft">
            <code>{children}</code>
        </pre>
    );
}

function TitreSequence({
    id,
    surTitre,
    titre,
    description,
}: Readonly<{
    id: string;
    surTitre: string;
    titre: string;
    description?: string;
}>) {
    return (
        <div className="max-w-3xl">
            <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.18em] text-muted">
                {surTitre}
            </p>
            <h3 id={id} className="mt-3 text-3xl text-ink">
                {titre}
            </h3>
            {description ? (
                <p className="mt-4 leading-7 text-ink-soft">{description}</p>
            ) : null}
        </div>
    );
}

export function PixieSymbolDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-symbol"
            labelledBy="pixie-symbol-title"
            nom="PixieSymbol"
            className="mt-20 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Accessoire 001
                        </p>
                        <h2
                            id="pixie-symbol-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieSymbol
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Résoudre et projeter les symboles de tous les
                            registres sans exposer leur chemin ni leur couleur à
                            l’écran qui les utilise.
                        </p>
                    </div>

                    <dl className="grid min-w-64 grid-cols-2 gap-px bg-line md:grid-cols-1">
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Version
                            </dt>
                            <dd className="mt-1 font-mono text-sm text-ink">
                                1.0.0
                            </dd>
                        </div>
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                État
                            </dt>
                            <dd className="mt-1 text-sm font-medium">
                                <AtelierStatut statut="Prêt à projeter" />
                            </dd>
                        </div>
                    </dl>
                </div>
            }
        >
            <section aria-labelledby="pixie-symbol-identite" className="mt-14">
                <TitreSequence
                    id="pixie-symbol-identite"
                    surTitre="Fiche de rôle"
                    titre="Une porte unique vers le registre"
                    description="Le composant reçoit un registre, une collection et un slug stables, retrouve son image, son libellé et sa couleur, puis applique une taille et une stratégie d’accessibilité cohérentes."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Afficher un symbole typé."],
                        ["Sélection", "registry · collection · slug"],
                        ["Exemple", "codex.index.personnages"],
                        ["Masters", "Seize séries originales · 1254 px."],
                        ["Dérivés", "PNG transparent · 384 px."],
                        ["Accessibilité", "Décoratif par défaut."],
                    ].map(([terme, definition]) => (
                        <div key={terme} className="bg-surface p-5">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                {terme}
                            </dt>
                            <dd className="mt-2 leading-7 text-ink-soft">
                                {definition}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section
                aria-labelledby="pixie-symbol-plan"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <TitreSequence
                    id="pixie-symbol-plan"
                    surTitre="Plan maître"
                    titre="Trois coordonnées, un symbole"
                    description="Le registre global dirige vers une collection spécialisée ; l’écran ne fournit que ces coordonnées et les options de rendu."
                />

                <div className="mt-7 grid border border-line lg:grid-cols-2">
                    <div className="flex min-h-72 items-center justify-center bg-surface p-8">
                        <PixieSymbol
                            registry="codex"
                            collection="index"
                            slug="personnages"
                            size="xl"
                        />
                    </div>
                    <CodeExemple>{`<PixieSymbol
    registry="codex"
    collection="index"
    slug="personnages"
    size="xl"
/>`}</CodeExemple>
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-general-logos"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-general-logos"
                    surTitre="Distribution"
                    titre="Le logo général du Codex"
                    description="La boussole enchantée réunit le livre, le crayon et la baguette pour identifier Le Codex du Disneyiste dans tous ses espaces."
                />

                <div className="mt-7 grid max-w-sm gap-px overflow-hidden border border-line bg-line">
                    {generalLogoSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("general", "logos", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="general"
                                    collection="logos"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-general-cinema"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-general-cinema"
                    surTitre="Distribution"
                    titre="Les accessoires du cinéma"
                    description="Clap, caméra, projecteurs, pellicule, son, scénario et salle composent un vocabulaire général réutilisable partout où le Codex parle de cinéma."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
                    {generalCinemaSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("general", "cinema", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="general"
                                    collection="cinema"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-general-archives"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-general-archives"
                    surTitre="Distribution"
                    titre="Les archives prennent forme"
                    description="Boîtes, dossiers, registres, supports de consultation et instruments de conservation forment un vocabulaire neutre pour classer, dater, examiner et préserver la mémoire du Codex."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-6">
                    {generalArchiveSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("general", "archives", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="general"
                                    collection="archives"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-general-ecriture"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-general-ecriture"
                    surTitre="Distribution"
                    titre="Les idées passent à l’écrit"
                    description="Carnets, crayons, plumes, manuscrits, notes et outils d’impression accompagnent les idées depuis leur première formulation jusqu’à leur correction et leur transmission."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {generalEcritureSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("general", "ecriture", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="general"
                                    collection="ecriture"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section aria-labelledby="pixie-symbol-serie" className="mt-16">
                <TitreSequence
                    id="pixie-symbol-serie"
                    surTitre="Distribution"
                    titre="Les quatre index de la Table lumineuse"
                    description="Une même matière, un même angle et quatre couleurs éditoriales rendent la série reconnaissable sans uniformiser ses sujets."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {indexSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("codex", "index", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="codex"
                                    collection="index"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-recompenses-trophees"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-recompenses-trophees"
                    surTitre="Distribution"
                    titre="Les quatre trophées des premières archives"
                    description="Statuette, plaque technique et médailles internationales distinguent les formes de récompenses déjà documentées sans créer un symbole propre à chaque attribution."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {recompenseTrophySymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "recompenses",
                            "trophees",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="recompenses"
                                    collection="trophees"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-techniques-animation"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-techniques-animation"
                    surTitre="Distribution"
                    titre="La chaîne technique de l’animation"
                    description="Du dessin sur papier à l’encrage, au tournage, à la xérographie et à la mise en couleur numérique, les outils situent chaque étape de fabrication sans se confondre avec les accessoires généraux du cinéma."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-6">
                    {animationTechniqueSymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "techniques",
                            "animation",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="techniques"
                                    collection="animation"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-techniques-images"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-techniques-images"
                    surTitre="Distribution"
                    titre="La fabrique technique des images"
                    description="Objectifs, filtres, décors optiques, incrustations, compositing et restauration décrivent la construction de l’image depuis la prise de vues jusqu’à sa remise en état."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {imageTechniqueSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("techniques", "images", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="techniques"
                                    collection="images"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-techniques-couleur"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-techniques-couleur"
                    surTitre="Distribution"
                    titre="La couleur entre en production"
                    description="Nuanciers, palettes, procédés trichromes, transferts et instruments de contrôle racontent la couleur depuis sa conception artistique jusqu’à sa restitution à l’écran."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {couleurTechniqueSymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "techniques",
                            "couleur",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="techniques"
                                    collection="couleur"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-techniques-son"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-techniques-son"
                    surTitre="Distribution"
                    titre="Le son entre en studio"
                    description="Microphones, enregistrement optique et magnétique, synchronisation, mixage, montage et bruitage suivent la fabrication du son depuis le plateau jusqu’à la piste finale."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {sonTechniqueSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("techniques", "son", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="techniques"
                                    collection="son"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-techniques-effets"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-techniques-effets"
                    surTitre="Distribution"
                    titre="Les effets entrent en scène"
                    description="Eau, fumée, pluie, vent, flammes, miniatures, surimpressions et particules réunissent les procédés physiques, optiques et numériques qui transforment le plateau et l’image."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {effetsTechniqueSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("techniques", "effets", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="techniques"
                                    collection="effets"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-techniques-imagineering"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-techniques-imagineering"
                    surTitre="Distribution"
                    titre="L’imaginaire devient attraction"
                    description="Plans, maquettes, véhicules, décors, illusions, Audio-Animatronics et systèmes de contrôle suivent la transformation d’une idée en expérience physique, programmable et maintenable."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {imagineeringTechniqueSymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "techniques",
                            "imagineering",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="techniques"
                                    collection="imagineering"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-blocs-personnages"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-blocs-personnages"
                    surTitre="Distribution"
                    titre="Les trois blocs de la Table d’animation"
                    description="Construction, interprétation et transformation donnent aux blocs éditoriaux des Personnages trois repères distincts dans une même matière d’atelier."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
                    {personnageBlockSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("blocs", "personnages", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="blocs"
                                    collection="personnages"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-blocs-contributeurs"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-blocs-contributeurs"
                    surTitre="Distribution"
                    titre="Les quatre outils du créateur"
                    description="Taille-crayon, empreinte, folio et boîte à outils racontent les débuts, la signature, la trajectoire et la transmission des Contributeurs sans reprendre la feuille d’animation des Personnages."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {contributeurBlockSymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "blocs",
                            "contributeurs",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="blocs"
                                    collection="contributeurs"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-blocs-oeuvres"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-blocs-oeuvres"
                    surTitre="Distribution"
                    titre="Les trois plans de La pellicule prend vie"
                    description="Bobine témoin, prisme de projection et photogramme partagé situent l’Œuvre, révèlent son langage puis mettent en jeu les relations de ses personnages."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
                    {oeuvreBlockSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("blocs", "oeuvres", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="blocs"
                                    collection="oeuvres"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-blocs-epoques"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-blocs-epoques"
                    surTitre="Distribution"
                    titre="Le studio se construit en trois temps"
                    description="Pierre inaugurale, plateau transformable et charpente sous tension racontent les fondations, les mutations et les tensions qui structurent les Époques."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
                    {epoqueBlockSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("blocs", "epoques", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="blocs"
                                    collection="epoques"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-dimensions"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-dimensions"
                    surTitre="Dimensions"
                    titre="Cinq tailles de projection"
                    description="La taille décrit toujours la boîte extérieure réservée au symbole."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
                    {dimensions.map(([size, pixels]) => (
                        <article
                            key={size}
                            className="flex min-h-44 flex-col items-center justify-end bg-surface p-5"
                        >
                            <div className="flex flex-1 items-center">
                                <PixieSymbol
                                    registry="codex"
                                    collection="index"
                                    slug="oeuvres"
                                    size={size}
                                />
                            </div>
                            <p className="mt-4 font-mono text-xs text-accent">
                                {size}
                            </p>
                            <p className="mt-1 text-xs text-muted">{pixels}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-accessibilite"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-accessibilite"
                    surTitre="Accessibilité"
                    titre="Silencieux lorsqu’un libellé est déjà visible"
                    description="Le symbole reste décoratif dans une carte ou un titre déjà nommé. Il devient informatif uniquement lorsqu’il porte seul le sens de l’index."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
                    <article className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Décoratif
                        </p>
                        <div className="mt-6 flex items-center gap-5">
                            <PixieSymbol
                                registry="codex"
                                collection="index"
                                slug="createurs"
                                size="lg"
                            />
                            <p className="text-xl text-ink">Créateurs</p>
                        </div>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Informatif
                        </p>
                        <div className="mt-6">
                            <PixieSymbol
                                registry="codex"
                                collection="index"
                                slug="createurs"
                                size="lg"
                                decorative={false}
                                label="Index des Créateurs"
                            />
                        </div>
                    </article>
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-regie"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <TitreSequence
                    id="pixie-symbol-regie"
                    surTitre="Régie"
                    titre="Composer un PixieSymbol"
                    description="Modifier l’index, la taille et le rôle accessible met à jour le rendu et le code d’utilisation."
                />

                <div className="mt-7">
                    <PixieSymbolPlayground />
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-reference"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <TitreSequence
                    id="pixie-symbol-reference"
                    surTitre="Générique technique"
                    titre="Types et propriétés du composant"
                />

                <div className="mt-7">
                    <AtelierPropertiesTable properties={proprietes} />
                </div>

                <div className="mt-10">
                    <h4 className="text-xl text-ink">Types spécifiques</h4>
                    <p className="mt-2 text-sm leading-6 text-muted">
                        Les coordonnées et tailles admises par le registre
                        actuel.
                    </p>
                    <div className="mt-4">
                        <AtelierTypesTable types={typesSpecifiques} />
                    </div>
                </div>
            </section>
        </AtelierFicheAccessoire>
    );
}
