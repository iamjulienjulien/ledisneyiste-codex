import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieField } from "@/components/ui/PixieField";
import { PixiePanel } from "@/components/ui/PixiePanel";
import {
    PixieSelect,
    type PixieSelectColor,
    type PixieSelectSize,
    type PixieSelectVariant,
} from "@/components/ui/PixieSelect";
import { PixieSelectPlayground } from "./PixieSelectPlayground";

const variants = [
    {
        value: "outline" as const,
        name: "Contour",
        role: "Le choix standard, clairement séparé de sa surface.",
    },
    {
        value: "filled" as const,
        name: "Surface",
        role: "Une liste installée dans une zone légèrement contrastée.",
    },
    {
        value: "underline" as const,
        name: "Souligné",
        role: "Un choix discret intégré à une composition éditoriale.",
    },
] as const satisfies readonly Readonly<{
    value: PixieSelectVariant;
    name: string;
    role: string;
}>[];

const sizes = [
    { value: "sm" as const, name: "Petite", height: "36 px" },
    { value: "md" as const, name: "Moyenne", height: "44 px" },
    { value: "lg" as const, name: "Grande", height: "52 px" },
] as const satisfies readonly Readonly<{
    value: PixieSelectSize;
    name: string;
    height: string;
}>[];

const colorExamples = [
    { color: false, label: "Héritée" },
    { color: "rouge-crayon", label: "Rouge crayon" },
    { color: "bleu-reperage", label: "Bleu repérage" },
] as const satisfies readonly Readonly<{
    color: PixieSelectColor;
    label: string;
}>[];

const properties = [
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Options et groupes d’options natifs de la liste.",
    },
    {
        name: "variant",
        type: "PixieSelectVariant",
        defaultValue: '"outline"',
        description: "Traitement visuel du contrôle.",
    },
    {
        name: "size",
        type: "PixieSelectSize",
        defaultValue: '"md"',
        description: "Hauteur, typographie et espaces internes.",
    },
    {
        name: "color",
        type: "PixieSelectColor",
        defaultValue: "false",
        description: "Couleur du focus, héritée ou issue du registre.",
    },
    {
        name: "mode",
        type: "PixieSelectMode",
        defaultValue: '"native"',
        description:
            "Conserve le menu du navigateur ou projette une listbox Pixie.",
    },
    {
        name: "portal",
        type: "boolean",
        defaultValue: "false",
        description:
            "Déplace le popover dans document.body lorsque mode vaut popover.",
    },
    {
        name: "placeholder",
        type: "string",
        defaultValue: "—",
        description: "Instruction initiale produite comme option vide.",
    },
    {
        name: "invalid",
        type: "boolean",
        defaultValue: "false",
        description: "Active l’état invalide visuel et accessible.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au cadre de la primitive.",
    },
    {
        name: "selectClassName",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au véritable select.",
    },
    {
        name: "ref",
        type: "Ref<HTMLSelectElement>",
        defaultValue: "—",
        description: "Référence transmise au contrôle natif.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieSelectVariant",
        values: variants.map(({ value }) => `"${value}"`),
        description: "Trois présences cohérentes avec Input et Textarea.",
    },
    {
        name: "PixieSelectSize",
        values: sizes.map(({ value }) => `"${value}"`),
        description: "Trois hauteurs communes aux contrôles courts.",
    },
    {
        name: "PixieSelectColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Accent du registre ou couleur héritée.",
    },
    {
        name: "PixieSelectMode",
        values: ['"native"', '"popover"'],
        description: "Deux conduites visuelles pour le même choix unique.",
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

function PeriodOptions() {
    return (
        <>
            <option value="pionniers">Le temps des pionniers</option>
            <option value="chefs-oeuvre">Le temps des chefs-d’œuvre</option>
        </>
    );
}

export function PixieSelectDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-select"
            labelledBy="pixie-select-title"
            nom="PixieSelect"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Dialogue 004
                        </p>
                        <h2
                            id="pixie-select-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieSelect
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Choisir une valeur dans une liste fermée, avec la
                            conduite native ou un popover Pixie maîtrisé.
                        </p>
                    </div>

                    <dl className="grid min-w-64 grid-cols-2 gap-px bg-line md:grid-cols-1">
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Version
                            </dt>
                            <dd className="mt-1 font-mono text-sm text-ink">
                                1.0.0
                            </dd>
                        </div>
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                État
                            </dt>
                            <dd className="mt-1 text-sm font-medium">
                                <AtelierStatut statut="Prêt à projeter" />
                            </dd>
                        </div>
                    </dl>
                </div>
            }
        >
            <div className="space-y-16 p-6 sm:p-8">
                <section aria-labelledby="select-identity-title">
                    <SequenceTitle
                        id="select-identity-title"
                        eyebrow="Fiche de rôle"
                        title="Une liste courte garde la décision lisible"
                        description="Select complète les premiers Dialogues avec un contrôle à choix unique. Le menu natif reste la référence ; le popover Pixie devient une alternative explicite lorsque la mise en scène doit être maîtrisée."
                    />
                    <dl className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            [
                                "Mission",
                                "Choisir une valeur parmi une liste fermée.",
                            ],
                            [
                                "Partenaire",
                                "PixieField pour nommer et expliquer.",
                            ],
                            [
                                "Matière",
                                "Un véritable select, des option, des optgroup et une listbox dérivée.",
                            ],
                            [
                                "Limite",
                                "Aucun filtrage, sélection multiple ou contenu interactif dans une option.",
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

                <section aria-labelledby="select-master-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="select-master-title"
                            eyebrow="Plan maître"
                            title="La période se choisit sans quitter les archives"
                            description="Field formule la décision ; Select ouvre la liste native et restitue la valeur retenue."
                        />
                        <div className="mt-8 grid gap-4 lg:grid-cols-2">
                            <Stage>
                                <PixieField
                                    controlId="select-master"
                                    label="Période des archives"
                                    description="Une seule période peut être retenue."
                                >
                                    <PixieSelect placeholder="Choisir une période">
                                        <PeriodOptions />
                                    </PixieSelect>
                                </PixieField>
                            </Stage>
                            <CodeExample>{`<PixieField
    controlId="archive-period"
    label="Période des archives"
    description="Une seule période peut être retenue."
>
    <PixieSelect placeholder="Choisir une période">
        <option value="pionniers">Le temps des pionniers</option>
        <option value="chefs-oeuvre">Le temps des chefs-d’œuvre</option>
    </PixieSelect>
</PixieField>`}</CodeExample>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="select-modes-title">
                    <SequenceTitle
                        id="select-modes-title"
                        eyebrow="Conduite de l’ouverture"
                        title="Le navigateur ou le popover Pixie"
                        description="Le mode natif reste le choix par défaut. Le mode popover reprend la même valeur et les mêmes options dans une listbox ; portal lui permet de sortir des cadres qui coupent ou empilent les surfaces."
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        <Stage>
                            <p className="font-mono text-xs text-accent">
                                mode=&quot;native&quot;
                            </p>
                            <h4 className="mt-3 text-xl text-ink">
                                Menu natif
                            </h4>
                            <p className="mt-2 min-h-18 text-sm leading-6 text-ink-soft">
                                Le navigateur conserve intégralement l’ouverture
                                et les interactions.
                            </p>
                            <div className="mt-6">
                                <PixieField
                                    controlId="select-mode-native"
                                    label="Période"
                                >
                                    <PixieSelect
                                        defaultValue="pionniers"
                                        mode="native"
                                    >
                                        <PeriodOptions />
                                    </PixieSelect>
                                </PixieField>
                            </div>
                        </Stage>
                        <Stage>
                            <p className="font-mono text-xs text-accent">
                                mode=&quot;popover&quot;
                            </p>
                            <h4 className="mt-3 text-xl text-ink">
                                Popover dans le cadre
                            </h4>
                            <p className="mt-2 min-h-18 text-sm leading-6 text-ink-soft">
                                La listbox reste attachée au contrôle et suit
                                son contexte de composition.
                            </p>
                            <div className="mt-6">
                                <PixieField
                                    controlId="select-mode-popover"
                                    label="Période"
                                >
                                    <PixieSelect
                                        defaultValue="pionniers"
                                        mode="popover"
                                    >
                                        <PeriodOptions />
                                    </PixieSelect>
                                </PixieField>
                            </div>
                        </Stage>
                        <Stage>
                            <p className="font-mono text-xs text-accent">
                                mode=&quot;popover&quot; portal
                            </p>
                            <h4 className="mt-3 text-xl text-ink">
                                Popover hors du cadre
                            </h4>
                            <p className="mt-2 min-h-18 text-sm leading-6 text-ink-soft">
                                Le portail rejoint document.body tout en
                                conservant la lumière et les tokens du contrôle.
                            </p>
                            <div className="mt-6">
                                <PixieField
                                    controlId="select-mode-portal"
                                    label="Période"
                                >
                                    <PixieSelect
                                        defaultValue="pionniers"
                                        mode="popover"
                                        portal
                                    >
                                        <PeriodOptions />
                                    </PixieSelect>
                                </PixieField>
                            </div>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="select-variants-title">
                    <SequenceTitle
                        id="select-variants-title"
                        eyebrow="Variantes"
                        title="Trois décors pour une même décision"
                        description="Le contrôle partage exactement la grammaire d’Input et Textarea."
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
                                    <PixieSelect
                                        variant={variant.value}
                                        size="sm"
                                        aria-label={`Exemple ${variant.name}`}
                                        defaultValue="pionniers"
                                    >
                                        <PeriodOptions />
                                    </PixieSelect>
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="select-sizes-title">
                    <SequenceTitle
                        id="select-sizes-title"
                        eyebrow="Dimensions"
                        title="Trois hauteurs dans le rythme des Dialogues"
                        description="Les dimensions correspondent à celles de PixieInput pour aligner les contrôles sur une même ligne."
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
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
                                    <PixieSelect
                                        size={size.value}
                                        aria-label={`Taille ${size.name}`}
                                        defaultValue="chefs-oeuvre"
                                    >
                                        <PeriodOptions />
                                    </PixieSelect>
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="select-colors-title">
                    <SequenceTitle
                        id="select-colors-title"
                        eyebrow="Couleurs"
                        title="Le focus emprunte la couleur du sujet"
                        description="La couleur ne porte jamais seule le sens : elle accompagne le halo, le contour actif et le chevron."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        {colorExamples.map(({ color, label }) => (
                            <Stage key={label}>
                                <p className="text-sm font-medium text-ink">
                                    {label}
                                </p>
                                <div className="mt-5">
                                    <PixieSelect
                                        color={color}
                                        aria-label={`Couleur ${label}`}
                                        defaultValue="pionniers"
                                    >
                                        <PeriodOptions />
                                    </PixieSelect>
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="select-groups-title">
                    <SequenceTitle
                        id="select-groups-title"
                        eyebrow="Organisation"
                        title="Les options peuvent rejoindre leurs séquences"
                        description="Optgroup structure une liste plus longue sans transformer le contrôle en navigateur complexe."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <Stage>
                            <PixieField controlId="select-flat" label="Époque">
                                <PixieSelect defaultValue="pionniers">
                                    <PeriodOptions />
                                </PixieSelect>
                            </PixieField>
                        </Stage>
                        <Stage>
                            <PixieField
                                controlId="select-grouped"
                                label="Série ou collection"
                            >
                                <PixieSelect placeholder="Choisir une collection">
                                    <optgroup label="Premières fondations">
                                        <option value="alice-comedies">
                                            Alice Comedies
                                        </option>
                                        <option value="oswald">Oswald</option>
                                    </optgroup>
                                    <optgroup label="Le dessin trouve son langage">
                                        <option value="mickey-mouse">
                                            Mickey Mouse
                                        </option>
                                        <option value="silly-symphonies">
                                            Silly Symphonies
                                        </option>
                                    </optgroup>
                                </PixieSelect>
                            </PixieField>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="select-states-title">
                    <SequenceTitle
                        id="select-states-title"
                        eyebrow="États"
                        title="La décision reste explicite dans chaque état"
                    />
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        <Stage>
                            <PixieSelect
                                aria-label="Choix requis"
                                placeholder="Choisir une période"
                                required
                            >
                                <PeriodOptions />
                            </PixieSelect>
                            <p className="mt-4 text-sm text-ink-soft">Requis</p>
                        </Stage>
                        <Stage>
                            <PixieSelect
                                aria-label="Choix invalide"
                                placeholder="Choisir une période"
                                invalid
                            >
                                <PeriodOptions />
                            </PixieSelect>
                            <p className="mt-4 text-sm text-ink-soft">
                                Invalide
                            </p>
                        </Stage>
                        <Stage>
                            <PixieSelect
                                aria-label="Choix désactivé"
                                defaultValue="pionniers"
                                disabled
                            >
                                <PeriodOptions />
                            </PixieSelect>
                            <p className="mt-4 text-sm text-ink-soft">
                                Désactivé
                            </p>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="select-playground-title">
                    <SequenceTitle
                        id="select-playground-title"
                        eyebrow="Bac à sable interactif"
                        title="Régler la liste avant d’ouvrir le dialogue"
                        description="Le mode d’ouverture, le portail, la variante, la taille, la couleur, les groupes, les états et le code évoluent ensemble."
                    />
                    <div className="mt-8">
                        <PixieSelectPlayground />
                    </div>
                </section>

                <section aria-labelledby="select-accessibility-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="select-accessibility-title"
                            eyebrow="Accessibilité"
                            title="Deux ouvertures, un même choix accessible"
                        />
                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Un nom, pas seulement une instruction
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Placeholder introduit la décision, mais ne
                                    remplace jamais le label de Field. L’erreur
                                    doit également rester formulée en texte.
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Interactions natives préservées
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Le clavier, les lecteurs d’écran et les
                                    sélecteurs tactiles utilisent le contrôle
                                    natif. Le chevron Pixie est purement
                                    décoratif.
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Le popover reprend le contrat du select
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Le déclencheur suit le modèle combobox :
                                    flèches, début, fin, Entrée, Espace, Échap
                                    et recherche par frappe. Le focus reste sur
                                    le contrôle pendant l’exploration.
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Le portail ne rompt pas la Projection
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    La liste déplacée conserve ses relations
                                    ARIA, sa position et les variables visuelles
                                    héritées du cadre d’origine.
                                </p>
                            </PixiePanel>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="select-technical-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="select-technical-title"
                            eyebrow="Générique technique"
                            title="API du composant"
                            description="Value, defaultValue, onChange, name, required et les attributs de formulaire restent raccordés au véritable select dans les deux modes."
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
            </div>
        </AtelierFicheAccessoire>
    );
}
