import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixiePanel } from "@/components/ui/PixiePanel";
import {
    PixieDustSearchField,
    type PixieDustSearchFieldLayout,
} from "@/components/ui/PixieDustSearchField";
import { PixieStack } from "@/components/ui/PixieStack";
import type {
    PixieDustInputSize,
    PixieDustInputVariant,
} from "@/components/ui/PixieDustInput";
import { PixieDustSearchFieldPlayground } from "./PixieDustSearchFieldPlayground";

const variants = [
    {
        value: "outline" as const,
        name: "Contour",
        role: "La recherche standard, clairement séparée de sa surface.",
    },
    {
        value: "filled" as const,
        name: "Surface",
        role: "La requête s’installe dans une zone légèrement contrastée.",
    },
    {
        value: "underline" as const,
        name: "Souligné",
        role: "Une recherche discrète intégrée à une composition éditoriale.",
    },
] as const satisfies readonly Readonly<{
    value: PixieDustInputVariant;
    name: string;
    role: string;
}>[];

const sizes = [
    { value: "sm" as const, name: "Petite", inputHeight: "36 px" },
    { value: "md" as const, name: "Moyenne", inputHeight: "44 px" },
    { value: "lg" as const, name: "Grande", inputHeight: "52 px" },
] as const satisfies readonly Readonly<{
    value: PixieDustInputSize;
    name: string;
    inputHeight: string;
}>[];

const layouts = [
    {
        value: "inline" as const,
        name: "En ligne",
        role: "Champ et commandes partagent toujours une seule rangée.",
    },
    {
        value: "stacked" as const,
        name: "Empilée",
        role: "Chaque commande occupe toute la largeur disponible.",
    },
    {
        value: "responsive" as const,
        name: "Responsive",
        role: "La composition passe automatiquement d’une pile à une ligne.",
    },
] as const satisfies readonly Readonly<{
    value: PixieDustSearchFieldLayout;
    name: string;
    role: string;
}>[];

const properties = [
    {
        name: "label",
        type: "ReactNode",
        defaultValue: "—",
        description: "Nom accessible et visible de la recherche.",
    },
    {
        name: "id",
        type: "string",
        defaultValue: "généré",
        description: "Identifiant du champ de recherche natif.",
    },
    {
        name: "name",
        type: "string",
        defaultValue: '"q"',
        description: "Nom du paramètre transmis avec le formulaire.",
    },
    {
        name: "action",
        type: "string",
        defaultValue: "URL courante",
        description: "Destination de la soumission native.",
    },
    {
        name: "method",
        type: "PixieDustSearchFieldMethod",
        defaultValue: '"get"',
        description: "Méthode native du formulaire de recherche.",
    },
    {
        name: "value",
        type: "string",
        defaultValue: "—",
        description: "Requête en mode contrôlé.",
    },
    {
        name: "defaultValue",
        type: "string",
        defaultValue: '""',
        description: "Requête initiale en mode non contrôlé.",
    },
    {
        name: "onChange",
        type: "ChangeEventHandler<HTMLInputElement>",
        defaultValue: "—",
        description: "Réagit à chaque modification de la requête.",
    },
    {
        name: "onSubmit",
        type: "FormEventHandler<HTMLFormElement>",
        defaultValue: "—",
        description: "Intercepte éventuellement la soumission native.",
    },
    {
        name: "onClear",
        type: "() => void",
        defaultValue: "—",
        description: "Réinitialise une valeur contrôlée.",
    },
    {
        name: "placeholder",
        type: "string",
        defaultValue: "—",
        description: "Exemple de requête, jamais substitué au label.",
    },
    {
        name: "description",
        type: "ReactNode",
        defaultValue: "—",
        description: "Indications reliées au champ.",
    },
    {
        name: "error",
        type: "ReactNode",
        defaultValue: "—",
        description: "Message d’erreur relié au champ.",
    },
    {
        name: "variant",
        type: "PixieDustInputVariant",
        defaultValue: '"outline"',
        description: "Traitement visuel du champ de requête.",
    },
    {
        name: "size",
        type: "PixieDustInputSize",
        defaultValue: '"md"',
        description: "Dimensions du champ et des commandes.",
    },
    {
        name: "color",
        type: "PixieDustSearchFieldColor",
        defaultValue: "false",
        description: "Couleur des focus et des commandes.",
    },
    {
        name: "layout",
        type: "PixieDustSearchFieldLayout",
        defaultValue: '"responsive"',
        description: "Disposition du champ et des commandes.",
    },
    {
        name: "submitLabel",
        type: "string",
        defaultValue: '"Rechercher"',
        description: "Libellé visible de la soumission.",
    },
    {
        name: "clearLabel",
        type: "string",
        defaultValue: '"Effacer la recherche"',
        description: "Nom accessible de la commande d’effacement.",
    },
    {
        name: "clearable",
        type: "boolean",
        defaultValue: "true",
        description: "Autorise l’apparition de la commande d’effacement.",
    },
    {
        name: "labelHidden",
        type: "boolean",
        defaultValue: "false",
        description: "Masque visuellement le label sans le retirer.",
    },
    {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Désactive le champ et ses commandes.",
    },
    {
        name: "required",
        type: "boolean",
        defaultValue: "false",
        description: "Rend la requête obligatoire avant soumission.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au conteneur extérieur.",
    },
    {
        name: "formClassName",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au formulaire de recherche.",
    },
    {
        name: "inputClassName",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au véritable input.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustSearchFieldLayout",
        values: layouts.map(({ value }) => `"${value}"`),
        description: "Trois compositions du champ et de ses commandes.",
    },
    {
        name: "PixieDustSearchFieldMethod",
        values: ['"get"', '"post"'],
        description: "Méthodes natives acceptées par le formulaire.",
    },
    {
        name: "PixieDustSearchFieldColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Accent du registre ou couleur héritée.",
    },
    {
        name: "PixieDustInputVariant",
        values: variants.map(({ value }) => `"${value}"`),
        description: "Traitement visuel transmis à PixieDustInput.",
    },
    {
        name: "PixieDustInputSize",
        values: sizes.map(({ value }) => `"${value}"`),
        description: "Échelle commune au champ et aux boutons.",
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

export function PixieDustSearchFieldDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-search-field"
            labelledBy="pixie-dust-search-field-title"
            nom="PixieDustSearchField"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Dialogue 009
                        </p>
                        <h2
                            id="pixie-dust-search-field-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustSearchField
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Composer une recherche complète, de la première
                            saisie jusqu’à sa projection dans l’URL.
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
                <section aria-labelledby="search-field-identity-title">
                    <SequenceTitle
                        id="search-field-identity-title"
                        eyebrow="Fiche de rôle"
                        title="Une requête devient un dialogue complet"
                        description="SearchField assemble Field, Input et Button autour d’un formulaire natif. Il transporte la requête, mais ne cherche, ne filtre et ne suggère rien lui-même."
                    />
                    <dl className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            ["Mission", "Composer et soumettre une recherche."],
                            [
                                "Distribution",
                                "Field, Input et Button dans un form natif.",
                            ],
                            [
                                "Sortie",
                                "Une requête GET partageable comme /recherche?q=mickey.",
                            ],
                            [
                                "Limite",
                                "Aucune suggestion, recherche ou logique de résultats.",
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

                <section aria-labelledby="search-field-master-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="search-field-master-title"
                            eyebrow="Plan maître"
                            title="Mickey rejoint la requête et l’URL"
                            description="Le formulaire GET fonctionne sans moteur client : Entrée ou le bouton ouvrent directement la recherche du Codex."
                        />
                        <div className="mt-8 grid gap-4 lg:grid-cols-2">
                            <Stage>
                                <PixieDustSearchField
                                    label="Rechercher dans le Codex"
                                    name="q"
                                    action="/recherche"
                                    defaultValue="mickey"
                                    placeholder="Personnage, créateur, œuvre…"
                                    description="Noms, titres, catégories ou collections."
                                />
                            </Stage>
                            <CodeExample>{`<PixieDustSearchField
    label="Rechercher dans le Codex"
    name="q"
    action="/recherche"
    defaultValue="mickey"
    placeholder="Personnage, créateur, œuvre…"
    description="Noms, titres, catégories ou collections."
/>`}</CodeExample>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="search-field-variants-title">
                    <SequenceTitle
                        id="search-field-variants-title"
                        eyebrow="Variantes"
                        title="Le champ conserve le langage des premiers Dialogues"
                        description="SearchField transmet outline, filled et underline à PixieDustInput sans modifier les commandes."
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
                                    <PixieDustSearchField
                                        label={`Recherche ${variant.name}`}
                                        labelHidden
                                        action="/recherche"
                                        variant={variant.value}
                                        size="sm"
                                        layout="stacked"
                                        placeholder="Rechercher…"
                                    />
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="search-field-sizes-title">
                    <SequenceTitle
                        id="search-field-sizes-title"
                        eyebrow="Dimensions"
                        title="Trois hauteurs accordent le champ et ses commandes"
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        {sizes.map((size) => (
                            <Stage key={size.value}>
                                <div className="flex items-baseline justify-between gap-4">
                                    <p className="font-mono text-xs text-accent">
                                        size=&quot;{size.value}&quot;
                                    </p>
                                    <p className="font-mono text-xs text-muted">
                                        champ {size.inputHeight}
                                    </p>
                                </div>
                                <h4 className="mt-3 text-xl text-ink">
                                    {size.name}
                                </h4>
                                <div className="mt-6">
                                    <PixieDustSearchField
                                        label={`Recherche ${size.name}`}
                                        labelHidden
                                        action="/recherche"
                                        size={size.value}
                                        layout="stacked"
                                        defaultValue="oswald"
                                    />
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="search-field-layouts-title">
                    <SequenceTitle
                        id="search-field-layouts-title"
                        eyebrow="Composition"
                        title="La régie s’adapte au cadre disponible"
                        description="L’ordre reste toujours champ, effacement, puis soumission ; seule leur distribution visuelle change."
                    />
                    <PixieStack gap="md" className="mt-8">
                        {layouts.map((layout) => (
                            <Stage key={layout.value}>
                                <div className="grid gap-6 lg:grid-cols-[15rem_1fr] lg:items-center">
                                    <div>
                                        <p className="font-mono text-xs text-accent">
                                            layout=&quot;{layout.value}&quot;
                                        </p>
                                        <h4 className="mt-3 text-xl text-ink">
                                            {layout.name}
                                        </h4>
                                        <p className="mt-2 text-sm leading-6 text-ink-soft">
                                            {layout.role}
                                        </p>
                                    </div>
                                    <PixieDustSearchField
                                        label={`Disposition ${layout.name}`}
                                        labelHidden
                                        action="/recherche"
                                        layout={layout.value}
                                        defaultValue="donald"
                                    />
                                </div>
                            </Stage>
                        ))}
                    </PixieStack>
                </section>

                <section aria-labelledby="search-field-states-title">
                    <SequenceTitle
                        id="search-field-states-title"
                        eyebrow="États"
                        title="La recherche montre ce qu’elle attend et ce qu’elle contient"
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <Stage>
                            <PixieDustSearchField
                                label="Recherche vide"
                                action="/recherche"
                                layout="stacked"
                                placeholder="Mickey, Oswald…"
                            />
                        </Stage>
                        <Stage>
                            <PixieDustSearchField
                                label="Recherche renseignée"
                                action="/recherche"
                                layout="stacked"
                                defaultValue="Silly Symphonies"
                                color="bleu-reperage"
                            />
                        </Stage>
                        <Stage>
                            <PixieDustSearchField
                                label="Recherche invalide"
                                action="/recherche"
                                layout="stacked"
                                defaultValue="?"
                                error="Précisez le nom ou le titre recherché."
                            />
                        </Stage>
                        <Stage>
                            <PixieDustSearchField
                                label="Recherche désactivée"
                                action="/recherche"
                                layout="stacked"
                                defaultValue="Projection interrompue"
                                disabled
                            />
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="search-field-progressive-title">
                    <SequenceTitle
                        id="search-field-progressive-title"
                        eyebrow="Soumission native"
                        title="La recherche fonctionne avant toute mise en scène client"
                        description="Action, method et name composent directement l’URL. Le composant ne dépend d’aucun moteur externe pour transmettre la requête."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <PixiePanel variant="outline" padding="md">
                            <h4 className="text-xl text-ink">Entrée</h4>
                            <p className="mt-3 text-sm leading-6 text-ink-soft">
                                Depuis le champ, Entrée soumet le formulaire et
                                conserve le comportement attendu d’une recherche
                                web.
                            </p>
                        </PixiePanel>
                        <PixiePanel variant="outline" padding="md">
                            <h4 className="text-xl text-ink">
                                URL partageable
                            </h4>
                            <p className="mt-3 font-mono text-sm leading-6 text-ink-soft">
                                /recherche?q=mickey
                            </p>
                        </PixiePanel>
                    </div>
                </section>

                <section aria-labelledby="search-field-playground-title">
                    <SequenceTitle
                        id="search-field-playground-title"
                        eyebrow="Bac à sable interactif"
                        title="Composer la recherche avant de lancer la projection"
                        description="La requête, l’effacement, les états, la composition et le code évoluent ensemble."
                    />
                    <div className="mt-8">
                        <PixieDustSearchFieldPlayground />
                    </div>
                </section>

                <section aria-labelledby="search-field-accessibility-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="search-field-accessibility-title"
                            eyebrow="Accessibilité"
                            title="Chaque commande annonce précisément son rôle"
                        />
                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Une région et un champ nommés
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Le formulaire porte role search. Le label
                                    reste visible par défaut et le placeholder
                                    ne sert jamais de nom accessible.
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Deux commandes sans ambiguïté
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Rechercher reste visible. La croix est
                                    annoncée comme « Effacer la recherche »,
                                    remet le focus dans le champ et ne soumet
                                    jamais le formulaire.
                                </p>
                            </PixiePanel>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="search-field-technical-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="search-field-technical-title"
                            eyebrow="Générique technique"
                            title="API de l’esquisse"
                            description="SearchField peut rester non contrôlé pour une soumission native ou devenir contrôlé lorsque son parent orchestre la requête."
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

                <section aria-labelledby="search-field-journal-title">
                    <SequenceTitle
                        id="search-field-journal-title"
                        eyebrow="Journal de production"
                        title="Avant la version prête à projeter"
                    />
                    <PixieStack as="ul" gap="sm" className="mt-8">
                        {[
                            "Éprouver la soumission GET réelle vers /recherche.",
                            "Vérifier l’effacement en modes contrôlé et non contrôlé.",
                            "Tester les trois compositions dans les cadres étroits et larges.",
                            "Contrôler la région search, les labels et l’ordre clavier avec les lecteurs d’écran.",
                            "Confirmer que suggestions et autocomplétion restent réservées au Combobox.",
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
