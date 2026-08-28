import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieCluster } from "@/components/ui/PixieCluster";
import { PixieGrid } from "@/components/ui/PixieGrid";
import { PixieSection } from "@/components/ui/PixieSection";
import {
    PixieSidebar,
    type PixieSidebarAlign,
    type PixieSidebarContentMinWidth,
    type PixieSidebarGap,
    type PixieSidebarSide,
    type PixieSidebarSideWidth,
} from "@/components/ui/PixieSidebar";
import { PixieStack } from "@/components/ui/PixieStack";
import { PixieSidebarPlayground } from "./PixieSidebarPlayground";

const sides = [
    {
        name: "Début",
        value: "start" as const,
        role: "La régie précède le contenu dans le document.",
    },
    {
        name: "Fin",
        value: "end" as const,
        role: "Le contenu précède la régie dans le document.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieSidebarSide;
    role: string;
}>[];

const sideWidths = [
    {
        name: "Très petite",
        value: "xs" as const,
        token: "10 rem",
        role: "Sommaire ou repères très compacts.",
    },
    {
        name: "Petite",
        value: "sm" as const,
        token: "14 rem",
        role: "Navigation courte ou quelques filtres.",
    },
    {
        name: "Moyenne",
        value: "md" as const,
        token: "18 rem",
        role: "Régie de contrôles courante.",
    },
    {
        name: "Grande",
        value: "lg" as const,
        token: "24 rem",
        role: "Documentation ou commandes plus riches.",
    },
    {
        name: "Très grande",
        value: "xl" as const,
        token: "30 rem",
        role: "Inspecteur, aperçu ou documentation particulièrement dense.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieSidebarSideWidth;
    token: string;
    role: string;
}>[];

const contentWidths = [
    {
        name: "Moitié",
        value: "half" as const,
        token: "50 %",
        role: "Le contenu accepte un partage assez souple.",
    },
    {
        name: "Deux tiers",
        value: "two-thirds" as const,
        token: "66,67 %",
        role: "Le contenu conserve une priorité nette.",
    },
    {
        name: "Trois quarts",
        value: "three-quarters" as const,
        token: "75 %",
        role: "Le contenu provoque tôt le passage en pile.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieSidebarContentMinWidth;
    token: string;
    role: string;
}>[];

const gaps = [
    { name: "Aucun", value: "none" as const, token: "0" },
    { name: "Très petit", value: "xs" as const, token: "0,5 rem" },
    { name: "Petit", value: "sm" as const, token: "1 rem" },
    { name: "Moyen", value: "md" as const, token: "1,5 rem" },
    { name: "Grand", value: "lg" as const, token: "2 rem" },
    { name: "Très grand", value: "xl" as const, token: "3 rem" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieSidebarGap;
    token: string;
}>[];

const alignments = [
    { name: "Étiré", value: "stretch" as const },
    { name: "Début", value: "start" as const },
    { name: "Centre", value: "center" as const },
    { name: "Fin", value: "end" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieSidebarAlign;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieSidebarElement",
        defaultValue: '"div"',
        description: "Structure HTML qui porte la régie et le contenu.",
    },
    {
        name: "side",
        type: "PixieSidebarSide",
        defaultValue: '"start"',
        description: "Place logique de la régie dans la composition.",
    },
    {
        name: "sideWidth",
        type: "PixieSidebarSideWidth",
        defaultValue: '"md"',
        description: "Largeur de référence de la régie latérale.",
    },
    {
        name: "contentMinWidth",
        type: "PixieSidebarContentMinWidth",
        defaultValue: '"two-thirds"',
        description: "Part minimale réservée au contenu principal.",
    },
    {
        name: "gap",
        type: "PixieSidebarGap",
        defaultValue: '"lg"',
        description: "Intervalle entre la régie et le contenu.",
    },
    {
        name: "rowGap",
        type: "PixieSidebarGap",
        defaultValue: "gap",
        description: "Surcharge de l’intervalle lorsque les zones s’empilent.",
    },
    {
        name: "columnGap",
        type: "PixieSidebarGap",
        defaultValue: "gap",
        description:
            "Surcharge de l’intervalle lorsque les zones se partagent une ligne.",
    },
    {
        name: "align",
        type: "PixieSidebarAlign",
        defaultValue: '"stretch"',
        description: "Alignement vertical des deux zones.",
    },
    {
        name: "sidebar",
        type: "ReactNode",
        defaultValue: "—",
        description: "Régie latérale, identifiée sans dépendre de sa position.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Contenu principal qui reçoit l’espace disponible.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées à la racine du Sidebar.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieSidebarElement",
        values: ['"div"', '"section"', '"article"'],
        description: "Structures documentaires autorisées.",
    },
    {
        name: "PixieSidebarSide",
        values: ['"start"', '"end"'],
        description: "Position documentaire de la régie.",
    },
    {
        name: "PixieSidebarSideWidth",
        values: ['"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Largeurs de référence de la régie.",
    },
    {
        name: "PixieSidebarContentMinWidth",
        values: ['"half"', '"two-thirds"', '"three-quarters"'],
        description: "Protections relatives du contenu principal.",
    },
    {
        name: "PixieSidebarGap",
        values: ['"none"', '"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Échelle des intervalles du Montage.",
    },
    {
        name: "PixieSidebarAlign",
        values: ['"stretch"', '"start"', '"center"', '"end"'],
        description: "Alignements verticaux des deux zones.",
    },
] as const;

const archiveTitles = [
    "Steamboat Willie",
    "The Skeleton Dance",
    "Flowers and Trees",
    "Three Little Pigs",
] as const;

function CodeExample({ children }: Readonly<{ children: string }>) {
    return <AtelierCodeBlock>{children}</AtelierCodeBlock>;
}

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
        <div className="overflow-hidden border border-dashed border-line-strong bg-canvas">
            {children}
        </div>
    );
}

function SidebarPane({
    label = "Régie latérale",
    className = "",
}: Readonly<{ label?: string; className?: string }>) {
    return (
        <aside
            aria-label={label}
            className={`border border-line bg-surface-muted p-5 ${className}`.trim()}
        >
            <p className="font-mono text-xs text-accent">{label}</p>
            <PixieStack gap="xs" className="mt-4">
                {[
                    "Premier réglage",
                    "Deuxième réglage",
                    "Troisième réglage",
                ].map((item) => (
                    <div
                        key={item}
                        className="border border-line bg-canvas px-3 py-2 text-xs text-muted"
                    >
                        {item}
                    </div>
                ))}
            </PixieStack>
        </aside>
    );
}

function ContentPane({
    label = "Contenu principal",
    className = "",
}: Readonly<{ label?: string; className?: string }>) {
    return (
        <div
            className={`min-w-0 border border-line bg-surface p-5 ${className}`.trim()}
        >
            <p className="font-mono text-xs text-accent">{label}</p>
            <div className="mt-4 h-24 border border-dashed border-line-strong bg-canvas" />
        </div>
    );
}

export function PixieSidebarDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-sidebar"
            labelledBy="pixie-sidebar-title"
            nom="PixieSidebar"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Montage 007
                        </p>
                        <h2
                            id="pixie-sidebar-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieSidebar
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Associer une régie de largeur maîtrisée à un contenu
                            principal qui conserve la priorité dans le cadre.
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
            <section aria-labelledby="sidebar-identity" className="mt-14">
                <SequenceTitle
                    id="sidebar-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Sidebar met en regard deux zones asymétriques : la régie conserve une mesure de référence tandis que le contenu absorbe presque tout l’espace libre."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        [
                            "Mission",
                            "Associer une régie latérale à un contenu prioritaire.",
                        ],
                        [
                            "Usage",
                            "Filtres, sommaires, navigation locale et documentation.",
                        ],
                        [
                            "Limite",
                            "Ne gère ni ouverture, ni fermeture, ni position collante.",
                        ],
                        [
                            "Anatomie",
                            "Une régie nommée et un contenu principal indépendant de leur position.",
                        ],
                        [
                            "Accessibilité",
                            "L’ordre visuel, documentaire et clavier reste concordant.",
                        ],
                        [
                            "Dépendances",
                            "Flexbox uniquement, sans calcul côté client.",
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

            <section aria-labelledby="sidebar-anatomy" className="mt-16">
                <SequenceTitle
                    id="sidebar-anatomy"
                    eyebrow="Anatomie du montage"
                    title="Une régie mesurée, un contenu prioritaire"
                    description="sideWidth donne une base à la régie ; contentMinWidth décide combien d’espace le contenu doit conserver pour rester sur la même ligne."
                />

                <div className="mt-7 border border-accent/60 bg-canvas p-4 sm:p-6">
                    <p className="font-mono text-xs text-accent">
                        PixieSidebar · side + sideWidth + contentMinWidth
                    </p>
                    <PixieSidebar
                        side="start"
                        sidebar={<SidebarPane label="01 · Régie" />}
                        sideWidth="sm"
                        contentMinWidth="two-thirds"
                        gap="md"
                        className="mt-4"
                    >
                        <ContentPane label="02 · Contenu prioritaire" />
                    </PixieSidebar>
                </div>
            </section>

            <section
                aria-labelledby="sidebar-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="sidebar-master"
                    eyebrow="Plan maître"
                    title="La régie accompagne sans étouffer les archives"
                    description="Les filtres conservent leur mesure tandis que la collection reçoit l’espace restant et provoque la superposition si nécessaire."
                />

                <div className="mt-7 grid border border-line xl:grid-cols-2">
                    <div className="bg-canvas p-6 sm:p-8">
                        <PixieSidebar
                            side="start"
                            sidebar={
                                <aside
                                    aria-labelledby="sidebar-master-filters"
                                    className="border border-line bg-surface-muted p-5"
                                >
                                    <h4
                                        id="sidebar-master-filters"
                                        className="text-xl text-ink"
                                    >
                                        Régie des archives
                                    </h4>
                                    <PixieStack gap="xs" className="mt-5">
                                        {[
                                            "Mickey Mouse",
                                            "Silly Symphonies",
                                            "Oswald",
                                        ].map((label) => (
                                            <div
                                                key={label}
                                                className="border border-line bg-canvas px-3 py-2 text-sm text-ink-soft"
                                            >
                                                {label}
                                            </div>
                                        ))}
                                    </PixieStack>
                                </aside>
                            }
                            sideWidth="sm"
                            contentMinWidth="two-thirds"
                            gap="xl"
                            align="start"
                        >
                            <section aria-labelledby="sidebar-master-results">
                                <PixieStack gap="md">
                                    <div>
                                        <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                            Contenu principal
                                        </p>
                                        <h4
                                            id="sidebar-master-results"
                                            className="mt-2 text-3xl text-ink"
                                        >
                                            Quatre archives
                                        </h4>
                                    </div>
                                    <PixieGrid
                                        maxColumns={2}
                                        minItemWidth="sm"
                                        gap="sm"
                                    >
                                        {archiveTitles.map((title, index) => (
                                            <PixieCard
                                                key={title}
                                                as="article"
                                                variant="outline"
                                                padding="md"
                                            >
                                                <p className="font-mono text-xs text-accent">
                                                    19{28 + index}
                                                </p>
                                                <h5 className="mt-2 text-lg text-ink">
                                                    {title}
                                                </h5>
                                            </PixieCard>
                                        ))}
                                    </PixieGrid>
                                </PixieStack>
                            </section>
                        </PixieSidebar>
                    </div>
                    <CodeExample>{`<PixieSidebar
    side="start"
    sidebar={<aside>{/* Régie latérale */}</aside>}
    sideWidth="sm"
    contentMinWidth="two-thirds"
    gap="xl"
    align="start"
>
    <section>{/* Contenu principal */}</section>
</PixieSidebar>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="sidebar-sides" className="mt-16">
                <SequenceTitle
                    id="sidebar-sides"
                    eyebrow="Position documentaire"
                    title="La régie ouvre ou referme la séquence"
                    description="side place la régie nommée avant ou après le contenu et maintient automatiquement la concordance entre ordre visuel, document et clavier."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {sides.map((side) => (
                        <Stage key={side.value}>
                            <PixieSidebar
                                side={side.value}
                                sidebar={<SidebarPane label="Régie" />}
                                sideWidth="xs"
                                contentMinWidth="half"
                                gap="sm"
                                className="p-4"
                            >
                                <ContentPane label="Contenu" />
                            </PixieSidebar>
                            <div className="border-t border-line bg-surface p-4">
                                <h4 className="text-lg text-ink">
                                    {side.name}
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-muted">
                                    {side.role}
                                </p>
                            </div>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="sidebar-widths" className="mt-16">
                <SequenceTitle
                    id="sidebar-widths"
                    eyebrow="Mesure de la régie"
                    title="Cinq largeurs cadrent les commandes"
                    description="La mesure reste une base : sur une ligne, le contenu absorbe presque tout le surplus ; en pile, la régie retrouve toute la largeur."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {sideWidths.map((width) => (
                        <Stage key={width.value}>
                            <PixieSidebar
                                side="start"
                                sidebar={<SidebarPane />}
                                sideWidth={width.value}
                                contentMinWidth="half"
                                gap="sm"
                                className="p-4"
                            >
                                <ContentPane />
                            </PixieSidebar>
                            <div className="border-t border-line bg-surface p-4">
                                <div className="flex flex-wrap items-baseline justify-between gap-3">
                                    <h4 className="text-lg text-ink">
                                        {width.name}
                                    </h4>
                                    <code className="font-mono text-xs text-accent">
                                        {width.value} · {width.token}
                                    </code>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-muted">
                                    {width.role}
                                </p>
                            </div>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="sidebar-content-width" className="mt-16">
                <SequenceTitle
                    id="sidebar-content-width"
                    eyebrow="Priorité du contenu"
                    title="Trois protections règlent le passage en pile"
                    description="Plus la part minimale augmente, plus tôt le contenu refuse de partager sa ligne avec la régie."
                />

                <div className="mt-7 space-y-6 bg-canvas p-6">
                    {contentWidths.map((width) => (
                        <Stage key={width.value}>
                            <PixieSidebar
                                side="start"
                                sidebar={<SidebarPane />}
                                sideWidth="sm"
                                contentMinWidth={width.value}
                                gap="md"
                                className="p-4"
                            >
                                <ContentPane />
                            </PixieSidebar>
                            <div className="border-t border-line bg-surface p-4">
                                <div className="flex flex-wrap items-baseline justify-between gap-3">
                                    <h4 className="text-lg text-ink">
                                        {width.name}
                                    </h4>
                                    <code className="font-mono text-xs text-accent">
                                        {width.value} · {width.token}
                                    </code>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-muted">
                                    {width.role}
                                </p>
                            </div>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="sidebar-responsive" className="mt-16">
                <SequenceTitle
                    id="sidebar-responsive"
                    eyebrow="Raccord responsive"
                    title="La largeur du cadre décide du montage"
                    description="La même composition traverse trois cadres. La régie et le contenu occupent chacun toute la ligne dès que leur contrat commun ne tient plus."
                />

                <div className="mt-7 space-y-8 bg-canvas p-6">
                    {[
                        ["Compact", "max-w-sm"],
                        ["Moyen", "max-w-2xl"],
                        ["Large", "max-w-5xl"],
                    ].map(([label, frameClass]) => (
                        <div key={label} className={frameClass}>
                            <p className="mb-3 font-mono text-xs text-accent">
                                {label}
                            </p>
                            <PixieSidebar
                                side="start"
                                sidebar={<SidebarPane />}
                                sideWidth="md"
                                contentMinWidth="two-thirds"
                                gap="md"
                            >
                                <ContentPane />
                            </PixieSidebar>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="sidebar-scenarios" className="mt-16">
                <SequenceTitle
                    id="sidebar-scenarios"
                    eyebrow="Scénarios préparés"
                    title="Quatre régies pour quatre rythmes documentaires"
                    description="La même primitive accompagne une navigation, une identité, un complément de lecture ou un outil d’inspection sans imposer leur surface ni leur comportement."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 xl:grid-cols-2">
                    <Stage>
                        <div className="p-5">
                            <PixieSidebar
                                as="section"
                                side="start"
                                sidebar={
                                    <nav
                                        aria-label="Dans ce chapitre"
                                        className="border border-line bg-surface-muted p-4"
                                    >
                                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                            Sommaire
                                        </p>
                                        <PixieStack gap="xs" className="mt-3">
                                            {[
                                                "Le départ",
                                                "Le studio",
                                                "La projection",
                                            ].map((item) => (
                                                <span
                                                    key={item}
                                                    className="text-sm text-ink-soft"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </PixieStack>
                                    </nav>
                                }
                                sideWidth="xs"
                                contentMinWidth="half"
                                gap="md"
                                align="start"
                            >
                                <article>
                                    <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                        Navigation locale
                                    </p>
                                    <h4 className="mt-2 text-2xl text-ink">
                                        Un sommaire accompagne le récit
                                    </h4>
                                    <p className="mt-3 leading-7 text-ink-soft">
                                        La navigation ouvre la séquence sans
                                        réduire le contenu à une colonne fixe.
                                    </p>
                                </article>
                            </PixieSidebar>
                        </div>
                    </Stage>

                    <Stage>
                        <div className="p-5">
                            <PixieSidebar
                                as="section"
                                side="start"
                                sidebar={
                                    <aside
                                        aria-label="Fiche d’identité"
                                        className="border border-line bg-surface-muted p-4"
                                    >
                                        <PixieStack gap="xs">
                                            {["1937", "Couleur", "Sonore"].map(
                                                (item) => (
                                                    <PixieBadge
                                                        key={item}
                                                        variant="outline"
                                                        size="sm"
                                                        tone="inherit"
                                                    >
                                                        {item}
                                                    </PixieBadge>
                                                ),
                                            )}
                                        </PixieStack>
                                    </aside>
                                }
                                sideWidth="xs"
                                contentMinWidth="two-thirds"
                                gap="lg"
                                align="start"
                            >
                                <PixieCard
                                    as="article"
                                    variant="outline"
                                    padding="md"
                                >
                                    <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                        Identité et récit
                                    </p>
                                    <h4 className="mt-2 text-2xl text-ink">
                                        Les repères restent distincts du texte
                                    </h4>
                                </PixieCard>
                            </PixieSidebar>
                        </div>
                    </Stage>

                    <Stage>
                        <div className="p-5">
                            <PixieSidebar
                                as="section"
                                side="end"
                                sidebar={
                                    <aside aria-label="Note de lecture">
                                        <PixieCard
                                            variant="accent"
                                            padding="sm"
                                        >
                                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                                Note
                                            </p>
                                            <p className="mt-2 text-sm leading-6 text-ink-soft">
                                                Une précision complète la
                                                lecture sans l’interrompre.
                                            </p>
                                        </PixieCard>
                                    </aside>
                                }
                                sideWidth="sm"
                                contentMinWidth="half"
                                gap="lg"
                                align="start"
                            >
                                <article>
                                    <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                        Complément en fin
                                    </p>
                                    <h4 className="mt-2 text-2xl text-ink">
                                        Le récit garde la première place
                                    </h4>
                                    <p className="mt-3 leading-7 text-ink-soft">
                                        Avec side=end, le contenu précède aussi
                                        la note dans le document et au clavier.
                                    </p>
                                </article>
                            </PixieSidebar>
                        </div>
                    </Stage>

                    <Stage>
                        <div className="p-5">
                            <PixieSidebar
                                as="section"
                                side="end"
                                sidebar={
                                    <aside
                                        aria-label="Inspecteur"
                                        className="border border-line bg-surface-muted p-4"
                                    >
                                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                            Inspecteur
                                        </p>
                                        <PixieStack gap="xs" className="mt-3">
                                            {[
                                                "Cadre",
                                                "Lumière",
                                                "Échelle",
                                            ].map((item) => (
                                                <div
                                                    key={item}
                                                    className="border border-line bg-canvas px-3 py-2 text-xs text-ink-soft"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </PixieStack>
                                    </aside>
                                }
                                sideWidth="sm"
                                contentMinWidth="two-thirds"
                                gap="md"
                                align="stretch"
                            >
                                <div className="flex min-h-48 items-center justify-center border border-dashed border-line-strong bg-surface">
                                    <p className="font-mono text-xs text-muted">
                                        Aperçu du plan
                                    </p>
                                </div>
                            </PixieSidebar>
                        </div>
                    </Stage>
                </div>
            </section>

            <section aria-labelledby="sidebar-gaps" className="mt-16">
                <SequenceTitle
                    id="sidebar-gaps"
                    eyebrow="Intervalle de montage"
                    title="Une respiration générale, deux axes ajustables"
                    description="gap pose le rythme commun ; rowGap et columnGap peuvent ensuite distinguer la superposition du partage côte à côte."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 md:grid-cols-2 xl:grid-cols-3">
                    {gaps.map((gap) => (
                        <Stage key={gap.value}>
                            <PixieSidebar
                                side="start"
                                sidebar={<SidebarPane />}
                                sideWidth="xs"
                                contentMinWidth="half"
                                gap={gap.value}
                                className="p-4"
                            >
                                <ContentPane />
                            </PixieSidebar>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                {gap.name} · {gap.value} · {gap.token}
                            </p>
                        </Stage>
                    ))}
                </div>

                <div className="mt-6 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    <Stage>
                        <div className="max-w-sm p-4">
                            <PixieSidebar
                                sidebar={<SidebarPane />}
                                sideWidth="sm"
                                contentMinWidth="three-quarters"
                                gap="xs"
                                rowGap="xl"
                            >
                                <ContentPane />
                            </PixieSidebar>
                        </div>
                        <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                            gap=&quot;xs&quot; · rowGap=&quot;xl&quot;
                        </p>
                    </Stage>
                    <Stage>
                        <div className="p-4">
                            <PixieSidebar
                                sidebar={<SidebarPane />}
                                sideWidth="xs"
                                contentMinWidth="half"
                                gap="xs"
                                columnGap="xl"
                            >
                                <ContentPane />
                            </PixieSidebar>
                        </div>
                        <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                            gap=&quot;xs&quot; · columnGap=&quot;xl&quot;
                        </p>
                    </Stage>
                </div>
            </section>

            <section aria-labelledby="sidebar-align" className="mt-16">
                <SequenceTitle
                    id="sidebar-align"
                    eyebrow="Axe vertical"
                    title="Quatre alignements confrontent les hauteurs"
                    description="stretch rapproche les surfaces ; start convient généralement aux longues régies et aux collections qui débutent ensemble."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {alignments.map((alignment) => (
                        <Stage key={alignment.value}>
                            <PixieSidebar
                                side="start"
                                sidebar={<SidebarPane className="min-h-48" />}
                                sideWidth="xs"
                                contentMinWidth="half"
                                gap="sm"
                                align={alignment.value}
                                className="min-h-64 p-4"
                            >
                                <ContentPane className="min-h-28" />
                            </PixieSidebar>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                align=&quot;{alignment.value}&quot;
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="sidebar-semantics" className="mt-16">
                <SequenceTitle
                    id="sidebar-semantics"
                    eyebrow="Structure documentaire"
                    title="L’enveloppe compose, l’aside nomme la régie"
                    description="La racine choisit sa fonction dans la page ; l’enfant latéral conserve sa propre sémantique explicite."
                />

                <div className="mt-7 grid gap-px border border-line bg-line lg:grid-cols-3">
                    {[
                        ["div", "Raccord neutre sous une structure existante."],
                        [
                            "section",
                            "Ensemble nommé réunissant régie et contenu.",
                        ],
                        ["article", "Composition autonome et réutilisable."],
                    ].map(([element, description]) => (
                        <article key={element} className="bg-surface p-6">
                            <code className="font-mono text-sm text-accent">
                                as=&quot;{element}&quot;
                            </code>
                            <p className="mt-3 leading-7 text-ink-soft">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="sidebar-composition" className="mt-16">
                <SequenceTitle
                    id="sidebar-composition"
                    eyebrow="Composition"
                    title="Section ouvre le plateau, Sidebar installe sa régie"
                    description="La séquence, les surfaces et la collection restent confiées aux primitives qui en portent déjà la responsabilité."
                />

                <div className="mt-7 border border-line bg-canvas">
                    <PixieSection
                        width="72"
                        gutter="lg"
                        spacing="lg"
                        gap="lg"
                        aria-labelledby="sidebar-composition-heading"
                    >
                        <PixieStack gap="xs">
                            <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Archives en projection
                            </p>
                            <h4
                                id="sidebar-composition-heading"
                                className="text-3xl text-ink"
                            >
                                Une collection guidée par ses repères
                            </h4>
                        </PixieStack>
                        <PixieSidebar
                            side="start"
                            sidebar={
                                <aside
                                    aria-label="Repères"
                                    className="border border-line bg-surface-muted p-5"
                                >
                                    <PixieCluster gap="xs">
                                        {["1928", "1929", "1932"].map(
                                            (label) => (
                                                <PixieBadge
                                                    key={label}
                                                    variant="outline"
                                                    size="sm"
                                                    tone="inherit"
                                                >
                                                    {label}
                                                </PixieBadge>
                                            ),
                                        )}
                                    </PixieCluster>
                                </aside>
                            }
                            sideWidth="sm"
                            contentMinWidth="two-thirds"
                            gap="lg"
                            align="start"
                        >
                            <PixieGrid
                                maxColumns={3}
                                minItemWidth="sm"
                                gap="md"
                            >
                                {archiveTitles.slice(0, 3).map((title) => (
                                    <PixieCard
                                        key={title}
                                        as="article"
                                        variant="outline"
                                        padding="md"
                                    >
                                        <h5 className="text-lg text-ink">
                                            {title}
                                        </h5>
                                    </PixieCard>
                                ))}
                            </PixieGrid>
                        </PixieSidebar>
                    </PixieSection>
                </div>
            </section>

            <section aria-labelledby="sidebar-boundaries" className="mt-16">
                <SequenceTitle
                    id="sidebar-boundaries"
                    eyebrow="Raccords de montage"
                    title="Une asymétrie de largeur, aucun comportement annexe"
                    description="Dès qu’une régie doit devenir collante, escamotable ou modale, une autre primitive doit reprendre le relais."
                />

                <div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        ["Split", "Met deux plans pairs en regard."],
                        [
                            "Sidebar",
                            "Associe une mesure latérale à un contenu fluide.",
                        ],
                        [
                            "Switcher",
                            "Modifiera le montage de plusieurs enfants.",
                        ],
                        [
                            "StickyRegion",
                            "Maintiendra une zone visible au défilement.",
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
                id="pixie-sidebar-playground"
                aria-labelledby="sidebar-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="sidebar-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieSidebar"
                    description="Réglez la place de la régie, sa mesure et la priorité du contenu ; le cadre montre quand les deux zones se superposent."
                />
                <div className="mt-8">
                    <PixieSidebarPlayground />
                </div>
            </section>

            <section
                aria-labelledby="sidebar-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="sidebar-accessibility"
                    eyebrow="Accessibilité"
                    title="La position visuelle suit toujours le document"
                    description="La prop sidebar identifie la régie ; side décide ensuite où le composant la rend réellement, sans recourir à CSS order."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Aside nommé",
                            "Donner à la régie un titre visible, aria-labelledby ou aria-label.",
                        ],
                        [
                            "Deux rôles nommés",
                            "sidebar porte la régie et children le contenu principal, sans ambiguïté de position.",
                        ],
                        [
                            "Ordre concordant",
                            "side modifie ensemble l’ordre rendu, l’ordre visuel et le parcours clavier.",
                        ],
                        [
                            "Contrôles",
                            "Chaque champ de la régie conserve son label et son focus visible.",
                        ],
                        [
                            "Zoom à 200 %",
                            "Les zones doivent se superposer avant tout débordement horizontal.",
                        ],
                        [
                            "Contenu autonome",
                            "Le contenu principal doit rester compréhensible sans la régie.",
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
                aria-labelledby="sidebar-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="sidebar-technical"
                    eyebrow="Générique technique"
                    title="API du composant"
                    description="Les types spécifiques restent colocalisés dans PixieSidebar.types.ts ; le composant demeure statique et son playground porte seul l’état client."
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
