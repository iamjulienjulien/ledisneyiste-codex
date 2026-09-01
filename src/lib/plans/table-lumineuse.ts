import { derivePlanEvidence } from "@/lib/plans/evidence";
import { formatPorteeTerritorialeDocumentaire } from "@/lib/documentaire";
import type {
    CodexPlanArchives,
    CodexPlanConfiguration,
    CodexPlanDerivationNotice,
    CodexPlanEntityReference,
    CodexPlanEvidence,
    CodexPlanRuntimeState,
    CodexTableLumineuseFact,
    CodexTableLumineuseItem,
    CodexTableLumineuseMatterSource,
    CodexTableLumineuseModel,
    CodexTableLumineuseSource,
} from "@/types/codex-plans";
import type { DateHistorique, PeriodeHistorique } from "@/types/date";

function normalizeSearch(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("fr")
        .replace(/\s+/g, " ")
        .trim();
}

function formatDate(date: DateHistorique) {
    return date.valeur;
}

function formatPeriod(period: PeriodeHistorique) {
    return period.fin
        ? `${formatDate(period.debut)} — ${formatDate(period.fin)}`
        : formatDate(period.debut);
}

function getSubject(
    configuration: CodexPlanConfiguration,
    archives: CodexPlanArchives,
): CodexPlanEntityReference {
    const { family, slug } = configuration.subject;
    const definitions = {
        personnages: {
            kind: "personnage",
            entries: archives.catalogues.personnages,
        },
        createurs: {
            kind: "contributeur",
            entries: archives.catalogues.contributeurs,
        },
        oeuvres: { kind: "oeuvre", entries: archives.catalogues.oeuvres },
        epoques: { kind: "epoque", entries: archives.catalogues.epoques },
    } as const;
    const definition = definitions[family];
    const entry = definition.entries.find((item) => item.slug === slug);

    return {
        id: `${definition.kind}:${slug}`,
        kind: definition.kind,
        label: entry?.nom ?? slug,
        slug,
        resolved: entry !== undefined,
    };
}

function fact(
    label: string,
    value: string,
    numericValue?: number,
    unit?: string,
): CodexTableLumineuseFact {
    return {
        label,
        value,
        ...(numericValue === undefined ? {} : { numericValue }),
        ...(unit ? { unit } : {}),
    };
}

function evidenceIndex(evidence: CodexPlanEvidence) {
    const candidate = Number(evidence.id.split(":").at(-1));
    return Number.isInteger(candidate) ? candidate : undefined;
}

function evidenceIdentifier(evidence: CodexPlanEvidence) {
    return evidence.id.split(":").at(-1);
}

function createFacts(
    evidence: CodexPlanEvidence,
    archives: CodexPlanArchives,
): readonly CodexTableLumineuseFact[] {
    if (evidence.owner.kind !== "oeuvre" || !evidence.owner.slug) {
        return [];
    }

    const work = archives.fiches.oeuvres.find(
        (item) => item.slug === evidence.owner.slug,
    );
    const index = evidenceIndex(evidence);

    if (!work) {
        return [];
    }

    if (evidence.scope === "alternate-title" && index !== undefined) {
        const title = work.titresAlternatifs?.[index];
        return title
            ? [
                  fact("Titre", title.titre),
                  fact("Nature", title.nature),
                  ...(title.langue ? [fact("Langue", title.langue)] : []),
                  ...(title.territoire
                      ? [fact("Territoire", title.territoire)]
                      : []),
              ]
            : [];
    }

    if (evidence.scope === "duration" && index !== undefined) {
        const duration = work.durees?.[index];
        return duration
            ? [
                  fact(
                      "Durée",
                      `${duration.valeur} ${duration.unite}`,
                      duration.valeur,
                      duration.unite,
                  ),
                  fact("Version", duration.version),
              ]
            : [];
    }

    if (evidence.scope === "production" && work.production) {
        return [fact("Période", formatPeriod(work.production))];
    }

    if (evidence.scope === "release-event" && index !== undefined) {
        const release = work.sortie.evenements?.[index];
        return release
            ? [
                  fact("Date", formatDate(release.date)),
                  fact(
                      "Territoire",
                      release.porteeTerritoriale
                          ? formatPorteeTerritorialeDocumentaire(
                                release.porteeTerritoriale,
                            )
                          : release.territoire,
                  ),
                  fact("Nature", release.nature),
                  ...(release.lieu ? [fact("Lieu", release.lieu)] : []),
                  ...(release.noteDeReserve
                      ? [fact("Réserve", release.noteDeReserve)]
                      : []),
              ]
            : [];
    }

    if (evidence.scope === "work-version") {
        const version = work.versions?.find(
            (item) => item.id === evidenceIdentifier(evidence),
        );
        return version
            ? [
                  fact("Version", version.identite.libelle),
                  fact("Nature", version.nature),
                  ...(version.identite.langue
                      ? [fact("Langue", version.identite.langue)]
                      : []),
                  ...(version.identite.territoire
                      ? [fact("Territoire", version.identite.territoire)]
                      : []),
                  ...(version.date
                      ? [fact("Date", formatDate(version.date))]
                      : []),
                  ...(version.distributeur
                      ? [fact("Distributeur", version.distributeur)]
                      : []),
                  ...(version.noteDeReserve
                      ? [fact("Réserve", version.noteDeReserve)]
                      : []),
              ]
            : [];
    }

    if (evidence.scope === "work-exploitation") {
        const exploitation = work.exploitations?.find(
            (item) => item.id === evidenceIdentifier(evidence),
        );
        return exploitation
            ? [
                  fact("Nature", exploitation.nature),
                  fact("Période", formatPeriod(exploitation.periode)),
                  fact(
                      "Territoire",
                      formatPorteeTerritorialeDocumentaire(
                          exploitation.porteeTerritoriale,
                      ),
                  ),
                  ...(exploitation.versionIds?.length
                      ? [fact("Versions", exploitation.versionIds.join(", "))]
                      : []),
                  ...(exploitation.support
                      ? [fact("Support", exploitation.support)]
                      : []),
                  ...(exploitation.distributeur
                      ? [fact("Distributeur", exploitation.distributeur)]
                      : []),
                  ...(exploitation.noteDeReserve
                      ? [fact("Réserve", exploitation.noteDeReserve)]
                      : []),
              ]
            : [];
    }

    if (evidence.scope === "work-reception") {
        const reception = work.receptions?.find(
            (item) => item.id === evidenceIdentifier(evidence),
        );
        return reception
            ? [
                  fact("Nature", reception.nature),
                  fact(
                      "Témoin",
                      `${reception.temoin.nom} · ${reception.temoin.nature}`,
                  ),
                  fact(
                      reception.date ? "Date" : "Période",
                      reception.date
                          ? formatDate(reception.date)
                          : formatPeriod(reception.periode),
                  ),
                  fact(
                      "Territoire",
                      formatPorteeTerritorialeDocumentaire(
                          reception.porteeTerritoriale,
                      ),
                  ),
                  fact("Résumé", reception.resume),
                  ...(reception.qualification
                      ? [fact("Qualification", reception.qualification)]
                      : []),
                  ...(reception.support
                      ? [fact("Support", reception.support)]
                      : []),
                  ...(reception.noteDeReserve
                      ? [fact("Réserve", reception.noteDeReserve)]
                      : []),
              ]
            : [];
    }

    if (evidence.scope === "economic-data" && index !== undefined) {
        const data = work.donneesEconomiques?.[index];
        if (!data) {
            return [];
        }

        const unit = data.unite === "monetaire" ? data.devise : data.unite;
        return [
            fact("Nature", data.nature),
            fact(
                "Valeur",
                new Intl.NumberFormat("fr-FR", {
                    ...(data.unite === "monetaire"
                        ? {
                              style: "currency" as const,
                              currency: data.devise,
                              maximumFractionDigits: 0,
                          }
                        : {}),
                }).format(data.valeur),
                data.valeur,
                unit,
            ),
            fact("Territoire", data.territoire),
            fact("Période", formatPeriod(data.periode)),
            fact("Certitude", data.certitude),
        ];
    }

    if (evidence.scope === "work-relation" && index !== undefined) {
        const relation = work.relationsOeuvres?.[index];
        return relation
            ? [
                  fact("Relation", relation.nature),
                  fact("Œuvre liée", relation.oeuvre.nom),
              ]
            : [];
    }

    return [];
}

function createSources(
    evidence: CodexPlanEvidence,
    archives: CodexPlanArchives,
): readonly CodexTableLumineuseSource[] {
    const sourceById = new Map(
        archives.sources.map((source) => [source.id, source] as const),
    );
    const referencesBySlug = new Map(
        evidence.sources.map((source) => [source.slug, source] as const),
    );

    return evidence.sourceIds.map((sourceId) => {
        const source = sourceById.get(sourceId);
        const reference = referencesBySlug.get(sourceId);

        return {
            id: sourceId,
            label: source?.titre ?? reference?.label ?? sourceId,
            ...(source?.auteur ? { author: source.auteur } : {}),
            ...(source?.editeur ? { publisher: source.editeur } : {}),
            ...(source?.url ? { url: source.url } : {}),
            ...(source?.datePublication
                ? { publicationDate: source.datePublication }
                : {}),
            ...(source?.dateConsultation
                ? { consultationDate: source.dateConsultation }
                : {}),
            resolved: source !== undefined || reference?.resolved === true,
            position: evidence.position,
            classification: evidence.sourceClassification,
        };
    });
}

function createItem(
    evidence: CodexPlanEvidence,
    archives: CodexPlanArchives,
): CodexTableLumineuseItem {
    const sources = createSources(evidence, archives);
    const facts = createFacts(evidence, archives);

    return {
        id: evidence.id,
        owner: evidence.owner,
        scope: evidence.scope,
        label: evidence.label,
        status: evidence.status,
        position: evidence.position,
        sourceClassification: evidence.sourceClassification,
        sources,
        unresolvedSourceIds: [...evidence.unresolvedSourceIds],
        facts,
        searchKey: normalizeSearch(
            [
                evidence.label,
                evidence.owner.label,
                evidence.scope,
                evidence.status,
                evidence.position,
                evidence.sourceClassification,
                ...sources.flatMap((source) => [
                    source.id,
                    source.label,
                    source.author,
                    source.publisher,
                ]),
                ...facts.flatMap((item) => [item.label, item.value]),
            ]
                .filter(Boolean)
                .join(" "),
        ),
        provenance: evidence.provenance.map((item) => ({ ...item })),
    };
}

function runtimeState(
    source: CodexTableLumineuseMatterSource,
    items: readonly CodexTableLumineuseItem[],
): CodexPlanRuntimeState {
    if (items.length === 0) {
        return "empty";
    }
    if (source.kind === "bobine-temoin") {
        return source.bobine.runtimeState;
    }
    if (items.some((item) => item.status !== "documented")) {
        return "incomplete";
    }
    return items.length < 3 ? "sparse" : items.length > 80 ? "dense" : "ready";
}

export function deriveTableLumineuse(
    configuration: CodexPlanConfiguration,
    source: CodexTableLumineuseMatterSource,
): CodexTableLumineuseModel {
    if (configuration.plan !== "table-lumineuse") {
        throw new Error(
            "Le dérivateur Table lumineuse requiert le Plan correspondant.",
        );
    }

    const subject = getSubject(configuration, source.archives);
    const archiveResult = derivePlanEvidence(source.archives);
    const sourceEvidence =
        source.kind === "archives"
            ? archiveResult.items.filter(
                  (evidence) => evidence.owner.id === subject.id,
              )
            : source.bobine.evidence;
    const items = sourceEvidence.map((evidence) =>
        createItem(evidence, source.archives),
    );
    const itemIds = new Set(items.map((item) => item.id));
    const notices: CodexPlanDerivationNotice[] =
        source.kind === "archives"
            ? archiveResult.notices.filter(
                  (notice) => !notice.itemId || itemIds.has(notice.itemId),
              )
            : [
                  {
                      code: "bobine-temoin-active",
                      message: `La bobine témoin « ${source.bobine.label} » remplace les Archives publiées.`,
                  },
                  ...items
                      .filter((item) => item.status === "undocumented")
                      .map((item) => ({
                          code: "missing-sources" as const,
                          itemId: item.id,
                          message: `« ${item.label} » ne possède aucune source dans cette Bobine témoin.`,
                      })),
              ];
    const sourceIds = new Set(
        items.flatMap((item) => [
            ...item.sources.map((sourceItem) => sourceItem.id),
            ...item.unresolvedSourceIds,
        ]),
    );

    return {
        configuration,
        subject,
        matter: configuration.matter,
        runtimeState: runtimeState(source, items),
        items,
        selection: {
            total: items.length,
            returned: items.length,
            truncated: false,
        },
        notices,
        stats: {
            items: items.length,
            sources: sourceIds.size,
            attachments: items.reduce(
                (total, item) =>
                    total +
                    item.sources.length +
                    item.unresolvedSourceIds.length,
                0,
            ),
            documented: items.filter((item) => item.status === "documented")
                .length,
            partiallyResolved: items.filter(
                (item) => item.status === "partially-resolved",
            ).length,
            undocumented: items.filter((item) => item.status === "undocumented")
                .length,
            unclassifiedPositions: items.filter(
                (item) => item.position === "unclassified",
            ).length,
            unclassifiedSources: items.filter(
                (item) => item.sourceClassification === "unclassified",
            ).length,
        },
    };
}
