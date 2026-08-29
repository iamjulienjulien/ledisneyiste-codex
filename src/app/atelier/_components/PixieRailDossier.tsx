import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieCard } from "@/components/ui/PixieCard";
import {
    PixieRail,
    type PixieRailAlign,
    type PixieRailGap,
    type PixieRailGutter,
    type PixieRailItemWidth,
    type PixieRailOverscroll,
    type PixieRailPeek,
    type PixieRailScrollbar,
    type PixieRailSnap,
    type PixieRailSnapAlign,
} from "@/components/ui/PixieRail";
import { PixieSection } from "@/components/ui/PixieSection";
import { PixieStack } from "@/components/ui/PixieStack";
import { PixieRailPlayground } from "./PixieRailPlayground";

const itemWidths = [
    {
        name: "Naturelle",
        value: "auto" as const,
        token: "max-content",
        role: "Repères, badges et contenus dont la matière dicte la mesure.",
    },
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
    value: PixieRailItemWidth;
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
    value: PixieRailGap;
    token: string;
}>[];

const gutters = [
    { name: "Aucune", value: "none" as const, token: "0" },
    { name: "Petite", value: "sm" as const, token: "1 rem" },
    { name: "Moyenne", value: "md" as const, token: "1,5 rem" },
    { name: "Grande", value: "lg" as const, token: "2 rem" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieRailGutter;
    token: string;
}>[];

const snaps = [
    {
        name: "Libre",
        value: "none" as const,
        role: "Le travelling s’arrête exactement où le geste le laisse.",
    },
    {
        name: "Proximité",
        value: "proximity" as const,
        role: "Le plan rejoint son point d’arrêt seulement lorsqu’il s’en approche.",
    },
    {
        name: "Obligatoire",
        value: "mandatory" as const,
        role: "La piste termine toujours son geste sur un point d’arrêt.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieRailSnap;
    role: string;
}>[];

const snapAlignments = [
    { name: "Début", value: "start" as const },
    { name: "Centre", value: "center" as const },
    { name: "Fin", value: "end" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieRailSnapAlign;
}>[];

const peeks = [
    {
        name: "Aucun",
        value: "none" as const,
        token: "100 %",
        role: "Un plan peut occuper toute la largeur disponible.",
    },
    {
        name: "Subtil",
        value: "subtle" as const,
        token: "92 %",
        role: "Une amorce discrète annonce la continuité de la piste.",
    },
    {
        name: "Marqué",
        value: "strong" as const,
        token: "80 %",
        role: "Le hors-champ devient un signal évident du travelling.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieRailPeek;
    token: string;
    role: string;
}>[];

const scrollbars = [
    {
        name: "Native",
        value: "auto" as const,
        role: "Conserve le témoin fourni par la plateforme.",
    },
    {
        name: "Fine",
        value: "thin" as const,
        role: "Réduit sa présence sans retirer l’indication de défilement.",
    },
    {
        name: "Masquée",
        value: "hidden" as const,
        role: "Réservée aux pistes dont le hors-champ est déjà explicite.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieRailScrollbar;
    role: string;
}>[];

const alignments = [
    { name: "Étiré", value: "stretch" as const },
    { name: "Début", value: "start" as const },
    { name: "Centre", value: "center" as const },
    { name: "Fin", value: "end" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieRailAlign;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieRailElement",
        defaultValue: '"div"',
        description: "Structure HTML qui porte la collection.",
    },
    {
        name: "itemWidth",
        type: "PixieRailItemWidth",
        defaultValue: '"md"',
        description: "Largeur de référence de chaque enfant direct.",
    },
    {
        name: "gap",
        type: "PixieRailGap",
        defaultValue: '"md"',
        description: "Intervalle entre les plans successifs.",
    },
    {
        name: "gutter",
        type: "PixieRailGutter",
        defaultValue: '"none"',
        description: "Marge intérieure au début et à la fin de la piste.",
    },
    {
        name: "peek",
        type: "PixieRailPeek",
        defaultValue: '"subtle"',
        description: "Part maximale du cadre qu’un plan peut occuper.",
    },
    {
        name: "snap",
        type: "PixieRailSnap",
        defaultValue: '"proximity"',
        description: "Force du magnétisme appliqué à la piste.",
    },
    {
        name: "snapAlign",
        type: "PixieRailSnapAlign",
        defaultValue: '"start"',
        description: "Bord de chaque plan rejoint par le point d’arrêt.",
    },
    {
        name: "snapStop",
        type: "PixieRailSnapStop",
        defaultValue: '"normal"',
        description:
            "Autorise ou interdit de franchir plusieurs plans d’un geste.",
    },
    {
        name: "align",
        type: "PixieRailAlign",
        defaultValue: '"stretch"',
        description: "Alignement transversal des enfants.",
    },
    {
        name: "scrollbar",
        type: "PixieRailScrollbar",
        defaultValue: '"auto"',
        description: "Présence visuelle de la barre de défilement native.",
    },
    {
        name: "overscroll",
        type: "PixieRailOverscroll",
        defaultValue: '"contain"',
        description: "Transmission du geste horizontal au cadre parent.",
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
        name: "PixieRailElement",
        values: ['"div"', '"ul"', '"ol"'],
        description: "Structures neutre et listes autorisées.",
    },
    {
        name: "PixieRailItemWidth",
        values: ['"auto"', '"xs"', '"sm"', '"md"', '"lg"', '"xl"', "number"],
        description: "Mesures naturelles, prédéfinies ou libres des plans.",
    },
    {
        name: "PixieRailGap",
        values: ['"none"', '"xs"', '"sm"', '"md"', '"lg"', '"xl"', "number"],
        description: "Échelle des intervalles du Montage.",
    },
    {
        name: "PixieRailGutter",
        values: ['"none"', '"sm"', '"md"', '"lg"', "number"],
        description: "Marges intérieures de la piste.",
    },
    {
        name: "PixieRailPeek",
        values: ['"none"', '"subtle"', '"strong"'],
        description: "Degrés d’amorce du prochain plan.",
    },
    {
        name: "PixieRailSnap",
        values: ['"none"', '"proximity"', '"mandatory"'],
        description: "Forces du magnétisme horizontal.",
    },
    {
        name: "PixieRailSnapAlign",
        values: ['"start"', '"center"', '"end"'],
        description: "Points d’alignement des plans.",
    },
    {
        name: "PixieRailSnapStop",
        values: ['"normal"', '"always"'],
        description: "Franchissement des points d’arrêt.",
    },
    {
        name: "PixieRailAlign",
        values: ['"stretch"', '"start"', '"center"', '"end"'],
        description: "Alignements transversaux des plans.",
    },
    {
        name: "PixieRailScrollbar",
        values: ['"auto"', '"thin"', '"hidden"'],
        description: "Présences possibles du témoin de défilement.",
    },
    {
        name: "PixieRailOverscroll",
        values: ['"auto"', '"contain"'],
        description: "Propagation du geste au cadre parent.",
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

export function PixieRailDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-rail"
            labelledBy="pixie-rail-title"
            nom="PixieRail"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Montage 009
                        </p>
                        <h2
                            id="pixie-rail-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieRail
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
                        PixieRail · itemWidth + gap + gutter + peek
                    </p>
                    <PixieRail
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
                    </PixieRail>
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
                        <PixieRail
                            as="ul"
                            itemWidth="md"
                            gap="md"
                            gutter="lg"
                            snap="proximity"
                            snapAlign="start"
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
                        </PixieRail>
                    </div>
                    <CodeExample>{`<PixieRail
    as="ul"
    itemWidth="md"
    gap="md"
    gutter="lg"
    snap="proximity" snapAlign="start"
    aria-label="Œuvres charnières"
>
    <li><OeuvreCard /></li>
    <li><OeuvreCard /></li>
    <li><OeuvreCard /></li>
</PixieRail>`}</CodeExample>
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
                            <PixieRail
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
                            </PixieRail>
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
                    title="Trois amorces annoncent la continuité"
                    description="peek limite la part maximale du cadre occupée par un plan. La collection, son ordre et son point d’arrêt restent inchangés."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-3">
                    {peeks.map((peek) => (
                        <Stage key={peek.value}>
                            <div className="max-w-sm py-5">
                                <PixieRail
                                    itemWidth="lg"
                                    gap="sm"
                                    gutter="sm"
                                    peek={peek.value}
                                    aria-label={`Aperçu ${peek.name}`}
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
                                </PixieRail>
                            </div>
                            <div className="border-t border-line bg-surface p-4">
                                <code className="font-mono text-xs text-accent">
                                    peek=&quot;{peek.value}&quot; · {peek.token}
                                </code>
                                <p className="mt-3 text-sm leading-6 text-muted">
                                    {peek.role}
                                </p>
                            </div>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="rail-snaps" className="mt-16">
                <SequenceTitle
                    id="rail-snaps"
                    eyebrow="Arrêt du travelling"
                    title="La force et le point d’arrêt se règlent séparément"
                    description="snap décide si la piste reste libre, attirée ou contrainte ; snapAlign choisit ensuite le bord de chaque plan qui rejoint le cadre."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-3">
                    {snaps.map((snap) => (
                        <Stage key={snap.value}>
                            <PixieRail
                                itemWidth="sm"
                                gap="sm"
                                gutter="md"
                                snap={snap.value}
                                snapAlign="start"
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
                            </PixieRail>
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

                <div className="mt-6 grid gap-6 bg-canvas p-6 lg:grid-cols-3">
                    {snapAlignments.map((alignment) => (
                        <Stage key={alignment.value}>
                            <PixieRail
                                itemWidth="sm"
                                gap="sm"
                                gutter="md"
                                snap="mandatory"
                                snapAlign={alignment.value}
                                snapStop="always"
                                aria-label={`Alignement ${alignment.name}`}
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
                            </PixieRail>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                snapAlign=&quot;{alignment.value}&quot;
                            </p>
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
                            <PixieRail
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
                            </PixieRail>
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
                            <PixieRail
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
                            </PixieRail>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                {gap.name} · {gap.value} · {gap.token}
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="rail-custom" className="mt-16">
                <SequenceTitle
                    id="rail-custom"
                    eyebrow="Mesures libres"
                    title="Trois nombres raccordent la piste à un cadre particulier"
                    description="Les presets restent la règle commune ; les valeurs numériques permettent d’accorder ponctuellement la largeur, l’intervalle et la gouttière à une composition existante."
                />

                <div className="mt-7 grid min-w-0 border border-line lg:grid-cols-2">
                    <div className="min-w-0 bg-canvas py-6">
                        <PixieRail
                            itemWidth={272}
                            gap={18}
                            gutter={24}
                            peek="subtle"
                            aria-label="Piste aux mesures personnalisées"
                            className="pb-3"
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
                        </PixieRail>
                    </div>
                    <CodeExample>{`<PixieRail
    itemWidth={272}
    gap={18}
    gutter={24}
    peek="subtle"
>
    {/* Plans */}
</PixieRail>`}</CodeExample>
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
                            <PixieRail
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
                            </PixieRail>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                align=&quot;{alignment.value}&quot;
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="rail-scrollbars" className="mt-16">
                <SequenceTitle
                    id="rail-scrollbars"
                    eyebrow="Témoin du travelling"
                    title="Trois présences pour la barre native"
                    description="La barre reste le signal le plus explicite. Elle ne doit être masquée que lorsque le hors-champ, le contexte et le geste attendu sont déjà évidents."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-3">
                    {scrollbars.map((scrollbar) => (
                        <Stage key={scrollbar.value}>
                            <PixieRail
                                itemWidth="sm"
                                gap="sm"
                                gutter="sm"
                                peek="strong"
                                scrollbar={scrollbar.value}
                                overscroll="contain"
                                aria-label={`Barre ${scrollbar.name}`}
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
                            </PixieRail>
                            <div className="border-t border-line bg-surface p-4">
                                <code className="font-mono text-xs text-accent">
                                    scrollbar=&quot;{scrollbar.value}&quot;
                                </code>
                                <p className="mt-3 text-sm leading-6 text-muted">
                                    {scrollbar.role}
                                </p>
                            </div>
                        </Stage>
                    ))}
                </div>

                <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2">
                    {[
                        [
                            "auto" as PixieRailOverscroll,
                            "Le geste peut poursuivre son trajet dans le cadre parent.",
                        ],
                        [
                            "contain" as PixieRailOverscroll,
                            "Le geste horizontal reste contenu dans la piste.",
                        ],
                    ].map(([value, description]) => (
                        <article key={value} className="bg-surface p-5">
                            <code className="font-mono text-xs text-accent">
                                overscroll=&quot;{value}&quot;
                            </code>
                            <p className="mt-3 text-sm leading-6 text-ink-soft">
                                {description}
                            </p>
                        </article>
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
                            <PixieRail
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
                            </PixieRail>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="rail-scenarios" className="mt-16">
                <SequenceTitle
                    id="rail-scenarios"
                    eyebrow="Scénarios préparés"
                    title="Quatre travelling pour quatre collections"
                    description="Les réglages composent des cartes d’archives, une chronologie, des repères compacts ou une galerie centrée sans introduire de navigation artificielle."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 xl:grid-cols-2">
                    <Stage>
                        <div className="p-5">
                            <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Archives à découvrir
                            </p>
                            <PixieRail
                                itemWidth="sm"
                                gap="md"
                                peek="subtle"
                                aria-label="Archives à découvrir"
                                className="pb-3"
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
                            </PixieRail>
                        </div>
                    </Stage>

                    <Stage>
                        <div className="p-5">
                            <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Chronologie ordonnée
                            </p>
                            <PixieRail
                                as="ol"
                                itemWidth="xs"
                                gap="sm"
                                snap="mandatory"
                                snapAlign="start"
                                aria-label="Chronologie des œuvres"
                                className="m-0 list-none pb-3"
                            >
                                {films.slice(0, 5).map(([year, title]) => (
                                    <li key={title}>
                                        <FilmCard
                                            year={year}
                                            title={title}
                                            compact
                                        />
                                    </li>
                                ))}
                            </PixieRail>
                        </div>
                    </Stage>

                    <Stage>
                        <div className="p-5">
                            <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Repères de largeur naturelle
                            </p>
                            <PixieRail
                                itemWidth="auto"
                                gap="xs"
                                peek="none"
                                snap="none"
                                aria-label="Repères de production"
                                className="pb-3"
                            >
                                {[
                                    "Muet",
                                    "Noir et blanc",
                                    "Technicolor",
                                    "Multiplane",
                                    "Oscar",
                                ].map((label) => (
                                    <div
                                        key={label}
                                        className="border border-line-strong bg-surface-muted px-4 py-3 text-sm text-ink"
                                    >
                                        {label}
                                    </div>
                                ))}
                            </PixieRail>
                        </div>
                    </Stage>

                    <Stage>
                        <div className="p-5">
                            <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Galerie centrée
                            </p>
                            <PixieRail
                                itemWidth="md"
                                gap="md"
                                gutter="lg"
                                peek="strong"
                                snap="mandatory"
                                snapAlign="center"
                                snapStop="always"
                                scrollbar="thin"
                                aria-label="Galerie centrée"
                                className="pb-3"
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
                            </PixieRail>
                        </div>
                    </Stage>
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
                    <PixieSection
                        width="72"
                        gutter="lg"
                        spacing="lg"
                        gap="lg"
                        aria-labelledby="rail-composition-heading"
                    >
                        <PixieStack gap="xs">
                            <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Chronologie
                            </p>
                            <h4
                                id="rail-composition-heading"
                                className="text-3xl text-ink"
                            >
                                Le dessin animé trouve son langage
                            </h4>
                        </PixieStack>
                        <PixieRail
                            as="ol"
                            itemWidth="md"
                            gap="md"
                            snap="proximity"
                            snapAlign="start"
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
                        </PixieRail>
                    </PixieSection>
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
                id="pixie-rail-playground"
                aria-labelledby="rail-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="rail-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieRail"
                    description="Réglez la mesure des plans, leur rythme et leur point d’arrêt, puis éprouvez le travelling dans les trois cadres du plateau."
                />
                <div className="mt-8">
                    <PixieRailPlayground />
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
                    description="La racine reçoit un point de focus par défaut afin que le défilement horizontal reste disponible sans souris ni geste tactile, quelle que soit la présentation du témoin natif."
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
                            "Barre explicite",
                            "Ne masquer le témoin natif que si le hors-champ reste évident autrement.",
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
                        [
                            "Écriture logique",
                            "Les propriétés inline conservent le travelling dans les interfaces RTL.",
                        ],
                        [
                            "Mouvement réduit",
                            "Aucun défilement automatique ou animé n’est imposé par le Rail.",
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
                    title="API du composant"
                    description="Les types spécifiques restent colocalisés dans PixieRail.types.ts ; la primitive demeure statique et le playground porte seul l’état client."
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
