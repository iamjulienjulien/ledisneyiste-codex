import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieCallout } from "@/components/ui/PixieCallout";
import { PixieCard } from "@/components/ui/PixieCard";
import {
    PixieInset,
    type PixieInsetAccentPosition,
    type PixieInsetDepth,
    type PixieInsetPadding,
    type PixieInsetRadius,
    type PixieInsetTexture,
    type PixieInsetTextureIntensity,
    type PixieInsetVariant,
} from "@/components/ui/PixieInset";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieInsetPlayground } from "./PixieInsetPlayground";

const variants = [
    {
        name: "Nu",
        value: "plain" as const,
        description: "La profondeur seule, sans surface ajoutée.",
    },
    {
        name: "Discret",
        value: "subtle" as const,
        description: "Une différence de surface presque plane.",
    },
    {
        name: "Creusé",
        value: "recessed" as const,
        description: "Le retrait de référence pour les informations annexes.",
    },
    {
        name: "Rainure",
        value: "groove" as const,
        description: "Une découpe plus franche inspirée du plateau.",
    },
    {
        name: "Accent",
        value: "accent" as const,
        description: "Une arête colorée identifie le complément.",
    },
    {
        name: "Teinté",
        value: "tinted" as const,
        description: "La couleur baigne toute la surface secondaire.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieInsetVariant;
    description: string;
}>[];

const depths = [
    {
        name: "Aucune",
        value: "none" as const,
        description: "Une sous-zone structurée sans effet de creux.",
    },
    {
        name: "Faible",
        value: "shallow" as const,
        description: "Un retrait à peine perceptible.",
    },
    {
        name: "Moyenne",
        value: "medium" as const,
        description: "La profondeur équilibrée par défaut.",
    },
    {
        name: "Profonde",
        value: "deep" as const,
        description: "Un creux marqué pour une surface vaste.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieInsetDepth;
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
    value: PixieInsetPadding;
    token: string;
}>[];

const radii = [
    { name: "Aucun", value: "none" as const },
    { name: "Petit", value: "small" as const },
    { name: "Moyen", value: "medium" as const },
    { name: "Grand", value: "large" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieInsetRadius;
}>[];

const accentPositions = [
    { name: "Haut", value: "top" as const },
    { name: "Fin", value: "end" as const },
    { name: "Bas", value: "bottom" as const },
    { name: "Début", value: "start" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieInsetAccentPosition;
}>[];

const textures = [
    {
        name: "Aucune",
        value: "none" as const,
        description: "Une surface silencieuse pour les données denses.",
    },
    {
        name: "Grain",
        value: "grain" as const,
        description: "Une poussière fixe évoque la matière projetée.",
    },
    {
        name: "Grille",
        value: "grid" as const,
        description: "Un quadrillage discret accueille les mesures.",
    },
    {
        name: "Hachures",
        value: "crosshatch" as const,
        description: "Un réseau croisé rappelle les annotations d’atelier.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieInsetTexture;
    description: string;
}>[];

const textureIntensities = [
    { name: "Discrète", value: "subtle" as const },
    { name: "Moyenne", value: "medium" as const },
    { name: "Forte", value: "strong" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieInsetTextureIntensity;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieInsetElement",
        defaultValue: '"div"',
        description: "Élément HTML porté par la zone secondaire.",
    },
    {
        name: "variant",
        type: "PixieInsetVariant",
        defaultValue: '"recessed"',
        description: "Traitement visuel de la découpe.",
    },
    {
        name: "depth",
        type: "PixieInsetDepth",
        defaultValue: '"medium"',
        description: "Intensité de la profondeur intérieure.",
    },
    {
        name: "padding",
        type: "PixieInsetPadding",
        defaultValue: '"md"',
        description: "Espacement intérieur de la zone.",
    },
    {
        name: "radius",
        type: "PixieInsetRadius",
        defaultValue: '"medium"',
        description: "Arrondi de la découpe.",
    },
    {
        name: "color",
        type: "PixieInsetColor",
        defaultValue: "false",
        description: "Couleur du registre ou accent courant du thème.",
    },
    {
        name: "accentPosition",
        type: "PixieInsetAccentPosition",
        defaultValue: '"start"',
        description: "Côté portant l’arête du variant accent.",
    },
    {
        name: "texture",
        type: "PixieInsetTexture",
        defaultValue: '"none"',
        description: "Matière décorative fixe déposée dans la sous-zone.",
    },
    {
        name: "textureIntensity",
        type: "PixieInsetTextureIntensity",
        defaultValue: '"medium"',
        description: "Présence visuelle de la texture choisie.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Information secondaire placée dans le creux.",
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
        name: "PixieInsetElement",
        values: ['"div"', '"section"', '"aside"'],
        description: "Structures documentaires autorisées.",
    },
    {
        name: "PixieInsetVariant",
        values: [
            '"plain"',
            '"subtle"',
            '"recessed"',
            '"groove"',
            '"accent"',
            '"tinted"',
        ],
        description: "Traitements visuels de la zone creusée.",
    },
    {
        name: "PixieInsetDepth",
        values: ['"none"', '"shallow"', '"medium"', '"deep"'],
        description: "Intensités de l’ombre intérieure.",
    },
    {
        name: "PixieInsetPadding",
        values: ['"none"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Densités intérieures disponibles.",
    },
    {
        name: "PixieInsetRadius",
        values: ['"none"', '"small"', '"medium"', '"large"'],
        description: "Rayons disponibles dans la Projection Originale.",
    },
    {
        name: "PixieInsetColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Couleur enregistrée ou accent courant du thème.",
    },
    {
        name: "PixieInsetAccentPosition",
        values: ['"top"', '"end"', '"bottom"', '"start"'],
        description: "Positions logiques de l’arête colorée.",
    },
    {
        name: "PixieInsetTexture",
        values: ['"none"', '"grain"', '"grid"', '"crosshatch"'],
        description: "Matières statiques disponibles.",
    },
    {
        name: "PixieInsetTextureIntensity",
        values: ['"subtle"', '"medium"', '"strong"'],
        description: "Niveaux de présence des textures.",
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

function SecondaryMetadata() {
    return (
        <dl className="grid gap-5 text-sm sm:grid-cols-2">
            <div>
                <dt className="font-eyebrow uppercase tracking-[0.14em] text-muted">
                    Première projection
                </dt>
                <dd className="mt-2 text-ink">18 novembre 1928</dd>
            </div>
            <div>
                <dt className="font-eyebrow uppercase tracking-[0.14em] text-muted">
                    Durée restaurée
                </dt>
                <dd className="mt-2 text-ink">7 minutes 42 secondes</dd>
            </div>
        </dl>
    );
}

export function PixieInsetDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-inset"
            labelledBy="pixie-inset-title"
            nom="PixieInset"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Décor 005
                        </p>
                        <h2
                            id="pixie-inset-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieInset
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Creuser une zone d’information secondaire sans
                            détourner la lumière du contenu principal.
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
            <section aria-labelledby="inset-identity" className="mt-14">
                <SequenceTitle
                    id="inset-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="L’Inset place un complément en retrait à l’intérieur d’une surface plus importante. Il ne possède aucun récit ni comportement propre."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Hiérarchiser une information secondaire."],
                        [
                            "Usage",
                            "Métadonnées, détails techniques, repères et compléments documentaires.",
                        ],
                        [
                            "Limite",
                            "Ne devient ni une carte autonome, ni une alerte, ni une action.",
                        ],
                        [
                            "Anatomie",
                            "Une seule zone libre, sans header, symbole ou footer imposé.",
                        ],
                        [
                            "Accessibilité",
                            "Aucun rôle ou ordre de focus n’est ajouté automatiquement.",
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
                aria-labelledby="inset-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="inset-master"
                    eyebrow="Plan maître"
                    title="Les repères quittent le premier plan"
                    description="Le contenu principal reste posé sur la surface tandis que les informations de consultation trouvent un creux clairement subordonné."
                />

                <div className="mt-7 grid border border-line xl:grid-cols-2">
                    <div className="flex min-h-[30rem] items-center justify-center bg-canvas p-8">
                        <PixiePanel
                            as="div"
                            variant="surface"
                            padding="lg"
                            className="w-full max-w-xl"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Projection originale
                            </p>
                            <h4 className="mt-3 text-3xl text-ink">
                                Steamboat Willie
                            </h4>
                            <p className="mt-4 leading-7 text-ink-soft">
                                Le son synchronisé devient ici une mécanique de
                                jeu et donne au mouvement un nouveau rythme.
                            </p>
                            <PixieInset
                                variant="accent"
                                color="ambre-projecteur"
                                accentPosition="start"
                                texture="grain"
                                textureIntensity="subtle"
                                className="mt-7"
                            >
                                <SecondaryMetadata />
                            </PixieInset>
                        </PixiePanel>
                    </div>
                    <CodeExample>{`<PixieInset
    variant="accent"
    depth="medium"
    color="ambre-projecteur"
    accentPosition="start"
    texture="grain"
    textureIntensity="subtle"
>
    <MetadataList />
</PixieInset>`}</CodeExample>
                </div>
            </section>

            <section
                id="inset-variants"
                aria-labelledby="inset-variants-title"
                className="mt-16 scroll-mt-8"
            >
                <SequenceTitle
                    id="inset-variants-title"
                    eyebrow="Direction artistique"
                    title="Six manières de creuser le décor"
                    description="Les variants changent le dessin de la découpe sans modifier la valeur documentaire de son contenu."
                />

                <div className="mt-7 grid gap-6 bg-surface p-6 lg:grid-cols-2">
                    {variants.map((variant) => (
                        <PixieInset
                            key={variant.value}
                            variant={variant.value}
                            color="violet-ombre-portee"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                {variant.name}
                            </p>
                            <h4 className="mt-2 text-2xl text-ink">
                                {variant.value}
                            </h4>
                            <p className="mt-3 leading-7 text-ink-soft">
                                {variant.description}
                            </p>
                        </PixieInset>
                    ))}
                </div>
            </section>

            <section aria-labelledby="inset-depth" className="mt-16">
                <SequenceTitle
                    id="inset-depth"
                    eyebrow="Profondeur de champ"
                    title="Quatre retraits pour accompagner l’échelle"
                    description="La profondeur règle seulement l’ombre intérieure. Une zone plus profonde n’est jamais plus importante."
                />

                <div className="mt-7 grid gap-6 bg-surface p-6 lg:grid-cols-3">
                    {depths.map((depth) => (
                        <PixieInset
                            key={depth.value}
                            variant="recessed"
                            depth={depth.value}
                            padding="lg"
                        >
                            <p className="font-mono text-xs text-accent">
                                depth=&quot;{depth.value}&quot;
                            </p>
                            <h4 className="mt-3 text-xl text-ink">
                                {depth.name}
                            </h4>
                            <p className="mt-3 leading-7 text-ink-soft">
                                {depth.description}
                            </p>
                        </PixieInset>
                    ))}
                </div>
            </section>

            <section aria-labelledby="inset-composition" className="mt-16">
                <SequenceTitle
                    id="inset-composition"
                    eyebrow="Jeu de surfaces"
                    title="Un creux qui s’adapte à son décor"
                    description="L’Inset peut rejoindre une Card, un Panel ou un Callout tant qu’il reste visuellement secondaire."
                />

                <div className="mt-7 grid gap-6 xl:grid-cols-3">
                    <PixieCard as="div" variant="outline" padding="md">
                        <h4 className="text-xl text-ink">Dans une Card</h4>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Les données annexes restent liées à l’unité.
                        </p>
                        <PixieInset
                            variant="subtle"
                            depth="shallow"
                            padding="sm"
                            className="mt-5"
                        >
                            <p className="text-sm text-ink-soft">
                                Collection · Mickey Mouse
                            </p>
                        </PixieInset>
                    </PixieCard>

                    <PixiePanel as="div" variant="surface" padding="md">
                        <h4 className="text-xl text-ink">Dans un Panel</h4>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Une sous-zone organise les repères techniques.
                        </p>
                        <PixieInset
                            variant="recessed"
                            padding="sm"
                            className="mt-5"
                        >
                            <p className="text-sm text-ink-soft">
                                4 relations documentées
                            </p>
                        </PixieInset>
                    </PixiePanel>

                    <PixieCallout
                        as="div"
                        variant="outline"
                        padding="md"
                        heading={<h4>Dans un Callout</h4>}
                    >
                        <p>
                            La précision conserve un dernier niveau de détail.
                        </p>
                        <PixieInset
                            variant="accent"
                            color="vert-cellulo"
                            padding="sm"
                            className="mt-5"
                        >
                            <p className="text-sm text-ink-soft">
                                Source consultée le 23 août 2026
                            </p>
                        </PixieInset>
                    </PixieCallout>
                </div>
            </section>

            <section aria-labelledby="inset-accent" className="mt-16">
                <SequenceTitle
                    id="inset-accent"
                    eyebrow="Repère coloré"
                    title="L’arête suit le sens de la composition"
                    description="Les positions logiques restent cohérentes en écriture de gauche à droite comme de droite à gauche. Elles n’altèrent pas l’ordre du contenu."
                />

                <div className="mt-7 grid gap-5 bg-surface p-6 sm:grid-cols-2 xl:grid-cols-4">
                    {accentPositions.map((position) => (
                        <PixieInset
                            key={position.value}
                            variant="accent"
                            depth="shallow"
                            padding="md"
                            color="corail-cel"
                            accentPosition={position.value}
                            className="min-h-36"
                        >
                            <p className="font-mono text-xs text-accent">
                                {position.value}
                            </p>
                            <p className="mt-4 leading-7 text-ink-soft">
                                Accent placé en {position.name.toLowerCase()}.
                            </p>
                        </PixieInset>
                    ))}
                </div>
            </section>

            <section aria-labelledby="inset-textures" className="mt-16">
                <SequenceTitle
                    id="inset-textures"
                    eyebrow="Matière du décor"
                    title="Trois textures sans mouvement"
                    description="Le grain, la grille et les hachures ajoutent un contexte visuel discret. La surface sans texture reste le choix de référence pour les contenus denses."
                />

                <div className="mt-7 grid gap-5 bg-surface p-6 md:grid-cols-2">
                    {textures.map((texture, index) => (
                        <PixieInset
                            key={texture.value}
                            variant={
                                texture.value === "none" ? "recessed" : "tinted"
                            }
                            depth="shallow"
                            padding="lg"
                            color="bleu-reperage"
                            texture={texture.value}
                            textureIntensity={
                                textureIntensities[
                                    index % textureIntensities.length
                                ].value
                            }
                            className="min-h-44"
                        >
                            <p className="font-mono text-xs text-accent">
                                texture=&quot;{texture.value}&quot;
                            </p>
                            <h4 className="mt-3 text-2xl text-ink">
                                {texture.name}
                            </h4>
                            <p className="mt-3 leading-7 text-ink-soft">
                                {texture.description}
                            </p>
                        </PixieInset>
                    ))}
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-3">
                    {textureIntensities.map((intensity) => (
                        <PixieInset
                            key={intensity.value}
                            variant="subtle"
                            depth="none"
                            texture="crosshatch"
                            textureIntensity={intensity.value}
                            padding="md"
                            color="violet-ombre-portee"
                        >
                            <p className="font-mono text-xs text-ink">
                                {intensity.value}
                            </p>
                            <p className="mt-2 text-sm text-ink-soft">
                                Intensité {intensity.name.toLowerCase()}
                            </p>
                        </PixieInset>
                    ))}
                </div>
            </section>

            <section aria-labelledby="inset-scenarios" className="mt-16">
                <SequenceTitle
                    id="inset-scenarios"
                    eyebrow="Scénarios préparés"
                    title="Des seconds plans pour les archives"
                    description="Ces compositions confrontent l’esquisse aux métadonnées, notes longues, mesures et provenances qu’elle devra réellement accueillir."
                />

                <div className="mt-7 grid gap-6 xl:grid-cols-2">
                    <PixiePanel as="article" variant="surface" padding="lg">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Métadonnées dans un Panel
                        </p>
                        <h4 className="mt-3 text-2xl text-ink">
                            Une lecture rapide de l’œuvre
                        </h4>
                        <PixieInset
                            variant="recessed"
                            depth="shallow"
                            padding="md"
                            className="mt-6"
                        >
                            <SecondaryMetadata />
                        </PixieInset>
                    </PixiePanel>

                    <PixieCard as="article" variant="outline" padding="lg">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Détails techniques dans une Card
                        </p>
                        <h4 className="mt-3 text-2xl text-ink">
                            La mécanique derrière le plan
                        </h4>
                        <PixieInset
                            variant="tinted"
                            color="bleu-reperage"
                            texture="grid"
                            textureIntensity="subtle"
                            padding="md"
                            className="mt-6"
                        >
                            <dl className="grid gap-4 text-sm sm:grid-cols-2">
                                <div>
                                    <dt className="text-muted">Format</dt>
                                    <dd className="mt-1 text-ink">35 mm</dd>
                                </div>
                                <div>
                                    <dt className="text-muted">Son</dt>
                                    <dd className="mt-1 text-ink">
                                        Mono optique
                                    </dd>
                                </div>
                            </dl>
                        </PixieInset>
                    </PixieCard>

                    <PixieCallout
                        as="div"
                        variant="outline"
                        padding="lg"
                        heading={<h4>Provenance documentée</h4>}
                    >
                        <p>
                            Le Callout porte l’information importante ; l’Inset
                            n’en conserve que la trace de consultation.
                        </p>
                        <PixieInset
                            variant="plain"
                            depth="shallow"
                            padding="sm"
                            className="mt-5"
                        >
                            <p className="text-sm text-ink-soft">
                                Catalogue D23 · consultation du 23 août 2026
                            </p>
                        </PixieInset>
                    </PixieCallout>

                    <PixiePanel as="article" variant="outline" padding="lg">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Repère chronologique compact
                        </p>
                        <div className="mt-6 grid gap-3">
                            {[
                                "1923 · Alice",
                                "1927 · Oswald",
                                "1928 · Mickey",
                            ].map((marker, index) => (
                                <PixieInset
                                    key={marker}
                                    variant={index === 2 ? "accent" : "subtle"}
                                    depth="none"
                                    padding="sm"
                                    color="ambre-projecteur"
                                >
                                    <p className="font-mono text-sm text-ink">
                                        {marker}
                                    </p>
                                </PixieInset>
                            ))}
                        </div>
                    </PixiePanel>

                    <PixieCard as="article" variant="surface" padding="lg">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Mesures et indicateurs
                        </p>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            {[
                                ["21", "œuvres"],
                                ["16", "créateurs"],
                                ["10", "personnages"],
                                ["2", "époques"],
                            ].map(([value, label]) => (
                                <PixieInset
                                    key={label}
                                    variant="groove"
                                    depth="medium"
                                    padding="sm"
                                    radius="small"
                                >
                                    <strong className="block text-2xl text-ink">
                                        {value}
                                    </strong>
                                    <span className="text-sm text-ink-soft">
                                        {label}
                                    </span>
                                </PixieInset>
                            ))}
                        </div>
                    </PixieCard>

                    <PixiePanel as="article" variant="surface" padding="lg">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Note documentaire longue
                        </p>
                        <PixieInset
                            as="aside"
                            aria-label="Précision documentaire"
                            variant="accent"
                            accentPosition="top"
                            depth="deep"
                            padding="xl"
                            color="vert-cellulo"
                            texture="grain"
                            textureIntensity="subtle"
                            className="mt-6"
                        >
                            <p className="leading-7 text-ink-soft">
                                Les dates de production et de diffusion ne
                                racontent pas toujours le même ordre. Cette note
                                conserve la nuance sans interrompre le récit
                                principal de la fiche.
                            </p>
                        </PixieInset>
                    </PixiePanel>

                    <PixieCard as="article" variant="outline" padding="lg">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Surface minimale
                        </p>
                        <PixieInset
                            variant="plain"
                            depth="none"
                            padding="md"
                            radius="none"
                            className="mt-5 border-y border-line"
                        >
                            <p className="text-ink-soft">
                                Aucun effet de profondeur : seule la composition
                                signale le second plan.
                            </p>
                        </PixieInset>
                    </PixieCard>

                    <PixiePanel as="article" variant="surface" padding="lg">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Composition imbriquée
                        </p>
                        <h4 className="mt-3 text-2xl text-ink">
                            Un creux, puis un seul détail
                        </h4>
                        <PixieInset
                            variant="tinted"
                            color="violet-ombre-portee"
                            padding="lg"
                            className="mt-6"
                        >
                            <p className="leading-7 text-ink-soft">
                                Le premier retrait rassemble le contexte.
                            </p>
                            <PixieInset
                                variant="recessed"
                                depth="shallow"
                                padding="sm"
                                className="mt-4"
                            >
                                <p className="text-sm text-ink-soft">
                                    Restauration 4K contrôlée en 2025
                                </p>
                            </PixieInset>
                        </PixieInset>
                    </PixiePanel>
                </div>
            </section>

            <section aria-labelledby="inset-construction" className="mt-16">
                <SequenceTitle
                    id="inset-construction"
                    eyebrow="Construction du décor"
                    title="Espacements et rayons suivent la surface hôte"
                    description="Ces réglages facilitent la composition sans attribuer une taille propre au composant."
                />

                <div className="mt-7 grid gap-8 xl:grid-cols-2">
                    <div>
                        <h4 className="text-xl text-ink">Espacements</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {paddings.map((padding) => (
                                <PixieInset
                                    key={padding.value}
                                    variant="recessed"
                                    padding={padding.value}
                                    radius="small"
                                    className="min-h-28"
                                >
                                    <div className="bg-accent-soft p-3">
                                        <p className="font-mono text-xs text-accent">
                                            {padding.value} · {padding.token}
                                        </p>
                                    </div>
                                </PixieInset>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl text-ink">Rayons</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {radii.map((radius) => (
                                <PixieInset
                                    key={radius.value}
                                    variant="accent"
                                    color="bleu-reperage"
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
                                </PixieInset>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="pixie-inset-playground"
                aria-labelledby="inset-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="inset-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieInset"
                    description="Réglez sa sémantique, sa découpe et sa profondeur ; le code d’utilisation suit chaque changement."
                />
                <div className="mt-8">
                    <PixieInsetPlayground />
                </div>
            </section>

            <section
                aria-labelledby="inset-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="inset-accessibility"
                    eyebrow="Accessibilité"
                    title="Le creux ne crée aucune sémantique"
                    description="La hiérarchie documentaire vient du contenu et de l’élément choisi, jamais de l’ombre ou de la couleur."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Simple regroupement",
                            'Conserver as="div" lorsque la zone n’ajoute aucune structure au document.',
                        ],
                        [
                            "Section nommée",
                            'Associer as="section" à un titre visible, aria-labelledby ou aria-label.',
                        ],
                        [
                            "Complément réel",
                            'Réserver as="aside" à une information tangentielle au récit principal.',
                        ],
                        [
                            "Interactions contenues",
                            "Préserver le focus des liens et boutons sans rendre toute la surface interactive.",
                        ],
                        [
                            "Contraste",
                            "Les textures disparaissent en contraste forcé et ne portent jamais seules une information.",
                        ],
                        [
                            "Sens",
                            "Ne jamais faire porter une catégorie ou un statut par la profondeur seule.",
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
                aria-labelledby="inset-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="inset-technical"
                    eyebrow="Générique technique"
                    title="API du composant"
                    description="Les types spécifiques sont colocalisés dans PixieInset.types.ts et les attributs HTML compatibles sont transmis à l’élément rendu."
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

            <section aria-labelledby="inset-journal" className="mt-16">
                <SequenceTitle
                    id="inset-journal"
                    eyebrow="Contrat de projection"
                    title="Les garanties de la version 1.0.0"
                    description="PixieInset est prêt à creuser les seconds plans du Codex sans détourner la lumière du contenu principal."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Les six variants règlent la surface sans modifier la valeur documentaire du contenu.",
                        "L’absence de profondeur et les trois niveaux creusés restent distincts dans les deux Lumières.",
                        "Les textures sont décoratives et s’effacent à l’impression comme en contraste forcé.",
                        "Div, section et aside conservent la responsabilité de leur nom et de leur rôle accessibles.",
                        "Les contenus longs, les liens et les positions logiques restent utilisables à 200 % de zoom.",
                        "PixieInset porte les informations secondaires ; PixiePanel et PixieCallout gardent leurs propres responsabilités.",
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
