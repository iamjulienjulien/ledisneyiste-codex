"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieDustSeparator,
    type PixieDustSeparatorSpacing,
    type PixieDustSeparatorTone,
    type PixieDustSeparatorVariant,
} from "@/components/ui/PixieDustSeparator";

type Light = "sombre" | "claire";
type Frame = "compact" | "moyen" | "large";

const variants: ReadonlyArray<{
    value: PixieDustSeparatorVariant;
    label: string;
}> = [
    { value: "line", label: "Filet" },
    { value: "beam", label: "Faisceau" },
    { value: "film", label: "Pellicule" },
];

const tones: ReadonlyArray<{
    value: PixieDustSeparatorTone;
    label: string;
}> = [
    { value: "subtle", label: "Discret" },
    { value: "strong", label: "Soutenu" },
    { value: "accent", label: "Accent" },
    { value: "inherit", label: "Hérité" },
];

const spacings: ReadonlyArray<{
    value: PixieDustSeparatorSpacing;
    label: string;
}> = [
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
];

const frameWidths: Record<Frame, string> = {
    compact: "max-w-64",
    moyen: "max-w-md",
    large: "max-w-none",
};

export function PixieDustSeparatorPlayground() {
    const [variant, setVariant] = useState<PixieDustSeparatorVariant>("line");
    const [tone, setTone] = useState<PixieDustSeparatorTone>("subtle");
    const [spacing, setSpacing] = useState<PixieDustSeparatorSpacing>("md");
    const [decorative, setDecorative] = useState(false);
    const [customAccent, setCustomAccent] = useState(false);
    const [accent, setAccent] = useState(
        "var(--atelier-animation-bleu-reperage)",
    );
    const [light, setLight] = useState<Light>("sombre");
    const [frame, setFrame] = useState<Frame>("large");

    const accentCode = customAccent ? `\n    accent="${accent}"` : "";
    const decorativeCode = decorative ? "\n    decorative" : "";
    const code = `<PixieDustSeparator
    variant="${variant}"
    tone="${tone}"
    spacing="${spacing}"${accentCode}${decorativeCode}
/>`;

    return (
        <div className="relative z-[10000] overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Variante
                            </legend>
                            <div className="mt-3 space-y-2">
                                {variants.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="separator-variant"
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
                                        name="separator-tone"
                                        {...option}
                                        selectedValue={tone}
                                        onChange={setTone}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Respiration
                            </legend>
                            <div className="mt-3 space-y-2">
                                {spacings.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="separator-spacing"
                                        {...option}
                                        selectedValue={spacing}
                                        onChange={setSpacing}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div className="space-y-3">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                                <input
                                    type="checkbox"
                                    checked={decorative}
                                    onChange={(event) =>
                                        setDecorative(event.target.checked)
                                    }
                                    className="accent-accent"
                                />
                                Purement décoratif
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
                                    htmlFor="separator-accent"
                                    className="text-sm font-medium text-ink"
                                >
                                    Couleur CSS
                                </label>
                                <input
                                    id="separator-accent"
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
                        namePrefix="separator"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-96 items-center justify-center overflow-auto bg-canvas p-8"
                    >
                        <div
                            className={`w-full border border-line bg-surface p-6 text-ink transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <p className="text-sm leading-6 text-ink-soft">
                                Une première séquence arrive à son terme.
                            </p>
                            <PixieDustSeparator
                                variant={variant}
                                tone={tone}
                                spacing={spacing}
                                accent={customAccent ? accent : undefined}
                                decorative={decorative}
                            />
                            <p className="text-sm leading-6 text-ink-soft">
                                Une nouvelle séquence peut maintenant commencer.
                            </p>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
