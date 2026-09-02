# Acte VI · Phase 5 · Train 5A

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Mission

Le Train 5A met la rétroapplication sous contrôle avant toute écriture dans
les Archives publiques. Il transforme le manifeste transmis par la Phase 2 en
une bobine d’exécution mesurable sans altérer sa photographie d’audit.

## Livrables

- [`etat-reference.md`](./etat-reference.md) mesure le point de départ et
  explique la sémantique des verdicts ;
- [`migration.json`](./migration.json) suit explicitement les 69 entrées et
  leur Train propriétaire ;
- `scripts/verifier-phase-5.mjs` contrôle manifeste, journal, routes,
  progression et branchement à la répétition générale ;
- `check:phase-5` rejoint `check` et `check:ci` après le contrôle de Phase 4.

## Décisions du Train

1. Le manifeste `phase-2/retroapplication.json` est immuable et protégé par
   son empreinte SHA-256.
2. Un nouveau journal possède l’état d’exécution ; aucune clé de migration
   n’est ajoutée rétrospectivement au manifeste d’audit.
3. Les 69 entrées reçoivent un verdict, mais seules les modifications
   documentées deviennent des migrations.
4. Les statuts finaux exigent leurs preuves et leurs contrôles ; un report
   exige en plus une condition de reprise.
5. La projection publique reste mesurée séparément de la cible : 79 Archives
   à l’ouverture, 83 après les quatre Chansons.
6. Les 45 routes des Œuvres et Personnages sont contrôlées depuis les slugs
   exacts du manifeste.
7. Aucun fichier produit, type métier, composant ou route n’est modifié par ce
   Train.

## Critères de clôture

- [x] Les 69 entrées sont présentes une seule fois dans le journal.
- [x] Les profils, profondeurs et états de départ correspondent au manifeste.
- [x] Les quatre Chansons appartiennent au Train 5B.
- [x] L’unique échantillon R3 appartient au Train 5C.
- [x] Les 22 autres Œuvres, 22 Personnages et 20 verdicts Créateurs–Époque
      possèdent leur Train propriétaire.
- [x] Les 79 routes publiques et 45 routes historiques sont mesurées.
- [x] Le vérificateur refuse les compteurs manuels incohérents et les verdicts
      sans preuve.
- [x] Aucune Archive, route ou source centrale n’est modifiée.
- [x] Le WIP extérieur au chantier demeure intact.

## Passage au Train 5B

Le Train 5B peut ouvrir **Chansons** comme cinquième famille publique. Il devra
faire évoluer dans un même raccord le contrat de famille, les quatre données
réelles, les sources centrales, la résolution identitaire, les surfaces, la
recherche et les contrôles de confidentialité.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_La bobine tourne à vide une dernière fois. Au prochain clap, les Chansons
entreront réellement dans la lumière._
