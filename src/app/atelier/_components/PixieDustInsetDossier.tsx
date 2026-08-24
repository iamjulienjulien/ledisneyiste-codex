import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieDustCallout } from "@/components/ui/PixieDustCallout";
import { PixieCard } from "@/components/ui/PixieCard";
import {
    PixieDustInset,
    type PixieDustInsetDepth,
    type PixieDustInsetPadding,
    type PixieDustInsetRadius,
    type PixieDustInsetVariant,
} from "@/components/ui/PixieDustInset";
import { PixieDustPanel } from "@/components/ui/PixieDustPanel";
import { PixieDustInsetPlayground } from "./PixieDustInsetPlayground";

const variants = [
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
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustInsetVariant;
    description: string;
}>[];

const depths = [
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
    value: PixieDustInsetDepth;
    description: string;
}>[];

const paddings = [
    { name: "Aucun", value: "none" as const, token: "0" },
    { name: "Petit", value: "sm" as const, token: "1 rem" },
    { name: "Moyen", value: "md" as const, token: "1,5 rem" },
    { name: "Grand", value: "lg" as const, token: "2 rem" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustInsetPadding;
    token: string;
}>[];

const radii = [
    { name: "Aucun", value: "none" as const },
    { name: "Petit", value: "small" as const },
    { name: "Moyen", value: "medium" as const },
    { name: "Grand", value: "large" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustInsetRadius;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieDustInsetElement",
        defaultValue: '"div"',
        description: "Élément HTML porté par la zone secondaire.",
    },
    {
        name: "variant",
        type: "PixieDustInsetVariant",
        defaultValue: '"recessed"',
        description: "Traitement visuel de la découpe.",
    },
    {
        name: "depth",
        type: "PixieDustInsetDepth",
        defaultValue: '"medium"',
        description: "Intensité de la profondeur intérieure.",
    },
    {
        name: "padding",
        type: "PixieDustInsetPadding",
        defaultValue: '"md"',
        description: "Espacement intérieur de la zone.",
    },
    {
        name: "radius",
        type: "PixieDustInsetRadius",
        defaultValue: '"medium"',
        description: "Arrondi de la découpe.",
    },
    {
        name: "color",
        type: "PixieDustInsetColor",
        defaultValue: "false",
        description: "Couleur du registre ou accent courant du thème.",
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
        name: "PixieDustInsetElement",
        values: ['"div"', '"section"', '"aside"'],
        description: "Structures documentaires autorisées.",
    },
    {
        name: "PixieDustInsetVariant",
        values: ['"subtle"', '"recessed"', '"groove"', '"accent"'],
        description: "Traitements visuels de la zone creusée.",
    },
    {
        name: "PixieDustInsetDepth",
        values: ['"shallow"', '"medium"', '"deep"'],
        description: "Intensités de l’ombre intérieure.",
    },
    {
        name: "PixieDustInsetPadding",
        values: ['"none"', '"sm"', '"md"', '"lg"'],
        description: "Densités intérieures disponibles.",
    },
    {
        name: "PixieDustInsetRadius",
        values: ['"none"', '"small"', '"medium"', '"large"'],
        description: "Rayons disponibles dans la Projection Originale.",
    },
    {
        name: "PixieDustInsetColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Couleur enregistrée ou accent courant du thème.",
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

export function PixieDustInsetDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-inset"
            labelledBy="pixie-dust-inset-title"
            nom="PixieDustInset"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Décor 005
                        </p>
                        <h2
                            id="pixie-dust-inset-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustInset
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
                        <PixieDustPanel
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
                            <PixieDustInset
                                variant="accent"
                                color="ambre-projecteur"
                                className="mt-7"
                            >
                                <SecondaryMetadata />
                            </PixieDustInset>
                        </PixieDustPanel>
                    </div>
                    <CodeExample>{`<PixieDustInset
    variant="accent"
    depth="medium"
    color="ambre-projecteur"
>
    <MetadataList />
</PixieDustInset>`}</CodeExample>
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
                    title="Quatre manières de creuser le décor"
                    description="Les variants changent le dessin de la découpe sans modifier la valeur documentaire de son contenu."
                />

                <div className="mt-7 grid gap-6 bg-surface p-6 lg:grid-cols-2">
                    {variants.map((variant) => (
                        <PixieDustInset
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
                        </PixieDustInset>
                    ))}
                </div>
            </section>

            <section aria-labelledby="inset-depth" className="mt-16">
                <SequenceTitle
                    id="inset-depth"
                    eyebrow="Profondeur de champ"
                    title="Trois retraits pour accompagner l’échelle"
                    description="La profondeur règle seulement l’ombre intérieure. Une zone plus profonde n’est jamais plus importante."
                />

                <div className="mt-7 grid gap-6 bg-surface p-6 lg:grid-cols-3">
                    {depths.map((depth) => (
                        <PixieDustInset
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
                        </PixieDustInset>
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
                        <PixieDustInset
                            variant="subtle"
                            depth="shallow"
                            padding="sm"
                            className="mt-5"
                        >
                            <p className="text-sm text-ink-soft">
                                Collection · Mickey Mouse
                            </p>
                        </PixieDustInset>
                    </PixieCard>

                    <PixieDustPanel as="div" variant="surface" padding="md">
                        <h4 className="text-xl text-ink">Dans un Panel</h4>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Une sous-zone organise les repères techniques.
                        </p>
                        <PixieDustInset
                            variant="recessed"
                            padding="sm"
                            className="mt-5"
                        >
                            <p className="text-sm text-ink-soft">
                                4 relations documentées
                            </p>
                        </PixieDustInset>
                    </PixieDustPanel>

                    <PixieDustCallout
                        as="div"
                        variant="outline"
                        padding="md"
                        heading={<h4>Dans un Callout</h4>}
                    >
                        <p>
                            La précision conserve un dernier niveau de détail.
                        </p>
                        <PixieDustInset
                            variant="accent"
                            color="vert-cellulo"
                            padding="sm"
                            className="mt-5"
                        >
                            <p className="text-sm text-ink-soft">
                                Source consultée le 23 août 2026
                            </p>
                        </PixieDustInset>
                    </PixieDustCallout>
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
                                <PixieDustInset
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
                                </PixieDustInset>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl text-ink">Rayons</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {radii.map((radius) => (
                                <PixieDustInset
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
                                </PixieDustInset>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="pixie-dust-inset-playground"
                aria-labelledby="inset-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="inset-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieDustInset"
                    description="Réglez sa sémantique, sa découpe et sa profondeur ; le code d’utilisation suit chaque changement."
                />
                <div className="mt-8">
                    <PixieDustInsetPlayground />
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
                            "Maintenir la lisibilité dans les deux Lumières et en contraste forcé.",
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
                    title="API de l’esquisse"
                    description="Les types spécifiques sont colocalisés dans PixieDustInset.types.ts et les attributs HTML compatibles sont transmis à l’élément rendu."
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
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="L’esquisse doit trouver sa profondeur juste dans de vraies surfaces du Codex avant de devenir PixieInset."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Éprouver les quatre variants dans des fiches et des cartes métier.",
                        "Vérifier que les trois profondeurs restent lisibles dans les deux Lumières.",
                        "Tester le contraste forcé, le zoom à 200 % et les contenus longs.",
                        "Valider la frontière entre PixieDustInset et PixieDustCallout.",
                        "Contrôler les sections et aside nommés avec un lecteur d’écran.",
                        "Décider si le variant groove apporte un usage durable au système.",
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
