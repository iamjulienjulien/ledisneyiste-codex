import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import { PixieBadgePlayground } from "./PixieBadgePlayground";

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
    {
        name: "Plein",
        value: "solid" as const,
        description:
            "Couleur entièrement projetée avec une encre de contraste contrôlée.",
    },
] as const;

const sizes = [
    { name: "Très petit", value: "xs" as const },
    { name: "Petit", value: "sm" as const },
    { name: "Moyen", value: "md" as const },
    { name: "Grand", value: "lg" as const },
    { name: "Très grand", value: "xl" as const },
] as const;

const properties = [
    {
        name: "registry",
        type: "MetadataRegistryName",
        defaultValue: "—",
        description: "Registre utilisé par le mode métadonnée.",
    },
    {
        name: "collection",
        type: "MetadataCollectionName",
        defaultValue: "—",
        description: "Collection disponible dans le registre choisi.",
    },
    {
        name: "slug",
        type: "MetadataSlug",
        defaultValue: "—",
        description: "Identifiant qui résout le libellé et ses couleurs.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Libellé obligatoire uniquement dans le mode libre.",
    },
    {
        name: "variant",
        type: "PixieBadgeVariant",
        defaultValue: '"soft"',
        description: "Niveau d’encadrement visuel du cartouche.",
    },
    {
        name: "tone",
        type: "PixieBadgeTone",
        defaultValue: '"color"',
        description: "Origine de la couleur appliquée au cartouche.",
    },
    {
        name: "size",
        type: "PixieBadgeSize",
        defaultValue: '"md"',
        description: "Densité typographique et espace intérieur.",
    },
    {
        name: "shape",
        type: "PixieBadgeShape",
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
        name: "color",
        type: "AtelierAnimationColorSlug",
        defaultValue: "couleur du thème",
        description:
            "Nom d’une couleur de L’Atelier d’animation dans le mode libre.",
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
        name: "PixieBadgeVariant",
        values: ['"soft"', '"outline"', '"plain"', '"solid"'],
        description: "Quatre niveaux de présence du cartouche.",
    },
    {
        name: "PixieBadgeTone",
        values: ['"neutral"', '"color"', '"inherit"'],
        description: "Trois origines possibles pour sa couleur.",
    },
    {
        name: "PixieBadgeSize",
        values: ['"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Cinq densités, de la série compacte au plan héro.",
    },
    {
        name: "PixieBadgeShape",
        values: ['"rounded"', '"pill"'],
        description: "Deux silhouettes sans modifier la densité.",
    },
    {
        name: "AtelierAnimationColorSlug",
        values: getAtelierAnimationColorSlugs().map((slug) => `"${slug}"`),
        description:
            "Vingt noms de couleurs reliés à leur valeur et leur contraste.",
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

export function PixieBadgeDossier() {
    return (
        <AtelierFicheAccessoire
            id="cartouche"
            labelledBy="cartouche-title"
            nom="PixieBadge"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Accessoire 004
                        </p>
                        <h2
                            id="cartouche-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieBadge
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Projeter une métadonnée du registre ou qualifier une
                            information libre sans la transformer en action.
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
                            "Catégories, collections, caractéristiques techniques et récompenses.",
                        ],
                        [
                            "Limite",
                            "Ne filtre pas, ne navigue pas et ne déclenche aucune action.",
                        ],
                        [
                            "Tokens",
                            "Encres de contraste, couleurs, lignes, rayons et palette d’animation.",
                        ],
                        [
                            "Accessibilité",
                            "Libellé autonome ; couleur et icône toujours secondaires.",
                        ],
                        [
                            "Dépendances",
                            "React, Projection Originale et registre des métadonnées.",
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
                aria-labelledby="cartouche-plan"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="cartouche-plan"
                    eyebrow="Plan maître"
                    title="Une métadonnée entre en scène depuis son registre"
                    description="Les coordonnées suffisent : le registre fournit le libellé et le nom de couleur ; PixieBadge résout sa valeur et son contraste sans duplication dans l’écran."
                />

                <div className="mt-7 grid border border-line lg:grid-cols-2">
                    <div className="relative z-[10000] flex min-h-64 items-center justify-center bg-surface p-8">
                        <PixieBadge
                            registry="oeuvres"
                            collection="types"
                            slug="court-metrage-anime"
                            variant="solid"
                        />
                    </div>
                    <CodeExample>{`<PixieBadge
    registry="oeuvres"
    collection="types"
    slug="court-metrage-anime"
    variant="solid"
/>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="cartouche-variants" className="mt-16">
                <SequenceTitle
                    id="cartouche-variants"
                    eyebrow="Essais caméra"
                    title="Quatre niveaux de présence"
                    description="La variante répond à la densité de son contexte ; le nouveau plein projette entièrement la couleur sans modifier le rôle passif."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
                    {variants.map((variant) => (
                        <article
                            key={variant.value}
                            className="relative z-[10000] bg-surface p-6"
                        >
                            <div className="flex min-h-28 items-center justify-center">
                                <PixieBadge
                                    registry="oeuvres"
                                    collection="types"
                                    slug="court-metrage-anime"
                                    variant={variant.value}
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

            <section aria-labelledby="cartouche-tones" className="mt-16">
                <SequenceTitle
                    id="cartouche-tones"
                    eyebrow="Direction artistique"
                    title="Le mode libre emprunte les couleurs du contexte"
                    description="Lorsqu’aucun registre ne pilote le badge, tone choisit l’origine de sa couleur et color reçoit son nom dans L’Atelier d’animation."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    <article className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Neutre
                        </p>
                        <div className="mt-5">
                            <PixieBadge tone="neutral">1934</PixieBadge>
                        </div>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Couleur
                        </p>
                        <div className="mt-5">
                            <PixieBadge tone="color">Court métrage</PixieBadge>
                        </div>
                    </article>
                    <article className="bg-surface p-6 text-famille-createurs">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Hérité
                        </p>
                        <div className="mt-5">
                            <PixieBadge tone="inherit">Créateur</PixieBadge>
                        </div>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Personnalisé
                        </p>
                        <div className="mt-5">
                            <PixieBadge color="gouache">Animation</PixieBadge>
                        </div>
                    </article>
                </div>
            </section>

            <section aria-labelledby="cartouche-registres" className="mt-16">
                <SequenceTitle
                    id="cartouche-registres"
                    eyebrow="Distribution"
                    title="Quatre registres, un même contrat"
                    description="Chaque badge reçoit uniquement ses coordonnées ; son texte et son traitement coloré restent centralisés dans le vocabulaire métier."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    <article className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Personnages
                        </p>
                        <div className="mt-5">
                            <PixieBadge
                                registry="personnages"
                                collection="categories"
                                slug="cercle-de-mickey"
                                variant="solid"
                            />
                        </div>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Contributeurs
                        </p>
                        <div className="mt-5">
                            <PixieBadge
                                registry="contributeurs"
                                collection="categories"
                                slug="animateur"
                                variant="solid"
                            />
                        </div>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Œuvres
                        </p>
                        <div className="mt-5">
                            <PixieBadge
                                registry="oeuvres"
                                collection="collections"
                                slug="silly-symphonies"
                                variant="solid"
                            />
                        </div>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Récompenses
                        </p>
                        <div className="mt-5">
                            <PixieBadge
                                registry="recompenses"
                                collection="natures"
                                slug="honorary"
                                variant="solid"
                            />
                        </div>
                    </article>
                </div>
            </section>

            <section aria-labelledby="cartouche-formats" className="mt-16">
                <SequenceTitle
                    id="cartouche-formats"
                    eyebrow="Cadrage"
                    title="Quatre variantes sur cinq tailles"
                    description="La matrice vérifie que la densité évolue sans modifier la hiérarchie des variantes ni la stabilité du libellé."
                />

                <div className="mt-7 overflow-hidden border border-line bg-line">
                    {variants.map((variant) => (
                        <article
                            key={variant.value}
                            className="grid gap-px border-b border-line bg-line last:border-b-0 lg:grid-cols-[12rem_1fr]"
                        >
                            <div className="bg-surface-muted p-5">
                                <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                    {variant.name}
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-5 bg-surface p-5">
                                {sizes.map((size) => (
                                    <PixieBadge
                                        key={size.value}
                                        registry="oeuvres"
                                        collection="couleurs"
                                        slug="couleur"
                                        variant={variant.value}
                                        size={size.value}
                                    />
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="cartouche-palette" className="mt-16">
                <SequenceTitle
                    id="cartouche-palette"
                    eyebrow="Essai Technicolor"
                    title="Le plein traverse les vingt références"
                    description="Chaque couleur est associée à une encre claire ou sombre dans le registre afin que la variante pleine reste lisible dans les deux lumières."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {getAtelierAnimationColorSlugs().map((slug) => {
                        const color = getAtelierAnimationColor(slug);

                        return (
                            <article key={slug} className="bg-surface p-5">
                                <PixieBadge
                                    variant="solid"
                                    size="sm"
                                    color={slug}
                                >
                                    {color.label}
                                </PixieBadge>
                            </article>
                        );
                    })}
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
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Sans symbole
                        </p>
                        <div className="mt-5">
                            <PixieBadge>Œuvre</PixieBadge>
                        </div>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Avec symbole
                        </p>
                        <div className="mt-5">
                            <PixieBadge
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
                            </PixieBadge>
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
                            <h4 className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
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
                    <PixieBadgePlayground />
                </div>
            </section>

            <section
                aria-labelledby="cartouche-generique"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="cartouche-generique"
                    eyebrow="Générique technique"
                    title="API du composant"
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
        </AtelierFicheAccessoire>
    );
}
