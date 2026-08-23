"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import { PixieDustCard } from "@/components/ui/PixieDustCard";
import {
    PixieDustGrid,
    type PixieDustGridAlign,
    type PixieDustGridColumns,
    type PixieDustGridElement,
    type PixieDustGridGap,
    type PixieDustGridMinItemWidth,
} from "@/components/ui/PixieDustGrid";

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

const frameWidths = {
    compact: "max-w-md",
    moyen: "max-w-3xl",
    large: "max-w-6xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const previewItems = [
    ["1928", "Steamboat Willie", "Le son rejoint Mickey"],
    ["1929", "The Skeleton Dance", "La musique libère le mouvement"],
    ["1932", "Flowers and Trees", "La couleur entre dans le récit"],
    ["1933", "Three Little Pigs", "Les personnages trouvent leur voix"],
    ["1935", "The Band Concert", "Mickey dirige la couleur"],
] as const;

export function PixieDustGridPlayground() {
    const [element, setElement] = useState<PixieDustGridElement>("ul");
    const [columns, setColumns] = useState<PixieDustGridColumns>(3);
    const [minItemWidth, setMinItemWidth] =
        useState<PixieDustGridMinItemWidth>("md");
    const [gap, setGap] = useState<PixieDustGridGap>("md");
    const [align, setAlign] = useState<PixieDustGridAlign>("stretch");
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const itemOpening =
        element === "div" ? "    <Card />" : "    <li><Card /></li>";
    const code = `<PixieDustGrid
    as="${element}"
    columns={${columns}}
    minItemWidth="${minItemWidth}"
    gap="${gap}"
    align="${align}"
>
${itemOpening}
    {/* … */}
</PixieDustGrid>`;

    return (
        <div className="overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="grid-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <select
                                id="grid-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustGridElement,
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

                        <div>
                            <label
                                htmlFor="grid-columns"
                                className="text-sm font-medium text-ink"
                            >
                                Colonnes maximales
                            </label>
                            <select
                                id="grid-columns"
                                value={columns}
                                onChange={(event) =>
                                    setColumns(
                                        Number(
                                            event.target.value,
                                        ) as PixieDustGridColumns,
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 font-mono text-sm text-ink"
                            >
                                {[1, 2, 3, 4, 5, 6].map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
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
                                Espacement
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

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="grid"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[48rem] items-center justify-center overflow-auto bg-canvas p-4 sm:p-8"
                    >
                        <div
                            className={`w-full border border-dashed border-line-strong p-4 transition-[max-width] sm:p-6 ${frameWidths[frame]}`}
                        >
                            <PixieDustGrid
                                as={element}
                                columns={columns}
                                minItemWidth={minItemWidth}
                                gap={gap}
                                align={align}
                                aria-label={
                                    element === "div"
                                        ? undefined
                                        : "Œuvres de la projection"
                                }
                            >
                                {previewItems.map(
                                    ([year, title, description]) => {
                                        const card = (
                                            <PixieDustCard
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
                                            </PixieDustCard>
                                        );

                                        return element === "div" ? (
                                            <div key={title}>{card}</div>
                                        ) : (
                                            <li key={title}>{card}</li>
                                        );
                                    },
                                )}
                            </PixieDustGrid>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
