import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieStack } from "@/components/ui/PixieStack";
import {
    PixieDustLoader,
    type PixieDustLoaderLayout,
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
        type: "PixieDustLoaderSize",
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
        name: "layout",
        type: "PixieDustLoaderLayout",
        defaultValue: '"stacked"',
        description: "Position du label autour du signe.",
    },
    {
        name: "color",
        type: "PixieDustLoaderColor",
        defaultValue: '"ambre-projecteur"',
        description: "Couleur du registre ou couleur héritée.",
    },
    {
        name: "active",
        type: "boolean",
        defaultValue: "true",
        description: "Retire entièrement le loader lorsqu’il vaut false.",
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
        description: "Trois métaphores de l’attente indéterminée.",
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
                                <PixieDustLoader label="Les archives remontent à la lumière" />
                            </Stage>
                            <CodeExample>{`<PixieDustLoader
    label="Les archives remontent à la lumière"
/>`}</CodeExample>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="loader-variants-title">
                    <SequenceTitle
                        id="loader-variants-title"
                        eyebrow="Chorégraphies"
                        title="Trois manières de faire patienter la projection"
                        description="Étincelles, bobine et faisceau racontent le même état sans produire de hasard ni changer la géométrie réservée."
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
                        title="Cinq tailles, du bouton au plein plateau"
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
                                    size="lg"
                                    label={color.label}
                                />
                            </Stage>
                        ))}
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
                                    n’attire ni ne déplace le focus.
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
                                </p>
                            </PixiePanel>
                        </div>
                        <p className="mt-5 border-l-2 border-accent px-5 py-3 text-sm leading-6 text-ink-soft">
                            La région réellement chargée doit porter son propre
                            aria-busy=&quot;true&quot; : Loader ne peut pas le
                            déduire à sa place.
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
                            "Éprouver les trois chorégraphies dans les deux Lumières et à 200 %.",
                            "Contrôler le délai sur des attentes très brèves et des changements d’état rapides.",
                            "Vérifier les annonces status, les labels masqués et le mode décoratif avec les lecteurs d’écran.",
                            "Confirmer que le mode de mouvement réduit reste lisible sans aucune animation.",
                            "Tester les tailles xs et sm à l’intérieur des futurs boutons et champs.",
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
