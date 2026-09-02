# Acte VI · Phase 5 · Train 5B

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Mission

Le Train 5B ouvre **Chansons** comme cinquième famille publique du Codex. Il
projette quatre chansons rétrospectives déjà comprises dans le périmètre
validé, sans faire traverser la frontière aux paroles, aux médias, aux droits
ni aux dossiers d’enquête privés.

## Archives projetées

| Chanson                             | Œuvre d’origine                   | Identité française                   |
| ----------------------------------- | --------------------------------- | ------------------------------------ |
| _Whistle While You Work_            | _Snow White and the Seven Dwarfs_ | _Siffler en travaillant_             |
| _Heigh-Ho_                          | _Snow White and the Seven Dwarfs_ | graphie identique, provenance BnF    |
| _Someday My Prince Will Come_       | _Snow White and the Seven Dwarfs_ | _Un jour mon prince viendra_         |
| _Who’s Afraid of the Big Bad Wolf?_ | _Three Little Pigs_               | _Qui craint le grand méchant loup ?_ |

Les formes françaises proviennent des notices BnF promues dans le registre
central. La date de 1949 de _Qui craint le grand méchant loup ?_ qualifie
l’édition phonographique française ; elle n’est jamais confondue avec
l’occurrence filmique de 1933.

## Raccords réalisés

- `CodexFamily`, `TypeReferenceCodex`, les routes canoniques et la projection
  identitaire connaissent désormais `chansons` ;
- le catalogue, les quatre fiches et les deux sources BnF sont publiés dans
  les registres canoniques ;
- `/chansons` possède les vues Liste et Cartes, le Symbol
  `index/chansons/principal` et l’accent `rose-aerographe` ;
- chaque fiche expose son identité, son œuvre d’origine, ses auteurs, ses
  versions, ses occurrences et ses sources ;
- la navigation, la page d’accueil et la recherche présentent les cinq
  familles ;
- les œuvres et créateurs concernés relient leurs chansons, et les chansons
  reviennent vers leurs Archives publiées ;
- les Plans restent volontairement bornés aux quatre familles prévues par
  leur contrat initial ; Chansons n’y est pas ajoutée implicitement ;
- les vérificateurs mesurent 83 jointures, 83 fiches, 83 routes et les quatre
  verdicts du Train.

## Frontière de confidentialité

La publication contient des métadonnées documentaires et des liens vers les
sources. Elle ne contient :

- aucun texte de paroles ;
- aucun fichier audio ou visuel ;
- aucun identifiant d’asset privé ;
- aucune preuve de droits, note interne ou donnée de contrôle ;
- aucune matière issue des dossiers médias privés de Phase 4.

Les fixtures privées de _Pinocchio_ et des dossiers médias continuent d’être
éprouvées par `check:chansons`, sans devenir des Archives du navigateur.

## État à la sortie

| Repère                       | Valeur |
| ---------------------------- | -----: |
| Familles publiques           |      5 |
| Archives et routes publiques |     83 |
| Chansons publiées            |      4 |
| Sources centrales            |    183 |
| Verdicts Phase 5 rendus      |      4 |
| Raccords restant à arbitrer  |     65 |

## Critères de clôture

- [x] Les quatre slugs validés possèdent catalogue, fiche et route statique.
- [x] Les identités françaises sont retrouvables sans créer de doublon.
- [x] Les deux notices BnF sont résolues depuis le registre central.
- [x] Liste, Cartes, fiches, recherche et navigation partagent le même thème.
- [x] Les relations vers Œuvres, Créateurs et Chansons sont bidirectionnelles.
- [x] Les 45 routes historiques protégées demeurent présentes.
- [x] Les fixtures et dossiers médias privés restent hors projection.
- [x] Le journal compte quatre migrations et 65 entrées encore à faire.
- [x] La compilation de production et les vérificateurs ciblés passent.
- [x] Le WIP extérieur au chantier demeure intact.

## Passage au Train 5C

Le Train 5C pourra reprendre l’unique échantillon R3 :
_Snow White and the Seven Dwarfs_. Il devra consolider sa structure cible sans
réécrire les quatre Chansons ni élargir leur périmètre documentaire.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_La cinquième porte est ouverte. La musique entre dans le Codex, les droits
restent à la régie._
