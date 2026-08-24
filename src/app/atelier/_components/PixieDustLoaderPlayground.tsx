"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import { PixieButton } from "@/components/ui/PixieButton";
import {
    PixieDustLoader,
    type PixieDustLoaderLayout,
    type PixieDustLoaderSize,
    type PixieDustLoaderSpeed,
    type PixieDustLoaderVariant,
} from "@/components/ui/PixieDustLoader";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "sparkle", label: "Étincelles" },
    { value: "reel", label: "Bobine" },
    { value: "beam", label: "Faisceau" },
] as const satisfies readonly Readonly<{
    value: PixieDustLoaderVariant;
    label: string;
}>[];

const sizes = [
    { value: "xs", label: "Très petite" },
    { value: "sm", label: "Petite" },
    { value: "md", label: "Moyenne" },
    { value: "lg", label: "Grande" },
    { value: "xl", label: "Très grande" },
] as const satisfies readonly Readonly<{
    value: PixieDustLoaderSize;
    label: string;
}>[];

const speeds = [
    { value: "slow", label: "Lente" },
    { value: "normal", label: "Normale" },
    { value: "fast", label: "Rapide" },
] as const satisfies readonly Readonly<{
    value: PixieDustLoaderSpeed;
    label: string;
}>[];

const layouts = [
    { value: "inline", label: "En ligne" },
    { value: "stacked", label: "Empilée" },
] as const satisfies readonly Readonly<{
    value: PixieDustLoaderLayout;
    label: string;
}>[];

const colors: readonly Readonly<{
    value: AtelierAnimationColorSlug | "inherit";
    label: string;
}>[] = [
    { value: "inherit", label: "Héritée" },
    ...getAtelierAnimationColorSlugs().map((slug) => ({
        value: slug,
        label: getAtelierAnimationColor(slug).label,
    })),
];

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-xl",
    large: "max-w-3xl",
} as const;

export function PixieDustLoaderPlayground() {
    const [variant, setVariant] = useState<PixieDustLoaderVariant>("sparkle");
    const [size, setSize] = useState<PixieDustLoaderSize>("md");
    const [speed, setSpeed] = useState<PixieDustLoaderSpeed>("normal");
    const [layout, setLayout] = useState<PixieDustLoaderLayout>("stacked");
    const [color, setColor] = useState<AtelierAnimationColorSlug | "inherit">(
        "ambre-projecteur",
    );
    const [delay, setDelay] = useState(0);
    const [labelHidden, setLabelHidden] = useState(false);
    const [decorative, setDecorative] = useState(false);
    const [active, setActive] = useState(true);
    const [cycle, setCycle] = useState(0);
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const colorProp =
        color === "inherit"
            ? "\n    color={false}"
            : color === "ambre-projecteur"
              ? ""
              : `\n    color="${color}"`;
    const code = `<PixieDustLoader
    variant="${variant}"
    size="${size}"
    speed="${speed}"
    layout="${layout}"${colorProp}${delay ? `\n    delay={${delay}}` : ""}${labelHidden ? "\n    labelHidden" : ""}${decorative ? "\n    decorative" : ""}${active ? "" : "\n    active={false}"}
    label="La magie est encore à l’œuvre"
/>`;

    function replay() {
        setActive(true);
        setCycle((current) => current + 1);
    }

    return (
        <div className="overflow-hidden border border-line bg-surface">
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
                                        name="loader-variant"
                                        {...option}
                                        selectedValue={variant}
                                        onChange={setVariant}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="loader-size"
                                className="text-sm font-medium text-ink"
                            >
                                Taille
                            </label>
                            <select
                                id="loader-size"
                                value={size}
                                onChange={(event) =>
                                    setSize(
                                        event.target
                                            .value as PixieDustLoaderSize,
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            >
                                {sizes.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Vitesse
                            </legend>
                            <div className="mt-3 space-y-2">
                                {speeds.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="loader-speed"
                                        {...option}
                                        selectedValue={speed}
                                        onChange={setSpeed}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Composition
                            </legend>
                            <div className="mt-3 space-y-2">
                                {layouts.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="loader-layout"
                                        {...option}
                                        selectedValue={layout}
                                        onChange={setLayout}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="loader-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur du registre
                            </label>
                            <select
                                id="loader-color"
                                value={color}
                                onChange={(event) =>
                                    setColor(
                                        event.target.value as
                                            | AtelierAnimationColorSlug
                                            | "inherit",
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            >
                                {colors.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="loader-delay"
                                className="text-sm font-medium text-ink"
                            >
                                Délai d’apparition
                            </label>
                            <select
                                id="loader-delay"
                                value={delay}
                                onChange={(event) =>
                                    setDelay(Number(event.target.value))
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            >
                                <option value="0">Immédiat</option>
                                <option value="300">300 ms</option>
                                <option value="700">700 ms</option>
                                <option value="1200">1 200 ms</option>
                            </select>
                        </div>

                        <div className="space-y-3 text-sm text-ink-soft">
                            <label className="flex gap-3">
                                <input
                                    type="checkbox"
                                    checked={active}
                                    onChange={(event) =>
                                        setActive(event.target.checked)
                                    }
                                />
                                Actif
                            </label>
                            <label className="flex gap-3">
                                <input
                                    type="checkbox"
                                    checked={labelHidden}
                                    disabled={decorative}
                                    onChange={(event) =>
                                        setLabelHidden(event.target.checked)
                                    }
                                />
                                Label masqué
                            </label>
                            <label className="flex gap-3">
                                <input
                                    type="checkbox"
                                    checked={decorative}
                                    onChange={(event) =>
                                        setDecorative(event.target.checked)
                                    }
                                />
                                Décoratif
                            </label>
                        </div>
                    </div>
                </aside>

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="loader"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />
                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-96 items-center justify-center overflow-auto bg-canvas p-6 sm:p-8"
                    >
                        <div
                            className={`grid min-h-64 w-full content-between justify-items-center gap-8 border border-line bg-surface p-6 sm:p-8 ${frameWidths[frame]}`}
                        >
                            <PixieButton
                                type="button"
                                size="sm"
                                variant="outline"
                                color="ambre-projecteur"
                                onClick={replay}
                            >
                                Rejouer l’apparition
                            </PixieButton>
                            <PixieDustLoader
                                key={cycle}
                                variant={variant}
                                size={size}
                                speed={speed}
                                layout={layout}
                                color={color === "inherit" ? false : color}
                                active={active}
                                delay={delay}
                                labelHidden={labelHidden}
                                decorative={decorative}
                                label="La magie est encore à l’œuvre"
                            />
                        </div>
                    </div>
                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
