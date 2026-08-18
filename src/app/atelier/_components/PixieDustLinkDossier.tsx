import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieDustLink } from "@/components/ui/PixieDustLink";
import { getAtelierAnimationColorSlugs } from "@/registry/colors";
import { PixieDustLinkPlayground } from "./PixieDustLinkPlayground";

const variants = [
    {
        name: "Dans le texte",
        value: "inline" as const,
        description: "Relie un nom ou une phrase courte à sa destination.",
    },
    {
        name: "Action",
        value: "action" as const,
        description: "Invite explicitement à poursuivre vers une autre page.",
    },
    {
        name: "Surface",
        value: "surface" as const,
        description:
            "Rend une composition complète interactive sans la décorer.",
    },
] as const;

const indicatorExamples = [
    {
        value: "none",
        label: "Aucun",
        description: "Le texte suffit à annoncer la destination.",
    },
    {
        value: "arrow",
        label: "Flèche",
        description: "Poursuivre ou explorer une autre scène.",
    },
    {
        value: "chevron",
        label: "Chevron",
        description: "Ouvrir une fiche depuis une liste compacte.",
    },
    {
        value: "back",
        label: "Retour",
        description: "Revenir à un index ou à la scène précédente.",
    },
    {
        value: "external",
        label: "Externe",
        description: "Quitter le Codex vers une autre source.",
    },
    {
        value: "anchor",
        label: "Ancre",
        description: "Descendre vers une section de la même page.",
    },
] as const;

const properties = [
    {
        name: "href",
        type: 'LinkProps["href"]',
        defaultValue: "—",
        description: "Destination interne transmise au lien Next.js.",
    },
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Libellé ou composition complète rendue dans le lien.",
    },
    {
        name: "variant",
        type: "PixieDustLinkVariant",
        defaultValue: '"inline"',
        description: "Niveau de présentation adapté au contexte de navigation.",
    },
    {
        name: "color",
        type: "PixieDustLinkColor",
        defaultValue: "false",
        description:
            "Teinte du registre de L’Atelier d’animation ou héritage du contexte.",
    },
    {
        name: "indicator",
        type: "PixieDustLinkIndicator",
        defaultValue: '"none"',
        description: "Repère décoratif placé après le contenu du lien.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au lien pour composer son contexte.",
    },
    {
        name: "aria-current",
        type: '"page" | undefined',
        defaultValue: "undefined",
        description: "Signale que la destination correspond à la page active.",
    },
    {
        name: "prefetch",
        type: "boolean | null",
        defaultValue: "null",
        description: "Stratégie de préchargement héritée de Next.js.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustLinkVariant",
        values: ['"inline"', '"action"', '"surface"'],
        description:
            "Trois niveaux de présence pour un même geste de navigation.",
    },
    {
        name: "PixieDustLinkColor",
        values: [
            "false",
            ...getAtelierAnimationColorSlugs().map((slug) => `"${slug}"`),
        ],
        description:
            "Une référence chromatique de L’Atelier d’animation ; false conserve la couleur héritée.",
    },
    {
        name: "PixieDustLinkIndicator",
        values: [
            '"none"',
            '"arrow"',
            '"chevron"',
            '"back"',
            '"external"',
            '"anchor"',
        ],
        description:
            "Six repères directionnels cohérents avec le geste de navigation.",
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
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
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

export function PixieDustLinkDossier() {
    return (
        <AtelierFicheAccessoire
            id="lien"
            labelledBy="lien-title"
            nom="PixieDustLink"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                            Le clap · Accessoire 003
                        </p>
                        <h2
                            id="lien-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustLink
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Conduire vers une autre scène en restant lisible
                            dans un texte, une action ou une surface complète.
                        </p>
                    </div>

                    <dl className="grid min-w-64 grid-cols-2 gap-px bg-line md:grid-cols-1">
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
                                Version
                            </dt>
                            <dd className="mt-1 font-mono text-sm text-ink">
                                0.2.0
                            </dd>
                        </div>
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
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
            <section aria-labelledby="lien-identite" className="mt-14">
                <SequenceTitle
                    id="lien-identite"
                    eyebrow="Fiche de rôle"
                    title="Identité du composant"
                    description="Le lien unifie les gestes de navigation internes sans décider à la place de la carte, du texte ou du composant métier qui l’accueille."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Conduire vers une autre page du Codex."],
                        [
                            "Usage",
                            "Texte éditorial, appel à poursuivre ou surface interactive.",
                        ],
                        [
                            "Limite",
                            "Ne déclenche jamais une action et ne possède pas d’état désactivé.",
                        ],
                        [
                            "Tokens",
                            "Atelier d’animation, encres, lignes, focus et transitions courtes.",
                        ],
                        [
                            "Accessibilité",
                            "Libellé explicite, focus visible et navigation clavier native.",
                        ],
                        [
                            "Dépendances",
                            "React, Next.js et Projection Originale.",
                        ],
                    ].map(([term, definition]) => (
                        <div key={term} className="bg-surface p-5">
                            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
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
                aria-labelledby="lien-plan"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="lien-plan"
                    eyebrow="Plan maître"
                    title="Le lien qui invite à poursuivre"
                    description="La variante action, une couleur enregistrée et la flèche forment l’exemple principal de l’esquisse."
                />

                <div className="mt-7 grid border border-line lg:grid-cols-2">
                    <div className="relative z-[10000] flex min-h-64 items-center justify-center bg-surface p-8">
                        <PixieDustLink
                            href="/personnages"
                            variant="action"
                            color="rouge-crayon"
                            indicator="arrow"
                        >
                            Explorer les personnages
                        </PixieDustLink>
                    </div>
                    <CodeExample>{`<PixieDustLink
    href="/personnages"
    variant="action"
    color="rouge-crayon"
    indicator="arrow"
>
    Explorer les personnages
</PixieDustLink>`}</CodeExample>
                </div>
            </section>

            <section aria-labelledby="lien-variants" className="mt-16">
                <SequenceTitle
                    id="lien-variants"
                    eyebrow="Essais caméra"
                    title="Trois présences, une seule destination"
                    description="La variante décrit le contexte du lien ; elle ne modifie ni sa sémantique ni son comportement de navigation."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
                    {variants.map((variant) => (
                        <article
                            key={variant.value}
                            className="relative z-[10000] bg-surface p-6"
                        >
                            <div className="flex min-h-36 items-center justify-center">
                                {variant.value === "surface" ? (
                                    <PixieDustLink
                                        href="/personnages"
                                        variant="surface"
                                        className="w-full border border-line bg-surface-muted p-5"
                                    >
                                        <span className="text-xs uppercase tracking-[0.16em] text-muted">
                                            Collection
                                        </span>
                                        <span className="mt-3 block text-xl text-ink">
                                            Personnages
                                        </span>
                                    </PixieDustLink>
                                ) : (
                                    <PixieDustLink
                                        href="/personnages"
                                        variant={variant.value}
                                        indicator={
                                            variant.value === "action"
                                                ? "arrow"
                                                : "none"
                                        }
                                    >
                                        Explorer les personnages
                                    </PixieDustLink>
                                )}
                            </div>
                            <h4 className="mt-4 text-xl text-ink">
                                {variant.name}
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-muted">
                                {variant.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="lien-indicators" className="mt-16">
                <SequenceTitle
                    id="lien-indicators"
                    eyebrow="Signalétique"
                    title="Six gestes pour annoncer la destination"
                    description="Chaque indicateur garde un sens stable. Retour précède le libellé ; tous les autres le suivent avec le même espacement."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {indicatorExamples.map((indicator) => (
                        <article
                            key={indicator.value}
                            className="relative z-[10000] bg-surface p-6"
                        >
                            <PixieDustLink
                                href="/personnages"
                                variant="action"
                                indicator={indicator.value}
                            >
                                {indicator.label}
                            </PixieDustLink>
                            <p className="mt-4 text-sm leading-6 text-muted">
                                {indicator.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="lien-colors" className="mt-16">
                <SequenceTitle
                    id="lien-colors"
                    eyebrow="Direction artistique"
                    title="Une teinte enregistrée ou la couleur héritée"
                    description="Toute couleur explicite vient de L’Atelier d’animation. Sans sélection, le lien conserve naturellement la couleur de son contexte."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Rouge crayon
                        </p>
                        <div className="mt-6">
                            <PixieDustLink
                                href="/oeuvres"
                                variant="action"
                                color="rouge-crayon"
                                indicator="arrow"
                            >
                                Explorer les œuvres
                            </PixieDustLink>
                        </div>
                    </article>
                    <article className="relative z-[10000] bg-surface p-6 text-famille-personnages">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Héritée
                        </p>
                        <div className="mt-6">
                            <PixieDustLink
                                href="/personnages"
                                variant="action"
                                indicator="arrow"
                            >
                                Explorer les personnages
                            </PixieDustLink>
                        </div>
                    </article>
                </div>
            </section>

            <section aria-labelledby="lien-etats" className="mt-16">
                <SequenceTitle
                    id="lien-etats"
                    eyebrow="Raccords"
                    title="Les états qui rendent la navigation lisible"
                    description="La page courante, les libellés longs et les surfaces complètes doivent rester compréhensibles sans dépendre uniquement de la couleur."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Page courante
                        </p>
                        <div className="mt-5">
                            <PixieDustLink
                                href="/personnages"
                                aria-current="page"
                                color="rouge-crayon"
                            >
                                Personnages
                            </PixieDustLink>
                        </div>
                    </article>

                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Libellé multiligne
                        </p>
                        <p className="mt-5 max-w-64 leading-7 text-ink-soft">
                            Retrouver cette histoire dans la fiche de{" "}
                            <PixieDustLink href="/personnages/mickey-mouse">
                                Mickey Mouse et ses premières aventures sonores
                            </PixieDustLink>
                            .
                        </p>
                    </article>

                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Surface courante
                        </p>
                        <div className="mt-5">
                            <PixieDustLink
                                href="/oeuvres"
                                variant="surface"
                                aria-current="page"
                                className="border border-line bg-surface-muted p-5"
                            >
                                <span className="text-xs uppercase tracking-[0.16em] text-muted">
                                    Index actif
                                </span>
                                <span className="mt-2 block text-xl">
                                    Œuvres
                                </span>
                            </PixieDustLink>
                        </div>
                    </article>
                </div>
            </section>

            <section aria-labelledby="lien-accessibilite" className="mt-16">
                <SequenceTitle
                    id="lien-accessibilite"
                    eyebrow="Accessibilité"
                    title="Une destination compréhensible avant le mouvement"
                    description="Le texte du lien doit annoncer clairement sa destination. La flèche ne complète jamais un libellé ambigu."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Libellé explicite
                        </p>
                        <p className="mt-4 text-sm leading-6 text-ink-soft">
                            Préférer « Voir la fiche de Mickey Mouse » à un
                            simple « En savoir plus ».
                        </p>
                    </article>
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Focus visible
                        </p>
                        <div className="mt-5">
                            <PixieDustLink
                                href="/personnages/mickey-mouse"
                                data-focus-preview="true"
                            >
                                Mickey Mouse
                            </PixieDustLink>
                        </div>
                    </article>
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Indicateur silencieux
                        </p>
                        <p className="mt-4 text-sm leading-6 text-ink-soft">
                            La flèche est décorative et reste masquée aux
                            technologies d’assistance.
                        </p>
                    </article>
                </div>
            </section>

            <section
                aria-labelledby="lien-regie"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="lien-regie"
                    eyebrow="Régie"
                    title="Régler le lien en direct"
                    description="Le libellé, la destination et les trois axes visuels peuvent être combinés sur un plateau isolé."
                />
                <div className="mt-7">
                    <PixieDustLinkPlayground />
                </div>
            </section>

            <section
                aria-labelledby="lien-generique"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <SequenceTitle
                    id="lien-generique"
                    eyebrow="Générique technique"
                    title="Types et propriétés de l’esquisse"
                />

                <div className="mt-7">
                    <AtelierPropertiesTable properties={properties} />
                </div>

                <div className="mt-10">
                    <h4 className="text-xl text-ink">Types spécifiques</h4>
                    <p className="mt-2 text-sm leading-6 text-muted">
                        Les variantes, couleurs et indicateurs admis par le
                        lien.
                    </p>
                    <div className="mt-4">
                        <AtelierTypesTable types={specificTypes} />
                    </div>
                </div>
            </section>

            <section aria-labelledby="lien-journal" className="mt-16">
                <SequenceTitle
                    id="lien-journal"
                    eyebrow="Journal de production"
                    title="Les conditions du passage à PixieLink"
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Contextes réels
                        </p>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Tester la variante surface sur les quatre portes et
                            la variante inline dans CodexReferenceLink.
                        </p>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Validation
                        </p>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Vérifier les contrastes, le clavier, les libellés et
                            le zoom à 200 % dans chaque contexte.
                        </p>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Promotion
                        </p>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Figer l’API, raccorder les usages réels et renommer
                            le composant en PixieLink 1.0.0.
                        </p>
                    </article>
                </div>
            </section>
        </AtelierFicheAccessoire>
    );
}
