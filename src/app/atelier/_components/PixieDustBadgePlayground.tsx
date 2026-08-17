"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieDustBadge,
    type PixieDustBadgeShape,
    type PixieDustBadgeSize,
    type PixieDustBadgeTone,
    type PixieDustBadgeVariant,
} from "@/components/ui/PixieDustBadge";
import { PixieSymbol } from "@/components/ui/PixieSymbol";

type Light = "sombre" | "claire";
type Frame = "compact" | "moyen" | "large";

const variants: ReadonlyArray<{
    value: PixieDustBadgeVariant;
    label: string;
}> = [
    { value: "soft", label: "Doux" },
    { value: "outline", label: "Contour" },
    { value: "plain", label: "Simple" },
];

const tones: ReadonlyArray<{
    value: PixieDustBadgeTone;
    label: string;
}> = [
    { value: "neutral", label: "Neutre" },
    { value: "accent", label: "Accent" },
    { value: "inherit", label: "Hérité" },
];

const sizes: ReadonlyArray<{
    value: PixieDustBadgeSize;
    label: string;
}> = [
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
];

const shapes: ReadonlyArray<{
    value: PixieDustBadgeShape;
    label: string;
}> = [
    { value: "rounded", label: "Arrondi" },
    { value: "pill", label: "Capsule" },
];

const frameWidths: Record<Frame, string> = {
    compact: "max-w-64",
    moyen: "max-w-md",
    large: "max-w-none",
};

export function PixieDustBadgePlayground() {
    const [label, setLabel] = useState("Court métrage");
    const [variant, setVariant] = useState<PixieDustBadgeVariant>("soft");
    const [tone, setTone] = useState<PixieDustBadgeTone>("accent");
    const [size, setSize] = useState<PixieDustBadgeSize>("md");
    const [shape, setShape] = useState<PixieDustBadgeShape>("rounded");
    const [withIcon, setWithIcon] = useState(false);
    const [customAccent, setCustomAccent] = useState(false);
    const [accent, setAccent] = useState(
        "var(--atelier-animation-rouge-crayon)",
    );
    const [light, setLight] = useState<Light>("sombre");
    const [frame, setFrame] = useState<Frame>("large");

    const safeLabel = label || "Cartouche";
    const iconCode = withIcon
        ? `\n    icon={\n        <PixieSymbol\n            registry="codex"\n            collection="index"\n            slug="oeuvres"\n            size={14}\n        />\n    }`
        : "";
    const accentCode = customAccent ? `\n    accent="${accent}"` : "";
    const code = `<PixieDustBadge
    variant="${variant}"
    tone="${tone}"
    size="${size}"
    shape="${shape}"${accentCode}${iconCode}
>
    ${safeLabel}
</PixieDustBadge>`;

    return (
        <div className="relative z-[10000] overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="badge-label"
                                className="text-sm font-medium text-ink"
                            >
                                Libellé
                            </label>
                            <input
                                id="badge-label"
                                value={label}
                                onChange={(event) =>
                                    setLabel(event.target.value)
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
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
                                        name="badge-variant"
                                        {...option}
                                        selectedValue={variant}
                                        onChange={setVariant}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Ton
                            </legend>
                            <div className="mt-3 space-y-2">
                                {tones.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="badge-tone"
                                        {...option}
                                        selectedValue={tone}
                                        onChange={setTone}
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
                                        name="badge-size"
                                        {...option}
                                        selectedValue={size}
                                        onChange={setSize}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Forme
                            </legend>
                            <div className="mt-3 space-y-2">
                                {shapes.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="badge-shape"
                                        {...option}
                                        selectedValue={shape}
                                        onChange={setShape}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div className="space-y-3">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                                <input
                                    type="checkbox"
                                    checked={withIcon}
                                    onChange={(event) =>
                                        setWithIcon(event.target.checked)
                                    }
                                    className="accent-accent"
                                />
                                Ajouter un symbole
                            </label>
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                                <input
                                    type="checkbox"
                                    checked={customAccent}
                                    onChange={(event) => {
                                        setCustomAccent(event.target.checked);
                                        if (event.target.checked) {
                                            setTone("accent");
                                        }
                                    }}
                                    className="accent-accent"
                                />
                                Accent personnalisé
                            </label>
                        </div>

                        {customAccent ? (
                            <div>
                                <label
                                    htmlFor="badge-accent"
                                    className="text-sm font-medium text-ink"
                                >
                                    Couleur CSS
                                </label>
                                <input
                                    id="badge-accent"
                                    value={accent}
                                    onChange={(event) =>
                                        setAccent(event.target.value)
                                    }
                                    className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 font-mono text-xs text-ink"
                                />
                            </div>
                        ) : null}
                    </div>
                </aside>

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="badge"
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
                            <PixieDustBadge
                                variant={variant}
                                tone={tone}
                                size={size}
                                shape={shape}
                                accent={customAccent ? accent : undefined}
                                icon={
                                    withIcon ? (
                                        <PixieSymbol
                                            registry="codex"
                                            collection="index"
                                            slug="oeuvres"
                                            size={14}
                                        />
                                    ) : undefined
                                }
                            >
                                {safeLabel}
                            </PixieDustBadge>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
