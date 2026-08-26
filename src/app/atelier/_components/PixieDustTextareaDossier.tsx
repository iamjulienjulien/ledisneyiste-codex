import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieDustField } from "@/components/ui/PixieDustField";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieStack } from "@/components/ui/PixieStack";
import {
    PixieDustTextarea,
    type PixieDustTextareaResize,
    type PixieDustTextareaSize,
    type PixieDustTextareaVariant,
} from "@/components/ui/PixieDustTextarea";
import { PixieDustTextareaPlayground } from "./PixieDustTextareaPlayground";

const variants = [
    {
        value: "outline" as const,
        name: "Contour",
        role: "La réponse standard, clairement séparée de son décor.",
    },
    {
        value: "filled" as const,
        name: "Surface",
        role: "Une réponse installée dans une zone légèrement contrastée.",
    },
    {
        value: "underline" as const,
        name: "Souligné",
        role: "Une écriture discrète intégrée à une composition éditoriale.",
    },
] as const satisfies readonly Readonly<{
    value: PixieDustTextareaVariant;
    name: string;
    role: string;
}>[];

const sizes = [
    { value: "sm" as const, name: "Petite", height: "80 px" },
    { value: "md" as const, name: "Moyenne", height: "120 px" },
    { value: "lg" as const, name: "Grande", height: "176 px" },
] as const satisfies readonly Readonly<{
    value: PixieDustTextareaSize;
    name: string;
    height: string;
}>[];

const resizes = [
    {
        value: "none" as const,
        name: "Fixe",
        role: "Le décor décide seul de la hauteur disponible.",
    },
    {
        value: "vertical" as const,
        name: "Vertical",
        role: "Le public peut développer sa réponse sans rompre la largeur.",
    },
    {
        value: "horizontal" as const,
        name: "Horizontal",
        role: "Essai technique susceptible de dépasser le cadre de lecture.",
    },
    {
        value: "both" as const,
        name: "Deux axes",
        role: "Liberté complète, à réserver aux plateaux très permissifs.",
    },
] as const satisfies readonly Readonly<{
    value: PixieDustTextareaResize;
    name: string;
    role: string;
}>[];

const properties = [
    {
        name: "variant",
        type: "PixieDustTextareaVariant",
        defaultValue: '"outline"',
        description: "Traitement visuel de la zone de réponse.",
    },
    {
        name: "size",
        type: "PixieDustTextareaSize",
        defaultValue: '"md"',
        description: "Typographie, espaces et hauteur minimale.",
    },
    {
        name: "color",
        type: "PixieDustTextareaColor",
        defaultValue: "false",
        description: "Couleur du focus, héritée ou issue du registre.",
    },
    {
        name: "invalid",
        type: "boolean",
        defaultValue: "false",
        description: "Active l’état invalide visuel et accessible.",
    },
    {
        name: "resize",
        type: "PixieDustTextareaResize",
        defaultValue: '"vertical"',
        description: "Axes de redimensionnement laissés au public.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au conteneur de la primitive.",
    },
    {
        name: "textareaClassName",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au véritable textarea.",
    },
    {
        name: "ref",
        type: "Ref<HTMLTextAreaElement>",
        defaultValue: "—",
        description: "Référence transmise au contrôle natif.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustTextareaVariant",
        values: variants.map(({ value }) => `"${value}"`),
        description: "Trois présences cohérentes avec PixieDustInput.",
    },
    {
        name: "PixieDustTextareaSize",
        values: sizes.map(({ value }) => `"${value}"`),
        description: "Trois hauteurs minimales pour les réponses développées.",
    },
    {
        name: "PixieDustTextareaResize",
        values: resizes.map(({ value }) => `"${value}"`),
        description: "Axes natifs de redimensionnement.",
    },
    {
        name: "PixieDustTextareaColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Accent du registre ou couleur héritée.",
    },
] as const;

const developedAnswer =
    "Dans cette séquence, le mouvement cesse d’être un simple exercice technique. La musique organise l’action, tandis que chaque geste commence à révéler le caractère du personnage.\n\nLe raccord doit donc conserver à la fois le rythme de la scène et la place qu’elle occupe dans l’évolution du studio.";

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

function CodeExample({ children }: Readonly<{ children: string }>) {
    return (
        <pre className="overflow-x-auto border border-line bg-canvas p-5 font-mono text-sm leading-6 text-ink-soft">
            <code>{children}</code>
        </pre>
    );
}

function Stage({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="min-w-0 overflow-auto border border-dashed border-line-strong bg-canvas p-5 sm:p-8">
            {children}
        </div>
    );
}

export function PixieDustTextareaDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-textarea"
            labelledBy="pixie-dust-textarea-title"
            nom="PixieDustTextarea"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Dialogue 003
                        </p>
                        <h2
                            id="pixie-dust-textarea-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustTextarea
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Recueillir une réponse développée sans perdre le
                            rythme, le contexte ni le confort de lecture.
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
            <div className="space-y-16 p-6 sm:p-8">
                <section aria-labelledby="textarea-identity-title">
                    <SequenceTitle
                        id="textarea-identity-title"
                        eyebrow="Fiche de rôle"
                        title="La réponse a le temps de se développer"
                        description="Textarea prolonge le langage d’Input pour les contenus multiligne. Il reste natif, statique et entièrement compatible avec Field."
                    />
                    <dl className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            ["Mission", "Recueillir une réponse développée."],
                            [
                                "Partenaire",
                                "PixieDustField pour nommer et expliquer.",
                            ],
                            [
                                "Matière",
                                "Un véritable textarea et son redimensionnement natif.",
                            ],
                            [
                                "Limite",
                                "Aucun compteur, auto-grow ou éditeur enrichi.",
                            ],
                        ].map(([term, description]) => (
                            <div key={term} className="bg-surface-muted p-5">
                                <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                    {term}
                                </dt>
                                <dd className="mt-3 text-sm leading-6 text-ink-soft">
                                    {description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section aria-labelledby="textarea-master-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="textarea-master-title"
                            eyebrow="Plan maître"
                            title="Une note éditoriale conserve tout son contexte"
                            description="Field formule la demande et Textarea laisse assez d’espace pour construire la réponse."
                        />
                        <div className="mt-8 grid gap-4 lg:grid-cols-2">
                            <Stage>
                                <PixieDustField
                                    controlId="textarea-master"
                                    label="Note de projection"
                                    description="Décrivez le raccord à conserver dans les archives."
                                >
                                    <PixieDustTextarea
                                        rows={6}
                                        placeholder="Cette séquence marque…"
                                    />
                                </PixieDustField>
                            </Stage>
                            <CodeExample>{`<PixieDustField
    controlId="projection-note"
    label="Note de projection"
    description="Décrivez le raccord à conserver dans les archives."
>
    <PixieDustTextarea
        rows={6}
        placeholder="Cette séquence marque…"
    />
</PixieDustField>`}</CodeExample>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="textarea-variants-title">
                    <SequenceTitle
                        id="textarea-variants-title"
                        eyebrow="Variantes"
                        title="La même grammaire sur une scène plus longue"
                        description="Outline, filled et underline conservent les mêmes intentions que dans PixieDustInput."
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        {variants.map((variant) => (
                            <Stage key={variant.value}>
                                <p className="font-mono text-xs text-accent">
                                    variant=&quot;{variant.value}&quot;
                                </p>
                                <h4 className="mt-3 text-xl text-ink">
                                    {variant.name}
                                </h4>
                                <p className="mt-2 min-h-12 text-sm leading-6 text-ink-soft">
                                    {variant.role}
                                </p>
                                <div className="mt-6">
                                    <PixieDustTextarea
                                        variant={variant.value}
                                        size="sm"
                                        resize="none"
                                        aria-label={`Exemple ${variant.name}`}
                                        placeholder="Développer la réponse…"
                                    />
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="textarea-sizes-title">
                    <SequenceTitle
                        id="textarea-sizes-title"
                        eyebrow="Dimensions"
                        title="Trois durées initiales pour la prise de parole"
                        description="La taille fixe un minimum ; rows peut ensuite demander davantage d’espace."
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        {sizes.map((size) => (
                            <Stage key={size.value}>
                                <div className="flex items-baseline justify-between gap-4">
                                    <p className="font-mono text-xs text-accent">
                                        size=&quot;{size.value}&quot;
                                    </p>
                                    <p className="font-mono text-xs text-muted">
                                        min. {size.height}
                                    </p>
                                </div>
                                <h4 className="mt-3 text-xl text-ink">
                                    {size.name}
                                </h4>
                                <div className="mt-6">
                                    <PixieDustTextarea
                                        size={size.value}
                                        resize="none"
                                        aria-label={`Taille ${size.name}`}
                                        defaultValue="Le mouvement, la musique et le caractère commencent à parler d’une même voix."
                                    />
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="textarea-content-title">
                    <SequenceTitle
                        id="textarea-content-title"
                        eyebrow="Matière"
                        title="Une réponse peut contenir plusieurs mouvements"
                        description="Les paragraphes conservent une hauteur de ligne confortable et la zone défile lorsque sa hauteur ne suffit plus."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <Stage>
                            <PixieDustField
                                controlId="textarea-short"
                                label="Commentaire bref"
                                optional
                            >
                                <PixieDustTextarea
                                    size="sm"
                                    resize="vertical"
                                    defaultValue="Le raccord musical mérite une source complémentaire."
                                />
                            </PixieDustField>
                        </Stage>
                        <Stage>
                            <PixieDustField
                                controlId="textarea-developed"
                                label="Analyse de la séquence"
                                description="Deux paragraphes maximum pour cette première lecture."
                            >
                                <PixieDustTextarea
                                    size="md"
                                    rows={8}
                                    resize="vertical"
                                    defaultValue={developedAnswer}
                                    color="bleu-reperage"
                                />
                            </PixieDustField>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="textarea-resize-title">
                    <SequenceTitle
                        id="textarea-resize-title"
                        eyebrow="Redimensionnement"
                        title="Le public choisit parfois la longueur du plan"
                        description="Vertical reste le réglage recommandé. Les axes horizontaux sont exposés pour éprouver leurs limites dans l’Atelier."
                    />
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {resizes.map((resize) => (
                            <Stage key={resize.value}>
                                <p className="font-mono text-xs text-accent">
                                    resize=&quot;{resize.value}&quot;
                                </p>
                                <h4 className="mt-3 text-lg text-ink">
                                    {resize.name}
                                </h4>
                                <p className="mt-2 min-h-18 text-sm leading-6 text-ink-soft">
                                    {resize.role}
                                </p>
                                <div className="mt-5">
                                    <PixieDustTextarea
                                        resize={resize.value}
                                        size="sm"
                                        aria-label={`Redimensionnement ${resize.name}`}
                                        defaultValue="Essayez la poignée native."
                                    />
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="textarea-states-title">
                    <SequenceTitle
                        id="textarea-states-title"
                        eyebrow="États"
                        title="La réponse reste lisible même lorsqu’elle change d’état"
                    />
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        <Stage>
                            <PixieDustTextarea
                                aria-label="Réponse invalide"
                                defaultValue="Trop vague."
                                invalid
                                resize="none"
                                size="sm"
                            />
                            <p className="mt-4 text-sm text-ink-soft">
                                Invalide
                            </p>
                        </Stage>
                        <Stage>
                            <PixieDustTextarea
                                aria-label="Réponse désactivée"
                                defaultValue="La projection est interrompue."
                                disabled
                                size="sm"
                            />
                            <p className="mt-4 text-sm text-ink-soft">
                                Désactivé
                            </p>
                        </Stage>
                        <Stage>
                            <PixieDustTextarea
                                aria-label="Réponse en lecture seule"
                                defaultValue="Cette note est conservée comme trace de projection."
                                readOnly
                                size="sm"
                            />
                            <p className="mt-4 text-sm text-ink-soft">
                                Lecture seule
                            </p>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="textarea-playground-title">
                    <SequenceTitle
                        id="textarea-playground-title"
                        eyebrow="Bac à sable interactif"
                        title="Donner de l’espace à une réponse"
                        description="Le contenu, la hauteur, le redimensionnement, les états et le code évoluent ensemble."
                    />
                    <div className="mt-8">
                        <PixieDustTextareaPlayground />
                    </div>
                </section>

                <section aria-labelledby="textarea-accessibility-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="textarea-accessibility-title"
                            eyebrow="Accessibilité"
                            title="La longueur ne doit jamais effacer la consigne"
                        />
                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Nom et limites explicites
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Field doit conserver le libellé visible ou
                                    accessible. Une éventuelle limite de
                                    caractères est annoncée dans sa description,
                                    pas seulement par un compteur.
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Liberté de redimensionnement
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Le redimensionnement vertical reste actif
                                    par défaut. Le désactiver demande une
                                    hauteur suffisante et une vraie contrainte
                                    de mise en page.
                                </p>
                            </PixiePanel>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="textarea-technical-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="textarea-technical-title"
                            eyebrow="Générique technique"
                            title="API de l’esquisse"
                            description="Rows, minLength, maxLength, wrap et les autres attributs natifs sont transmis au véritable textarea."
                        />
                        <div className="mt-8">
                            <AtelierPropertiesTable properties={properties} />
                        </div>
                        <div className="mt-6">
                            <AtelierTypesTable types={specificTypes} />
                        </div>
                    </div>
                </section>

                <section aria-labelledby="textarea-journal-title">
                    <SequenceTitle
                        id="textarea-journal-title"
                        eyebrow="Journal de production"
                        title="Avant la version prête à projeter"
                    />
                    <PixieStack as="ul" gap="sm" className="mt-8">
                        {[
                            "Éprouver les poignées natives dans les principaux navigateurs.",
                            "Valider les hauteurs minimales avec rows et les contenus très longs.",
                            "Tester la saisie mobile, la sélection et le défilement interne.",
                            "Décider si un compteur appartient à Field ou à une composition dédiée.",
                        ].map((item) => (
                            <li
                                key={item}
                                className="border-l-2 border-accent bg-surface-muted px-5 py-4 text-sm leading-6 text-ink-soft"
                            >
                                {item}
                            </li>
                        ))}
                    </PixieStack>
                </section>
            </div>
        </AtelierFicheAccessoire>
    );
}
