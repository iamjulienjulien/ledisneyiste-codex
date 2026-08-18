import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import { getAtelierAnimationColorSlugs } from "@/registry/colors";
import { PixieSeparatorPlayground } from "./PixieSeparatorPlayground";

const variants = [
    {
        name: "Filet",
        value: "line" as const,
        position: "center" as const,
        description: "Rupture continue pour les séquences courantes.",
    },
    {
        name: "Section de fiche",
        value: "section" as const,
        position: "start" as const,
        description: "Filet du Codex marqué par l’accent familial de la fiche.",
    },
    {
        name: "Faisceau",
        value: "beam" as const,
        position: "center" as const,
        description: "Lumière centrale pour une transition plus narrative.",
    },
    {
        name: "Fondu",
        value: "fade" as const,
        position: "start" as const,
        description: "Trait qui s’efface pour une sortie de séquence douce.",
    },
    {
        name: "Pellicule",
        value: "film" as const,
        position: "center" as const,
        description: "Rythme segmenté réservé aux grandes articulations.",
    },
    {
        name: "Raccord",
        value: "splice" as const,
        position: "center" as const,
        description: "Double coupe centrale inspirée d’une bande raccordée.",
    },
    {
        name: "Décompte",
        value: "leader" as const,
        position: "center" as const,
        description: "Repère circulaire central emprunté à l’amorce de film.",
    },
] as const;

const positionalVariants = [
    { value: "section", label: "Section de fiche" },
    { value: "fade", label: "Fondu" },
    { value: "splice", label: "Raccord" },
    { value: "leader", label: "Décompte" },
] as const;

const positions = [
    { value: "start", label: "Départ" },
    { value: "center", label: "Centre" },
    { value: "end", label: "Fin" },
] as const;

const properties = [
    {
        name: "variant",
        type: "PixieSeparatorVariant",
        defaultValue: '"line"',
        description: "Traitement visuel de la rupture.",
    },
    {
        name: "intensity",
        type: "PixieSeparatorIntensity",
        defaultValue: '"subtle"',
        description: "Présence visuelle du séparateur.",
    },
    {
        name: "color",
        type: "PixieSeparatorColor",
        defaultValue: "false",
        description:
            "Teinte de L’Atelier d’animation ou couleur sémantique du thème.",
    },
    {
        name: "spacing",
        type: "PixieSeparatorSpacing",
        defaultValue: '"md"',
        description: "Respiration verticale réservée autour du séparateur.",
    },
    {
        name: "width",
        type: "PixieSeparatorWidth",
        defaultValue: '"full"',
        description: "Longueur occupée dans son conteneur.",
    },
    {
        name: "align",
        type: "PixieSeparatorAlign",
        defaultValue: '"center"',
        description: "Alignement des largeurs medium et short.",
    },
    {
        name: "position",
        type: "PixieSeparatorPosition",
        defaultValue: '"start" ou "center"',
        description:
            "Position du point focal ; start pour section et fade, center pour splice et leader.",
    },
    {
        name: "decorative",
        type: "boolean",
        defaultValue: "false",
        description: "Retire la rupture de l’arbre d’accessibilité.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au séparateur extérieur.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieSeparatorVariant",
        values: [
            '"line"',
            '"section"',
            '"beam"',
            '"fade"',
            '"film"',
            '"splice"',
            '"leader"',
        ],
        description: "Sept traitements pour différents rythmes narratifs.",
    },
    {
        name: "PixieSeparatorIntensity",
        values: ['"subtle"', '"strong"'],
        description: "Deux niveaux de présence visuelle.",
    },
    {
        name: "PixieSeparatorColor",
        values: [
            "false",
            ...getAtelierAnimationColorSlugs().map((slug) => `"${slug}"`),
        ],
        description:
            "Une couleur enregistrée ; false conserve les lignes du thème.",
    },
    {
        name: "PixieSeparatorSpacing",
        values: ['"none"', '"sm"', '"md"', '"lg"'],
        description: "Quatre respirations verticales prédéfinies.",
    },
    {
        name: "PixieSeparatorWidth",
        values: ['"full"', '"medium"', '"short"'],
        description: "Trois longueurs relatives au conteneur.",
    },
    {
        name: "PixieSeparatorAlign",
        values: ['"start"', '"center"', '"end"'],
        description: "Trois positions pour les séparateurs raccourcis.",
    },
    {
        name: "PixieSeparatorPosition",
        values: ['"start"', '"center"', '"end"'],
        description: "Trois positions internes pour le point focal.",
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
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
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

export function PixieSeparatorDossier() {
    return (
        <AtelierFicheAccessoire
            id="separateur"
            labelledBy="separateur-title"
            nom="PixieSeparator"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                            Le clap · Accessoire 005
                        </p>
                        <h2
                            id="separateur-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieSeparator
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Marquer le passage entre deux séquences sans ajouter
                            un nouveau titre ni interrompre la lecture.
                        </p>
                    </div>

                    <dl className="grid min-w-64 grid-cols-2 gap-px bg-line md:grid-cols-1">
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
                                Version
                            </dt>
                            <dd className="mt-1 font-mono text-sm text-ink">
                                1.0.0
                            </dd>
                        </div>
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
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
            <section aria-labelledby="separateur-identite" className="mt-14">
                <SequenceTitle
                    id="separateur-identite"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Le séparateur représente une rupture thématique entre deux blocs. Les bordures structurelles des listes, tableaux et cadres restent à la charge de leurs conteneurs."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Marquer un changement de séquence."],
                        [
                            "Usage",
                            "Grandes sections, transitions narratives et blocs éditoriaux.",
                        ],
                        [
                            "Limite",
                            "Ne remplace pas les divisions répétées d’une liste ou d’un tableau.",
                        ],
                        [
                            "Tokens",
                            "Lignes, accent, lumière projetée et palette d’animation.",
                        ],
                        [
                            "Accessibilité",
                            "Rupture thématique par défaut, décorative sur demande.",
                        ],
                        ["Dépendances", "React et Projection Originale."],
                    ].map(([term, definition]) => (
                        <div key={term} className="bg-surface p-5">
                            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
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
                aria-labelledby="separateur-plan"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="separateur-plan"
                    eyebrow="Plan maître"
                    title="Le filet qui change de séquence"
                    description="Le filet discret et la respiration moyenne forment le séparateur de référence."
                />

                <div className="mt-7 grid border border-line lg:grid-cols-2">
                    <div className="relative z-[10000] flex min-h-64 flex-col justify-center bg-surface p-8">
                        <p className="text-sm text-ink-soft">
                            Première séquence
                        </p>
                        <PixieSeparator />
                        <p className="text-sm text-ink-soft">
                            Séquence suivante
                        </p>
                    </div>
                    <CodeExample>{`<PixieSeparator />`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="separateur-variants" className="mt-16">
                <SequenceTitle
                    id="separateur-variants"
                    eyebrow="Essais caméra"
                    title="Sept manières de couper le plan"
                    description="Chaque variante augmente la présence narrative ; elle ne change pas la sémantique du séparateur."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {variants.map((variant) => (
                        <article key={variant.value} className="bg-surface p-6">
                            <div className="flex min-h-24 items-center">
                                <PixieSeparator
                                    variant={variant.value}
                                    position={variant.position}
                                    intensity={
                                        variant.value === "section"
                                            ? "strong"
                                            : "subtle"
                                    }
                                    spacing="sm"
                                />
                            </div>
                            <h4 className="mt-4 text-xl text-ink">
                                {variant.name}
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-muted">
                                {variant.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="separateur-position" className="mt-16">
                <SequenceTitle
                    id="separateur-position"
                    eyebrow="Placement du repère"
                    title="Le point focal se déplace dans le plan"
                    description="La position agit sur le segment épais, la zone opaque, le raccord ou le repère circulaire sans déplacer le séparateur lui-même."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-2">
                    {positionalVariants.map((variant) => (
                        <article key={variant.value} className="bg-surface p-6">
                            <h4 className="text-xl text-ink">
                                {variant.label}
                            </h4>
                            <div className="mt-5 space-y-5">
                                {positions.map((position) => (
                                    <div key={position.value}>
                                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                                            {position.label}
                                        </p>
                                        <PixieSeparator
                                            variant={variant.value}
                                            position={position.value}
                                            intensity="strong"
                                            color="bleu-reperage"
                                            spacing="sm"
                                        />
                                    </div>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="separateur-intensities" className="mt-16">
                <SequenceTitle
                    id="separateur-intensities"
                    eyebrow="Direction artistique"
                    title="Deux intensités de lumière"
                    description="L’intensité discrète reste la norme ; la version soutenue accompagne les articulations importantes."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Discret
                        </p>
                        <PixieSeparator intensity="subtle" spacing="sm" />
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Soutenu
                        </p>
                        <PixieSeparator intensity="strong" spacing="sm" />
                    </article>
                </div>
            </section>

            <section aria-labelledby="separateur-spacing" className="mt-16">
                <SequenceTitle
                    id="separateur-spacing"
                    eyebrow="Montage"
                    title="Quatre respirations verticales"
                    description="La respiration exprime la distance éditoriale entre les séquences, pas l’importance du trait."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {(
                        [
                            { label: "Aucune", spacing: "none" },
                            { label: "Petite", spacing: "sm" },
                            { label: "Moyenne", spacing: "md" },
                            { label: "Grande", spacing: "lg" },
                        ] as const
                    ).map(({ label, spacing }) => (
                        <article key={spacing} className="bg-surface p-6">
                            <p className="text-xs uppercase tracking-[0.16em] text-muted">
                                {label}
                            </p>
                            <PixieSeparator spacing={spacing} />
                            <p className="text-xs text-muted">
                                spacing=&quot;{spacing}&quot;
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="separateur-width" className="mt-16">
                <SequenceTitle
                    id="separateur-width"
                    eyebrow="Cadrage"
                    title="Trois longueurs dans le plan"
                    description="Une rupture peut traverser tout le cadre ou devenir une respiration plus localisée."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
                    {(
                        [
                            {
                                label: "Pleine largeur",
                                width: "full",
                                align: "center",
                            },
                            {
                                label: "Moyenne au départ",
                                width: "medium",
                                align: "start",
                            },
                            {
                                label: "Courte à la fin",
                                width: "short",
                                align: "end",
                            },
                        ] as const
                    ).map(({ label, width, align }) => (
                        <article key={label} className="bg-surface p-6">
                            <p className="text-xs uppercase tracking-[0.16em] text-muted">
                                {label}
                            </p>
                            <PixieSeparator
                                width={width}
                                align={align}
                                spacing="sm"
                            />
                            <p className="font-mono text-xs text-muted">
                                {width} · {align}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="separateur-color" className="mt-16">
                <SequenceTitle
                    id="separateur-color"
                    eyebrow="Couleur de production"
                    title="Une couleur enregistrée pour les ruptures éditoriales"
                    description="Une référence de L’Atelier d’animation peut remplacer les lignes du thème lorsque le contexte le justifie."
                />

                <div className="mt-7 border border-line bg-surface p-8">
                    <PixieSeparator
                        variant="beam"
                        intensity="strong"
                        color="bleu-reperage"
                    />
                    <p className="text-center text-sm text-muted">
                        Repère bleu de la table lumineuse
                    </p>
                </div>
            </section>

            <section
                aria-labelledby="separateur-accessibilite"
                className="mt-16"
            >
                <SequenceTitle
                    id="separateur-accessibilite"
                    eyebrow="Accessibilité"
                    title="Rupture annoncée ou simple respiration visuelle"
                    description="Le choix dépend du contenu : une vraie transition thématique doit rester perceptible au-delà de son dessin."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Sémantique par défaut
                        </p>
                        <p className="mt-4 text-sm leading-6 text-ink-soft">
                            Le composant produit un élément hr qui signale une
                            rupture thématique aux technologies d’assistance.
                        </p>
                        <PixieSeparator spacing="sm" />
                        <code className="font-mono text-xs text-accent">
                            decorative=false
                        </code>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Décoratif sur demande
                        </p>
                        <p className="mt-4 text-sm leading-6 text-ink-soft">
                            Une respiration déjà annoncée par un titre peut être
                            retirée de l’arbre d’accessibilité.
                        </p>
                        <PixieSeparator decorative spacing="sm" />
                        <code className="font-mono text-xs text-accent">
                            decorative=true
                        </code>
                    </article>
                </div>
            </section>

            <section
                aria-labelledby="separateur-regie"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="separateur-regie"
                    eyebrow="Régie"
                    title="Monter une rupture en direct"
                    description="Le traitement, la couleur, la respiration et la sémantique peuvent être combinés sur un plateau isolé."
                />
                <div className="mt-7">
                    <PixieSeparatorPlayground />
                </div>
            </section>

            <section
                aria-labelledby="separateur-generique"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="separateur-generique"
                    eyebrow="Générique technique"
                    title="Types et propriétés du composant"
                />

                <div className="mt-7">
                    <AtelierPropertiesTable properties={properties} />
                </div>

                <div className="mt-10">
                    <h4 className="text-xl text-ink">Types spécifiques</h4>
                    <p className="mt-2 text-sm leading-6 text-muted">
                        Les traitements, intensités, couleurs, respirations et
                        cadrages admis par le séparateur.
                    </p>
                    <div className="mt-4">
                        <AtelierTypesTable types={specificTypes} />
                    </div>
                </div>
            </section>
        </AtelierFicheAccessoire>
    );
}
