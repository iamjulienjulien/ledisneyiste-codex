"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieDustContainer,
    type PixieDustContainerGutter,
    type PixieDustContainerWidth,
} from "@/components/ui/PixieDustContainer";

type PlaygroundElement = "div" | "section";

const elements = [
    "div",
    "section",
] as const satisfies readonly PlaygroundElement[];

const widths = [
    { value: "narrow", label: "Étroit" },
    { value: "medium", label: "Moyen" },
    { value: "wide", label: "Large" },
    { value: "full", label: "Pleine largeur" },
] as const;

const gutters = [
    { value: "none", label: "Aucune" },
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
] as const;

const frameWidths = {
    compact: "max-w-md",
    moyen: "max-w-3xl",
    large: "max-w-none",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

export function PixieDustContainerPlayground() {
    const [element, setElement] = useState<PlaygroundElement>("section");
    const [width, setWidth] = useState<PixieDustContainerWidth>("medium");
    const [gutter, setGutter] = useState<PixieDustContainerGutter>("md");
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const labelledBy =
        element === "section"
            ? '    aria-labelledby="container-heading"\n'
            : "";
    const code = `<PixieDustContainer
    as="${element}"
    width="${width}"
    gutter="${gutter}"
${labelledBy}>
    <h2 id="container-heading">Le dessin animé trouve son langage</h2>
    <p>Une séquence centrée dans un cadre de lecture stable.</p>
</PixieDustContainer>`;

    return (
        <div className="overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="container-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <select
                                id="container-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target.value as PlaygroundElement,
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 font-mono text-sm text-ink"
                            >
                                {elements.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                            <p className="mt-2 text-xs leading-5 text-muted">
                                <code className="font-mono">main</code> reste
                                disponible dans l’API, mais n’est pas projeté
                                dans l’Atelier qui possède déjà son propre
                                contenu principal.
                            </p>
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Largeur
                            </legend>
                            <div className="mt-3 space-y-2">
                                {widths.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="container-width"
                                        {...option}
                                        selectedValue={width}
                                        onChange={setWidth}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Gouttière
                            </legend>
                            <div className="mt-3 space-y-2">
                                {gutters.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="container-gutter"
                                        {...option}
                                        selectedValue={gutter}
                                        onChange={setGutter}
                                    />
                                ))}
                            </div>
                        </fieldset>
                    </div>
                </aside>

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="container"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[32rem] items-center justify-center overflow-auto bg-canvas p-4 sm:p-8"
                    >
                        <div
                            className={`w-full border border-dashed border-line-strong py-10 transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <PixieDustContainer
                                as={element}
                                width={width}
                                gutter={gutter}
                                aria-labelledby={
                                    element === "section"
                                        ? "container-preview-heading"
                                        : undefined
                                }
                                className="border-x border-accent/60"
                            >
                                <div className="border border-line bg-surface p-6 shadow-soft">
                                    <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                        Séquence 01
                                    </p>
                                    <h4
                                        id="container-preview-heading"
                                        className="mt-3 text-3xl text-ink"
                                    >
                                        Le dessin animé trouve son langage
                                    </h4>
                                    <p className="mt-4 max-w-2xl leading-7 text-ink-soft">
                                        Le Container fixe le cadre horizontal.
                                        La surface, le rythme vertical et le
                                        contenu restent confiés aux éléments
                                        qu’il accueille.
                                    </p>
                                </div>
                            </PixieDustContainer>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
