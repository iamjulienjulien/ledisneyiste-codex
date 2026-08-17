"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { PixieSymbol, type PixieSymbolSize } from "@/components/ui/PixieSymbol";
import { getSymbol, getSymbolSlugs, type SymbolSlug } from "@/registry/symbols";

type Lumiere = "sombre" | "claire";
type Cadre = "compact" | "moyen" | "large";
type PixieSymbolPresetSize = Exclude<PixieSymbolSize, number>;

const indexSymbolSlugs = getSymbolSlugs("codex", "index");

const tailles: ReadonlyArray<{
    value: PixieSymbolPresetSize;
    label: string;
}> = [
    { value: "xs", label: "Très petit" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
    { value: "xl", label: "Très grand" },
];

const cadres: ReadonlyArray<{ value: Cadre; label: string }> = [
    { value: "compact", label: "Compact" },
    { value: "moyen", label: "Moyen" },
    { value: "large", label: "Large" },
];

const largeurParCadre: Record<Cadre, string> = {
    compact: "max-w-64",
    moyen: "max-w-md",
    large: "max-w-none",
};

export function PixieSymbolPlayground() {
    const [slug, setSlug] =
        useState<SymbolSlug<"codex", "index">>("personnages");
    const [size, setSize] = useState<PixieSymbolPresetSize>("xl");
    const [lumiere, setLumiere] = useState<Lumiere>("sombre");
    const [cadre, setCadre] = useState<Cadre>("large");
    const [informatif, setInformatif] = useState(false);
    const symbole = getSymbol("codex", "index", slug);
    const code = informatif
        ? `<PixieSymbol
    registry="codex"
    collection="index"
    slug="${slug}"
    size="${size}"
    decorative={false}
    label="Index ${symbole.label}"
/>`
        : `<PixieSymbol
    registry="codex"
    collection="index"
    slug="${slug}"
    size="${size}"
/>`;

    return (
        <div className="relative z-[10000] overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="pixie-symbol-index"
                                className="text-sm font-medium text-ink"
                            >
                                Index
                            </label>
                            <select
                                id="pixie-symbol-index"
                                value={slug}
                                onChange={(event) =>
                                    setSlug(
                                        event.target.value as SymbolSlug<
                                            "codex",
                                            "index"
                                        >,
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            >
                                {indexSymbolSlugs.map((option) => (
                                    <option key={option} value={option}>
                                        {
                                            getSymbol("codex", "index", option)
                                                .label
                                        }
                                    </option>
                                ))}
                            </select>
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Taille
                            </legend>
                            <div className="mt-3 space-y-2">
                                {tailles.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="pixie-symbol-size"
                                        {...option}
                                        selectedValue={size}
                                        onChange={setSize}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Lumière du plateau
                            </legend>
                            <div className="mt-3 space-y-2">
                                <AtelierOptionRadio
                                    name="pixie-symbol-lumiere"
                                    value="sombre"
                                    label="Sombre"
                                    selectedValue={lumiere}
                                    onChange={setLumiere}
                                />
                                <AtelierOptionRadio
                                    name="pixie-symbol-lumiere"
                                    value="claire"
                                    label="Claire"
                                    selectedValue={lumiere}
                                    onChange={setLumiere}
                                />
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Cadre
                            </legend>
                            <div className="mt-3 space-y-2">
                                {cadres.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="pixie-symbol-cadre"
                                        {...option}
                                        selectedValue={cadre}
                                        onChange={setCadre}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                            <input
                                type="checkbox"
                                checked={informatif}
                                onChange={(event) =>
                                    setInformatif(event.target.checked)
                                }
                                className="accent-accent"
                            />
                            Symbole informatif
                        </label>
                    </div>
                </aside>

                <div className="min-w-0">
                    <div
                        data-projection="originale"
                        data-lumiere={lumiere}
                        className="flex min-h-80 items-center justify-center overflow-auto bg-canvas p-8"
                    >
                        <div
                            className={`flex min-h-48 w-full items-center justify-center border border-line bg-surface p-6 transition-[max-width] ${largeurParCadre[cadre]}`}
                        >
                            <PixieSymbol
                                registry="codex"
                                collection="index"
                                slug={slug}
                                size={size}
                                decorative={!informatif}
                                label={
                                    informatif
                                        ? `Index ${symbole.label}`
                                        : undefined
                                }
                            />
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
