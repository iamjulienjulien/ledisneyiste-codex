import type { ReactNode } from "react";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import {
    PixieDustAscii,
    type PixieDustAsciiVariant,
} from "@/components/ui/PixieDustAscii";
import { PixieDustAsciiPlayground } from "./PixieDustAsciiPlayground";
import {
    decorativeSpark,
    guidebookTree,
    r2d2ServiceCard,
    tallRegister,
    unicodeCard,
    wideProjection,
} from "./PixieDustAscii.fixtures";

const properties = [
    {
        name: "children",
        type: "string",
        defaultValue: "—",
        description:
            "Composition exacte dont les espaces, tabulations et retours sont préservés.",
    },
    {
        name: "label",
        type: "string",
        defaultValue: "—",
        description:
            "Alternative accessible obligatoire lorsque la composition informe.",
    },
    {
        name: "decorative",
        type: "boolean",
        defaultValue: "false",
        description:
            "Retire la composition de l’arbre d’accessibilité et interdit la copie.",
    },
    {
        name: "caption",
        type: "ReactNode",
        defaultValue: "—",
        description: "Légende visible reliée à la composition.",
    },
    {
        name: "variant",
        type: "PixieDustAsciiVariant",
        defaultValue: '"surface"',
        description: "Traitement du cadre et de sa lumière.",
    },
    {
        name: "color",
        type: "PixieDustAsciiColor",
        defaultValue: "false",
        description: "Accent puisé dans le registre de l’Atelier.",
    },
    {
        name: "size",
        type: "PixieDustAsciiSize",
        defaultValue: '"md"',
        description: "Taille monospacée des glyphes.",
    },
    {
        name: "density",
        type: "PixieDustAsciiDensity",
        defaultValue: '"comfortable"',
        description: "Interligne sans altérer la grille horizontale.",
    },
    {
        name: "padding",
        type: "PixieDustAsciiPadding",
        defaultValue: '"md"',
        description: "Respiration intérieure du cadre.",
    },
    {
        name: "width",
        type: "PixieDustAsciiWidth",
        defaultValue: '"full"',
        description: "Largeur au contenu ou disponible.",
    },
    {
        name: "align",
        type: "PixieDustAsciiAlign",
        defaultValue: '"start"',
        description: "Placement du bloc sans réaligner ses lignes internes.",
    },
    {
        name: "overflow",
        type: "PixieDustAsciiOverflow",
        defaultValue: '"auto"',
        description: "Défilement contenu ou rognage volontaire.",
    },
    {
        name: "maxHeight",
        type: "PixieDustAsciiMaxHeight",
        defaultValue: '"none"',
        description: "Hauteur maximale avant défilement vertical.",
    },
    {
        name: "tabSize",
        type: "2 | 4 | 8",
        defaultValue: "4",
        description: "Largeur visuelle d’une tabulation conservée.",
    },
    {
        name: "texture",
        type: "PixieDustAsciiTexture",
        defaultValue: '"none"',
        description: "Grain ou lignes de régie derrière les glyphes.",
    },
    {
        name: "copyable",
        type: "boolean",
        defaultValue: "false",
        description: "Expose une action qui copie la chaîne exacte.",
    },
    {
        name: "copyLabel",
        type: "string",
        defaultValue: '"Copier la composition"',
        description: "Libellé initial de l’action de copie.",
    },
    {
        name: "copiedLabel",
        type: "string",
        defaultValue: '"Composition copiée"',
        description: "Confirmation visible après réussite.",
    },
    {
        name: "copyErrorLabel",
        type: "string",
        defaultValue: '"La copie a échoué"',
        description: "Retour visible lorsque le presse-papiers refuse l’accès.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes complémentaires appliquées à la figure.",
    },
    {
        name: "style",
        type: "PixieDustAsciiStyle",
        defaultValue: "—",
        description: "Styles et variables CSS explicitement transmis.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustAsciiVariant",
        values: ['"plain"', '"surface"', '"outline"', '"slate"', '"projector"'],
        description:
            "Cinq présences de plateau, de la plus nue à la plus lumineuse.",
    },
    {
        name: "PixieDustAsciiSize",
        values: ['"sm"', '"md"', '"lg"'],
        description: "Échelle typographique monospacée.",
    },
    {
        name: "PixieDustAsciiDensity",
        values: ['"compact"', '"comfortable"', '"airy"'],
        description: "Rythme vertical des lignes.",
    },
    {
        name: "PixieDustAsciiPadding",
        values: ['"none"', '"sm"', '"md"', '"lg"'],
        description: "Respirations intérieures tokenisées.",
    },
    {
        name: "PixieDustAsciiWidth",
        values: ['"fit"', '"full"'],
        description: "Occupation du cadre parent.",
    },
    {
        name: "PixieDustAsciiAlign",
        values: ['"start"', '"center"'],
        description: "Placement logique de la composition complète.",
    },
    {
        name: "PixieDustAsciiOverflow",
        values: ['"auto"', '"clip"'],
        description: "Comportement des dimensions hors cadre.",
    },
    {
        name: "PixieDustAsciiMaxHeight",
        values: ['"none"', '"sm"', '"md"', '"lg"'],
        description: "Bornes verticales du viewport.",
    },
    {
        name: "PixieDustAsciiTexture",
        values: ['"none"', '"grain"', '"scanlines"'],
        description:
            "Matières statiques qui demeurent derrière les caractères.",
    },
    {
        name: "PixieDustAsciiCopyState",
        values: ['"idle"', '"copied"', '"error"'],
        description: "États internes et annoncés de l’action de copie.",
    },
] as const;

const variantScenarios = [
    {
        variant: "plain" as const,
        title: "Sans décor",
        description:
            "Le texte rejoint une composition qui possède déjà sa surface.",
        color: false,
    },
    {
        variant: "surface" as const,
        title: "Surface",
        description:
            "Le document courant reçoit une présence douce et autonome.",
        color: "bleu-reperage" as const,
    },
    {
        variant: "outline" as const,
        title: "Contour",
        description:
            "La fiche technique affirme sa limite sans remplir le fond.",
        color: "vert-cellulo" as const,
    },
    {
        variant: "slate" as const,
        title: "Ardoise",
        description:
            "La régie conserve une lumière sombre dans les deux projections.",
        color: "ambre-projecteur" as const,
    },
    {
        variant: "projector" as const,
        title: "Projecteur",
        description:
            "Un halo contenu distingue une carte importante du studio.",
        color: "violet-ombre-portee" as const,
    },
] as const satisfies readonly Readonly<{
    variant: PixieDustAsciiVariant;
    title: string;
    description: string;
    color:
        | false
        | "bleu-reperage"
        | "vert-cellulo"
        | "ambre-projecteur"
        | "violet-ombre-portee";
}>[];

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

function Stage({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="min-w-0 border border-dashed border-line-strong bg-canvas p-4 sm:p-7">
            {children}
        </div>
    );
}

export function PixieDustAsciiDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-ascii"
            labelledBy="pixie-dust-ascii-title"
            nom="PixieDustAscii"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Écran 001
                        </p>
                        <h2
                            id="pixie-dust-ascii-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustAscii
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-ink-soft">
                            Préserver une composition monospacée sans la réduire
                            à un simple bloc de code.
                        </p>
                    </div>

                    <dl className="grid min-w-64 grid-cols-2 gap-px bg-line md:grid-cols-1">
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                État
                            </dt>
                            <dd className="mt-2">
                                <AtelierStatut statut="Esquisse" />
                            </dd>
                        </div>
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Version
                            </dt>
                            <dd className="mt-2 font-mono text-sm text-ink">
                                0.1.0
                            </dd>
                        </div>
                    </dl>
                </div>
            }
        >
            <section
                aria-labelledby="ascii-master"
                className="mt-12 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="ascii-master"
                    eyebrow="Plan maître"
                    title="La carte conserve exactement son dessin"
                    description="Espaces, traits de cadre, accents et poussière Unicode demeurent une chaîne inerte. Pixie lui donne seulement une scène, un débordement maîtrisé et une alternative accessible."
                />

                <div className="mt-8">
                    <PixieDustAscii
                        label="Carte de service de R2-D2"
                        variant="projector"
                        color="violet-ombre-portee"
                        padding="lg"
                        align="center"
                        texture="grain"
                        copyable
                        caption="Carte de service existante · la grille typographique fait partie du sens visuel."
                    >
                        {r2d2ServiceCard}
                    </PixieDustAscii>
                </div>

                <div className="mt-7">
                    <AtelierCodeBlock>{`<PixieDustAscii
    label="Carte de service de R2-D2"
    variant="projector"
    color="violet-ombre-portee"
    padding="lg"
    align="center"
    texture="grain"
    copyable
>
    {carteDeService}
</PixieDustAscii>`}</AtelierCodeBlock>
                </div>
            </section>

            <section aria-labelledby="ascii-variants" className="mt-16">
                <SequenceTitle
                    id="ascii-variants"
                    eyebrow="Présences"
                    title="Cinq manières d’installer la même grille"
                    description="La variante transforme le plateau autour de la composition, jamais ses caractères."
                />

                <div className="mt-8 grid gap-5 lg:grid-cols-2">
                    {variantScenarios.map((scenario) => (
                        <article
                            key={scenario.variant}
                            className="min-w-0 border border-line bg-surface p-5 sm:p-6"
                        >
                            <p className="font-mono text-xs text-accent">
                                variant=&quot;{scenario.variant}&quot;
                            </p>
                            <h4 className="mt-3 text-2xl text-ink">
                                {scenario.title}
                            </h4>
                            <p className="mt-3 min-h-12 text-sm leading-6 text-ink-soft">
                                {scenario.description}
                            </p>
                            <div className="mt-5">
                                <PixieDustAscii
                                    label={`Arborescence du Guidebook · variante ${scenario.title}`}
                                    variant={scenario.variant}
                                    color={scenario.color}
                                    size="sm"
                                    density="compact"
                                    padding="sm"
                                    texture={
                                        scenario.variant === "slate"
                                            ? "scanlines"
                                            : "none"
                                    }
                                >
                                    {guidebookTree}
                                </PixieDustAscii>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="ascii-unicode" className="mt-16">
                <SequenceTitle
                    id="ascii-unicode"
                    eyebrow="Matière"
                    title="Unicode et Lumières traversent la même grille"
                    description="Les accents, emojis et caractères de dessin ne sont ni normalisés ni remplacés."
                />

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {[
                        ["sombre", "Lumière sombre"],
                        ["claire", "Lumière claire"],
                    ].map(([light, title]) => (
                        <Stage key={light}>
                            <div
                                data-projection="originale"
                                data-lumiere={light}
                                className="bg-canvas p-4"
                            >
                                <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                    {title}
                                </p>
                                <PixieDustAscii
                                    label={`Composition Unicode en ${title.toLowerCase()}`}
                                    variant="surface"
                                    color="ambre-projecteur"
                                    size="sm"
                                    texture="grain"
                                >
                                    {unicodeCard}
                                </PixieDustAscii>
                            </div>
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="ascii-limits" className="mt-16">
                <SequenceTitle
                    id="ascii-limits"
                    eyebrow="Plans de coupe"
                    title="Le cadre contient les compositions extrêmes"
                    description="La chaîne ne se replie jamais pour rentrer. Le viewport assume le défilement ou le rognage choisi."
                />

                <div className="mt-8 grid gap-5 lg:grid-cols-2">
                    <Stage>
                        <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Très large · défilement horizontal
                        </p>
                        <PixieDustAscii
                            label="Chaîne de projection très large"
                            variant="outline"
                            color="bleu-reperage"
                            size="sm"
                            overflow="auto"
                            copyable
                        >
                            {wideProjection}
                        </PixieDustAscii>
                    </Stage>

                    <Stage>
                        <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Très haute · viewport borné
                        </p>
                        <PixieDustAscii
                            label="Registre vertical de vingt-quatre bobines"
                            variant="slate"
                            color="ambre-projecteur"
                            size="sm"
                            density="compact"
                            maxHeight="sm"
                            texture="scanlines"
                        >
                            {tallRegister}
                        </PixieDustAscii>
                    </Stage>

                    <Stage>
                        <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Vide · action neutralisée
                        </p>
                        <PixieDustAscii
                            label="Composition vide"
                            variant="surface"
                            copyable
                        >
                            {""}
                        </PixieDustAscii>
                    </Stage>

                    <Stage>
                        <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Décorative · silence assistif
                        </p>
                        <PixieDustAscii
                            decorative
                            variant="plain"
                            align="center"
                            size="lg"
                            color="violet-ombre-portee"
                        >
                            {decorativeSpark}
                        </PixieDustAscii>
                    </Stage>
                </div>
            </section>

            <section
                id="pixie-dust-ascii-playground"
                aria-labelledby="ascii-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="ascii-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieDustAscii"
                    description="Choisissez une fixture, son cadre et sa densité. Les contrôles généraux de l’Atelier règlent simultanément la Lumière et la largeur de projection."
                />
                <div className="mt-8">
                    <PixieDustAsciiPlayground />
                </div>
            </section>

            <section
                aria-labelledby="ascii-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="ascii-accessibility"
                    eyebrow="Accessibilité"
                    title="Décrire le dessin sans faire épeler son cadre"
                    description="La grille visible reste sélectionnable, tandis qu’un libellé humain conserve son sens pour les technologies d’assistance."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Alternative obligatoire",
                            "Le mode informatif exige un label qui décrit la composition.",
                        ],
                        [
                            "ASCII visuel",
                            "Le pre est masqué aux lecteurs d’écran afin d’éviter l’énumération des traits.",
                        ],
                        [
                            "Viewport au clavier",
                            "Une composition défilable peut recevoir le focus et conserver un contour visible.",
                        ],
                        [
                            "Copie annoncée",
                            "Réussite et échec rejoignent une région polie sans dépendre d’un Toast.",
                        ],
                        [
                            "Décor réellement décoratif",
                            "Le type interdit label et copie lorsque decorative vaut true.",
                        ],
                        [
                            "Contraste renforcé",
                            "Les textures et halos disparaissent lorsque le système impose ses couleurs.",
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
                aria-labelledby="ascii-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="ascii-technical"
                    eyebrow="Générique technique"
                    title="API de l’esquisse"
                    description="La primitive accepte uniquement une chaîne déjà autorisée. Elle ne connaît ni Markdown, ni chemin local, ni Notion."
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

            <section aria-labelledby="ascii-journal" className="mt-16">
                <SequenceTitle
                    id="ascii-journal"
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="La version 0.1.0 doit maintenant être éprouvée visuellement avant d’entrer dans le lecteur Markdown."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Vérifier la fidélité des cartes de service dans les deux Lumières.",
                        "Contrôler les très longues lignes au clavier, au toucher et à 200 %.",
                        "Éprouver la hauteur bornée avec un registre beaucoup plus dense.",
                        "Confirmer que slate reste suffisamment lisible en Lumière claire.",
                        "Confronter les trois textures au contraste renforcé et à l’impression.",
                        "Décider si la détection future des cartes ASCII appartient à l’analyse Markdown.",
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

            <section aria-labelledby="ascii-last-frame" className="mt-16">
                <SequenceTitle
                    id="ascii-last-frame"
                    eyebrow="Dernière image"
                    title="Les traits tiennent. La carte peut entrer dans le Guidebook."
                />
            </section>
        </AtelierFicheAccessoire>
    );
}
