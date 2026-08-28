"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import { PixieSymbol, type PixieSymbolSize } from "@/components/ui/PixieSymbol";
import { getSymbol, getSymbolSlugs } from "@/registry/symbols";

type Lumiere = "sombre" | "claire";
type Cadre = "compact" | "moyen" | "large";
type PixieSymbolPresetSize = Exclude<PixieSymbolSize, number>;

const generalCinemaSymbolOptions = getSymbolSlugs("general", "cinema").map(
    (slug) => ({
        key: `general.cinema.${slug}`,
        group: "Général · Cinéma" as const,
        selection: {
            registry: "general",
            collection: "cinema",
            slug,
        } as const,
        definition: getSymbol("general", "cinema", slug),
    }),
);

const animationTechniqueSymbolOptions = getSymbolSlugs(
    "techniques",
    "animation",
).map((slug) => ({
    key: `techniques.animation.${slug}`,
    group: "Techniques · Animation" as const,
    selection: {
        registry: "techniques",
        collection: "animation",
        slug,
    } as const,
    definition: getSymbol("techniques", "animation", slug),
}));

const imageTechniqueSymbolOptions = getSymbolSlugs("techniques", "images").map(
    (slug) => ({
        key: `techniques.images.${slug}`,
        group: "Techniques · Images" as const,
        selection: {
            registry: "techniques",
            collection: "images",
            slug,
        } as const,
        definition: getSymbol("techniques", "images", slug),
    }),
);

const couleurTechniqueSymbolOptions = getSymbolSlugs(
    "techniques",
    "couleur",
).map((slug) => ({
    key: `techniques.couleur.${slug}`,
    group: "Techniques · Couleur" as const,
    selection: {
        registry: "techniques",
        collection: "couleur",
        slug,
    } as const,
    definition: getSymbol("techniques", "couleur", slug),
}));

const sonTechniqueSymbolOptions = getSymbolSlugs("techniques", "son").map(
    (slug) => ({
        key: `techniques.son.${slug}`,
        group: "Techniques · Son" as const,
        selection: {
            registry: "techniques",
            collection: "son",
            slug,
        } as const,
        definition: getSymbol("techniques", "son", slug),
    }),
);

const symbolOptions = [
    {
        key: "general.logos.le-codex-du-disneyiste",
        group: "Général · Logos",
        selection: {
            registry: "general",
            collection: "logos",
            slug: "le-codex-du-disneyiste",
        },
        definition: getSymbol("general", "logos", "le-codex-du-disneyiste"),
    },
    ...generalCinemaSymbolOptions,
    {
        key: "codex.index.personnages",
        group: "Codex · Index",
        selection: {
            registry: "codex",
            collection: "index",
            slug: "personnages",
        },
        definition: getSymbol("codex", "index", "personnages"),
    },
    {
        key: "codex.index.createurs",
        group: "Codex · Index",
        selection: {
            registry: "codex",
            collection: "index",
            slug: "createurs",
        },
        definition: getSymbol("codex", "index", "createurs"),
    },
    {
        key: "codex.index.oeuvres",
        group: "Codex · Index",
        selection: {
            registry: "codex",
            collection: "index",
            slug: "oeuvres",
        },
        definition: getSymbol("codex", "index", "oeuvres"),
    },
    {
        key: "codex.index.epoques",
        group: "Codex · Index",
        selection: {
            registry: "codex",
            collection: "index",
            slug: "epoques",
        },
        definition: getSymbol("codex", "index", "epoques"),
    },
    {
        key: "recompenses.trophees.statuette-oscar",
        group: "Récompenses · Trophées",
        selection: {
            registry: "recompenses",
            collection: "trophees",
            slug: "statuette-oscar",
        },
        definition: getSymbol("recompenses", "trophees", "statuette-oscar"),
    },
    {
        key: "recompenses.trophees.plaque-technique-multiplane",
        group: "Récompenses · Trophées",
        selection: {
            registry: "recompenses",
            collection: "trophees",
            slug: "plaque-technique-multiplane",
        },
        definition: getSymbol(
            "recompenses",
            "trophees",
            "plaque-technique-multiplane",
        ),
    },
    {
        key: "recompenses.trophees.medaille-societe-des-nations",
        group: "Récompenses · Trophées",
        selection: {
            registry: "recompenses",
            collection: "trophees",
            slug: "medaille-societe-des-nations",
        },
        definition: getSymbol(
            "recompenses",
            "trophees",
            "medaille-societe-des-nations",
        ),
    },
    {
        key: "recompenses.trophees.medaille-or-venise",
        group: "Récompenses · Trophées",
        selection: {
            registry: "recompenses",
            collection: "trophees",
            slug: "medaille-or-venise",
        },
        definition: getSymbol("recompenses", "trophees", "medaille-or-venise"),
    },
    {
        key: "blocs.personnages.genese",
        group: "Blocs · Personnages",
        selection: {
            registry: "blocs",
            collection: "personnages",
            slug: "genese",
        },
        definition: getSymbol("blocs", "personnages", "genese"),
    },
    {
        key: "blocs.personnages.caractere",
        group: "Blocs · Personnages",
        selection: {
            registry: "blocs",
            collection: "personnages",
            slug: "caractere",
        },
        definition: getSymbol("blocs", "personnages", "caractere"),
    },
    {
        key: "blocs.personnages.trajectoire",
        group: "Blocs · Personnages",
        selection: {
            registry: "blocs",
            collection: "personnages",
            slug: "trajectoire",
        },
        definition: getSymbol("blocs", "personnages", "trajectoire"),
    },
    {
        key: "blocs.contributeurs.debuts",
        group: "Blocs · Contributeurs",
        selection: {
            registry: "blocs",
            collection: "contributeurs",
            slug: "debuts",
        },
        definition: getSymbol("blocs", "contributeurs", "debuts"),
    },
    {
        key: "blocs.contributeurs.signature",
        group: "Blocs · Contributeurs",
        selection: {
            registry: "blocs",
            collection: "contributeurs",
            slug: "signature",
        },
        definition: getSymbol("blocs", "contributeurs", "signature"),
    },
    {
        key: "blocs.contributeurs.trajectoire",
        group: "Blocs · Contributeurs",
        selection: {
            registry: "blocs",
            collection: "contributeurs",
            slug: "trajectoire",
        },
        definition: getSymbol("blocs", "contributeurs", "trajectoire"),
    },
    {
        key: "blocs.contributeurs.transmission",
        group: "Blocs · Contributeurs",
        selection: {
            registry: "blocs",
            collection: "contributeurs",
            slug: "transmission",
        },
        definition: getSymbol("blocs", "contributeurs", "transmission"),
    },
    {
        key: "blocs.oeuvres.repere",
        group: "Blocs · Œuvres",
        selection: {
            registry: "blocs",
            collection: "oeuvres",
            slug: "repere",
        },
        definition: getSymbol("blocs", "oeuvres", "repere"),
    },
    {
        key: "blocs.oeuvres.langage",
        group: "Blocs · Œuvres",
        selection: {
            registry: "blocs",
            collection: "oeuvres",
            slug: "langage",
        },
        definition: getSymbol("blocs", "oeuvres", "langage"),
    },
    {
        key: "blocs.oeuvres.relations",
        group: "Blocs · Œuvres",
        selection: {
            registry: "blocs",
            collection: "oeuvres",
            slug: "relations",
        },
        definition: getSymbol("blocs", "oeuvres", "relations"),
    },
    {
        key: "blocs.epoques.fondations",
        group: "Blocs · Époques",
        selection: {
            registry: "blocs",
            collection: "epoques",
            slug: "fondations",
        },
        definition: getSymbol("blocs", "epoques", "fondations"),
    },
    {
        key: "blocs.epoques.mutations",
        group: "Blocs · Époques",
        selection: {
            registry: "blocs",
            collection: "epoques",
            slug: "mutations",
        },
        definition: getSymbol("blocs", "epoques", "mutations"),
    },
    {
        key: "blocs.epoques.tensions",
        group: "Blocs · Époques",
        selection: {
            registry: "blocs",
            collection: "epoques",
            slug: "tensions",
        },
        definition: getSymbol("blocs", "epoques", "tensions"),
    },
    ...animationTechniqueSymbolOptions,
    ...imageTechniqueSymbolOptions,
    ...couleurTechniqueSymbolOptions,
    ...sonTechniqueSymbolOptions,
] as const;

const symbolGroups = [
    "Général · Logos",
    "Général · Cinéma",
    "Codex · Index",
    "Récompenses · Trophées",
    "Techniques · Animation",
    "Techniques · Images",
    "Techniques · Couleur",
    "Techniques · Son",
    "Blocs · Personnages",
    "Blocs · Contributeurs",
    "Blocs · Œuvres",
    "Blocs · Époques",
] as const;

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

const largeurParCadre: Record<Cadre, string> = {
    compact: "max-w-64",
    moyen: "max-w-md",
    large: "max-w-none",
};

export function PixieSymbolPlayground() {
    const [symbolKey, setSymbolKey] = useState<string>(symbolOptions[0].key);
    const [size, setSize] = useState<PixieSymbolPresetSize>("xl");
    const [lumiere, setLumiere] = useState<Lumiere>("sombre");
    const [cadre, setCadre] = useState<Cadre>("large");
    const [informatif, setInformatif] = useState(false);
    const symbolOption =
        symbolOptions.find((option) => option.key === symbolKey) ??
        symbolOptions[0];
    const symbole = symbolOption.definition;
    const { registry, collection, slug } = symbolOption.selection;
    const code = informatif
        ? `<PixieSymbol
    registry="${registry}"
    collection="${collection}"
    slug="${slug}"
    size="${size}"
    decorative={false}
    label="${symbole.label}"
/>`
        : `<PixieSymbol
    registry="${registry}"
    collection="${collection}"
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
                                htmlFor="pixie-symbol-selection"
                                className="text-sm font-medium text-ink"
                            >
                                Symbole
                            </label>
                            <select
                                id="pixie-symbol-selection"
                                value={symbolKey}
                                onChange={(event) =>
                                    setSymbolKey(event.target.value)
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            >
                                {symbolGroups.map((group) => (
                                    <optgroup key={group} label={group}>
                                        {symbolOptions
                                            .filter(
                                                (option) =>
                                                    option.group === group,
                                            )
                                            .map((option) => (
                                                <option
                                                    key={option.key}
                                                    value={option.key}
                                                >
                                                    {option.definition.label}
                                                </option>
                                            ))}
                                    </optgroup>
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
                    <AtelierRegiePlateau
                        namePrefix="pixie-symbol"
                        lumiere={lumiere}
                        onLumiereChange={setLumiere}
                        cadre={cadre}
                        onCadreChange={setCadre}
                    />

                    <div
                        data-projection="originale"
                        data-lumiere={lumiere}
                        className="flex min-h-80 items-center justify-center overflow-auto bg-canvas p-8"
                    >
                        <div
                            className={`flex min-h-48 w-full items-center justify-center border border-line bg-surface p-6 transition-[max-width] ${largeurParCadre[cadre]}`}
                        >
                            <PixieSymbol
                                {...symbolOption.selection}
                                size={size}
                                decorative={!informatif}
                                label={informatif ? symbole.label : undefined}
                            />
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
