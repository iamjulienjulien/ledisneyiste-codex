import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import {
    PixieDustCard,
    type PixieDustCardEffect,
    type PixieDustCardPadding,
    type PixieDustCardRadius,
    type PixieDustCardVariant,
} from "@/components/ui/PixieDustCard";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieDustCardPlayground } from "./PixieDustCardPlayground";

const variants = [
    {
        name: "Surface",
        value: "surface" as const,
        description: "Une présence neutre sans ligne ni élévation visible.",
    },
    {
        name: "Contour",
        value: "outline" as const,
        description: "Une limite franche sur un fond laissé transparent.",
    },
    {
        name: "Élevé",
        value: "elevated" as const,
        description: "Une surface détachée par une ligne et une ombre douce.",
    },
    {
        name: "Accent",
        value: "accent" as const,
        description: "Un filet coloré et une lumière éditoriale discrète.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustCardVariant;
    description: string;
}>[];

const paddings = [
    { name: "Aucun", value: "none" as const, token: "0" },
    { name: "Petit", value: "sm" as const, token: "1 rem" },
    { name: "Moyen", value: "md" as const, token: "1,5 rem" },
    { name: "Grand", value: "lg" as const, token: "2 rem" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustCardPadding;
    token: string;
}>[];

const radii = [
    { name: "Aucun", value: "none" as const },
    { name: "Petit", value: "small" as const },
    { name: "Moyen", value: "medium" as const },
    { name: "Grand", value: "large" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustCardRadius;
}>[];

const effects = [
    {
        name: "Statique",
        value: "none" as const,
        description: "Le décor ne réagit pas au passage du public.",
    },
    {
        name: "Élévation",
        value: "lift" as const,
        description: "La surface se détache légèrement au survol.",
    },
    {
        name: "Projecteur",
        value: "projector" as const,
        description: "Un faisceau traverse la surface et y dépose un halo.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustCardEffect;
    description: string;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieDustCardElement",
        defaultValue: '"div"',
        description: "Élément HTML porté par la surface.",
    },
    {
        name: "variant",
        type: "PixieDustCardVariant",
        defaultValue: '"surface"',
        description: "Nature visuelle du décor.",
    },
    {
        name: "color",
        type: "PixieDustCardColor",
        defaultValue: "false",
        description: "Couleur du registre ou accent courant du thème.",
    },
    {
        name: "padding",
        type: "PixieDustCardPadding",
        defaultValue: '"md"',
        description: "Espacement intérieur sans présumer du contenu.",
    },
    {
        name: "radius",
        type: "PixieDustCardRadius",
        defaultValue: '"medium"',
        description: "Arrondi du cadre selon les tokens de la Projection.",
    },
    {
        name: "effect",
        type: "PixieDustCardEffect",
        defaultValue: '"none"',
        description: "Réaction visuelle au survol ou au focus interne.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Composition libre accueillie dans le décor.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes complémentaires pour la composition externe.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustCardElement",
        values: ['"div"', '"article"', '"section"', '"li"'],
        description: "Éléments sémantiques autorisés pour la surface.",
    },
    {
        name: "PixieDustCardVariant",
        values: ['"surface"', '"outline"', '"elevated"', '"accent"'],
        description: "Traitements visuels indépendants du contenu.",
    },
    {
        name: "PixieDustCardColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Couleur enregistrée ou accent courant du thème.",
    },
    {
        name: "PixieDustCardPadding",
        values: ['"none"', '"sm"', '"md"', '"lg"'],
        description: "Densités d’espacement intérieur.",
    },
    {
        name: "PixieDustCardRadius",
        values: ['"none"', '"small"', '"medium"', '"large"'],
        description: "Rayons disponibles dans la Projection.",
    },
    {
        name: "PixieDustCardEffect",
        values: ['"none"', '"lift"', '"projector"'],
        description: "Réactions visuelles facultatives de la surface.",
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

function ExampleContent() {
    return (
        <>
            <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.16em] text-muted">
                Note de production
            </p>
            <h4 className="mt-3 text-2xl text-ink">
                Une surface au service du récit
            </h4>
            <p className="mt-4 leading-7 text-ink-soft">
                Le contenu conserve sa propre hiérarchie pendant que la carte
                prend en charge son cadre et sa présence.
            </p>
        </>
    );
}

export function PixieDustCardDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-card"
            labelledBy="pixie-dust-card-title"
            nom="PixieDustCard"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Décor 001
                        </p>
                        <h2
                            id="pixie-dust-card-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustCard
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Installer une surface cohérente sans écrire à la
                            place du contenu qu’elle accueille.
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
            <section aria-labelledby="card-identity" className="mt-14">
                <SequenceTitle
                    id="card-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="La carte ne connaît ni les personnages, ni les œuvres, ni leurs métadonnées. Elle fournit uniquement une surface, un cadre et une réaction visuelle facultative."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        [
                            "Mission",
                            "Accueillir une unité de contenu autonome.",
                        ],
                        [
                            "Usage",
                            "Cartes éditoriales, résumés, aperçus et groupes d’informations.",
                        ],
                        [
                            "Limite",
                            "Ne décide ni de la composition interne ni de l’action.",
                        ],
                        [
                            "Tokens",
                            "Surfaces, lignes, rayons, ombre et couleurs de l’Atelier.",
                        ],
                        [
                            "Accessibilité",
                            "Sémantique explicite et mouvement toujours facultatif.",
                        ],
                        [
                            "Dépendances",
                            "Projection Originale et registre des couleurs.",
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
                aria-labelledby="card-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="card-master"
                    eyebrow="Plan maître"
                    title="Le décor dans sa forme de référence"
                    description="Une surface éditoriale accentuée, assez espacée pour respirer et traversée par le projecteur lorsqu’elle accueille une action."
                />

                <div className="mt-7 grid border border-line lg:grid-cols-2">
                    <div className="flex min-h-80 items-center justify-center bg-canvas p-8">
                        <PixieDustCard
                            as="article"
                            variant="accent"
                            color="rouge-crayon"
                            effect="projector"
                            className="max-w-md"
                        >
                            <ExampleContent />
                            <PixieLink
                                href="#card-variants"
                                variant="action"
                                color="rouge-crayon"
                                indicator="arrow"
                                className="mt-6"
                            >
                                Voir les essais
                            </PixieLink>
                        </PixieDustCard>
                    </div>
                    <CodeExample>{`<PixieDustCard
    as="article"
    variant="accent"
    color="rouge-crayon"
    effect="projector"
>
    {/* Contenu libre */}
</PixieDustCard>`}</CodeExample>
                </div>
            </section>

            <section
                id="card-variants"
                aria-labelledby="card-variants-title"
                className="mt-16 scroll-mt-8"
            >
                <SequenceTitle
                    id="card-variants-title"
                    eyebrow="Direction artistique"
                    title="Quatre natures de surface"
                    description="Le variant décrit le décor au repos. Il reste indépendant de l’effet qui peut l’animer."
                />

                <div className="mt-7 grid gap-6 bg-surface-muted p-6 md:grid-cols-2">
                    {variants.map((variant) => (
                        <PixieDustCard
                            key={variant.value}
                            as="article"
                            variant={variant.value}
                            color="gouache"
                            className="min-h-60"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                {variant.name}
                            </p>
                            <h4 className="mt-3 text-2xl text-ink">
                                {variant.value}
                            </h4>
                            <p className="mt-4 leading-7 text-ink-soft">
                                {variant.description}
                            </p>
                        </PixieDustCard>
                    ))}
                </div>
            </section>

            <section aria-labelledby="card-density" className="mt-16">
                <SequenceTitle
                    id="card-density"
                    eyebrow="Construction du décor"
                    title="Espacements et contours restent combinables"
                    description="La densité répond au contenu ; le rayon répond au contexte visuel. Aucun des deux ne modifie la structure interne."
                />

                <div className="mt-7 grid gap-8 xl:grid-cols-2">
                    <div>
                        <h4 className="text-xl text-ink">Espacements</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {paddings.map((padding) => (
                                <PixieDustCard
                                    key={padding.value}
                                    variant="outline"
                                    padding={padding.value}
                                    radius="small"
                                    className="min-h-32"
                                >
                                    <div className="bg-accent-soft p-3">
                                        <p className="font-mono text-xs text-accent">
                                            {padding.value} · {padding.token}
                                        </p>
                                    </div>
                                </PixieDustCard>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl text-ink">Rayons</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {radii.map((radius) => (
                                <PixieDustCard
                                    key={radius.value}
                                    variant="accent"
                                    color="vert-cellulo"
                                    radius={radius.value}
                                    className="min-h-32"
                                >
                                    <p className="font-mono text-xs text-accent">
                                        radius=&quot;{radius.value}&quot;
                                    </p>
                                    <p className="mt-3 text-sm text-ink-soft">
                                        {radius.name}
                                    </p>
                                </PixieDustCard>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section aria-labelledby="card-effects" className="mt-16">
                <SequenceTitle
                    id="card-effects"
                    eyebrow="Effets de plateau"
                    title="Le décor peut réagir sans devenir une action"
                    description="Le survol et le focus interne donnent un retour visuel, mais la carte ne reçoit jamais artificiellement un rôle ou un tabIndex."
                />

                <div className="mt-7 grid gap-6 lg:grid-cols-3">
                    {effects.map((effect) => (
                        <PixieDustCard
                            key={effect.value}
                            as="article"
                            variant="elevated"
                            color="bleu-reperage"
                            effect={effect.value}
                            className="min-h-64"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                {effect.name}
                            </p>
                            <h4 className="mt-3 text-2xl text-ink">
                                {effect.value}
                            </h4>
                            <p className="mt-4 leading-7 text-ink-soft">
                                {effect.description}
                            </p>
                            <PixieLink
                                href="#pixie-dust-card-playground"
                                variant="action"
                                color="bleu-reperage"
                                indicator="arrow"
                                className="mt-6"
                            >
                                Donner le focus
                            </PixieLink>
                        </PixieDustCard>
                    ))}
                </div>
            </section>

            <section
                id="pixie-dust-card-playground"
                aria-labelledby="card-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="card-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieDustCard"
                    description="Réglez sa sémantique, sa présence et ses effets ; le code d’utilisation se met à jour avec le rendu."
                />
                <div className="mt-8">
                    <PixieDustCardPlayground />
                </div>
            </section>

            <section
                aria-labelledby="card-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="card-accessibility"
                    eyebrow="Accessibilité"
                    title="La surface ne doit jamais mentir sur son rôle"
                    description="La sémantique vient du contenu et de l’élément choisi, jamais du traitement visuel de la carte."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
                    {[
                        [
                            "Article autonome",
                            'Utiliser as="article" lorsque la carte possède un sens indépendamment de son contexte.',
                        ],
                        [
                            "Simple regroupement",
                            "Conserver le div par défaut lorsqu’aucune sémantique supplémentaire n’est nécessaire.",
                        ],
                        [
                            "Action réelle",
                            "Employer PixieLink ou PixieButton pour l’action, sans onClick ni tabIndex sur la surface.",
                        ],
                        [
                            "Mouvement facultatif",
                            "Les effets disparaissent avec prefers-reduced-motion sans retirer aucune information.",
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
                aria-labelledby="card-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="card-technical"
                    eyebrow="Générique technique"
                    title="API de l’esquisse"
                    description="Les types restent centralisés dans src/types et les attributs HTML compatibles sont transmis à l’élément rendu."
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

            <section aria-labelledby="card-journal" className="mt-16">
                <SequenceTitle
                    id="card-journal"
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="L’esquisse doit encore être éprouvée dans de vraies compositions avant de devenir PixieCard."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Vérifier si variant et effect restent bien deux axes indépendants.",
                        "Éprouver les quatre rayons dans les cartes métier existantes.",
                        "Comparer projector avec le halo actuel des index sans dupliquer leurs responsabilités.",
                        "Valider les surfaces imbriquées dans les deux Lumières.",
                        "Tester la lecture et le focus à 200 % de zoom.",
                        "Décider si l’élément li doit rester dans l’API finale.",
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
