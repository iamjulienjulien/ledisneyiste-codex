import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieDustButton } from "@/components/ui/PixieDustButton";
import { PixieDustButtonPlayground } from "./PixieDustButtonPlayground";

const variantes = [
    {
        nom: "Principal",
        variante: "principal" as const,
        usage: "Action dominante de la séquence",
    },
    {
        nom: "Secondaire",
        variante: "secondaire" as const,
        usage: "Alternative ou action complémentaire",
    },
    {
        nom: "Discret",
        variante: "discret" as const,
        usage: "Action de faible priorité",
    },
] as const;

const proprietes = [
    {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Libellé visible du bouton.",
    },
    {
        name: "variante",
        type: "PixieDustButtonVariant",
        defaultValue: '"principal"',
        description: "Hiérarchie visuelle et fonctionnelle de l’action.",
    },
    {
        name: "taille",
        type: "PixieDustButtonSize",
        defaultValue: '"moyen"',
        description: "Densité et taille de la zone interactive.",
    },
    {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Empêche l’activation et signale l’indisponibilité.",
    },
    {
        name: "miseAuPoint",
        type: "boolean",
        defaultValue: "false",
        description: "Diagnostic de focus réservé aux essais de l’Atelier.",
    },
] as const;

const typesSpecifiques = [
    {
        name: "PixieDustButtonVariant",
        values: ['"principal"', '"secondaire"', '"discret"'],
        description: "Niveaux de hiérarchie visuelle de l’action.",
    },
    {
        name: "PixieDustButtonSize",
        values: ['"petit"', '"moyen"', '"grand"'],
        description: "Tailles prédéfinies de la zone interactive.",
    },
] as const;

function CodeExemple({ children }: Readonly<{ children: string }>) {
    return (
        <pre className="overflow-x-auto border border-line bg-canvas p-5 font-mono text-sm leading-6 text-ink-soft">
            <code>{children}</code>
        </pre>
    );
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
        <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
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

export function PixieDustButtonDossier() {
    return (
        <AtelierFicheAccessoire
            id="bouton"
            labelledBy="bouton-title"
            nom="PixieDustButton"
            className="mt-16 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                            Le clap · Accessoire 002
                        </p>
                        <h2
                            id="bouton-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustButton
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Déclencher une action claire sans voler la lumière
                            au contenu qui l’entoure.
                        </p>
                    </div>

                    <dl className="grid min-w-64 grid-cols-2 gap-px bg-line md:grid-cols-1">
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
                                Version
                            </dt>
                            <dd className="mt-1 font-mono text-sm text-ink">
                                0.1.0
                            </dd>
                        </div>
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
                                État
                            </dt>
                            <dd className="mt-1 text-sm font-medium">
                                <AtelierStatut statut="Esquisse" />
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
                    description="Le bouton est testé ici comme une hypothèse de travail. Il restera dans l’Atelier jusqu’à ce que son API, ses états et son accessibilité soient validés."
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
                            "Accent, encres, lignes, focus et petit rayon.",
                        ],
                        [
                            "Accessibilité",
                            "Libellé explicite, focus visible, état disabled natif.",
                        ],
                        ["Dépendances", "React et Projection Originale."],
                    ].map(([terme, definition]) => (
                        <div key={terme} className="bg-surface p-5">
                            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
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
                    description="La variante principale et la taille moyenne constituent le point de départ de tous les essais."
                />

                <div className="mt-7 grid border border-line lg:grid-cols-2">
                    <div className="relative z-[10000] flex min-h-64 items-center justify-center bg-surface p-8">
                        <PixieDustButton>Ouvrir les archives</PixieDustButton>
                    </div>
                    <CodeExemple>{`<PixieDustButton>
    Ouvrir les archives
</PixieDustButton>`}</CodeExemple>
                </div>
            </section>

            <section aria-labelledby="bouton-variantes" className="mt-16">
                <TitreSequence
                    id="bouton-variantes"
                    surTitre="Essais caméra"
                    titre="Les trois niveaux de présence"
                    description="La variante exprime une hiérarchie d’action, pas une préférence décorative."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
                    {variantes.map((variante) => (
                        <article
                            key={variante.nom}
                            className="relative z-[10000] bg-surface p-6"
                        >
                            <div className="flex min-h-32 items-center justify-center">
                                <PixieDustButton variante={variante.variante}>
                                    {variante.nom}
                                </PixieDustButton>
                            </div>
                            <h4 className="mt-4 text-xl text-ink">
                                {variante.nom}
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-muted">
                                {variante.usage}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="bouton-etats" className="mt-16">
                <TitreSequence
                    id="bouton-etats"
                    surTitre="Direction d’acteurs"
                    titre="Les états qui doivent rester lisibles"
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Repos
                        </p>
                        <div className="mt-6">
                            <PixieDustButton>Action</PixieDustButton>
                        </div>
                    </article>
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Focus
                        </p>
                        <div className="mt-6">
                            <PixieDustButton miseAuPoint>
                                Action
                            </PixieDustButton>
                        </div>
                    </article>
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Désactivé
                        </p>
                        <div className="mt-6">
                            <PixieDustButton disabled>Action</PixieDustButton>
                        </div>
                    </article>
                    <article className="relative z-[10000] bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Survol
                        </p>
                        <p className="mt-6 text-sm leading-6 text-ink-soft">
                            À observer directement sur chaque exemple avec un
                            pointeur.
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
                    <PixieDustButtonPlayground />
                </div>
            </section>

            <section
                aria-labelledby="bouton-generique"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <TitreSequence
                    id="bouton-generique"
                    surTitre="Générique technique"
                    titre="Types et propriétés de l’esquisse"
                />

                <div className="mt-7">
                    <AtelierPropertiesTable properties={proprietes} />
                </div>

                <div className="mt-10">
                    <h4 className="text-xl text-ink">Types spécifiques</h4>
                    <p className="mt-2 text-sm leading-6 text-muted">
                        Les variantes et tailles admises par l’esquisse.
                    </p>
                    <div className="mt-4">
                        <AtelierTypesTable types={typesSpecifiques} />
                    </div>
                </div>
            </section>

            <section aria-labelledby="bouton-journal" className="mt-16">
                <TitreSequence
                    id="bouton-journal"
                    surTitre="Journal de production"
                    titre="Les conditions du passage à PixieButton"
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            API
                        </p>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Figer les trois variantes et les trois tailles, puis
                            décider si le chargement et l’action destructive
                            appartiennent à cette primitive.
                        </p>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Validation
                        </p>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Vérifier les contrastes, le zoom à 200 %, le clavier
                            et les états désactivés dans les deux lumières.
                        </p>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted">
                            Première affectation
                        </p>
                        <p className="mt-3 leading-7 text-ink-soft">
                            Remplacer un bouton réel du Codex sans adaptation
                            locale avant le renommage en PixieButton 1.0.0.
                        </p>
                    </article>
                </div>
            </section>
        </AtelierFicheAccessoire>
    );
}
