"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import {
    AtelierPlaygroundProjection,
    useAtelierProjection,
} from "@/components/atelier/AtelierPlaygroundProjection";
import {
    PixieAscii,
    type PixieAsciiAlign,
    type PixieAsciiCopyState,
    type PixieAsciiDensity,
    type PixieAsciiMaxHeight,
    type PixieAsciiOverflow,
    type PixieAsciiPadding,
    type PixieAsciiSize,
    type PixieAsciiTexture,
    type PixieAsciiVariant,
    type PixieAsciiWidth,
} from "@/components/ui/PixieAscii";
import { PixieSelect } from "@/components/ui/PixieSelect";
import { PixieSwitch } from "@/components/ui/PixieSwitch";
import type { AtelierAnimationColorSlug } from "@/types/colors";
import {
    asciiFixtures,
    type PixieAsciiFixtureSlug,
} from "./PixieAscii.fixtures";

const variants = [
    ["plain", "Sans décor"],
    ["surface", "Surface"],
    ["outline", "Contour"],
    ["slate", "Ardoise"],
    ["projector", "Projecteur"],
] as const satisfies readonly [PixieAsciiVariant, string][];

const sizes = [
    ["sm", "Petite"],
    ["md", "Moyenne"],
    ["lg", "Grande"],
] as const satisfies readonly [PixieAsciiSize, string][];

const densities = [
    ["compact", "Compacte"],
    ["comfortable", "Confortable"],
    ["airy", "Aérée"],
] as const satisfies readonly [PixieAsciiDensity, string][];

const paddings = [
    ["none", "Aucun"],
    ["sm", "Petit"],
    ["md", "Moyen"],
    ["lg", "Grand"],
] as const satisfies readonly [PixieAsciiPadding, string][];

const widths = [
    ["fit", "Au contenu"],
    ["full", "Pleine largeur"],
] as const satisfies readonly [PixieAsciiWidth, string][];

const aligns = [
    ["start", "Début"],
    ["center", "Centrée"],
] as const satisfies readonly [PixieAsciiAlign, string][];

const overflows = [
    ["auto", "Défilement"],
    ["clip", "Rogné"],
] as const satisfies readonly [PixieAsciiOverflow, string][];

const maxHeights = [
    ["none", "Sans limite"],
    ["sm", "Petite"],
    ["md", "Moyenne"],
    ["lg", "Grande"],
] as const satisfies readonly [PixieAsciiMaxHeight, string][];

const textures = [
    ["none", "Aucune"],
    ["grain", "Grain"],
    ["scanlines", "Lignes de régie"],
] as const satisfies readonly [PixieAsciiTexture, string][];

const colors = [
    ["theme", "Accent du thème"],
    ["ambre-projecteur", "Ambre projecteur"],
    ["bleu-reperage", "Bleu repérage"],
    ["vert-cellulo", "Vert cellulo"],
    ["violet-ombre-portee", "Violet ombre portée"],
    ["rose-aerographe", "Rose aérographe"],
] as const satisfies readonly [AtelierAnimationColorSlug | "theme", string][];

const fixtureOptions = Object.entries(asciiFixtures).map(
    ([value, fixture]) => [value, fixture.label] as const,
);

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-3xl",
    large: "max-w-none",
} as const;

function ControlSelect({
    id,
    label,
    value,
    options,
    onChange,
}: Readonly<{
    id: string;
    label: string;
    value: string;
    options: readonly (readonly [string, string])[];
    onChange: (value: string) => void;
}>) {
    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-ink">
                {label}
            </label>
            <PixieSelect
                mode="popover"
                portal
                size="sm"
                id={id}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="mt-2"
            >
                {options.map(([optionValue, optionLabel]) => (
                    <option key={optionValue} value={optionValue}>
                        {optionLabel}
                    </option>
                ))}
            </PixieSelect>
        </div>
    );
}

export function PixieAsciiPlayground() {
    const [fixtureSlug, setFixtureSlug] =
        useState<PixieAsciiFixtureSlug>("service");
    const [variant, setVariant] = useState<PixieAsciiVariant>("projector");
    const [size, setSize] = useState<PixieAsciiSize>("md");
    const [density, setDensity] = useState<PixieAsciiDensity>("comfortable");
    const [padding, setPadding] = useState<PixieAsciiPadding>("lg");
    const [width, setWidth] = useState<PixieAsciiWidth>("full");
    const [align, setAlign] = useState<PixieAsciiAlign>("center");
    const [overflow, setOverflow] = useState<PixieAsciiOverflow>("auto");
    const [maxHeight, setMaxHeight] = useState<PixieAsciiMaxHeight>("none");
    const [texture, setTexture] = useState<PixieAsciiTexture>("grain");
    const [color, setColor] = useState<AtelierAnimationColorSlug | "theme">(
        "violet-ombre-portee",
    );
    const [tabSize, setTabSize] = useState<2 | 4 | 8>(4);
    const [copyable, setCopyable] = useState(true);
    const [scrollHint, setScrollHint] = useState(true);
    const [decorative, setDecorative] = useState(false);
    const [copyState, setCopyState] = useState<PixieAsciiCopyState>("idle");
    const { lumiere, cadre } = useAtelierProjection();
    const fixture = asciiFixtures[fixtureSlug];
    const selectedColor = color === "theme" ? false : color;
    const code = decorative
        ? `<PixieAscii
    decorative
    variant="${variant}"
    size="${size}"
    density="${density}"
    padding="${padding}"
    width="${width}"
    align="${align}"
    overflow="${overflow}"
    scrollHint={${scrollHint}}
    maxHeight="${maxHeight}"
    tabSize={${tabSize}}
    texture="${texture}"${selectedColor ? `\n    color="${selectedColor}"` : ""}
>
    {composition}
</PixieAscii>`
        : `<PixieAscii
    label="${fixture.label}"
    alternative={alternative}
    variant="${variant}"
    size="${size}"
    density="${density}"
    padding="${padding}"
    width="${width}"
    align="${align}"
    overflow="${overflow}"
    scrollHint={${scrollHint}}
    maxHeight="${maxHeight}"
    tabSize={${tabSize}}
    texture="${texture}"${selectedColor ? `\n    color="${selectedColor}"` : ""}${copyable ? "\n    copyable" : ""}
>
    {composition}
</PixieAscii>`;

    const selectFixture = (value: string) => {
        const nextFixture = value as PixieAsciiFixtureSlug;
        setFixtureSlug(nextFixture);
        setCopyState("idle");

        if (nextFixture === "tall" || nextFixture === "matrix") {
            setMaxHeight("sm");
            if (nextFixture === "matrix") {
                setOverflow("auto");
            }
        } else if (nextFixture === "wide") {
            setMaxHeight("none");
            setOverflow("auto");
        }
    };

    const toggleDecorative = (checked: boolean) => {
        setDecorative(checked);
        if (checked) {
            setCopyable(false);
        }
    };

    return (
        <div className="overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[19rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-6">
                        <ControlSelect
                            id="ascii-fixture"
                            label="Composition"
                            value={fixtureSlug}
                            options={fixtureOptions}
                            onChange={selectFixture}
                        />
                        <ControlSelect
                            id="ascii-variant"
                            label="Variante"
                            value={variant}
                            options={variants}
                            onChange={(value) =>
                                setVariant(value as PixieAsciiVariant)
                            }
                        />
                        <ControlSelect
                            id="ascii-color"
                            label="Couleur"
                            value={color}
                            options={colors}
                            onChange={(value) =>
                                setColor(
                                    value as
                                        AtelierAnimationColorSlug | "theme",
                                )
                            }
                        />
                        <ControlSelect
                            id="ascii-size"
                            label="Taille"
                            value={size}
                            options={sizes}
                            onChange={(value) =>
                                setSize(value as PixieAsciiSize)
                            }
                        />
                        <ControlSelect
                            id="ascii-density"
                            label="Densité"
                            value={density}
                            options={densities}
                            onChange={(value) =>
                                setDensity(value as PixieAsciiDensity)
                            }
                        />
                        <ControlSelect
                            id="ascii-padding"
                            label="Padding"
                            value={padding}
                            options={paddings}
                            onChange={(value) =>
                                setPadding(value as PixieAsciiPadding)
                            }
                        />
                        <ControlSelect
                            id="ascii-width"
                            label="Largeur"
                            value={width}
                            options={widths}
                            onChange={(value) =>
                                setWidth(value as PixieAsciiWidth)
                            }
                        />
                        <ControlSelect
                            id="ascii-align"
                            label="Alignement"
                            value={align}
                            options={aligns}
                            onChange={(value) =>
                                setAlign(value as PixieAsciiAlign)
                            }
                        />
                        <ControlSelect
                            id="ascii-overflow"
                            label="Débordement"
                            value={overflow}
                            options={overflows}
                            onChange={(value) =>
                                setOverflow(value as PixieAsciiOverflow)
                            }
                        />
                        <ControlSelect
                            id="ascii-max-height"
                            label="Hauteur maximale"
                            value={maxHeight}
                            options={maxHeights}
                            onChange={(value) =>
                                setMaxHeight(value as PixieAsciiMaxHeight)
                            }
                        />
                        <ControlSelect
                            id="ascii-texture"
                            label="Texture"
                            value={texture}
                            options={textures}
                            onChange={(value) =>
                                setTexture(value as PixieAsciiTexture)
                            }
                        />
                        <ControlSelect
                            id="ascii-tab-size"
                            label="Tabulation"
                            value={String(tabSize)}
                            options={[
                                ["2", "2 espaces"],
                                ["4", "4 espaces"],
                                ["8", "8 espaces"],
                            ]}
                            onChange={(value) =>
                                setTabSize(Number(value) as 2 | 4 | 8)
                            }
                        />

                        <label className="flex items-center justify-between gap-4 text-sm font-medium text-ink">
                            Indices de débordement
                            <PixieSwitch
                                size="sm"
                                variant="soft"
                                color="violet-ombre-portee"
                                checked={scrollHint}
                                disabled={overflow === "clip"}
                                onCheckedChange={setScrollHint}
                                aria-label="Afficher les indices de débordement"
                            />
                        </label>

                        <label className="flex items-center justify-between gap-4 text-sm font-medium text-ink">
                            Copie disponible
                            <PixieSwitch
                                size="sm"
                                variant="soft"
                                color="violet-ombre-portee"
                                checked={copyable}
                                disabled={decorative}
                                onCheckedChange={setCopyable}
                                aria-label="Rendre la composition copiable"
                            />
                        </label>

                        <label className="flex items-center justify-between gap-4 text-sm font-medium text-ink">
                            Décorative
                            <PixieSwitch
                                size="sm"
                                variant="soft"
                                color="violet-ombre-portee"
                                checked={decorative}
                                onCheckedChange={toggleDecorative}
                                aria-label="Masquer la composition aux technologies d’assistance"
                            />
                        </label>
                    </div>
                </aside>

                <AtelierPlaygroundProjection>
                    <div
                        data-projection="originale"
                        data-lumiere={lumiere}
                        className="flex min-h-[38rem] items-center justify-center overflow-hidden bg-canvas p-4 sm:p-8"
                    >
                        <div
                            className={`w-full min-w-0 transition-[max-width] ${frameWidths[cadre]}`}
                        >
                            {decorative ? (
                                <PixieAscii
                                    decorative
                                    variant={variant}
                                    color={selectedColor}
                                    size={size}
                                    density={density}
                                    padding={padding}
                                    width={width}
                                    align={align}
                                    overflow={overflow}
                                    scrollHint={scrollHint}
                                    maxHeight={maxHeight}
                                    tabSize={tabSize}
                                    texture={texture}
                                >
                                    {fixture.content}
                                </PixieAscii>
                            ) : (
                                <PixieAscii
                                    label={fixture.label}
                                    alternative={fixture.alternative}
                                    variant={variant}
                                    color={selectedColor}
                                    size={size}
                                    density={density}
                                    padding={padding}
                                    width={width}
                                    align={align}
                                    overflow={overflow}
                                    scrollHint={scrollHint}
                                    maxHeight={maxHeight}
                                    tabSize={tabSize}
                                    texture={texture}
                                    copyable={copyable}
                                    onCopyStateChange={setCopyState}
                                    emptyLabel="La bobine ne contient aucun caractère."
                                    caption={`Fixture de projection · le contenu demeure une simple chaîne autorisée · copie : ${copyState}.`}
                                >
                                    {fixture.content}
                                </PixieAscii>
                            )}
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
