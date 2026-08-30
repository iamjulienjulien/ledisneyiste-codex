import type { ReactNode } from "react";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieDustMarkdown } from "@/components/ui/PixieDustMarkdown";
import { getPixieDustMarkdownFixtures } from "./PixieDustMarkdown.fixtures.server";
import { PixieDustMarkdownPlayground } from "./PixieDustMarkdownPlayground";

const properties = [
    {
        name: "blocks",
        type: "readonly GuidebookBlock[]",
        defaultValue: "—",
        description:
            "Matière déjà analysée, résolue et autorisée par le serveur.",
    },
    {
        name: "as",
        type: "PixieDustMarkdownElement",
        defaultValue: '"article"',
        description: "Élément sémantique qui accueille le document.",
    },
    {
        name: "density",
        type: "PixieDustMarkdownDensity",
        defaultValue: '"comfortable"',
        description: "Rythme vertical général de la lecture.",
    },
    {
        name: "measure",
        type: "PixieDustMarkdownMeasure",
        defaultValue: '"reading"',
        description:
            "Mesure du texte courant ; code, tableaux et ASCII conservent le cadre disponible.",
    },
    {
        name: "color",
        type: "PixieDustMarkdownColor",
        defaultValue: "false",
        description:
            "Accent éditorial transmis aux citations, listes, tâches, séparateurs et compositions ASCII.",
    },
    {
        name: "headingOffset",
        type: "PixieDustMarkdownHeadingOffset",
        defaultValue: "0",
        description:
            "Décale la hiérarchie des titres sans dépasser le niveau h6.",
    },
    {
        name: "headingScale",
        type: "PixieDustMarkdownHeadingScale",
        defaultValue: '"display"',
        description:
            "Règle la présence visuelle des titres sans modifier leur niveau HTML.",
    },
    {
        name: "headingAnchors",
        type: "boolean",
        defaultValue: "true",
        description: "Expose un accès direct à chaque titre projeté.",
    },
    {
        name: "anchorPrefix",
        type: "string",
        defaultValue: '""',
        description:
            "Préfixe les identifiants et liens locaux lorsque plusieurs extraits partagent une page.",
    },
    {
        name: "wideBlocks",
        type: "PixieDustMarkdownWideBlocks",
        defaultValue: '"frame"',
        description:
            "Étend code, tableaux et ASCII au cadre ou les maintient dans la mesure éditoriale.",
    },
    {
        name: "codeOverflow",
        type: "PixieDustMarkdownCodeOverflow",
        defaultValue: '"scroll"',
        description:
            "Conserve les lignes de code ou autorise leur repli dans les cadres étroits.",
    },
    {
        name: "codeLineNumbers",
        type: "boolean",
        defaultValue: "false",
        description:
            "Ajoute des repères de ligne visuels sans les injecter dans le code copié ou annoncé.",
    },
    {
        name: "tableLayout",
        type: "PixieDustMarkdownTableLayout",
        defaultValue: '"auto"',
        description:
            "Laisse les colonnes suivre leur matière ou leur impose un partage fixe du cadre.",
    },
    {
        name: "asciiCopyable",
        type: "boolean",
        defaultValue: "true",
        description:
            "Transmet à PixieAscii l’autorisation d’exposer son action de copie.",
    },
    {
        name: "emptyMessage",
        type: "ReactNode",
        defaultValue: '"Aucune matière à projeter."',
        description: "Contrechamp visible lorsque la liste de blocs est vide.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes complémentaires appliquées à la racine.",
    },
    {
        name: "style",
        type: "PixieDustMarkdownStyle",
        defaultValue: "—",
        description: "Styles et mesure CSS explicitement transmis.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustMarkdownElement",
        values: ['"article"', '"section"', '"div"'],
        description: "Trois contextes sémantiques de restitution.",
    },
    {
        name: "PixieDustMarkdownDensity",
        values: ['"compact"', '"comfortable"', '"airy"'],
        description: "Trois rythmes de lecture indépendants de la largeur.",
    },
    {
        name: "PixieDustMarkdownMeasure",
        values: ['"reading"', '"wide"', '"full"'],
        description:
            "Mesure éditoriale, technique ou contrainte par le parent.",
    },
    {
        name: "PixieDustMarkdownHeadingOffset",
        values: ["0", "1", "2", "3"],
        description: "Décalage borné de la hiérarchie documentaire.",
    },
    {
        name: "PixieDustMarkdownHeadingScale",
        values: ['"display"', '"reading"', '"compact"'],
        description:
            "Trois échelles visuelles indépendantes de la sémantique des titres.",
    },
    {
        name: "PixieDustMarkdownWideBlocks",
        values: ['"frame"', '"measure"'],
        description:
            "Occupation du cadre par les blocs techniques et monospacés.",
    },
    {
        name: "PixieDustMarkdownCodeOverflow",
        values: ['"scroll"', '"wrap"'],
        description:
            "Défilement fidèle ou repli assumé des longues lignes de code.",
    },
    {
        name: "PixieDustMarkdownTableLayout",
        values: ['"auto"', '"fixed"'],
        description:
            "Largeur naturelle des colonnes ou partage fixe de l’espace.",
    },
    {
        name: "PixieDustMarkdownColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description:
            "Accent du registre éditorial ou héritage de la Lumière courante.",
    },
] as const;

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

export async function PixieDustMarkdownDossier() {
    const fixtures = await getPixieDustMarkdownFixtures();
    const guidebook = fixtures.find((fixture) => fixture.slug === "guidebook")!;
    const rich = fixtures.find((fixture) => fixture.slug === "rich")!;
    const partial = fixtures.find((fixture) => fixture.slug === "partial")!;
    const headingBlocks = rich.blocks.filter(
        (block) => block.kind === "heading" || block.kind === "paragraph",
    );
    const technicalBlocks = rich.blocks.filter(
        (block) => block.kind === "code" || block.kind === "table",
    );
    const accentBlocks = rich.blocks.filter(
        (block) =>
            block.kind === "blockquote" ||
            block.kind === "list" ||
            block.kind === "thematic-break" ||
            (block.kind === "code" && block.presentation === "ascii"),
    );
    const playgroundFixtures = fixtures.filter(
        (fixture) => fixture.slug !== "guidebook",
    );

    return (
        <AtelierFicheAccessoire
            id="pixie-dust-markdown"
            labelledBy="pixie-dust-markdown-title"
            nom="PixieDustMarkdown"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Écran 002
                        </p>
                        <h2
                            id="pixie-dust-markdown-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustMarkdown
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-ink-soft">
                            Restituer un document déjà analysé sans rouvrir sa
                            source ni contourner ses frontières.
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
                                0.2.0
                            </dd>
                        </div>
                    </dl>
                </div>
            }
        >
            <section
                aria-labelledby="markdown-master"
                className="mt-12 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="markdown-master"
                    eyebrow="Plan maître"
                    title="Le vrai Guidebook entre dans son premier Écran"
                    description="Cet extrait de la salle de briefing est lu sous docs/agents, analysé une seule fois côté serveur, puis transmis à Pixie sous forme de blocs sûrs."
                />

                <div className="mt-8 max-h-[42rem] overflow-y-auto border border-line bg-surface p-5 sm:p-8">
                    <PixieDustMarkdown
                        blocks={guidebook.blocks.slice(0, 20)}
                        headingOffset={1}
                        headingScale="reading"
                        anchorPrefix="markdown-master"
                        color="violet-ombre-portee"
                        codeLineNumbers
                    />
                </div>

                <div className="mt-7">
                    <AtelierCodeBlock>{`const document = await loadLocalGuidebookDocument("bienvenue");

<PixieDustMarkdown
    blocks={document.analysis?.blocks ?? []}
    headingOffset={1}
    headingScale="reading"
    color="violet-ombre-portee"
/>`}</AtelierCodeBlock>
                </div>
            </section>

            <section aria-labelledby="markdown-matter" className="mt-16">
                <SequenceTitle
                    id="markdown-matter"
                    eyebrow="Matière"
                    title="Une même lecture traverse tous les blocs"
                    description="La bobine témoin réunit hiérarchie, citations, tâches, tableau, code, carte ASCII et destinations de plusieurs états."
                />

                <div className="mt-8 border border-line bg-surface p-5 sm:p-8">
                    <PixieDustMarkdown
                        blocks={rich.blocks}
                        headingOffset={1}
                        anchorPrefix="markdown-rich"
                        measure="wide"
                        headingScale="reading"
                        codeLineNumbers
                    />
                </div>
            </section>

            <section
                aria-labelledby="markdown-heading-scales"
                className="mt-16"
            >
                <SequenceTitle
                    id="markdown-heading-scales"
                    eyebrow="Hiérarchie"
                    title="Le niveau reste vrai, la voix s’adapte au cadre"
                    description="headingOffset gouverne le document HTML ; headingScale règle seulement sa présence visuelle. Un chapitre enchâssé ne doit choisir entre une structure juste et des titres lisibles."
                />

                <div className="mt-8 grid gap-5 xl:grid-cols-3">
                    {[
                        [
                            "display",
                            "Affiche",
                            "Une ouverture autonome qui peut porter toute la lumière.",
                        ],
                        [
                            "reading",
                            "Lecture",
                            "Un chapitre installé dans une bibliothèque ou une fiche.",
                        ],
                        [
                            "compact",
                            "Compacte",
                            "Une référence technique dense qui conserve ses niveaux.",
                        ],
                    ].map(([scale, title, description]) => (
                        <Stage key={scale}>
                            <p className="mb-5 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                headingScale=&quot;{scale}&quot;
                            </p>
                            <PixieDustMarkdown
                                blocks={headingBlocks.slice(0, 4)}
                                as="section"
                                headingOffset={2}
                                headingScale={
                                    scale as "display" | "reading" | "compact"
                                }
                                headingAnchors={false}
                                anchorPrefix={`markdown-scale-${scale}`}
                                density="compact"
                            />
                            <p className="mt-5 border-t border-line pt-4 text-sm leading-6 text-muted">
                                {title} · {description}
                            </p>
                        </Stage>
                    ))}
                </div>
            </section>

            <section
                aria-labelledby="markdown-technical-blocks"
                className="mt-16"
            >
                <SequenceTitle
                    id="markdown-technical-blocks"
                    eyebrow="Blocs techniques"
                    title="Le cadre choisit entre fidélité et continuité"
                    description="Les tableaux et le code peuvent garder leurs dimensions naturelles, rejoindre la mesure du texte ou se replier lorsque le contexte l’exige."
                />

                <div className="mt-8 grid gap-5 xl:grid-cols-2">
                    <Stage>
                        <p className="mb-5 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Fidélité · défilement · lignes repérées
                        </p>
                        <PixieDustMarkdown
                            blocks={technicalBlocks}
                            as="section"
                            headingScale="compact"
                            anchorPrefix="markdown-technical-scroll"
                            codeLineNumbers
                        />
                    </Stage>
                    <Stage>
                        <p className="mb-5 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Continuité · repli · colonnes fixes
                        </p>
                        <PixieDustMarkdown
                            blocks={technicalBlocks}
                            as="section"
                            headingScale="compact"
                            anchorPrefix="markdown-technical-wrap"
                            wideBlocks="measure"
                            codeOverflow="wrap"
                            tableLayout="fixed"
                        />
                    </Stage>
                </div>
            </section>

            <section aria-labelledby="markdown-accents" className="mt-16">
                <SequenceTitle
                    id="markdown-accents"
                    eyebrow="Accents éditoriaux"
                    title="La couleur donne un repère, jamais une nouvelle vérité"
                    description="Le même accent traverse citations, listes, tâches, séparateurs et ASCII. Le texte et la structure conservent seuls le sens."
                />

                <div className="mt-8 grid gap-5 xl:grid-cols-3">
                    {[
                        ["violet-ombre-portee", "Guidebook"],
                        ["rouge-crayon", "Annotation"],
                        ["vert-cellulo", "Transmission"],
                    ].map(([color, label]) => (
                        <Stage key={color}>
                            <p className="mb-5 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                {label} · {color}
                            </p>
                            <PixieDustMarkdown
                                blocks={accentBlocks}
                                as="section"
                                color={
                                    color as
                                        | "violet-ombre-portee"
                                        | "rouge-crayon"
                                        | "vert-cellulo"
                                }
                                anchorPrefix={`markdown-accent-${color}`}
                                density="compact"
                                asciiCopyable={false}
                            />
                        </Stage>
                    ))}
                </div>
            </section>

            <section aria-labelledby="markdown-states" className="mt-16">
                <SequenceTitle
                    id="markdown-states"
                    eyebrow="Plans de coupe"
                    title="La lecture reste honnête lorsque la matière manque"
                    description="Un bloc inconnu devient un contrechamp textuel ; un document vide ne fabrique ni titre ni remplissage décoratif."
                />

                <div className="mt-8 grid gap-5 lg:grid-cols-2">
                    <Stage>
                        <p className="mb-5 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Partiel · HTML neutralisé
                        </p>
                        <PixieDustMarkdown
                            blocks={partial.blocks}
                            headingOffset={2}
                            anchorPrefix="markdown-partial"
                            density="compact"
                        />
                    </Stage>
                    <Stage>
                        <p className="mb-5 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Vide · contrechamp explicite
                        </p>
                        <PixieDustMarkdown
                            blocks={[]}
                            emptyMessage="Cette bobine ne contient encore aucune matière transmissible."
                        />
                    </Stage>
                </div>
            </section>

            <section
                id="pixie-dust-markdown-playground"
                aria-labelledby="markdown-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="markdown-playground-title"
                    eyebrow="Régie"
                    title="Régler la lecture sans reparcourir la source"
                    description="La régie agit seulement sur la mesure, le rythme et l’insertion sémantique de blocs déjà résolus."
                />
                <div className="mt-8">
                    <PixieDustMarkdownPlayground
                        fixtures={playgroundFixtures}
                    />
                </div>
            </section>

            <section
                aria-labelledby="markdown-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="markdown-accessibility"
                    eyebrow="Accessibilité"
                    title="La structure reste le premier décor"
                    description="Le document doit conserver son ordre, ses niveaux et ses statuts avant toute mise en scène visuelle."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Titres bornés",
                            "Le décalage conserve l’ordre hiérarchique et s’arrête à h6 ; l’échelle visuelle reste indépendante.",
                        ],
                        [
                            "Listes véritables",
                            "Ordre, imbrication et état des tâches restent annoncés.",
                        ],
                        [
                            "Débordements au clavier",
                            "Code et tableaux larges reçoivent un viewport focalisable.",
                        ],
                        [
                            "Destinations honnêtes",
                            "Un lien privé reste du texte et quitte l’ordre de tabulation.",
                        ],
                        [
                            "ASCII alternatif",
                            "Les cadres visuels délèguent une description nettoyée, la couleur et la copie autorisée à PixieAscii.",
                        ],
                        [
                            "Document sans script",
                            "Le composant serveur reste lisible sans hydratation ni mouvement.",
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
                aria-labelledby="markdown-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="markdown-technical"
                    eyebrow="Générique technique"
                    title="API de l’esquisse"
                    description="L’Écran reçoit uniquement des blocs Guidebook déjà autorisés. Sa seconde itération sépare la sémantique, la présence visuelle et le comportement des blocs techniques sans connaître leur source."
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

            <section aria-labelledby="markdown-journal" className="mt-16">
                <SequenceTitle
                    id="markdown-journal"
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="La seconde itération possède désormais les réglages nécessaires pour éprouver une lecture entière avant de stabiliser son contrat."
                />

                <ul className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        "Éprouver le chapitre le plus long dans les trois échelles de titres à 200 % de zoom.",
                        "Confirmer que les accents restent des repères et ne portent jamais seuls le sens.",
                        "Tester défilement, repli, numéros de ligne et colonnes fixes sur mobile et au clavier.",
                        "Relire les alternatives et la copie des compositions réellement confiées à PixieAscii.",
                        "Réserver la copie du code à une future primitive dédiée afin de garder cet Écran serveur.",
                        "Conserver sommaire, bibliothèque, source et navigation hors de cet Écran.",
                    ].map((item) => (
                        <li
                            key={item}
                            className="list-none bg-surface p-5 text-ink-soft"
                        >
                            <span
                                className="mr-3 text-accent"
                                aria-hidden="true"
                            >
                                ◇
                            </span>
                            {item}
                        </li>
                    ))}
                </ul>
            </section>

            <section
                aria-labelledby="markdown-last-image"
                className="mt-16 border-t border-line pt-10"
            >
                <SequenceTitle
                    id="markdown-last-image"
                    eyebrow="Dernière image"
                    title="Le document a trouvé sa voix. Il peut maintenant traverser toute la bibliothèque."
                />
            </section>
        </AtelierFicheAccessoire>
    );
}
