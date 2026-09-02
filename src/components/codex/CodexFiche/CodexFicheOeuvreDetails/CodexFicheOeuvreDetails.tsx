import { CodexFicheSection } from "@/components/codex/CodexFiche/CodexFicheSection";
import { CodexCommonReferenceLink } from "@/components/codex/CodexCommon/CodexCommonReferenceLink";
import { CodexFicheSourceCitations } from "@/components/codex/CodexFiche/CodexFicheSourceCitations";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { formatDateHistorique } from "@/lib/date";
import { formatPorteeTerritorialeDocumentaire } from "@/lib/documentaire";
import { lireDonneeEconomiqueOeuvre } from "@/lib/donnees-economiques";
import type { SymbolSelection } from "@/registry/symbols";
import type { PeriodeHistorique } from "@/types/date";
import type {
    NatureExploitationOeuvre,
    NatureReceptionOeuvre,
    NatureVersionOeuvre,
    QualificationReceptionOeuvre,
} from "@/types/circulation-oeuvre";
import type {
    ContributionOeuvre,
    DomaineCreditOeuvre,
    NatureEvenementSortieOeuvre,
    NatureRelationOeuvre,
    TitreAlternatifOeuvre,
} from "@/types/oeuvre";
import type { CodexFicheOeuvreDetailsProps } from "./CodexFicheOeuvreDetails.types";
import styles from "./CodexFicheOeuvreDetails.module.css";

const eventLabels: Record<NatureEvenementSortieOeuvre, string> = {
    "premiere-mondiale": "Première mondiale",
    "avant-premiere": "Avant-première",
    "sortie-nationale": "Sortie nationale",
    ressortie: "Ressortie",
    "presentation-festival": "Présentation en festival",
    "mise-a-disposition": "Mise à disposition",
};

const versionLabels: Record<NatureVersionOeuvre, string> = {
    originale: "Version originale",
    doublage: "Doublage",
    restauration: "Restauration",
    edition: "Édition",
    "montage-alternatif": "Montage alternatif",
};

const exploitationLabels: Record<NatureExploitationOeuvre, string> = {
    "premiere-exploitation": "Première exploitation",
    "exploitation-nationale": "Exploitation nationale",
    ressortie: "Ressortie",
    festival: "Festival",
    restauration: "Restauration",
    "edition-video": "Édition vidéo",
    "diffusion-televisuelle": "Diffusion télévisuelle",
    "diffusion-numerique": "Diffusion numérique",
};

const receptionLabels: Record<NatureReceptionOeuvre, string> = {
    "critique-contemporaine": "Critique contemporaine",
    professionnelle: "Réception professionnelle",
    publique: "Réception publique",
    institutionnelle: "Réception institutionnelle",
    reevaluation: "Réévaluation",
};

const receptionQualificationLabels: Record<
    QualificationReceptionOeuvre,
    string
> = {
    favorable: "Favorable",
    partagee: "Partagée",
    defavorable: "Défavorable",
    descriptive: "Constat documenté",
};

function formatEventTerritory(
    event: NonNullable<
        CodexFicheOeuvreDetailsProps["fiche"]["sortie"]["evenements"]
    >[number],
) {
    return event.porteeTerritoriale
        ? formatPorteeTerritorialeDocumentaire(event.porteeTerritoriale)
        : event.territoire;
}

const alternativeTitleLabels: Record<TitreAlternatifOeuvre["nature"], string> =
    {
        original: "Titre original",
        international: "Titre international",
        "sortie-territoriale": "Titre de sortie territoriale",
    };

const certaintyLabels = {
    documente: "Donnée documentée",
    estimation: "Estimation sourcée",
    conteste: "Valeur contestée",
};

const relationLabels: Record<NatureRelationOeuvre, string> = {
    source: "Œuvre source",
    preparation: "Œuvre préparatoire",
    adaptation: "Adaptation",
    inspiration: "Source d’inspiration",
    influence: "Influence documentée",
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

const creditDomainSymbols = {
    "production-direction": {
        registry: "general",
        collection: "cinema",
        slug: "fauteuil-realisateur",
    },
    "histoire-adaptation": {
        registry: "general",
        collection: "cinema",
        slug: "scenario",
    },
    "direction-artistique-conception": {
        registry: "techniques",
        collection: "couleur",
        slug: "color-script",
    },
    "animation-personnages": {
        registry: "techniques",
        collection: "animation",
        slug: "planche-modele",
    },
    "decors-effets-photographie": {
        registry: "techniques",
        collection: "images",
        slug: "matte-painting",
    },
    "musique-chansons": {
        registry: "techniques",
        collection: "son",
        slug: "generateur-click-track",
    },
    "interpretation-vocale": {
        registry: "techniques",
        collection: "son",
        slug: "microphone-ruban",
    },
    "innovations-techniques": {
        registry: "techniques",
        collection: "animation",
        slug: "camera-multiplane",
    },
    "reference-filmee": {
        registry: "general",
        collection: "cinema",
        slug: "camera-cinema",
    },
} as const satisfies Record<DomaineCreditOeuvre, SymbolSelection>;

function formatPeriod(period: PeriodeHistorique) {
    return `${formatDateHistorique(period.debut)}–${period.fin ? formatDateHistorique(period.fin) : "aujourd’hui"}`;
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

export function CodexFicheOeuvreDetails({
    fiche,
    sources,
    oeuvresSources = [],
}: CodexFicheOeuvreDetailsProps) {
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
                    symbole={
                        <PixieSymbol
                            registry="techniques"
                            collection="animation"
                            slug="feuille-exposition"
                            size={96}
                        />
                    }
                >
                    <dl className={styles.facts}>
                        {fiche.titresAlternatifs?.map((title) => (
                            <PixieCard
                                key={title.titre}
                                as="div"
                                variant="accent"
                                color="gouache"
                                padding="md"
                                radius="medium"
                                className={styles.fact}
                            >
                                <dt className={styles.label}>
                                    {alternativeTitleLabels[title.nature]}
                                </dt>
                                <dd className={styles.value}>{title.titre}</dd>
                                {(title.territoire || title.langue) && (
                                    <dd className={styles.detail}>
                                        {[title.territoire, title.langue]
                                            .filter(Boolean)
                                            .join(" · ")}
                                    </dd>
                                )}
                                <dd className={styles.citations}>
                                    <CodexFicheSourceCitations
                                        sourceIds={title.sources}
                                        sources={sources}
                                        label="Sources du repère"
                                    />
                                </dd>
                            </PixieCard>
                        ))}

                        {fiche.durees?.map((duration) => (
                            <PixieCard
                                key={duration.version}
                                as="div"
                                variant="accent"
                                color="gouache"
                                padding="md"
                                radius="medium"
                                className={styles.fact}
                            >
                                <dt className={styles.label}>Durée</dt>
                                <dd className={styles.value}>
                                    {duration.valeur} minutes
                                </dd>
                                <dd className={styles.detail}>
                                    {duration.version}
                                </dd>
                                <dd className={styles.citations}>
                                    <CodexFicheSourceCitations
                                        sourceIds={duration.sources}
                                        sources={sources}
                                        label="Sources du repère"
                                    />
                                </dd>
                            </PixieCard>
                        ))}

                        {fiche.production && (
                            <PixieCard
                                as="div"
                                variant="accent"
                                color="gouache"
                                padding="md"
                                radius="medium"
                                className={styles.fact}
                            >
                                <dt className={styles.label}>
                                    Période de production
                                </dt>
                                <dd className={styles.value}>
                                    {formatPeriod(fiche.production)}
                                </dd>
                                <dd className={styles.citations}>
                                    <CodexFicheSourceCitations
                                        sourceIds={fiche.production.sources}
                                        sources={sources}
                                        label="Sources du repère"
                                    />
                                </dd>
                            </PixieCard>
                        )}
                    </dl>
                </CodexFicheSection>
            )}

            {fiche.sortie.evenements?.length ? (
                <CodexFicheSection
                    eyebrow="Sorties"
                    titre="Le film rencontre ses premiers publics"
                    description="Chaque première conserve sa date, son lieu, son territoire et les sources qui permettent de la situer."
                    symbole={
                        <PixieSymbol
                            registry="general"
                            collection="evenements"
                            slug="projecteur-premiere"
                            size={96}
                        />
                    }
                >
                    <ol className={styles.events}>
                        {fiche.sortie.evenements.map((event) => (
                            <PixieCard
                                key={
                                    event.id ??
                                    `${event.nature}-${formatEventTerritory(event)}`
                                }
                                as="li"
                                variant="accent"
                                color="gouache"
                                padding="md"
                                radius="medium"
                                className={styles.event}
                            >
                                <p className={styles.label}>
                                    {eventLabels[event.nature]}
                                </p>
                                <p className={styles.value}>
                                    {formatDateHistorique(event.date)}
                                </p>
                                <p className={styles.detail}>
                                    {[event.lieu, formatEventTerritory(event)]
                                        .filter(Boolean)
                                        .join(" · ")}
                                </p>
                                <div className={styles.citations}>
                                    <CodexFicheSourceCitations
                                        sourceIds={event.sources}
                                        sources={sources}
                                        label="Sources de la sortie"
                                    />
                                </div>
                            </PixieCard>
                        ))}
                    </ol>
                </CodexFicheSection>
            ) : null}

            {fiche.versions?.length || fiche.exploitations?.length ? (
                <CodexFicheSection
                    eyebrow="Circulation"
                    titre="Les versions et les chemins de diffusion"
                    description="Une version n’est créée que lorsqu’elle possède une identité propre ; chaque exploitation conserve séparément sa période, sa portée et ses sources."
                    symbole={
                        <PixieSymbol
                            registry="diffusion"
                            collection="salles"
                            slug="bobines-programme"
                            size={96}
                        />
                    }
                >
                    {fiche.versions?.length ? (
                        <div className={styles.circulationGroup}>
                            <h3 className={styles.groupTitle}>
                                Versions documentées
                            </h3>
                            <dl className={styles.circulation}>
                                {fiche.versions.map((version) => (
                                    <PixieCard
                                        key={version.id}
                                        as="div"
                                        variant="accent"
                                        color="gouache"
                                        padding="md"
                                        radius="medium"
                                        className={styles.circulationItem}
                                    >
                                        <dt className={styles.label}>
                                            {versionLabels[version.nature]}
                                        </dt>
                                        <dd className={styles.value}>
                                            {version.identite.libelle}
                                        </dd>
                                        <dd className={styles.detail}>
                                            {[
                                                version.date
                                                    ? formatDateHistorique(
                                                          version.date,
                                                      )
                                                    : undefined,
                                                version.identite.langue,
                                                version.identite.territoire,
                                                version.distributeur,
                                            ]
                                                .filter(Boolean)
                                                .join(" · ")}
                                        </dd>
                                        <dd className={styles.citations}>
                                            <CodexFicheSourceCitations
                                                sourceIds={version.sources}
                                                sources={sources}
                                                label="Sources de la version"
                                            />
                                        </dd>
                                    </PixieCard>
                                ))}
                            </dl>
                        </div>
                    ) : null}

                    {fiche.exploitations?.length ? (
                        <div className={styles.circulationGroup}>
                            <h3 className={styles.groupTitle}>
                                Exploitations documentées
                            </h3>
                            <dl className={styles.circulation}>
                                {fiche.exploitations.map((exploitation) => (
                                    <PixieCard
                                        key={exploitation.id}
                                        as="div"
                                        variant="accent"
                                        color="gouache"
                                        padding="md"
                                        radius="medium"
                                        className={styles.circulationItem}
                                    >
                                        <dt className={styles.label}>
                                            {
                                                exploitationLabels[
                                                    exploitation.nature
                                                ]
                                            }
                                        </dt>
                                        <dd className={styles.value}>
                                            {formatPeriod(exploitation.periode)}
                                        </dd>
                                        <dd className={styles.detail}>
                                            {[
                                                formatPorteeTerritorialeDocumentaire(
                                                    exploitation.porteeTerritoriale,
                                                ),
                                                exploitation.support,
                                                exploitation.distributeur,
                                            ]
                                                .filter(Boolean)
                                                .join(" · ")}
                                        </dd>
                                        <dd className={styles.citations}>
                                            <CodexFicheSourceCitations
                                                sourceIds={exploitation.sources}
                                                sources={sources}
                                                label="Sources de l’exploitation"
                                            />
                                        </dd>
                                    </PixieCard>
                                ))}
                            </dl>
                        </div>
                    ) : null}
                </CodexFicheSection>
            ) : null}

            {fiche.receptions?.length ? (
                <CodexFicheSection
                    eyebrow="Réception"
                    titre="Le public et les témoins de chaque époque"
                    description="Chaque réception reste attribuée à un témoin, une temporalité et une portée ; un constat descriptif ne devient pas artificiellement un jugement."
                    symbole={
                        <PixieSymbol
                            registry="diffusion"
                            collection="salles"
                            slug="salle-projection"
                            size={96}
                        />
                    }
                >
                    <dl className={styles.receptions}>
                        {fiche.receptions.map((reception) => (
                            <PixieCard
                                key={reception.id}
                                as="div"
                                variant="accent"
                                color="gouache"
                                padding="md"
                                radius="medium"
                                className={styles.reception}
                            >
                                <dt className={styles.label}>
                                    {receptionLabels[reception.nature]}
                                </dt>
                                <dd className={styles.value}>
                                    {reception.temoin.nom}
                                </dd>
                                <dd className={styles.detail}>
                                    {[
                                        reception.date
                                            ? formatDateHistorique(
                                                  reception.date,
                                              )
                                            : formatPeriod(reception.periode),
                                        formatPorteeTerritorialeDocumentaire(
                                            reception.porteeTerritoriale,
                                        ),
                                        reception.qualification
                                            ? receptionQualificationLabels[
                                                  reception.qualification
                                              ]
                                            : undefined,
                                    ]
                                        .filter(Boolean)
                                        .join(" · ")}
                                </dd>
                                <dd className={styles.detail}>
                                    {reception.resume}
                                </dd>
                                <dd className={styles.citations}>
                                    <CodexFicheSourceCitations
                                        sourceIds={reception.sources}
                                        sources={sources}
                                        label="Sources de la réception"
                                    />
                                </dd>
                            </PixieCard>
                        ))}
                    </dl>
                </CodexFicheSection>
            ) : null}

            {fiche.donneesEconomiques?.length ? (
                <CodexFicheSection
                    eyebrow="Échelle"
                    titre="Mesurer le pari sans effacer les incertitudes"
                    description="Chaque chiffre conserve son territoire, sa période et son degré de certitude ; les estimations divergentes restent visibles."
                    symbole={
                        <PixieSymbol
                            registry="general"
                            collection="archives"
                            slug="registre-relie"
                            size={96}
                        />
                    }
                >
                    <dl className={styles.economics}>
                        {fiche.donneesEconomiques.map((data, index) => {
                            const lecture = lireDonneeEconomiqueOeuvre(data);

                            return (
                                <PixieCard
                                    key={
                                        lecture.id ??
                                        `donnee-economique-${index}`
                                    }
                                    as="div"
                                    variant="accent"
                                    color="gouache"
                                    padding="md"
                                    radius="medium"
                                    className={styles.economic}
                                >
                                    <dt className={styles.label}>
                                        {lecture.mesure}
                                    </dt>
                                    <dd className={styles.value}>
                                        {lecture.valeur}
                                    </dd>
                                    <dd className={styles.detail}>
                                        {lecture.territoire} ·{" "}
                                        {lecture.temporalite}
                                        {" · "}
                                        {certaintyLabels[lecture.certitude]}
                                        {lecture.methode
                                            ? ` · ${lecture.methode}`
                                            : ""}
                                    </dd>
                                    {lecture.noteDeReserve ? (
                                        <dd className={styles.detail}>
                                            {lecture.noteDeReserve}
                                        </dd>
                                    ) : null}
                                    <dd className={styles.citations}>
                                        <CodexFicheSourceCitations
                                            sourceIds={[...lecture.sources]}
                                            sources={sources}
                                            label="Sources du chiffre"
                                        />
                                    </dd>
                                </PixieCard>
                            );
                        })}
                    </dl>
                </CodexFicheSection>
            ) : null}

            {fiche.relationsOeuvres?.length ? (
                <CodexFicheSection
                    eyebrow="Filiation"
                    titre="Les œuvres qui entourent le récit"
                    description="Les œuvres sources, préparatoires, adaptées ou dérivées dessinent les héritages et les prolongements du film."
                    symbole={
                        <PixieSymbol
                            registry="general"
                            collection="exploration"
                            slug="carte-balises-reliees"
                            size={96}
                        />
                    }
                >
                    <ul className={styles.relations}>
                        {fiche.relationsOeuvres.map((relation) => {
                            const oeuvre = relation.oeuvre;
                            const resolution =
                                oeuvre.type === "oeuvre-source"
                                    ? oeuvresSources.find(
                                          (candidate) =>
                                              candidate.referenceId ===
                                              oeuvre.id,
                                      )
                                    : undefined;

                            return (
                                <PixieCard
                                    key={`${relation.nature}-${relation.oeuvre.nom}`}
                                    as="li"
                                    variant="accent"
                                    color="gouache"
                                    padding="md"
                                    radius="medium"
                                    className={styles.relation}
                                >
                                    <p className={styles.label}>
                                        {relationLabels[relation.nature]}
                                    </p>
                                    <p className={styles.value}>
                                        {relation.oeuvre.type === "oeuvre" ? (
                                            <CodexCommonReferenceLink
                                                reference={relation.oeuvre}
                                            />
                                        ) : (
                                            relation.oeuvre.nom
                                        )}
                                    </p>
                                    {relation.oeuvre.type ===
                                        "oeuvre-exterieure" &&
                                        (relation.oeuvre.auteurs?.length ||
                                            relation.oeuvre.date) && (
                                            <p className={styles.detail}>
                                                {[
                                                    relation.oeuvre.auteurs?.join(
                                                        ", ",
                                                    ),
                                                    relation.oeuvre.date
                                                        ? formatDateHistorique(
                                                              relation.oeuvre
                                                                  .date,
                                                          )
                                                        : undefined,
                                                ]
                                                    .filter(Boolean)
                                                    .join(" · ")}
                                            </p>
                                        )}
                                    {relation.oeuvre.type === "oeuvre-source" &&
                                    resolution?.resolved &&
                                    resolution.fiche ? (
                                        <p className={styles.detail}>
                                            {[
                                                resolution.fiche.auteurs
                                                    .map((auteur) => auteur.nom)
                                                    .join(", "),
                                                formatDateHistorique(
                                                    resolution.fiche.date,
                                                ),
                                                resolution.fiche.nature,
                                            ].join(" · ")}
                                        </p>
                                    ) : null}
                                    <div className={styles.citations}>
                                        <CodexFicheSourceCitations
                                            sourceIds={relation.sources}
                                            sources={sources}
                                            label="Sources de la relation"
                                        />
                                    </div>
                                </PixieCard>
                            );
                        })}
                    </ul>
                </CodexFicheSection>
            ) : null}

            {groupedCredits.length > 0 && (
                <CodexFicheSection
                    eyebrow="Générique"
                    titre="Les métiers qui construisent le film"
                    description="Les crédits sont regroupés par domaine sans créer artificiellement une fiche pour chaque nom cité."
                    symbole={
                        <PixieSymbol
                            registry="general"
                            collection="atelier"
                            slug="boite-outils-ouverte"
                            size={96}
                        />
                    }
                >
                    <div className={styles.credits}>
                        {groupedCredits.map((group) => (
                            <PixieCard
                                key={group.domain}
                                as="section"
                                variant="accent"
                                color="gouache"
                                padding="md"
                                radius="medium"
                                className={styles.creditGroup}
                            >
                                <div className={styles.creditHeading}>
                                    <PixieSymbol
                                        {...creditDomainSymbols[group.domain]}
                                        size="lg"
                                    />

                                    <h3 className={styles.label}>
                                        {creditDomainLabels[group.domain]}
                                    </h3>
                                </div>
                                <ul className={styles.creditList}>
                                    {group.contributions.map((contribution) => (
                                        <li key={contribution.contributeur.nom}>
                                            <p className={styles.creditName}>
                                                <CodexCommonReferenceLink
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
                            </PixieCard>
                        ))}
                    </div>
                </CodexFicheSection>
            )}
        </>
    );
}
