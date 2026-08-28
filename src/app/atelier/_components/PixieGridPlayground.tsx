"use client";

import { PixieSelect } from "@/components/ui/PixieSelect";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { PixieCard } from "@/components/ui/PixieCard";
import {
    PixieGrid,
    type PixieGridAlign,
    type PixieGridDistribution,
    type PixieGridElement,
    type PixieGridGap,
    type PixieGridJustify,
    type PixieGridMaxColumns,
    type PixieGridMinItemWidth,
} from "@/components/ui/PixieGrid";

const elements = ["div", "ul", "ol"] as const;

const widths = [
    { value: "xs", label: "Très petite" },
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
] as const;

const gaps = [
    { value: "none", label: "Aucun" },
    { value: "xs", label: "Très petit" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
    { value: "xl", label: "Très grand" },
] as const;

const alignments = [
    { value: "stretch", label: "Étiré" },
    { value: "start", label: "Début" },
    { value: "center", label: "Centre" },
    { value: "end", label: "Fin" },
] as const;

const justifications = [
    { value: "stretch", label: "Étiré" },
    { value: "start", label: "Début" },
    { value: "center", label: "Centre" },
    { value: "end", label: "Fin" },
] as const;

const distributions = [
    { value: "fit", label: "Ajustée" },
    { value: "fill", label: "Réservée" },
] as const;

type GapOverride = PixieGridGap | "inherit";

const frameWidths = {
    compact: "max-w-md",
    moyen: "max-w-3xl",
    large: "max-w-none",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const previewItems = [
    ["1928", "Steamboat Willie", "Le son rejoint Mickey"],
    ["1929", "The Skeleton Dance", "La musique libère le mouvement"],
    ["1932", "Flowers and Trees", "La couleur entre dans le récit"],
    ["1933", "Three Little Pigs", "Les personnages trouvent leur voix"],
    ["1935", "The Band Concert", "Mickey dirige la couleur"],
] as const;

export function PixieGridPlayground() {
    const [element, setElement] = useState<PixieGridElement>("ul");
    const [maxColumns, setMaxColumns] = useState<PixieGridMaxColumns>(3);
    const [minItemWidth, setMinItemWidth] =
        useState<PixieGridMinItemWidth>("md");
    const [gap, setGap] = useState<PixieGridGap>("md");
    const [rowGap, setRowGap] = useState<GapOverride>("inherit");
    const [columnGap, setColumnGap] = useState<GapOverride>("inherit");
    const [align, setAlign] = useState<PixieGridAlign>("stretch");
    const [justify, setJustify] = useState<PixieGridJustify>("stretch");
    const [distribution, setDistribution] =
        useState<PixieGridDistribution>("fit");
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const itemOpening =
        element === "div" ? "    <Card />" : "    <li><Card /></li>";
    const rowGapLine = rowGap === "inherit" ? "" : `\n    rowGap="${rowGap}"`;
    const columnGapLine =
        columnGap === "inherit" ? "" : `\n    columnGap="${columnGap}"`;
    const code = `<PixieGrid
    as="${element}"
    maxColumns={${maxColumns}}
    minItemWidth="${minItemWidth}"
    gap="${gap}"${rowGapLine}${columnGapLine}
    align="${align}"
    justify="${justify}"
    distribution="${distribution}"
>
${itemOpening}
    {/* … */}
</PixieGrid>`;

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="grid-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="grid-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target.value as PixieGridElement,
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

                        <div>
                            <label
                                htmlFor="grid-max-columns"
                                className="text-sm font-medium text-ink"
                            >
                                Colonnes maximales
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="grid-max-columns"
                                value={maxColumns}
                                onChange={(event) =>
                                    setMaxColumns(
                                        Number(
                                            event.target.value,
                                        ) as PixieGridMaxColumns,
                                    )
                                }
                                className="mt-2 font-mono"
                            >
                                {[1, 2, 3, 4, 5, 6].map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Largeur minimale
                            </legend>
                            <div className="mt-3 space-y-2">
                                {widths.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="grid-min-item-width"
                                        {...option}
                                        selectedValue={minItemWidth}
                                        onChange={setMinItemWidth}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Espacement commun
                            </legend>
                            <div className="mt-3 space-y-2">
                                {gaps.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="grid-gap"
                                        {...option}
                                        selectedValue={gap}
                                        onChange={setGap}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="grid-row-gap"
                                className="text-sm font-medium text-ink"
                            >
                                Intervalle des rangées
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="grid-row-gap"
                                value={rowGap}
                                onChange={(event) =>
                                    setRowGap(event.target.value as GapOverride)
                                }
                                className="mt-2 font-mono"
                            >
                                <option value="inherit">Hériter de gap</option>
                                {gaps.map((option) => (
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
                                htmlFor="grid-column-gap"
                                className="text-sm font-medium text-ink"
                            >
                                Intervalle des colonnes
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="grid-column-gap"
                                value={columnGap}
                                onChange={(event) =>
                                    setColumnGap(
                                        event.target.value as GapOverride,
                                    )
                                }
                                className="mt-2 font-mono"
                            >
                                <option value="inherit">Hériter de gap</option>
                                {gaps.map((option) => (
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
                                Alignement horizontal
                            </legend>
                            <div className="mt-3 space-y-2">
                                {justifications.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="grid-justify"
                                        {...option}
                                        selectedValue={justify}
                                        onChange={setJustify}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Dernière rangée
                            </legend>
                            <div className="mt-3 space-y-2">
                                {distributions.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="grid-distribution"
                                        {...option}
                                        selectedValue={distribution}
                                        onChange={setDistribution}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Alignement vertical
                            </legend>
                            <div className="mt-3 space-y-2">
                                {alignments.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="grid-align"
                                        {...option}
                                        selectedValue={align}
                                        onChange={setAlign}
                                    />
                                ))}
                            </div>
                        </fieldset>
                    </div>
                </aside>

                <AtelierPlaygroundProjection>
                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[48rem] items-center justify-center overflow-auto bg-canvas p-4 sm:p-8"
                    >
                        <div
                            className={`w-full border border-dashed border-line-strong p-4 transition-[max-width] sm:p-6 ${frameWidths[frame]}`}
                        >
                            <PixieGrid
                                as={element}
                                maxColumns={maxColumns}
                                minItemWidth={minItemWidth}
                                gap={gap}
                                rowGap={
                                    rowGap === "inherit" ? undefined : rowGap
                                }
                                columnGap={
                                    columnGap === "inherit"
                                        ? undefined
                                        : columnGap
                                }
                                align={align}
                                justify={justify}
                                distribution={distribution}
                                aria-label={
                                    element === "div"
                                        ? undefined
                                        : "Œuvres de la projection"
                                }
                            >
                                {previewItems.map(
                                    ([year, title, description]) => {
                                        const card = (
                                            <PixieCard
                                                as="article"
                                                variant="outline"
                                                padding="md"
                                                className="h-full"
                                            >
                                                <p className="font-mono text-xs text-accent">
                                                    {year}
                                                </p>
                                                <h5 className="mt-2 text-xl text-ink">
                                                    {title}
                                                </h5>
                                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                                    {description}
                                                </p>
                                            </PixieCard>
                                        );

                                        return element === "div" ? (
                                            <div key={title}>{card}</div>
                                        ) : (
                                            <li key={title}>{card}</li>
                                        );
                                    },
                                )}
                            </PixieGrid>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
