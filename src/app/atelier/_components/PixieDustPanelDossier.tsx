import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import {
    PixieDustPanel,
    type PixieDustPanelPadding,
    type PixieDustPanelRadius,
    type PixieDustPanelVariant,
} from "@/components/ui/PixieDustPanel";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieDustPanelPlayground } from "./PixieDustPanelPlayground";

const variants = [
    {
        name: "Surface",
        value: "surface" as const,
        description: "Une zone stable qui se détache discrètement du fond.",
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
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustPanelVariant;
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
    value: PixieDustPanelPadding;
    token: string;
}>[];

const radii = [
    { name: "Aucun", value: "none" as const },
    { name: "Petit", value: "small" as const },
    { name: "Moyen", value: "medium" as const },
    { name: "Grand", value: "large" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustPanelRadius;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieDustPanelElement",
        defaultValue: '"section"',
        description: "Élément HTML porté par le panneau.",
    },
    {
        name: "variant",
        type: "PixieDustPanelVariant",
        defaultValue: '"surface"',
        description: "Traitement visuel de la surface structurée.",
    },
    {
        name: "padding",
        type: "PixieDustPanelPadding",
        defaultValue: '"lg"',
        description: "Espacement intérieur appliqué à chacune des zones.",
    },
    {
        name: "radius",
        type: "PixieDustPanelRadius",
        defaultValue: '"medium"',
        description: "Arrondi extérieur du panneau.",
    },
    {
        name: "color",
        type: "PixieDustPanelColor",
        defaultValue: "false",
        description: "Couleur du registre ou accent courant du thème.",
    },
    {
        name: "dividers",
        type: "boolean",
        defaultValue: "false",
        description: "Sépare visuellement le header et le footer du contenu.",
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
        name: "PixieDustPanelElement",
        values: ['"div"', '"section"', '"aside"'],
        description: "Éléments sémantiques autorisés pour le panneau.",
    },
    {
        name: "PixieDustPanelVariant",
        values: ['"surface"', '"outline"', '"accent"'],
        description: "Traitements visuels d’une zone structurelle.",
    },
    {
        name: "PixieDustPanelColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Couleur enregistrée ou accent courant du thème.",
    },
    {
        name: "PixieDustPanelPadding",
        values: ['"none"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Densités appliquées uniformément aux zones présentes.",
    },
    {
        name: "PixieDustPanelRadius",
        values: ['"none"', '"small"', '"medium"', '"large"'],
        description: "Rayons disponibles dans la Projection Originale.",
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

export function PixieDustPanelDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-panel"
            labelledBy="pixie-dust-panel-title"
            nom="PixieDustPanel"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Décor 002
                        </p>
                        <h2
                            id="pixie-dust-panel-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustPanel
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
                        <PixieDustPanel
                            variant="accent"
                            color="bleu-reperage"
                            dividers
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
                        </PixieDustPanel>
                    </div>
                    <CodeExample>{`<PixieDustPanel
    variant="accent"
    color="bleu-reperage"
    header={<PanelHeader />}
    footer={<PanelFooter />}
    dividers
>
    {/* Contenu de la section */}
</PixieDustPanel>`}</CodeExample>
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
                    title="Trois surfaces pour structurer la page"
                    description="Chaque variant décrit la relation du panneau avec son arrière-plan, sans modifier son contenu ni sa sémantique."
                />

                <div className="mt-7 grid gap-6 bg-surface-muted p-6 lg:grid-cols-2">
                    {variants.map((variant) => (
                        <PixieDustPanel
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
                            dividers
                        >
                            <h4 className="text-2xl text-ink">
                                {variant.value}
                            </h4>
                            <p className="mt-4 leading-7 text-ink-soft">
                                {variant.description}
                            </p>
                        </PixieDustPanel>
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
                    <PixieDustPanel as="div" variant="outline" padding="md">
                        <h4 className="text-xl text-ink">Contenu seul</h4>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Le panneau reste un simple regroupement visuel.
                        </p>
                    </PixieDustPanel>

                    <PixieDustPanel
                        as="div"
                        variant="surface"
                        padding="md"
                        dividers
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
                    </PixieDustPanel>

                    <PixieDustPanel
                        as="div"
                        variant="surface"
                        padding="md"
                        dividers
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
                    </PixieDustPanel>
                </div>
            </section>

            <section aria-labelledby="panel-density" className="mt-16">
                <SequenceTitle
                    id="panel-density"
                    eyebrow="Construction du décor"
                    title="Densité et contour accompagnent la composition"
                    description="Le même espacement est appliqué à chaque zone présente afin de préserver leurs alignements."
                />

                <div className="mt-7 grid gap-8 xl:grid-cols-2">
                    <div>
                        <h4 className="text-xl text-ink">Espacements</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {paddings.map((padding) => (
                                <PixieDustPanel
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
                                </PixieDustPanel>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl text-ink">Rayons</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {radii.map((radius) => (
                                <PixieDustPanel
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
                                </PixieDustPanel>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="pixie-dust-panel-playground"
                aria-labelledby="panel-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="panel-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieDustPanel"
                    description="Réglez sa sémantique, ses zones et son traitement ; le code d’utilisation suit chaque changement."
                />
                <div className="mt-8">
                    <PixieDustPanelPlayground />
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
                            "Simple regroupement",
                            'Employer as="div" lorsque la surface n’ajoute aucune structure documentaire.',
                        ],
                        [
                            "Actions réelles",
                            "Placer PixieLink ou PixieButton dans les zones sans rendre le panneau entier interactif.",
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
                    title="API de l’esquisse"
                    description="Les types spécifiques sont colocalisés dans PixieDustPanel.types.ts et les attributs HTML compatibles sont transmis à l’élément rendu."
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
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="L’esquisse doit être éprouvée dans de vraies sections du Codex avant de devenir PixiePanel."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Éprouver la différence entre PixieCard et PixieDustPanel dans les index.",
                        "Vérifier si les trois zones couvrent les compositions réelles sans créer de slots supplémentaires.",
                        "Composer PixieDustInset dans le panneau sans confondre leurs responsabilités.",
                        "Valider l’espacement xl sur mobile et à 200 % de zoom.",
                        "Contrôler l’annonce des sections et des aside avec un lecteur d’écran.",
                        "Décider si dividers doit rester un réglage global ou devenir plus précis.",
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
