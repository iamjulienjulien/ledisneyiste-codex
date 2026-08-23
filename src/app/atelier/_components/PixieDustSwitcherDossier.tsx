import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieDustCard } from "@/components/ui/PixieDustCard";
import { PixieDustSection } from "@/components/ui/PixieDustSection";
import { PixieDustStack } from "@/components/ui/PixieDustStack";
import {
    PixieDustSwitcher,
    type PixieDustSwitcherAlign,
    type PixieDustSwitcherGap,
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
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustSwitcherThreshold;
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
        name: "limit",
        type: "PixieDustSwitcherLimit",
        defaultValue: "4",
        description: "Nombre maximal d’enfants autorisés sur une rangée.",
    },
    {
        name: "gap",
        type: "PixieDustSwitcherGap",
        defaultValue: '"md"',
        description: "Intervalle entre les enfants dans les deux dispositions.",
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
        values: ['"div"', '"ul"', '"ol"'],
        description: "Structures neutre et listes autorisées.",
    },
    {
        name: "PixieDustSwitcherThreshold",
        values: ['"xs"', '"sm"', '"md"', '"lg"'],
        description: "Seuils intrinsèques de passage en pile.",
    },
    {
        name: "PixieDustSwitcherLimit",
        values: ["2", "3", "4", "5", "6"],
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
        <PixieDustCard as="article" variant="outline" padding="md">
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
        </PixieDustCard>
    );
}

export function PixieDustSwitcherDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-switcher"
            labelledBy="pixie-dust-switcher-title"
            nom="PixieDustSwitcher"
            className="mt-16 scroll-mt-8"
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
            <section aria-labelledby="switcher-identity" className="mt-14">
                <SequenceTitle
                    id="switcher-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Switcher protège la cohérence d’un petit groupe : les plans restent tous côte à côte ou passent tous en pile, sans état intermédiaire sur plusieurs lignes."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        [
                            "Mission",
                            "Basculer une séquence entière entre rangée et pile.",
                        ],
                        [
                            "Usage",
                            "Actions, cartes, indicateurs et petits groupes éditoriaux.",
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
                    description="threshold établit la largeur attendue ; limit empêche une rangée de devenir trop dense, même lorsque le cadre serait assez large."
                />

                <div className="mt-7 border border-accent/60 bg-canvas p-4 sm:p-6">
                    <p className="font-mono text-xs text-accent">
                        PixieDustSwitcher · threshold + limit + gap
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

            <section aria-labelledby="switcher-thresholds" className="mt-16">
                <SequenceTitle
                    id="switcher-thresholds"
                    eyebrow="Seuil de bascule"
                    title="Quatre mesures règlent le changement de plan"
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
                    description="Dès que la distribution dépasse limit, tous les enfants prennent une ligne complète, quelle que soit la largeur du cadre."
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
                    description="Le rythme reste cohérent avant et après la bascule, sans changer la relation entre les plans."
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
                    description="div reste neutre ; ul et ol expriment une collection et attendent alors des li comme enfants directs."
                />

                <div className="mt-7 grid gap-px border border-line bg-line lg:grid-cols-3">
                    {[
                        ["div", "Groupe visuel déjà décrit par son contexte."],
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
                    <PixieDustSection
                        width="wide"
                        gutter="lg"
                        spacing="lg"
                        gap="lg"
                        aria-labelledby="switcher-composition-heading"
                    >
                        <PixieDustStack gap="xs">
                            <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Quatre portes
                            </p>
                            <h4
                                id="switcher-composition-heading"
                                className="text-3xl text-ink"
                            >
                                Explorer le Codex
                            </h4>
                        </PixieDustStack>
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
                    </PixieDustSection>
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
                    description="Réglez le seuil, la limite et le cadre ; le plateau permet d’observer séparément les bascules provoquées par l’espace et par le nombre d’enfants."
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
                    description="L’esquisse devra être confrontée à de vrais groupes du Codex avant de devenir une primitive stable."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Éprouver les quatre seuils avec des cartes aux contenus très différents.",
                        "Valider les limites de deux à six enfants dans des cadres imbriqués.",
                        "Tester div, ul et ol avec les outils d’accessibilité.",
                        "Contrôler les deux Lumières, le mobile et le zoom à 200 %.",
                        "Comparer le comportement avec Grid et Cluster sur les cas ambigus.",
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
