import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieDustSeparator } from "@/components/ui/PixieDustSeparator";
import { PixieDustSeparatorPlayground } from "./PixieDustSeparatorPlayground";

const variants = [
    {
        name: "Filet",
        value: "line" as const,
        description: "Rupture continue pour les séquences courantes.",
    },
    {
        name: "Faisceau",
        value: "beam" as const,
        description: "Lumière centrale pour une transition plus narrative.",
    },
    {
        name: "Pellicule",
        value: "film" as const,
        description: "Rythme segmenté réservé aux grandes articulations.",
    },
] as const;

const properties = [
    {
        name: "variant",
        type: "PixieDustSeparatorVariant",
        defaultValue: '"line"',
        description: "Traitement visuel de la rupture.",
    },
    {
        name: "tone",
        type: "PixieDustSeparatorTone",
        defaultValue: '"subtle"',
        description: "Origine et intensité de sa couleur.",
    },
    {
        name: "spacing",
        type: "PixieDustSeparatorSpacing",
        defaultValue: '"md"',
        description: "Respiration verticale réservée autour du séparateur.",
    },
    {
        name: "accent",
        type: "string",
        defaultValue: "accent du thème",
        description: "Couleur CSS personnalisée utilisée avec le ton accent.",
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
        name: "PixieDustSeparatorVariant",
        values: ['"line"', '"beam"', '"film"'],
        description: "Trois traitements pour trois intensités narratives.",
    },
    {
        name: "PixieDustSeparatorTone",
        values: ['"subtle"', '"strong"', '"accent"', '"inherit"'],
        description: "Quatre origines ou niveaux de couleur.",
    },
    {
        name: "PixieDustSeparatorSpacing",
        values: ['"sm"', '"md"', '"lg"'],
        description: "Trois respirations verticales prédéfinies.",
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

export function PixieDustSeparatorDossier() {
    return (
        <AtelierFicheAccessoire
            id="separateur"
            labelledBy="separateur-title"
            nom="PixieDustSeparator"
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
                            PixieDustSeparator
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
                                0.1.0
                            </dd>
                        </div>
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
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
                        <PixieDustSeparator />
                        <p className="text-sm text-ink-soft">
                            Séquence suivante
                        </p>
                    </div>
                    <CodeExample>{`<PixieDustSeparator />`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="separateur-variants" className="mt-16">
                <SequenceTitle
                    id="separateur-variants"
                    eyebrow="Essais caméra"
                    title="Trois manières de couper le plan"
                    description="Chaque variante augmente la présence narrative ; elle ne change pas la sémantique du séparateur."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
                    {variants.map((variant) => (
                        <article key={variant.value} className="bg-surface p-6">
                            <div className="flex min-h-24 items-center">
                                <PixieDustSeparator
                                    variant={variant.value}
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

            <section aria-labelledby="separateur-tones" className="mt-16">
                <SequenceTitle
                    id="separateur-tones"
                    eyebrow="Direction artistique"
                    title="Quatre intensités de lumière"
                    description="Le ton discret reste la norme ; les couleurs plus présentes signalent une articulation exceptionnelle."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Discret
                        </p>
                        <PixieDustSeparator tone="subtle" spacing="sm" />
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Soutenu
                        </p>
                        <PixieDustSeparator tone="strong" spacing="sm" />
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Accent
                        </p>
                        <PixieDustSeparator tone="accent" spacing="sm" />
                    </article>
                    <article className="bg-surface p-6 text-famille-epoques">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Hérité
                        </p>
                        <PixieDustSeparator tone="inherit" spacing="sm" />
                    </article>
                </div>
            </section>

            <section aria-labelledby="separateur-spacing" className="mt-16">
                <SequenceTitle
                    id="separateur-spacing"
                    eyebrow="Montage"
                    title="Trois respirations verticales"
                    description="La respiration exprime la distance éditoriale entre les séquences, pas l’importance du trait."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
                    {[
                        ["Petite", "sm"],
                        ["Moyenne", "md"],
                        ["Grande", "lg"],
                    ].map(([label, spacing]) => (
                        <article key={label} className="bg-surface p-6">
                            <p className="text-xs uppercase tracking-[0.16em] text-muted">
                                {label}
                            </p>
                            <PixieDustSeparator
                                spacing={spacing as "sm" | "md" | "lg"}
                            />
                            <p className="text-xs text-muted">
                                spacing=&quot;{spacing}&quot;
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="separateur-accent" className="mt-16">
                <SequenceTitle
                    id="separateur-accent"
                    eyebrow="Couleur de production"
                    title="Un accent pour les ruptures éditoriales"
                    description="Une couleur de L’Atelier d’animation peut remplacer l’accent du thème lorsque le contexte le justifie."
                />

                <div className="mt-7 border border-line bg-surface p-8">
                    <PixieDustSeparator
                        variant="beam"
                        tone="accent"
                        accent="var(--atelier-animation-bleu-reperage)"
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
                        <PixieDustSeparator spacing="sm" />
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
                        <PixieDustSeparator decorative spacing="sm" />
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
                    <PixieDustSeparatorPlayground />
                </div>
            </section>

            <section
                aria-labelledby="separateur-generique"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="separateur-generique"
                    eyebrow="Générique technique"
                    title="Types et propriétés de l’esquisse"
                />

                <div className="mt-7">
                    <AtelierPropertiesTable properties={properties} />
                </div>

                <div className="mt-10">
                    <h4 className="text-xl text-ink">Types spécifiques</h4>
                    <p className="mt-2 text-sm leading-6 text-muted">
                        Les traitements, tons et respirations admis par le
                        séparateur.
                    </p>
                    <div className="mt-4">
                        <AtelierTypesTable types={specificTypes} />
                    </div>
                </div>
            </section>

            <section aria-labelledby="separateur-journal" className="mt-16">
                <SequenceTitle
                    id="separateur-journal"
                    eyebrow="Journal de production"
                    title="Les conditions du passage à PixieSeparator"
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Contextes réels
                        </p>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Comparer les trois respirations sur une fiche longue
                            et un petit écran avant de fixer leur rythme.
                        </p>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Validation
                        </p>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Vérifier la discrétion de la variante film et la
                            pertinence de chaque rupture avec ou sans
                            sémantique.
                        </p>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Promotion
                        </p>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Remplacer une vraie rupture sans détourner les
                            bordures structurelles, puis le renommer en
                            PixieSeparator 1.0.0.
                        </p>
                    </article>
                </div>
            </section>
        </AtelierFicheAccessoire>
    );
}
