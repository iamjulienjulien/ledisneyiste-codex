import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const disneyLegendsAttendus = new Map([
    ["ub-iwerks", [1989, "d23-ub-iwerks"]],
    ["les-clark", [1989, "d23-les-clark"]],
    ["marc-davis", [1989, "d23-marc-davis"]],
    ["ollie-johnston", [1989, "d23-ollie-johnston"]],
    ["milt-kahl", [1989, "d23-milt-kahl"]],
    ["ward-kimball", [1989, "d23-ward-kimball"]],
    ["eric-larson", [1989, "d23-eric-larson"]],
    ["john-lounsbery", [1989, "d23-john-lounsbery"]],
    ["wolfgang-reitherman", [1989, "d23-wolfgang-reitherman"]],
    ["frank-thomas", [1989, "d23-frank-thomas"]],
    ["kenneth-anderson", [1991, "us-d23-ken-anderson"]],
    ["joe-grant", [1992, "d23-joe-grant"]],
    ["pinto-colvig", [1993, "d23-pinto-colvig"]],
    ["clarence-nash", [1993, "d23-clarence-nash"]],
    ["adriana-caselotti", [1994, "d23-adriana-caselotti"]],
    ["david-hand", [1994, "d23-david-hand"]],
    ["paul-j-smith", [1994, "d23-paul-smith"]],
    ["fred-moore", [1995, "d23-fred-moore"]],
    ["wilfred-jackson", [1998, "d23-wilfred-jackson"]],
    ["ben-sharpsteen", [1998, "us-d23-ben-sharpsteen"]],
    ["vladimir-bill-tytla", [1998, "d23-bill-tytla"]],
    ["norman-ferguson", [1999, "d23-norm-ferguson"]],
    ["hamilton-luske", [1999, "d23-ham-luske"]],
    ["cliff-edwards", [2000, "us-d23-cliff-edwards"]],
    ["dickie-jones", [2000, "us-d23-dick-jones"]],
    ["frank-churchill", [2001, "d23-frank-churchill"]],
    ["leigh-harline", [2001, "d23-leigh-harline"]],
    ["ned-washington", [2001, "us-d23-ned-washington"]],
    ["marge-champion", [2007, "d23-marge-champion"]],
]);

async function lireJson(chemin) {
    return JSON.parse(
        await readFile(path.join(racine, chemin), { encoding: "utf8" }),
    );
}

const catalogue = await lireJson("src/data/catalogues/contributeurs.json");
const recompenses = await lireJson("src/data/recompenses/recompenses.json");
const sources = await lireJson("src/data/sources/sources.json");
const contributeursParSlug = new Map(
    catalogue.map((contributeur) => [contributeur.slug, contributeur]),
);
const sourcesParId = new Map(sources.map((source) => [source.id, source]));
const disneyLegends = recompenses.filter(
    (recompense) => recompense.trophee === "statuette-disney-legends",
);

assert.equal(disneyLegendsAttendus.size, 29);
assert.equal(disneyLegends.length, disneyLegendsAttendus.size);

const slugsAttribues = new Set();

for (const recompense of disneyLegends) {
    assert.equal(recompense.institution.nom, "The Walt Disney Company");
    assert.equal(recompense.nature, "honorary");
    assert.equal(recompense.categorie, "Disney Legend");
    assert.equal(recompense.beneficiaires.length, 1);
    assert.equal(recompense.sources.length, 1);

    const beneficiaire = recompense.beneficiaires[0];
    const attendu = disneyLegendsAttendus.get(beneficiaire.slug);
    assert.ok(attendu, `${beneficiaire.slug} : Disney Legend inattendu`);
    assert.equal(
        slugsAttribues.has(beneficiaire.slug),
        false,
        `${beneficiaire.slug} : Disney Legend attribué deux fois`,
    );
    slugsAttribues.add(beneficiaire.slug);

    const [annee, sourceId] = attendu;
    const contributeur = contributeursParSlug.get(beneficiaire.slug);
    assert.ok(contributeur, `${beneficiaire.slug} : Créateur non publié`);
    assert.equal(beneficiaire.type, "contributeur");
    assert.equal(beneficiaire.nom, contributeur.nom);
    assert.equal(recompense.id, `disney-legends-${annee}-${beneficiaire.slug}`);
    assert.equal(recompense.edition.nom, `Disney Legends ${annee}`);
    assert.deepEqual(recompense.dateAttribution, {
        valeur: String(annee),
        precision: "annee",
    });
    assert.deepEqual(recompense.sources, [sourceId]);

    const source = sourcesParId.get(sourceId);
    assert.ok(source, `${beneficiaire.slug} : source officielle absente`);
    assert.match(
        source.url,
        /^https:\/\/d23\.com\/walt-disney-legend\/.+\/$/,
        `${beneficiaire.slug} : la source n’est pas une notice Disney Legends D23`,
    );
}

assert.deepEqual(
    [...slugsAttribues].sort(),
    [...disneyLegendsAttendus.keys()].sort(),
);

console.log(
    `Interlude Disney Legends vérifié : ${disneyLegends.length} Créateurs distingués.`,
);
