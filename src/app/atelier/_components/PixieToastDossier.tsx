import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieBackdrop } from "@/components/ui/PixieBackdrop";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieStack } from "@/components/ui/PixieStack";
import {
    PixieToast,
    type PixieToastMotion,
    type PixieToastSize,
    type PixieToastTone,
    type PixieToastVariant,
} from "@/components/ui/PixieToast";
import { PixieToastActionDemo } from "./PixieToastActionDemo";
import { PixieToastLongActionDemo } from "./PixieToastLongActionDemo";
import { PixieToastMasterDemo } from "./PixieToastMasterDemo";
import { PixieToastPlayground } from "./PixieToastPlayground";
import { PixieToastProgressDemo } from "./PixieToastProgressDemo";
import { PixieToastSwipeDemo } from "./PixieToastSwipeDemo";

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
    value: PixieToastTone;
    name: string;
    example: string;
}>[];

const variants = [
    { value: "surface", name: "Surface", description: "Équilibrée" },
    { value: "solid", name: "Plein", description: "Signal fort" },
    { value: "outline", name: "Contour", description: "Présence légère" },
    { value: "glass", name: "Verre", description: "Fond atmosphérique" },
    {
        value: "spotlight",
        name: "Projecteur",
        description: "Halo directionnel",
    },
] as const satisfies readonly Readonly<{
    value: PixieToastVariant;
    name: string;
    description: string;
}>[];

const sizes = [
    { value: "sm", name: "Petite" },
    { value: "md", name: "Moyenne" },
    { value: "lg", name: "Grande" },
] as const satisfies readonly Readonly<{
    value: PixieToastSize;
    name: string;
}>[];

const motions = [
    { value: "slide", name: "Glissement" },
    { value: "fade", name: "Fondu" },
    { value: "pop", name: "Mise au point" },
    { value: "dust", name: "Poussière Pixie" },
    { value: "none", name: "Aucun" },
] as const satisfies readonly Readonly<{
    value: PixieToastMotion;
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
        type: "PixieToastTone",
        defaultValue: '"neutral"',
        description: "Niveau sémantique et couleur associée.",
    },
    {
        name: "variant",
        type: "PixieToastVariant",
        defaultValue: '"surface"',
        description: "Traitement visuel de la surface.",
    },
    {
        name: "size",
        type: "PixieToastSize",
        defaultValue: '"md"',
        description: "Densité de la notification.",
    },
    {
        name: "layout",
        type: "PixieToastLayout",
        defaultValue: '"auto"',
        description: "Disposition responsive ou explicite de l’action.",
    },
    {
        name: "width",
        type: "PixieToastWidth",
        defaultValue: '"md"',
        description: "Largeur maximale de la notification.",
    },
    {
        name: "motion",
        type: "PixieToastMotion",
        defaultValue: '"slide"',
        description: "Mouvement d’entrée et de sortie.",
    },
    {
        name: "progress",
        type: "PixieToastProgress",
        defaultValue: '"none"',
        description: "Repère visuel facultatif du temps restant.",
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
        name: "onDismiss",
        type: "(reason: PixieToastDismissReason) => void",
        defaultValue: "—",
        description: "Expose la raison exacte de la disparition.",
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
        name: "pauseOnPageHidden",
        type: "boolean",
        defaultValue: "true",
        description: "Suspend le délai lorsque la page est masquée.",
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
        name: "closeOnEscape",
        type: "boolean",
        defaultValue: "true",
        description: "Autorise Échap lorsque le Toast contient le focus.",
    },
    {
        name: "swipeDirection",
        type: "PixieToastSwipeDirection",
        defaultValue: "false",
        description: "Active une fermeture gestuelle logique ou verticale.",
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
        name: "closeOnAction",
        type: "boolean",
        defaultValue: "true",
        description: "Referme la notification après son action.",
    },
    {
        name: "priority",
        type: "PixieToastPriority",
        defaultValue: '"auto"',
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
        name: "PixieToastTone",
        values: tones.map(({ value }) => `"${value}"`),
        description:
            "Cinq intentions sémantiques reliées au registre chromatique.",
    },
    {
        name: "PixieToastVariant",
        values: variants.map(({ value }) => `"${value}"`),
        description: "Cinq niveaux de présence visuelle.",
    },
    {
        name: "PixieToastSize",
        values: sizes.map(({ value }) => `"${value}"`),
        description: "Trois densités adaptées aux messages brefs ou longs.",
    },
    {
        name: "PixieToastLayout",
        values: ['"auto"', '"inline"', '"stacked"'],
        description: "Trois compositions possibles pour l’action.",
    },
    {
        name: "PixieToastWidth",
        values: ['"fit"', '"sm"', '"md"', '"lg"', '"full"'],
        description: "Cinq limites de largeur explicites.",
    },
    {
        name: "PixieToastMotion",
        values: motions.map(({ value }) => `"${value}"`),
        description: "Cinq cycles d’entrée et de sortie.",
    },
    {
        name: "PixieToastProgress",
        values: ['"none"', '"rail"', '"bar"'],
        description: "Trois traitements du temps restant.",
    },
    {
        name: "PixieToastPriority",
        values: ['"auto"', '"polite"', '"assertive"'],
        description: "Un calcul sémantique ou deux niveaux explicites.",
    },
    {
        name: "PixieToastSwipeDirection",
        values: ['"start"', '"end"', '"up"', '"down"', "false"],
        description: "Quatre directions de balayage ou aucune.",
    },
    {
        name: "PixieToastDismissReason",
        values: ['"timeout"', '"dismiss"', '"action"', '"escape"', '"swipe"'],
        description: "La cause exacte d’une fermeture demandée.",
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
        <div className="flex min-h-40 items-center border border-dashed border-line-strong bg-canvas p-5 sm:p-8">
            {children}
        </div>
    );
}

export function PixieToastDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-toast"
            labelledBy="pixie-toast-title"
            nom="PixieToast"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Effet 001
                        </p>
                        <h2
                            id="pixie-toast-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieToast
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
                                "Six secondes, suspendues pendant l’interaction ou hors page.",
                            ],
                            [
                                "Annonce",
                                "Polie par défaut, prioritaire pour un danger.",
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
                                <PixieToastMasterDemo />
                            </Stage>
                            <CodeExample>{`<PixieToast
    open={open}
    onOpenChange={setOpen}
                            tone="success"
                            title="Fiche enregistrée"
                            motion="dust"
                            progress="rail"
>
    Les modifications rejoignent les archives du Codex.
</PixieToast>`}</CodeExample>
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
                    <PixieStack gap="sm" className="mt-8">
                        {tones.map((tone) => (
                            <PixieToast
                                key={tone.value}
                                tone={tone.value}
                                title={tone.name}
                                duration={false}
                            >
                                {tone.example}
                            </PixieToast>
                        ))}
                    </PixieStack>
                </section>

                <section aria-labelledby="toast-variants-title">
                    <SequenceTitle
                        id="toast-variants-title"
                        eyebrow="Variantes"
                        title="Cinq présences pour une même information"
                        description="Surface, contour et plein cadrent les usages courants ; verre et projecteur installent une présence plus atmosphérique."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {variants.map((variant) => (
                            <Stage key={variant.value}>
                                <PixieBackdrop
                                    variant={
                                        variant.value === "glass"
                                            ? "projector"
                                            : "wash"
                                    }
                                    color="violet-ombre-portee"
                                    intensity="subtle"
                                    padding="sm"
                                    className="w-full"
                                >
                                    <p className="mb-4 font-mono text-xs text-accent">
                                        variant=&quot;{variant.value}&quot;
                                    </p>
                                    <PixieToast
                                        variant={variant.value}
                                        tone="info"
                                        title={variant.name}
                                        duration={false}
                                    >
                                        {variant.description} pour la
                                        notification.
                                    </PixieToast>
                                </PixieBackdrop>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="toast-sizes-title">
                    <SequenceTitle
                        id="toast-sizes-title"
                        eyebrow="Dimensions"
                        title="Trois densités sans devenir un panneau"
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        {sizes.map((size) => (
                            <Stage key={size.value}>
                                <div className="w-full">
                                    <p className="mb-4 font-mono text-xs text-accent">
                                        size=&quot;{size.value}&quot;
                                    </p>
                                    <PixieToast
                                        size={size.value}
                                        title={size.name}
                                        duration={false}
                                    >
                                        Le raccord est terminé.
                                    </PixieToast>
                                </div>
                            </Stage>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="toast-motions-title">
                    <SequenceTitle
                        id="toast-motions-title"
                        eyebrow="Mouvements"
                        title="Du simple fondu à la poussière Pixie"
                        description="Chaque cycle possède une entrée et une sortie cohérentes. Le mouvement réduit les ramène à un fondu presque immédiat."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {motions.map((motion) => (
                            <Stage key={motion.value}>
                                <div className="w-full">
                                    <p className="mb-4 font-mono text-xs text-accent">
                                        motion=&quot;{motion.value}&quot;
                                    </p>
                                    <PixieToast
                                        tone="success"
                                        variant="spotlight"
                                        motion={motion.value}
                                        title={motion.name}
                                        duration={false}
                                    >
                                        Le raccord rejoint la projection.
                                    </PixieToast>
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
                            <PixieToastActionDemo />
                        </Stage>
                        <Stage>
                            <PixieToast
                                tone="warning"
                                title="Source à relire"
                                duration={false}
                            >
                                Cette notification persiste jusqu’à sa
                                fermeture.
                            </PixieToast>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="toast-scenarios-title">
                    <SequenceTitle
                        id="toast-scenarios-title"
                        eyebrow="Scénarios préparés"
                        title="Éprouver le Toast dans des situations contrastées"
                        description="Les messages longs, les fonds atmosphériques, la progression et le geste mobile restent lisibles sans transformer la notification en surface éditoriale."
                    />
                    <div className="mt-8 grid gap-5 lg:grid-cols-2">
                        <Stage>
                            <PixieToastLongActionDemo />
                        </Stage>
                        <Stage>
                            <PixieBackdrop
                                variant="projector"
                                color="bleu-reperage"
                                intensity="strong"
                                texture="dust"
                                padding="md"
                                className="w-full"
                            >
                                <PixieToast
                                    tone="info"
                                    variant="glass"
                                    motion="dust"
                                    width="full"
                                    title="Projection synchronisée"
                                    duration={false}
                                >
                                    Le verre conserve le décor sans perdre le
                                    contraste du message.
                                </PixieToast>
                            </PixieBackdrop>
                        </Stage>
                        <Stage>
                            <PixieToastProgressDemo />
                        </Stage>
                        <Stage>
                            <PixieToastSwipeDemo />
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="toast-playground-title">
                    <SequenceTitle
                        id="toast-playground-title"
                        eyebrow="Bac à sable interactif"
                        title="Régler la notification et relancer son passage"
                        description="Le faux viewport permet d’éprouver variantes, dimensions, mouvements, progression, motifs de fermeture et deux Lumières."
                    />
                    <div className="mt-8">
                        <PixieToastPlayground />
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
                                    Neutral, success, info et warning utilisent
                                    status. Seul danger devient alert en mode
                                    automatique, sauf priorité explicite.
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
                                    Les commandes restent hors de la région
                                    vivante annoncée.
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
                            title="API du composant"
                            description="Le composant accepte un cycle contrôlé ou autonome, expose chaque motif de fermeture et conserve la couleur sous la responsabilité de la tonalité."
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
