"use client";

import { PixieSelect } from "@/components/ui/PixieSelect";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { PixieCard } from "@/components/ui/PixieCard";
import {
    PixieDustRail,
    type PixieDustRailAlign,
    type PixieDustRailElement,
    type PixieDustRailGap,
    type PixieDustRailGapPreset,
    type PixieDustRailGutterPreset,
    type PixieDustRailItemWidth,
    type PixieDustRailItemWidthPreset,
    type PixieDustRailOverscroll,
    type PixieDustRailPeek,
    type PixieDustRailScrollbar,
    type PixieDustRailSnap,
    type PixieDustRailSnapAlign,
    type PixieDustRailSnapStop,
} from "@/components/ui/PixieDustRail";

const elements = ["div", "ul", "ol"] as const;

const itemWidths = [
    { value: "auto", label: "Naturelle" },
    { value: "xs", label: "Très petite · 12 rem" },
    { value: "sm", label: "Petite · 16 rem" },
    { value: "md", label: "Moyenne · 20 rem" },
    { value: "lg", label: "Grande · 24 rem" },
    { value: "xl", label: "Très grande · 30 rem" },
    { value: "custom", label: "Mesure libre" },
] as const;

const gaps = [
    { value: "none", label: "Aucun" },
    { value: "xs", label: "Très petit" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
    { value: "xl", label: "Très grand" },
    { value: "custom", label: "Mesure libre" },
] as const;

const gutters = [
    { value: "none", label: "Aucune" },
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
    { value: "custom", label: "Mesure libre" },
] as const;

const snaps = [
    { value: "none", label: "Libre" },
    { value: "proximity", label: "Proximité" },
    { value: "mandatory", label: "Obligatoire" },
] as const;

const snapAlignments = [
    { value: "start", label: "Début" },
    { value: "center", label: "Centre" },
    { value: "end", label: "Fin" },
] as const;

const peeks = [
    { value: "none", label: "Aucun" },
    { value: "subtle", label: "Subtil" },
    { value: "strong", label: "Marqué" },
] as const;

const scrollbars = [
    { value: "auto", label: "Native" },
    { value: "thin", label: "Fine" },
    { value: "hidden", label: "Masquée" },
] as const;

const alignments = [
    { value: "stretch", label: "Étiré" },
    { value: "start", label: "Début" },
    { value: "center", label: "Centre" },
    { value: "end", label: "Fin" },
] as const;

function formatValue(value: string | number) {
    return typeof value === "number" ? `{${value}}` : `"${value}"`;
}

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-3xl",
    large: "max-w-none",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const films = [
    ["1928", "Steamboat Willie", "Mickey trouve sa voix."],
    ["1929", "The Skeleton Dance", "La musique libère le dessin."],
    ["1932", "Flowers and Trees", "La couleur entre en scène."],
    ["1933", "Three Little Pigs", "Les personnages affirment leur jeu."],
    ["1935", "The Band Concert", "Mickey dirige son premier film en couleurs."],
    ["1937", "The Old Mill", "La caméra multiplane révèle sa profondeur."],
] as const;

function NumberControl({
    id,
    label,
    value,
    min,
    max,
    onChange,
}: Readonly<{
    id: string;
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}>) {
    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-ink">
                {label}
            </label>
            <input
                id={id}
                type="number"
                min={min}
                max={max}
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
                className="mt-2 w-full border border-line-strong bg-surface px-3 py-2 font-mono text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
        </div>
    );
}

function RailCard({
    year,
    title,
    description,
}: Readonly<{ year: string; title: string; description: string }>) {
    return (
        <PixieCard
            as="article"
            variant="outline"
            padding="md"
            className="h-full"
        >
            <p className="font-mono text-xs text-accent">{year}</p>
            <h5 className="mt-3 text-xl text-ink">{title}</h5>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
                {description}
            </p>
        </PixieCard>
    );
}

export function PixieDustRailPlayground() {
    const [element, setElement] = useState<PixieDustRailElement>("ul");
    const [itemWidthMode, setItemWidthMode] = useState<
        PixieDustRailItemWidthPreset | "custom"
    >("md");
    const [customItemWidth, setCustomItemWidth] = useState(280);
    const [gapMode, setGapMode] = useState<PixieDustRailGapPreset | "custom">(
        "md",
    );
    const [customGap, setCustomGap] = useState(18);
    const [gutterMode, setGutterMode] = useState<
        PixieDustRailGutterPreset | "custom"
    >("md");
    const [customGutter, setCustomGutter] = useState(24);
    const [peek, setPeek] = useState<PixieDustRailPeek>("subtle");
    const [snap, setSnap] = useState<PixieDustRailSnap>("proximity");
    const [snapAlign, setSnapAlign] = useState<PixieDustRailSnapAlign>("start");
    const [snapStop, setSnapStop] = useState<PixieDustRailSnapStop>("normal");
    const [align, setAlign] = useState<PixieDustRailAlign>("stretch");
    const [scrollbar, setScrollbar] = useState<PixieDustRailScrollbar>("auto");
    const [overscroll, setOverscroll] =
        useState<PixieDustRailOverscroll>("contain");
    const [itemCount, setItemCount] = useState(6);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const itemWidth: PixieDustRailItemWidth =
        itemWidthMode === "custom" ? customItemWidth : itemWidthMode;
    const gap: PixieDustRailGap = gapMode === "custom" ? customGap : gapMode;
    const gutter = gutterMode === "custom" ? customGutter : gutterMode;

    const selectedFilms = films.slice(0, itemCount);
    const childCode = selectedFilms
        .map(([, title]) =>
            element === "div"
                ? `    <Card>${title}</Card>`
                : `    <li><Card>${title}</Card></li>`,
        )
        .join("\n");
    const code = `<PixieDustRail
    as="${element}"
    itemWidth=${formatValue(itemWidth)}
    gap=${formatValue(gap)}
    gutter=${formatValue(gutter)}
    peek="${peek}"
    snap="${snap}"
    snapAlign="${snapAlign}"
    snapStop="${snapStop}"
    align="${align}"
    scrollbar="${scrollbar}"
    overscroll="${overscroll}"
    aria-label="Œuvres à découvrir"
>
${childCode}
</PixieDustRail>`;

    const renderedItems = selectedFilms.map(([year, title, description]) => {
        const card = (
            <RailCard year={year} title={title} description={description} />
        );

        return element === "div" ? (
            <div key={title}>{card}</div>
        ) : (
            <li key={title}>{card}</li>
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
                                htmlFor="rail-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="rail-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustRailElement,
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

                        {[
                            {
                                id: "rail-item-width",
                                label: "Largeur des plans",
                                value: itemWidthMode,
                                options: itemWidths,
                                onChange: (value: string) =>
                                    setItemWidthMode(
                                        value as
                                            | PixieDustRailItemWidthPreset
                                            | "custom",
                                    ),
                            },
                            {
                                id: "rail-gap",
                                label: "Espacement",
                                value: gapMode,
                                options: gaps,
                                onChange: (value: string) =>
                                    setGapMode(
                                        value as
                                            PixieDustRailGapPreset | "custom",
                                    ),
                            },
                            {
                                id: "rail-gutter",
                                label: "Gouttière",
                                value: gutterMode,
                                options: gutters,
                                onChange: (value: string) =>
                                    setGutterMode(
                                        value as
                                            | PixieDustRailGutterPreset
                                            | "custom",
                                    ),
                            },
                            {
                                id: "rail-peek",
                                label: "Hors-champ visible",
                                value: peek,
                                options: peeks,
                                onChange: (value: string) =>
                                    setPeek(value as PixieDustRailPeek),
                            },
                            {
                                id: "rail-snap",
                                label: "Force du point d’arrêt",
                                value: snap,
                                options: snaps,
                                onChange: (value: string) =>
                                    setSnap(value as PixieDustRailSnap),
                            },
                            {
                                id: "rail-snap-align",
                                label: "Alignement du point d’arrêt",
                                value: snapAlign,
                                options: snapAlignments,
                                onChange: (value: string) =>
                                    setSnapAlign(
                                        value as PixieDustRailSnapAlign,
                                    ),
                            },
                            {
                                id: "rail-align",
                                label: "Alignement transversal",
                                value: align,
                                options: alignments,
                                onChange: (value: string) =>
                                    setAlign(value as PixieDustRailAlign),
                            },
                            {
                                id: "rail-scrollbar",
                                label: "Barre de défilement",
                                value: scrollbar,
                                options: scrollbars,
                                onChange: (value: string) =>
                                    setScrollbar(
                                        value as PixieDustRailScrollbar,
                                    ),
                            },
                        ].map((control) => (
                            <div key={control.id}>
                                <label
                                    htmlFor={control.id}
                                    className="text-sm font-medium text-ink"
                                >
                                    {control.label}
                                </label>
                                <PixieSelect
                                    mode="popover"
                                    portal
                                    size="sm"
                                    id={control.id}
                                    value={control.value}
                                    onChange={(event) =>
                                        control.onChange(event.target.value)
                                    }
                                    className="mt-2"
                                >
                                    {control.options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </PixieSelect>
                            </div>
                        ))}

                        {itemWidthMode === "custom" ? (
                            <NumberControl
                                id="rail-item-width-custom"
                                label="Largeur libre en pixels"
                                value={customItemWidth}
                                min={120}
                                max={640}
                                onChange={setCustomItemWidth}
                            />
                        ) : null}
                        {gapMode === "custom" ? (
                            <NumberControl
                                id="rail-gap-custom"
                                label="Espacement libre en pixels"
                                value={customGap}
                                min={0}
                                max={96}
                                onChange={setCustomGap}
                            />
                        ) : null}
                        {gutterMode === "custom" ? (
                            <NumberControl
                                id="rail-gutter-custom"
                                label="Gouttière libre en pixels"
                                value={customGutter}
                                min={0}
                                max={128}
                                onChange={setCustomGutter}
                            />
                        ) : null}

                        <label className="flex items-start gap-3 text-sm text-ink-soft">
                            <input
                                type="checkbox"
                                checked={snapStop === "always"}
                                onChange={(event) =>
                                    setSnapStop(
                                        event.target.checked
                                            ? "always"
                                            : "normal",
                                    )
                                }
                                className="mt-1 accent-accent"
                            />
                            Arrêter le geste sur chaque plan
                        </label>

                        <label className="flex items-start gap-3 text-sm text-ink-soft">
                            <input
                                type="checkbox"
                                checked={overscroll === "contain"}
                                onChange={(event) =>
                                    setOverscroll(
                                        event.target.checked
                                            ? "contain"
                                            : "auto",
                                    )
                                }
                                className="mt-1 accent-accent"
                            />
                            Contenir le geste dans la piste
                        </label>

                        <div>
                            <label
                                htmlFor="rail-item-count"
                                className="text-sm font-medium text-ink"
                            >
                                Éléments sur le plateau
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="rail-item-count"
                                value={itemCount}
                                onChange={(event) =>
                                    setItemCount(Number(event.target.value))
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
                    </div>
                </aside>

                <AtelierPlaygroundProjection>
                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[40rem] items-center justify-center overflow-auto bg-canvas p-4 sm:p-8"
                    >
                        <div
                            className={`w-full min-w-0 border border-dashed border-line-strong py-6 transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <PixieDustRail
                                as={element}
                                itemWidth={itemWidth}
                                gap={gap}
                                gutter={gutter}
                                snap={snap}
                                snapAlign={snapAlign}
                                snapStop={snapStop}
                                align={align}
                                peek={peek}
                                scrollbar={scrollbar}
                                overscroll={overscroll}
                                aria-label="Œuvres à découvrir"
                                className={
                                    element === "div" ? "" : "m-0 list-none"
                                }
                            >
                                {renderedItems}
                            </PixieDustRail>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
