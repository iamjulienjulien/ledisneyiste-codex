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
    PixieDustSwitcher,
    type PixieDustSwitcherAlign,
    type PixieDustSwitcherElement,
    type PixieDustSwitcherGap,
    type PixieDustSwitcherLimit,
    type PixieDustSwitcherThreshold,
} from "@/components/ui/PixieDustSwitcher";

const elements = ["div", "ul", "ol"] as const;

const thresholds = [
    { value: "xs", label: "Très petit · 30 rem" },
    { value: "sm", label: "Petit · 40 rem" },
    { value: "md", label: "Moyen · 50 rem" },
    { value: "lg", label: "Grand · 60 rem" },
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

export function PixieDustSwitcherPlayground() {
    const [element, setElement] = useState<PixieDustSwitcherElement>("div");
    const [threshold, setThreshold] =
        useState<PixieDustSwitcherThreshold>("md");
    const [limit, setLimit] = useState<PixieDustSwitcherLimit>(4);
    const [gap, setGap] = useState<PixieDustSwitcherGap>("md");
    const [align, setAlign] = useState<PixieDustSwitcherAlign>("stretch");
    const [itemCount, setItemCount] = useState<PixieDustSwitcherLimit>(4);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const selectedItems = items.slice(0, itemCount);
    const childCode = selectedItems
        .map(([title]) =>
            element === "div"
                ? `    <Card>${title}</Card>`
                : `    <li><Card>${title}</Card></li>`,
        )
        .join("\n");
    const code = `<PixieDustSwitcher
    as="${element}"
    threshold="${threshold}"
    limit={${limit}}
    gap="${gap}"
    align="${align}"
>
${childCode}
</PixieDustSwitcher>`;

    const renderedItems = selectedItems.map(([title, description], index) => {
        const item = (
            <SwitcherItem
                title={title}
                description={description}
                index={index}
            />
        );

        return element === "div" ? (
            <div key={title}>{item}</div>
        ) : (
            <li key={title}>{item}</li>
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
                            <select
                                id="switcher-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustSwitcherElement,
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

                        <div>
                            <label
                                htmlFor="switcher-limit"
                                className="text-sm font-medium text-ink"
                            >
                                Limite sur une ligne
                            </label>
                            <select
                                id="switcher-limit"
                                value={limit}
                                onChange={(event) =>
                                    setLimit(
                                        Number(
                                            event.target.value,
                                        ) as PixieDustSwitcherLimit,
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 font-mono text-sm text-ink"
                            >
                                {[2, 3, 4, 5, 6].map((value) => (
                                    <option key={value} value={value}>
                                        {value} éléments
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="switcher-item-count"
                                className="text-sm font-medium text-ink"
                            >
                                Éléments sur le plateau
                            </label>
                            <select
                                id="switcher-item-count"
                                value={itemCount}
                                onChange={(event) =>
                                    setItemCount(
                                        Number(
                                            event.target.value,
                                        ) as PixieDustSwitcherLimit,
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 font-mono text-sm text-ink"
                            >
                                {[2, 3, 4, 5, 6].map((value) => (
                                    <option key={value} value={value}>
                                        {value} éléments
                                    </option>
                                ))}
                            </select>
                            <p className="mt-2 text-xs leading-5 text-muted">
                                Réglage propre au plateau, absent de l’API.
                            </p>
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Espacement
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
                            <PixieDustSwitcher
                                as={element}
                                threshold={threshold}
                                limit={limit}
                                gap={gap}
                                align={align}
                                className={
                                    element === "div" ? "" : "list-none p-0"
                                }
                            >
                                {renderedItems}
                            </PixieDustSwitcher>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
