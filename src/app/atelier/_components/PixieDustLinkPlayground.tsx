"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieDustLink,
    type PixieDustLinkColor,
    type PixieDustLinkIndicator,
    type PixieDustLinkVariant,
} from "@/components/ui/PixieDustLink";

type Light = "sombre" | "claire";
type Frame = "compact" | "moyen" | "large";

const variants: ReadonlyArray<{
    value: PixieDustLinkVariant;
    label: string;
}> = [
    { value: "inline", label: "Dans le texte" },
    { value: "action", label: "Action" },
    { value: "surface", label: "Surface" },
];

const colors: ReadonlyArray<{
    value: PixieDustLinkColor;
    label: string;
}> = [
    { value: "accent", label: "Accent" },
    { value: "inherit", label: "Héritée" },
];

const indicators: ReadonlyArray<{
    value: PixieDustLinkIndicator;
    label: string;
}> = [
    { value: "none", label: "Aucun" },
    { value: "arrow", label: "Flèche" },
];

const frameWidths: Record<Frame, string> = {
    compact: "max-w-64",
    moyen: "max-w-md",
    large: "max-w-none",
};

export function PixieDustLinkPlayground() {
    const [label, setLabel] = useState("Explorer les personnages");
    const [href, setHref] = useState("/personnages");
    const [variant, setVariant] = useState<PixieDustLinkVariant>("action");
    const [color, setColor] = useState<PixieDustLinkColor>("accent");
    const [indicator, setIndicator] = useState<PixieDustLinkIndicator>("arrow");
    const [focusPreview, setFocusPreview] = useState(false);
    const [light, setLight] = useState<Light>("sombre");
    const [frame, setFrame] = useState<Frame>("large");

    const safeLabel = label || "Lien";
    const safeHref = href || "/";
    const surfaceClassName =
        "w-full border border-line bg-surface p-6 text-ink";
    const code = `<PixieDustLink
    href="${safeHref}"
    variant="${variant}"
    color="${color}"
    indicator="${indicator}"${variant === "surface" ? `\n    className="${surfaceClassName}"` : ""}
>
    ${safeLabel}
</PixieDustLink>`;

    return (
        <div className="relative z-[10000] overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="lien-label"
                                className="text-sm font-medium text-ink"
                            >
                                Libellé
                            </label>
                            <input
                                id="lien-label"
                                value={label}
                                onChange={(event) =>
                                    setLabel(event.target.value)
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="lien-href"
                                className="text-sm font-medium text-ink"
                            >
                                Destination
                            </label>
                            <input
                                id="lien-href"
                                value={href}
                                onChange={(event) =>
                                    setHref(event.target.value)
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 font-mono text-sm text-ink"
                            />
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Variante
                            </legend>
                            <div className="mt-3 space-y-2">
                                {variants.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="lien-variant"
                                        {...option}
                                        selectedValue={variant}
                                        onChange={setVariant}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Couleur
                            </legend>
                            <div className="mt-3 space-y-2">
                                {colors.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="lien-color"
                                        {...option}
                                        selectedValue={color}
                                        onChange={setColor}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Indicateur
                            </legend>
                            <div className="mt-3 space-y-2">
                                {indicators.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="lien-indicator"
                                        {...option}
                                        selectedValue={indicator}
                                        onChange={setIndicator}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                            <input
                                type="checkbox"
                                checked={focusPreview}
                                onChange={(event) =>
                                    setFocusPreview(event.target.checked)
                                }
                                className="accent-accent"
                            />
                            Simuler le focus
                        </label>
                    </div>
                </aside>

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="lien"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-80 items-center justify-center overflow-auto bg-canvas p-8"
                    >
                        <div
                            className={`flex min-h-48 w-full items-center justify-center border border-line bg-surface p-6 text-ink transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <PixieDustLink
                                href={safeHref}
                                variant={variant}
                                color={color}
                                indicator={indicator}
                                focusPreview={focusPreview}
                                className={
                                    variant === "surface"
                                        ? surfaceClassName
                                        : undefined
                                }
                                onClick={(event) => event.preventDefault()}
                            >
                                {safeLabel}
                            </PixieDustLink>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
