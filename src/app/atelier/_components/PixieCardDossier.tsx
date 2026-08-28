import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import {
    PixieCard,
    type PixieCardAccentPosition,
    type PixieCardEffect,
    type PixieCardEffectIntensity,
    type PixieCardPadding,
    type PixieCardRadius,
    type PixieCardVariant,
} from "@/components/ui/PixieCard";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieCardPlayground } from "./PixieCardPlayground";

const variants = [
    {
        name: "Surface",
        value: "surface" as const,
        description: "Une présence neutre avec une limite discrète.",
    },
    {
        name: "Atténué",
        value: "muted" as const,
        description: "Une surface secondaire qui calme la hiérarchie.",
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
    {
        name: "Teinté",
        value: "tinted" as const,
        description: "Une surface doucement imprégnée par sa couleur.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieCardVariant;
    description: string;
}>[];

const paddings = [
    { name: "Aucun", value: "none" as const, token: "0" },
    { name: "Petit", value: "sm" as const, token: "1 rem" },
    { name: "Moyen", value: "md" as const, token: "1,5 rem" },
    { name: "Grand", value: "lg" as const, token: "2 rem" },
    { name: "Très grand", value: "xl" as const, token: "2,5 rem" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieCardPadding;
    token: string;
}>[];

const radii = [
    { name: "Aucun", value: "none" as const },
    { name: "Petit", value: "small" as const },
    { name: "Moyen", value: "medium" as const },
    { name: "Grand", value: "large" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieCardRadius;
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
        name: "Halo",
        value: "glow" as const,
        description: "Une lumière se dépose sans déplacer la surface.",
    },
    {
        name: "Révélation",
        value: "reveal" as const,
        description: "Le filet et la teinte apparaissent progressivement.",
    },
    {
        name: "Projecteur",
        value: "projector" as const,
        description: "Un faisceau traverse la surface et y dépose un halo.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieCardEffect;
    description: string;
}>[];

const accentPositions = [
    { name: "Haut", value: "top" as const },
    { name: "Fin", value: "end" as const },
    { name: "Bas", value: "bottom" as const },
    { name: "Début", value: "start" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieCardAccentPosition;
}>[];

const effectIntensities = [
    {
        name: "Subtile",
        value: "subtle" as const,
        description: "Un raccord discret pour les contenus secondaires.",
    },
    {
        name: "Moyenne",
        value: "medium" as const,
        description: "Le réglage de référence pour les cartes métier.",
    },
    {
        name: "Forte",
        value: "strong" as const,
        description: "Une présence réservée aux portes et cartes vedettes.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieCardEffectIntensity;
    description: string;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieCardElement",
        defaultValue: '"div"',
        description: "Élément HTML porté par la surface.",
    },
    {
        name: "asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Transmet la surface à un unique enfant racine.",
    },
    {
        name: "variant",
        type: "PixieCardVariant",
        defaultValue: '"surface"',
        description: "Nature visuelle du décor.",
    },
    {
        name: "color",
        type: "PixieCardColor",
        defaultValue: "false",
        description: "Couleur du registre ou accent courant du thème.",
    },
    {
        name: "padding",
        type: "PixieCardPadding",
        defaultValue: '"md"',
        description: "Espacement intérieur sans présumer du contenu.",
    },
    {
        name: "radius",
        type: "PixieCardRadius",
        defaultValue: '"medium"',
        description: "Arrondi du cadre selon les tokens de la Projection.",
    },
    {
        name: "accentPosition",
        type: "PixieCardAccentPosition",
        defaultValue: '"top"',
        description: "Place logiquement le filet et l’origine lumineuse.",
    },
    {
        name: "effect",
        type: "PixieCardEffect",
        defaultValue: '"none"',
        description: "Réaction visuelle au survol ou au focus interne.",
    },
    {
        name: "effectIntensity",
        type: "PixieCardEffectIntensity",
        defaultValue: '"medium"',
        description: "Règle l’amplitude du halo, du faisceau et du mouvement.",
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
        name: "PixieCardElement",
        values: ['"div"', '"article"', '"section"', '"li"'],
        description: "Éléments sémantiques autorisés pour la surface.",
    },
    {
        name: "PixieCardVariant",
        values: [
            '"surface"',
            '"muted"',
            '"outline"',
            '"elevated"',
            '"accent"',
            '"tinted"',
        ],
        description: "Traitements visuels indépendants du contenu.",
    },
    {
        name: "PixieCardColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Couleur enregistrée ou accent courant du thème.",
    },
    {
        name: "PixieCardPadding",
        values: ['"none"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Densités d’espacement intérieur.",
    },
    {
        name: "PixieCardRadius",
        values: ['"none"', '"small"', '"medium"', '"large"'],
        description: "Rayons disponibles dans la Projection.",
    },
    {
        name: "PixieCardAccentPosition",
        values: ['"top"', '"end"', '"bottom"', '"start"'],
        description: "Positions physiques et logiques du filet coloré.",
    },
    {
        name: "PixieCardEffect",
        values: ['"none"', '"lift"', '"glow"', '"reveal"', '"projector"'],
        description: "Réactions visuelles facultatives de la surface.",
    },
    {
        name: "PixieCardEffectIntensity",
        values: ['"subtle"', '"medium"', '"strong"'],
        description: "Amplitudes partagées par les effets de la carte.",
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

export function PixieCardDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-card"
            labelledBy="pixie-card-title"
            nom="PixieCard"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Décor 001
                        </p>
                        <h2
                            id="pixie-card-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieCard
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
                        <PixieCard
                            asChild
                            variant="accent"
                            color="rouge-crayon"
                            effect="projector"
                            effectIntensity="medium"
                            className="max-w-md"
                        >
                            <PixieLink
                                href="#card-variants"
                                variant="surface"
                                color="rouge-crayon"
                                className="block"
                            >
                                <ExampleContent />
                                <span className="mt-6 block font-medium text-accent">
                                    Voir les essais →
                                </span>
                            </PixieLink>
                        </PixieCard>
                    </div>
                    <CodeExample>{`<PixieCard
    asChild
    variant="accent"
    color="rouge-crayon"
    effect="projector"
>
    <PixieLink href="/archives" variant="surface">
        {/* Contenu libre */}
    </PixieLink>
</PixieCard>`}</CodeExample>
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
                    title="Six natures de surface"
                    description="Le variant décrit le décor au repos. Il reste indépendant de l’effet qui peut l’animer."
                />

                <div className="mt-7 grid gap-6 bg-surface-muted p-6 md:grid-cols-2">
                    {variants.map((variant) => (
                        <PixieCard
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
                        </PixieCard>
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
                                <PixieCard
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
                                </PixieCard>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl text-ink">Rayons</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {radii.map((radius) => (
                                <PixieCard
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
                                </PixieCard>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section aria-labelledby="card-accents" className="mt-16">
                <SequenceTitle
                    id="card-accents"
                    eyebrow="Repères de composition"
                    title="L’accent trouve sa place dans le cadre"
                    description="Le filet suit la logique de lecture et déplace avec lui l’origine de la lumière, sans modifier le contenu."
                />

                <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {accentPositions.map((position) => (
                        <PixieCard
                            key={position.value}
                            variant="accent"
                            color="jaune-lampe"
                            accentPosition={position.value}
                            className="min-h-44"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                {position.name}
                            </p>
                            <p className="mt-4 font-mono text-sm text-ink">
                                accentPosition=&quot;{position.value}&quot;
                            </p>
                        </PixieCard>
                    ))}
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
                        <PixieCard
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
                                href="#pixie-card-playground"
                                variant="action"
                                color="bleu-reperage"
                                indicator="arrow"
                                className="mt-6"
                            >
                                Donner le focus
                            </PixieLink>
                        </PixieCard>
                    ))}
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-3">
                    {effectIntensities.map((intensity) => (
                        <PixieCard
                            key={intensity.value}
                            as="article"
                            variant="outline"
                            color="bleu-reperage"
                            effect="glow"
                            effectIntensity={intensity.value}
                            data-effect-preview="true"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Intensité {intensity.name}
                            </p>
                            <p className="mt-4 font-mono text-sm text-ink">
                                {intensity.value}
                            </p>
                            <p className="mt-3 leading-7 text-ink-soft">
                                {intensity.description}
                            </p>
                        </PixieCard>
                    ))}
                </div>
            </section>

            <section
                id="card-scenarios"
                aria-labelledby="card-scenarios-title"
                className="mt-16 scroll-mt-8"
            >
                <SequenceTitle
                    id="card-scenarios-title"
                    eyebrow="Scénarios préparés"
                    title="Une même surface, cinq rôles sur le plateau"
                    description="Ces compositions préfigurent les contextes réels sans introduire de logique métier dans la primitive."
                />

                <div className="mt-7 grid gap-6 lg:grid-cols-2">
                    <div>
                        <p className="mb-3 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Carte métier actionnable
                        </p>
                        <PixieCard
                            asChild
                            variant="accent"
                            color="rouge-crayon"
                            effect="projector"
                            effectIntensity="medium"
                        >
                            <PixieLink
                                href="#pixie-card-playground"
                                variant="surface"
                                color="rouge-crayon"
                                className="!flex min-h-72 flex-col"
                            >
                                <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                    Personnage
                                </p>
                                <h4 className="mt-4 text-3xl text-ink">
                                    Mickey Mouse
                                </h4>
                                <p className="mt-3 leading-7 text-ink-soft">
                                    Une unité autonome dont toute la surface
                                    conduit vers sa fiche.
                                </p>
                                <span className="mt-auto pt-8 font-medium text-accent">
                                    Ouvrir la fiche →
                                </span>
                            </PixieLink>
                        </PixieCard>
                    </div>

                    <div>
                        <p className="mb-3 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Porte de navigation
                        </p>
                        <PixieCard
                            asChild
                            variant="outline"
                            color="vert-cellulo"
                            effect="projector"
                            effectIntensity="strong"
                        >
                            <PixieLink
                                href="#card-variants"
                                variant="surface"
                                color="vert-cellulo"
                                className="!flex min-h-72 flex-col"
                            >
                                <p className="text-sm text-muted">2 époques</p>
                                <h4 className="mt-4 text-3xl text-ink">
                                    Époques
                                </h4>
                                <p className="mt-3 leading-7 text-ink-soft">
                                    Une entrée majeure reçoit un projecteur plus
                                    franc sans changer de sémantique.
                                </p>
                                <span className="mt-auto pt-8 font-medium text-accent">
                                    Explorer les époques →
                                </span>
                            </PixieLink>
                        </PixieCard>
                    </div>

                    <div>
                        <p className="mb-3 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Relation apparentée
                        </p>
                        <PixieCard
                            as="article"
                            variant="muted"
                            color="bleu-reperage"
                            effect="glow"
                            effectIntensity="subtle"
                            accentPosition="start"
                            className="min-h-64"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Dans le Codex
                            </p>
                            <h4 className="mt-4 text-2xl text-ink">
                                The Band Concert
                            </h4>
                            <p className="mt-3 leading-7 text-ink-soft">
                                La carte reste statique ; seule son action
                                secondaire entre dans le parcours clavier.
                            </p>
                            <PixieLink
                                href="#card-scenarios"
                                variant="action"
                                color="bleu-reperage"
                                indicator="arrow"
                                className="mt-6"
                            >
                                Suivre la relation
                            </PixieLink>
                        </PixieCard>
                    </div>

                    <div>
                        <p className="mb-3 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Contenu éditorial statique
                        </p>
                        <PixieCard
                            as="article"
                            variant="surface"
                            effect="none"
                            padding="lg"
                            className="min-h-64"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Note de production
                            </p>
                            <h4 className="mt-4 text-2xl text-ink">
                                Le décor sait aussi rester immobile
                            </h4>
                            <p className="mt-3 leading-7 text-ink-soft">
                                Sans action ni mouvement, la carte organise une
                                unité éditoriale et laisse toute la hiérarchie
                                au contenu.
                            </p>
                        </PixieCard>
                    </div>

                    <div className="lg:col-span-2">
                        <p className="mb-3 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Carte mise en avant
                        </p>
                        <PixieCard
                            asChild
                            variant="tinted"
                            color="gouache"
                            accentPosition="start"
                            effect="reveal"
                            effectIntensity="medium"
                            padding="xl"
                        >
                            <PixieLink
                                href="#card-accents"
                                variant="surface"
                                color="gouache"
                                className="!grid gap-6 md:grid-cols-[1fr_auto] md:items-end"
                            >
                                <div>
                                    <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                        À l’affiche
                                    </p>
                                    <h4 className="mt-4 text-3xl text-ink">
                                        Blanche-Neige et les Sept Nains
                                    </h4>
                                    <p className="mt-3 max-w-2xl leading-7 text-ink-soft">
                                        Une surface teintée attire l’attention
                                        sans imposer une couleur saturée au
                                        texte.
                                    </p>
                                </div>
                                <span className="font-medium text-accent">
                                    Revoir les accents →
                                </span>
                            </PixieLink>
                        </PixieCard>
                    </div>
                </div>
            </section>

            <section
                id="pixie-card-playground"
                aria-labelledby="card-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="card-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieCard"
                    description="Réglez sa sémantique, sa présence et ses effets ; le code d’utilisation se met à jour avec le rendu."
                />
                <div className="mt-8">
                    <PixieCardPlayground />
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
                            "Racine transmise",
                            "asChild applique la surface à un unique PixieLink sans produire de conteneur supplémentaire.",
                        ],
                        [
                            "Mouvement facultatif",
                            "Les effets disparaissent avec prefers-reduced-motion sans retirer aucune information.",
                        ],
                        [
                            "Couleurs forcées",
                            "La couche lumineuse s’efface tandis qu’un contour système préserve la limite de la carte.",
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
                    description="Les types propres à la Card vivent dans son dossier ; les attributs HTML compatibles sont transmis à sa racine réelle."
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
                    title="Décisions de la version stable"
                    description="Les cinq scénarios de répétition ont validé une API capable de rester neutre ou de porter les effets les plus expressifs du Codex."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Six variantes couvrent les surfaces neutres, secondaires, élevées et colorées.",
                        "asChild transmet le décor à PixieLink sans ajouter de racine au DOM.",
                        "Les effets restent facultatifs et indépendants de la nature de la surface.",
                        "Les deux Lumières conservent leurs contrastes et leurs contours structurels.",
                        "Mouvement réduit et couleurs forcées neutralisent les artifices sans masquer l’état.",
                        "Les cartes métier et les portes pourront désormais adopter PixieCard progressivement.",
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
