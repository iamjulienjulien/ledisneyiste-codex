import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import {
    PixieCallout,
    type PixieCalloutEffect,
    type PixieCalloutLayout,
    type PixieCalloutPadding,
    type PixieCalloutRadius,
    type PixieCalloutVariant,
} from "@/components/ui/PixieCallout";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { PixieCalloutPlayground } from "./PixieCalloutPlayground";

const variants = [
    {
        name: "Libre",
        value: "plain" as const,
        description: "Le contenu se distingue sans ajouter de surface.",
    },
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
        name: "Teinté",
        value: "tinted" as const,
        description: "La couleur imprègne toute la surface avec retenue.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieCalloutVariant;
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
    {
        name: "En-tête",
        value: "header" as const,
        description:
            "Le symbole accompagne le titre, puis le corps retrouve toute la largeur.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieCalloutLayout;
    description: string;
}>[];

const paddings = [
    { name: "Petit", value: "sm" as const, token: "1 rem" },
    { name: "Moyen", value: "md" as const, token: "1,5 rem" },
    { name: "Grand", value: "lg" as const, token: "2 rem" },
    { name: "Très grand", value: "xl" as const, token: "2,5 rem" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieCalloutPadding;
    token: string;
}>[];

const radii = [
    { name: "Aucun", value: "none" as const },
    { name: "Petit", value: "small" as const },
    { name: "Moyen", value: "medium" as const },
    { name: "Grand", value: "large" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieCalloutRadius;
}>[];

const accentPositions = [
    { name: "Haut", value: "top" as const },
    { name: "Fin", value: "end" as const },
    { name: "Bas", value: "bottom" as const },
    { name: "Début", value: "start" as const },
] as const;

const effects = [
    {
        name: "Sans effet",
        value: "none" as const,
        description: "La construction seule porte l’annotation.",
    },
    {
        name: "Grain",
        value: "grain" as const,
        description: "Une texture fixe rappelle la matière de la pellicule.",
    },
    {
        name: "Halo",
        value: "halo" as const,
        description: "Une lumière diffuse accompagne la couleur d’accent.",
    },
    {
        name: "Projecteur",
        value: "projector" as const,
        description: "Un faisceau statique éclaire une découverte importante.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieCalloutEffect;
    description: string;
}>[];

const scenarios = [
    {
        title: "Contexte historique",
        eyebrow: "Repère chronologique",
        description:
            "Une information nécessaire pour comprendre l’époque sans interrompre la fiche.",
        color: "sepia-storyboard",
        variant: "subtle",
        layout: "stacked",
        effect: "grain",
        accentPosition: "start",
        dividers: "none",
        footer: null,
        showIcon: true,
        showHeading: true,
    },
    {
        title: "Incertitude documentaire",
        eyebrow: "Note de production",
        description:
            "Les sources disponibles ne permettent pas encore de retenir une date unique.",
        color: "ambre-projecteur",
        variant: "accent",
        layout: "header",
        effect: "halo",
        accentPosition: "start",
        dividers: "footer",
        footer: "Comparer les sources conservées",
        showIcon: true,
        showHeading: true,
    },
    {
        title: "Provenance d’une archive",
        eyebrow: "Source",
        description:
            "Le document a été numérisé depuis une copie de travail non datée.",
        color: "bleu-reperage",
        variant: "outline",
        layout: "inline",
        effect: "none",
        accentPosition: "top",
        dividers: "footer",
        footer: "Archives du studio · Dossier 1934-17",
        showIcon: true,
        showHeading: true,
    },
    {
        title: "Remarque d’auteur",
        eyebrow: "Regard du Disneyiste",
        description:
            "Cette lecture personnelle reste explicitement séparée des faits établis.",
        color: "gouache",
        variant: "tinted",
        layout: "header",
        effect: "grain",
        accentPosition: "end",
        dividers: "none",
        footer: null,
        showIcon: true,
        showHeading: true,
    },
    {
        title: "Une découverte remise en lumière",
        eyebrow: "Document retrouvé",
        description:
            "Le projecteur souligne une découverte sans la transformer en notification système.",
        color: "violet-ombre-portee",
        variant: "outline",
        layout: "inline",
        effect: "projector",
        accentPosition: "bottom",
        dividers: "none",
        footer: null,
        showIcon: true,
        showHeading: true,
    },
    {
        title: "Annotation développée",
        eyebrow: "Contexte complémentaire",
        description:
            "Une annotation peut accueillir plusieurs paragraphes ou une explication longue sans perdre sa hiérarchie ni contraindre la largeur du texte.",
        color: "vert-cellulo",
        variant: "plain",
        layout: "stacked",
        effect: "none",
        accentPosition: "start",
        dividers: "header",
        footer: null,
        showIcon: false,
        showHeading: true,
    },
    {
        title: "Note minimale",
        eyebrow: "Annotation",
        description:
            "Le contexte suffit : aucun symbole, eyebrow, titre ou footer n’est nécessaire.",
        color: "corail-cel",
        variant: "subtle",
        layout: "stacked",
        effect: "none",
        accentPosition: "start",
        dividers: "none",
        footer: null,
        showIcon: false,
        showHeading: false,
    },
] as const;

const properties = [
    {
        name: "as",
        type: "PixieCalloutElement",
        defaultValue: '"aside"',
        description: "Élément HTML porté par l’annotation.",
    },
    {
        name: "variant",
        type: "PixieCalloutVariant",
        defaultValue: '"subtle"',
        description: "Niveau de présence visuelle du callout.",
    },
    {
        name: "layout",
        type: "PixieCalloutLayout",
        defaultValue: '"stacked"',
        description: "Disposition du symbole et du contenu.",
    },
    {
        name: "padding",
        type: "PixieCalloutPadding",
        defaultValue: '"md"',
        description: "Espacement intérieur de l’annotation.",
    },
    {
        name: "radius",
        type: "PixieCalloutRadius",
        defaultValue: '"medium"',
        description: "Arrondi extérieur du callout.",
    },
    {
        name: "color",
        type: "PixieCalloutColor",
        defaultValue: "false",
        description: "Couleur du registre ou accent courant du thème.",
    },
    {
        name: "accentPosition",
        type: "PixieCalloutAccentPosition",
        defaultValue: '"start"',
        description: "Bord depuis lequel l’accent et sa lumière apparaissent.",
    },
    {
        name: "elevation",
        type: "PixieCalloutElevation",
        defaultValue: '"none"',
        description: "Profondeur portée par la surface.",
    },
    {
        name: "dividers",
        type: "PixieCalloutDividers",
        defaultValue: '"none"',
        description: "Séparateurs placés après le header ou avant le footer.",
    },
    {
        name: "footerAlign",
        type: "PixieCalloutFooterAlign",
        defaultValue: '"start"',
        description: "Alignement horizontal du footer.",
    },
    {
        name: "effect",
        type: "PixieCalloutEffect",
        defaultValue: '"none"',
        description: "Atmosphère décorative indépendante de la surface.",
    },
    {
        name: "effectIntensity",
        type: "PixieCalloutEffectIntensity",
        defaultValue: '"medium"',
        description: "Présence visuelle de l’effet décoratif.",
    },
    {
        name: "iconAlign",
        type: "PixieCalloutIconAlign",
        defaultValue: '"start"',
        description: "Alignement vertical du symbole dans sa zone.",
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
        name: "PixieCalloutElement",
        values: ['"aside"', '"section"', '"div"'],
        description: "Structures documentaires autorisées.",
    },
    {
        name: "PixieCalloutVariant",
        values: ['"plain"', '"subtle"', '"outline"', '"accent"', '"tinted"'],
        description: "Traitements éditoriaux sans notion de statut système.",
    },
    {
        name: "PixieCalloutLayout",
        values: ['"stacked"', '"inline"', '"header"'],
        description: "Dispositions du symbole par rapport au contenu.",
    },
    {
        name: "PixieCalloutPadding",
        values: ['"sm"', '"md"', '"lg"', '"xl"'],
        description: "Densités intérieures de l’annotation.",
    },
    {
        name: "PixieCalloutRadius",
        values: ['"none"', '"small"', '"medium"', '"large"'],
        description: "Rayons disponibles dans la Projection Originale.",
    },
    {
        name: "PixieCalloutColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Couleur enregistrée ou accent courant du thème.",
    },
    {
        name: "PixieCalloutAccentPosition",
        values: ['"top"', '"end"', '"bottom"', '"start"'],
        description: "Positions logiques de la ligne et de la lumière.",
    },
    {
        name: "PixieCalloutElevation",
        values: ['"none"', '"soft"', '"strong"'],
        description: "Niveaux de profondeur disponibles.",
    },
    {
        name: "PixieCalloutDividers",
        values: ['"none"', '"header"', '"footer"', '"both"'],
        description: "Découpes internes de l’annotation.",
    },
    {
        name: "PixieCalloutFooterAlign",
        values: ['"start"', '"end"'],
        description: "Alignements logiques du complément final.",
    },
    {
        name: "PixieCalloutEffect",
        values: ['"none"', '"grain"', '"halo"', '"projector"'],
        description: "Effets atmosphériques sans portée sémantique.",
    },
    {
        name: "PixieCalloutEffectIntensity",
        values: ['"subtle"', '"medium"', '"strong"'],
        description: "Intensités des effets décoratifs.",
    },
    {
        name: "PixieCalloutIconAlign",
        values: ['"start"', '"center"'],
        description: "Alignements verticaux du symbole.",
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

function RepereSymbol() {
    return (
        <PixieSymbol
            registry="index"
            collection="oeuvres"
            slug="repere"
            size="lg"
            decorative
        />
    );
}

export function PixieCalloutDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-callout"
            labelledBy="pixie-callout-title"
            nom="PixieCallout"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Décor 004
                        </p>
                        <h2
                            id="pixie-callout-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieCallout
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
                        <PixieCallout
                            variant="accent"
                            layout="header"
                            color="ambre-projecteur"
                            accentPosition="start"
                            elevation="soft"
                            dividers="footer"
                            effect="halo"
                            effectIntensity="subtle"
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
                        </PixieCallout>
                    </div>
                    <CodeExample>{`<PixieCallout
    variant="accent"
    layout="header"
    color="ambre-projecteur"
    elevation="soft"
    dividers="footer"
    effect="halo"
    effectIntensity="subtle"
    icon={<PixieSymbol ... />}
    eyebrow="Note de production"
    heading={<h3>Une date encore discutée</h3>}
    footer={<PixieLink href="#sources">Consulter les sources</PixieLink>}
>
    <p>{/* Annotation éditoriale */}</p>
</PixieCallout>`}</CodeExample>
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
                    title="Cinq surfaces sans urgence artificielle"
                    description="Le variant règle la construction éditoriale. Les effets lumineux restent un réglage indépendant et ne changent jamais la priorité annoncée."
                />

                <div className="mt-7 grid gap-6 bg-surface-muted p-6 lg:grid-cols-2">
                    {variants.map((variant) => (
                        <PixieCallout
                            key={variant.value}
                            as="div"
                            variant={variant.value}
                            color="bleu-reperage"
                            eyebrow={variant.name}
                            heading={<h4>{variant.value}</h4>}
                        >
                            <p>{variant.description}</p>
                        </PixieCallout>
                    ))}
                </div>
            </section>

            <section aria-labelledby="callout-layouts" className="mt-16">
                <SequenceTitle
                    id="callout-layouts"
                    eyebrow="Placement des accessoires"
                    title="Trois compositions pour un même contenu"
                    description="La disposition agit uniquement lorsque le symbole est présent. Sans lui, le contenu reprend naturellement toute la largeur."
                />

                <div className="mt-7 grid items-start gap-8 lg:grid-cols-2">
                    {layouts.map((layout) => (
                        <div key={layout.value}>
                            <PixieCallout
                                as="div"
                                variant="outline"
                                layout={layout.value}
                                color="vert-cellulo"
                                icon={<RepereSymbol />}
                                eyebrow={layout.name}
                                heading={<h4>Repère documentaire</h4>}
                            >
                                <p>{layout.description}</p>
                            </PixieCallout>
                            <p className="mt-3 font-mono text-xs text-muted">
                                layout=&quot;{layout.value}&quot;
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="callout-effects" className="mt-16">
                <SequenceTitle
                    id="callout-effects"
                    eyebrow="Lumière de plateau"
                    title="L’atmosphère ne remplace jamais le message"
                    description="Grain, halo et projecteur restent décoratifs, statiques et indépendants du variant. Leur intensité ne porte aucune signification."
                />

                <div className="mt-7 grid gap-6 lg:grid-cols-2">
                    {effects.map((effect) => (
                        <PixieCallout
                            key={effect.value}
                            as="div"
                            variant="outline"
                            color="violet-ombre-portee"
                            effect={effect.value}
                            effectIntensity="strong"
                            eyebrow={effect.name}
                            heading={<h4>{effect.value}</h4>}
                        >
                            <p>{effect.description}</p>
                        </PixieCallout>
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
                    <PixieCallout as="div" variant="subtle">
                        <p>
                            Une annotation peut se présenter sans aucun
                            accessoire lorsque le contexte suffit.
                        </p>
                    </PixieCallout>

                    <PixieCallout
                        as="div"
                        variant="accent"
                        color="corail-cel"
                        eyebrow="Contexte"
                        heading={<h4>Une lecture complémentaire</h4>}
                    >
                        <p>
                            Eyebrow et titre installent une hiérarchie claire.
                        </p>
                    </PixieCallout>

                    <PixieCallout
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
                    </PixieCallout>
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
                                <PixieCallout
                                    key={padding.value}
                                    as="div"
                                    variant="outline"
                                    padding={padding.value}
                                    eyebrow={`${padding.name} · ${padding.token}`}
                                >
                                    <p>padding=&quot;{padding.value}&quot;</p>
                                </PixieCallout>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl text-ink">Rayons</h4>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {radii.map((radius) => (
                                <PixieCallout
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
                                </PixieCallout>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section aria-labelledby="callout-accents" className="mt-16">
                <SequenceTitle
                    id="callout-accents"
                    eyebrow="Repères de lecture"
                    title="L’accent suit les quatre bords logiques"
                    description="La ligne colorée et la lumière associée peuvent accompagner la composition depuis chaque bord. Start et end s’inversent automatiquement en lecture droite-à-gauche."
                />

                <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {accentPositions.map((position) => (
                        <PixieCallout
                            key={position.value}
                            as="div"
                            variant="accent"
                            color="orange-banc-titre"
                            accentPosition={position.value}
                            effect="halo"
                            effectIntensity="subtle"
                            eyebrow={position.name}
                        >
                            <p className="font-mono text-sm">
                                {position.value}
                            </p>
                        </PixieCallout>
                    ))}
                </div>
            </section>

            <section aria-labelledby="callout-uses" className="mt-16">
                <SequenceTitle
                    id="callout-uses"
                    eyebrow="Scénarios préparés"
                    title="Sept annotations confrontent le composant au récit"
                    description="Chaque composition répond à un besoin éditorial identifiable. La couleur et l’effet accompagnent le texte sans devenir seuls porteurs de sens."
                />

                <div className="mt-7 grid gap-6 lg:grid-cols-2">
                    {scenarios.map((scenario) => (
                        <PixieCallout
                            key={scenario.title}
                            as="div"
                            variant={scenario.variant}
                            layout={scenario.layout}
                            color={scenario.color}
                            accentPosition={scenario.accentPosition}
                            dividers={scenario.dividers}
                            effect={scenario.effect}
                            effectIntensity="medium"
                            icon={
                                scenario.showIcon ? <RepereSymbol /> : undefined
                            }
                            eyebrow={
                                scenario.showHeading
                                    ? scenario.eyebrow
                                    : undefined
                            }
                            heading={
                                scenario.showHeading ? (
                                    <h4>{scenario.title}</h4>
                                ) : undefined
                            }
                            footer={
                                scenario.footer ? (
                                    <span className="text-sm text-muted">
                                        {scenario.footer}
                                    </span>
                                ) : undefined
                            }
                        >
                            <p>{scenario.description}</p>
                        </PixieCallout>
                    ))}
                </div>
            </section>

            <section
                id="pixie-callout-playground"
                aria-labelledby="callout-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="callout-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieCallout"
                    description="Réglez sa présence, sa disposition et son anatomie ; le code d’utilisation suit chaque changement."
                />
                <div className="mt-8">
                    <PixieCalloutPlayground />
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
                    title="API du composant"
                    description="Les types spécifiques sont colocalisés dans PixieCallout.types.ts et les attributs HTML compatibles sont transmis à l’élément rendu."
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
        </AtelierFicheAccessoire>
    );
}
