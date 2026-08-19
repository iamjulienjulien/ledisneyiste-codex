"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieDustCallout,
    type PixieDustCalloutColor,
    type PixieDustCalloutElement,
    type PixieDustCalloutLayout,
    type PixieDustCalloutPadding,
    type PixieDustCalloutRadius,
    type PixieDustCalloutVariant,
} from "@/components/ui/PixieDustCallout";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "subtle", label: "Discret" },
    { value: "outline", label: "Contour" },
    { value: "accent", label: "Accent" },
    { value: "spotlight", label: "Projecteur" },
] as const;

const layouts = [
    { value: "stacked", label: "Empilé" },
    { value: "inline", label: "En ligne" },
] as const;

const paddings = [
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

const elements = ["aside", "section", "div"] as const;
const colorSlugs = getAtelierAnimationColorSlugs();

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-xl",
    large: "max-w-3xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

export function PixieDustCalloutPlayground() {
    const [element, setElement] = useState<PixieDustCalloutElement>("aside");
    const [variant, setVariant] = useState<PixieDustCalloutVariant>("accent");
    const [layout, setLayout] = useState<PixieDustCalloutLayout>("inline");
    const [padding, setPadding] = useState<PixieDustCalloutPadding>("md");
    const [radius, setRadius] = useState<PixieDustCalloutRadius>("medium");
    const [color, setColor] =
        useState<PixieDustCalloutColor>("ambre-projecteur");
    const [showIcon, setShowIcon] = useState(true);
    const [showEyebrow, setShowEyebrow] = useState(true);
    const [showHeading, setShowHeading] = useState(true);
    const [showFooter, setShowFooter] = useState(true);
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const optionalProps = [
        color ? `    color="${color}"` : null,
        showHeading
            ? '    aria-labelledby="callout-heading"'
            : element !== "div"
              ? '    aria-label="Note de production"'
              : null,
        showIcon
            ? '    icon={<PixieSymbol registry="blocs" collection="oeuvres" slug="repere" />}'
            : null,
        showEyebrow ? '    eyebrow="Note de production"' : null,
        showHeading
            ? '    heading={<h3 id="callout-heading">Une date encore discutée</h3>}'
            : null,
        showFooter
            ? '    footer={<PixieLink href="#sources">Consulter les sources</PixieLink>}'
            : null,
    ].filter((line): line is string => line !== null);
    const code = `<PixieDustCallout
    as="${element}"
    variant="${variant}"
    layout="${layout}"
    padding="${padding}"
    radius="${radius}"${optionalProps.length > 0 ? `\n${optionalProps.join("\n")}` : ""}
>
    <p>Les documents conservés ne permettent pas encore de retenir une date unique.</p>
</PixieDustCallout>`;
    const slotControls = [
        { label: "Symbole", checked: showIcon, onChange: setShowIcon },
        { label: "Eyebrow", checked: showEyebrow, onChange: setShowEyebrow },
        { label: "Titre", checked: showHeading, onChange: setShowHeading },
        { label: "Footer", checked: showFooter, onChange: setShowFooter },
    ] as const;

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
                                htmlFor="callout-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <select
                                id="callout-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustCalloutElement,
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
                                        name="callout-variant"
                                        {...option}
                                        selectedValue={variant}
                                        onChange={setVariant}
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
                                        name="callout-layout"
                                        {...option}
                                        selectedValue={layout}
                                        onChange={setLayout}
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
                                        name="callout-padding"
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
                                        name="callout-radius"
                                        {...option}
                                        selectedValue={radius}
                                        onChange={setRadius}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="callout-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur
                            </label>
                            <select
                                id="callout-color"
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

                        <div className="space-y-3">
                            {slotControls.map((control) => (
                                <label
                                    key={control.label}
                                    className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft"
                                >
                                    <input
                                        type="checkbox"
                                        checked={control.checked}
                                        onChange={(event) =>
                                            control.onChange(
                                                event.target.checked,
                                            )
                                        }
                                        className="accent-accent"
                                    />
                                    {control.label}
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="callout"
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
                            <PixieDustCallout
                                as={element}
                                variant={variant}
                                layout={layout}
                                padding={padding}
                                radius={radius}
                                color={color}
                                aria-labelledby={
                                    showHeading
                                        ? "callout-preview-heading"
                                        : undefined
                                }
                                aria-label={
                                    !showHeading && element !== "div"
                                        ? "Note de production"
                                        : undefined
                                }
                                icon={
                                    showIcon ? (
                                        <PixieSymbol
                                            registry="blocs"
                                            collection="oeuvres"
                                            slug="repere"
                                            size="lg"
                                            decorative
                                        />
                                    ) : undefined
                                }
                                eyebrow={
                                    showEyebrow
                                        ? "Note de production"
                                        : undefined
                                }
                                heading={
                                    showHeading ? (
                                        <h4 id="callout-preview-heading">
                                            Une date encore discutée
                                        </h4>
                                    ) : undefined
                                }
                                footer={
                                    showFooter ? (
                                        <PixieLink
                                            href="#pixie-dust-callout-playground"
                                            variant="action"
                                            color={color}
                                            indicator="arrow"
                                        >
                                            Consulter les sources
                                        </PixieLink>
                                    ) : undefined
                                }
                            >
                                <p>
                                    Les documents conservés ne permettent pas
                                    encore de retenir une date unique avec une
                                    certitude suffisante.
                                </p>
                            </PixieDustCallout>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
