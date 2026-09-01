# Acte VI · Phase 2 · État de référence du Codex

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Fonction du document

Cet état de référence fixe le point de départ vérifiable de la Phase 2 —
**Consolider les arbitrages et auditer l’existant**. Il décrit le Codex tel
qu’il existe avant les décisions relatives à Pinocchio, sans anticiper les
modèles, données, routes ou interfaces des Phases 3 à 8.

Il répond à quatre questions :

1. quelle matière est actuellement publiée ;
2. quels contrats et chemins la projettent ;
3. quels garde-fous protègent déjà cette matière ;
4. quels écarts devront recevoir une décision explicite dans les trains
   suivants.

## Repères de la bobine

| Repère                         | Valeur observée                                                        |
| ------------------------------ | ---------------------------------------------------------------------- |
| Date du relevé                 | 1er septembre 2026                                                     |
| Branche                        | `main`                                                                 |
| Commit de référence            | `eca35523974cb54e9260e91d221ac583ee755d86`                             |
| Dernière transmission          | `📡 Transmission > La Phase 1 prépare sa dernière image > 🔩 R2-D2 🏅` |
| État initial du dépôt          | propre                                                                 |
| Next.js                        | `16.3.1`                                                               |
| React                          | `19.2.8`                                                               |
| Node.js utilisé pour le relevé | `v26.0.0`                                                              |
| Gestionnaire déclaré           | `pnpm@11.22.0`                                                         |

Les nombres ci-dessous sont des observations du dépôt à ce commit. Ils ne
constituent pas encore les corpus de l’Acte VI.

## Héritage validé de la Phase 1

Le rapport
[`phase-1-cloture.md`](../phase-1-cloture.md) est pris en compte comme
précondition de ce relevé.

La Phase 1 a livré :

- 19 composants métier répartis entre `CodexIndex`, `CodexFiche`,
  `CodexLayout` et `CodexCommon` ;
- 19 composants Pixie projetés directement ou par composition ;
- 10 composants Pixie conservés sans import artificiel ;
- le vérificateur `check:pixie` ;
- une répétition complète de 114 pages ;
- une relecture visuelle validée par Julien dans les deux Lumières.

Ces résultats restent la frontière UI de la Phase 2. Le présent chantier
n’ajoute aucun composant et ne modifie aucune projection publique.

## Topographie des sources de vérité

| Territoire       | Responsabilité actuelle                                             | Point d’entrée                                           |
| ---------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| Catalogues       | Publication, identité légère, listes, recherche et routes statiques | `src/data/catalogues/`                                   |
| Fiches           | Matière documentaire détaillée d’une entrée publiée                 | `src/data/<famille>/`                                    |
| Sources          | Notices bibliographiques centrales                                  | `src/data/sources/sources.json`                          |
| Récompenses      | Distinctions et rattachements transversaux                          | `src/data/recompenses/recompenses.json`                  |
| Relations        | Lectures inverses et temporelles dérivées                           | `src/data/relations.ts`, `src/data/epoques/relations.ts` |
| Contrats         | Types métier réellement partagés                                    | `src/types/`                                             |
| Registres        | Vocabulaires fermés et systèmes de projection                       | `src/registry/`                                          |
| Recherche        | Index mémoire dérivé des catalogues                                 | `src/lib/recherche.ts`                                   |
| Routes           | Assemblage des catalogues, fiches et composants                     | `src/app/`                                               |
| Composants Codex | Montage documentaire public                                         | `src/components/codex/`                                  |
| Vérificateurs    | Contrôles structurels et documentaires                              | `scripts/verifier-*.mjs`                                 |
| Fixtures         | Cas représentatifs hors Archives publiées                           | `scripts/fixtures/`                                      |

Le dépôt ne possède pas de base de données centrale. Les fichiers JSON
versionnés demeurent les Archives canoniques.

## Matière actuellement publiée

### Catalogues et fiches

| Famille                     | Entrées de catalogue | Fiches | Écart |
| --------------------------- | -------------------: | -----: | ----: |
| Personnages                 |                   22 |     22 |     0 |
| Créateurs (`contributeurs`) |                   32 |     32 |     0 |
| Œuvres                      |                   23 |     23 |     0 |
| Époques                     |                    2 |      2 |     0 |
| **Total**                   |               **79** | **79** | **0** |

Le contrôle direct des quatre familles ne relève :

- aucun `slug` dupliqué dans les catalogues ;
- aucune entrée publiée sans fiche ;
- aucune fiche orpheline hors catalogue.

Une entrée demeure publiée par son catalogue. La présence isolée d’un JSON de
fiche ne suffirait pas à ouvrir une route.

### Sources et récompenses

| Registre                                     | Mesure observée |
| -------------------------------------------- | --------------: |
| Notices de sources                           |             181 |
| Identifiants de sources distincts référencés |             181 |
| Occurrences de rattachement à une source     |             510 |
| Sources non référencées                      |               0 |
| Références vers une source inconnue          |               0 |
| Récompenses                                  |              14 |
| Récompenses rattachées à une œuvre           |              11 |
| Rattachements de bénéficiaires               |              14 |

Les 181 notices possèdent un éditeur, une URL et une date de consultation. La
couverture reste progressive pour l’auteur — 27 notices — et la date de
publication — 49 notices.

### Champs documentaires progressifs

Le modèle des Œuvres possède déjà plusieurs contrats utiles à l’Acte VI, mais
leur usage reste volontairement partiel :

| Champ de fiche Œuvre              | Fiches renseignées | Total |
| --------------------------------- | -----------------: | ----: |
| Titres alternatifs                |                  1 |    23 |
| Durées                            |                  2 |    23 |
| Période de production             |                  1 |    23 |
| Événements de sortie territoriaux |                  1 |    23 |
| Données économiques               |                  1 |    23 |
| Relations entre œuvres            |                  1 |    23 |

Le modèle des Personnages possède également :

| Champ de fiche Personnage | Fiches renseignées | Total |
| ------------------------- | -----------------: | ----: |
| Noms alternatifs          |                 12 |    22 |
| Formes                    |                  1 |    22 |

Cette couverture ne doit pas être interprétée comme un défaut automatique.
Elle constitue le point de départ mesurable du futur manifeste de
rétroapplication.

## Contrats métier existants

`src/types/` contient 17 fichiers de contrats partagés sans dépendance React.
Les contrats directement concernés par l’audit sont :

| Contrat           | Capacité actuelle                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------- |
| `codex.ts`        | Quatre familles et identité légère commune                                                |
| `fiche.ts`        | Introduction, blocs éditoriaux et sources communes                                        |
| `reference.ts`    | Référence résolue vers les quatre familles ou mention non résolue                         |
| `oeuvre.ts`       | Sortie, format, titres, durées, production, économie, relations, générique et personnages |
| `personnage.ts`   | Noms alternatifs, formes, création, première apparition et espèce                         |
| `contributeur.ts` | Naissance, décès, rôles et périodes d’activité                                            |
| `epoque.ts`       | Période historique à borne finale exclusive                                               |
| `source.ts`       | Notice bibliographique légère                                                             |
| `recompense.ts`   | Institution, édition, date, nature, trophée, bénéficiaires, œuvre et sources              |
| `recherche.ts`    | Résultats groupés sur les quatre familles                                                 |

Constats structurants :

- `TypeReferenceCodex` ne connaît que `personnage`, `contributeur`, `oeuvre`
  et `epoque` ;
- aucune famille `chanson` ou `œuvre source` n’est publiée ;
- une œuvre extérieure peut seulement apparaître dans une relation d’œuvre
  sous la forme `oeuvre-exterieure` ;
- le contrat économique distingue coût de production, revenus et entrées,
  avec territoire, période, certitude et sources ;
- la sortie territoriale distingue première mondiale et sortie nationale ;
- les contrats progressifs sont optionnels et ne forcent pas une fausse
  complétude des anciennes fiches.

## Routes, pages et index

### Routes publiques documentaires

Le Codex expose quatre couples index/fiche :

```text
/personnages              /personnages/[slug]
/contributeurs            /contributeurs/[slug]
/oeuvres                  /oeuvres/[slug]
/epoques                  /epoques/[slug]
```

Chaque route de fiche :

- génère ses paramètres depuis le catalogue correspondant ;
- pose `dynamicParams = false` ;
- résout l’entrée de catalogue et sa fiche ;
- appelle `notFound()` lorsqu’une moitié manque.

Les 79 entrées produisent donc 79 pages de fiche et les quatre catalogues
produisent quatre pages d’index. La page d’accueil et `/recherche` complètent
la navigation documentaire commune.

### Convention actuelle

- une seule route canonique existe pour chaque entrée ;
- aucun registre d’alias de route n’est présent ;
- aucune redirection historique ou localisée n’est déclarée ;
- les slugs des catalogues sont directement employés dans les URL ;
- le mot public « Créateurs » correspond au segment technique
  `contributeurs`.

La future convention de routes localisées reste donc une décision, non une
capacité déjà implémentée. Elle appartient au Train 2B et exige la validation
de Julien avant toute implémentation.

## Recherche actuelle

`src/lib/recherche.ts` construit une fois un index mémoire à partir des quatre
catalogues. La recherche :

- normalise la casse, les diacritiques, `œ`, `æ` et la ponctuation ;
- découpe la requête en termes ;
- exige que chaque terme apparaisse dans le texte indexé ;
- groupe les résultats par famille ;
- ne dépend d’aucun service externe.

| Famille     | Champs actuellement indexés                             |
| ----------- | ------------------------------------------------------- |
| Personnages | nom, sous-titre, slugs et libellés de catégories        |
| Créateurs   | nom, sous-titre, slugs et libellés de catégories        |
| Œuvres      | nom, sous-titre, collection et type avec leurs libellés |
| Époques     | nom et sous-titre                                       |

Les titres alternatifs d’Œuvres et les noms alternatifs de Personnages vivent
dans les fiches détaillées. Ils ne rejoignent pas encore la recherche, qui ne
charge que les catalogues. Les alias de routes n’existant pas, la recherche
ne peut pas non plus les prendre en charge.

## Registres existants

| Registre    | Responsabilité                                                                                             |
| ----------- | ---------------------------------------------------------------------------------------------------------- |
| `colors`    | Palette éditoriale de l’Atelier                                                                            |
| `credits`   | Neuf domaines de métiers du générique des Œuvres                                                           |
| `guidebook` | Arborescences fermées des bibliothèques locale et Notion                                                   |
| `metadata`  | Catégories des Personnages et Créateurs, collections, formats et états des Œuvres, natures des Récompenses |
| `plans`     | Grammaire commune et cinq prototypes de lecture dérivée                                                    |
| `symbols`   | Collections générales, index, récompenses, sources, diffusion et techniques                                |

Aucun registre propre aux territoires, langues, chansons, médias ou alias
d’identité n’existe à ce stade.

## Composants Codex

Les 19 composants publics relevés se répartissent ainsi :

| Territoire    | Nombre | Responsabilité                                                                 |
| ------------- | -----: | ------------------------------------------------------------------------------ |
| `CodexIndex`  |      7 | Pages, listes, Cards et changement de vue                                      |
| `CodexFiche`  |     10 | Montage, en-tête, repères, sections, relations, œuvres, récompenses et sources |
| `CodexLayout` |      1 | Footer commun                                                                  |
| `CodexCommon` |      1 | Référence partagée                                                             |

Cette organisation est la frontière de montage de la Phase 2. Aucun besoin
d’audit ne justifie de la modifier.

## Fixtures disponibles

Six fixtures sont conservées hors des Archives publiées :

```text
scripts/fixtures/guidebook/markdown-analysis.fixture.md
scripts/fixtures/guidebook/notion-manifest.fixture.json
scripts/fixtures/guidebook/notion-markdown.fixture.md
scripts/fixtures/guidebook/notion-projection.fixture.json
scripts/fixtures/oeuvre-long-metrage.json
scripts/fixtures/personnage-formes.json
```

Les deux fixtures métier éprouvent actuellement le modèle enrichi d’une Œuvre
long métrage et les formes d’un Personnage. Aucune fixture propre à
Pinocchio, aux chansons ou aux routes localisées n’existe encore.

## Garde-fous disponibles

| Commande                 | Frontière protégée                                           |
| ------------------------ | ------------------------------------------------------------ |
| `pnpm check:pixie`       | Projection Pixie et architecture des composants Codex        |
| `pnpm check:symbols`     | Registres et fichiers de symboles                            |
| `pnpm check:metadata`    | Vocabulaires fermés des métadonnées                          |
| `pnpm check:plans`       | Grammaire des Plans                                          |
| `pnpm check:plan-matter` | Dérivations et Bobines témoins                               |
| `pnpm check:guidebook`   | Manifestes, analyse Markdown et frontières privées           |
| `pnpm check:oeuvres`     | Contrats enrichis des Œuvres et leurs sources                |
| `pnpm check:personnages` | Noms alternatifs, formes et sources                          |
| `pnpm check:relations`   | Concordance catalogues, fiches, références et sources        |
| `pnpm check:recompenses` | Registre des distinctions et trophées                        |
| `pnpm check:ci`          | Format, lint, contrôles spécialisés et build sans réécriture |

Dix vérificateurs spécialisés existent. Aucun ne contrôle encore un manifeste
de corpus de l’Acte VI, une convention d’alias ou une matrice territoriale de
sources : ces objets doivent d’abord recevoir leur décision documentaire.

## Écarts ouverts pour les trains suivants

| Sujet                                         | État observé                                      | Train propriétaire |
| --------------------------------------------- | ------------------------------------------------- | ------------------ |
| Identités alternatives                        | Contrats partiels dans les fiches, non indexés    | 2B                 |
| Routes localisées et alias                    | Absents                                           | 2B                 |
| Convention de recherche enrichie              | Limitée aux catalogues                            | 2B                 |
| Corpus Pinocchio                              | Non arrêté                                        | 2C                 |
| Chansons                                      | Aucun domaine ni catalogue                        | 2C                 |
| Carlo Collodi                                 | Aucun statut arrêté                               | 2C                 |
| Rétroapplication                              | Champs existants, manifeste absent                | 2C                 |
| Sources américaines, françaises et italiennes | Enquête non constituée dans le registre canonique | 2D                 |
| Audio et paroles                              | Aucun contrat de publication                      | 2E                 |
| Données financières                           | Contrat présent, règle de publication à arrêter   | 2E                 |

Les futures sources candidates resteront dans le dossier de production tant
qu’un chantier d’Archives distinct ne les aura pas validées et inscrites dans
`src/data/sources/sources.json`.

## Frontière de la Phase 2

Cet état de référence autorise pendant la Phase 2 :

- les documents internes d’audit et de décision ;
- les manifestes structurés de corpus et de rétroapplication ;
- les inventaires de sources candidates ;
- un éventuel vérificateur de cohérence de ces livrables internes.

Il n’autorise pas encore :

- la modification de `src/types`, `src/data`, `src/registry` ou `src/app` pour
  mettre en œuvre les décisions futures ;
- la création des domaines Chansons ou Œuvres sources ;
- l’ajout de routes, redirections ou alias ;
- la publication de médias, paroles ou chiffres ;
- l’intégration silencieuse des Phases 3 à 8.

## Reproduction du relevé

Les mesures proviennent de lectures directes des catalogues, fiches et
registres JSON, complétées par les recherches suivantes :

```bash
git status --short
git rev-parse HEAD
find src/app -type f
find src/types src/data src/registry src/lib src/components/codex scripts -type f
rg "generateStaticParams|dynamicParams|notFound" src/app
rg "titresAlternatifs|nomsAlternatifs|donneesEconomiques" src/data src/types
```

Le contrôle final du train doit être enregistré séparément du constat si un
outil d’audit réutilisable devient nécessaire. À ce stade, les vérificateurs
existants suffisent à confirmer les invariants décrits.

## Verdict du Train 2A

Le Codex possède une base saine et concordante : 79 entrées publiées avec
leurs 79 fiches, 181 sources toutes référencées, 14 récompenses, quatre routes
de familles fermées et dix garde-fous spécialisés.

L’Acte VI ne part toutefois pas d’un modèle vierge. Les titres, noms,
territoires, événements de sortie et données économiques possèdent déjà des
contrats partiels qu’il faudra consolider sans les doubler. À l’inverse, les
chansons, alias de routes, règles médias et corpus Pinocchio n’existent pas
encore comme domaines canoniques.

Le Train 2A est donc **prêt à être transmis**. Le Train 2B peut arbitrer les
identités, les routes et la recherche à partir de faits mesurés plutôt que
d’hypothèses.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_État de référence établi · aucun modèle public modifié_
