"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import { PixieDustCard } from "@/components/ui/PixieDustCard";
import {
    PixieDustRail,
    type PixieDustRailAlign,
    type PixieDustRailElement,
    type PixieDustRailGap,
    type PixieDustRailGutter,
    type PixieDustRailItemWidth,
    type PixieDustRailSnap,
} from "@/components/ui/PixieDustRail";

const elements = ["div", "ul", "ol"] as const;

const itemWidths = [
    { value: "xs", label: "Très petite · 12 rem" },
    { value: "sm", label: "Petite · 16 rem" },
    { value: "md", label: "Moyenne · 20 rem" },
    { value: "lg", label: "Grande · 24 rem" },
    { value: "xl", label: "Très grande · 30 rem" },
] as const;

const gaps = [
    { value: "none", label: "Aucun" },
    { value: "xs", label: "Très petit" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
    { value: "xl", label: "Très grand" },
] as const;

const gutters = [
    { value: "none", label: "Aucune" },
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
] as const;

const snaps = [
    { value: "none", label: "Libre" },
    { value: "start", label: "Début" },
    { value: "center", label: "Centre" },
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
    large: "max-w-6xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const films = [
    ["1928", "Steamboat Willie", "Mickey trouve sa voix."],
    ["1929", "The Skeleton Dance", "La musique libère le dessin."],
    ["1932", "Flowers and Trees", "La couleur entre en scène."],
    ["1933", "Three Little Pigs", "Les personnages affirment leur jeu."],
    ["1935", "The Band Concert", "Mickey dirige son premier film en couleurs."],
    ["1937", "The Old Mill", "La caméra multiplane révèle sa profondeur."],
] as const;

function RailCard({
    year,
    title,
    description,
}: Readonly<{ year: string; title: string; description: string }>) {
    return (
        <PixieDustCard
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
        </PixieDustCard>
    );
}

export function PixieDustRailPlayground() {
    const [element, setElement] = useState<PixieDustRailElement>("ul");
    const [itemWidth, setItemWidth] = useState<PixieDustRailItemWidth>("md");
    const [gap, setGap] = useState<PixieDustRailGap>("md");
    const [gutter, setGutter] = useState<PixieDustRailGutter>("md");
    const [snap, setSnap] = useState<PixieDustRailSnap>("start");
    const [align, setAlign] = useState<PixieDustRailAlign>("stretch");
    const [peek, setPeek] = useState(true);
    const [itemCount, setItemCount] = useState(6);
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

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
    itemWidth="${itemWidth}"
    gap="${gap}"
    gutter="${gutter}"
    snap="${snap}"
    align="${align}"
    peek={${peek}}
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
        <div className="overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="rail-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <select
                                id="rail-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustRailElement,
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
                                Largeur des plans
                            </legend>
                            <div className="mt-3 space-y-2">
                                {itemWidths.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="rail-item-width"
                                        {...option}
                                        selectedValue={itemWidth}
                                        onChange={setItemWidth}
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
                                        name="rail-gap"
                                        {...option}
                                        selectedValue={gap}
                                        onChange={setGap}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Gouttière
                            </legend>
                            <div className="mt-3 space-y-2">
                                {gutters.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="rail-gutter"
                                        {...option}
                                        selectedValue={gutter}
                                        onChange={setGutter}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Point d’arrêt
                            </legend>
                            <div className="mt-3 space-y-2">
                                {snaps.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="rail-snap"
                                        {...option}
                                        selectedValue={snap}
                                        onChange={setSnap}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Alignement transversal
                            </legend>
                            <div className="mt-3 space-y-2">
                                {alignments.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="rail-align"
                                        {...option}
                                        selectedValue={align}
                                        onChange={setAlign}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <label className="flex items-start gap-3 text-sm text-ink-soft">
                            <input
                                type="checkbox"
                                checked={peek}
                                onChange={(event) =>
                                    setPeek(event.target.checked)
                                }
                                className="mt-1 accent-accent"
                            />
                            Entrevoir le plan suivant
                        </label>

                        <div>
                            <label
                                htmlFor="rail-item-count"
                                className="text-sm font-medium text-ink"
                            >
                                Éléments sur le plateau
                            </label>
                            <select
                                id="rail-item-count"
                                value={itemCount}
                                onChange={(event) =>
                                    setItemCount(Number(event.target.value))
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
                    </div>
                </aside>

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="rail"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

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
                                align={align}
                                peek={peek}
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
                </div>
            </div>
        </div>
    );
}
