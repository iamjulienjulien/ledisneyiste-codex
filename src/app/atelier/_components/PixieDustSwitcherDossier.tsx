import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieSection } from "@/components/ui/PixieSection";
import { PixieStack } from "@/components/ui/PixieStack";
import {
    PixieDustSwitcher,
    type PixieDustSwitcherAlign,
    type PixieDustSwitcherGap,
    type PixieDustSwitcherLayout,
    type PixieDustSwitcherThreshold,
} from "@/components/ui/PixieDustSwitcher";
import { PixieDustSwitcherPlayground } from "./PixieDustSwitcherPlayground";

const thresholds = [
    {
        name: "Très petit",
        value: "xs" as const,
        token: "30 rem",
        role: "Deux libellés courts ou actions très compactes.",
    },
    {
        name: "Petit",
        value: "sm" as const,
        token: "40 rem",
        role: "Petit groupe de cartes ou de repères.",
    },
    {
        name: "Moyen",
        value: "md" as const,
        token: "50 rem",
        role: "Séquence éditoriale courante.",
    },
    {
        name: "Grand",
        value: "lg" as const,
        token: "60 rem",
        role: "Plans riches qui demandent davantage d’air.",
    },
    {
        name: "Très grand",
        value: "xl" as const,
        token: "72 rem",
        role: "Plans très documentés ou cadres panoramiques.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustSwitcherThreshold;
    token: string;
    role: string;
}>[];

const layouts = [
    {
        name: "Automatique",
        value: "auto" as const,
        role: "L’espace et le nombre d’enfants décident ensemble.",
    },
    {
        name: "Rangée",
        value: "row" as const,
        role: "Tous les plans restent volontairement côte à côte.",
    },
    {
        name: "Pile",
        value: "stack" as const,
        role: "Chaque plan occupe toujours sa propre ligne.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustSwitcherLayout;
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
    value: PixieDustSwitcherGap;
    token: string;
}>[];

const alignments = [
    { name: "Étiré", value: "stretch" as const },
    { name: "Début", value: "start" as const },
    { name: "Centre", value: "center" as const },
    { name: "Fin", value: "end" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustSwitcherAlign;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieDustSwitcherElement",
        defaultValue: '"div"',
        description: "Structure HTML qui porte la séquence.",
    },
    {
        name: "threshold",
        type: "PixieDustSwitcherThreshold",
        defaultValue: '"md"',
        description: "Largeur minimale requise pour conserver une rangée.",
    },
    {
        name: "layout",
        type: "PixieDustSwitcherLayout",
        defaultValue: '"auto"',
        description:
            "Laisse le Switcher décider ou impose une rangée ou une pile.",
    },
    {
        name: "limit",
        type: "PixieDustSwitcherLimit",
        defaultValue: "4",
        description:
            "Nombre maximal d’enfants sur une rangée ; false désactive ce garde-fou.",
    },
    {
        name: "gap",
        type: "PixieDustSwitcherGap",
        defaultValue: '"md"',
        description: "Intervalle entre les enfants dans les deux dispositions.",
    },
    {
        name: "rowGap",
        type: "PixieDustSwitcherGap",
        defaultValue: "gap",
        description: "Remplace l’intervalle vertical défini par gap.",
    },
    {
        name: "columnGap",
        type: "PixieDustSwitcherGap",
        defaultValue: "gap",
        description: "Remplace l’intervalle horizontal défini par gap.",
    },
    {
        name: "align",
        type: "PixieDustSwitcherAlign",
        defaultValue: '"stretch"',
        description: "Alignement transversal des enfants.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Plans qui composent la séquence.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées à la racine du Switcher.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustSwitcherElement",
        values: ['"div"', '"section"', '"nav"', '"ul"', '"ol"'],
        description: "Structures neutres, éditoriales et listes autorisées.",
    },
    {
        name: "PixieDustSwitcherLayout",
        values: ['"auto"', '"row"', '"stack"'],
        description: "Disposition intrinsèque ou volontairement imposée.",
    },
    {
        name: "PixieDustSwitcherThreshold",
        values: ['"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Seuils intrinsèques de passage en pile.",
    },
    {
        name: "PixieDustSwitcherLimit",
        values: ["false", "2", "3", "4", "5", "6"],
        description: "Limites d’enfants admises sur une ligne.",
    },
    {
        name: "PixieDustSwitcherGap",
        values: ['"none"', '"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Échelle des intervalles du Montage.",
    },
    {
        name: "PixieDustSwitcherAlign",
        values: ['"stretch"', '"start"', '"center"', '"end"'],
        description: "Alignements transversaux de la séquence.",
    },
] as const;

const plans = [
    ["Personnages", "Les figures qui peuplent les récits."],
    ["Créateurs", "Celles et ceux qui façonnent les images."],
    ["Œuvres", "Les films où les imaginaires prennent vie."],
    ["Époques", "Les périodes qui replacent Disney dans le temps."],
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
        <div className="overflow-hidden border border-dashed border-line-strong bg-canvas">
            {children}
        </div>
    );
}

function Plan({
    title,
    description,
    compact = false,
}: Readonly<{ title: string; description?: string; compact?: boolean }>) {
    return (
        <PixieCard as="article" variant="outline" padding="md">
            <p className="font-mono text-xs text-accent">Plan</p>
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

export function PixieDustSwitcherDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-switcher"
            labelledBy="pixie-dust-switcher-title"
            nom="PixieDustSwitcher"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Montage 008
                        </p>
                        <h2
                            id="pixie-dust-switcher-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustSwitcher
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Changer toute une séquence de la rangée à la pile
                            selon l’espace réellement disponible.
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
            <section aria-labelledby="switcher-identity" className="mt-14">
                <SequenceTitle
                    id="switcher-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Switcher protège la cohérence d’un petit groupe : il choisit collectivement une rangée ou une pile, ou respecte une disposition volontairement imposée."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        [
                            "Mission",
                            "Basculer une séquence entière entre rangée et pile.",
                        ],
                        [
                            "Usage",
                            "Actions, navigations, cartes, indicateurs et petits groupes éditoriaux.",
                        ],
                        [
                            "Limite",
                            "Ne produit ni grille partielle, ni rail horizontal.",
                        ],
                        [
                            "Anatomie",
                            "Une enveloppe flexible et un groupe d’enfants directs.",
                        ],
                        [
                            "Accessibilité",
                            "L’ordre du document ne change jamais.",
                        ],
                        [
                            "Dépendances",
                            "Flexbox et sélecteurs CSS, sans JavaScript.",
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

            <section aria-labelledby="switcher-anatomy" className="mt-16">
                <SequenceTitle
                    id="switcher-anatomy"
                    eyebrow="Anatomie du montage"
                    title="Un même casting, deux dispositions possibles"
                    description="layout fixe l’intention générale ; en mode auto, threshold établit la largeur attendue et limit empêche une rangée de devenir trop dense."
                />

                <div className="mt-7 border border-accent/60 bg-canvas p-4 sm:p-6">
                    <p className="font-mono text-xs text-accent">
                        PixieDustSwitcher · layout + threshold + limit + gaps
                    </p>
                    <PixieDustSwitcher
                        threshold="sm"
                        limit={4}
                        gap="sm"
                        className="mt-4"
                    >
                        {plans.map(([title, description]) => (
                            <div key={title}>
                                <Plan
                                    title={title}
                                    description={description}
                                    compact
                                />
                            </div>
                        ))}
                    </PixieDustSwitcher>
                </div>
            </section>

            <section
                aria-labelledby="switcher-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="switcher-master"
                    eyebrow="Plan maître"
                    title="Les quatre portes changent ensemble de disposition"
                    description="Dans un cadre confortable, les portes partagent une seule ligne. Si leur contrat ne tient plus, aucune ne reste isolée sur une rangée incomplète."
                />

                <div className="mt-7 grid border border-line xl:grid-cols-2">
                    <div className="bg-canvas p-6 sm:p-8">
                        <PixieDustSwitcher threshold="md" limit={4} gap="md">
                            {plans.map(([title, description]) => (
                                <div key={title}>
                                    <Plan
                                        title={title}
                                        description={description}
                                    />
                                </div>
                            ))}
                        </PixieDustSwitcher>
                    </div>
                    <CodeExample>{`<PixieDustSwitcher
    threshold="md"
    limit={4}
    gap="md"
    align="stretch"
>
    <Card>Personnages</Card>
    <Card>Créateurs</Card>
    <Card>Œuvres</Card>
    <Card>Époques</Card>
</PixieDustSwitcher>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="switcher-layouts" className="mt-16">
                <SequenceTitle
                    id="switcher-layouts"
                    eyebrow="Choix du montage"
                    title="Automatique, rangée ou pile"
                    description="auto conserve la bascule intrinsèque ; row et stack assument une décision éditoriale stable et ignorent alors threshold et limit."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-3">
                    {layouts.map((layout) => (
                        <Stage key={layout.value}>
                            <PixieDustSwitcher
                                layout={layout.value}
                                threshold="sm"
                                limit={3}
                                gap="sm"
                                className="p-4"
                            >
                                {plans.slice(0, 3).map(([title]) => (
                                    <div key={title}>
                                        <Plan title={title} compact />
                                    </div>
                                ))}
                            </PixieDustSwitcher>
                            <div className="border-t border-line bg-surface p-4">
                                <code className="font-mono text-xs text-accent">
                                    layout=&quot;{layout.value}&quot;
                                </code>
                                <p className="mt-3 text-sm leading-6 text-muted">
                                    {layout.role}
                                </p>
                            </div>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="switcher-scenarios" className="mt-16">
                <SequenceTitle
                    id="switcher-scenarios"
                    eyebrow="Scénarios préparés"
                    title="Des plans courts aux distributions irrégulières"
                    description="Ces compositions confrontent l’esquisse à ses usages futurs : actions, navigation, listes, séries denses et contenus de longueurs différentes."
                />

                <div className="mt-7 grid gap-6 lg:grid-cols-2">
                    <Stage>
                        <div className="p-5">
                            <PixieDustSwitcher layout="row" gap="sm">
                                <button
                                    type="button"
                                    className="border border-accent bg-accent px-4 py-3 font-medium text-canvas"
                                >
                                    Lancer la projection
                                </button>
                                <button
                                    type="button"
                                    className="border border-line-strong bg-surface px-4 py-3 font-medium text-ink"
                                >
                                    Garder en brouillon
                                </button>
                            </PixieDustSwitcher>
                        </div>
                        <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                            Deux actions · layout=&quot;row&quot;
                        </p>
                    </Stage>

                    <Stage>
                        <PixieDustSwitcher
                            threshold="xs"
                            limit={false}
                            gap="xs"
                            className="p-5"
                        >
                            {[
                                "1923",
                                "1928",
                                "1932",
                                "1934",
                                "1937",
                                "1940",
                            ].map((year) => (
                                <span
                                    key={year}
                                    className="border border-line bg-surface px-3 py-2 text-center font-mono text-xs text-ink"
                                >
                                    {year}
                                </span>
                            ))}
                        </PixieDustSwitcher>
                        <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                            Six repères · limit=&#123;false&#125;
                        </p>
                    </Stage>

                    <Stage>
                        <PixieDustSwitcher
                            as="nav"
                            aria-label="Familles du Codex"
                            threshold="sm"
                            limit={4}
                            gap="sm"
                            className="p-5"
                        >
                            {plans.map(([title]) => (
                                <a
                                    key={title}
                                    href="#pixie-dust-switcher"
                                    className="border border-line bg-surface px-4 py-3 text-center font-medium text-ink"
                                >
                                    {title}
                                </a>
                            ))}
                        </PixieDustSwitcher>
                        <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                            Navigation nommée · as=&quot;nav&quot;
                        </p>
                    </Stage>

                    <Stage>
                        <PixieDustSwitcher
                            as="ul"
                            threshold="sm"
                            limit={3}
                            gap="sm"
                            className="list-none p-5"
                        >
                            {plans.slice(0, 3).map(([title]) => (
                                <li key={title}>
                                    <Plan title={title} compact />
                                </li>
                            ))}
                        </PixieDustSwitcher>
                        <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                            Collection sémantique · ul puis li
                        </p>
                    </Stage>

                    <Stage>
                        <PixieDustSwitcher
                            threshold="sm"
                            limit={3}
                            gap="sm"
                            align="start"
                            className="p-5"
                        >
                            <div>
                                <Plan title="Plan bref" compact />
                            </div>
                            <div>
                                <Plan
                                    title="Plan documenté"
                                    description="Un contenu plus long vérifie que chaque surface garde sa hauteur propre sans rompre l’ordre de lecture."
                                    compact
                                />
                            </div>
                            <div>
                                <Plan title="Dernier repère" compact />
                            </div>
                        </PixieDustSwitcher>
                        <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                            Contenus déséquilibrés · align=&quot;start&quot;
                        </p>
                    </Stage>

                    <Stage>
                        <div className="grid gap-6 p-5 sm:grid-cols-2">
                            <div>
                                <p className="mb-3 font-mono text-xs text-muted">
                                    Cadre compact
                                </p>
                                <PixieDustSwitcher
                                    layout="stack"
                                    gap="md"
                                    rowGap="xl"
                                    columnGap="xs"
                                >
                                    {plans.slice(0, 2).map(([title]) => (
                                        <div key={title}>
                                            <Plan title={title} compact />
                                        </div>
                                    ))}
                                </PixieDustSwitcher>
                            </div>
                            <div>
                                <p className="mb-3 font-mono text-xs text-muted">
                                    Cadre horizontal
                                </p>
                                <PixieDustSwitcher
                                    layout="row"
                                    gap="md"
                                    rowGap="xl"
                                    columnGap="xs"
                                >
                                    {plans.slice(0, 2).map(([title]) => (
                                        <div key={title}>
                                            <Plan title={title} compact />
                                        </div>
                                    ))}
                                </PixieDustSwitcher>
                            </div>
                        </div>
                        <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                            rowGap=&quot;xl&quot; · columnGap=&quot;xs&quot;
                        </p>
                    </Stage>
                </div>
            </section>

            <section aria-labelledby="switcher-thresholds" className="mt-16">
                <SequenceTitle
                    id="switcher-thresholds"
                    eyebrow="Seuil de bascule"
                    title="Cinq mesures règlent le changement de plan"
                    description="Plus le seuil est élevé, plus tôt la séquence abandonne la rangée pour préserver la lisibilité de chaque enfant."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {thresholds.map((threshold) => (
                        <Stage key={threshold.value}>
                            <PixieDustSwitcher
                                threshold={threshold.value}
                                limit={3}
                                gap="sm"
                                className="p-4"
                            >
                                {plans.slice(0, 3).map(([title]) => (
                                    <div key={title}>
                                        <Plan title={title} compact />
                                    </div>
                                ))}
                            </PixieDustSwitcher>
                            <div className="border-t border-line bg-surface p-4">
                                <div className="flex flex-wrap items-baseline justify-between gap-3">
                                    <h4 className="text-lg text-ink">
                                        {threshold.name}
                                    </h4>
                                    <code className="font-mono text-xs text-accent">
                                        {threshold.value} · {threshold.token}
                                    </code>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-muted">
                                    {threshold.role}
                                </p>
                            </div>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="switcher-limits" className="mt-16">
                <SequenceTitle
                    id="switcher-limits"
                    eyebrow="Limite du casting"
                    title="Le nombre d’enfants peut imposer la pile"
                    description="Dès que la distribution dépasse limit, tous les enfants prennent une ligne complète. false laisse la largeur locale décider seule."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {([2, 3, 4, 5] as const).map((limit) => (
                        <Stage key={limit}>
                            <PixieDustSwitcher
                                threshold="xs"
                                limit={limit}
                                gap="xs"
                                className="p-4"
                            >
                                {plans
                                    .slice(0, limit === 2 ? 3 : 4)
                                    .map(([title]) => (
                                        <div key={title}>
                                            <Plan title={title} compact />
                                        </div>
                                    ))}
                            </PixieDustSwitcher>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                limit={limit}
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="switcher-responsive" className="mt-16">
                <SequenceTitle
                    id="switcher-responsive"
                    eyebrow="Raccord responsive"
                    title="La largeur locale décide, pas celle de l’écran"
                    description="La même composition réagit au cadre qui l’accueille. Elle peut donc changer dans une colonne étroite sans dépendre d’un breakpoint global."
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
                            <PixieDustSwitcher
                                threshold="md"
                                limit={4}
                                gap="sm"
                            >
                                {plans.map(([title]) => (
                                    <div key={title}>
                                        <Plan title={title} compact />
                                    </div>
                                ))}
                            </PixieDustSwitcher>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="switcher-gaps" className="mt-16">
                <SequenceTitle
                    id="switcher-gaps"
                    eyebrow="Intervalle de montage"
                    title="Six respirations suivent la rangée comme la pile"
                    description="gap pose le rythme commun ; rowGap et columnGap peuvent ensuite régler séparément la pile et la rangée."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 md:grid-cols-2 xl:grid-cols-3">
                    {gaps.map((gap) => (
                        <Stage key={gap.value}>
                            <PixieDustSwitcher
                                threshold="xs"
                                limit={2}
                                gap={gap.value}
                                className="p-4"
                            >
                                {plans.slice(0, 2).map(([title]) => (
                                    <div key={title}>
                                        <Plan title={title} compact />
                                    </div>
                                ))}
                            </PixieDustSwitcher>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                {gap.name} · {gap.value} · {gap.token}
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="switcher-align" className="mt-16">
                <SequenceTitle
                    id="switcher-align"
                    eyebrow="Axe transversal"
                    title="Quatre alignements confrontent les hauteurs"
                    description="stretch égalise la présence des surfaces ; les autres valeurs conservent la hauteur propre de chaque enfant."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {alignments.map((alignment) => (
                        <Stage key={alignment.value}>
                            <PixieDustSwitcher
                                threshold="xs"
                                limit={2}
                                gap="sm"
                                align={alignment.value}
                                className="min-h-56 p-4"
                            >
                                <div>
                                    <Plan title="Plan court" compact />
                                </div>
                                <div>
                                    <Plan
                                        title="Plan plus développé"
                                        description="Une matière supplémentaire révèle le comportement de l’axe transversal."
                                        compact
                                    />
                                </div>
                            </PixieDustSwitcher>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                align=&quot;{alignment.value}&quot;
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="switcher-semantics" className="mt-16">
                <SequenceTitle
                    id="switcher-semantics"
                    eyebrow="Structure documentaire"
                    title="La disposition ne remplace jamais la sémantique"
                    description="div reste neutre, section et nav donnent un rôle au groupe ; ul et ol expriment une collection et attendent des li comme enfants directs."
                />

                <div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
                    {[
                        ["div", "Groupe visuel déjà décrit par son contexte."],
                        [
                            "section",
                            "Séquence éditoriale nommée par un titre associé.",
                        ],
                        [
                            "nav",
                            "Ensemble de passages identifié par un nom accessible.",
                        ],
                        ["ul", "Collection sans ordre significatif."],
                        ["ol", "Séquence dont la progression porte du sens."],
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

            <section aria-labelledby="switcher-composition" className="mt-16">
                <SequenceTitle
                    id="switcher-composition"
                    eyebrow="Composition"
                    title="Section ouvre la séquence, Switcher règle ses plans"
                    description="Le conteneur éditorial, le rythme vertical et les surfaces restent confiés aux primitives qui en portent déjà la responsabilité."
                />

                <div className="mt-7 border border-line bg-canvas">
                    <PixieSection
                        width="72"
                        gutter="lg"
                        spacing="lg"
                        gap="lg"
                        aria-labelledby="switcher-composition-heading"
                    >
                        <PixieStack gap="xs">
                            <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Quatre portes
                            </p>
                            <h4
                                id="switcher-composition-heading"
                                className="text-3xl text-ink"
                            >
                                Explorer le Codex
                            </h4>
                        </PixieStack>
                        <PixieDustSwitcher threshold="md" limit={4} gap="md">
                            {plans.map(([title, description]) => (
                                <div key={title}>
                                    <Plan
                                        title={title}
                                        description={description}
                                    />
                                </div>
                            ))}
                        </PixieDustSwitcher>
                    </PixieSection>
                </div>
            </section>

            <section aria-labelledby="switcher-boundaries" className="mt-16">
                <SequenceTitle
                    id="switcher-boundaries"
                    eyebrow="Raccords de montage"
                    title="Une bascule collective, aucun rang intermédiaire"
                    description="Le choix dépend de l’intention de composition, pas seulement du nombre d’enfants."
                />

                <div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        ["Stack", "Conserve toujours une séquence verticale."],
                        [
                            "Cluster",
                            "Laisse chaque élément revenir individuellement à la ligne.",
                        ],
                        [
                            "Grid",
                            "Distribue une collection sur plusieurs rangées régulières.",
                        ],
                        [
                            "Switcher",
                            "Choisit collectivement entre une rangée et une pile.",
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
                id="pixie-dust-switcher-playground"
                aria-labelledby="switcher-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="switcher-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieDustSwitcher"
                    description="Réglez la disposition, le seuil, la limite et les deux axes d’espacement ; les contrôles intrinsèques s’effacent lorsque le plan est imposé."
                />
                <div className="mt-8">
                    <PixieDustSwitcherPlayground />
                </div>
            </section>

            <section
                aria-labelledby="switcher-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="switcher-accessibility"
                    eyebrow="Accessibilité"
                    title="La bascule visuelle conserve le récit"
                    description="Le composant ne réordonne et ne masque aucun enfant. La pile restitue exactement la progression définie dans le document."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Ordre naturel",
                            "La lecture, le focus et l’affichage suivent le même ordre.",
                        ],
                        [
                            "Listes valides",
                            "ul et ol reçoivent des li comme enfants directs.",
                        ],
                        [
                            "Zoom à 200 %",
                            "La pile doit apparaître avant tout débordement horizontal.",
                        ],
                        [
                            "Contenus longs",
                            "Chaque enfant autorise la réduction et la césure de son contenu.",
                        ],
                        [
                            "Sans couleur",
                            "La disposition reste compréhensible dans les deux Lumières.",
                        ],
                        [
                            "Sans mouvement",
                            "La bascule ne dépend d’aucune animation ni temporisation.",
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
                aria-labelledby="switcher-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="switcher-technical"
                    eyebrow="Générique technique"
                    title="API de l’esquisse"
                    description="Les types spécifiques restent colocalisés dans PixieDustSwitcher.types.ts ; le composant demeure statique et son playground porte seul l’état client."
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

            <section aria-labelledby="switcher-journal" className="mt-16">
                <SequenceTitle
                    id="switcher-journal"
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="La version 0.2.0 rassemble le contrat candidat ; elle doit maintenant être éprouvée dans de vrais montages avant sa promotion."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Éprouver les cinq seuils avec des cartes aux contenus très différents.",
                        "Valider les limites de deux à six enfants et leur désactivation dans des cadres imbriqués.",
                        "Confirmer que row et stack restent des choix explicites, jamais des correctifs responsive.",
                        "Tester div, section, nav, ul et ol avec les outils d’accessibilité.",
                        "Contrôler les deux Lumières, le mobile et le zoom à 200 %.",
                        "Éprouver rowGap et columnGap avant de figer leurs noms.",
                        "Décider si md, 4, md et stretch restent les bons réglages par défaut.",
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
