"use client";

import { useState } from "react";
import {
    BoutonEsquisse,
    type TailleBouton,
    type VarianteBouton,
} from "./BoutonEsquisse";

type Lumiere = "sombre" | "claire";
type Cadre = "compact" | "moyen" | "large";

const variantes: ReadonlyArray<{
    valeur: VarianteBouton;
    libelle: string;
}> = [
    { valeur: "principal", libelle: "Principal" },
    { valeur: "secondaire", libelle: "Secondaire" },
    { valeur: "discret", libelle: "Discret" },
];

const tailles: ReadonlyArray<{ valeur: TailleBouton; libelle: string }> = [
    { valeur: "petit", libelle: "Petit" },
    { valeur: "moyen", libelle: "Moyen" },
    { valeur: "grand", libelle: "Grand" },
];

const cadres: ReadonlyArray<{ valeur: Cadre; libelle: string }> = [
    { valeur: "compact", libelle: "Compact" },
    { valeur: "moyen", libelle: "Moyen" },
    { valeur: "large", libelle: "Large" },
];

const largeurParCadre: Record<Cadre, string> = {
    compact: "max-w-64",
    moyen: "max-w-md",
    large: "max-w-none",
};

function OptionRadio<T extends string>({
    nom,
    valeur,
    libelle,
    selection,
    onChange,
}: Readonly<{
    nom: string;
    valeur: T;
    libelle: string;
    selection: T;
    onChange: (valeur: T) => void;
}>) {
    return (
        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
            <input
                type="radio"
                name={nom}
                value={valeur}
                checked={selection === valeur}
                onChange={() => onChange(valeur)}
                className="accent-accent"
            />
            {libelle}
        </label>
    );
}

export function BoutonPlayground() {
    const [libelle, setLibelle] = useState("Ouvrir les archives");
    const [variante, setVariante] = useState<VarianteBouton>("principal");
    const [taille, setTaille] = useState<TailleBouton>("moyen");
    const [lumiere, setLumiere] = useState<Lumiere>("sombre");
    const [cadre, setCadre] = useState<Cadre>("large");
    const [disabled, setDisabled] = useState(false);
    const [miseAuPoint, setMiseAuPoint] = useState(false);
    const [copie, setCopie] = useState<"repos" | "copie" | "erreur">("repos");

    const code = `<BoutonEsquisse
    variante="${variante}"
    taille="${taille}"${disabled ? "\n    disabled" : ""}
>
    ${libelle || "Bouton"}
</BoutonEsquisse>`;

    function signalerModification() {
        setCopie("repos");
    }

    async function copierLeCode() {
        try {
            await navigator.clipboard.writeText(code);
            setCopie("copie");
        } catch {
            setCopie("erreur");
        }
    }

    return (
        <div className="overflow-hidden border border-line bg-surface">
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
                                onChange={(event) => {
                                    setLibelle(event.target.value);
                                    signalerModification();
                                }}
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 text-sm text-ink"
                            />
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Variante
                            </legend>
                            <div className="mt-3 space-y-2">
                                {variantes.map((option) => (
                                    <OptionRadio
                                        key={option.valeur}
                                        nom="bouton-variante"
                                        {...option}
                                        selection={variante}
                                        onChange={(valeur) => {
                                            setVariante(valeur);
                                            signalerModification();
                                        }}
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
                                    <OptionRadio
                                        key={option.valeur}
                                        nom="bouton-taille"
                                        {...option}
                                        selection={taille}
                                        onChange={(valeur) => {
                                            setTaille(valeur);
                                            signalerModification();
                                        }}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Lumière du plateau
                            </legend>
                            <div className="mt-3 space-y-2">
                                <OptionRadio
                                    nom="bouton-lumiere"
                                    valeur="sombre"
                                    libelle="Sombre"
                                    selection={lumiere}
                                    onChange={setLumiere}
                                />
                                <OptionRadio
                                    nom="bouton-lumiere"
                                    valeur="claire"
                                    libelle="Claire"
                                    selection={lumiere}
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
                                    <OptionRadio
                                        key={option.valeur}
                                        nom="bouton-cadre"
                                        {...option}
                                        selection={cadre}
                                        onChange={setCadre}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <div className="space-y-3">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
                                <input
                                    type="checkbox"
                                    checked={disabled}
                                    onChange={(event) => {
                                        setDisabled(event.target.checked);
                                        signalerModification();
                                    }}
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
                    <div
                        data-projection="originale"
                        data-lumiere={lumiere}
                        className="relative z-[10000] flex min-h-80 items-center justify-center overflow-auto bg-canvas p-8"
                    >
                        <div
                            className={`flex min-h-48 w-full items-center justify-center border border-line bg-surface p-6 transition-[max-width] ${largeurParCadre[cadre]}`}
                        >
                            <BoutonEsquisse
                                variante={variante}
                                taille={taille}
                                disabled={disabled}
                                miseAuPoint={miseAuPoint}
                            >
                                {libelle || "Bouton"}
                            </BoutonEsquisse>
                        </div>
                    </div>

                    <div className="border-t border-line bg-canvas">
                        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
                            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                                Code à copier
                            </p>
                            <button
                                type="button"
                                onClick={copierLeCode}
                                className="text-sm font-medium text-accent hover:text-accent-hover"
                            >
                                {copie === "copie" ? "Copié ✓" : "Copier"}
                            </button>
                        </div>
                        <pre className="overflow-x-auto p-5 font-mono text-sm leading-6 text-ink-soft">
                            <code>{code}</code>
                        </pre>
                        <p
                            aria-live="polite"
                            className="px-5 pb-4 text-xs text-muted"
                        >
                            {copie === "erreur"
                                ? "La copie automatique a échoué. Le code peut être sélectionné manuellement."
                                : copie === "copie"
                                  ? "Le code est dans le presse-papiers."
                                  : "Les réglages mettent cet exemple à jour en direct."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
