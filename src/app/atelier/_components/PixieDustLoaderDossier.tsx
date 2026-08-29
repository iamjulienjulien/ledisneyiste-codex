import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieButton } from "@/components/ui/PixieButton";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieStack } from "@/components/ui/PixieStack";
import {
    PixieDustLoader,
    type PixieDustLoaderDirection,
    type PixieDustLoaderIntensity,
    type PixieDustLoaderLabelPosition,
    type PixieDustLoaderLayout,
    type PixieDustLoaderMotion,
    type PixieDustLoaderSize,
    type PixieDustLoaderSpeed,
    type PixieDustLoaderVariant,
} from "@/components/ui/PixieDustLoader";
import type { AtelierAnimationColorSlug } from "@/types/colors";
import { PixieDustLoaderPlayground } from "./PixieDustLoaderPlayground";

const variants = [
    {
        value: "sparkle",
        name: "Étincelles",
        role: "Une poussière lumineuse accompagne les attentes générales.",
    },
    {
        value: "reel",
        name: "Bobine",
        role: "La pellicule tourne pendant la préparation d’une projection.",
    },
    {
        value: "beam",
        name: "Faisceau",
        role: "Un rayon cherche la prochaine image dans l’obscurité.",
    },
    {
        value: "iris",
        name: "Iris",
        role: "Le diaphragme ouvre et referme doucement la prochaine scène.",
    },
    {
        value: "cel",
        name: "Cellulos",
        role: "Trois feuilles retrouvent ensemble leurs repères d’animation.",
    },
    {
        value: "flipbook",
        name: "Folioscope",
        role: "Les pages se soulèvent pour remettre le dessin en mouvement.",
    },
    {
        value: "filmstrip",
        name: "Pellicule",
        role: "Une bande de film avance image après image dans son couloir.",
    },
    {
        value: "orbit",
        name: "Orbite",
        role: "Une nuée de poussières de fée gravite autour d’un cœur lumineux.",
    },
    {
        value: "dots",
        name: "Trois points",
        role: "Une attente compacte pensée pour les boutons et les champs.",
    },
] as const satisfies readonly Readonly<{
    value: PixieDustLoaderVariant;
    name: string;
    role: string;
}>[];

const sizes = [
    { value: "xs", name: "Très petite", dimension: "16 px" },
    { value: "sm", name: "Petite", dimension: "24 px" },
    { value: "md", name: "Moyenne", dimension: "40 px" },
    { value: "lg", name: "Grande", dimension: "56 px" },
    { value: "xl", name: "Très grande", dimension: "80 px" },
] as const satisfies readonly Readonly<{
    value: PixieDustLoaderSize;
    name: string;
    dimension: string;
}>[];

const speeds = [
    { value: "slow", name: "Lente", duration: "2,7 s" },
    { value: "normal", name: "Normale", duration: "1,8 s" },
    { value: "fast", name: "Rapide", duration: "1,1 s" },
] as const satisfies readonly Readonly<{
    value: PixieDustLoaderSpeed;
    name: string;
    duration: string;
}>[];

const layouts = [
    {
        value: "inline",
        name: "En ligne",
        role: "Le mouvement précède le message sur le même axe.",
    },
    {
        value: "stacked",
        name: "Empilée",
        role: "Le message se place sous le centre de la projection.",
    },
] as const satisfies readonly Readonly<{
    value: PixieDustLoaderLayout;
    name: string;
    role: string;
}>[];

const intensities = [
    {
        value: "subtle",
        name: "Discrète",
        role: "Quatre poussières et une lumière retenue.",
    },
    {
        value: "normal",
        name: "Présente",
        role: "Neuf poussières composent la chorégraphie courante.",
    },
    {
        value: "strong",
        name: "Féérique",
        role: "Les seize poussières traversent pleinement la scène.",
    },
] as const satisfies readonly Readonly<{
    value: PixieDustLoaderIntensity;
    name: string;
    role: string;
}>[];

const motions = [
    {
        value: "expressive",
        name: "Expressif",
        role: "La chorégraphie complète raconte la matière choisie.",
    },
    {
        value: "gentle",
        name: "Doux",
        role: "Le signe respire sans rotation ni grand déplacement.",
    },
    {
        value: "static",
        name: "Fixe",
        role: "L’emblème conserve sa forme sans aucune animation.",
    },
] as const satisfies readonly Readonly<{
    value: PixieDustLoaderMotion;
    name: string;
    role: string;
}>[];

const directions = [
    "forward",
    "reverse",
] as const satisfies readonly PixieDustLoaderDirection[];

const labelPositions = [
    "before",
    "after",
] as const satisfies readonly PixieDustLoaderLabelPosition[];

const colors = [
    { value: "ambre-projecteur", label: "Projecteur" },
    { value: "bleu-reperage", label: "Repérage" },
    { value: "vert-cellulo", label: "Cellulo" },
    { value: "gouache", label: "Gouache" },
] as const satisfies readonly Readonly<{
    value: AtelierAnimationColorSlug;
    label: string;
}>[];

const properties = [
    {
        name: "label",
        type: "ReactNode",
        defaultValue: '"Chargement en cours"',
        description: "Message visible et annoncé pendant l’attente.",
    },
    {
        name: "description",
        type: "ReactNode",
        defaultValue: "—",
        description:
            "Précision facultative affichée sous le message principal.",
    },
    {
        name: "labelHidden",
        type: "boolean",
        defaultValue: "false",
        description: "Masque visuellement le label sans le retirer.",
    },
    {
        name: "variant",
        type: "PixieDustLoaderVariant",
        defaultValue: '"sparkle"',
        description: "Chorégraphie magique de l’attente.",
    },
    {
        name: "size",
        type: "PixieDustLoaderSize | number",
        defaultValue: '"md"',
        description: "Dimension extérieure du signe animé.",
    },
    {
        name: "speed",
        type: "PixieDustLoaderSpeed",
        defaultValue: '"normal"',
        description: "Cadence de la chorégraphie.",
    },
    {
        name: "duration",
        type: "number",
        defaultValue: "—",
        description: "Durée personnalisée du cycle, en millisecondes.",
    },
    {
        name: "layout",
        type: "PixieDustLoaderLayout",
        defaultValue: '"stacked"',
        description: "Position du label autour du signe.",
    },
    {
        name: "labelPosition",
        type: "PixieDustLoaderLabelPosition",
        defaultValue: '"after"',
        description: "Place le texte avant ou après le signe animé.",
    },
    {
        name: "intensity",
        type: "PixieDustLoaderIntensity",
        defaultValue: '"normal"',
        description: "Règle la lumière et la quantité de poussière de fée.",
    },
    {
        name: "motion",
        type: "PixieDustLoaderMotion",
        defaultValue: '"expressive"',
        description: "Choisit une chorégraphie complète, douce ou fixe.",
    },
    {
        name: "direction",
        type: "PixieDustLoaderDirection",
        defaultValue: '"forward"',
        description: "Lit la chorégraphie en avant ou en sens inverse.",
    },
    {
        name: "color",
        type: "PixieDustLoaderColor",
        defaultValue: '"ambre-projecteur"',
        description: "Couleur du registre ou couleur héritée.",
    },
    {
        name: "secondaryColor",
        type: "PixieDustLoaderColor",
        defaultValue: "false",
        description:
            "Seconde lumière employée par les détails et les poussières.",
    },
    {
        name: "active",
        type: "boolean",
        defaultValue: "true",
        description: "Retire entièrement le loader lorsqu’il vaut false.",
    },
    {
        name: "reserveSpace",
        type: "boolean",
        defaultValue: "false",
        description:
            "Conserve silencieusement sa géométrie lorsqu’il est inactif.",
    },
    {
        name: "delay",
        type: "number",
        defaultValue: "0",
        description: "Retarde visuellement l’apparition en millisecondes.",
    },
    {
        name: "decorative",
        type: "boolean",
        defaultValue: "false",
        description: "Masque le loader et son label aux aides techniques.",
    },
    {
        name: "ariaLive",
        type: "PixieDustLoaderAriaLive",
        defaultValue: '"polite"',
        description: "Règle la priorité d’annonce de la région status.",
    },
    {
        name: "ariaAtomic",
        type: "boolean",
        defaultValue: "true",
        description:
            "Demande l’annonce du message complet lors d’une mise à jour.",
    },
    {
        name: "ariaControls",
        type: "string",
        defaultValue: "—",
        description:
            "Relie l’attente à la région dont elle accompagne le chargement.",
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
        name: "PixieDustLoaderVariant",
        values: variants.map(({ value }) => `"${value}"`),
        description: "Neuf métaphores de l’attente indéterminée.",
    },
    {
        name: "PixieDustLoaderSize",
        values: sizes.map(({ value }) => `"${value}"`),
        description: "Cinq dimensions du signe animé.",
    },
    {
        name: "PixieDustLoaderSpeed",
        values: speeds.map(({ value }) => `"${value}"`),
        description: "Trois cadences de projection.",
    },
    {
        name: "PixieDustLoaderLayout",
        values: layouts.map(({ value }) => `"${value}"`),
        description: "Deux compositions du signe et de son label.",
    },
    {
        name: "PixieDustLoaderLabelPosition",
        values: labelPositions.map((value) => `"${value}"`),
        description: "Deux ordres possibles entre le signe et son message.",
    },
    {
        name: "PixieDustLoaderIntensity",
        values: intensities.map(({ value }) => `"${value}"`),
        description: "Trois densités de lumière et de poussière.",
    },
    {
        name: "PixieDustLoaderMotion",
        values: motions.map(({ value }) => `"${value}"`),
        description: "Trois amplitudes de mouvement intentionnelles.",
    },
    {
        name: "PixieDustLoaderDirection",
        values: directions.map((value) => `"${value}"`),
        description: "Deux sens de lecture de la chorégraphie.",
    },
    {
        name: "PixieDustLoaderAriaLive",
        values: ['"polite"', '"assertive"', '"off"'],
        description: "Trois priorités d’annonce du statut.",
    },
    {
        name: "PixieDustLoaderColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Couleur du registre ou héritée du contexte.",
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
        <div className="flex min-h-48 items-center justify-center border border-dashed border-line-strong bg-canvas p-5 sm:p-8">
            {children}
        </div>
    );
}

export function PixieDustLoaderDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-loader"
            labelledBy="pixie-dust-loader-title"
            nom="PixieDustLoader"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Effet 002
                        </p>
                        <h2
                            id="pixie-dust-loader-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustLoader
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Matérialiser une attente de durée indéterminée en
                            laissant voir que la magie est encore à l’œuvre.
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
            <div className="space-y-16 p-6 sm:p-8">
                <section aria-labelledby="loader-identity-title">
                    <SequenceTitle
                        id="loader-identity-title"
                        eyebrow="Fiche de rôle"
                        title="Une attente vivante, jamais une fausse mesure"
                        description="Loader indique seulement qu’un travail se poursuit. Progress connaît une valeur, Skeleton préserve une structure ; Loader ne promet ni durée ni pourcentage."
                    />
                    <dl className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            [
                                "Mission",
                                "Rendre perceptible une attente indéterminée.",
                            ],
                            [
                                "Matière",
                                "Une chorégraphie CSS stable et déterministe.",
                            ],
                            [
                                "Annonce",
                                "Un status nommé, sans déplacement du focus.",
                            ],
                            [
                                "Limite",
                                "Aucun overlay, progression ou contenu chargé.",
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

                <section aria-labelledby="loader-master-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="loader-master-title"
                            eyebrow="Plan maître"
                            title="Les archives remontent à la lumière"
                            description="L’étincelle ambrée accompagne le message sans annoncer une durée qu’elle ne connaît pas."
                        />
                        <div className="mt-8 grid gap-4 lg:grid-cols-2">
                            <Stage>
                                <PixieDustLoader
                                    variant="sparkle"
                                    size="lg"
                                    intensity="strong"
                                    secondaryColor="violet-ombre-portee"
                                    label="Les archives remontent à la lumière"
                                    description="La poussière de fée rassemble la prochaine scène."
                                />
                            </Stage>
                            <CodeExample>{`<PixieDustLoader
    variant="sparkle"
    size="lg"
    intensity="strong"
    secondaryColor="violet-ombre-portee"
    label="Les archives remontent à la lumière"
    description="La poussière de fée rassemble la prochaine scène."
/>`}</CodeExample>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="loader-variants-title">
                    <SequenceTitle
                        id="loader-variants-title"
                        eyebrow="Chorégraphies"
                        title="Neuf manières de faire patienter la projection"
                        description="Projection, animation et poussière de fée donnent une matière différente au même état sans jamais promettre une durée."
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        {variants.map((variant) => (
                            <Stage key={variant.value}>
                                <div className="grid justify-items-center text-center">
                                    <PixieDustLoader
                                        variant={variant.value}
                                        size="lg"
                                        labelHidden
                                        label={`${variant.name} en mouvement`}
                                    />
                                    <p className="mt-6 font-mono text-xs text-accent">
                                        variant=&quot;{variant.value}&quot;
                                    </p>
                                    <h4 className="mt-3 text-xl text-ink">
                                        {variant.name}
                                    </h4>
                                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                                        {variant.role}
                                    </p>
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="loader-sizes-title">
                    <SequenceTitle
                        id="loader-sizes-title"
                        eyebrow="Dimensions"
                        title="Cinq tailles et une mesure libre, du bouton au plein plateau"
                    />
                    <div className="mt-8 flex flex-wrap items-end gap-8 border border-dashed border-line-strong bg-canvas p-6 sm:p-8">
                        {sizes.map((size) => (
                            <div
                                key={size.value}
                                className="grid min-w-20 justify-items-center gap-4"
                            >
                                <PixieDustLoader
                                    size={size.value}
                                    label={`${size.name} — ${size.dimension}`}
                                    labelHidden
                                />
                                <div className="text-center">
                                    <p className="font-mono text-xs text-accent">
                                        {size.value}
                                    </p>
                                    <p className="mt-1 font-mono text-xs text-muted">
                                        {size.dimension}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div className="grid min-w-20 justify-items-center gap-4">
                            <PixieDustLoader
                                size={68}
                                variant="iris"
                                label="Taille personnalisée — 68 px"
                                labelHidden
                            />
                            <div className="text-center">
                                <p className="font-mono text-xs text-accent">
                                    68
                                </p>
                                <p className="mt-1 font-mono text-xs text-muted">
                                    custom
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="loader-rhythm-title">
                    <SequenceTitle
                        id="loader-rhythm-title"
                        eyebrow="Rythme et composition"
                        title="La magie trouve sa cadence et sa place"
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        {speeds.map((speed) => (
                            <Stage key={speed.value}>
                                <div className="grid justify-items-center text-center">
                                    <PixieDustLoader
                                        speed={speed.value}
                                        variant="beam"
                                        label={`${speed.name} — ${speed.duration}`}
                                    />
                                    <p className="mt-5 font-mono text-xs text-muted">
                                        cycle {speed.duration}
                                    </p>
                                </div>
                            </Stage>
                        ))}
                    </div>
                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                        {layouts.map((layout) => (
                            <Stage key={layout.value}>
                                <div>
                                    <PixieDustLoader
                                        layout={layout.value}
                                        variant="reel"
                                        label={layout.role}
                                    />
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="loader-motion-title">
                    <SequenceTitle
                        id="loader-motion-title"
                        eyebrow="Poussière et mouvement"
                        title="La féerie choisit sa densité et son amplitude"
                        description="L’intensité règle le nombre de poussières et la lumière. Le mouvement permet de calmer ou de figer la chorégraphie sans changer son sens."
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        {intensities.map((intensity) => (
                            <Stage key={intensity.value}>
                                <div className="grid justify-items-center text-center">
                                    <PixieDustLoader
                                        variant="orbit"
                                        size="lg"
                                        intensity={intensity.value}
                                        secondaryColor="violet-ombre-portee"
                                        label={intensity.name}
                                        labelHidden
                                    />
                                    <p className="mt-6 font-mono text-xs text-accent">
                                        intensity=&quot;{intensity.value}&quot;
                                    </p>
                                    <h4 className="mt-3 text-xl text-ink">
                                        {intensity.name}
                                    </h4>
                                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                                        {intensity.role}
                                    </p>
                                </div>
                            </Stage>
                        ))}
                    </div>
                    <div className="mt-5 grid gap-5 lg:grid-cols-3">
                        {motions.map((motion) => (
                            <Stage key={motion.value}>
                                <div className="grid justify-items-center text-center">
                                    <PixieDustLoader
                                        variant="cel"
                                        size="lg"
                                        motion={motion.value}
                                        secondaryColor="vert-cellulo"
                                        label={motion.name}
                                        labelHidden
                                    />
                                    <p className="mt-6 font-mono text-xs text-accent">
                                        motion=&quot;{motion.value}&quot;
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                                        {motion.role}
                                    </p>
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="loader-colors-title">
                    <SequenceTitle
                        id="loader-colors-title"
                        eyebrow="Lumières magiques"
                        title="La palette change le reflet, jamais le sens"
                    />
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {colors.map((color) => (
                            <Stage key={color.value}>
                                <PixieDustLoader
                                    color={color.value}
                                    secondaryColor="violet-ombre-portee"
                                    variant="iris"
                                    size="lg"
                                    label={color.label}
                                />
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="loader-scenarios-title">
                    <SequenceTitle
                        id="loader-scenarios-title"
                        eyebrow="Scénarios préparés"
                        title="De la commande compacte au grand changement de bobine"
                        description="La variante, le mouvement et la densité s’accordent au temps perçu et à la place disponible."
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-2">
                        <Stage>
                            <div className="grid justify-items-center gap-5 text-center">
                                <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                    Commande compacte
                                </p>
                                <PixieButton type="button" size="sm" disabled>
                                    <PixieDustLoader
                                        variant="dots"
                                        size="xs"
                                        layout="inline"
                                        color={false}
                                        decorative
                                    />
                                    Recherche en cours
                                </PixieButton>
                            </div>
                        </Stage>
                        <Stage>
                            <PixieDustLoader
                                variant="filmstrip"
                                size="md"
                                layout="inline"
                                labelPosition="before"
                                color="bleu-reperage"
                                secondaryColor="violet-ombre-portee"
                                label="Les résultats prennent place"
                                description="Le registre reste disponible pendant sa recomposition."
                            />
                        </Stage>
                        <Stage>
                            <PixieDustLoader
                                variant="cel"
                                size="lg"
                                intensity="subtle"
                                motion="gentle"
                                color="vert-cellulo"
                                secondaryColor="gouache"
                                label="Les cellulos retrouvent leurs repères"
                            />
                        </Stage>
                        <Stage>
                            <PixieDustLoader
                                variant="beam"
                                size="xl"
                                intensity="strong"
                                direction="reverse"
                                color="ambre-projecteur"
                                secondaryColor="violet-ombre-portee"
                                label="Le prochain plan rejoint l’écran"
                                description="Une attente majeure peut assumer une présence plus théâtrale."
                            />
                        </Stage>
                        <Stage>
                            <div className="grid justify-items-center gap-4 text-center">
                                <PixieDustLoader
                                    variant="orbit"
                                    size={68}
                                    intensity="strong"
                                    color="rose-aerographe"
                                    secondaryColor="bleu-reperage"
                                    label="La poussière rassemble les archives"
                                    labelHidden
                                />
                                <p className="text-sm leading-6 text-ink-soft">
                                    Une taille libre accompagne un point focal
                                    exceptionnel.
                                </p>
                            </div>
                        </Stage>
                        <Stage>
                            <div className="grid justify-items-center gap-4 text-center">
                                <div className="border border-dashed border-line-strong p-4">
                                    <PixieDustLoader
                                        variant="iris"
                                        size="lg"
                                        active={false}
                                        reserveSpace
                                        label="Emplacement réservé"
                                    />
                                </div>
                                <p className="text-sm leading-6 text-ink-soft">
                                    L’emplacement reste stable après la fin de
                                    l’attente.
                                </p>
                            </div>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="loader-playground-title">
                    <SequenceTitle
                        id="loader-playground-title"
                        eyebrow="Bac à sable interactif"
                        title="Régler l’attente et rejouer son apparition"
                        description="Le plateau éprouve la chorégraphie, la taille, la cadence, le délai, le label et les deux Lumières."
                    />
                    <div className="mt-8">
                        <PixieDustLoaderPlayground />
                    </div>
                </section>

                <section aria-labelledby="loader-accessibility-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="loader-accessibility-title"
                            eyebrow="Accessibilité"
                            title="L’attente reste compréhensible lorsque le mouvement s’arrête"
                        />
                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">Informatif</h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Le loader expose un status et son label. Il
                                    n’attire ni ne déplace le focus. ariaLive
                                    règle la priorité sans changer son rendu.
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">Décoratif</h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    decorative masque le signe et son label
                                    lorsque le contexte annonce déjà l’attente.
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Mouvement réduit
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Les rotations et balayages deviennent une
                                    image fixe ; le label conserve tout le sens.
                                    Le mode static permet d’éprouver ce rendu
                                    sans contredire la préférence système.
                                </p>
                            </PixiePanel>
                        </div>
                        <p className="mt-5 border-l-2 border-accent px-5 py-3 text-sm leading-6 text-ink-soft">
                            La région réellement chargée doit porter son propre
                            aria-busy=&quot;true&quot; : Loader ne peut pas le
                            déduire à sa place. ariaControls peut seulement
                            relier les deux régions.
                        </p>
                    </div>
                </section>

                <section aria-labelledby="loader-technical-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="loader-technical-title"
                            eyebrow="Générique technique"
                            title="API de l’esquisse"
                            description="Le composant reste déclaratif et sans état client : ses chorégraphies, son délai et sa réduction de mouvement sont entièrement portés par CSS."
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

                <section aria-labelledby="loader-journal-title">
                    <SequenceTitle
                        id="loader-journal-title"
                        eyebrow="Journal de production"
                        title="Avant la version prête à projeter"
                    />
                    <PixieStack as="ul" gap="sm" className="mt-8">
                        {[
                            "Éprouver les neuf chorégraphies dans les deux Lumières et à 200 %.",
                            "Contrôler les seize poussières de fée sans bruit visuel dans les tailles compactes.",
                            "Contrôler le délai sur des attentes très brèves et confirmer que l’annonce reste immédiate.",
                            "Vérifier les annonces status, les labels masqués et le mode décoratif avec les lecteurs d’écran.",
                            "Confirmer que gentle, static et le mouvement réduit restent lisibles dans chaque variante.",
                            "Tester reserveSpace et les tailles xs et sm à l’intérieur des futurs boutons et champs.",
                        ].map((item) => (
                            <li
                                key={item}
                                className="border-l-2 border-accent bg-surface-muted px-5 py-4 text-sm leading-6 text-ink-soft"
                            >
                                {item}
                            </li>
                        ))}
                    </PixieStack>
                </section>
            </div>
        </AtelierFicheAccessoire>
    );
}
