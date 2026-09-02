import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import Module, { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const resolutionOriginale = Module._resolveFilename;
const extensionTypeScriptOriginale = Module._extensions[".ts"];
const dossierPhase = "docs/studio/production/acte-vi/phase-8";

const cataloguesAttendus = {
    personnages: 33,
    contributeurs: 41,
    oeuvres: 24,
    epoques: 2,
    chansons: 9,
};

const domainesPinocchioAttendus = {
    "production-direction": 7,
    "histoire-adaptation": 1,
    "direction-artistique-conception": 3,
    "animation-personnages": 10,
    "decors-effets-photographie": 1,
    "musique-chansons": 3,
    "interpretation-vocale": 3,
    "reference-filmee": 3,
};

const rolesPinocchioAttendus = [
    "animation-personnages|Eric Larson|supervision de l’animation de Cléo et Figaro",
    "animation-personnages|Frank Thomas|supervision de l’animation de Pinocchio",
    "animation-personnages|Fred Moore|supervision de l’animation de Crapule",
    "animation-personnages|John Lounsbery|animation de Grand Coquin et Gédéon",
    "animation-personnages|Milt Kahl|supervision de l’animation de Pinocchio",
    "animation-personnages|Norman Ferguson|animation de Grand Coquin et Gédéon",
    "animation-personnages|Ollie Johnston|animation de Pinocchio",
    "animation-personnages|Vladimir “Bill” Tytla|supervision de l’animation de Stromboli et Monstro",
    "animation-personnages|Ward Kimball|supervision de l’animation de Jiminy Cricket",
    "animation-personnages|Wolfgang Reitherman|supervision de l’animation de Jiminy Cricket et Monstro",
    "decors-effets-photographie|Joshua Meador|animation des effets spéciaux",
    "direction-artistique-conception|Gustaf Tenggren|développement visuel",
    "direction-artistique-conception|Joe Grant|conception de personnages",
    "direction-artistique-conception|Kenneth Anderson|direction artistique",
    "histoire-adaptation|Carlo Collodi|œuvre littéraire originale",
    "interpretation-vocale|Cliff Edwards|voix originale de Jiminy Cricket",
    "interpretation-vocale|Dickie Jones|voix originale de Pinocchio",
    "interpretation-vocale|Evelyn Venable|voix originale de la Fée Bleue",
    "musique-chansons|Leigh Harline|composition de la musique et des chansons",
    "musique-chansons|Ned Washington|paroles des chansons",
    "musique-chansons|Paul J. Smith|composition de la musique",
    "production-direction|Ben Sharpsteen|réalisation",
    "production-direction|Hamilton Luske|réalisation",
    "production-direction|Jack Kinney|réalisation de séquences",
    "production-direction|Norman Ferguson|réalisation de séquences",
    "production-direction|T. Hee|réalisation de la séquence de Grand Coquin et Gédéon",
    "production-direction|Walt Disney|production",
    "production-direction|Wilfred Jackson|réalisation de séquences",
    "reference-filmee|Dickie Jones|référence filmée de Pinocchio",
    "reference-filmee|Marge Champion|référence filmée de la Fée Bleue",
    "reference-filmee|T. Hee|référence filmée de Stromboli",
].sort((a, b) => a.localeCompare(b, "fr"));

function chemin(...segments) {
    return path.join(racine, ...segments);
}

function lireJson(fichier) {
    return JSON.parse(readFileSync(chemin(fichier), "utf8"));
}

function chargerPlansTypeScript() {
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
                resolveJsonModule: true,
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

function configuration(slug, matter = { kind: "archives" }) {
    return {
        plan: "generique-vivant",
        subject: { family: "oeuvres", slug },
        angle: "departments",
        objective: "understand",
        frame: {
            label: `Le générique humain de ${slug}`,
            description:
                "Mesure privée du Train 8A, sans nouvelle mise en scène.",
        },
        matter,
    };
}

function signaturesRoles(contributions) {
    return contributions
        .flatMap((contribution) =>
            contribution.roles.map(
                (role) =>
                    `${contribution.domain}|${contribution.contributor.label}|${role}`,
            ),
        )
        .sort((a, b) => a.localeCompare(b, "fr"));
}

function verifierDocuments() {
    for (const document of [
        "etat-reference.md",
        "contrat-generique-vivant.md",
    ]) {
        assert.ok(
            existsSync(chemin(dossierPhase, document)),
            `Phase 8 : document absent ${document}`,
        );
    }

    const contrat = readFileSync(
        chemin(dossierPhase, "contrat-generique-vivant.md"),
        "utf8",
    );
    for (const terme of ["Archives", "Plan", "Pixie", "Focale"]) {
        assert.match(contrat, new RegExp(`\\b${terme}\\b`));
    }
}

function verifierRoutes() {
    let total = 0;

    for (const [catalogue, attendu] of Object.entries(cataloguesAttendus)) {
        const entrees = lireJson(`src/data/catalogues/${catalogue}.json`);
        assert.equal(
            entrees.length,
            attendu,
            `Train 8A : dérive du catalogue ${catalogue}`,
        );
        total += entrees.length;
    }

    assert.equal(total, 109, "Train 8A : 109 routes canoniques attendues");
}

function verifierPinocchio({ codexPlanArchives, deriveGeneriqueVivant }) {
    const sourceAvant = JSON.stringify(codexPlanArchives);
    const modele = deriveGeneriqueVivant(configuration("pinocchio"), {
        kind: "archives",
        archives: codexPlanArchives,
    });

    assert.equal(modele.subject.slug, "pinocchio");
    assert.equal(modele.runtimeState, "incomplete");
    assert.deepEqual(modele.stats, {
        contributions: 31,
        domains: 8,
        multiRole: 0,
        resolved: 30,
        unresolved: 1,
    });
    assert.deepEqual(
        Object.fromEntries(
            modele.groups.map((groupe) => [
                groupe.id,
                groupe.contributionIds.length,
            ]),
        ),
        domainesPinocchioAttendus,
    );
    assert.deepEqual(
        signaturesRoles(modele.contributions),
        rolesPinocchioAttendus,
    );
    assert.ok(
        modele.contributions.every(
            (contribution) =>
                contribution.roles.length > 0 &&
                contribution.provenance.length > 0 &&
                contribution.provenance.every(
                    (provenance) =>
                        provenance.kind === "editorial-relation" &&
                        Array.isArray(provenance.sourceIds) &&
                        provenance.sourceIds.length > 0 &&
                        typeof provenance.explanation === "string" &&
                        provenance.explanation.length > 0,
                ),
        ),
        "Train 8A : chaque contribution doit conserver rôle et provenance",
    );
    assert.deepEqual(
        modele.contributions
            .filter(({ contributor }) => !contributor.resolved)
            .map(({ contributor, roles }) => ({
                label: contributor.label,
                roles,
            })),
        [
            {
                label: "Evelyn Venable",
                roles: ["voix originale de la Fée Bleue"],
            },
        ],
    );
    assert.equal(
        JSON.stringify(codexPlanArchives),
        sourceAvant,
        "Train 8A : la dérivation a modifié les Archives",
    );

    return modele;
}

function verifierBobines({
    codexPlanArchives,
    deriveGeneriqueVivant,
    bobinesTemoins,
}) {
    const projeterArchives = (slug) =>
        deriveGeneriqueVivant(configuration(slug), {
            kind: "archives",
            archives: codexPlanArchives,
        });
    const projeterBobine = (fixture) => {
        const matter = { kind: "bobine-temoin", fixture };
        return deriveGeneriqueVivant(configuration("pinocchio", matter), {
            kind: "bobine-temoin",
            archives: codexPlanArchives,
            bobine: bobinesTemoins[fixture],
        });
    };

    const vide = projeterBobine("corpus-vide");
    const incomplet = projeterArchives("snow-white-and-the-seven-dwarfs");
    const grand = projeterBobine("grand-generique");

    assert.equal(vide.runtimeState, "empty");
    assert.equal(vide.contributions.length, 0);
    assert.equal(vide.groups.length, 0);

    assert.equal(incomplet.runtimeState, "incomplete");
    assert.deepEqual(incomplet.stats, {
        contributions: 33,
        domains: 6,
        multiRole: 10,
        resolved: 25,
        unresolved: 8,
    });

    assert.equal(grand.runtimeState, "dense");
    assert.equal(grand.contributions.length, 240);
    assert.equal(grand.groups.length, 9);
    assert.equal(
        new Set(grand.contributions.flatMap(({ roles }) => roles)).size,
        18,
    );
}

function verifierSurfaces() {
    const page = readFileSync(
        chemin("src/app/atelier/plans/[slug]/page.tsx"),
        "utf8",
    );
    const brancheGenerique = page.match(
        /if \(slug === "generique-vivant"\)([\s\S]*?)if \(slug === "table-lumineuse"\)/,
    )?.[1];
    assert.ok(brancheGenerique, "Train 8A : branche Générique vivant absente");
    assert.match(brancheGenerique, /version="v0\.2\.0"/);
    assert.match(
        brancheGenerique,
        /Pinocchio révèle les gestes humains derrière l’écran/,
    );
    assert.match(brancheGenerique, /createGeneriqueProjections/);

    const contrechamp = readFileSync(
        chemin(
            "src/components/codex/CodexFiche/CodexFicheOeuvreDetails/CodexFicheOeuvreDetails.tsx",
        ),
        "utf8",
    );
    assert.match(contrechamp, /groupCredits\(fiche\.contributions\)/);
    assert.match(contrechamp, /creditDomainOrder/);

    const fichiersInterdits = [
        "src/components/ui/PixieGeneriqueVivant",
        "src/components/ui/PixieDustGeneriqueVivant",
    ];
    for (const fichier of fichiersInterdits) {
        assert.equal(
            existsSync(chemin(fichier)),
            false,
            `Train 8A : le Plan ne doit pas devenir ${path.basename(fichier)}`,
        );
    }
}

function verifierTrain8C(pinocchio) {
    const page = readFileSync(
        chemin("src/app/atelier/plans/[slug]/page.tsx"),
        "utf8",
    );
    const prototype = readFileSync(
        chemin(
            "src/components/atelier/AtelierGeneriqueVivantPrototype/AtelierGeneriqueVivantPrototype.tsx",
        ),
        "utf8",
    );
    const projectionsGenerique = page.match(
        /function createGeneriqueProjections\(\)([\s\S]*?)function createTableLumineuseProjections/,
    )?.[1];

    assert.ok(
        projectionsGenerique,
        "Train 8C : fabrique des projections du Générique vivant absente",
    );
    assert.match(projectionsGenerique, /slug: "pinocchio"/);
    assert.match(projectionsGenerique, /Le générique humain de Pinocchio/);
    assert.match(prototype, /Prototype privé · v0\.2\.0/);
    assert.match(prototype, /FocaleTable/);
    assert.match(prototype, /Mention non publiée/);
    assert.equal(pinocchio.contributions.length, 31);
    assert.equal(pinocchio.groups.length, 8);
    assert.deepEqual(
        pinocchio.contributions
            .filter(({ contributor }) => !contributor.resolved)
            .map(({ contributor }) => contributor.label),
        ["Evelyn Venable"],
    );
}

function verifierTrain8D(pinocchio) {
    const prototype = readFileSync(
        chemin(
            "src/components/atelier/AtelierGeneriqueVivantPrototype/AtelierGeneriqueVivantPrototype.tsx",
        ),
        "utf8",
    );
    const derivation = readFileSync(
        chemin("src/lib/plans/generique-vivant.ts"),
        "utf8",
    );

    assert.equal(pinocchio.views.responsibilities.groups.length, 0);
    assert.equal(pinocchio.views.departments.groups.length, 8);
    assert.ok(pinocchio.views.roles.groups.length > 0);
    assert.ok(pinocchio.views.recurrences.groups.length > 0);
    assert.ok(
        pinocchio.views.collaborations.groups.every(
            (group) => group.contributionIds.length > 1,
        ),
    );
    assert.match(derivation, /function createAngleViews/);
    assert.match(derivation, /sans collaboration directe déduite/);
    assert.match(prototype, /model\.views\[angle\]/);
    assert.match(prototype, /angleView\.emptyLabel/);
    assert.doesNotMatch(prototype, /function groupByRoles/);
}

function verifierTrain8E() {
    const page = readFileSync(
        chemin("src/app/atelier/plans/[slug]/page.tsx"),
        "utf8",
    );
    const dossier = readFileSync(
        chemin(
            "src/components/atelier/AtelierPlanDossier/AtelierPlanDossier.tsx",
        ),
        "utf8",
    );
    const prototype = readFileSync(
        chemin(
            "src/components/atelier/AtelierGeneriqueVivantPrototype/AtelierGeneriqueVivantPrototype.tsx",
        ),
        "utf8",
    );
    const styles = readFileSync(
        chemin(
            "src/components/atelier/AtelierGeneriqueVivantPrototype/AtelierGeneriqueVivantPrototype.module.css",
        ),
        "utf8",
    );

    for (const composant of [
        "FocaleAnnotation",
        "FocaleLegend",
        "FocaleMark",
        "FocaleTable",
        "FocaleViewport",
    ]) {
        assert.match(
            prototype,
            new RegExp(`<${composant}\\b`),
            `Train 8E : ${composant} doit porter sa responsabilité de lecture`,
        );
    }

    assert.match(prototype, /const objectiveByAngle/);
    assert.match(prototype, /Banc d’essai privé/);
    assert.match(prototype, /Régie de lecture/);
    assert.match(prototype, /aria-live="polite"/);
    assert.match(prototype, /<details className=\{styles\.countershot\} open>/);
    assert.match(prototype, /sort === "alphabetical"/);
    assert.match(prototype, /a\.label\.localeCompare\(b\.label, "fr"\)/);
    assert.match(prototype, /data-inspector-mode=\{inspectorMode\}/);
    assert.match(prototype, /Fermer le gros plan/);
    assert.match(prototype, /<PixieStickyRegion/);
    assert.doesNotMatch(prototype, /setObjective/);
    assert.doesNotMatch(prototype, /setDensity/);
    assert.doesNotMatch(prototype, /setEvidence/);
    assert.doesNotMatch(prototype, /setCountershot/);
    assert.match(styles, /@media \(min-width: 70rem\)/);
    assert.match(styles, /@media \(max-width: 30rem\)/);
    assert.match(styles, /position: sticky/);
    assert.equal(
        page.match(/technical=\{generiqueVivantTechnical\}/g)?.length,
        1,
        "Train 8E : le générique technique enrichi doit rester propre à cette esquisse",
    );
    assert.match(page, /title: "API de l’esquisse"/);
    assert.match(page, /AtelierGeneriqueVivantInspectorMode/);
    assert.match(dossier, /<AtelierPropertiesTable/);
    assert.match(dossier, /<AtelierTypesTable/);
    assert.match(dossier, /Types spécifiques/);
}

function verifierBranchement() {
    const packageJson = lireJson("package.json");

    assert.equal(
        packageJson.scripts["check:focale"],
        "node scripts/verifier-focale.mjs",
    );
    assert.equal(
        packageJson.scripts["check:phase-8"],
        "node scripts/verifier-phase-8.mjs",
    );
    for (const script of ["check", "check:ci"]) {
        assert.match(
            packageJson.scripts[script],
            /pnpm check:phase-7 && pnpm check:phase-8/,
            `${script} : la Phase 8 doit suivre la Phase 7`,
        );
    }
}

function verifierTrain8B() {
    for (const cheminRelatif of [
        "docs/studio/production/acte-vi/phase-8/focale.md",
        "src/components/focale/index.ts",
        "src/fixtures/focale/equipe-temoin.ts",
        "scripts/verifier-focale.mjs",
    ]) {
        assert.ok(
            existsSync(chemin(cheminRelatif)),
            `Train 8B : livrable absent ${cheminRelatif}`,
        );
    }

    assert.equal(
        existsSync(chemin("src/components/focale/FocaleTooltip")),
        false,
        "Train 8B : le tooltip doit rester différé",
    );
}

verifierDocuments();
verifierRoutes();
const plans = chargerPlansTypeScript();
const pinocchio = verifierPinocchio(plans);
verifierBobines(plans);
verifierSurfaces();
verifierBranchement();
verifierTrain8B();
verifierTrain8C(pinocchio);
verifierTrain8D(pinocchio);
verifierTrain8E();

console.log(
    `Phase 8 vérifiée jusqu’au Train 8E : Pinocchio projette ${pinocchio.stats.contributions} contributions dans une scène responsive, lisible et accompagnée de son contrechamp textuel.`,
);
