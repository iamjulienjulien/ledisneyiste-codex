import { CodexFicheSection } from "@/components/codex/CodexFicheSection";
import { CodexReferenceLink } from "@/components/codex/CodexReferenceLink";
import { formatDateHistorique } from "@/lib/date";
import type { PeriodeHistorique } from "@/types/date";
import type {
    ContributionOeuvre,
    DomaineCreditOeuvre,
    DonneeEconomiqueOeuvre,
    NatureEvenementSortieOeuvre,
    NatureRelationOeuvre,
} from "@/types/oeuvre";
import type { CodexOeuvreDetailsProps } from "./CodexOeuvreDetails.types";
import styles from "./CodexOeuvreDetails.module.css";

const eventLabels: Record<NatureEvenementSortieOeuvre, string> = {
    "premiere-mondiale": "Première mondiale",
    "sortie-nationale": "Sortie nationale",
};

const economicLabels: Record<DonneeEconomiqueOeuvre["nature"], string> = {
    "cout-production": "Coût de production",
    revenus: "Revenus",
    entrees: "Entrées",
};

const certaintyLabels: Record<DonneeEconomiqueOeuvre["certitude"], string> = {
    documente: "Donnée documentée",
    estimation: "Estimation sourcée",
    conteste: "Valeur contestée",
};

const relationLabels: Record<NatureRelationOeuvre, string> = {
    source: "Œuvre source",
    preparation: "Œuvre préparatoire",
    adaptation: "Adaptation",
    suite: "Suite",
    remake: "Remake",
    derivee: "Œuvre dérivée",
};

const creditDomainLabels: Record<DomaineCreditOeuvre, string> = {
    "production-direction": "Production et direction",
    "histoire-adaptation": "Histoire et adaptation",
    "direction-artistique-conception": "Direction artistique et conception",
    "animation-personnages": "Animation et personnages",
    "decors-effets-photographie": "Décors, effets et photographie",
    "musique-chansons": "Musique et chansons",
    "interpretation-vocale": "Interprétation vocale",
    "innovations-techniques": "Innovations techniques",
    "reference-filmee": "Référence filmée",
};

const creditDomainOrder = Object.keys(
    creditDomainLabels,
) as DomaineCreditOeuvre[];

function formatPeriod(period: PeriodeHistorique) {
    return `${formatDateHistorique(period.debut)}–${period.fin ? formatDateHistorique(period.fin) : "aujourd’hui"}`;
}

function formatEconomicValue(data: DonneeEconomiqueOeuvre) {
    if (data.unite === "monetaire") {
        return new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: data.devise,
            maximumFractionDigits: 0,
        }).format(data.valeur);
    }

    return `${new Intl.NumberFormat("fr-FR").format(data.valeur)} entrées`;
}

function groupCredits(contributions: ContributionOeuvre[]) {
    return creditDomainOrder
        .map((domain) => ({
            domain,
            contributions: contributions.filter(
                (contribution) => contribution.domaine === domain,
            ),
        }))
        .filter((group) => group.contributions.length > 0);
}

export function CodexOeuvreDetails({ fiche }: CodexOeuvreDetailsProps) {
    const groupedCredits = groupCredits(fiche.contributions);
    const hasProductionFacts = Boolean(
        fiche.titresAlternatifs?.length ||
        fiche.durees?.length ||
        fiche.production,
    );

    return (
        <>
            {hasProductionFacts && (
                <CodexFicheSection
                    eyebrow="Production"
                    titre="Les repères de fabrication"
                    description="Les durées, titres et périodes restent attachés aux versions et aux sources qui les établissent."
                >
                    <dl className={styles.facts}>
                        {fiche.titresAlternatifs?.map((title) => (
                            <div key={title.titre} className={styles.fact}>
                                <dt className={styles.label}>
                                    Titre alternatif
                                </dt>
                                <dd className={styles.value}>{title.titre}</dd>
                                {(title.territoire || title.langue) && (
                                    <dd className={styles.detail}>
                                        {[title.territoire, title.langue]
                                            .filter(Boolean)
                                            .join(" · ")}
                                    </dd>
                                )}
                            </div>
                        ))}

                        {fiche.durees?.map((duration) => (
                            <div key={duration.version} className={styles.fact}>
                                <dt className={styles.label}>Durée</dt>
                                <dd className={styles.value}>
                                    {duration.valeur} minutes
                                </dd>
                                <dd className={styles.detail}>
                                    {duration.version}
                                </dd>
                            </div>
                        ))}

                        {fiche.production && (
                            <div className={styles.fact}>
                                <dt className={styles.label}>
                                    Période de production
                                </dt>
                                <dd className={styles.value}>
                                    {formatPeriod(fiche.production)}
                                </dd>
                            </div>
                        )}
                    </dl>
                </CodexFicheSection>
            )}

            {fiche.sortie.evenements?.length ? (
                <CodexFicheSection
                    eyebrow="Sorties"
                    titre="Le film rencontre ses premiers publics"
                >
                    <ol className={styles.events}>
                        {fiche.sortie.evenements.map((event) => (
                            <li
                                key={`${event.nature}-${event.territoire}`}
                                className={styles.event}
                            >
                                <p className={styles.label}>
                                    {eventLabels[event.nature]}
                                </p>
                                <p className={styles.value}>
                                    {formatDateHistorique(event.date)}
                                </p>
                                <p className={styles.detail}>
                                    {[event.lieu, event.territoire]
                                        .filter(Boolean)
                                        .join(" · ")}
                                </p>
                            </li>
                        ))}
                    </ol>
                </CodexFicheSection>
            ) : null}

            {fiche.donneesEconomiques?.length ? (
                <CodexFicheSection
                    eyebrow="Échelle"
                    titre="Mesurer le pari sans effacer les incertitudes"
                    description="Chaque chiffre conserve son territoire, sa période et son degré de certitude ; les estimations divergentes restent visibles."
                >
                    <dl className={styles.economics}>
                        {fiche.donneesEconomiques.map((data, index) => (
                            <div
                                key={`${data.nature}-${data.valeur}-${index}`}
                                className={styles.economic}
                            >
                                <dt className={styles.label}>
                                    {economicLabels[data.nature]}
                                </dt>
                                <dd className={styles.value}>
                                    {formatEconomicValue(data)}
                                </dd>
                                <dd className={styles.detail}>
                                    {data.territoire} ·{" "}
                                    {formatPeriod(data.periode)}
                                    {" · "}
                                    {certaintyLabels[data.certitude]}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </CodexFicheSection>
            ) : null}

            {fiche.relationsOeuvres?.length ? (
                <CodexFicheSection
                    eyebrow="Filiation"
                    titre="Les œuvres qui entourent le récit"
                >
                    <ul className={styles.relations}>
                        {fiche.relationsOeuvres.map((relation) => (
                            <li
                                key={`${relation.nature}-${relation.oeuvre.nom}`}
                                className={styles.relation}
                            >
                                <p className={styles.label}>
                                    {relationLabels[relation.nature]}
                                </p>
                                <p className={styles.value}>
                                    {relation.oeuvre.type === "oeuvre" ? (
                                        <CodexReferenceLink
                                            reference={relation.oeuvre}
                                        />
                                    ) : (
                                        relation.oeuvre.nom
                                    )}
                                </p>
                                {relation.oeuvre.type === "oeuvre-exterieure" &&
                                    (relation.oeuvre.auteurs?.length ||
                                        relation.oeuvre.date) && (
                                        <p className={styles.detail}>
                                            {[
                                                relation.oeuvre.auteurs?.join(
                                                    ", ",
                                                ),
                                                relation.oeuvre.date
                                                    ? formatDateHistorique(
                                                          relation.oeuvre.date,
                                                      )
                                                    : undefined,
                                            ]
                                                .filter(Boolean)
                                                .join(" · ")}
                                        </p>
                                    )}
                            </li>
                        ))}
                    </ul>
                </CodexFicheSection>
            ) : null}

            {groupedCredits.length > 0 && (
                <CodexFicheSection
                    eyebrow="Générique"
                    titre="Les métiers qui construisent le film"
                    description="Les crédits sont regroupés par domaine sans créer artificiellement une fiche pour chaque nom cité."
                >
                    <div className={styles.credits}>
                        {groupedCredits.map((group) => (
                            <section
                                key={group.domain}
                                className={styles.creditGroup}
                            >
                                <h3 className={styles.label}>
                                    {creditDomainLabels[group.domain]}
                                </h3>
                                <ul className={styles.creditList}>
                                    {group.contributions.map((contribution) => (
                                        <li key={contribution.contributeur.nom}>
                                            <p className={styles.creditName}>
                                                <CodexReferenceLink
                                                    reference={
                                                        contribution.contributeur
                                                    }
                                                />
                                            </p>
                                            <p className={styles.creditRoles}>
                                                {contribution.roles.join(", ")}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div>
                </CodexFicheSection>
            )}
        </>
    );
}
