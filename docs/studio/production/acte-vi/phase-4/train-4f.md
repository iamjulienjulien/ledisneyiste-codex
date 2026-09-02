# Acte VI · Phase 4 · Train 4F

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Mission

Le Train 4F ferme les contrats documentaires par une répétition agrégée, une
recette de migration et un rapport de clôture. Il ne produit aucune Archive :
il prouve que les modèles peuvent être remis à la Phase 5 sans déplacer les
79 routes ni annoncer les 69 entrées comme migrées.

## Répétition agrégée

`pnpm check:phase-4` surveille l’ensemble que les contrôles spécialisés
éprouvent séparément :

- présence des quatre vérificateurs propriétaires dans `check` et `check:ci` ;
- concordance des quatre catalogues avec leurs 79 fiches ;
- unicité des 79 routes canoniques ;
- absence de catalogue, route ou `CodexFamily` pour Chansons, Musiques,
  Œuvres sources et données économiques ;
- raccord entre les bobines Circulation, Collodi, Chansons et Économie ;
- manifeste Phase 5 intact, avec 69 entrées encore `partiel` ou `absent` ;
- présence du dossier de transmission complet de la Phase 4.

Le contrôle n’exécute pas une seconde fois les vérificateurs spécialisés. Il
garantit leur branchement commun et les invariants qui n’appartiennent à aucun
contrat isolé.

## Mesures de sortie

| Mesure                                   | Résultat |
| ---------------------------------------- | -------: |
| Archives publiques                       |       79 |
| Routes canoniques                        |       79 |
| Familles publiques                       |        4 |
| Entrées du manifeste Phase 5 non migrées |       69 |
| Œuvres sources privées                   |        2 |
| Chansons privées                         |        2 |
| Musiques privées                         |        1 |
| Dossiers média privés                    |        4 |
| Dossiers économiques privés              |        5 |
| Données économiques dérivées d’essai     |        1 |

## Documentation transmise

- [`migration.md`](./migration.md) ordonne les lots, conditions de retrait et
  replis de la Phase 5 ;
- [`cloture.md`](./cloture.md) porte le verdict, les mesures et les passages
  vers les Phases 5, 6, 7 et 9 ;
- le chapitre Architecture du Guidebook IA expose les nouveaux domaines et
  leurs sources de vérité ;
- le README énumère les contrats internes et la chaîne de vérification réelle.

## Frontière tenue

Le Train n’a créé ni nouvelle fiche publique, ni nouvelle famille, ni route,
ni migration du manifeste. Les bobines restent sous `scripts/fixtures` et les
dossiers d’enquête ou de droits ne deviennent jamais des données client.

## Verdict

Le Train 4F est **validé** lorsque `pnpm check` et `pnpm check:ci` sont verts
sur l’état final, que les raccords Notion concordent avec ce dossier et que le
WIP voisin demeure hors des commits proposés. La Phase 4 peut alors remettre
ses contrats à la Phase 5.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Tous les contrats tiennent la même projection. Le corpus peut désormais
changer de bobine sans perdre ses traces._
