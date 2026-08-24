"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieDustCluster } from "@/components/ui/PixieDustCluster";
import { PixieFrame } from "@/components/ui/PixieFrame";
import {
    PixieDustSplit,
    type PixieDustSplitAlign,
    type PixieDustSplitElement,
    type PixieDustSplitGap,
    type PixieDustSplitMinPaneWidth,
    type PixieDustSplitRatio,
} from "@/components/ui/PixieDustSplit";
import { PixieDustStack } from "@/components/ui/PixieDustStack";

const elements = ["div", "section", "article"] as const;

const ratios = [
    { value: "equal", label: "Équilibre" },
    { value: "start-wide", label: "Champ large" },
    { value: "end-wide", label: "Contrechamp large" },
] as const;

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
    compact: "max-w-sm",
    moyen: "max-w-3xl",
    large: "max-w-6xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

export function PixieDustSplitPlayground() {
    const [element, setElement] = useState<PixieDustSplitElement>("section");
    const [ratio, setRatio] = useState<PixieDustSplitRatio>("start-wide");
    const [minPaneWidth, setMinPaneWidth] =
        useState<PixieDustSplitMinPaneWidth>("md");
    const [gap, setGap] = useState<PixieDustSplitGap>("xl");
    const [align, setAlign] = useState<PixieDustSplitAlign>("center");
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const labelledBy =
        element === "div" ? "" : '    aria-labelledby="split-heading"\n';
    const code = `<PixieDustSplit
    as="${element}"
    ratio="${ratio}"
    minPaneWidth="${minPaneWidth}"
    gap="${gap}"
    align="${align}"
${labelledBy}>
    <div>{/* Champ éditorial */}</div>
    <PixieFrame>{/* Contrechamp visuel */}</PixieFrame>
</PixieDustSplit>`;

    return (
        <div className="overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="split-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <select
                                id="split-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustSplitElement,
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
                                Rapport
                            </legend>
                            <div className="mt-3 space-y-2">
                                {ratios.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="split-ratio"
                                        {...option}
                                        selectedValue={ratio}
                                        onChange={setRatio}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Largeur minimale
                            </legend>
                            <div className="mt-3 space-y-2">
                                {widths.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="split-min-pane-width"
                                        {...option}
                                        selectedValue={minPaneWidth}
                                        onChange={setMinPaneWidth}
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
                                        name="split-gap"
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
                                        name="split-align"
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
                        namePrefix="split"
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
                            className={`w-full border border-dashed border-line-strong p-5 transition-[max-width] sm:p-7 ${frameWidths[frame]}`}
                        >
                            <PixieDustSplit
                                as={element}
                                ratio={ratio}
                                minPaneWidth={minPaneWidth}
                                gap={gap}
                                align={align}
                                aria-labelledby={
                                    element === "div"
                                        ? undefined
                                        : "split-preview-heading"
                                }
                            >
                                <PixieDustStack gap="md">
                                    <PixieDustStack gap="xs">
                                        <p className="text-xs font-eyebrow uppercase tracking-[0.18em] text-muted">
                                            Le dessin animé trouve son langage
                                        </p>
                                        <h5
                                            id="split-preview-heading"
                                            className="text-3xl text-ink"
                                        >
                                            Le mouvement rejoint la musique
                                        </h5>
                                    </PixieDustStack>
                                    <p className="leading-7 text-ink-soft">
                                        Le champ installe le récit pendant que
                                        le contrechamp lui donne une présence
                                        visuelle.
                                    </p>
                                    <PixieDustCluster gap="xs">
                                        {["1929", "Musique", "Animation"].map(
                                            (label) => (
                                                <PixieBadge
                                                    key={label}
                                                    variant="outline"
                                                    size="sm"
                                                    tone="inherit"
                                                >
                                                    {label}
                                                </PixieBadge>
                                            ),
                                        )}
                                    </PixieDustCluster>
                                </PixieDustStack>

                                <PixieFrame
                                    variant="film"
                                    aspect="landscape"
                                    padding="sm"
                                    radius="small"
                                    color="orange-banc-titre"
                                    caption="Contrechamp · The Skeleton Dance"
                                >
                                    <div className="flex h-full w-full items-center justify-center bg-surface-muted p-8 text-center">
                                        <span className="text-5xl" aria-hidden>
                                            ♪
                                        </span>
                                    </div>
                                </PixieFrame>
                            </PixieDustSplit>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
