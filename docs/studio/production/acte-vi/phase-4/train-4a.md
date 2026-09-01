# Acte VI · Phase 4 · Train 4A

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Mission

Le Train 4A cartographie les contrats documentaires avant leur extension. Il
relie les types, les données, les surfaces, les Plans et les vérificateurs afin
que les trains suivants puissent enrichir le modèle sans créer de deuxième
vérité.

## Livrables

- [`etat-reference.md`](./etat-reference.md) mesure les 79 fiches et détaille
  les contrats réellement employés par les 23 Œuvres ;
- [`matrice-contrats.md`](./matrice-contrats.md) relie chaque forme actuelle à
  sa cible, sa compatibilité et son train propriétaire ;
- [`bobines.md`](./bobines.md) prépare neuf scénarios rouges qui deviendront
  les fixtures des Trains 4B à 4F.

## Décisions du train

1. La migration part des consommateurs, pas seulement des définitions de
   types.
2. _Blanche-Neige_ devient le cas de compatibilité transversal parce qu’elle
   concentre presque toute la matière structurée actuelle.
3. _Pinocchio_, Collodi, _When You Wish Upon a Star_ et une Chanson
   rétrospective restent des fixtures privées jusqu’aux phases de publication.
4. `CodexFamily` ne reçoit aucun domaine qui ne possède pas encore de routes
   publiques.
5. Les contrats partagent dates, identités et provenance ; ils ne partagent
   pas un objet métier universel.
6. Les verdicts financiers et les dossiers de droits restent privés, tandis
   que les réserves indispensables à la compréhension accompagnent la matière
   publique.

## Critères de clôture

- [x] L’état de référence distingue données, types et consommateurs.
- [x] La matrice actuel → cible → compatibilité → propriétaire couvre tous les
      domaines de la Phase 4.
- [x] Les scénarios rouges éprouvent compatibilité, confidentialité et absence
      de nouvelles routes publiques.
- [x] Les deux fichiers WIP du Guidebook restent hors du périmètre du train.
- [x] Aucun type, catalogue, route ou Archive publique n’est modifié.

## Passage au Train 4B

Le Train 4B peut maintenant installer le premier contrat exécutable : sorties,
exploitations, versions et réception. Il devra commencer par les Bobines 01 et
02, décider la portée territoriale sur des cas réels, puis fournir une
projection compatible à la fiche Œuvre et aux Plans avant toute migration de
données publique.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Le réseau est repéré. Le prochain train peut déplacer les aiguillages sans
couper la lumière._
