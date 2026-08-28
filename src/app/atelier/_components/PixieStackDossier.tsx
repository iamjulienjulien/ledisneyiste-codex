import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieBackdrop } from "@/components/ui/PixieBackdrop";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieContainer } from "@/components/ui/PixieContainer";
import {
    PixieStack,
    type PixieStackAlign,
    type PixieStackGap,
} from "@/components/ui/PixieStack";
import { PixieStackPlayground } from "./PixieStackPlayground";

const gaps = [
    {
        name: "Aucun",
        value: "none" as const,
        token: "0",
        role: "Plans volontairement jointifs.",
    },
    {
        name: "Très petit",
        value: "xs" as const,
        token: "0,5 rem",
        role: "Libellés et détails étroitement associés.",
    },
    {
        name: "Petit",
        value: "sm" as const,
        token: "1 rem",
        role: "Groupes compacts et micro-séquences.",
    },
    {
        name: "Moyen",
        value: "md" as const,
        token: "1,5 rem",
        role: "Rythme courant entre éléments liés.",
    },
    {
        name: "Grand",
        value: "lg" as const,
        token: "2 rem",
        role: "Respiration entre plans éditoriaux.",
    },
    {
        name: "Très grand",
        value: "xl" as const,
        token: "3 rem",
        role: "Changement marqué dans une composition.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieStackGap;
    token: string;
    role: string;
}>[];

const alignments = [
    {
        name: "Étiré",
        value: "stretch" as const,
        description: "Les enfants occupent l’axe horizontal disponible.",
    },
    {
        name: "Début",
        value: "start" as const,
        description: "Les plans se calent sur le bord de départ.",
    },
    {
        name: "Centre",
        value: "center" as const,
        description: "Les plans courts se placent au centre du cadre.",
    },
    {
        name: "Fin",
        value: "end" as const,
        description: "Les plans se calent sur le bord de fin.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieStackAlign;
    description: string;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieStackElement",
        defaultValue: '"div"',
        description: "Élément HTML qui porte la séquence verticale.",
    },
    {
        name: "gap",
        type: "PixieStackGap",
        defaultValue: '"md"',
        description: "Espace régulier entre les enfants directs.",
    },
    {
        name: "align",
        type: "PixieStackAlign",
        defaultValue: '"stretch"',
        description: "Alignement des enfants sur l’axe horizontal.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Plans placés dans leur ordre documentaire naturel.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes complémentaires appliquées à la séquence.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieStackElement",
        values: ['"div"', '"section"', '"article"', '"nav"', '"ul"', '"ol"'],
        description: "Structures verticales autorisées.",
    },
    {
        name: "PixieStackGap",
        values: ['"none"', '"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Rythmes verticaux disponibles.",
    },
    {
        name: "PixieStackAlign",
        values: ['"stretch"', '"start"', '"center"', '"end"'],
        description: "Alignements sur l’axe transversal.",
    },
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

function RhythmBlock({
    label,
    className = "",
}: Readonly<{ label: string; className?: string }>) {
    return (
        <div
            className={`border border-line bg-surface px-4 py-3 text-sm text-ink-soft ${className}`.trim()}
        >
            {label}
        </div>
    );
}

function Stage({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="border border-dashed border-line-strong bg-canvas p-6">
            {children}
        </div>
    );
}

export function PixieStackDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-stack"
            labelledBy="pixie-stack-title"
            nom="PixieStack"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Montage 002
                        </p>
                        <h2
                            id="pixie-stack-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieStack
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Régler le rythme d’une séquence verticale sans
                            modifier la matière de ses plans.
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
            <section aria-labelledby="stack-identity" className="mt-14">
                <SequenceTitle
                    id="stack-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Stack transforme plusieurs enfants directs en une séquence verticale régulière. Les plans gardent leur structure, leur surface et leur ordre documentaire."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Donner une cadence verticale prévisible."],
                        [
                            "Usage",
                            "Groupes de textes, listes, cartes, articles et navigations.",
                        ],
                        [
                            "Limite",
                            "Ne définit ni cadre horizontal, ni surface, ni séparation visible.",
                        ],
                        [
                            "Anatomie",
                            "Une colonne, un intervalle et un alignement transversal.",
                        ],
                        [
                            "Accessibilité",
                            "L’ordre DOM et la sémantique des enfants restent intacts.",
                        ],
                        [
                            "Dépendances",
                            "Aucune ; la primitive reste un composant serveur sans JavaScript client.",
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

            <section
                aria-labelledby="stack-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="stack-master"
                    eyebrow="Plan maître"
                    title="Trois plans composent une même respiration"
                    description="Le plan de référence combine un rythme général ample et un rythme interne plus serré sans aucune marge verticale ajoutée à la main."
                />

                <div className="mt-7 grid border border-line xl:grid-cols-2">
                    <div className="bg-canvas p-8">
                        <PixieStack
                            as="section"
                            gap="lg"
                            aria-labelledby="stack-master-heading"
                        >
                            <PixieStack gap="xs">
                                <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                    Le dessin animé trouve son langage
                                </p>
                                <h4
                                    id="stack-master-heading"
                                    className="text-3xl text-ink"
                                >
                                    Le mouvement, la musique et la couleur
                                </h4>
                            </PixieStack>

                            <p className="max-w-2xl leading-7 text-ink-soft">
                                Chaque plan conserve sa voix tandis que Stack
                                rend leurs intervalles explicites.
                            </p>

                            <PixieStack gap="sm">
                                <RhythmBlock label="The Skeleton Dance · 1929" />
                                <RhythmBlock label="Flowers and Trees · 1932" />
                                <RhythmBlock label="Three Little Pigs · 1933" />
                            </PixieStack>
                        </PixieStack>
                    </div>
                    <CodeExample>{`<PixieStack
    as="section"
    gap="lg"
    aria-labelledby="sequence-title"
>
    <PixieStack gap="xs">
        <p>Le dessin animé trouve son langage</p>
        <h2 id="sequence-title">Le mouvement, la musique et la couleur</h2>
    </PixieStack>

    <p>Introduction éditoriale.</p>

    <PixieStack gap="sm">
        {/* Archives */}
    </PixieStack>
</PixieStack>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="stack-gaps" className="mt-16">
                <SequenceTitle
                    id="stack-gaps"
                    eyebrow="Cadence"
                    title="Six intervalles rythment les plans"
                    description="Le row-gap s’applique seulement entre les enfants directs. Il ne crée aucun espace avant le premier plan ni après le dernier, et ne neutralise jamais leurs propres marges."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 md:grid-cols-2 xl:grid-cols-3">
                    {gaps.map((gap) => (
                        <Stage key={gap.value}>
                            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
                                <h4 className="text-lg text-ink">{gap.name}</h4>
                                <code className="font-mono text-xs text-accent">
                                    {gap.value} · {gap.token}
                                </code>
                            </div>
                            <PixieStack gap={gap.value}>
                                <RhythmBlock label="Plan A" />
                                <RhythmBlock label="Plan B" />
                                <RhythmBlock label="Plan C" />
                            </PixieStack>
                            <p className="mt-5 text-sm leading-6 text-muted">
                                {gap.role}
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="stack-alignments" className="mt-16">
                <SequenceTitle
                    id="stack-alignments"
                    eyebrow="Axe transversal"
                    title="Quatre alignements placent les plans dans le cadre"
                    description="L’alignement agit horizontalement. Il ne change ni l’ordre ni la cadence verticale de la séquence."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {alignments.map((alignment) => (
                        <Stage key={alignment.value}>
                            <h4 className="text-xl text-ink">
                                {alignment.name}
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-muted">
                                {alignment.description}
                            </p>
                            <PixieStack
                                gap="sm"
                                align={alignment.value}
                                className="mt-5 border-y border-dashed border-line-strong py-4"
                            >
                                <RhythmBlock
                                    label="Plan court"
                                    className={
                                        alignment.value === "stretch"
                                            ? ""
                                            : "w-1/2"
                                    }
                                />
                                <RhythmBlock
                                    label="Plan intermédiaire"
                                    className={
                                        alignment.value === "stretch"
                                            ? ""
                                            : "w-3/4"
                                    }
                                />
                            </PixieStack>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="stack-nesting" className="mt-16">
                <SequenceTitle
                    id="stack-nesting"
                    eyebrow="Montage imbriqué"
                    title="Le macro-rythme contient plusieurs micro-rythmes"
                    description="Imbriquer les Stack permet de rapprocher ce qui appartient au même plan et d’écarter les changements de séquence."
                />

                <div className="mt-7 grid gap-8 xl:grid-cols-2">
                    <Stage>
                        <PixieStack gap="xl">
                            {["Personnages", "Créateurs", "Œuvres"].map(
                                (title, index) => (
                                    <PixieStack key={title} gap="xs">
                                        <p className="font-mono text-xs text-accent">
                                            Groupe{" "}
                                            {String(index + 1).padStart(2, "0")}
                                        </p>
                                        <h4 className="text-2xl text-ink">
                                            {title}
                                        </h4>
                                        <p className="leading-7 text-ink-soft">
                                            Un titre et son texte restent
                                            proches ; le groupe suivant reçoit
                                            davantage d’air.
                                        </p>
                                    </PixieStack>
                                ),
                            )}
                        </PixieStack>
                    </Stage>
                    <CodeExample>{`<PixieStack gap="xl">
    {groups.map((group) => (
        <PixieStack key={group.id} gap="xs">
            <p>{group.eyebrow}</p>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
        </PixieStack>
    ))}
</PixieStack>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="stack-scenarios" className="mt-16">
                <SequenceTitle
                    id="stack-scenarios"
                    eyebrow="Scénarios préparés"
                    title="Un même rythme traverse plusieurs matières"
                    description="Ces scènes ont validé la version 1.0.0 avec du récit long, des métadonnées compactes et une navigation nommée, sans lui confier le cadre ou la surface."
                />

                <div className="mt-7 grid gap-6 xl:grid-cols-3">
                    <Stage>
                        <PixieStack
                            as="article"
                            gap="sm"
                            aria-labelledby="stack-scenario-editorial"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Récit éditorial
                            </p>
                            <h4
                                id="stack-scenario-editorial"
                                className="text-2xl text-ink"
                            >
                                Le studio apprend à donner une personnalité au
                                mouvement
                            </h4>
                            <p className="leading-7 text-ink-soft">
                                Un titre sur plusieurs lignes et un paragraphe
                                développé conservent un axe de lecture stable,
                                même lorsque le cadre se resserre.
                            </p>
                        </PixieStack>
                    </Stage>

                    <Stage>
                        <PixieStack as="ul" gap="xs">
                            {[
                                ["Sortie", "18 novembre 1928"],
                                ["Série", "Mickey Mouse"],
                                ["Son", "Synchronisé"],
                            ].map(([label, value]) => (
                                <li
                                    key={label}
                                    className="grid grid-cols-[5rem_1fr] gap-3 border-b border-line py-3 first:pt-0 last:border-b-0 last:pb-0"
                                >
                                    <span className="text-xs font-eyebrow uppercase tracking-[0.12em] text-muted">
                                        {label}
                                    </span>
                                    <span className="text-sm text-ink-soft">
                                        {value}
                                    </span>
                                </li>
                            ))}
                        </PixieStack>
                    </Stage>

                    <Stage>
                        <PixieStack
                            as="nav"
                            gap="sm"
                            aria-labelledby="stack-scenario-navigation"
                        >
                            <h4
                                id="stack-scenario-navigation"
                                className="text-xl text-ink"
                            >
                                Rejoindre une famille
                            </h4>
                            <PixieStack as="ul" gap="xs">
                                {[
                                    ["Cadence", "#stack-gaps"],
                                    ["Alignements", "#stack-alignments"],
                                    ["Sémantique", "#stack-semantics"],
                                ].map(([label, href]) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            className="block border border-line bg-surface px-4 py-3 text-sm text-ink-soft transition-colors hover:border-line-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </PixieStack>
                        </PixieStack>
                    </Stage>
                </div>
            </section>

            <section aria-labelledby="stack-semantics" className="mt-16">
                <SequenceTitle
                    id="stack-semantics"
                    eyebrow="Structure documentaire"
                    title="Une colonne peut aussi rester une vraie liste"
                    description="ul et ol conservent leur sémantique native. Leurs enfants directs restent impérativement des éléments li."
                />

                <div className="mt-7 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    <Stage>
                        <p className="mb-5 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Liste ordonnée
                        </p>
                        <PixieStack as="ol" gap="sm">
                            {[
                                "Préparer les dessins",
                                "Photographier les cellulos",
                                "Projeter la séquence",
                            ].map((step, index) => (
                                <li
                                    key={step}
                                    className="grid grid-cols-[2rem_1fr] items-center gap-3 border border-line bg-surface p-4"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="font-mono text-xs text-accent"
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-ink-soft">
                                        {step}
                                    </span>
                                </li>
                            ))}
                        </PixieStack>
                    </Stage>

                    <Stage>
                        <p className="mb-5 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Section nommée
                        </p>
                        <PixieStack
                            as="section"
                            gap="md"
                            aria-labelledby="stack-semantic-heading"
                        >
                            <h4
                                id="stack-semantic-heading"
                                className="text-2xl text-ink"
                            >
                                Les étapes de la projection
                            </h4>
                            <p className="leading-7 text-ink-soft">
                                Le titre visible donne un nom à la région ;
                                Stack ne crée aucun rôle supplémentaire.
                            </p>
                        </PixieStack>
                    </Stage>

                    <Stage>
                        <p className="mb-5 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Navigation nommée
                        </p>
                        <PixieStack
                            as="nav"
                            gap="sm"
                            aria-labelledby="stack-semantic-navigation"
                        >
                            <h4
                                id="stack-semantic-navigation"
                                className="text-2xl text-ink"
                            >
                                Autour de Mickey
                            </h4>
                            <p className="leading-7 text-ink-soft">
                                La région de navigation conserve son rôle natif
                                et reçoit un nom perceptible.
                            </p>
                        </PixieStack>
                    </Stage>
                </div>
            </section>

            <section aria-labelledby="stack-composition" className="mt-16">
                <SequenceTitle
                    id="stack-composition"
                    eyebrow="Composition"
                    title="Container cadre, Stack rythme, Card porte la matière"
                    description="Chaque primitive conserve une responsabilité lisible dans la composition finale."
                />

                <PixieBackdrop
                    variant="gradient"
                    intensity="strong"
                    position="start"
                    color="indigo-nuit-studio"
                    padding="none"
                    texture="grain"
                    className="mt-7 py-12"
                >
                    <PixieContainer width="56" gutter="lg">
                        <PixieStack
                            as="section"
                            gap="lg"
                            aria-labelledby="stack-composition-heading"
                        >
                            <PixieStack gap="xs">
                                <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                    Projection générale
                                </p>
                                <h4
                                    id="stack-composition-heading"
                                    className="text-3xl text-ink"
                                >
                                    Trois archives entrent dans le même
                                    mouvement
                                </h4>
                            </PixieStack>

                            <PixieStack gap="sm">
                                {[
                                    "Plane Crazy",
                                    "Steamboat Willie",
                                    "The Skeleton Dance",
                                ].map((title) => (
                                    <PixieCard
                                        key={title}
                                        as="article"
                                        variant="outline"
                                        padding="md"
                                    >
                                        <h5 className="text-xl text-ink">
                                            {title}
                                        </h5>
                                    </PixieCard>
                                ))}
                            </PixieStack>
                        </PixieStack>
                    </PixieContainer>
                </PixieBackdrop>
            </section>

            <section aria-labelledby="stack-boundaries" className="mt-16">
                <SequenceTitle
                    id="stack-boundaries"
                    eyebrow="Raccords de montage"
                    title="Le rythme reste distinct du cadre et de la distribution"
                    description="Stack ne remplace pas les autres outils du Montage ; il leur apporte seulement une cadence verticale."
                />

                <div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        ["Container", "Cadre horizontal et gouttières."],
                        ["Stack", "Rythme vertical des enfants directs."],
                        ["Grid", "Distribution sur plusieurs colonnes."],
                        [
                            "Section",
                            "Séquence éditoriale complète et structurée.",
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
                id="pixie-stack-playground"
                aria-labelledby="stack-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="stack-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieStack"
                    description="Réglez son rythme, son alignement et sa structure ; le code d’utilisation suit chaque changement."
                />
                <div className="mt-8">
                    <PixieStackPlayground />
                </div>
            </section>

            <section
                aria-labelledby="stack-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="stack-accessibility"
                    eyebrow="Accessibilité"
                    title="La cadence ne change jamais le récit"
                    description="Le composant agit uniquement sur la mise en page. L’ordre de lecture et la sémantique restent ceux du document."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Ordre naturel",
                            "Ne jamais inverser visuellement les enfants ni modifier leur ordre DOM.",
                        ],
                        [
                            "Région nommée",
                            'Associer as="section" ou as="nav" à un titre visible, aria-labelledby ou aria-label.',
                        ],
                        [
                            "Listes valides",
                            'Employer uniquement des li comme enfants directs de as="ul" ou as="ol".',
                        ],
                        [
                            "Parcours clavier",
                            "Le gap et l’alignement ne déplacent aucun focus et n’ajoutent aucune interaction.",
                        ],
                        [
                            "Texte long",
                            "Préférer stretch ou start pour préserver un axe de lecture prévisible.",
                        ],
                        [
                            "Zoom à 200 %",
                            "Les enfants doivent se contracter sans provoquer de défilement horizontal.",
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
                aria-labelledby="stack-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="stack-technical"
                    eyebrow="Générique technique"
                    title="API du composant"
                    description="Les types spécifiques sont colocalisés dans PixieStack.types.ts et les attributs HTML compatibles sont transmis à l’élément rendu."
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

            <section aria-labelledby="stack-journal" className="mt-16">
                <SequenceTitle
                    id="stack-journal"
                    eyebrow="Contrat de projection"
                    title="Les garanties de la version 1.0.0"
                    description="PixieStack est prêt à rythmer les futures compositions du Codex sans prendre en charge leur cadre, leur surface ou leur distribution."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Les six rythmes s’appliquent uniquement entre les enfants directs avec un row-gap explicite.",
                        "Les quatre alignements agissent sur l’axe horizontal sans modifier l’ordre documentaire.",
                        "Div, section, article, nav, ul et ol conservent leur sémantique native.",
                        "Les listes restent composées de li et les régions significatives reçoivent un nom perceptible.",
                        "Les marges externes des enfants restent additives et ne sont jamais neutralisées par la primitive.",
                        "Min-width et min-height protègent les compositions imbriquées dans les cadres contraints.",
                        "La primitive reste un composant serveur sans surface, séparation, inversion ou JavaScript client.",
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
