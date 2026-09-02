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

const rolesAuteurs = new Set([
    "composition",
    "paroles",
    "traduction",
    "adaptation-lyrique",
]);
const naturesVersions = new Set([
    "originale",
    "traduction",
    "adaptation-lyrique",
]);
const naturesOccurrences = new Set(["origine", "reemploi"]);
const naturesInterpretations = new Set(["originale", "reprise"]);
const rolesInterpretes = new Set([
    "chant",
    "voix",
    "choeur",
    "direction-musicale",
]);
const naturesReceptions = new Set([
    "publique",
    "critique",
    "institutionnelle",
    "patrimoniale",
]);
const domainesMusicaux = new Set([
    "partition",
    "musique-additionnelle",
    "orchestration",
    "arrangement",
    "direction-musicale",
]);
const langues = new Set(["fr", "en", "it"]);
const territoires = new Set(["FR", "US", "IT"]);
const naturesIdentites = new Set([
    "original",
    "localise",
    "alias",
    "ancien",
    "international",
    "sortie-territoriale",
]);
const champsInterdits = new Set([
    "audio",
    "audioUrl",
    "lyrics",
    "lyricsUrl",
    "paroles",
    "texteIntegral",
]);

function lireJson(chemin) {
    return JSON.parse(readFileSync(path.join(racine, chemin), "utf8"));
}

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
            ...require(path.join(racine, "src/lib/chansons/index.ts")),
            ...require(path.join(racine, "src/lib/musiques/index.ts")),
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

function chaineNonVide(valeur) {
    return typeof valeur === "string" && valeur.trim().length > 0;
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

function verifierReference(reference, contexte) {
    assert.ok(chaineNonVide(reference?.nom), `${contexte} : nom absent`);

    if (reference.type === "oeuvre-privee") {
        assert.ok(chaineNonVide(reference.id), `${contexte} : id privé absent`);
        assert.ok(
            chaineNonVide(reference.slug),
            `${contexte} : slug privé absent`,
        );
    }

    if (reference.type && reference.type !== "oeuvre-privee") {
        assert.ok(
            chaineNonVide(reference.slug),
            `${contexte} : slug publié absent`,
        );
    }
}

function verifierIdentite(identite, sourcesConnues, contexte) {
    assert.ok(chaineNonVide(identite?.libelle), `${contexte} : libellé absent`);
    assert.ok(
        naturesIdentites.has(identite?.nature),
        `${contexte} : nature d’identité invalide`,
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

function verifierAttributionAuteur(attribution, sourcesConnues, contexte) {
    verifierReference(attribution.personne, contexte);
    assert.ok(
        Array.isArray(attribution.roles) && attribution.roles.length > 0,
        `${contexte} : rôle absent`,
    );
    for (const role of attribution.roles) {
        assert.ok(rolesAuteurs.has(role), `${contexte} : rôle inconnu ${role}`);
    }
    verifierSources(attribution.sources, sourcesConnues, contexte);
}

function verifierAbsenceMatiereProtegee(valeur, contexte, chemin = []) {
    if (Array.isArray(valeur)) {
        valeur.forEach((item, index) =>
            verifierAbsenceMatiereProtegee(item, contexte, [
                ...chemin,
                String(index),
            ]),
        );
        return;
    }

    if (!valeur || typeof valeur !== "object") {
        return;
    }

    for (const [cle, contenu] of Object.entries(valeur)) {
        assert.ok(
            !champsInterdits.has(cle),
            `${contexte} : champ protégé interdit ${[...chemin, cle].join(".")}`,
        );
        verifierAbsenceMatiereProtegee(contenu, contexte, [...chemin, cle]);
    }
}

function verifierFicheChanson(fiche, sourcesConnues) {
    const contexte = `Chanson ${fiche.id}`;
    assert.ok(chaineNonVide(fiche.id), `${contexte} : id absent`);
    assert.ok(chaineNonVide(fiche.slug), `${contexte} : slug absent`);
    verifierIdentite(fiche.identite, sourcesConnues, `${contexte} · identité`);
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
            `${contexte} · identité alternative ${index + 1}`,
        );
    }
    verifierReference(fiche.oeuvreOrigine, `${contexte} · œuvre d’origine`);
    verifierSources(fiche.sources, sourcesConnues, contexte);
    verifierAbsenceMatiereProtegee(fiche, contexte);

    assert.ok(fiche.auteurs.length > 0, `${contexte} : auteur absent`);
    fiche.auteurs.forEach((attribution, index) =>
        verifierAttributionAuteur(
            attribution,
            sourcesConnues,
            `${contexte} · auteur ${index + 1}`,
        ),
    );

    const versions = new Set();
    assert.ok(fiche.versions.length > 0, `${contexte} : version absente`);
    for (const version of fiche.versions) {
        assert.ok(chaineNonVide(version.id), `${contexte} : id version absent`);
        assert.ok(!versions.has(version.id), `${contexte} : version dupliquée`);
        versions.add(version.id);
        assert.ok(
            naturesVersions.has(version.nature),
            `${contexte} : nature de version inconnue`,
        );
        verifierIdentite(
            version.identite,
            sourcesConnues,
            `${contexte} · version ${version.id}`,
        );
        verifierSources(
            version.sources,
            sourcesConnues,
            `${contexte} · version ${version.id}`,
        );
        if (version.date) {
            verifierDate(version.date, `${contexte} · version ${version.id}`);
        }
        if (version.nature === "traduction") {
            assert.ok(
                version.adaptateurs.some((attribution) =>
                    attribution.roles.includes("traduction"),
                ),
                `${contexte} : traduction sans traducteur`,
            );
        }
        if (version.nature === "adaptation-lyrique") {
            assert.ok(
                version.adaptateurs.some((attribution) =>
                    attribution.roles.includes("adaptation-lyrique"),
                ),
                `${contexte} : adaptation sans adaptateur lyrique`,
            );
        }
        for (const [index, adaptateur] of (
            version.adaptateurs ?? []
        ).entries()) {
            verifierAttributionAuteur(
                adaptateur,
                sourcesConnues,
                `${contexte} · version ${version.id} · adaptateur ${index + 1}`,
            );
        }
    }

    const occurrences = new Set();
    assert.ok(fiche.occurrences.length > 0, `${contexte} : occurrence absente`);
    for (const occurrence of fiche.occurrences) {
        assert.ok(
            naturesOccurrences.has(occurrence.nature),
            `${contexte} : nature d’occurrence inconnue`,
        );
        assert.ok(
            versions.has(occurrence.versionId),
            `${contexte} : version d’occurrence inconnue`,
        );
        assert.ok(
            !occurrences.has(occurrence.id),
            `${contexte} : occurrence dupliquée`,
        );
        occurrences.add(occurrence.id);
        verifierReference(
            occurrence.oeuvre,
            `${contexte} · occurrence ${occurrence.id}`,
        );
        verifierSources(
            occurrence.sources,
            sourcesConnues,
            `${contexte} · occurrence ${occurrence.id}`,
        );
    }

    const interpretations = new Set();
    assert.ok(
        fiche.interpretations.length > 0,
        `${contexte} : interprétation absente`,
    );
    for (const interpretation of fiche.interpretations) {
        assert.ok(
            naturesInterpretations.has(interpretation.nature),
            `${contexte} : nature d’interprétation inconnue`,
        );
        assert.ok(
            versions.has(interpretation.versionId),
            `${contexte} : version d’interprétation inconnue`,
        );
        assert.ok(
            interpretation.occurrenceId === undefined ||
                occurrences.has(interpretation.occurrenceId),
            `${contexte} : occurrence d’interprétation inconnue`,
        );
        interpretations.add(interpretation.id);
        assert.ok(
            interpretation.interpretes.length > 0,
            `${contexte} : interprète absent`,
        );
        for (const interprete of interpretation.interpretes) {
            verifierReference(interprete.personne, `${contexte} · interprète`);
            assert.ok(
                interprete.roles.every((role) => rolesInterpretes.has(role)),
                `${contexte} : rôle d’interprète inconnu`,
            );
            verifierSources(
                interprete.sources,
                sourcesConnues,
                `${contexte} · interprète`,
            );
        }
        verifierSources(
            interpretation.sources,
            sourcesConnues,
            `${contexte} · interprétation ${interpretation.id}`,
        );
    }

    const enregistrements = new Set();
    for (const enregistrement of fiche.enregistrements ?? []) {
        assert.ok(
            !occurrences.has(enregistrement.id),
            `${contexte} : une occurrence ne peut pas être un enregistrement`,
        );
        assert.ok(
            interpretations.has(enregistrement.interpretationId),
            `${contexte} : interprétation d’enregistrement inconnue`,
        );
        assert.ok(
            !enregistrements.has(enregistrement.id),
            `${contexte} : enregistrement dupliqué`,
        );
        enregistrements.add(enregistrement.id);
        verifierSources(
            enregistrement.sources,
            sourcesConnues,
            `${contexte} · enregistrement ${enregistrement.id}`,
        );
    }

    for (const reception of fiche.receptions ?? []) {
        assert.ok(
            naturesReceptions.has(reception.nature),
            `${contexte} : nature de réception inconnue`,
        );
        assert.ok(
            chaineNonVide(reception.resume),
            `${contexte} : résumé de réception absent`,
        );
        assert.ok(
            Boolean(reception.date) !== Boolean(reception.periode),
            `${contexte} : temporalité de réception ambiguë`,
        );
        verifierSources(
            reception.sources,
            sourcesConnues,
            `${contexte} · réception ${reception.id}`,
        );
    }

    for (const recompense of fiche.recompenses ?? []) {
        assert.ok(
            chaineNonVide(recompense.id),
            `${contexte} : récompense sans id`,
        );
        verifierSources(
            recompense.sources,
            sourcesConnues,
            `${contexte} · récompense ${recompense.id}`,
        );
    }
}

function verifierFicheMusique(fiche, sourcesConnues) {
    const contexte = `Musique ${fiche.id}`;
    assert.ok(chaineNonVide(fiche.id), `${contexte} : id absent`);
    assert.ok(chaineNonVide(fiche.slug), `${contexte} : slug absent`);
    verifierIdentite(fiche.identite, sourcesConnues, `${contexte} · identité`);
    verifierReference(fiche.oeuvre, `${contexte} · œuvre`);
    assert.ok(
        fiche.attributions.length > 0,
        `${contexte} : attribution absente`,
    );
    for (const attribution of fiche.attributions) {
        verifierReference(attribution.personne, `${contexte} · attribution`);
        assert.ok(
            attribution.domaines.length > 0 &&
                attribution.domaines.every((domaine) =>
                    domainesMusicaux.has(domaine),
                ),
            `${contexte} : domaine musical invalide`,
        );
        verifierSources(
            attribution.sources,
            sourcesConnues,
            `${contexte} · attribution`,
        );
    }
    verifierSources(fiche.sources, sourcesConnues, contexte);
}

const fixture = lireJson("scripts/fixtures/chansons.json");
const sourcesPhaseDeux = lireJson(
    "docs/studio/production/acte-vi/phase-2/sources.json",
).sources;
const sourcesPubliques = lireJson("src/data/sources/sources.json");
const sourcesConnues = new Set([
    ...sourcesPhaseDeux.map((source) => source.id),
    ...sourcesPubliques.map((source) => source.id),
]);

assert.equal(new Set(fixture.sourceIds).size, fixture.sourceIds.length);
fixture.sourceIds.forEach((sourceId) =>
    assert.ok(
        sourcesConnues.has(sourceId),
        `Source de fixture inconnue ${sourceId}`,
    ),
);
const sourcesFixture = new Set(fixture.sourceIds);
assert.equal(new Set(fixture.fiches.map((fiche) => fiche.id)).size, 2);
assert.equal(new Set(fixture.fiches.map((fiche) => fiche.slug)).size, 2);
fixture.fiches.forEach((fiche) => verifierFicheChanson(fiche, sourcesFixture));
fixture.musiques.forEach((fiche) =>
    verifierFicheMusique(fiche, sourcesFixture),
);

const whenYouWish = fixture.fiches.find(
    (fiche) => fiche.slug === "when-you-wish-upon-a-star",
);
const retrospective = fixture.fiches.find(
    (fiche) => fiche.slug === "whos-afraid-of-the-big-bad-wolf",
);
assert.ok(whenYouWish, "La chanson pilote est absente");
assert.ok(retrospective, "La chanson rétrospective est absente");
assert.ok(
    whenYouWish.recompenses.length > 0,
    "La chanson pilote perd son Oscar",
);
assert.ok(
    whenYouWish.receptions.length > 0,
    "La chanson pilote perd sa réception",
);
assert.equal(
    retrospective.oeuvreOrigine.slug,
    "three-little-pigs",
    "La bobine rétrospective dépend artificiellement de Pinocchio",
);
assert.ok(
    retrospective.versions.some(
        (version) =>
            version.nature === "adaptation-lyrique" &&
            version.identite.langue === "fr" &&
            version.identite.territoire === "FR" &&
            version.adaptateurs.length > 0 &&
            version.sources.length > 0,
    ),
    "L’adaptation française ne conserve pas langue, territoire, adaptateurs et sources",
);

const {
    creerRegistreChansons,
    creerRegistreMusiques,
    projeterCreditsMusicauxExistants,
    projeterDossierMediaPublic,
    resoudreChanson,
} = chargerModulesTypeScript();

const registreChansons = creerRegistreChansons(fixture.fiches);
const resolution = resoudreChanson(
    { id: whenYouWish.id, slug: whenYouWish.slug },
    registreChansons,
);
assert.equal(resolution.resolved, true);
assert.equal(resolution.href, undefined, "Une chanson privée crée une route");
assert.equal(
    resoudreChanson(
        { id: whenYouWish.id, slug: "slug-invalide" },
        registreChansons,
    ).resolved,
    false,
);

const registreMusiques = creerRegistreMusiques(fixture.musiques);
assert.equal(registreMusiques.entrees.length, 1);
assert.equal(
    registreChansons.entrees.some((entree) =>
        registreMusiques.entrees.some((musique) => musique.id === entree.id),
    ),
    false,
    "Chansons et Musiques ont été artificiellement fusionnées",
);

const snowWhite = lireJson(
    "src/data/oeuvres/snow-white-and-the-seven-dwarfs.json",
);
const creditsMusicaux = projeterCreditsMusicauxExistants(
    snowWhite.contributions,
    snowWhite.sources,
);
assert.equal(creditsMusicaux.length, 4);
assert.ok(
    creditsMusicaux.every(
        (credit) =>
            credit.domaine === "musique-chansons" &&
            credit.roles.length > 0 &&
            credit.sources.length > 0,
    ),
    "Le repli public des crédits musicaux est incomplet",
);

const projectionsMedia = new Map(
    fixture.dossiersMedia.map((dossier) => [
        dossier.id,
        projeterDossierMediaPublic(dossier),
    ]),
);
assert.deepEqual(projectionsMedia.get("media-when-you-wish-metadata"), {
    statut: "metadata-only",
    matiere: null,
});
assert.equal(
    projectionsMedia.get("media-when-you-wish-lien-academy").statut,
    "external-link",
);
assert.deepEqual(projectionsMedia.get("media-when-you-wish-audio-bloque"), {
    statut: "bloquee",
    matiere: null,
});
assert.deepEqual(
    projectionsMedia.get("media-when-you-wish-licence-incomplete"),
    { statut: "bloquee", matiere: null },
    "Un dossier incomplet traverse la frontière publique",
);

const projectionSerialisee = JSON.stringify([...projectionsMedia.values()]);
for (const clePrivee of [
    "titulaireOuFournisseur",
    "evidenceIds",
    "verifiePar",
    "noteInterne",
    "controleViePrivee",
    "assetId",
]) {
    assert.ok(
        !projectionSerialisee.includes(clePrivee),
        `La projection expose la clé privée ${clePrivee}`,
    );
}
assert.ok(
    !projectionSerialisee.includes("media.invalid"),
    "La matière d’un dossier incomplet atteint le navigateur",
);

const cataloguePublic = lireJson("src/data/catalogues/chansons.json");
assert.equal(cataloguePublic.length, 4);
assert.deepEqual(
    cataloguePublic.map((chanson) => chanson.slug),
    [
        "whistle-while-you-work",
        "heigh-ho",
        "someday-my-prince-will-come",
        "whos-afraid-of-the-big-bad-wolf",
    ],
);
assert.ok(existsSync(path.join(racine, "src/app/chansons/page.tsx")));
assert.ok(existsSync(path.join(racine, "src/app/chansons/[slug]/page.tsx")));
const contratFamilles = readFileSync(
    path.join(racine, "src/types/codex.ts"),
    "utf8",
);
assert.ok(
    contratFamilles.includes('"chansons"'),
    "CodexFamily n’expose pas encore la cinquième famille",
);

const packageJson = lireJson("package.json");
assert.equal(
    packageJson.scripts["check:chansons"],
    "node scripts/verifier-chansons.mjs",
);
for (const script of ["check", "check:ci"]) {
    assert.ok(
        packageJson.scripts[script]
            .split("&&")
            .map((etape) => etape.trim())
            .includes("pnpm check:chansons"),
        `${script} ne contient pas check:chansons`,
    );
}

console.log(
    `Chansons vérifiées : ${cataloguePublic.length} fiches publiques, ${fixture.fiches.length} fiches témoins privées, ${fixture.musiques.length} contrat Musique et ${fixture.dossiersMedia.length} dossiers média privés.`,
);
