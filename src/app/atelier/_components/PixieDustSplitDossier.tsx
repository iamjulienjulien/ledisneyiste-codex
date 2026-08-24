import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieDustCluster } from "@/components/ui/PixieDustCluster";
import { PixieFrame } from "@/components/ui/PixieFrame";
import { PixieDustSection } from "@/components/ui/PixieDustSection";
import {
    PixieDustSplit,
    type PixieDustSplitAlign,
    type PixieDustSplitGap,
    type PixieDustSplitMinPaneWidth,
    type PixieDustSplitRatio,
} from "@/components/ui/PixieDustSplit";
import { PixieDustStack } from "@/components/ui/PixieDustStack";
import { PixieDustSplitPlayground } from "./PixieDustSplitPlayground";

const ratios = [
    {
        name: "Équilibre",
        value: "equal" as const,
        token: "1 / 1",
        role: "Deux plans de même importance.",
    },
    {
        name: "Champ large",
        value: "start-wide" as const,
        token: "3 / 2",
        role: "Le premier plan conduit la lecture.",
    },
    {
        name: "Contrechamp large",
        value: "end-wide" as const,
        token: "2 / 3",
        role: "Le second plan reçoit davantage d’espace.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustSplitRatio;
    token: string;
    role: string;
}>[];

const minPaneWidths = [
    {
        name: "Très petite",
        value: "xs" as const,
        token: "10 rem",
        role: "Deux repères compacts ou purement graphiques.",
    },
    {
        name: "Petite",
        value: "sm" as const,
        token: "14 rem",
        role: "Texte bref accompagné d’une vignette.",
    },
    {
        name: "Moyenne",
        value: "md" as const,
        token: "18 rem",
        role: "Composition éditoriale courante.",
    },
    {
        name: "Grande",
        value: "lg" as const,
        token: "24 rem",
        role: "Plans riches qui doivent respirer davantage.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustSplitMinPaneWidth;
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
    value: PixieDustSplitGap;
    token: string;
}>[];

const alignments = [
    { name: "Étiré", value: "stretch" as const },
    { name: "Début", value: "start" as const },
    { name: "Centre", value: "center" as const },
    { name: "Fin", value: "end" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustSplitAlign;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieDustSplitElement",
        defaultValue: '"div"',
        description: "Structure HTML qui porte les deux plans.",
    },
    {
        name: "ratio",
        type: "PixieDustSplitRatio",
        defaultValue: '"equal"',
        description: "Répartition de l’espace lorsque les plans cohabitent.",
    },
    {
        name: "minPaneWidth",
        type: "PixieDustSplitMinPaneWidth",
        defaultValue: '"md"',
        description: "Largeur minimale de chaque plan avant superposition.",
    },
    {
        name: "gap",
        type: "PixieDustSplitGap",
        defaultValue: '"lg"',
        description: "Intervalle entre le champ et le contrechamp.",
    },
    {
        name: "align",
        type: "PixieDustSplitAlign",
        defaultValue: '"stretch"',
        description: "Alignement des deux plans sur l’axe vertical.",
    },
    {
        name: "children",
        type: "PixieDustSplitChildren",
        defaultValue: "—",
        description: "Tuple composé d’exactement deux enfants directs.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées à la racine du Split.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustSplitElement",
        values: ['"div"', '"section"', '"article"'],
        description: "Structures documentaires autorisées.",
    },
    {
        name: "PixieDustSplitRatio",
        values: ['"equal"', '"start-wide"', '"end-wide"'],
        description: "Rapports disponibles entre champ et contrechamp.",
    },
    {
        name: "PixieDustSplitMinPaneWidth",
        values: ['"xs"', '"sm"', '"md"', '"lg"'],
        description: "Largeurs qui déclenchent la superposition naturelle.",
    },
    {
        name: "PixieDustSplitGap",
        values: ['"none"', '"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Échelle des intervalles du Montage.",
    },
    {
        name: "PixieDustSplitAlign",
        values: ['"stretch"', '"start"', '"center"', '"end"'],
        description: "Alignements verticaux des deux plans.",
    },
    {
        name: "PixieDustSplitChildren",
        values: ["readonly [ReactNode, ReactNode]"],
        description: "Contrat strict de deux enfants directs.",
    },
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

function SplitPane({
    label,
    description,
    className = "",
}: Readonly<{
    label: string;
    description?: string;
    className?: string;
}>) {
    return (
        <div
            className={`border border-line bg-surface p-5 text-ink-soft ${className}`.trim()}
        >
            <p className="font-mono text-xs text-accent">{label}</p>
            {description ? (
                <p className="mt-3 text-sm leading-6">{description}</p>
            ) : null}
        </div>
    );
}

export function PixieDustSplitDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-split"
            labelledBy="pixie-dust-split-title"
            nom="PixieDustSplit"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Montage 006
                        </p>
                        <h2
                            id="pixie-dust-split-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustSplit
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Répartir deux zones complémentaires en champ et
                            contrechamp, puis les réunir dans une même pile
                            lorsque le cadre se resserre.
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
            <section aria-labelledby="split-identity" className="mt-14">
                <SequenceTitle
                    id="split-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Split orchestre deux plans pairs. Leur apparence, leur contenu et leur sémantique interne restent entièrement libres."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Mettre deux zones éditoriales en regard."],
                        [
                            "Usage",
                            "Texte et image, introduction et repères, récit et archive.",
                        ],
                        [
                            "Limite",
                            "Ne gère ni troisième zone, ni surface, ni ordre alternatif.",
                        ],
                        [
                            "Anatomie",
                            "Une enveloppe flexible et exactement deux enfants directs.",
                        ],
                        [
                            "Accessibilité",
                            "L’ordre visuel reste identique à l’ordre documentaire.",
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

            <section aria-labelledby="split-anatomy" className="mt-16">
                <SequenceTitle
                    id="split-anatomy"
                    eyebrow="Anatomie du montage"
                    title="Deux plans, un seul ordre de lecture"
                    description="Le rapport distribue l’espace disponible. La largeur minimale décide quand les plans cessent de cohabiter."
                />

                <div className="mt-7 border border-accent/60 bg-canvas p-4 sm:p-6">
                    <p className="font-mono text-xs text-accent">
                        PixieDustSplit · ratio + minPaneWidth + gap
                    </p>
                    <PixieDustSplit
                        ratio="start-wide"
                        minPaneWidth="sm"
                        gap="md"
                        className="mt-4"
                    >
                        <SplitPane
                            label="01 · Champ"
                            description="Premier dans le document et dans la pile."
                        />
                        <SplitPane
                            label="02 · Contrechamp"
                            description="Second dans le document et dans la pile."
                        />
                    </PixieDustSplit>
                </div>
            </section>

            <section
                aria-labelledby="split-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="split-master"
                    eyebrow="Plan maître"
                    title="Le récit dialogue avec son image"
                    description="Le champ éditorial conduit la lecture ; le contrechamp visuel reçoit l’espace nécessaire sans devenir une règle métier."
                />

                <div className="mt-7 grid border border-line xl:grid-cols-2">
                    <div className="bg-canvas p-6 sm:p-8">
                        <PixieDustSplit
                            ratio="start-wide"
                            minPaneWidth="md"
                            gap="xl"
                            align="center"
                        >
                            <PixieDustStack gap="md">
                                <PixieDustStack gap="xs">
                                    <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                        Le dessin animé trouve son langage
                                    </p>
                                    <h4 className="text-3xl text-ink">
                                        Le mouvement rejoint la musique
                                    </h4>
                                </PixieDustStack>
                                <p className="leading-7 text-ink-soft">
                                    Le récit reste lisible lorsque les deux
                                    plans se retrouvent dans une seule colonne.
                                </p>
                                <PixieDustCluster gap="xs">
                                    {["1929", "Musique", "Animation"].map(
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
                                </PixieDustCluster>
                            </PixieDustStack>
                            <PixieFrame
                                variant="film"
                                aspect="landscape"
                                padding="sm"
                                radius="small"
                                color="orange-banc-titre"
                                caption="Contrechamp · The Skeleton Dance"
                            >
                                <div className="flex h-full items-center justify-center bg-surface-muted text-5xl">
                                    <span aria-hidden>♪</span>
                                </div>
                            </PixieFrame>
                        </PixieDustSplit>
                    </div>
                    <CodeExample>{`<PixieDustSplit
    ratio="start-wide"
    minPaneWidth="md"
    gap="xl"
    align="center"
>
    <div>{/* Champ éditorial */}</div>
    <PixieFrame>
        {/* Contrechamp visuel */}
    </PixieFrame>
</PixieDustSplit>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="split-ratios" className="mt-16">
                <SequenceTitle
                    id="split-ratios"
                    eyebrow="Rapports de cadre"
                    title="Trois équilibres distribuent la lumière"
                    description="Le rapport ne s’applique que sur une même ligne. Une fois superposés, les deux plans reprennent toute la largeur."
                />

                <div className="mt-7 space-y-6 bg-canvas p-6">
                    {ratios.map((ratio) => (
                        <Stage key={ratio.value}>
                            <PixieDustSplit
                                ratio={ratio.value}
                                minPaneWidth="xs"
                                gap="sm"
                                className="p-4"
                            >
                                <SplitPane label="Champ" />
                                <SplitPane label="Contrechamp" />
                            </PixieDustSplit>
                            <div className="border-t border-line bg-surface p-4">
                                <div className="flex flex-wrap items-baseline justify-between gap-3">
                                    <h4 className="text-lg text-ink">
                                        {ratio.name}
                                    </h4>
                                    <code className="font-mono text-xs text-accent">
                                        {ratio.value} · {ratio.token}
                                    </code>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-muted">
                                    {ratio.role}
                                </p>
                            </div>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="split-widths" className="mt-16">
                <SequenceTitle
                    id="split-widths"
                    eyebrow="Seuil naturel"
                    title="Quatre largeurs protègent chaque plan"
                    description="Plus la largeur minimale augmente, plus le passage en pile survient tôt dans un cadre resserré."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {minPaneWidths.map((width) => (
                        <Stage key={width.value}>
                            <PixieDustSplit
                                ratio="equal"
                                minPaneWidth={width.value}
                                gap="sm"
                                className="p-4"
                            >
                                <SplitPane label="Champ" />
                                <SplitPane label="Contrechamp" />
                            </PixieDustSplit>
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

            <section aria-labelledby="split-responsive" className="mt-16">
                <SequenceTitle
                    id="split-responsive"
                    eyebrow="Raccord responsive"
                    title="Le cadre décide quand le dialogue devient une pile"
                    description="Le même Split traverse trois largeurs sans media query ni mesure JavaScript."
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
                            <PixieDustSplit
                                ratio="start-wide"
                                minPaneWidth="md"
                                gap="md"
                            >
                                <SplitPane label="01 · Champ" />
                                <SplitPane label="02 · Contrechamp" />
                            </PixieDustSplit>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="split-gaps" className="mt-16">
                <SequenceTitle
                    id="split-gaps"
                    eyebrow="Intervalle de montage"
                    title="Six respirations séparent les deux plans"
                    description="Le gap reste identique lorsque les plans passent côte à côte ou l’un sous l’autre."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 md:grid-cols-2 xl:grid-cols-3">
                    {gaps.map((gap) => (
                        <Stage key={gap.value}>
                            <PixieDustSplit
                                ratio="equal"
                                minPaneWidth="xs"
                                gap={gap.value}
                                className="p-4"
                            >
                                <SplitPane label="Champ" />
                                <SplitPane label="Contrechamp" />
                            </PixieDustSplit>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                {gap.name} · {gap.value} · {gap.token}
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="split-align" className="mt-16">
                <SequenceTitle
                    id="split-align"
                    eyebrow="Axe vertical"
                    title="Quatre alignements confrontent les hauteurs"
                    description="stretch fabrique deux plans de même hauteur ; les autres valeurs conservent la hauteur propre de chaque contenu."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {alignments.map((alignment) => (
                        <Stage key={alignment.value}>
                            <PixieDustSplit
                                ratio="equal"
                                minPaneWidth="xs"
                                gap="sm"
                                align={alignment.value}
                                className="min-h-56 p-4"
                            >
                                <SplitPane label="Champ" className="min-h-40" />
                                <SplitPane
                                    label="Contrechamp"
                                    className="min-h-20"
                                />
                            </PixieDustSplit>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                align=&quot;{alignment.value}&quot;
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="split-semantics" className="mt-16">
                <SequenceTitle
                    id="split-semantics"
                    eyebrow="Structure documentaire"
                    title="Le duo choisit sa place dans le récit"
                    description="La mise en page reste identique ; seul le rôle de l’enveloppe change selon le contexte."
                />

                <div className="mt-7 grid gap-px border border-line bg-line lg:grid-cols-3">
                    {[
                        ["div", "Raccord neutre sous une structure existante."],
                        ["section", "Séquence nommée dans une page."],
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

            <section aria-labelledby="split-composition" className="mt-16">
                <SequenceTitle
                    id="split-composition"
                    eyebrow="Composition"
                    title="Section ouvre la séquence, Split organise le dialogue"
                    description="Le cadre général et les surfaces restent confiés aux primitives qui en portent déjà la responsabilité."
                />

                <div className="mt-7 border border-line bg-canvas">
                    <PixieDustSection
                        width="wide"
                        gutter="lg"
                        spacing="lg"
                        gap="lg"
                        aria-labelledby="split-composition-heading"
                    >
                        <PixieDustStack gap="xs">
                            <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Champ et contrechamp
                            </p>
                            <h4
                                id="split-composition-heading"
                                className="text-3xl text-ink"
                            >
                                Deux archives se répondent
                            </h4>
                        </PixieDustStack>
                        <PixieDustSplit
                            ratio="equal"
                            minPaneWidth="md"
                            gap="lg"
                        >
                            <PixieCard
                                as="article"
                                variant="outline"
                                padding="lg"
                            >
                                <p className="font-mono text-xs text-accent">
                                    1928
                                </p>
                                <h5 className="mt-3 text-2xl text-ink">
                                    Steamboat Willie
                                </h5>
                            </PixieCard>
                            <PixieCard
                                as="article"
                                variant="outline"
                                padding="lg"
                            >
                                <p className="font-mono text-xs text-accent">
                                    1929
                                </p>
                                <h5 className="mt-3 text-2xl text-ink">
                                    The Skeleton Dance
                                </h5>
                            </PixieCard>
                        </PixieDustSplit>
                    </PixieDustSection>
                </div>
            </section>

            <section aria-labelledby="split-boundaries" className="mt-16">
                <SequenceTitle
                    id="split-boundaries"
                    eyebrow="Raccords de montage"
                    title="Deux plans pairs, sans nouvelle hiérarchie"
                    description="Les primitives voisines restent préférables dès que la composition dépasse ce contrat symétrique."
                />

                <div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        ["Grid", "Distribue une collection homogène."],
                        ["Split", "Met exactement deux plans en regard."],
                        [
                            "Sidebar",
                            "Associera une zone intrinsèque à une zone fluide.",
                        ],
                        [
                            "Switcher",
                            "Modifiera la disposition de plusieurs enfants.",
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
                id="pixie-dust-split-playground"
                aria-labelledby="split-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="split-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieDustSplit"
                    description="Réglez le rapport, le seuil et le rythme ; le cadre montre quand le duo devient une pile."
                />
                <div className="mt-8">
                    <PixieDustSplitPlayground />
                </div>
            </section>

            <section
                aria-labelledby="split-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="split-accessibility"
                    eyebrow="Accessibilité"
                    title="L’ordre du dialogue ne change jamais"
                    description="Le champ précède le contrechamp à l’écran, au clavier et dans le document, quelle que soit la largeur disponible."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Deux enfants",
                            "Le typage exige exactement deux plans directs et explicites.",
                        ],
                        [
                            "Ordre naturel",
                            "Aucune propriété reverse ni règle CSS order n’est proposée.",
                        ],
                        [
                            "Section nommée",
                            'Avec as="section", associer un titre visible ou un nom accessible.',
                        ],
                        [
                            "Article autonome",
                            'Réserver as="article" à un ensemble compréhensible hors contexte.',
                        ],
                        [
                            "Zoom à 200 %",
                            "Les plans doivent se superposer avant tout débordement horizontal.",
                        ],
                        [
                            "Hiérarchie",
                            "Le rapport visuel ne doit pas porter seul l’importance d’un contenu.",
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
                aria-labelledby="split-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="split-technical"
                    eyebrow="Générique technique"
                    title="API de l’esquisse"
                    description="Les types spécifiques restent colocalisés dans PixieDustSplit.types.ts ; le composant demeure statique et son playground porte seul l’état client."
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

            <section aria-labelledby="split-journal" className="mt-16">
                <SequenceTitle
                    id="split-journal"
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="L’esquisse devra être éprouvée dans plusieurs récits avant de devenir le raccord commun des compositions à deux plans."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Tester les rapports avec du texte court, long et fortement hiérarchisé.",
                        "Éprouver chaque largeur minimale dans les trois cadres de la Régie.",
                        "Vérifier le passage en pile sur mobile et à 200 % de zoom.",
                        "Comparer les compositions texte-image et archive-archive.",
                        "Contrôler l’ordre clavier avec des interactions dans les deux plans.",
                        "Décider si equal, md et lg restent les bons réglages par défaut.",
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
