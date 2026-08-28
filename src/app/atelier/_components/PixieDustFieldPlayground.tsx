"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierPlaygroundProjection } from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieDustField,
    type PixieDustFieldSpacing,
} from "@/components/ui/PixieDustField";

const controls = [
    { value: "input", label: "Input" },
    { value: "select", label: "Select" },
    { value: "textarea", label: "Textarea" },
] as const;

const spacings = [
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
] as const;

const requirements = [
    { value: "none", label: "Aucune mention" },
    { value: "required", label: "Obligatoire" },
    { value: "optional", label: "Facultatif" },
] as const;

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-2xl",
    large: "max-w-4xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

type Control = (typeof controls)[number]["value"];
type Requirement = (typeof requirements)[number]["value"];

function createPreviewControl(control: Control, required: boolean) {
    const className =
        "w-full border border-line-strong bg-canvas px-3 py-2.5 text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-focus";

    if (control === "select") {
        return (
            <select className={className} required={required} defaultValue="">
                <option value="" disabled>
                    Choisir une famille
                </option>
                <option>Personnages</option>
                <option>Créateurs</option>
                <option>Œuvres</option>
                <option>Époques</option>
            </select>
        );
    }

    if (control === "textarea") {
        return (
            <textarea
                className={`${className} min-h-28 resize-y`}
                required={required}
                placeholder="Décrire le raccord à conserver…"
            />
        );
    }

    return (
        <input
            type="search"
            className={className}
            required={required}
            placeholder="Mickey, Oswald, Silly Symphonies…"
        />
    );
}

export function PixieDustFieldPlayground() {
    const [control, setControl] = useState<Control>("input");
    const [spacing, setSpacing] = useState<PixieDustFieldSpacing>("md");
    const [requirement, setRequirement] = useState<Requirement>("none");
    const [description, setDescription] = useState(true);
    const [error, setError] = useState(false);
    const [labelHidden, setLabelHidden] = useState(false);
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const requirementProps =
        requirement === "required"
            ? ({ required: true } as const)
            : requirement === "optional"
              ? ({ optional: true } as const)
              : ({} as const);
    const controlName =
        control === "input"
            ? "input"
            : control === "select"
              ? "select"
              : "textarea";
    const code = `<PixieDustField
    controlId="archive-search"
    label="Rechercher dans les archives"${description ? '\n    description="Noms, titres, catégories ou collections."' : ""}${error ? '\n    error="Aucune archive ne correspond à cette saisie."' : ""}${requirement === "required" ? "\n    required" : ""}${requirement === "optional" ? "\n    optional" : ""}${labelHidden ? "\n    labelHidden" : ""}
    spacing="${spacing}"
>
    <${controlName}${control === "input" ? ' type="search"' : ""} />
</PixieDustField>`;

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
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
                                Rythme
                            </legend>
                            <div className="mt-3 space-y-2">
                                {spacings.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="field-spacing"
                                        {...option}
                                        selectedValue={spacing}
                                        onChange={setSpacing}
                                    />
                                ))}
                            </div>
                        </fieldset>

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
                                    checked={error}
                                    onChange={(event) =>
                                        setError(event.target.checked)
                                    }
                                />
                                Afficher une erreur
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
                        </div>
                    </div>
                </aside>

                <AtelierPlaygroundProjection className="p-6 sm:p-8">
                    <AtelierRegiePlateau
                        namePrefix="field"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

                    <div
                        data-light={light}
                        className="mt-6 min-h-80 bg-canvas p-5 sm:p-8"
                    >
                        <div className={`mx-auto ${frameWidths[frame]}`}>
                            <PixieDustField
                                controlId="field-preview"
                                label="Rechercher dans les archives"
                                description={
                                    description
                                        ? "Noms, titres, catégories ou collections."
                                        : undefined
                                }
                                error={
                                    error
                                        ? "Aucune archive ne correspond à cette saisie."
                                        : undefined
                                }
                                labelHidden={labelHidden}
                                spacing={spacing}
                                {...requirementProps}
                            >
                                {createPreviewControl(
                                    control,
                                    requirement === "required",
                                )}
                            </PixieDustField>
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
