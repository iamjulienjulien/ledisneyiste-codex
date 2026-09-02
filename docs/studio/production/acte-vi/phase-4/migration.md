# Acte VI · Phase 4 · Recette de migration

> **Document interne de transmission vers la Phase 5**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Fonction du document

La Phase 4 a installé les contrats cibles sans migrer le corpus. Cette recette
décrit comment la Phase 5 pourra adopter ces contrats par lots, mesurer chaque
passage et retirer les formes historiques seulement lorsque tous leurs
consommateurs auront changé de bobine.

Le manifeste de référence demeure
[`../phase-2/retroapplication.json`](../phase-2/retroapplication.json). Ses
69 entrées ne sont ni enrichies ni déclarées migrées par ce document.

## Règle générale

Chaque lot suit le même mouvement :

1. choisir les entrées depuis le manifeste Phase 5 ;
2. relever leur état avant modification ;
3. confirmer les sources nécessaires dans le registre central ;
4. écrire la nouvelle matière dans la fiche propriétaire ;
5. conserver la forme historique tant qu’un consommateur la lit encore ;
6. faire passer les vérificateurs spécialisés et `check:phase-4` ;
7. contrôler routes, recherche, fiche, Plans et bibliographie ;
8. inscrire le verdict du lot dans le manifeste de migration de la Phase 5 ;
9. retirer une ancienne forme uniquement après disparition de tous ses usages.

Une migration structurelle ne constitue pas un enrichissement éditorial. Un
champ inconnu reste absent ou porte une réserve ; il n’est jamais complété par
déduction pour satisfaire le nouveau type.

## Ordre recommandé des lots

| Lot | Matière                                        | Pourquoi cet ordre                                                                                     |
| --- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 1   | Identités déjà jointes                         | Le contrat de Phase 3 est en production et fournit la fondation stable.                                |
| 2   | Sorties, versions, exploitations et réceptions | Le temps public d’une Œuvre doit être structuré avant ses lectures dérivées.                           |
| 3   | Relations vers les Œuvres sources              | Les identifiants privés doivent être stables avant l’ouverture éventuelle d’un domaine public.         |
| 4   | Chansons rétrospectives                        | Le contrat est complet sans média ; les quatre entrées du manifeste peuvent être produites séparément. |
| 5   | Données économiques                            | Les quatre déclarations historiques exigent une enquête avant toute projection structurée.             |
| 6   | Retrait des compatibilités                     | Seulement après validation de tous les consommateurs et compteurs.                                     |

## Sorties, versions, exploitations et réceptions

### Source de départ

- `sortie.date` reste la date canonique de la fiche ;
- les anciens `sortie.evenements` conservent leur forme lisible ;
- les durées historiques ne deviennent pas automatiquement des versions ;
- les récits éditoriaux ne deviennent pas automatiquement des réceptions.

### Migration

- donner un `id` stable à chaque nouvel événement structuré ;
- remplacer le territoire libre par une `porteeTerritoriale` uniquement
  lorsqu’elle est établie ;
- créer une `VersionOeuvre` lorsque langue, territoire, date ou nature
  justifient réellement une identité distincte ;
- créer une `ExploitationOeuvre` pour une période ou un circuit documenté,
  jamais depuis le seul montant d’une recette ;
- créer une `ReceptionOeuvre` seulement avec témoin, temporalité, portée,
  résumé et sources.

### Condition de retrait

La branche historique `territoire: string` d’un événement peut disparaître
quand les 23 Œuvres utilisent `porteeTerritoriale`, que la fiche et les Plans
ne lisent plus l’ancien champ et que le vérificateur refuse toute régression.

## Œuvres sources

### Migration

- créer d’abord l’entrée et la fiche internes avec le même identifiant ;
- réutiliser les identités, langues et territoires de la Phase 3 ;
- remplacer une mention extérieure par une référence `oeuvre-source`
  seulement lorsque la relation et la cible possèdent leurs sources ;
- conserver la mention historique tant que cette preuve manque ;
- ne produire aucun `href` avant l’ouverture explicite d’une route publique.

### Condition d’ouverture

Le domaine ne rejoint `CodexFamily`, les catalogues ou la navigation qu’après
une décision de publication, une route canonique et un vérificateur de
résolution publique. La Phase 5 peut enrichir le registre interne sans prendre
cette décision.

## Chansons et Musiques

### Migration des quatre Chansons rétrospectives

Pour chaque entrée du manifeste :

1. créer l’identité et l’Œuvre d’origine ;
2. attribuer composition, paroles et éventuelle adaptation avec leurs sources ;
3. distinguer version, occurrence, interprétation et enregistrement ;
4. conserver les crédits publics existants comme repli ;
5. publier les métadonnées sans attendre audio ni paroles ;
6. garder chaque dossier de droits et ses preuves hors du navigateur.

### Frontière Musiques

Une partition ou une composition instrumentale utilise le contrat Musiques.
Elle ne devient pas une Chanson sans occurrence lyrique documentée. Les rôles
libres existants restent lisibles jusqu’à leur migration ; ils ne sont pas
convertis automatiquement en attributions musicales.

## Données économiques

### Les quatre déclarations historiques de Blanche-Neige

L’adaptateur `adapterDonneeEconomiqueHistorique` conserve aujourd’hui chaque
valeur et la place en enquête privée. Pour la migrer vers
`DonneeEconomiqueOeuvreStructuree`, il faut établir séparément :

- la mesure exacte ;
- la valeur ou la fourchette déclarée sans moyenne ;
- la devise et son année pour une somme monétaire ;
- le territoire ;
- l’instant, la période ou le cumul ;
- la base de mesure ;
- la méthode et ses sources ;
- la certitude et la comparabilité ;
- la finalité éditoriale ;
- toute réserve ou tout conflit.

Une déclaration qui ne franchit pas ce seuil reste `investigation-only`. Deux
coûts divergents deviennent deux déclarations reliées par un groupe de conflit,
jamais une moyenne ni une fourchette fabriquée.

### Condition de retrait

`DonneeEconomiqueOeuvreHistorique` peut disparaître lorsque :

- les quatre déclarations de Blanche-Neige ont reçu un verdict documenté ;
- aucune fiche JSON n’utilise encore `nature`, `valeur`, `territoire` et
  `periode` sous leur ancienne forme ;
- `CodexFicheOeuvreDetails`, la collecte de preuves et la Table lumineuse
  lisent exclusivement le contrat structuré ;
- le vérificateur économique refuse la réintroduction de la forme historique.

## Contrôles par lot

```bash
pnpm check:identites
pnpm check:oeuvres
pnpm check:oeuvres-sources
pnpm check:chansons
pnpm check:donnees-economiques
pnpm check:phase-4
pnpm check:relations
pnpm check:plan-matter
pnpm check:ci
```

Le lot est rejeté si un compteur public change sans décision, si une nouvelle
route apparaît sans contrat, si une fixture rejoint `src/data`, si une source
est recopiée ou si une donnée privée traverse sa projection.

## Repli et reprise

Chaque entrée migrée reste un changement Git réversible. En cas de régression :

- revenir au dernier lot vert sans effacer les sources réunies ;
- conserver le verdict `reporté` dans le suivi Phase 5 ;
- nommer le consommateur ou la dimension qui bloque ;
- garder la projection historique tant qu’elle reste honnête ;
- reprendre seulement lorsque la condition de sortie est vérifiable.

## Transmission

La Phase 5 possède la migration et ses compteurs. Les Phases 6 et 7 utilisent
les contrats stabilisés pour produire _Pinocchio_ et son récit public. La
Phase 9 retire les compatibilités encore présentes uniquement après une
répétition transversale.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_On ne change pas de modèle en oubliant l’ancienne image : on garde le raccord
jusqu’à ce que toute la salle voie la même bobine._
