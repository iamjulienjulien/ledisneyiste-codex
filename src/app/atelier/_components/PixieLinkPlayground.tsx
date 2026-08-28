"use client";

import { PixieSelect } from "@/components/ui/PixieSelect";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    type AtelierCadre,
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import {
    PixieLink,
    type PixieLinkIndicator,
    type PixieLinkVariant,
} from "@/components/ui/PixieLink";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants: ReadonlyArray<{
    value: PixieLinkVariant;
    label: string;
}> = [
    { value: "inline", label: "Dans le texte" },
    { value: "action", label: "Action" },
    { value: "surface", label: "Surface" },
];

const colors: ReadonlyArray<{
    value: AtelierAnimationColorSlug | "inherit";
    label: string;
}> = [
    { value: "inherit", label: "Héritée" },
    ...getAtelierAnimationColorSlugs().map((slug) => ({
        value: slug,
        label: getAtelierAnimationColor(slug).label,
    })),
];

const indicators: ReadonlyArray<{
    value: PixieLinkIndicator;
    label: string;
}> = [
    { value: "none", label: "Aucun" },
    { value: "arrow", label: "Flèche" },
    { value: "chevron", label: "Chevron" },
    { value: "back", label: "Retour" },
    { value: "external", label: "Externe" },
    { value: "anchor", label: "Ancre" },
];

const frameWidths: Record<AtelierCadre, string> = {
    compact: "max-w-64",
    moyen: "max-w-md",
    large: "max-w-none",
};

export function PixieLinkPlayground() {
    const [label, setLabel] = useState("Explorer les personnages");
    const [href, setHref] = useState("/personnages");
    const [variant, setVariant] = useState<PixieLinkVariant>("action");
    const [color, setColor] = useState<AtelierAnimationColorSlug | "inherit">(
        "inherit",
    );
    const [indicator, setIndicator] = useState<PixieLinkIndicator>("arrow");
    const [focusPreview, setFocusPreview] = useState(false);
    const [currentPage, setCurrentPage] = useState(false);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const safeLabel = label || "Lien";
    const safeHref = href || "/";
    const surfaceClassName = "w-full border border-line bg-surface p-6";
    const colorProp = color === "inherit" ? "" : `\n    color="${color}"`;
    const currentPageProp = currentPage ? `\n    aria-current="page"` : "";
    const code = `<PixieLink
    href="${safeHref}"
    variant="${variant}"${colorProp}
    indicator="${indicator}"${currentPageProp}${variant === "surface" ? `\n    className="${surfaceClassName}"` : ""}
>
    ${safeLabel}
</PixieLink>`;

    return (
        <div className="relative z-[10000] overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-7">
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
                                className="mt-2"
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
                                className="mt-2 font-mono"
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

                        <div>
                            <label
                                htmlFor="lien-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur du registre
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="lien-color"
                                value={color}
                                onChange={(event) =>
                                    setColor(
                                        event.target.value as
                                            | AtelierAnimationColorSlug
                                            | "inherit",
                                    )
                                }
                                className="mt-2"
                            >
                                {colors.map((option) => (
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

                        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                            <input
                                type="checkbox"
                                checked={currentPage}
                                onChange={(event) =>
                                    setCurrentPage(event.target.checked)
                                }
                                className="accent-accent"
                            />
                            Marquer comme page courante
                        </label>
                    </div>
                </aside>

                <AtelierPlaygroundProjection>
                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-80 items-center justify-center overflow-auto bg-canvas p-8"
                    >
                        <div
                            className={`flex min-h-48 w-full items-center justify-center border border-line bg-surface p-6 text-ink transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <PixieLink
                                href={safeHref}
                                variant={variant}
                                color={color === "inherit" ? false : color}
                                indicator={indicator}
                                aria-current={currentPage ? "page" : undefined}
                                data-focus-preview={
                                    focusPreview ? "true" : undefined
                                }
                                className={
                                    variant === "surface"
                                        ? surfaceClassName
                                        : undefined
                                }
                                onClick={(event) => event.preventDefault()}
                            >
                                {safeLabel}
                            </PixieLink>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
