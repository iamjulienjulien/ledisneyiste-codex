"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import { PixieBadge, type PixieBadgeSize } from "@/components/ui/PixieBadge";
import {
    PixieDustCluster,
    type PixieDustClusterAlign,
    type PixieDustClusterElement,
    type PixieDustClusterGap,
    type PixieDustClusterJustify,
} from "@/components/ui/PixieDustCluster";

const elements = ["div", "section", "nav", "ul"] as const;

const gaps = [
    { value: "none", label: "Aucun" },
    { value: "xs", label: "Très petit" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
    { value: "xl", label: "Très grand" },
] as const;

const justifications = [
    { value: "start", label: "Début" },
    { value: "center", label: "Centre" },
    { value: "end", label: "Fin" },
] as const;

const alignments = [
    { value: "start", label: "Début" },
    { value: "center", label: "Centre" },
    { value: "end", label: "Fin" },
    { value: "baseline", label: "Ligne de base" },
] as const;

const frameWidths = {
    compact: "max-w-xs",
    moyen: "max-w-xl",
    large: "max-w-4xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const previewItems = [
    { label: "Personnages", size: "sm" as const },
    { label: "Cercle de Mickey", size: "lg" as const },
    { label: "Silly Symphonies", size: "md" as const },
    { label: "Technicolor", size: "xs" as const },
    { label: "Premières récompenses", size: "xl" as const },
] as const satisfies readonly Readonly<{
    label: string;
    size: PixieBadgeSize;
}>[];

function PreviewBadge({
    label,
    size,
}: Readonly<{ label: string; size: PixieBadgeSize }>) {
    return (
        <PixieBadge variant="outline" size={size} tone="inherit" shape="pill">
            {label}
        </PixieBadge>
    );
}

export function PixieDustClusterPlayground() {
    const [element, setElement] = useState<PixieDustClusterElement>("div");
    const [gap, setGap] = useState<PixieDustClusterGap>("sm");
    const [justify, setJustify] = useState<PixieDustClusterJustify>("start");
    const [align, setAlign] = useState<PixieDustClusterAlign>("center");
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const semanticProp =
        element === "section"
            ? '    aria-label="Métadonnées"\n'
            : element === "nav"
              ? '    aria-label="Explorer le Codex"\n'
              : element === "ul"
                ? '    aria-label="Métadonnées"\n'
                : "";
    const childrenCode =
        element === "nav"
            ? `    <a href="/personnages">Personnages</a>
    <a href="/contributeurs">Créateurs</a>
    <a href="/oeuvres">Œuvres</a>`
            : element === "ul"
              ? `    <li><PixieBadge>Personnages</PixieBadge></li>
    <li><PixieBadge>Cercle de Mickey</PixieBadge></li>
    <li><PixieBadge>Silly Symphonies</PixieBadge></li>`
              : `    <PixieBadge>Personnages</PixieBadge>
    <PixieBadge>Cercle de Mickey</PixieBadge>
    <PixieBadge>Silly Symphonies</PixieBadge>`;
    const code = `<PixieDustCluster
    as="${element}"
    gap="${gap}"
    justify="${justify}"
    align="${align}"
${semanticProp}>
${childrenCode}
</PixieDustCluster>`;

    return (
        <div className="overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="cluster-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <select
                                id="cluster-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustClusterElement,
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
                                Espacement
                            </legend>
                            <div className="mt-3 space-y-2">
                                {gaps.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="cluster-gap"
                                        {...option}
                                        selectedValue={gap}
                                        onChange={setGap}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Placement horizontal
                            </legend>
                            <div className="mt-3 space-y-2">
                                {justifications.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="cluster-justify"
                                        {...option}
                                        selectedValue={justify}
                                        onChange={setJustify}
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
                                        name="cluster-align"
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
                        namePrefix="cluster"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[34rem] items-center justify-center overflow-auto bg-canvas p-6 sm:p-10"
                    >
                        <div
                            className={`w-full transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <p
                                id="cluster-preview-heading"
                                className="mb-5 text-xs font-eyebrow uppercase tracking-[0.18em] text-muted"
                            >
                                Métadonnées de la séquence
                            </p>
                            <PixieDustCluster
                                as={element}
                                gap={gap}
                                justify={justify}
                                align={align}
                                aria-label={
                                    element === "nav"
                                        ? "Explorer le Codex"
                                        : element === "ul" ||
                                            element === "section"
                                          ? "Métadonnées"
                                          : undefined
                                }
                                className="border-y border-dashed border-line-strong py-6"
                            >
                                {previewItems.map((item) => {
                                    const badge = <PreviewBadge {...item} />;

                                    if (element === "ul") {
                                        return (
                                            <li key={item.label}>{badge}</li>
                                        );
                                    }

                                    if (element === "nav") {
                                        return (
                                            <a
                                                key={item.label}
                                                href={`#cluster-${item.label.toLowerCase().replaceAll(" ", "-")}`}
                                                className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                                            >
                                                {badge}
                                            </a>
                                        );
                                    }

                                    return <div key={item.label}>{badge}</div>;
                                })}
                            </PixieDustCluster>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
