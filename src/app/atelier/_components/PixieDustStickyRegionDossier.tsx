import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieDustInset } from "@/components/ui/PixieDustInset";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieDustSidebar } from "@/components/ui/PixieDustSidebar";
import { PixieDustStack } from "@/components/ui/PixieDustStack";
import {
    PixieDustStickyRegion,
    type PixieDustStickyRegionEdge,
    type PixieDustStickyRegionOffset,
} from "@/components/ui/PixieDustStickyRegion";
import { PixieDustStickyRegionPlayground } from "./PixieDustStickyRegionPlayground";

const edges = [
    {
        name: "Début",
        value: "start" as const,
        role: "Sommaire, métadonnées ou en-tête local maintenu en haut.",
    },
    {
        name: "Fin",
        value: "end" as const,
        role: "Actions ou conclusion maintenue au bas de son cadre lorsqu’elle l’atteint.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustStickyRegionEdge;
    role: string;
}>[];

const offsets = [
    { name: "Aucun", value: "none" as const, token: "0" },
    { name: "Très petit", value: "xs" as const, token: "0,5 rem" },
    { name: "Petit", value: "sm" as const, token: "1 rem" },
    { name: "Moyen", value: "md" as const, token: "1,5 rem" },
    { name: "Grand", value: "lg" as const, token: "2 rem" },
    { name: "Très grand", value: "xl" as const, token: "3 rem" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustStickyRegionOffset;
    token: string;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieDustStickyRegionElement",
        defaultValue: '"div"',
        description: "Structure HTML de la région maintenue.",
    },
    {
        name: "edge",
        type: "PixieDustStickyRegionEdge",
        defaultValue: '"start"',
        description: "Bord logique auquel la région s’attache.",
    },
    {
        name: "offset",
        type: "PixieDustStickyRegionOffset",
        defaultValue: '"md"',
        description: "Distance conservée avec le bord choisi.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Région maintenue dans les limites de son parent.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées à la racine de StickyRegion.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustStickyRegionElement",
        values: ['"div"', '"aside"', '"nav"', '"header"'],
        description: "Structures documentaires autorisées.",
    },
    {
        name: "PixieDustStickyRegionEdge",
        values: ['"start"', '"end"'],
        description: "Bords logiques du maintien vertical.",
    },
    {
        name: "PixieDustStickyRegionOffset",
        values: ['"none"', '"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Échelle des décalages du Montage.",
    },
] as const;

const storySections = [
    ["Ouverture", "Le récit présente les premières ambitions du studio."],
    ["Premiers essais", "Les techniques se cherchent au fil des productions."],
    ["Le son", "La musique et les voix commencent à structurer le mouvement."],
    ["La couleur", "La palette devient un nouvel outil de narration."],
    [
        "Les personnages",
        "Les tempéraments donnent un rythme propre aux figures.",
    ],
    [
        "Le studio",
        "Les métiers se spécialisent autour des nouvelles productions.",
    ],
    ["Les récompenses", "Les premiers trophées consacrent les innovations."],
    ["Dernière image", "Le récit rejoint les portes du premier long métrage."],
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
        <div className="max-w-3xl">
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

function CodeExample({ children }: Readonly<{ children: string }>) {
    return (
        <pre className="overflow-x-auto border border-line bg-canvas p-5 font-mono text-sm leading-6 text-ink-soft">
            <code>{children}</code>
        </pre>
    );
}

function Stage({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="min-w-0 overflow-hidden border border-dashed border-line-strong bg-canvas">
            {children}
        </div>
    );
}

function ScrollStage({
    children,
    label,
    height = "h-80",
}: Readonly<{ children: ReactNode; label: string; height?: string }>) {
    return (
        <div
            tabIndex={0}
            aria-label={label}
            className={`${height} overflow-y-auto p-5 sm:p-6`}
        >
            {children}
        </div>
    );
}

function SummaryPanel({
    title = "Dans cette fiche",
}: Readonly<{ title?: string }>) {
    return (
        <PixiePanel variant="outline" padding="md">
            <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                {title}
            </p>
            <ol className="mt-4 space-y-2 text-sm text-ink-soft">
                {["Ouverture", "Le son", "La couleur", "Le studio"].map(
                    (label, index) => (
                        <li key={label}>
                            <span className="mr-2 font-mono text-xs text-accent">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            {label}
                        </li>
                    ),
                )}
            </ol>
        </PixiePanel>
    );
}

function Story({ count = 6 }: Readonly<{ count?: number }>) {
    return (
        <PixieDustStack gap="xl">
            {storySections
                .slice(0, count)
                .map(([title, description], index) => (
                    <section key={title} aria-label={title}>
                        <p className="font-mono text-xs text-accent">
                            Séquence {String(index + 1).padStart(2, "0")}
                        </p>
                        <h5 className="mt-3 text-2xl text-ink">{title}</h5>
                        <p className="mt-4 leading-7 text-ink-soft">
                            {description}
                        </p>
                        <div className="mt-5 h-20 border border-dashed border-line-strong bg-surface-muted" />
                    </section>
                ))}
        </PixieDustStack>
    );
}

export function PixieDustStickyRegionDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-sticky-region"
            labelledBy="pixie-dust-sticky-region-title"
            nom="PixieDustStickyRegion"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Montage 011
                        </p>
                        <h2
                            id="pixie-dust-sticky-region-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustStickyRegion
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Maintenir une région visible pendant le défilement,
                            sans lui faire quitter les limites de son parent.
                        </p>
                    </div>

                    <dl className="grid min-w-64 grid-cols-2 gap-px bg-line md:grid-cols-1">
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Version
                            </dt>
                            <dd className="mt-1 font-mono text-sm text-ink">
                                0.1.0
                            </dd>
                        </div>
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                État
                            </dt>
                            <dd className="mt-1 text-sm font-medium">
                                <AtelierStatut statut="Esquisse" />
                            </dd>
                        </div>
                    </dl>
                </div>
            }
        >
            <section aria-labelledby="sticky-identity" className="mt-14">
                <SequenceTitle
                    id="sticky-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="StickyRegion conserve un repère dans le champ pendant que son contenu voisin défile. Son maintien commence au bord choisi et s’achève avec son parent."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        [
                            "Mission",
                            "Maintenir un repère local pendant une séquence longue.",
                        ],
                        [
                            "Usage",
                            "Sommaires, métadonnées, filtres et actions courtes.",
                        ],
                        [
                            "Limite",
                            "Ne gère ni surface, ni largeur, ni état de navigation.",
                        ],
                        [
                            "Anatomie",
                            "Une région sticky et la limite imposée par son parent.",
                        ],
                        [
                            "Accessibilité",
                            "La position visuelle ne change jamais l’ordre du document.",
                        ],
                        [
                            "Dépendances",
                            "Positionnement CSS uniquement, sans écoute du scroll.",
                        ],
                    ].map(([term, definition]) => (
                        <div key={term} className="bg-surface p-5">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                {term}
                            </dt>
                            <dd className="mt-2 leading-7 text-ink-soft">
                                {definition}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section aria-labelledby="sticky-anatomy" className="mt-16">
                <SequenceTitle
                    id="sticky-anatomy"
                    eyebrow="Anatomie du montage"
                    title="Une région, un seuil et une limite documentaire"
                    description="Faites défiler le plateau : le sommaire rejoint son offset, accompagne le récit, puis cède lorsque son parent se termine."
                />

                <Stage>
                    <ScrollStage
                        label="Anatomie défilable de StickyRegion"
                        height="h-96"
                    >
                        <PixieDustSidebar
                            side="start"
                            sideWidth="sm"
                            contentMinWidth="half"
                            gap="lg"
                            align="start"
                        >
                            <PixieDustStickyRegion
                                as="nav"
                                offset="md"
                                aria-label="Sommaire de démonstration"
                            >
                                <SummaryPanel />
                            </PixieDustStickyRegion>
                            <Story count={7} />
                        </PixieDustSidebar>
                    </ScrollStage>
                </Stage>
            </section>

            <section
                aria-labelledby="sticky-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="sticky-master"
                    eyebrow="Plan maître"
                    title="Le sommaire accompagne une longue fiche"
                    description="Sidebar règle la largeur des deux zones ; Panel donne une surface au sommaire ; StickyRegion maintient uniquement cette régie."
                />

                <div className="mt-7 grid min-w-0 border border-line xl:grid-cols-2">
                    <div className="min-w-0 bg-canvas">
                        <ScrollStage
                            label="Fiche avec sommaire maintenu"
                            height="h-[34rem]"
                        >
                            <PixieDustSidebar
                                side="start"
                                sideWidth="sm"
                                contentMinWidth="half"
                                gap="lg"
                                align="start"
                            >
                                <PixieDustStickyRegion
                                    as="nav"
                                    edge="start"
                                    offset="lg"
                                    aria-label="Dans cette fiche"
                                >
                                    <SummaryPanel />
                                </PixieDustStickyRegion>
                                <Story count={8} />
                            </PixieDustSidebar>
                        </ScrollStage>
                    </div>
                    <CodeExample>{`<PixieDustSidebar align="start">
    <PixieDustStickyRegion
        as="nav"
        edge="start"
        offset="lg"
        aria-label="Dans cette fiche"
    >
        <PixiePanel>{/* Sommaire */}</PixiePanel>
    </PixieDustStickyRegion>

    <PixieDustStack>{/* Long récit */}</PixieDustStack>
</PixieDustSidebar>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="sticky-edges" className="mt-16">
                <SequenceTitle
                    id="sticky-edges"
                    eyebrow="Bord d’attache"
                    title="Deux bords répondent à deux moments du récit"
                    description="start accompagne immédiatement la lecture ; end intervient lorsque la région atteint naturellement la fin du cadre visible."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {edges.map((edge) => (
                        <Stage key={edge.value}>
                            <ScrollStage
                                label={`Région attachée au bord ${edge.name}`}
                            >
                                <PixieDustStack gap="lg">
                                    {edge.value === "end" ? (
                                        <Story count={2} />
                                    ) : null}
                                    <PixieDustStickyRegion
                                        edge={edge.value}
                                        offset="sm"
                                    >
                                        <PixiePanel
                                            variant="accent"
                                            padding="md"
                                        >
                                            <p className="font-mono text-xs text-accent">
                                                Bord {edge.name.toLowerCase()}
                                            </p>
                                            <p className="mt-3 text-sm leading-6 text-ink-soft">
                                                Cette région révèle son maintien
                                                au cours du défilement.
                                            </p>
                                        </PixiePanel>
                                    </PixieDustStickyRegion>
                                    <Story count={5} />
                                </PixieDustStack>
                            </ScrollStage>
                            <div className="border-t border-line bg-surface p-4">
                                <code className="font-mono text-xs text-accent">
                                    edge=&quot;{edge.value}&quot;
                                </code>
                                <p className="mt-3 text-sm leading-6 text-muted">
                                    {edge.role}
                                </p>
                            </div>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="sticky-offsets" className="mt-16">
                <SequenceTitle
                    id="sticky-offsets"
                    eyebrow="Distance au bord"
                    title="Six décalages règlent la ligne d’arrêt"
                    description="L’offset doit tenir compte du cadre local et des éléments déjà présents au bord, sans tenter de deviner automatiquement la hauteur du header."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 md:grid-cols-2 xl:grid-cols-3">
                    {offsets.map((offset) => (
                        <Stage key={offset.value}>
                            <ScrollStage
                                label={`Décalage ${offset.name}`}
                                height="h-72"
                            >
                                <PixieDustStickyRegion offset={offset.value}>
                                    <PixieDustInset
                                        variant="recessed"
                                        padding="md"
                                    >
                                        <p className="font-mono text-xs text-accent">
                                            offset=&quot;{offset.value}&quot;
                                        </p>
                                        <p className="mt-3 text-sm text-ink-soft">
                                            Ligne d’arrêt · {offset.token}
                                        </p>
                                    </PixieDustInset>
                                </PixieDustStickyRegion>
                                <div className="mt-6">
                                    <Story count={4} />
                                </div>
                            </ScrollStage>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="sticky-materials" className="mt-16">
                <SequenceTitle
                    id="sticky-materials"
                    eyebrow="Régions maintenues"
                    title="Sommaire, métadonnées et actions gardent leur propre surface"
                    description="StickyRegion ignore la matière qu’il transporte. Panel et Inset restent responsables de sa lisibilité lorsqu’elle recouvre le récit."
                />

                <div className="mt-7 grid gap-px border border-line bg-line lg:grid-cols-3">
                    <article className="bg-canvas p-6">
                        <SummaryPanel title="Sommaire local" />
                    </article>
                    <article className="bg-canvas p-6">
                        <PixieDustInset variant="recessed" padding="md">
                            <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Métadonnées
                            </p>
                            <dl className="mt-4 space-y-3 text-sm text-ink-soft">
                                <div>
                                    <dt className="text-muted">Période</dt>
                                    <dd className="mt-1 text-ink">1928–1937</dd>
                                </div>
                                <div>
                                    <dt className="text-muted">Œuvres</dt>
                                    <dd className="mt-1 text-ink">
                                        Six jalons
                                    </dd>
                                </div>
                            </dl>
                        </PixieDustInset>
                    </article>
                    <article className="bg-canvas p-6">
                        <PixiePanel variant="accent" padding="md">
                            <p className="text-sm font-medium text-ink">
                                Conserver ce raccord ?
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    className="border border-line px-3 py-2 text-sm text-ink"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="button"
                                    className="bg-accent px-3 py-2 text-sm text-accent-contrast"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </PixiePanel>
                    </article>
                </div>
            </section>

            <section aria-labelledby="sticky-boundary" className="mt-16">
                <SequenceTitle
                    id="sticky-boundary"
                    eyebrow="Limite documentaire"
                    title="Le parent met fin au maintien"
                    description="Contrairement à un élément fixed, la région ne traverse jamais les séquences voisines. Elle demeure rattachée à la composition qui lui donne son sens."
                />

                <Stage>
                    <ScrollStage
                        label="Démonstration de la limite parentale"
                        height="h-96"
                    >
                        <section
                            aria-labelledby="sticky-boundary-parent"
                            className="border border-accent/60 p-5"
                        >
                            <h4
                                id="sticky-boundary-parent"
                                className="text-2xl text-ink"
                            >
                                Parent de la région
                            </h4>
                            <PixieDustSidebar
                                side="start"
                                sideWidth="xs"
                                contentMinWidth="half"
                                gap="md"
                                align="start"
                                className="mt-5"
                            >
                                <PixieDustStickyRegion offset="sm">
                                    <PixiePanel variant="accent" padding="sm">
                                        <p className="text-sm text-ink">
                                            Repère limité
                                        </p>
                                    </PixiePanel>
                                </PixieDustStickyRegion>
                                <Story count={5} />
                            </PixieDustSidebar>
                        </section>
                        <section className="mt-8 border border-line bg-surface-muted p-6">
                            <h4 className="text-2xl text-ink">
                                Séquence suivante
                            </h4>
                            <p className="mt-4 leading-7 text-ink-soft">
                                Le repère précédent ne doit jamais accompagner
                                cette nouvelle partie.
                            </p>
                            <div className="mt-6 h-72 border border-dashed border-line-strong bg-canvas" />
                        </section>
                    </ScrollStage>
                </Stage>
            </section>

            <section aria-labelledby="sticky-tall" className="mt-16">
                <SequenceTitle
                    id="sticky-tall"
                    eyebrow="Limite de contenu"
                    title="Une région trop haute ne doit pas devenir sticky"
                    description="La première version ne crée aucun défilement interne. Si toute la région ne tient pas dans le cadre visible, elle doit être raccourcie ou rester dans le flux normal."
                />

                <div className="mt-7 grid gap-px border border-line bg-line md:grid-cols-2">
                    <article className="bg-surface p-6">
                        <h4 className="text-xl text-ink">Région adaptée</h4>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Un titre et quelques repères restent entièrement
                            atteignables.
                        </p>
                    </article>
                    <article className="bg-surface p-6">
                        <h4 className="text-xl text-ink">Région excessive</h4>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Une longue liste de filtres ou un formulaire complet
                            demande une autre composition.
                        </p>
                    </article>
                </div>
            </section>

            <section aria-labelledby="sticky-ancestors" className="mt-16">
                <SequenceTitle
                    id="sticky-ancestors"
                    eyebrow="Conditions de plateau"
                    title="Les ancêtres définissent le comportement réel"
                    description="Sticky dépend de la hauteur disponible et du premier ancêtre qui porte un mécanisme de défilement. Ces contraintes doivent être vérifiées dans la composition finale."
                />

                <div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        [
                            "Hauteur",
                            "Le parent doit être plus haut que la région maintenue.",
                        ],
                        [
                            "Overflow",
                            "Un ancêtre défilant devient le nouveau cadre de référence.",
                        ],
                        [
                            "Étirement",
                            "La racine neutralise le stretch courant des grilles.",
                        ],
                        [
                            "Superposition",
                            "La surface et son éventuel z-index restent à composer.",
                        ],
                    ].map(([title, description]) => (
                        <article key={title} className="bg-surface p-5">
                            <h4 className="text-lg text-ink">{title}</h4>
                            <p className="mt-3 text-sm leading-6 text-ink-soft">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="sticky-semantics" className="mt-16">
                <SequenceTitle
                    id="sticky-semantics"
                    eyebrow="Structure documentaire"
                    title="La région conserve le rôle de son contenu"
                    description="La position sticky n’ajoute aucun sens. Le choix de l’élément dépend toujours de la fonction réelle de la région."
                />

                <div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        ["div", "Raccord neutre déjà décrit par son contexte."],
                        [
                            "aside",
                            "Informations complémentaires au récit principal.",
                        ],
                        [
                            "nav",
                            "Ensemble nommé de liens de navigation locale.",
                        ],
                        [
                            "header",
                            "En-tête propre à une séquence ou une table.",
                        ],
                    ].map(([element, description]) => (
                        <article key={element} className="bg-surface p-5">
                            <code className="font-mono text-sm text-accent">
                                as=&quot;{element}&quot;
                            </code>
                            <p className="mt-3 text-sm leading-6 text-ink-soft">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="sticky-boundaries" className="mt-16">
                <SequenceTitle
                    id="sticky-boundaries"
                    eyebrow="Raccords de montage"
                    title="Maintenir une région sans lui donner de nouvelles responsabilités"
                    description="La primitive se combine avec le Montage mais ne remplace aucune de ses structures."
                />

                <div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        [
                            "Sidebar",
                            "Répartit une régie et un contenu principal.",
                        ],
                        [
                            "StickyRegion",
                            "Maintient l’une de ces régions dans son parent.",
                        ],
                        [
                            "Fixed",
                            "Ignorerait le parent pour suivre toute la fenêtre.",
                        ],
                        [
                            "ScrollSpy",
                            "Observerait le récit et gérerait un état actif.",
                        ],
                    ].map(([title, description]) => (
                        <article key={title} className="bg-surface p-5">
                            <h4 className="text-lg text-ink">{title}</h4>
                            <p className="mt-3 text-sm leading-6 text-ink-soft">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section
                id="pixie-dust-sticky-region-playground"
                aria-labelledby="sticky-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="sticky-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieDustStickyRegion"
                    description="Réglez le bord, le décalage et la matière de la région, puis faites défiler le plateau pour observer son maintien et sa limite."
                />
                <div className="mt-8">
                    <PixieDustStickyRegionPlayground />
                </div>
            </section>

            <section
                aria-labelledby="sticky-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="sticky-accessibility"
                    eyebrow="Accessibilité"
                    title="Le repère reste visible sans troubler le parcours"
                    description="Le maintien visuel n’altère ni l’ordre de lecture, ni le focus, ni la structure annoncée aux technologies d’assistance."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Ordre naturel",
                            "La région reste exactement à sa place dans le DOM.",
                        ],
                        [
                            "Navigation nommée",
                            "Toute racine nav reçoit aria-label ou aria-labelledby.",
                        ],
                        [
                            "Focus préservé",
                            "Les contrôles conservent leur ordre et leur halo visible.",
                        ],
                        [
                            "Ancres visibles",
                            "La région ne doit pas masquer le titre rejoint par un lien.",
                        ],
                        [
                            "Zoom à 200 %",
                            "Tout le contenu sticky doit demeurer entièrement atteignable.",
                        ],
                        [
                            "Sans mouvement",
                            "Aucune animation ou écoute du scroll n’est nécessaire.",
                        ],
                    ].map(([title, description]) => (
                        <article key={title} className="bg-surface p-6">
                            <h4 className="text-lg text-ink">{title}</h4>
                            <p className="mt-3 leading-7 text-ink-soft">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section
                aria-labelledby="sticky-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="sticky-technical"
                    eyebrow="Générique technique"
                    title="API de l’esquisse"
                    description="Les types spécifiques restent colocalisés dans PixieDustStickyRegion.types.ts ; la primitive demeure statique et le playground porte seul l’état client."
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

            <section aria-labelledby="sticky-journal" className="mt-16">
                <SequenceTitle
                    id="sticky-journal"
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="Cette dernière esquisse du Montage devra être éprouvée sur les vraies fiches et les vrais index du Codex."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Tester sommaires, métadonnées, filtres et actions dans Sidebar.",
                        "Éprouver les deux bords et les six décalages dans de longs parents.",
                        "Vérifier les ancêtres portant overflow, transform ou une hauteur contrainte.",
                        "Contrôler les régions proches de la hauteur visible et refuser les cas excessifs.",
                        "Éprouver les deux Lumières, le mobile, le clavier et le zoom à 200 %.",
                        "Décider si start et md restent les bons réglages par défaut.",
                    ].map((decision) => (
                        <li
                            key={decision}
                            className="bg-surface p-5 leading-7 text-ink-soft"
                        >
                            {decision}
                        </li>
                    ))}
                </ul>
            </section>
        </AtelierFicheAccessoire>
    );
}
