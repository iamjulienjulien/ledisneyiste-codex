import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieCluster } from "@/components/ui/PixieCluster";
import { PixiePanel } from "@/components/ui/PixiePanel";
import {
    PixieSkeleton,
    type PixieSkeletonAnimation,
    type PixieSkeletonGap,
    type PixieSkeletonIntensity,
    type PixieSkeletonRadius,
    type PixieSkeletonSize,
    type PixieSkeletonSpeed,
    type PixieSkeletonVariant,
} from "@/components/ui/PixieSkeleton";
import { PixieStack } from "@/components/ui/PixieStack";
import type { AtelierAnimationColorSlug } from "@/types/colors";
import { PixieSkeletonPlayground } from "./PixieSkeletonPlayground";

const variants = [
    {
        value: "text",
        name: "Texte",
        role: "Réserve une ou plusieurs lignes de contenu éditorial.",
    },
    {
        value: "block",
        name: "Bloc",
        role: "Préserve une image, une carte ou une région rectangulaire.",
    },
    {
        value: "circle",
        name: "Cercle",
        role: "Annonce la place d’un portrait, d’un symbole ou d’un avatar.",
    },
    {
        value: "media",
        name: "Média",
        role: "Réserve une affiche ou une image selon un ratio stable.",
    },
    {
        value: "control",
        name: "Contrôle",
        role: "Préserve la hauteur d’un champ ou d’une commande.",
    },
    {
        value: "pill",
        name: "Pilule",
        role: "Dessine l’attente d’un badge ou d’une métadonnée compacte.",
    },
] as const satisfies readonly Readonly<{
    value: PixieSkeletonVariant;
    name: string;
    role: string;
}>[];

const animations = [
    {
        value: "shimmer",
        name: "Reflet",
        role: "Un filet de banc-titre traverse doucement la matière.",
    },
    {
        value: "pulse",
        name: "Respiration",
        role: "La surface varie légèrement sans déplacement latéral.",
    },
    {
        value: "beam",
        name: "Faisceau",
        role: "Une lumière plus étroite balaie la forme comme un projecteur.",
    },
    {
        value: "develop",
        name: "Développement",
        role: "Une image lumineuse semble émerger doucement de la matière.",
    },
    {
        value: "grain",
        name: "Grain",
        role: "Une texture cellulo discrète anime la surface par petites poses.",
    },
    {
        value: "none",
        name: "Fixe",
        role: "L’empreinte reste immobile dans les contextes les plus calmes.",
    },
] as const satisfies readonly Readonly<{
    value: PixieSkeletonAnimation;
    name: string;
    role: string;
}>[];

const gaps = [
    { value: "xs", name: "Très petit", dimension: "4 px" },
    { value: "sm", name: "Petit", dimension: "8 px" },
    { value: "md", name: "Moyen", dimension: "12 px" },
    { value: "lg", name: "Grand", dimension: "16 px" },
] as const satisfies readonly Readonly<{
    value: PixieSkeletonGap;
    name: string;
    dimension: string;
}>[];

const sizes = [
    { value: "xs", name: "Très petite" },
    { value: "sm", name: "Petite" },
    { value: "md", name: "Moyenne" },
    { value: "lg", name: "Grande" },
    { value: "xl", name: "Très grande" },
] as const satisfies readonly Readonly<{
    value: PixieSkeletonSize;
    name: string;
}>[];

const intensities = [
    { value: "subtle", name: "Discrète" },
    { value: "normal", name: "Présente" },
    { value: "strong", name: "Appuyée" },
] as const satisfies readonly Readonly<{
    value: PixieSkeletonIntensity;
    name: string;
}>[];

const speeds = [
    { value: "slow", name: "Lente" },
    { value: "normal", name: "Normale" },
    { value: "fast", name: "Rapide" },
] as const satisfies readonly Readonly<{
    value: PixieSkeletonSpeed;
    name: string;
}>[];

const radii = [
    { value: "none", name: "Aucun" },
    { value: "sm", name: "Petit" },
    { value: "md", name: "Moyen" },
    { value: "lg", name: "Grand" },
    { value: "full", name: "Complet" },
] as const satisfies readonly Readonly<{
    value: PixieSkeletonRadius;
    name: string;
}>[];

const colors = [
    { value: "graphite", label: "Graphite" },
    { value: "ambre-projecteur", label: "Projecteur" },
    { value: "bleu-reperage", label: "Repérage" },
    { value: "vert-cellulo", label: "Cellulo" },
] as const satisfies readonly Readonly<{
    value: AtelierAnimationColorSlug;
    label: string;
}>[];

const properties = [
    {
        name: "variant",
        type: "PixieSkeletonVariant",
        defaultValue: '"text"',
        description: "Forme générale de l’empreinte.",
    },
    {
        name: "animation",
        type: "PixieSkeletonAnimation",
        defaultValue: '"shimmer"',
        description: "Traitement animé ou statique de la matière.",
    },
    {
        name: "size",
        type: "PixieSkeletonSize",
        defaultValue: '"md"',
        description: "Échelle prédéfinie de la silhouette.",
    },
    {
        name: "width",
        type: "PixieSkeletonDimension",
        defaultValue: "selon forme",
        description: "Largeur CSS ou valeur numérique convertie en pixels.",
    },
    {
        name: "height",
        type: "PixieSkeletonDimension",
        defaultValue: "selon forme",
        description: "Hauteur du bloc, du cercle ou de chaque ligne.",
    },
    {
        name: "aspectRatio",
        type: "PixieSkeletonDimension",
        defaultValue: '"16 / 9"',
        description: "Ratio réservé par la forme media.",
    },
    {
        name: "lines",
        type: "number",
        defaultValue: "1",
        description: "Nombre de lignes produit par la forme text.",
    },
    {
        name: "lastLineWidth",
        type: "PixieSkeletonDimension",
        defaultValue: '"62%"',
        description: "Largeur de la dernière ligne d’un texte multiligne.",
    },
    {
        name: "lineWidths",
        type: "readonly PixieSkeletonDimension[]",
        defaultValue: "—",
        description: "Largeur explicite et déterministe de chaque ligne.",
    },
    {
        name: "lineHeight",
        type: "PixieSkeletonDimension",
        defaultValue: "selon size",
        description: "Hauteur commune des lignes, prioritaire sur height.",
    },
    {
        name: "gap",
        type: "PixieSkeletonGap",
        defaultValue: '"sm"',
        description: "Rythme vertical entre les lignes.",
    },
    {
        name: "radius",
        type: "PixieSkeletonRadius",
        defaultValue: '"sm"',
        description: "Arrondi des formes text et block.",
    },
    {
        name: "color",
        type: "PixieSkeletonColor",
        defaultValue: '"graphite"',
        description: "Couleur du registre ou couleur héritée.",
    },
    {
        name: "highlightColor",
        type: "PixieSkeletonColor",
        defaultValue: "false",
        description: "Seconde lumière utilisée par les effets animés.",
    },
    {
        name: "intensity",
        type: "PixieSkeletonIntensity",
        defaultValue: '"normal"',
        description: "Présence de la matière et de sa lumière.",
    },
    {
        name: "speed",
        type: "PixieSkeletonSpeed",
        defaultValue: '"normal"',
        description: "Cadence prédéfinie de l’animation.",
    },
    {
        name: "duration",
        type: "number",
        defaultValue: "selon speed",
        description: "Durée personnalisée d’un cycle, en millisecondes.",
    },
    {
        name: "delay",
        type: "number",
        defaultValue: "0",
        description: "Décalage visuel du mouvement, en millisecondes.",
    },
    {
        name: "direction",
        type: "PixieSkeletonDirection",
        defaultValue: '"forward"',
        description: "Sens de lecture de l’animation.",
    },
    {
        name: "active",
        type: "boolean",
        defaultValue: "true",
        description: "Signale si l’empreinte est actuellement visible.",
    },
    {
        name: "reserveSpace",
        type: "boolean",
        defaultValue: "false",
        description: "Conserve silencieusement la géométrie quand inactive.",
    },
    {
        name: "decorative",
        type: "boolean",
        defaultValue: "true",
        description: "Masque par défaut chaque empreinte aux aides techniques.",
    },
    {
        name: "label",
        type: "string",
        defaultValue: '"Chargement du contenu"',
        description: "Annonce du Skeleton lorsqu’il est informatif.",
    },
    {
        name: "ariaLive",
        type: "PixieSkeletonLive",
        defaultValue: '"polite"',
        description: "Priorité de l’annonce informative.",
    },
    {
        name: "ariaControls",
        type: "string",
        defaultValue: "—",
        description: "Identifie la région réelle dont le contenu est attendu.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au conteneur extérieur.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieSkeletonVariant",
        values: variants.map(({ value }) => `"${value}"`),
        description: "Six géométries élémentaires du contenu attendu.",
    },
    {
        name: "PixieSkeletonAnimation",
        values: animations.map(({ value }) => `"${value}"`),
        description: "Cinq traitements de matière et une pose fixe.",
    },
    {
        name: "PixieSkeletonSize",
        values: sizes.map(({ value }) => `"${value}"`),
        description: "Cinq échelles cohérentes pour les formes prédéfinies.",
    },
    {
        name: "PixieSkeletonGap",
        values: gaps.map(({ value }) => `"${value}"`),
        description: "Quatre rythmes ou une mesure numérique personnalisée.",
    },
    {
        name: "PixieSkeletonRadius",
        values: radii.map(({ value }) => `"${value}"`),
        description: "Cinq niveaux d’arrondi hors cercle.",
    },
    {
        name: "PixieSkeletonColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Couleur du registre ou héritée du contexte.",
    },
    {
        name: "PixieSkeletonIntensity",
        values: intensities.map(({ value }) => `"${value}"`),
        description: "Trois niveaux de présence de la matière.",
    },
    {
        name: "PixieSkeletonSpeed",
        values: speeds.map(({ value }) => `"${value}"`),
        description: "Trois cadences prédéfinies de mouvement.",
    },
    {
        name: "PixieSkeletonDirection",
        values: ['"forward"', '"reverse"'],
        description: "Deux sens de lecture de l’effet.",
    },
    {
        name: "PixieSkeletonLive",
        values: ['"off"', '"polite"', '"assertive"'],
        description: "Priorité de l’unique annonce informative.",
    },
    {
        name: "PixieSkeletonDimension",
        values: ["string", "number"],
        description: "Une valeur CSS ou un nombre traduit en pixels.",
    },
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
        <div className="border border-dashed border-line-strong bg-canvas p-5 sm:p-8">
            {children}
        </div>
    );
}

function OeuvreCardSkeleton() {
    return (
        <div
            className="w-full max-w-sm border border-line bg-surface p-5"
            aria-busy="true"
            aria-label="Chargement d’une œuvre"
        >
            <PixieStack gap="md">
                <PixieSkeleton
                    variant="media"
                    aspectRatio="3 / 2"
                    radius="md"
                    animation="develop"
                    highlightColor="ambre-projecteur"
                />
                <PixieSkeleton width="42%" height="0.65rem" />
                <PixieSkeleton lines={2} height="1.35rem" lastLineWidth="76%" />
                <PixieSkeleton lines={3} height="0.8rem" lastLineWidth="58%" />
                <PixieCluster gap="sm">
                    <PixieSkeleton variant="pill" width="5rem" size="xs" />
                    <PixieSkeleton variant="pill" width="7rem" size="xs" />
                </PixieCluster>
            </PixieStack>
        </div>
    );
}

function Scenario({
    title,
    children,
}: Readonly<{ title: string; children: ReactNode }>) {
    return (
        <Stage>
            <p className="mb-5 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                {title}
            </p>
            {children}
        </Stage>
    );
}

export function PixieSkeletonDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-skeleton"
            labelledBy="pixie-skeleton-title"
            nom="PixieSkeleton"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Effet 003
                        </p>
                        <h2
                            id="pixie-skeleton-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieSkeleton
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Préserver la structure d’une scène pendant que son
                            contenu rejoint la projection.
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
            <div className="space-y-16 p-6 sm:p-8">
                <section aria-labelledby="skeleton-identity-title">
                    <SequenceTitle
                        id="skeleton-identity-title"
                        eyebrow="Fiche de rôle"
                        title="L’empreinte précède l’image sans la contrefaire"
                        description="Skeleton réserve la géométrie exacte du contenu attendu. Il ne charge rien, ne mesure rien et ne fabrique aucune variante métier cachée."
                    />
                    <dl className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            [
                                "Mission",
                                "Limiter les déplacements lorsque le contenu apparaît.",
                            ],
                            [
                                "Matière",
                                "Une surface teintée et un reflet de banc-titre.",
                            ],
                            [
                                "Composition",
                                "Des formes unitaires assemblées avec le Montage.",
                            ],
                            [
                                "Limite",
                                "Aucune donnée, mesure automatique ou fausse copie.",
                            ],
                        ].map(([term, description]) => (
                            <div key={term} className="bg-surface-muted p-5">
                                <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                    {term}
                                </dt>
                                <dd className="mt-3 text-sm leading-6 text-ink-soft">
                                    {description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section aria-labelledby="skeleton-master-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="skeleton-master-title"
                            eyebrow="Plan maître"
                            title="Une œuvre attend sa première image"
                            description="Chaque empreinte correspond à un élément réel de la future Card Œuvre : visuel, repère, titre, résumé et badges."
                        />
                        <div className="mt-8 grid gap-4 lg:grid-cols-2">
                            <Stage>
                                <OeuvreCardSkeleton />
                            </Stage>
                            <CodeExample>{`<PixieStack gap="md">
    <PixieSkeleton
        variant="media"
        aspectRatio="3 / 2"
        animation="develop"
    />
    <PixieSkeleton
        lines={2}
        height="1.35rem"
    />
    <PixieSkeleton
        lines={3}
        height="0.8rem"
    />
</PixieStack>`}</CodeExample>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="skeleton-variants-title">
                    <SequenceTitle
                        id="skeleton-variants-title"
                        eyebrow="Formes"
                        title="Six silhouettes préservent la structure attendue"
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {variants.map((variant) => (
                            <Stage key={variant.value}>
                                <div className="grid min-h-52 content-between gap-6">
                                    <div className="flex min-h-28 items-center justify-center">
                                        <PixieSkeleton
                                            variant={variant.value}
                                            width={
                                                variant.value === "circle"
                                                    ? "5rem"
                                                    : "100%"
                                            }
                                            height={
                                                variant.value === "block"
                                                    ? "7rem"
                                                    : variant.value === "circle"
                                                      ? "5rem"
                                                      : variant.value ===
                                                          "media"
                                                        ? "auto"
                                                        : undefined
                                            }
                                            aspectRatio="16 / 9"
                                            size="lg"
                                            lines={
                                                variant.value === "text" ? 3 : 1
                                            }
                                        />
                                    </div>
                                    <div>
                                        <p className="font-mono text-xs text-accent">
                                            variant=&quot;{variant.value}&quot;
                                        </p>
                                        <h4 className="mt-3 text-xl text-ink">
                                            {variant.name}
                                        </h4>
                                        <p className="mt-2 text-sm leading-6 text-ink-soft">
                                            {variant.role}
                                        </p>
                                    </div>
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="skeleton-animations-title">
                    <SequenceTitle
                        id="skeleton-animations-title"
                        eyebrow="Mouvement"
                        title="La matière traverse six états de projection"
                        description="Aucun traitement ne suggère un pourcentage ni une fin imminente."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {animations.map((animation) => (
                            <Stage key={animation.value}>
                                <PixieSkeleton
                                    animation={animation.value}
                                    variant="block"
                                    height="7rem"
                                    radius="md"
                                    highlightColor="ambre-projecteur"
                                />
                                <p className="mt-5 font-mono text-xs text-accent">
                                    animation=&quot;{animation.value}&quot;
                                </p>
                                <h4 className="mt-3 text-xl text-ink">
                                    {animation.name}
                                </h4>
                                <p className="mt-2 text-sm leading-6 text-ink-soft">
                                    {animation.role}
                                </p>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="skeleton-sizes-title">
                    <SequenceTitle
                        id="skeleton-sizes-title"
                        eyebrow="Dimensions"
                        title="Les tailles et ratios stabilisent la future scène"
                        description="Les presets règlent les silhouettes courantes ; width, height et aspectRatio prennent ensuite le relais lorsque le contenu réel impose sa mesure."
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
                        <Stage>
                            <PixieCluster gap="md" align="end">
                                {sizes.map((size) => (
                                    <div
                                        key={size.value}
                                        className="grid justify-items-center gap-3"
                                    >
                                        <PixieSkeleton
                                            variant="circle"
                                            size={size.value}
                                            animation="beam"
                                            highlightColor="ambre-projecteur"
                                        />
                                        <span className="font-mono text-xs text-muted">
                                            {size.value}
                                        </span>
                                    </div>
                                ))}
                            </PixieCluster>
                        </Stage>
                        <Stage>
                            <div className="grid grid-cols-3 items-end gap-4">
                                {["1 / 1", "4 / 3", "16 / 9"].map((ratio) => (
                                    <div key={ratio}>
                                        <PixieSkeleton
                                            variant="media"
                                            aspectRatio={ratio}
                                            animation="develop"
                                            highlightColor="bleu-reperage"
                                            radius="md"
                                        />
                                        <p className="mt-3 text-center font-mono text-xs text-muted">
                                            {ratio}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="skeleton-text-title">
                    <SequenceTitle
                        id="skeleton-text-title"
                        eyebrow="Rythme éditorial"
                        title="Les lignes annoncent la respiration du texte"
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        {gaps.map((gap, index) => (
                            <Stage key={gap.value}>
                                <PixieSkeleton
                                    lines={index + 2}
                                    gap={gap.value}
                                    lastLineWidth={`${48 + index * 14}%`}
                                />
                                <div className="mt-6 flex items-baseline justify-between gap-4">
                                    <p className="font-mono text-xs text-accent">
                                        gap=&quot;{gap.value}&quot;
                                    </p>
                                    <p className="font-mono text-xs text-muted">
                                        {gap.dimension}
                                    </p>
                                </div>
                            </Stage>
                        ))}
                    </div>
                    <div className="mt-5">
                        <Stage>
                            <PixieSkeleton
                                lineWidths={["100%", "91%", "73%", "44%"]}
                                lineHeight="0.75rem"
                                gap="sm"
                                animation="grain"
                                highlightColor="papier-animation"
                            />
                            <p className="mt-5 font-mono text-xs text-accent">
                                lineWidths=[100%, 91%, 73%, 44%]
                            </p>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="skeleton-radius-title">
                    <SequenceTitle
                        id="skeleton-radius-title"
                        eyebrow="Formes"
                        title="Les arrondis préparent le contour du contenu réel"
                    />
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        {radii.map((radius) => (
                            <Stage key={radius.value}>
                                <PixieSkeleton
                                    variant="block"
                                    height="5rem"
                                    radius={radius.value}
                                />
                                <p className="mt-4 text-center font-mono text-xs text-accent">
                                    {radius.name}
                                </p>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="skeleton-colors-title">
                    <SequenceTitle
                        id="skeleton-colors-title"
                        eyebrow="Pellicules teintées"
                        title="La famille peut colorer l’empreinte sans porter de sens"
                    />
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {colors.map((color) => (
                            <Stage key={color.value}>
                                <PixieSkeleton
                                    variant="block"
                                    height="6rem"
                                    color={color.value}
                                    radius="md"
                                />
                                <p className="mt-4 text-center text-sm text-ink-soft">
                                    {color.label}
                                </p>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="skeleton-compositions-title">
                    <SequenceTitle
                        id="skeleton-compositions-title"
                        eyebrow="Scénarios préparés"
                        title="Huit scènes reconnaissables avant l’arrivée des archives"
                        description="Chaque composition reste un assemblage explicite de primitives Pixie : Skeleton ne connaît ni les Cards métier, ni les fiches, ni la recherche."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <Scenario title="Card Personnage · portrait">
                            <div
                                className="flex items-center gap-5"
                                aria-busy="true"
                                aria-label="Chargement d’un personnage"
                            >
                                <PixieSkeleton
                                    variant="circle"
                                    size="xl"
                                    animation="develop"
                                    highlightColor="rouge-crayon"
                                />
                                <div className="min-w-0 flex-1">
                                    <PixieSkeleton
                                        lineWidths={["38%", "72%", "54%"]}
                                    />
                                </div>
                            </div>
                        </Scenario>
                        <Scenario title="Card Œuvre · affiche">
                            <OeuvreCardSkeleton />
                        </Scenario>
                        <Scenario title="Recherche · résultat compact">
                            <PixieStack gap="sm">
                                <PixieSkeleton
                                    variant="pill"
                                    size="xs"
                                    width="6rem"
                                />
                                <PixieSkeleton
                                    lineWidths={["58%", "92%", "68%"]}
                                    animation="beam"
                                    highlightColor="gouache"
                                />
                            </PixieStack>
                        </Scenario>
                        <Scenario title="Fiche · en-tête documentaire">
                            <div className="grid grid-cols-[4rem_1fr] gap-5">
                                <PixieSkeleton
                                    variant="block"
                                    width="4rem"
                                    height="4rem"
                                    radius="md"
                                    animation="develop"
                                    highlightColor="ambre-projecteur"
                                />
                                <PixieSkeleton
                                    lineWidths={["24%", "78%", "100%", "86%"]}
                                    gap="sm"
                                />
                            </div>
                        </Scenario>
                        <Scenario title="Métadonnées · badges">
                            <PixieCluster gap="sm">
                                {["4rem", "6rem", "5rem", "7rem"].map(
                                    (width, index) => (
                                        <PixieSkeleton
                                            key={width}
                                            variant="pill"
                                            size="xs"
                                            width={width}
                                            delay={index * 120}
                                            color="violet-ombre-portee"
                                        />
                                    ),
                                )}
                            </PixieCluster>
                        </Scenario>
                        <Scenario title="Relations · grille">
                            <div className="grid grid-cols-3 gap-3">
                                {[0, 1, 2].map((index) => (
                                    <PixieStack key={index} gap="sm">
                                        <PixieSkeleton
                                            variant="media"
                                            aspectRatio="4 / 3"
                                            animation="grain"
                                            delay={index * 160}
                                        />
                                        <PixieSkeleton
                                            lineWidths={["90%", "54%"]}
                                            size="sm"
                                        />
                                    </PixieStack>
                                ))}
                            </div>
                        </Scenario>
                        <Scenario title="Panneau · séquence complète">
                            <PixiePanel variant="outline" padding="md">
                                <PixieStack gap="md">
                                    <PixieSkeleton width="36%" size="lg" />
                                    <PixieSkeleton
                                        lineWidths={["100%", "94%", "71%"]}
                                    />
                                    <PixieSkeleton
                                        variant="media"
                                        aspectRatio="16 / 6"
                                        animation="develop"
                                    />
                                </PixieStack>
                            </PixiePanel>
                        </Scenario>
                        <Scenario title="Formulaire · contrôle compact">
                            <PixieStack gap="sm">
                                <PixieSkeleton width="28%" size="xs" />
                                <PixieSkeleton
                                    variant="control"
                                    size="md"
                                    animation="beam"
                                    highlightColor="bleu-reperage"
                                />
                                <PixieSkeleton width="46%" size="xs" />
                            </PixieStack>
                        </Scenario>
                    </div>
                </section>

                <section aria-labelledby="skeleton-playground-title">
                    <SequenceTitle
                        id="skeleton-playground-title"
                        eyebrow="Bac à sable interactif"
                        title="Dessiner l’empreinte avant l’arrivée du contenu"
                        description="Le plateau règle forme, mouvement, dimensions, lignes, teinte, accessibilité et deux Lumières."
                    />
                    <div className="mt-8">
                        <PixieSkeletonPlayground />
                    </div>
                </section>

                <section aria-labelledby="skeleton-accessibility-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="skeleton-accessibility-title"
                            eyebrow="Accessibilité"
                            title="La structure visible ne doit pas devenir un chœur d’annonces"
                        />
                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Décoratif par défaut
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Une composition peut contenir de nombreuses
                                    empreintes. Elles restent silencieuses pour
                                    éviter les répétitions.
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    La région parle
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Le parent décrit le contenu attendu et porte
                                    aria-busy jusqu’à son remplacement. Une
                                    unique empreinte peut recevoir role=status,
                                    aria-live et aria-controls si nécessaire.
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Mouvement réduit
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Reflet, faisceau, développement, grain et
                                    respiration deviennent fixes sans modifier
                                    la géométrie.
                                </p>
                            </PixiePanel>
                        </div>
                        <div
                            className="mt-5 border border-line bg-canvas p-5"
                            aria-busy="true"
                        >
                            <PixieSkeleton
                                decorative={false}
                                label="Chargement de la fiche"
                                width="15rem"
                            />
                        </div>
                    </div>
                </section>

                <section aria-labelledby="skeleton-technical-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="skeleton-technical-title"
                            eyebrow="Générique technique"
                            title="API du composant"
                            description="Les nombres de dimension deviennent des pixels ; les chaînes conservent leurs unités CSS. lineWidths fixe explicitement le rythme du texte et reserveSpace préserve une géométrie inactive sans l’annoncer."
                        />
                        <div className="mt-8">
                            <AtelierPropertiesTable properties={properties} />
                        </div>
                        <div className="mt-10">
                            <h4 className="text-2xl text-ink">
                                Types spécifiques
                            </h4>
                            <div className="mt-5">
                                <AtelierTypesTable types={specificTypes} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AtelierFicheAccessoire>
    );
}
