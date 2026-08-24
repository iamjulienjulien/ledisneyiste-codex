import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import {
    PixieDustBackdrop,
    type PixieDustBackdropIntensity,
    type PixieDustBackdropPadding,
    type PixieDustBackdropPosition,
    type PixieDustBackdropRadius,
    type PixieDustBackdropVariant,
} from "@/components/ui/PixieDustBackdrop";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieDustFrame } from "@/components/ui/PixieDustFrame";
import { PixieDustPanel } from "@/components/ui/PixieDustPanel";
import { PixieDustBackdropPlayground } from "./PixieDustBackdropPlayground";

const variants = [
    {
        name: "Bain",
        value: "wash" as const,
        description: "Une teinte uniforme enveloppe doucement la composition.",
    },
    {
        name: "Dégradé",
        value: "gradient" as const,
        description: "La couleur entre dans le cadre puis se dissipe.",
    },
    {
        name: "Halo",
        value: "halo" as const,
        description: "Une lumière radiale se place derrière le premier plan.",
    },
    {
        name: "Vignette",
        value: "vignette" as const,
        description: "Les bords se ferment pour recentrer le regard.",
    },
    {
        name: "Projecteur",
        value: "projector" as const,
        description: "Un faisceau oblique traverse le fond de scène.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropVariant;
    description: string;
}>[];

const intensities = [
    { name: "Discrète", value: "subtle" as const, opacity: "44 %" },
    { name: "Moyenne", value: "medium" as const, opacity: "72 %" },
    { name: "Forte", value: "strong" as const, opacity: "100 %" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropIntensity;
    opacity: string;
}>[];

const positions = [
    { name: "Début", value: "start" as const },
    { name: "Centre", value: "center" as const },
    { name: "Fin", value: "end" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropPosition;
}>[];

const paddings = [
    { name: "Aucun", value: "none" as const, token: "0" },
    { name: "Petit", value: "sm" as const, token: "1 rem" },
    { name: "Moyen", value: "md" as const, token: "1,5 rem" },
    { name: "Grand", value: "lg" as const, token: "2 rem" },
    { name: "Très grand", value: "xl" as const, token: "3 rem" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropPadding;
    token: string;
}>[];

const radii = [
    { name: "Aucun", value: "none" as const },
    { name: "Petit", value: "small" as const },
    { name: "Moyen", value: "medium" as const },
    { name: "Grand", value: "large" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustBackdropRadius;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieDustBackdropElement",
        defaultValue: '"div"',
        description: "Élément HTML porté par le fond de scène.",
    },
    {
        name: "variant",
        type: "PixieDustBackdropVariant",
        defaultValue: '"wash"',
        description: "Atmosphère projetée derrière la composition.",
    },
    {
        name: "intensity",
        type: "PixieDustBackdropIntensity",
        defaultValue: '"medium"',
        description: "Présence visuelle de la couche atmosphérique.",
    },
    {
        name: "position",
        type: "PixieDustBackdropPosition",
        defaultValue: '"center"',
        description: "Origine du dégradé, du halo ou du faisceau.",
    },
    {
        name: "padding",
        type: "PixieDustBackdropPadding",
        defaultValue: '"lg"',
        description: "Espace réservé à la composition au premier plan.",
    },
    {
        name: "radius",
        type: "PixieDustBackdropRadius",
        defaultValue: '"none"',
        description: "Arrondi du fond lorsqu’il reste local.",
    },
    {
        name: "color",
        type: "PixieDustBackdropColor",
        defaultValue: "false",
        description: "Couleur du registre ou accent courant du thème.",
    },
    {
        name: "grain",
        type: "boolean",
        defaultValue: "false",
        description: "Ajoute une texture statique de projection.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Composition maintenue au premier plan.",
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
        name: "PixieDustBackdropElement",
        values: ['"div"', '"section"', '"header"', '"footer"'],
        description: "Structures de composition autorisées.",
    },
    {
        name: "PixieDustBackdropVariant",
        values: ['"wash"', '"gradient"', '"halo"', '"vignette"', '"projector"'],
        description: "Atmosphères disponibles derrière le contenu.",
    },
    {
        name: "PixieDustBackdropIntensity",
        values: ['"subtle"', '"medium"', '"strong"'],
        description: "Niveaux de présence de l’effet.",
    },
    {
        name: "PixieDustBackdropPosition",
        values: ['"start"', '"center"', '"end"'],
        description: "Origines horizontales de la lumière.",
    },
    {
        name: "PixieDustBackdropPadding",
        values: ['"none"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Densités intérieures de la composition.",
    },
    {
        name: "PixieDustBackdropRadius",
        values: ['"none"', '"small"', '"medium"', '"large"'],
        description: "Rayons disponibles dans la Projection Originale.",
    },
    {
        name: "PixieDustBackdropColor",
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

function ArchiveCard({
    title,
    year,
}: Readonly<{ title: string; year: string }>) {
    return (
        <PixieCard
            as="div"
            variant="outline"
            padding="md"
            className="backdrop-blur-[2px]"
        >
            <p className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                Archive · {year}
            </p>
            <h4 className="mt-2 text-xl text-ink">{title}</h4>
        </PixieCard>
    );
}

export function PixieDustBackdropDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-backdrop"
            labelledBy="pixie-dust-backdrop-title"
            nom="PixieDustBackdrop"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Décor 006
                        </p>
                        <h2
                            id="pixie-dust-backdrop-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustBackdrop
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Installer un fond de scène atmosphérique derrière
                            une composition sans remplacer ses surfaces.
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
            <section aria-labelledby="backdrop-identity" className="mt-14">
                <SequenceTitle
                    id="backdrop-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Le Backdrop enveloppe plusieurs éléments dans une même ambiance. Ses couches restent décoratives, statiques et toujours placées derrière le récit."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Installer une atmosphère de composition."],
                        [
                            "Usage",
                            "Ouvertures de section, héros éditoriaux et groupes de cartes.",
                        ],
                        [
                            "Limite",
                            "Ne porte ni donnée, ni interaction, ni statut par son effet.",
                        ],
                        [
                            "Anatomie",
                            "Une couche atmosphérique, un grain facultatif et le contenu.",
                        ],
                        [
                            "Accessibilité",
                            "Les pseudo-éléments restent invisibles aux technologies d’assistance.",
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
                aria-labelledby="backdrop-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="backdrop-master"
                    eyebrow="Plan maître"
                    title="Un faisceau ouvre la prochaine séquence"
                    description="Le plan de référence installe une lumière large derrière un titre et plusieurs archives sans modifier leurs propres surfaces."
                />

                <div className="mt-7 grid border border-line xl:grid-cols-2">
                    <div className="bg-canvas p-8">
                        <PixieDustBackdrop
                            variant="projector"
                            intensity="strong"
                            position="start"
                            color="ambre-projecteur"
                            padding="xl"
                            radius="large"
                            grain
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                Les premières images
                            </p>
                            <h4 className="mt-3 max-w-xl text-3xl text-ink">
                                Les origines retrouvent leur lumière
                            </h4>
                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                <ArchiveCard
                                    title="Alice’s Wonderland"
                                    year="1923"
                                />
                                <ArchiveCard
                                    title="Trolley Troubles"
                                    year="1927"
                                />
                            </div>
                        </PixieDustBackdrop>
                    </div>
                    <CodeExample>{`<PixieDustBackdrop
    variant="projector"
    intensity="strong"
    position="start"
    color="ambre-projecteur"
    padding="xl"
    radius="large"
    grain
>
    {/* Titre et surfaces au premier plan */}
</PixieDustBackdrop>`}</CodeExample>
                </div>
            </section>

            <section
                id="backdrop-variants"
                aria-labelledby="backdrop-variants-title"
                className="mt-16 scroll-mt-8"
            >
                <SequenceTitle
                    id="backdrop-variants-title"
                    eyebrow="Direction artistique"
                    title="Cinq atmosphères pour ouvrir le décor"
                    description="Chaque variant transforme uniquement l’arrière-plan ; le contenu et sa lisibilité conservent la même structure."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {variants.map((variant) => (
                        <PixieDustBackdrop
                            key={variant.value}
                            variant={variant.value}
                            color="violet-ombre-portee"
                            padding="lg"
                            radius="medium"
                            className="min-h-64"
                        >
                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                {variant.name}
                            </p>
                            <h4 className="mt-2 text-2xl text-ink">
                                {variant.value}
                            </h4>
                            <p className="mt-4 max-w-md leading-7 text-ink-soft">
                                {variant.description}
                            </p>
                        </PixieDustBackdrop>
                    ))}
                </div>
            </section>

            <section aria-labelledby="backdrop-intensity" className="mt-16">
                <SequenceTitle
                    id="backdrop-intensity"
                    eyebrow="Dosage de la lumière"
                    title="Trois intensités sans changer le contraste"
                    description="L’intensité agit sur l’opacité de la couche décorative. Les encres restent toujours celles de la Lumière active."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-3">
                    {intensities.map((intensity) => (
                        <PixieDustBackdrop
                            key={intensity.value}
                            variant="halo"
                            intensity={intensity.value}
                            color="bleu-reperage"
                            padding="lg"
                            radius="medium"
                            className="min-h-56"
                        >
                            <p className="font-mono text-xs text-accent">
                                intensity=&quot;{intensity.value}&quot;
                            </p>
                            <h4 className="mt-3 text-xl text-ink">
                                {intensity.name}
                            </h4>
                            <p className="mt-3 text-sm text-ink-soft">
                                Opacité de scène · {intensity.opacity}
                            </p>
                        </PixieDustBackdrop>
                    ))}
                </div>
            </section>

            <section aria-labelledby="backdrop-position" className="mt-16">
                <SequenceTitle
                    id="backdrop-position"
                    eyebrow="Placement du projecteur"
                    title="La lumière entre par trois côtés du cadre"
                    description="La position déplace le foyer des dégradés, halos et faisceaux sans réordonner le contenu."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-3">
                    {positions.map((position) => (
                        <PixieDustBackdrop
                            key={position.value}
                            variant="projector"
                            position={position.value}
                            color="ambre-projecteur"
                            padding="lg"
                            radius="medium"
                            className="min-h-56"
                        >
                            <p className="font-mono text-xs text-accent">
                                position=&quot;{position.value}&quot;
                            </p>
                            <h4 className="mt-3 text-xl text-ink">
                                {position.name}
                            </h4>
                        </PixieDustBackdrop>
                    ))}
                </div>
            </section>

            <section aria-labelledby="backdrop-grain" className="mt-16">
                <SequenceTitle
                    id="backdrop-grain"
                    eyebrow="Texture de projection"
                    title="Le grain reste une présence facultative"
                    description="La texture reprend l’opacité de Projection Originale, ne bouge jamais et disparaît en contraste forcé."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    <PixieDustBackdrop
                        variant="gradient"
                        color="vert-cellulo"
                        padding="lg"
                        radius="medium"
                        className="min-h-64"
                    >
                        <p className="font-mono text-xs text-accent">
                            grain=false
                        </p>
                        <h4 className="mt-3 text-2xl text-ink">
                            Surface nette
                        </h4>
                    </PixieDustBackdrop>

                    <PixieDustBackdrop
                        variant="gradient"
                        color="vert-cellulo"
                        padding="lg"
                        radius="medium"
                        grain
                        className="min-h-64"
                    >
                        <p className="font-mono text-xs text-accent">
                            grain=true
                        </p>
                        <h4 className="mt-3 text-2xl text-ink">
                            Surface projetée
                        </h4>
                    </PixieDustBackdrop>
                </div>
            </section>

            <section aria-labelledby="backdrop-composition" className="mt-16">
                <SequenceTitle
                    id="backdrop-composition"
                    eyebrow="Premier plan"
                    title="Les surfaces conservent leurs propres rôles"
                    description="Backdrop installe le climat général tandis que Card, Panel et Frame continuent de porter la matière visible."
                />

                <PixieDustBackdrop
                    variant="halo"
                    intensity="strong"
                    color="indigo-nuit-studio"
                    padding="xl"
                    radius="large"
                    grain
                    className="mt-7"
                >
                    <div className="grid gap-6 xl:grid-cols-3">
                        <PixieCard as="div" variant="elevated" padding="md">
                            <p className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                                Card
                            </p>
                            <h4 className="mt-2 text-xl text-ink">
                                Une archive autonome
                            </h4>
                        </PixieCard>

                        <PixieDustPanel as="div" variant="outline" padding="md">
                            <p className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                                Panel
                            </p>
                            <h4 className="mt-2 text-xl text-ink">
                                Une région structurée
                            </h4>
                        </PixieDustPanel>

                        <PixieDustFrame
                            as="div"
                            variant="outline"
                            padding="sm"
                            aspect="landscape"
                        >
                            <div className="flex h-full min-h-32 items-center justify-center bg-surface-muted">
                                <p className="text-sm text-muted">
                                    Frame · Média
                                </p>
                            </div>
                        </PixieDustFrame>
                    </div>
                </PixieDustBackdrop>
            </section>

            <section aria-labelledby="backdrop-construction" className="mt-16">
                <SequenceTitle
                    id="backdrop-construction"
                    eyebrow="Construction du décor"
                    title="Espacements et rayons cadrent l’atmosphère"
                    description="Le fond peut occuper une section entière ou rester local autour d’un groupe resserré."
                />

                <div className="mt-7 grid gap-8 xl:grid-cols-2">
                    <div>
                        <h4 className="text-xl text-ink">Espacements</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {paddings.map((padding) => (
                                <PixieDustBackdrop
                                    key={padding.value}
                                    variant="wash"
                                    color="corail-cel"
                                    padding={padding.value}
                                    radius="small"
                                    className="min-h-28"
                                >
                                    <div className="bg-surface p-3">
                                        <p className="font-mono text-xs text-accent">
                                            {padding.value} · {padding.token}
                                        </p>
                                    </div>
                                </PixieDustBackdrop>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl text-ink">Rayons</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {radii.map((radius) => (
                                <PixieDustBackdrop
                                    key={radius.value}
                                    variant="gradient"
                                    color="turquoise-acetate"
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
                                </PixieDustBackdrop>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="pixie-dust-backdrop-playground"
                aria-labelledby="backdrop-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="backdrop-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieDustBackdrop"
                    description="Réglez son atmosphère, son origine et son grain ; le code d’utilisation suit chaque changement."
                />
                <div className="mt-8">
                    <PixieDustBackdropPlayground />
                </div>
            </section>

            <section
                aria-labelledby="backdrop-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="backdrop-accessibility"
                    eyebrow="Accessibilité"
                    title="L’atmosphère reste silencieuse"
                    description="La sémantique vient de l’élément et du contenu. Les couches de lumière ne sont jamais exposées ni utilisées comme information."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Simple composition",
                            'Employer as="div" lorsque le fond ne structure pas le document.',
                        ],
                        [
                            "Section nommée",
                            'Associer as="section" à un titre visible, aria-labelledby ou aria-label.',
                        ],
                        [
                            "Repères natifs",
                            "Conserver header et footer uniquement lorsqu’ils décrivent réellement la page.",
                        ],
                        [
                            "Focus",
                            "Maintenir le halo de focus des contrôles contenus au-dessus des couches décoratives.",
                        ],
                        [
                            "Contraste",
                            "Les encres du thème restent inchangées quelle que soit l’intensité choisie.",
                        ],
                        [
                            "Contraste forcé",
                            "Supprimer atmosphère et grain pour laisser la structure native apparaître.",
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
                aria-labelledby="backdrop-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="backdrop-technical"
                    eyebrow="Générique technique"
                    title="API de l’esquisse"
                    description="Les types spécifiques sont colocalisés dans PixieDustBackdrop.types.ts et les attributs HTML compatibles sont transmis à l’élément rendu."
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

            <section aria-labelledby="backdrop-journal" className="mt-16">
                <SequenceTitle
                    id="backdrop-journal"
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="L’esquisse doit prouver qu’elle enrichit les compositions sans concurrencer les effets propres aux autres Décors."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Éprouver les cinq atmosphères dans les deux Lumières et sur plusieurs largeurs.",
                        "Comparer projector au halo interactif des Cards sans confondre leurs responsabilités.",
                        "Comparer halo au spotlight du Callout dans une composition réelle.",
                        "Vérifier le grain à 200 % de zoom et en contraste forcé.",
                        "Tester les contenus longs et les contrôles focusables au-dessus des couches.",
                        "Décider si position doit rester exposé pour wash et vignette malgré son effet neutre.",
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
