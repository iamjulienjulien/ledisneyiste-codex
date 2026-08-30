import type { ReactNode } from "react";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieAscii, type PixieAsciiVariant } from "@/components/ui/PixieAscii";
import { PixieAsciiPlayground } from "./PixieAsciiPlayground";
import {
    decorativeSpark,
    guidebookTree,
    r2d2ServiceCard,
    tallRegister,
    twoDimensionalRegister,
    unicodeCard,
    wideProjection,
} from "./PixieAscii.fixtures";

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
        description: "Nom accessible court de la composition informative.",
    },
    {
        name: "alternative",
        type: "string",
        defaultValue: "—",
        description:
            "Description détaillée reliée à la composition sans faire épeler sa grille.",
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
        type: "PixieAsciiVariant",
        defaultValue: '"surface"',
        description: "Traitement du cadre et de sa lumière.",
    },
    {
        name: "color",
        type: "PixieAsciiColor",
        defaultValue: "false",
        description: "Accent puisé dans le registre de l’Atelier.",
    },
    {
        name: "size",
        type: "PixieAsciiSize",
        defaultValue: '"md"',
        description: "Taille monospacée des glyphes.",
    },
    {
        name: "density",
        type: "PixieAsciiDensity",
        defaultValue: '"comfortable"',
        description: "Interligne sans altérer la grille horizontale.",
    },
    {
        name: "padding",
        type: "PixieAsciiPadding",
        defaultValue: '"md"',
        description: "Respiration intérieure du cadre.",
    },
    {
        name: "width",
        type: "PixieAsciiWidth",
        defaultValue: '"full"',
        description: "Largeur au contenu ou disponible.",
    },
    {
        name: "align",
        type: "PixieAsciiAlign",
        defaultValue: '"start"',
        description: "Placement du bloc sans réaligner ses lignes internes.",
    },
    {
        name: "overflow",
        type: "PixieAsciiOverflow",
        defaultValue: '"auto"',
        description: "Défilement contenu ou rognage volontaire.",
    },
    {
        name: "scrollHint",
        type: "boolean",
        defaultValue: "true",
        description:
            "Matérialise les directions où une partie de la composition reste hors champ.",
    },
    {
        name: "maxHeight",
        type: "PixieAsciiMaxHeight",
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
        type: "PixieAsciiTexture",
        defaultValue: '"none"',
        description: "Grain ou lignes de régie derrière les glyphes.",
    },
    {
        name: "emptyLabel",
        type: "string",
        defaultValue: '"Aucune composition à afficher."',
        description: "Message visible lorsque la chaîne est vide.",
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
        name: "onCopyStateChange",
        type: "(state: PixieAsciiCopyState) => void",
        defaultValue: "—",
        description:
            "Transmet les états idle, copied et error à la régie qui orchestre la copie.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes complémentaires appliquées à la figure.",
    },
    {
        name: "style",
        type: "PixieAsciiStyle",
        defaultValue: "—",
        description: "Styles et variables CSS explicitement transmis.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieAsciiVariant",
        values: ['"plain"', '"surface"', '"outline"', '"slate"', '"projector"'],
        description:
            "Cinq présences de plateau, de la plus nue à la plus lumineuse.",
    },
    {
        name: "PixieAsciiSize",
        values: ['"sm"', '"md"', '"lg"'],
        description: "Échelle typographique monospacée.",
    },
    {
        name: "PixieAsciiDensity",
        values: ['"compact"', '"comfortable"', '"airy"'],
        description: "Rythme vertical des lignes.",
    },
    {
        name: "PixieAsciiPadding",
        values: ['"none"', '"sm"', '"md"', '"lg"'],
        description: "Respirations intérieures tokenisées.",
    },
    {
        name: "PixieAsciiWidth",
        values: ['"fit"', '"full"'],
        description: "Occupation du cadre parent.",
    },
    {
        name: "PixieAsciiAlign",
        values: ['"start"', '"center"'],
        description: "Placement logique de la composition complète.",
    },
    {
        name: "PixieAsciiOverflow",
        values: ['"auto"', '"clip"'],
        description: "Comportement des dimensions hors cadre.",
    },
    {
        name: "PixieAsciiMaxHeight",
        values: ['"none"', '"sm"', '"md"', '"lg"'],
        description: "Bornes verticales du viewport.",
    },
    {
        name: "PixieAsciiTexture",
        values: ['"none"', '"grain"', '"scanlines"'],
        description:
            "Matières statiques qui demeurent derrière les caractères.",
    },
    {
        name: "PixieAsciiCopyState",
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
    variant: PixieAsciiVariant;
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

export function PixieAsciiDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-ascii"
            labelledBy="pixie-ascii-title"
            nom="PixieAscii"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Écran 001
                        </p>
                        <h2
                            id="pixie-ascii-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieAscii
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
                                <AtelierStatut statut="Prêt à projeter" />
                            </dd>
                        </div>
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Version
                            </dt>
                            <dd className="mt-2 font-mono text-sm text-ink">
                                1.0.0
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
                    <PixieAscii
                        label="Carte de service de R2-D2"
                        alternative="Carte de service de R2-D2, Lead Developer de l’unité Guidebook chez Guru Éditions. Mission : relier le prompt à la magie."
                        variant="projector"
                        color="violet-ombre-portee"
                        padding="lg"
                        align="center"
                        texture="grain"
                        copyable
                        caption="Carte de service existante · la grille typographique fait partie du sens visuel."
                    >
                        {r2d2ServiceCard}
                    </PixieAscii>
                </div>

                <div className="mt-7">
                    <AtelierCodeBlock>{`<PixieAscii
    label="Carte de service de R2-D2"
    alternative={alternativeTextuelle}
    variant="projector"
    color="violet-ombre-portee"
    padding="lg"
    align="center"
    texture="grain"
    copyable
>
    {carteDeService}
</PixieAscii>`}</AtelierCodeBlock>
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
                                <PixieAscii
                                    label={`Arborescence du Guidebook · variante ${scenario.title}`}
                                    alternative="Le dossier docs/agents contient un README et six chapitres numérotés."
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
                                </PixieAscii>
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
                                <PixieAscii
                                    label={`Composition Unicode en ${title.toLowerCase()}`}
                                    alternative="Poussière prête, lumière allumée. Signal reçu par R2-D2."
                                    variant="surface"
                                    color="ambre-projecteur"
                                    size="sm"
                                    texture="grain"
                                >
                                    {unicodeCard}
                                </PixieAscii>
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
                        <PixieAscii
                            label="Chaîne de projection très large"
                            alternative="La source locale traverse l’analyse Markdown, les blocs normalisés et la projection du Guidebook."
                            variant="outline"
                            color="bleu-reperage"
                            size="sm"
                            overflow="auto"
                            copyable
                        >
                            {wideProjection}
                        </PixieAscii>
                    </Stage>

                    <Stage>
                        <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Très haute · viewport borné
                        </p>
                        <PixieAscii
                            label="Registre vertical de vingt-quatre bobines"
                            alternative="Registre de vingt-quatre bobines, alternativement prêtes ou en repérage."
                            variant="slate"
                            color="ambre-projecteur"
                            size="sm"
                            density="compact"
                            maxHeight="sm"
                            texture="scanlines"
                        >
                            {tallRegister}
                        </PixieAscii>
                    </Stage>

                    <Stage>
                        <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Très large et très haute · quatre hors-champs
                        </p>
                        <PixieAscii
                            label="Registre débordant dans les deux directions"
                            alternative="Dix-huit entrées du Guidebook traversent une source autorisée, une analyse unique, une alternative conservée et une projection prête."
                            variant="projector"
                            color="violet-ombre-portee"
                            size="sm"
                            density="compact"
                            overflow="auto"
                            maxHeight="sm"
                            texture="grain"
                        >
                            {twoDimensionalRegister}
                        </PixieAscii>
                    </Stage>

                    <Stage>
                        <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Vide · action neutralisée
                        </p>
                        <PixieAscii
                            label="Composition vide"
                            alternative="Aucune composition n’est disponible."
                            variant="surface"
                            emptyLabel="La bobine est vide."
                            copyable
                        >
                            {""}
                        </PixieAscii>
                    </Stage>

                    <Stage>
                        <p className="mb-4 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Décorative · silence assistif
                        </p>
                        <PixieAscii
                            decorative
                            variant="plain"
                            align="center"
                            size="lg"
                            color="violet-ombre-portee"
                        >
                            {decorativeSpark}
                        </PixieAscii>
                    </Stage>
                </div>
            </section>

            <section
                id="pixie-ascii-playground"
                aria-labelledby="ascii-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="ascii-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieAscii"
                    description="Choisissez une fixture, son cadre et sa densité. Les contrôles généraux de l’Atelier règlent simultanément la Lumière et la largeur de projection."
                />
                <div className="mt-8">
                    <PixieAsciiPlayground />
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
                            "Nom accessible obligatoire",
                            "Le mode informatif sépare un nom court d’une description détaillée facultative.",
                        ],
                        [
                            "ASCII visuel",
                            "Le pre est masqué aux lecteurs d’écran afin d’éviter l’énumération des traits.",
                        ],
                        [
                            "Viewport au clavier",
                            "Seule une composition réellement débordante rejoint le parcours clavier et conserve un focus visible.",
                        ],
                        [
                            "Hors-champ visible",
                            "Quatre indices s’effacent au fil du défilement et rendent les directions restantes perceptibles.",
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
                        [
                            "Impression complète",
                            "Contrôles, textures et bornes disparaissent sur papier pour restituer toute la grille.",
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
                    title="API du composant"
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
        </AtelierFicheAccessoire>
    );
}
