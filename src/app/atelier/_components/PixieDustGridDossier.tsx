import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieDustCard } from "@/components/ui/PixieDustCard";
import {
    PixieDustGrid,
    type PixieDustGridAlign,
    type PixieDustGridColumns,
    type PixieDustGridGap,
    type PixieDustGridMinItemWidth,
} from "@/components/ui/PixieDustGrid";
import { PixieDustSection } from "@/components/ui/PixieDustSection";
import { PixieDustStack } from "@/components/ui/PixieDustStack";
import { PixieDustGridPlayground } from "./PixieDustGridPlayground";

const columns = [
    1, 2, 3, 4, 5, 6,
] as const satisfies readonly PixieDustGridColumns[];

const minItemWidths = [
    {
        name: "Très petite",
        value: "xs" as const,
        token: "10 rem",
        role: "Repères, compteurs et petites vignettes.",
    },
    {
        name: "Petite",
        value: "sm" as const,
        token: "14 rem",
        role: "Cartouches et cartes très compactes.",
    },
    {
        name: "Moyenne",
        value: "md" as const,
        token: "18 rem",
        role: "Carte éditoriale courante.",
    },
    {
        name: "Grande",
        value: "lg" as const,
        token: "24 rem",
        role: "Contenu dense ou fortement illustré.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustGridMinItemWidth;
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
    value: PixieDustGridGap;
    token: string;
}>[];

const alignments = [
    { name: "Étiré", value: "stretch" as const },
    { name: "Début", value: "start" as const },
    { name: "Centre", value: "center" as const },
    { name: "Fin", value: "end" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustGridAlign;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieDustGridElement",
        defaultValue: '"div"',
        description: "Élément HTML qui porte la collection.",
    },
    {
        name: "columns",
        type: "PixieDustGridColumns",
        defaultValue: "3",
        description: "Nombre maximal de colonnes dans le cadre disponible.",
    },
    {
        name: "minItemWidth",
        type: "PixieDustGridMinItemWidth",
        defaultValue: '"md"',
        description: "Largeur minimale souhaitée pour chaque cellule.",
    },
    {
        name: "gap",
        type: "PixieDustGridGap",
        defaultValue: '"md"',
        description: "Espacement horizontal et vertical entre les cellules.",
    },
    {
        name: "align",
        type: "PixieDustGridAlign",
        defaultValue: '"stretch"',
        description: "Alignement vertical des éléments dans leur rangée.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Éléments de la collection dans leur ordre naturel.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées à la racine de la grille.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustGridElement",
        values: ['"div"', '"ul"', '"ol"'],
        description: "Structures neutre et listes autorisées.",
    },
    {
        name: "PixieDustGridColumns",
        values: ["1", "2", "3", "4", "5", "6"],
        description: "Maximum de pistes pouvant partager une rangée.",
    },
    {
        name: "PixieDustGridMinItemWidth",
        values: ['"xs"', '"sm"', '"md"', '"lg"'],
        description: "Largeurs minimales de cellule issues du Montage.",
    },
    {
        name: "PixieDustGridGap",
        values: ['"none"', '"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Échelle partagée des intervalles de composition.",
    },
    {
        name: "PixieDustGridAlign",
        values: ['"stretch"', '"start"', '"center"', '"end"'],
        description: "Alignements possibles sur l’axe vertical.",
    },
] as const;

const archiveCards = [
    ["1928", "Steamboat Willie", "Le son rejoint Mickey"],
    ["1929", "The Skeleton Dance", "La musique libère le mouvement"],
    ["1932", "Flowers and Trees", "La couleur entre dans le récit"],
    ["1933", "Three Little Pigs", "Les personnages trouvent leur voix"],
    ["1935", "The Band Concert", "Mickey dirige la couleur"],
    ["1937", "The Old Mill", "La caméra multiplane creuse l’espace"],
] as const;

function CodeExample({ children }: Readonly<{ children: string }>) {
    return (
        <pre className="overflow-x-auto border border-line bg-canvas p-5 font-mono text-sm leading-6 text-ink-soft">
            <code>{children}</code>
        </pre>
    );
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

function Stage({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="overflow-hidden border border-dashed border-line-strong bg-canvas">
            {children}
        </div>
    );
}

function ArchiveCard({
    year,
    title,
    description,
}: Readonly<{ year: string; title: string; description: string }>) {
    return (
        <PixieDustCard
            as="article"
            variant="outline"
            padding="md"
            className="h-full"
        >
            <p className="font-mono text-xs text-accent">{year}</p>
            <h4 className="mt-2 text-xl text-ink">{title}</h4>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
                {description}
            </p>
        </PixieDustCard>
    );
}

export function PixieDustGridDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-grid"
            labelledBy="pixie-dust-grid-title"
            nom="PixieDustGrid"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Montage 005
                        </p>
                        <h2
                            id="pixie-dust-grid-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustGrid
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Distribuer une collection sur des pistes régulières
                            qui se recomposent avec l’espace disponible.
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
            <section aria-labelledby="grid-identity" className="mt-14">
                <SequenceTitle
                    id="grid-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Grid transforme une collection ordonnée en pistes alignées. Il choisit la distribution, jamais l’apparence de ses éléments."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Distribuer une collection responsive."],
                        [
                            "Usage",
                            "Cartes métier, archives, résultats et vignettes comparables.",
                        ],
                        [
                            "Limite",
                            "Ne dessine ni surface, ni carte, ni pagination, ni défilement.",
                        ],
                        [
                            "Anatomie",
                            "Une grille, des pistes automatiques et des cellules explicites.",
                        ],
                        [
                            "Accessibilité",
                            "Conserve l’ordre du DOM et la sémantique choisie.",
                        ],
                        [
                            "Dépendances",
                            "CSS Grid uniquement, sans calcul côté client.",
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

            <section aria-labelledby="grid-anatomy" className="mt-16">
                <SequenceTitle
                    id="grid-anatomy"
                    eyebrow="Anatomie du montage"
                    title="Trois réglages composent les pistes"
                    description="Le maximum de colonnes donne l’ambition du plan ; la largeur minimale protège chaque cellule ; l’intervalle maintient le rythme."
                />

                <div className="mt-7 border border-accent/60 bg-canvas p-4 sm:p-6">
                    <p className="font-mono text-xs text-accent">
                        PixieDustGrid · columns + minItemWidth + gap
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                        {["Piste 01", "Piste 02", "Piste 03"].map((label) => (
                            <div
                                key={label}
                                className="min-w-0 border border-dashed border-line-strong bg-surface p-4 text-center text-sm text-ink-soft"
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                aria-labelledby="grid-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="grid-master"
                    eyebrow="Plan maître"
                    title="Six archives trouvent leur place dans le cadre"
                    description="Le nombre de colonnes diminue lorsque les cartes ne peuvent plus préserver leur largeur minimale."
                />

                <div className="mt-7 grid border border-line xl:grid-cols-2">
                    <div className="bg-canvas p-5 sm:p-7">
                        <PixieDustGrid
                            as="ul"
                            columns={3}
                            minItemWidth="sm"
                            gap="md"
                            aria-label="Œuvres de la projection"
                        >
                            {archiveCards.map(([year, title, description]) => (
                                <li key={title}>
                                    <ArchiveCard
                                        year={year}
                                        title={title}
                                        description={description}
                                    />
                                </li>
                            ))}
                        </PixieDustGrid>
                    </div>
                    <CodeExample>{`<PixieDustGrid
    as="ul"
    columns={3}
    minItemWidth="sm"
    gap="md"
>
    {archives.map((archive) => (
        <li key={archive.slug}>
            <ArchiveCard archive={archive} />
        </li>
    ))}
</PixieDustGrid>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="grid-columns" className="mt-16">
                <SequenceTitle
                    id="grid-columns"
                    eyebrow="Nombre de pistes"
                    title="Six plafonds, jamais six obligations"
                    description="columns fixe le maximum visible lorsque le cadre est assez large. La grille peut toujours se replier en dessous."
                />

                <div className="mt-7 space-y-6 bg-canvas p-6">
                    {columns.map((columnCount) => (
                        <Stage key={columnCount}>
                            <PixieDustGrid
                                columns={columnCount}
                                minItemWidth="xs"
                                gap="xs"
                                className="p-4"
                            >
                                {Array.from(
                                    { length: columnCount },
                                    (_, index) => (
                                        <div
                                            key={index}
                                            className="border border-line bg-surface p-4 text-center font-mono text-xs text-accent"
                                        >
                                            {index + 1}
                                        </div>
                                    ),
                                )}
                            </PixieDustGrid>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                columns={columnCount}
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="grid-widths" className="mt-16">
                <SequenceTitle
                    id="grid-widths"
                    eyebrow="Protection des cellules"
                    title="Quatre largeurs décident quand le plan se replie"
                    description="Une valeur plus grande réduit plus tôt le nombre de colonnes et réserve davantage d’espace à chaque élément."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {minItemWidths.map((width) => (
                        <Stage key={width.value}>
                            <PixieDustGrid
                                columns={3}
                                minItemWidth={width.value}
                                gap="sm"
                                className="p-4"
                            >
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="min-h-20 border border-line bg-surface"
                                    />
                                ))}
                            </PixieDustGrid>
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

            <section aria-labelledby="grid-gaps" className="mt-16">
                <SequenceTitle
                    id="grid-gaps"
                    eyebrow="Rythme des pistes"
                    title="Six intervalles règlent les raccords"
                    description="Le même gap s’applique aux axes horizontal et vertical pour garder une collection régulière."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 md:grid-cols-2 xl:grid-cols-3">
                    {gaps.map((gap) => (
                        <Stage key={gap.value}>
                            <PixieDustGrid
                                columns={2}
                                minItemWidth="xs"
                                gap={gap.value}
                                className="p-4"
                            >
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="min-h-16 border border-line bg-surface"
                                    />
                                ))}
                            </PixieDustGrid>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                {gap.name} · {gap.value} · {gap.token}
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="grid-align" className="mt-16">
                <SequenceTitle
                    id="grid-align"
                    eyebrow="Axe vertical"
                    title="Quatre alignements éprouvent les hauteurs inégales"
                    description="stretch convient aux collections de cartes ; les autres valeurs laissent chaque élément conserver sa hauteur propre."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {alignments.map((alignment) => (
                        <Stage key={alignment.value}>
                            <PixieDustGrid
                                columns={3}
                                minItemWidth="xs"
                                gap="sm"
                                align={alignment.value}
                                className="min-h-48 p-4"
                            >
                                {["h-16", "h-28", "h-20"].map(
                                    (height, index) => (
                                        <div
                                            key={height}
                                            className={`${height} border border-line bg-surface p-3 font-mono text-xs text-accent`}
                                        >
                                            {index + 1}
                                        </div>
                                    ),
                                )}
                            </PixieDustGrid>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                align=&quot;{alignment.value}&quot;
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="grid-responsive" className="mt-16">
                <SequenceTitle
                    id="grid-responsive"
                    eyebrow="Raccord responsive"
                    title="Le cadre, pas l’écran, décide du montage"
                    description="La même grille est projetée dans trois largeurs. Elle répond à son espace réel et ne dépend d’aucun breakpoint JavaScript."
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
                            <PixieDustGrid
                                columns={4}
                                minItemWidth="sm"
                                gap="sm"
                            >
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="border border-line bg-surface p-5 text-center text-sm text-ink-soft"
                                    >
                                        Plan {item}
                                    </div>
                                ))}
                            </PixieDustGrid>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="grid-semantics" className="mt-16">
                <SequenceTitle
                    id="grid-semantics"
                    eyebrow="Structure de collection"
                    title="Le montage visuel ne remplace pas la sémantique"
                    description="div reste neutre ; ul décrit un ensemble ; ol indique que l’ordre porte un sens."
                />

                <div className="mt-7 grid gap-px border border-line bg-line lg:grid-cols-3">
                    {[
                        ["div", "Collection déjà structurée par ses enfants."],
                        ["ul", "Ensemble d’éléments sans ordre significatif."],
                        ["ol", "Classement, étapes ou ordre éditorial."],
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

            <section aria-labelledby="grid-composition" className="mt-16">
                <SequenceTitle
                    id="grid-composition"
                    eyebrow="Composition"
                    title="Section ouvre le chapitre, Grid distribue sa collection"
                    description="Chaque primitive conserve son rôle : la séquence règle le cadre et la respiration ; la grille règle les pistes."
                />

                <div className="mt-7 border border-line bg-canvas">
                    <PixieDustSection
                        width="wide"
                        gutter="lg"
                        spacing="lg"
                        gap="lg"
                        aria-labelledby="grid-composition-heading"
                    >
                        <PixieDustStack gap="xs">
                            <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Archives en projection
                            </p>
                            <h4
                                id="grid-composition-heading"
                                className="text-3xl text-ink"
                            >
                                Le dessin animé trouve son langage
                            </h4>
                        </PixieDustStack>
                        <PixieDustGrid columns={3} minItemWidth="sm" gap="md">
                            {archiveCards
                                .slice(0, 3)
                                .map(([year, title, description]) => (
                                    <ArchiveCard
                                        key={title}
                                        year={year}
                                        title={title}
                                        description={description}
                                    />
                                ))}
                        </PixieDustGrid>
                    </PixieDustSection>
                </div>
            </section>

            <section aria-labelledby="grid-boundaries" className="mt-16">
                <SequenceTitle
                    id="grid-boundaries"
                    eyebrow="Raccords de montage"
                    title="La grille aligne sans absorber les autres plans"
                    description="Les primitives voisines répondent à d’autres problèmes et restent composables autour de Grid."
                />

                <div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        [
                            "Cluster",
                            "Suit la largeur naturelle de ses enfants.",
                        ],
                        ["Grid", "Construit des pistes alignées et égales."],
                        ["Stack", "Cadence une séquence sur un seul axe."],
                        ["Rail", "Déroulera une collection horizontalement."],
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
                id="pixie-dust-grid-playground"
                aria-labelledby="grid-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="grid-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieDustGrid"
                    description="Réglez son maximum, sa largeur minimale et son rythme ; observez comment le cadre recompose la collection."
                />
                <div className="mt-8">
                    <PixieDustGridPlayground />
                </div>
            </section>

            <section
                aria-labelledby="grid-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="grid-accessibility"
                    eyebrow="Accessibilité"
                    title="La lecture conserve toujours l’ordre du montage"
                    description="Le responsive ne déplace aucun élément : clavier, lecteur d’écran et ordre visuel suivent la même séquence."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Liste non ordonnée",
                            'Avec as="ul", chaque enfant direct doit être un li.',
                        ],
                        [
                            "Liste ordonnée",
                            'Réserver as="ol" aux collections dont la position porte du sens.',
                        ],
                        [
                            "Ordre naturel",
                            "Aucun mode dense ni réordonnancement CSS n’est proposé.",
                        ],
                        [
                            "Zoom à 200 %",
                            "La grille doit se replier avant de comprimer ou couper son contenu.",
                        ],
                        [
                            "Contenu interactif",
                            "Le parcours clavier suit exactement l’ordre source.",
                        ],
                        [
                            "Sens visuel",
                            "Le nombre de colonnes ne doit jamais porter seul une hiérarchie.",
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
                aria-labelledby="grid-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="grid-technical"
                    eyebrow="Générique technique"
                    title="API de l’esquisse"
                    description="Les types spécifiques restent colocalisés dans PixieDustGrid.types.ts ; le composant reste un composant serveur tant qu’aucune interaction ne lui est ajoutée."
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

            <section aria-labelledby="grid-journal" className="mt-16">
                <SequenceTitle
                    id="grid-journal"
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="L’esquisse devra être éprouvée sur de vraies collections avant de devenir le montage commun des index."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Tester les quatre familles de cartes métier avec des contenus courts et longs.",
                        "Éprouver les six plafonds dans des Containers étroits, moyens et larges.",
                        "Vérifier les quatre largeurs minimales sur mobile et à 200 % de zoom.",
                        "Comparer la dernière rangée incomplète avec auto-fit et auto-fill.",
                        "Contrôler les listes ul et ol avec plusieurs lecteurs d’écran.",
                        "Décider si trois colonnes et une largeur md restent les bons défauts.",
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
