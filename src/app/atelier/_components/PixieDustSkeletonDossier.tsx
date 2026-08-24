import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieDustCluster } from "@/components/ui/PixieDustCluster";
import { PixiePanel } from "@/components/ui/PixiePanel";
import {
    PixieDustSkeleton,
    type PixieDustSkeletonAnimation,
    type PixieDustSkeletonGap,
    type PixieDustSkeletonRadius,
    type PixieDustSkeletonVariant,
} from "@/components/ui/PixieDustSkeleton";
import { PixieDustStack } from "@/components/ui/PixieDustStack";
import type { AtelierAnimationColorSlug } from "@/types/colors";
import { PixieDustSkeletonPlayground } from "./PixieDustSkeletonPlayground";

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
] as const satisfies readonly Readonly<{
    value: PixieDustSkeletonVariant;
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
        value: "none",
        name: "Fixe",
        role: "L’empreinte reste immobile dans les contextes les plus calmes.",
    },
] as const satisfies readonly Readonly<{
    value: PixieDustSkeletonAnimation;
    name: string;
    role: string;
}>[];

const gaps = [
    { value: "xs", name: "Très petit", dimension: "4 px" },
    { value: "sm", name: "Petit", dimension: "8 px" },
    { value: "md", name: "Moyen", dimension: "12 px" },
] as const satisfies readonly Readonly<{
    value: PixieDustSkeletonGap;
    name: string;
    dimension: string;
}>[];

const radii = [
    { value: "none", name: "Aucun" },
    { value: "sm", name: "Petit" },
    { value: "md", name: "Moyen" },
    { value: "lg", name: "Grand" },
    { value: "full", name: "Complet" },
] as const satisfies readonly Readonly<{
    value: PixieDustSkeletonRadius;
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
        type: "PixieDustSkeletonVariant",
        defaultValue: '"text"',
        description: "Forme générale de l’empreinte.",
    },
    {
        name: "animation",
        type: "PixieDustSkeletonAnimation",
        defaultValue: '"shimmer"',
        description: "Traitement animé ou statique de la matière.",
    },
    {
        name: "width",
        type: "PixieDustSkeletonDimension",
        defaultValue: "selon forme",
        description: "Largeur CSS ou valeur numérique convertie en pixels.",
    },
    {
        name: "height",
        type: "PixieDustSkeletonDimension",
        defaultValue: "selon forme",
        description: "Hauteur du bloc, du cercle ou de chaque ligne.",
    },
    {
        name: "lines",
        type: "number",
        defaultValue: "1",
        description: "Nombre de lignes produit par la forme text.",
    },
    {
        name: "lastLineWidth",
        type: "PixieDustSkeletonDimension",
        defaultValue: '"62%"',
        description: "Largeur de la dernière ligne d’un texte multiligne.",
    },
    {
        name: "gap",
        type: "PixieDustSkeletonGap",
        defaultValue: '"sm"',
        description: "Rythme vertical entre les lignes.",
    },
    {
        name: "radius",
        type: "PixieDustSkeletonRadius",
        defaultValue: '"sm"',
        description: "Arrondi des formes text et block.",
    },
    {
        name: "color",
        type: "PixieDustSkeletonColor",
        defaultValue: '"graphite"',
        description: "Couleur du registre ou couleur héritée.",
    },
    {
        name: "active",
        type: "boolean",
        defaultValue: "true",
        description: "Retire entièrement l’empreinte lorsqu’il vaut false.",
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
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au conteneur extérieur.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustSkeletonVariant",
        values: variants.map(({ value }) => `"${value}"`),
        description: "Trois géométries élémentaires du contenu attendu.",
    },
    {
        name: "PixieDustSkeletonAnimation",
        values: animations.map(({ value }) => `"${value}"`),
        description: "Deux mouvements et une matière fixe.",
    },
    {
        name: "PixieDustSkeletonGap",
        values: gaps.map(({ value }) => `"${value}"`),
        description: "Trois rythmes entre les lignes de texte.",
    },
    {
        name: "PixieDustSkeletonRadius",
        values: radii.map(({ value }) => `"${value}"`),
        description: "Cinq niveaux d’arrondi hors cercle.",
    },
    {
        name: "PixieDustSkeletonColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Couleur du registre ou héritée du contexte.",
    },
    {
        name: "PixieDustSkeletonDimension",
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
            <PixieDustStack gap="md">
                <PixieDustSkeleton variant="block" height="10rem" radius="md" />
                <PixieDustSkeleton width="42%" height="0.65rem" />
                <PixieDustSkeleton
                    lines={2}
                    height="1.35rem"
                    lastLineWidth="76%"
                />
                <PixieDustSkeleton
                    lines={3}
                    height="0.8rem"
                    lastLineWidth="58%"
                />
                <PixieDustCluster gap="sm">
                    <PixieDustSkeleton
                        width="5rem"
                        height="1.5rem"
                        radius="full"
                    />
                    <PixieDustSkeleton
                        width="7rem"
                        height="1.5rem"
                        radius="full"
                    />
                </PixieDustCluster>
            </PixieDustStack>
        </div>
    );
}

export function PixieDustSkeletonDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-skeleton"
            labelledBy="pixie-dust-skeleton-title"
            nom="PixieDustSkeleton"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Effet 003
                        </p>
                        <h2
                            id="pixie-dust-skeleton-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustSkeleton
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
                            <CodeExample>{`<PixieDustStack gap="md">
    <PixieDustSkeleton
        variant="block"
        height="10rem"
    />
    <PixieDustSkeleton
        lines={2}
        height="1.35rem"
    />
    <PixieDustSkeleton
        lines={3}
        height="0.8rem"
    />
</PixieDustStack>`}</CodeExample>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="skeleton-variants-title">
                    <SequenceTitle
                        id="skeleton-variants-title"
                        eyebrow="Formes"
                        title="Trois géométries suffisent à reconstruire une scène"
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        {variants.map((variant) => (
                            <Stage key={variant.value}>
                                <div className="grid min-h-52 content-between gap-6">
                                    <div className="flex min-h-28 items-center justify-center">
                                        <PixieDustSkeleton
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
                                                      : "1em"
                                            }
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
                        title="Le banc-titre peut glisser, respirer ou rester fixe"
                        description="Aucun traitement ne suggère un pourcentage ni une fin imminente."
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        {animations.map((animation) => (
                            <Stage key={animation.value}>
                                <PixieDustSkeleton
                                    animation={animation.value}
                                    variant="block"
                                    height="7rem"
                                    radius="md"
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

                <section aria-labelledby="skeleton-text-title">
                    <SequenceTitle
                        id="skeleton-text-title"
                        eyebrow="Rythme éditorial"
                        title="Les lignes annoncent la respiration du texte"
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        {gaps.map((gap, index) => (
                            <Stage key={gap.value}>
                                <PixieDustSkeleton
                                    lines={index + 3}
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
                                <PixieDustSkeleton
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
                                <PixieDustSkeleton
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
                        eyebrow="Montage"
                        title="La primitive reconstruit des structures sans connaître leur métier"
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <Stage>
                            <div
                                className="flex items-center gap-5"
                                aria-busy="true"
                                aria-label="Chargement d’une relation"
                            >
                                <PixieDustSkeleton
                                    variant="circle"
                                    width="4rem"
                                />
                                <div className="min-w-0 flex-1">
                                    <PixieDustSkeleton
                                        lines={2}
                                        lastLineWidth="44%"
                                    />
                                </div>
                            </div>
                        </Stage>
                        <Stage>
                            <OeuvreCardSkeleton />
                        </Stage>
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
                        <PixieDustSkeletonPlayground />
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
                                    aria-busy jusqu’à son remplacement par la
                                    scène réelle.
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Mouvement réduit
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Reflet et respiration deviennent fixes sans
                                    modifier la géométrie ni masquer
                                    l’empreinte.
                                </p>
                            </PixiePanel>
                        </div>
                        <div
                            className="mt-5 border border-line bg-canvas p-5"
                            aria-busy="true"
                        >
                            <PixieDustSkeleton
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
                            title="API de l’esquisse"
                            description="Les nombres deviennent des pixels ; les chaînes conservent leurs unités CSS. Les propriétés textuelles restent sans effet sur block et circle."
                        />
                        <div className="mt-8">
                            <AtelierPropertiesTable properties={properties} />
                        </div>
                        <div className="mt-6">
                            <AtelierTypesTable types={specificTypes} />
                        </div>
                    </div>
                </section>

                <section aria-labelledby="skeleton-journal-title">
                    <SequenceTitle
                        id="skeleton-journal-title"
                        eyebrow="Journal de production"
                        title="Avant la version prête à projeter"
                    />
                    <PixieDustStack as="ul" gap="sm" className="mt-8">
                        {[
                            "Comparer les empreintes aux dimensions réelles des quatre Cards métier.",
                            "Vérifier le reflet, la respiration et les teintes dans les deux Lumières.",
                            "Éprouver le remplacement par le contenu réel sans déplacement de mise en page.",
                            "Contrôler aria-busy, les compositions décoratives et l’unique annonce informative.",
                            "Confirmer le rendu entièrement fixe avec le mouvement réduit.",
                        ].map((item) => (
                            <li
                                key={item}
                                className="border-l-2 border-accent bg-surface-muted px-5 py-4 text-sm leading-6 text-ink-soft"
                            >
                                {item}
                            </li>
                        ))}
                    </PixieDustStack>
                </section>
            </div>
        </AtelierFicheAccessoire>
    );
}
