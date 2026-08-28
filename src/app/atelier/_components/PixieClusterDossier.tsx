import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieButton } from "@/components/ui/PixieButton";
import {
    PixieCluster,
    type PixieClusterAlign,
    type PixieClusterGap,
    type PixieClusterJustify,
} from "@/components/ui/PixieCluster";
import { PixieContainer } from "@/components/ui/PixieContainer";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieStack } from "@/components/ui/PixieStack";
import { PixieClusterPlayground } from "./PixieClusterPlayground";

const gaps = [
    {
        name: "Aucun",
        value: "none" as const,
        token: "0",
        role: "Éléments volontairement jointifs.",
    },
    {
        name: "Très petit",
        value: "xs" as const,
        token: "0,5 rem",
        role: "Badges et repères très compacts.",
    },
    {
        name: "Petit",
        value: "sm" as const,
        token: "1 rem",
        role: "Rythme courant des groupes horizontaux.",
    },
    {
        name: "Moyen",
        value: "md" as const,
        token: "1,5 rem",
        role: "Actions ou éléments de tailles variées.",
    },
    {
        name: "Grand",
        value: "lg" as const,
        token: "2 rem",
        role: "Groupe aéré dans une large composition.",
    },
    {
        name: "Très grand",
        value: "xl" as const,
        token: "3 rem",
        role: "Rassemblement exceptionnel de plans distincts.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieClusterGap;
    token: string;
    role: string;
}>[];

const justifications = [
    {
        name: "Début",
        value: "start" as const,
        description: "Le groupe suit le bord de départ du cadre.",
    },
    {
        name: "Centre",
        value: "center" as const,
        description: "Chaque ligne du groupe se recentre dans le cadre.",
    },
    {
        name: "Fin",
        value: "end" as const,
        description: "Le groupe rejoint le bord de fin du cadre.",
    },
    {
        name: "Entre les plans",
        value: "between" as const,
        description: "Chaque ligne répartit son espace libre entre les plans.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieClusterJustify;
    description: string;
}>[];

const alignments = [
    {
        name: "Début",
        value: "start" as const,
        description: "Les sommets des éléments partagent le même repère.",
    },
    {
        name: "Centre",
        value: "center" as const,
        description: "Les centres visuels se placent sur le même axe.",
    },
    {
        name: "Fin",
        value: "end" as const,
        description: "Les bases des boîtes se rejoignent.",
    },
    {
        name: "Ligne de base",
        value: "baseline" as const,
        description: "Les textes de tailles différentes partagent leur ligne.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieClusterAlign;
    description: string;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieClusterElement",
        defaultValue: '"div"',
        description: "Élément HTML qui porte le groupe repliable.",
    },
    {
        name: "gap",
        type: "PixieClusterGap",
        defaultValue: '"sm"',
        description: "Espace horizontal et vertical entre les enfants.",
    },
    {
        name: "justify",
        type: "PixieClusterJustify",
        defaultValue: '"start"',
        description: "Placement ou distribution horizontale de chaque ligne.",
    },
    {
        name: "align",
        type: "PixieClusterAlign",
        defaultValue: '"center"',
        description: "Alignement vertical des éléments sur chaque ligne.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Éléments regroupés dans leur ordre documentaire.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes complémentaires appliquées au groupe.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieClusterElement",
        values: ['"div"', '"section"', '"nav"', '"ul"'],
        description: "Structures de regroupement autorisées.",
    },
    {
        name: "PixieClusterGap",
        values: ['"none"', '"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Espacements bidirectionnels disponibles.",
    },
    {
        name: "PixieClusterJustify",
        values: ['"start"', '"center"', '"end"', '"between"'],
        description: "Placements et distribution horizontale disponibles.",
    },
    {
        name: "PixieClusterAlign",
        values: ['"start"', '"center"', '"end"', '"baseline"'],
        description: "Alignements verticaux disponibles.",
    },
] as const;

const metadata = [
    ["Personnages", "rouge-crayon"],
    ["Créateurs", "ambre-projecteur"],
    ["Œuvres", "violet-ombre-portee"],
    ["Époques", "vert-cellulo"],
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
        <div className="border border-dashed border-line-strong bg-canvas p-6">
            {children}
        </div>
    );
}

function ClusterChip({
    children,
    className = "",
}: Readonly<{ children: ReactNode; className?: string }>) {
    return (
        <span
            className={`inline-flex border border-line bg-surface px-4 py-3 text-sm text-ink-soft ${className}`.trim()}
        >
            {children}
        </span>
    );
}

export function PixieClusterDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-cluster"
            labelledBy="pixie-cluster-title"
            nom="PixieCluster"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Montage 003
                        </p>
                        <h2
                            id="pixie-cluster-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieCluster
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Rassembler des éléments liés et les laisser revenir
                            à la ligne lorsque le cadre se resserre.
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
            <section aria-labelledby="cluster-identity" className="mt-14">
                <SequenceTitle
                    id="cluster-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Cluster forme un groupe horizontal souple. Lorsque l’espace manque, ses enfants passent sur les lignes suivantes sans changer leur ordre."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Rassembler des éléments courts et liés."],
                        [
                            "Usage",
                            "Métadonnées, actions, navigations et filtres compacts.",
                        ],
                        [
                            "Limite",
                            "Ne crée ni grille, ni rail, ni régions stables en champ et contrechamp.",
                        ],
                        [
                            "Anatomie",
                            "Un flux repliable, un intervalle et deux axes d’alignement.",
                        ],
                        [
                            "Accessibilité",
                            "Le retour à la ligne respecte l’ordre DOM et les sémantiques natives.",
                        ],
                        [
                            "Dépendances",
                            "Aucune ; l’échelle de gap reste accordée à Stack.",
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
                aria-labelledby="cluster-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="cluster-master"
                    eyebrow="Plan maître"
                    title="Les familles se rassemblent sur une même ligne"
                    description="Le plan de référence regroupe des badges de tailles naturelles. La ligne se replie seulement lorsque le cadre l’exige."
                />

                <div className="mt-7 grid border border-line xl:grid-cols-2">
                    <div className="bg-canvas p-8">
                        <PixieCluster as="ul" gap="sm" align="center">
                            {metadata.map(([label, color]) => (
                                <li key={label}>
                                    <PixieBadge
                                        variant="soft"
                                        size="lg"
                                        shape="pill"
                                        color={color}
                                    >
                                        {label}
                                    </PixieBadge>
                                </li>
                            ))}
                        </PixieCluster>
                    </div>
                    <CodeExample>{`<PixieCluster
    as="ul"
    gap="sm"
    justify="start"
    align="center"
>
    {metadata.map((item) => (
        <li key={item.slug}>
            <PixieBadge>{item.label}</PixieBadge>
        </li>
    ))}
</PixieCluster>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="cluster-gaps" className="mt-16">
                <SequenceTitle
                    id="cluster-gaps"
                    eyebrow="Intervalles"
                    title="Six espacements agissent dans les deux directions"
                    description="Le même gap sépare les éléments sur une ligne et les lignes produites par le repli."
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
                            <PixieCluster gap={gap.value}>
                                <ClusterChip>Plan A</ClusterChip>
                                <ClusterChip>Plan B</ClusterChip>
                                <ClusterChip>Plan C</ClusterChip>
                                <ClusterChip>Plan D</ClusterChip>
                            </PixieCluster>
                            <p className="mt-5 text-sm leading-6 text-muted">
                                {gap.role}
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="cluster-justify" className="mt-16">
                <SequenceTitle
                    id="cluster-justify"
                    eyebrow="Placement horizontal"
                    title="Quatre distributions placent chaque ligne"
                    description="Début, centre et fin gardent le groupe compact. Between distribue l’espace libre entre les enfants de chaque ligne, y compris la dernière après un retour."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 md:grid-cols-2 xl:grid-cols-4">
                    {justifications.map((justification) => (
                        <Stage key={justification.value}>
                            <h4 className="text-xl text-ink">
                                {justification.name}
                            </h4>
                            <p className="mt-2 min-h-12 text-sm leading-6 text-muted">
                                {justification.description}
                            </p>
                            <PixieCluster
                                gap="xs"
                                justify={justification.value}
                                className="mt-5 border-y border-dashed border-line-strong py-4"
                            >
                                <ClusterChip>A</ClusterChip>
                                <ClusterChip>B</ClusterChip>
                                <ClusterChip>C</ClusterChip>
                            </PixieCluster>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="cluster-between" className="mt-16">
                <SequenceTitle
                    id="cluster-between"
                    eyebrow="Scénarios préparés"
                    title="Between ouvre l’espace sans figer la composition"
                    description="La nouvelle distribution convient aux en-têtes souples et aux petits groupes de repères. Le retour à la ligne reste celui d’un Cluster, pas celui d’un Split."
                />

                <div className="mt-7 grid gap-6 xl:grid-cols-3">
                    <Stage>
                        <p className="mb-5 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Informations et actions
                        </p>
                        <PixieCluster gap="sm" justify="between" align="center">
                            <PixieStack gap="xs">
                                <span className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                                    Œuvre · 1932
                                </span>
                                <strong className="text-xl text-ink">
                                    Flowers and Trees
                                </strong>
                            </PixieStack>
                            <PixieCluster gap="xs">
                                <PixieButton
                                    type="button"
                                    variant="outline"
                                    size="xs"
                                    color="ambre-projecteur"
                                >
                                    Sources
                                </PixieButton>
                                <PixieButton
                                    type="button"
                                    variant="solid"
                                    size="xs"
                                    color="ambre-projecteur"
                                >
                                    Ouvrir
                                </PixieButton>
                            </PixieCluster>
                        </PixieCluster>
                    </Stage>

                    <Stage>
                        <p className="mb-5 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Trois repères
                        </p>
                        <PixieCluster gap="sm" justify="between">
                            <ClusterChip>1928</ClusterChip>
                            <ClusterChip>1932</ClusterChip>
                            <ClusterChip>1937</ClusterChip>
                        </PixieCluster>
                    </Stage>

                    <Stage>
                        <p className="mb-5 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Dernière ligne visible
                        </p>
                        <div className="max-w-64 border-x border-dashed border-line-strong px-2">
                            <PixieCluster gap="xs" justify="between">
                                {["Animation", "Musique", "Couleur", "Son"].map(
                                    (label) => (
                                        <ClusterChip key={label}>
                                            {label}
                                        </ClusterChip>
                                    ),
                                )}
                            </PixieCluster>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-muted">
                            Chaque ligne répartit son propre espace : ce rendu
                            doit rester un choix conscient.
                        </p>
                    </Stage>
                </div>

                <div className="mt-8">
                    <CodeExample>{`<PixieCluster
    gap="sm"
    justify="between"
    align="center"
>
    <PixieCluster gap="xs">
        {/* Informations */}
    </PixieCluster>
    <PixieCluster gap="xs">
        {/* Actions */}
    </PixieCluster>
</PixieCluster>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="cluster-align" className="mt-16">
                <SequenceTitle
                    id="cluster-align"
                    eyebrow="Alignement vertical"
                    title="Quatre repères accordent des hauteurs différentes"
                    description="L’alignement s’applique à chaque ligne indépendamment et devient particulièrement visible avec des textes ou contrôles de tailles variées."
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
                            <PixieCluster
                                gap="sm"
                                align={alignment.value}
                                className="mt-5 min-h-28 border-y border-dashed border-line-strong py-4"
                            >
                                <span className="border border-line bg-surface px-3 py-2 text-xs text-ink-soft">
                                    Petit
                                </span>
                                <span className="border border-line bg-surface px-4 py-4 text-xl text-ink">
                                    Grand
                                </span>
                                <span className="border border-line bg-surface px-3 py-3 text-sm text-ink-soft">
                                    Moyen
                                </span>
                            </PixieCluster>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="cluster-wrapping" className="mt-16">
                <SequenceTitle
                    id="cluster-wrapping"
                    eyebrow="Changement de format"
                    title="Le groupe se replie sans devenir un rail"
                    description="Les mêmes éléments traversent trois largeurs de cadre. Aucun défilement horizontal ni troncature n’est introduit."
                />

                <div className="mt-7 grid items-start gap-8 xl:grid-cols-[16rem_26rem_1fr]">
                    {[
                        ["Compact", "max-w-64"],
                        ["Moyen", "max-w-md"],
                        ["Large", "max-w-none"],
                    ].map(([label, frameClass]) => (
                        <div key={label} className={`w-full ${frameClass}`}>
                            <p className="mb-3 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                {label}
                            </p>
                            <Stage>
                                <PixieCluster gap="sm">
                                    {[
                                        "Animation",
                                        "Musique",
                                        "Technicolor",
                                        "Personnalité",
                                        "Récompenses",
                                    ].map((label) => (
                                        <ClusterChip key={label}>
                                            {label}
                                        </ClusterChip>
                                    ))}
                                </PixieCluster>
                            </Stage>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="cluster-semantics" className="mt-16">
                <SequenceTitle
                    id="cluster-semantics"
                    eyebrow="Structure documentaire"
                    title="Le groupe garde la sémantique de son contenu"
                    description="Cluster peut rester neutre, porter une liste ou devenir un repère de navigation explicitement nommé."
                />

                <div className="mt-7 grid gap-6 lg:grid-cols-2">
                    <Stage>
                        <p className="mb-5 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Liste de métadonnées
                        </p>
                        <PixieCluster as="ul" gap="xs" aria-label="Formats">
                            {["Court métrage", "Sonore", "Noir et blanc"].map(
                                (label) => (
                                    <li key={label}>
                                        <PixieBadge
                                            variant="outline"
                                            size="sm"
                                            tone="inherit"
                                        >
                                            {label}
                                        </PixieBadge>
                                    </li>
                                ),
                            )}
                        </PixieCluster>
                    </Stage>

                    <Stage>
                        <p className="mb-5 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Navigation nommée
                        </p>
                        <PixieCluster
                            as="nav"
                            gap="sm"
                            aria-label="Explorer les familles"
                        >
                            {[
                                ["Personnages", "/personnages"],
                                ["Créateurs", "/contributeurs"],
                                ["Œuvres", "/oeuvres"],
                            ].map(([label, href]) => (
                                <a
                                    key={href}
                                    href={href}
                                    className="font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
                                >
                                    {label}
                                </a>
                            ))}
                        </PixieCluster>
                    </Stage>
                </div>
            </section>

            <section aria-labelledby="cluster-composition" className="mt-16">
                <SequenceTitle
                    id="cluster-composition"
                    eyebrow="Composition"
                    title="Container cadre, Stack rythme, Cluster rassemble"
                    description="Le groupe rejoint une composition complète sans reprendre les responsabilités des autres primitives."
                />

                <PixiePanel
                    as="section"
                    variant="outline"
                    padding="lg"
                    aria-labelledby="cluster-composition-heading"
                    className="mt-7"
                >
                    <PixieContainer width="56" gutter="none">
                        <PixieStack gap="lg">
                            <PixieStack gap="xs">
                                <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                    Première projection
                                </p>
                                <h4
                                    id="cluster-composition-heading"
                                    className="text-3xl text-ink"
                                >
                                    Le mouvement rejoint la musique
                                </h4>
                            </PixieStack>

                            <p className="max-w-2xl leading-7 text-ink-soft">
                                Les métadonnées et les actions forment deux
                                groupes distincts dans le rythme général.
                            </p>

                            <PixieCluster gap="xs">
                                {metadata.map(([label, color]) => (
                                    <PixieBadge
                                        key={label}
                                        variant="soft"
                                        size="sm"
                                        color={color}
                                    >
                                        {label}
                                    </PixieBadge>
                                ))}
                            </PixieCluster>

                            <PixieCluster gap="sm">
                                <PixieButton
                                    type="button"
                                    variant="solid"
                                    size="sm"
                                    color="ambre-projecteur"
                                >
                                    Ouvrir la fiche
                                </PixieButton>
                                <PixieButton
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    color="ambre-projecteur"
                                >
                                    Voir les relations
                                </PixieButton>
                            </PixieCluster>
                        </PixieStack>
                    </PixieContainer>
                </PixiePanel>
            </section>

            <section aria-labelledby="cluster-boundaries" className="mt-16">
                <SequenceTitle
                    id="cluster-boundaries"
                    eyebrow="Raccords de montage"
                    title="Le groupe repliable reste distinct des autres distributions"
                    description="Cluster conserve la taille naturelle de ses enfants et choisit le retour à la ligne plutôt que le débordement."
                />

                <div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        [
                            "Cluster",
                            "Flux horizontal repliable, compact ou distribué avec between.",
                        ],
                        ["Grid", "Colonnes régulières et largeur distribuée."],
                        [
                            "Split",
                            "Deux régions stables placées en champ et contrechamp.",
                        ],
                        [
                            "Rail",
                            "Flux horizontal continu avec débordement assumé.",
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
                id="pixie-cluster-playground"
                aria-labelledby="cluster-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="cluster-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieCluster"
                    description="Réglez son espacement, ses deux axes et sa structure ; le code d’utilisation suit chaque changement."
                />
                <div className="mt-8">
                    <PixieClusterPlayground />
                </div>
            </section>

            <section
                aria-labelledby="cluster-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="cluster-accessibility"
                    eyebrow="Accessibilité"
                    title="Le retour à la ligne ne change pas l’ordre du groupe"
                    description="La disposition répond à la largeur disponible, mais le récit et le parcours clavier suivent toujours l’ordre du DOM."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Ordre naturel",
                            "Ne jamais réordonner les enfants selon leur taille ou leur ligne d’arrivée.",
                        ],
                        [
                            "Liste valide",
                            'Employer uniquement des li comme enfants directs de as="ul".',
                        ],
                        [
                            "Navigation nommée",
                            'Donner un aria-label ou aria-labelledby distinct à as="nav" lorsque plusieurs navigations existent.',
                        ],
                        [
                            "Section nommée",
                            'Associer as="section" à un titre visible ou à un nom accessible.',
                        ],
                        [
                            "Libellés longs",
                            "Autoriser les éléments à se contracter ou leur texte à revenir à la ligne.",
                        ],
                        [
                            "Distribution between",
                            "Vérifier que la lecture reste cohérente lorsque chaque ligne répartit séparément son espace.",
                        ],
                        [
                            "Zoom à 200 %",
                            "Le groupe doit gagner des lignes sans produire de défilement horizontal.",
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
                aria-labelledby="cluster-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="cluster-technical"
                    eyebrow="Générique technique"
                    title="API du composant"
                    description="Les types spécifiques sont colocalisés dans PixieCluster.types.ts et les attributs HTML compatibles sont transmis à l’élément rendu."
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
