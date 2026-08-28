import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieDustField } from "@/components/ui/PixieDustField";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieStack } from "@/components/ui/PixieStack";
import {
    PixieDustSwitch,
    type PixieDustSwitchColor,
    type PixieDustSwitchSize,
    type PixieDustSwitchVariant,
} from "@/components/ui/PixieDustSwitch";
import { PixieDustSwitchPlayground } from "./PixieDustSwitchPlayground";

const variants = [
    {
        value: "solid" as const,
        name: "Plein",
        role: "La piste porte pleinement la couleur lorsque la préférence est active.",
    },
    {
        value: "soft" as const,
        name: "Léger",
        role: "Une teinte discrète accompagne un bouton plus affirmé.",
    },
    {
        value: "outline" as const,
        name: "Contour",
        role: "Le mouvement reste visible dans une présence minimale.",
    },
] as const satisfies readonly Readonly<{
    value: PixieDustSwitchVariant;
    name: string;
    role: string;
}>[];

const sizes = [
    { value: "sm" as const, name: "Petite", dimensions: "36 × 20 px" },
    { value: "md" as const, name: "Moyenne", dimensions: "44 × 24 px" },
    { value: "lg" as const, name: "Grande", dimensions: "52 × 28 px" },
] as const satisfies readonly Readonly<{
    value: PixieDustSwitchSize;
    name: string;
    dimensions: string;
}>[];

const colorExamples = [
    { color: false, label: "Héritée" },
    { color: "ambre-projecteur", label: "Ambre projecteur" },
    { color: "vert-cellulo", label: "Vert cellulo" },
] as const satisfies readonly Readonly<{
    color: PixieDustSwitchColor;
    label: string;
}>[];

const properties = [
    {
        name: "variant",
        type: "PixieDustSwitchVariant",
        defaultValue: '"solid"',
        description: "Traitement visuel de la piste active.",
    },
    {
        name: "size",
        type: "PixieDustSwitchSize",
        defaultValue: '"md"',
        description: "Dimensions de la piste et de son bouton.",
    },
    {
        name: "color",
        type: "PixieDustSwitchColor",
        defaultValue: "false",
        description: "Couleur active, héritée ou issue du registre.",
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
        name: "PixieDustSwitchVariant",
        values: variants.map(({ value }) => `"${value}"`),
        description: "Trois traitements de la piste active.",
    },
    {
        name: "PixieDustSwitchSize",
        values: sizes.map(({ value }) => `"${value}"`),
        description: "Trois dimensions de contrôle et de zone interactive.",
    },
    {
        name: "PixieDustSwitchColor",
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
    return <AtelierCodeBlock>{children}</AtelierCodeBlock>;
}

function Stage({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="border border-dashed border-line-strong bg-canvas p-5 sm:p-8">
            {children}
        </div>
    );
}

export function PixieDustSwitchDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-switch"
            labelledBy="pixie-dust-switch-title"
            nom="PixieDustSwitch"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Dialogue 007
                        </p>
                        <h2
                            id="pixie-dust-switch-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustSwitch
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Activer ou désactiver une préférence et rendre son
                            nouvel état immédiatement visible.
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
                <section aria-labelledby="switch-identity-title">
                    <SequenceTitle
                        id="switch-identity-title"
                        eyebrow="Fiche de rôle"
                        title="La préférence change dès que le bouton traverse la piste"
                        description="Switch représente une valeur binaire appliquée immédiatement. Il ne remplace ni la Checkbox d’un formulaire ni le choix exclusif d’un RadioGroup."
                    />
                    <dl className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            [
                                "Mission",
                                "Activer ou désactiver une préférence.",
                            ],
                            [
                                "Partenaire",
                                "PixieDustField pour nommer et expliquer.",
                            ],
                            [
                                "Matière",
                                "Un input checkbox annoncé comme switch.",
                            ],
                            [
                                "Limite",
                                "Aucun état intermédiaire, chargement ou confirmation.",
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

                <section aria-labelledby="switch-master-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="switch-master-title"
                            eyebrow="Plan maître"
                            title="Le grain rejoint ou quitte la projection"
                            description="Field décrit la préférence ; Switch expose son état et le modifie immédiatement."
                        />
                        <div className="mt-8 grid gap-4 lg:grid-cols-2">
                            <Stage>
                                <PixieDustField
                                    controlId="switch-master"
                                    label="Grain de projection"
                                    description="Ajoute une texture légère à l’image."
                                >
                                    <PixieDustSwitch
                                        color="ambre-projecteur"
                                        defaultChecked
                                    />
                                </PixieDustField>
                            </Stage>
                            <CodeExample>{`<PixieDustField
    controlId="projection-grain"
    label="Grain de projection"
    description="Ajoute une texture légère à l’image."
>
    <PixieDustSwitch
        color="ambre-projecteur"
        checked={grainEnabled}
        onChange={(event) => setGrainEnabled(event.target.checked)}
    />
</PixieDustField>`}</CodeExample>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="switch-variants-title">
                    <SequenceTitle
                        id="switch-variants-title"
                        eyebrow="Variantes"
                        title="Trois traitements pour rendre l’état actif visible"
                        description="La position du bouton reste identique ; seule la présence de la piste change."
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
                                <div className="mt-6 flex items-center gap-6">
                                    <PixieDustSwitch
                                        variant={variant.value}
                                        aria-label={`${variant.name}, inactive`}
                                    />
                                    <PixieDustSwitch
                                        variant={variant.value}
                                        aria-label={`${variant.name}, active`}
                                        defaultChecked
                                    />
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="switch-sizes-title">
                    <SequenceTitle
                        id="switch-sizes-title"
                        eyebrow="Dimensions"
                        title="Trois amplitudes pour le même mouvement"
                        description="La zone interactive couvre toujours toute la piste, tandis que Field étend la cible au libellé."
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        {sizes.map((size) => (
                            <Stage key={size.value}>
                                <div className="flex items-baseline justify-between gap-4">
                                    <p className="font-mono text-xs text-accent">
                                        size=&quot;{size.value}&quot;
                                    </p>
                                    <p className="font-mono text-xs text-muted">
                                        {size.dimensions}
                                    </p>
                                </div>
                                <h4 className="mt-3 text-xl text-ink">
                                    {size.name}
                                </h4>
                                <div className="mt-6">
                                    <PixieDustSwitch
                                        size={size.value}
                                        aria-label={`Taille ${size.name}`}
                                        defaultChecked
                                    />
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="switch-colors-title">
                    <SequenceTitle
                        id="switch-colors-title"
                        eyebrow="Couleurs"
                        title="La préférence emprunte la lumière de son contexte"
                        description="La position du bouton demeure le premier indice ; la couleur renforce l’état actif et son halo de focus."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        {colorExamples.map(({ color, label }) => (
                            <Stage key={label}>
                                <p className="text-sm font-medium text-ink">
                                    {label}
                                </p>
                                <div className="mt-5">
                                    <PixieDustSwitch
                                        color={color}
                                        aria-label={`Couleur ${label}`}
                                        defaultChecked
                                    />
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="switch-states-title">
                    <SequenceTitle
                        id="switch-states-title"
                        eyebrow="États"
                        title="L’interrupteur raconte toujours sa situation"
                    />
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Stage>
                            <PixieDustSwitch aria-label="Préférence inactive" />
                            <p className="mt-4 text-sm text-ink-soft">
                                Inactif
                            </p>
                        </Stage>
                        <Stage>
                            <PixieDustSwitch
                                aria-label="Préférence active"
                                defaultChecked
                            />
                            <p className="mt-4 text-sm text-ink-soft">Actif</p>
                        </Stage>
                        <Stage>
                            <PixieDustSwitch
                                aria-label="Préférence invalide"
                                invalid
                            />
                            <p className="mt-4 text-sm text-ink-soft">
                                Invalide
                            </p>
                        </Stage>
                        <Stage>
                            <PixieDustSwitch
                                aria-label="Préférence désactivée"
                                defaultChecked
                                disabled
                            />
                            <p className="mt-4 text-sm text-ink-soft">
                                Désactivé
                            </p>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="switch-preferences-title">
                    <SequenceTitle
                        id="switch-preferences-title"
                        eyebrow="Séquence de préférences"
                        title="Plusieurs réglages partagent une même régie"
                        description="Chaque switch conserve son propre libellé et son propre état. Le groupe reste une composition, pas une nouvelle primitive."
                    />
                    <Stage>
                        <div className="grid gap-px bg-line md:grid-cols-3">
                            {[
                                {
                                    id: "switch-motion",
                                    label: "Mouvement réduit",
                                    description:
                                        "Apaise les effets de transition.",
                                    color: "bleu-reperage" as const,
                                    checked: false,
                                },
                                {
                                    id: "switch-grain",
                                    label: "Grain de projection",
                                    description:
                                        "Texture légèrement la pellicule.",
                                    color: "ambre-projecteur" as const,
                                    checked: true,
                                },
                                {
                                    id: "switch-contrast",
                                    label: "Contraste renforcé",
                                    description:
                                        "Affermit les limites de la scène.",
                                    color: "vert-cellulo" as const,
                                    checked: false,
                                },
                            ].map((preference) => (
                                <div
                                    key={preference.id}
                                    className="bg-surface-muted p-5"
                                >
                                    <PixieDustField
                                        controlId={preference.id}
                                        label={preference.label}
                                        description={preference.description}
                                        spacing="sm"
                                    >
                                        <PixieDustSwitch
                                            color={preference.color}
                                            defaultChecked={preference.checked}
                                        />
                                    </PixieDustField>
                                </div>
                            ))}
                        </div>
                    </Stage>
                </section>

                <section aria-labelledby="switch-choice-title">
                    <SequenceTitle
                        id="switch-choice-title"
                        eyebrow="Choisir le bon dialogue"
                        title="Switch applique, Checkbox prépare une réponse"
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <PixiePanel variant="outline" padding="md">
                            <h4 className="text-xl text-ink">Switch</h4>
                            <p className="mt-3 text-sm leading-6 text-ink-soft">
                                Le changement prend effet dès l’activation :
                                lumière, son, contraste ou préférence
                                d’affichage.
                            </p>
                        </PixiePanel>
                        <PixiePanel variant="outline" padding="md">
                            <h4 className="text-xl text-ink">Checkbox</h4>
                            <p className="mt-3 text-sm leading-6 text-ink-soft">
                                Le choix rejoint généralement un ensemble de
                                réponses qui sera validé ou envoyé plus tard.
                            </p>
                        </PixiePanel>
                    </div>
                </section>

                <section aria-labelledby="switch-playground-title">
                    <SequenceTitle
                        id="switch-playground-title"
                        eyebrow="Bac à sable interactif"
                        title="Régler une préférence avant la projection"
                        description="La variante, la taille, la couleur, l’état et le code évoluent ensemble."
                    />
                    <div className="mt-8">
                        <PixieDustSwitchPlayground />
                    </div>
                </section>

                <section aria-labelledby="switch-accessibility-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="switch-accessibility-title"
                            eyebrow="Accessibilité"
                            title="L’état se lit, s’entend et se commande"
                        />
                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Une préférence précisément nommée
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Field fournit un libellé comme « Grain de
                                    projection ». Le texte décrit la préférence,
                                    sans répéter « activer » ou « désactiver ».
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Un comportement réellement natif
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Le rôle switch annonce l’état. Espace le
                                    modifie, le halo apparaît au clavier, et la
                                    position du bouton complète la couleur.
                                </p>
                            </PixiePanel>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="switch-technical-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="switch-technical-title"
                            eyebrow="Générique technique"
                            title="API de l’esquisse"
                            description="Checked, defaultChecked, onChange, disabled, required, name, value et les attributs ARIA sont transmis à l’input natif."
                        />
                        <div className="mt-8">
                            <AtelierPropertiesTable properties={properties} />
                        </div>
                        <div className="mt-6">
                            <AtelierTypesTable types={specificTypes} />
                        </div>
                    </div>
                </section>

                <section aria-labelledby="switch-journal-title">
                    <SequenceTitle
                        id="switch-journal-title"
                        eyebrow="Journal de production"
                        title="Avant la version prête à projeter"
                    />
                    <PixieStack as="ul" gap="sm" className="mt-8">
                        {[
                            "Éprouver le mouvement et le contraste dans les deux Lumières.",
                            "Vérifier la cible tactile et les trois dimensions sur mobile.",
                            "Tester l’annonce du rôle et de l’état avec les lecteurs d’écran.",
                            "Confirmer la frontière d’usage avec Checkbox et les actions différées.",
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
