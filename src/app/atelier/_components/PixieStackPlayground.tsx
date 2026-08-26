"use client";

import { useState } from "react";
import { AtelierCodePanel } from "@/components/atelier/AtelierCodePanel";
import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import { AtelierRegiePlateau } from "@/components/atelier/AtelierRegiePlateau";
import { PixieCard } from "@/components/ui/PixieCard";
import {
    PixieStack,
    type PixieStackAlign,
    type PixieStackElement,
    type PixieStackGap,
} from "@/components/ui/PixieStack";

const elements = ["div", "section", "article", "nav", "ul", "ol"] as const;

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
        href: "#stack-gaps",
    },
    {
        eyebrow: "Plan 02",
        title: "Le rythme s’installe",
        description: "L’intervalle relie les éléments sans les fusionner.",
        href: "#stack-alignments",
    },
    {
        eyebrow: "Plan 03",
        title: "La scène respire",
        description: "Le dernier plan referme la composition.",
        href: "#stack-semantics",
    },
] as const;

export function PixieStackPlayground() {
    const [element, setElement] = useState<PixieStackElement>("section");
    const [gap, setGap] = useState<PixieStackGap>("md");
    const [align, setAlign] = useState<PixieStackAlign>("stretch");
    const [light, setLight] = useState<"sombre" | "claire">("sombre");
    const [frame, setFrame] = useState<"compact" | "moyen" | "large">("moyen");

    const isList = element === "ul" || element === "ol";
    const isNamedRegion =
        element === "section" || element === "article" || element === "nav";
    const labelledBy = isNamedRegion
        ? '    aria-labelledby="stack-heading"\n'
        : "";
    const heading = isNamedRegion
        ? '    <h2 id="stack-heading">Titre de la séquence</h2>\n'
        : "";
    const codeChildren =
        element === "nav"
            ? '    <a href="#premier-plan">Premier plan</a>\n    <a href="#deuxieme-plan">Deuxième plan</a>\n    <a href="#troisieme-plan">Troisième plan</a>'
            : isList
              ? "    <li>Premier plan</li>\n    <li>Deuxième plan</li>\n    <li>Troisième plan</li>"
              : element === "article"
                ? "    <div>Premier plan</div>\n    <div>Deuxième plan</div>\n    <div>Troisième plan</div>"
                : "    <article>Premier plan</article>\n    <article>Deuxième plan</article>\n    <article>Troisième plan</article>";
    const code = `<PixieStack
    as="${element}"
    gap="${gap}"
    align="${align}"
${labelledBy}>
${heading}${codeChildren}
</PixieStack>`;
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
                                        event.target.value as PixieStackElement,
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
                            <p className="mt-2 text-xs leading-5 text-muted">
                                Les régions section, article et nav reçoivent un
                                nom visible dans l’aperçu.
                            </p>
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
                            <PixieStack
                                as={element}
                                gap={gap}
                                align={align}
                                aria-labelledby={
                                    isNamedRegion
                                        ? "stack-preview-heading"
                                        : undefined
                                }
                                className="border-y border-dashed border-line-strong py-6"
                            >
                                {previewItems.map((item, index) => {
                                    const card = (
                                        <PixieCard
                                            as={
                                                isList ||
                                                element === "article" ||
                                                element === "nav"
                                                    ? "div"
                                                    : "article"
                                            }
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
                                        </PixieCard>
                                    );

                                    return isList ? (
                                        <li
                                            key={item.title}
                                            className={itemWidth}
                                        >
                                            {card}
                                        </li>
                                    ) : element === "nav" ? (
                                        <a
                                            key={item.title}
                                            href={item.href}
                                            className={`${itemWidth} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
                                        >
                                            {card}
                                        </a>
                                    ) : (
                                        <div
                                            key={item.title}
                                            className={itemWidth}
                                        >
                                            {card}
                                        </div>
                                    );
                                })}
                            </PixieStack>
                        </div>
                    </div>

                    <AtelierCodePanel key={code} code={code} />
                </div>
            </div>
        </div>
    );
}
