import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const cheminManifeste =
    "docs/studio/production/acte-vi/phase-2/retroapplication.json";
const cheminMigration = "docs/studio/production/acte-vi/phase-5/migration.json";

const famillesPubliques = {
    personnages: {
        catalogue: "personnages",
        dossier: "personnages",
        route: "personnages",
        type: "personnage",
    },
    createurs: {
        catalogue: "contributeurs",
        dossier: "contributeurs",
        route: "contributeurs",
        type: "contributeur",
    },
    oeuvres: {
        catalogue: "oeuvres",
        dossier: "oeuvres",
        route: "oeuvres",
        type: "oeuvre",
    },
    epoques: {
        catalogue: "epoques",
        dossier: "epoques",
        route: "epoques",
        type: "epoque",
    },
    chansons: {
        catalogue: "chansons",
        dossier: "chansons",
        route: "chansons",
        type: "chanson",
    },
};

const statuts = new Set([
    "a-faire",
    "en-cours",
    "migree",
    "inchangee",
    "reportee",
]);

const trains = new Set(["5B", "5C", "5D", "5E", "5F"]);

const documentsPhase5 = [
    "etat-reference.md",
    "migration.json",
    "train-5a.md",
    "train-5b.md",
    "train-5c.md",
    "train-5d.md",
    "train-5e.md",
    "train-5f.md",
];

const identitesOeuvresTrain5D = {
    "alices-wonderland": {
        principale: "Alice’s Wonderland",
        originale: null,
        sourceFr: "chronique-disney-alices-wonderland",
    },
    "trolley-troubles": {
        principale: "Trolley Troubles",
        originale: null,
        sourceFr: "chronique-disney-trolley-troubles",
    },
    "steamboat-willie": {
        principale: "Willie, le Bateau à Vapeur",
        originale: "Steamboat Willie",
        sourceFr: "chronique-disney-willie-bateau-vapeur",
    },
    "the-gallopin-gaucho": {
        principale: "Mickey Gaucho",
        originale: "The Gallopin’ Gaucho",
        sourceFr: "chronique-disney-mickey-gaucho",
    },
    "plane-crazy": {
        principale: "L’Avion Fou",
        originale: "Plane Crazy",
        sourceFr: "chronique-disney-avion-fou",
    },
    "the-skeleton-dance": {
        principale: "La Danse Macabre",
        originale: "The Skeleton Dance",
        sourceFr: "chronique-disney-danse-macabre",
    },
    "the-chain-gang": {
        principale: "Symphonie Enchaînée",
        originale: "The Chain Gang",
        sourceFr: "chronique-disney-symphonie-enchainee",
    },
    "mickeys-revue": {
        principale: "Mickey au Théâtre",
        originale: "Mickey’s Revue",
        sourceFr: "chronique-disney-mickey-au-theatre",
    },
    "flowers-and-trees": {
        principale: "Des Arbres et des Fleurs",
        originale: "Flowers and Trees",
        sourceFr: "chronique-disney-arbres-fleurs",
    },
    "three-little-pigs": {
        principale: "Les Trois Petits Cochons",
        originale: "Three Little Pigs",
        sourceFr: "chronique-disney-trois-petits-cochons",
    },
    "the-wise-little-hen": {
        principale: "Une Petite Poule Avisée",
        originale: "The Wise Little Hen",
        sourceFr: "chronique-disney-petite-poule-avisee",
    },
    "orphans-benefit": {
        principale: "Le Gala des Orphelins",
        originale: "Orphans’ Benefit",
        sourceFr: "chronique-disney-gala-orphelins",
    },
    "the-goddess-of-spring": {
        principale: "La Déesse du Printemps",
        originale: "The Goddess of Spring",
        sourceFr: "chronique-disney-deesse-printemps",
    },
    "the-tortoise-and-the-hare": {
        principale: "Le Lièvre et la Tortue",
        originale: "The Tortoise and the Hare",
        sourceFr: "chronique-disney-lievre-tortue",
    },
    "the-band-concert": {
        principale: "La Fanfare",
        originale: "The Band Concert",
        sourceFr: "chronique-disney-fanfare",
    },
    "three-orphan-kittens": {
        principale: "Trois Petits Orphelins",
        originale: "Three Orphan Kittens",
        sourceFr: "chronique-disney-trois-petits-orphelins",
    },
    "the-country-cousin": {
        principale: "Cousin de Campagne",
        originale: "The Country Cousin",
        sourceFr: "chronique-disney-cousin-campagne",
    },
    "clock-cleaners": {
        principale: "Nettoyeurs de Pendules",
        originale: "Clock Cleaners",
        sourceFr: "chronique-disney-nettoyeurs-pendules",
    },
    "the-old-mill": {
        principale: "Le Vieux Moulin",
        originale: "The Old Mill",
        sourceFr: "chronique-disney-vieux-moulin",
    },
    "ferdinand-the-bull": {
        principale: "Ferdinand, le Taureau",
        originale: "Ferdinand the Bull",
        sourceFr: "chronique-disney-ferdinand-taureau",
    },
    "mr-duck-steps-out": {
        principale: "L’Entreprenant Mr Duck",
        originale: "Mr. Duck Steps Out",
        sourceFr: "chronique-disney-entreprenant-mr-duck",
    },
    "bone-trouble": {
        principale: "Pluto a des Envies",
        originale: "Bone Trouble",
        sourceFr: "chronique-disney-pluto-envies",
    },
};

const identitesPersonnagesTrain5E = {
    "oswald-le-lapin-chanceux": {
        principale: "Oswald le lapin chanceux",
        originale: "Oswald the Lucky Rabbit",
        sourcePreuve: "chronique-disney-oswald-lapin-chanceux",
        statut: "migree",
    },
    "pat-hibulaire": {
        principale: "Pat Hibulaire",
        originale: "Peg-Leg Pete",
        alias: "Pete",
        sourcePreuve: "chronique-disney-pat-hibulaire",
        statut: "migree",
    },
    "mickey-mouse": {
        principale: "Mickey Mouse",
        originale: null,
        sourcePreuve: "d23-mickey-mouse",
        statut: "inchangee",
    },
    "minnie-mouse": {
        principale: "Minnie Mouse",
        originale: null,
        sourcePreuve: "d23-minnie-mouse",
        statut: "inchangee",
    },
    "clarabelle-cow": {
        principale: "Clarabelle Cow",
        originale: null,
        sourcePreuve: "d23-clarabelle-cow",
        statut: "inchangee",
    },
    "horace-horsecollar": {
        principale: "Horace Horsecollar",
        originale: null,
        sourcePreuve: "d23-horace-horsecollar",
        statut: "inchangee",
    },
    "donald-duck": {
        principale: "Donald Duck",
        originale: null,
        sourcePreuve: "d23-donald-duck",
        statut: "inchangee",
    },
    dingo: {
        principale: "Dingo",
        originale: "Goofy",
        sourcePreuve: "chronique-disney-dingo",
        statut: "migree",
    },
    "daisy-duck": {
        principale: "Daisy Duck",
        originale: null,
        sourcePreuve: "d23-daisy-duck",
        statut: "inchangee",
    },
    pluto: {
        principale: "Pluto",
        originale: null,
        sourcePreuve: "d23-pluto",
        statut: "inchangee",
    },
    "blanche-neige": {
        principale: "Blanche-Neige",
        originale: "Snow White",
        sourcePreuve: "d23-snow-white-character",
        statut: "inchangee",
    },
    "la-reine": {
        principale: "La Reine",
        originale: "The Queen",
        alias: "The Evil Queen",
        sourcePreuve: "afi-snow-white",
        statut: "inchangee",
    },
    "le-prince": {
        principale: "Le Prince",
        originale: "The Prince",
        sourcePreuve: "afi-snow-white",
        statut: "inchangee",
    },
    "le-chasseur": {
        principale: "Le Chasseur",
        originale: "The Huntsman",
        alias: "Humbert",
        sourcePreuve: "afi-snow-white",
        statut: "inchangee",
    },
    "le-miroir-magique": {
        principale: "Le Miroir magique",
        originale: "Magic Mirror",
        sourcePreuve: "afi-snow-white",
        statut: "inchangee",
    },
    prof: {
        principale: "Prof",
        originale: "Doc",
        sourcePreuve: "d23-seven-dwarfs-personality",
        statut: "inchangee",
    },
    grincheux: {
        principale: "Grincheux",
        originale: "Grumpy",
        sourcePreuve: "d23-seven-dwarfs-personality",
        statut: "inchangee",
    },
    joyeux: {
        principale: "Joyeux",
        originale: "Happy",
        sourcePreuve: "d23-seven-dwarfs-personality",
        statut: "inchangee",
    },
    dormeur: {
        principale: "Dormeur",
        originale: "Sleepy",
        sourcePreuve: "d23-seven-dwarfs-personality",
        statut: "inchangee",
    },
    timide: {
        principale: "Timide",
        originale: "Bashful",
        sourcePreuve: "d23-seven-dwarfs-personality",
        statut: "inchangee",
    },
    atchoum: {
        principale: "Atchoum",
        originale: "Sneezy",
        sourcePreuve: "d23-seven-dwarfs-personality",
        statut: "inchangee",
    },
    simplet: {
        principale: "Simplet",
        originale: "Dopey",
        sourcePreuve: "d23-seven-dwarfs-personality",
        statut: "inchangee",
    },
};

const verdictsTrain5F = {
    "walt-disney": "reportee",
    "david-hand": "inchangee",
    "hamilton-luske": "reportee",
    "wilfred-jackson": "reportee",
    "norman-ferguson": "reportee",
    "ward-kimball": "reportee",
    "fred-moore": "reportee",
    "milt-kahl": "reportee",
    "frank-thomas": "reportee",
    "eric-larson": "reportee",
    "ollie-johnston": "reportee",
    "john-lounsbery": "reportee",
    "wolfgang-reitherman": "reportee",
    "vladimir-bill-tytla": "reportee",
    "joe-grant": "reportee",
    "gustaf-tenggren": "reportee",
    "leigh-harline": "reportee",
    "paul-j-smith": "reportee",
    "marge-champion": "reportee",
};

function chemin(...segments) {
    return path.join(racine, ...segments);
}

function lireTexte(fichier) {
    return readFileSync(chemin(fichier), "utf8");
}

function lireJson(fichier) {
    return JSON.parse(lireTexte(fichier));
}

function sha256(contenu) {
    return createHash("sha256").update(contenu).digest("hex");
}

function cleEntree(entree) {
    return `${entree.family}/${entree.slug}`;
}

function chaineNonVide(valeur) {
    return typeof valeur === "string" && valeur.trim().length > 0;
}

function etapesCommande(packageJson, nom) {
    return (packageJson.scripts?.[nom] ?? "")
        .split("&&")
        .map((etape) => etape.trim())
        .filter(Boolean);
}

function verifierManifeste(migration) {
    const contenu = lireTexte(cheminManifeste);
    const manifeste = JSON.parse(contenu);

    assert.equal(manifeste.status, "approved");
    assert.equal(manifeste.implementationPhase, 5);
    assert.equal(manifeste.entries.length, 69);
    assert.equal(manifeste.expectedTotals.entries, 69);
    assert.equal(manifeste.expectedTotals.legacyDetailRoutesToPreserve, 45);

    assert.equal(migration.sourceManifest.path, cheminManifeste);
    assert.equal(
        migration.sourceManifest.sha256,
        sha256(contenu),
        "Le manifeste de Phase 2 a changé sans nouvel arbitrage",
    );
    assert.equal(
        migration.sourceManifest.baselineCommit,
        manifeste.baselineCommit,
    );

    return manifeste;
}

function verifierInventairePublic(migration) {
    const routes = new Set();
    let nombreFamilles = 0;
    let nombreEntrees = 0;

    for (const [famille, contrat] of Object.entries(famillesPubliques)) {
        const cheminCatalogue = chemin(
            "src/data/catalogues",
            `${contrat.catalogue}.json`,
        );

        if (!existsSync(cheminCatalogue)) {
            assert.equal(
                famille,
                "chansons",
                `Le catalogue public ${famille} a disparu`,
            );
            continue;
        }

        const catalogue = JSON.parse(readFileSync(cheminCatalogue, "utf8"));
        const cheminFiches = chemin("src/data", contrat.dossier);
        assert.ok(
            existsSync(cheminFiches),
            `${famille} : dossier de fiches absent`,
        );

        const fiches = readdirSync(cheminFiches).filter((fichier) =>
            fichier.endsWith(".json"),
        );
        assert.equal(
            catalogue.length,
            fiches.length,
            `${famille} : catalogue et fiches ne possèdent pas la même taille`,
        );

        for (const entree of catalogue) {
            assert.equal(
                entree.type,
                contrat.type,
                `${famille}/${entree.slug} : type de catalogue inattendu`,
            );
            assert.ok(
                fiches.includes(`${entree.slug}.json`),
                `${famille}/${entree.slug} : fiche correspondante absente`,
            );

            const route = `/${contrat.route}/${entree.slug}`;
            assert.ok(
                !routes.has(route),
                `Route canonique dupliquée : ${route}`,
            );
            routes.add(route);
        }

        nombreFamilles += 1;
        nombreEntrees += catalogue.length;
    }

    assert.deepEqual(
        {
            publicFamilies: nombreFamilles,
            publicEntries: nombreEntrees,
            publicRoutes: routes.size,
        },
        migration.projection,
        "La projection publique réelle ne correspond pas au journal Phase 5",
    );

    assert.ok(
        nombreEntrees >= migration.baseline.publicEntries,
        "La Phase 5 a perdu une Archive publique historique",
    );
    assert.ok(
        nombreEntrees <= migration.target.publicEntries,
        "La Phase 5 publie plus d’Archives que son Cadre validé",
    );

    return { nombreFamilles, nombreEntrees, nombreRoutes: routes.size };
}

function verifierRoutesProtegees(manifeste) {
    const famillesProtegees = ["oeuvres", "personnages"];
    const routesProtegees = manifeste.entries.filter((entree) =>
        famillesProtegees.includes(entree.family),
    );

    assert.equal(routesProtegees.length, 45);

    for (const entree of routesProtegees) {
        const contrat = famillesPubliques[entree.family];
        const catalogue = lireJson(
            `src/data/catalogues/${contrat.catalogue}.json`,
        );
        assert.ok(
            catalogue.some((candidate) => candidate.slug === entree.slug),
            `Route historique perdue : /${contrat.route}/${entree.slug}`,
        );
    }
}

function verifierJournal(migration, manifeste) {
    assert.equal(migration.schemaVersion, "1.0.0");
    assert.ok(["in-progress", "complete"].includes(migration.status));
    assert.equal(migration.owner, "R2-D2");
    assert.equal(migration.target.trackedEntries, 69);
    assert.equal(migration.target.retrospectiveSongs, 4);
    assert.equal(migration.entries.length, 69);

    const manifestParCle = new Map(
        manifeste.entries.map((entree) => [cleEntree(entree), entree]),
    );
    const cles = new Set();
    const progression = {
        "a-faire": 0,
        "en-cours": 0,
        migree: 0,
        inchangee: 0,
        reportee: 0,
        verdicts: 0,
    };

    for (const entree of migration.entries) {
        const cle = cleEntree(entree);
        const source = manifestParCle.get(cle);

        assert.ok(source, `${cle} : entrée absente du manifeste de Phase 2`);
        assert.ok(!cles.has(cle), `${cle} : entrée dupliquée dans le journal`);
        cles.add(cle);

        assert.equal(entree.profile, source.profile, `${cle} : profil altéré`);
        assert.equal(entree.depth, source.depth, `${cle} : profondeur altérée`);
        assert.deepEqual(
            entree.sourceState,
            {
                archive: source.currentState,
                sources: source.sourcesState,
                exception: source.exception,
            },
            `${cle} : état de départ altéré`,
        );
        assert.ok(trains.has(entree.train), `${cle} : Train inconnu`);
        assert.ok(statuts.has(entree.status), `${cle} : statut inconnu`);
        assert.ok(Array.isArray(entree.files), `${cle} : fichiers invalides`);
        assert.ok(Array.isArray(entree.sources), `${cle} : sources invalides`);
        assert.ok(Array.isArray(entree.checks), `${cle} : contrôles invalides`);
        assert.ok(
            Array.isArray(entree.reservations),
            `${cle} : réserves invalides`,
        );

        progression[entree.status] += 1;

        if (entree.status === "a-faire" || entree.status === "en-cours") {
            assert.equal(entree.verdict, null, `${cle} : verdict prématuré`);
        } else {
            progression.verdicts += 1;
            assert.ok(
                chaineNonVide(entree.verdict),
                `${cle} : verdict final absent`,
            );
            assert.ok(
                entree.checks.length > 0,
                `${cle} : verdict final sans contrôle`,
            );
        }

        if (entree.status === "migree") {
            assert.ok(
                entree.files.length > 0,
                `${cle} : migration sans fichier`,
            );
            assert.ok(
                entree.sources.length > 0,
                `${cle} : migration R2/R3 sans source`,
            );
        }

        if (entree.status === "reportee") {
            assert.ok(
                entree.reservations.length > 0,
                `${cle} : report sans condition de reprise`,
            );
        }
    }

    assert.equal(cles.size, manifestParCle.size);
    assert.deepEqual(
        progression,
        migration.progress,
        "Les compteurs du journal ne correspondent pas aux 69 entrées",
    );

    if (migration.status === "complete") {
        assert.equal(progression.verdicts, 69);
        assert.equal(progression["a-faire"], 0);
        assert.equal(progression["en-cours"], 0);
        assert.deepEqual(migration.projection, {
            publicFamilies: 5,
            publicEntries: 83,
            publicRoutes: 83,
        });
    }

    return progression;
}

function verifierBranchement() {
    const packageJson = lireJson("package.json");

    assert.equal(
        packageJson.scripts?.["check:phase-5"],
        "node scripts/verifier-phase-5.mjs",
        "check:phase-5 n’appelle pas le vérificateur canonique",
    );

    for (const nom of ["check", "check:ci"]) {
        const etapes = etapesCommande(packageJson, nom);
        assert.ok(
            etapes.includes("pnpm check:phase-5"),
            `${nom} ne contient pas la répétition agrégée de la Phase 5`,
        );
        assert.ok(
            etapes.indexOf("pnpm check:phase-5") >
                etapes.indexOf("pnpm check:phase-4"),
            `${nom} projette la Phase 5 avant son contrat de Phase 4`,
        );
    }
}

function verifierEchantillonR3(migration) {
    const cle = "oeuvres/snow-white-and-the-seven-dwarfs";
    const entree = migration.entries.find(
        (candidate) => cleEntree(candidate) === cle,
    );
    const fiche = lireJson(
        "src/data/oeuvres/snow-white-and-the-seven-dwarfs.json",
    );
    const registreSources = lireTexte(
        "src/registry/oeuvres-sources/oeuvres-sources.ts",
    );

    assert.equal(entree?.train, "5C");
    assert.equal(entree?.depth, "R3");
    assert.equal(entree?.status, "migree");
    assert.ok(
        entree.verdict.includes("raccord R3"),
        `${cle} : verdict R3 incomplet`,
    );
    assert.ok(
        entree.reservations.some((reserve) =>
            reserve.includes("déclarations économiques"),
        ),
        `${cle} : maintien économique historique non justifié`,
    );

    assert.equal(fiche.sortie.evenements.length, 3);
    assert.ok(
        fiche.sortie.evenements.every(
            (evenement) =>
                chaineNonVide(evenement.id) &&
                evenement.porteeTerritoriale &&
                evenement.territoire === undefined,
        ),
        `${cle} : événement de sortie non migré`,
    );
    assert.equal(fiche.versions?.length, 1);
    assert.equal(fiche.exploitations?.length, 2);
    assert.equal(fiche.receptions?.length, 1);
    assert.ok(
        fiche.donneesEconomiques.every(
            (donnee) => donnee.schemaVersion === undefined,
        ),
        `${cle} : donnée économique incomplète promue artificiellement`,
    );

    const source = fiche.relationsOeuvres.find(
        (relation) =>
            relation.oeuvre.id === "oeuvre-source-grimm-schneewittchen",
    );
    assert.equal(source?.oeuvre.type, "oeuvre-source");
    assert.match(registreSources, /id: "oeuvre-source-grimm-schneewittchen"/);
}

function verifierTrain5D(migration) {
    const catalogue = lireJson("src/data/catalogues/oeuvres.json");
    const catalogueParSlug = new Map(
        catalogue.map((entree) => [entree.slug, entree]),
    );
    const sources = new Set(
        lireJson("src/data/sources/sources.json").map((source) => source.id),
    );
    const entreesTrain5D = migration.entries.filter(
        (entree) => entree.train === "5D",
    );

    assert.equal(entreesTrain5D.length, 22);

    for (const [slug, identite] of Object.entries(identitesOeuvresTrain5D)) {
        const cle = `oeuvres/${slug}`;
        const entreeJournal = entreesTrain5D.find(
            (entree) => cleEntree(entree) === cle,
        );
        const fiche = lireJson(`src/data/oeuvres/${slug}.json`);
        const entreeCatalogue = catalogueParSlug.get(slug);

        assert.equal(
            entreeJournal?.status,
            "migree",
            `${cle} : verdict R2 ouvert`,
        );
        assert.match(
            entreeJournal.verdict,
            /raccord R2/i,
            `${cle} : verdict R2 incomplet`,
        );
        assert.equal(
            entreeCatalogue?.nom,
            identite.principale,
            `${cle} : titre français principal inattendu`,
        );
        assert.ok(
            sources.has(identite.sourceFr) &&
                fiche.sources?.includes(identite.sourceFr),
            `${cle} : provenance française absente`,
        );

        const titresOriginaux = (fiche.titresAlternatifs ?? []).filter(
            (titre) => titre.nature === "original",
        );

        if (identite.originale === null) {
            assert.equal(
                titresOriginaux.length,
                0,
                `${cle} : forme identique dupliquée comme titre original`,
            );
        } else {
            assert.equal(
                titresOriginaux.length,
                1,
                `${cle} : titre original absent`,
            );
            assert.equal(titresOriginaux[0].titre, identite.originale);
            assert.equal(titresOriginaux[0].langue, "en");
            assert.equal(titresOriginaux[0].territoire, "US");
            assert.ok(titresOriginaux[0].sources.length > 0);
        }
    }

    const blancheNeige = catalogueParSlug.get(
        "snow-white-and-the-seven-dwarfs",
    );
    const ficheBlancheNeige = lireJson(
        "src/data/oeuvres/snow-white-and-the-seven-dwarfs.json",
    );
    const titreOriginalBlancheNeige = ficheBlancheNeige.titresAlternatifs?.find(
        (titre) => titre.nature === "original",
    );

    assert.equal(blancheNeige?.nom, "Blanche-Neige et les Sept Nains");
    assert.equal(
        titreOriginalBlancheNeige?.titre,
        "Snow White and the Seven Dwarfs",
    );
}

function verifierTrain5E(migration) {
    const catalogue = lireJson("src/data/catalogues/personnages.json");
    const catalogueParSlug = new Map(
        catalogue.map((entree) => [entree.slug, entree]),
    );
    const sources = new Set(
        lireJson("src/data/sources/sources.json").map((source) => source.id),
    );
    const entreesTrain5E = migration.entries.filter(
        (entree) => entree.train === "5E",
    );

    assert.equal(entreesTrain5E.length, 22);

    for (const [slug, identite] of Object.entries(
        identitesPersonnagesTrain5E,
    )) {
        const cle = `personnages/${slug}`;
        const entreeJournal = entreesTrain5E.find(
            (entree) => cleEntree(entree) === cle,
        );
        const fiche = lireJson(`src/data/personnages/${slug}.json`);
        const entreeCatalogue = catalogueParSlug.get(slug);
        const nomsAlternatifs = fiche.nomsAlternatifs ?? [];

        assert.equal(
            entreeJournal?.status,
            identite.statut,
            `${cle} : verdict R2 inattendu`,
        );
        assert.match(
            entreeJournal.verdict,
            /raccord R2/i,
            `${cle} : verdict R2 incomplet`,
        );
        assert.equal(
            entreeCatalogue?.nom,
            identite.principale,
            `${cle} : identité principale inattendue`,
        );
        assert.ok(
            sources.has(identite.sourcePreuve) &&
                entreeJournal.sources.includes(identite.sourcePreuve),
            `${cle} : preuve du verdict absente`,
        );
        assert.ok(
            fiche.sources?.includes(identite.sourcePreuve) ||
                nomsAlternatifs.some((nom) =>
                    nom.sources.includes(identite.sourcePreuve),
                ),
            `${cle} : preuve non rattachée à l’Archive`,
        );

        const formesOriginales = nomsAlternatifs.filter(
            (nom) => nom.nature === "original",
        );

        if (identite.originale === null) {
            assert.equal(
                formesOriginales.length,
                0,
                `${cle} : forme identique dupliquée comme nom original`,
            );
        } else {
            assert.equal(
                formesOriginales.length,
                1,
                `${cle} : forme originale absente ou dupliquée`,
            );
            assert.equal(formesOriginales[0].nom, identite.originale);
            assert.equal(formesOriginales[0].langue, "en");
            assert.ok(formesOriginales[0].sources.length > 0);
        }

        if (identite.alias) {
            const alias = nomsAlternatifs.find(
                (nom) => nom.nature === "alias" && nom.nom === identite.alias,
            );
            assert.ok(alias, `${cle} : alias protégé absent`);
        }

        if (identite.statut === "migree") {
            assert.ok(
                entreeJournal.files.includes(
                    `src/data/personnages/${slug}.json`,
                ) &&
                    entreeJournal.files.includes(
                        "src/data/sources/sources.json",
                    ),
                `${cle} : fichiers de migration incomplets`,
            );
        } else {
            assert.deepEqual(
                entreeJournal.files,
                [],
                `${cle} : Archive déclarée inchangée mais fichier modifié`,
            );
        }
    }

    const humbert = lireJson(
        "src/data/personnages/le-chasseur.json",
    ).nomsAlternatifs.find((nom) => nom.nom === "Humbert");
    assert.equal(
        humbert.langue,
        undefined,
        "personnages/le-chasseur : une langue a été inventée pour Humbert",
    );
}

function verifierTrain5F(migration) {
    const catalogue = lireJson("src/data/catalogues/contributeurs.json");
    const catalogueParSlug = new Map(
        catalogue.map((entree) => [entree.slug, entree]),
    );
    const sourcesPubliques = lireJson("src/data/sources/sources.json");
    const sourcesPhase2 = lireJson(
        "docs/studio/production/acte-vi/phase-2/sources.json",
    ).sources;
    const sourcesConnues = new Set([
        ...sourcesPubliques.map((source) => source.id),
        ...sourcesPhase2.map((source) => source.id),
    ]);
    const entreesTrain5F = migration.entries.filter(
        (entree) => entree.train === "5F",
    );
    const createurs = entreesTrain5F.filter(
        (entree) => entree.family === "createurs",
    );
    const epoques = entreesTrain5F.filter(
        (entree) => entree.family === "epoques",
    );

    assert.equal(entreesTrain5F.length, 20);
    assert.equal(createurs.length, 19);
    assert.equal(epoques.length, 1);
    assert.equal(
        createurs.filter((entree) => entree.status === "reportee").length,
        18,
    );
    assert.equal(
        createurs.filter((entree) => entree.status === "inchangee").length,
        1,
    );

    for (const [slug, statut] of Object.entries(verdictsTrain5F)) {
        const cle = `createurs/${slug}`;
        const entree = createurs.find(
            (candidate) => cleEntree(candidate) === cle,
        );

        assert.equal(entree?.status, statut, `${cle} : verdict inattendu`);
        assert.match(
            entree.verdict,
            /raccord R2/i,
            `${cle} : verdict R2 incomplet`,
        );
        assert.deepEqual(
            entree.files,
            [],
            `${cle} : la fiche Créateur ne doit pas porter la future relation`,
        );
        assert.ok(
            entree.checks.includes("pnpm check:relations") &&
                entree.checks.includes("pnpm check:phase-5"),
            `${cle} : contrôles de raccord incomplets`,
        );
        assert.ok(
            catalogueParSlug.has(slug) &&
                existsSync(chemin("src/data/contributeurs", `${slug}.json`)),
            `${cle} : Archive publique absente`,
        );
        assert.ok(
            entree.sources.every((source) => sourcesConnues.has(source)),
            `${cle} : source de verdict inconnue`,
        );

        if (statut === "reportee") {
            assert.ok(
                entree.reservations.some((reserve) =>
                    reserve.includes("Phase 6"),
                ),
                `${cle} : condition de reprise Phase 6 absente`,
            );
        }
    }

    const davidHand = lireJson("src/data/contributeurs/david-hand.json");
    assert.doesNotMatch(
        JSON.stringify(davidHand),
        /pinocchio/i,
        "createurs/david-hand : crédit Pinocchio fabriqué malgré l’exception",
    );

    const billTytla = catalogueParSlug.get("vladimir-bill-tytla");
    assert.equal(billTytla?.nom, "Vladimir “Bill” Tytla");

    const entreeEpoque = epoques[0];
    const ficheEpoque = lireJson(
        "src/data/epoques/temps-des-chefs-d-oeuvre.json",
    );

    assert.equal(entreeEpoque.slug, "temps-des-chefs-d-oeuvre");
    assert.equal(entreeEpoque.status, "reportee");
    assert.match(entreeEpoque.verdict, /raccord R2/i);
    assert.deepEqual(entreeEpoque.files, []);
    assert.ok(entreeEpoque.sources.includes("wdfm-pinocchio-importance"));
    assert.ok(
        entreeEpoque.reservations.some(
            (reserve) =>
                reserve.includes("Phase 6") &&
                reserve.includes("sans créer de nouvelle Époque"),
        ),
        "epoques/temps-des-chefs-d-oeuvre : frontière de reprise absente",
    );
    assert.match(JSON.stringify(ficheEpoque), /pinocchio/i);
    assert.ok(ficheEpoque.sources.includes("wdfm-pinocchio-importance"));
    assert.equal(ficheEpoque.periode.debut.valeur, "1937");
    assert.equal(ficheEpoque.periode.fin.valeur, "1942");
}

function verifierTransmission() {
    const dossier = chemin("docs/studio/production/acte-vi/phase-5");

    for (const document of documentsPhase5) {
        assert.ok(
            existsSync(path.join(dossier, document)),
            `Transmission de la Phase 5 absente : ${document}`,
        );
    }
}

const migration = lireJson(cheminMigration);
const manifeste = verifierManifeste(migration);
const corpus = verifierInventairePublic(migration);
verifierRoutesProtegees(manifeste);
const progression = verifierJournal(migration, manifeste);
verifierEchantillonR3(migration);
verifierTrain5D(migration);
verifierTrain5E(migration);
verifierTrain5F(migration);
verifierBranchement();
verifierTransmission();

console.log(
    `Phase 5 suivie : ${migration.entries.length} raccords, ${progression.verdicts} verdicts, ${corpus.nombreEntrees} Archives, ${corpus.nombreRoutes} routes et ${migration.baseline.protectedLegacyRoutes} routes historiques protégées.`,
);
