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

function verifierCirculationOeuvre({
    archives,
    derivePlanEvents,
    derivePlanEvidence,
    deriveMontageDuTemps,
    deriveTableLumineuse,
}) {
    const fiche = JSON.parse(
        readFileSync(
            path.join(racine, "scripts/fixtures/oeuvre-circulation.json"),
            "utf8",
        ),
    );
    const sourcesFixture = ["a", "b", "c"].map((suffixe) => ({
        id: `fixture-source-${suffixe}`,
        titre: `Source privée ${suffixe.toUpperCase()}`,
    }));
    const archivesFixture = {
        ...archives,
        catalogues: {
            ...archives.catalogues,
            oeuvres: [
                ...archives.catalogues.oeuvres,
                {
                    slug: fiche.slug,
                    nom: "Œuvre témoin de circulation",
                    type: "oeuvre",
                },
            ],
        },
        fiches: {
            ...archives.fiches,
            oeuvres: [...archives.fiches.oeuvres, fiche],
        },
        sources: [...archives.sources, ...sourcesFixture],
    };
    const configuration = {
        plan: "table-lumineuse",
        subject: { family: "oeuvres", slug: fiche.slug },
        angle: "provenance",
        objective: "verify",
        frame: {
            label: "Circulation privée",
            description:
                "Éprouver les sorties, versions, exploitations et réceptions.",
        },
        matter: { kind: "archives" },
    };
    const events = derivePlanEvents(archivesFixture).items.filter(
        (event) => event.subject.slug === fiche.slug,
    );
    const evidence = derivePlanEvidence(archivesFixture).items.filter(
        (item) => item.owner.slug === fiche.slug,
    );

    assert.equal(
        events.filter((event) => event.kind === "release-event").length,
        3,
        "La bobine de circulation doit conserver ses trois sorties",
    );
    assert.equal(
        events.filter((event) => event.kind === "work-exploitation").length,
        3,
        "La bobine de circulation doit conserver ses trois exploitations",
    );
    assert.equal(
        events.filter((event) => event.kind === "work-reception").length,
        3,
        "La bobine de circulation doit conserver ses trois réceptions",
    );
    assert.equal(
        events.find((event) => event.id.endsWith("reevaluation-1985"))?.start
            .valeur,
        "1985",
        "La réévaluation rétrospective ne doit pas être antidatée en 1940",
    );
    assert.equal(
        events.find((event) => event.id.includes("ressortie-restauree"))
            ?.subject.id,
        `oeuvre:${fiche.slug}`,
        "Une ressortie doit rester attachée à l’œuvre existante",
    );

    for (const [scope, attendu] of [
        ["work-version", 3],
        ["work-exploitation", 3],
        ["work-reception", 3],
    ]) {
        assert.equal(
            evidence.filter((item) => item.scope === scope).length,
            attendu,
            `${scope} : matière incomplète`,
        );
    }

    const table = deriveTableLumineuse(configuration, {
        kind: "archives",
        archives: archivesFixture,
    });
    const receptionRetrospective = table.items.find((item) =>
        item.id.endsWith("reevaluation-1985"),
    );
    assert.ok(receptionRetrospective, "Réception rétrospective absente");
    assert.ok(
        receptionRetrospective.facts.some(
            (fait) =>
                fait.label === "Qualification" && fait.value === "descriptive",
        ),
        "Le contrechamp a perdu la qualification de la réception",
    );
    assert.ok(
        receptionRetrospective.facts.some(
            (fait) => fait.label === "Territoire" && fait.value === "Monde",
        ),
        "Le contrechamp a perdu la portée mondiale documentée",
    );

    const montage = deriveMontageDuTemps(
        { ...configuration, plan: "montage-du-temps", objective: "compare" },
        { kind: "archives", archives: archivesFixture },
    );
    assert.ok(
        montage.events.some(
            (event) =>
                event.kind === "work-exploitation" &&
                event.track === "distribution",
        ),
        "Les exploitations ne rejoignent pas la piste de diffusion",
    );
    assert.ok(
        montage.events.some(
            (event) =>
                event.kind === "work-reception" && event.track === "reception",
        ),
        "Les réceptions ne rejoignent pas la piste de reconnaissance",
    );
    assert.ok(
        !montage.events.some((event) => event.kind === "work-release"),
        "La date canonique ne doit pas doubler les sorties détaillées",
    );

    return { events, evidence, table, montage };
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

function verifierTravellingDocumentaire({
    archives,
    bobinesTemoins,
    deriveTravellingDocumentaire,
}) {
    const configuration = {
        plan: "travelling-documentaire",
        subject: {
            family: "oeuvres",
            slug: "snow-white-and-the-seven-dwarfs",
        },
        angle: "filiation",
        objective: "follow",
        frame: {
            label: "Des laboratoires au premier long métrage",
            description:
                "Suivre les œuvres et les sources qui convergent vers Blanche-Neige.",
            depth: 2,
            limit: 8,
        },
        matter: { kind: "archives" },
    };
    const archivesAvant = JSON.stringify(archives);
    const projection = deriveTravellingDocumentaire(configuration, {
        kind: "archives",
        archives,
    });

    assert.equal(
        projection.subject.id,
        "oeuvre:snow-white-and-the-seven-dwarfs",
    );
    assert.equal(projection.subject.label, "Blanche-Neige et les Sept Nains");
    assert.equal(projection.subject.resolved, true);
    assert.equal(projection.matter.kind, "archives");
    assert.equal(projection.runtimeState, "ready");
    assert.deepEqual(
        projection.stages.map((stage) => stage.node.label),
        [
            "Schneewittchen",
            "La Déesse du Printemps",
            "Le Vieux Moulin",
            "Blanche-Neige et les Sept Nains",
        ],
    );
    assert.deepEqual(
        projection.stages.map((stage) => stage.zone),
        ["origin", "laboratory", "laboratory", "destination"],
    );
    assert.deepEqual(
        projection.stages.map((stage) => stage.date?.valeur),
        ["1812", "1934-11-03", "1937-11-05", "1937-12-21"],
    );
    assert.equal(projection.stages.at(-1)?.isSubject, true);
    assert.equal(projection.connections.length, 3);
    assert.ok(
        projection.connections.every(
            (connection) => connection.toId === projection.subject.id,
        ),
        "Le Travelling documentaire doit montrer une convergence vers le Sujet",
    );
    assert.ok(
        projection.connections.every(
            (connection) => connection.evidence.length > 0,
        ),
        "Chaque raccord documentaire doit conserver ses sources",
    );
    assert.ok(
        !projection.connections.some(
            (connection) =>
                connection.fromId === "oeuvre:the-goddess-of-spring" &&
                connection.toId === "oeuvre:the-old-mill",
        ),
        "Le prototype ne doit pas inventer de causalité entre les laboratoires",
    );
    assert.deepEqual(
        projection.connections.map((connection) => connection.label),
        ["est une source de", "prépare", "prépare"],
    );
    assert.equal(projection.selection.total, 3);
    assert.equal(projection.selection.returned, 3);
    assert.equal(projection.selection.truncated, false);
    assert.equal(projection.cycleDetected, false);
    assert.deepEqual(projection.orphanNodeIds, []);
    assert.deepEqual(
        deriveTravellingDocumentaire(configuration, {
            kind: "archives",
            archives,
        }),
        projection,
        "Le Travelling documentaire doit rester déterministe",
    );

    const projectionLimitee = deriveTravellingDocumentaire(
        {
            ...configuration,
            frame: { ...configuration.frame, limit: 1 },
        },
        { kind: "archives", archives },
    );
    assert.equal(projectionLimitee.stages.length, 2);
    assert.equal(projectionLimitee.stages.at(-1)?.isSubject, true);
    assert.equal(projectionLimitee.selection.total, 3);
    assert.equal(projectionLimitee.selection.returned, 1);
    assert.equal(projectionLimitee.selection.truncated, true);
    assert.ok(
        projectionLimitee.notices.some(
            (notice) => notice.code === "limit-applied",
        ),
    );

    const projeterBobine = (slug) =>
        deriveTravellingDocumentaire(
            {
                ...configuration,
                matter: { kind: "bobine-temoin", fixture: slug },
            },
            {
                kind: "bobine-temoin",
                archives,
                bobine: bobinesTemoins[slug],
            },
        );
    const vide = projeterBobine("corpus-vide");
    const reduit = projeterBobine("corpus-reduit");
    const dense = projeterBobine("corpus-dense");
    const cycles = projeterBobine("cycles-et-orphelins");
    const cyclesProfondeurUn = deriveTravellingDocumentaire(
        {
            ...configuration,
            frame: { ...configuration.frame, depth: 1 },
            matter: {
                kind: "bobine-temoin",
                fixture: "cycles-et-orphelins",
            },
        },
        {
            kind: "bobine-temoin",
            archives,
            bobine: bobinesTemoins["cycles-et-orphelins"],
        },
    );

    assert.equal(vide.runtimeState, "empty");
    assert.equal(vide.stages.length, 0);
    assert.equal(reduit.runtimeState, "sparse");
    assert.equal(reduit.stages.length, 2);
    assert.equal(reduit.orphanNodeIds.length, 1);
    assert.ok(reduit.notices.some((notice) => notice.code === "orphan-node"));
    assert.equal(dense.runtimeState, "dense");
    assert.equal(dense.selection.returned, 8);
    assert.equal(dense.selection.truncated, true);
    assert.equal(dense.cycleDetected, true);
    assert.equal(cycles.runtimeState, "incomplete");
    assert.equal(cycles.stages.length, 3);
    assert.equal(cyclesProfondeurUn.stages.length, 2);
    assert.equal(new Set(cycles.stages.map((stage) => stage.id)).size, 3);
    assert.equal(cycles.cycleDetected, true);
    assert.deepEqual(cycles.orphanNodeIds, ["personnage:noeud-orphelin"]);
    assert.ok(
        cycles.notices.some((notice) => notice.code === "cycle-detected") &&
            cycles.notices.some((notice) => notice.code === "orphan-node"),
    );

    for (const resultat of [vide, reduit, dense, cycles]) {
        assert.equal(resultat.matter.kind, "bobine-temoin");
        assert.equal(resultat.subject.resolved, true);
        assert.ok(
            resultat.notices.some(
                (notice) => notice.code === "bobine-temoin-active",
            ),
        );
    }
    assert.equal(
        JSON.stringify(archives),
        archivesAvant,
        "Le Travelling documentaire a modifié les Archives qu’il devait seulement lire",
    );

    return [projection, vide, reduit, dense, cycles];
}

function verifierPlanDEnsemble({
    archives,
    bobinesTemoins,
    derivePlanDEnsemble,
}) {
    const configuration = {
        plan: "plan-d-ensemble",
        subject: {
            family: "oeuvres",
            slug: "snow-white-and-the-seven-dwarfs",
        },
        angle: "relations",
        objective: "situate",
        frame: {
            label: "Le voisinage documentaire de Blanche-Neige",
            description:
                "Situer le premier long métrage dans ses relations publiées.",
            depth: 1,
            limit: 24,
        },
        matter: { kind: "archives" },
    };
    const archivesAvant = JSON.stringify(archives);
    const projeterArchives = (configurationCourante, options = {}) =>
        derivePlanDEnsemble(
            configurationCourante,
            { kind: "archives", archives },
            options,
        );
    const projection = projeterArchives(configuration);
    const groupesAttendus = [
        "characters",
        "people",
        "works",
        "epochs",
        "rewards",
        "sources",
    ];

    assert.equal(
        projection.subject.id,
        "oeuvre:snow-white-and-the-seven-dwarfs",
    );
    assert.equal(projection.focus.id, projection.subject.id);
    assert.equal(projection.subject.label, "Blanche-Neige et les Sept Nains");
    assert.equal(projection.subject.resolved, true);
    assert.equal(projection.matter.kind, "archives");
    assert.deepEqual(
        projection.groups.map((group) => group.id),
        groupesAttendus,
        "Le voisinage doit conserver l’ordre canonique de ses familles",
    );
    assert.ok(projection.groups.every((group) => group.items.length > 0));
    assert.ok(
        projection.groups
            .flatMap((group) => group.items)
            .every((item) => item.relations.length > 0),
        "Chaque voisin visible doit conserver au moins un raccord explicite",
    );
    assert.ok(
        projection.relations.some((relation) => relation.evidence.length > 0),
        "Les raccords documentés doivent conserver leurs sources",
    );
    verifierIdentifiantsUniques(
        projection.groups.flatMap((group) => group.items),
        "Plan d’ensemble · voisins",
    );
    verifierIdentifiantsUniques(
        projection.relations,
        "Plan d’ensemble · relations",
    );
    assert.deepEqual(
        projeterArchives(configuration),
        projection,
        "Le Plan d’ensemble doit rester déterministe",
    );

    const entrant = projeterArchives(configuration, { direction: "incoming" });
    const sortant = projeterArchives(configuration, { direction: "outgoing" });
    const idsVisibles = (resultat) =>
        resultat.groups
            .flatMap((group) => group.items)
            .map((item) => item.node.id)
            .sort();

    assert.notDeepEqual(
        idsVisibles(entrant),
        idsVisibles(sortant),
        "Les voisinages entrants et sortants doivent produire deux lectures distinctes",
    );
    assert.ok(
        entrant.groups.some((group) => group.id === "people") &&
            sortant.groups.some((group) => group.id === "characters"),
        "La direction doit distinguer l’équipe reçue de la distribution projetée",
    );

    const profondeurDeux = projeterArchives({
        ...configuration,
        frame: { ...configuration.frame, depth: 2, limit: 48 },
    });
    assert.ok(
        profondeurDeux.selection.total > projection.selection.total,
        "La profondeur 2 doit révéler un voisinage plus large que la profondeur 1",
    );

    const limite = projeterArchives({
        ...configuration,
        frame: { ...configuration.frame, limit: 4 },
    });
    assert.equal(limite.selection.returned, 4);
    assert.equal(limite.selection.truncated, true);
    assert.equal(
        limite.groups.filter((group) => group.items.length > 0).length,
        4,
        "La limite doit préserver autant de familles distinctes que le Cadre le permet",
    );
    assert.ok(limite.notices.some((notice) => notice.code === "limit-applied"));

    const sources = projeterArchives({
        ...configuration,
        angle: "sources",
    });
    assert.deepEqual(
        sources.groups.map((group) => group.id),
        ["sources"],
    );
    assert.ok(
        sources.groups[0].items.every((item) => item.node.kind === "source"),
    );

    const projeterBobine = (slug, frame = configuration.frame) =>
        derivePlanDEnsemble(
            {
                ...configuration,
                frame,
                matter: { kind: "bobine-temoin", fixture: slug },
            },
            {
                kind: "bobine-temoin",
                archives,
                bobine: bobinesTemoins[slug],
            },
        );
    const vide = projeterBobine("corpus-vide");
    const reduit = projeterBobine("corpus-reduit");
    const dense = projeterBobine("corpus-dense");
    const cycles = projeterBobine("cycles-et-orphelins", {
        ...configuration.frame,
        depth: 2,
    });
    const accessibilite = projeterBobine("accessibilite-sous-contrainte", {
        ...configuration.frame,
        depth: 4,
    });

    assert.equal(vide.runtimeState, "empty");
    assert.equal(vide.groups.length, 0);
    assert.equal(reduit.runtimeState, "sparse");
    assert.equal(reduit.focus.id, "oeuvre:oeuvre-reduite");
    assert.notEqual(
        reduit.focus.id,
        reduit.subject.id,
        "Le foyer synthétique d’une Bobine ne doit pas devenir un Sujet publié",
    );
    assert.equal(dense.runtimeState, "dense");
    assert.equal(dense.selection.returned, configuration.frame.limit);
    assert.equal(dense.selection.truncated, true);
    assert.equal(cycles.runtimeState, "incomplete");
    assert.equal(cycles.cycleDetected, true);
    assert.deepEqual(cycles.orphanNodeIds, ["personnage:noeud-orphelin"]);
    assert.ok(
        cycles.notices.some((notice) => notice.code === "cycle-detected") &&
            cycles.notices.some((notice) => notice.code === "orphan-node"),
    );
    assert.ok(accessibilite.selection.returned > 0);
    assert.ok(
        accessibilite.groups
            .flatMap((group) => group.items)
            .every((item) => item.node.label.length > 0),
    );

    for (const resultat of [vide, reduit, dense, cycles, accessibilite]) {
        assert.equal(resultat.matter.kind, "bobine-temoin");
        assert.ok(
            resultat.notices.some(
                (notice) => notice.code === "bobine-temoin-active",
            ),
        );
    }
    assert.equal(
        JSON.stringify(archives),
        archivesAvant,
        "Le Plan d’ensemble a modifié les Archives qu’il devait seulement lire",
    );

    return [
        projection,
        entrant,
        sortant,
        profondeurDeux,
        vide,
        reduit,
        dense,
        cycles,
        accessibilite,
    ];
}

function verifierMontageDuTemps({
    archives,
    bobinesTemoins,
    deriveMontageDuTemps,
}) {
    const configuration = {
        plan: "montage-du-temps",
        subject: {
            family: "oeuvres",
            slug: "snow-white-and-the-seven-dwarfs",
        },
        angle: "production",
        objective: "compare",
        frame: {
            label: "De la mise en chantier aux honneurs de l’Academy",
            description:
                "Comparer fabrication, diffusion et reconnaissance sur une règle temporelle commune.",
        },
        matter: { kind: "archives" },
    };
    const archivesAvant = JSON.stringify(archives);
    const projection = deriveMontageDuTemps(configuration, {
        kind: "archives",
        archives,
    });

    assert.equal(
        projection.subject.id,
        "oeuvre:snow-white-and-the-seven-dwarfs",
    );
    assert.equal(projection.focus.id, projection.subject.id);
    assert.equal(projection.matter.kind, "archives");
    assert.equal(projection.runtimeState, "ready");
    assert.equal(projection.events.length, 10);
    assert.deepEqual(
        projection.tracks.map((track) => [track.id, track.events.length]),
        [
            ["production", 1],
            ["distribution", 5],
            ["reception", 4],
            ["legacy", 0],
            ["transformation", 0],
        ],
    );
    assert.deepEqual(projection.bounds, {
        start: "1934-01-01",
        end: "1939-02-23",
    });
    assert.ok(
        projection.events.every(
            (event) =>
                event.subject.id === projection.subject.id &&
                event.provenance.length > 0,
        ),
        "Tous les repères doivent rester explicitement rattachés à Blanche-Neige",
    );
    assert.ok(
        projection.events.every((event) => event.evidence.length > 0),
        "Chaque repère des Archives doit conserver ses sources",
    );
    assert.ok(
        !projection.events.some((event) => event.start.valeur === "1812"),
        "La source littéraire de 1812 appartient au Travelling, pas au Montage",
    );

    const production = projection.events.find(
        (event) => event.track === "production",
    );
    assert.equal(production?.start.valeur, "1934");
    assert.equal(production?.end?.valeur, "1937");
    assert.equal(production?.documentaryState, "partial");
    assert.deepEqual(
        projection.tracks
            .find((track) => track.id === "distribution")
            ?.events.map((event) => event.start.valeur),
        ["1937-12-21", "1937-12-21", "1938-02-04", "1938-05-06", "1938-05-06"],
    );
    assert.deepEqual(
        projection.tracks
            .find((track) => track.id === "reception")
            ?.events.map((event) => event.start.valeur),
        ["1937-12", "1938", "1939-01-08", "1939-02-23"],
    );
    assert.deepEqual(
        deriveMontageDuTemps(configuration, {
            kind: "archives",
            archives,
        }),
        projection,
        "Le Montage du temps doit rester déterministe",
    );

    const projeterBobine = (slug) =>
        deriveMontageDuTemps(
            {
                ...configuration,
                matter: { kind: "bobine-temoin", fixture: slug },
            },
            {
                kind: "bobine-temoin",
                archives,
                bobine: bobinesTemoins[slug],
            },
        );
    const vide = projeterBobine("corpus-vide");
    const reduit = projeterBobine("corpus-reduit");
    const dates = projeterBobine("dates-partielles-et-contradictoires");

    assert.equal(vide.runtimeState, "empty");
    assert.equal(vide.events.length, 0);
    assert.equal(reduit.runtimeState, "sparse");
    assert.equal(reduit.events.length, 1);
    assert.equal(dates.runtimeState, "incomplete");
    assert.deepEqual(
        [...new Set(dates.events.map((event) => event.start.precision))].sort(),
        ["annee", "jour", "mois"],
    );
    assert.equal(dates.contradictions.length, 1);
    assert.equal(dates.contradictions[0].eventIds.length, 2);
    assert.equal(
        dates.events.filter(
            (event) => event.documentaryState === "contradictory",
        ).length,
        2,
    );
    assert.ok(
        dates.notices.some((notice) => notice.code === "date-conflict"),
        "La contradiction de dates doit rester explicitement signalée",
    );

    for (const resultat of [vide, reduit, dates]) {
        assert.equal(resultat.matter.kind, "bobine-temoin");
        assert.ok(
            resultat.notices.some(
                (notice) => notice.code === "bobine-temoin-active",
            ),
        );
    }
    assert.equal(
        JSON.stringify(archives),
        archivesAvant,
        "Le Montage du temps a modifié les Archives qu’il devait seulement lire",
    );

    return [projection, vide, reduit, dates];
}

function verifierGeneriqueVivant({
    archives,
    bobinesTemoins,
    deriveGeneriqueVivant,
}) {
    const configuration = {
        plan: "generique-vivant",
        subject: {
            family: "oeuvres",
            slug: "pinocchio",
        },
        angle: "departments",
        objective: "understand",
        frame: {
            label: "Le générique humain de Pinocchio",
            description:
                "Explorer les contributions sans leur attribuer de hiérarchie ni de valeur.",
        },
        matter: { kind: "archives" },
    };
    const archivesAvant = JSON.stringify(archives);
    const projection = deriveGeneriqueVivant(configuration, {
        kind: "archives",
        archives,
    });

    assert.equal(projection.subject.label, "Pinocchio");
    assert.equal(projection.matter.kind, "archives");
    assert.equal(projection.runtimeState, "incomplete");
    assert.deepEqual(projection.stats, {
        contributions: 31,
        domains: 8,
        multiRole: 0,
        resolved: 30,
        unresolved: 1,
    });
    assert.deepEqual(
        Object.fromEntries(
            projection.groups.map((group) => [
                group.id,
                group.contributionIds.length,
            ]),
        ),
        {
            "production-direction": 7,
            "histoire-adaptation": 1,
            "direction-artistique-conception": 3,
            "animation-personnages": 10,
            "decors-effets-photographie": 1,
            "musique-chansons": 3,
            "interpretation-vocale": 3,
            "reference-filmee": 3,
        },
    );
    assert.ok(
        projection.contributions.every(
            (item) =>
                item.roles.length > 0 &&
                item.provenance.length > 0 &&
                item.searchKey.length > 0,
        ),
        "Chaque contribution doit conserver rôle, provenance et clé de recherche",
    );
    assert.equal(
        projection.notices.filter(
            (notice) => notice.code === "unresolved-reference",
        ).length,
        1,
    );
    assert.deepEqual(
        deriveGeneriqueVivant(configuration, {
            kind: "archives",
            archives,
        }),
        projection,
        "Le Générique vivant doit rester déterministe",
    );

    const projeterBobine = (slug) =>
        deriveGeneriqueVivant(
            {
                ...configuration,
                matter: { kind: "bobine-temoin", fixture: slug },
            },
            {
                kind: "bobine-temoin",
                archives,
                bobine: bobinesTemoins[slug],
            },
        );
    const vide = projeterBobine("corpus-vide");
    const reduit = projeterBobine("corpus-reduit");
    const grand = projeterBobine("grand-generique");

    assert.equal(vide.runtimeState, "empty");
    assert.equal(vide.contributions.length, 0);
    assert.equal(reduit.runtimeState, "sparse");
    assert.equal(reduit.contributions.length, 1);
    assert.equal(grand.runtimeState, "dense");
    assert.equal(grand.contributions.length, 240);
    assert.equal(grand.groups.length, 9);
    assert.equal(
        new Set(grand.contributions.flatMap((item) => item.roles)).size,
        18,
    );
    assert.ok(
        grand.contributions.some(
            (item) =>
                item.contributor.label.length > 100 ||
                item.roles.some((role) => role.length > 100),
        ),
        "Le Générique vivant doit conserver les libellés extrêmes de la Bobine",
    );

    for (const resultat of [vide, reduit, grand]) {
        assert.equal(resultat.matter.kind, "bobine-temoin");
        assert.ok(
            resultat.notices.some(
                (notice) => notice.code === "bobine-temoin-active",
            ),
        );
    }
    assert.equal(
        JSON.stringify(archives),
        archivesAvant,
        "Le Générique vivant a modifié les Archives qu’il devait seulement lire",
    );

    return [projection, vide, reduit, grand];
}

function verifierTableLumineuse({
    archives,
    bobinesTemoins,
    deriveTableLumineuse,
}) {
    const configuration = {
        plan: "table-lumineuse",
        subject: {
            family: "oeuvres",
            slug: "snow-white-and-the-seven-dwarfs",
        },
        angle: "provenance",
        objective: "verify",
        frame: {
            label: "Les preuves documentaires de Blanche-Neige",
            description:
                "Vérifier les affirmations et leurs sources sans fabriquer de score.",
        },
        matter: { kind: "archives" },
    };
    const archivesAvant = JSON.stringify(archives);
    const projection = deriveTableLumineuse(configuration, {
        kind: "archives",
        archives,
    });

    assert.equal(
        projection.subject.id,
        "oeuvre:snow-white-and-the-seven-dwarfs",
    );
    assert.equal(projection.subject.resolved, true);
    assert.equal(projection.matter.kind, "archives");
    assert.equal(projection.runtimeState, "ready");
    assert.deepEqual(projection.stats, {
        items: 21,
        sources: 8,
        attachments: 43,
        documented: 21,
        partiallyResolved: 0,
        undocumented: 0,
        unclassifiedPositions: 21,
        unclassifiedSources: 21,
    });
    assert.deepEqual(
        ["work-version", "work-exploitation", "work-reception"].map((scope) => [
            scope,
            projection.items.filter((item) => item.scope === scope).length,
        ]),
        [
            ["work-version", 1],
            ["work-exploitation", 2],
            ["work-reception", 1],
        ],
    );
    assert.ok(
        projection.items.every(
            (item) =>
                item.position === "unclassified" &&
                item.sourceClassification === "unclassified",
        ),
        "La Table lumineuse ne doit pas inventer la position ou la nature des sources",
    );
    assert.ok(
        projection.items.every((item) => item.searchKey.length > 0),
        "Chaque affirmation doit pouvoir être retrouvée dans la Régie",
    );
    const economicValues = projection.items
        .filter((item) => item.scope === "economic-data")
        .flatMap((item) => item.facts)
        .map((fact) => fact.numericValue)
        .filter((value) => value !== undefined);
    assert.ok(economicValues.includes(1_400_000));
    assert.ok(economicValues.includes(1_488_423));
    assert.deepEqual(
        deriveTableLumineuse(configuration, {
            kind: "archives",
            archives,
        }),
        projection,
        "La Table lumineuse doit rester déterministe",
    );

    const projeterBobine = (slug) =>
        deriveTableLumineuse(
            {
                ...configuration,
                matter: { kind: "bobine-temoin", fixture: slug },
            },
            {
                kind: "bobine-temoin",
                archives,
                bobine: bobinesTemoins[slug],
            },
        );
    const vide = projeterBobine("corpus-vide");
    const reduit = projeterBobine("corpus-reduit");
    const contraste = projeterBobine("preuves-contrastees");
    const dates = projeterBobine("dates-partielles-et-contradictoires");
    const accessibilite = projeterBobine("accessibilite-sous-contrainte");

    assert.equal(vide.runtimeState, "empty");
    assert.equal(reduit.runtimeState, "sparse");
    assert.equal(reduit.items.length, 1);
    assert.equal(dates.runtimeState, "empty");
    assert.equal(accessibilite.runtimeState, "empty");
    assert.equal(contraste.items.length, 5);
    assert.deepEqual(
        contraste.items.reduce((positions, item) => {
            positions[item.position] = (positions[item.position] ?? 0) + 1;
            return positions;
        }, {}),
        {
            supports: 2,
            nuances: 1,
            contradicts: 1,
            inconclusive: 1,
        },
    );
    assert.equal(contraste.stats.undocumented, 1);
    assert.ok(
        contraste.items.some(
            (item) => item.sourceClassification === "primary",
        ) &&
            contraste.items.some(
                (item) => item.sourceClassification === "secondary",
            ) &&
            contraste.items.some(
                (item) => item.sourceClassification === "database",
            ) &&
            contraste.items.some(
                (item) =>
                    item.sourceClassification === "editorial-interpretation",
            ),
        "La Bobine contrastée doit éprouver plusieurs natures de sources",
    );

    for (const resultat of [vide, reduit, contraste, dates, accessibilite]) {
        assert.equal(resultat.matter.kind, "bobine-temoin");
        assert.ok(
            resultat.notices.some(
                (notice) => notice.code === "bobine-temoin-active",
            ),
        );
    }
    assert.equal(
        JSON.stringify(archives),
        archivesAvant,
        "La Table lumineuse a modifié les Archives qu’elle devait seulement lire",
    );

    return [projection, vide, reduit, contraste, dates, accessibilite];
}

function verifier() {
    const {
        codexPlanArchives,
        derivePlanCredits,
        derivePlanEvents,
        derivePlanEvidence,
        derivePlanLinks,
        derivePlanNodes,
        derivePlanDEnsemble,
        deriveGeneriqueVivant,
        deriveMontageDuTemps,
        deriveTableLumineuse,
        deriveTravellingDocumentaire,
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
        codexPlanArchives.sources.length +
        (codexPlanArchives.oeuvresSources?.fiches.length ?? 0);
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
                (node) =>
                    node.kind === "recompense" ||
                    node.kind === "source" ||
                    node.kind === "oeuvre-source",
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
    const projections = verifierTravellingDocumentaire({
        archives: codexPlanArchives,
        bobinesTemoins,
        deriveTravellingDocumentaire,
    });
    const projectionsEnsemble = verifierPlanDEnsemble({
        archives: codexPlanArchives,
        bobinesTemoins,
        derivePlanDEnsemble,
    });
    const projectionsMontage = verifierMontageDuTemps({
        archives: codexPlanArchives,
        bobinesTemoins,
        deriveMontageDuTemps,
    });
    const projectionsGenerique = verifierGeneriqueVivant({
        archives: codexPlanArchives,
        bobinesTemoins,
        deriveGeneriqueVivant,
    });
    const projectionsTableLumineuse = verifierTableLumineuse({
        archives: codexPlanArchives,
        bobinesTemoins,
        deriveTableLumineuse,
    });
    const circulationOeuvre = verifierCirculationOeuvre({
        archives: codexPlanArchives,
        derivePlanEvents,
        derivePlanEvidence,
        deriveMontageDuTemps,
        deriveTableLumineuse,
    });

    console.log(
        `Matière des Plans vérifiée : ${nodes.items.length} nœuds, ${links.items.length} liens, ${events.items.length} événements, ${credits.items.length} crédits, ${evidence.items.length} preuves, ${bobines.length} Bobines témoins, ${projections.length} projections du Travelling documentaire, ${projectionsEnsemble.length} projections du Plan d’ensemble, ${projectionsMontage.length} projections du Montage du temps, ${projectionsGenerique.length} projections du Générique vivant, ${projectionsTableLumineuse.length} projections de la Table lumineuse et 1 bobine privée de circulation (${circulationOeuvre.events.length} événements, ${circulationOeuvre.evidence.length} preuves).`,
    );
}

verifier();
