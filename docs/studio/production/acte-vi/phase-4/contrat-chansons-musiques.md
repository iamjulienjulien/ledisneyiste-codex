# Acte VI · Phase 4 · Contrat des Chansons, Musiques et droits média

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Intention

Ce contrat donne à une Chanson une existence documentaire complète avant de
lui donner une surface publique ou un lecteur. Il sait nommer son identité,
ses auteurs, ses versions, ses occurrences, ses interprétations, ses
enregistrements, sa réception, ses récompenses et ses sources sans transporter
la moindre parole ni le moindre son.

Le domaine Musiques demeure son voisin, jamais son synonyme. Une partition ou
une attribution musicale peut être liée à une Œuvre et parfois à une Chanson,
mais elle ne devient pas pour autant une occurrence chantée.

## Une Chanson, cinq objets distincts

### La fiche documentaire

`FicheChanson` porte l’identité générale de la composition :

- un identifiant et un slug stables ;
- une identité originale et ses formes documentées ;
- l’Œuvre de première occurrence ;
- les compositeurs, paroliers, traducteurs et adaptateurs ;
- les versions, occurrences, interprétations et enregistrements ;
- la réception, les relations et les récompenses ;
- une provenance attachée à chaque déclaration.

Le slug prépare une future publication sans créer une route. Le registre du
Train 4D reste privé et n’entre ni dans `CodexFamily`, ni dans les catalogues,
ni dans la recherche.

### La version

`VersionChanson` porte une identité linguistique ou éditoriale de la
composition. Son vocabulaire fermé distingue :

- `originale` ;
- `traduction` ;
- `adaptation-lyrique`.

Une traduction ou une adaptation lyrique exige ses propres personnes, rôles,
langue, territoire et sources. La date d’un disque qui atteste un titre
français ne devient jamais automatiquement la date de création de cette
version.

### L’occurrence

`OccurrenceChanson` répond à la question : **dans quelle Œuvre la chanson
apparaît-elle ?** Elle relie une version à une Œuvre, une date et une fonction
narrative éventuelle.

`origine` qualifie la première occurrence documentée. `reemploi` qualifie une
nouvelle utilisation dans une autre Œuvre. Une occurrence ne désigne ni une
personne qui chante, ni un fichier sonore.

### L’interprétation

`InterpretationChanson` répond à la question : **qui interprète quelle
version ?** Elle distingue l’interprétation `originale` d’une `reprise`, porte
les interprètes et leurs rôles, puis peut se rattacher à une occurrence.

La reprise vit donc dans l’interprétation. Elle ne falsifie ni l’identité de
la composition ni la date de son occurrence d’origine.

### L’enregistrement

`EnregistrementChanson` décrit une fixation précise d’une interprétation. Il
possède son propre identifiant, sa date, son édition et ses sources. Il ne
porte aucune URL de média et ne remplace jamais l’occurrence filmique.

La chaîne documentaire est explicite :

`Chanson → Version → Interprétation → Enregistrement`

L’Œuvre intervient par une branche différente :

`Chanson → Version → Occurrence → Œuvre`

## Les quatre transformations ne se confondent pas

| Transformation        | Contrat propriétaire    | Effet documentaire                                  |
| --------------------- | ----------------------- | --------------------------------------------------- |
| Traduction            | `VersionChanson`        | Transpose les mots dans une autre langue.           |
| Adaptation lyrique    | `VersionChanson`        | Réécrit le texte pour une nouvelle forme chantable. |
| Reprise               | `InterpretationChanson` | Une nouvelle interprétation de la composition.      |
| Réemploi dans l’écran | `OccurrenceChanson`     | Une nouvelle présence dans une Œuvre.               |

Le contrat interdit ainsi qu’un même champ libre « version » cache quatre
histoires différentes.

## Œuvres publiées et Œuvres privées

`ReferenceOeuvreChanson` accepte :

1. une Œuvre déjà publiée dans le Codex ;
2. une Œuvre privée identifiée, employée uniquement dans les bobines de
   production.

_Who’s Afraid of the Big Bad Wolf?_ rejoint ainsi _Three Little Pigs_ par sa
route publique existante. _When You Wish Upon a Star_ peut en parallèle
référencer la bobine privée de _Pinocchio_ sans créer sa route avant la Phase 6.

## Le domaine frère Musiques

`FicheMusique` décrit une matière musicale qui n’est pas nécessairement une
chanson : partition, musique additionnelle, orchestration, arrangement ou
direction musicale.

Son contrat minimal porte :

- une identité ;
- une Œuvre ;
- une date éventuelle ;
- des attributions structurées par domaine ;
- les sources de chaque attribution.

Une attribution peut viser une Œuvre ou préciser une Chanson, mais les deux
registres ne partagent ni entrée, ni fiche, ni identifiant. Cette frontière
prépare le domaine Musiques de l’Acte VII sans l’ouvrir prématurément.

Les crédits actuels des Œuvres restent la représentation publique de repli.
`projeterCreditsMusicauxExistants` sélectionne le domaine
`musique-chansons`, conserve ses rôles libres et rattache les sources de la
fiche. Il ne prétend pas transformer rétroactivement un générique en registre
Musiques complet.

## Politique `metadata-first`

La décision `DEC-007` demeure la règle de publication :

- une fiche complète n’exige ni son, ni paroles ;
- un lien institutionnel simple peut être projeté sans charger de lecteur ;
- une citation courte ou un lecteur intégré restent en revue ;
- une matière hébergée exige un dossier complet et vérifié ;
- un statut absent ou un dossier incomplet bloque la matière ;
- aucune date ancienne ne vaut preuve de domaine public.

Les huit statuts privés restent ceux du dossier Phase 2 :
`metadata-only`, `external-link`, `short-quotation-review`, `embed-review`,
`licensed`, `public-domain-verified`, `blocked` et `excluded`.

## La frontière privée des droits

`DossierProjectionMediaPrive` peut connaître :

- l’asset et la version contrôlés ;
- les territoires et couches de droits ;
- le fondement, le titulaire ou fournisseur et les usages ;
- les preuves, le contrôle de vie privée et la personne qui a revu le
  dossier ;
- une note interne et une date d’expiration.

`projeterDossierMediaPublic` ne transmet jamais ce dossier. Sa sortie contient
seulement :

- un statut public simplifié ;
- la matière explicitement autorisée, ou `null`.

Un lien externe doit être HTTPS, identifié et attribué. Une licence ou un
domaine public déclaré sans preuve, relecteur ou date de contrôle retombe sur
`bloquee`. Les états en revue n’exposent aucune matière avant la décision
humaine.

## Bobines privées de décision

[`scripts/fixtures/chansons.json`](../../../../../scripts/fixtures/chansons.json)
porte deux Chansons :

### _When You Wish Upon a Star_

La fiche pilote conserve :

- son titre original et l’identité française attestée en 1995 ;
- Leigh Harline et Ned Washington dans leurs rôles respectifs ;
- une occurrence privée dans _Pinocchio_ ;
- l’interprétation de Cliff Edwards ;
- un enregistrement distinct de cette occurrence ;
- une réception institutionnelle et une référence de récompense ;
- six sources de production, sans paroles ni média.

### _Who’s Afraid of the Big Bad Wolf?_

La fiche rétrospective prouve la neutralité du modèle :

- son Œuvre d’origine est _Three Little Pigs_, déjà publiée ;
- son occurrence porte la date du film de 1933 ;
- l’adaptation française porte la date de l’édition de 1949 ;
- Frank Churchill, Ann Ronell, Robert Valaire, Jean Valmy et Pinto Colvig
  conservent leurs rôles et sources ;
- aucune donnée n’est réservée au seul cas _Pinocchio_.

La même fixture porte une partition privée distincte et quatre dossiers
média : métadonnées seules, lien externe admis, audio bloqué et fausse licence
incomplète.

## Invariants exécutables

Le vérificateur contrôle que :

- les identifiants, slugs et sous-objets restent uniques ;
- chaque identité, rôle, version, occurrence et attribution utilise un
  vocabulaire fermé ;
- chaque déclaration possède une source connue ;
- une traduction ou adaptation nomme langue, territoire, responsables et
  sources ;
- chaque occurrence vise une version et chaque enregistrement une
  interprétation ;
- occurrence et enregistrement ne partagent jamais leur identité ;
- aucun champ audio, paroles ou texte intégral n’entre dans une fiche ;
- Chansons et Musiques gardent deux registres distincts ;
- les crédits musicaux actuels de _Blanche-Neige_ restent projetables ;
- un dossier bloqué ou incomplet ne transmet aucune matière ;
- identités privées, preuves, notes et contrôles ne traversent pas la sortie
  publique ;
- aucun catalogue, index, route ou famille Chansons n’est créé.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Une chanson peut entrer dans les Archives sans que le Codex prétende la
rejouer : il en documente d’abord chaque voix, chaque passage et chaque
preuve._
