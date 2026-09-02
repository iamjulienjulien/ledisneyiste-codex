# Acte VI · Phase 5 · Train 5G

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Mission

Le Train 5G repasse les surfaces publiques après les soixante-neuf verdicts
du manifeste. Il vérifie que navigation, index, Cards, fiches, relations,
recherche, filtres et Plans projettent tous la même identité résolue et la même
route canonique, sans reconstruire localement un nom ou un chemin.

Ce Train ne remplace pas la répétition visuelle finale du Train 5H. Il ferme le
raccord structurel, étend la protection automatique aux cinq familles et
transmet les compatibilités encore consommées à la Phase 9.

## Résultat de l’audit des surfaces

| Surface                 | Identité                    | Navigation              | Verdict    |
| ----------------------- | --------------------------- | ----------------------- | ---------- |
| Navigation de référence | Référence typée             | Route canonique commune | Raccordée  |
| Index en liste          | Projection résolue          | Route canonique commune | Conforme   |
| Cards                   | Projection résolue          | Route canonique commune | Raccordées |
| En-têtes de fiche       | Projection résolue          | Route Next.js canonique | Conforme   |
| Métadonnées de fiche    | Projection résolue          | Route Next.js canonique | Raccordées |
| Relations               | Référence typée             | Route canonique commune | Raccordées |
| Recherche et filtres    | Index identitaire commun    | Cards canoniques        | Conforme   |
| Plans                   | Projection identitaire pure | Route canonique commune | Raccordés  |

Les cinq familles — Personnages, Créateurs, Œuvres, Époques et Chansons —
passent désormais par le même contrat sur leurs index, leurs Cards, leurs
fiches et leurs métadonnées. Les Plans restent volontairement limités aux
quatre familles admises par leur grammaire : une Chanson peut apparaître dans
une relation du Codex, mais ne devient pas silencieusement un Sujet de Plan.

## Raccords réalisés

### Un projecteur d’identité pour les Plans

Les nœuds, événements, liens, crédits, preuves et Sujets publiés des Plans ne
reprennent plus directement `nom` depuis un catalogue. Le raccord commun joint
l’entrée à sa fiche, applique `projeterIdentiteCodex` et ne marque la référence
comme résolue que si cette projection existe réellement.

Les Bobines témoins, Œuvres sources, Œuvres extérieures, Récompenses et Sources
gardent leurs contrats propres : elles ne sont pas déguisées en Archives
publiées pour satisfaire le raccord.

### Une seule fabrique de routes

Les Cards, les lignes d’index et les références utilisent
`construireRouteCanoniqueCodex`. Les Plans emploient le même contrat lorsqu’un
nœud résolu devient navigable. Le module de navigation demeure indépendant de
la matière identitaire : il connaît une famille et un slug, jamais les
Archives ni leurs formes documentées.

### Les métadonnées rejoignent la projection

Les titres de document des cinq familles viennent maintenant de
`identite.principale.libelle`. L’en-tête visible, la recherche et l’onglet du
navigateur ne peuvent donc plus diverger parce qu’une surface aurait relu le
catalogue de son côté.

### La répétition couvre enfin les cinq familles

Le vérificateur identitaire protège désormais la Card Chanson, son index, sa
fiche et ses métadonnées. Il refuse aussi :

- une esquisse `PixieDust` dans les surfaces publiques du Codex ;
- une URL de référence reconstruite dans un composant ;
- un libellé de nœud publié reconstruit depuis `entry.nom` dans les Plans ;
- une métadonnée de fiche qui contourne l’identité résolue.

## Compatibilités transmises à la Phase 9

Aucune compatibilité n’est supprimée au Train 5G : chacune possède encore au
moins un consommateur ou attend une matière documentaire absente. Leur maintien
est explicite et ne vaut pas pérennisation.

| Compatibilité conservée                     | Consommateurs actuels                            | Propriétaire    | Condition de retrait                                                                                                                  |
| ------------------------------------------- | ------------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `sortie.evenements[].territoire` historique | Détails d’Œuvre, événements et preuves des Plans | Phase 9         | Les vingt-trois Œuvres utilisent `porteeTerritoriale` et aucun lecteur ne consulte l’ancien champ.                                    |
| Durées historiques sans version structurée  | Détails d’Œuvre et Table lumineuse               | Phase 9         | Chaque durée réelle est rattachée à une version documentée et les surfaces lisent le nouveau contrat.                                 |
| Mentions libres d’Œuvres extérieures        | Relations d’Œuvre et Plans                       | Phase 9         | Chaque mention migrable possède une preuve et une `oeuvre-source` résolue ; les exceptions restantes sont assumées comme extérieures. |
| Rôles musicaux libres                       | Génériques d’Œuvre et Générique vivant           | Phases 7 puis 9 | Les attributions musicales structurées sont publiées, consommées et vérifiées avant retrait du texte historique.                      |
| Données économiques historiques             | Détails d’Œuvre, preuves et Table lumineuse      | Phase 9         | Les quatre déclarations de _Blanche-Neige_ sont qualifiées et tous les consommateurs lisent exclusivement le contrat structuré.       |

Le nom libre d’une `ReferenceCodex` non résolue n’est pas un shim à supprimer :
il conserve honnêtement une mention documentaire tant que sa cible n’existe
pas. Seules les références publiées passent par le projecteur commun.

## Continuité de projection

La structure a été éprouvée sur les deux types de largeur par les contrats
responsives existants, sans ajouter de branche de surface. La vérification
visuelle des cinq familles en cadres étroit et large, puis en Lumières sombre
et claire, reste le point de contrôle humain du Train 5H. Aucun résultat visuel
n’est déclaré avant cette revue.

## Critères de clôture du Train

- [x] Les cinq Cards projettent une identité déjà résolue.
- [x] Les cinq index utilisent les routes canoniques communes.
- [x] Les cinq fiches partagent identité visible et métadonnée de document.
- [x] Les relations ne reconstruisent plus leurs routes localement.
- [x] Recherche et filtres continuent de consommer l’index identitaire commun.
- [x] Les Plans projettent leurs Sujets et nœuds publiés par le raccord commun.
- [x] Aucune surface publique ne dépend d’une esquisse `PixieDust`.
- [x] Aucune compatibilité possédant encore un consommateur n’est supprimée.
- [x] Chaque compatibilité conservée possède un propriétaire et une condition
      de retrait en Phase 9.
- [x] Le WIP extérieur au chantier demeure intact.

## Passage au Train 5H

Le Train 5H peut maintenant conduire la répétition générale : cinq familles,
deux largeurs, deux Lumières, routes directes et historiques, navigation
clavier, titres longs et états vides. Il mettra à jour la documentation
publique et produira le rapport final de Phase 5 sans rouvrir les verdicts déjà
scellés.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Cinq familles regardent désormais le même écran. Les raccords anciens restent
nommés jusqu’au jour où leur dernière bobine pourra vraiment être retirée._
