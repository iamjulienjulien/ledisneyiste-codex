# Acte VI · Phase 4 · État de référence documentaire

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Fonction du document

Ce relevé ouvre le Train 4A. Il mesure les contrats réellement publiés avant
de les étendre aux sorties, exploitations, versions, réceptions, Œuvres
sources, Chansons et données financières de l’Acte VI.

Il ne publie aucune Archive et ne modifie aucun type. Son rôle est de rendre
visibles les coutures que les prochains trains devront préserver.

## Verdict

Le modèle actuel est sain pour raconter la **fabrication** d’une œuvre et ses
relations immédiates. Il est encore trop étroit pour raconter sa **vie
publique** : une sortie possède seulement deux natures, une version n’a pas
d’identité propre, la réception reste éditoriale, les Œuvres sources sont des
références embarquées et les Chansons n’existent pas comme domaine.

L’écart est concentré. Sur 23 fiches Œuvres, une seule — _Snow White and the
Seven Dwarfs_ — porte presque toute la matière structurée appelée à évoluer.
Cette concentration rend la migration bornée, mais exige une compatibilité
explicite avec les surfaces et les Plans qui consomment déjà ces champs.

## État chiffré du dépôt

| Registre ou matière                            | État au 2 septembre 2026 |
| ---------------------------------------------- | -----------------------: |
| Personnages publiés                            |                       22 |
| Créateurs publiés                              |                       32 |
| Œuvres publiées                                |                       23 |
| Époques publiées                               |                        2 |
| Total des fiches publiques                     |                       79 |
| Notices de sources                             |                      181 |
| Œuvres avec événements de sortie enrichis      |                        1 |
| Événements de sortie structurés                |                        3 |
| Œuvres avec titres alternatifs                 |                        1 |
| Œuvres avec durées versionnées                 |                        2 |
| Œuvres avec données économiques                |                        1 |
| Déclarations économiques                       |                        4 |
| Œuvres avec relations vers d’autres œuvres     |                        1 |
| Relations d’œuvres structurées                 |                        3 |
| Contributions au générique                     |                      108 |
| Présences de personnages dans les œuvres       |                       73 |
| Œuvres avec blocs éditoriaux sourcés           |                        2 |
| Blocs éditoriaux d’Œuvres avec sources propres |                        6 |

## Contrats actuels

### Sorties et exploitation

`EvenementSortieOeuvre` porte une date, un territoire libre, une nature, un
lieu éventuel et des sources. Les seules natures admises sont
`premiere-mondiale` et `sortie-nationale`.

Le contrat ne distingue pas encore première, avant-première, sortie
commerciale, ressortie, festival, diffusion, restauration ou support. Il ne
possède ni identifiant stable d’événement, ni version projetée, ni mode
d’exploitation.

### Versions et identités

Les titres alternatifs disposent déjà de langue, territoire, nature et
sources. Les durées conservent un simple libellé `version`. Aucune structure
commune ne relie encore un titre, une durée, une sortie et une édition à une
même version documentaire.

Le contrat d’identité de la Phase 3 doit rester la source de vérité des noms,
langues, territoires, slugs et aliases. La Phase 4 ne doit pas recréer une
deuxième grammaire d’identité dans les Œuvres.

### Réception

La réception existe dans les récits, les sources et certains angles des Plans,
mais pas comme déclaration structurée de la fiche Œuvre. Aucun contrat ne sait
encore nommer un fait de réception, son territoire, sa période, sa portée, son
degré de certitude et ses sources.

### Œuvres sources

`ReferenceOeuvreLiee` distingue une Œuvre publiée d’une
`oeuvre-exterieure`. Cette dernière conserve un nom, des auteurs et une date,
mais n’a ni identifiant, ni fiche autonome, ni provenance détaillée de son
identité.

Le cas `Schneewittchen` prouve que cette forme légère est utile. Le futur
registre privé des Œuvres sources devra pouvoir l’enrichir sans ouvrir de
route publique ni forcer immédiatement une nouvelle valeur dans
`CodexFamily`.

### Chansons et musique

La musique apparaît aujourd’hui dans les domaines de crédits, les rôles des
Créateurs et les blocs éditoriaux. Il n’existe aucune fiche Chanson, aucune
occurrence, aucune version chantée et aucune relation propre vers une
récompense ou un réemploi.

Le contrat futur devra être documentaire avant d’être médiatique : identité,
auteurs, interprètes, œuvre d’origine, occurrence, versions, réception et
sources doivent fonctionner sans audio ni paroles.

### Données économiques

`DonneeEconomiqueOeuvre` distingue coût de production, revenus et entrées. Il
porte une valeur, une unité, une devise éventuelle, un territoire libre, une
période, une certitude et des sources.

Il ne sait pas encore exprimer une fourchette, l’année monétaire, le périmètre
brut ou net, la méthode, une donnée dérivée, la comparabilité, un conflit
attribué ou la justification éditoriale. Les quatre déclarations de
_Blanche-Neige_ restent le cas de compatibilité ; elles ne sont pas
automatiquement toutes publiables au regard de `DEC-008`.

## Cartographie des consommateurs

| Couture                         | Producteur actuel                         | Consommateurs directs                                                                                       | Risque de migration |
| ------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------- |
| Sortie principale et événements | `src/data/oeuvres/*.json`                 | fiche Œuvre, `src/lib/plans/events.ts`, `evidence.ts`, `table-lumineuse.ts`, vérificateur Œuvres            | élevé               |
| Titres alternatifs              | fiches Œuvres + contrat d’identité        | projection d’identité, fiche Œuvre, recherche, Plans, vérificateur Identités                                | élevé               |
| Durées et versions libres       | fiches Œuvres                             | fiche Œuvre, Plans Table lumineuse, vérificateur Œuvres                                                     | moyen               |
| Données économiques             | fiche _Blanche-Neige_                     | fiche Œuvre, Plans Evidence et Table lumineuse, vérificateur Œuvres                                         | élevé               |
| Relations d’œuvres              | fiche _Blanche-Neige_                     | fiche Œuvre, Plans Links, Travelling, Table lumineuse et Plan d’ensemble, vérificateurs Œuvres et Relations | élevé               |
| Contributions et personnages    | toutes les fiches Œuvres                  | générique, relations, Plans, index inverses et vérificateurs                                                | élevé               |
| Sources                         | registre central + identifiants embarqués | fiches, citations, Plans Evidence, Table lumineuse et tous les vérificateurs documentaires                  | critique            |
| Chansons                        | absent                                    | aucun consommateur public ; futurs contrats, surfaces et vérificateurs                                      | faible au départ    |
| Œuvres sources autonomes        | absent                                    | futur registre privé ; relation d’adaptation publique depuis une Œuvre Disney                               | moyen               |

## Dépendances cachées à préserver

1. Les Plans fabriquent des identifiants dérivés à partir de l’index des
   tableaux. Une migration qui réordonne une liste peut donc modifier leur
   identité de projection sans erreur TypeScript.
2. `events.ts` traduit directement la nature d’une sortie en libellé. Toute
   nouvelle nature doit recevoir un vocabulaire explicite.
3. `evidence.ts` crée une preuve par fait structuré. Un nouveau contrat ne doit
   pas perdre le lien exact entre déclaration et sources.
4. `links.ts` transforme les relations d’œuvres en réseau documentaire. Une
   Œuvre source privée doit rester référencée sans devenir une route publique.
5. La fiche Œuvre affiche les anciens champs directement. La compatibilité
   doit être assurée par des projections ou une migration atomique, jamais par
   deux vérités publiques concurrentes.
6. Les vérificateurs contrôlent aujourd’hui les formes JSON, leurs natures et
   leurs sources. Ils devront évoluer dans le même commit que chaque contrat.

## Frontière de la Phase 4

La Phase 4 peut créer des types spécialisés, des registres privés, des
fixtures et des projections compatibles. Elle ne doit pas :

- publier _Pinocchio_, Collodi ou une nouvelle Chanson ;
- ouvrir un index ou une route Chansons ;
- ouvrir une route pour les Œuvres sources ;
- migrer le manifeste de rétroapplication de 69 entrées ;
- héberger de l’audio ou reproduire des paroles ;
- étendre `CodexFamily` avant qu’un domaine soit réellement public et routable.

## Passage à la cible

Le contrat futur sera installé par couches : sorties et versions, Œuvres
sources, Chansons et musique, puis données financières. Chaque couche devra
conserver une projection vers les consommateurs actuels jusqu’à ce que leurs
lectures aient été migrées et vérifiées.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Avant d’agrandir l’écran, le Train 4A repère tous les câbles qui portent déjà
l’image._
