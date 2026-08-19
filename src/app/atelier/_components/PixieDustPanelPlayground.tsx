"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieDustPanel,
    type PixieDustPanelColor,
    type PixieDustPanelElement,
    type PixieDustPanelPadding,
    type PixieDustPanelRadius,
    type PixieDustPanelVariant,
} from "@/components/ui/PixieDustPanel";
import { PixieLink } from "@/components/ui/PixieLink";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "surface", label: "Surface" },
    { value: "outline", label: "Contour" },
    { value: "inset", label: "Creusé" },
    { value: "accent", label: "Accent" },
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

const elements = ["div", "section", "aside"] as const;
const colorSlugs = getAtelierAnimationColorSlugs();

const frameWidths = {
    compact: "max-w-md",
    moyen: "max-w-2xl",
    large: "max-w-4xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

export function PixieDustPanelPlayground() {
    const [element, setElement] = useState<PixieDustPanelElement>("section");
    const [variant, setVariant] = useState<PixieDustPanelVariant>("accent");
    const [padding, setPadding] = useState<PixieDustPanelPadding>("lg");
    const [radius, setRadius] = useState<PixieDustPanelRadius>("medium");
    const [color, setColor] = useState<PixieDustPanelColor>("bleu-reperage");
    const [dividers, setDividers] = useState(true);
    const [showHeader, setShowHeader] = useState(true);
    const [showFooter, setShowFooter] = useState(true);
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const optionalProps = [
        color ? `    color="${color}"` : null,
        dividers ? "    dividers" : null,
        showHeader ? "    header={<h2>Documents de production</h2>}" : null,
        showFooter
            ? '    footer={<PixieLink href="/sources">Voir les sources</PixieLink>}'
            : null,
    ].filter((line): line is string => line !== null);
    const code = `<PixieDustPanel
    as="${element}"
    variant="${variant}"
    padding="${padding}"
    radius="${radius}"${optionalProps.length > 0 ? `\n${optionalProps.join("\n")}` : ""}
>
    {/* Contenu de la section */}
</PixieDustPanel>`;

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
                                htmlFor="panel-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <select
                                id="panel-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustPanelElement,
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
                                htmlFor="panel-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur
                            </label>
                            <select
                                id="panel-color"
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
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                                <input
                                    type="checkbox"
                                    checked={dividers}
                                    onChange={(event) =>
                                        setDividers(event.target.checked)
                                    }
                                    className="accent-accent"
                                />
                                Séparer les zones
                            </label>
                        </div>
                    </div>
                </aside>

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="panel"
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
                            <PixieDustPanel
                                as={element}
                                variant={variant}
                                padding={padding}
                                radius={radius}
                                color={color}
                                dividers={dividers}
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
                                            href="#pixie-dust-panel-playground"
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
                            </PixieDustPanel>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
