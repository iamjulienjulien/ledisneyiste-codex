"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { PixieButton } from "@/components/ui/PixieButton";
import { PixieSelect } from "@/components/ui/PixieSelect";
import {
    PixieDustToast,
    type PixieDustToastDismissReason,
    type PixieDustToastLayout,
    type PixieDustToastMotion,
    type PixieDustToastPriority,
    type PixieDustToastProgress,
    type PixieDustToastSize,
    type PixieDustToastSwipeDirection,
    type PixieDustToastTone,
    type PixieDustToastVariant,
    type PixieDustToastWidth,
} from "@/components/ui/PixieDustToast";

const tones = [
    { value: "neutral", label: "Neutre" },
    { value: "success", label: "Succès" },
    { value: "info", label: "Information" },
    { value: "warning", label: "Attention" },
    { value: "danger", label: "Danger" },
] as const satisfies readonly Readonly<{
    value: PixieDustToastTone;
    label: string;
}>[];

const sizes = [
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
] as const satisfies readonly Readonly<{
    value: PixieDustToastSize;
    label: string;
}>[];

const variants = [
    ["surface", "Surface"],
    ["solid", "Plein"],
    ["outline", "Contour"],
    ["glass", "Verre"],
    ["spotlight", "Projecteur"],
] as const satisfies readonly (readonly [PixieDustToastVariant, string])[];

const motions = [
    ["slide", "Glissement"],
    ["fade", "Fondu"],
    ["pop", "Mise au point"],
    ["dust", "Poussière Pixie"],
    ["none", "Aucun"],
] as const satisfies readonly (readonly [PixieDustToastMotion, string])[];

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-xl",
    large: "max-w-none",
} as const;

const dismissLabels = {
    timeout: "Fermeture automatique",
    dismiss: "Commande de fermeture",
    action: "Action exécutée",
    escape: "Touche Échap",
    swipe: "Balayage",
} as const satisfies Record<PixieDustToastDismissReason, string>;

export function PixieDustToastPlayground() {
    const [tone, setTone] = useState<PixieDustToastTone>("success");
    const [variant, setVariant] = useState<PixieDustToastVariant>("surface");
    const [size, setSize] = useState<PixieDustToastSize>("md");
    const [layout, setLayout] = useState<PixieDustToastLayout>("auto");
    const [width, setWidth] = useState<PixieDustToastWidth>("md");
    const [motion, setMotion] = useState<PixieDustToastMotion>("dust");
    const [progress, setProgress] = useState<PixieDustToastProgress>("rail");
    const [priority, setPriority] = useState<PixieDustToastPriority>("auto");
    const [swipeDirection, setSwipeDirection] =
        useState<PixieDustToastSwipeDirection>(false);
    const [duration, setDuration] = useState<number | false>(6000);
    const [dismissible, setDismissible] = useState(true);
    const [pauseOnInteraction, setPauseOnInteraction] = useState(true);
    const [pauseOnPageHidden, setPauseOnPageHidden] = useState(true);
    const [closeOnEscape, setCloseOnEscape] = useState(true);
    const [closeOnAction, setCloseOnAction] = useState(true);
    const [withTitle, setWithTitle] = useState(true);
    const [withAction, setWithAction] = useState(false);
    const [open, setOpen] = useState(true);
    const [lastDismiss, setLastDismiss] =
        useState<PixieDustToastDismissReason | null>(null);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const code = `<PixieDustToast
    tone="${tone}"
    variant="${variant}"
    size="${size}"
    layout="${layout}"
    width="${width}"
    motion="${motion}"
    progress="${progress}"${withTitle ? '\n    title="Fiche enregistrée"' : ""}${priority === "auto" ? "" : `\n    priority="${priority}"`}${duration === false ? "\n    duration={false}" : `\n    duration={${duration}}`}${pauseOnInteraction ? "" : "\n    pauseOnInteraction={false}"}${pauseOnPageHidden ? "" : "\n    pauseOnPageHidden={false}"}${dismissible ? "" : "\n    dismissible={false}"}${closeOnEscape ? "" : "\n    closeOnEscape={false}"}${swipeDirection === false ? "" : `\n    swipeDirection="${swipeDirection}"`}${withAction ? '\n    actionLabel="Annuler"\n    onAction={handleUndo}' : ""}${withAction && !closeOnAction ? "\n    closeOnAction={false}" : ""}
>
    Les modifications rejoignent les archives du Codex.
</PixieDustToast>`;

    function relaunchToast() {
        setLastDismiss(null);
        setOpen(false);
        window.requestAnimationFrame(() => setOpen(true));
    }

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>
                    <div className="atelier-playground-controls mt-6 space-y-7">
                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Tonalité
                            </legend>
                            <div className="mt-3 space-y-2">
                                {tones.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="toast-tone"
                                        {...option}
                                        selectedValue={tone}
                                        onChange={setTone}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Taille
                            </legend>
                            <div className="mt-3 space-y-2">
                                {sizes.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="toast-size"
                                        {...option}
                                        selectedValue={size}
                                        onChange={setSize}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <SelectControl
                            id="toast-variant"
                            label="Variante"
                            value={variant}
                            options={variants}
                            onChange={(value) =>
                                setVariant(value as PixieDustToastVariant)
                            }
                        />
                        <SelectControl
                            id="toast-motion"
                            label="Mouvement"
                            value={motion}
                            options={motions}
                            onChange={(value) =>
                                setMotion(value as PixieDustToastMotion)
                            }
                        />

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                            <SelectControl
                                id="toast-layout"
                                label="Disposition"
                                value={layout}
                                options={[
                                    ["auto", "Responsive"],
                                    ["inline", "En ligne"],
                                    ["stacked", "Empilée"],
                                ]}
                                onChange={(value) =>
                                    setLayout(value as PixieDustToastLayout)
                                }
                            />
                            <SelectControl
                                id="toast-width"
                                label="Largeur"
                                value={width}
                                options={[
                                    ["fit", "Au contenu"],
                                    ["sm", "Petite"],
                                    ["md", "Moyenne"],
                                    ["lg", "Grande"],
                                    ["full", "Pleine"],
                                ]}
                                onChange={(value) =>
                                    setWidth(value as PixieDustToastWidth)
                                }
                            />
                        </div>

                        <SelectControl
                            id="toast-duration"
                            label="Durée"
                            value={duration === false ? "persistent" : duration}
                            options={[
                                ["3000", "3 secondes"],
                                ["6000", "6 secondes"],
                                ["10000", "10 secondes"],
                                ["persistent", "Persistante"],
                            ]}
                            onChange={(value) =>
                                setDuration(
                                    value === "persistent"
                                        ? false
                                        : Number(value),
                                )
                            }
                        />
                        <SelectControl
                            id="toast-progress"
                            label="Progression"
                            value={progress}
                            options={[
                                ["none", "Masquée"],
                                ["rail", "Rail latéral"],
                                ["bar", "Barre basse"],
                            ]}
                            onChange={(value) =>
                                setProgress(value as PixieDustToastProgress)
                            }
                        />
                        <SelectControl
                            id="toast-priority"
                            label="Priorité d’annonce"
                            value={priority}
                            options={[
                                ["auto", "Automatique"],
                                ["polite", "Polie"],
                                ["assertive", "Prioritaire"],
                            ]}
                            onChange={(value) =>
                                setPriority(value as PixieDustToastPriority)
                            }
                        />
                        <SelectControl
                            id="toast-swipe"
                            label="Balayage"
                            value={swipeDirection || "false"}
                            options={[
                                ["false", "Désactivé"],
                                ["start", "Vers le début"],
                                ["end", "Vers la fin"],
                                ["up", "Vers le haut"],
                                ["down", "Vers le bas"],
                            ]}
                            onChange={(value) =>
                                setSwipeDirection(
                                    value === "false"
                                        ? false
                                        : (value as Exclude<
                                              PixieDustToastSwipeDirection,
                                              false
                                          >),
                                )
                            }
                        />

                        <div className="space-y-3 text-sm text-ink-soft">
                            {[
                                ["Titre", withTitle, setWithTitle],
                                ["Action", withAction, setWithAction],
                                ["Fermeture", dismissible, setDismissible],
                                [
                                    "Pause à l’interaction",
                                    pauseOnInteraction,
                                    setPauseOnInteraction,
                                ],
                                [
                                    "Pause hors page",
                                    pauseOnPageHidden,
                                    setPauseOnPageHidden,
                                ],
                                [
                                    "Fermeture avec Échap",
                                    closeOnEscape,
                                    setCloseOnEscape,
                                ],
                                [
                                    "Fermer après l’action",
                                    closeOnAction,
                                    setCloseOnAction,
                                ],
                            ].map(([label, checked, setter]) => (
                                <label
                                    key={String(label)}
                                    className="flex gap-3"
                                >
                                    <input
                                        type="checkbox"
                                        checked={Boolean(checked)}
                                        onChange={(event) =>
                                            (
                                                setter as (
                                                    value: boolean,
                                                ) => void
                                            )(event.target.checked)
                                        }
                                    />
                                    {String(label)}
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                <AtelierPlaygroundProjection>
                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-96 items-center justify-center overflow-auto bg-canvas p-6 sm:p-8"
                    >
                        <div
                            className={`grid min-h-72 w-full content-between gap-8 border border-line bg-surface p-6 sm:p-8 ${frameWidths[frame]}`}
                        >
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <PixieButton
                                    type="button"
                                    color="vert-cellulo"
                                    onClick={relaunchToast}
                                >
                                    Relancer la notification
                                </PixieButton>
                                <p
                                    aria-live="polite"
                                    className="font-mono text-xs text-muted"
                                >
                                    {lastDismiss
                                        ? dismissLabels[lastDismiss]
                                        : "Notification en attente"}
                                </p>
                            </div>

                            <PixieDustToast
                                open={open}
                                onOpenChange={setOpen}
                                onDismiss={setLastDismiss}
                                tone={tone}
                                variant={variant}
                                size={size}
                                layout={layout}
                                width={width}
                                motion={motion}
                                progress={progress}
                                title={
                                    withTitle ? "Fiche enregistrée" : undefined
                                }
                                priority={priority}
                                duration={duration}
                                dismissible={dismissible}
                                pauseOnInteraction={pauseOnInteraction}
                                pauseOnPageHidden={pauseOnPageHidden}
                                closeOnEscape={closeOnEscape}
                                swipeDirection={swipeDirection}
                                actionLabel={withAction ? "Annuler" : undefined}
                                onAction={
                                    withAction
                                        ? () => setLastDismiss("action")
                                        : undefined
                                }
                                closeOnAction={closeOnAction}
                            >
                                Les modifications rejoignent les archives du
                                Codex.
                            </PixieDustToast>
                        </div>
                    </div>
                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}

function SelectControl({
    id,
    label,
    value,
    options,
    onChange,
}: Readonly<{
    id: string;
    label: string;
    value: string | number;
    options: readonly (readonly [string, string])[];
    onChange: (value: string) => void;
}>) {
    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-ink">
                {label}
            </label>
            <PixieSelect
                mode="popover"
                portal
                size="sm"
                id={id}
                value={String(value)}
                onChange={(event) => onChange(event.target.value)}
                className="mt-2"
            >
                {options.map(([optionValue, optionLabel]) => (
                    <option key={optionValue} value={optionValue}>
                        {optionLabel}
                    </option>
                ))}
            </PixieSelect>
        </div>
    );
}
