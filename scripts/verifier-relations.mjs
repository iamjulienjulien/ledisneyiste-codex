import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const familles = [
    {
        type: "personnage",
        catalogue: "src/data/catalogues/personnages.json",
        dossier: "src/data/personnages",
    },
    {
        type: "contributeur",
        catalogue: "src/data/catalogues/contributeurs.json",
        dossier: "src/data/contributeurs",
    },
    {
        type: "oeuvre",
        catalogue: "src/data/catalogues/oeuvres.json",
        dossier: "src/data/oeuvres",
    },
    {
        type: "epoque",
        catalogue: "src/data/catalogues/epoques.json",
        dossier: "src/data/epoques",
    },
    {
        type: "chanson",
        catalogue: "src/data/catalogues/chansons.json",
        dossier: "src/data/chansons",
    },
];

async function lireJson(chemin) {
    return JSON.parse(await readFile(path.join(racine, chemin), "utf8"));
}

function chaineNonVide(valeur) {
    return typeof valeur === "string" && valeur.trim().length > 0;
}

function cleReference(reference) {
    return reference.type && reference.slug
        ? `${reference.type}:${reference.slug}`
        : `non-resolue:${reference.nom}`;
}

function verifierReference(reference, contexte, catalogues, erreurs) {
    if (!reference || !chaineNonVide(reference.nom)) {
        erreurs.push(`${contexte} : nom absent`);
        return;
    }

    const aUnType = reference.type !== undefined;
    const aUnSlug = reference.slug !== undefined;

    if (aUnType !== aUnSlug) {
        erreurs.push(
            `${contexte} : type et slug doivent être fournis ensemble`,
        );
        return;
    }

    if (!aUnType) {
        return;
    }

    const catalogue = catalogues.get(reference.type);
    const entree = catalogue?.get(reference.slug);

    if (!catalogue) {
        erreurs.push(`${contexte} : type inconnu « ${reference.type} »`);
    } else if (!entree) {
        erreurs.push(
            `${contexte} : référence ${reference.type} « ${reference.slug} » introuvable`,
        );
    } else if (entree.nom !== reference.nom) {
        erreurs.push(
            `${contexte} : nom « ${reference.nom} » différent du catalogue « ${entree.nom} »`,
        );
    }
}

function verifierListeReferences(references, contexte, catalogues, erreurs) {
    if (!Array.isArray(references)) {
        erreurs.push(`${contexte} : tableau attendu`);
        return 0;
    }

    const cles = new Set();

    references.forEach((reference, index) => {
        verifierReference(
            reference,
            `${contexte} · référence ${index + 1}`,
            catalogues,
            erreurs,
        );

        const cle = cleReference(reference);
        if (cles.has(cle)) {
            erreurs.push(`${contexte} : référence dupliquée « ${cle} »`);
        }
        cles.add(cle);
    });

    return references.length;
}

async function verifier() {
    const erreurs = [];
    const catalogues = new Map();
    const sources = await lireJson("src/data/sources/sources.json");
    const idsSources = new Set(sources.map((source) => source.id));
    let fichesVerifiees = 0;
    let referencesVerifiees = 0;

    for (const famille of familles) {
        const entrees = await lireJson(famille.catalogue);
        catalogues.set(
            famille.type,
            new Map(entrees.map((entree) => [entree.slug, entree])),
        );
    }

    for (const famille of familles) {
        const catalogue = catalogues.get(famille.type);
        const slugsFiches = new Set();
        const fichiers = (await readdir(path.join(racine, famille.dossier)))
            .filter((fichier) => fichier.endsWith(".json"))
            .sort();

        for (const fichier of fichiers) {
            const fiche = await lireJson(`${famille.dossier}/${fichier}`);
            const contexte = `${famille.dossier}/${fichier}`;
            const entree = catalogue.get(fiche.slug);
            fichesVerifiees += 1;
            slugsFiches.add(fiche.slug);

            if (!entree) {
                erreurs.push(`${contexte} : slug absent du catalogue`);
            }

            if (fiche.type !== famille.type) {
                erreurs.push(
                    `${contexte} : type « ${fiche.type} » au lieu de « ${famille.type} »`,
                );
            }

            if (!Array.isArray(fiche.sources) || fiche.sources.length === 0) {
                erreurs.push(`${contexte} : source obligatoire`);
            } else {
                const sourcesUniques = new Set();
                for (const idSource of fiche.sources) {
                    if (!idsSources.has(idSource)) {
                        erreurs.push(
                            `${contexte} : source « ${idSource} » introuvable`,
                        );
                    }
                    if (sourcesUniques.has(idSource)) {
                        erreurs.push(
                            `${contexte} : source dupliquée « ${idSource} »`,
                        );
                    }
                    sourcesUniques.add(idSource);
                }
            }

            if (famille.type === "personnage") {
                referencesVerifiees += verifierListeReferences(
                    fiche.creation?.createurs,
                    `${contexte} · création`,
                    catalogues,
                    erreurs,
                );
                verifierReference(
                    fiche.premiereApparition?.oeuvre,
                    `${contexte} · première apparition`,
                    catalogues,
                    erreurs,
                );
                referencesVerifiees += 1;
            }

            if (famille.type === "oeuvre") {
                const contributions = fiche.contributions;
                if (!Array.isArray(contributions)) {
                    erreurs.push(
                        `${contexte} · contributions : tableau attendu`,
                    );
                } else {
                    const contributeurs = new Set();
                    contributions.forEach((contribution, index) => {
                        const contexteContribution = `${contexte} · contribution ${index + 1}`;
                        verifierReference(
                            contribution.contributeur,
                            contexteContribution,
                            catalogues,
                            erreurs,
                        );
                        referencesVerifiees += 1;

                        const cle = `${cleReference(contribution.contributeur)}:${contribution.domaine ?? "sans-domaine"}`;
                        if (contributeurs.has(cle)) {
                            erreurs.push(
                                `${contexte} : contribution dupliquée « ${cle} »`,
                            );
                        }
                        contributeurs.add(cle);

                        if (
                            !Array.isArray(contribution.roles) ||
                            contribution.roles.length === 0 ||
                            contribution.roles.some(
                                (role) => !chaineNonVide(role),
                            )
                        ) {
                            erreurs.push(
                                `${contexteContribution} : au moins un rôle valide est obligatoire`,
                            );
                        }
                    });
                }

                referencesVerifiees += verifierListeReferences(
                    fiche.personnages,
                    `${contexte} · personnages`,
                    catalogues,
                    erreurs,
                );

                if (fiche.relationsOeuvres !== undefined) {
                    if (!Array.isArray(fiche.relationsOeuvres)) {
                        erreurs.push(
                            `${contexte} · relations d’œuvres : tableau attendu`,
                        );
                    } else {
                        const relations = new Set();

                        fiche.relationsOeuvres.forEach((relation, index) => {
                            const contexteRelation = `${contexte} · relation d’œuvre ${index + 1}`;
                            const oeuvre = relation.oeuvre;

                            if (oeuvre?.type === "oeuvre") {
                                verifierReference(
                                    oeuvre,
                                    contexteRelation,
                                    catalogues,
                                    erreurs,
                                );
                                referencesVerifiees += 1;
                            }

                            const cle = `${relation.nature}:${oeuvre?.type}:${oeuvre?.slug ?? oeuvre?.nom}`;
                            if (relations.has(cle)) {
                                erreurs.push(
                                    `${contexte} : relation d’œuvre dupliquée « ${cle} »`,
                                );
                            }
                            relations.add(cle);
                        });
                    }
                }
            }

            if (famille.type === "chanson") {
                verifierReference(
                    fiche.oeuvreOrigine,
                    `${contexte} · œuvre d’origine`,
                    catalogues,
                    erreurs,
                );
                referencesVerifiees += 1;

                for (const [index, auteur] of fiche.auteurs.entries()) {
                    verifierReference(
                        auteur.personne,
                        `${contexte} · auteur ${index + 1}`,
                        catalogues,
                        erreurs,
                    );
                    referencesVerifiees += 1;
                }

                for (const [index, occurrence] of fiche.occurrences.entries()) {
                    verifierReference(
                        occurrence.oeuvre,
                        `${contexte} · occurrence ${index + 1}`,
                        catalogues,
                        erreurs,
                    );
                    referencesVerifiees += 1;
                }

                for (const interpretation of fiche.interpretations) {
                    for (const attribution of interpretation.interpretes) {
                        verifierReference(
                            attribution.personne,
                            `${contexte} · interprétation ${interpretation.id}`,
                            catalogues,
                            erreurs,
                        );
                        referencesVerifiees += 1;
                    }
                }
            }
        }

        for (const slug of catalogue.keys()) {
            if (!slugsFiches.has(slug)) {
                erreurs.push(
                    `${famille.catalogue} : aucune fiche pour « ${slug} »`,
                );
            }
        }
    }

    if (erreurs.length > 0) {
        console.error("Échec de la vérification des relations :");
        for (const erreur of erreurs) {
            console.error(`- ${erreur}`);
        }
        process.exitCode = 1;
        return;
    }

    console.log(
        `Relations vérifiées : ${referencesVerifiees} références dans ${fichesVerifiees} fiches.`,
    );
}

await verifier();
