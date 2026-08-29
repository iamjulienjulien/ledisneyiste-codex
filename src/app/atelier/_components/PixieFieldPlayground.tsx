"use client";

import { PixieSelect } from "@/components/ui/PixieSelect";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import {
    PixieField,
    type PixieFieldFeedbackTone,
    type PixieFieldLayout,
    type PixieFieldRequirementDisplay,
    type PixieFieldSpacing,
} from "@/components/ui/PixieField";

const controls = [
    { value: "input", label: "Input" },
    { value: "select", label: "Select" },
    { value: "textarea", label: "Textarea" },
] as const;

const spacings = [
    { value: "xs", label: "Très petit" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
    { value: "xl", label: "Très grand" },
] as const;

const layouts = [
    { value: "stacked", label: "Empilé" },
    { value: "side", label: "Latéral" },
] as const;

const requirementDisplays = [
    { value: "text", label: "Texte" },
    { value: "mark", label: "Marque" },
    { value: "hidden", label: "Masqué" },
] as const;

const feedbacks = [
    { value: "none", label: "Aucun" },
    { value: "success", label: "Confirmation" },
    { value: "warning", label: "Avertissement" },
    { value: "error", label: "Erreur" },
] as const;

const requirements = [
    { value: "none", label: "Aucune mention" },
    { value: "required", label: "Obligatoire" },
    { value: "optional", label: "Facultatif" },
] as const;

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-2xl",
    large: "max-w-none",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

type Control = (typeof controls)[number]["value"];
type Requirement = (typeof requirements)[number]["value"];
type Feedback = (typeof feedbacks)[number]["value"];

function createPreviewControl({
    control,
    disabled,
    readOnly,
    required,
}: Readonly<{
    control: Control;
    disabled: boolean;
    readOnly: boolean;
    required: boolean;
}>) {
    const className =
        "w-full border border-line-strong bg-canvas px-3 py-2.5 text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-focus";

    if (control === "select") {
        return (
            <PixieSelect
                mode="popover"
                portal
                size="sm"
                disabled={disabled}
                required={required}
                defaultValue=""
            >
                <option value="" disabled>
                    Choisir une famille
                </option>
                <option>Personnages</option>
                <option>Créateurs</option>
                <option>Œuvres</option>
                <option>Époques</option>
            </PixieSelect>
        );
    }

    if (control === "textarea") {
        return (
            <textarea
                className={`${className} min-h-28 resize-y`}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                placeholder="Décrire le raccord à conserver…"
            />
        );
    }

    return (
        <input
            type="search"
            className={className}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            placeholder="Mickey, Oswald, Silly Symphonies…"
        />
    );
}

export function PixieFieldPlayground() {
    const [control, setControl] = useState<Control>("input");
    const [layout, setLayout] = useState<PixieFieldLayout>("stacked");
    const [spacing, setSpacing] = useState<PixieFieldSpacing>("md");
    const [requirement, setRequirement] = useState<Requirement>("none");
    const [requirementDisplay, setRequirementDisplay] =
        useState<PixieFieldRequirementDisplay>("text");
    const [feedback, setFeedback] = useState<Feedback>("none");
    const [description, setDescription] = useState(true);
    const [meta, setMeta] = useState(false);
    const [labelHidden, setLabelHidden] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const requirementProps =
        requirement === "required"
            ? ({ required: true } as const)
            : requirement === "optional"
              ? ({ optional: true } as const)
              : ({} as const);
    const feedbackProps =
        feedback === "error"
            ? ({
                  error: "Aucune archive ne correspond à cette saisie.",
              } as const)
            : feedback === "success"
              ? ({
                    feedback: "La formulation peut être conservée.",
                    feedbackTone: "success" as PixieFieldFeedbackTone,
                } as const)
              : feedback === "warning"
                ? ({
                      feedback: "Cette formulation mérite une vérification.",
                      feedbackTone: "warning" as PixieFieldFeedbackTone,
                  } as const)
                : ({} as const);
    const controlName =
        control === "input"
            ? "input"
            : control === "select"
              ? "select"
              : "textarea";
    const feedbackCode =
        feedback === "error"
            ? '\n    error="Aucune archive ne correspond à cette saisie."'
            : feedback === "success"
              ? '\n    feedback="La formulation peut être conservée."\n    feedbackTone="success"'
              : feedback === "warning"
                ? '\n    feedback="Cette formulation mérite une vérification."\n    feedbackTone="warning"'
                : "";
    const code = `<PixieField
    label="Rechercher dans les archives"${description ? '\n    description="Noms, titres, catégories ou collections."' : ""}${feedbackCode}${meta ? '\n    meta="24 caractères"' : ""}${requirement === "required" ? "\n    required" : ""}${requirement === "optional" ? "\n    optional" : ""}${requirement !== "none" && requirementDisplay !== "text" ? `\n    requirementDisplay="${requirementDisplay}"` : ""}${labelHidden ? "\n    labelHidden" : ""}
    layout="${layout}"
    spacing="${spacing}"
>
    <${controlName}${control === "input" ? ' type="search"' : ""}${disabled ? " disabled" : ""}${readOnly && control !== "select" ? " readOnly" : ""} />
</PixieField>`;

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-7">
                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Contrôle témoin
                            </legend>
                            <div className="mt-3 space-y-2">
                                {controls.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="field-control"
                                        {...option}
                                        selectedValue={control}
                                        onChange={setControl}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Disposition
                            </legend>
                            <div className="mt-3 space-y-2">
                                {layouts.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="field-layout"
                                        {...option}
                                        selectedValue={layout}
                                        onChange={setLayout}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="field-spacing"
                                className="text-sm font-medium text-ink"
                            >
                                Rythme
                            </label>
                            <PixieSelect
                                id="field-spacing"
                                className="mt-3 w-full"
                                mode="popover"
                                portal
                                size="sm"
                                value={spacing}
                                onChange={(event) =>
                                    setSpacing(
                                        event.target.value as PixieFieldSpacing,
                                    )
                                }
                            >
                                {spacings.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Indication
                            </legend>
                            <div className="mt-3 space-y-2">
                                {requirements.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="field-requirement"
                                        {...option}
                                        selectedValue={requirement}
                                        onChange={setRequirement}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        {requirement !== "none" ? (
                            <div>
                                <label
                                    htmlFor="field-requirement-display"
                                    className="text-sm font-medium text-ink"
                                >
                                    Présentation de l’indication
                                </label>
                                <PixieSelect
                                    id="field-requirement-display"
                                    className="mt-3 w-full"
                                    mode="popover"
                                    portal
                                    size="sm"
                                    value={requirementDisplay}
                                    onChange={(event) =>
                                        setRequirementDisplay(
                                            event.target
                                                .value as PixieFieldRequirementDisplay,
                                        )
                                    }
                                >
                                    {requirementDisplays.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </PixieSelect>
                            </div>
                        ) : null}

                        <div>
                            <label
                                htmlFor="field-feedback"
                                className="text-sm font-medium text-ink"
                            >
                                Retour associé
                            </label>
                            <PixieSelect
                                id="field-feedback"
                                className="mt-3 w-full"
                                mode="popover"
                                portal
                                size="sm"
                                value={feedback}
                                onChange={(event) =>
                                    setFeedback(event.target.value as Feedback)
                                }
                            >
                                {feedbacks.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <div className="space-y-3 text-sm text-ink-soft">
                            <label className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={description}
                                    onChange={(event) =>
                                        setDescription(event.target.checked)
                                    }
                                />
                                Afficher la description
                            </label>
                            <label className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={meta}
                                    onChange={(event) =>
                                        setMeta(event.target.checked)
                                    }
                                />
                                Afficher une métadonnée
                            </label>
                            <label className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={labelHidden}
                                    onChange={(event) =>
                                        setLabelHidden(event.target.checked)
                                    }
                                />
                                Masquer visuellement le libellé
                            </label>
                            <label className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={disabled}
                                    onChange={(event) =>
                                        setDisabled(event.target.checked)
                                    }
                                />
                                Désactiver le contrôle
                            </label>
                            <label className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={readOnly}
                                    disabled={control === "select"}
                                    onChange={(event) =>
                                        setReadOnly(event.target.checked)
                                    }
                                />
                                Passer en lecture seule
                            </label>
                        </div>
                    </div>
                </aside>

                <AtelierPlaygroundProjection className="p-6 sm:p-8">
                    <div
                        data-light={light}
                        className="mt-6 min-h-80 bg-canvas p-5 sm:p-8"
                    >
                        <div className={`mx-auto ${frameWidths[frame]}`}>
                            <PixieField
                                controlId="field-preview"
                                label="Rechercher dans les archives"
                                description={
                                    description
                                        ? "Noms, titres, catégories ou collections."
                                        : undefined
                                }
                                meta={meta ? "24 caractères" : undefined}
                                labelHidden={labelHidden}
                                layout={layout}
                                spacing={spacing}
                                requirementDisplay={requirementDisplay}
                                {...requirementProps}
                                {...feedbackProps}
                            >
                                {createPreviewControl({
                                    control,
                                    disabled,
                                    readOnly,
                                    required: requirement === "required",
                                })}
                            </PixieField>
                        </div>
                    </div>

                    <div className="mt-6">
                        <AtelierCodePanel code={code} />
                    </div>
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
