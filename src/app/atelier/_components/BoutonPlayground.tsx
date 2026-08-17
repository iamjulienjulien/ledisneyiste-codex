"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import {
    PixieDustButton,
    type PixieDustButtonSize,
    type PixieDustButtonVariant,
} from "@/components/ui/PixieDustButton";

type Lumiere = "sombre" | "claire";
type Cadre = "compact" | "moyen" | "large";

const variantes: ReadonlyArray<{
    value: PixieDustButtonVariant;
    label: string;
}> = [
    { value: "principal", label: "Principal" },
    { value: "secondaire", label: "Secondaire" },
    { value: "discret", label: "Discret" },
];

const tailles: ReadonlyArray<{
    value: PixieDustButtonSize;
    label: string;
}> = [
    { value: "petit", label: "Petit" },
    { value: "moyen", label: "Moyen" },
    { value: "grand", label: "Grand" },
];

const largeurParCadre: Record<Cadre, string> = {
    compact: "max-w-64",
    moyen: "max-w-md",
    large: "max-w-none",
};

export function BoutonPlayground() {
    const [libelle, setLibelle] = useState("Ouvrir les archives");
    const [variante, setVariante] =
        useState<PixieDustButtonVariant>("principal");
    const [taille, setTaille] = useState<PixieDustButtonSize>("moyen");
    const [lumiere, setLumiere] = useState<Lumiere>("sombre");
    const [cadre, setCadre] = useState<Cadre>("large");
    const [disabled, setDisabled] = useState(false);
    const [miseAuPoint, setMiseAuPoint] = useState(false);

    const code = `<PixieDustButton
    variante="${variante}"
    taille="${taille}"${disabled ? "\n    disabled" : ""}
>
    ${libelle || "Bouton"}
</PixieDustButton>`;

    return (
        <div className="relative z-[10000] overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="bouton-libelle"
                                className="text-sm font-medium text-ink"
                            >
                                Libellé
                            </label>
                            <input
                                id="bouton-libelle"
                                value={libelle}
                                onChange={(event) =>
                                    setLibelle(event.target.value)
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            />
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Variante
                            </legend>
                            <div className="mt-3 space-y-2">
                                {variantes.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="bouton-variante"
                                        {...option}
                                        selectedValue={variante}
                                        onChange={setVariante}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Taille
                            </legend>
                            <div className="mt-3 space-y-2">
                                {tailles.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="bouton-taille"
                                        {...option}
                                        selectedValue={taille}
                                        onChange={setTaille}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div className="space-y-3">
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
                                    checked={miseAuPoint}
                                    onChange={(event) =>
                                        setMiseAuPoint(event.target.checked)
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
                        namePrefix="bouton"
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
                            <PixieDustButton
                                variante={variante}
                                taille={taille}
                                disabled={disabled}
                                miseAuPoint={miseAuPoint}
                            >
                                {libelle || "Bouton"}
                            </PixieDustButton>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
