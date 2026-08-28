"use client";

import { useState } from "react";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import { colorsAtelierAnimation } from "@/registry/colors";
import type { CouleurReference } from "@/types/colors";

const projectionSombre = [
    {
        nom: "Noir de salle",
        token: "--projection-originale-noir-de-salle",
        valeur: "#111018",
        encre: "claire",
    },
    {
        nom: "Ombre projetée",
        token: "--projection-originale-ombre-projetee",
        valeur: "#181621",
        encre: "claire",
    },
    {
        nom: "Pellicule",
        token: "--projection-originale-pellicule",
        valeur: "#201D29",
        encre: "claire",
    },
    {
        nom: "Perforation",
        token: "--projection-originale-perforation",
        valeur: "#302B3A",
        encre: "claire",
    },
    {
        nom: "Bobine",
        token: "--projection-originale-bobine",
        valeur: "#4B4359",
        encre: "claire",
    },
    {
        nom: "Argentique",
        token: "--projection-originale-argentique",
        valeur: "#91899B",
        encre: "sombre",
    },
    {
        nom: "Intertitre",
        token: "--projection-originale-intertitre",
        valeur: "#C9C2CE",
        encre: "sombre",
    },
    {
        nom: "Écran",
        token: "--projection-originale-ecran",
        valeur: "#F6F1E8",
        encre: "sombre",
    },
    {
        nom: "Lueur Technicolor",
        token: "--projection-originale-lueur-technicolor",
        valeur: "#B7A2DF",
        encre: "sombre",
    },
    {
        nom: "Halo Technicolor",
        token: "--projection-originale-halo-technicolor",
        valeur: "#D0C0EF",
        encre: "sombre",
    },
    {
        nom: "Bain violet",
        token: "--projection-originale-bain-violet",
        valeur: "#282137",
        encre: "claire",
    },
    {
        nom: "Contrechamp",
        token: "--projection-originale-contrechamp",
        valeur: "#16131D",
        encre: "claire",
    },
] as const satisfies readonly CouleurReference[];

const projectionClaire = [
    {
        nom: "Papier de projection",
        token: "--projection-originale-papier-projection",
        valeur: "#F7F4EE",
        encre: "sombre",
    },
    {
        nom: "Toile",
        token: "--projection-originale-toile",
        valeur: "#FFFDF8",
        encre: "sombre",
    },
    {
        nom: "Nitrate",
        token: "--projection-originale-nitrate",
        valeur: "#F0ECE5",
        encre: "sombre",
    },
    {
        nom: "Encre",
        token: "--projection-originale-encre",
        valeur: "#211E26",
        encre: "claire",
    },
    {
        nom: "Encre douce",
        token: "--projection-originale-encre-douce",
        valeur: "#5F5966",
        encre: "claire",
    },
    {
        nom: "Poussière",
        token: "--projection-originale-poussiere",
        valeur: "#857E8B",
        encre: "sombre",
    },
    {
        nom: "Filet",
        token: "--projection-originale-filet",
        valeur: "#DED8E1",
        encre: "sombre",
    },
    {
        nom: "Bobine claire",
        token: "--projection-originale-bobine-claire",
        valeur: "#C7BDCD",
        encre: "sombre",
    },
    {
        nom: "Violet générique",
        token: "--projection-originale-violet-generique",
        valeur: "#51446F",
        encre: "claire",
    },
    {
        nom: "Violet profond",
        token: "--projection-originale-violet-generique-profond",
        valeur: "#403657",
        encre: "claire",
    },
    {
        nom: "Lavande diffuse",
        token: "--projection-originale-lavande-diffuse",
        valeur: "#EDE8F3",
        encre: "sombre",
    },
    {
        nom: "Carton lumière",
        token: "--projection-originale-carton-lumiere",
        valeur: "#FFFAF2",
        encre: "sombre",
    },
    {
        nom: "Violet repère",
        token: "--projection-originale-violet-repere",
        valeur: "#75658F",
        encre: "claire",
    },
] as const satisfies readonly CouleurReference[];

const atelierAnimation = Object.values(colorsAtelierAnimation).map((color) => ({
    nom: color.label,
    token: color.token,
    valeur: color.value,
    encre: color.foreground === "light" ? "claire" : "sombre",
})) satisfies readonly CouleurReference[];

const rolesSemantiques = [
    ["Canvas", "bg-canvas", "bg-canvas", "Fond général"],
    ["Surface", "bg-surface", "bg-surface", "Premier niveau"],
    ["Surface muted", "bg-surface-muted", "bg-surface-muted", "Second niveau"],
    ["Ink", "text-ink", "bg-ink", "Texte principal"],
    ["Ink soft", "text-ink-soft", "bg-ink-soft", "Texte courant"],
    ["Muted", "text-muted", "bg-muted", "Information discrète"],
    ["Accent", "text-accent", "bg-accent", "Action et repère"],
    ["Line", "border-line", "bg-line", "Séparation"],
] as const;

function Nuancier({ couleurs }: { couleurs: readonly CouleurReference[] }) {
    return (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {couleurs.map((couleur) => (
                <article
                    key={couleur.token}
                    className="overflow-hidden border border-line bg-surface"
                >
                    <div
                        className="flex min-h-28 flex-col justify-end p-4"
                        style={{
                            backgroundColor: `var(${couleur.token})`,
                            color:
                                couleur.encre === "claire"
                                    ? "var(--projection-originale-ecran)"
                                    : "var(--projection-originale-noir-de-salle)",
                        }}
                    >
                        <h5 className="font-sans text-sm font-semibold tracking-normal">
                            {couleur.nom}
                        </h5>
                        <p className="mt-1 font-mono text-xs opacity-75">
                            {couleur.valeur}
                        </p>
                    </div>
                    <p className="overflow-x-auto px-4 py-3 font-mono text-[0.6875rem] text-muted">
                        {couleur.token}
                    </p>
                </article>
            ))}
        </div>
    );
}

export function PalettesPellicule() {
    const [lumiere, setLumiere] = useState<"sombre" | "claire">("sombre");

    return (
        <div className="mt-12 space-y-16">
            <section aria-labelledby="typographie-pellicule">
                <div className="max-w-3xl">
                    <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.18em] text-accent">
                        Fondation typographique
                    </p>
                    <h3
                        id="typographie-pellicule"
                        className="mt-3 text-3xl text-ink"
                    >
                        Typographie
                    </h3>
                    <p className="mt-4 leading-7 text-ink-soft">
                        Cinq voix composent l’identité du Codex : le geste animé
                        de sa signature, l’élégance de ses intertitres, la
                        clarté de ses récits, la précision de ses repères et la
                        rigueur technique de l’Atelier.
                    </p>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    <article className="border border-line bg-surface p-6 sm:p-8 lg:col-span-2">
                        <p className="font-eyebrow text-xs font-medium uppercase tracking-[0.18em] text-muted">
                            Signature du studio
                        </p>
                        <p className="mt-5 font-brand text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl">
                            Le Codex du Disneyiste
                        </p>
                        <p className="mt-5 font-mono text-xs text-accent">
                            font-brand · Grandstander
                        </p>
                    </article>

                    <article className="border border-line bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.18em] text-muted">
                            Intertitres et chapitres
                        </p>
                        <p className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                            Il était une fois…
                        </p>
                        <p className="mt-5 font-mono text-xs text-accent">
                            font-display · Fraunces
                        </p>
                    </article>

                    <article className="border border-line bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.18em] text-muted">
                            Typographie de lecture
                        </p>
                        <p className="mt-5 max-w-lg text-lg leading-8 text-ink-soft">
                            Une voix claire et posée accompagne les archives,
                            leurs relations et les récits qui les traversent.
                        </p>
                        <p className="mt-5 font-mono text-xs text-accent">
                            font-sans · Source Sans 3
                        </p>
                    </article>

                    <article className="border border-line bg-surface p-6 sm:p-8">
                        <p className="font-eyebrow text-xs font-medium uppercase tracking-[0.18em] text-muted">
                            Repères de production
                        </p>
                        <p className="mt-5 font-eyebrow text-2xl font-medium uppercase tracking-[0.16em] text-ink sm:text-3xl">
                            Projection originale
                        </p>
                        <p className="mt-5 font-mono text-xs text-accent">
                            font-eyebrow · League Spartan
                        </p>
                    </article>

                    <article className="border border-line bg-surface p-6 sm:p-8">
                        <p className="font-eyebrow text-xs font-medium uppercase tracking-[0.18em] text-muted">
                            Notes de régie
                        </p>
                        <p className="mt-5 font-mono text-lg leading-8 text-ink">
                            --projection-lumiere: sombre;
                            <br />
                            plan.status = &quot;prêt à projeter&quot;;
                        </p>
                        <p className="mt-5 font-mono text-xs text-accent">
                            font-mono · IBM Plex Mono
                        </p>
                    </article>
                </div>
            </section>

            <PixieSeparator
                variant="beam"
                width="medium"
                align="start"
                spacing="none"
                decorative
            />

            <div className="mt-12 space-y-16">
                <div className="max-w-3xl">
                    <h3 className="text-4xl text-ink">
                        Les couleurs de la salle et de ce qu’elle projette
                    </h3>
                    <p className="mt-5 leading-7 text-ink-soft">
                        Deux palettes se partagent le travail. Projection
                        Originale met en scène l’interface ; L’Atelier
                        d’animation apporte les couleurs éditoriales qui
                        distingueront les familles et leurs métadonnées.
                    </p>
                </div>

                <section aria-labelledby="projection-originale-palette">
                    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                        <div className="max-w-3xl">
                            <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.18em] text-accent">
                                Palette d’interface
                            </p>
                            <h3
                                id="projection-originale-palette"
                                className="mt-3 text-3xl text-ink"
                            >
                                Projection Originale
                            </h3>
                            <p className="mt-4 leading-7 text-ink-soft">
                                Elle construit la salle : surfaces, encres,
                                lignes, accents et lumières. Ses références
                                alimentent les rôles sémantiques sans entrer
                                directement dans les composants.
                            </p>
                        </div>
                        <p className="font-mono text-xs text-muted">
                            25 références · 2 lumières
                        </p>
                    </div>

                    <div className="mt-12">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h4 className="text-xl text-ink">
                                    Le contrat de projection
                                </h4>
                                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                                    Ces rôles restent les seuls points d’entrée
                                    des composants. La palette peut évoluer sans
                                    réécrire leurs styles.
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.16em] text-muted">
                                    Lumière
                                </p>
                                <div
                                    role="group"
                                    aria-label="Lumière du contrat de projection"
                                    className="mt-2 inline-flex border border-line bg-surface p-1"
                                >
                                    {(["sombre", "claire"] as const).map(
                                        (option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                aria-pressed={
                                                    lumiere === option
                                                }
                                                onClick={() =>
                                                    setLumiere(option)
                                                }
                                                className={`px-3 py-2 text-sm font-medium capitalize transition-colors ${
                                                    lumiere === option
                                                        ? "bg-accent text-accent-contrast"
                                                        : "text-ink-soft hover:bg-surface-muted hover:text-ink"
                                                }`}
                                            >
                                                {option}
                                            </button>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>

                        <div
                            data-projection="originale"
                            data-lumiere={lumiere}
                            className="mt-6 border border-line bg-canvas p-5 sm:p-6"
                        >
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {rolesSemantiques.map(
                                    ([nom, token, classe, usage]) => (
                                        <article
                                            key={nom}
                                            className="border border-line bg-surface p-4"
                                        >
                                            <div
                                                aria-hidden="true"
                                                className={`h-20 border border-line ${classe}`}
                                            />
                                            <h5 className="mt-4 font-sans text-lg font-medium tracking-normal text-ink">
                                                {nom}
                                            </h5>
                                            <p className="mt-1 font-mono text-xs text-accent">
                                                {token}
                                            </p>
                                            <p className="mt-3 text-sm text-muted">
                                                {usage}
                                            </p>
                                        </article>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h4 className="text-xl text-ink">Lumière sombre</h4>
                        <p className="mt-2 text-sm text-muted">
                            La salle s’efface pour laisser le contenu devenir la
                            lumière.
                        </p>
                        <Nuancier couleurs={projectionSombre} />
                    </div>

                    <div className="mt-10">
                        <h4 className="text-xl text-ink">Lumière claire</h4>
                        <p className="mt-2 text-sm text-muted">
                            Le même langage posé sur le papier, la toile et les
                            encres d’un dossier de projection.
                        </p>
                        <Nuancier couleurs={projectionClaire} />
                    </div>
                </section>

                <section aria-labelledby="atelier-animation-palette">
                    <PixieSeparator
                        variant="fade"
                        position="start"
                        spacing="none"
                        decorative
                    />

                    <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                        <div className="max-w-3xl">
                            <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.18em] text-accent">
                                Palette éditoriale
                            </p>
                            <h3
                                id="atelier-animation-palette"
                                className="mt-3 text-3xl text-ink"
                            >
                                L’Atelier d’animation
                            </h3>
                            <p className="mt-4 leading-7 text-ink-soft">
                                Elle colore ce qui est projeté : familles,
                                métadonnées, badges et futurs symboles. Elle
                                apporte des repères sans repeindre la salle.
                            </p>
                        </div>
                        <p className="font-mono text-xs text-muted">
                            20 références éditoriales
                        </p>
                    </div>

                    <Nuancier couleurs={atelierAnimation} />
                </section>
            </div>
        </div>
    );
}
