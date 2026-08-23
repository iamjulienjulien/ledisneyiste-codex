"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieDustInset,
    type PixieDustInsetColor,
    type PixieDustInsetDepth,
    type PixieDustInsetElement,
    type PixieDustInsetPadding,
    type PixieDustInsetRadius,
    type PixieDustInsetVariant,
} from "@/components/ui/PixieDustInset";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "subtle", label: "Discret" },
    { value: "recessed", label: "Creusé" },
    { value: "groove", label: "Rainure" },
    { value: "accent", label: "Accent" },
] as const;

const depths = [
    { value: "shallow", label: "Faible" },
    { value: "medium", label: "Moyenne" },
    { value: "deep", label: "Profonde" },
] as const;

const paddings = [
    { value: "none", label: "Aucun" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
] as const;

const radii = [
    { value: "none", label: "Aucun" },
    { value: "small", label: "Petit" },
    { value: "medium", label: "Moyen" },
    { value: "large", label: "Grand" },
] as const;

const elements = ["div", "section", "aside"] as const;
const colorSlugs = getAtelierAnimationColorSlugs();

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-xl",
    large: "max-w-3xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

export function PixieDustInsetPlayground() {
    const [element, setElement] = useState<PixieDustInsetElement>("div");
    const [variant, setVariant] = useState<PixieDustInsetVariant>("recessed");
    const [depth, setDepth] = useState<PixieDustInsetDepth>("medium");
    const [padding, setPadding] = useState<PixieDustInsetPadding>("md");
    const [radius, setRadius] = useState<PixieDustInsetRadius>("medium");
    const [color, setColor] = useState<PixieDustInsetColor>("ambre-projecteur");
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const optionalProps = [
        color ? `    color="${color}"` : null,
        element !== "div" ? '    aria-labelledby="inset-heading"' : null,
    ].filter((line): line is string => line !== null);
    const code = `<PixieDustInset
    as="${element}"
    variant="${variant}"
    depth="${depth}"
    padding="${padding}"
    radius="${radius}"${optionalProps.length > 0 ? `\n${optionalProps.join("\n")}` : ""}
>
    <h3 id="inset-heading">Repères de consultation</h3>
    <p>Première projection : 18 novembre 1928</p>
</PixieDustInset>`;

    function selectColor(value: string) {
        setColor(
            value === "theme" ? false : (value as AtelierAnimationColorSlug),
        );
    }

    return (
        <div className="overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="inset-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <select
                                id="inset-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustInsetElement,
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
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Variant
                            </legend>
                            <div className="mt-3 space-y-2">
                                {variants.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="inset-variant"
                                        {...option}
                                        selectedValue={variant}
                                        onChange={setVariant}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Profondeur
                            </legend>
                            <div className="mt-3 space-y-2">
                                {depths.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="inset-depth"
                                        {...option}
                                        selectedValue={depth}
                                        onChange={setDepth}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Espacement intérieur
                            </legend>
                            <div className="mt-3 space-y-2">
                                {paddings.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="inset-padding"
                                        {...option}
                                        selectedValue={padding}
                                        onChange={setPadding}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Rayon
                            </legend>
                            <div className="mt-3 space-y-2">
                                {radii.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="inset-radius"
                                        {...option}
                                        selectedValue={radius}
                                        onChange={setRadius}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="inset-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur
                            </label>
                            <select
                                id="inset-color"
                                value={color || "theme"}
                                onChange={(event) =>
                                    selectColor(event.target.value)
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            >
                                <option value="theme">Accent du thème</option>
                                {colorSlugs.map((slug) => (
                                    <option key={slug} value={slug}>
                                        {getAtelierAnimationColor(slug).label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </aside>

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="inset"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[34rem] items-center justify-center overflow-auto bg-canvas p-8"
                    >
                        <div
                            className={`w-full transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <div className="border border-line bg-surface p-6 shadow-soft sm:p-8">
                                <p className="leading-7 text-ink-soft">
                                    Le récit principal conserve toute la lumière
                                    pendant que les repères se placent en
                                    retrait.
                                </p>
                                <PixieDustInset
                                    as={element}
                                    variant={variant}
                                    depth={depth}
                                    padding={padding}
                                    radius={radius}
                                    color={color}
                                    aria-labelledby={
                                        element !== "div"
                                            ? "inset-preview-heading"
                                            : undefined
                                    }
                                    className="mt-6"
                                >
                                    <h4
                                        id="inset-preview-heading"
                                        className="text-xl text-ink"
                                    >
                                        Repères de consultation
                                    </h4>
                                    <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                                        <div>
                                            <dt className="font-eyebrow uppercase tracking-[0.14em] text-muted">
                                                Première projection
                                            </dt>
                                            <dd className="mt-1 text-ink">
                                                18 novembre 1928
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-eyebrow uppercase tracking-[0.14em] text-muted">
                                                Durée
                                            </dt>
                                            <dd className="mt-1 text-ink">
                                                7 minutes 42 secondes
                                            </dd>
                                        </div>
                                    </dl>
                                </PixieDustInset>
                            </div>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
