import Image from "next/image";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import {
    PixieDustFrame,
    type PixieDustFrameAspect,
    type PixieDustFramePadding,
    type PixieDustFrameRadius,
    type PixieDustFrameVariant,
} from "@/components/ui/PixieDustFrame";
import { PixieDustFramePlayground } from "./PixieDustFramePlayground";

const variants = [
    {
        name: "Simple",
        value: "plain" as const,
        description: "Le cadrage agit sans ajouter de matière visible.",
    },
    {
        name: "Contour",
        value: "outline" as const,
        description: "Un filet précis distingue le média de son contexte.",
    },
    {
        name: "Passe-partout",
        value: "mount" as const,
        description: "Une marge colorée installe le visuel sur son support.",
    },
    {
        name: "Pellicule",
        value: "film" as const,
        description: "Deux bandes rythmées évoquent la matière du film.",
    },
    {
        name: "Diapositive",
        value: "slide" as const,
        description: "Un double filet rappelle un cache de projection.",
    },
    {
        name: "Cellulo",
        value: "cel" as const,
        description: "Une surface translucide évoque les feuilles d’animation.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustFrameVariant;
    description: string;
}>[];

const aspects = [
    { name: "Naturel", value: "auto" as const, ratio: "dimensions du média" },
    { name: "Carré", value: "square" as const, ratio: "1 / 1" },
    { name: "Affiche", value: "poster" as const, ratio: "2 / 3" },
    { name: "Portrait", value: "portrait" as const, ratio: "3 / 4" },
    { name: "Paysage", value: "landscape" as const, ratio: "4 / 3" },
    { name: "Large", value: "wide" as const, ratio: "3 / 2" },
    { name: "Cinéma", value: "cinema" as const, ratio: "16 / 9" },
    { name: "Scope", value: "scope" as const, ratio: "2,39 / 1" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustFrameAspect;
    ratio: string;
}>[];

const paddings = [
    { name: "Aucun", value: "none" as const, token: "0" },
    { name: "Très petit", value: "xs" as const, token: "0,25 rem" },
    { name: "Petit", value: "sm" as const, token: "0,5 rem" },
    { name: "Moyen", value: "md" as const, token: "1 rem" },
    { name: "Grand", value: "lg" as const, token: "1,5 rem" },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustFramePadding;
    token: string;
}>[];

const radii = [
    { name: "Aucun", value: "none" as const },
    { name: "Petit", value: "small" as const },
    { name: "Moyen", value: "medium" as const },
    { name: "Grand", value: "large" as const },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustFrameRadius;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieDustFrameElement",
        defaultValue: '"figure"',
        description: "Élément HTML porté par le cadre.",
    },
    {
        name: "variant",
        type: "PixieDustFrameVariant",
        defaultValue: '"plain"',
        description: "Traitement visuel autour du média.",
    },
    {
        name: "aspect",
        type: "PixieDustFrameAspect",
        defaultValue: '"auto"',
        description: "Proportion réservée au média.",
    },
    {
        name: "customAspect",
        type: 'CSSProperties["aspectRatio"]',
        defaultValue: "—",
        description: "Proportion libre prioritaire sur le preset aspect.",
    },
    {
        name: "fit",
        type: "PixieDustFrameFit",
        defaultValue: '"cover"',
        description: "Remplissage ou conservation complète du média.",
    },
    {
        name: "position",
        type: "PixieDustFramePosition",
        defaultValue: '"center"',
        description: "Point d’ancrage employé lors du recadrage.",
    },
    {
        name: "focalPoint",
        type: "PixieDustFrameFocalPoint",
        defaultValue: "—",
        description:
            "Point focal précis en pourcentages, limité entre 0 et 100.",
    },
    {
        name: "padding",
        type: "PixieDustFramePadding",
        defaultValue: '"none"',
        description: "Marge entre le média et son cadre.",
    },
    {
        name: "radius",
        type: "PixieDustFrameRadius",
        defaultValue: '"medium"',
        description: "Arrondi du cadre et de la fenêtre intérieure.",
    },
    {
        name: "mediaRadius",
        type: "PixieDustFrameRadius",
        defaultValue: "radius",
        description: "Arrondi indépendant de la fenêtre du média.",
    },
    {
        name: "color",
        type: "PixieDustFrameColor",
        defaultValue: "false",
        description: "Couleur du registre ou accent courant du thème.",
    },
    {
        name: "elevation",
        type: "PixieDustFrameElevation",
        defaultValue: '"none"',
        description: "Niveau de détachement du cadre par rapport au décor.",
    },
    {
        name: "treatment",
        type: "PixieDustFrameTreatment",
        defaultValue: '"original"',
        description: "Traitement colorimétrique non destructif du média.",
    },
    {
        name: "effect",
        type: "PixieDustFrameEffect",
        defaultValue: '"none"',
        description: "Effet atmosphérique silencieux superposé au média.",
    },
    {
        name: "intensity",
        type: "PixieDustFrameIntensity",
        defaultValue: '"subtle"',
        description: "Présence visuelle de l’effet atmosphérique.",
    },
    {
        name: "overlay",
        type: "ReactNode",
        defaultValue: "—",
        description: "Annotation ou contenu bref placé au-dessus du média.",
    },
    {
        name: "overlayPosition",
        type: "PixieDustFrameOverlayPosition",
        defaultValue: '"bottom-end"',
        description: "Point d’ancrage du contenu superposé.",
    },
    {
        name: "caption",
        type: "ReactNode",
        defaultValue: "—",
        description: "Légende facultative associée au visuel.",
    },
    {
        name: "captionPosition",
        type: "PixieDustFrameCaptionPosition",
        defaultValue: '"outside"',
        description: "Placement extérieur ou superposé de la légende.",
    },
    {
        name: "captionAlign",
        type: "PixieDustFrameCaptionAlign",
        defaultValue: '"start"',
        description: "Alignement typographique de la légende.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Image, vidéo, symbole ou aperçu encadré.",
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
        name: "PixieDustFrameElement",
        values: ['"figure"', '"div"'],
        description: "Figure sémantique ou simple conteneur visuel.",
    },
    {
        name: "PixieDustFrameVariant",
        values: [
            '"plain"',
            '"outline"',
            '"mount"',
            '"film"',
            '"slide"',
            '"cel"',
        ],
        description: "Traitements du cadre indépendants du média.",
    },
    {
        name: "PixieDustFrameAspect",
        values: [
            '"auto"',
            '"square"',
            '"poster"',
            '"portrait"',
            '"landscape"',
            '"wide"',
            '"cinema"',
            '"scope"',
        ],
        description: "Proportions naturelles ou prédéfinies.",
    },
    {
        name: "PixieDustFrameFit",
        values: ['"cover"', '"contain"', '"fill"', '"none"', '"scale-down"'],
        description: "Modes de mise à l’échelle du média.",
    },
    {
        name: "PixieDustFramePosition",
        values: [
            '"center"',
            '"top"',
            '"bottom"',
            '"left"',
            '"right"',
            '"top-start"',
            '"top-end"',
            '"bottom-start"',
            '"bottom-end"',
        ],
        description: "Points d’ancrage du recadrage.",
    },
    {
        name: "PixieDustFrameFocalPoint",
        values: ["{ x: number; y: number }"],
        description: "Coordonnées en pourcentages du sujet à préserver.",
    },
    {
        name: "PixieDustFramePadding",
        values: ['"none"', '"xs"', '"sm"', '"md"', '"lg"'],
        description: "Largeurs du passe-partout.",
    },
    {
        name: "PixieDustFrameRadius",
        values: ['"none"', '"small"', '"medium"', '"large"'],
        description: "Rayons disponibles dans la Projection Originale.",
    },
    {
        name: "PixieDustFrameColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Couleur enregistrée ou accent courant du thème.",
    },
    {
        name: "PixieDustFrameCaptionPosition",
        values: ['"outside"', '"overlay"'],
        description: "Positions proposées pour la légende.",
    },
    {
        name: "PixieDustFrameElevation",
        values: ['"none"', '"soft"', '"strong"'],
        description: "Niveaux de relief du support.",
    },
    {
        name: "PixieDustFrameTreatment",
        values: ['"original"', '"monochrome"', '"sepia"'],
        description: "Traitements colorimétriques du média.",
    },
    {
        name: "PixieDustFrameEffect",
        values: [
            '"none"',
            '"grain"',
            '"vignette"',
            '"light-leak"',
            '"projector"',
        ],
        description: "Effets atmosphériques superposés.",
    },
    {
        name: "PixieDustFrameIntensity",
        values: ['"subtle"', '"medium"', '"strong"'],
        description: "Intensités disponibles pour les effets.",
    },
    {
        name: "PixieDustFrameOverlayPosition",
        values: [
            '"top-start"',
            '"top-end"',
            '"center"',
            '"bottom-start"',
            '"bottom-end"',
        ],
        description: "Points d’ancrage d’une annotation superposée.",
    },
    {
        name: "PixieDustFrameCaptionAlign",
        values: ['"start"', '"center"', '"end"'],
        description: "Alignements typographiques de la légende.",
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

function OeuvresImage({ alt = "" }: Readonly<{ alt?: string }>) {
    return (
        <Image
            src="/symbols/codex/index/oeuvres.png"
            alt={alt}
            width={1024}
            height={1024}
            sizes="(max-width: 768px) 80vw, 32rem"
        />
    );
}

function PersonnagesImage({ alt = "" }: Readonly<{ alt?: string }>) {
    return (
        <Image
            src="/symbols/codex/index/personnages.png"
            alt={alt}
            width={1024}
            height={1024}
            sizes="(max-width: 768px) 80vw, 32rem"
        />
    );
}

export function PixieDustFrameDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-frame"
            labelledBy="pixie-dust-frame-title"
            nom="PixieDustFrame"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Décor 003
                        </p>
                        <h2
                            id="pixie-dust-frame-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustFrame
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Mettre un média en scène sans décider de ce qu’il
                            représente ni de la manière dont il est décrit.
                        </p>
                    </div>

                    <dl className="grid min-w-64 grid-cols-2 gap-px bg-line md:grid-cols-1">
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Version
                            </dt>
                            <dd className="mt-1 font-mono text-sm text-ink">
                                0.2.0
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
            <section aria-labelledby="frame-identity" className="mt-14">
                <SequenceTitle
                    id="frame-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Le cadre réserve une fenêtre, contrôle le rapport entre le média et cette fenêtre, puis accueille éventuellement sa légende."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Encadrer un média ou un aperçu."],
                        [
                            "Usage",
                            "Illustrations, photographies, vidéos, symboles et prévisualisations.",
                        ],
                        [
                            "Limite",
                            "Ne charge pas le média et ne rédige pas son alternative.",
                        ],
                        [
                            "Cadrage",
                            "Proportion, point focal, ajustement, marge et rayons indépendants.",
                        ],
                        [
                            "Accessibilité",
                            "Figure et figcaption uniquement lorsque la sémantique les justifie.",
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
                aria-labelledby="frame-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="frame-master"
                    eyebrow="Plan maître"
                    title="Le visuel trouve son passe-partout"
                    description="Le plan de référence conserve le symbole entier, lui donne une proportion stable et relie sa légende par une véritable figure."
                />

                <div className="mt-7 grid border border-line xl:grid-cols-2">
                    <div className="flex min-h-[32rem] items-center justify-center bg-canvas p-8">
                        <PixieDustFrame
                            variant="mount"
                            aspect="landscape"
                            fit="contain"
                            padding="md"
                            color="ambre-projecteur"
                            caption="Symbole des Œuvres · Table lumineuse"
                            className="w-full max-w-xl"
                        >
                            <OeuvresImage alt="Symbole illustré des Œuvres" />
                        </PixieDustFrame>
                    </div>
                    <CodeExample>{`<PixieDustFrame
    variant="mount"
    aspect="landscape"
    fit="contain"
    padding="md"
    color="ambre-projecteur"
    caption="Symbole des Œuvres · Table lumineuse"
>
    <Image
        src="/symbols/codex/index/oeuvres.png"
        alt="Symbole illustré des Œuvres"
    />
</PixieDustFrame>`}</CodeExample>
                </div>
            </section>

            <section
                id="frame-variants"
                aria-labelledby="frame-variants-title"
                className="mt-16 scroll-mt-8"
            >
                <SequenceTitle
                    id="frame-variants-title"
                    eyebrow="Direction artistique"
                    title="Six manières d’entourer le visuel"
                    description="Le variant agit autour du média. La proportion et le recadrage restent des axes indépendants."
                />

                <div className="mt-7 grid gap-6 bg-surface-muted p-6 sm:grid-cols-2 xl:grid-cols-3">
                    {variants.map((variant) => (
                        <div key={variant.value}>
                            <PixieDustFrame
                                as="div"
                                variant={variant.value}
                                aspect="square"
                                fit="contain"
                                padding={
                                    variant.value === "plain" ? "none" : "sm"
                                }
                                color="rouge-crayon"
                            >
                                <PersonnagesImage />
                            </PixieDustFrame>
                            <h4 className="mt-4 text-xl text-ink">
                                {variant.name}
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-ink-soft">
                                {variant.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="frame-aspects" className="mt-16">
                <SequenceTitle
                    id="frame-aspects"
                    eyebrow="Formats de projection"
                    title="Huit proportions pour réserver la fenêtre"
                    description="Le ratio naturel suit le média. Les sept formats imposés stabilisent affiches, grilles et projections panoramiques."
                />

                <div className="mt-7 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {aspects.map((aspect) => (
                        <div key={aspect.value}>
                            <PixieDustFrame
                                as="div"
                                variant="outline"
                                aspect={aspect.value}
                                fit="cover"
                                radius="small"
                            >
                                <OeuvresImage />
                            </PixieDustFrame>
                            <p className="mt-3 font-medium text-ink">
                                {aspect.name}
                            </p>
                            <p className="mt-1 font-mono text-xs text-muted">
                                {aspect.value} · {aspect.ratio}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="frame-fit" className="mt-16">
                <SequenceTitle
                    id="frame-fit"
                    eyebrow="Cadre et champ"
                    title="Montrer tout le média ou remplir la fenêtre"
                    description="Contain préserve l’intégralité du visuel. Cover remplit le cadre et position choisit la zone qui reste dans le champ."
                />

                <div className="mt-7 grid gap-8 lg:grid-cols-2">
                    <div>
                        <PixieDustFrame
                            as="div"
                            variant="mount"
                            aspect="cinema"
                            fit="contain"
                            padding="sm"
                            color="bleu-reperage"
                        >
                            <PersonnagesImage />
                        </PixieDustFrame>
                        <h4 className="mt-4 text-xl text-ink">Contain</h4>
                        <p className="mt-2 leading-7 text-ink-soft">
                            Le symbole reste entier, quitte à laisser respirer
                            le fond autour de lui.
                        </p>
                    </div>

                    <div>
                        <PixieDustFrame
                            as="div"
                            variant="mount"
                            aspect="cinema"
                            fit="cover"
                            position="top"
                            padding="sm"
                            color="bleu-reperage"
                        >
                            <PersonnagesImage />
                        </PixieDustFrame>
                        <h4 className="mt-4 text-xl text-ink">Cover · top</h4>
                        <p className="mt-2 leading-7 text-ink-soft">
                            La fenêtre est remplie et conserve ici la partie
                            haute du média dans le champ.
                        </p>
                    </div>
                </div>
            </section>

            <section aria-labelledby="frame-construction" className="mt-16">
                <SequenceTitle
                    id="frame-construction"
                    eyebrow="Construction du décor"
                    title="Passe-partout et rayons restent combinables"
                    description="La marge éloigne le média du cadre. Le rayon agit à la fois sur la silhouette extérieure et sur sa fenêtre."
                />

                <div className="mt-7 grid gap-8 xl:grid-cols-2">
                    <div>
                        <h4 className="text-xl text-ink">Marges</h4>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {paddings.map((padding) => (
                                <div key={padding.value}>
                                    <PixieDustFrame
                                        as="div"
                                        variant="mount"
                                        aspect="square"
                                        fit="contain"
                                        padding={padding.value}
                                        radius="small"
                                        color="vert-cellulo"
                                    >
                                        <OeuvresImage />
                                    </PixieDustFrame>
                                    <p className="mt-2 font-mono text-xs text-muted">
                                        {padding.value} · {padding.token}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl text-ink">Rayons</h4>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {radii.map((radius) => (
                                <div key={radius.value}>
                                    <PixieDustFrame
                                        as="div"
                                        variant="outline"
                                        aspect="square"
                                        fit="cover"
                                        radius={radius.value}
                                    >
                                        <PersonnagesImage />
                                    </PixieDustFrame>
                                    <p className="mt-2 font-mono text-xs text-muted">
                                        {radius.value} · {radius.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section aria-labelledby="frame-captions" className="mt-16">
                <SequenceTitle
                    id="frame-captions"
                    eyebrow="Cartons de légende"
                    title="La légende reste liée à son image"
                    description="La position extérieure privilégie la lecture documentaire. La superposition reste disponible pour les aperçus plus visuels."
                />

                <div className="mt-7 grid items-start gap-8 lg:grid-cols-2">
                    <PixieDustFrame
                        variant="outline"
                        aspect="landscape"
                        fit="contain"
                        caption="Légende extérieure · La lecture reste séparée du média"
                    >
                        <OeuvresImage alt="Symbole illustré des Œuvres" />
                    </PixieDustFrame>

                    <PixieDustFrame
                        variant="film"
                        aspect="landscape"
                        fit="cover"
                        padding="sm"
                        color="corail-cel"
                        caption="Légende superposée · Contraste renforcé"
                        captionPosition="overlay"
                    >
                        <PersonnagesImage alt="Symbole illustré des Personnages" />
                    </PixieDustFrame>
                </div>
            </section>

            <section aria-labelledby="frame-scenarios" className="mt-16">
                <SequenceTitle
                    id="frame-scenarios"
                    eyebrow="Plans préparés"
                    title="Huit mises en scène pour éprouver le cadre"
                    description="Ces compositions croisent formats, focalisation, matières, traitements et annotations sans transformer PixieDustFrame en composant métier."
                />

                <div className="mt-7 grid items-start gap-8 md:grid-cols-2">
                    <article>
                        <PixieDustFrame
                            as="div"
                            variant="mount"
                            aspect="landscape"
                            fit="contain"
                            padding="lg"
                            color="ambre-projecteur"
                            elevation="soft"
                        >
                            <OeuvresImage />
                        </PixieDustFrame>
                        <h4 className="mt-4 text-xl text-ink">
                            Dessin sur table lumineuse
                        </h4>
                        <p className="mt-2 leading-7 text-ink-soft">
                            Un passe-partout ample laisse respirer un master
                            conservé dans son intégralité.
                        </p>
                    </article>

                    <article>
                        <PixieDustFrame
                            variant="film"
                            aspect="cinema"
                            fit="cover"
                            focalPoint={{ x: 42, y: 30 }}
                            padding="sm"
                            color="bleu-reperage"
                            effect="grain"
                            intensity="medium"
                            caption="Photogramme de repérage · point focal 42 × 30"
                        >
                            <PersonnagesImage alt="Symbole illustré des Personnages" />
                        </PixieDustFrame>
                        <h4 className="mt-4 text-xl text-ink">
                            Photogramme recadré
                        </h4>
                        <p className="mt-2 leading-7 text-ink-soft">
                            Le point focal protège le sujet pendant que le grain
                            suggère la projection.
                        </p>
                    </article>

                    <article className="md:max-w-sm">
                        <PixieDustFrame
                            variant="slide"
                            aspect="poster"
                            fit="cover"
                            position="top"
                            padding="xs"
                            radius="small"
                            mediaRadius="none"
                            color="violet-ombre-portee"
                            elevation="strong"
                            caption="Affiche de présentation · format 2 / 3"
                            captionAlign="center"
                        >
                            <OeuvresImage alt="Symbole illustré des Œuvres" />
                        </PixieDustFrame>
                        <h4 className="mt-4 text-xl text-ink">
                            Affiche de présentation
                        </h4>
                        <p className="mt-2 leading-7 text-ink-soft">
                            Le cache de diapositive et les deux rayons donnent
                            une silhouette éditoriale plus précise.
                        </p>
                    </article>

                    <article>
                        <PixieDustFrame
                            as="div"
                            variant="cel"
                            aspect="square"
                            fit="contain"
                            padding="md"
                            color="vert-cellulo"
                            overlay="Cellulo A-12"
                            overlayPosition="top-end"
                        >
                            <PersonnagesImage />
                        </PixieDustFrame>
                        <h4 className="mt-4 text-xl text-ink">
                            Cellulo annoté
                        </h4>
                        <p className="mt-2 leading-7 text-ink-soft">
                            Une annotation brève rejoint la surface sans entrer
                            dans le contenu du média.
                        </p>
                    </article>

                    <article>
                        <PixieDustFrame
                            variant="outline"
                            aspect="wide"
                            fit="cover"
                            treatment="monochrome"
                            effect="vignette"
                            intensity="strong"
                            caption="Archive restaurée · copie de travail"
                        >
                            <OeuvresImage alt="Symbole illustré des Œuvres" />
                        </PixieDustFrame>
                        <h4 className="mt-4 text-xl text-ink">
                            Archive monochrome
                        </h4>
                        <p className="mt-2 leading-7 text-ink-soft">
                            Le traitement et la vignette modifient la lecture
                            sans altérer la source.
                        </p>
                    </article>

                    <article>
                        <PixieDustFrame
                            as="div"
                            variant="plain"
                            aspect="scope"
                            fit="cover"
                            color="corail-cel"
                            effect="light-leak"
                            intensity="medium"
                            elevation="soft"
                        >
                            <PersonnagesImage />
                        </PixieDustFrame>
                        <h4 className="mt-4 text-xl text-ink">
                            Fuite de lumière
                        </h4>
                        <p className="mt-2 leading-7 text-ink-soft">
                            Un plan panoramique reçoit un accident lumineux
                            discret, silencieux et sensible au mouvement réduit.
                        </p>
                    </article>

                    <article>
                        <PixieDustFrame
                            variant="film"
                            aspect="cinema"
                            fit="contain"
                            padding="sm"
                            color="jaune-lampe"
                            effect="projector"
                            intensity="subtle"
                            overlay="Plan maître"
                            overlayPosition="top-start"
                            caption="Projection de contrôle"
                            captionPosition="overlay"
                            captionAlign="end"
                        >
                            <OeuvresImage alt="Symbole illustré des Œuvres" />
                        </PixieDustFrame>
                        <h4 className="mt-4 text-xl text-ink">
                            Projection légendée
                        </h4>
                        <p className="mt-2 leading-7 text-ink-soft">
                            Annotation, légende et lumière de projecteur
                            occupent des couches distinctes.
                        </p>
                    </article>

                    <article>
                        <PixieDustFrame
                            as="div"
                            variant="slide"
                            customAspect="5 / 2"
                            fit="scale-down"
                            padding="md"
                            mediaRadius="large"
                            color="rouge-crayon"
                            treatment="sepia"
                        >
                            <PersonnagesImage />
                        </PixieDustFrame>
                        <h4 className="mt-4 text-xl text-ink">
                            Format de banc-titre libre
                        </h4>
                        <p className="mt-2 leading-7 text-ink-soft">
                            Une proportion personnalisée et un arrondi intérieur
                            indépendant couvrent les cadrages hors catalogue.
                        </p>
                    </article>
                </div>
            </section>

            <section
                id="pixie-dust-frame-playground"
                aria-labelledby="frame-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="frame-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieDustFrame"
                    description="Réglez le cadre, la fenêtre et la légende ; le code d’utilisation suit chaque changement."
                />
                <div className="mt-8">
                    <PixieDustFramePlayground />
                </div>
            </section>

            <section
                aria-labelledby="frame-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="frame-accessibility"
                    eyebrow="Accessibilité"
                    title="Le cadre présente, le média se décrit"
                    description="PixieDustFrame n’invente ni alternative textuelle, ni interaction, ni rôle pour le contenu qu’il reçoit."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Média informatif",
                            "Le composant Image, video ou svg fournit lui-même son alternative pertinente.",
                        ],
                        [
                            "Média décoratif",
                            'Une image sans information conserve alt="" même lorsqu’elle reçoit un cadre visible.',
                        ],
                        [
                            "Figure documentaire",
                            'Conserver as="figure" lorsque le média et sa légende forment une unité autonome.',
                        ],
                        [
                            "Simple mise en page",
                            'Employer as="div" lorsque le cadre n’ajoute aucune structure documentaire.',
                        ],
                        [
                            "Légende distincte",
                            "La légende apporte du contexte mais ne remplace jamais l’alternative du média.",
                        ],
                        [
                            "Décor silencieux",
                            "Filets, marges et bandes de pellicule ne sont jamais annoncés aux technologies d’assistance.",
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
                aria-labelledby="frame-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="frame-technical"
                    eyebrow="Générique technique"
                    title="API de l’esquisse"
                    description="Les types spécifiques sont colocalisés dans PixieDustFrame.types.ts et les attributs HTML compatibles sont transmis à l’élément rendu."
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

            <section aria-labelledby="frame-journal" className="mt-16">
                <SequenceTitle
                    id="frame-journal"
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="L’esquisse doit être confrontée à de véritables médias du Codex avant de devenir PixieFrame."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Éprouver les ratios avec des photographies, des symboles et des vidéos.",
                        "Vérifier que film, slide et cel restent discrets dans les deux Lumières.",
                        "Contrôler le comportement de picture, video, svg et canvas comme enfants directs.",
                        "Valider les légendes et annotations superposées sur des médias clairs et sombres.",
                        "Tester les recadrages à 200 % de zoom et dans les cadres compacts.",
                        "Éprouver les points focaux et les formats libres avant la promotion.",
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
