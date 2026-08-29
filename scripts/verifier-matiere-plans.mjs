import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Module, { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const resolutionOriginale = Module._resolveFilename;
const extensionTypeScriptOriginale = Module._extensions[".ts"];

function chargerMatiereTypeScript() {
    Module._resolveFilename = function resoudreAlias(
        demande,
        parent,
        estModulePrincipal,
        options,
    ) {
        const demandeResolue = demande.startsWith("@/")
            ? path.join(racine, "src", demande.slice(2))
            : demande;

        return resolutionOriginale.call(
            this,
            demandeResolue,
            parent,
            estModulePrincipal,
            options,
        );
    };

    Module._extensions[".ts"] = function chargerTypeScript(module, fichier) {
        const source = readFileSync(fichier, "utf8");
        const { outputText } = ts.transpileModule(source, {
            compilerOptions: {
                esModuleInterop: true,
                module: ts.ModuleKind.CommonJS,
                target: ts.ScriptTarget.ES2022,
            },
            fileName: fichier,
        });

        module._compile(outputText, fichier);
    };

    try {
        return {
            ...require(path.join(racine, "src/lib/plans/index.ts")),
            ...require(path.join(racine, "src/fixtures/plans/index.ts")),
            ...require(path.join(racine, "src/registry/plans/index.ts")),
        };
    } finally {
        Module._resolveFilename = resolutionOriginale;

        if (extensionTypeScriptOriginale) {
            Module._extensions[".ts"] = extensionTypeScriptOriginale;
        } else {
            delete Module._extensions[".ts"];
        }
    }
}

function verifierIdentifiantsUniques(items, matiere) {
    const identifiants = items.map((item) => item.id);
    assert.equal(
        new Set(identifiants).size,
        identifiants.length,
        `${matiere} : des identifiants sont dupliqués`,
    );
}

function verifierResultat(resultat, matiere) {
    assert.equal(resultat.matter.kind, "archives");
    assert.equal(resultat.selection.total, resultat.items.length);
    assert.equal(resultat.selection.returned, resultat.items.length);
    assert.equal(resultat.selection.truncated, false);
    assert.ok(Array.isArray(resultat.notices));
    verifierIdentifiantsUniques(resultat.items, matiere);
}

function verifierProvenance(items, matiere) {
    for (const item of items) {
        assert.ok(
            item.provenance.length > 0,
            `${matiere} · ${item.id} : provenance absente`,
        );
        for (const provenance of item.provenance) {
            assert.ok(
                provenance.kind,
                `${item.id} : nature de provenance absente`,
            );
        }
    }
}

function verifierDate(date, contexte) {
    const motifs = {
        annee: /^\d{4}$/,
        mois: /^\d{4}-\d{2}$/,
        jour: /^\d{4}-\d{2}-\d{2}$/,
    };

    assert.ok(motifs[date.precision], `${contexte} : précision inconnue`);
    assert.match(
        date.valeur,
        motifs[date.precision],
        `${contexte} : date incompatible avec sa précision`,
    );
}

function verifierLimite(adapter, archives, nom) {
    const complet = adapter(archives);
    const limite = adapter(archives, { limit: 2 });

    assert.equal(limite.selection.total, complet.items.length);
    assert.equal(limite.selection.returned, Math.min(2, complet.items.length));
    assert.equal(limite.selection.limit, 2);
    assert.equal(limite.selection.truncated, complet.items.length > 2);
    assert.deepEqual(limite.items, complet.items.slice(0, 2));

    if (complet.items.length > 2) {
        assert.ok(
            limite.notices.some((notice) => notice.code === "limit-applied"),
            `${nom} : la troncature n’est pas signalée`,
        );
    }
}

function verifierDeterminisme(adapter, archives, nom) {
    const premierPassage = adapter(archives).items.map((item) => item.id);
    const secondPassage = adapter(archives).items.map((item) => item.id);

    assert.deepEqual(
        premierPassage,
        secondPassage,
        `${nom} : l’ordre ou les identifiants ne sont pas stables`,
    );
}

function verifierCycle(links) {
    const successors = new Map();

    for (const link of links) {
        const targets = successors.get(link.from.id) ?? [];
        targets.push(link.to.id);
        successors.set(link.from.id, targets);
    }

    function visit(nodeId, path = new Set()) {
        if (path.has(nodeId)) {
            return true;
        }

        const nextPath = new Set(path).add(nodeId);
        return (successors.get(nodeId) ?? []).some((targetId) =>
            visit(targetId, nextPath),
        );
    }

    return [...successors.keys()].some((nodeId) => visit(nodeId));
}

function verifierBobinesTemoins(
    bobinesTemoins,
    slugsAttendus,
    plansDisponibles,
) {
    const bobines = Object.values(bobinesTemoins);
    const plans = new Set(Object.keys(plansDisponibles));
    const stresses = new Set();

    assert.deepEqual(Object.keys(bobinesTemoins), [...slugsAttendus]);

    for (const bobine of bobines) {
        assert.equal(bobine.matter.kind, "bobine-temoin");
        assert.equal(bobine.matter.fixture, bobine.slug);
        assert.ok(bobine.label.trim().length > 0);
        assert.ok(bobine.description.trim().length > 0);
        assert.ok(bobine.plans.length > 0);
        assert.ok(bobine.plans.every((plan) => plans.has(plan)));
        bobine.stresses.forEach((stress) => stresses.add(stress));

        for (const [name, items] of [
            ["nœuds", bobine.nodes],
            ["liens", bobine.links],
            ["événements", bobine.events],
            ["crédits", bobine.credits],
            ["preuves", bobine.evidence],
        ]) {
            verifierIdentifiantsUniques(items, `${bobine.slug} · ${name}`);
            verifierProvenance(items, `${bobine.slug} · ${name}`);
            assert.ok(
                items.every((item) =>
                    item.provenance.every(
                        (provenance) => provenance.kind === "bobine-temoin",
                    ),
                ),
                `${bobine.slug} · ${name} : provenance de démonstration absente`,
            );
        }

        const nodeIds = new Set(bobine.nodes.map((node) => node.id));
        assert.ok(
            bobine.nodes.every((node) => !node.publishedSubject),
            `${bobine.slug} : une donnée synthétique ne peut pas devenir un Sujet publié`,
        );

        for (const link of bobine.links) {
            assert.ok(nodeIds.has(link.from.id), `${link.id} : départ absent`);
            assert.ok(nodeIds.has(link.to.id), `${link.id} : arrivée absente`);
        }
        for (const event of bobine.events) {
            assert.ok(
                nodeIds.has(event.subject.id),
                `${event.id} : Sujet absent`,
            );
            verifierDate(event.start, event.id);
        }
        for (const credit of bobine.credits) {
            assert.ok(
                nodeIds.has(credit.work.id),
                `${credit.id} : œuvre absente`,
            );
            assert.ok(
                nodeIds.has(credit.contributor.id),
                `${credit.id} : personne absente`,
            );
            assert.ok(credit.roles.length > 0, `${credit.id} : rôle absent`);
        }
        for (const proof of bobine.evidence) {
            assert.ok(
                nodeIds.has(proof.owner.id),
                `${proof.id} : porteur absent`,
            );
            assert.ok(
                proof.sources.every((source) => nodeIds.has(source.id)),
                `${proof.id} : source absente`,
            );
            assert.equal(
                proof.status === "undocumented",
                proof.sourceIds.length === 0,
                `${proof.id} : statut documentaire incohérent`,
            );
        }
    }

    const expectedStresses = [
        "empty-corpus",
        "reduced-corpus",
        "dense-corpus",
        "relational-cycle",
        "orphan-node",
        "partial-date",
        "contradictory-date",
        "large-credits",
        "long-label",
        "convergent-evidence",
        "divergent-evidence",
        "missing-evidence",
        "keyboard",
        "reduced-motion",
        "small-screen",
        "performance",
    ];
    assert.deepEqual([...stresses].sort(), expectedStresses.sort());

    const empty = bobinesTemoins["corpus-vide"];
    assert.equal(
        empty.nodes.length +
            empty.links.length +
            empty.events.length +
            empty.credits.length +
            empty.evidence.length,
        0,
    );

    const dense = bobinesTemoins["corpus-dense"];
    assert.ok(dense.nodes.length >= 100);
    assert.ok(dense.links.length >= 200);

    const cycles = bobinesTemoins["cycles-et-orphelins"];
    assert.ok(verifierCycle(cycles.links), "Le cycle témoin est absent");
    const connectedNodeIds = new Set(
        cycles.links.flatMap((link) => [link.from.id, link.to.id]),
    );
    assert.ok(
        cycles.nodes.some((node) => !connectedNodeIds.has(node.id)),
        "Le nœud orphelin témoin est absent",
    );

    const dates = bobinesTemoins["dates-partielles-et-contradictoires"];
    assert.deepEqual(
        [...new Set(dates.events.map((event) => event.start.precision))].sort(),
        ["annee", "jour", "mois"],
    );
    assert.ok(
        new Set(dates.events.map((event) => event.start.valeur)).size > 1,
    );

    const credits = bobinesTemoins["grand-generique"];
    assert.ok(credits.credits.length >= 200);
    assert.ok(
        credits.nodes.some((node) => node.label.length > 100) &&
            credits.credits.some((credit) =>
                credit.roles.some((role) => role.length > 100),
            ),
        "Les libellés extrêmes du grand générique sont absents",
    );

    const proofs = bobinesTemoins["preuves-contrastees"];
    assert.deepEqual(
        [...new Set(proofs.evidence.map((proof) => proof.position))].sort(),
        ["contradicts", "inconclusive", "nuances", "supports"],
    );
    assert.ok(proofs.evidence.some((proof) => proof.status === "undocumented"));

    return bobines;
}

function verifier() {
    const {
        codexPlanArchives,
        derivePlanCredits,
        derivePlanEvents,
        derivePlanEvidence,
        derivePlanLinks,
        derivePlanNodes,
        bobinesTemoins,
        CODEX_PLAN_BOBINE_TEMOIN_SLUGS,
        codexPlans,
    } = chargerMatiereTypeScript();
    const archivesAvant = JSON.stringify(codexPlanArchives);
    const nodes = derivePlanNodes(codexPlanArchives);
    const links = derivePlanLinks(codexPlanArchives);
    const events = derivePlanEvents(codexPlanArchives);
    const credits = derivePlanCredits(codexPlanArchives);
    const evidence = derivePlanEvidence(codexPlanArchives);
    const results = [
        ["Nœuds", nodes],
        ["Liens", links],
        ["Événements", events],
        ["Génériques", credits],
        ["Preuves", evidence],
    ];

    for (const [name, result] of results) {
        verifierResultat(result, name);
        verifierProvenance(result.items, name);
        assert.ok(result.items.length > 0, `${name} : matière vide`);
    }

    const publishedSubjectCount =
        codexPlanArchives.catalogues.personnages.length +
        codexPlanArchives.catalogues.contributeurs.length +
        codexPlanArchives.catalogues.oeuvres.length +
        codexPlanArchives.catalogues.epoques.length;
    const expectedNodeCount =
        publishedSubjectCount +
        codexPlanArchives.recompenses.length +
        codexPlanArchives.sources.length;
    const nodeIds = new Set(nodes.items.map((node) => node.id));
    const sourceIds = new Set(
        codexPlanArchives.sources.map((source) => source.id),
    );

    assert.equal(nodes.items.length, expectedNodeCount);
    assert.equal(
        nodes.items.filter((node) => node.publishedSubject).length,
        publishedSubjectCount,
    );
    assert.ok(
        nodes.items
            .filter(
                (node) => node.kind === "recompense" || node.kind === "source",
            )
            .every((node) => !node.publishedSubject),
        "Récompenses et sources ne doivent pas devenir des Sujets publiés",
    );
    assert.ok(
        nodes.items
            .filter((node) => node.kind === "source")
            .every((node) => node.metadata.classification === "unclassified"),
        "La classification absente des sources doit rester explicite",
    );
    assert.ok(
        nodes.notices.some(
            (notice) => notice.code === "source-classification-unavailable",
        ),
    );

    for (const link of links.items) {
        assert.equal(link.direction, "directed");
        assert.ok(link.label.length > 0, `${link.id} : libellé absent`);

        for (const reference of [link.from, link.to]) {
            if (reference.resolved) {
                assert.ok(
                    nodeIds.has(reference.id),
                    `${link.id} : le nœud résolu ${reference.id} est absent`,
                );
            }
        }

        for (const provenance of link.provenance) {
            for (const sourceId of provenance.sourceIds ?? []) {
                assert.ok(
                    sourceIds.has(sourceId),
                    `${link.id} : source inconnue ${sourceId}`,
                );
            }
        }
    }

    const unresolvedLinks = links.items.filter(
        (link) => !link.from.resolved || !link.to.resolved,
    );
    assert.ok(
        unresolvedLinks.length > 0,
        "Les références extérieures ou non publiées ont été perdues",
    );
    for (const link of unresolvedLinks) {
        assert.ok(
            links.notices.some(
                (notice) =>
                    notice.code === "unresolved-reference" &&
                    notice.itemId === link.id,
            ),
            `${link.id} : référence non résolue non signalée`,
        );
    }

    for (const event of events.items) {
        verifierDate(event.start, event.id);
        if (event.end) {
            verifierDate(event.end, event.id);
        }
        if (event.kind === "era" && event.end) {
            assert.equal(
                event.endExclusive,
                true,
                `${event.id} : la borne de fin de l’Époque doit rester exclusive`,
            );
        }
    }

    for (const credit of credits.items) {
        assert.equal(credit.work.kind, "oeuvre");
        assert.ok(credit.work.resolved, `${credit.id} : œuvre non résolue`);
        assert.ok(credit.roles.length > 0, `${credit.id} : rôle absent`);
        assert.ok(
            credit.roles.every((role) => role.trim().length > 0),
            `${credit.id} : rôle vide`,
        );
        if (!credit.contributor.resolved) {
            assert.ok(
                credits.notices.some(
                    (notice) =>
                        notice.code === "unresolved-reference" &&
                        notice.itemId === credit.id,
                ),
                `${credit.id} : crédit non résolu non signalé`,
            );
        }
    }

    for (const proof of evidence.items) {
        assert.equal(proof.position, "unclassified");
        assert.equal(proof.sourceClassification, "unclassified");
        assert.equal(
            proof.status === "undocumented",
            proof.sourceIds.length === 0,
            `${proof.id} : statut documentaire incohérent`,
        );
        assert.deepEqual(
            proof.unresolvedSourceIds,
            proof.sourceIds.filter((sourceId) => !sourceIds.has(sourceId)),
        );
        assert.ok(
            proof.sources.every((source) => nodeIds.has(source.id)),
            `${proof.id} : une source résolue ne possède pas de nœud`,
        );
    }
    assert.ok(
        evidence.notices.some(
            (notice) => notice.code === "source-classification-unavailable",
        ),
    );

    const adapters = [
        ["Nœuds", derivePlanNodes],
        ["Liens", derivePlanLinks],
        ["Événements", derivePlanEvents],
        ["Génériques", derivePlanCredits],
        ["Preuves", derivePlanEvidence],
    ];
    for (const [name, adapter] of adapters) {
        verifierLimite(adapter, codexPlanArchives, name);
        verifierDeterminisme(adapter, codexPlanArchives, name);
    }

    assert.equal(
        JSON.stringify(codexPlanArchives),
        archivesAvant,
        "Les adaptateurs ont modifié les Archives qu’ils devaient seulement lire",
    );

    const bobines = verifierBobinesTemoins(
        bobinesTemoins,
        CODEX_PLAN_BOBINE_TEMOIN_SLUGS,
        codexPlans,
    );

    console.log(
        `Matière des Plans vérifiée : ${nodes.items.length} nœuds, ${links.items.length} liens, ${events.items.length} événements, ${credits.items.length} crédits, ${evidence.items.length} preuves et ${bobines.length} Bobines témoins.`,
    );
}

verifier();
