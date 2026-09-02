import { PixieBadge } from "@/components/ui/PixieBadge";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieBackdrop } from "@/components/ui/PixieBackdrop";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieInset } from "@/components/ui/PixieInset";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import { getCodexPlanAngle, getCodexPlanObjective } from "@/registry/plans";
import type { CodexPlanRuntimeState } from "@/types/codex-plans";
import type { AtelierPlanDossierProps } from "./AtelierPlanDossier.types";
import styles from "./AtelierPlanDossier.module.css";

const subjectFamilies = [
    "Personnages",
    "Créateurs",
    "Œuvres",
    "Époques",
] as const;

const runtimeStates = [
    ["idle", "En attente d’un Sujet"],
    ["loading", "La matière rejoint le plateau"],
    ["ready", "Le Plan peut être parcouru"],
    ["empty", "Aucune matière dans le Cadre"],
    ["sparse", "Matière trop légère pour la composition complète"],
    ["dense", "Matière abondante à hiérarchiser"],
    ["incomplete", "Archives ou preuves encore partielles"],
    ["error", "Projection impossible à établir"],
] as const satisfies readonly (readonly [CodexPlanRuntimeState, string])[];

const technicalFields = [
    ["plan", "CodexPlanSlug", "Choisit la grammaire documentaire projetée."],
    [
        "subject",
        "CodexPlanSubject",
        "Désigne une entrée publiée dans l’un des quatre catalogues du Codex.",
    ],
    ["angle", "CodexPlanAngleSlug", "Détermine le point de vue documentaire."],
    [
        "objective",
        "CodexPlanObjectiveSlug",
        "Nomme l’action de lecture réellement proposée au public.",
    ],
    [
        "frame",
        "CodexPlanFrame",
        "Fixe les limites visibles sans altérer les Archives.",
    ],
    [
        "matter",
        "CodexPlanMatter",
        "Sépare les Archives publiées d’une éventuelle bobine témoin.",
    ],
] as const;

function PlanSection({
    index,
    eyebrow,
    title,
    description,
    children,
}: Readonly<{
    index: string;
    eyebrow: string;
    title: string;
    description?: string;
    children: React.ReactNode;
}>) {
    return (
        <section
            className={styles.sequence}
            aria-labelledby={`plan-section-${index}`}
        >
            <header className={styles.sectionHeader}>
                <p className={styles.sectionIndex}>
                    {index} · {eyebrow}
                </p>
                <h2
                    id={`plan-section-${index}`}
                    className={styles.sectionTitle}
                >
                    {title}
                </h2>
                {description ? (
                    <p className={styles.sectionDescription}>{description}</p>
                ) : null}
            </header>
            {children}
        </section>
    );
}

function TechnicalTitle({
    id,
    title,
    description,
}: Readonly<{
    id: string;
    title: string;
    description: string;
}>) {
    return (
        <div>
            <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.18em] text-muted">
                Générique technique
            </p>
            <h2 id={id} className="mt-3 text-3xl text-ink">
                {title}
            </h2>
            <p className="mt-4 leading-7 text-ink-soft">{description}</p>
        </div>
    );
}

export function AtelierPlanDossier({
    slug,
    plan,
    status = "À inventorier",
    program = "P0 · Grammaire commune",
    version = "P0",
    prototype,
    prototypeTitle = "La première forme entre sur le plateau",
    prototypeDescription = "Le prototype confronte la grammaire du Plan à une matière réelle et aux Bobines témoins prioritaires.",
    technical,
}: AtelierPlanDossierProps) {
    const sectionOffset = prototype ? 1 : 0;
    const sectionIndex = (index: number) =>
        String(index + sectionOffset).padStart(2, "0");

    return (
        <article className={styles.root}>
            <PixieBackdrop
                as="header"
                variant="projector"
                color="violet-ombre-portee"
                base="surface"
                intensity="medium"
                position="top-end"
                spread="wide"
                texture="grain"
                textureIntensity="subtle"
                padding="xl"
                radius="large"
                className={styles.opening}
            >
                <div className={styles.openingContent}>
                    <PixieLink
                        href="/atelier#plans"
                        indicator="back"
                        color="violet-ombre-portee"
                    >
                        Retour au plateau des Plans
                    </PixieLink>

                    <div>
                        <p className="font-eyebrow text-xs font-medium uppercase tracking-[0.22em] text-accent">
                            07 · Les Plans · Dossier préparatoire
                        </p>
                        <h1 className={`${styles.openingTitle} mt-4 text-ink`}>
                            {plan.label}
                        </h1>
                        <p
                            className={`${styles.openingDescription} mt-6 text-ink-soft`}
                        >
                            {plan.description}
                        </p>
                    </div>

                    <div className={styles.clap} aria-label="Identité du Plan">
                        <div className={styles.clapCell}>
                            <p className={styles.clapLabel}>État</p>
                            <p className={styles.clapValue}>{status}</p>
                        </div>
                        <div className={styles.clapCell}>
                            <p className={styles.clapLabel}>Programme</p>
                            <p className={styles.clapValue}>{program}</p>
                        </div>
                        <div className={styles.clapCell}>
                            <p className={styles.clapLabel}>Version</p>
                            <p
                                className={`${styles.clapValue} font-mono text-sm`}
                            >
                                {version}
                            </p>
                        </div>
                        <div className={styles.clapCell}>
                            <p className={styles.clapLabel}>Identifiant</p>
                            <p
                                className={`${styles.clapValue} font-mono text-sm`}
                            >
                                {slug}
                            </p>
                        </div>
                    </div>
                </div>
            </PixieBackdrop>

            <PlanSection
                index="01"
                eyebrow="Contrat de lecture"
                title="Une question, une action, un contrechamp"
                description="Le Plan commence par annoncer ce qu’il aide à lire. Sa visualisation ne remplace jamais l’alternative textuelle qui en conserve le sens."
            >
                <div className={styles.gridThree}>
                    <PixieCard
                        variant="tinted"
                        color="violet-ombre-portee"
                        padding="lg"
                    >
                        <h3 className={styles.cardTitle}>Question</h3>
                        <p className={styles.cardText}>{plan.question}</p>
                    </PixieCard>
                    <PixieCard variant="outline" padding="lg">
                        <h3 className={styles.cardTitle}>Action</h3>
                        <p className={styles.cardText}>{plan.actionLabel}</p>
                    </PixieCard>
                    <PixieCard variant="outline" padding="lg">
                        <h3 className={styles.cardTitle}>
                            Contrechamp textuel
                        </h3>
                        <p className={styles.cardText}>
                            {plan.textAlternativeLabel}
                        </p>
                    </PixieCard>
                </div>
            </PlanSection>

            <PlanSection
                index="02"
                eyebrow="Plan maître"
                title="La promesse documentaire au centre du cadre"
                description="Cette première image fixe la question du Plan avant toute décision de composition ou d’interaction."
            >
                <PixiePanel
                    variant="accent"
                    color="violet-ombre-portee"
                    accentPosition="start"
                    padding="xl"
                    elevation="soft"
                >
                    <p className={styles.questionLabel}>Question maîtresse</p>
                    <p className={styles.question}>{plan.question}</p>
                </PixiePanel>
            </PlanSection>

            {prototype ? (
                <PlanSection
                    index="03"
                    eyebrow="Prototype"
                    title={prototypeTitle}
                    description={prototypeDescription}
                >
                    {prototype}
                </PlanSection>
            ) : null}

            <PlanSection
                index={sectionIndex(3)}
                eyebrow="Champ"
                title="Ce que le Plan montre"
                description="Le Plan ne projette que les éléments qui peuvent être rattachés à une matière, une relation ou une règle explicite."
            >
                <div className={styles.gridTwo}>
                    <PixieCard as="section" variant="surface" padding="lg">
                        <h3 className={styles.cardTitle}>Le Cadre</h3>
                        <p className={styles.cardText}>
                            {plan.frameDescription}
                        </p>
                    </PixieCard>
                    <PixieCard as="section" variant="surface" padding="lg">
                        <h3 className={styles.cardTitle}>La Matière</h3>
                        <p className={styles.cardText}>
                            {plan.matterDescription}
                        </p>
                    </PixieCard>
                </div>
            </PlanSection>

            <PlanSection
                index={sectionIndex(4)}
                eyebrow="Hors-champ"
                title="Ce que le Plan refuse d’inventer"
            >
                <PixieInset
                    variant="recessed"
                    depth="medium"
                    padding="lg"
                    texture="crosshatch"
                    textureIntensity="subtle"
                >
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            Aucun lien n’est déduit de la seule proximité
                            visuelle.
                        </li>
                        <li className={styles.listItem}>
                            Aucune absence d’archive n’est transformée en
                            certitude.
                        </li>
                        <li className={styles.listItem}>
                            Aucun verdict expérimental n’entre dans le registre
                            neutre.
                        </li>
                        <li className={styles.listItem}>
                            Aucune composition ne remplace les sources qui
                            l’établissent.
                        </li>
                    </ul>
                </PixieInset>
            </PlanSection>

            <PlanSection
                index={sectionIndex(5)}
                eyebrow="Régie"
                title="Choisir le Sujet, l’Angle et l’Objectif"
                description="La future régie ne pourra sélectionner qu’un Sujet publié dans les quatre catalogues actuellement ouverts."
            >
                <div className={styles.gridThree}>
                    <PixieCard variant="outline" padding="lg">
                        <h3 className={styles.cardTitle}>Sujets disponibles</h3>
                        <div className={`${styles.badges} mt-4`}>
                            {subjectFamilies.map((family) => (
                                <PixieBadge
                                    key={family}
                                    size="sm"
                                    tone="inherit"
                                    variant="outline"
                                >
                                    {family}
                                </PixieBadge>
                            ))}
                        </div>
                    </PixieCard>
                    <PixieCard variant="outline" padding="lg">
                        <h3 className={styles.cardTitle}>Angles admis</h3>
                        <div className={`${styles.badges} mt-4`}>
                            {plan.angles.map((angle) => (
                                <PixieBadge
                                    key={angle}
                                    size="sm"
                                    tone="color"
                                    color="violet-ombre-portee"
                                    variant="soft"
                                >
                                    {getCodexPlanAngle(angle).label}
                                </PixieBadge>
                            ))}
                        </div>
                    </PixieCard>
                    <PixieCard variant="outline" padding="lg">
                        <h3 className={styles.cardTitle}>Objectifs admis</h3>
                        <div className={`${styles.badges} mt-4`}>
                            {plan.objectives.map((objective) => (
                                <PixieBadge
                                    key={objective}
                                    size="sm"
                                    tone="color"
                                    color="vert-cellulo"
                                    variant="soft"
                                >
                                    {getCodexPlanObjective(objective).label}
                                </PixieBadge>
                            ))}
                        </div>
                    </PixieCard>
                </div>
            </PlanSection>

            <PlanSection
                index={sectionIndex(6)}
                eyebrow="Contrechamp textuel"
                title="La même lecture sans dépendre de l’image"
            >
                <PixiePanel
                    variant="muted"
                    padding="lg"
                    dividers="header"
                    header={
                        <p className="font-eyebrow text-xs font-medium uppercase tracking-[0.18em] text-muted">
                            Alternative attendue
                        </p>
                    }
                >
                    <p className="text-lg leading-8 text-ink-soft">
                        {plan.textAlternativeLabel}. L’ordre, les groupes, les
                        relations, les incertitudes et la provenance visibles
                        devront rester accessibles dans une structure textuelle
                        équivalente.
                    </p>
                </PixiePanel>
            </PlanSection>

            <PlanSection
                index={sectionIndex(7)}
                eyebrow="Plans de coupe"
                title="Prévoir tous les états avant la projection"
                description="Les états décrivent la disponibilité et la densité de la matière ; ils ne jugent jamais la valeur du Sujet."
            >
                <div className={styles.gridTwo}>
                    {runtimeStates.map(([state, label]) => (
                        <PixieCard key={state} variant="outline" padding="md">
                            <p className="font-mono text-xs text-accent">
                                {state}
                            </p>
                            <p className="mt-2 leading-7 text-ink-soft">
                                {label}
                            </p>
                        </PixieCard>
                    ))}
                </div>
            </PlanSection>

            <PlanSection
                index={sectionIndex(8)}
                eyebrow="Bobine témoin"
                title="Essayer la forme sans falsifier les Archives"
            >
                <PixieInset
                    variant="accent"
                    color="jaune-lampe"
                    accentPosition="start"
                    padding="lg"
                >
                    <p className="leading-7 text-ink-soft">
                        {prototype
                            ? "Le prototype peut quitter les Archives pour éprouver ses limites sur une Bobine témoin explicitement marquée, toujours distincte de la matière publiée."
                            : "Aucun Sujet n’est encore assigné à ce dossier. Les premiers prototypes pourront employer une bobine témoin explicitement marquée, distincte de la matière publiée et impossible à confondre avec une archive réelle."}
                    </p>
                </PixieInset>
            </PlanSection>

            <PlanSection
                index={sectionIndex(9)}
                eyebrow="Accessibilité et continuité"
                title="Conserver le fil, quelle que soit la manière de regarder"
            >
                <div className={styles.gridTwo}>
                    <PixieCard variant="surface" padding="lg">
                        <h3 className={styles.cardTitle}>Lecture</h3>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>
                                Ordre du document compréhensible sans CSS.
                            </li>
                            <li className={styles.listItem}>
                                Relations nommées, jamais signifiées par la
                                couleur seule.
                            </li>
                            <li className={styles.listItem}>
                                Alternative textuelle maintenue au même niveau
                                documentaire.
                            </li>
                        </ul>
                    </PixieCard>
                    <PixieCard variant="surface" padding="lg">
                        <h3 className={styles.cardTitle}>Interaction</h3>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>
                                Parcours complet au clavier et focus toujours
                                visible.
                            </li>
                            <li className={styles.listItem}>
                                Mouvement réduit respecté sans perte
                                d’information.
                            </li>
                            <li className={styles.listItem}>
                                États dynamiques annoncés lorsque la matière
                                change.
                            </li>
                        </ul>
                    </PixieCard>
                </div>
            </PlanSection>

            {technical ? (
                <section
                    aria-labelledby={`plan-section-${sectionIndex(10)}`}
                    className={`${styles.sequence} border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8`}
                >
                    <TechnicalTitle
                        id={`plan-section-${sectionIndex(10)}`}
                        title={technical.title}
                        description={technical.description}
                    />

                    <div className="mt-7">
                        <AtelierPropertiesTable
                            properties={technical.properties}
                        />
                    </div>

                    <div className="mt-10">
                        <h3 className="text-2xl text-ink">Types spécifiques</h3>
                        <div className="mt-5">
                            <AtelierTypesTable types={technical.types} />
                        </div>
                    </div>
                </section>
            ) : (
                <PlanSection
                    index={sectionIndex(10)}
                    eyebrow="Générique technique"
                    title="Contrat commun de configuration"
                    description="Les prototypes pourront enrichir leur rendu, mais tous partiront de cette même grammaire typée."
                >
                    <div className={styles.tableFrame}>
                        <table className={styles.technicalTable}>
                            <thead>
                                <tr>
                                    <th scope="col">Champ</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Rôle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {technicalFields.map(([field, type, role]) => (
                                    <tr key={field}>
                                        <th scope="row">{field}</th>
                                        <td className="font-mono text-xs text-ink">
                                            {type}
                                        </td>
                                        <td>{role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </PlanSection>
            )}

            <PlanSection
                index={sectionIndex(11)}
                eyebrow="Journal d’essai"
                title="Les décisions resteront hors du registre"
            >
                <PixieCard variant="muted" padding="lg">
                    <p className="leading-7 text-ink-soft">
                        Le journal accueillera les hypothèses, observations,
                        limites et verdicts de chaque prototype. Cette matière
                        expérimentale appartiendra au dossier du Plan, jamais à
                        sa définition neutre.
                    </p>
                </PixieCard>
            </PlanSection>

            <PixieSeparator
                variant="film"
                intensity="strong"
                color="violet-ombre-portee"
                width="full"
                spacing="lg"
                decorative
            />

            <footer>
                <p className={styles.sectionIndex}>
                    {sectionIndex(12)} · Dernière image
                </p>
                <p className={`${styles.lastImage} mt-3`}>
                    {prototype
                        ? "La première bobine tourne. Le regard peut maintenant être éprouvé."
                        : "Le cadre est posé. La première bobine peut maintenant être choisie."}
                </p>
            </footer>
        </article>
    );
}
