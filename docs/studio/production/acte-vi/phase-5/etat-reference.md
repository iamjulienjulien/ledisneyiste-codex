# Acte VI · Phase 5 · État de référence de la rétroapplication

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Fonction du document

Ce relevé ouvre le Train 5A. Il fixe l’état réel du dépôt avant la première
écriture produit de la Phase 5 et sépare deux responsabilités :

- le manifeste de Phase 2 demeure la photographie immuable de l’audit ;
- [`migration.json`](./migration.json) devient le journal vivant des 69
  verdicts de rétroapplication.

Le Train 5A n’enrichit aucune Archive, ne crée aucun catalogue et ne modifie
aucune route. Il installe la mesure qui permettra de prouver chaque passage.

## Verdict d’ouverture

Les fondations des Phases 3 et 4 sont prêtes à passer à l’échelle. La
projection d’identité voyage déjà entre catalogues, fiches, recherche et
surfaces. Les huit contrats documentaires sont éprouvés sur des bobines
privées. Le travail restant est donc une migration bornée, pas une refonte
générale du Codex.

Trois coutures doivent être surveillées dès le premier lot :

1. **Chansons** possède un contrat et ses Symboles, mais aucune famille, donnée
   ou route publique ;
2. les **69 entrées** du manifeste n’ont encore aucun verdict d’exécution ;
3. les **45 routes historiques** des Œuvres et Personnages doivent survivre à
   toute forme localisée.

## État chiffré au 2 septembre 2026

| Repère                                        | Référence |
| --------------------------------------------- | --------: |
| Familles publiques                            |         4 |
| Archives et fiches publiques                  |        79 |
| Routes canoniques de détail                   |        79 |
| Routes historiques protégées par le manifeste |        45 |
| Formes identitaires documentées               |        15 |
| Notices du registre central des sources       |       181 |
| Contrats documentaires de Phase 4             |         8 |
| Chansons publiées                             |         0 |
| Symboles disponibles dans `index/chansons`    |         9 |
| Entrées suivies par la Phase 5                |        69 |
| Verdicts rendus à l’ouverture                 |         0 |

## Répartition de la bobine

| Train     | Matière                                            | Entrées |
| --------- | -------------------------------------------------- | ------: |
| 5B        | Chansons rétrospectives                            |       4 |
| 5C        | Échantillon R3 · _Snow White and the Seven Dwarfs_ |       1 |
| 5D        | Autres Œuvres R2                                   |      22 |
| 5E        | Personnages R2                                     |      22 |
| 5F        | Créateurs et Époque                                |      20 |
| **Total** |                                                    |  **69** |

Le manifeste contient 68 entrées R2 et une entrée R3. Quatre Chansons sont
absentes du produit ; les 65 autres entrées sont décrites comme partielles.
Ces états d’audit ne sont pas des verdicts de migration.

## Contrat des verdicts

Le journal distingue cinq états :

- `a-faire` : entrée mesurée, aucun verdict rendu ;
- `en-cours` : entrée appartenant au Train actif ;
- `migree` : structure cible écrite, sourcée et vérifiée ;
- `inchangee` : contrat déjà satisfait ou aucune modification honnête à
  produire ;
- `reportee` : condition de reprise explicitement transmise.

Une phase complète possède 69 verdicts, mais ne fabrique jamais 69 mutations
pour atteindre un compteur. L’Époque et les contributions propres à
_Pinocchio_ pourront ainsi être reportées à la Phase 6 sans être présentées
comme des échecs ou des données déjà produites.

## Garde-fous installés

`check:phase-5` vérifie dès l’ouverture :

- l’empreinte SHA-256 du manifeste de Phase 2 ;
- la jointure exacte des 69 entrées, profils, profondeurs et états de départ ;
- les compteurs calculés depuis les statuts réels ;
- la présence d’une preuve, de contrôles et d’une condition de reprise selon
  chaque verdict ;
- l’inventaire public réellement projeté ;
- la conservation des 45 routes historiques ;
- la présence du suivi Phase 5 dans `check` et `check:ci`.

## Travaux extérieurs préservés

Les modifications déjà présentes dans le Guidebook Notion et la fiche de
poste du Tech Lead demeurent hors de ce Train. Elles n’ont été ni formatées,
ni intégrées au journal, ni préparées pour un commit Phase 5.

## Passage au Train 5B

Le prochain Train peut ouvrir verticalement la cinquième famille publique :
contrat, sources centrales, quatre Chansons, index, routes, fiches, recherche
et frontières de confidentialité. Il commencera seulement après validation du
présent Train et de son découpage de commits.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Soixante-neuf raccords sont maintenant sur la feuille de continuité. Aucun ne
pourra disparaître entre deux plans._
