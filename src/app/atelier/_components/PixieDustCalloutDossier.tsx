import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import {
    PixieDustCallout,
    type PixieDustCalloutLayout,
    type PixieDustCalloutPadding,
    type PixieDustCalloutRadius,
    type PixieDustCalloutVariant,
} from "@/components/ui/PixieDustCallout";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { PixieDustCalloutPlayground } from "./PixieDustCalloutPlayground";

const variants = [
    {
        name: "Discret",
        value: "subtle" as const,
        description: "Une teinte douce attire le regard sans interrompre.",
    },
    {
        name: "Contour",
        value: "outline" as const,
        description: "Une ligne colorée délimite une note plus documentaire.",
    },
    {
        name: "Accent",
        value: "accent" as const,
        description: "Un repère latéral affirme la présence de l’annotation.",
    },
    {
        name: "Projecteur",
        value: "spotlight" as const,
        description: "Un halo fixe donne davantage de poids à la remarque.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustCalloutVariant;
    description: string;
}>[];

const layouts = [
    {
        name: "Empilé",
        value: "stacked" as const,
        description: "Le symbole ouvre la note avant le contenu.",
    },
    {
        name: "En ligne",
        value: "inline" as const,
        description:
            "Le symbole accompagne le contenu dans une colonne dédiée.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustCalloutLayout;
    description: string;
}>[];

const paddings = [
    { name: "Petit", value: "sm" as const, token: "1 rem" },
    { name: "Moyen", value: "md" as const, token: "1,5 rem" },
    { name: "Grand", value: "lg" as const, token: "2 rem" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustCalloutPadding;
    token: string;
}>[];

const radii = [
    { name: "Aucun", value: "none" as const },
    { name: "Petit", value: "small" as const },
    { name: "Moyen", value: "medium" as const },
    { name: "Grand", value: "large" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustCalloutRadius;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieDustCalloutElement",
        defaultValue: '"aside"',
        description: "Élément HTML porté par l’annotation.",
    },
    {
        name: "variant",
        type: "PixieDustCalloutVariant",
        defaultValue: '"subtle"',
        description: "Niveau de présence visuelle du callout.",
    },
    {
        name: "layout",
        type: "PixieDustCalloutLayout",
        defaultValue: '"stacked"',
        description: "Disposition du symbole et du contenu.",
    },
    {
        name: "padding",
        type: "PixieDustCalloutPadding",
        defaultValue: '"md"',
        description: "Espacement intérieur de l’annotation.",
    },
    {
        name: "radius",
        type: "PixieDustCalloutRadius",
        defaultValue: '"medium"',
        description: "Arrondi extérieur du callout.",
    },
    {
        name: "color",
        type: "PixieDustCalloutColor",
        defaultValue: "false",
        description: "Couleur du registre ou accent courant du thème.",
    },
    {
        name: "icon",
        type: "ReactNode",
        defaultValue: "—",
        description: "Symbole décoratif ou informatif facultatif.",
    },
    {
        name: "eyebrow",
        type: "ReactNode",
        defaultValue: "—",
        description: "Indication courte placée avant le titre.",
    },
    {
        name: "heading",
        type: "ReactNode",
        defaultValue: "—",
        description: "Titre libre dont le niveau reste choisi par l’usage.",
    },
    {
        name: "footer",
        type: "ReactNode",
        defaultValue: "—",
        description: "Source, lien ou complément final facultatif.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Contenu éditorial principal de l’annotation.",
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
        name: "PixieDustCalloutElement",
        values: ['"aside"', '"section"', '"div"'],
        description: "Structures documentaires autorisées.",
    },
    {
        name: "PixieDustCalloutVariant",
        values: ['"subtle"', '"outline"', '"accent"', '"spotlight"'],
        description: "Traitements éditoriaux sans notion de statut système.",
    },
    {
        name: "PixieDustCalloutLayout",
        values: ['"stacked"', '"inline"'],
        description: "Dispositions du symbole par rapport au contenu.",
    },
    {
        name: "PixieDustCalloutPadding",
        values: ['"sm"', '"md"', '"lg"'],
        description: "Densités intérieures de l’annotation.",
    },
    {
        name: "PixieDustCalloutRadius",
        values: ['"none"', '"small"', '"medium"', '"large"'],
        description: "Rayons disponibles dans la Projection Originale.",
    },
    {
        name: "PixieDustCalloutColor",
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

function RepereSymbol() {
    return (
        <PixieSymbol
            registry="blocs"
            collection="oeuvres"
            slug="repere"
            size="lg"
            decorative
        />
    );
}

export function PixieDustCalloutDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-callout"
            labelledBy="pixie-dust-callout-title"
            nom="PixieDustCallout"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Décor 004
                        </p>
                        <h2
                            id="pixie-dust-callout-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustCallout
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Mettre une annotation éditoriale en lumière sans la
                            transformer en alerte ni interrompre le récit.
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
            <section aria-labelledby="callout-identity" className="mt-14">
                <SequenceTitle
                    id="callout-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Le callout isole une remarque ciblée à l’intérieur du récit. Sa présence est éditoriale et ne décrit jamais une réaction du système."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Mettre en avant une annotation ciblée."],
                        [
                            "Usage",
                            "Contexte historique, incertitude, source et remarque d’auteur.",
                        ],
                        [
                            "Limite",
                            "Ne porte ni notification, ni erreur, ni confirmation système.",
                        ],
                        [
                            "Anatomie",
                            "Symbole, eyebrow, titre et footer restent facultatifs.",
                        ],
                        [
                            "Accessibilité",
                            "Aucun rôle alert ou aria-live n’est ajouté automatiquement.",
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
                aria-labelledby="callout-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="callout-master"
                    eyebrow="Plan maître"
                    title="Une réserve éditoriale entre dans la lumière"
                    description="Le plan de référence associe un symbole silencieux, une hiérarchie visible et un accès facultatif aux sources."
                />

                <div className="mt-7 grid border border-line xl:grid-cols-2">
                    <div className="flex min-h-[28rem] items-center justify-center bg-canvas p-8">
                        <PixieDustCallout
                            variant="accent"
                            layout="inline"
                            color="ambre-projecteur"
                            aria-labelledby="callout-master-heading"
                            icon={<RepereSymbol />}
                            eyebrow="Note de production"
                            heading={
                                <h4 id="callout-master-heading">
                                    Une date encore discutée
                                </h4>
                            }
                            footer={
                                <PixieLink
                                    href="#callout-variants"
                                    variant="action"
                                    color="ambre-projecteur"
                                    indicator="arrow"
                                >
                                    Consulter les essais
                                </PixieLink>
                            }
                            className="w-full max-w-xl"
                        >
                            <p>
                                Les documents conservés ne permettent pas encore
                                de retenir une date unique avec une certitude
                                suffisante.
                            </p>
                        </PixieDustCallout>
                    </div>
                    <CodeExample>{`<PixieDustCallout
    variant="accent"
    layout="inline"
    color="ambre-projecteur"
    icon={<PixieSymbol ... />}
    eyebrow="Note de production"
    heading={<h3>Une date encore discutée</h3>}
    footer={<PixieLink href="#sources">Consulter les sources</PixieLink>}
>
    <p>{/* Annotation éditoriale */}</p>
</PixieDustCallout>`}</CodeExample>
                </div>
            </section>

            <section
                id="callout-variants"
                aria-labelledby="callout-variants-title"
                className="mt-16 scroll-mt-8"
            >
                <SequenceTitle
                    id="callout-variants-title"
                    eyebrow="Direction artistique"
                    title="Quatre intensités sans urgence artificielle"
                    description="Le variant règle la présence éditoriale. Il ne change ni la sémantique ni la priorité annoncée aux technologies d’assistance."
                />

                <div className="mt-7 grid gap-6 bg-surface-muted p-6 lg:grid-cols-2">
                    {variants.map((variant) => (
                        <PixieDustCallout
                            key={variant.value}
                            as="div"
                            variant={variant.value}
                            color="bleu-reperage"
                            eyebrow={variant.name}
                            heading={<h4>{variant.value}</h4>}
                        >
                            <p>{variant.description}</p>
                        </PixieDustCallout>
                    ))}
                </div>
            </section>

            <section aria-labelledby="callout-layouts" className="mt-16">
                <SequenceTitle
                    id="callout-layouts"
                    eyebrow="Placement des accessoires"
                    title="Deux compositions pour un même contenu"
                    description="La disposition agit uniquement lorsque le symbole est présent. Sans lui, le contenu reprend naturellement toute la largeur."
                />

                <div className="mt-7 grid items-start gap-8 lg:grid-cols-2">
                    {layouts.map((layout) => (
                        <div key={layout.value}>
                            <PixieDustCallout
                                as="div"
                                variant="outline"
                                layout={layout.value}
                                color="vert-cellulo"
                                icon={<RepereSymbol />}
                                eyebrow={layout.name}
                                heading={<h4>Repère documentaire</h4>}
                            >
                                <p>{layout.description}</p>
                            </PixieDustCallout>
                            <p className="mt-3 font-mono text-xs text-muted">
                                layout=&quot;{layout.value}&quot;
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="callout-anatomy" className="mt-16">
                <SequenceTitle
                    id="callout-anatomy"
                    eyebrow="Découpage du carton"
                    title="Chaque zone reste réellement facultative"
                    description="Le callout peut rester une simple note, recevoir un titre ou prolonger son contenu par une source sans laisser d’espace vide."
                />

                <div className="mt-7 grid items-start gap-6 xl:grid-cols-3">
                    <PixieDustCallout as="div" variant="subtle">
                        <p>
                            Une annotation peut se présenter sans aucun
                            accessoire lorsque le contexte suffit.
                        </p>
                    </PixieDustCallout>

                    <PixieDustCallout
                        as="div"
                        variant="accent"
                        color="corail-cel"
                        eyebrow="Contexte"
                        heading={<h4>Une lecture complémentaire</h4>}
                    >
                        <p>
                            Eyebrow et titre installent une hiérarchie claire.
                        </p>
                    </PixieDustCallout>

                    <PixieDustCallout
                        as="div"
                        variant="outline"
                        color="gouache"
                        footer={
                            <span className="text-sm text-muted">
                                Source consultée · Archives du studio
                            </span>
                        }
                    >
                        <p>
                            Le footer peut porter une provenance sans ajouter
                            d’action.
                        </p>
                    </PixieDustCallout>
                </div>
            </section>

            <section aria-labelledby="callout-construction" className="mt-16">
                <SequenceTitle
                    id="callout-construction"
                    eyebrow="Construction du décor"
                    title="Densités et contours accompagnent la remarque"
                    description="L’espacement dépend de la longueur du contenu ; le rayon dépend du contexte visuel qui l’accueille."
                />

                <div className="mt-7 grid gap-8 xl:grid-cols-2">
                    <div>
                        <h4 className="text-xl text-ink">Espacements</h4>
                        <div className="mt-4 space-y-4">
                            {paddings.map((padding) => (
                                <PixieDustCallout
                                    key={padding.value}
                                    as="div"
                                    variant="outline"
                                    padding={padding.value}
                                    eyebrow={`${padding.name} · ${padding.token}`}
                                >
                                    <p>padding=&quot;{padding.value}&quot;</p>
                                </PixieDustCallout>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl text-ink">Rayons</h4>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {radii.map((radius) => (
                                <PixieDustCallout
                                    key={radius.value}
                                    as="div"
                                    variant="accent"
                                    radius={radius.value}
                                    color="rouge-crayon"
                                    eyebrow={radius.name}
                                >
                                    <p className="font-mono text-sm">
                                        {radius.value}
                                    </p>
                                </PixieDustCallout>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section aria-labelledby="callout-uses" className="mt-16">
                <SequenceTitle
                    id="callout-uses"
                    eyebrow="Notes de montage"
                    title="Quatre usages éditoriaux, jamais quatre statuts"
                    description="La couleur et le symbole peuvent varier selon le sujet, mais le texte doit toujours expliquer la nature de la remarque."
                />

                <div className="mt-7 grid gap-6 lg:grid-cols-2">
                    {(
                        [
                            [
                                "Contexte historique",
                                "Une information nécessaire pour comprendre l’époque sans interrompre la fiche.",
                                "sepia-storyboard",
                            ],
                            [
                                "Incertitude documentaire",
                                "Une nuance explicite lorsque les sources ne permettent pas encore de trancher.",
                                "ambre-projecteur",
                            ],
                            [
                                "Note de source",
                                "Une précision sur la provenance, la datation ou l’état d’un document.",
                                "bleu-reperage",
                            ],
                            [
                                "Remarque d’auteur",
                                "Une lecture personnelle clairement distinguée des faits établis.",
                                "gouache",
                            ],
                        ] as const
                    ).map(([title, description, color]) => (
                        <PixieDustCallout
                            key={title}
                            as="div"
                            variant="subtle"
                            layout="inline"
                            color={color}
                            icon={<RepereSymbol />}
                            eyebrow="Annotation éditoriale"
                            heading={<h4>{title}</h4>}
                        >
                            <p>{description}</p>
                        </PixieDustCallout>
                    ))}
                </div>
            </section>

            <section
                id="pixie-dust-callout-playground"
                aria-labelledby="callout-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="callout-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieDustCallout"
                    description="Réglez sa présence, sa disposition et son anatomie ; le code d’utilisation suit chaque changement."
                />
                <div className="mt-8">
                    <PixieDustCalloutPlayground />
                </div>
            </section>

            <section
                aria-labelledby="callout-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="callout-accessibility"
                    eyebrow="Accessibilité"
                    title="Une annotation éditoriale n’est pas une alerte"
                    description="La primitive transmet les attributs HTML, mais ne fabrique ni annonce dynamique, ni urgence, ni focus."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Complément nommé",
                            'Associer as="aside" à un titre visible ou à un aria-label lorsque plusieurs compléments se côtoient.',
                        ],
                        [
                            "Section documentaire",
                            'Employer as="section" avec aria-labelledby lorsque la note constitue une véritable région.',
                        ],
                        [
                            "Simple mise en avant",
                            'Employer as="div" lorsque le cadre ne doit pas ajouter de structure au document.',
                        ],
                        [
                            "Symbole maîtrisé",
                            "Le composant placé dans icon décide lui-même s’il est décoratif ou informatif.",
                        ],
                        [
                            "Titre libre",
                            "Heading reçoit un véritable h2, h3 ou h4 adapté à la hiérarchie de la page.",
                        ],
                        [
                            "Aucune urgence implicite",
                            "Ne jamais employer ce décor pour une erreur, un succès ou un message qui exige aria-live.",
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
                aria-labelledby="callout-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="callout-technical"
                    eyebrow="Générique technique"
                    title="API de l’esquisse"
                    description="Les types spécifiques sont colocalisés dans PixieDustCallout.types.ts et les attributs HTML compatibles sont transmis à l’élément rendu."
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

            <section aria-labelledby="callout-journal" className="mt-16">
                <SequenceTitle
                    id="callout-journal"
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="L’esquisse doit être confrontée aux véritables annotations du Codex avant de devenir PixieCallout."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Éprouver les quatre variants dans les fiches documentaires existantes.",
                        "Vérifier si stacked et inline suffisent pour tous les symboles du registre.",
                        "Contrôler spotlight dans les deux Lumières et en contraste forcé.",
                        "Valider les callouts sans titre avec les lecteurs d’écran.",
                        "Tester les contenus longs, les liens et le zoom à 200 %.",
                        "Confirmer la frontière avec PixieDustInset et les futurs retours système.",
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
