import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieInset } from "@/components/ui/PixieInset";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieSidebar } from "@/components/ui/PixieSidebar";
import { PixieStack } from "@/components/ui/PixieStack";
import {
    PixieDustStickyRegion,
    type PixieDustStickyRegionEdge,
    type PixieDustStickyRegionLayer,
    type PixieDustStickyRegionOffset,
    type PixieDustStickyRegionOverflow,
    type PixieDustStickyRegionWidth,
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

const widths = [
    {
        name: "Pleine largeur",
        value: "full" as const,
        role: "La région occupe toute la mesure offerte par son parent.",
    },
    {
        name: "Ajustée",
        value: "fit" as const,
        role: "La région conserve uniquement la mesure nécessaire à son contenu.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustStickyRegionWidth;
    role: string;
}>[];

const overflows = [
    {
        name: "Visible",
        value: "visible" as const,
        role: "Le contenu court conserve son écoulement naturel.",
    },
    {
        name: "Automatique",
        value: "auto" as const,
        role: "Une région haute reste atteignable dans l’espace visible.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustStickyRegionOverflow;
    role: string;
}>[];

const layers = [
    { name: "Automatique", value: "auto" as const, token: "auto" },
    { name: "Surélevé", value: "raised" as const, token: "1" },
    { name: "Superposé", value: "overlay" as const, token: "10" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustStickyRegionLayer;
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
        description: "Preset ou distance en pixels conservée avec le bord.",
    },
    {
        name: "width",
        type: "PixieDustStickyRegionWidth",
        defaultValue: '"full"',
        description: "Mesure pleine ou ajustée au contenu.",
    },
    {
        name: "overflow",
        type: "PixieDustStickyRegionOverflow",
        defaultValue: '"visible"',
        description: "Traitement des régions plus hautes que le cadre visible.",
    },
    {
        name: "safeArea",
        type: "boolean",
        defaultValue: "false",
        description: "Ajoute la zone de sécurité système à l’offset.",
    },
    {
        name: "layer",
        type: "PixieDustStickyRegionLayer",
        defaultValue: '"auto"',
        description: "Niveau de superposition de la région maintenue.",
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
        values: ['"div"', '"aside"', '"nav"', '"header"', '"footer"'],
        description: "Structures documentaires autorisées.",
    },
    {
        name: "PixieDustStickyRegionEdge",
        values: ['"start"', '"end"'],
        description: "Bords logiques du maintien vertical.",
    },
    {
        name: "PixieDustStickyRegionOffsetPreset",
        values: ['"none"', '"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Échelle éditoriale des distances au bord.",
    },
    {
        name: "PixieDustStickyRegionOffset",
        values: ['"none"', '"xs"', '"sm"', '"md"', '"lg"', '"xl"', "number"],
        description: "Échelle du Montage ou valeur personnalisée en pixels.",
    },
    {
        name: "PixieDustStickyRegionWidth",
        values: ['"full"', '"fit"'],
        description: "Mesures disponibles pour la racine.",
    },
    {
        name: "PixieDustStickyRegionOverflow",
        values: ['"visible"', '"auto"'],
        description: "Comportement des contenus hauts.",
    },
    {
        name: "PixieDustStickyRegionLayer",
        values: ['"auto"', '"raised"', '"overlay"'],
        description: "Niveaux locaux de superposition.",
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

function CodeExample({ children }: Readonly<{ children: string }>) {
    return <AtelierCodeBlock>{children}</AtelierCodeBlock>;
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
        <PixieStack gap="xl">
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
        </PixieStack>
    );
}

export function PixieDustStickyRegionDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-sticky-region"
            labelledBy="pixie-dust-sticky-region-title"
            nom="PixieDustStickyRegion"
            className="scroll-mt-8"
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
                                0.2.0
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
                            "Ne gère ni surface, ni colonnes, ni état de navigation.",
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
                        <PixieSidebar
                            side="start"
                            sidebar={
                                <PixieDustStickyRegion
                                    as="nav"
                                    offset="md"
                                    aria-label="Sommaire de démonstration"
                                >
                                    <SummaryPanel />
                                </PixieDustStickyRegion>
                            }
                            sideWidth="sm"
                            contentMinWidth="half"
                            gap="lg"
                            align="start"
                        >
                            <Story count={7} />
                        </PixieSidebar>
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
                            <PixieSidebar
                                side="start"
                                sidebar={
                                    <PixieDustStickyRegion
                                        as="nav"
                                        edge="start"
                                        offset="lg"
                                        aria-label="Dans cette fiche"
                                    >
                                        <SummaryPanel />
                                    </PixieDustStickyRegion>
                                }
                                sideWidth="sm"
                                contentMinWidth="half"
                                gap="lg"
                                align="start"
                            >
                                <Story count={8} />
                            </PixieSidebar>
                        </ScrollStage>
                    </div>
                    <CodeExample>{`<PixieSidebar
    align="start"
    sidebar={
        <PixieDustStickyRegion
            as="nav"
            edge="start"
            offset="lg"
            aria-label="Dans cette fiche"
        >
            <PixiePanel>{/* Sommaire */}</PixiePanel>
        </PixieDustStickyRegion>
    }
>
    <PixieStack>{/* Long récit */}</PixieStack>
</PixieSidebar>`}</CodeExample>
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
                                <PixieStack gap="lg">
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
                                </PixieStack>
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
                    title="Six décalages et une mesure libre règlent la ligne d’arrêt"
                    description="L’offset suit l’échelle du Montage ou reçoit une valeur en pixels lorsque le cadre local doit s’accorder précisément à un header existant."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 md:grid-cols-2 xl:grid-cols-3">
                    {offsets.map((offset) => (
                        <Stage key={offset.value}>
                            <ScrollStage
                                label={`Décalage ${offset.name}`}
                                height="h-72"
                            >
                                <PixieDustStickyRegion offset={offset.value}>
                                    <PixieInset variant="recessed" padding="md">
                                        <p className="font-mono text-xs text-accent">
                                            offset=&quot;{offset.value}&quot;
                                        </p>
                                        <p className="mt-3 text-sm text-ink-soft">
                                            Ligne d’arrêt · {offset.token}
                                        </p>
                                    </PixieInset>
                                </PixieDustStickyRegion>
                                <div className="mt-6">
                                    <Story count={4} />
                                </div>
                            </ScrollStage>
                        </Stage>
                    ))}
                    <Stage>
                        <ScrollStage
                            label="Décalage personnalisé de 72 pixels"
                            height="h-72"
                        >
                            <PixieDustStickyRegion offset={72}>
                                <PixieInset variant="recessed" padding="md">
                                    <p className="font-mono text-xs text-accent">
                                        offset=&#123;72&#125;
                                    </p>
                                    <p className="mt-3 text-sm text-ink-soft">
                                        Mesure libre · 72 px
                                    </p>
                                </PixieInset>
                            </PixieDustStickyRegion>
                            <div className="mt-6">
                                <Story count={4} />
                            </div>
                        </ScrollStage>
                    </Stage>
                </div>
            </section>

            <section aria-labelledby="sticky-width" className="mt-16">
                <SequenceTitle
                    id="sticky-width"
                    eyebrow="Mesure de la région"
                    title="Pleine largeur ou ajustée à sa matière"
                    description="full accompagne une régie ou une barre complète ; fit conserve une étiquette, un compteur ou une commande compacte sans étirer sa surface."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {widths.map((width) => (
                        <Stage key={width.value}>
                            <div className="min-h-52 p-5">
                                <PixieDustStickyRegion
                                    width={width.value}
                                    offset="sm"
                                >
                                    <PixiePanel variant="accent" padding="sm">
                                        <p className="text-sm text-ink">
                                            {width.name}
                                        </p>
                                    </PixiePanel>
                                </PixieDustStickyRegion>
                            </div>
                            <div className="border-t border-line bg-surface p-4">
                                <code className="font-mono text-xs text-accent">
                                    width=&quot;{width.value}&quot;
                                </code>
                                <p className="mt-3 text-sm leading-6 text-muted">
                                    {width.role}
                                </p>
                            </div>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="sticky-layer" className="mt-16">
                <SequenceTitle
                    id="sticky-layer"
                    eyebrow="Profondeur du maintien"
                    title="Trois niveaux protègent la région au croisement des plans"
                    description="La surface reste confiée à Panel ou Inset ; layer ne règle que l’ordre local de superposition lorsque le contenu voisin passe sous la région."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 md:grid-cols-3">
                    {layers.map((layer) => (
                        <Stage key={layer.value}>
                            <div className="relative min-h-48 overflow-hidden p-5">
                                <div className="absolute inset-x-12 top-16 h-24 rotate-3 border border-line-strong bg-surface-muted" />
                                <PixieDustStickyRegion
                                    width="fit"
                                    layer={layer.value}
                                >
                                    <PixiePanel variant="accent" padding="sm">
                                        <p className="font-mono text-xs text-accent">
                                            z-index · {layer.token}
                                        </p>
                                    </PixiePanel>
                                </PixieDustStickyRegion>
                            </div>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                layer=&quot;{layer.value}&quot;
                            </p>
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
                        <PixieInset variant="recessed" padding="md">
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
                        </PixieInset>
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
                            <PixieSidebar
                                side="start"
                                sidebar={
                                    <PixieDustStickyRegion offset="sm">
                                        <PixiePanel
                                            variant="accent"
                                            padding="sm"
                                        >
                                            <p className="text-sm text-ink">
                                                Repère limité
                                            </p>
                                        </PixiePanel>
                                    </PixieDustStickyRegion>
                                }
                                sideWidth="xs"
                                contentMinWidth="half"
                                gap="md"
                                align="start"
                                className="mt-5"
                            >
                                <Story count={5} />
                            </PixieSidebar>
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
                    eyebrow="Contenu de grande hauteur"
                    title="Le défilement interne garde chaque commande atteignable"
                    description="visible préserve le comportement naturel des régions courtes ; auto borne un inspecteur plus haut que la fenêtre et lui confie son propre défilement."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {overflows.map((overflow) => (
                        <Stage key={overflow.value}>
                            <div className="h-80 overflow-y-auto p-5">
                                <PixieDustStickyRegion
                                    overflow={overflow.value}
                                    offset="sm"
                                    layer="raised"
                                    className={
                                        overflow.value === "auto"
                                            ? "max-h-56"
                                            : ""
                                    }
                                >
                                    <PixiePanel variant="outline" padding="md">
                                        <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                            Inspecteur
                                        </p>
                                        <PixieStack gap="sm" className="mt-4">
                                            {Array.from(
                                                { length: 9 },
                                                (_, index) => (
                                                    <label
                                                        key={index}
                                                        className="flex items-center gap-3 border border-line bg-canvas px-3 py-2 text-sm text-ink-soft"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            defaultChecked={
                                                                index < 2
                                                            }
                                                        />
                                                        Repère {index + 1}
                                                    </label>
                                                ),
                                            )}
                                        </PixieStack>
                                    </PixiePanel>
                                </PixieDustStickyRegion>
                                <div className="mt-6">
                                    <Story count={4} />
                                </div>
                            </div>
                            <div className="border-t border-line bg-surface p-4">
                                <code className="font-mono text-xs text-accent">
                                    overflow=&quot;{overflow.value}&quot;
                                </code>
                                <p className="mt-3 text-sm leading-6 text-muted">
                                    {overflow.role}
                                </p>
                            </div>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="sticky-safe-area" className="mt-16">
                <SequenceTitle
                    id="sticky-safe-area"
                    eyebrow="Cadre système"
                    title="La zone de sécurité complète l’offset choisi"
                    description="safeArea ajoute l’encoche ou la barre système du bord actif sans remplacer la distance éditoriale définie par offset."
                />

                <div className="mt-7 grid gap-px border border-line bg-line md:grid-cols-2">
                    <article className="bg-surface p-6">
                        <h4 className="text-xl text-ink">Bord supérieur</h4>
                        <code className="mt-4 block font-mono text-xs text-accent">
                            edge=&quot;start&quot; safeArea
                        </code>
                        <p className="mt-3 leading-7 text-ink-soft">
                            L’offset inclut safe-area-inset-top sur les écrans
                            concernés.
                        </p>
                    </article>
                    <article className="bg-surface p-6">
                        <h4 className="text-xl text-ink">Bord inférieur</h4>
                        <code className="mt-4 block font-mono text-xs text-accent">
                            edge=&quot;end&quot; safeArea
                        </code>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Une barre d’actions évite safe-area-inset-bottom
                            sans calcul côté client.
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
                            "layer règle l’ordre local ; la surface reste à composer.",
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

                <div className="mt-7 grid gap-px border border-line sm:grid-cols-2 lg:grid-cols-5">
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
                        [
                            "footer",
                            "Actions ou conclusion attachées au bas d’une séquence.",
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
                    description="Réglez le bord, l’offset, la largeur, le débordement et la profondeur, puis faites défiler le plateau pour observer le maintien et sa limite."
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
                            "overflow auto rend la région défilable au clavier sans déplacer ses contrôles.",
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
                        "Tester sommaires, métadonnées, inspecteurs et actions dans PixieSidebar.",
                        "Éprouver les deux bords, les presets et l’offset numérique dans de longs parents.",
                        "Vérifier les ancêtres portant overflow, transform ou une hauteur contrainte.",
                        "Contrôler overflow auto au clavier avec une région proche de la hauteur visible.",
                        "Éprouver safeArea, les deux Lumières, le mobile et le zoom à 200 %.",
                        "Valider start, md, full, visible et auto comme réglages par défaut.",
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
