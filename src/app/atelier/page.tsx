import { PixieButtonDossier } from "./_components/PixieButtonDossier";
import { PixieBadgeDossier } from "./_components/PixieBadgeDossier";
import { PixieLinkDossier } from "./_components/PixieLinkDossier";
import { PixieSeparatorDossier } from "./_components/PixieSeparatorDossier";
import { PixieSymbolDossier } from "./_components/PixieSymbolDossier";
import { PixieCardDossier } from "./_components/PixieCardDossier";
import { PixiePanelDossier } from "./_components/PixiePanelDossier";
import { PixieFrameDossier } from "./_components/PixieFrameDossier";
import { PixieCalloutDossier } from "./_components/PixieCalloutDossier";
import { PixieInsetDossier } from "./_components/PixieInsetDossier";
import { PixieBackdropDossier } from "./_components/PixieBackdropDossier";
import { PixieContainerDossier } from "./_components/PixieContainerDossier";
import { PixieStackDossier } from "./_components/PixieStackDossier";
import { PixieClusterDossier } from "./_components/PixieClusterDossier";
import { PixieSectionDossier } from "./_components/PixieSectionDossier";
import { PixieGridDossier } from "./_components/PixieGridDossier";
import { PixieDustSplitDossier } from "./_components/PixieDustSplitDossier";
import { PixieSidebarDossier } from "./_components/PixieSidebarDossier";
import { PixieSwitcherDossier } from "./_components/PixieSwitcherDossier";
import { PixieRailDossier } from "./_components/PixieRailDossier";
import { PixieDustBleedDossier } from "./_components/PixieDustBleedDossier";
import { PixieStickyRegionDossier } from "./_components/PixieStickyRegionDossier";
import { PixieFieldDossier } from "./_components/PixieFieldDossier";
import { PixieInputDossier } from "./_components/PixieInputDossier";
import { PixieDustTextareaDossier } from "./_components/PixieDustTextareaDossier";
import { PixieSelectDossier } from "./_components/PixieSelectDossier";
import { PixieSwitchDossier } from "./_components/PixieSwitchDossier";
import { PixieSearchFieldDossier } from "./_components/PixieSearchFieldDossier";
import { PixieToastDossier } from "./_components/PixieToastDossier";
import { PixieLoaderDossier } from "./_components/PixieLoaderDossier";
import { PixieSkeletonDossier } from "./_components/PixieSkeletonDossier";
import { AtelierSommaire } from "@/components/atelier/AtelierSommaire";
import { AtelierProjectionProvider } from "@/components/atelier/AtelierPlaygroundProjection";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import { getCodexPlans } from "@/registry/plans";
import { PalettesPellicule } from "./_components/PalettesPellicule";

const raccordEntreFiches = (
    <PixieSeparator
        variant="beam"
        intensity="strong"
        color="violet-ombre-portee"
        width="full"
        spacing="md"
        decorative
    />
);

const raccordAvantPremiereFiche = (
    <PixieSeparator
        variant="line"
        intensity="strong"
        color="violet-ombre-portee"
        width="full"
        spacing="lg"
        decorative
    />
);

const categories = [
    {
        numero: "01",
        nom: "La Pellicule",
        domaine: "Fondations",
        description:
            "Couleurs, typographies, formes et rythmes qui donnent sa matière à la Projection Originale.",
        statut: "En projection",
        href: "#pellicule",
    },
    {
        numero: "02",
        nom: "Les Accessoires",
        domaine: "Primitives",
        description:
            "Les éléments simples et réutilisables qui jouent désormais dans toutes les scènes du Codex.",
        statut: "En projection",
        href: "#accessoires",
    },
    {
        numero: "03",
        nom: "Les Décors",
        domaine: "Surfaces",
        description:
            "Cartes, panneaux et cadres qui organisent les espaces éditoriaux.",
        statut: "En projection",
        href: "#decors",
    },
    {
        numero: "04",
        nom: "Les Dialogues",
        domaine: "Formulaires",
        description:
            "Champs, choix et contrôles par lesquels le public répond au Codex.",
        statut: "En projection",
        href: "#dialogues",
    },
    {
        numero: "05",
        nom: "Le Montage",
        domaine: "Composition",
        description:
            "Assemblages et rythmes qui transforment les éléments isolés en séquences lisibles.",
        statut: "En projection",
        href: "#montage",
    },
    {
        numero: "06",
        nom: "Les Effets",
        domaine: "Retours système",
        description:
            "États, alertes et transitions qui rendent visibles les réactions de l’interface.",
        statut: "En projection",
        href: "#effets",
    },
    {
        numero: "07",
        nom: "Les Plans",
        domaine: "Explorations documentaires",
        description:
            "Des compositions métier qui donnent aux archives de nouvelles manières d’être regardées.",
        statut: "Plateau prêt",
        href: "#plans",
    },
] as const;

const pellicule = [
    {
        nom: "Typographie",
        href: "#typographie-pellicule",
    },
    {
        nom: "Projection Originale",
        href: "#projection-originale-palette",
    },
    {
        nom: "L’Atelier d’animation",
        href: "#atelier-animation-palette",
    },
] as const;

const accessoires = [
    {
        nom: "PixieSymbol",
        role: "Projeter un symbole du registre",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-symbol",
    },
    {
        nom: "PixieButton",
        role: "Déclencher une action",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#bouton",
    },
    {
        nom: "PixieLink",
        role: "Conduire vers une autre scène",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#lien",
    },
    {
        nom: "PixieBadge",
        role: "Qualifier une information brève",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#cartouche",
    },
    {
        nom: "PixieSeparator",
        role: "Marquer un changement de séquence",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#separateur",
    },
] as const;

const decors = [
    {
        nom: "PixieCard",
        role: "Accueillir une unité de contenu répétable",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-card",
    },
    {
        nom: "PixiePanel",
        role: "Regrouper une section dans une surface structurée",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-panel",
    },
    {
        nom: "PixieFrame",
        role: "Encadrer un visuel ou un aperçu",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-frame",
    },
    {
        nom: "PixieCallout",
        role: "Mettre en lumière une annotation éditoriale",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-callout",
    },
    {
        nom: "PixieInset",
        role: "Creuser une zone d’information secondaire",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-inset",
    },
    {
        nom: "PixieBackdrop",
        role: "Installer un fond de scène atmosphérique",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-backdrop",
    },
] as const;

const dialogues = [
    {
        nom: "PixieField",
        role: "Associer un contrôle à ses indications",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-field",
    },
    {
        nom: "PixieInput",
        role: "Recueillir une saisie courte",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-input",
    },
    {
        nom: "PixieDustTextarea",
        role: "Recueillir une réponse développée",
        statut: "Esquisse",
        version: "0.2.0",
        href: "#pixie-dust-textarea",
    },
    {
        nom: "PixieSelect",
        role: "Choisir une valeur dans une liste fermée",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-select",
    },
    {
        nom: "PixieDustCheckbox",
        role: "Marquer un choix indépendant",
        statut: "À esquisser",
        version: "—",
    },
    {
        nom: "PixieDustRadioGroup",
        role: "Choisir une seule option parmi plusieurs",
        statut: "À esquisser",
        version: "—",
    },
    {
        nom: "PixieSwitch",
        role: "Activer ou désactiver une préférence",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-switch",
    },
    {
        nom: "PixieDustFilterChip",
        role: "Activer un filtre compact",
        statut: "À esquisser",
        version: "—",
    },
    {
        nom: "PixieSearchField",
        role: "Composer une recherche complète",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-search-field",
    },
    {
        nom: "PixieDustCombobox",
        role: "Saisir et choisir parmi des suggestions",
        statut: "À esquisser",
        version: "—",
    },
    {
        nom: "PixieDustRange",
        role: "Définir une valeur ou une période",
        statut: "À esquisser",
        version: "—",
    },
] as const;

const montage = [
    {
        nom: "PixieContainer",
        role: "Centrer et contenir une séquence",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-container",
    },
    {
        nom: "PixieStack",
        role: "Régler le rythme d’une séquence verticale",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-stack",
    },
    {
        nom: "PixieCluster",
        role: "Rassembler des éléments avec retour à la ligne",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-cluster",
    },
    {
        nom: "PixieSection",
        role: "Composer une séquence éditoriale complète",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-section",
    },
    {
        nom: "PixieGrid",
        role: "Distribuer une collection sur une grille responsive",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-grid",
    },
    {
        nom: "PixieDustSplit",
        role: "Répartir deux zones en champ et contrechamp",
        statut: "Esquisse",
        version: "0.1.0",
        href: "#pixie-dust-split",
    },
    {
        nom: "PixieSidebar",
        role: "Associer un contenu principal à une régie latérale",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-sidebar",
    },
    {
        nom: "PixieSwitcher",
        role: "Changer de disposition selon l’espace disponible",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-switcher",
    },
    {
        nom: "PixieRail",
        role: "Dérouler une collection sur un travelling horizontal",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-rail",
    },
    {
        nom: "PixieDustBleed",
        role: "Faire sortir une séquence de son cadre de lecture",
        statut: "Esquisse",
        version: "0.1.0",
        href: "#pixie-dust-bleed",
    },
    {
        nom: "PixieStickyRegion",
        role: "Maintenir une région visible pendant le défilement",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-sticky-region",
    },
] as const;

const effets = [
    {
        nom: "PixieDustAlert",
        role: "Afficher un message persistant selon son niveau d’attention",
        statut: "À esquisser",
        version: "—",
    },
    {
        nom: "PixieToast",
        role: "Signaler brièvement le résultat d’une action",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-toast",
    },
    {
        nom: "PixieDustStatus",
        role: "Représenter un état système compact",
        statut: "À esquisser",
        version: "—",
    },
    {
        nom: "PixieDustProgress",
        role: "Montrer l’avancement d’une opération",
        statut: "À esquisser",
        version: "—",
    },
    {
        nom: "PixieLoader",
        role: "Matérialiser une attente de durée indéterminée",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-loader",
    },
    {
        nom: "PixieSkeleton",
        role: "Préserver la structure pendant le chargement",
        statut: "Prêt à projeter",
        version: "1.0.0",
        href: "#pixie-skeleton",
    },
    {
        nom: "PixieDustEmptyState",
        role: "Mettre en scène une collection vide et la prochaine action",
        statut: "À esquisser",
        version: "—",
    },
    {
        nom: "PixieDustErrorSummary",
        role: "Rassembler les erreurs et guider leur correction",
        statut: "À esquisser",
        version: "—",
    },
    {
        nom: "PixieDustLiveMessage",
        role: "Annoncer les changements dynamiques aux aides techniques",
        statut: "À esquisser",
        version: "—",
    },
    {
        nom: "PixieDustPresence",
        role: "Orchestrer l’apparition et la disparition d’un élément",
        statut: "À esquisser",
        version: "—",
    },
    {
        nom: "PixieDustHighlight",
        role: "Attirer temporairement l’attention sur un contenu actualisé",
        statut: "À esquisser",
        version: "—",
    },
] as const;

const programmesPlans = {
    "travelling-documentaire": "P0 · Premier prototype",
    "plan-d-ensemble": "P0 · Deuxième prototype",
    "montage-du-temps": "P0 · Troisième prototype",
    "generique-vivant": "P0 · Quatrième prototype",
    "table-lumineuse": "P0 · Cinquième prototype",
} as const;

const plans = getCodexPlans().map((plan) => ({
    ...plan,
    nom: plan.label,
    role: plan.description,
    statut: "Esquisse" as const,
    programme: programmesPlans[plan.slug],
    href: `#plan-${plan.slug}` as `#${string}`,
    dossierHref: `/atelier/plans/${plan.slug}`,
}));

const itemsParPlateau = {
    "#pellicule": pellicule,
    "#accessoires": accessoires,
    "#decors": decors,
    "#dialogues": dialogues,
    "#montage": montage,
    "#effets": effets,
    "#plans": plans,
} as const;

const plateauxSommaire = categories.map((categorie) => ({
    numero: categorie.numero,
    nom: categorie.nom,
    href: categorie.href,
    items: itemsParPlateau[categorie.href].flatMap((item) =>
        "href" in item ? [{ nom: item.nom, href: item.href }] : [],
    ),
}));

export default function AtelierPage() {
    return (
        <AtelierProjectionProvider className="py-12 sm:py-16">
            <AtelierSommaire plateaux={plateauxSommaire} />

            <section aria-labelledby="atelier-introduction">
                <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.2em] text-muted">
                    Note d’intention
                </p>

                <h1
                    id="atelier-introduction"
                    className="mt-3 text-4xl text-ink sm:text-6xl"
                >
                    Mettre chaque détail à l’épreuve avant la première
                </h1>

                <p className="mt-6 text-lg leading-8 text-ink-soft">
                    L’Atelier rassemble les fondations et les composants du
                    Codex dans un espace de répétition. Chaque élément y est
                    observé seul, essayé dans ses différents états puis
                    documenté avant d’entrer dans l’interface publique.
                </p>
            </section>

            <section
                id="programme"
                aria-labelledby="programme-title"
                className="mt-20 scroll-mt-8"
            >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.2em] text-muted">
                            Programme
                        </p>
                        <h2
                            id="programme-title"
                            className="mt-3 text-3xl text-ink"
                        >
                            Les sept plateaux de travail
                        </h2>
                    </div>

                    <p className="text-sm text-muted">7 plateaux ouverts</p>
                </div>

                <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
                    {categories.map((categorie) => {
                        const contenu = (
                            <>
                                <div className="flex items-start justify-between gap-6">
                                    <p className="font-mono text-xs text-muted">
                                        {categorie.numero}
                                    </p>
                                    <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.16em] text-muted">
                                        {categorie.statut}
                                    </p>
                                </div>

                                <h3 className="mt-8 text-2xl text-ink">
                                    {categorie.nom}
                                </h3>
                                <p className="mt-1 text-sm font-medium text-accent">
                                    {categorie.domaine}
                                </p>
                                <p className="mt-4 leading-7 text-ink-soft">
                                    {categorie.description}
                                </p>
                            </>
                        );

                        return (
                            <a
                                key={categorie.numero}
                                href={categorie.href}
                                className="group bg-surface p-6 transition-colors hover:bg-surface-muted"
                            >
                                {contenu}
                                <p className="mt-8 text-sm font-medium text-accent group-hover:text-accent-hover">
                                    Entrer sur le plateau →
                                </p>
                            </a>
                        );
                    })}
                </div>
            </section>

            <section
                id="pellicule"
                aria-labelledby="pellicule-title"
                className="mt-24 scroll-mt-8"
            >
                <PixieSeparator
                    variant="film"
                    intensity="strong"
                    color="violet-ombre-portee"
                    width="full"
                    spacing="none"
                    decorative
                />

                <div className="mt-12">
                    <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                        01 · La Pellicule
                    </p>
                    <h2 id="pellicule-title" className="mt-3 text-4xl text-ink">
                        Les voix qui donnent corps à ce qui est projeté
                    </h2>
                    <p className="mt-5 leading-7 text-ink-soft">
                        Deux typographies se partagent le travail. La
                        typographie d’affiche ouvre les séquences et installe
                        leur ton ; la typographie de lecture accompagne les
                        archives, leurs relations et leurs récits.
                    </p>
                </div>

                <PalettesPellicule />
            </section>

            <section
                id="accessoires"
                aria-labelledby="accessoires-title"
                className="mt-24 scroll-mt-8"
            >
                <PixieSeparator
                    variant="film"
                    intensity="strong"
                    color="violet-ombre-portee"
                    width="full"
                    spacing="none"
                    decorative
                />

                <div className="mt-12">
                    <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                        02 · Les Accessoires
                    </p>
                    <h2
                        id="accessoires-title"
                        className="mt-3 text-4xl text-ink"
                    >
                        Les premiers accessoires sont prêts à projeter
                    </h2>
                    <p className="mt-5 leading-7 text-ink-soft">
                        Cinq primitives validées jouent désormais dans le Codex.
                        Chaque clap ouvre leur fiche complète avec leurs états,
                        leur régie et leur générique technique.
                    </p>
                </div>

                <div className="mt-10 overflow-x-auto border border-line">
                    <table className="w-full min-w-xl border-collapse text-left">
                        <thead className="bg-surface-muted text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Accessoire
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Rôle
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Version
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    État
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line bg-surface">
                            {accessoires.map((accessoire) => (
                                <tr key={accessoire.nom}>
                                    <th
                                        scope="row"
                                        className="px-5 py-4 font-medium text-ink"
                                    >
                                        <a
                                            href={accessoire.href}
                                            className="text-accent underline underline-offset-4 hover:text-accent-hover"
                                        >
                                            {accessoire.nom} →
                                        </a>
                                    </th>
                                    <td className="px-5 py-4 text-ink-soft">
                                        {accessoire.role}
                                    </td>
                                    <td className="px-5 py-4 font-mono text-xs text-muted">
                                        {accessoire.version}
                                    </td>
                                    <td className="px-5 py-4 text-sm">
                                        <AtelierStatut
                                            statut={accessoire.statut}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {raccordAvantPremiereFiche}
                <PixieSymbolDossier />
                {raccordEntreFiches}
                <PixieButtonDossier />
                {raccordEntreFiches}
                <PixieLinkDossier />
                {raccordEntreFiches}
                <PixieBadgeDossier />
                {raccordEntreFiches}
                <PixieSeparatorDossier />
            </section>

            <section
                id="decors"
                aria-labelledby="decors-title"
                className="mt-24 scroll-mt-8"
            >
                <PixieSeparator
                    variant="film"
                    intensity="strong"
                    color="violet-ombre-portee"
                    width="full"
                    spacing="none"
                    decorative
                />

                <div className="mt-12">
                    <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                        03 · Les Décors
                    </p>
                    <h2 id="decors-title" className="mt-3 text-4xl text-ink">
                        Les surfaces prennent place sur le plateau
                    </h2>
                    <p className="mt-5 leading-7 text-ink-soft">
                        PixieCard accueille les unités répétables et PixiePanel
                        structure les sections. PixieFrame met les médias en
                        scène, PixieCallout éclaire les annotations éditoriales
                        et PixieInset place les informations secondaires en
                        retrait. PixieBackdrop installe enfin une atmosphère
                        derrière les compositions complètes.
                    </p>
                </div>

                <div className="mt-10 overflow-x-auto border border-line">
                    <table className="w-full min-w-xl border-collapse text-left">
                        <thead className="bg-surface-muted text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Décor
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Rôle
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Version
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    État
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line bg-surface">
                            {decors.map((decor) => (
                                <tr key={decor.nom}>
                                    <th
                                        scope="row"
                                        className="px-5 py-4 font-medium text-ink"
                                    >
                                        <a
                                            href={decor.href}
                                            className="text-accent underline underline-offset-4 hover:text-accent-hover"
                                        >
                                            {decor.nom} →
                                        </a>
                                    </th>
                                    <td className="px-5 py-4 text-ink-soft">
                                        {decor.role}
                                    </td>
                                    <td className="px-5 py-4 font-mono text-xs text-muted">
                                        {decor.version}
                                    </td>
                                    <td className="px-5 py-4 text-sm">
                                        <AtelierStatut statut={decor.statut} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {raccordAvantPremiereFiche}
                <PixieCardDossier />
                {raccordEntreFiches}
                <PixiePanelDossier />
                {raccordEntreFiches}
                <PixieFrameDossier />
                {raccordEntreFiches}
                <PixieCalloutDossier />
                {raccordEntreFiches}
                <PixieInsetDossier />
                {raccordEntreFiches}
                <PixieBackdropDossier />
            </section>

            <section
                id="dialogues"
                aria-labelledby="dialogues-title"
                className="mt-24 scroll-mt-8"
            >
                <PixieSeparator
                    variant="film"
                    intensity="strong"
                    color="violet-ombre-portee"
                    width="full"
                    spacing="none"
                    decorative
                />

                <div className="mt-12">
                    <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                        04 · Les Dialogues
                    </p>
                    <h2 id="dialogues-title" className="mt-3 text-4xl text-ink">
                        Le public entre dans la conversation
                    </h2>
                    <p className="mt-5 leading-7 text-ink-soft">
                        Champs, choix et contrôles permettront au public de
                        chercher, filtrer et répondre au Codex. Ces onze
                        esquisses couvriront la saisie, la décision et
                        l’affinement sans confondre dialogue, action et retour
                        système.
                    </p>
                </div>

                <div className="mt-10 overflow-x-auto border border-line">
                    <table className="w-full min-w-xl border-collapse text-left">
                        <thead className="bg-surface-muted text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Dialogue
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Rôle
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Version
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    État
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line bg-surface">
                            {dialogues.map((dialogue) => (
                                <tr key={dialogue.nom}>
                                    <th
                                        scope="row"
                                        className="px-5 py-4 font-medium text-ink"
                                    >
                                        {"href" in dialogue ? (
                                            <a
                                                href={dialogue.href}
                                                className="text-accent underline underline-offset-4 hover:text-accent-hover"
                                            >
                                                {dialogue.nom} →
                                            </a>
                                        ) : (
                                            dialogue.nom
                                        )}
                                    </th>
                                    <td className="px-5 py-4 text-ink-soft">
                                        {dialogue.role}
                                    </td>
                                    <td className="px-5 py-4 font-mono text-xs text-muted">
                                        {dialogue.version}
                                    </td>
                                    <td className="px-5 py-4 text-sm">
                                        <AtelierStatut
                                            statut={dialogue.statut}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {raccordAvantPremiereFiche}
                <PixieFieldDossier />
                {raccordEntreFiches}
                <PixieInputDossier />
                {raccordEntreFiches}
                <PixieDustTextareaDossier />
                {raccordEntreFiches}
                <PixieSelectDossier />
                {raccordEntreFiches}
                <PixieSwitchDossier />
                {raccordEntreFiches}
                <PixieSearchFieldDossier />
            </section>

            <section
                id="montage"
                aria-labelledby="montage-title"
                className="mt-24 scroll-mt-8"
            >
                <PixieSeparator
                    variant="film"
                    intensity="strong"
                    color="violet-ombre-portee"
                    width="full"
                    spacing="none"
                    decorative
                />

                <div className="mt-12">
                    <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                        05 · Le Montage
                    </p>
                    <h2 id="montage-title" className="mt-3 text-4xl text-ink">
                        Les plans trouvent leur rythme
                    </h2>
                    <p className="mt-5 leading-7 text-ink-soft">
                        Largeurs, espacements et distributions transforment les
                        éléments isolés en séquences lisibles. PixieContainer
                        ouvre le cadre, PixieStack règle le rythme vertical,
                        PixieCluster rassemble les groupes repliables et
                        PixieSection compose désormais les séquences éditoriales
                        complètes. PixieGrid distribue les collections sur des
                        pistes responsives, PixieSidebar associe une régie à un
                        contenu prioritaire, PixieSwitcher choisit
                        collectivement entre rangée et pile, PixieRail déroule
                        les collections en travelling et PixieStickyRegion
                        maintient un repère dans les limites de sa séquence. Les
                        deux esquisses suivantes organiseront les autres
                        distributions sans imposer de surface, de couleur ni
                        d’interaction.
                    </p>
                </div>

                <div className="mt-10 overflow-x-auto border border-line">
                    <table className="w-full min-w-xl border-collapse text-left">
                        <thead className="bg-surface-muted text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Montage
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Rôle
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Version
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    État
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line bg-surface">
                            {montage.map((element) => (
                                <tr key={element.nom}>
                                    <th
                                        scope="row"
                                        className="px-5 py-4 font-medium text-ink"
                                    >
                                        <a
                                            href={element.href}
                                            className="text-accent underline underline-offset-4 hover:text-accent-hover"
                                        >
                                            {element.nom} →
                                        </a>
                                    </th>
                                    <td className="px-5 py-4 text-ink-soft">
                                        {element.role}
                                    </td>
                                    <td className="px-5 py-4 font-mono text-xs text-muted">
                                        {element.version}
                                    </td>
                                    <td className="px-5 py-4 text-sm">
                                        <AtelierStatut
                                            statut={element.statut}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {raccordAvantPremiereFiche}
                <PixieContainerDossier />
                {raccordEntreFiches}
                <PixieStackDossier />
                {raccordEntreFiches}
                <PixieClusterDossier />
                {raccordEntreFiches}
                <PixieSectionDossier />
                {raccordEntreFiches}
                <PixieGridDossier />
                {raccordEntreFiches}
                <PixieDustSplitDossier />
                {raccordEntreFiches}
                <PixieSidebarDossier />
                {raccordEntreFiches}
                <PixieSwitcherDossier />
                {raccordEntreFiches}
                <PixieRailDossier />
                {raccordEntreFiches}
                <PixieDustBleedDossier />
                {raccordEntreFiches}
                <PixieStickyRegionDossier />
            </section>

            <section
                id="effets"
                aria-labelledby="effets-title"
                className="mt-24 scroll-mt-8"
            >
                <PixieSeparator
                    variant="film"
                    intensity="strong"
                    color="violet-ombre-portee"
                    width="full"
                    spacing="none"
                    decorative
                />

                <div className="mt-12">
                    <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                        06 · Les Effets
                    </p>
                    <h2 id="effets-title" className="mt-3 text-4xl text-ink">
                        L’interface accuse réception
                    </h2>
                    <p className="mt-5 leading-7 text-ink-soft">
                        États, alertes et transitions rendront perceptibles les
                        réactions du Codex. Ces onze esquisses informeront le
                        public, accompagneront l’attente et guideront
                        l’attention sans dépendre uniquement de la couleur ou du
                        mouvement.
                    </p>
                </div>

                <div className="mt-10 overflow-x-auto border border-line">
                    <table className="w-full min-w-xl border-collapse text-left">
                        <thead className="bg-surface-muted text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Effet
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Rôle
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Version
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    État
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line bg-surface">
                            {effets.map((effet) => (
                                <tr key={effet.nom}>
                                    <th
                                        scope="row"
                                        className="px-5 py-4 font-medium text-ink"
                                    >
                                        {"href" in effet ? (
                                            <a
                                                href={effet.href}
                                                className="text-accent underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
                                            >
                                                {effet.nom}
                                            </a>
                                        ) : (
                                            effet.nom
                                        )}
                                    </th>
                                    <td className="px-5 py-4 text-ink-soft">
                                        {effet.role}
                                    </td>
                                    <td className="px-5 py-4 font-mono text-xs text-muted">
                                        {effet.version}
                                    </td>
                                    <td className="px-5 py-4 text-sm">
                                        <AtelierStatut statut={effet.statut} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {raccordAvantPremiereFiche}
                <PixieToastDossier />
                {raccordEntreFiches}
                <PixieLoaderDossier />
                {raccordEntreFiches}
                <PixieSkeletonDossier />
            </section>

            <section
                id="plans"
                aria-labelledby="plans-title"
                className="mt-24 scroll-mt-8"
            >
                <PixieSeparator
                    variant="film"
                    intensity="strong"
                    color="violet-ombre-portee"
                    width="full"
                    spacing="none"
                    decorative
                />

                <div className="mt-12">
                    <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                        07 · Les Plans
                    </p>
                    <h2 id="plans-title" className="mt-3 text-4xl text-ink">
                        Le Codex compose de nouvelles manières de regarder
                    </h2>
                    <p className="mt-5 leading-7 text-ink-soft">
                        Les Plans ne sont ni des primitives Pixie ni de simples
                        mises en page. Chacun pose une question documentaire,
                        cadre une matière issue des quatre catalogues publiés et
                        propose une action de lecture accompagnée de son
                        contrechamp textuel. Leurs cinq prototypes v0.1.0
                        éprouvent désormais cette grammaire sur les Archives et
                        les Bobines témoins.
                    </p>
                </div>

                <div className="mt-10 overflow-x-auto border border-line">
                    <table className="w-full min-w-4xl border-collapse text-left">
                        <thead className="bg-surface-muted text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Plan
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Question documentaire
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Action
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    Programme
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    État
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line bg-surface">
                            {plans.map((plan) => (
                                <tr key={plan.slug} id={plan.href.slice(1)}>
                                    <th
                                        scope="row"
                                        className="px-5 py-4 font-medium text-ink"
                                    >
                                        <PixieLink
                                            href={plan.dossierHref}
                                            color="violet-ombre-portee"
                                            indicator="arrow"
                                        >
                                            {plan.nom}
                                        </PixieLink>
                                    </th>
                                    <td className="px-5 py-4 leading-7 text-ink-soft">
                                        {plan.question}
                                    </td>
                                    <td className="px-5 py-4 text-ink-soft">
                                        {plan.actionLabel}
                                    </td>
                                    <td className="px-5 py-4 font-mono text-xs text-muted">
                                        {plan.programme}
                                    </td>
                                    <td className="px-5 py-4 text-sm">
                                        <AtelierStatut statut={plan.statut} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </AtelierProjectionProvider>
    );
}
