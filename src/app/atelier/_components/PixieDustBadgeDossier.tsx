import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieDustBadge } from "@/components/ui/PixieDustBadge";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { PixieDustBadgePlayground } from "./PixieDustBadgePlayground";

const variants = [
    {
        name: "Doux",
        value: "soft" as const,
        description: "Fond légèrement teinté pour le cartouche courant.",
    },
    {
        name: "Contour",
        value: "outline" as const,
        description: "Cadre plus net sur une surface déjà structurée.",
    },
    {
        name: "Simple",
        value: "plain" as const,
        description: "Libellé seul lorsque le contexte fournit déjà le cadre.",
    },
] as const;

const properties = [
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Libellé bref porté par le cartouche.",
    },
    {
        name: "variant",
        type: "PixieDustBadgeVariant",
        defaultValue: '"soft"',
        description: "Niveau d’encadrement visuel du cartouche.",
    },
    {
        name: "tone",
        type: "PixieDustBadgeTone",
        defaultValue: '"accent"',
        description: "Origine de la couleur appliquée au cartouche.",
    },
    {
        name: "size",
        type: "PixieDustBadgeSize",
        defaultValue: '"md"',
        description: "Densité typographique et espace intérieur.",
    },
    {
        name: "shape",
        type: "PixieDustBadgeShape",
        defaultValue: '"rounded"',
        description: "Forme rectangulaire arrondie ou capsule.",
    },
    {
        name: "icon",
        type: "ReactNode",
        defaultValue: "—",
        description: "Élément décoratif optionnel placé avant le libellé.",
    },
    {
        name: "accent",
        type: "string",
        defaultValue: "accent du thème",
        description: "Couleur CSS personnalisée utilisée avec le ton accent.",
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
        name: "PixieDustBadgeVariant",
        values: ['"soft"', '"outline"', '"plain"'],
        description: "Trois niveaux d’encadrement du cartouche.",
    },
    {
        name: "PixieDustBadgeTone",
        values: ['"neutral"', '"accent"', '"inherit"'],
        description: "Trois origines possibles pour sa couleur.",
    },
    {
        name: "PixieDustBadgeSize",
        values: ['"sm"', '"md"'],
        description: "Deux densités adaptées aux métadonnées brèves.",
    },
    {
        name: "PixieDustBadgeShape",
        values: ['"rounded"', '"pill"'],
        description: "Deux silhouettes sans modifier la densité.",
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

export function PixieDustBadgeDossier() {
    return (
        <AtelierFicheAccessoire
            id="cartouche"
            labelledBy="cartouche-title"
            nom="PixieDustBadge"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                            Le clap · Accessoire 004
                        </p>
                        <h2
                            id="cartouche-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustBadge
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Qualifier une information brève sans la transformer
                            en action ni détourner l’attention du contenu.
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
            <section aria-labelledby="cartouche-identite" className="mt-14">
                <SequenceTitle
                    id="cartouche-identite"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Le cartouche rend une métadonnée immédiatement repérable. Il reste volontairement passif afin de ne pas être confondu avec un contrôle."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Qualifier une information courte."],
                        [
                            "Usage",
                            "Types d’œuvres, époques, états et métadonnées éditoriales.",
                        ],
                        [
                            "Limite",
                            "Ne filtre pas, ne navigue pas et ne déclenche aucune action.",
                        ],
                        [
                            "Tokens",
                            "Encres, accent, lignes, petits rayons et palette d’animation.",
                        ],
                        [
                            "Accessibilité",
                            "Libellé autonome ; couleur et icône toujours secondaires.",
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
                aria-labelledby="cartouche-plan"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="cartouche-plan"
                    eyebrow="Plan maître"
                    title="Le cartouche dans sa forme de référence"
                    description="La variante douce, le ton accent, la taille moyenne et la forme arrondie constituent le point de départ."
                />

                <div className="mt-7 grid border border-line lg:grid-cols-2">
                    <div className="relative z-[10000] flex min-h-64 items-center justify-center bg-surface p-8">
                        <PixieDustBadge>Court métrage</PixieDustBadge>
                    </div>
                    <CodeExample>{`<PixieDustBadge>
    Court métrage
</PixieDustBadge>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="cartouche-variants" className="mt-16">
                <SequenceTitle
                    id="cartouche-variants"
                    eyebrow="Essais caméra"
                    title="Trois niveaux d’encadrement"
                    description="La variante répond à la densité de son contexte, sans créer de hiérarchie fonctionnelle."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
                    {variants.map((variant) => (
                        <article
                            key={variant.value}
                            className="relative z-[10000] bg-surface p-6"
                        >
                            <div className="flex min-h-28 items-center justify-center">
                                <PixieDustBadge variant={variant.value}>
                                    Court métrage
                                </PixieDustBadge>
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

            <section aria-labelledby="cartouche-tones" className="mt-16">
                <SequenceTitle
                    id="cartouche-tones"
                    eyebrow="Direction artistique"
                    title="Les couleurs du contexte et des métadonnées"
                    description="Le ton choisit l’origine de la couleur ; accent accepte ensuite une valeur précise de L’Atelier d’animation."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Neutre
                        </p>
                        <div className="mt-5">
                            <PixieDustBadge tone="neutral">1934</PixieDustBadge>
                        </div>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Accent
                        </p>
                        <div className="mt-5">
                            <PixieDustBadge tone="accent">
                                Court métrage
                            </PixieDustBadge>
                        </div>
                    </article>
                    <article className="bg-surface p-6 text-famille-createurs">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Hérité
                        </p>
                        <div className="mt-5">
                            <PixieDustBadge tone="inherit">
                                Créateur
                            </PixieDustBadge>
                        </div>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Personnalisé
                        </p>
                        <div className="mt-5">
                            <PixieDustBadge accent="var(--atelier-animation-gouache)">
                                Animation
                            </PixieDustBadge>
                        </div>
                    </article>
                </div>
            </section>

            <section aria-labelledby="cartouche-formats" className="mt-16">
                <SequenceTitle
                    id="cartouche-formats"
                    eyebrow="Cadrage"
                    title="Deux tailles et deux silhouettes"
                    description="La taille règle la densité ; la forme adapte le cartouche à son environnement."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        ["Petit arrondi", "sm", "rounded"],
                        ["Petit capsule", "sm", "pill"],
                        ["Moyen arrondi", "md", "rounded"],
                        ["Moyen capsule", "md", "pill"],
                    ].map(([label, size, shape]) => (
                        <article key={label} className="bg-surface p-6">
                            <p className="text-xs uppercase tracking-[0.16em] text-muted">
                                {label}
                            </p>
                            <div className="mt-5">
                                <PixieDustBadge
                                    size={size as "sm" | "md"}
                                    shape={shape as "rounded" | "pill"}
                                >
                                    Époque
                                </PixieDustBadge>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="cartouche-icons" className="mt-16">
                <SequenceTitle
                    id="cartouche-icons"
                    eyebrow="Accessoires de jeu"
                    title="Le symbole accompagne, le texte qualifie"
                    description="L’icône renforce le repère visuel mais reste décorative : le libellé doit suffire seul."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Sans symbole
                        </p>
                        <div className="mt-5">
                            <PixieDustBadge>Œuvre</PixieDustBadge>
                        </div>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Avec symbole
                        </p>
                        <div className="mt-5">
                            <PixieDustBadge
                                icon={
                                    <PixieSymbol
                                        registry="codex"
                                        collection="index"
                                        slug="oeuvres"
                                        size={14}
                                    />
                                }
                            >
                                Œuvre
                            </PixieDustBadge>
                        </div>
                    </article>
                </div>
            </section>

            <section
                aria-labelledby="cartouche-accessibilite"
                className="mt-16"
            >
                <SequenceTitle
                    id="cartouche-accessibilite"
                    eyebrow="Accessibilité"
                    title="Le libellé porte toujours le sens"
                    description="Le cartouche ne reçoit ni rôle interactif ni annonce dynamique par défaut."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
                    {[
                        [
                            "Texte autonome",
                            "Le libellé reste compréhensible sans sa couleur ni son icône.",
                        ],
                        [
                            "Icône décorative",
                            "Le composant masque automatiquement l’icône aux technologies d’assistance.",
                        ],
                        [
                            "Aucune interaction",
                            "Le cartouche n’entre pas dans l’ordre de tabulation et ne simule aucun bouton.",
                        ],
                    ].map(([title, description]) => (
                        <article key={title} className="bg-surface p-6">
                            <h4 className="text-xs uppercase tracking-[0.16em] text-muted">
                                {title}
                            </h4>
                            <p className="mt-4 text-sm leading-6 text-ink-soft">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section
                aria-labelledby="cartouche-regie"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="cartouche-regie"
                    eyebrow="Régie"
                    title="Composer un cartouche en direct"
                    description="Le libellé, l’encadrement, la couleur, la densité et le symbole peuvent être combinés sur un plateau isolé."
                />
                <div className="mt-7">
                    <PixieDustBadgePlayground />
                </div>
            </section>

            <section
                aria-labelledby="cartouche-generique"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="cartouche-generique"
                    eyebrow="Générique technique"
                    title="Types et propriétés de l’esquisse"
                />

                <div className="mt-7">
                    <AtelierPropertiesTable properties={properties} />
                </div>

                <div className="mt-10">
                    <h4 className="text-xl text-ink">Types spécifiques</h4>
                    <p className="mt-2 text-sm leading-6 text-muted">
                        Les variantes, tons, tailles et formes admis par le
                        cartouche.
                    </p>
                    <div className="mt-4">
                        <AtelierTypesTable types={specificTypes} />
                    </div>
                </div>
            </section>

            <section aria-labelledby="cartouche-journal" className="mt-16">
                <SequenceTitle
                    id="cartouche-journal"
                    eyebrow="Journal de production"
                    title="Ce qu’il reste à éprouver"
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Densité
                        </p>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Tester les séries de plusieurs cartouches sur mobile
                            et au zoom à 200 %.
                        </p>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Couleurs
                        </p>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Éprouver les futures métadonnées avec toute la
                            palette de L’Atelier d’animation.
                        </p>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Frontière
                        </p>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Préserver la distinction avec les futurs filtres et
                            cartouches interactifs.
                        </p>
                    </article>
                </div>
            </section>
        </AtelierFicheAccessoire>
    );
}
