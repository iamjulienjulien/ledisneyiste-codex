"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieGrid } from "@/components/ui/PixieGrid";
import {
    PixieDustSidebar,
    type PixieDustSidebarAlign,
    type PixieDustSidebarContentMinWidth,
    type PixieDustSidebarElement,
    type PixieDustSidebarGap,
    type PixieDustSidebarSide,
    type PixieDustSidebarSideWidth,
} from "@/components/ui/PixieDustSidebar";
import { PixieStack } from "@/components/ui/PixieStack";

const elements = ["div", "section", "article"] as const;

const sides = [
    { value: "start", label: "Début" },
    { value: "end", label: "Fin" },
] as const;

const sideWidths = [
    { value: "xs", label: "Très petite" },
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
] as const;

const contentWidths = [
    { value: "half", label: "Moitié" },
    { value: "two-thirds", label: "Deux tiers" },
    { value: "three-quarters", label: "Trois quarts" },
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

const archiveTitles = [
    "Steamboat Willie",
    "The Skeleton Dance",
    "Flowers and Trees",
    "Three Little Pigs",
] as const;

export function PixieDustSidebarPlayground() {
    const [element, setElement] = useState<PixieDustSidebarElement>("section");
    const [side, setSide] = useState<PixieDustSidebarSide>("start");
    const [sideWidth, setSideWidth] = useState<PixieDustSidebarSideWidth>("md");
    const [contentMinWidth, setContentMinWidth] =
        useState<PixieDustSidebarContentMinWidth>("two-thirds");
    const [gap, setGap] = useState<PixieDustSidebarGap>("xl");
    const [align, setAlign] = useState<PixieDustSidebarAlign>("start");
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const labelledBy =
        element === "div" ? "" : '    aria-labelledby="sidebar-heading"\n';
    const panes =
        side === "start"
            ? `    <aside>{/* Régie latérale */}</aside>
    <section>{/* Contenu principal */}</section>`
            : `    <section>{/* Contenu principal */}</section>
    <aside>{/* Régie latérale */}</aside>`;
    const code = `<PixieDustSidebar
    as="${element}"
    side="${side}"
    sideWidth="${sideWidth}"
    contentMinWidth="${contentMinWidth}"
    gap="${gap}"
    align="${align}"
${labelledBy}>
${panes}
</PixieDustSidebar>`;

    const sidebarPane = (
        <aside
            aria-labelledby="sidebar-preview-filters"
            className="border border-line bg-surface-muted p-5"
        >
            <h5 id="sidebar-preview-filters" className="text-xl text-ink">
                Régie des archives
            </h5>
            <fieldset className="mt-5">
                <legend className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                    Séries
                </legend>
                <PixieStack gap="xs" className="mt-3">
                    {["Mickey Mouse", "Silly Symphonies", "Oswald"].map(
                        (label, index) => (
                            <label
                                key={label}
                                className="flex items-center gap-3 text-sm text-ink-soft"
                            >
                                <input
                                    type="checkbox"
                                    defaultChecked={index === 0}
                                    className="accent-accent"
                                />
                                {label}
                            </label>
                        ),
                    )}
                </PixieStack>
            </fieldset>
        </aside>
    );

    const contentPane = (
        <section aria-labelledby="sidebar-preview-results" className="min-w-0">
            <PixieStack gap="md">
                <div>
                    <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                        Contenu principal
                    </p>
                    <h5
                        id="sidebar-preview-results"
                        className="mt-2 text-3xl text-ink"
                    >
                        Quatre archives à projeter
                    </h5>
                </div>
                <PixieGrid maxColumns={2} minItemWidth="sm" gap="sm">
                    {archiveTitles.map((title, index) => (
                        <PixieCard
                            key={title}
                            as="article"
                            variant="outline"
                            padding="md"
                        >
                            <p className="font-mono text-xs text-accent">
                                19{28 + index}
                            </p>
                            <h6 className="mt-2 text-lg text-ink">{title}</h6>
                        </PixieCard>
                    ))}
                </PixieGrid>
            </PixieStack>
        </section>
    );

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="sidebar-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <select
                                id="sidebar-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustSidebarElement,
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
                                Position de la régie
                            </legend>
                            <div className="mt-3 space-y-2">
                                {sides.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="sidebar-side"
                                        {...option}
                                        selectedValue={side}
                                        onChange={setSide}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Largeur de la régie
                            </legend>
                            <div className="mt-3 space-y-2">
                                {sideWidths.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="sidebar-side-width"
                                        {...option}
                                        selectedValue={sideWidth}
                                        onChange={setSideWidth}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Protection du contenu
                            </legend>
                            <div className="mt-3 space-y-2">
                                {contentWidths.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="sidebar-content-width"
                                        {...option}
                                        selectedValue={contentMinWidth}
                                        onChange={setContentMinWidth}
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
                                        name="sidebar-gap"
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
                                        name="sidebar-align"
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
                        className="flex min-h-[52rem] items-center justify-center overflow-auto bg-canvas p-4 sm:p-8"
                    >
                        <div
                            className={`w-full border border-dashed border-line-strong p-5 transition-[max-width] sm:p-7 ${frameWidths[frame]}`}
                        >
                            <PixieDustSidebar
                                as={element}
                                side={side}
                                sideWidth={sideWidth}
                                contentMinWidth={contentMinWidth}
                                gap={gap}
                                align={align}
                                aria-labelledby={
                                    element === "div"
                                        ? undefined
                                        : "sidebar-preview-heading"
                                }
                            >
                                {side === "start" ? sidebarPane : contentPane}
                                {side === "start" ? contentPane : sidebarPane}
                            </PixieDustSidebar>
                            {element === "div" ? null : (
                                <span
                                    id="sidebar-preview-heading"
                                    className="sr-only"
                                >
                                    Archives et régie latérale
                                </span>
                            )}
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
