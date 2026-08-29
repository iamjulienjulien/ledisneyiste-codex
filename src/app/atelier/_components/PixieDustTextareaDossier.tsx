import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieField } from "@/components/ui/PixieField";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieStack } from "@/components/ui/PixieStack";
import {
    PixieDustTextarea,
    type PixieDustTextareaEffect,
    type PixieDustTextareaFont,
    type PixieDustTextareaResize,
    type PixieDustTextareaShape,
    type PixieDustTextareaSize,
    type PixieDustTextareaTone,
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
    {
        value: "ghost" as const,
        name: "Fantôme",
        role: "Une présence minimale dans une surface déjà structurée.",
    },
    {
        value: "manuscript" as const,
        name: "Manuscrit",
        role: "Une feuille de scénario dont les lignes accompagnent le récit.",
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

const shapes = [
    "square",
    "rounded",
] as const satisfies readonly PixieDustTextareaShape[];
const fonts = [
    "body",
    "mono",
] as const satisfies readonly PixieDustTextareaFont[];
const tones = [
    "neutral",
    "success",
    "warning",
] as const satisfies readonly PixieDustTextareaTone[];
const effects = [
    "none",
    "ring",
    "glow",
    "dust",
] as const satisfies readonly PixieDustTextareaEffect[];

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
        name: "shape",
        type: "PixieDustTextareaShape",
        defaultValue: '"rounded"',
        description: "Géométrie carrée ou arrondie de la surface.",
    },
    {
        name: "font",
        type: "PixieDustTextareaFont",
        defaultValue: '"body"',
        description: "Typographie éditoriale ou monospace.",
    },
    {
        name: "tone",
        type: "PixieDustTextareaTone",
        defaultValue: '"neutral"',
        description: "Intention neutre, positive ou d’avertissement.",
    },
    {
        name: "effect",
        type: "PixieDustTextareaEffect",
        defaultValue: '"ring"',
        description: "Présence visuelle donnée au focus.",
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
        name: "busy",
        type: "boolean",
        defaultValue: "false",
        description: "Signale une opération sans verrouiller la saisie.",
    },
    {
        name: "resize",
        type: "PixieDustTextareaResize",
        defaultValue: '"vertical"',
        description: "Axes de redimensionnement laissés au public.",
    },
    {
        name: "autoGrow",
        type: "boolean",
        defaultValue: "false",
        description: "Fait suivre la hauteur au contenu saisi.",
    },
    {
        name: "minRows / maxRows",
        type: "number",
        defaultValue: "3 / 12",
        description: "Bornes de la croissance automatique.",
    },
    {
        name: "showCount",
        type: "boolean",
        defaultValue: "false",
        description: "Affiche la longueur courante et la limite native.",
    },
    {
        name: "countLabel",
        type: "(current, maximum?) => ReactNode",
        defaultValue: "—",
        description: "Personnalise le libellé visuel du compteur.",
    },
    {
        name: "startAdornment / endAdornment",
        type: "ReactNode",
        defaultValue: "—",
        description: "Installe des repères décoratifs dans l’en-tête.",
    },
    {
        name: "footerStart / footerEnd",
        type: "ReactNode",
        defaultValue: "—",
        description: "Compose les informations périphériques du pied.",
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
        name: "headerClassName / footerClassName",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées aux deux régies périphériques.",
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
        description:
            "Cinq présences, dont une feuille de scénario propre au composant.",
    },
    {
        name: "PixieDustTextareaSize",
        values: sizes.map(({ value }) => `"${value}"`),
        description: "Trois hauteurs minimales pour les réponses développées.",
    },
    {
        name: "PixieDustTextareaShape",
        values: shapes.map((value) => `"${value}"`),
        description: "Deux géométries adaptées à une surface multiligne.",
    },
    {
        name: "PixieDustTextareaFont",
        values: fonts.map((value) => `"${value}"`),
        description: "Voix éditoriale ou matière technique.",
    },
    {
        name: "PixieDustTextareaTone",
        values: tones.map((value) => `"${value}"`),
        description: "Intentions sémantiques hors état invalide.",
    },
    {
        name: "PixieDustTextareaEffect",
        values: effects.map((value) => `"${value}"`),
        description: "Quatre intensités de présence au focus.",
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

function CodeExample({ children }: Readonly<{ children: string }>) {
    return <AtelierCodeBlock>{children}</AtelierCodeBlock>;
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
            className="scroll-mt-8"
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
            <div className="space-y-16 p-6 sm:p-8">
                <section aria-labelledby="textarea-identity-title">
                    <SequenceTitle
                        id="textarea-identity-title"
                        eyebrow="Fiche de rôle"
                        title="La réponse a le temps de se développer"
                        description="Textarea prolonge le langage d’Input pour les contenus multiligne. Il reste natif, devient adaptatif et conserve sa pleine compatibilité avec Field."
                    />
                    <dl className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            ["Mission", "Recueillir une réponse développée."],
                            [
                                "Partenaire",
                                "PixieField pour nommer et expliquer.",
                            ],
                            [
                                "Matière",
                                "Un véritable textarea, une croissance bornée et une régie périphérique.",
                            ],
                            [
                                "Limite",
                                "Une surface de texte brut, jamais un éditeur enrichi.",
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
                                <PixieField
                                    controlId="textarea-master"
                                    label="Note de projection"
                                    description="Décrivez le raccord à conserver dans les archives."
                                >
                                    <PixieDustTextarea
                                        autoGrow
                                        minRows={4}
                                        maxRows={10}
                                        maxLength={480}
                                        showCount
                                        startAdornment="✦"
                                        endAdornment="Brouillon"
                                        footerStart="Sauvegarde locale"
                                        placeholder="Cette séquence marque…"
                                    />
                                </PixieField>
                            </Stage>
                            <CodeExample>{`<PixieField
    controlId="projection-note"
    label="Note de projection"
    description="Décrivez le raccord à conserver dans les archives."
>
    <PixieDustTextarea
        autoGrow
        minRows={4}
        maxRows={10}
        maxLength={480}
        showCount
        startAdornment="✦"
        endAdornment="Brouillon"
        footerStart="Sauvegarde locale"
        placeholder="Cette séquence marque…"
    />
</PixieField>`}</CodeExample>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="textarea-variants-title">
                    <SequenceTitle
                        id="textarea-variants-title"
                        eyebrow="Variantes"
                        title="La même grammaire sur une scène plus longue"
                        description="Les trois présences partagées avec PixieInput accueillent désormais une surface fantôme et une feuille de scénario."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                                        effect={
                                            variant.value === "manuscript"
                                                ? "dust"
                                                : "ring"
                                        }
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
                            <PixieField
                                controlId="textarea-short"
                                label="Commentaire bref"
                                optional
                            >
                                <PixieDustTextarea
                                    size="sm"
                                    resize="vertical"
                                    defaultValue="Le raccord musical mérite une source complémentaire."
                                />
                            </PixieField>
                        </Stage>
                        <Stage>
                            <PixieField
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
                            </PixieField>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="textarea-growth-title">
                    <SequenceTitle
                        id="textarea-growth-title"
                        eyebrow="Croissance"
                        title="La surface suit la réponse sans envahir la page"
                        description="AutoGrow accompagne le contenu entre deux bornes explicites. Une fois la hauteur maximale atteinte, le défilement interne prend le relais."
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-2">
                        <Stage>
                            <PixieField
                                controlId="textarea-growing"
                                label="Journal de projection"
                                description="La surface grandit de trois à huit lignes."
                            >
                                <PixieDustTextarea
                                    autoGrow
                                    minRows={3}
                                    maxRows={8}
                                    defaultValue="Le premier raccord est posé.\nUne seconde observation rejoint maintenant le journal."
                                    color="bleu-reperage"
                                />
                            </PixieField>
                        </Stage>
                        <Stage>
                            <PixieField
                                controlId="textarea-counted"
                                label="Résumé documentaire"
                                description="240 caractères maximum."
                            >
                                <PixieDustTextarea
                                    maxLength={240}
                                    showCount
                                    resize="none"
                                    footerStart="Limite éditoriale"
                                    defaultValue="Le mouvement, la musique et le caractère commencent à parler d’une même voix."
                                />
                            </PixieField>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="textarea-regie-title">
                    <SequenceTitle
                        id="textarea-regie-title"
                        eyebrow="Régie périphérique"
                        title="Le contexte accompagne la rédaction"
                        description="Ornements, statut, compteur et signal d’attente restent en marge du texte sans interrompre sa lecture."
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        <Stage>
                            <PixieDustTextarea
                                startAdornment="✦"
                                endAdornment="Brouillon"
                                footerStart="Sauvegarde locale"
                                showCount
                                maxLength={320}
                                resize="none"
                                defaultValue="Une note accompagnée de ses repères de production."
                            />
                        </Stage>
                        <Stage>
                            <PixieDustTextarea
                                font="mono"
                                variant="filled"
                                startAdornment="Donnée structurée"
                                footerEnd="JSON"
                                resize="none"
                                defaultValue={
                                    '{\n  "relation": "prépare",\n  "preuve": true\n}'
                                }
                            />
                        </Stage>
                        <Stage>
                            <PixieDustTextarea
                                variant="manuscript"
                                effect="dust"
                                color="violet-ombre-portee"
                                busy
                                endAdornment="Synchronisation"
                                footerStart="La note rejoint la régie"
                                resize="none"
                                defaultValue="La poussière reste contenue autour de la feuille de scénario."
                            />
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
                    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
                                aria-label="Réponse validée"
                                defaultValue="La note peut rejoindre les archives."
                                tone="success"
                                resize="none"
                                size="sm"
                            />
                            <p className="mt-4 text-sm text-ink-soft">Succès</p>
                        </Stage>
                        <Stage>
                            <PixieDustTextarea
                                aria-label="Réponse à vérifier"
                                defaultValue="Une source complémentaire reste à ouvrir."
                                tone="warning"
                                resize="none"
                                size="sm"
                            />
                            <p className="mt-4 text-sm text-ink-soft">
                                Avertissement
                            </p>
                        </Stage>
                        <Stage>
                            <PixieDustTextarea
                                aria-label="Réponse en cours de sauvegarde"
                                defaultValue="La note rejoint la régie."
                                busy
                                endAdornment="Sauvegarde"
                                resize="none"
                                size="sm"
                            />
                            <p className="mt-4 text-sm text-ink-soft">Occupé</p>
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
                        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Compteur silencieux
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    La progression visuelle n’est pas annoncée à
                                    chaque frappe. La limite reste formulée dans
                                    la description de Field et les effets
                                    respectent le mouvement réduit.
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
                            description="La croissance, le compteur et la régie périphérique enrichissent le contrôle sans interrompre la transmission de ses attributs natifs."
                        />
                        <div className="mt-8">
                            <AtelierPropertiesTable properties={properties} />
                        </div>
                        <div className="mt-10">
                            <h4 className="text-2xl text-ink">
                                Types spécifiques
                            </h4>
                            <div className="mt-5">
                                <AtelierTypesTable types={specificTypes} />
                            </div>
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
                            "Valider AutoGrow avec les valeurs contrôlées et non contrôlées.",
                            "Tester les bornes, les contenus très longs et le défilement interne.",
                            "Contrôler la saisie mobile, le zoom à 200 % et le mouvement réduit.",
                            "Éprouver le compteur sans rendre les technologies d’assistance bavardes.",
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
