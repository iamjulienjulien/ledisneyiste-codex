import type { ReactNode } from "react";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixiePanel } from "@/components/ui/PixiePanel";
import {
    getPixieDocsDenseNavigation,
    getPixieDocsFixtures,
    getPixieDocsNavigation,
} from "./PixieDocs.fixtures.server";
import {
    getPixieDocsNotionConnectionState,
    getPixieDocsNotionFixtures,
    getPixieDocsNotionNavigation,
} from "./PixieDocs.notion-fixtures.server";
import { PixieDocsPlayground } from "./PixieDocsPlayground";

const properties = [
    {
        name: "title",
        type: "string",
        defaultValue: "—",
        description: "Nom visible et accessible de la bibliothèque.",
    },
    {
        name: "navigation",
        type: "readonly PixieDocsNavigationItem[]",
        defaultValue: "—",
        description:
            "Arborescence déjà ordonnée, autorisée et munie de destinations résolues.",
    },
    {
        name: "activeSlug",
        type: "string",
        defaultValue: "—",
        description: "Document courant dans la navigation hiérarchique.",
    },
    {
        name: "documentTitle",
        type: "string",
        defaultValue: "—",
        description: "Titre du document projeté et cible de focus contrôlée.",
    },
    {
        name: "document",
        type: "ReactNode",
        defaultValue: "—",
        description:
            "Plan déjà rendu côté serveur, généralement par PixieMarkdown.",
    },
    {
        name: "tableOfContents",
        type: "readonly GuidebookTableOfContentsItem[]",
        defaultValue: "[]",
        description:
            "Sommaire issu de la même analyse que le document et déjà préfixé.",
    },
    {
        name: "documentState",
        type: "GuidebookDocumentState",
        defaultValue: '"ready"',
        description: "Disponibilité réelle de la matière projetée.",
    },
    {
        name: "documentEyebrow",
        type: "ReactNode",
        defaultValue: '"Guidebook"',
        description: "Repère éditorial placé au-dessus du titre courant.",
    },
    {
        name: "documentSummary",
        type: "ReactNode",
        defaultValue: "—",
        description: "Résumé visible placé avant la lecture.",
    },
    {
        name: "documentMeta",
        type: "ReactNode",
        defaultValue: "—",
        description: "Métadonnées déjà préparées pour le document courant.",
    },
    {
        name: "stateMessage",
        type: "ReactNode",
        defaultValue: "message interne",
        description: "Contrechamp explicite propre au contexte de source.",
    },
    {
        name: "previous",
        type: "PixieDocsDestination | null",
        defaultValue: "—",
        description: "Raccord déjà résolu vers le document précédent.",
    },
    {
        name: "next",
        type: "PixieDocsDestination | null",
        defaultValue: "—",
        description: "Raccord déjà résolu vers le document suivant.",
    },
    {
        name: "density",
        type: "PixieDocsDensity",
        defaultValue: '"comfortable"',
        description: "Respiration générale des trois zones.",
    },
    {
        name: "navigationWidth",
        type: "PixieDocsNavigationWidth",
        defaultValue: '"md"',
        description:
            "Largeur réelle de la colonne ou du panneau flottant lorsque le cadre le permet.",
    },
    {
        name: "navigationMode",
        type: "PixieDocsNavigationMode",
        defaultValue: '"inline"',
        description:
            "Réserve une colonne dans le cadre ou libère le document derrière un panneau flottant.",
    },
    {
        name: "toc",
        type: "PixieDocsTocMode",
        defaultValue: '"visible"',
        description: "Présence du sommaire dans le cadre courant.",
    },
    {
        name: "sticky",
        type: "boolean",
        defaultValue: "true",
        description:
            "Maintient les repères latéraux dans les limites de la bibliothèque.",
    },
    {
        name: "filterable",
        type: "boolean",
        defaultValue: "true",
        description: "Expose le filtre léger appliqué aux titres transmis.",
    },
    {
        name: "filterLabel",
        type: "string",
        defaultValue: '"Filtrer les titres"',
        description: "Nom visible et accessible du filtre.",
    },
    {
        name: "filterPlaceholder",
        type: "string",
        defaultValue: '"Nom d’un chapitre…"',
        description: "Exemple de recherche affiché dans le filtre.",
    },
    {
        name: "navigationLabel",
        type: "string",
        defaultValue: '"Parcourir la bibliothèque"',
        description: "Nom des régions de navigation responsive.",
    },
    {
        name: "tableOfContentsLabel",
        type: "string",
        defaultValue: '"Dans ce document"',
        description: "Nom visible et accessible du sommaire.",
    },
    {
        name: "headingLevel",
        type: "PixieDocsHeadingLevel",
        defaultValue: "1",
        description: "Niveau du titre principal dans son contexte d’insertion.",
    },
    {
        name: "onNavigate",
        type: "(slug: string) => void",
        defaultValue: "—",
        description:
            "Navigation contrôlée optionnelle ; sans elle, les liens restent natifs.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes complémentaires appliquées à la racine.",
    },
    {
        name: "style",
        type: "PixieDocsStyle",
        defaultValue: "—",
        description: "Styles et largeurs CSS explicitement transmis.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDocsNavigationState",
        values: ['"available"', '"restricted"', '"unavailable"'],
        description:
            "Disponibilité d’une destination sans transformer une absence en lien.",
    },
    {
        name: "PixieDocsNavigationItem",
        values: ["slug", "title", "href", "state?", "children?"],
        description: "Nœud récursif déjà ordonné et résolu de la bibliothèque.",
    },
    {
        name: "PixieDocsDestination",
        values: ["slug", "title", "href"],
        description: "Destination précédente ou suivante déjà résolue.",
    },
    {
        name: "PixieDocsDensity",
        values: ['"compact"', '"comfortable"', '"airy"'],
        description: "Trois rythmes de bibliothèque documentaire.",
    },
    {
        name: "PixieDocsNavigationWidth",
        values: ['"sm"', '"md"', '"lg"'],
        description: "Trois largeurs bornées de navigation.",
    },
    {
        name: "PixieDocsNavigationMode",
        values: ['"inline"', '"floating"'],
        description:
            "Bibliothèque inscrite dans la grille ou projetée dans un PixiePanel fixe, escamoté derrière sa languette droite.",
    },
    {
        name: "PixieDocsTocMode",
        values: ['"visible"', '"collapsible"', '"hidden"'],
        description: "Sommaire latéral, repliable ou volontairement absent.",
    },
    {
        name: "PixieDocsHeadingLevel",
        values: ["1", "2", "3", "4", "5", "6"],
        description: "Niveau sémantique borné du titre principal.",
    },
    {
        name: "PixieDocsStyle",
        values: [
            "CSSProperties",
            '"--pixie-docs-navigation-width"',
            '"--pixie-docs-toc-width"',
        ],
        description: "Styles natifs et deux largeurs de composition publiques.",
    },
    {
        name: "GuidebookDocumentState",
        values: [
            '"ready"',
            '"empty"',
            '"partial"',
            '"missing"',
            '"restricted"',
            '"stale"',
            '"unavailable"',
            '"deferred"',
        ],
        description:
            "États neutres de la matière, partagés par les adaptateurs locaux et futurs.",
    },
] as const;

function SequenceTitle({
    id,
    eyebrow,
    title,
    description,
}: Readonly<{
    id: string;
    eyebrow: string;
    title: string;
    description?: string;
}>) {
    return (
        <div>
            <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.18em] text-muted">
                {eyebrow}
            </p>
            <h3 id={id} className="mt-3 text-3xl text-ink">
                {title}
            </h3>
            {description ? (
                <p className="mt-4 leading-7 text-ink-soft">{description}</p>
            ) : null}
        </div>
    );
}

function Stage({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="min-w-0 border border-dashed border-line-strong bg-canvas p-4 sm:p-7">
            {children}
        </div>
    );
}

const states = [
    [
        "ready",
        "Prêt à lire",
        "La matière et ses destinations sont disponibles.",
    ],
    ["empty", "Vide", "Le document existe sans fabriquer de remplissage."],
    ["partial", "Partiel", "Les blocs sûrs restent lisibles avec leur limite."],
    ["missing", "Introuvable", "La place existe, aucun fichier n’est résolu."],
    [
        "restricted",
        "Réservé",
        "La cible privée ne reçoit ni route ni lien actif.",
    ],
    [
        "stale",
        "À synchroniser",
        "La dernière lecture reste visible et signalée.",
    ],
    ["unavailable", "Indisponible", "La source autorisée ne répond pas."],
    [
        "deferred",
        "Différé",
        "L’adaptateur futur ne bloque pas la bibliothèque locale.",
    ],
] as const;

export async function PixieDocsDossier() {
    const masterAnchor = "docs-master";
    const notionAnchor = "docs-notion";
    const playgroundAnchor = "docs-playground";
    const [masterFixtures, notionFixtures, playgroundFixtures] =
        await Promise.all([
            getPixieDocsFixtures(masterAnchor),
            getPixieDocsNotionFixtures(notionAnchor),
            getPixieDocsFixtures(playgroundAnchor),
        ]);
    const notionConnectionState = getPixieDocsNotionConnectionState();

    return (
        <AtelierFicheAccessoire
            id="pixie-docs"
            labelledBy="pixie-docs-title"
            nom="PixieDocs"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Écran 003
                        </p>
                        <h2
                            id="pixie-docs-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDocs
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-ink-soft">
                            Parcourir une bibliothèque documentaire déjà
                            autorisée sans confondre sa projection avec ses
                            sources, ses routes ou leur analyse.
                        </p>
                    </div>

                    <dl className="grid min-w-64 grid-cols-2 gap-px bg-line md:grid-cols-1">
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                État
                            </dt>
                            <dd className="mt-2">
                                <AtelierStatut statut="Prêt à projeter" />
                            </dd>
                        </div>
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Version
                            </dt>
                            <dd className="mt-2 font-mono text-sm text-ink">
                                1.0.0
                            </dd>
                        </div>
                    </dl>
                </div>
            }
        >
            <section
                aria-labelledby="docs-role"
                className="mt-12 grid gap-px bg-line md:grid-cols-3"
            >
                {[
                    [
                        "Bibliothèque",
                        "Expose uniquement l’arborescence déclarée et les destinations déjà résolues.",
                    ],
                    [
                        "Document",
                        "Accueille un plan React rendu depuis les blocs sûrs sans recevoir le Markdown brut.",
                    ],
                    [
                        "Repères",
                        "Maintient filtre, sommaire actif et raccords précédent/suivant autour de la lecture.",
                    ],
                ].map(([title, description], index) => (
                    <article key={title} className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            0{index + 1} · Rôle
                        </p>
                        <h3
                            id={index === 0 ? "docs-role" : undefined}
                            className="mt-3 text-2xl text-ink"
                        >
                            {title}
                        </h3>
                        <p className="mt-3 leading-7 text-ink-soft">
                            {description}
                        </p>
                    </article>
                ))}
            </section>

            <section
                aria-labelledby="docs-master"
                className="mt-16 border border-line-strong bg-surface-muted p-3 shadow-soft sm:p-6"
            >
                <div className="p-3 sm:p-2">
                    <SequenceTitle
                        id="docs-master"
                        eyebrow="Plan maître"
                        title="Deux bibliothèques, un même contrat de lecture"
                        description="Le registre local demeure la projection de référence. La source Notion rejoint ensuite les mêmes blocs neutres sans transmettre ses identifiants ni sa mécanique au composant."
                    />
                </div>
                <div className="mt-7">
                    <PixieDocsPlayground
                        fixtures={masterFixtures}
                        navigation={getPixieDocsNavigation(masterAnchor)}
                        anchor={masterAnchor}
                        controls={false}
                    />
                </div>
            </section>

            <section aria-labelledby="docs-anatomy" className="mt-16">
                <SequenceTitle
                    id="docs-anatomy"
                    eyebrow="Anatomie"
                    title="Trois cadres, une seule lecture"
                    description="La bibliothèque situe, le document raconte et le sommaire garde le fil. Aucun cadre ne prend la responsabilité d’un autre."
                />

                <div className="mt-8 grid gap-5 lg:grid-cols-3">
                    {[
                        [
                            "Champ gauche",
                            "Arborescence, filtre de titres et état courant dans des listes imbriquées accessibles.",
                        ],
                        [
                            "Plan central",
                            "Titre, métadonnées, état documentaire, matière et raccords de navigation.",
                        ],
                        [
                            "Contrechamp droit",
                            "Sommaire issu de la même analyse, avec indicateur de position au défilement.",
                        ],
                    ].map(([title, description], index) => (
                        <PixiePanel
                            key={title}
                            variant={index === 1 ? "accent" : "outline"}
                            color="violet-ombre-portee"
                            padding="lg"
                        >
                            <PixieBadge
                                variant="outline"
                                size="xs"
                                tone="neutral"
                            >
                                {index + 1}/3
                            </PixieBadge>
                            <h4 className="mt-5 text-xl text-ink">{title}</h4>
                            <p className="mt-3 leading-7 text-ink-soft">
                                {description}
                            </p>
                        </PixiePanel>
                    ))}
                </div>
            </section>

            <section aria-labelledby="docs-responsive" className="mt-16">
                <SequenceTitle
                    id="docs-responsive"
                    eyebrow="Cadres"
                    title="Le montage se recompose sans perdre son ordre"
                    description="Les mêmes régions restent dans le document et ne deviennent ni tiroir modal ni widget ARIA artificiel."
                />
                <div className="mt-8 grid gap-px bg-line md:grid-cols-3">
                    {[
                        [
                            "Grand cadre",
                            "Bibliothèque intégrée flottante au scroll dans la hauteur du document, ou panneau flottant escamotable · document élargi · sommaire sticky.",
                        ],
                        [
                            "Cadre moyen",
                            "Bibliothèque · document · sommaire repliable dans le flux.",
                        ],
                        [
                            "Petit cadre",
                            "Bibliothèque et sommaire deviennent deux disclosures natifs.",
                        ],
                    ].map(([title, description]) => (
                        <article key={title} className="bg-surface p-6">
                            <h4 className="text-xl text-ink">{title}</h4>
                            <p className="mt-3 leading-7 text-ink-soft">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="docs-navigation" className="mt-16">
                <SequenceTitle
                    id="docs-navigation"
                    eyebrow="Navigation"
                    title="Une hiérarchie déclarée, jamais devinée"
                    description="Le serveur fournit titres publics, ordre, parenté et destinations. Pixie se contente de les mettre en scène."
                />
                <div className="mt-8 grid gap-5 lg:grid-cols-2">
                    <Stage>
                        <h4 className="text-xl text-ink">Lien autorisé</h4>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Une destination résolue conserve son href natif ; le
                            changement contrôlé replace le focus sur le titre du
                            document.
                        </p>
                    </Stage>
                    <Stage>
                        <h4 className="text-xl text-ink">Cible réservée</h4>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Une page absente de l’arborescence déclarée reste du
                            texte : aucun href, aucune route, aucune tabulation.
                        </p>
                    </Stage>
                </div>
            </section>

            <section
                aria-labelledby="docs-notion"
                className="mt-16 border border-line-strong bg-surface-muted p-3 shadow-soft sm:p-6"
            >
                <div className="flex flex-wrap items-start justify-between gap-5 p-3 sm:p-2">
                    <SequenceTitle
                        id="docs-notion"
                        eyebrow="Passerelle Notion"
                        title="La bobine distante perd son décor propriétaire, pas son sens"
                        description="La home, le portail Vision & Doctrine et ses neuf sous-pages éprouvent les mentions, colonnes, callouts, tableaux, détails et blocs inconnus. Avec la clé serveur, la home sert de lecture réelle témoin ; les dix autres pages restent des bobines légères dans l’Atelier afin de ne pas précharger toute la bibliothèque avant sa future route."
                    />
                    <PixieBadge
                        variant="outline"
                        size="sm"
                        tone="color"
                        color="violet-ombre-portee"
                    >
                        {notionConnectionState === "configured"
                            ? "Connexion serveur configurée"
                            : "Essai réel différé"}
                    </PixieBadge>
                </div>

                <div className="mt-7">
                    <PixieDocsPlayground
                        fixtures={notionFixtures}
                        navigation={getPixieDocsNotionNavigation(notionAnchor)}
                        anchor={notionAnchor}
                        controls={false}
                        libraryTitle="Les dossiers du Disneyiste"
                        documentEyebrow="Bobine Notion déclarée"
                        authorizedLabel="11 pages déclarées"
                    />
                </div>

                <div className="mt-7 grid gap-5 lg:grid-cols-2">
                    <Stage>
                        <h4 className="text-xl text-ink">
                            Double autorisation
                        </h4>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Le manifeste serveur connaît la racine et les
                            identifiants. L’arborescence de projection ne
                            transmet que titres, slugs, ordre et parenté.
                            L’ascendance réelle doit confirmer les deux.
                        </p>
                    </Stage>
                    <Stage>
                        <h4 className="text-xl text-ink">
                            Dégradation explicite
                        </h4>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Une extension inconnue devient un contrechamp neutre
                            et place le document en état partiel. Une page non
                            déclarée reste du texte sans href ni route.
                        </p>
                    </Stage>
                </div>

                <div className="mt-7">
                    <AtelierCodeBlock>{`manifeste serveur + arbre déclaré + ascendance réelle
    → page autorisée
    → Markdown Notion normalisé
    → analyse Guidebook commune
    → PixieDocs

identifiant absent ou page hors arbre
    → restricted
    → aucun href transmis au navigateur`}</AtelierCodeBlock>
                </div>
            </section>

            <section aria-labelledby="docs-filter" className="mt-16">
                <SequenceTitle
                    id="docs-filter"
                    eyebrow="Filtre de titres"
                    title="Retrouver un chapitre sans fouiller son contenu"
                    description="La requête porte uniquement sur les titres déjà transmis. Les ancêtres et le document courant restent visibles pour préserver le contexte."
                />
                <div className="mt-7">
                    <AtelierCodeBlock>{`filterNavigation(navigation, query, activeSlug)

// conserve :
// - les titres correspondants ;
// - leurs ancêtres ;
// - le document courant ;
// - aucune matière Markdown.`}</AtelierCodeBlock>
                </div>
            </section>

            <section aria-labelledby="docs-states" className="mt-16">
                <SequenceTitle
                    id="docs-states"
                    eyebrow="Plans de coupe"
                    title="Huit états racontent la disponibilité, jamais la valeur"
                    description="Chaque contrechamp reste explicite et la régie permet de les éprouver sur le même document."
                />
                <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4">
                    {states.map(([state, label, description]) => (
                        <article key={state} className="bg-surface p-5">
                            <PixieBadge
                                variant="outline"
                                size="xs"
                                tone="neutral"
                            >
                                {state}
                            </PixieBadge>
                            <h4 className="mt-4 text-lg text-ink">{label}</h4>
                            <p className="mt-2 leading-6 text-ink-soft">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="docs-extremes" className="mt-16">
                <SequenceTitle
                    id="docs-extremes"
                    eyebrow="Bobines témoins"
                    title="La bibliothèque résiste aux arbres difficiles"
                    description="Le contrat stable réserve ses limites avant que les dossiers réels ne les rencontrent."
                />
                <div className="mt-8 grid gap-5 lg:grid-cols-3">
                    {[
                        [
                            "Arbre dense",
                            "Quarante titres, plusieurs branches et un viewport propre au rail de navigation.",
                        ],
                        [
                            "Titre démesuré",
                            "Le texte revient à la ligne sans pousser le statut hors du cadre.",
                        ],
                        [
                            "Branche muette",
                            "Un parent sans destination garde son rôle de groupe sémantique.",
                        ],
                    ].map(([title, description]) => (
                        <Stage key={title}>
                            <h4 className="text-xl text-ink">{title}</h4>
                            <p className="mt-3 leading-7 text-ink-soft">
                                {description}
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section
                aria-labelledby="docs-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="docs-accessibility"
                    eyebrow="Accessibilité"
                    title="Parcourir reste un acte de lecture"
                    description="La structure native précède les effets de plateau et garde la bibliothèque utilisable sans script enrichi."
                />
                <ul className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        "Listes imbriquées plutôt qu’un faux widget tree.",
                        "aria-current distingue document et titre de section actifs.",
                        "Le filtre possède un libellé et annonce un résultat vide.",
                        "En navigation intégrée, la bibliothèque et le sommaire flottent au scroll dans les limites du document ; leur hauteur disponible reste défilable au clavier.",
                        "La bibliothèque flottante reste horizontalement ancrée au bord gauche du composant dans un PixiePanel fixe et ne franchit jamais ses limites haute ou basse. Seule sa languette droite demeure visible au repos ; le clic, le clavier et Échap conservent une conduite complète.",
                        "Le changement contrôlé replace le focus sur le titre.",
                        "Le mouvement réduit ne retire aucune information.",
                    ].map((item) => (
                        <li
                            key={item}
                            className="list-none bg-surface p-5 text-ink-soft"
                        >
                            <span
                                className="mr-3 text-accent"
                                aria-hidden="true"
                            >
                                ◇
                            </span>
                            {item}
                        </li>
                    ))}
                </ul>
            </section>

            <section
                id="pixie-docs-playground"
                aria-labelledby="docs-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="docs-playground-title"
                    eyebrow="Régie"
                    title="Composer la bibliothèque avant d’ouvrir sa route"
                    description="Les sept vrais chapitres changent de cadre, de rythme et d’état sans recharger ni réanalyser leur source."
                />
                <div className="mt-8">
                    <PixieDocsPlayground
                        fixtures={playgroundFixtures}
                        navigation={getPixieDocsNavigation(playgroundAnchor)}
                        denseNavigation={getPixieDocsDenseNavigation(
                            playgroundAnchor,
                        )}
                        anchor={playgroundAnchor}
                    />
                </div>
            </section>

            <section
                aria-labelledby="docs-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="docs-technical"
                    eyebrow="Générique technique"
                    title="API du composant"
                    description="L’assemblage reçoit une navigation résolue et un document déjà projeté. Il ne lit aucun fichier, ne connaît aucune racine Notion et ne crée aucune route."
                />
                <div className="mt-7">
                    <AtelierPropertiesTable properties={properties} />
                </div>
                <div className="mt-10">
                    <h4 className="text-2xl text-ink">Types spécifiques</h4>
                    <div className="mt-5">
                        <AtelierTypesTable types={specificTypes} />
                    </div>
                </div>
            </section>
        </AtelierFicheAccessoire>
    );
}
