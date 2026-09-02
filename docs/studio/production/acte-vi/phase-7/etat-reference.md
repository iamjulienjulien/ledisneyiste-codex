# Acte VI · Phase 7 · État de référence du récit et des preuves

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Fonction du document

Ce relevé ouvre le Train 7A avant l’écriture des huit chapitres de
_Pinocchio_. Il fixe l’état réel des blocs éditoriaux, le relais reçu de la
Phase 6 et les frontières que la nouvelle chaîne de preuves doit préserver.

La Phase 7 n’ouvre aucune nouvelle famille. Elle fait évoluer la capacité
narrative des fiches sans transformer le récit en second registre de faits.

## Verdict d’ouverture

Le noyau documentaire est prêt : 109 Archives publiques occupent autant de
routes canoniques. La fiche de _Pinocchio_ possède déjà sa circulation, ses
trois territoires de réception, son œuvre-source, ses crédits, ses chansons
et ses récompenses. Elle ne possède encore aucun bloc éditorial propre : les
huit chapitres appartiennent entièrement à cette Phase.

Le Codex projette actuellement **210 blocs éditoriaux** et **549 paragraphes**
historiques dans les cinq familles. Tous ces paragraphes sont des chaînes et
leurs citations vivent au niveau du chapitre. Le contrat du Train 7A doit
donc rester rétrocompatible : la migration de Pinocchio ne doit imposer
aucune réécriture de ce patrimoine.

## État chiffré au 2 septembre 2026

| Repère                                   | État de référence |
| ---------------------------------------- | ----------------: |
| Familles publiques                       |                 5 |
| Archives et routes canoniques            |               109 |
| Sources centrales                        |               237 |
| Blocs éditoriaux existants               |               210 |
| Paragraphes éditoriaux existants         |               549 |
| Paragraphes structurés dans les Archives |                 0 |
| Chapitres éditoriaux de Pinocchio        |             0 / 8 |
| Récit renforcé de la chanson pilote      |             0 / 1 |

Le registre des Récompenses contient désormais 45 entrées après l’Interlude
Disney Legends. Le rapport de Phase 6 conserve son instantané historique de
16 entrées ; cette différence est attendue et ne constitue pas une dérive.

## Relais documentaire

Les réserves suivantes entrent dans le contrat de la Phase :

- les 7,84 millions d’entrées françaises couvrent le cumul 1946–2010 ;
- le visa du 17 mai 1946 n’est pas une séance de projection ;
- le doublage français de 1975 ne prouve pas seul une ressortie ;
- les données financières initiales restent hors récit tant que leurs
  périmètres ne sont pas comparables ;
- l’interdiction italienne alléguée demeure hors publication ;
- une synthèse territoriale ne doit pas effacer des réceptions divergentes ;
- l’exposition du Walt Disney Family Museum reste privée tant que son usage
  produit et ses droits ne sont pas arbitrés.

La carte préparée en Phase 6 demeure le dossier de travail :
[`../phase-6/carte-preuves.md`](../phase-6/carte-preuves.md). La Phase 7 en
projette une lecture publique dérivée, jamais une copie indépendante.

## Surfaces concernées

| Territoire                     | Responsabilité au Train 7A                  |
| ------------------------------ | ------------------------------------------- |
| `src/types/fiche.ts`           | porter l’union historique / structurée      |
| `src/lib/fiche-editoriale.ts`  | agréger les preuves et dériver leur carte   |
| `CodexFicheBlocsEditoriaux`    | projeter question, preuve et réserve        |
| `CodexFicheSection`            | recevoir l’ancre stable d’un chapitre       |
| `src/lib/plans/evidence.ts`    | ne pas perdre les sources des paragraphes   |
| `scripts/verifier-oeuvres.mjs` | contrôler les sources imbriquées des Œuvres |
| `scripts/verifier-phase-7.mjs` | protéger le contrat de la Phase             |

## Frontières fermées

- aucun chapitre de _Pinocchio_ n’est écrit au Train 7A ;
- aucune source nouvelle n’est promue ;
- aucune fiche historique n’est migrée ;
- aucune représentation graphique de la carte n’est créée ;
- aucun Plan de l’Atelier n’entre dans la fiche publique ;
- aucune responsabilité de la Phase 8 n’est anticipée.

## Passage au Train 7B

Le Train 7B pourra écrire les deux premiers chapitres avec des identifiants
stables, une question explicite, des paragraphes sourcés au plus près et les
réserves déjà transmises. Il n’aura plus à inventer un second registre pour
faire correspondre récit et preuves.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Le récit n’est pas encore écrit. Mais chaque phrase sait désormais où elle
devra retrouver sa preuve._
