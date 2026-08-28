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
    PixieCallout,
    type PixieCalloutAccentPosition,
    type PixieCalloutColor,
    type PixieCalloutDividers,
    type PixieCalloutEffect,
    type PixieCalloutEffectIntensity,
    type PixieCalloutElement,
    type PixieCalloutElevation,
    type PixieCalloutFooterAlign,
    type PixieCalloutIconAlign,
    type PixieCalloutLayout,
    type PixieCalloutPadding,
    type PixieCalloutRadius,
    type PixieCalloutVariant,
} from "@/components/ui/PixieCallout";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "plain", label: "Libre" },
    { value: "subtle", label: "Discret" },
    { value: "outline", label: "Contour" },
    { value: "accent", label: "Accent" },
    { value: "tinted", label: "Teinté" },
] as const;

const layouts = [
    { value: "stacked", label: "Empilé" },
    { value: "inline", label: "En ligne" },
    { value: "header", label: "En-tête" },
] as const;

const effects = [
    { value: "none", label: "Aucun" },
    { value: "grain", label: "Grain" },
    { value: "halo", label: "Halo" },
    { value: "projector", label: "Projecteur" },
] as const;

const elements = ["aside", "section", "div"] as const;
const paddings = ["sm", "md", "lg", "xl"] as const;
const radii = ["none", "small", "medium", "large"] as const;
const accentPositions = ["top", "end", "bottom", "start"] as const;
const elevations = ["none", "soft", "strong"] as const;
const dividers = ["none", "header", "footer", "both"] as const;
const footerAlignments = ["start", "end"] as const;
const effectIntensities = ["subtle", "medium", "strong"] as const;
const iconAlignments = ["start", "center"] as const;
const colorSlugs = getAtelierAnimationColorSlugs();

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-xl",
    large: "max-w-none",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const selectClassName = "mt-2";

export function PixieCalloutPlayground() {
    const [element, setElement] = useState<PixieCalloutElement>("aside");
    const [variant, setVariant] = useState<PixieCalloutVariant>("accent");
    const [layout, setLayout] = useState<PixieCalloutLayout>("header");
    const [padding, setPadding] = useState<PixieCalloutPadding>("md");
    const [radius, setRadius] = useState<PixieCalloutRadius>("medium");
    const [color, setColor] = useState<PixieCalloutColor>("ambre-projecteur");
    const [accentPosition, setAccentPosition] =
        useState<PixieCalloutAccentPosition>("start");
    const [elevation, setElevation] = useState<PixieCalloutElevation>("soft");
    const [divider, setDivider] = useState<PixieCalloutDividers>("footer");
    const [footerAlign, setFooterAlign] =
        useState<PixieCalloutFooterAlign>("start");
    const [effect, setEffect] = useState<PixieCalloutEffect>("halo");
    const [effectIntensity, setEffectIntensity] =
        useState<PixieCalloutEffectIntensity>("subtle");
    const [iconAlign, setIconAlign] = useState<PixieCalloutIconAlign>("start");
    const [showIcon, setShowIcon] = useState(true);
    const [showEyebrow, setShowEyebrow] = useState(true);
    const [showHeading, setShowHeading] = useState(true);
    const [showFooter, setShowFooter] = useState(true);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

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
    const code = `<PixieCallout
    as="${element}"
    variant="${variant}"
    layout="${layout}"
    padding="${padding}"
    radius="${radius}"
    accentPosition="${accentPosition}"
    elevation="${elevation}"
    dividers="${divider}"
    footerAlign="${footerAlign}"
    effect="${effect}"
    effectIntensity="${effectIntensity}"
    iconAlign="${iconAlign}"${optionalProps.length > 0 ? `\n${optionalProps.join("\n")}` : ""}
>
    <p>Les documents conservés ne permettent pas encore de retenir une date unique.</p>
</PixieCallout>`;
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
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[19rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="callout-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="callout-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieCalloutElement,
                                    )
                                }
                                className={`${selectClassName} font-mono`}
                            >
                                {elements.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </PixieSelect>
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

                        <div className="grid grid-cols-2 gap-3">
                            <label className="text-sm font-medium text-ink">
                                Espacement
                                <PixieSelect
                                    mode="popover"
                                    portal
                                    size="sm"
                                    value={padding}
                                    onChange={(event) =>
                                        setPadding(
                                            event.target
                                                .value as PixieCalloutPadding,
                                        )
                                    }
                                    className={selectClassName}
                                >
                                    {paddings.map((value) => (
                                        <option key={value}>{value}</option>
                                    ))}
                                </PixieSelect>
                            </label>
                            <label className="text-sm font-medium text-ink">
                                Rayon
                                <PixieSelect
                                    mode="popover"
                                    portal
                                    size="sm"
                                    value={radius}
                                    onChange={(event) =>
                                        setRadius(
                                            event.target
                                                .value as PixieCalloutRadius,
                                        )
                                    }
                                    className={selectClassName}
                                >
                                    {radii.map((value) => (
                                        <option key={value}>{value}</option>
                                    ))}
                                </PixieSelect>
                            </label>
                        </div>

                        <div>
                            <label
                                htmlFor="callout-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="callout-color"
                                value={color || "theme"}
                                onChange={(event) =>
                                    selectColor(event.target.value)
                                }
                                className={selectClassName}
                            >
                                <option value="theme">Accent du thème</option>
                                {colorSlugs.map((slug) => (
                                    <option key={slug} value={slug}>
                                        {getAtelierAnimationColor(slug).label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <label className="text-sm font-medium text-ink">
                                Position accent
                                <PixieSelect
                                    mode="popover"
                                    portal
                                    size="sm"
                                    value={accentPosition}
                                    onChange={(event) =>
                                        setAccentPosition(
                                            event.target
                                                .value as PixieCalloutAccentPosition,
                                        )
                                    }
                                    className={selectClassName}
                                >
                                    {accentPositions.map((value) => (
                                        <option key={value}>{value}</option>
                                    ))}
                                </PixieSelect>
                            </label>
                            <label className="text-sm font-medium text-ink">
                                Élévation
                                <PixieSelect
                                    mode="popover"
                                    portal
                                    size="sm"
                                    value={elevation}
                                    onChange={(event) =>
                                        setElevation(
                                            event.target
                                                .value as PixieCalloutElevation,
                                        )
                                    }
                                    className={selectClassName}
                                >
                                    {elevations.map((value) => (
                                        <option key={value}>{value}</option>
                                    ))}
                                </PixieSelect>
                            </label>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <label className="text-sm font-medium text-ink">
                                Séparateurs
                                <PixieSelect
                                    mode="popover"
                                    portal
                                    size="sm"
                                    value={divider}
                                    onChange={(event) =>
                                        setDivider(
                                            event.target
                                                .value as PixieCalloutDividers,
                                        )
                                    }
                                    className={selectClassName}
                                >
                                    {dividers.map((value) => (
                                        <option key={value}>{value}</option>
                                    ))}
                                </PixieSelect>
                            </label>
                            <label className="text-sm font-medium text-ink">
                                Alignement footer
                                <PixieSelect
                                    mode="popover"
                                    portal
                                    size="sm"
                                    value={footerAlign}
                                    onChange={(event) =>
                                        setFooterAlign(
                                            event.target
                                                .value as PixieCalloutFooterAlign,
                                        )
                                    }
                                    className={selectClassName}
                                >
                                    {footerAlignments.map((value) => (
                                        <option key={value}>{value}</option>
                                    ))}
                                </PixieSelect>
                            </label>
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Effet
                            </legend>
                            <div className="mt-3 space-y-2">
                                {effects.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="callout-effect"
                                        {...option}
                                        selectedValue={effect}
                                        onChange={setEffect}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div className="grid grid-cols-2 gap-3">
                            <label className="text-sm font-medium text-ink">
                                Intensité
                                <PixieSelect
                                    mode="popover"
                                    portal
                                    size="sm"
                                    value={effectIntensity}
                                    onChange={(event) =>
                                        setEffectIntensity(
                                            event.target
                                                .value as PixieCalloutEffectIntensity,
                                        )
                                    }
                                    className={selectClassName}
                                >
                                    {effectIntensities.map((value) => (
                                        <option key={value}>{value}</option>
                                    ))}
                                </PixieSelect>
                            </label>
                            <label className="text-sm font-medium text-ink">
                                Symbole
                                <PixieSelect
                                    mode="popover"
                                    portal
                                    size="sm"
                                    value={iconAlign}
                                    onChange={(event) =>
                                        setIconAlign(
                                            event.target
                                                .value as PixieCalloutIconAlign,
                                        )
                                    }
                                    className={selectClassName}
                                >
                                    {iconAlignments.map((value) => (
                                        <option key={value}>{value}</option>
                                    ))}
                                </PixieSelect>
                            </label>
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

                <AtelierPlaygroundProjection>
                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[38rem] items-center justify-center overflow-auto bg-canvas p-8"
                    >
                        <div
                            className={`w-full transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <PixieCallout
                                as={element}
                                variant={variant}
                                layout={layout}
                                padding={padding}
                                radius={radius}
                                color={color}
                                accentPosition={accentPosition}
                                elevation={elevation}
                                dividers={divider}
                                footerAlign={footerAlign}
                                effect={effect}
                                effectIntensity={effectIntensity}
                                iconAlign={iconAlign}
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
                                            href="#pixie-callout-playground"
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
                            </PixieCallout>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
