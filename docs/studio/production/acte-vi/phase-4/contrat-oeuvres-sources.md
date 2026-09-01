# Acte VI · Phase 4 · Contrat des Œuvres sources

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Intention

Ce contrat permet à une Œuvre extérieure au catalogue Disney d’exister comme
objet documentaire autonome, identifiable et vérifiable, sans devenir une
cinquième famille publique du Codex.

_Le avventure di Pinocchio_ peut ainsi être résolu comme source de
_Pinocchio_ tout en restant absent des index, de la recherche publique et des
routes. `Schneewittchen` conserve parallèlement sa projection historique tant
que sa fiche publique n’est pas migrée.

## Deux niveaux, une identité

### L’entrée légère

`EntreeOeuvreSource` porte les informations nécessaires à une collection ou à
une projection :

- un `id` documentaire stable ;
- un `slug` canonique réservé à une éventuelle route future ;
- le titre principal ;
- la nature de l’Œuvre ;
- sa date documentée.

L’existence du slug ne crée aucune route. Il préserve l’identité qui pourra
être routée plus tard sans renommer l’Archive.

### La fiche interne

`FicheOeuvreSource` ajoute :

- l’identité originale documentée ;
- les identités localisées, internationales ou territoriales éventuelles ;
- les auteurs et leur rôle ;
- la date et sa précision réelle ;
- la nature et le support ;
- les sources propres à chaque déclaration ;
- une note de réserve lorsque la matière le nécessite.

Le contrat réutilise `IdentiteDocumenteeCodex`, `DateHistorique` et
`ProvenanceDocumentaireCodex`. Il ne crée pas une seconde grammaire pour les
langues, territoires, dates ou sources.

## Le registre interne

`RegistreOeuvresSources` associe les entrées légères à leurs fiches. Le
registre n’est pas importé par les Archives publiques : il est injecté
explicitement dans une vue de travail serveur lorsqu’un prototype ou un
vérificateur doit résoudre une relation privée.

La résolution exige que l’identifiant et le slug déclarés correspondent à la
même fiche. Un identifiant absent ou un slug discordant produit une référence
non résolue.

## La relation compatible

`ReferenceOeuvreLiee` admet désormais trois cibles :

1. une Œuvre Disney publiée ;
2. une mention extérieure légère, conservée pour compatibilité ;
3. une Œuvre source privée identifiée par `id` et `slug`.

`RelationOeuvre` reste le contrat lu par la fiche et les Plans. Chaque relation
porte une nature fermée et ses propres sources. Le vocabulaire couvre
désormais aussi `inspiration` et `influence`, en plus de la source, de la
préparation, de l’adaptation et des prolongements déjà connus.

Une proximité graphique ne devient jamais une relation. Une relation privée
résolue n’est pas davantage une autorisation de publication.

## Projection dans les Plans

Les Plans reconnaissent `oeuvre-source` comme une nature de nœud interne :

- le nœud est résolu lorsque sa fiche existe dans le registre injecté ;
- il conserve titre, date, nature, support, auteurs et provenance ;
- il n’est jamais un Sujet publié ;
- le Travelling peut l’ordonner comme origine ;
- le Plan d’ensemble le classe parmi les Œuvres ;
- aucune fabrique de `href` ne lui associe une route.

La matière publique actuelle reste inchangée lorsque le registre n’est pas
fourni. Les 274 nœuds et 375 liens historiques des Plans conservent ainsi leur
identité.

## Compatibilité de Blanche-Neige

La relation de _Snow White and the Seven Dwarfs_ vers `Schneewittchen` reste
une `oeuvre-exterieure` pendant ce train. Son identifiant de projection reste
`oeuvre-exterieure:schneewittchen-1812` et son absence de lien reste visible.

La bobine privée possède néanmoins une fiche source de `Schneewittchen`. Elle
prouve que le même sujet pourra être migré ultérieurement sans modifier
`CodexFamily` ni ouvrir prématurément une route.

## Bobine privée de décision

[`scripts/fixtures/oeuvres-sources.json`](../../../../../scripts/fixtures/oeuvres-sources.json)
contient :

- _Le avventure di Pinocchio_, son titre français, Carlo Collodi, sa date, sa
  nature, son support et ses sources ;
- `Schneewittchen`, ses deux auteurs, sa date et son identité française ;
- une Œuvre Disney témoin qui déclare une adaptation de Collodi ;
- quatre notices bibliographiques privées nécessaires à la fixture.

La bobine ne rejoint ni `src/data`, ni un catalogue, ni une route.

## Invariants vérifiés

- les identifiants et slugs privés sont uniques ;
- l’identité principale est originale et toutes les identités sont sourcées ;
- auteurs, dates, natures et supports utilisent des vocabulaires fermés ;
- chaque relation possède une nature et des sources connues ;
- une cible déclarée est résolue par identifiant et slug ;
- une cible absente reste non résolue ;
- une Œuvre source résolue ne reçoit aucun `href` ;
- Collodi traverse le Travelling et le Plan d’ensemble ;
- la relation historique de _Blanche-Neige_ conserve son identifiant ;
- les 23 fiches Œuvres et les Plans publics restent valides.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Une source peut entrer dans les Archives avant d’entrer dans la lumière ; son
identité existe déjà, sa route attend encore._
