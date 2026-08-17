"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieBadge,
    type PixieBadgeShape,
    type PixieBadgeSize,
    type PixieBadgeTone,
    type PixieBadgeVariant,
} from "@/components/ui/PixieBadge";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import {
    getAtelierAnimationColor,
    getAtelierAnimationColorSlugs,
} from "@/registry/colors";
import { getMetadata, getMetadataSelections } from "@/registry/metadata";
import type { AtelierAnimationColorSlug } from "@/types/colors";
import type { MetadataSelection } from "@/types/metadata";

const variants = [
    { value: "soft", label: "Doux" },
    { value: "outline", label: "Contour" },
    { value: "plain", label: "Simple" },
    { value: "solid", label: "Plein" },
] as const;

const tones = [
    { value: "neutral", label: "Neutre" },
    { value: "color", label: "Couleur" },
    { value: "inherit", label: "Hérité" },
] as const;

const sizes = [
    { value: "xs", label: "Très petit" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
    { value: "xl", label: "Très grand" },
] as const;

const shapes = [
    { value: "rounded", label: "Arrondi" },
    { value: "pill", label: "Capsule" },
] as const;

const frameWidths: Record<"compact" | "moyen" | "large", string> = {
    compact: "max-w-64",
    moyen: "max-w-md",
    large: "max-w-none",
};

const metadataSelections = getMetadataSelections();
const colorSlugs = getAtelierAnimationColorSlugs();
const initialMetadataSelection =
    metadataSelections.find(
        (selection) =>
            selection.registry === "oeuvres" &&
            selection.collection === "types" &&
            selection.slug === "court-metrage-anime",
    ) ?? metadataSelections[0];

export function PixieBadgePlayground() {
    const [mode, setMode] = useState<"registry" | "custom">("registry");
    const [metadataSelection, setMetadataSelection] =
        useState<MetadataSelection>(initialMetadataSelection);
    const [label, setLabel] = useState("Court métrage");
    const [variant, setVariant] = useState<PixieBadgeVariant>("solid");
    const [tone, setTone] = useState<PixieBadgeTone>("color");
    const [size, setSize] = useState<PixieBadgeSize>("md");
    const [shape, setShape] = useState<PixieBadgeShape>("rounded");
    const [withIcon, setWithIcon] = useState(false);
    const [color, setColor] =
        useState<AtelierAnimationColorSlug>("rouge-crayon");
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("large");

    const registries = Array.from(
        new Set(metadataSelections.map((selection) => selection.registry)),
    );
    const collections = Array.from(
        new Set(
            metadataSelections
                .filter(
                    (selection) =>
                        selection.registry === metadataSelection.registry,
                )
                .map((selection) => selection.collection),
        ),
    );
    const slugs = metadataSelections.filter(
        (selection) =>
            selection.registry === metadataSelection.registry &&
            selection.collection === metadataSelection.collection,
    );
    const safeLabel = label || "Cartouche";
    const iconCode = withIcon
        ? `\n    icon={\n        <PixieSymbol\n            registry="codex"\n            collection="index"\n            slug="oeuvres"\n            size={14}\n        />\n    }`
        : "";
    const code =
        mode === "registry"
            ? `<PixieBadge
    registry="${metadataSelection.registry}"
    collection="${metadataSelection.collection}"
    slug="${metadataSelection.slug}"
    variant="${variant}"
    size="${size}"
    shape="${shape}"${iconCode}
/>`
            : `<PixieBadge
    variant="${variant}"
    tone="${tone}"
    size="${size}"
    shape="${shape}"${tone === "color" ? `\n    color="${color}"` : ""}${iconCode}
>
    ${safeLabel}
</PixieBadge>`;
    const icon = withIcon ? (
        <PixieSymbol
            registry="codex"
            collection="index"
            slug="oeuvres"
            size={14}
        />
    ) : undefined;

    function selectRegistry(registry: string) {
        const selection = metadataSelections.find(
            (candidate) => candidate.registry === registry,
        );

        if (selection) {
            setMetadataSelection(selection);
        }
    }

    function selectCollection(collection: string) {
        const selection = metadataSelections.find(
            (candidate) =>
                candidate.registry === metadataSelection.registry &&
                candidate.collection === collection,
        );

        if (selection) {
            setMetadataSelection(selection);
        }
    }

    function selectSlug(slug: string) {
        const selection = slugs.find((candidate) => candidate.slug === slug);

        if (selection) {
            setMetadataSelection(selection);
        }
    }

    return (
        <div className="relative z-[10000] overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Source
                            </legend>
                            <div className="mt-3 space-y-2">
                                <AtelierOptionRadio
                                    name="badge-mode"
                                    value="registry"
                                    label="Registre"
                                    selectedValue={mode}
                                    onChange={setMode}
                                />
                                <AtelierOptionRadio
                                    name="badge-mode"
                                    value="custom"
                                    label="Libre"
                                    selectedValue={mode}
                                    onChange={setMode}
                                />
                            </div>
                        </fieldset>

                        {mode === "registry" ? (
                            <div className="space-y-5">
                                <div>
                                    <label
                                        htmlFor="badge-registry"
                                        className="text-sm font-medium text-ink"
                                    >
                                        Registre
                                    </label>
                                    <select
                                        id="badge-registry"
                                        value={metadataSelection.registry}
                                        onChange={(event) =>
                                            selectRegistry(event.target.value)
                                        }
                                        className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                                    >
                                        {registries.map((registry) => (
                                            <option
                                                key={registry}
                                                value={registry}
                                            >
                                                {registry}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="badge-collection"
                                        className="text-sm font-medium text-ink"
                                    >
                                        Collection
                                    </label>
                                    <select
                                        id="badge-collection"
                                        value={metadataSelection.collection}
                                        onChange={(event) =>
                                            selectCollection(event.target.value)
                                        }
                                        className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                                    >
                                        {collections.map((collection) => (
                                            <option
                                                key={collection}
                                                value={collection}
                                            >
                                                {collection}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="badge-slug"
                                        className="text-sm font-medium text-ink"
                                    >
                                        Métadonnée
                                    </label>
                                    <select
                                        id="badge-slug"
                                        value={metadataSelection.slug}
                                        onChange={(event) =>
                                            selectSlug(event.target.value)
                                        }
                                        className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                                    >
                                        {slugs.map((selection) => (
                                            <option
                                                key={selection.slug}
                                                value={selection.slug}
                                            >
                                                {getMetadata(selection).label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
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

                                {tone === "color" ? (
                                    <div>
                                        <label
                                            htmlFor="badge-color"
                                            className="text-sm font-medium text-ink"
                                        >
                                            Couleur du registre
                                        </label>
                                        <select
                                            id="badge-color"
                                            value={color}
                                            onChange={(event) =>
                                                setColor(
                                                    event.target
                                                        .value as AtelierAnimationColorSlug,
                                                )
                                            }
                                            className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                                        >
                                            {colorSlugs.map((slug) => (
                                                <option key={slug} value={slug}>
                                                    {
                                                        getAtelierAnimationColor(
                                                            slug,
                                                        ).label
                                                    }
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : null}
                            </div>
                        )}

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
                            {mode === "registry" ? (
                                <PixieBadge
                                    {...metadataSelection}
                                    variant={variant}
                                    size={size}
                                    shape={shape}
                                    icon={icon}
                                />
                            ) : (
                                <PixieBadge
                                    variant={variant}
                                    tone={tone}
                                    size={size}
                                    shape={shape}
                                    color={tone === "color" ? color : undefined}
                                    icon={icon}
                                >
                                    {safeLabel}
                                </PixieBadge>
                            )}
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
