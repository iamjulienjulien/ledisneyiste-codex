"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieButton,
    type PixieButtonColor,
    type PixieButtonSize,
    type PixieButtonVariant,
} from "@/components/ui/PixieButton";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

type Lumiere = "sombre" | "claire";
type Cadre = "compact" | "moyen" | "large";

const variants = [
    { value: "solid", label: "Plein" },
    { value: "soft", label: "Doux" },
    { value: "outline", label: "Contour" },
    { value: "ghost", label: "Fantôme" },
] as const;

const sizes = [
    { value: "xs", label: "Très petit" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
    { value: "xl", label: "Très grand" },
] as const;

const colorSlugs = getAtelierAnimationColorSlugs();

const frameWidths: Record<Cadre, string> = {
    compact: "max-w-64",
    moyen: "max-w-md",
    large: "max-w-none",
};

export function PixieButtonPlayground() {
    const [label, setLabel] = useState("Ouvrir les archives");
    const [variant, setVariant] = useState<PixieButtonVariant>("solid");
    const [size, setSize] = useState<PixieButtonSize>("md");
    const [color, setColor] = useState<PixieButtonColor>(false);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fullWidth, setFullWidth] = useState(false);
    const [focusPreview, setFocusPreview] = useState(false);
    const [light, setLight] = useState<Lumiere>("sombre");
    const [frame, setFrame] = useState<Cadre>("large");
    const safeLabel = label || "Bouton";
    const code = `<PixieButton
    variant="${variant}"
    size="${size}"${color ? `\n    color="${color}"` : ""}${loading ? "\n    loading" : ""}${fullWidth ? "\n    fullWidth" : ""}${disabled ? "\n    disabled" : ""}
>
    ${safeLabel}
</PixieButton>`;

    function selectColor(value: string) {
        setColor(
            value === "theme" ? false : (value as AtelierAnimationColorSlug),
        );
    }

    return (
        <div className="relative z-[10000] overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="button-label"
                                className="text-sm font-medium text-ink"
                            >
                                Libellé
                            </label>
                            <input
                                id="button-label"
                                value={label}
                                onChange={(event) =>
                                    setLabel(event.target.value)
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            />
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Variant
                            </legend>
                            <div className="mt-3 space-y-2">
                                {variants.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="button-variant"
                                        {...option}
                                        selectedValue={variant}
                                        onChange={setVariant}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Taille
                            </legend>
                            <div className="mt-3 space-y-2">
                                {sizes.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="button-size"
                                        {...option}
                                        selectedValue={size}
                                        onChange={setSize}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="button-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur
                            </label>
                            <select
                                id="button-color"
                                value={color || "theme"}
                                onChange={(event) =>
                                    selectColor(event.target.value)
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            >
                                <option value="theme">Thème</option>
                                {colorSlugs.map((slug) => (
                                    <option key={slug} value={slug}>
                                        {getAtelierAnimationColor(slug).label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                                <input
                                    type="checkbox"
                                    checked={loading}
                                    onChange={(event) =>
                                        setLoading(event.target.checked)
                                    }
                                    className="accent-accent"
                                />
                                Chargement
                            </label>
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                                <input
                                    type="checkbox"
                                    checked={disabled}
                                    onChange={(event) =>
                                        setDisabled(event.target.checked)
                                    }
                                    className="accent-accent"
                                />
                                Désactivé
                            </label>
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                                <input
                                    type="checkbox"
                                    checked={fullWidth}
                                    onChange={(event) =>
                                        setFullWidth(event.target.checked)
                                    }
                                    className="accent-accent"
                                />
                                Pleine largeur
                            </label>
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
                    </div>
                </aside>

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="button"
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
                            className={`flex min-h-48 w-full items-center justify-center border border-line bg-surface p-6 transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <PixieButton
                                variant={variant}
                                size={size}
                                color={color}
                                loading={loading}
                                fullWidth={fullWidth}
                                disabled={disabled}
                                data-focus-preview={
                                    focusPreview ? "true" : undefined
                                }
                            >
                                {safeLabel}
                            </PixieButton>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
