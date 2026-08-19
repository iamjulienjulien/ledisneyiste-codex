import { PixieButtonDossier } from "./_components/PixieButtonDossier";
import { PixieBadgeDossier } from "./_components/PixieBadgeDossier";
import { PixieLinkDossier } from "./_components/PixieLinkDossier";
import { PixieSeparatorDossier } from "./_components/PixieSeparatorDossier";
import { PixieSymbolDossier } from "./_components/PixieSymbolDossier";
import { PixieDustCardDossier } from "./_components/PixieDustCardDossier";
import { PixieDustPanelDossier } from "./_components/PixieDustPanelDossier";
import { PixieDustFrameDossier } from "./_components/PixieDustFrameDossier";
import { PixieDustCalloutDossier } from "./_components/PixieDustCalloutDossier";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import { PalettesPellicule } from "./_components/PalettesPellicule";

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
        statut: "En préparation",
        href: "#dialogues",
    },
    {
        numero: "05",
        nom: "Le Montage",
        domaine: "Composition",
        description:
            "Assemblages et rythmes qui transforment les éléments isolés en séquences lisibles.",
        statut: "En préparation",
        href: "#montage",
    },
    {
        numero: "06",
        nom: "Les Effets",
        domaine: "Retours système",
        description:
            "États, alertes et transitions qui rendent visibles les réactions de l’interface.",
        statut: "En préparation",
        href: "#effets",
    },
] as const;

const accessoires = [
    {
        nom: "PixieSymbol",
        role: "Projeter un symbole du registre",
        statut: "Prêt à projeter",
        href: "#pixie-symbol",
    },
    {
        nom: "PixieButton",
        role: "Déclencher une action",
        statut: "Prêt à projeter",
        href: "#bouton",
    },
    {
        nom: "PixieLink",
        role: "Conduire vers une autre scène",
        statut: "Prêt à projeter",
        href: "#lien",
    },
    {
        nom: "PixieBadge",
        role: "Qualifier une information brève",
        statut: "Prêt à projeter",
        href: "#cartouche",
    },
    {
        nom: "PixieSeparator",
        role: "Marquer un changement de séquence",
        statut: "Prêt à projeter",
        href: "#separateur",
    },
] as const;

const decors = [
    {
        nom: "PixieDustCard",
        role: "Accueillir une unité de contenu répétable",
        statut: "Esquisse",
        href: "#pixie-dust-card",
    },
    {
        nom: "PixieDustPanel",
        role: "Regrouper une section dans une surface structurée",
        statut: "Esquisse",
        href: "#pixie-dust-panel",
    },
    {
        nom: "PixieDustFrame",
        role: "Encadrer un visuel ou un aperçu",
        statut: "Esquisse",
        href: "#pixie-dust-frame",
    },
    {
        nom: "PixieDustCallout",
        role: "Mettre en lumière une annotation éditoriale",
        statut: "Esquisse",
        href: "#pixie-dust-callout",
    },
    {
        nom: "PixieDustInset",
        role: "Creuser une zone d’information secondaire",
        statut: "À esquisser",
        href: null,
    },
    {
        nom: "PixieDustBackdrop",
        role: "Installer un fond de scène atmosphérique",
        statut: "À esquisser",
        href: null,
    },
] as const;

const dialogues = [
    {
        nom: "PixieDustField",
        role: "Associer un contrôle à ses indications",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustInput",
        role: "Recueillir une saisie courte",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustTextarea",
        role: "Recueillir une réponse développée",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustSelect",
        role: "Choisir une valeur dans une liste fermée",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustCheckbox",
        role: "Marquer un choix indépendant",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustRadioGroup",
        role: "Choisir une seule option parmi plusieurs",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustSwitch",
        role: "Activer ou désactiver une préférence",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustFilterChip",
        role: "Activer un filtre compact",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustSearchField",
        role: "Composer une recherche complète",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustCombobox",
        role: "Saisir et choisir parmi des suggestions",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustRange",
        role: "Définir une valeur ou une période",
        statut: "À esquisser",
    },
] as const;

const montage = [
    {
        nom: "PixieDustContainer",
        role: "Centrer et contenir une séquence",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustStack",
        role: "Régler le rythme d’une séquence verticale",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustCluster",
        role: "Rassembler des éléments avec retour à la ligne",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustSection",
        role: "Composer une séquence éditoriale complète",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustGrid",
        role: "Distribuer une collection sur une grille responsive",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustSplit",
        role: "Répartir deux zones en champ et contrechamp",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustSidebar",
        role: "Associer un contenu principal à une régie latérale",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustSwitcher",
        role: "Changer de disposition selon l’espace disponible",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustRail",
        role: "Dérouler une collection sur un travelling horizontal",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustBleed",
        role: "Faire sortir une séquence de son cadre de lecture",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustStickyRegion",
        role: "Maintenir une région visible pendant le défilement",
        statut: "À esquisser",
    },
] as const;

const effets = [
    {
        nom: "PixieDustAlert",
        role: "Afficher un message persistant selon son niveau d’attention",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustToast",
        role: "Signaler brièvement le résultat d’une action",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustStatus",
        role: "Représenter un état système compact",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustProgress",
        role: "Montrer l’avancement d’une opération",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustLoader",
        role: "Matérialiser une attente de durée indéterminée",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustSkeleton",
        role: "Préserver la structure pendant le chargement",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustEmptyState",
        role: "Mettre en scène une collection vide et la prochaine action",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustErrorSummary",
        role: "Rassembler les erreurs et guider leur correction",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustLiveMessage",
        role: "Annoncer les changements dynamiques aux aides techniques",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustPresence",
        role: "Orchestrer l’apparition et la disparition d’un élément",
        statut: "À esquisser",
    },
    {
        nom: "PixieDustHighlight",
        role: "Attirer temporairement l’attention sur un contenu actualisé",
        statut: "À esquisser",
    },
] as const;

export default function AtelierPage() {
    return (
        <div className="py-12 sm:py-16">
            <section aria-labelledby="atelier-introduction">
                <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.2em] text-muted">
                    Note d’intention
                </p>

                <h1
                    id="atelier-introduction"
                    className="mt-3 max-w-4xl text-4xl text-ink sm:text-6xl"
                >
                    Mettre chaque détail à l’épreuve avant la première
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-soft">
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
                            Les six plateaux de travail
                        </h2>
                    </div>

                    <p className="text-sm text-muted">6 plateaux ouverts</p>
                </div>

                <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
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
                    width="medium"
                    align="start"
                    spacing="none"
                    decorative
                />

                <div className="mt-12 max-w-3xl">
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
                    width="medium"
                    align="start"
                    spacing="none"
                    decorative
                />

                <div className="mt-12 max-w-3xl">
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
                                    <td className="px-5 py-4 text-sm text-muted">
                                        {accessoire.statut}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <PixieSymbolDossier />
                <PixieButtonDossier />
                <PixieLinkDossier />
                <PixieBadgeDossier />
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
                    width="medium"
                    align="start"
                    spacing="none"
                    decorative
                />

                <div className="mt-12 max-w-3xl">
                    <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                        03 · Les Décors
                    </p>
                    <h2 id="decors-title" className="mt-3 text-4xl text-ink">
                        Les surfaces prennent place sur le plateau
                    </h2>
                    <p className="mt-5 leading-7 text-ink-soft">
                        PixieDustCard accueille les unités répétables,
                        PixieDustPanel structure les sections et PixieDustFrame
                        met les médias en scène. PixieDustCallout éclaire
                        désormais les annotations éditoriales. Deux autres
                        esquisses prolongeront progressivement ce vocabulaire.
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
                                        {decor.href ? (
                                            <a
                                                href={decor.href}
                                                className="text-accent underline underline-offset-4 hover:text-accent-hover"
                                            >
                                                {decor.nom} →
                                            </a>
                                        ) : (
                                            decor.nom
                                        )}
                                    </th>
                                    <td className="px-5 py-4 text-ink-soft">
                                        {decor.role}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-muted">
                                        {decor.statut}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <PixieDustCardDossier />
                <PixieDustPanelDossier />
                <PixieDustFrameDossier />
                <PixieDustCalloutDossier />
            </section>

            <section
                id="dialogues"
                aria-labelledby="dialogues-title"
                className="mt-24 scroll-mt-8"
            >
                <PixieSeparator
                    variant="film"
                    intensity="strong"
                    width="medium"
                    align="start"
                    spacing="none"
                    decorative
                />

                <div className="mt-12 max-w-3xl">
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
                                        {dialogue.nom}
                                    </th>
                                    <td className="px-5 py-4 text-ink-soft">
                                        {dialogue.role}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-muted">
                                        {dialogue.statut}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section
                id="montage"
                aria-labelledby="montage-title"
                className="mt-24 scroll-mt-8"
            >
                <PixieSeparator
                    variant="film"
                    intensity="strong"
                    width="medium"
                    align="start"
                    spacing="none"
                    decorative
                />

                <div className="mt-12 max-w-3xl">
                    <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                        05 · Le Montage
                    </p>
                    <h2 id="montage-title" className="mt-3 text-4xl text-ink">
                        Les plans trouvent leur rythme
                    </h2>
                    <p className="mt-5 leading-7 text-ink-soft">
                        Largeurs, espacements et distributions transformeront
                        les éléments isolés en séquences lisibles. Ces onze
                        esquisses organiseront le cadre et le rythme sans
                        imposer de surface, de couleur ni d’interaction.
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
                                        {element.nom}
                                    </th>
                                    <td className="px-5 py-4 text-ink-soft">
                                        {element.role}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-muted">
                                        {element.statut}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section
                id="effets"
                aria-labelledby="effets-title"
                className="mt-24 scroll-mt-8"
            >
                <PixieSeparator
                    variant="film"
                    intensity="strong"
                    width="medium"
                    align="start"
                    spacing="none"
                    decorative
                />

                <div className="mt-12 max-w-3xl">
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
                                        {effet.nom}
                                    </th>
                                    <td className="px-5 py-4 text-ink-soft">
                                        {effet.role}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-muted">
                                        {effet.statut}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
