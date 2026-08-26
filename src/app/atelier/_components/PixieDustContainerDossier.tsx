import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieDustBackdrop } from "@/components/ui/PixieDustBackdrop";
import {
    PixieDustContainer,
    type PixieDustContainerGutter,
    type PixieDustContainerWidth,
} from "@/components/ui/PixieDustContainer";
import { PixieDustContainerPlayground } from "./PixieDustContainerPlayground";

const widths = [
    {
        name: "Étroit",
        value: "narrow" as const,
        token: "42 rem",
        role: "Texte long et lecture suivie.",
    },
    {
        name: "Moyen",
        value: "medium" as const,
        token: "56 rem",
        role: "Séquence éditoriale et composition simple.",
    },
    {
        name: "Large",
        value: "wide" as const,
        token: "72 rem",
        role: "Cadre principal du Codex et collections.",
    },
    {
        name: "Pleine largeur",
        value: "full" as const,
        token: "sans maximum",
        role: "Composition bornée uniquement par son parent.",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustContainerWidth;
    token: string;
    role: string;
}>[];

const gutters = [
    { name: "Aucune", value: "none" as const, token: "0" },
    { name: "Petite", value: "sm" as const, token: "1 rem" },
    { name: "Moyenne", value: "md" as const, token: "1,5 rem" },
    {
        name: "Grande",
        value: "lg" as const,
        token: "clamp(2 rem, 4 vw, 3 rem)",
    },
] as const satisfies readonly Readonly<{
    name: string;
    value: PixieDustContainerGutter;
    token: string;
}>[];

const properties = [
    {
        name: "as",
        type: "PixieDustContainerElement",
        defaultValue: '"div"',
        description: "Élément HTML qui porte la séquence.",
    },
    {
        name: "width",
        type: "PixieDustContainerWidth",
        defaultValue: '"wide"',
        description: "Largeur maximale du cadre centré.",
    },
    {
        name: "gutter",
        type: "PixieDustContainerGutter",
        defaultValue: '"md"',
        description: "Protection horizontale comprise dans le cadre.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Séquence contenue sans modification de son rythme.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes complémentaires appliquées au cadre externe.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustContainerElement",
        values: ['"div"', '"main"', '"section"'],
        description: "Structures de page autorisées.",
    },
    {
        name: "PixieDustContainerWidth",
        values: ['"narrow"', '"medium"', '"wide"', '"full"'],
        description: "Cadres de lecture disponibles.",
    },
    {
        name: "PixieDustContainerGutter",
        values: ['"none"', '"sm"', '"md"', '"lg"'],
        description: "Protections horizontales disponibles.",
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

function Guide({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="border-x border-accent/60 bg-surface p-5 shadow-soft">
            {children}
        </div>
    );
}

export function PixieDustContainerDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-container"
            labelledBy="pixie-dust-container-title"
            nom="PixieDustContainer"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Montage 001
                        </p>
                        <h2
                            id="pixie-dust-container-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustContainer
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Centrer et contenir une séquence dans un cadre de
                            lecture stable, sans lui imposer de décor.
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
            <section aria-labelledby="container-identity" className="mt-14">
                <SequenceTitle
                    id="container-identity"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Le Container définit uniquement l’axe horizontal d’une composition : sa largeur maximale, son centrage et ses gouttières."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        [
                            "Mission",
                            "Stabiliser le cadre de lecture d’une séquence.",
                        ],
                        [
                            "Usage",
                            "Pages, sections éditoriales, collections et compositions imbriquées.",
                        ],
                        [
                            "Limite",
                            "N’ajoute ni surface, ni couleur, ni ombre, ni rythme vertical.",
                        ],
                        [
                            "Anatomie",
                            "Une largeur maximale, un centrage et deux gouttières.",
                        ],
                        [
                            "Accessibilité",
                            "La sémantique dépend de as ; la géométrie reste silencieuse.",
                        ],
                        [
                            "Dépendances",
                            "Aucune : le Container peut accueillir les autres familles.",
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
                aria-labelledby="container-master"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="container-master"
                    eyebrow="Plan maître"
                    title="Une séquence trouve son cadre"
                    description="Le plan de référence centre un contenu éditorial large et maintient une protection constante contre les bords de la scène."
                />

                <div className="mt-7 grid border border-line xl:grid-cols-2">
                    <div className="overflow-hidden bg-canvas py-10">
                        <PixieDustContainer width="wide" gutter="md">
                            <Guide>
                                <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                    Séquence 01
                                </p>
                                <h4 className="mt-3 text-3xl text-ink">
                                    Le dessin animé trouve son langage
                                </h4>
                                <p className="mt-4 max-w-2xl leading-7 text-ink-soft">
                                    Le contenu reste libre de choisir sa surface
                                    et son propre rythme à l’intérieur du cadre.
                                </p>
                            </Guide>
                        </PixieDustContainer>
                    </div>
                    <CodeExample>{`<PixieDustContainer
    as="section"
    width="wide"
    gutter="md"
    aria-labelledby="sequence-title"
>
    <h2 id="sequence-title">Le dessin animé trouve son langage</h2>
    {/* Contenu de la séquence */}
</PixieDustContainer>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="container-widths" className="mt-16">
                <SequenceTitle
                    id="container-widths"
                    eyebrow="Cadres de lecture"
                    title="Quatre largeurs pour changer d’échelle"
                    description="Chaque valeur fixe une limite maximale ; le composant reste fluide lorsque son parent ou la fenêtre devient plus étroit."
                />

                <div className="mt-7 space-y-6 overflow-hidden bg-canvas py-8">
                    {widths.map((width) => (
                        <PixieDustContainer
                            key={width.value}
                            width={width.value}
                            gutter="md"
                        >
                            <Guide>
                                <div className="flex flex-wrap items-baseline justify-between gap-3">
                                    <h4 className="text-xl text-ink">
                                        {width.name}
                                    </h4>
                                    <code className="font-mono text-xs text-accent">
                                        {width.value} · {width.token}
                                    </code>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    {width.role}
                                </p>
                            </Guide>
                        </PixieDustContainer>
                    ))}
                </div>
            </section>

            <section aria-labelledby="container-gutters" className="mt-16">
                <SequenceTitle
                    id="container-gutters"
                    eyebrow="Bords de sécurité"
                    title="Quatre gouttières protègent la séquence"
                    description="La gouttière appartient au Container. Elle ne remplace ni le padding d’une surface ni l’espacement entre les enfants."
                />

                <div className="mt-7 grid gap-6 bg-canvas p-6 lg:grid-cols-2">
                    {gutters.map((gutter) => (
                        <div
                            key={gutter.value}
                            className="overflow-hidden border border-dashed border-line-strong py-5"
                        >
                            <PixieDustContainer
                                width="full"
                                gutter={gutter.value}
                            >
                                <Guide>
                                    <h4 className="text-lg text-ink">
                                        {gutter.name}
                                    </h4>
                                    <p className="mt-2 font-mono text-xs text-accent">
                                        gutter=&quot;{gutter.value}&quot; ·{" "}
                                        {gutter.token}
                                    </p>
                                </Guide>
                            </PixieDustContainer>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="container-responsive" className="mt-16">
                <SequenceTitle
                    id="container-responsive"
                    eyebrow="Changement de format"
                    title="Le même cadre traverse les tailles d’écran"
                    description="Le maximum ne devient jamais une largeur obligatoire : le Container se contracte avec son parent tout en conservant ses gouttières."
                />

                <div className="mt-7 grid items-start gap-8 lg:grid-cols-[20rem_1fr]">
                    {[
                        ["Cadre compact", "max-w-xs"],
                        ["Cadre large", "max-w-none"],
                    ].map(([label, frameClass]) => (
                        <div key={label} className={`w-full ${frameClass}`}>
                            <p className="mb-3 text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                {label}
                            </p>
                            <div className="overflow-hidden border border-dashed border-line-strong bg-canvas py-6">
                                <PixieDustContainer width="wide" gutter="md">
                                    <Guide>
                                        <p className="leading-7 text-ink-soft">
                                            Le cadre reste lisible sans produire
                                            de défilement horizontal.
                                        </p>
                                    </Guide>
                                </PixieDustContainer>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="container-composition" className="mt-16">
                <SequenceTitle
                    id="container-composition"
                    eyebrow="Composition"
                    title="L’atmosphère déborde, le récit reste aligné"
                    description="Backdrop occupe tout le plan disponible tandis que Container maintient les textes et les surfaces sur le même axe."
                />

                <PixieDustBackdrop
                    variant="projector"
                    intensity="strong"
                    position="start"
                    color="ambre-projecteur"
                    padding="none"
                    texture="grain"
                    className="mt-7 py-12"
                >
                    <PixieDustContainer
                        as="section"
                        width="medium"
                        gutter="lg"
                        aria-labelledby="container-composition-heading"
                    >
                        <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                            Champ et cadre
                        </p>
                        <h4
                            id="container-composition-heading"
                            className="mt-3 max-w-2xl text-3xl text-ink"
                        >
                            La lumière traverse la scène sans déplacer le texte
                        </h4>
                        <p className="mt-4 max-w-xl leading-7 text-ink-soft">
                            Le décor peut s’étendre jusqu’aux bords ; la lecture
                            conserve son propre repère horizontal.
                        </p>
                    </PixieDustContainer>
                </PixieDustBackdrop>
            </section>

            <section aria-labelledby="container-boundaries" className="mt-16">
                <SequenceTitle
                    id="container-boundaries"
                    eyebrow="Raccords de montage"
                    title="Le Container ne monte pas la séquence à lui seul"
                    description="Cette première primitive fixe les limites du cadre. Les futurs composants du Montage prendront en charge le rythme, la distribution et les sorties de cadre."
                />

                <div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        ["Container", "Largeur, centrage et gouttières."],
                        ["Stack", "Rythme vertical entre les plans."],
                        ["Grid", "Distribution responsive d’une collection."],
                        ["Bleed", "Sortie volontaire hors du cadre."],
                    ].map(([title, description]) => (
                        <article key={title} className="bg-surface p-5">
                            <h4 className="text-lg text-ink">{title}</h4>
                            <p className="mt-3 text-sm leading-6 text-ink-soft">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section
                id="pixie-dust-container-playground"
                aria-labelledby="container-playground-title"
                className="mt-16 scroll-mt-8 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="container-playground-title"
                    eyebrow="Régie"
                    title="Composer un PixieDustContainer"
                    description="Réglez sa largeur, ses gouttières et le cadre d’essai ; le code d’utilisation suit chaque changement."
                />
                <div className="mt-8">
                    <PixieDustContainerPlayground />
                </div>
            </section>

            <section
                aria-labelledby="container-accessibility"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="container-accessibility"
                    eyebrow="Accessibilité"
                    title="Le cadre respecte la structure du document"
                    description="Le centrage et les gouttières n’ajoutent aucun sens. La responsabilité sémantique vient uniquement de l’élément choisi."
                />

                <div className="mt-7 grid gap-px bg-line md:grid-cols-2">
                    {[
                        [
                            "Conteneur neutre",
                            'Employer as="div" lorsque le cadre ne crée aucune région documentaire.',
                        ],
                        [
                            "Section nommée",
                            'Associer as="section" à un titre visible, aria-labelledby ou aria-label.',
                        ],
                        [
                            "Contenu principal unique",
                            'Employer as="main" une seule fois par page et jamais à l’intérieur d’un autre main.',
                        ],
                        [
                            "Ordre intact",
                            "Le Container ne réordonne ni les enfants ni le parcours du clavier.",
                        ],
                        [
                            "Zoom à 200 %",
                            "La largeur reste fluide et les gouttières ne doivent créer aucun défilement horizontal.",
                        ],
                        [
                            "Deux Lumières",
                            "Les repères visuels viennent des contenus ; le composant ne porte aucune couleur.",
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
                aria-labelledby="container-technical"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="container-technical"
                    eyebrow="Générique technique"
                    title="API de l’esquisse"
                    description="Les types spécifiques sont colocalisés dans PixieDustContainer.types.ts et les attributs HTML compatibles sont transmis à l’élément rendu."
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

            <section aria-labelledby="container-journal" className="mt-16">
                <SequenceTitle
                    id="container-journal"
                    eyebrow="Journal de production"
                    title="Décisions avant la promotion"
                    description="L’esquisse devra prouver que ses limites restent prévisibles dans les pages réelles du Codex."
                />

                <ul className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    {[
                        "Éprouver les quatre largeurs sur les pages, index et fiches du Codex.",
                        "Vérifier les gouttières à 200 % de zoom et dans un cadre très compact.",
                        "Comparer narrow aux colonnes de lecture actuellement écrites à la main.",
                        "Tester l’imbrication dans Backdrop, Panel et les futurs composants du Montage.",
                        "Recenser les max-width existants avant toute promotion ou migration.",
                        "Valider que full reste utile sans devenir un raccourci pour les sorties de cadre.",
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
