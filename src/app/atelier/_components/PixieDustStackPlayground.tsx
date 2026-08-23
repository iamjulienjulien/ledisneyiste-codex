"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import { PixieDustCard } from "@/components/ui/PixieDustCard";
import {
    PixieDustStack,
    type PixieDustStackAlign,
    type PixieDustStackElement,
    type PixieDustStackGap,
} from "@/components/ui/PixieDustStack";

const elements = ["div", "section", "ul", "ol"] as const;

const gaps = [
    { value: "none", label: "Aucun" },
    { value: "xs", label: "Très petit" },
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
    { value: "xl", label: "Très grand" },
] as const;

const alignments = [
    { value: "stretch", label: "Étiré" },
    { value: "start", label: "Début" },
    { value: "center", label: "Centre" },
    { value: "end", label: "Fin" },
] as const;

const frameWidths = {
    compact: "max-w-sm",
    moyen: "max-w-2xl",
    large: "max-w-4xl",
} as const satisfies Record<"compact" | "moyen" | "large", string>;

const previewItems = [
    {
        eyebrow: "Plan 01",
        title: "Le mouvement se dessine",
        description: "Un premier groupe ouvre la séquence.",
    },
    {
        eyebrow: "Plan 02",
        title: "Le rythme s’installe",
        description: "L’intervalle relie les éléments sans les fusionner.",
    },
    {
        eyebrow: "Plan 03",
        title: "La scène respire",
        description: "Le dernier plan referme la composition.",
    },
] as const;

export function PixieDustStackPlayground() {
    const [element, setElement] = useState<PixieDustStackElement>("section");
    const [gap, setGap] = useState<PixieDustStackGap>("md");
    const [align, setAlign] = useState<PixieDustStackAlign>("stretch");
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const isList = element === "ul" || element === "ol";
    const childElement = isList ? "li" : "article";
    const labelledBy =
        element === "section" ? '    aria-labelledby="stack-heading"\n' : "";
    const code = `<PixieDustStack
    as="${element}"
    gap="${gap}"
    align="${align}"
${labelledBy}>
    <${childElement}>Premier plan</${childElement}>
    <${childElement}>Deuxième plan</${childElement}>
    <${childElement}>Troisième plan</${childElement}>
</PixieDustStack>`;
    const itemWidth = align === "stretch" ? "w-full" : "w-full max-w-sm";

    return (
        <div className="overflow-hidden border border-line bg-surface">
            <div className="grid lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-line bg-surface-muted p-6 lg:border-r lg:border-b-0">
                    <h4 className="text-xl text-ink">Table de réglage</h4>

                    <div className="mt-6 space-y-7">
                        <div>
                            <label
                                htmlFor="stack-element"
                                className="text-sm font-medium text-ink"
                            >
                                Élément sémantique
                            </label>
                            <select
                                id="stack-element"
                                value={element}
                                onChange={(event) =>
                                    setElement(
                                        event.target
                                            .value as PixieDustStackElement,
                                    )
                                }
                                className="mt-2 w-full border border-line-strong bg-canvas px-3 py-2 font-mono text-sm text-ink"
                            >
                                {elements.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Rythme
                            </legend>
                            <div className="mt-3 space-y-2">
                                {gaps.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="stack-gap"
                                        {...option}
                                        selectedValue={gap}
                                        onChange={setGap}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-medium text-ink">
                                Alignement
                            </legend>
                            <div className="mt-3 space-y-2">
                                {alignments.map((option) => (
                                    <AtelierOptionRadio
                                        key={option.value}
                                        name="stack-align"
                                        {...option}
                                        selectedValue={align}
                                        onChange={setAlign}
                                    />
                                ))}
                            </div>
                        </fieldset>
                    </div>
                </aside>

                <div className="min-w-0">
                    <AtelierRegiePlateau
                        namePrefix="stack"
                        lumiere={light}
                        onLumiereChange={setLight}
                        cadre={frame}
                        onCadreChange={setFrame}
                    />

                    <div
                        data-projection="originale"
                        data-lumiere={light}
                        className="flex min-h-[42rem] items-center justify-center overflow-auto bg-canvas p-6 sm:p-10"
                    >
                        <div
                            className={`w-full transition-[max-width] ${frameWidths[frame]}`}
                        >
                            <PixieDustStack
                                as={element}
                                gap={gap}
                                align={align}
                                aria-labelledby={
                                    element === "section"
                                        ? "stack-preview-heading"
                                        : undefined
                                }
                                className="border-y border-dashed border-line-strong py-6"
                            >
                                {previewItems.map((item, index) => {
                                    const card = (
                                        <PixieDustCard
                                            as={isList ? "div" : "article"}
                                            variant="outline"
                                            padding="md"
                                            className={
                                                isList ? "w-full" : itemWidth
                                            }
                                        >
                                            <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                                {item.eyebrow}
                                            </p>
                                            <h4
                                                id={
                                                    index === 0
                                                        ? "stack-preview-heading"
                                                        : undefined
                                                }
                                                className="mt-2 text-xl text-ink"
                                            >
                                                {item.title}
                                            </h4>
                                            <p className="mt-3 text-sm leading-6 text-ink-soft">
                                                {item.description}
                                            </p>
                                        </PixieDustCard>
                                    );

                                    return isList ? (
                                        <li
                                            key={item.title}
                                            className={itemWidth}
                                        >
                                            {card}
                                        </li>
                                    ) : (
                                        <div
                                            key={item.title}
                                            className={itemWidth}
                                        >
                                            {card}
                                        </div>
                                    );
                                })}
                            </PixieDustStack>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
