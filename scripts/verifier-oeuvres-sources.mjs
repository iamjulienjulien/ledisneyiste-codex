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

const natures = new Set([
    "roman",
    "conte",
    "nouvelle",
    "piece-theatre",
    "film",
    "autre",
]);
const supports = new Set([
    "livre",
    "publication-feuilleton",
    "scene",
    "film",
    "autre",
]);
const roles = new Set(["auteur", "co-auteur", "adaptateur", "illustrateur"]);
const naturesIdentites = new Set([
    "original",
    "localise",
    "alias",
    "ancien",
    "international",
    "sortie-territoriale",
]);
const langues = new Set(["fr", "en", "it"]);
const territoires = new Set(["FR", "US", "IT"]);

function chargerModulesTypeScript() {
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
            ...require(path.join(racine, "src/lib/oeuvres-sources/index.ts")),
            ...require(path.join(racine, "src/lib/plans/index.ts")),
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

function chaineNonVide(value) {
    return typeof value === "string" && value.trim().length > 0;
}

function verifierDate(date, contexte) {
    const motifs = {
        annee: /^\d{4}$/,
        mois: /^\d{4}-\d{2}$/,
        jour: /^\d{4}-\d{2}-\d{2}$/,
    };

    assert.ok(motifs[date?.precision], `${contexte} : précision invalide`);
    assert.match(
        date.valeur,
        motifs[date.precision],
        `${contexte} : valeur invalide`,
    );
}

function verifierSources(sourceIds, sourcesConnues, contexte) {
    assert.ok(
        Array.isArray(sourceIds) && sourceIds.length > 0,
        `${contexte} : au moins une source est obligatoire`,
    );
    assert.equal(
        new Set(sourceIds).size,
        sourceIds.length,
        `${contexte} : source dupliquée`,
    );
    for (const sourceId of sourceIds) {
        assert.ok(
            sourcesConnues.has(sourceId),
            `${contexte} : source inconnue « ${sourceId} »`,
        );
    }
}

function verifierIdentite(identite, sourcesConnues, contexte) {
    assert.ok(chaineNonVide(identite?.libelle), `${contexte} : titre absent`);
    assert.ok(
        naturesIdentites.has(identite?.nature),
        `${contexte} : nature inconnue`,
    );
    assert.ok(
        identite.langue === undefined || langues.has(identite.langue),
        `${contexte} : langue inconnue`,
    );
    assert.ok(
        identite.territoire === undefined ||
            territoires.has(identite.territoire),
        `${contexte} : territoire inconnu`,
    );
    verifierSources(identite.sources, sourcesConnues, contexte);
}

function verifierFiches(fiches, sourcesConnues) {
    assert.ok(fiches.length > 0, "Le registre témoin est vide");
    assert.equal(
        new Set(fiches.map((fiche) => fiche.id)).size,
        fiches.length,
        "Identifiant d’Œuvre source dupliqué",
    );
    assert.equal(
        new Set(fiches.map((fiche) => fiche.slug)).size,
        fiches.length,
        "Slug d’Œuvre source dupliqué",
    );

    for (const fiche of fiches) {
        const contexte = `Œuvre source ${fiche.id}`;
        assert.ok(chaineNonVide(fiche.id), `${contexte} : identifiant absent`);
        assert.ok(chaineNonVide(fiche.slug), `${contexte} : slug absent`);
        assert.ok(natures.has(fiche.nature), `${contexte} : nature inconnue`);
        assert.ok(supports.has(fiche.support), `${contexte} : support inconnu`);
        verifierDate(fiche.date, `${contexte} · date`);
        verifierSources(fiche.sources, sourcesConnues, contexte);
        verifierIdentite(fiche.identite, sourcesConnues, contexte);
        assert.equal(
            fiche.identite.nature,
            "original",
            `${contexte} : l’identité principale doit être originale`,
        );

        for (const [index, identite] of (
            fiche.identitesAlternatives ?? []
        ).entries()) {
            verifierIdentite(
                identite,
                sourcesConnues,
                `${contexte} · identité ${index + 1}`,
            );
        }

        assert.ok(
            Array.isArray(fiche.auteurs) && fiche.auteurs.length > 0,
            `${contexte} : auteur absent`,
        );
        for (const auteur of fiche.auteurs) {
            assert.ok(chaineNonVide(auteur.nom), `${contexte} : nom absent`);
            assert.ok(roles.has(auteur.role), `${contexte} : rôle inconnu`);
            verifierSources(
                auteur.sources,
                sourcesConnues,
                `${contexte} · ${auteur.nom}`,
            );
        }
    }
}

const fixture = JSON.parse(
    readFileSync(
        path.join(racine, "scripts/fixtures/oeuvres-sources.json"),
        "utf8",
    ),
);
const sourcesConnues = new Set(fixture.sources.map((source) => source.id));
verifierFiches(fixture.fiches, sourcesConnues);

const {
    codexPlanArchives,
    creerRegistreOeuvresSources,
    derivePlanDEnsemble,
    derivePlanLinks,
    derivePlanNodes,
    deriveTravellingDocumentaire,
    resoudreOeuvreSource,
} = chargerModulesTypeScript();
const registre = creerRegistreOeuvresSources(fixture.fiches);
const collodi = fixture.fiches.find(
    (fiche) => fiche.slug === "le-avventure-di-pinocchio",
);
const grimm = fixture.fiches.find((fiche) => fiche.slug === "schneewittchen");
assert.ok(collodi, "La bobine Collodi est absente");
assert.ok(grimm, "La bobine Schneewittchen est absente");

const resolution = resoudreOeuvreSource(
    { id: collodi.id, slug: collodi.slug },
    registre,
);
assert.equal(resolution.resolved, true);
assert.equal(resolution.entree?.id, collodi.id);
assert.equal(resolution.entree?.slug, collodi.slug);
assert.equal(
    resolution.href,
    undefined,
    "Une Œuvre source ne crée pas de route",
);
assert.equal(
    resoudreOeuvreSource({ id: grimm.id, slug: grimm.slug }, registre).resolved,
    true,
    "La fiche privée de Schneewittchen n’est pas résoluble",
);

const resolutionInvalide = resoudreOeuvreSource(
    { id: collodi.id, slug: "slug-non-declare" },
    registre,
);
assert.equal(resolutionInvalide.resolved, false);
assert.equal(
    resolutionInvalide.href,
    undefined,
    "Une référence non résolue ne crée pas de lien actif",
);

const archivesFixture = {
    ...codexPlanArchives,
    catalogues: {
        ...codexPlanArchives.catalogues,
        oeuvres: [
            ...codexPlanArchives.catalogues.oeuvres,
            {
                slug: fixture.oeuvre.slug,
                nom: "Pinocchio · bobine privée",
                sousTitre: "Relation d’adaptation témoin",
                type: "oeuvre",
                metadata: {
                    collection: "classiques-animation",
                    type: "long-metrage-animation",
                    son: "sonore",
                    couleur: "couleur",
                },
            },
        ],
    },
    fiches: {
        ...codexPlanArchives.fiches,
        oeuvres: [...codexPlanArchives.fiches.oeuvres, fixture.oeuvre],
    },
    sources: [...codexPlanArchives.sources, ...fixture.sources],
    oeuvresSources: registre,
};
const noeuds = derivePlanNodes(archivesFixture).items;
const noeudCollodi = noeuds.find(
    (noeud) => noeud.id === `oeuvre-source:${collodi.id}`,
);
assert.ok(noeudCollodi, "L’Œuvre source ne rejoint pas la matière des Plans");
assert.equal(noeudCollodi.resolved, true);
assert.equal(noeudCollodi.publishedSubject, false);

const liens = derivePlanLinks(archivesFixture);
const adaptation = liens.items.find(
    (lien) =>
        lien.kind === "work-relation" &&
        lien.from.slug === fixture.oeuvre.slug &&
        lien.to.id === `oeuvre-source:${collodi.id}`,
);
assert.ok(adaptation, "La relation d’adaptation privée est absente");
assert.equal(adaptation.label, "adaptation");
assert.equal(adaptation.to.resolved, true);
assert.deepEqual(adaptation.provenance[0].sourceIds, [
    "fixture-source-pinocchio-relation",
]);

const configuration = {
    plan: "travelling-documentaire",
    subject: { family: "oeuvres", slug: fixture.oeuvre.slug },
    angle: "adaptation",
    objective: "follow",
    frame: {
        label: "Adaptation privée",
        description: "Suivre une adaptation sans publier son Œuvre source.",
        depth: 1,
        limit: 4,
    },
    matter: { kind: "archives" },
};
const travelling = deriveTravellingDocumentaire(configuration, {
    kind: "archives",
    archives: archivesFixture,
});
const etapeCollodi = travelling.stages.find(
    (etape) => etape.node.id === `oeuvre-source:${collodi.id}`,
);
assert.ok(etapeCollodi, "Le Travelling a perdu l’Œuvre source résolue");
assert.equal(etapeCollodi.node.resolved, true);
assert.equal(etapeCollodi.href, undefined, "La projection a inventé une route");
assert.equal(etapeCollodi.date?.valeur, "1883");
assert.equal(etapeCollodi.relationLabel, "est adapté par");

const ensemble = derivePlanDEnsemble(
    { ...configuration, plan: "plan-d-ensemble", angle: "relations" },
    {
        kind: "archives",
        archives: archivesFixture,
    },
);
const voisinCollodi = ensemble.groups
    .find((groupe) => groupe.id === "works")
    ?.items.find((item) => item.node.id === `oeuvre-source:${collodi.id}`);
assert.ok(voisinCollodi, "Le Plan d’ensemble a perdu l’Œuvre source");
assert.equal(voisinCollodi.resolved, true);
assert.equal(
    voisinCollodi.href,
    undefined,
    "Le voisin privé est devenu un lien",
);

const liensBlancheNeige = derivePlanLinks(codexPlanArchives).items.filter(
    (lien) =>
        lien.kind === "work-relation" &&
        lien.from.slug === "snow-white-and-the-seven-dwarfs",
);
const schneewittchen = liensBlancheNeige.find(
    (lien) => lien.to.label === "Schneewittchen",
);
assert.ok(schneewittchen, "La relation historique de Blanche-Neige a disparu");
assert.equal(schneewittchen.to.kind, "oeuvre-exterieure");
assert.equal(schneewittchen.to.resolved, false);
assert.equal(
    schneewittchen.to.id,
    "oeuvre-exterieure:schneewittchen-1812",
    "L’identité de projection historique de Blanche-Neige a changé",
);

console.log(
    `Œuvres sources vérifiées : ${registre.fiches.length} fiches privées, 1 relation résolue et aucune route publique.`,
);
