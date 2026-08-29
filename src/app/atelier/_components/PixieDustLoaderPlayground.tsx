"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { PixieButton } from "@/components/ui/PixieButton";
import {
    PixieDustLoader,
    type PixieDustLoaderAriaLive,
    type PixieDustLoaderDirection,
    type PixieDustLoaderIntensity,
    type PixieDustLoaderLabelPosition,
    type PixieDustLoaderLayout,
    type PixieDustLoaderMotion,
    type PixieDustLoaderSize,
    type PixieDustLoaderSpeed,
    type PixieDustLoaderVariant,
} from "@/components/ui/PixieDustLoader";
import { PixieSelect } from "@/components/ui/PixieSelect";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import type { AtelierAnimationColorSlug } from "@/types/colors";

const variants = [
    { value: "sparkle", label: "Étincelles" },
    { value: "reel", label: "Bobine" },
    { value: "beam", label: "Faisceau" },
    { value: "iris", label: "Iris" },
    { value: "cel", label: "Cellulos" },
    { value: "flipbook", label: "Folioscope" },
    { value: "filmstrip", label: "Pellicule" },
    { value: "orbit", label: "Orbite" },
    { value: "dots", label: "Trois points" },
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

const intensities = [
    { value: "subtle", label: "Discrète" },
    { value: "normal", label: "Présente" },
    { value: "strong", label: "Féérique" },
] as const satisfies readonly Readonly<{
    value: PixieDustLoaderIntensity;
    label: string;
}>[];

const motions = [
    { value: "expressive", label: "Expressif" },
    { value: "gentle", label: "Doux" },
    { value: "static", label: "Fixe" },
] as const satisfies readonly Readonly<{
    value: PixieDustLoaderMotion;
    label: string;
}>[];

const directions = [
    { value: "forward", label: "Avant" },
    { value: "reverse", label: "Inverse" },
] as const satisfies readonly Readonly<{
    value: PixieDustLoaderDirection;
    label: string;
}>[];

const labelPositions = [
    { value: "before", label: "Avant le signe" },
    { value: "after", label: "Après le signe" },
] as const satisfies readonly Readonly<{
    value: PixieDustLoaderLabelPosition;
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
    large: "max-w-none",
} as const;

export function PixieDustLoaderPlayground() {
    const [variant, setVariant] = useState<PixieDustLoaderVariant>("sparkle");
    const [size, setSize] = useState<PixieDustLoaderSize>("md");
    const [speed, setSpeed] = useState<PixieDustLoaderSpeed>("normal");
    const [duration, setDuration] = useState(0);
    const [layout, setLayout] = useState<PixieDustLoaderLayout>("stacked");
    const [labelPosition, setLabelPosition] =
        useState<PixieDustLoaderLabelPosition>("after");
    const [intensity, setIntensity] =
        useState<PixieDustLoaderIntensity>("normal");
    const [motion, setMotion] = useState<PixieDustLoaderMotion>("expressive");
    const [direction, setDirection] =
        useState<PixieDustLoaderDirection>("forward");
    const [color, setColor] = useState<AtelierAnimationColorSlug | "inherit">(
        "ambre-projecteur",
    );
    const [secondaryColor, setSecondaryColor] = useState<
        AtelierAnimationColorSlug | "inherit"
    >("violet-ombre-portee");
    const [delay, setDelay] = useState(0);
    const [labelHidden, setLabelHidden] = useState(false);
    const [withDescription, setWithDescription] = useState(true);
    const [decorative, setDecorative] = useState(false);
    const [active, setActive] = useState(true);
    const [reserveSpace, setReserveSpace] = useState(false);
    const [ariaLive, setAriaLive] = useState<PixieDustLoaderAriaLive>("polite");
    const [cycle, setCycle] = useState(0);
    const { lumiere: light, cadre: frame } = useAtelierProjection();

    const colorProp =
        color === "inherit"
            ? "\n    color={false}"
            : color === "ambre-projecteur"
              ? ""
              : `\n    color="${color}"`;
    const secondaryColorProp =
        secondaryColor === "inherit"
            ? ""
            : `\n    secondaryColor="${secondaryColor}"`;
    const descriptionProp = withDescription
        ? '\n    description="Les poussières de fée préparent la prochaine scène."'
        : "";
    const code = `<PixieDustLoader
    variant="${variant}"
    size="${size}"
    speed="${speed}"
    layout="${layout}"
    labelPosition="${labelPosition}"
    intensity="${intensity}"
    motion="${motion}"
    direction="${direction}"${colorProp}${secondaryColorProp}${duration ? `\n    duration={${duration}}` : ""}${delay ? `\n    delay={${delay}}` : ""}${labelHidden ? "\n    labelHidden" : ""}${decorative ? "\n    decorative" : ""}${active ? "" : "\n    active={false}"}${reserveSpace ? "\n    reserveSpace" : ""}${ariaLive === "polite" ? "" : `\n    ariaLive="${ariaLive}"`}
    label="La magie est encore à l’œuvre"${descriptionProp}
/>`;

    function replay() {
        setActive(true);
        setCycle((current) => current + 1);
    }

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>
                    <div className="atelier-playground-controls mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="loader-variant"
                                className="text-sm font-medium text-ink"
                            >
                                Variante
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="loader-variant"
                                value={variant}
                                onChange={(event) =>
                                    setVariant(
                                        event.target
                                            .value as PixieDustLoaderVariant,
                                    )
                                }
                                className="mt-2"
                            >
                                {variants.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <div>
                            <label
                                htmlFor="loader-size"
                                className="text-sm font-medium text-ink"
                            >
                                Taille
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="loader-size"
                                value={size}
                                onChange={(event) =>
                                    setSize(
                                        event.target
                                            .value as PixieDustLoaderSize,
                                    )
                                }
                                className="mt-2"
                            >
                                {sizes.map((option) => (
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

                        <div>
                            <label
                                htmlFor="loader-duration"
                                className="text-sm font-medium text-ink"
                            >
                                Durée personnalisée
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="loader-duration"
                                value={duration}
                                onChange={(event) =>
                                    setDuration(Number(event.target.value))
                                }
                                className="mt-2"
                            >
                                <option value="0">Cadence prédéfinie</option>
                                <option value="750">750 ms</option>
                                <option value="1500">1 500 ms</option>
                                <option value="2400">2 400 ms</option>
                                <option value="4000">4 000 ms</option>
                            </PixieSelect>
                        </div>

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
                                htmlFor="loader-label-position"
                                className="text-sm font-medium text-ink"
                            >
                                Position du message
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="loader-label-position"
                                value={labelPosition}
                                onChange={(event) =>
                                    setLabelPosition(
                                        event.target
                                            .value as PixieDustLoaderLabelPosition,
                                    )
                                }
                                className="mt-2"
                            >
                                {labelPositions.map((option) => (
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
                                Intensité
                            </legend>
                            <div className="mt-3 space-y-2">
                                {intensities.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="loader-intensity"
                                        {...option}
                                        selectedValue={intensity}
                                        onChange={setIntensity}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <label
                                htmlFor="loader-motion"
                                className="text-sm font-medium text-ink"
                            >
                                Mouvement
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="loader-motion"
                                value={motion}
                                onChange={(event) =>
                                    setMotion(
                                        event.target
                                            .value as PixieDustLoaderMotion,
                                    )
                                }
                                className="mt-2"
                            >
                                {motions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <div>
                            <label
                                htmlFor="loader-direction"
                                className="text-sm font-medium text-ink"
                            >
                                Sens
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="loader-direction"
                                value={direction}
                                onChange={(event) =>
                                    setDirection(
                                        event.target
                                            .value as PixieDustLoaderDirection,
                                    )
                                }
                                className="mt-2"
                            >
                                {directions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </PixieSelect>
                        </div>

                        <div>
                            <label
                                htmlFor="loader-color"
                                className="text-sm font-medium text-ink"
                            >
                                Couleur du registre
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="loader-color"
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

                        <div>
                            <label
                                htmlFor="loader-secondary-color"
                                className="text-sm font-medium text-ink"
                            >
                                Seconde lumière
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="loader-secondary-color"
                                value={secondaryColor}
                                onChange={(event) =>
                                    setSecondaryColor(
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

                        <div>
                            <label
                                htmlFor="loader-delay"
                                className="text-sm font-medium text-ink"
                            >
                                Délai d’apparition
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="loader-delay"
                                value={delay}
                                onChange={(event) =>
                                    setDelay(Number(event.target.value))
                                }
                                className="mt-2"
                            >
                                <option value="0">Immédiat</option>
                                <option value="300">300 ms</option>
                                <option value="700">700 ms</option>
                                <option value="1200">1 200 ms</option>
                            </PixieSelect>
                        </div>

                        <div>
                            <label
                                htmlFor="loader-aria-live"
                                className="text-sm font-medium text-ink"
                            >
                                Priorité d’annonce
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="loader-aria-live"
                                value={ariaLive}
                                disabled={decorative}
                                onChange={(event) =>
                                    setAriaLive(
                                        event.target
                                            .value as PixieDustLoaderAriaLive,
                                    )
                                }
                                className="mt-2"
                            >
                                <option value="polite">Polie</option>
                                <option value="assertive">Prioritaire</option>
                                <option value="off">Désactivée</option>
                            </PixieSelect>
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
                                    checked={reserveSpace}
                                    onChange={(event) =>
                                        setReserveSpace(event.target.checked)
                                    }
                                />
                                Conserver l’espace
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
                                    checked={withDescription}
                                    disabled={decorative}
                                    onChange={(event) =>
                                        setWithDescription(event.target.checked)
                                    }
                                />
                                Description secondaire
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

                <AtelierPlaygroundProjection>
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
                                duration={duration || undefined}
                                layout={layout}
                                labelPosition={labelPosition}
                                intensity={intensity}
                                motion={motion}
                                direction={direction}
                                color={color === "inherit" ? false : color}
                                secondaryColor={
                                    secondaryColor === "inherit"
                                        ? false
                                        : secondaryColor
                                }
                                active={active}
                                reserveSpace={reserveSpace}
                                delay={delay}
                                labelHidden={labelHidden}
                                decorative={decorative}
                                ariaLive={ariaLive}
                                label="La magie est encore à l’œuvre"
                                description={
                                    withDescription
                                        ? "Les poussières de fée préparent la prochaine scène."
                                        : undefined
                                }
                            />
                        </div>
                    </div>
                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
