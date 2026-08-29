import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieField } from "@/components/ui/PixieField";
import {
    PixieDustInput,
    type PixieDustInputAlign,
    type PixieDustInputFont,
    type PixieDustInputShape,
    type PixieDustInputSize,
    type PixieDustInputTone,
    type PixieDustInputType,
    type PixieDustInputVariant,
} from "@/components/ui/PixieDustInput";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieStack } from "@/components/ui/PixieStack";
import { PixieDustInputPlayground } from "./PixieDustInputPlayground";

const variants = [
    {
        value: "outline" as const,
        name: "Contour",
        role: "Le contrôle standard, clairement séparé de sa surface.",
    },
    {
        value: "filled" as const,
        name: "Surface",
        role: "Une saisie posée dans une zone légèrement contrastée.",
    },
    {
        value: "underline" as const,
        name: "Souligné",
        role: "Une saisie discrète intégrée à une composition éditoriale.",
    },
    {
        value: "ghost" as const,
        name: "Fantôme",
        role: "Une présence minimale qui révèle son cadre pendant l’interaction.",
    },
] as const satisfies readonly Readonly<{
    value: PixieDustInputVariant;
    name: string;
    role: string;
}>[];

const sizes = [
    { value: "xs" as const, name: "Très petite", height: "32 px" },
    { value: "sm" as const, name: "Petite", height: "36 px" },
    { value: "md" as const, name: "Moyenne", height: "44 px" },
    { value: "lg" as const, name: "Grande", height: "52 px" },
    { value: "xl" as const, name: "Très grande", height: "60 px" },
] as const satisfies readonly Readonly<{
    value: PixieDustInputSize;
    name: string;
    height: string;
}>[];

const inputTypes = [
    "text",
    "search",
    "email",
    "password",
    "tel",
    "url",
    "number",
    "date",
    "time",
    "datetime-local",
    "month",
    "week",
] as const satisfies readonly PixieDustInputType[];

const shapes = [
    { value: "square" as const, name: "Carrée" },
    { value: "rounded" as const, name: "Arrondie" },
    { value: "pill" as const, name: "Pilule" },
] as const satisfies readonly Readonly<{
    value: PixieDustInputShape;
    name: string;
}>[];

const alignments = [
    { value: "start" as const, name: "Début" },
    { value: "center" as const, name: "Centre" },
    { value: "end" as const, name: "Fin" },
] as const satisfies readonly Readonly<{
    value: PixieDustInputAlign;
    name: string;
}>[];

const fonts = [
    { value: "body" as const, name: "Texte" },
    { value: "mono" as const, name: "Monospace" },
] as const satisfies readonly Readonly<{
    value: PixieDustInputFont;
    name: string;
}>[];

const tones = [
    { value: "neutral" as const, name: "Neutre" },
    { value: "success" as const, name: "Succès" },
    { value: "warning" as const, name: "Avertissement" },
] as const satisfies readonly Readonly<{
    value: PixieDustInputTone;
    name: string;
}>[];

const properties = [
    {
        name: "type",
        type: "PixieDustInputType",
        defaultValue: '"text"',
        description: "Nature de la saisie courte attendue.",
    },
    {
        name: "variant",
        type: "PixieDustInputVariant",
        defaultValue: '"outline"',
        description: "Traitement visuel du contrôle.",
    },
    {
        name: "size",
        type: "PixieDustInputSize",
        defaultValue: '"md"',
        description: "Hauteur et espaces internes du contrôle.",
    },
    {
        name: "shape",
        type: "PixieDustInputShape",
        defaultValue: '"rounded"',
        description: "Forme du cadre, sauf pour la variante underline.",
    },
    {
        name: "align",
        type: "PixieDustInputAlign",
        defaultValue: '"start"',
        description: "Alignement horizontal de la valeur.",
    },
    {
        name: "font",
        type: "PixieDustInputFont",
        defaultValue: '"body"',
        description: "Typographie de lecture ou de donnée structurée.",
    },
    {
        name: "tone",
        type: "PixieDustInputTone",
        defaultValue: '"neutral"',
        description: "État neutre, positif ou à vérifier.",
    },
    {
        name: "color",
        type: "PixieDustInputColor",
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
        description: "Signale une vérification en cours avec aria-busy.",
    },
    {
        name: "startAdornment",
        type: "ReactNode",
        defaultValue: "—",
        description: "Ornement non interactif placé avant la saisie.",
    },
    {
        name: "endAdornment",
        type: "ReactNode",
        defaultValue: "—",
        description: "Ornement non interactif placé après la saisie.",
    },
    {
        name: "startAction",
        type: "ReactNode",
        defaultValue: "—",
        description: "Action accessible placée avant la saisie.",
    },
    {
        name: "endAction",
        type: "ReactNode",
        defaultValue: "—",
        description: "Action accessible placée après la saisie.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au cadre du contrôle.",
    },
    {
        name: "inputClassName",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au véritable input.",
    },
    {
        name: "ref",
        type: "Ref<HTMLInputElement>",
        defaultValue: "—",
        description: "Référence transmise au contrôle natif.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustInputType",
        values: inputTypes.map((value) => `"${value}"`),
        description: "Types natifs adaptés à une saisie courte.",
    },
    {
        name: "PixieDustInputVariant",
        values: variants.map(({ value }) => `"${value}"`),
        description: "Trois présences visuelles dans la composition.",
    },
    {
        name: "PixieDustInputSize",
        values: sizes.map(({ value }) => `"${value}"`),
        description: "Échelle de hauteur des champs.",
    },
    {
        name: "PixieDustInputShape",
        values: shapes.map(({ value }) => `"${value}"`),
        description: "Trois géométries pour le cadre du contrôle.",
    },
    {
        name: "PixieDustInputAlign",
        values: alignments.map(({ value }) => `"${value}"`),
        description: "Position horizontale du texte saisi.",
    },
    {
        name: "PixieDustInputFont",
        values: fonts.map(({ value }) => `"${value}"`),
        description: "Texte courant ou données à chasse fixe.",
    },
    {
        name: "PixieDustInputTone",
        values: tones.map(({ value }) => `"${value}"`),
        description: "Retours non bloquants ; invalid reste prioritaire.",
    },
    {
        name: "PixieDustInputColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Accent du registre ou couleur héritée.",
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

function CodeExample({ children }: Readonly<{ children: string }>) {
    return <AtelierCodeBlock>{children}</AtelierCodeBlock>;
}

function Stage({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="border border-dashed border-line-strong bg-canvas p-5 sm:p-8">
            {children}
        </div>
    );
}

export function PixieDustInputDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-input"
            labelledBy="pixie-dust-input-title"
            nom="PixieDustInput"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Dialogue 002
                        </p>
                        <h2
                            id="pixie-dust-input-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustInput
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Recueillir une saisie courte dans un contrôle natif
                            accordé aux Lumières du Codex.
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
                <section aria-labelledby="input-identity-title">
                    <SequenceTitle
                        id="input-identity-title"
                        eyebrow="Fiche de rôle"
                        title="La ligne où le public prend la parole"
                        description="Input dessine le contrôle et transmet ses attributs natifs. Field reste responsable du libellé, des indications et de l’erreur formulée."
                    />
                    <dl className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            ["Mission", "Recueillir une valeur courte."],
                            [
                                "Partenaire",
                                "PixieField pour nommer et expliquer.",
                            ],
                            [
                                "Matière",
                                "Un input natif, des ornements et des actions composables.",
                            ],
                            [
                                "Limite",
                                "Aucune validation métier ni logique d’action intégrée.",
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

                <section aria-labelledby="input-master-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="input-master-title"
                            eyebrow="Plan maître"
                            title="Field donne la réplique, Input reçoit la réponse"
                            description="Les attributs injectés par Field atteignent directement le contrôle natif contenu dans Input."
                        />
                        <div className="mt-8 grid gap-4 lg:grid-cols-2">
                            <Stage>
                                <PixieField
                                    controlId="input-master"
                                    label="Rechercher dans les archives"
                                    description="Noms, titres, catégories ou collections."
                                >
                                    <PixieDustInput
                                        type="search"
                                        startAdornment="⌕"
                                        endAdornment="⌘ K"
                                        placeholder="Mickey Mouse"
                                    />
                                </PixieField>
                            </Stage>
                            <CodeExample>{`<PixieField
    controlId="archive-search"
    label="Rechercher dans les archives"
    description="Noms, titres, catégories ou collections."
>
    <PixieDustInput
        type="search"
        startAdornment="⌕"
        endAdornment="⌘ K"
    />
</PixieField>`}</CodeExample>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="input-variants-title">
                    <SequenceTitle
                        id="input-variants-title"
                        eyebrow="Variantes"
                        title="Quatre présences dans le décor"
                        description="La variante change l’écrin, jamais le comportement du contrôle natif."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
                                    <PixieDustInput
                                        variant={variant.value}
                                        aria-label={`Exemple ${variant.name}`}
                                        placeholder="Saisir un titre…"
                                    />
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="input-sizes-title">
                    <SequenceTitle
                        id="input-sizes-title"
                        eyebrow="Dimensions"
                        title="Cinq hauteurs de dialogue"
                    />
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
                        {sizes.map((size) => (
                            <Stage key={size.value}>
                                <div className="flex items-baseline justify-between gap-4">
                                    <p className="font-mono text-xs text-accent">
                                        size=&quot;{size.value}&quot;
                                    </p>
                                    <p className="font-mono text-xs text-muted">
                                        {size.height}
                                    </p>
                                </div>
                                <h4 className="mt-3 text-xl text-ink">
                                    {size.name}
                                </h4>
                                <div className="mt-6">
                                    <PixieDustInput
                                        size={size.value}
                                        aria-label={`Taille ${size.name}`}
                                        defaultValue="Steamboat Willie"
                                    />
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="input-shapes-title">
                    <SequenceTitle
                        id="input-shapes-title"
                        eyebrow="Formes"
                        title="Trois silhouettes cadrent la réponse"
                        description="La forme module les variantes dotées d’un cadre ; underline conserve toujours sa ligne droite."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        {shapes.map((shape) => (
                            <Stage key={shape.value}>
                                <p className="font-mono text-xs text-accent">
                                    shape=&quot;{shape.value}&quot;
                                </p>
                                <h4 className="mt-3 text-xl text-ink">
                                    {shape.name}
                                </h4>
                                <div className="mt-6">
                                    <PixieDustInput
                                        shape={shape.value}
                                        aria-label={`Forme ${shape.name}`}
                                        defaultValue="Plane Crazy"
                                    />
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="input-types-title">
                    <SequenceTitle
                        id="input-types-title"
                        eyebrow="Types de saisie"
                        title="Le clavier s’accorde à la réponse attendue"
                        description="Chaque valeur conserve la sémantique et les capacités natives du navigateur."
                    />
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {inputTypes.map((type) => (
                            <Stage key={type}>
                                <p className="font-mono text-xs text-accent">
                                    type=&quot;{type}&quot;
                                </p>
                                <div className="mt-5">
                                    <PixieDustInput
                                        type={type}
                                        aria-label={`Saisie ${type}`}
                                        placeholder={
                                            type === "email"
                                                ? "mickey@example.com"
                                                : type === "number"
                                                  ? "1928"
                                                  : "Saisir une valeur…"
                                        }
                                    />
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="input-composition-title">
                    <SequenceTitle
                        id="input-composition-title"
                        eyebrow="Composition de la valeur"
                        title="Le texte trouve sa chasse et son point d’appui"
                        description="La typographie monospace stabilise les données techniques ; l’alignement aide les nombres et codes courts sans modifier leur valeur."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {alignments.map((alignment) => (
                            <Stage key={alignment.value}>
                                <p className="font-mono text-xs text-accent">
                                    align=&quot;{alignment.value}&quot;
                                </p>
                                <div className="mt-5">
                                    <PixieDustInput
                                        align={alignment.value}
                                        font="mono"
                                        aria-label={`Alignement ${alignment.name}`}
                                        defaultValue="1937"
                                    />
                                </div>
                            </Stage>
                        ))}
                        {fonts.map((font) => (
                            <Stage key={font.value}>
                                <p className="font-mono text-xs text-accent">
                                    font=&quot;{font.value}&quot;
                                </p>
                                <div className="mt-5">
                                    <PixieDustInput
                                        font={font.value}
                                        aria-label={`Typographie ${font.name}`}
                                        defaultValue="SW-1937-12-21"
                                    />
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="input-adornments-title">
                    <SequenceTitle
                        id="input-adornments-title"
                        eyebrow="Ornements et actions"
                        title="Les repères silencieux côtoient les commandes"
                        description="Les ornements restent décoratifs et masqués ; les actions rejoignent le parcours clavier et doivent porter un nom accessible."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        <Stage>
                            <PixieField
                                controlId="input-prefix"
                                label="Recherche"
                            >
                                <PixieDustInput
                                    type="search"
                                    startAdornment="⌕"
                                    placeholder="Titre ou personnage…"
                                    color="bleu-reperage"
                                />
                            </PixieField>
                        </Stage>
                        <Stage>
                            <PixieField
                                controlId="input-suffix"
                                label="Année de sortie"
                                description="Indiquez une année sur quatre chiffres."
                            >
                                <PixieDustInput
                                    type="number"
                                    endAdornment="année"
                                    placeholder="1928"
                                    color="jaune-lampe"
                                />
                            </PixieField>
                        </Stage>
                        <Stage>
                            <PixieField
                                controlId="input-start-action"
                                label="Collection"
                                description="L’action ouvre un sélecteur indépendant."
                            >
                                <PixieDustInput
                                    startAction={
                                        <button
                                            type="button"
                                            aria-label="Choisir une collection"
                                            className="font-mono text-xs"
                                        >
                                            +
                                        </button>
                                    }
                                    placeholder="Toutes les collections"
                                />
                            </PixieField>
                        </Stage>
                        <Stage>
                            <PixieField
                                controlId="input-end-action"
                                label="Mot de passe"
                                description="La visibilité reste pilotée par le parent."
                            >
                                <PixieDustInput
                                    type="password"
                                    defaultValue="faire-un-voeu"
                                    endAction={
                                        <button
                                            type="button"
                                            aria-label="Afficher le mot de passe"
                                            className="font-mono text-xs"
                                        >
                                            œil
                                        </button>
                                    }
                                />
                            </PixieField>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="input-states-title">
                    <SequenceTitle
                        id="input-states-title"
                        eyebrow="États"
                        title="Le contrôle montre ce qu’il sait de la réponse"
                        description="Les tons non bloquants accompagnent le feedback de Field ; l’erreur, l’attente et la disponibilité conservent leurs attributs natifs."
                    />
                    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        <Stage>
                            <PixieField
                                label="Titre original"
                                feedback="La formulation peut être conservée."
                                feedbackTone="success"
                            >
                                <PixieDustInput
                                    defaultValue="The Old Mill"
                                    tone="success"
                                />
                            </PixieField>
                        </Stage>
                        <Stage>
                            <PixieField
                                label="Année de sortie"
                                feedback="Cette date demande une seconde source."
                                feedbackTone="warning"
                            >
                                <PixieDustInput
                                    type="number"
                                    defaultValue="1937"
                                    tone="warning"
                                    font="mono"
                                />
                            </PixieField>
                        </Stage>
                        <Stage>
                            <PixieField
                                label="Titre à rapprocher"
                                description="La recherche reste utilisable pendant la vérification."
                            >
                                <PixieDustInput
                                    type="search"
                                    defaultValue="Mickey"
                                    busy
                                />
                            </PixieField>
                        </Stage>
                        <Stage>
                            <PixieField
                                label="Titre français"
                                error="Aucune archive ne porte ce titre."
                            >
                                <PixieDustInput
                                    defaultValue="Inconnu"
                                    invalid
                                />
                            </PixieField>
                        </Stage>
                        <Stage>
                            <PixieDustInput
                                aria-label="Champ désactivé"
                                defaultValue="Projection interrompue"
                                disabled
                            />
                            <p className="mt-4 text-sm text-ink-soft">
                                Désactivé
                            </p>
                        </Stage>
                        <Stage>
                            <PixieDustInput
                                aria-label="Champ en lecture seule"
                                defaultValue="9 juin 1934"
                                readOnly
                            />
                            <p className="mt-4 text-sm text-ink-soft">
                                Lecture seule
                            </p>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="input-scenarios-title">
                    <SequenceTitle
                        id="input-scenarios-title"
                        eyebrow="Scénarios de plateau"
                        title="Six prises préparent les futurs dialogues du Codex"
                        description="Chaque exemple compose les mêmes primitives sans déplacer la recherche, la validation ou les actions métier dans Input."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        <Stage>
                            <PixieField label="Recherche rapide" labelHidden>
                                <PixieDustInput
                                    type="search"
                                    shape="pill"
                                    startAdornment="⌕"
                                    endAdornment="⌘ K"
                                    placeholder="Rechercher dans le Codex…"
                                />
                            </PixieField>
                        </Stage>
                        <Stage>
                            <PixieField
                                label="Adresse de la source"
                                description="Le protocole reste visible hors de la valeur."
                            >
                                <PixieDustInput
                                    type="url"
                                    startAdornment="https://"
                                    defaultValue="d23.com/a-to-z/"
                                    font="mono"
                                    size="sm"
                                />
                            </PixieField>
                        </Stage>
                        <Stage>
                            <PixieField
                                label="Code d’inventaire"
                                meta="8 caractères"
                            >
                                <PixieDustInput
                                    defaultValue="SW-1937"
                                    align="center"
                                    font="mono"
                                    shape="square"
                                    color="violet-ombre-portee"
                                />
                            </PixieField>
                        </Stage>
                        <Stage>
                            <PixieField label="Première projection">
                                <PixieDustInput
                                    type="date"
                                    defaultValue="1937-12-21"
                                    font="mono"
                                />
                            </PixieField>
                        </Stage>
                        <Stage>
                            <PixieField
                                label="Accès aux archives"
                                description="L’action de révélation appartient au parent."
                            >
                                <PixieDustInput
                                    type="password"
                                    defaultValue="faire-un-voeu"
                                    endAction={
                                        <button
                                            type="button"
                                            aria-label="Afficher le mot de passe"
                                            className="font-mono text-xs"
                                        >
                                            voir
                                        </button>
                                    }
                                />
                            </PixieField>
                        </Stage>
                        <Stage>
                            <PixieField
                                label="Année de sortie"
                                feedback="La valeur correspond à la première de Los Angeles."
                                feedbackTone="success"
                            >
                                <PixieDustInput
                                    type="number"
                                    defaultValue="1937"
                                    endAdornment="année"
                                    align="end"
                                    font="mono"
                                    tone="success"
                                />
                            </PixieField>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="input-playground-title">
                    <SequenceTitle
                        id="input-playground-title"
                        eyebrow="Bac à sable interactif"
                        title="Régler une première ligne de dialogue"
                        description="Le rendu et le code suivent les types, variantes, couleurs et états choisis."
                    />
                    <div className="mt-8">
                        <PixieDustInputPlayground />
                    </div>
                </section>

                <section aria-labelledby="input-accessibility-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="input-accessibility-title"
                            eyebrow="Accessibilité"
                            title="Un vrai contrôle derrière chaque décor"
                        />
                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Toujours le nommer
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Input doit être placé dans Field ou recevoir
                                    un aria-label explicite. Le placeholder ne
                                    constitue jamais son libellé.
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Conserver les états natifs
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Disabled retire le contrôle du dialogue ;
                                    readOnly le laisse consultable et
                                    sélectionnable. L’invalidité ne repose pas
                                    uniquement sur sa couleur.
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Distinguer repère et action
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Les adornments sont décoratifs. Toute action
                                    ajoutée dans un slot dédié reste focusable,
                                    reçoit un nom accessible et conserve sa
                                    logique dans le composant parent.
                                </p>
                            </PixiePanel>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="input-technical-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="input-technical-title"
                            eyebrow="Générique technique"
                            title="API de l’esquisse"
                            description="Les attributs natifs non remplacés sont transmis directement à l’input."
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

                <section aria-labelledby="input-journal-title">
                    <SequenceTitle
                        id="input-journal-title"
                        eyebrow="Journal de production"
                        title="Avant la version prête à projeter"
                    />
                    <PixieStack as="ul" gap="sm" className="mt-8">
                        {[
                            "Éprouver les nouveaux types temporels sur les navigateurs cibles.",
                            "Valider l’ordre de tabulation des actions initiales et finales.",
                            "Contrôler les tons et l’attente avec les annonces de PixieField.",
                            "Tester les cinq tailles, les formes et l’autofill dans les deux Lumières.",
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
