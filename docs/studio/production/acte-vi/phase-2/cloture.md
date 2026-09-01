# Acte VI · Clôture de la Phase 2

> **Document interne de transmission**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Verdict

La Phase 2 — **Consolider les arbitrages et auditer l’existant** — est
terminée. Son verdict est : **validée**.

Les onze décisions inscrites au registre ont reçu un arbitrage explicite de
Julien. Aucun blocage de direction ne demeure avant la Phase 3. Les lacunes
documentaires encore ouvertes ne sont pas masquées : chacune possède une
source attendue, un repli et une phase de reprise.

Cette phase n’a modifié ni les modèles produit, ni les catalogues, ni les
routes. Elle livre le cadre privé qui permet désormais de les faire évoluer
sans supposition implicite.

## Résumé de l’audit

La Phase 2 établit trois vérités complémentaires :

1. **Le Codex existant est sain et mesuré.** Il publie 79 entrées avec leurs
   79 fiches, 181 sources toutes référencées, 14 récompenses et quatre familles
   de routes fermées.
2. **Le corpus de l’Acte VI est borné.** _Pinocchio_, l’œuvre de Collodi, neuf
   Chansons, onze nouvelles fiches de Personnages, neuf nouvelles fiches de
   Créateurs ou interprètes, deux Récompenses et une Époque existante possèdent
   une profondeur de production explicite.
3. **Le passage de l’un à l’autre est testable.** Les identités, routes,
   recherches, sources, migrations, médias et chiffres possèdent désormais
   une décision, une règle ou un repli.

## Les dix livrables canoniques

| Livrable                                             | Fonction acquise                                                                |
| ---------------------------------------------------- | ------------------------------------------------------------------------------- |
| [`etat-reference.md`](./etat-reference.md)           | Mesure les modèles, données, routes, pages, composants et garde-fous existants. |
| [`decisions.md`](./decisions.md)                     | Conserve onze arbitrages validés et leurs conséquences futures.                 |
| [`sources.json`](./sources.json)                     | Qualifie 32 sources candidates sans les publier dans les Archives.              |
| [`matrice-sources.md`](./matrice-sources.md)         | Distribue les preuves entre les États-Unis, la France et l’Italie.              |
| [`corpus.md`](./corpus.md)                           | Fixe les créations, enrichissements, relations et profondeurs.                  |
| [`retroapplication.json`](./retroapplication.json)   | Rend le futur chantier de 69 entrées vérifiable par machine.                    |
| [`retroapplication.md`](./retroapplication.md)       | Explique l’ordre, les niveaux, les exceptions et les critères de migration.     |
| [`audio-paroles.md`](./audio-paroles.md)             | Sépare faisabilité, couches de droits, statuts et replis médias.                |
| [`donnees-financieres.md`](./donnees-financieres.md) | Définit l’identité et le verdict de publication d’une mesure.                   |
| [`cloture.md`](./cloture.md)                         | Transmet la Phase 2 et autorise son passage vers la Phase 3.                    |

Les JSON restent des manifestes privés de production. Les Markdown portent la
méthode, les décisions et les réserves. Aucun de ces fichiers ne devient une
Archive publique par sa seule présence dans le dépôt.

## Registre final des décisions

| ID        | Décision validée                                                                                     | Transmission principale |
| --------- | ---------------------------------------------------------------------------------------------------- | ----------------------- |
| `DEC-001` | L’Italie devient le troisième regard autonome, aux côtés des États-Unis et de la France.             | Phases 6 et 7           |
| `DEC-002` | Les routes francophones actuelles restent sans préfixe ; chaque entrée garde un slug canonique.      | Phase 3                 |
| `DEC-003` | Carlo Collodi reçoit une fiche Créateur et son livre une entrée distincte d’Œuvre source.            | Phases 4 et 6           |
| `DEC-004` | Onze Personnages reçoivent une fiche ; Cléo reste une relation structurée.                           | Phase 6                 |
| `DEC-005` | Six nouvelles fiches complètes et trois fiches légères de Créateurs sont retenues.                   | Phase 6                 |
| `DEC-006` | Le premier corpus Chansons est fermé à neuf entrées, dont quatre rétrospectives.                     | Phases 4 à 7            |
| `DEC-007` | La projection initiale des Chansons est `metadata-first`, sans présomption de droits.                | Phases 7 et 9           |
| `DEC-008` | Une donnée financière doit conserver mesure, unité, temps, territoire, méthode et source.            | Phases 4 et 7           |
| `DEC-009` | La rétroapplication est bornée à 69 entrées et 45 routes historiques à préserver.                    | Phase 5                 |
| `DEC-010` | Les identités documentées restent dans les fiches et les alias de navigation dans un registre dédié. | Phase 3                 |
| `DEC-011` | La recherche future joint catalogue et fiche sans dupliquer les identités dans le catalogue.         | Phase 3                 |

Les onze décisions sont `validé`. Le registre ne contient plus de statut `à
confirmer par audit`, `à décider` ou `bloqué`. Une décision ne sera rouverte
que par une information nouvelle consignée avec son impact.

## Le corpus remis à la production

### Œuvres et Chansons

- _Pinocchio_ reçoit une fiche Œuvre complète ;
- _Le avventure di Pinocchio_ ouvre le futur registre interne des Œuvres
  sources ;
- _Snow White and the Seven Dwarfs_ devient l’échantillon R3 de la
  rétroapplication ;
- cinq Chansons de _Pinocchio_ et quatre Chansons rétrospectives composent le
  premier index ;
- _When You Wish Upon a Star_ reçoit la seule fiche Chanson complète du noyau
  initial ; les huit autres entrées commencent par une fiche légère.

### Personnages

Onze fiches sont retenues : six complètes et cinq légères. La matrice confirme
notamment **Crapule** comme identité française documentée de Lampwick et
l’autonomie de Figaro grâce à sa vie au-delà du film. Cléo reste reliée à
_Pinocchio_ et à _Figaro and Cleo_ sans route propre dans l’Acte VI.

### Créateurs et interprètes

Les nouvelles fiches complètes sont Carlo Collodi, Ben Sharpsteen, Cliff
Edwards, Dickie Jones, Ned Washington et Jack Kinney. T. Hee, Joshua Meador et
Kenneth Anderson reçoivent une fiche légère. Evelyn Venable demeure dans les
crédits structurés comme voix originale de la Fée Bleue ; Marge Champion en
est le modèle filmé.

Dix-neuf Créateurs existants reçoivent un verdict d’enrichissement. Aucun rôle
ne doit leur être attribué par simple proximité avec le film.

### Récompenses et Époque

Les Oscars de la meilleure musique originale et de la meilleure chanson
originale rejoindront le registre transversal des Récompenses. _Pinocchio_
rejoint **Le temps des chefs-d’œuvre** ; aucune nouvelle Époque n’est créée.

## Trois regards documentaires

Le registre privé rassemble **32 sources qualifiées** :

| Regard     | Sources | Niveau `A` | Niveau `B` | Question dominante                                         |
| ---------- | ------: | ---------: | ---------: | ---------------------------------------------------------- |
| États-Unis |      18 |         18 |          0 | Fabrication, lancement, récompenses et vie publique.       |
| France     |       7 |          6 |          1 | Sortie de 1946, doublages, chansons et fréquentation.      |
| Italie     |       7 |          6 |          1 | Collodi, adaptation, attente, doublage et réappropriation. |
| **Total**  |  **32** |     **30** |      **2** | Trois récits complémentaires, jamais une voix unique.      |

L’Italie franchit les six seuils de confirmation de la mission. Son regard ne
se résume pas à l’origine de Collodi : il documente ce que devient un
personnage italien lorsqu’il traverse Hollywood, la guerre, le doublage et la
réappropriation nationale.

Les 32 notices restent dans `docs/studio`. Leur passage vers
`src/data/sources/sources.json` appartient aux chantiers d’Archives des Phases
4 et 6, source par source.

## Identités, routes et recherche

La Phase 3 reçoit une convention sans ambiguïté :

- les routes actuelles `/personnages`, `/contributeurs`, `/oeuvres` et
  `/epoques` conservent leurs slugs canoniques ;
- une identité française, originale ou territoriale ne crée jamais une route
  automatiquement ;
- une ancienne URL réellement publiée peut devenir un alias de navigation et
  rediriger vers l’unique route canonique ;
- le catalogue conserve l’identité légère ; la fiche possède les identités
  documentées et leurs sources ;
- la recherche joint ces deux frontières, normalise les termes et déduplique
  par identité canonique ;
- l’ajout de matière italienne ou américaine ne crée pas artificiellement une
  interface multilingue.

Ces choix préservent les 79 URLs actuelles tout en préparant titres français,
formes originales, alias et recherche enrichie.

## Rétroapplication mesurable

Le futur chantier ne porte plus la consigne « le plus loin possible ». Il
reçoit un manifeste de **69 entrées** :

- 23 Œuvres existantes ;
- 22 Personnages existants ;
- 19 Créateurs existants ;
- quatre Chansons rétrospectives ;
- une Époque existante.

Les 45 Œuvres et Personnages adoptent le futur contrat d’identité et
conservent leurs 45 routes historiques. _Snow White and the Seven Dwarfs_ sert
de seule entrée R3 ; les 68 autres entrées s’arrêtent au niveau R2 lorsque la
matière ne justifie pas davantage.

Les critères de sortie portent sur les totaux, les références résolues, les
identités sourcées, les collisions, les exceptions et les routes — pas sur un
sentiment d’exhaustivité.

## Médias et données financières

### Audio et paroles

L’Acte VI documente les Chansons sans dépendre d’un média :

- métadonnées et liens officiels simples forment la projection initiale ;
- une citation courte exige finalité, proportion, version, attribution et
  validation humaine ;
- un lecteur intégré reste reporté par défaut et doit résoudre droits,
  conditions du fournisseur, traceurs, consentement et repli ;
- aucun audio hébergé, texte intégral ou traduction intégrale n’est publié
  sans autorisation écrite couvrant chaque couche et chaque territoire.

Cette politique n’est pas une autorisation juridique particulière. Elle
empêche au contraire qu’une capacité technique soit prise pour un droit.

### Chiffres

Une valeur économique n’entre en scène qu’avec la nature de sa mesure, sa
valeur ou sa fourchette, son unité, sa devise et son année, son territoire, sa
période, son périmètre, sa méthode, sa certitude, sa source et sa raison
éditoriale.

Les contradictions restent attribuées ; elles ne sont jamais moyennées. La
valeur nominale originale précède toute conversion. Une valeur dérivée expose
indice ou taux, date, base, formule, source et arrondi. Une dimension critique
absente maintient le chiffre dans l’enquête privée.

## Risques transmis sans blocage

| Phase   | Risque ou réserve conservée                                                 | Garde-fou de reprise                                                             |
| ------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Phase 3 | Identités territoriales antidatées, collision de recherche ou route cassée. | Provenance obligatoire, slug unique, alias explicite et scénarios d’acceptation. |
| Phase 4 | Contrats Chansons, Œuvres sources ou chiffres généralisés trop tôt.         | Éprouver d’abord les neuf Chansons, Collodi, _Pinocchio_ et l’échantillon R3.    |
| Phase 5 | Migration infinie ou enrichissement confondu avec compatibilité.            | Manifeste de 69 lignes, niveaux R2/R3 et 45 routes mesurées.                     |
| Phase 6 | Fiche autonome créée depuis un simple crédit ou une source insuffisante.    | Profondeur arrêtée, sources de la matrice et repli vers relation ou crédits.     |
| Phase 7 | Voix territoriales fusionnées, citation non autorisée ou chiffre trompeur.  | Trois regards distincts, `DEC-007`, `DEC-008` et attribution visible.            |
| Phase 9 | Média tiers traité comme condition de clôture.                              | Chansons complètes sans lecteur ; intégration considérée comme enrichissement.   |

Ces risques ne bloquent pas la Phase 3. Ils bornent les responsabilités des
phases qui les possèdent.

## Frontière respectée

La Phase 2 n’a créé ou modifié aucun fichier sous `src/types`, `src/data`,
`src/registry`, `src/lib`, `src/components` ou `src/app` pour anticiper les
phases suivantes.

Elle n’a pas :

- migré une identité ou une route ;
- créé les domaines Chansons ou Œuvres sources ;
- ajouté _Pinocchio_ aux Archives ;
- publié une source candidate ;
- commencé la rétroapplication ;
- intégré un extrait, des paroles ou une donnée financière ;
- promu le Générique vivant.

Le dossier de production prépare l’implémentation ; il ne se substitue jamais
à elle.

## Répétition finale

La projection complète exécutée à la fin du Train 2E valide :

- le format et le lint ;
- les dix vérificateurs spécialisés ;
- TypeScript et la compilation de **114 pages** ;
- 19 composants Codex dans quatre territoires ;
- 79 fiches et leurs références existantes ;
- 432 symboles, 14 récompenses et les cinq Plans.

Le Train 2F complète cette preuve avec `pnpm check:ci`, le contrôle intégral
sans réécriture du dépôt : format, lint, dix vérificateurs et build de 114
pages sont verts. Cette variante préserve le WIP artistique présent en
parallèle et confirme que la clôture n’en dépend pas.

## Générique de la Phase 2

1. `4700c13` — ✍️ Scénario > La Phase 2 établit l’état de référence du Codex > 🔩 R2-D2 🏅
2. `68c1fd9` — 📡 Transmission > Les identités et les routes reçoivent leurs arbitrages > 🔩 R2-D2 🏅
3. `074c217` — ✍️ Scénario > Les corpus et la rétroapplication trouvent leurs limites > 🔩 R2-D2 🏅
4. `3392e0f` — ✍️ Scénario > Trois territoires réunissent les preuves de Pinocchio > 🔩 R2-D2 🏅
5. `66d541a` — ✍️ Scénario > Les médias et les chiffres reçoivent leurs règles de publication > 🔩 R2-D2 🏅

Le commit qui porte ce rapport n’est pas auto-référencé. Son hash rejoint le
suivi Notion après validation et publication.

## Passage vers la Phase 3

La Phase 3 — **Donner aux Archives des identités qui voyagent** — peut
commencer.

Son point d’entrée est borné : consolider les contrats d’identités, préserver
les routes canoniques et étendre la recherche par jointure. Elle ne doit pas
ouvrir prématurément les domaines Chansons ou Œuvres sources de la Phase 4, ni
commencer la migration en série de la Phase 5.

Le registre des décisions demeure la source d’arbitrage ; le rapport présent
est sa transmission, pas sa duplication normative.

## Dernière image

Le plateau n’est plus couvert de suppositions. Chaque future Archive connaît
désormais son entrée, sa profondeur, ses preuves, ses limites et la phase qui
la fera vivre.

La Phase 2 peut rendre le clap. La Phase 3 sait où poser le premier pas.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Audit refermé · onze décisions validées · les fondations peuvent voyager_
