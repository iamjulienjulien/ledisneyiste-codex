"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import { PixieButton } from "@/components/ui/PixieButton";
import {
    PixieDustToast,
    type PixieDustToastPriority,
    type PixieDustToastSize,
    type PixieDustToastTone,
    type PixieDustToastVariant,
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

const variants = [
    { value: "surface", label: "Surface" },
    { value: "solid", label: "Plein" },
    { value: "outline", label: "Contour" },
] as const satisfies readonly Readonly<{
    value: PixieDustToastVariant;
    label: string;
}>[];

const sizes = [
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
] as const satisfies readonly Readonly<{
    value: PixieDustToastSize;
    label: string;
}>[];

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-xl",
    large: "max-w-3xl",
} as const;

export function PixieDustToastPlayground() {
    const [tone, setTone] = useState<PixieDustToastTone>("success");
    const [variant, setVariant] = useState<PixieDustToastVariant>("surface");
    const [size, setSize] = useState<PixieDustToastSize>("md");
    const [priority, setPriority] = useState<PixieDustToastPriority | "auto">(
        "auto",
    );
    const [duration, setDuration] = useState<number | false>(6000);
    const [dismissible, setDismissible] = useState(true);
    const [pauseOnInteraction, setPauseOnInteraction] = useState(true);
    const [withTitle, setWithTitle] = useState(true);
    const [withAction, setWithAction] = useState(false);
    const [open, setOpen] = useState(true);
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const code = `<PixieDustToast
    tone="${tone}"
    variant="${variant}"
    size="${size}"${withTitle ? '\n    title="Fiche enregistrée"' : ""}${priority === "auto" ? "" : `\n    priority="${priority}"`}${duration === false ? "\n    duration={false}" : `\n    duration={${duration}}`}${pauseOnInteraction ? "" : "\n    pauseOnInteraction={false}"}${dismissible ? "" : "\n    dismissible={false}"}${withAction ? '\n    actionLabel="Annuler"\n    onAction={handleUndo}' : ""}
>
    Les modifications rejoignent les archives du Codex.
</PixieDustToast>`;

    return (
        <div className="overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>
                    <div className="mt-6 space-y-7">
                        {[
                            ["Tonalité", "toast-tone", tones, tone, setTone],
                            [
                                "Variante",
                                "toast-variant",
                                variants,
                                variant,
                                setVariant,
                            ],
                            ["Taille", "toast-size", sizes, size, setSize],
                        ].map(([legend, name, options, value, setter]) => (
                            <fieldset key={String(name)}>
                                <legend className="text-sm font-medium text-ink">
                                    {String(legend)}
                                </legend>
                                <div className="mt-3 space-y-2">
                                    {(options as typeof tones).map((option) => (
                                        <AtelierOptionRadio
                                            key={option.value}
                                            name={String(name)}
                                            {...option}
                                            selectedValue={value as never}
                                            onChange={setter as never}
                                        />
                                    ))}
                                </div>
                            </fieldset>
                        ))}

                        <div>
                            <label
                                htmlFor="toast-duration"
                                className="text-sm font-medium text-ink"
                            >
                                Durée
                            </label>
                            <select
                                id="toast-duration"
                                value={
                                    duration === false ? "persistent" : duration
                                }
                                onChange={(event) =>
                                    setDuration(
                                        event.target.value === "persistent"
                                            ? false
                                            : Number(event.target.value),
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            >
                                <option value="3000">3 secondes</option>
                                <option value="6000">6 secondes</option>
                                <option value="10000">10 secondes</option>
                                <option value="persistent">Persistante</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="toast-priority"
                                className="text-sm font-medium text-ink"
                            >
                                Priorité d’annonce
                            </label>
                            <select
                                id="toast-priority"
                                value={priority}
                                onChange={(event) =>
                                    setPriority(
                                        event.target.value as
                                            PixieDustToastPriority | "auto",
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            >
                                <option value="auto">Automatique</option>
                                <option value="polite">Polie</option>
                                <option value="assertive">Prioritaire</option>
                            </select>
                        </div>

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

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="toast"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />
                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-96 items-center justify-center overflow-auto bg-canvas p-6 sm:p-8"
                    >
                        <div
                            className={`grid min-h-64 w-full content-between gap-8 border border-line bg-surface p-6 sm:p-8 ${frameWidths[frame]}`}
                        >
                            <PixieButton
                                type="button"
                                color="vert-cellulo"
                                onClick={() => setOpen(true)}
                            >
                                Relancer la notification
                            </PixieButton>
                            <PixieDustToast
                                open={open}
                                onOpenChange={setOpen}
                                tone={tone}
                                variant={variant}
                                size={size}
                                title={
                                    withTitle ? "Fiche enregistrée" : undefined
                                }
                                priority={
                                    priority === "auto" ? undefined : priority
                                }
                                duration={duration}
                                dismissible={dismissible}
                                pauseOnInteraction={pauseOnInteraction}
                                actionLabel={withAction ? "Annuler" : undefined}
                                onAction={
                                    withAction
                                        ? () => setOpen(false)
                                        : undefined
                                }
                            >
                                Les modifications rejoignent les archives du
                                Codex.
                            </PixieDustToast>
                        </div>
                    </div>
                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
