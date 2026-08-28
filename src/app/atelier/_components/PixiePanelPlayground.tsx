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
    PixiePanel,
    type PixiePanelAccentPosition,
    type PixiePanelColor,
    type PixiePanelDividers,
    type PixiePanelElement,
    type PixiePanelElevation,
    type PixiePanelPadding,
    type PixiePanelRadius,
    type PixiePanelScroll,
    type PixiePanelVariant,
} from "@/components/ui/PixiePanel";
import { PixieLink } from "@/components/ui/PixieLink";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "plain", label: "Sans surface" },
    { value: "surface", label: "Surface" },
    { value: "muted", label: "Atténué" },
    { value: "outline", label: "Contour" },
    { value: "accent", label: "Accent" },
    { value: "tinted", label: "Teinté" },
] as const;

const paddings = [
    { value: "none", label: "Aucun" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
    { value: "xl", label: "Très grand" },
] as const;

const radii = [
    { value: "none", label: "Aucun" },
    { value: "small", label: "Petit" },
    { value: "medium", label: "Moyen" },
    { value: "large", label: "Grand" },
] as const;

const accentPositions = [
    { value: "top", label: "Haut" },
    { value: "end", label: "Fin" },
    { value: "bottom", label: "Bas" },
    { value: "start", label: "Début" },
] as const;

const elevations = [
    { value: "none", label: "Aucune" },
    { value: "soft", label: "Douce" },
    { value: "strong", label: "Forte" },
] as const;

const dividersOptions = [
    { value: "none", label: "Aucun" },
    { value: "header", label: "Après le header" },
    { value: "footer", label: "Avant le footer" },
    { value: "both", label: "Les deux" },
] as const;

const scrollOptions = [
    { value: "none", label: "Aucun" },
    { value: "body", label: "Corps du panneau" },
] as const;

const elements = ["div", "section", "aside", "article"] as const;
const colorSlugs = getAtelierAnimationColorSlugs();

const frameWidths = {
    compact: "max-w-md",
    moyen: "max-w-2xl",
    large: "max-w-none",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

export function PixiePanelPlayground() {
    const [element, setElement] = useState<PixiePanelElement>("section");
    const [variant, setVariant] = useState<PixiePanelVariant>("accent");
    const [padding, setPadding] = useState<PixiePanelPadding>("lg");
    const [headerPadding, setHeaderPadding] = useState<PixiePanelPadding>("lg");
    const [bodyPadding, setBodyPadding] = useState<PixiePanelPadding>("lg");
    const [footerPadding, setFooterPadding] = useState<PixiePanelPadding>("lg");
    const [radius, setRadius] = useState<PixiePanelRadius>("medium");
    const [color, setColor] = useState<PixiePanelColor>("bleu-reperage");
    const [accentPosition, setAccentPosition] =
        useState<PixiePanelAccentPosition>("start");
    const [elevation, setElevation] = useState<PixiePanelElevation>("soft");
    const [dividers, setDividers] = useState<PixiePanelDividers>("both");
    const [scroll, setScroll] = useState<PixiePanelScroll>("none");
    const [showHeader, setShowHeader] = useState(true);
    const [showFooter, setShowFooter] = useState(true);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const optionalProps = [
        color ? `    color="${color}"` : null,
        accentPosition !== "start"
            ? `    accentPosition="${accentPosition}"`
            : null,
        elevation !== "none" ? `    elevation="${elevation}"` : null,
        dividers !== "none" ? `    dividers="${dividers}"` : null,
        headerPadding !== padding
            ? `    headerPadding="${headerPadding}"`
            : null,
        bodyPadding !== padding ? `    bodyPadding="${bodyPadding}"` : null,
        footerPadding !== padding
            ? `    footerPadding="${footerPadding}"`
            : null,
        scroll === "body" ? '    scroll="body"\n    maxHeight="28rem"' : null,
        showHeader ? "    header={<h2>Documents de production</h2>}" : null,
        showFooter
            ? '    footer={<PixieLink href="/sources">Voir les sources</PixieLink>}'
            : null,
    ].filter((line): line is string => line !== null);
    const code = `<PixiePanel
    as="${element}"
    variant="${variant}"
    padding="${padding}"
    radius="${radius}"${optionalProps.length > 0 ? `\n${optionalProps.join("\n")}` : ""}
>
    {/* Contenu de la section */}
</PixiePanel>`;

    function selectColor(value: string) {
        setColor(
            value === "theme" ? false : (value as AtelierAnimationColorSlug),
        );
    }

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="panel-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="panel-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target.value as PixiePanelElement,
                                    )
                                }
                                className="mt-2 font-mono"
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
                                        name="panel-variant"
                                        {...option}
                                        selectedValue={variant}
                                        onChange={setVariant}
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
                                        name="panel-padding"
                                        {...option}
                                        selectedValue={padding}
                                        onChange={setPadding}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Espacement par zone
                            </legend>
                            <div className="mt-3 grid gap-3">
                                {[
                                    {
                                        id: "header-padding",
                                        label: "Header",
                                        value: headerPadding,
                                        onChange: setHeaderPadding,
                                    },
                                    {
                                        id: "body-padding",
                                        label: "Corps",
                                        value: bodyPadding,
                                        onChange: setBodyPadding,
                                    },
                                    {
                                        id: "footer-padding",
                                        label: "Footer",
                                        value: footerPadding,
                                        onChange: setFooterPadding,
                                    },
                                ].map((control) => (
                                    <label
                                        key={control.id}
                                        htmlFor={`panel-${control.id}`}
                                        className="grid grid-cols-[4rem_1fr] items-center gap-3 text-sm text-ink-soft"
                                    >
                                        {control.label}
                                        <PixieSelect
                                            mode="popover"
                                            portal
                                            size="sm"
                                            id={`panel-${control.id}`}
                                            value={control.value}
                                            onChange={(event) =>
                                                control.onChange(
                                                    event.target
                                                        .value as PixiePanelPadding,
                                                )
                                            }
                                            className="min-w-0 border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                                        >
                                            {paddings.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </PixieSelect>
                                    </label>
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
                                        name="panel-radius"
                                        {...option}
                                        selectedValue={radius}
                                        onChange={setRadius}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="panel-accent-position"
                                className="text-sm font-medium text-ink"
                            >
                                Position de l’accent
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="panel-accent-position"
                                value={accentPosition}
                                onChange={(event) =>
                                    setAccentPosition(
                                        event.target
                                            .value as PixiePanelAccentPosition,
                                    )
                                }
                                className="mt-2"
                            >
                                {accentPositions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <div>
                            <label
                                htmlFor="panel-elevation"
                                className="text-sm font-medium text-ink"
                            >
                                Élévation
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="panel-elevation"
                                value={elevation}
                                onChange={(event) =>
                                    setElevation(
                                        event.target
                                            .value as PixiePanelElevation,
                                    )
                                }
                                className="mt-2"
                            >
                                {elevations.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <div>
                            <label
                                htmlFor="panel-dividers"
                                className="text-sm font-medium text-ink"
                            >
                                Séparateurs
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="panel-dividers"
                                value={dividers}
                                onChange={(event) =>
                                    setDividers(
                                        event.target
                                            .value as PixiePanelDividers,
                                    )
                                }
                                className="mt-2"
                            >
                                {dividersOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <div>
                            <label
                                htmlFor="panel-scroll"
                                className="text-sm font-medium text-ink"
                            >
                                Défilement
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="panel-scroll"
                                value={scroll}
                                onChange={(event) =>
                                    setScroll(
                                        event.target.value as PixiePanelScroll,
                                    )
                                }
                                className="mt-2"
                            >
                                {scrollOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <div>
                            <label
                                htmlFor="panel-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="panel-color"
                                value={color || "theme"}
                                onChange={(event) =>
                                    selectColor(event.target.value)
                                }
                                className="mt-2"
                            >
                                <option value="theme">Accent du thème</option>
                                {colorSlugs.map((slug) => (
                                    <option key={slug} value={slug}>
                                        {getAtelierAnimationColor(slug).label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <div className="space-y-3">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                                <input
                                    type="checkbox"
                                    checked={showHeader}
                                    onChange={(event) =>
                                        setShowHeader(event.target.checked)
                                    }
                                    className="accent-accent"
                                />
                                Afficher le header
                            </label>
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                                <input
                                    type="checkbox"
                                    checked={showFooter}
                                    onChange={(event) =>
                                        setShowFooter(event.target.checked)
                                    }
                                    className="accent-accent"
                                />
                                Afficher le footer
                            </label>
                        </div>
                    </div>
                </aside>

                <AtelierPlaygroundProjection>
                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[34rem] items-center justify-center overflow-auto bg-canvas p-8"
                    >
                        <div
                            className={`w-full transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <PixiePanel
                                as={element}
                                variant={variant}
                                padding={padding}
                                headerPadding={headerPadding}
                                bodyPadding={bodyPadding}
                                footerPadding={footerPadding}
                                radius={radius}
                                color={color}
                                accentPosition={accentPosition}
                                elevation={elevation}
                                dividers={dividers}
                                scroll={scroll}
                                maxHeight={
                                    scroll === "body" ? "28rem" : undefined
                                }
                                aria-label="Documents de production"
                                header={
                                    showHeader ? (
                                        <div>
                                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                                Registre de plateau
                                            </p>
                                            <h4 className="mt-2 text-2xl text-ink">
                                                Documents de production
                                            </h4>
                                        </div>
                                    ) : undefined
                                }
                                footer={
                                    showFooter ? (
                                        <PixieLink
                                            href="#pixie-panel-playground"
                                            variant="action"
                                            color={color}
                                            indicator="arrow"
                                        >
                                            Consulter les sources
                                        </PixieLink>
                                    ) : undefined
                                }
                            >
                                <p className="leading-7 text-ink-soft">
                                    Le panneau organise une zone durable de la
                                    page sans transformer son contenu en carte
                                    ni lui ajouter une interaction.
                                </p>
                                <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                                    <div className="border border-line p-4">
                                        <dt className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                                            État
                                        </dt>
                                        <dd className="mt-2 text-ink">
                                            En préparation
                                        </dd>
                                    </div>
                                    <div className="border border-line p-4">
                                        <dt className="text-xs font-eyebrow uppercase tracking-[0.14em] text-muted">
                                            Séquence
                                        </dt>
                                        <dd className="mt-2 text-ink">
                                            Projection 04
                                        </dd>
                                    </div>
                                </dl>
                                {scroll === "body" ? (
                                    <div className="mt-5 space-y-3">
                                        {Array.from(
                                            { length: 5 },
                                            (_, index) => (
                                                <p
                                                    key={index}
                                                    className="border-t border-line pt-3 text-sm leading-6 text-ink-soft"
                                                >
                                                    Note de production{" "}
                                                    {index + 1} · Le corps
                                                    poursuit seul son défilement
                                                    pendant que ses repères
                                                    restent en place.
                                                </p>
                                            ),
                                        )}
                                    </div>
                                ) : null}
                            </PixiePanel>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
