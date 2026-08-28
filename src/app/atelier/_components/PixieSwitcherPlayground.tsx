"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { PixieCard } from "@/components/ui/PixieCard";
import {
    PixieSwitcher,
    type PixieSwitcherAlign,
    type PixieSwitcherElement,
    type PixieSwitcherGap,
    type PixieSwitcherLayout,
    type PixieSwitcherLimit,
    type PixieSwitcherThreshold,
} from "@/components/ui/PixieSwitcher";
import { PixieSelect } from "@/components/ui/PixieSelect";

type PixieSwitcherItemCount = Exclude<PixieSwitcherLimit, false>;
type PixieSwitcherGapOverride = "inherit" | PixieSwitcherGap;

const elements = ["div", "section", "nav", "ul", "ol"] as const;

const layouts = [
    { value: "auto", label: "Automatique" },
    { value: "row", label: "Rangée imposée" },
    { value: "stack", label: "Pile imposée" },
] as const;

const thresholds = [
    { value: "xs", label: "Très petit · 30 rem" },
    { value: "sm", label: "Petit · 40 rem" },
    { value: "md", label: "Moyen · 50 rem" },
    { value: "lg", label: "Grand · 60 rem" },
    { value: "xl", label: "Très grand · 72 rem" },
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
    compact: "max-w-sm",
    moyen: "max-w-3xl",
    large: "max-w-none",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const items = [
    ["Personnages", "Les figures qui peuplent les récits Disney."],
    ["Créateurs", "Celles et ceux qui ont façonné les images."],
    ["Œuvres", "Les films où les imaginaires prennent vie."],
    ["Époques", "Les grandes périodes traversées par le studio."],
    ["Récompenses", "Les trophées qui jalonnent la projection."],
    ["Sources", "Les documents qui soutiennent les archives."],
] as const;

function SwitcherItem({
    title,
    description,
    index,
}: Readonly<{ title: string; description: string; index: number }>) {
    return (
        <PixieCard as="article" variant="outline" padding="md">
            <p className="font-mono text-xs text-accent">
                Plan {String(index + 1).padStart(2, "0")}
            </p>
            <h5 className="mt-3 text-xl text-ink">{title}</h5>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
                {description}
            </p>
        </PixieCard>
    );
}

export function PixieSwitcherPlayground() {
    const [element, setElement] = useState<PixieSwitcherElement>("div");
    const [layout, setLayout] = useState<PixieSwitcherLayout>("auto");
    const [threshold, setThreshold] = useState<PixieSwitcherThreshold>("md");
    const [limit, setLimit] = useState<PixieSwitcherLimit>(4);
    const [gap, setGap] = useState<PixieSwitcherGap>("md");
    const [rowGap, setRowGap] = useState<PixieSwitcherGapOverride>("inherit");
    const [columnGap, setColumnGap] =
        useState<PixieSwitcherGapOverride>("inherit");
    const [align, setAlign] = useState<PixieSwitcherAlign>("stretch");
    const [itemCount, setItemCount] = useState<PixieSwitcherItemCount>(4);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const selectedItems = items.slice(0, itemCount);
    const listElement = element === "ul" || element === "ol";
    const childCode = selectedItems
        .map(([title]) =>
            listElement
                ? `    <li><Card>${title}</Card></li>`
                : `    <Card>${title}</Card>`,
        )
        .join("\n");
    const settings = [
        `    as="${element}"`,
        `    layout="${layout}"`,
        ...(layout === "auto"
            ? [
                  `    threshold="${threshold}"`,
                  `    limit={${limit === false ? "false" : limit}}`,
              ]
            : []),
        `    gap="${gap}"`,
        ...(rowGap === "inherit" ? [] : [`    rowGap="${rowGap}"`]),
        ...(columnGap === "inherit" ? [] : [`    columnGap="${columnGap}"`]),
        `    align="${align}"`,
        ...(element === "nav" ? ['    aria-label="Explorer le Codex"'] : []),
    ].join("\n");
    const code = `<PixieSwitcher\n${settings}\n>\n${childCode}\n</PixieSwitcher>`;

    const renderedItems = selectedItems.map(([title, description], index) => {
        const item = (
            <SwitcherItem
                title={title}
                description={description}
                index={index}
            />
        );

        return listElement ? (
            <li key={title}>{item}</li>
        ) : (
            <div key={title}>{item}</div>
        );
    });

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="switcher-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="switcher-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieSwitcherElement,
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
                                htmlFor="switcher-layout"
                                className="text-sm font-medium text-ink"
                            >
                                Disposition
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="switcher-layout"
                                value={layout}
                                onChange={(event) =>
                                    setLayout(
                                        event.target
                                            .value as PixieSwitcherLayout,
                                    )
                                }
                                className="mt-2"
                            >
                                {layouts.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <fieldset
                            disabled={layout !== "auto"}
                            className={layout === "auto" ? "" : "opacity-45"}
                        >
                            <legend className="text-sm font-medium text-ink">
                                Seuil de bascule
                            </legend>
                            <div className="mt-3 space-y-2">
                                {thresholds.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="switcher-threshold"
                                        {...option}
                                        selectedValue={threshold}
                                        onChange={setThreshold}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div className={layout === "auto" ? "" : "opacity-45"}>
                            <label
                                htmlFor="switcher-limit"
                                className="text-sm font-medium text-ink"
                            >
                                Limite sur une ligne
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="switcher-limit"
                                value={limit === false ? "none" : String(limit)}
                                disabled={layout !== "auto"}
                                onChange={(event) =>
                                    setLimit(
                                        event.target.value === "none"
                                            ? false
                                            : (Number(
                                                  event.target.value,
                                              ) as PixieSwitcherItemCount),
                                    )
                                }
                                className="mt-2 font-mono"
                            >
                                <option value="none">Sans limite</option>
                                {[2, 3, 4, 5, 6].map((value) => (
                                    <option key={value} value={value}>
                                        {value} éléments
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <div>
                            <label
                                htmlFor="switcher-item-count"
                                className="text-sm font-medium text-ink"
                            >
                                Éléments sur le plateau
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="switcher-item-count"
                                value={itemCount}
                                onChange={(event) =>
                                    setItemCount(
                                        Number(
                                            event.target.value,
                                        ) as PixieSwitcherItemCount,
                                    )
                                }
                                className="mt-2 font-mono"
                            >
                                {[2, 3, 4, 5, 6].map((value) => (
                                    <option key={value} value={value}>
                                        {value} éléments
                                    </option>
                                ))}
                            </PixieSelect>
                            <p className="mt-2 text-xs leading-5 text-muted">
                                Réglage propre au plateau, absent de l’API.
                            </p>
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Espacement commun
                            </legend>
                            <div className="mt-3 space-y-2">
                                {gaps.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="switcher-gap"
                                        {...option}
                                        selectedValue={gap}
                                        onChange={setGap}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="switcher-row-gap"
                                className="text-sm font-medium text-ink"
                            >
                                Espacement vertical
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="switcher-row-gap"
                                value={rowGap}
                                onChange={(event) =>
                                    setRowGap(
                                        event.target
                                            .value as PixieSwitcherGapOverride,
                                    )
                                }
                                className="mt-2"
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
                                htmlFor="switcher-column-gap"
                                className="text-sm font-medium text-ink"
                            >
                                Espacement horizontal
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="switcher-column-gap"
                                value={columnGap}
                                onChange={(event) =>
                                    setColumnGap(
                                        event.target
                                            .value as PixieSwitcherGapOverride,
                                    )
                                }
                                className="mt-2"
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
                                Alignement vertical
                            </legend>
                            <div className="mt-3 space-y-2">
                                {alignments.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="switcher-align"
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
                        className="flex min-h-[44rem] items-center justify-center overflow-auto bg-canvas p-4 sm:p-8"
                    >
                        <div
                            className={`w-full border border-dashed border-line-strong p-5 transition-[max-width] sm:p-7 ${frameWidths[frame]}`}
                        >
                            <PixieSwitcher
                                as={element}
                                layout={layout}
                                threshold={threshold}
                                limit={limit}
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
                                aria-label={
                                    element === "nav"
                                        ? "Explorer le Codex"
                                        : undefined
                                }
                                className={listElement ? "list-none p-0" : ""}
                            >
                                {renderedItems}
                            </PixieSwitcher>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
