# Acte VI · Phase 9 · État de référence

> **Document interne de production**  
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Objet

Le Train 9A photographie l’Acte VI après la clôture de ses huit premières
Phases. Cette mesure ne rouvre aucun chantier : elle vérifie que les acquis
transmis par chaque Phase existent encore dans le dépôt avant la stabilisation
finale.

## Repères du cycle

| Repère                  | État observé                                                   |
| ----------------------- | -------------------------------------------------------------- |
| Ouverture de l’Acte VI  | `f784e96` · _Pinocchio ouvre les œuvres sur leur vie publique_ |
| Dernière Phase terminée | Phase 8 · Éprouver le Générique vivant                         |
| Dernière transmission   | `5385943` · la Phase 8 remet le Générique vivant à la Phase 9  |
| État de la Phase 9      | Train 9A · photographie finale en cours                        |
| Clôture temporelle      | Réservée à Julien après changelog et validation de la Phase 9  |

## Photographie du Codex

| Famille publique | Archives | Routes canoniques |
| ---------------- | -------: | ----------------: |
| Personnages      |       33 |                33 |
| Créateurs        |       41 |                41 |
| Œuvres           |       24 |                24 |
| Époques          |        2 |                 2 |
| Chansons         |        9 |                 9 |
| **Total**        |  **109** |           **109** |

Le total transmis par les Phases 6 à 8 reste donc inchangé. Les cinq familles
publiques demeurent les seules familles de routes du Codex.

## Concordance des transmissions

| Phase | Acquisition remise à la Phase 9                               | État dans le dépôt |
| ----: | ------------------------------------------------------------- | ------------------ |
|     0 | Guidebook privé et trois Écrans documentaires promus          | Concordant         |
|     1 | Projection Pixie et quatre territoires de composants Codex    | Concordant         |
|     2 | Onze arbitrages et corpus de l’Acte bornés                    | Concordant         |
|     3 | Identités documentées, recherche jointe et routes stables     | Concordant         |
|     4 | Contrats documentaires étendus pour l’œuvre et sa circulation | Concordant         |
|     5 | Cinq familles publiques et rétroapplication terminée          | Concordant         |
|     6 | Noyau documentaire de _Pinocchio_ et 31 contributions         | Concordant         |
|     7 | Récit en huit chapitres, preuves et réserves                  | Concordant         |
|     8 | `PlanGeneriqueVivant` v1.0.0 et six primitives Focale bornées | Concordant         |

Chaque ligne est reliée à une clôture de Phase présente sous
`docs/studio/production/acte-vi/`. Le vérificateur Phase 9 protège cette chaîne
ainsi que les invariants publics qui en découlent.

## Invariants de clôture

- les 109 Archives conservent chacune leur route canonique ;
- _Pinocchio_ conserve 31 contributions dans 8 domaines, dont 30 références
  résolues et Evelyn Venable comme mention non publiée ;
- `PlanGeneriqueVivant` reste la seule application publique d’un Plan, limitée
  à _Pinocchio_ et réversible vers le générique simple ;
- Focale reste borné à `FocaleScale`, `FocaleMark`, `FocaleLegend`,
  `FocaleAnnotation`, `FocaleViewport` et `FocaleTable` ;
- aucun composant `PixieGeneriqueVivant` n’existe ;
- le workflow commun des Plans, `FocaleTooltip`, les autres Plans publics et
  la matière de _Fantasia_ restent hors de la Phase 9.

## Première conclusion

Aucun défaut bloquant n’est identifié par la photographie du Train 9A. Le
Train 9B devra confirmer cette absence avec la répétition complète ; il ne
créera un raccord que si un contrôle révèle une régression appartenant à
l’Acte VI.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**  
_109 Archives · 109 routes · 9 Phases raccordées · aucun chantier rouvert._
