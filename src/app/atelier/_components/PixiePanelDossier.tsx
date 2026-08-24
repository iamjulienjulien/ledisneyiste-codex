import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import {
    PixiePanel,
    type PixiePanelPadding,
    type PixiePanelRadius,
    type PixiePanelVariant,
} from "@/components/ui/PixiePanel";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixiePanelPlayground } from "./PixiePanelPlayground";

const variants = [
    {
        name: "Sans surface",
        value: "plain" as const,
        description: "Une anatomie en trois zones sans décor visible.",
    },
    {
        name: "Surface",
        value: "surface" as const,
        description: "Une zone stable qui se détache discrètement du fond.",
    },
    {
        name: "Atténué",
        value: "muted" as const,
        description: "Une région secondaire posée en retrait du récit.",
    },
    {
        name: "Contour",
        value: "outline" as const,
        description: "Une structure transparente délimitée par une ligne.",
    },
    {
        name: "Accent",
        value: "accent" as const,
        description: "Une entrée colorée qui identifie la zone sans la nommer.",
    },
    {
        name: "Teinté",
        value: "tinted" as const,
        description: "Une lumière colorée diffuse sur toute la surface.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixiePanelVariant;
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
    value: PixiePanelPadding;
    token: string;
}>[];

const radii = [
    { name: "Aucun", value: "none" as const },
    { name: "Petit", value: "small" as const },
    { name: "Moyen", value: "medium" as const },
    { name: "Grand", value: "large" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixiePanelRadius;
}>[];

const properties = [
    {
        name: "as",
        type: "PixiePanelElement",
        defaultValue: '"section"',
        description: "Élément HTML porté par le panneau.",
    },
    {
        name: "variant",
        type: "PixiePanelVariant",
        defaultValue: '"surface"',
        description: "Traitement visuel de la surface structurée.",
    },
    {
        name: "padding",
        type: "PixiePanelPadding",
        defaultValue: '"lg"',
        description: "Espacement intérieur appliqué à chacune des zones.",
    },
    {
        name: "headerPadding",
        type: "PixiePanelPadding",
        defaultValue: "padding",
        description: "Surcharge l’espacement de la zone d’en-tête.",
    },
    {
        name: "bodyPadding",
        type: "PixiePanelPadding",
        defaultValue: "padding",
        description: "Surcharge l’espacement du contenu principal.",
    },
    {
        name: "footerPadding",
        type: "PixiePanelPadding",
        defaultValue: "padding",
        description: "Surcharge l’espacement de la zone de conclusion.",
    },
    {
        name: "radius",
        type: "PixiePanelRadius",
        defaultValue: '"medium"',
        description: "Arrondi extérieur du panneau.",
    },
    {
        name: "color",
        type: "PixiePanelColor",
        defaultValue: "false",
        description: "Couleur du registre ou accent courant du thème.",
    },
    {
        name: "accentPosition",
        type: "PixiePanelAccentPosition",
        defaultValue: '"start"',
        description: "Place le repère coloré sur l’un des quatre bords.",
    },
    {
        name: "elevation",
        type: "PixiePanelElevation",
        defaultValue: '"none"',
        description: "Règle la profondeur indépendamment de la surface.",
    },
    {
        name: "dividers",
        type: "PixiePanelDividers",
        defaultValue: '"none"',
        description: "Sépare une zone précise ou les deux zones périphériques.",
    },
    {
        name: "scroll",
        type: "PixiePanelScroll",
        defaultValue: '"none"',
        description: "Confie le défilement au seul corps du panneau.",
    },
    {
        name: "maxHeight",
        type: 'CSSProperties["maxHeight"]',
        defaultValue: "—",
        description: 'Contraint la hauteur, notamment avec scroll="body".',
    },
    {
        name: "header",
        type: "ReactNode",
        defaultValue: "—",
        description: "Zone d’introduction ou de commandes facultative.",
    },
    {
        name: "footer",
        type: "ReactNode",
        defaultValue: "—",
        description: "Zone de conclusion ou d’actions facultative.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Contenu principal obligatoire du panneau.",
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
        name: "PixiePanelElement",
        values: ['"div"', '"section"', '"aside"', '"article"'],
        description: "Éléments sémantiques autorisés pour le panneau.",
    },
    {
        name: "PixiePanelVariant",
        values: [
            '"plain"',
            '"surface"',
            '"muted"',
            '"outline"',
            '"accent"',
            '"tinted"',
        ],
        description: "Traitements visuels d’une zone structurelle.",
    },
    {
        name: "PixiePanelColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Couleur enregistrée ou accent courant du thème.",
    },
    {
        name: "PixiePanelPadding",
        values: ['"none"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Densités appliquées uniformément aux zones présentes.",
    },
    {
        name: "PixiePanelRadius",
        values: ['"none"', '"small"', '"medium"', '"large"'],
        description: "Rayons disponibles dans la Projection Originale.",
    },
    {
        name: "PixiePanelAccentPosition",
        values: ['"top"', '"end"', '"bottom"', '"start"'],
        description: "Bord qui reçoit le repère coloré du variant accent.",
    },
    {
        name: "PixiePanelElevation",
        values: ['"none"', '"soft"', '"strong"'],
        description: "Niveaux de profondeur indépendants du variant.",
    },
    {
        name: "PixiePanelDividers",
        values: ['"none"', '"header"', '"footer"', '"both"'],
        description: "Zones périphériques séparées du contenu central.",
    },
    {
        name: "PixiePanelScroll",
        values: ['"none"', '"body"'],
        description: "Région autorisée à défiler dans une hauteur contrainte.",
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

function PanelHeader() {
    return (
        <div>
            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                Salle de montage
            </p>
            <h4 id="panel-master-title" className="mt-2 text-2xl text-ink">
                Documents de production
            </h4>
        </div>
    );
}

function PanelContent() {
    return (
        <div>
            <p className="leading-7 text-ink-soft">
                Le panneau rassemble les notes, les sources et les décisions
                d’une même séquence sans transformer cet ensemble en unité
                répétable.
            </p>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="border border-line p-4">
                    <dt className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                        État
                    </dt>
                    <dd className="mt-2 text-ink">En préparation</dd>
                </div>
                <div className="border border-line p-4">
                    <dt className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                        Éléments
                    </dt>
                    <dd className="mt-2 text-ink">6 documents</dd>
                </div>
            </dl>
        </div>
    );
}

export function PixiePanelDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-panel"
            labelledBy="pixie-panel-title"
            nom="PixiePanel"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Décor 002
                        </p>
                        <h2
                            id="pixie-panel-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixiePanel
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Regrouper une section complète dans une surface
                            structurée sans décider de son récit.
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
            <section aria-labelledby="panel-identity" className="mt-14">
                <SequenceTitle
                    id="panel-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Le panneau installe une région durable dans une page. Il peut articuler une introduction, un contenu et une conclusion sans connaître leur sujet."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Structurer une zone éditoriale complète."],
                        [
                            "Usage",
                            "Régies, filtres, résumés, relations et groupes documentaires.",
                        ],
                        [
                            "Limite",
                            "Ne devient ni une carte répétable ni un composant repliable.",
                        ],
                        [
                            "Anatomie",
                            "Header et footer facultatifs autour d’un contenu principal.",
                        ],
                        [
                            "Accessibilité",
                            "La sémantique et le nom accessible restent explicites.",
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
                aria-labelledby="panel-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="panel-master"
                    eyebrow="Plan maître"
                    title="Une section complète trouve son cadre"
                    description="Le plan de référence distingue clairement l’introduction, la matière principale et la sortie du panneau."
                />

                <div className="mt-7 grid border border-line xl:grid-cols-2">
                    <div className="flex min-h-[30rem] items-center justify-center bg-canvas p-8">
                        <PixiePanel
                            variant="accent"
                            color="bleu-reperage"
                            elevation="soft"
                            dividers="both"
                            aria-labelledby="panel-master-title"
                            header={<PanelHeader />}
                            footer={
                                <PixieLink
                                    href="#panel-variants"
                                    variant="action"
                                    color="bleu-reperage"
                                    indicator="arrow"
                                >
                                    Examiner les essais
                                </PixieLink>
                            }
                            className="w-full max-w-xl"
                        >
                            <PanelContent />
                        </PixiePanel>
                    </div>
                    <CodeExample>{`<PixiePanel
    variant="accent"
    color="bleu-reperage"
    elevation="soft"
    header={<PanelHeader />}
    footer={<PanelFooter />}
    dividers="both"
>
    {/* Contenu de la section */}
</PixiePanel>`}</CodeExample>
                </div>
            </section>

            <section
                id="panel-variants"
                aria-labelledby="panel-variants-title"
                className="mt-16 scroll-mt-8"
            >
                <SequenceTitle
                    id="panel-variants-title"
                    eyebrow="Direction artistique"
                    title="Six surfaces pour structurer la page"
                    description="Chaque variant décrit la relation du panneau avec son arrière-plan. La profondeur et l’accent restent des réglages indépendants."
                />

                <div className="mt-7 grid gap-6 bg-surface-muted p-6 lg:grid-cols-2">
                    {variants.map((variant) => (
                        <PixiePanel
                            key={variant.value}
                            as="div"
                            variant={variant.value}
                            color="violet-ombre-portee"
                            padding="md"
                            header={
                                <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                    {variant.name}
                                </p>
                            }
                            dividers="header"
                        >
                            <h4 className="text-2xl text-ink">
                                {variant.value}
                            </h4>
                            <p className="mt-4 leading-7 text-ink-soft">
                                {variant.description}
                            </p>
                        </PixiePanel>
                    ))}
                </div>
            </section>

            <section aria-labelledby="panel-anatomy" className="mt-16">
                <SequenceTitle
                    id="panel-anatomy"
                    eyebrow="Découpage du plan"
                    title="Trois zones qui restent indépendantes"
                    description="Le contenu principal est toujours présent. Le header et le footer apparaissent uniquement lorsque la composition les demande."
                />

                <div className="mt-7 grid gap-6 xl:grid-cols-3">
                    <PixiePanel as="div" variant="outline" padding="md">
                        <h4 className="text-xl text-ink">Contenu seul</h4>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Le panneau reste un simple regroupement visuel.
                        </p>
                    </PixiePanel>

                    <PixiePanel
                        as="div"
                        variant="surface"
                        padding="md"
                        dividers="header"
                        header={
                            <p className="font-eyebrow uppercase tracking-[0.14em] text-muted">
                                Header
                            </p>
                        }
                    >
                        <h4 className="text-xl text-ink">Introduction</h4>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Une zone annonce la matière qui suit.
                        </p>
                    </PixiePanel>

                    <PixiePanel
                        as="div"
                        variant="surface"
                        padding="md"
                        dividers="footer"
                        footer={
                            <p className="text-sm text-muted">
                                Dernière mise à jour · aujourd’hui
                            </p>
                        }
                    >
                        <h4 className="text-xl text-ink">Conclusion</h4>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Le footer ferme la séquence sans action imposée.
                        </p>
                    </PixiePanel>
                </div>
            </section>

            <section aria-labelledby="panel-density" className="mt-16">
                <SequenceTitle
                    id="panel-density"
                    eyebrow="Construction du décor"
                    title="Densité, contour et profondeur accompagnent la composition"
                    description="Un espacement commun aligne les zones par défaut ; chaque slot peut ensuite recevoir une densité adaptée à son contenu."
                />

                <div className="mt-7 grid gap-8 xl:grid-cols-2">
                    <div>
                        <h4 className="text-xl text-ink">Espacements</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {paddings.map((padding) => (
                                <PixiePanel
                                    key={padding.value}
                                    as="div"
                                    variant="outline"
                                    padding={padding.value}
                                    radius="small"
                                    className="min-h-28"
                                >
                                    <div className="bg-accent-soft p-3">
                                        <p className="font-mono text-xs text-accent">
                                            {padding.value} · {padding.token}
                                        </p>
                                    </div>
                                </PixiePanel>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl text-ink">Rayons</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {radii.map((radius) => (
                                <PixiePanel
                                    key={radius.value}
                                    as="div"
                                    variant="accent"
                                    color="vert-cellulo"
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
                                </PixiePanel>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section aria-labelledby="panel-scenarios" className="mt-16">
                <SequenceTitle
                    id="panel-scenarios"
                    eyebrow="Scénarios de plateau"
                    title="Six régions, six rôles structurels"
                    description="Ces compositions éprouvent le panneau comme une région durable de la page, jamais comme une carte répétable ou une cible interactive."
                />

                <div className="mt-7 grid gap-6 xl:grid-cols-2">
                    <div className="bg-surface-muted p-5 sm:p-7">
                        <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Régie de filtres
                        </p>
                        <PixiePanel
                            as="section"
                            variant="surface"
                            padding="md"
                            dividers="both"
                            elevation="soft"
                            aria-labelledby="panel-scenario-filters"
                            header={
                                <div>
                                    <h4
                                        id="panel-scenario-filters"
                                        className="text-xl text-ink"
                                    >
                                        Affiner la projection
                                    </h4>
                                    <p className="mt-2 text-sm text-muted">
                                        Trois critères disponibles
                                    </p>
                                </div>
                            }
                            footer={
                                <PixieLink
                                    href="#panel-scenarios"
                                    variant="action"
                                    indicator="arrow"
                                >
                                    Appliquer les réglages
                                </PixieLink>
                            }
                        >
                            <div className="grid gap-3">
                                {["Famille", "Époque", "Format"].map(
                                    (label) => (
                                        <div
                                            key={label}
                                            className="flex items-center justify-between border border-line px-4 py-3"
                                        >
                                            <span className="text-sm text-ink-soft">
                                                {label}
                                            </span>
                                            <span className="font-mono text-xs text-muted">
                                                Tous
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>
                        </PixiePanel>
                    </div>

                    <div className="bg-surface-muted p-5 sm:p-7">
                        <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Dossier documentaire
                        </p>
                        <PixiePanel
                            as="article"
                            variant="outline"
                            padding="lg"
                            headerPadding="md"
                            dividers="header"
                            header={
                                <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                    Note de production · 1937
                                </p>
                            }
                        >
                            <h4 className="text-2xl text-ink">
                                Une nouvelle profondeur de champ
                            </h4>
                            <p className="mt-4 leading-7 text-ink-soft">
                                Le panneau rassemble une séquence éditoriale
                                complète sans lui donner le comportement d’une
                                unité de collection.
                            </p>
                        </PixiePanel>
                    </div>

                    <div className="bg-surface-muted p-5 sm:p-7">
                        <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Collection sans gouttière
                        </p>
                        <PixiePanel
                            as="section"
                            variant="muted"
                            padding="md"
                            bodyPadding="none"
                            dividers="both"
                            aria-labelledby="panel-scenario-register"
                            header={
                                <h4
                                    id="panel-scenario-register"
                                    className="text-xl text-ink"
                                >
                                    Documents du plateau
                                </h4>
                            }
                            footer={
                                <p className="text-sm text-muted">
                                    3 documents enregistrés
                                </p>
                            }
                        >
                            <ul className="divide-y divide-line">
                                {[
                                    "Feuille d’exposition",
                                    "Découpage de la séquence",
                                    "Notes de caméra",
                                ].map((document) => (
                                    <li
                                        key={document}
                                        className="bg-surface px-5 py-4 text-sm text-ink-soft"
                                    >
                                        {document}
                                    </li>
                                ))}
                            </ul>
                        </PixiePanel>
                    </div>

                    <div className="bg-surface-muted p-5 sm:p-7">
                        <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Aparté contextuel
                        </p>
                        <PixiePanel
                            as="aside"
                            variant="tinted"
                            color="ambre-projecteur"
                            padding="lg"
                            radius="large"
                            aria-labelledby="panel-scenario-aside"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Hors champ
                            </p>
                            <h4
                                id="panel-scenario-aside"
                                className="mt-3 text-2xl text-ink"
                            >
                                Une précision éclaire le récit
                            </h4>
                            <p className="mt-4 leading-7 text-ink-soft">
                                L’aside complète la matière principale sans
                                interrompre sa progression.
                            </p>
                        </PixiePanel>
                    </div>

                    <div className="bg-surface-muted p-5 sm:p-7">
                        <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Panneau de palmarès
                        </p>
                        <PixiePanel
                            as="section"
                            variant="accent"
                            color="jaune-lampe"
                            accentPosition="top"
                            elevation="strong"
                            padding="lg"
                            aria-labelledby="panel-scenario-awards"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Première cérémonie
                            </p>
                            <h4
                                id="panel-scenario-awards"
                                className="mt-3 text-2xl text-ink"
                            >
                                Le trophée entre au Codex
                            </h4>
                            <p className="mt-4 leading-7 text-ink-soft">
                                L’accent supérieur et l’élévation signalent une
                                région importante sans rendre la couleur seule
                                porteuse de sens.
                            </p>
                        </PixiePanel>
                    </div>

                    <div className="bg-surface-muted p-5 sm:p-7">
                        <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Régie à contenu long
                        </p>
                        <PixiePanel
                            as="section"
                            variant="surface"
                            padding="md"
                            dividers="both"
                            scroll="body"
                            maxHeight="21rem"
                            aria-labelledby="panel-scenario-scroll"
                            header={
                                <h4
                                    id="panel-scenario-scroll"
                                    className="text-xl text-ink"
                                >
                                    Journal des raccords
                                </h4>
                            }
                            footer={
                                <p className="text-sm text-muted">
                                    Header et footer restent en place
                                </p>
                            }
                        >
                            <ol className="space-y-3">
                                {Array.from({ length: 8 }, (_, index) => (
                                    <li
                                        key={index}
                                        className="border border-line p-4 text-sm leading-6 text-ink-soft"
                                    >
                                        Raccord{" "}
                                        {String(index + 1).padStart(2, "0")} ·
                                        Vérifier la continuité de la séquence.
                                    </li>
                                ))}
                            </ol>
                        </PixiePanel>
                    </div>
                </div>
            </section>

            <section
                id="pixie-panel-playground"
                aria-labelledby="panel-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="panel-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixiePanel"
                    description="Réglez sa sémantique, ses zones et son traitement ; le code d’utilisation suit chaque changement."
                />
                <div className="mt-8">
                    <PixiePanelPlayground />
                </div>
            </section>

            <section
                aria-labelledby="panel-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="panel-accessibility"
                    eyebrow="Accessibilité"
                    title="Une région seulement lorsqu’elle possède un nom"
                    description="Le panneau transmet les attributs HTML sans inventer de rôle, de focus ou d’interaction."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Section nommée",
                            'Associer as="section" à aria-labelledby ou aria-label pour annoncer une véritable région.',
                        ],
                        [
                            "Complément éditorial",
                            'Employer as="aside" lorsque le contenu complète le récit principal.',
                        ],
                        [
                            "Article autonome",
                            'Employer as="article" uniquement lorsque le panneau forme une composition indépendante et redistribuable.',
                        ],
                        [
                            "Simple regroupement",
                            'Employer as="div" lorsque la surface n’ajoute aucune structure documentaire.',
                        ],
                        [
                            "Actions réelles",
                            "Placer PixieLink ou PixieButton dans les zones sans rendre le panneau entier interactif.",
                        ],
                        [
                            "Contenu défilable",
                            "Conserver des repères visibles et un ordre de lecture naturel lorsque seul le corps du panneau défile.",
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
                aria-labelledby="panel-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="panel-technical"
                    eyebrow="Générique technique"
                    title="API du composant"
                    description="Les types spécifiques sont colocalisés dans PixiePanel.types.ts et les attributs HTML compatibles sont transmis à l’élément rendu."
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

            <section aria-labelledby="panel-journal" className="mt-16">
                <SequenceTitle
                    id="panel-journal"
                    eyebrow="Contrat de projection"
                    title="Les garanties de la version 1.0.0"
                    description="PixiePanel est prêt à structurer les régions durables du Codex sans empiéter sur les responsabilités des autres Décors."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "PixieCard porte les unités répétables ; PixiePanel structure les régions durables.",
                        "Header, corps et footer couvrent les compositions sans multiplier les slots spécialisés.",
                        "PixieDustInset peut être composé dans le panneau tout en gardant son rôle secondaire.",
                        "Les cinq densités restent lisibles sur mobile et à 200 % de zoom.",
                        "Section, aside et article conservent leur sémantique et leur nom accessible.",
                        "Le corps défilable préserve ses repères et reste utilisable uniquement au clavier.",
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
