import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import {
    PixieDustBackdrop,
    type PixieDustBackdropBase,
    type PixieDustBackdropDirection,
    type PixieDustBackdropIntensity,
    type PixieDustBackdropMotion,
    type PixieDustBackdropPadding,
    type PixieDustBackdropPosition,
    type PixieDustBackdropRadius,
    type PixieDustBackdropSpread,
    type PixieDustBackdropTexture,
    type PixieDustBackdropTextureIntensity,
    type PixieDustBackdropVariant,
} from "@/components/ui/PixieDustBackdrop";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieFrame } from "@/components/ui/PixieFrame";
import { PixieInset } from "@/components/ui/PixieInset";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieDustBackdropPlayground } from "./PixieDustBackdropPlayground";

const variants = [
    {
        name: "Bain",
        value: "wash" as const,
        description: "Une teinte uniforme enveloppe doucement la composition.",
    },
    {
        name: "Dégradé",
        value: "gradient" as const,
        description: "La couleur entre dans le cadre puis se dissipe.",
    },
    {
        name: "Halo",
        value: "halo" as const,
        description: "Une lumière radiale se place derrière le premier plan.",
    },
    {
        name: "Vignette",
        value: "vignette" as const,
        description: "Les bords se ferment pour recentrer le regard.",
    },
    {
        name: "Projecteur",
        value: "projector" as const,
        description: "Un faisceau oblique traverse le fond de scène.",
    },
    {
        name: "Horizon",
        value: "horizon" as const,
        description: "Une ligne lumineuse ouvre la profondeur du décor.",
    },
    {
        name: "Champ / contrechamp",
        value: "split" as const,
        description: "Deux plages colorées se rencontrent dans le cadre.",
    },
    {
        name: "Celluloïd",
        value: "cel" as const,
        description: "Deux aplats translucides se superposent comme des cels.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropVariant;
    description: string;
}>[];

const intensities = [
    { name: "Discrète", value: "subtle" as const, opacity: "44 %" },
    { name: "Moyenne", value: "medium" as const, opacity: "72 %" },
    { name: "Forte", value: "strong" as const, opacity: "100 %" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropIntensity;
    opacity: string;
}>[];

const positions = [
    { name: "Haut · début", value: "top-start" as const },
    { name: "Haut", value: "top" as const },
    { name: "Haut · fin", value: "top-end" as const },
    { name: "Début", value: "start" as const },
    { name: "Centre", value: "center" as const },
    { name: "Fin", value: "end" as const },
    { name: "Bas · début", value: "bottom-start" as const },
    { name: "Bas", value: "bottom" as const },
    { name: "Bas · fin", value: "bottom-end" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropPosition;
}>[];

const directions = [
    { name: "Horizontale", value: "horizontal" as const },
    { name: "Verticale", value: "vertical" as const },
    { name: "Diagonale montante", value: "diagonal-up" as const },
    { name: "Diagonale descendante", value: "diagonal-down" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropDirection;
}>[];

const spreads = [
    { name: "Étroite", value: "narrow" as const },
    { name: "Moyenne", value: "medium" as const },
    { name: "Large", value: "wide" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropSpread;
}>[];

const bases = [
    { name: "Transparente", value: "transparent" as const },
    { name: "Toile", value: "canvas" as const },
    { name: "Surface", value: "surface" as const },
    { name: "Surface atténuée", value: "muted" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropBase;
}>[];

const textures = [
    {
        name: "Aucune",
        value: "none" as const,
        description: "La lumière reste parfaitement nette.",
    },
    {
        name: "Grain",
        value: "grain" as const,
        description: "Une matière de projection couvre le cadre.",
    },
    {
        name: "Poussière",
        value: "dust" as const,
        description: "Quelques particules fixes ponctuent l’atmosphère.",
    },
    {
        name: "Papier",
        value: "paper" as const,
        description: "Des fibres légères rappellent le support d’animation.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropTexture;
    description: string;
}>[];

const textureIntensities = [
    { name: "Discrète", value: "subtle" as const },
    { name: "Moyenne", value: "medium" as const },
    { name: "Forte", value: "strong" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropTextureIntensity;
}>[];

const motions = [
    {
        name: "Immobile",
        value: "none" as const,
        description: "La scène reste fixe par défaut.",
    },
    {
        name: "Dérive",
        value: "drift" as const,
        description: "Les couches se déplacent lentement en sens opposés.",
    },
    {
        name: "Respiration",
        value: "breathe" as const,
        description: "La présence lumineuse varie sans toucher au contenu.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropMotion;
    description: string;
}>[];

const paddings = [
    { name: "Aucun", value: "none" as const, token: "0" },
    { name: "Petit", value: "sm" as const, token: "1 rem" },
    { name: "Moyen", value: "md" as const, token: "1,5 rem" },
    { name: "Grand", value: "lg" as const, token: "2 rem" },
    { name: "Très grand", value: "xl" as const, token: "3 rem" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropPadding;
    token: string;
}>[];

const radii = [
    { name: "Aucun", value: "none" as const },
    { name: "Petit", value: "small" as const },
    { name: "Moyen", value: "medium" as const },
    { name: "Grand", value: "large" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropRadius;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieDustBackdropElement",
        defaultValue: '"div"',
        description: "Élément HTML porté par le fond de scène.",
    },
    {
        name: "variant",
        type: "PixieDustBackdropVariant",
        defaultValue: '"wash"',
        description: "Atmosphère projetée derrière la composition.",
    },
    {
        name: "intensity",
        type: "PixieDustBackdropIntensity",
        defaultValue: '"medium"',
        description: "Présence visuelle de la couche atmosphérique.",
    },
    {
        name: "position",
        type: "PixieDustBackdropPosition",
        defaultValue: '"center"',
        description: "Origine du dégradé, du halo ou du faisceau.",
    },
    {
        name: "direction",
        type: "PixieDustBackdropDirection",
        defaultValue: '"horizontal"',
        description: "Axe suivi par les couches lumineuses.",
    },
    {
        name: "spread",
        type: "PixieDustBackdropSpread",
        defaultValue: '"medium"',
        description: "Étendue de la lumière dans le cadre.",
    },
    {
        name: "padding",
        type: "PixieDustBackdropPadding",
        defaultValue: '"lg"',
        description: "Espace réservé à la composition au premier plan.",
    },
    {
        name: "radius",
        type: "PixieDustBackdropRadius",
        defaultValue: '"none"',
        description: "Arrondi du fond lorsqu’il reste local.",
    },
    {
        name: "color",
        type: "PixieDustBackdropColor",
        defaultValue: "false",
        description: "Couleur du registre ou accent courant du thème.",
    },
    {
        name: "secondaryColor",
        type: "PixieDustBackdropColor",
        defaultValue: "false",
        description:
            "Seconde couleur, dérivée de la première lorsqu’elle est absente.",
    },
    {
        name: "base",
        type: "PixieDustBackdropBase",
        defaultValue: '"surface"',
        description:
            "Surface neutre installée sous les couches atmosphériques.",
    },
    {
        name: "texture",
        type: "PixieDustBackdropTexture",
        defaultValue: '"none"',
        description: "Matière décorative superposée au fond.",
    },
    {
        name: "textureIntensity",
        type: "PixieDustBackdropTextureIntensity",
        defaultValue: '"medium"',
        description: "Présence de la matière sans modifier la lumière.",
    },
    {
        name: "motion",
        type: "PixieDustBackdropMotion",
        defaultValue: '"none"',
        description:
            "Animation atmosphérique facultative des couches décoratives.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Composition maintenue au premier plan.",
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
        name: "PixieDustBackdropElement",
        values: ['"div"', '"section"', '"header"', '"footer"'],
        description: "Structures de composition autorisées.",
    },
    {
        name: "PixieDustBackdropVariant",
        values: [
            '"wash"',
            '"gradient"',
            '"halo"',
            '"vignette"',
            '"projector"',
            '"horizon"',
            '"split"',
            '"cel"',
        ],
        description: "Atmosphères disponibles derrière le contenu.",
    },
    {
        name: "PixieDustBackdropIntensity",
        values: ['"subtle"', '"medium"', '"strong"'],
        description: "Niveaux de présence de l’effet.",
    },
    {
        name: "PixieDustBackdropPosition",
        values: [
            '"top-start"',
            '"top"',
            '"top-end"',
            '"start"',
            '"center"',
            '"end"',
            '"bottom-start"',
            '"bottom"',
            '"bottom-end"',
        ],
        description: "Neuf origines possibles dans le cadre.",
    },
    {
        name: "PixieDustBackdropDirection",
        values: [
            '"horizontal"',
            '"vertical"',
            '"diagonal-up"',
            '"diagonal-down"',
        ],
        description: "Axes de progression de l’atmosphère.",
    },
    {
        name: "PixieDustBackdropSpread",
        values: ['"narrow"', '"medium"', '"wide"'],
        description: "Largeurs relatives du foyer lumineux.",
    },
    {
        name: "PixieDustBackdropPadding",
        values: ['"none"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Densités intérieures de la composition.",
    },
    {
        name: "PixieDustBackdropRadius",
        values: ['"none"', '"small"', '"medium"', '"large"'],
        description: "Rayons disponibles dans la Projection Originale.",
    },
    {
        name: "PixieDustBackdropColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Couleur enregistrée ou accent courant du thème.",
    },
    {
        name: "PixieDustBackdropBase",
        values: ['"transparent"', '"canvas"', '"surface"', '"muted"'],
        description: "Surfaces neutres sous la projection.",
    },
    {
        name: "PixieDustBackdropTexture",
        values: ['"none"', '"grain"', '"dust"', '"paper"'],
        description: "Matières décoratives disponibles.",
    },
    {
        name: "PixieDustBackdropTextureIntensity",
        values: ['"subtle"', '"medium"', '"strong"'],
        description: "Niveaux de présence de la matière.",
    },
    {
        name: "PixieDustBackdropMotion",
        values: ['"none"', '"drift"', '"breathe"'],
        description: "Mouvements facultatifs, neutralisés en mouvement réduit.",
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

function ArchiveCard({
    title,
    year,
}: Readonly<{ title: string; year: string }>) {
    return (
        <PixieCard
            as="div"
            variant="outline"
            padding="md"
            className="backdrop-blur-[2px]"
        >
            <p className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                Archive · {year}
            </p>
            <h4 className="mt-2 text-xl text-ink">{title}</h4>
        </PixieCard>
    );
}

export function PixieDustBackdropDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-backdrop"
            labelledBy="pixie-dust-backdrop-title"
            nom="PixieDustBackdrop"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Décor 006
                        </p>
                        <h2
                            id="pixie-dust-backdrop-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustBackdrop
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Installer un fond de scène atmosphérique derrière
                            une composition sans remplacer ses surfaces.
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
            <section aria-labelledby="backdrop-identity" className="mt-14">
                <SequenceTitle
                    id="backdrop-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Le Backdrop enveloppe plusieurs éléments dans une même ambiance. Ses couches restent décoratives, séparées du contenu et toujours placées derrière le récit."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Installer une atmosphère de composition."],
                        [
                            "Usage",
                            "Ouvertures de section, héros éditoriaux et groupes de cartes.",
                        ],
                        [
                            "Limite",
                            "Ne porte ni donnée, ni interaction, ni statut par son effet.",
                        ],
                        [
                            "Anatomie",
                            "Une base, deux couches lumineuses, une texture facultative et le contenu.",
                        ],
                        [
                            "Accessibilité",
                            "Le décor est masqué aux technologies d’assistance et respecte le mouvement réduit.",
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
                aria-labelledby="backdrop-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="backdrop-master"
                    eyebrow="Plan maître"
                    title="Deux celluloïds ouvrent la prochaine séquence"
                    description="Le plan de référence superpose deux couleurs et une matière légère derrière plusieurs archives, sans modifier leurs propres surfaces."
                />

                <div className="mt-7 grid border border-line xl:grid-cols-2">
                    <div className="bg-canvas p-8">
                        <PixieDustBackdrop
                            variant="cel"
                            intensity="strong"
                            position="top-start"
                            direction="diagonal-down"
                            spread="wide"
                            color="ambre-projecteur"
                            secondaryColor="violet-ombre-portee"
                            base="surface"
                            padding="xl"
                            radius="large"
                            texture="grain"
                            textureIntensity="subtle"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Les premières images
                            </p>
                            <h4 className="mt-3 max-w-xl text-3xl text-ink">
                                Les origines retrouvent leur lumière
                            </h4>
                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                <ArchiveCard
                                    title="Alice’s Wonderland"
                                    year="1923"
                                />
                                <ArchiveCard
                                    title="Trolley Troubles"
                                    year="1927"
                                />
                            </div>
                        </PixieDustBackdrop>
                    </div>
                    <CodeExample>{`<PixieDustBackdrop
    variant="cel"
    intensity="strong"
    position="top-start"
    direction="diagonal-down"
    spread="wide"
    color="ambre-projecteur"
    secondaryColor="violet-ombre-portee"
    base="surface"
    padding="xl"
    radius="large"
    texture="grain"
    textureIntensity="subtle"
>
    {/* Titre et surfaces au premier plan */}
</PixieDustBackdrop>`}</CodeExample>
                </div>
            </section>

            <section
                id="backdrop-variants"
                aria-labelledby="backdrop-variants-title"
                className="mt-16 scroll-mt-8"
            >
                <SequenceTitle
                    id="backdrop-variants-title"
                    eyebrow="Direction artistique"
                    title="Huit atmosphères pour ouvrir le décor"
                    description="Chaque variant transforme uniquement l’arrière-plan ; le contenu et sa lisibilité conservent la même structure."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {variants.map((variant) => (
                        <PixieDustBackdrop
                            key={variant.value}
                            variant={variant.value}
                            color="violet-ombre-portee"
                            padding="lg"
                            radius="medium"
                            className="min-h-64"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                {variant.name}
                            </p>
                            <h4 className="mt-2 text-2xl text-ink">
                                {variant.value}
                            </h4>
                            <p className="mt-4 max-w-md leading-7 text-ink-soft">
                                {variant.description}
                            </p>
                        </PixieDustBackdrop>
                    ))}
                </div>
            </section>

            <section aria-labelledby="backdrop-intensity" className="mt-16">
                <SequenceTitle
                    id="backdrop-intensity"
                    eyebrow="Dosage de la lumière"
                    title="Trois intensités sans changer le contraste"
                    description="L’intensité agit sur l’opacité de la couche décorative. Les encres restent toujours celles de la Lumière active."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-3">
                    {intensities.map((intensity) => (
                        <PixieDustBackdrop
                            key={intensity.value}
                            variant="halo"
                            intensity={intensity.value}
                            color="bleu-reperage"
                            padding="lg"
                            radius="medium"
                            className="min-h-56"
                        >
                            <p className="font-mono text-xs text-accent">
                                intensity=&quot;{intensity.value}&quot;
                            </p>
                            <h4 className="mt-3 text-xl text-ink">
                                {intensity.name}
                            </h4>
                            <p className="mt-3 text-sm text-ink-soft">
                                Opacité de scène · {intensity.opacity}
                            </p>
                        </PixieDustBackdrop>
                    ))}
                </div>
            </section>

            <section aria-labelledby="backdrop-position" className="mt-16">
                <SequenceTitle
                    id="backdrop-position"
                    eyebrow="Placement du projecteur"
                    title="La lumière trouve neuf foyers dans le cadre"
                    description="La position déplace le foyer sur les deux axes sans réordonner le contenu ni changer sa lecture."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 sm:grid-cols-2 xl:grid-cols-3">
                    {positions.map((position) => (
                        <PixieDustBackdrop
                            key={position.value}
                            variant="projector"
                            position={position.value}
                            color="ambre-projecteur"
                            padding="lg"
                            radius="medium"
                            className="min-h-56"
                        >
                            <p className="font-mono text-xs text-accent">
                                position=&quot;{position.value}&quot;
                            </p>
                            <h4 className="mt-3 text-xl text-ink">
                                {position.name}
                            </h4>
                        </PixieDustBackdrop>
                    ))}
                </div>
            </section>

            <section aria-labelledby="backdrop-direction" className="mt-16">
                <SequenceTitle
                    id="backdrop-direction"
                    eyebrow="Trajectoire de la lumière"
                    title="Quatre directions et trois ouvertures de champ"
                    description="La direction règle l’axe des couches tandis que l’étendue resserre ou élargit leur présence."
                />

                <div className="mt-7 grid gap-8 xl:grid-cols-[1.35fr_1fr]">
                    <div className="grid gap-5 bg-canvas p-6 sm:grid-cols-2">
                        {directions.map((direction) => (
                            <PixieDustBackdrop
                                key={direction.value}
                                variant="projector"
                                direction={direction.value}
                                spread="medium"
                                color="ambre-projecteur"
                                padding="lg"
                                radius="medium"
                                className="min-h-52"
                            >
                                <p className="font-mono text-xs text-accent">
                                    direction=&quot;{direction.value}&quot;
                                </p>
                                <h4 className="mt-3 text-xl text-ink">
                                    {direction.name}
                                </h4>
                            </PixieDustBackdrop>
                        ))}
                    </div>

                    <div className="grid gap-5 bg-canvas p-6">
                        {spreads.map((spread) => (
                            <PixieDustBackdrop
                                key={spread.value}
                                variant="horizon"
                                spread={spread.value}
                                color="bleu-reperage"
                                padding="md"
                                radius="medium"
                                className="min-h-36"
                            >
                                <p className="font-mono text-xs text-accent">
                                    spread=&quot;{spread.value}&quot;
                                </p>
                                <h4 className="mt-2 text-lg text-ink">
                                    {spread.name}
                                </h4>
                            </PixieDustBackdrop>
                        ))}
                    </div>
                </div>
            </section>

            <section aria-labelledby="backdrop-colors" className="mt-16">
                <SequenceTitle
                    id="backdrop-colors"
                    eyebrow="Toile et couleurs"
                    title="Une base stable sous un dialogue coloré"
                    description="La base reste issue de Projection Originale. Les deux couleurs de l’Atelier d’animation composent ensuite le climat éditorial."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 sm:grid-cols-2 xl:grid-cols-4">
                    {bases.map((base) => (
                        <PixieDustBackdrop
                            key={base.value}
                            variant="split"
                            color="corail-cel"
                            secondaryColor="turquoise-acetate"
                            base={base.value}
                            padding="lg"
                            radius="medium"
                            className="min-h-52"
                        >
                            <p className="font-mono text-xs text-accent">
                                base=&quot;{base.value}&quot;
                            </p>
                            <h4 className="mt-3 text-xl text-ink">
                                {base.name}
                            </h4>
                        </PixieDustBackdrop>
                    ))}
                </div>
            </section>

            <section aria-labelledby="backdrop-textures" className="mt-16">
                <SequenceTitle
                    id="backdrop-textures"
                    eyebrow="Matière de projection"
                    title="Quatre finitions, trois degrés de présence"
                    description="La texture est indépendante de la lumière, reste silencieuse et disparaît lorsque le mode de contraste l’exige."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 sm:grid-cols-2 xl:grid-cols-4">
                    {textures.map((texture, index) => (
                        <PixieDustBackdrop
                            key={texture.value}
                            variant="gradient"
                            color="vert-cellulo"
                            padding="lg"
                            radius="medium"
                            texture={texture.value}
                            textureIntensity={
                                textureIntensities[
                                    index % textureIntensities.length
                                ].value
                            }
                            className="min-h-64"
                        >
                            <p className="font-mono text-xs text-accent">
                                texture=&quot;{texture.value}&quot;
                            </p>
                            <h4 className="mt-3 text-2xl text-ink">
                                {texture.name}
                            </h4>
                            <p className="mt-4 text-sm leading-6 text-ink-soft">
                                {texture.description}
                            </p>
                        </PixieDustBackdrop>
                    ))}
                </div>
            </section>

            <section aria-labelledby="backdrop-motion" className="mt-16">
                <SequenceTitle
                    id="backdrop-motion"
                    eyebrow="Mouvement atmosphérique"
                    title="La scène reste immobile tant qu’on ne l’anime pas"
                    description="Deux mouvements lents peuvent enrichir une ouverture exceptionnelle. Ils sont automatiquement neutralisés lorsque le public demande moins d’animation."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-3">
                    {motions.map((motion) => (
                        <PixieDustBackdrop
                            key={motion.value}
                            variant="cel"
                            color="ambre-projecteur"
                            secondaryColor="violet-ombre-portee"
                            motion={motion.value}
                            texture="dust"
                            textureIntensity="subtle"
                            padding="lg"
                            radius="medium"
                            className="min-h-56"
                        >
                            <p className="font-mono text-xs text-accent">
                                motion=&quot;{motion.value}&quot;
                            </p>
                            <h4 className="mt-3 text-xl text-ink">
                                {motion.name}
                            </h4>
                            <p className="mt-3 text-sm leading-6 text-ink-soft">
                                {motion.description}
                            </p>
                        </PixieDustBackdrop>
                    ))}
                </div>
            </section>

            <section aria-labelledby="backdrop-composition" className="mt-16">
                <SequenceTitle
                    id="backdrop-composition"
                    eyebrow="Premier plan"
                    title="Les surfaces conservent leurs propres rôles"
                    description="Backdrop installe le climat général tandis que Card, Panel et Frame continuent de porter la matière visible."
                />

                <PixieDustBackdrop
                    variant="halo"
                    intensity="strong"
                    color="indigo-nuit-studio"
                    padding="xl"
                    radius="large"
                    texture="grain"
                    textureIntensity="subtle"
                    className="mt-7"
                >
                    <div className="grid gap-6 xl:grid-cols-3">
                        <PixieCard as="div" variant="elevated" padding="md">
                            <p className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                                Card
                            </p>
                            <h4 className="mt-2 text-xl text-ink">
                                Une archive autonome
                            </h4>
                        </PixieCard>

                        <PixiePanel as="div" variant="outline" padding="md">
                            <p className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                                Panel
                            </p>
                            <h4 className="mt-2 text-xl text-ink">
                                Une région structurée
                            </h4>
                        </PixiePanel>

                        <PixieFrame
                            as="div"
                            variant="outline"
                            padding="sm"
                            aspect="landscape"
                        >
                            <div className="flex h-full min-h-32 items-center justify-center bg-surface-muted">
                                <p className="text-sm text-muted">
                                    Frame · Média
                                </p>
                            </div>
                        </PixieFrame>
                    </div>
                </PixieDustBackdrop>
            </section>

            <section aria-labelledby="backdrop-scenarios" className="mt-16">
                <SequenceTitle
                    id="backdrop-scenarios"
                    eyebrow="Scénarios préparés"
                    title="Huit décors pour éprouver la composition"
                    description="Ces plans couvrent les ouvertures, les collections, les raccords documentaires et les régions longues avant toute promotion du composant."
                />

                <div className="mt-7 grid gap-8">
                    <PixieDustBackdrop
                        as="header"
                        variant="cel"
                        intensity="strong"
                        position="top-start"
                        direction="diagonal-down"
                        spread="wide"
                        color="ambre-projecteur"
                        secondaryColor="violet-ombre-portee"
                        base="canvas"
                        padding="xl"
                        texture="paper"
                        textureIntensity="subtle"
                    >
                        <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                            Accueil · Ouverture
                        </p>
                        <h4 className="mt-3 max-w-3xl text-4xl text-ink sm:text-5xl">
                            Chaque archive attend que le projecteur la révèle
                        </h4>
                        <p className="mt-5 max-w-2xl leading-7 text-ink-soft">
                            Un héros ample conserve une base lisible pendant que
                            deux couleurs installent l’identité du récit.
                        </p>
                    </PixieDustBackdrop>

                    <div className="grid gap-8 xl:grid-cols-2">
                        <PixieDustBackdrop
                            as="section"
                            aria-labelledby="backdrop-scenario-index"
                            variant="gradient"
                            position="start"
                            direction="horizontal"
                            color="rouge-crayon"
                            base="surface"
                            padding="lg"
                            radius="large"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Index · Introduction
                            </p>
                            <h4
                                id="backdrop-scenario-index"
                                className="mt-3 text-3xl text-ink"
                            >
                                Les personnages
                            </h4>
                            <p className="mt-4 leading-7 text-ink-soft">
                                Une seule couleur de famille suffit à donner le
                                ton sans devenir une métadonnée.
                            </p>
                        </PixieDustBackdrop>

                        <PixieDustBackdrop
                            as="section"
                            aria-labelledby="backdrop-scenario-epoch"
                            variant="horizon"
                            position="bottom"
                            spread="wide"
                            color="bleu-reperage"
                            base="muted"
                            padding="lg"
                            radius="large"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Époque · Raccord
                            </p>
                            <h4
                                id="backdrop-scenario-epoch"
                                className="mt-3 text-3xl text-ink"
                            >
                                Le temps des pionniers
                            </h4>
                            <p className="mt-4 leading-7 text-ink-soft">
                                L’horizon marque une transition temporelle sans
                                ajouter de séparateur structurel.
                            </p>
                        </PixieDustBackdrop>
                    </div>

                    <PixieDustBackdrop
                        as="section"
                        aria-labelledby="backdrop-scenario-collection"
                        variant="projector"
                        position="top-end"
                        direction="diagonal-up"
                        spread="wide"
                        color="ambre-projecteur"
                        base="canvas"
                        padding="xl"
                        radius="large"
                    >
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Collection · Cartes métier
                        </p>
                        <h4
                            id="backdrop-scenario-collection"
                            className="mt-3 text-3xl text-ink"
                        >
                            Les archives entrent dans le champ
                        </h4>
                        <div className="mt-7 grid gap-4 sm:grid-cols-3">
                            <ArchiveCard title="Plane Crazy" year="1928" />
                            <ArchiveCard
                                title="The Skeleton Dance"
                                year="1929"
                            />
                            <ArchiveCard
                                title="Flowers and Trees"
                                year="1932"
                            />
                        </div>
                    </PixieDustBackdrop>

                    <PixieDustBackdrop
                        variant="cel"
                        color="vert-cellulo"
                        secondaryColor="turquoise-acetate"
                        base="surface"
                        padding="xl"
                        radius="large"
                        texture="grain"
                        textureIntensity="subtle"
                    >
                        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                            <PixiePanel
                                as="section"
                                variant="outline"
                                padding="lg"
                                header={
                                    <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                        Panel · Premier plan
                                    </p>
                                }
                            >
                                <h4 className="text-2xl text-ink">
                                    Une région structurée garde son rôle
                                </h4>
                                <p className="mt-4 leading-7 text-ink-soft">
                                    Le Backdrop compose l’ambiance ; le Panel
                                    organise toujours le contenu.
                                </p>
                            </PixiePanel>
                            <PixieInset
                                as="aside"
                                variant="recessed"
                                depth="medium"
                                padding="lg"
                            >
                                <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                    Inset · Note secondaire
                                </p>
                                <p className="mt-3 leading-7 text-ink-soft">
                                    Une information complémentaire conserve sa
                                    propre profondeur.
                                </p>
                            </PixieInset>
                        </div>
                    </PixieDustBackdrop>

                    <div className="grid gap-8 xl:grid-cols-2">
                        <PixieDustBackdrop
                            as="section"
                            aria-labelledby="backdrop-scenario-empty"
                            variant="wash"
                            color="graphite"
                            base="muted"
                            padding="xl"
                            radius="large"
                            className="text-center"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Recherche · Aucun résultat
                            </p>
                            <h4
                                id="backdrop-scenario-empty"
                                className="mt-3 text-3xl text-ink"
                            >
                                La pellicule est vide
                            </h4>
                            <p className="mx-auto mt-4 max-w-md leading-7 text-ink-soft">
                                Le décor soutient l’état vide sans porter seul
                                son sens.
                            </p>
                        </PixieDustBackdrop>

                        <PixieDustBackdrop
                            as="footer"
                            variant="vignette"
                            color="indigo-nuit-studio"
                            base="canvas"
                            padding="xl"
                            radius="large"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Générique · Dernière image
                            </p>
                            <h4 className="mt-3 text-3xl text-ink">
                                Les lumières peuvent baisser
                            </h4>
                            <p className="mt-4 leading-7 text-ink-soft">
                                Une vignette referme calmement la séquence.
                            </p>
                        </PixieDustBackdrop>
                    </div>

                    <PixieDustBackdrop
                        as="section"
                        aria-labelledby="backdrop-scenario-long"
                        variant="split"
                        position="bottom-end"
                        direction="diagonal-down"
                        spread="wide"
                        color="corail-cel"
                        secondaryColor="bleu-reperage"
                        base="surface"
                        padding="xl"
                        radius="large"
                        texture="paper"
                        textureIntensity="subtle"
                    >
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Épreuve · Contenu long et focus
                        </p>
                        <h4
                            id="backdrop-scenario-long"
                            className="mt-3 text-3xl text-ink"
                        >
                            Le récit reste au premier plan
                        </h4>
                        <div className="mt-5 max-w-3xl space-y-4 leading-7 text-ink-soft">
                            <p>
                                Plusieurs paragraphes vérifient que les couches
                                ne gênent ni la lecture, ni la sélection du
                                texte, ni l’allongement naturel de la région.
                            </p>
                            <p>
                                Les éléments focusables doivent également
                                conserver leur halo complet, y compris au bord
                                du rayon et sous une texture forte.
                            </p>
                        </div>
                        <div className="mt-7 flex flex-wrap gap-5">
                            <a
                                href="#pixie-dust-backdrop-playground"
                                className="font-medium text-accent underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
                            >
                                Ouvrir la régie
                            </a>
                            <a
                                href="#backdrop-accessibility"
                                className="font-medium text-ink underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
                            >
                                Lire les règles d’accessibilité
                            </a>
                        </div>
                    </PixieDustBackdrop>
                </div>
            </section>

            <section aria-labelledby="backdrop-construction" className="mt-16">
                <SequenceTitle
                    id="backdrop-construction"
                    eyebrow="Construction du décor"
                    title="Espacements et rayons cadrent l’atmosphère"
                    description="Le fond peut occuper une section entière ou rester local autour d’un groupe resserré."
                />

                <div className="mt-7 grid gap-8 xl:grid-cols-2">
                    <div>
                        <h4 className="text-xl text-ink">Espacements</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {paddings.map((padding) => (
                                <PixieDustBackdrop
                                    key={padding.value}
                                    variant="wash"
                                    color="corail-cel"
                                    padding={padding.value}
                                    radius="small"
                                    className="min-h-28"
                                >
                                    <div className="bg-surface p-3">
                                        <p className="font-mono text-xs text-accent">
                                            {padding.value} · {padding.token}
                                        </p>
                                    </div>
                                </PixieDustBackdrop>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl text-ink">Rayons</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {radii.map((radius) => (
                                <PixieDustBackdrop
                                    key={radius.value}
                                    variant="gradient"
                                    color="turquoise-acetate"
                                    padding="md"
                                    radius={radius.value}
                                    className="min-h-28"
                                >
                                    <p className="font-mono text-xs text-accent">
                                        radius=&quot;{radius.value}&quot;
                                    </p>
                                    <p className="mt-3 text-sm text-ink-soft">
                                        {radius.name}
                                    </p>
                                </PixieDustBackdrop>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="pixie-dust-backdrop-playground"
                aria-labelledby="backdrop-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="backdrop-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieDustBackdrop"
                    description="Réglez ses couches, leur trajectoire, leur matière et leur mouvement ; le code d’utilisation suit chaque changement."
                />
                <div className="mt-8">
                    <PixieDustBackdropPlayground />
                </div>
            </section>

            <section
                aria-labelledby="backdrop-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="backdrop-accessibility"
                    eyebrow="Accessibilité"
                    title="L’atmosphère reste silencieuse"
                    description="La sémantique vient de l’élément et du contenu. Les couches de lumière ne sont jamais exposées ni utilisées comme information."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Simple composition",
                            'Employer as="div" lorsque le fond ne structure pas le document.',
                        ],
                        [
                            "Section nommée",
                            'Associer as="section" à un titre visible, aria-labelledby ou aria-label.',
                        ],
                        [
                            "Repères natifs",
                            "Conserver header et footer uniquement lorsqu’ils décrivent réellement la page.",
                        ],
                        [
                            "Focus",
                            "La couche atmosphérique possède son propre écrin afin de ne jamais rogner le halo des contrôles contenus.",
                        ],
                        [
                            "Contraste",
                            "Les encres du thème restent inchangées quelle que soit l’intensité choisie.",
                        ],
                        [
                            "Contraste forcé",
                            "Supprimer atmosphère et texture pour laisser la structure native apparaître.",
                        ],
                        [
                            "Mouvement réduit",
                            "Neutraliser dérive et respiration sans demander de configuration supplémentaire.",
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
                aria-labelledby="backdrop-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="backdrop-technical"
                    eyebrow="Générique technique"
                    title="API de l’esquisse"
                    description="Les types spécifiques sont colocalisés dans PixieDustBackdrop.types.ts et les attributs HTML compatibles sont transmis à l’élément rendu."
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

            <section aria-labelledby="backdrop-journal" className="mt-16">
                <SequenceTitle
                    id="backdrop-journal"
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="L’esquisse doit prouver qu’elle enrichit les compositions sans concurrencer les effets propres aux autres Décors."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Éprouver les huit atmosphères dans les deux Lumières et sur plusieurs largeurs.",
                        "Comparer projector au halo interactif des Cards sans confondre leurs responsabilités.",
                        "Vérifier que split et cel justifient réellement une seconde couleur.",
                        "Vérifier les trois textures à 200 % de zoom et en contraste forcé.",
                        "Tester les contenus longs et les contrôles focusables au-dessus des couches.",
                        "Comparer dérive et respiration avec le composant Loader en mouvement réduit.",
                        "Décider si les neuf positions restent toutes utiles après les scénarios métier.",
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
