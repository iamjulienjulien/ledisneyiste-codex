import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieCard } from "@/components/ui/PixieCard";
import {
    PixieDustRail,
    type PixieDustRailAlign,
    type PixieDustRailGap,
    type PixieDustRailGutter,
    type PixieDustRailItemWidth,
    type PixieDustRailSnap,
} from "@/components/ui/PixieDustRail";
import { PixieDustSection } from "@/components/ui/PixieDustSection";
import { PixieDustStack } from "@/components/ui/PixieDustStack";
import { PixieDustRailPlayground } from "./PixieDustRailPlayground";

const itemWidths = [
    {
        name: "Très petite",
        value: "xs" as const,
        token: "12 rem",
        role: "Repères, chiffres et cartes très synthétiques.",
    },
    {
        name: "Petite",
        value: "sm" as const,
        token: "16 rem",
        role: "Petites archives et listes de choix illustrées.",
    },
    {
        name: "Moyenne",
        value: "md" as const,
        token: "20 rem",
        role: "Carte métier ou éditoriale courante.",
    },
    {
        name: "Grande",
        value: "lg" as const,
        token: "24 rem",
        role: "Plan riche avec titre et description développée.",
    },
    {
        name: "Très grande",
        value: "xl" as const,
        token: "30 rem",
        role: "Surface narrative proche d’un demi-écran.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustRailItemWidth;
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
    value: PixieDustRailGap;
    token: string;
}>[];

const gutters = [
    { name: "Aucune", value: "none" as const, token: "0" },
    { name: "Petite", value: "sm" as const, token: "1 rem" },
    { name: "Moyenne", value: "md" as const, token: "1,5 rem" },
    { name: "Grande", value: "lg" as const, token: "2 rem" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustRailGutter;
    token: string;
}>[];

const snaps = [
    {
        name: "Libre",
        value: "none" as const,
        role: "Le travelling s’arrête exactement où le geste le laisse.",
    },
    {
        name: "Début",
        value: "start" as const,
        role: "Le bord initial de chaque plan rejoint celui de la piste.",
    },
    {
        name: "Centre",
        value: "center" as const,
        role: "Chaque plan peut retrouver doucement le centre du cadre.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustRailSnap;
    role: string;
}>[];

const alignments = [
    { name: "Étiré", value: "stretch" as const },
    { name: "Début", value: "start" as const },
    { name: "Centre", value: "center" as const },
    { name: "Fin", value: "end" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustRailAlign;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieDustRailElement",
        defaultValue: '"div"',
        description: "Structure HTML qui porte la collection.",
    },
    {
        name: "itemWidth",
        type: "PixieDustRailItemWidth",
        defaultValue: '"md"',
        description: "Largeur de référence de chaque enfant direct.",
    },
    {
        name: "gap",
        type: "PixieDustRailGap",
        defaultValue: '"md"',
        description: "Intervalle entre les plans successifs.",
    },
    {
        name: "gutter",
        type: "PixieDustRailGutter",
        defaultValue: '"none"',
        description: "Marge intérieure au début et à la fin de la piste.",
    },
    {
        name: "snap",
        type: "PixieDustRailSnap",
        defaultValue: '"start"',
        description: "Point d’arrêt doux proposé après le défilement.",
    },
    {
        name: "align",
        type: "PixieDustRailAlign",
        defaultValue: '"stretch"',
        description: "Alignement transversal des enfants.",
    },
    {
        name: "peek",
        type: "boolean",
        defaultValue: "true",
        description: "Laisse entrevoir le plan suivant sur cadre étroit.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Plans qui composent la collection horizontale.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées à la racine du Rail.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustRailElement",
        values: ['"div"', '"ul"', '"ol"'],
        description: "Structures neutre et listes autorisées.",
    },
    {
        name: "PixieDustRailItemWidth",
        values: ['"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Mesures de référence des plans.",
    },
    {
        name: "PixieDustRailGap",
        values: ['"none"', '"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Échelle des intervalles du Montage.",
    },
    {
        name: "PixieDustRailGutter",
        values: ['"none"', '"sm"', '"md"', '"lg"'],
        description: "Marges intérieures de la piste.",
    },
    {
        name: "PixieDustRailSnap",
        values: ['"none"', '"start"', '"center"'],
        description: "Points d’arrêt doux du travelling.",
    },
    {
        name: "PixieDustRailAlign",
        values: ['"stretch"', '"start"', '"center"', '"end"'],
        description: "Alignements transversaux des plans.",
    },
] as const;

const films = [
    ["1928", "Steamboat Willie", "Mickey trouve sa voix."],
    ["1929", "The Skeleton Dance", "La musique libère le dessin."],
    ["1932", "Flowers and Trees", "La couleur entre en scène."],
    ["1933", "Three Little Pigs", "Les personnages affirment leur jeu."],
    ["1935", "The Band Concert", "Mickey dirige son premier film en couleurs."],
    ["1937", "The Old Mill", "La caméra multiplane révèle sa profondeur."],
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

function FilmCard({
    year,
    title,
    description,
    compact = false,
}: Readonly<{
    year: string;
    title: string;
    description?: string;
    compact?: boolean;
}>) {
    return (
        <PixieCard
            as="article"
            variant="outline"
            padding="md"
            className="h-full"
        >
            <p className="font-mono text-xs text-accent">{year}</p>
            <h4
                className={`${compact ? "mt-2 text-lg" : "mt-3 text-xl"} text-ink`}
            >
                {title}
            </h4>
            {description ? (
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                    {description}
                </p>
            ) : null}
        </PixieCard>
    );
}

export function PixieDustRailDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-rail"
            labelledBy="pixie-dust-rail-title"
            nom="PixieDustRail"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Montage 009
                        </p>
                        <h2
                            id="pixie-dust-rail-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustRail
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Dérouler une collection sur un travelling horizontal
                            sans la transformer en carrousel.
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
            <section aria-labelledby="rail-identity" className="mt-14">
                <SequenceTitle
                    id="rail-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Rail conserve toute une collection sur une piste unique. Le défilement reste natif, visible et indépendant de tout état actif."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        [
                            "Mission",
                            "Dérouler une collection sur une seule piste horizontale.",
                        ],
                        [
                            "Usage",
                            "Archives liées, sélections, chronologies et contenus à parcourir.",
                        ],
                        [
                            "Limite",
                            "Ne gère ni commandes, ni pagination, ni lecture automatique.",
                        ],
                        [
                            "Anatomie",
                            "Une piste défilante et une succession d’enfants de largeur stable.",
                        ],
                        [
                            "Accessibilité",
                            "Défilement natif, focus visible et collection nommée.",
                        ],
                        [
                            "Dépendances",
                            "Flexbox et scroll-snap, sans calcul côté client.",
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

            <section aria-labelledby="rail-anatomy" className="mt-16">
                <SequenceTitle
                    id="rail-anatomy"
                    eyebrow="Anatomie du montage"
                    title="Une piste, des plans et un hors-champ visible"
                    description="itemWidth règle la mesure de chaque plan ; peek laisse apparaître le suivant afin que le débordement se comprenne avant le premier geste."
                />

                <div className="mt-7 border border-accent/60 bg-canvas py-6">
                    <p className="px-6 font-mono text-xs text-accent">
                        PixieDustRail · itemWidth + gap + gutter + peek
                    </p>
                    <PixieDustRail
                        itemWidth="sm"
                        gap="sm"
                        gutter="md"
                        aria-label="Anatomie d’un rail"
                        className="mt-4 pb-3"
                    >
                        {films.slice(0, 4).map(([year, title]) => (
                            <div key={title}>
                                <FilmCard year={year} title={title} compact />
                            </div>
                        ))}
                    </PixieDustRail>
                </div>
            </section>

            <section
                aria-labelledby="rail-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="rail-master"
                    eyebrow="Plan maître"
                    title="Les œuvres défilent comme une bande chronologique"
                    description="Chaque carte conserve sa mesure tandis que la piste traverse les jalons de la première décennie sonore et colorée du studio."
                />

                <div className="mt-7 grid min-w-0 border border-line xl:grid-cols-2">
                    <div className="min-w-0 bg-canvas py-8">
                        <PixieDustRail
                            as="ul"
                            itemWidth="md"
                            gap="md"
                            gutter="lg"
                            snap="start"
                            aria-label="Œuvres charnières"
                            className="m-0 list-none pb-3"
                        >
                            {films.map(([year, title, description]) => (
                                <li key={title}>
                                    <FilmCard
                                        year={year}
                                        title={title}
                                        description={description}
                                    />
                                </li>
                            ))}
                        </PixieDustRail>
                    </div>
                    <CodeExample>{`<PixieDustRail
    as="ul"
    itemWidth="md"
    gap="md"
    gutter="lg"
    snap="start"
    aria-label="Œuvres charnières"
>
    <li><OeuvreCard /></li>
    <li><OeuvreCard /></li>
    <li><OeuvreCard /></li>
</PixieDustRail>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="rail-widths" className="mt-16">
                <SequenceTitle
                    id="rail-widths"
                    eyebrow="Mesure des plans"
                    title="Cinq largeurs donnent son échelle au travelling"
                    description="La largeur reste une référence maximale : sur un cadre étroit, le plan se réduit pour demeurer visible et peut laisser entrevoir le suivant."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {itemWidths.map((width) => (
                        <Stage key={width.value}>
                            <PixieDustRail
                                itemWidth={width.value}
                                gap="sm"
                                gutter="sm"
                                aria-label={`Plans de largeur ${width.name}`}
                                className="py-4 pb-6"
                            >
                                {films.slice(0, 3).map(([year, title]) => (
                                    <div key={title}>
                                        <FilmCard
                                            year={year}
                                            title={title}
                                            compact
                                        />
                                    </div>
                                ))}
                            </PixieDustRail>
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

            <section aria-labelledby="rail-peek" className="mt-16">
                <SequenceTitle
                    id="rail-peek"
                    eyebrow="Hors-champ"
                    title="Le plan suivant annonce la continuité"
                    description="peek réduit seulement la largeur maximale sur petit cadre. La collection, son ordre et son point d’arrêt restent inchangés."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {[true, false].map((peek) => (
                        <Stage key={String(peek)}>
                            <div className="max-w-sm py-5">
                                <PixieDustRail
                                    itemWidth="lg"
                                    gap="sm"
                                    gutter="sm"
                                    peek={peek}
                                    aria-label={
                                        peek ? "Avec aperçu" : "Sans aperçu"
                                    }
                                    className="pb-3"
                                >
                                    {films.slice(0, 3).map(([year, title]) => (
                                        <div key={title}>
                                            <FilmCard
                                                year={year}
                                                title={title}
                                                compact
                                            />
                                        </div>
                                    ))}
                                </PixieDustRail>
                            </div>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                peek={`{${peek}}`}
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="rail-snaps" className="mt-16">
                <SequenceTitle
                    id="rail-snaps"
                    eyebrow="Arrêt du travelling"
                    title="Trois façons de laisser reposer la piste"
                    description="Le magnétisme reste volontairement doux : il accompagne le geste sans empêcher un arrêt intermédiaire ni forcer une navigation par écran."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-3">
                    {snaps.map((snap) => (
                        <Stage key={snap.value}>
                            <PixieDustRail
                                itemWidth="sm"
                                gap="sm"
                                gutter="md"
                                snap={snap.value}
                                aria-label={`Arrêt ${snap.name}`}
                                className="py-5 pb-7"
                            >
                                {films.slice(0, 4).map(([year, title]) => (
                                    <div key={title}>
                                        <FilmCard
                                            year={year}
                                            title={title}
                                            compact
                                        />
                                    </div>
                                ))}
                            </PixieDustRail>
                            <div className="border-t border-line bg-surface p-4">
                                <code className="font-mono text-xs text-accent">
                                    snap=&quot;{snap.value}&quot;
                                </code>
                                <p className="mt-3 text-sm leading-6 text-muted">
                                    {snap.role}
                                </p>
                            </div>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="rail-gutters" className="mt-16">
                <SequenceTitle
                    id="rail-gutters"
                    eyebrow="Entrée et sortie de piste"
                    title="Quatre gouttières cadrent le premier et le dernier plan"
                    description="La même valeur nourrit le padding de la piste et son scroll-padding afin de préserver les points d’arrêt."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {gutters.map((gutter) => (
                        <Stage key={gutter.value}>
                            <PixieDustRail
                                itemWidth="sm"
                                gap="sm"
                                gutter={gutter.value}
                                aria-label={`Gouttière ${gutter.name}`}
                                className="py-5 pb-7"
                            >
                                {films.slice(0, 3).map(([year, title]) => (
                                    <div key={title}>
                                        <FilmCard
                                            year={year}
                                            title={title}
                                            compact
                                        />
                                    </div>
                                ))}
                            </PixieDustRail>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                {gutter.name} · {gutter.value} · {gutter.token}
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="rail-gaps" className="mt-16">
                <SequenceTitle
                    id="rail-gaps"
                    eyebrow="Intervalle de montage"
                    title="Six respirations séparent les plans"
                    description="L’intervalle reste distinct de la gouttière qui cadre la piste elle-même."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 md:grid-cols-2 xl:grid-cols-3">
                    {gaps.map((gap) => (
                        <Stage key={gap.value}>
                            <PixieDustRail
                                itemWidth="xs"
                                gap={gap.value}
                                gutter="sm"
                                aria-label={`Espacement ${gap.name}`}
                                className="py-4 pb-6"
                            >
                                {films.slice(0, 3).map(([year, title]) => (
                                    <div key={title}>
                                        <FilmCard
                                            year={year}
                                            title={title}
                                            compact
                                        />
                                    </div>
                                ))}
                            </PixieDustRail>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                {gap.name} · {gap.value} · {gap.token}
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="rail-align" className="mt-16">
                <SequenceTitle
                    id="rail-align"
                    eyebrow="Axe transversal"
                    title="Quatre alignements confrontent les hauteurs"
                    description="stretch donne une ligne de base visuelle commune ; les autres réglages conservent la hauteur propre de chaque plan."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {alignments.map((alignment) => (
                        <Stage key={alignment.value}>
                            <PixieDustRail
                                itemWidth="sm"
                                gap="sm"
                                gutter="sm"
                                align={alignment.value}
                                aria-label={`Alignement ${alignment.name}`}
                                className="min-h-64 py-5 pb-7"
                            >
                                <div>
                                    <FilmCard
                                        year="1928"
                                        title="Plan court"
                                        compact
                                    />
                                </div>
                                <div>
                                    <FilmCard
                                        year="1932"
                                        title="Plan plus développé"
                                        description="Une matière supplémentaire révèle le comportement de l’axe transversal."
                                        compact
                                    />
                                </div>
                                <div>
                                    <FilmCard
                                        year="1937"
                                        title="Dernier plan"
                                        compact
                                    />
                                </div>
                            </PixieDustRail>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                align=&quot;{alignment.value}&quot;
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="rail-responsive" className="mt-16">
                <SequenceTitle
                    id="rail-responsive"
                    eyebrow="Raccord responsive"
                    title="Le travelling traverse tous les cadres"
                    description="La largeur locale détermine le nombre de plans visibles. La piste ne change jamais de responsabilité et ne revient pas à la ligne."
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
                            <PixieDustRail
                                itemWidth="md"
                                gap="md"
                                gutter="sm"
                                aria-label={`Rail dans un cadre ${label}`}
                                className="pb-3"
                            >
                                {films.map(([year, title]) => (
                                    <div key={title}>
                                        <FilmCard
                                            year={year}
                                            title={title}
                                            compact
                                        />
                                    </div>
                                ))}
                            </PixieDustRail>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="rail-semantics" className="mt-16">
                <SequenceTitle
                    id="rail-semantics"
                    eyebrow="Structure documentaire"
                    title="La piste conserve la nature de sa collection"
                    description="div compose un groupe neutre ; ul et ol rendent explicite la relation entre les éléments parcourus."
                />

                <div className="mt-7 grid gap-px border border-line bg-line lg:grid-cols-3">
                    {[
                        ["div", "Groupe visuel déjà décrit par son contexte."],
                        [
                            "ul",
                            "Collection sans ordre significatif, composée de li.",
                        ],
                        [
                            "ol",
                            "Progression chronologique ou éditoriale, composée de li.",
                        ],
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

            <section aria-labelledby="rail-composition" className="mt-16">
                <SequenceTitle
                    id="rail-composition"
                    eyebrow="Composition"
                    title="Section ouvre le cadre, Rail prolonge la collection"
                    description="La séquence éditoriale et les cartes restent confiées aux primitives qui en portent déjà la responsabilité."
                />

                <div className="mt-7 min-w-0 border border-line bg-canvas">
                    <PixieDustSection
                        width="wide"
                        gutter="lg"
                        spacing="lg"
                        gap="lg"
                        aria-labelledby="rail-composition-heading"
                    >
                        <PixieDustStack gap="xs">
                            <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Chronologie
                            </p>
                            <h4
                                id="rail-composition-heading"
                                className="text-3xl text-ink"
                            >
                                Le dessin animé trouve son langage
                            </h4>
                        </PixieDustStack>
                        <PixieDustRail
                            as="ol"
                            itemWidth="md"
                            gap="md"
                            snap="start"
                            aria-label="Œuvres dans l’ordre chronologique"
                            className="m-0 list-none pb-3"
                        >
                            {films.map(([year, title, description]) => (
                                <li key={title}>
                                    <FilmCard
                                        year={year}
                                        title={title}
                                        description={description}
                                    />
                                </li>
                            ))}
                        </PixieDustRail>
                    </PixieDustSection>
                </div>
            </section>

            <section aria-labelledby="rail-boundaries" className="mt-16">
                <SequenceTitle
                    id="rail-boundaries"
                    eyebrow="Raccords de montage"
                    title="Une piste continue, aucun mécanisme de carrousel"
                    description="Rail convient quand le hors-champ fait partie du parcours mais que chaque élément reste accessible par un geste de défilement natif."
                />

                <div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        [
                            "Cluster",
                            "Autorise des retours à la ligne individuels.",
                        ],
                        [
                            "Grid",
                            "Distribue une collection sur plusieurs rangées.",
                        ],
                        [
                            "Switcher",
                            "Choisit collectivement entre rangée et pile.",
                        ],
                        [
                            "Rail",
                            "Conserve une piste horizontale native et continue.",
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
                id="pixie-dust-rail-playground"
                aria-labelledby="rail-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="rail-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieDustRail"
                    description="Réglez la mesure des plans, leur rythme et leur point d’arrêt, puis éprouvez le travelling dans les trois cadres du plateau."
                />
                <div className="mt-8">
                    <PixieDustRailPlayground />
                </div>
            </section>

            <section
                aria-labelledby="rail-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="rail-accessibility"
                    eyebrow="Accessibilité"
                    title="Le hors-champ reste atteignable"
                    description="La racine reçoit un point de focus par défaut afin que le défilement horizontal reste disponible sans souris ni geste tactile."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Collection nommée",
                            "Fournir aria-label ou aria-labelledby pour annoncer la piste.",
                        ],
                        [
                            "Focus visible",
                            "Le Rail hérite du halo global lorsqu’il reçoit le focus clavier.",
                        ],
                        [
                            "Barre conservée",
                            "Le témoin natif du débordement n’est jamais masqué.",
                        ],
                        [
                            "Listes valides",
                            "ul et ol reçoivent uniquement des li comme enfants directs.",
                        ],
                        [
                            "Ordre naturel",
                            "Le défilement ne réordonne ni la lecture ni le parcours clavier.",
                        ],
                        [
                            "Zoom à 200 %",
                            "Les plans se réduisent sans disparaître ni revenir à la ligne.",
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
                aria-labelledby="rail-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="rail-technical"
                    eyebrow="Générique technique"
                    title="API de l’esquisse"
                    description="Les types spécifiques restent colocalisés dans PixieDustRail.types.ts ; la primitive demeure statique et le playground porte seul l’état client."
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

            <section aria-labelledby="rail-journal" className="mt-16">
                <SequenceTitle
                    id="rail-journal"
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="L’esquisse devra être confrontée aux vraies collections du Codex avant de devenir une primitive stable."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Éprouver les cinq largeurs avec les quatre familles de cartes métier.",
                        "Vérifier le travelling au clavier, au trackpad, à la molette et au toucher.",
                        "Tester les points d’arrêt start et center dans des cadres imbriqués.",
                        "Contrôler ul et ol avec les outils d’accessibilité.",
                        "Éprouver les deux Lumières, le mobile et le zoom à 200 %.",
                        "Décider si md, md, none, start, stretch et peek restent les bons défauts.",
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
