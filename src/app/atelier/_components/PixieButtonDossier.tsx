import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieButton } from "@/components/ui/PixieButton";
import { colorsAtelierAnimation } from "@/registry/colors";
import { PixieButtonPlayground } from "./PixieButtonPlayground";

const variants = [
    {
        name: "Plein",
        variant: "solid" as const,
        usage: "Action dominante de la séquence",
    },
    {
        name: "Doux",
        variant: "soft" as const,
        usage: "Action présente sans surface dominante",
    },
    {
        name: "Contour",
        variant: "outline" as const,
        usage: "Alternative ou action complémentaire",
    },
    {
        name: "Fantôme",
        variant: "ghost" as const,
        usage: "Action de faible priorité",
    },
] as const;

const sizes = [
    { name: "Très petit", size: "xs" as const, height: "36 px" },
    { name: "Petit", size: "sm" as const, height: "40 px" },
    { name: "Moyen", size: "md" as const, height: "44 px" },
    { name: "Grand", size: "lg" as const, height: "52 px" },
    { name: "Très grand", size: "xl" as const, height: "60 px" },
] as const;

const colorExamples = [
    "rouge-crayon",
    "jaune-lampe",
    "vert-cellulo",
    "gouache",
] as const;

const proprietes = [
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Libellé visible du bouton.",
    },
    {
        name: "variant",
        type: "PixieButtonVariant",
        defaultValue: '"solid"',
        description: "Traitement visuel et niveau de présence de l’action.",
    },
    {
        name: "size",
        type: "PixieButtonSize",
        defaultValue: '"md"',
        description: "Densité et taille de la zone interactive.",
    },
    {
        name: "color",
        type: "PixieButtonColor",
        defaultValue: "false",
        description: "Couleur enregistrée ou accent du thème.",
    },
    {
        name: "loading",
        type: "boolean",
        defaultValue: "false",
        description: "Signale une action en cours et bloque sa répétition.",
    },
    {
        name: "fullWidth",
        type: "boolean",
        defaultValue: "false",
        description: "Étend le bouton à toute la largeur disponible.",
    },
    {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Empêche l’activation et signale l’indisponibilité.",
    },
    {
        name: "type",
        type: '"button" | "submit" | "reset"',
        defaultValue: '"button"',
        description: "Comportement natif du bouton dans un formulaire.",
    },
] as const;

const typesSpecifiques = [
    {
        name: "PixieButtonVariant",
        values: ['"solid"', '"soft"', '"outline"', '"ghost"'],
        description: "Traitements visuels disponibles pour l’action.",
    },
    {
        name: "PixieButtonSize",
        values: ['"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Tailles prédéfinies de la zone interactive.",
    },
    {
        name: "PixieButtonColor",
        values: ["AtelierAnimationColorSlug", "false"],
        description: "Couleur du registre ou accent du thème.",
    },
] as const;

function CodeExemple({ children }: Readonly<{ children: string }>) {
    return <AtelierCodeBlock>{children}</AtelierCodeBlock>;
}

function TitreSequence({
    id,
    surTitre,
    titre,
    description,
}: Readonly<{
    id: string;
    surTitre: string;
    titre: string;
    description?: string;
}>) {
    return (
        <div>
            <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.18em] text-muted">
                {surTitre}
            </p>
            <h3 id={id} className="mt-3 text-3xl text-ink">
                {titre}
            </h3>
            {description ? (
                <p className="mt-4 leading-7 text-ink-soft">{description}</p>
            ) : null}
        </div>
    );
}

export function PixieButtonDossier() {
    return (
        <AtelierFicheAccessoire
            id="bouton"
            labelledBy="bouton-title"
            nom="PixieButton"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Accessoire 002
                        </p>
                        <h2
                            id="bouton-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieButton
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Déclencher une action claire sans voler la lumière
                            au contenu qui l’entoure.
                        </p>
                    </div>

                    <dl className="grid min-w-64 grid-cols-2 gap-px bg-line md:grid-cols-1">
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Version
                            </dt>
                            <dd className="mt-1 font-mono text-sm text-ink">
                                1.0.0
                            </dd>
                        </div>
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                État
                            </dt>
                            <dd className="mt-1 text-sm font-medium">
                                <AtelierStatut statut="Prêt à projeter" />
                            </dd>
                        </div>
                    </dl>
                </div>
            }
        >
            <section aria-labelledby="bouton-identite" className="mt-14">
                <TitreSequence
                    id="bouton-identite"
                    surTitre="Fiche de rôle"
                    titre="Identité du composant"
                    description="Le bouton a validé son API, ses états complets et ses couleurs issues du registre. Il peut désormais entrer dans les scènes du Codex."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Déclencher une action immédiate."],
                        [
                            "Usage",
                            "Actions de formulaire, d’interface ou de dialogue.",
                        ],
                        [
                            "Limite",
                            "Ne remplace jamais un lien vers une autre page.",
                        ],
                        [
                            "Tokens",
                            "Accent, couleurs éditoriales, focus et petit rayon.",
                        ],
                        [
                            "Accessibilité",
                            "Libellé explicite, focus visible, état disabled natif.",
                        ],
                        [
                            "Dépendances",
                            "React, Projection Originale et registre des couleurs.",
                        ],
                    ].map(([terme, definition]) => (
                        <div key={terme} className="bg-surface p-5">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                {terme}
                            </dt>
                            <dd className="mt-2 leading-7 text-ink-soft">
                                {definition}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section
                aria-labelledby="bouton-plan"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <TitreSequence
                    id="bouton-plan"
                    surTitre="Plan maître"
                    titre="Le bouton dans sa forme de référence"
                    description="Le variant solid, la taille md et l’accent du thème constituent le point de départ de tous les essais."
                />

                <div className="mt-7 grid border border-line lg:grid-cols-2">
                    <div className="relative z-[10000] flex min-h-64 items-center justify-center bg-surface p-8">
                        <PixieButton>Ouvrir les archives</PixieButton>
                    </div>
                    <CodeExemple>{`<PixieButton>
    Ouvrir les archives
</PixieButton>`}</CodeExemple>
                </div>
            </section>

            <section aria-labelledby="bouton-variantes" className="mt-16">
                <TitreSequence
                    id="bouton-variantes"
                    surTitre="Essais caméra"
                    titre="Quatre niveaux de présence"
                    description="La variante exprime une hiérarchie d’action, pas une préférence décorative."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {variants.map((item) => (
                        <article
                            key={item.name}
                            className="relative z-[10000] bg-surface p-6"
                        >
                            <div className="flex min-h-32 items-center justify-center">
                                <PixieButton variant={item.variant}>
                                    {item.name}
                                </PixieButton>
                            </div>
                            <h4 className="mt-4 text-xl text-ink">
                                {item.name}
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-muted">
                                {item.usage}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="bouton-tailles" className="mt-16">
                <TitreSequence
                    id="bouton-tailles"
                    surTitre="Échelle de cadre"
                    titre="Cinq zones d’action"
                    description="Chaque taille conserve une hauteur confortable et une densité adaptée à son contexte."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
                    {sizes.map((item) => (
                        <article
                            key={item.size}
                            className="relative z-[10000] bg-surface p-6"
                        >
                            <div className="flex min-h-32 items-center justify-center">
                                <PixieButton size={item.size}>
                                    {item.name}
                                </PixieButton>
                            </div>
                            <p className="text-center font-mono text-xs text-muted">
                                {item.size} · {item.height}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="bouton-couleurs" className="mt-16">
                <TitreSequence
                    id="bouton-couleurs"
                    surTitre="Atelier d’animation"
                    titre="Une action peut prendre la couleur du récit"
                    description="Le registre fournit la teinte et le contraste du libellé sans exposer de valeur CSS au consommateur."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {colorExamples.map((color) => (
                        <article
                            key={color}
                            className="relative z-[10000] bg-surface p-6"
                        >
                            <div className="flex min-h-28 items-center justify-center">
                                <PixieButton color={color}>Action</PixieButton>
                            </div>
                            <p className="mt-4 text-center font-mono text-xs text-muted">
                                {colorsAtelierAnimation[color].label}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="bouton-largeur" className="mt-16">
                <TitreSequence
                    id="bouton-largeur"
                    surTitre="Occupation du plateau"
                    titre="À son contenu ou à toute la largeur"
                    description="La largeur complète reste explicite et dépend toujours du conteneur qui accueille le bouton."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Largeur du contenu
                        </p>
                        <div className="mt-6">
                            <PixieButton>Action</PixieButton>
                        </div>
                    </article>
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Pleine largeur
                        </p>
                        <div className="mt-6">
                            <PixieButton fullWidth>
                                Action principale
                            </PixieButton>
                        </div>
                    </article>
                </div>
            </section>

            <section aria-labelledby="bouton-etats" className="mt-16">
                <TitreSequence
                    id="bouton-etats"
                    surTitre="Direction d’acteurs"
                    titre="Les états qui doivent rester lisibles"
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Repos
                        </p>
                        <div className="mt-6">
                            <PixieButton>Action</PixieButton>
                        </div>
                    </article>
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Focus
                        </p>
                        <div className="mt-6">
                            <PixieButton data-focus-preview="true">
                                Action
                            </PixieButton>
                        </div>
                    </article>
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Désactivé
                        </p>
                        <div className="mt-6">
                            <PixieButton disabled>Action</PixieButton>
                        </div>
                    </article>
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Chargement
                        </p>
                        <div className="mt-6">
                            <PixieButton loading>Action</PixieButton>
                        </div>
                    </article>
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Survol et pression
                        </p>
                        <p className="mt-6 text-sm leading-6 text-ink-soft">
                            Le survol renforce le traitement ; la pression
                            produit un déplacement bref sans changer la taille.
                        </p>
                    </article>
                </div>
            </section>

            <section aria-labelledby="bouton-accessibilite" className="mt-16">
                <TitreSequence
                    id="bouton-accessibilite"
                    surTitre="Accessibilité"
                    titre="Une action reste compréhensible dans chaque état"
                    description="Le bouton conserve la sémantique native, transmet les attributs ARIA et ne fait jamais porter son intention à la couleur seule."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
                    <article className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Clavier
                        </p>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Le halo suit la couleur choisie et reste visible
                            dans les deux lumières.
                        </p>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Chargement
                        </p>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Le libellé conserve la largeur et reste présent pour
                            les technologies d’assistance avec aria-busy.
                        </p>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Bouton natif
                        </p>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Les propriétés de formulaire, aria-pressed et les
                            événements sont transmis sans adaptation.
                        </p>
                    </article>
                </div>
            </section>

            <section
                aria-labelledby="bouton-regie"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <TitreSequence
                    id="bouton-regie"
                    surTitre="Régie"
                    titre="Régler le bouton en direct"
                    description="Les contrôles modifient l’exemple isolé. Le plateau peut changer de lumière et de largeur sans modifier le reste de l’Atelier."
                />
                <div className="mt-7">
                    <PixieButtonPlayground />
                </div>
            </section>

            <section
                aria-labelledby="bouton-generique"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <TitreSequence
                    id="bouton-generique"
                    surTitre="Générique technique"
                    titre="API du composant"
                />

                <div className="mt-7">
                    <AtelierPropertiesTable properties={proprietes} />
                </div>

                <div className="mt-10">
                    <h4 className="text-xl text-ink">Types spécifiques</h4>
                    <p className="mt-2 text-sm leading-6 text-muted">
                        Les variants, tailles et couleurs admis par le
                        composant.
                    </p>
                    <div className="mt-4">
                        <AtelierTypesTable types={typesSpecifiques} />
                    </div>
                </div>
            </section>
        </AtelierFicheAccessoire>
    );
}
