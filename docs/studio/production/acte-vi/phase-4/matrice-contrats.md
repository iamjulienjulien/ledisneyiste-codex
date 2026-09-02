# Acte VI · Phase 4 · Matrice des contrats

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Règle de lecture

Cette matrice relie l’état actuel à la cible de la Phase 4. Elle fixe la
responsabilité de chaque train et la stratégie de compatibilité, sans préjuger
des noms TypeScript définitifs que les fixtures devront éprouver.

| Matière             | Contrat actuel                                                                       | Cible minimale                                                                                                                  | Compatibilité exigée                                                                                    | Train propriétaire |
| ------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------ |
| Événement de sortie | date, territoire libre, deux natures, lieu, sources                                  | événement identifié, nature élargie, territoire qualifié, version et mode d’exploitation éventuels                              | projection vers la sortie principale et les événements actuels ; libellé total dans les Plans           | 4B · installé      |
| Exploitation        | implicite dans sortie ou économie                                                    | période ou événement qualifié, territoire, support ou circuit, sources                                                          | aucune déduction automatique depuis une recette                                                         | 4B · installé      |
| Version d’Œuvre     | libellé libre sur la durée                                                           | identité stable reliant titres, langue, territoire, durée et édition                                                            | les anciennes durées restent lisibles pendant la migration                                              | 4B · installé      |
| Réception           | récit éditorial seulement                                                            | déclaration sourcée, datée ou périodisée, territorialisée, qualifiée et réservée                                                | rendu public seulement si la déclaration franchit son seuil de preuve                                   | 4B · installé      |
| Œuvre source        | référence extérieure embarquée                                                       | entrée et fiche privées identifiées, identité documentée, auteurs, date, nature, support et sources                             | la résolution privée ne crée ni route, ni Sujet, ni famille publique                                    | 4C · installé      |
| Relation d’Œuvres   | six natures, cible publiée ou extérieure                                             | relation sourcée entre référence publiée, mention extérieure ou Œuvre source privée                                             | `RelationOeuvre` reste lisible par la fiche et les Plans ; les identifiants historiques restent stables | 4C · installé      |
| Chanson             | absent                                                                               | fiche documentaire, identité, œuvre d’origine, auteurs, occurrences, versions, interprétations, réception, relations et sources | aucune dépendance à un média ; aucun index public en Phase 4                                            | 4D · installé      |
| Musique             | rôles et crédits libres                                                              | attribution structurée vers œuvre ou chanson, domaine musical et sources                                                        | les crédits actuels restent la représentation publique de repli                                         | 4D · installé      |
| Droits média        | politique privée uniquement                                                          | référence privée vers un statut de projection explicite                                                                         | aucune preuve contractuelle ni identifiant confidentiel côté client                                     | 4D · installé      |
| Donnée économique   | trois natures, valeur unique, unité, devise, territoire, période, certitude, sources | mesure précise, valeur ou fourchette, année monétaire, périmètre, méthode, conflit, comparabilité et finalité                   | adaptateur des quatre déclarations de Blanche-Neige ; aucune moyenne fabriquée                          | 4E · installé      |
| Provenance          | listes d’identifiants de sources                                                     | source attachée à chaque déclaration structurée ; réserve visible si nécessaire                                                 | le registre central reste l’unique notice bibliographique                                               | 4B–4E · installé   |

## Répartition des responsabilités

### Contrats communs

Restent communs et réutilisables :

- `DateHistorique` et `PeriodeHistorique` ;
- les identités documentées, langues et territoires de la Phase 3 ;
- les identifiants de sources du registre central ;
- les références publiées existantes ;
- les primitives de provenance et de réserve qui ne portent aucun vocabulaire
  métier.

Le contrat commun ne doit pas devenir un graphe universel. Une sortie, une
occurrence de chanson et une déclaration financière peuvent partager une date
ou une source sans partager artificiellement le même objet métier.

### Contrats spécialisés

Restent spécialisés :

- les sorties, versions, exploitations et réceptions d’une Œuvre ;
- les identités et relations propres aux Œuvres sources ;
- les occurrences, versions, interprétations et relations d’une Chanson ;
- les mesures et règles de comparabilité financières.

Chaque spécialisation doit porter son vocabulaire fermé, son vérificateur et
sa projection vers les surfaces qui la consomment.

### Matière strictement privée

Restent sous `docs/studio` ou dans un registre serveur privé :

- verdicts de publication et notes d’enquête ;
- pièces de droits, titulaires, contrats et identifiants confidentiels ;
- sources candidates non admises dans le registre central ;
- bobines rouges et valeurs volontairement contradictoires ;
- manifeste de rétroapplication avant son train de migration.

## Séquence de migration

1. Ajouter le contrat et ses fixtures sans modifier les Archives publiques.
2. Étendre le vérificateur avec des scénarios rouges, puis verts.
3. Construire une projection compatible vers les consommateurs actuels.
4. Éprouver _Blanche-Neige_ ou une fixture privée de _Pinocchio_.
5. Migrer les consommateurs Plans et UI vers la projection stable.
6. Retirer l’ancienne forme seulement lorsque recherche, routes, fiches,
   Plans et vérificateurs lisent la même vérité.

## Arbitrages déjà fermes

- `CodexFamily` reste limité aux quatre familles publiques actuelles pendant
  la Phase 4.
- Une Chanson doit être publiable sans audio ni paroles.
- Une Œuvre source peut être autonome dans le registre sans posséder de route
  publique.
- Une donnée financière conserve chaque déclaration originale ; une moyenne
  ne résout jamais un conflit.
- Les territoires d’identité gardent leur registre fermé. Les portées
  documentaires comme « Monde » ou « non précisé » ne doivent pas être
  maquillées en codes de pays.
- Les Plans reçoivent des projections dérivées ; ils ne deviennent pas la
  source de vérité des Archives.

## Questions remises à leurs fixtures

| Question                                                                                        | Train qui tranche | Bobine de décision                                     |
| ----------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------ |
| Comment séparer pays, monde et territoire non précisé sans ouvrir un faux code ?                | 4B                | sorties de Pinocchio et données de Blanche-Neige       |
| Une version possède-t-elle un identifiant autonome ou composé depuis œuvre, langue et édition ? | 4B                | durées et sorties localisées                           |
| Quelles natures de réception franchissent un contrat fermé utile ?                              | 4B                | première exploitation, ressortie et réception critique |
| Une Œuvre source partage-t-elle le contrat de fiche d’une Œuvre Disney ?                        | 4C                | _Le avventure di Pinocchio_ et `Schneewittchen`        |
| Quelle frontière sépare occurrence, version et enregistrement d’une Chanson ?                   | 4D · tranché      | _When You Wish Upon a Star_ et sa version française    |
| Quels champs financiers doivent être publics, et lesquels restent des verdicts privés ?         | 4E · tranché      | cas CNC, AFI et deux coûts de Blanche-Neige            |

## Critère de stabilité

Un nouveau contrat est stable lorsqu’il sait :

- porter sa matière sans champ libre qui cache une dimension critique ;
- nommer ses incertitudes sans les transformer en absence ;
- conserver une source par déclaration ;
- produire une projection accessible pour l’UI et les Plans ;
- être vérifié sans dépendre d’une future route publique ;
- laisser les 79 fiches actuelles valides.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Le bon contrat n’aplatit pas les Archives : il donne à chaque matière la
forme exacte dont elle a besoin pour rester honnête._
