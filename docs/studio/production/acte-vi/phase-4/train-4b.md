# Acte VI · Phase 4 · Train 4B

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Mission

Le Train 4B installe le premier contrat exécutable de la Phase 4. Il distingue
les sorties, versions, exploitations et réceptions sans migrer les Archives
publiques ni casser les lectures de _Blanche-Neige_ et des cinq Plans.

## Livrables

- `src/types/documentaire.ts` porte la provenance et la portée territoriale
  communes ;
- `src/types/circulation-oeuvre.ts` ferme les vocabulaires de circulation et
  de réception ;
- `src/types/oeuvre.ts` accueille ces matières comme extensions optionnelles ;
- `scripts/fixtures/oeuvre-circulation.json` fournit une bobine privée ;
- les vérificateurs Œuvres et Plans contrôlent formes, références,
  compatibilité et contrechamp ;
- les adaptateurs Plans projettent les nouvelles temporalités sans devenir
  leur source de vérité ;
- [`contrat-circulation-reception.md`](./contrat-circulation-reception.md)
  transmet les décisions du modèle.

## Décisions du train

1. Les anciennes sorties restent valides ; la migration est progressive.
2. Les nouvelles unités ont des identifiants stables et des sources propres.
3. Pays, monde, zone et portée non précisée sont quatre réalités distinctes.
4. Une version réutilise l’identité documentée de la Phase 3.
5. Une réception conserve son témoin, sa temporalité, sa qualification et son
   résumé plutôt qu’un score synthétique.
6. La date canonique d’une Œuvre ne double pas ses sorties détaillées dans le
   Montage du temps.
7. Les données de décision restent dans une fixture privée ; aucune fiche
   _Pinocchio_ n’est publiée.

## Contrôles exécutables

Le vérificateur Œuvres contrôle :

- les vocabulaires fermés ;
- les identifiants et références croisées ;
- les dates, périodes, langues et territoires ;
- la provenance de chaque déclaration ;
- la compatibilité des 23 fiches et des deux fixtures privées.

Le vérificateur de matière des Plans contrôle en plus :

- trois sorties, trois exploitations et trois réceptions projetées ;
- trois preuves par nouvelle famille documentaire ;
- la place des exploitations sur la piste Diffusion ;
- la place des réceptions sur la piste Reconnaissance ;
- la qualification et la portée mondiale dans la Table lumineuse ;
- la datation honnête d’une réévaluation rétrospective.

## Critères de clôture

- [x] Les quatre matières ne sont plus confondues.
- [x] Les 23 Œuvres publiques restent valides sans migration.
- [x] _Blanche-Neige_ conserve son rendu et ses identifiants de Plans.
- [x] La bobine privée traverse événements, preuves, Montage du temps et Table
      lumineuse.
- [x] Les réserves et qualifications demeurent lisibles dans le contrechamp.
- [x] Aucun catalogue, route ou famille publique n’est ajouté.
- [x] Les WIP du Guidebook et du dossier d’équipe restent hors du train.

## Passage au Train 4C

Le Train 4C peut maintenant autonomiser les Œuvres sources et leurs relations.
Il devra partir de `Schneewittchen` et de _Le avventure di Pinocchio_, créer un
registre privé identifiable, puis conserver la projection actuelle de
`RelationOeuvre` sans ouvrir de route publique ni étendre `CodexFamily`.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Le film voyage, change de voix et rencontre d’autres regards ; les Archives
savent maintenant garder chaque temps à sa place._
