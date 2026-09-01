# Acte VI · Phase 4 · Contrat des données économiques

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Intention

Ce contrat applique `DEC-008` : un chiffre n’entre pas dans la projection
parce qu’il paraît précis, mais parce que sa mesure, sa valeur originale, son
unité, son temps, son territoire, sa méthode et sa provenance peuvent être lus
ensemble.

La donnée projetable et le dossier d’enquête sont volontairement séparés. Le
premier ne connaît que la déclaration complète ; le second peut conserver une
piste incomplète, son verdict et les dimensions qui manquent encore sans les
transmettre au navigateur.

## Neuf mesures qui ne se remplacent pas

`NatureMesureEconomiqueOeuvre` ferme le vocabulaire suivant :

- `budget-annonce` ;
- `cout-production` ;
- `recette-brute-guichet` ;
- `location-distributeur` ;
- `revenu-studio` ;
- `benefice` ;
- `perte` ;
- `entrees` ;
- `classement`.

Le contrat associe les mesures monétaires à une devise et une année
monétaire, les entrées à l’unité `entrees` et le classement à l’unité `rang`.
Une entrée ne peut donc pas être prise pour une devise, et une recette brute
ne peut pas devenir silencieusement le revenu ou le bénéfice du studio.

## La déclaration projetable

`DonneeEconomiqueOeuvreStructuree` porte obligatoirement :

- un identifiant et une version de schéma ;
- la mesure exacte ;
- une valeur originale ou une fourchette explicitement déclarée ;
- l’unité et, pour un montant, la devise et l’année monétaire ;
- une portée territoriale structurée ;
- une date, une période ou un cumul ;
- la base comptable ou statistique ;
- une méthode et les sources qui la documentent ;
- la certitude ;
- la comparabilité admise ou refusée et son motif ;
- une finalité éditoriale ;
- les sources de la déclaration ;
- la réserve ou le conflit lorsqu’ils sont nécessaires.

Une fourchette n’est valide que si la source ou la méthode la donne comme
telle. Deux déclarations divergentes ne deviennent jamais ses bornes.

## Déclaration originale et donnée dérivée

La valeur nominale reste la première matière conservée.
`DonneeEconomiqueDeriveeOeuvre` représente séparément une conversion, une
actualisation ou une agrégation. Elle référence les déclarations dont elle
dérive et exige :

- la formule ;
- les sources méthodologiques ;
- la date du calcul ;
- la date ou période de l’indice ou du taux ;
- l’année de base éventuelle ;
- la convention d’arrondi ;
- la finalité éditoriale.

La bobine conserve une actualisation hypothétique dépourvue de source
méthodologique. Elle n’entre dans aucune projection et ne remplace aucune
valeur nominale.

## Le dossier privé d’enquête

`DossierEnqueteEconomiquePrive` peut conserver une déclaration partielle. Il
porte en plus :

- l’Œuvre concernée, publiée ou privée ;
- le caractère `factuel`, `hypothetique` ou `incomplet` de la matière ;
- le verdict de publication ;
- les dimensions manquantes ;
- les sources réellement évaluées ;
- une note interne et les repères de vérification éventuels.

Les quatre verdicts restent ceux de `DEC-008` :

| Verdict                    | Effet de projection                                                   |
| -------------------------- | --------------------------------------------------------------------- |
| `publishable`              | La déclaration complète rejoint la projection.                        |
| `publishable-with-reserve` | La déclaration complète et sa réserve restent visibles ensemble.      |
| `investigation-only`       | La piste demeure privée ; aucune donnée n’est transmise.              |
| `excluded`                 | Le rejet est conservé dans l’enquête ; la projection indique l’exclu. |

Un verdict humain trop permissif ne contourne pas le contrat. Une dimension
critique absente force `non-publiee`, même si le dossier réclame
`publishable`.

## La frontière publique

`projeterDossierEconomiquePublic` renvoie uniquement :

- un statut public ;
- une `DonneeEconomiqueOeuvreStructuree` complète, ou `null`.

La sortie ne contient jamais note interne, liste de lacunes, sources évaluées,
responsable de vérification, formulation de travail ni caractère de
l’enquête. La fonction recopie explicitement les champs publics au lieu de
sérialiser le dossier privé.

## Compatibilité de Blanche-Neige

La forme historique reste lisible pendant la transition sous le nom
`DonneeEconomiqueOeuvreHistorique`. L’union `DonneeEconomiqueOeuvre` permet à
la fiche et aux Plans de lire l’ancien et le nouveau contrat, tandis que
`lireDonneeEconomiqueOeuvre` produit une lecture commune.

`adapterDonneeEconomiqueHistorique` conserve chacune des quatre déclarations
de _Snow White and the Seven Dwarfs_ sans compléter les dimensions absentes :

- `revenus` ne reçoit aucune mesure plus précise par supposition ;
- une devise ne reçoit aucune année monétaire depuis la seule période ;
- méthode, base, comparabilité et finalité ne sont jamais inventées ;
- les quatre valeurs restent identiques et séparées ;
- le verdict reste `investigation-only`.

Cette compatibilité est bornée. La Phase 5 devra migrer l’échantillon public,
faire passer tous ses consommateurs sur la forme structurée, puis retirer la
forme historique.

## Bobines privées de décision

[`scripts/fixtures/donnees-economiques.json`](../../../../../scripts/fixtures/donnees-economiques.json)
porte cinq dossiers et une donnée dérivée :

### _Pinocchio_ · fréquentation française

Le cumul CNC de 7,84 millions d’entrées conserve la France, la période
1946–2010, la base cumulative, la méthode rapportée, sa finalité et une réserve
indissociable. Il devient `publiee-avec-reserve`, jamais « entrées de 1946 ».

### _Blanche-Neige_ · deux coûts

Les valeurs de 1,4 million et 1 488 423 dollars demeurent deux déclarations,
deux sources et deux dossiers reliés par un groupe de conflit. Leur méthode et
leur périmètre incomplets maintiennent les deux en enquête. Aucune moyenne ni
fourchette n’est produite.

### _Blanche-Neige_ · fréquentation incomplète

Les vingt millions d’entrées conservent leur période, mais leur territoire
reste explicitement non précisé. La donnée demeure privée au lieu de fabriquer
une portée mondiale.

### Contre-exemples

Un dossier réclame volontairement la publication d’une perte privée de temps,
base, méthode et comparabilité : la projection le neutralise. Une
actualisation hypothétique rappelle parallèlement qu’une formule sans source
méthodologique ne produit aucun chiffre public.

## Bobine intégrée de Phase 4

La fixture relie par identifiant :

- la circulation privée de _Pinocchio_ ;
- son Œuvre source de Collodi ;
- _When You Wish Upon a Star_ ;
- la fiche publiée de _Snow White and the Seven Dwarfs_.

Elle ne fusionne pas leurs contrats. Elle prouve seulement que les quatre
domaines peuvent être retrouvés dans la même bobine de production sans ouvrir
une route ni compter une fixture comme Archive.

## Invariants exécutables

Le vérificateur contrôle que :

- mesure, unité et certitude utilisent des vocabulaires fermés ;
- chaque source de déclaration ou de méthode est connue ;
- le cumul CNC conserve 1946–2010 et sa réserve ;
- les deux coûts restent distincts, attribués et non moyennés ;
- une fréquentation sans territoire et un dossier incomplet restent privés ;
- les clés d’enquête ne traversent pas la projection ;
- l’adaptateur préserve exactement les quatre valeurs historiques ;
- la fiche et les Plans peuvent encore les lire ;
- la donnée dérivée hypothétique ne remplace aucune valeur nominale ;
- les quatre bobines de Phase 4 se raccordent par identité ;
- les 79 fiches publiques restent présentes ;
- aucun catalogue économique public n’est créé.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Un chiffre n’est pas une conclusion : c’est une déclaration située, mesurée
et attribuée, ou une piste qui reste honnêtement dans l’ombre._
