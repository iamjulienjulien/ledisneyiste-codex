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
import { PixieSymbol, type PixieSymbolSize } from "@/components/ui/PixieSymbol";
import { getSymbol, getSymbolSlugs } from "@/registry/symbols";

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

const generalArchiveSymbolOptions = getSymbolSlugs("general", "archives").map(
    (slug) => ({
        key: `general.archives.${slug}`,
        group: "Général · Archives" as const,
        selection: {
            registry: "general",
            collection: "archives",
            slug,
        } as const,
        definition: getSymbol("general", "archives", slug),
    }),
);

const generalEcritureSymbolOptions = getSymbolSlugs("general", "ecriture").map(
    (slug) => ({
        key: `general.ecriture.${slug}`,
        group: "Général · Écriture" as const,
        selection: {
            registry: "general",
            collection: "ecriture",
            slug,
        } as const,
        definition: getSymbol("general", "ecriture", slug),
    }),
);

const generalExplorationSymbolOptions = getSymbolSlugs(
    "general",
    "exploration",
).map((slug) => ({
    key: `general.exploration.${slug}`,
    group: "Général · Exploration" as const,
    selection: {
        registry: "general",
        collection: "exploration",
        slug,
    } as const,
    definition: getSymbol("general", "exploration", slug),
}));

const generalTempsSymbolOptions = getSymbolSlugs("general", "temps").map(
    (slug) => ({
        key: `general.temps.${slug}`,
        group: "Général · Temps" as const,
        selection: {
            registry: "general",
            collection: "temps",
            slug,
        } as const,
        definition: getSymbol("general", "temps", slug),
    }),
);

const generalAtelierSymbolOptions = getSymbolSlugs("general", "atelier").map(
    (slug) => ({
        key: `general.atelier.${slug}`,
        group: "Général · Atelier" as const,
        selection: {
            registry: "general",
            collection: "atelier",
            slug,
        } as const,
        definition: getSymbol("general", "atelier", slug),
    }),
);

const generalEvenementsSymbolOptions = getSymbolSlugs(
    "general",
    "evenements",
).map((slug) => ({
    key: `general.evenements.${slug}`,
    group: "Général · Événements" as const,
    selection: {
        registry: "general",
        collection: "evenements",
        slug,
    } as const,
    definition: getSymbol("general", "evenements", slug),
}));

const generalCommunicationSymbolOptions = getSymbolSlugs(
    "general",
    "communication",
).map((slug) => ({
    key: `general.communication.${slug}`,
    group: "Général · Communication" as const,
    selection: {
        registry: "general",
        collection: "communication",
        slug,
    } as const,
    definition: getSymbol("general", "communication", slug),
}));

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

const effetsTechniqueSymbolOptions = getSymbolSlugs("techniques", "effets").map(
    (slug) => ({
        key: `techniques.effets.${slug}`,
        group: "Techniques · Effets" as const,
        selection: {
            registry: "techniques",
            collection: "effets",
            slug,
        } as const,
        definition: getSymbol("techniques", "effets", slug),
    }),
);

const imagineeringTechniqueSymbolOptions = getSymbolSlugs(
    "techniques",
    "imagineering",
).map((slug) => ({
    key: `techniques.imagineering.${slug}`,
    group: "Techniques · Imagineering" as const,
    selection: {
        registry: "techniques",
        collection: "imagineering",
        slug,
    } as const,
    definition: getSymbol("techniques", "imagineering", slug),
}));

const personnageIndexSymbolOptions = getSymbolSlugs("index", "personnages").map(
    (slug) => ({
        key: `index.personnages.${slug}`,
        group: "Index · Personnages" as const,
        selection: {
            registry: "index",
            collection: "personnages",
            slug,
        } as const,
        definition: getSymbol("index", "personnages", slug),
    }),
);

const oeuvreIndexSymbolOptions = getSymbolSlugs("index", "oeuvres").map(
    (slug) => ({
        key: `index.oeuvres.${slug}`,
        group: "Index · Œuvres" as const,
        selection: {
            registry: "index",
            collection: "oeuvres",
            slug,
        } as const,
        definition: getSymbol("index", "oeuvres", slug),
    }),
);

const createurIndexSymbolOptions = getSymbolSlugs("index", "createurs").map(
    (slug) => ({
        key: `index.createurs.${slug}`,
        group: "Index · Créateurs" as const,
        selection: {
            registry: "index",
            collection: "createurs",
            slug,
        } as const,
        definition: getSymbol("index", "createurs", slug),
    }),
);

const epoqueIndexSymbolOptions = getSymbolSlugs("index", "epoques").map(
    (slug) => ({
        key: `index.epoques.${slug}`,
        group: "Index · Époques" as const,
        selection: {
            registry: "index",
            collection: "epoques",
            slug,
        } as const,
        definition: getSymbol("index", "epoques", slug),
    }),
);

const chansonIndexSymbolOptions = getSymbolSlugs("index", "chansons").map(
    (slug) => ({
        key: `index.chansons.${slug}`,
        group: "Index · Chansons" as const,
        selection: {
            registry: "index",
            collection: "chansons",
            slug,
        } as const,
        definition: getSymbol("index", "chansons", slug),
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
    ...generalArchiveSymbolOptions,
    ...generalEcritureSymbolOptions,
    ...generalExplorationSymbolOptions,
    ...generalTempsSymbolOptions,
    ...generalAtelierSymbolOptions,
    ...generalEvenementsSymbolOptions,
    ...generalCommunicationSymbolOptions,
    ...personnageIndexSymbolOptions,
    ...oeuvreIndexSymbolOptions,
    ...createurIndexSymbolOptions,
    ...epoqueIndexSymbolOptions,
    ...chansonIndexSymbolOptions,
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
    ...animationTechniqueSymbolOptions,
    ...imageTechniqueSymbolOptions,
    ...couleurTechniqueSymbolOptions,
    ...sonTechniqueSymbolOptions,
    ...effetsTechniqueSymbolOptions,
    ...imagineeringTechniqueSymbolOptions,
] as const;

const symbolGroups = [
    "Général · Logos",
    "Général · Cinéma",
    "Général · Archives",
    "Général · Écriture",
    "Général · Exploration",
    "Général · Temps",
    "Général · Atelier",
    "Général · Événements",
    "Général · Communication",
    "Index · Personnages",
    "Index · Œuvres",
    "Index · Créateurs",
    "Index · Époques",
    "Index · Chansons",
    "Récompenses · Trophées",
    "Techniques · Animation",
    "Techniques · Images",
    "Techniques · Couleur",
    "Techniques · Son",
    "Techniques · Effets",
    "Techniques · Imagineering",
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

const largeurParCadre: Record<AtelierCadre, string> = {
    compact: "max-w-64",
    moyen: "max-w-md",
    large: "max-w-none",
};

export function PixieSymbolPlayground() {
    const [symbolKey, setSymbolKey] = useState<string>(symbolOptions[0].key);
    const [size, setSize] = useState<PixieSymbolPresetSize>("xl");
    const { lumiere, cadre } = useAtelierProjection();
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
        <div className="relative z-[10000] overflow-clip border border-line bg-surface">
            <div className="atelier-playground-grid grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="atelier-playground-controls mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="pixie-symbol-selection"
                                className="text-sm font-medium text-ink"
                            >
                                Symbole
                            </label>
                            <PixieSelect
                                mode="popover"
                                portal
                                size="sm"
                                id="pixie-symbol-selection"
                                value={symbolKey}
                                onChange={(event) =>
                                    setSymbolKey(event.target.value)
                                }
                                className="mt-2"
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
                            </PixieSelect>
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

                <AtelierPlaygroundProjection>
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
                </AtelierPlaygroundProjection>
            </div>
        </div>
    );
}
