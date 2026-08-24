import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieDustStack } from "@/components/ui/PixieDustStack";
import {
    PixieDustToast,
    type PixieDustToastSize,
    type PixieDustToastTone,
    type PixieDustToastVariant,
} from "@/components/ui/PixieDustToast";
import { PixieDustToastActionDemo } from "./PixieDustToastActionDemo";
import { PixieDustToastMasterDemo } from "./PixieDustToastMasterDemo";
import { PixieDustToastPlayground } from "./PixieDustToastPlayground";

const tones = [
    { value: "neutral", name: "Neutre", example: "La vue a été actualisée." },
    {
        value: "success",
        name: "Succès",
        example: "La fiche a été enregistrée.",
    },
    {
        value: "info",
        name: "Information",
        example: "Trois relations ont été trouvées.",
    },
    {
        value: "warning",
        name: "Attention",
        example: "Une source reste à vérifier.",
    },
    {
        value: "danger",
        name: "Danger",
        example: "La modification n’a pas été enregistrée.",
    },
] as const satisfies readonly Readonly<{
    value: PixieDustToastTone;
    name: string;
    example: string;
}>[];

const variants = [
    { value: "surface", name: "Surface" },
    { value: "solid", name: "Plein" },
    { value: "outline", name: "Contour" },
] as const satisfies readonly Readonly<{
    value: PixieDustToastVariant;
    name: string;
}>[];

const sizes = [
    { value: "sm", name: "Petite" },
    { value: "md", name: "Moyenne" },
] as const satisfies readonly Readonly<{
    value: PixieDustToastSize;
    name: string;
}>[];

const properties = [
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Message principal annoncé et affiché.",
    },
    {
        name: "title",
        type: "ReactNode",
        defaultValue: "—",
        description: "Titre facultatif de la notification.",
    },
    {
        name: "tone",
        type: "PixieDustToastTone",
        defaultValue: '"neutral"',
        description: "Niveau sémantique et couleur associée.",
    },
    {
        name: "variant",
        type: "PixieDustToastVariant",
        defaultValue: '"surface"',
        description: "Traitement visuel de la surface.",
    },
    {
        name: "size",
        type: "PixieDustToastSize",
        defaultValue: '"md"',
        description: "Densité de la notification.",
    },
    {
        name: "open",
        type: "boolean",
        defaultValue: "—",
        description: "Visibilité en mode contrôlé.",
    },
    {
        name: "defaultOpen",
        type: "boolean",
        defaultValue: "true",
        description: "Visibilité initiale en mode autonome.",
    },
    {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        defaultValue: "—",
        description: "Signale une ouverture ou une fermeture demandée.",
    },
    {
        name: "duration",
        type: "number | false",
        defaultValue: "6000",
        description: "Durée en millisecondes, ou false pour persister.",
    },
    {
        name: "pauseOnInteraction",
        type: "boolean",
        defaultValue: "true",
        description: "Suspend le délai au survol et au focus.",
    },
    {
        name: "dismissible",
        type: "boolean",
        defaultValue: "true",
        description: "Affiche la commande de fermeture.",
    },
    {
        name: "dismissLabel",
        type: "string",
        defaultValue: '"Fermer la notification"',
        description: "Nom accessible de la fermeture.",
    },
    {
        name: "actionLabel",
        type: "string",
        defaultValue: "—",
        description: "Libellé de l’action facultative.",
    },
    {
        name: "onAction",
        type: "() => void",
        defaultValue: "—",
        description: "Réagit à l’action facultative.",
    },
    {
        name: "priority",
        type: "PixieDustToastPriority",
        defaultValue: "automatique",
        description: "Politesse de l’annonce dynamique.",
    },
    {
        name: "icon",
        type: "ReactNode | false",
        defaultValue: "tonalité",
        description: "Icône décorative personnalisée ou masquée.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées à la notification.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustToastTone",
        values: tones.map(({ value }) => `"${value}"`),
        description:
            "Cinq intentions sémantiques reliées au registre chromatique.",
    },
    {
        name: "PixieDustToastVariant",
        values: variants.map(({ value }) => `"${value}"`),
        description: "Trois niveaux de présence visuelle.",
    },
    {
        name: "PixieDustToastSize",
        values: sizes.map(({ value }) => `"${value}"`),
        description: "Deux densités adaptées aux messages courts.",
    },
    {
        name: "PixieDustToastPriority",
        values: ['"polite"', '"assertive"'],
        description: "Deux niveaux d’annonce pour les aides techniques.",
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
    return (
        <pre className="overflow-x-auto border border-line bg-canvas p-5 font-mono text-sm leading-6 text-ink-soft">
            <code>{children}</code>
        </pre>
    );
}

function Stage({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="flex min-h-40 items-center border border-dashed border-line-strong bg-canvas p-5 sm:p-8">
            {children}
        </div>
    );
}

export function PixieDustToastDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-toast"
            labelledBy="pixie-dust-toast-title"
            nom="PixieDustToast"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Effet 001
                        </p>
                        <h2
                            id="pixie-dust-toast-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustToast
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Signaler brièvement le résultat d’une action sans
                            interrompre la projection.
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
                <section aria-labelledby="toast-identity-title">
                    <SequenceTitle
                        id="toast-identity-title"
                        eyebrow="Fiche de rôle"
                        title="Un retour bref, autonome et annoncé"
                        description="Toast représente une notification unitaire. Il gère son propre cycle de présence, mais laisse à une future régie globale l’empilement, le portail et la file d’attente."
                    />
                    <dl className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            [
                                "Mission",
                                "Confirmer une action ou signaler un incident bref.",
                            ],
                            [
                                "Durée",
                                "Six secondes, suspendues pendant l’interaction.",
                            ],
                            [
                                "Annonce",
                                "Polie ou prioritaire selon la tonalité.",
                            ],
                            [
                                "Limite",
                                "Aucun Provider, portail ou empilement global.",
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

                <section aria-labelledby="toast-master-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="toast-master-title"
                            eyebrow="Plan maître"
                            title="Une sauvegarde confirme son passage aux archives"
                            description="Le bouton déclenche une notification contrôlée ; le message disparaît ensuite seul ou sur commande."
                        />
                        <div className="mt-8 grid gap-4 lg:grid-cols-2">
                            <Stage>
                                <PixieDustToastMasterDemo />
                            </Stage>
                            <CodeExample>{`<PixieDustToast
    open={open}
    onOpenChange={setOpen}
    tone="success"
    title="Fiche enregistrée"
>
    Les modifications rejoignent les archives du Codex.
</PixieDustToast>`}</CodeExample>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="toast-tones-title">
                    <SequenceTitle
                        id="toast-tones-title"
                        eyebrow="Tonalités"
                        title="Cinq intentions, cinq repères complémentaires"
                        description="L’icône, le libellé et le rôle d’annonce conservent le sens lorsque la couleur disparaît."
                    />
                    <PixieDustStack gap="sm" className="mt-8">
                        {tones.map((tone) => (
                            <PixieDustToast
                                key={tone.value}
                                tone={tone.value}
                                title={tone.name}
                                duration={false}
                            >
                                {tone.example}
                            </PixieDustToast>
                        ))}
                    </PixieDustStack>
                </section>

                <section aria-labelledby="toast-variants-title">
                    <SequenceTitle
                        id="toast-variants-title"
                        eyebrow="Variantes"
                        title="Trois présences pour une même information"
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        {variants.map((variant) => (
                            <Stage key={variant.value}>
                                <div className="w-full">
                                    <p className="mb-4 font-mono text-xs text-accent">
                                        variant=&quot;{variant.value}&quot;
                                    </p>
                                    <PixieDustToast
                                        variant={variant.value}
                                        tone="info"
                                        title={variant.name}
                                        duration={false}
                                    >
                                        La projection est prête.
                                    </PixieDustToast>
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="toast-sizes-title">
                    <SequenceTitle
                        id="toast-sizes-title"
                        eyebrow="Dimensions"
                        title="Deux densités pour les messages brefs"
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        {sizes.map((size) => (
                            <Stage key={size.value}>
                                <div className="w-full">
                                    <p className="mb-4 font-mono text-xs text-accent">
                                        size=&quot;{size.value}&quot;
                                    </p>
                                    <PixieDustToast
                                        size={size.value}
                                        title={size.name}
                                        duration={false}
                                    >
                                        Le raccord est terminé.
                                    </PixieDustToast>
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="toast-actions-title">
                    <SequenceTitle
                        id="toast-actions-title"
                        eyebrow="Action et durée"
                        title="Le message reste disponible tant qu’il demande une décision"
                        description="Une action importante devrait être accompagnée de duration={false}. La fermeture explicite demeure alors le seul compte à rebours."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <Stage>
                            <PixieDustToastActionDemo />
                        </Stage>
                        <Stage>
                            <PixieDustToast
                                tone="warning"
                                title="Source à relire"
                                duration={false}
                            >
                                Cette notification persiste jusqu’à sa
                                fermeture.
                            </PixieDustToast>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="toast-playground-title">
                    <SequenceTitle
                        id="toast-playground-title"
                        eyebrow="Bac à sable interactif"
                        title="Régler la notification et relancer son passage"
                        description="Le faux viewport permet d’éprouver ouverture, fermeture automatique, pause, action et deux Lumières."
                    />
                    <div className="mt-8">
                        <PixieDustToastPlayground />
                    </div>
                </section>

                <section aria-labelledby="toast-accessibility-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="toast-accessibility-title"
                            eyebrow="Accessibilité"
                            title="Informer sans déplacer le public"
                        />
                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Une annonce proportionnée
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Neutral, success et info utilisent status.
                                    Warning et danger utilisent alert, sauf
                                    priorité explicitement choisie.
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Aucun vol de focus
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    L’apparition ne déplace jamais le focus. Le
                                    délai se suspend au survol et lorsque
                                    l’action ou la fermeture reçoit le clavier.
                                </p>
                            </PixiePanel>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="toast-technical-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="toast-technical-title"
                            eyebrow="Générique technique"
                            title="API de l’esquisse"
                            description="Le composant accepte un cycle contrôlé ou autonome. Les couleurs restent fixées par la sémantique des tonalités."
                        />
                        <div className="mt-8">
                            <AtelierPropertiesTable properties={properties} />
                        </div>
                        <div className="mt-6">
                            <AtelierTypesTable types={specificTypes} />
                        </div>
                    </div>
                </section>

                <section aria-labelledby="toast-journal-title">
                    <SequenceTitle
                        id="toast-journal-title"
                        eyebrow="Journal de production"
                        title="Avant la version prête à projeter"
                    />
                    <PixieDustStack as="ul" gap="sm" className="mt-8">
                        {[
                            "Éprouver les annonces status et alert avec plusieurs lecteurs d’écran.",
                            "Confirmer le calcul du temps restant après survol et navigation clavier.",
                            "Tester les contrastes des trois variantes dans les deux Lumières.",
                            "Concevoir séparément la régie globale, le portail et la file d’attente.",
                        ].map((item) => (
                            <li
                                key={item}
                                className="border-l-2 border-accent bg-surface-muted px-5 py-4 text-sm leading-6 text-ink-soft"
                            >
                                {item}
                            </li>
                        ))}
                    </PixieDustStack>
                </section>
            </div>
        </AtelierFicheAccessoire>
    );
}
