# Acte VI · Clôture de la Phase 3

> **Document interne de transmission**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Verdict

La Phase 3 — **Donner aux Archives des identités qui voyagent** — est
terminée. Son verdict est : **validée**.

Le Codex sait désormais séparer une forme documentée, une route canonique et
un alias historique ; joindre catalogues et fiches côté serveur ; retrouver
une Archive par ses autres noms ; puis afficher la forme originale sans
affaiblir la forme principale.

## Mesure avant et après

| Mesure                                     | Avant la Phase 3 | Après la Phase 3 |
| ------------------------------------------ | ---------------: | ---------------: |
| Routes canoniques publiques                |               79 |               79 |
| Registres d’identités fermés               |                0 |                2 |
| Langues enregistrées                       |                0 |                3 |
| Territoires enregistrés                    |                0 |                3 |
| Formes documentées dans les fiches         |               15 |               15 |
| Jointures catalogue–fiche éprouvées        |                0 |               79 |
| Requêtes identitaires automatisées         |                0 |                7 |
| Surfaces et montages sous garde-fou commun |                0 |               15 |
| Alias de navigation réels publiés          |                0 |                0 |
| Entrées du manifeste Phase 5 déjà migrées  |                0 |                0 |

La stabilité des 15 formes est volontaire : la Phase 3 a construit et
éprouvé le contrat sans commencer la rétroapplication éditoriale. La valeur
doit croître lorsque de nouvelles preuves rejoindront les Archives, pas pour
satisfaire un compteur technique.

## Les six acquisitions

1. **Un vocabulaire fermé.** Langues, territoires et natures possèdent des
   types et des libellés communs.
2. **Une projection unique.** `ProjectionIdentiteCodex` réunit les deux
   moitiés catalogue–fiche sans déplacer leur source de vérité.
3. **Une recherche enrichie.** Les formes alternatives retrouvent le résultat
   canonique sans doublon.
4. **Une navigation stable.** Les 79 routes restent inchangées et le contrat
   d’alias refuse les cibles ou historiques non prouvés.
5. **Une UI partagée.** Cards, listes et en-têtes composent la même hiérarchie
   d’identité, avec langue et territoire lisibles.
6. **Une répétition transversale.** Le vérificateur spécialisé appartient aux
   contrôles locaux et CI du dépôt.

## Livrables de référence

| Livrable                                         | Fonction                                      |
| ------------------------------------------------ | --------------------------------------------- |
| [`train-3a.md`](./train-3a.md)                   | Types, registres, fixtures et collisions.     |
| [`train-3b.md`](./train-3b.md)                   | Résolution serveur des catalogues et fiches.  |
| [`train-3c.md`](./train-3c.md)                   | Recherche par toutes les identités.           |
| [`train-3d.md`](./train-3d.md)                   | Routes canoniques et alias historiques.       |
| [`train-3e.md`](./train-3e.md)                   | Projection dans Cards, listes et fiches.      |
| [`train-3f.md`](./train-3f.md)                   | Répétition générale et raccord des registres. |
| [`contrat-identites.md`](./contrat-identites.md) | Contrat normatif et recette d’adoption.       |
| [`transmission.md`](./transmission.md)           | Passage vers les Phases 4, 5, 6 et 9.         |
| [`cloture.md`](./cloture.md)                     | Verdict, mesures et clôture de la Phase 3.    |

Le chapitre Architecture du Guidebook IA expose désormais cette circulation
aux prochains agents sans projeter les documents privés de `docs/studio`.

## Répétition finale

La répétition de clôture confirme :

- format et lint ;
- garde-fous Pixie, symboles, métadonnées, Plans et Guidebook ;
- identités, Œuvres, Personnages, relations et Récompenses ;
- compilation complète de 115 pages, WIP Guidebook parallèle inclus ;
- diff propre hors WIP voisin explicitement conservé.

Le contrôle identitaire rapporte séparément ses registres, formes, jointures,
fixtures, surfaces, recherches et routes. Il vérifie aussi qu’il demeure une
étape autonome de `pnpm check` et `pnpm check:ci`. Le build final est vert ; la
Phase 3 n’ajoute elle-même aucune route publique.

## Générique de la Phase 3 avant clôture

1. `14f79fd` — 📡 Transmission > Les Archives séparent leurs noms de leurs chemins > 🔩 R2-D2 🏅
2. `8b8fea3` — 🧪 Répétition > Les identités éprouvent leurs langues, territoires et collisions > 🔩 R2-D2 🏅
3. `32f3189` — ✍️ Scénario > Le Train 3A grave son contrat d’identité > 🔩 R2-D2 🏅
4. `45113d7` — 📡 Transmission > Les catalogues et les fiches résolvent une identité commune > 🔩 R2-D2 🏅
5. `a8e2836` — 🧪 Répétition > Les 79 Archives éprouvent leur jointure identitaire > 🔩 R2-D2 🏅
6. `db54e00` — ✍️ Scénario > Le Train 3B transmet son résolveur au moteur de recherche > 🔩 R2-D2 🏅
7. `ac4eb91` — 🎬 Scène > La recherche retrouve les Archives par toutes leurs identités > 🔩 R2-D2 🏅
8. `5d849d8` — 🧪 Répétition > Les identités alternatives gardent un seul résultat canonique > 🔩 R2-D2 🏅
9. `15f9b42` — ✍️ Scénario > Le Train 3C transmet une recherche identitaire sans doublon > 🔩 R2-D2 🏅
10. `b59ba57` — 🩹 Raccord > Les alias historiques gardent une seule cible canonique > 🔩 R2-D2 🏅
11. `060b149` — 🧪 Répétition > Les 79 routes du Codex restent sous surveillance > 🔩 R2-D2 🏅
12. `8f44e9c` — ✍️ Scénario > Le Train 3D sépare les noms de leurs chemins > 🔩 R2-D2 🏅
13. `aee212f` — 📡 Transmission > Le Codex compose une identité prête à projeter > 🔩 R2-D2 🏅
14. `933de15` — 🎬 Scène > Les formes originales rejoignent les Cards, listes et fiches > 🔩 R2-D2 🏅
15. `4269dec` — 🧪 Répétition > Les identités projetées gardent leur langue et leur territoire > 🔩 R2-D2 🏅
16. `466531f` — ✍️ Scénario > Le Train 3E prépare les surfaces à faire voyager les noms > 🔩 R2-D2 🏅

Les commits du Train 3F ne sont pas auto-référencés. Leurs hashes rejoindront
le suivi Notion après validation et publication.

## Frontière respectée

La Phase 3 n’a :

- modifié aucun des 79 slugs canoniques ;
- publié aucune redirection historique fictive ;
- ajouté aucune route localisée ;
- migré aucune des 69 entrées du manifeste de la Phase 5 ;
- créé aucun domaine Chanson ou Œuvre source ;
- ajouté aucune Archive de _Pinocchio_ ;
- absorbé le WIP Guidebook mené en parallèle.

## Passage vers la Phase 4

La Phase 4 peut ouvrir les nouveaux contrats de données en réutilisant la
grammaire identitaire au lieu de la réinventer. La Phase 5 reçoit une recette
de migration mesurable ; la Phase 6 pourra documenter les formes françaises,
anglaises et italiennes de _Pinocchio_ ; la Phase 9 connaît les scénarios à
reprendre dans sa répétition finale.

Le prochain chantier ne doit pas commencer par ajouter davantage de variantes
aux Archives existantes. Il doit d’abord décider comment Chansons et Œuvres
sources deviennent des domaines publiables cohérents avec le Codex.

## Dernière image

Une Archive n’est plus prisonnière d’un seul nom, et aucun de ses voyages ne
brise son adresse. La Phase 3 peut rendre le clap : le Codex possède désormais
une identité stable assez souple pour accueillir le monde.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Phase 3 validée · 79 routes préservées · les identités peuvent voyager._
