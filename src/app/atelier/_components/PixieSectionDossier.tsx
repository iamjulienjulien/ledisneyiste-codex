import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieBackdrop } from "@/components/ui/PixieBackdrop";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieCluster } from "@/components/ui/PixieCluster";
import {
    PixieSection,
    type PixieSectionAlign,
    type PixieSectionGap,
    type PixieSectionGutter,
    type PixieSectionSpacing,
    type PixieSectionWidth,
} from "@/components/ui/PixieSection";
import { PixieStack } from "@/components/ui/PixieStack";
import { PixieSectionPlayground } from "./PixieSectionPlayground";

const spacings = [
    {
        name: "Aucune",
        value: "none" as const,
        token: "0",
        role: "Composition entièrement cadrée par son parent.",
    },
    {
        name: "Petite",
        value: "sm" as const,
        token: "2 rem",
        role: "Séquence compacte dans une surface.",
    },
    {
        name: "Moyenne",
        value: "md" as const,
        token: "2,5–3 rem",
        role: "Respiration éditoriale resserrée.",
    },
    {
        name: "Grande",
        value: "lg" as const,
        token: "3–4,5 rem",
        role: "Rythme courant entre les séquences.",
    },
    {
        name: "Très grande",
        value: "xl" as const,
        token: "4–6 rem",
        role: "Ouverture majeure dans une page longue.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieSectionSpacing;
    token: string;
    role: string;
}>[];

const widths = [
    { name: "Lecture", value: "42" as const, token: "42 rem" },
    { name: "Éditorial", value: "56" as const, token: "56 rem" },
    { name: "Collection", value: "72" as const, token: "72 rem" },
    {
        name: "Pleine largeur",
        value: "full" as const,
        token: "sans maximum",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieSectionWidth;
    token: string;
}>[];

const gutters = [
    { name: "Aucune", value: "none" as const, token: "0" },
    { name: "Petite", value: "sm" as const, token: "1 rem" },
    { name: "Moyenne", value: "md" as const, token: "1,5 rem" },
    {
        name: "Grande",
        value: "lg" as const,
        token: "clamp(2 rem, 4 vw, 3 rem)",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieSectionGutter;
    token: string;
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
    value: PixieSectionGap;
    token: string;
}>[];

const alignments = [
    { name: "Étiré", value: "stretch" as const },
    { name: "Début", value: "start" as const },
    { name: "Centre", value: "center" as const },
    { name: "Fin", value: "end" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieSectionAlign;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieSectionElement",
        defaultValue: '"section"',
        description: "Structure documentaire externe de la séquence.",
    },
    {
        name: "width",
        type: "PixieSectionWidth",
        defaultValue: '"72"',
        description: "Largeur transmise au Container interne.",
    },
    {
        name: "gutter",
        type: "PixieSectionGutter",
        defaultValue: '"md"',
        description: "Protection horizontale transmise au Container.",
    },
    {
        name: "spacing",
        type: "PixieSectionSpacing",
        defaultValue: '"lg"',
        description:
            "Respiration verticale de référence autour de la séquence.",
    },
    {
        name: "spacingStart",
        type: "PixieSectionSpacing",
        defaultValue: "spacing",
        description: "Surcharge logique de la respiration d’ouverture.",
    },
    {
        name: "spacingEnd",
        type: "PixieSectionSpacing",
        defaultValue: "spacing",
        description: "Surcharge logique de la respiration de fermeture.",
    },
    {
        name: "gap",
        type: "PixieSectionGap",
        defaultValue: '"lg"',
        description: "Rythme transmis au Stack interne.",
    },
    {
        name: "align",
        type: "PixieSectionAlign",
        defaultValue: '"stretch"',
        description: "Alignement transmis au Stack interne.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Plans explicites de la séquence éditoriale.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes appliquées à l’enveloppe externe.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieSectionElement",
        values: ['"section"', '"article"', '"div"'],
        description: "Structures documentaires autorisées.",
    },
    {
        name: "PixieSectionWidth",
        values: ['"42"', '"56"', '"72"', '"full"'],
        description: "Alias du contrat de largeur de Container.",
    },
    {
        name: "PixieSectionGutter",
        values: ['"none"', '"sm"', '"md"', '"lg"'],
        description: "Alias du contrat de gouttière de Container.",
    },
    {
        name: "PixieSectionSpacing",
        values: ['"none"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Respirations verticales propres à la séquence.",
    },
    {
        name: "PixieSectionGap",
        values: ['"none"', '"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Alias du contrat de rythme de Stack.",
    },
    {
        name: "PixieSectionAlign",
        values: ['"stretch"', '"start"', '"center"', '"end"'],
        description: "Alias du contrat d’alignement de Stack.",
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

function SectionPlan({
    label,
    className = "",
}: Readonly<{ label: string; className?: string }>) {
    return (
        <div
            className={`border border-line bg-surface px-5 py-4 text-sm text-ink-soft ${className}`.trim()}
        >
            {label}
        </div>
    );
}

export function PixieSectionDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-section"
            labelledBy="pixie-section-title"
            nom="PixieSection"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Montage 004
                        </p>
                        <h2
                            id="pixie-section-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieSection
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Composer une séquence éditoriale complète en
                            orchestrant son cadre, sa respiration et son rythme.
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
            <section aria-labelledby="section-identity" className="mt-14">
                <SequenceTitle
                    id="section-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Section est un raccord de composition : elle réunit les responsabilités déjà validées de Container et Stack dans une seule séquence verticale."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        [
                            "Mission",
                            "Installer une séquence éditoriale complète.",
                        ],
                        [
                            "Usage",
                            "Ouvertures, chapitres, ensembles documentaires et respirations de page.",
                        ],
                        [
                            "Limite",
                            "Ne choisit ni titres, ni surfaces, ni atmosphères, ni grilles.",
                        ],
                        [
                            "Anatomie",
                            "Une enveloppe, deux respirations logiques, un Container puis un Stack interne.",
                        ],
                        [
                            "Accessibilité",
                            "La structure externe est explicite et doit recevoir le bon nom.",
                        ],
                        ["Dépendances", "PixieContainer et PixieStack."],
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

            <section aria-labelledby="section-anatomy" className="mt-16">
                <SequenceTitle
                    id="section-anatomy"
                    eyebrow="Anatomie du montage"
                    title="Trois couches, trois responsabilités"
                    description="L’enveloppe règle la respiration de la séquence ; Container fixe son cadre ; Stack cadence ses plans."
                />

                <div className="mt-7 border border-accent/60 bg-canvas p-4 sm:p-6">
                    <p className="font-mono text-xs text-accent">
                        PixieSection · spacing
                    </p>
                    <div className="mt-4 border border-line-strong bg-surface-muted p-4 sm:p-6">
                        <p className="font-mono text-xs text-accent">
                            PixieContainer · width + gutter
                        </p>
                        <div className="mt-4 border border-dashed border-line-strong bg-canvas p-4 sm:p-6">
                            <p className="font-mono text-xs text-accent">
                                PixieStack · gap + align
                            </p>
                            <div className="mt-4 space-y-3">
                                <SectionPlan label="Plan 01 · Ouverture" />
                                <SectionPlan label="Plan 02 · Introduction" />
                                <SectionPlan label="Plan 03 · Matière" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                aria-labelledby="section-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="section-master"
                    eyebrow="Plan maître"
                    title="Une séquence ouvre son propre chapitre"
                    description="Le plan de référence assemble une ouverture, une introduction, des métadonnées et une archive sans ajouter de marges manuelles."
                />

                <div className="mt-7 grid border border-line xl:grid-cols-2">
                    <div className="bg-canvas">
                        <PixieSection
                            width="56"
                            gutter="lg"
                            spacing="lg"
                            gap="lg"
                            aria-labelledby="section-master-heading"
                            className="bg-surface-muted/60"
                        >
                            <PixieStack gap="xs">
                                <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                    Le dessin animé trouve son langage
                                </p>
                                <h4
                                    id="section-master-heading"
                                    className="text-3xl text-ink"
                                >
                                    Le mouvement rejoint la musique
                                </h4>
                            </PixieStack>
                            <p className="max-w-2xl leading-7 text-ink-soft">
                                Le cadre et le rythme sont réglés par la section
                                ; le récit reste entièrement explicite.
                            </p>
                            <PixieCluster gap="xs">
                                {["Animation", "Musique", "1929"].map(
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
                            <PixieCard
                                as="article"
                                variant="outline"
                                padding="md"
                            >
                                <h5 className="text-xl text-ink">
                                    The Skeleton Dance
                                </h5>
                            </PixieCard>
                        </PixieSection>
                    </div>
                    <CodeExample>{`<PixieSection
    aria-labelledby="sequence-title"
    width="56"
    gutter="lg"
    spacing="lg"
    gap="lg"
>
    <header>
        <p>Le dessin animé trouve son langage</p>
        <h2 id="sequence-title">Le mouvement rejoint la musique</h2>
    </header>
    <p>Introduction éditoriale.</p>
    <PixieCluster>{/* Métadonnées */}</PixieCluster>
    {/* Matière principale */}
</PixieSection>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="section-spacing" className="mt-16">
                <SequenceTitle
                    id="section-spacing"
                    eyebrow="Respiration externe"
                    title="Cinq espacements ouvrent et referment la séquence"
                    description="spacing fournit la valeur de référence avant le premier plan et après le dernier. Les valeurs fluides se contractent sur les petits écrans."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {spacings.map((spacing) => (
                        <Stage key={spacing.value}>
                            <PixieSection
                                as="div"
                                width="full"
                                gutter="md"
                                spacing={spacing.value}
                                gap="none"
                                className="bg-surface-muted/60"
                            >
                                <SectionPlan label="Matière de la séquence" />
                            </PixieSection>
                            <div className="border-t border-line bg-surface p-4">
                                <div className="flex flex-wrap items-baseline justify-between gap-3">
                                    <h4 className="text-lg text-ink">
                                        {spacing.name}
                                    </h4>
                                    <code className="font-mono text-xs text-accent">
                                        {spacing.value} · {spacing.token}
                                    </code>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-muted">
                                    {spacing.role}
                                </p>
                            </div>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="section-asymmetric" className="mt-16">
                <SequenceTitle
                    id="section-asymmetric"
                    eyebrow="Raccords asymétriques"
                    title="L’ouverture et la fermeture règlent leurs propres respirations"
                    description="spacing reste le rythme de référence. spacingStart et spacingEnd ne le surchargent que sur le bord logique qui en a besoin."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 xl:grid-cols-3">
                    {[
                        {
                            title: "Grande ouverture",
                            start: "xl" as const,
                            end: "sm" as const,
                            description:
                                "Une entrée ample rejoint rapidement la séquence suivante.",
                        },
                        {
                            title: "Raccord continu",
                            start: "sm" as const,
                            end: "sm" as const,
                            description:
                                "Deux chapitres proches conservent une respiration discrète.",
                        },
                        {
                            title: "Dernière image",
                            start: "sm" as const,
                            end: "xl" as const,
                            description:
                                "La fermeture laisse davantage d’air avant le changement de scène.",
                        },
                    ].map((raccord) => (
                        <Stage key={raccord.title}>
                            <PixieSection
                                as="div"
                                width="full"
                                gutter="md"
                                spacing="md"
                                spacingStart={raccord.start}
                                spacingEnd={raccord.end}
                                gap="sm"
                                className="bg-surface-muted/60"
                            >
                                <h4 className="text-xl text-ink">
                                    {raccord.title}
                                </h4>
                                <p className="text-sm leading-6 text-ink-soft">
                                    {raccord.description}
                                </p>
                            </PixieSection>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs leading-6 text-accent">
                                start=&quot;{raccord.start}&quot; · end=&quot;
                                {raccord.end}&quot;
                            </p>
                        </Stage>
                    ))}
                </div>

                <div className="mt-8">
                    <CodeExample>{`<PixieSection
    spacing="md"
    spacingStart="xl"
    spacingEnd="sm"
>
    {/* Séquence */}
</PixieSection>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="section-geometry" className="mt-16">
                <SequenceTitle
                    id="section-geometry"
                    eyebrow="Cadre intérieur"
                    title="Largeurs et gouttières restent celles de Container"
                    description="Section ne réinterprète aucun token horizontal : elle transmet les deux réglages à la primitive qui les possède."
                />

                <div className="mt-7 space-y-6 overflow-hidden bg-canvas py-8">
                    {widths.map((width) => (
                        <PixieSection
                            key={width.value}
                            as="div"
                            width={width.value}
                            gutter="md"
                            spacing="none"
                            gap="none"
                        >
                            <div className="border-x border-accent/60 bg-surface p-5 shadow-soft">
                                <div className="flex flex-wrap items-baseline justify-between gap-3">
                                    <h4 className="text-xl text-ink">
                                        {width.name}
                                    </h4>
                                    <code className="font-mono text-xs text-accent">
                                        {width.value} · {width.token}
                                    </code>
                                </div>
                            </div>
                        </PixieSection>
                    ))}
                </div>

                <div className="mt-8 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {gutters.map((gutter) => (
                        <Stage key={gutter.value}>
                            <PixieSection
                                as="div"
                                width="full"
                                gutter={gutter.value}
                                spacing="sm"
                                gap="none"
                            >
                                <SectionPlan
                                    label={`gutter="${gutter.value}" · ${gutter.token}`}
                                />
                            </PixieSection>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="section-rhythm" className="mt-16">
                <SequenceTitle
                    id="section-rhythm"
                    eyebrow="Rythme interne"
                    title="Six cadences restent celles de Stack"
                    description="gap règle uniquement les intervalles entre les enfants directs. spacing conserve la respiration extérieure."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 md:grid-cols-2 xl:grid-cols-3">
                    {gaps.map((gap) => (
                        <Stage key={gap.value}>
                            <PixieSection
                                as="div"
                                width="full"
                                gutter="sm"
                                spacing="sm"
                                gap={gap.value}
                            >
                                <SectionPlan label="Plan A" />
                                <SectionPlan label="Plan B" />
                                <SectionPlan label="Plan C" />
                            </PixieSection>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                {gap.name} · {gap.value} · {gap.token}
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="section-align" className="mt-16">
                <SequenceTitle
                    id="section-align"
                    eyebrow="Axe transversal"
                    title="Quatre alignements placent la matière dans son cadre"
                    description="Les textes longs préféreront stretch ou start ; center et end conviennent aux ouvertures plus courtes."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {alignments.map((alignment) => (
                        <Stage key={alignment.value}>
                            <PixieSection
                                as="div"
                                width="full"
                                gutter="md"
                                spacing="sm"
                                gap="sm"
                                align={alignment.value}
                            >
                                <SectionPlan
                                    label={alignment.name}
                                    className="w-full max-w-xs"
                                />
                                <p className="w-full max-w-md text-sm leading-6 text-ink-soft">
                                    align=&quot;{alignment.value}&quot;
                                </p>
                            </PixieSection>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="section-semantics" className="mt-16">
                <SequenceTitle
                    id="section-semantics"
                    eyebrow="Structure documentaire"
                    title="La séquence choisit la juste place dans le document"
                    description="La composition visuelle reste identique ; seule la responsabilité sémantique de l’enveloppe change."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-3">
                    {[
                        ["section", "Chapitre nommé dans une page."],
                        ["article", "Séquence autonome et réutilisable."],
                        [
                            "div",
                            "Composition neutre sous un parent sémantique.",
                        ],
                    ].map(([element, description]) => (
                        <Stage key={element}>
                            <PixieSection
                                as={element as "section" | "article" | "div"}
                                width="full"
                                gutter="md"
                                spacing="sm"
                                gap="sm"
                                aria-label={
                                    element === "div"
                                        ? undefined
                                        : `Exemple ${element}`
                                }
                            >
                                <h4 className="text-xl text-ink">{element}</h4>
                                <p className="text-sm leading-6 text-ink-soft">
                                    {description}
                                </p>
                            </PixieSection>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="section-scenarios" className="mt-16">
                <SequenceTitle
                    id="section-scenarios"
                    eyebrow="Scénarios préparés"
                    title="La séquence s’adapte au hall comme au chapitre"
                    description="Ces scènes éprouvent les futurs contextes du Codex avant les migrations dédiées de ses pages publiques."
                />

                <div className="mt-7 grid gap-6 xl:grid-cols-2">
                    <Stage>
                        <PixieSection
                            width="full"
                            gutter="md"
                            spacing="md"
                            spacingStart="xl"
                            spacingEnd="md"
                            gap="lg"
                            aria-labelledby="section-scenario-index"
                        >
                            <PixieStack gap="xs">
                                <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                    Index · Œuvres
                                </p>
                                <h4
                                    id="section-scenario-index"
                                    className="max-w-3xl text-3xl text-ink"
                                >
                                    Les films, courts métrages et créations où
                                    les imaginaires Disney prennent forme
                                </h4>
                            </PixieStack>
                            <PixieCluster
                                gap="sm"
                                justify="between"
                                className="border-y border-line py-4"
                            >
                                <span className="text-sm text-ink-soft">
                                    23 œuvres dans les archives
                                </span>
                                <PixieCluster gap="xs">
                                    <PixieBadge variant="outline" size="sm">
                                        Cartes
                                    </PixieBadge>
                                    <PixieBadge variant="outline" size="sm">
                                        Liste
                                    </PixieBadge>
                                </PixieCluster>
                            </PixieCluster>
                            <div className="grid gap-3 sm:grid-cols-3">
                                {["1928", "1932", "1937"].map((year) => (
                                    <SectionPlan key={year} label={year} />
                                ))}
                            </div>
                        </PixieSection>
                    </Stage>

                    <Stage>
                        <PixieSection
                            as="article"
                            width="42"
                            gutter="md"
                            spacing="md"
                            spacingStart="md"
                            spacingEnd="xl"
                            gap="md"
                            aria-labelledby="section-scenario-chapter"
                        >
                            <PixieStack gap="xs">
                                <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                    Chapitre documentaire
                                </p>
                                <h4
                                    id="section-scenario-chapter"
                                    className="text-3xl text-ink"
                                >
                                    Quand le studio engage tout son avenir dans
                                    un long métrage que beaucoup pensent
                                    impossible
                                </h4>
                            </PixieStack>
                            <p className="leading-8 text-ink-soft">
                                Une largeur de lecture, un rythme intérieur et
                                une fermeture ample suffisent à structurer le
                                chapitre sans lui imposer de surface.
                            </p>
                            <PixieCluster gap="xs">
                                {[
                                    "Long métrage",
                                    "Technicolor",
                                    "Caméra multiplane",
                                ].map((label) => (
                                    <PixieBadge
                                        key={label}
                                        variant="soft"
                                        size="sm"
                                        color="violet-ombre-portee"
                                    >
                                        {label}
                                    </PixieBadge>
                                ))}
                            </PixieCluster>
                        </PixieSection>
                    </Stage>
                </div>

                <div className="mt-6 overflow-hidden border border-dashed border-line-strong bg-canvas">
                    <PixieSection
                        as="div"
                        width="56"
                        gutter="md"
                        spacing="md"
                        spacingStart="lg"
                        spacingEnd="sm"
                        gap="xs"
                        className="bg-surface-muted/60"
                    >
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Séquence 01
                        </p>
                        <h4 className="text-2xl text-ink">
                            Le récit ouvre son premier chapitre
                        </h4>
                    </PixieSection>
                    <PixieSection
                        as="div"
                        width="56"
                        gutter="md"
                        spacing="md"
                        spacingStart="sm"
                        spacingEnd="lg"
                        gap="xs"
                        className="border-t border-line bg-surface"
                    >
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Séquence 02
                        </p>
                        <h4 className="text-2xl text-ink">
                            Le raccord conserve la continuité sans fusionner les
                            chapitres
                        </h4>
                    </PixieSection>
                </div>
            </section>

            <section aria-labelledby="section-composition" className="mt-16">
                <SequenceTitle
                    id="section-composition"
                    eyebrow="Composition"
                    title="L’atmosphère et la surface restent des Décors"
                    description="Section orchestre le montage tandis que Backdrop et Card conservent la responsabilité de la matière visible."
                />

                <PixieBackdrop
                    variant="projector"
                    intensity="strong"
                    position="start"
                    color="ambre-projecteur"
                    padding="none"
                    texture="grain"
                    className="mt-7"
                >
                    <PixieSection
                        width="56"
                        gutter="lg"
                        spacing="xl"
                        gap="lg"
                        aria-labelledby="section-composition-heading"
                    >
                        <PixieStack gap="xs">
                            <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Projection générale
                            </p>
                            <h4
                                id="section-composition-heading"
                                className="text-3xl text-ink"
                            >
                                Une séquence traverse plusieurs accessoires
                            </h4>
                        </PixieStack>
                        <p className="max-w-2xl leading-7 text-ink-soft">
                            Le décor s’étend sur tout le plan ; la section
                            maintient son cadre et son rythme.
                        </p>
                        <PixieCluster gap="xs">
                            {["Cadre", "Rythme", "Métadonnées"].map((label) => (
                                <PixieBadge
                                    key={label}
                                    variant="soft"
                                    size="sm"
                                    color="ambre-projecteur"
                                >
                                    {label}
                                </PixieBadge>
                            ))}
                        </PixieCluster>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {["The Skeleton Dance", "Flowers and Trees"].map(
                                (title) => (
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
                                ),
                            )}
                        </div>
                    </PixieSection>
                </PixieBackdrop>
            </section>

            <section aria-labelledby="section-boundaries" className="mt-16">
                <SequenceTitle
                    id="section-boundaries"
                    eyebrow="Raccords de montage"
                    title="La séquence compose sans absorber ses outils"
                    description="Chaque responsabilité reste disponible séparément lorsqu’une mise en page sort du contrat de Section."
                />

                <div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        ["Container", "Cadre et gouttières uniquement."],
                        ["Stack", "Rythme et alignement uniquement."],
                        ["Section", "Respiration + Container + Stack."],
                        ["Backdrop", "Atmosphère derrière la composition."],
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
                id="pixie-section-playground"
                aria-labelledby="section-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="section-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieSection"
                    description="Réglez sa structure, son cadre et ses deux rythmes ; le code d’utilisation suit chaque changement."
                />
                <div className="mt-8">
                    <PixieSectionPlayground />
                </div>
            </section>

            <section
                aria-labelledby="section-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="section-accessibility"
                    eyebrow="Accessibilité"
                    title="La séquence doit annoncer sa vraie fonction"
                    description="La composition ne crée aucun rôle automatique. L’élément externe et son contenu déterminent seuls la structure documentaire."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Section nommée",
                            'Associer as="section" à un titre visible, aria-labelledby ou aria-label.',
                        ],
                        [
                            "Article autonome",
                            'Réserver as="article" à une séquence pouvant être comprise hors de son contexte.',
                        ],
                        [
                            "Composition neutre",
                            'Employer as="div" lorsqu’un parent porte déjà la structure sémantique.',
                        ],
                        [
                            "Régions imbriquées",
                            "Éviter qu’un Panel et une Section voisins portent tous deux la même sémantique.",
                        ],
                        [
                            "Ordre naturel",
                            "Container et Stack ne modifient ni l’ordre DOM ni le parcours clavier.",
                        ],
                        [
                            "Raccords invisibles",
                            "spacingStart et spacingEnd modifient uniquement la respiration, jamais la structure ni l’ordre de lecture.",
                        ],
                        [
                            "Zoom à 200 %",
                            "Largeurs, gouttières et espacements fluides ne doivent créer aucun débordement.",
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
                aria-labelledby="section-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="section-technical"
                    eyebrow="Générique technique"
                    title="API du composant 1.0.0"
                    description="Les types spécifiques sont colocalisés dans PixieSection.types.ts ; les contrats horizontaux et verticaux sont des alias de Container et Stack."
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

            <section aria-labelledby="section-journal" className="mt-16">
                <SequenceTitle
                    id="section-journal"
                    eyebrow="Journal de production"
                    title="Décisions après la promotion"
                    description="PixieSection peut désormais remplacer les assemblages répétitifs sans devenir le nouveau cadre obligatoire de toutes les pages."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Recenser les répétitions réelles de Container + Stack dans le Codex.",
                        "Éprouver les cinq respirations à 200 % de zoom et sur mobile.",
                        "Comparer section, article et div dans les structures existantes.",
                        "Tester les contenus courts, longs, interactifs et fortement imbriqués.",
                        "Vérifier qu’aucune surface ou typographie ne fuit dans le contrat.",
                        "Décider si spacing lg reste le bon défaut après plusieurs migrations réelles.",
                        "Éprouver les surcharges start et end entre plusieurs séquences consécutives.",
                        "Confirmer que les respirations asymétriques ne remplacent ni Separator ni Bleed.",
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
