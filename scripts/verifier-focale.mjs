import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import Module, { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const resolutionOriginale = Module._resolveFilename;
const extensionTypeScriptOriginale = Module._extensions[".ts"];
const extensionTsxOriginale = Module._extensions[".tsx"];
const extensionCssOriginale = Module._extensions[".css"];
const racineFocale = path.join(racine, "src/components/focale");
const primitivesAttendues = new Set([
    "FocaleAnnotation",
    "FocaleLegend",
    "FocaleMark",
    "FocaleScale",
    "FocaleTable",
    "FocaleViewport",
]);

function lire(...segments) {
    return readFileSync(path.join(racine, ...segments), "utf8");
}

function chargerTypeScript() {
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

    function chargerTs(module, fichier) {
        const { outputText } = ts.transpileModule(
            readFileSync(fichier, "utf8"),
            {
                compilerOptions: {
                    esModuleInterop: true,
                    jsx: ts.JsxEmit.ReactJSX,
                    module: ts.ModuleKind.CommonJS,
                    target: ts.ScriptTarget.ES2022,
                },
                fileName: fichier,
            },
        );

        module._compile(outputText, fichier);
    }

    Module._extensions[".ts"] = chargerTs;
    Module._extensions[".tsx"] = chargerTs;
    Module._extensions[".css"] = function chargerCss(module) {
        module.exports = new Proxy(
            {},
            {
                get: (_, propriete) => String(propriete),
            },
        );
    };

    try {
        return {
            ...require(path.join(racineFocale, "FocaleScale/index.ts")),
            ...require(path.join(racineFocale, "FocaleTable/index.ts")),
            ...require(path.join(racine, "src/fixtures/focale/index.ts")),
        };
    } finally {
        Module._resolveFilename = resolutionOriginale;
        if (extensionTypeScriptOriginale) {
            Module._extensions[".ts"] = extensionTypeScriptOriginale;
        } else {
            delete Module._extensions[".ts"];
        }
        if (extensionTsxOriginale) {
            Module._extensions[".tsx"] = extensionTsxOriginale;
        } else {
            delete Module._extensions[".tsx"];
        }
        if (extensionCssOriginale) {
            Module._extensions[".css"] = extensionCssOriginale;
        } else {
            delete Module._extensions[".css"];
        }
    }
}

function verifierArchitecture() {
    const entrees = readdirSync(racineFocale, { withFileTypes: true });
    const dossiers = new Set(
        entrees
            .filter((entree) => entree.isDirectory())
            .map(({ name }) => name),
    );

    assert.deepEqual(dossiers, primitivesAttendues);
    assert.equal(
        entrees
            .filter((entree) => entree.isFile())
            .map(({ name }) => name)
            .join(),
        "index.ts",
    );

    for (const primitive of primitivesAttendues) {
        const fichiers = new Set(
            readdirSync(path.join(racineFocale, primitive)),
        );
        const attendus = new Set([
            `${primitive}.ts${primitive === "FocaleScale" ? "" : "x"}`,
            `${primitive}.types.ts`,
            "index.ts",
            ...(primitive === "FocaleScale" ? [] : [`${primitive}.module.css`]),
        ]);

        assert.deepEqual(
            fichiers,
            attendus,
            `${primitive} : dossier incomplet ou responsabilité étrangère`,
        );
    }
}

function verifierFrontieres() {
    const fichiers = [];
    for (const primitive of primitivesAttendues) {
        for (const fichier of readdirSync(path.join(racineFocale, primitive))) {
            if (/\.(?:ts|tsx|css)$/u.test(fichier)) {
                fichiers.push(path.join(racineFocale, primitive, fichier));
            }
        }
    }

    for (const fichier of fichiers) {
        const source = readFileSync(fichier, "utf8");
        assert.doesNotMatch(
            source,
            /@\/components\/(?:ui|codex|atelier)\//,
            `${path.relative(racine, fichier)} : Focale ne dépend pas de Pixie ou d’une surface produit`,
        );
        assert.doesNotMatch(
            source,
            /@\/(?:data|registry|lib\/plans|types)\//,
            `${path.relative(racine, fichier)} : dépendance métier interdite`,
        );
        assert.doesNotMatch(
            source,
            /#[\da-f]{3,8}\b/iu,
            `${path.relative(racine, fichier)} : couleur isolée interdite`,
        );
    }

    const barre = lire("src/components/focale/index.ts");
    for (const primitive of primitivesAttendues) {
        assert.match(barre, new RegExp(`\\./${primitive}`));
    }
    assert.doesNotMatch(barre, /FocaleTooltip/);
}

function verifierEchelle(createFocaleOrdinalScale) {
    const scale = createFocaleOrdinalScale(
        ["preparation", "fabrication", "finalisation"],
        ["ambre", "vert"],
    );

    assert.deepEqual(scale.domain, [
        "preparation",
        "fabrication",
        "finalisation",
    ]);
    assert.deepEqual(scale.entries(), [
        ["preparation", "ambre"],
        ["fabrication", "vert"],
        ["finalisation", "ambre"],
    ]);
    assert.equal(scale.get("fabrication"), "vert");
    assert.equal(scale.get("absent"), undefined);
    assert.equal(scale.has("finalisation"), true);
    assert.equal(scale.has("absent"), false);
    assert.throws(() => createFocaleOrdinalScale([], ["ambre"]));
    assert.throws(() =>
        createFocaleOrdinalScale(["doublon", "doublon"], ["ambre"]),
    );
    assert.throws(() => createFocaleOrdinalScale(["valeur"], []));
}

function verifierFixture(focaleEquipeTemoin) {
    assert.equal(focaleEquipeTemoin.groups.length, 3);
    assert.equal(focaleEquipeTemoin.contributions.length, 5);
    assert.equal(
        new Set(focaleEquipeTemoin.contributions.map(({ id }) => id)).size,
        5,
    );
    assert.equal(
        focaleEquipeTemoin.contributions.filter(({ resolved }) => !resolved)
            .length,
        1,
    );
    assert.ok(
        focaleEquipeTemoin.contributions.every(
            ({ person, role, provenance }) =>
                person.length > 0 && role.length > 0 && provenance.length > 0,
        ),
    );
    assert.doesNotMatch(
        JSON.stringify(focaleEquipeTemoin),
        /Pinocchio|Disney|contributeur|oeuvre|personnage|domaine/iu,
        "La fixture Focale doit rester indépendante du métier du Disneyiste",
    );
}

function verifierSemantique() {
    const mark = lire("src/components/focale/FocaleMark/FocaleMark.tsx");
    assert.match(mark, /role=\{decorative \? undefined : "img"\}/);
    assert.match(mark, /aria-label=\{decorative \? undefined : label\}/);
    assert.match(mark, /aria-hidden=\{decorative \|\| undefined\}/);

    const legend = lire("src/components/focale/FocaleLegend/FocaleLegend.tsx");
    assert.match(legend, /<ul/);
    assert.match(legend, /<li/);
    assert.match(legend, /aria-labelledby=\{titleId\}/);

    const annotation = lire(
        "src/components/focale/FocaleAnnotation/FocaleAnnotation.tsx",
    );
    assert.match(annotation, /role="note"/);
    assert.match(annotation, /aria-labelledby=\{titleId\}/);

    const viewport = lire(
        "src/components/focale/FocaleViewport/FocaleViewport.tsx",
    );
    assert.match(viewport, /aria-label=\{label\}/);
    assert.match(viewport, /tabIndex=\{overflow === "auto" \? 0 : undefined\}/);

    const table = lire("src/components/focale/FocaleTable/FocaleTable.tsx");
    for (const motif of [/<caption/, /scope="col"/, /<tbody>/, /colSpan=/]) {
        assert.match(table, motif);
    }
    assert.match(table, /aria-labelledby=\{captionId\}/);
}

function verifierContrechamp(FocaleTable, focaleEquipeTemoin) {
    const columns = [
        {
            id: "person",
            header: "Personne",
            render: (row) => row.person,
        },
        {
            id: "group",
            header: "Groupe",
            render: (row) => row.group,
        },
        {
            id: "role",
            header: "Rôle",
            render: (row) => row.role,
        },
        {
            id: "provenance",
            header: "Provenance",
            render: (row) => row.provenance.join(", "),
        },
    ];
    const markup = renderToStaticMarkup(
        React.createElement(FocaleTable, {
            caption: "Contrechamp exhaustif de l’équipe témoin",
            columns,
            rows: focaleEquipeTemoin.contributions,
            getRowId: (row) => row.id,
        }),
    );

    assert.match(markup, /<table/);
    assert.match(markup, /<caption/);
    assert.equal((markup.match(/<tr/g) ?? []).length, 6);
    for (const contribution of focaleEquipeTemoin.contributions) {
        assert.match(markup, new RegExp(contribution.person));
        assert.match(markup, new RegExp(contribution.role));
        for (const provenance of contribution.provenance) {
            assert.match(markup, new RegExp(provenance));
        }
    }

    const vide = renderToStaticMarkup(
        React.createElement(FocaleTable, {
            caption: "Contrechamp vide",
            columns,
            rows: [],
            getRowId: (row) => row.id,
            emptyLabel: "Aucune contribution témoin.",
        }),
    );
    assert.match(vide, /Aucune contribution témoin\./);
    assert.match(vide, /col[Ss]pan="4"/);
}

function verifierDocumentation() {
    const documentation = lire(
        "docs/studio/production/acte-vi/phase-8/focale.md",
    );
    for (const primitive of primitivesAttendues) {
        assert.match(documentation, new RegExp(`\\b${primitive}\\b`));
    }
    assert.match(documentation, /FocaleTooltip[^\n]*différée/);
    assert.match(documentation, /Focale v0\.1\.0/);
}

verifierArchitecture();
verifierFrontieres();
const focale = chargerTypeScript();
verifierEchelle(focale.createFocaleOrdinalScale);
verifierFixture(focale.focaleEquipeTemoin);
verifierSemantique();
verifierContrechamp(focale.FocaleTable, focale.focaleEquipeTemoin);
verifierDocumentation();

console.log(
    "Focale vérifiée : 6 primitives neutres, 1 fixture indépendante et aucun contrat Pixie ou métier importé.",
);
