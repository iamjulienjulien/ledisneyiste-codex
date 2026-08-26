import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieBackdrop } from "@/components/ui/PixieBackdrop";
import {
    PixieDustBleed,
    type PixieDustBleedExtent,
    type PixieDustBleedGutter,
    type PixieDustBleedSide,
} from "@/components/ui/PixieDustBleed";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieDustContainer } from "@/components/ui/PixieDustContainer";
import { PixieFrame } from "@/components/ui/PixieFrame";
import { PixieDustRail } from "@/components/ui/PixieDustRail";
import { PixieDustSection } from "@/components/ui/PixieDustSection";
import { PixieDustStack } from "@/components/ui/PixieDustStack";
import { PixieDustBleedPlayground } from "./PixieDustBleedPlayground";

const sides = [
    {
        name: "Début",
        value: "start" as const,
        role: "Le bord initial quitte seul la colonne de lecture.",
    },
    {
        name: "Fin",
        value: "end" as const,
        role: "Le bord final prolonge seul la séquence.",
    },
    {
        name: "Les deux côtés",
        value: "both" as const,
        role: "La séquence s’élargit symétriquement autour du texte.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBleedSide;
    role: string;
}>[];

const extents = [
    {
        name: "Petite",
        value: "sm" as const,
        token: "1 rem",
        role: "Décalage discret ou raccord avec une bordure voisine.",
    },
    {
        name: "Moyenne",
        value: "md" as const,
        token: "2 rem",
        role: "Sortie mesurée dans une séquence éditoriale courante.",
    },
    {
        name: "Grande",
        value: "lg" as const,
        token: "4 rem",
        role: "Image ou surface qui affirme sa présence hors du texte.",
    },
    {
        name: "Très grande",
        value: "xl" as const,
        token: "6 rem",
        role: "Plan panoramique dans un cadre suffisamment large.",
    },
    {
        name: "Fenêtre",
        value: "viewport" as const,
        token: "Bords physiques",
        role: "Séquence pleine largeur depuis un cadre centré.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBleedExtent;
    token: string;
    role: string;
}>[];

const gutters = [
    { name: "Aucune", value: "none" as const, token: "0" },
    { name: "Petite", value: "sm" as const, token: "1 rem" },
    { name: "Moyenne", value: "md" as const, token: "1,5 rem" },
    {
        name: "Grande",
        value: "lg" as const,
        token: "2 à 3 rem",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBleedGutter;
    token: string;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieDustBleedElement",
        defaultValue: '"div"',
        description: "Structure HTML qui porte la séquence échappée.",
    },
    {
        name: "side",
        type: "PixieDustBleedSide",
        defaultValue: '"both"',
        description: "Côté ou côtés qui quittent le cadre de lecture.",
    },
    {
        name: "extent",
        type: "PixieDustBleedExtent",
        defaultValue: '"md"',
        description: "Amplitude fixe ou pleine fenêtre du débordement.",
    },
    {
        name: "gutter",
        type: "PixieDustBleedGutter",
        defaultValue: '"none"',
        description: "Protection intérieure appliquée aux côtés échappés.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Séquence dont la géométrie est élargie.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées à la racine du Bleed.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustBleedElement",
        values: ['"div"', '"figure"', '"section"'],
        description: "Structures documentaires autorisées.",
    },
    {
        name: "PixieDustBleedSide",
        values: ['"start"', '"end"', '"both"'],
        description: "Directions logiques du débordement.",
    },
    {
        name: "PixieDustBleedExtent",
        values: ['"sm"', '"md"', '"lg"', '"xl"', '"viewport"'],
        description: "Amplitudes disponibles pour quitter le cadre.",
    },
    {
        name: "PixieDustBleedGutter",
        values: ['"none"', '"sm"', '"md"', '"lg"'],
        description: "Protections intérieures des côtés échappés.",
    },
] as const;

const films = [
    ["1928", "Steamboat Willie"],
    ["1929", "The Skeleton Dance"],
    ["1932", "Flowers and Trees"],
    ["1933", "Three Little Pigs"],
    ["1935", "The Band Concert"],
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

function Panorama({ label = "Panorama" }: Readonly<{ label?: string }>) {
    return (
        <PixieFrame variant="film" padding="none">
            <div className="relative min-h-48 overflow-hidden bg-surface-muted">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,var(--color-accent)_0,transparent_25%),linear-gradient(135deg,var(--color-surface-muted),var(--color-canvas))] opacity-60" />
                <div className="relative flex min-h-48 items-end p-6">
                    <div>
                        <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                            {label}
                        </p>
                        <h4 className="mt-3 text-2xl text-ink">
                            La table d’animation gagne le hors-champ
                        </h4>
                    </div>
                </div>
            </div>
        </PixieFrame>
    );
}

function ReadingFrame({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="mx-auto max-w-xl border-x border-dashed border-line-strong px-8 py-6 sm:px-12">
            {children}
        </div>
    );
}

export function PixieDustBleedDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-bleed"
            labelledBy="pixie-dust-bleed-title"
            nom="PixieDustBleed"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Montage 010
                        </p>
                        <h2
                            id="pixie-dust-bleed-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustBleed
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Faire sortir une séquence de son cadre de lecture
                            sans perdre le fil du document.
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
            <section aria-labelledby="bleed-identity" className="mt-14">
                <SequenceTitle
                    id="bleed-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Bleed intervient au milieu d’une composition existante. Il élargit une seule séquence puis rend immédiatement la main au cadre de lecture."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        [
                            "Mission",
                            "Faire quitter ponctuellement la colonne à une séquence.",
                        ],
                        [
                            "Usage",
                            "Images, citations, surfaces, frises et rails d’archives.",
                        ],
                        [
                            "Limite",
                            "Ne crée ni surface, ni cadrage, ni défilement.",
                        ],
                        [
                            "Anatomie",
                            "Une largeur augmentée et des marges logiques négatives.",
                        ],
                        [
                            "Accessibilité",
                            "Aucun changement d’ordre, de rôle ou de focus.",
                        ],
                        [
                            "Dépendances",
                            "Calculs CSS uniquement, sans mesure côté client.",
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

            <section aria-labelledby="bleed-anatomy" className="mt-16">
                <SequenceTitle
                    id="bleed-anatomy"
                    eyebrow="Anatomie du montage"
                    title="Le cadre reste visible autour de la séquence échappée"
                    description="Les pointillés matérialisent la colonne de lecture. Bleed augmente seulement la largeur du panorama et compense cette extension par ses marges."
                />

                <div className="mt-7 border border-accent/60 bg-canvas py-6">
                    <ReadingFrame>
                        <p className="font-mono text-xs text-accent">
                            Cadre de lecture
                        </p>
                        <PixieDustBleed
                            extent="lg"
                            side="both"
                            className="mt-4"
                        >
                            <Panorama label="Zone échappée" />
                        </PixieDustBleed>
                    </ReadingFrame>
                </div>
            </section>

            <section
                aria-labelledby="bleed-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="bleed-master"
                    eyebrow="Plan maître"
                    title="Une image panoramique ouvre momentanément le récit"
                    description="Le texte conserve une mesure confortable avant et après l’image ; seul le plan central gagne les marges du cadre."
                />

                <div className="mt-7 grid min-w-0 border border-line xl:grid-cols-2">
                    <div className="min-w-0 overflow-hidden bg-canvas py-8">
                        <PixieDustContainer width="42" gutter="lg">
                            <PixieDustStack gap="lg">
                                <p className="leading-7 text-ink-soft">
                                    Le studio prépare une nouvelle manière de
                                    donner de la profondeur à ses images.
                                </p>
                                <PixieDustBleed
                                    as="figure"
                                    extent="lg"
                                    side="both"
                                    gutter="none"
                                    className="m-0"
                                >
                                    <Panorama label="Plan panoramique" />
                                    <figcaption className="mt-3 px-4 text-sm text-muted">
                                        Une table d’animation imaginée comme
                                        point de respiration du récit.
                                    </figcaption>
                                </PixieDustBleed>
                                <p className="leading-7 text-ink-soft">
                                    La lecture retrouve ensuite sa colonne sans
                                    rupture dans l’ordre du document.
                                </p>
                            </PixieDustStack>
                        </PixieDustContainer>
                    </div>
                    <CodeExample>{`<PixieDustContainer width="42">
    <TexteEditorial />
    <PixieDustBleed
        as="figure"
        side="both"
        extent="lg"
    >
        <Image />
        <figcaption>...</figcaption>
    </PixieDustBleed>
    <TexteEditorial />
</PixieDustContainer>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="bleed-sides" className="mt-16">
                <SequenceTitle
                    id="bleed-sides"
                    eyebrow="Direction de sortie"
                    title="Trois directions composent le hors-champ"
                    description="start et end suivent le sens logique de lecture ; both conserve une extension symétrique."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-3">
                    {sides.map((side) => (
                        <Stage key={side.value}>
                            <ReadingFrame>
                                <PixieDustBleed side={side.value} extent="lg">
                                    <Panorama label={side.name} />
                                </PixieDustBleed>
                            </ReadingFrame>
                            <div className="border-t border-line bg-surface p-4">
                                <code className="font-mono text-xs text-accent">
                                    side=&quot;{side.value}&quot;
                                </code>
                                <p className="mt-3 text-sm leading-6 text-muted">
                                    {side.role}
                                </p>
                            </div>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="bleed-extents" className="mt-16">
                <SequenceTitle
                    id="bleed-extents"
                    eyebrow="Amplitude de sortie"
                    title="Quatre pas fixes avant la pleine fenêtre"
                    description="Les mesures fixes répondent aux compositions locales. viewport est réservé aux cadres centrés qui doivent rejoindre les bords physiques."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {extents.map((extent) => (
                        <Stage key={extent.value}>
                            <ReadingFrame>
                                <PixieDustBleed
                                    side="both"
                                    extent={extent.value}
                                >
                                    <Panorama label={extent.name} />
                                </PixieDustBleed>
                            </ReadingFrame>
                            <div className="border-t border-line bg-surface p-4">
                                <div className="flex flex-wrap items-baseline justify-between gap-3">
                                    <h4 className="text-lg text-ink">
                                        {extent.name}
                                    </h4>
                                    <code className="font-mono text-xs text-accent">
                                        {extent.value} · {extent.token}
                                    </code>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-muted">
                                    {extent.role}
                                </p>
                            </div>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="bleed-gutters" className="mt-16">
                <SequenceTitle
                    id="bleed-gutters"
                    eyebrow="Protection du bord"
                    title="Quatre gouttières distinguent surface et contenu"
                    description="La géométrie du Bleed reste identique ; seule la matière intérieure se tient plus ou moins loin des côtés échappés."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {gutters.map((gutter) => (
                        <Stage key={gutter.value}>
                            <ReadingFrame>
                                <PixieDustBleed
                                    extent="lg"
                                    gutter={gutter.value}
                                >
                                    <div className="border border-accent/60 bg-surface-muted p-5">
                                        <p className="font-mono text-xs text-accent">
                                            Matière protégée
                                        </p>
                                        <p className="mt-3 leading-6 text-ink-soft">
                                            Le bord de la séquence et celui du
                                            contenu ne jouent plus le même rôle.
                                        </p>
                                    </div>
                                </PixieDustBleed>
                            </ReadingFrame>
                            <p className="border-t border-line bg-surface p-4 font-mono text-xs text-accent">
                                {gutter.name} · {gutter.value} · {gutter.token}
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="bleed-materials" className="mt-16">
                <SequenceTitle
                    id="bleed-materials"
                    eyebrow="Matières éditoriales"
                    title="Image, surface et collection peuvent quitter le cadre"
                    description="Bleed ne connaît pas la nature de son enfant et laisse chaque primitive conserver son propre contrat."
                />

                <div className="mt-7 space-y-8 bg-canvas p-6">
                    <ReadingFrame>
                        <PixieDustBleed extent="lg">
                            <Panorama label="Image panoramique" />
                        </PixieDustBleed>
                    </ReadingFrame>
                    <ReadingFrame>
                        <PixieDustBleed extent="lg" gutter="md">
                            <PixieBackdrop
                                variant="projector"
                                intensity="medium"
                                padding="lg"
                            >
                                <div className="mx-auto max-w-md py-5 text-center">
                                    <h4 className="text-2xl text-ink">
                                        Surface éditoriale
                                    </h4>
                                    <p className="mt-3 leading-7 text-ink-soft">
                                        Le fond s’élargit sans que le texte ne
                                        touche ses nouveaux bords.
                                    </p>
                                </div>
                            </PixieBackdrop>
                        </PixieDustBleed>
                    </ReadingFrame>
                </div>
            </section>

            <section aria-labelledby="bleed-rail" className="mt-16">
                <SequenceTitle
                    id="bleed-rail"
                    eyebrow="Composition"
                    title="Rail prolonge le récit au-delà de la colonne"
                    description="Bleed ouvre le cadre ; Rail prend ensuite la responsabilité du travelling, du focus et du défilement."
                />

                <div className="mt-7 min-w-0 overflow-hidden border border-line bg-canvas py-8">
                    <PixieDustSection
                        width="42"
                        gutter="lg"
                        spacing="md"
                        gap="lg"
                        aria-labelledby="bleed-rail-heading"
                    >
                        <div>
                            <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Œuvres apparentées
                            </p>
                            <h4
                                id="bleed-rail-heading"
                                className="mt-3 text-3xl text-ink"
                            >
                                La pellicule se poursuit hors du cadre
                            </h4>
                        </div>
                        <PixieDustBleed extent="xl" gutter="sm">
                            <PixieDustRail
                                as="ul"
                                itemWidth="sm"
                                gap="sm"
                                aria-label="Œuvres apparentées"
                                className="m-0 list-none pb-3"
                            >
                                {films.map(([year, title]) => (
                                    <li key={title}>
                                        <PixieCard
                                            as="article"
                                            variant="outline"
                                            padding="md"
                                            className="h-full"
                                        >
                                            <p className="font-mono text-xs text-accent">
                                                {year}
                                            </p>
                                            <h5 className="mt-3 text-lg text-ink">
                                                {title}
                                            </h5>
                                        </PixieCard>
                                    </li>
                                ))}
                            </PixieDustRail>
                        </PixieDustBleed>
                    </PixieDustSection>
                </div>
            </section>

            <section aria-labelledby="bleed-responsive" className="mt-16">
                <SequenceTitle
                    id="bleed-responsive"
                    eyebrow="Raccord responsive"
                    title="L’amplitude reste lisible dans chaque cadre"
                    description="Les cadres étroits sont les cas les plus exigeants : le contenu doit se réorganiser sans créer de débordement horizontal indésirable."
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
                            <div className="overflow-hidden border border-line py-5">
                                <ReadingFrame>
                                    <PixieDustBleed extent="lg" gutter="sm">
                                        <Panorama />
                                    </PixieDustBleed>
                                </ReadingFrame>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="bleed-semantics" className="mt-16">
                <SequenceTitle
                    id="bleed-semantics"
                    eyebrow="Structure documentaire"
                    title="La géométrie ne remplace pas le sens"
                    description="Le choix de la racine dépend toujours du contenu porté, jamais de l’apparence du débordement."
                />

                <div className="mt-7 grid gap-px border border-line bg-line lg:grid-cols-3">
                    {[
                        [
                            "div",
                            "Raccord neutre sous une structure déjà nommée.",
                        ],
                        [
                            "figure",
                            "Média autonome accompagné si nécessaire d’une figcaption.",
                        ],
                        [
                            "section",
                            "Séquence éditoriale nommée par un titre ou un attribut ARIA.",
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

            <section aria-labelledby="bleed-boundaries" className="mt-16">
                <SequenceTitle
                    id="bleed-boundaries"
                    eyebrow="Raccords de montage"
                    title="Une entorse au cadre, aucune nouvelle scène"
                    description="La primitive agit uniquement sur la largeur disponible et laisse le rendu, le rythme et le comportement à ses enfants."
                />

                <div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        ["Container", "Établit la largeur normale de lecture."],
                        [
                            "Bleed",
                            "Autorise une séquence à quitter ponctuellement cette largeur.",
                        ],
                        ["Backdrop", "Installe une matière atmosphérique."],
                        ["Rail", "Déroule une collection horizontalement."],
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
                id="pixie-dust-bleed-playground"
                aria-labelledby="bleed-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="bleed-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieDustBleed"
                    description="Réglez la direction, l’amplitude et la protection intérieure, puis confrontez la même géométrie à trois matières différentes."
                />
                <div className="mt-8">
                    <PixieDustBleedPlayground />
                </div>
            </section>

            <section
                aria-labelledby="bleed-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="bleed-accessibility"
                    eyebrow="Accessibilité"
                    title="Sortir du cadre sans sortir du récit"
                    description="Le composant ne déplace jamais son enfant dans le document et ne lui ajoute aucun rôle ou comportement interactif."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Ordre naturel",
                            "La séquence conserve exactement sa place dans le DOM.",
                        ],
                        [
                            "Figure légendée",
                            "Associer une figcaption aux médias qui demandent une explication.",
                        ],
                        [
                            "Section nommée",
                            "Relier toute section à un titre visible ou à un nom accessible.",
                        ],
                        [
                            "Médias décrits",
                            "Les images conservent leur alternative textuelle habituelle.",
                        ],
                        [
                            "Zoom à 200 %",
                            "Le débordement ne doit jamais masquer une information essentielle.",
                        ],
                        [
                            "Page stable",
                            "Contrôler l’absence de défilement horizontal du document.",
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
                aria-labelledby="bleed-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="bleed-technical"
                    eyebrow="Générique technique"
                    title="API de l’esquisse"
                    description="Les types spécifiques restent colocalisés dans PixieDustBleed.types.ts ; la primitive demeure statique et le playground porte seul l’état client."
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

            <section aria-labelledby="bleed-journal" className="mt-16">
                <SequenceTitle
                    id="bleed-journal"
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="L’esquisse devra être confrontée aux vrais cadres du Codex avant de devenir une primitive stable."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Éprouver les quatre amplitudes fixes dans Container et Section.",
                        "Valider viewport depuis les différentes largeurs centrées du Codex.",
                        "Tester les directions start et end dans les deux sens d’écriture.",
                        "Contrôler images, surfaces et Rails avec chaque gouttière.",
                        "Éprouver les deux Lumières, le mobile et le zoom à 200 %.",
                        "Décider si both, md et none restent les bons réglages par défaut.",
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
