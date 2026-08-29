import type { ReactNode } from "react";
import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieDustField } from "@/components/ui/PixieDustField";
import { PixieDustSwitch } from "@/components/ui/PixieDustSwitch";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieSelect } from "@/components/ui/PixieSelect";
import { PixieStack } from "@/components/ui/PixieStack";
import { PixieDustFieldPlayground } from "./PixieDustFieldPlayground";

const controlClassName =
    "w-full border border-line-strong bg-canvas px-3 py-2.5 text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-focus";

const properties = [
    {
        name: "controlId",
        type: "string",
        defaultValue: "auto",
        description:
            "Identifiant explicite ; sinon celui du contrôle ou un identifiant stable est utilisé.",
    },
    {
        name: "label",
        type: "ReactNode",
        defaultValue: "—",
        description: "Libellé accessible qui nomme le contrôle.",
    },
    {
        name: "children",
        type: "ReactElement",
        defaultValue: "—",
        description: "Unique contrôle enrichi par le Field.",
    },
    {
        name: "description",
        type: "ReactNode",
        defaultValue: "—",
        description: "Indication persistante associée au contrôle.",
    },
    {
        name: "meta",
        type: "ReactNode",
        defaultValue: "—",
        description: "Unité, compteur ou indication courte près du libellé.",
    },
    {
        name: "error",
        type: "ReactNode",
        defaultValue: "—",
        description: "Erreur visible et annoncée par les aides techniques.",
    },
    {
        name: "feedback",
        type: "ReactNode",
        defaultValue: "—",
        description: "Confirmation ou avertissement non bloquant.",
    },
    {
        name: "feedbackTone",
        type: "PixieDustFieldFeedbackTone",
        defaultValue: '"success"',
        description: "Nature sémantique du feedback non bloquant.",
    },
    {
        name: "required",
        type: "boolean",
        defaultValue: "false",
        description: "Signale une réponse obligatoire.",
    },
    {
        name: "optional",
        type: "boolean",
        defaultValue: "false",
        description: "Affiche explicitement la mention Facultatif.",
    },
    {
        name: "labelHidden",
        type: "boolean",
        defaultValue: "false",
        description: "Masque le libellé visuellement, sans le désassocier.",
    },
    {
        name: "layout",
        type: "PixieDustFieldLayout",
        defaultValue: '"stacked"',
        description: "Place le libellé au-dessus ou à côté du contrôle.",
    },
    {
        name: "spacing",
        type: "PixieDustFieldSpacing",
        defaultValue: '"md"',
        description: "Rythme vertical entre les parties du Field.",
    },
    {
        name: "requirementDisplay",
        type: "PixieDustFieldRequirementDisplay",
        defaultValue: '"text"',
        description:
            "Affichage textuel, symbolique ou masqué du caractère requis.",
    },
    {
        name: "requiredLabel",
        type: "ReactNode",
        defaultValue: '"Obligatoire"',
        description: "Libellé personnalisé de l’état obligatoire.",
    },
    {
        name: "optionalLabel",
        type: "ReactNode",
        defaultValue: '"Facultatif"',
        description: "Libellé personnalisé de l’état facultatif.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au conteneur racine.",
    },
] as const;

const specificTypes = [
    {
        name: "PixieDustFieldSpacing",
        values: ['"xs"', '"sm"', '"md"', '"lg"', '"xl"'],
        description: "Cinq rythmes pour rapprocher ou aérer les indications.",
    },
    {
        name: "PixieDustFieldLayout",
        values: ['"stacked"', '"side"'],
        description: "Empile le dialogue ou place son libellé en regard.",
    },
    {
        name: "PixieDustFieldRequirementDisplay",
        values: ['"text"', '"mark"', '"hidden"'],
        description: "Forme visuelle de la mention obligatoire ou facultative.",
    },
    {
        name: "PixieDustFieldFeedbackTone",
        values: ['"success"', '"warning"'],
        description: "Deux retours non bloquants, distincts de l’erreur.",
    },
    {
        name: "PixieDustFieldFeedback",
        values: ["error", "feedback", "none"],
        description:
            "Contrat exclusif : une erreur et un feedback positif ne coexistent pas.",
    },
    {
        name: "PixieDustFieldRequirement",
        values: ["required", "optional", "none"],
        description:
            "Contrat exclusif : un Field ne peut pas être obligatoire et facultatif à la fois.",
    },
] as const;

function SequenceTitle({
    id,
    eyebrow,
    title,
    description,
}: Readonly<{
    id: string;
    eyebrow: string;
    title: string;
    description?: string;
}>) {
    return (
        <div>
            <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.18em] text-muted">
                {eyebrow}
            </p>
            <h3 id={id} className="mt-3 text-3xl text-ink">
                {title}
            </h3>
            {description ? (
                <p className="mt-4 leading-7 text-ink-soft">{description}</p>
            ) : null}
        </div>
    );
}

function CodeExample({ children }: Readonly<{ children: string }>) {
    return <AtelierCodeBlock>{children}</AtelierCodeBlock>;
}

function Stage({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="border border-dashed border-line-strong bg-canvas p-5 sm:p-8">
            {children}
        </div>
    );
}

export function PixieDustFieldDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-dust-field"
            labelledBy="pixie-dust-field-title"
            nom="PixieDustField"
            className="scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Dialogue 001
                        </p>
                        <h2
                            id="pixie-dust-field-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieDustField
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Associer un contrôle à son libellé, ses indications
                            et son éventuelle erreur sans décider de son style.
                        </p>
                    </div>

                    <dl className="grid min-w-64 grid-cols-2 gap-px bg-line md:grid-cols-1">
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Version
                            </dt>
                            <dd className="mt-1 font-mono text-sm text-ink">
                                0.2.0
                            </dd>
                        </div>
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
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
            <div className="space-y-16 p-6 sm:p-8">
                <section aria-labelledby="field-identity-title">
                    <SequenceTitle
                        id="field-identity-title"
                        eyebrow="Fiche de rôle"
                        title="Le souffleur du contrôle"
                        description="Field rassemble les phrases qui permettent de comprendre, remplir et corriger un contrôle. Il n’enregistre aucune valeur et n’effectue aucune validation."
                    />

                    <dl className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            [
                                "Mission",
                                "Nommer le contrôle et relier toutes ses indications.",
                            ],
                            [
                                "Matière",
                                "Un unique input, select, textarea ou contrôle compatible.",
                            ],
                            [
                                "Limite",
                                "Aucune valeur, validation ou apparence du contrôle.",
                            ],
                            [
                                "Accessibilité",
                                "label, aria-describedby, aria-invalid et aria-errormessage.",
                            ],
                        ].map(([term, description]) => (
                            <div key={term} className="bg-surface-muted p-5">
                                <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                    {term}
                                </dt>
                                <dd className="mt-3 text-sm leading-6 text-ink-soft">
                                    {description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section aria-labelledby="field-master-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="field-master-title"
                            eyebrow="Plan maître"
                            title="Une indication reste attachée à sa question"
                            description="Le contrôle conserve son autonomie visuelle ; Field lui fournit le contexte nécessaire."
                        />

                        <div className="mt-8 grid gap-4 lg:grid-cols-2">
                            <Stage>
                                <PixieDustField
                                    label="Rechercher dans les archives"
                                    description="Noms, titres, catégories ou collections."
                                    meta="23 œuvres"
                                    required
                                >
                                    <input
                                        type="search"
                                        required
                                        className={controlClassName}
                                        placeholder="Mickey Mouse"
                                    />
                                </PixieDustField>
                            </Stage>
                            <CodeExample>{`<PixieDustField
    label="Rechercher dans les archives"
    description="Noms, titres, catégories ou collections."
    meta="23 œuvres"
    required
>
    <input type="search" required />
</PixieDustField>`}</CodeExample>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="field-anatomy-title">
                    <SequenceTitle
                        id="field-anatomy-title"
                        eyebrow="Anatomie"
                        title="Sept répliques, un seul dialogue"
                        description="Le libellé précède toujours le contrôle. Description et erreur peuvent coexister afin que le conseil ne disparaisse pas au moment où il devient utile."
                    />
                    <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
                        {[
                            ["01", "Libellé", "Nomme la réponse attendue."],
                            [
                                "02",
                                "Indicateur",
                                "Précise le caractère requis.",
                            ],
                            [
                                "03",
                                "Métadonnée",
                                "Donne une unité ou un compteur.",
                            ],
                            ["04", "Contrôle", "Reçoit réellement la réponse."],
                            [
                                "05",
                                "Description",
                                "Apporte une aide persistante.",
                            ],
                            [
                                "06",
                                "Feedback",
                                "Confirme ou invite à vérifier.",
                            ],
                            ["07", "Erreur", "Explique comment corriger."],
                        ].map(([number, title, description]) => (
                            <div key={number} className="bg-surface p-5">
                                <p className="font-mono text-xs text-accent">
                                    {number}
                                </p>
                                <h4 className="mt-3 text-lg text-ink">
                                    {title}
                                </h4>
                                <p className="mt-2 text-sm leading-6 text-ink-soft">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="field-states-title">
                    <SequenceTitle
                        id="field-states-title"
                        eyebrow="Prises d’essai"
                        title="Les indications changent, le contrat demeure"
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        <Stage>
                            <PixieDustField
                                controlId="field-optional"
                                label="Collection"
                                description="Affinez la recherche si nécessaire."
                                optional
                                spacing="sm"
                            >
                                <PixieSelect
                                    mode="popover"
                                    portal
                                    size="sm"
                                    defaultValue="all"
                                >
                                    <option value="all">
                                        Toutes les collections
                                    </option>
                                    <option value="mickey">Mickey Mouse</option>
                                    <option value="silly">
                                        Silly Symphonies
                                    </option>
                                </PixieSelect>
                            </PixieDustField>
                        </Stage>
                        <Stage>
                            <PixieDustField
                                controlId="field-error"
                                label="Commentaire de projection"
                                description="Décrivez le raccord en une phrase."
                                error="Le commentaire doit contenir au moins dix caractères."
                                required
                                spacing="lg"
                            >
                                <textarea
                                    required
                                    defaultValue="Trop court"
                                    className={`${controlClassName} min-h-28 resize-y`}
                                />
                            </PixieDustField>
                        </Stage>
                        <Stage>
                            <PixieDustField
                                controlId="field-success"
                                label="Titre original"
                                description="Conservez la graphie de la sortie."
                                feedback="La formulation peut être conservée."
                                feedbackTone="success"
                            >
                                <input
                                    className={controlClassName}
                                    defaultValue="The Old Mill"
                                />
                            </PixieDustField>
                        </Stage>
                        <Stage>
                            <PixieDustField
                                controlId="field-warning"
                                label="Date de sortie"
                                description="La première diffusion doit être vérifiée."
                                feedback="Deux dates sont citées dans les archives."
                                feedbackTone="warning"
                                meta="année"
                            >
                                <input
                                    className={controlClassName}
                                    defaultValue="1937"
                                />
                            </PixieDustField>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="field-layout-title">
                    <SequenceTitle
                        id="field-layout-title"
                        eyebrow="Champ et contrechamp"
                        title="Le dialogue s’empile ou se place en regard"
                        description="La disposition latérale conserve une lecture verticale lorsque le cadre devient trop étroit."
                    />
                    <div className="mt-8 grid gap-5 xl:grid-cols-2">
                        <Stage>
                            <p className="mb-5 font-mono text-xs uppercase text-accent">
                                layout=&quot;stacked&quot;
                            </p>
                            <PixieDustField
                                label="Nom du personnage"
                                description="Utilisez le nom visible à l’écran."
                                layout="stacked"
                                optional
                            >
                                <input
                                    className={controlClassName}
                                    defaultValue="Mickey Mouse"
                                />
                            </PixieDustField>
                        </Stage>
                        <Stage>
                            <p className="mb-5 font-mono text-xs uppercase text-accent">
                                layout=&quot;side&quot;
                            </p>
                            <PixieDustField
                                label="Collection éditoriale"
                                description="Le libellé revient au-dessus du contrôle lorsque le cadre se resserre."
                                layout="side"
                                required
                                requirementDisplay="mark"
                            >
                                <PixieSelect
                                    mode="popover"
                                    portal
                                    size="sm"
                                    defaultValue="mickey"
                                >
                                    <option value="mickey">Mickey Mouse</option>
                                    <option value="silly">
                                        Silly Symphonies
                                    </option>
                                    <option value="donald">Donald Duck</option>
                                </PixieSelect>
                            </PixieDustField>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="field-spacing-title">
                    <SequenceTitle
                        id="field-spacing-title"
                        eyebrow="Rythme"
                        title="Cinq distances, aucune nouvelle hiérarchie"
                        description="Le rythme rapproche ou aère les parties sans modifier leur ordre ni leur importance."
                    />
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
                        {(["xs", "sm", "md", "lg", "xl"] as const).map(
                            (spacing) => (
                                <Stage key={spacing}>
                                    <p className="mb-5 font-mono text-xs uppercase text-accent">
                                        spacing=&quot;{spacing}&quot;
                                    </p>
                                    <PixieDustField
                                        controlId={`field-${spacing}`}
                                        label="Titre original"
                                        description="Conservez la graphie de la sortie."
                                        spacing={spacing}
                                    >
                                        <input
                                            className={controlClassName}
                                            defaultValue="The Old Mill"
                                        />
                                    </PixieDustField>
                                </Stage>
                            ),
                        )}
                    </div>
                </section>

                <section aria-labelledby="field-scenarios-title">
                    <SequenceTitle
                        id="field-scenarios-title"
                        eyebrow="Scénarios de plateau"
                        title="Le même contrat traverse plusieurs situations"
                        description="Field observe l’état du contrôle et garde les indications lisibles sans prendre en charge sa logique métier."
                    />
                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        <Stage>
                            <PixieDustField
                                label="Durée estimée"
                                meta="minutes"
                                optional
                                optionalLabel="Si connue"
                            >
                                <input
                                    type="number"
                                    className={controlClassName}
                                    defaultValue="7"
                                />
                            </PixieDustField>
                        </Stage>
                        <Stage>
                            <PixieDustField
                                label="Note de recherche"
                                description="Cette donnée a déjà été publiée."
                            >
                                <input
                                    className={controlClassName}
                                    defaultValue="Première apparition sonore"
                                    readOnly
                                />
                            </PixieDustField>
                        </Stage>
                        <Stage>
                            <PixieDustField
                                label="Récompense indisponible"
                                description="Ce choix sera ouvert dans un prochain acte."
                            >
                                <input
                                    className={controlClassName}
                                    defaultValue="Oscar d’honneur"
                                    disabled
                                />
                            </PixieDustField>
                        </Stage>
                        <Stage>
                            <PixieDustField
                                label="Rechercher dans le générique"
                                labelHidden
                            >
                                <input
                                    type="search"
                                    className={controlClassName}
                                    placeholder="Nom ou métier…"
                                />
                            </PixieDustField>
                        </Stage>
                        <Stage>
                            <PixieDustField
                                label="Mention éditoriale exceptionnellement longue pour éprouver le retour à la ligne"
                                description="Le libellé et sa métadonnée restent lisibles sans comprimer le contrôle."
                                meta="120 caractères max."
                                required
                            >
                                <textarea
                                    className={`${controlClassName} min-h-24 resize-y`}
                                />
                            </PixieDustField>
                        </Stage>
                        <Stage>
                            <PixieDustField
                                label="Titre français"
                                description="La mention peut être adaptée au contexte éditorial."
                                required
                                requiredLabel="À renseigner"
                            >
                                <input
                                    className={controlClassName}
                                    defaultValue="Blanche-Neige et les Sept Nains"
                                />
                            </PixieDustField>
                        </Stage>
                        <Stage>
                            <PixieDustField
                                label="Afficher les références détaillées"
                                description="La préférence reste modifiable à tout moment."
                                optional
                            >
                                <PixieDustSwitch color="violet-ombre-portee" />
                            </PixieDustField>
                        </Stage>
                    </div>
                </section>

                <section aria-labelledby="field-playground-title">
                    <SequenceTitle
                        id="field-playground-title"
                        eyebrow="Bac à sable interactif"
                        title="Composer une prise de parole complète"
                        description="Le code et les associations accessibles suivent chaque réglage."
                    />
                    <div className="mt-8">
                        <PixieDustFieldPlayground />
                    </div>
                </section>

                <section aria-labelledby="field-accessibility-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="field-accessibility-title"
                            eyebrow="Accessibilité"
                            title="Le sens ne quitte jamais le contrôle"
                        />
                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Relations automatiques
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Le libellé cible le contrôle. La
                                    description, le feedback et l’erreur
                                    complètent son nom accessible, tandis que
                                    l’erreur active aussi les états invalid et
                                    errormessage.
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Identifiant stable
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    Field respecte l’identifiant explicite du
                                    contrôle ou en génère un automatiquement.
                                    Les relations ARIA déjà présentes sont
                                    fusionnées sans doublon.
                                </p>
                            </PixiePanel>
                            <PixiePanel variant="outline" padding="md">
                                <h4 className="text-xl text-ink">
                                    Responsabilité partagée
                                </h4>
                                <p className="mt-3 text-sm leading-6 text-ink-soft">
                                    La prop required annonce l’obligation, mais
                                    le contrôle natif doit également recevoir
                                    son attribut required pour bénéficier de sa
                                    validation propre.
                                </p>
                            </PixiePanel>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="field-technical-title">
                    <div className="border border-line-strong bg-surface-muted p-5 sm:p-8">
                        <SequenceTitle
                            id="field-technical-title"
                            eyebrow="Générique technique"
                            title="API de l’esquisse"
                            description="Les types required et optional sont exclusifs dès la compilation."
                        />
                        <div className="mt-8">
                            <AtelierPropertiesTable properties={properties} />
                        </div>
                        <div className="mt-10">
                            <h4 className="text-2xl text-ink">
                                Types spécifiques
                            </h4>
                            <div className="mt-5">
                                <AtelierTypesTable types={specificTypes} />
                            </div>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="field-journal-title">
                    <SequenceTitle
                        id="field-journal-title"
                        eyebrow="Journal de production"
                        title="Avant la version prête à projeter"
                    />
                    <PixieStack as="ul" gap="sm" className="mt-8">
                        {[
                            "Éprouver les identifiants automatiques dans les formulaires répétés.",
                            "Valider les annonces dynamiques de confirmation, d’avertissement et d’erreur.",
                            "Contrôler le mode latéral avec les contrôles métier du Codex.",
                            "Tester la restitution des métadonnées et des mentions personnalisées avec plusieurs lecteurs d’écran.",
                        ].map((item) => (
                            <li
                                key={item}
                                className="border-l-2 border-accent bg-surface-muted px-5 py-4 text-sm leading-6 text-ink-soft"
                            >
                                {item}
                            </li>
                        ))}
                    </PixieStack>
                </section>
            </div>
        </AtelierFicheAccessoire>
    );
}
