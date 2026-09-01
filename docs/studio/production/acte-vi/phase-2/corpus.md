# Acte VI · Phase 2 · Inventaire des corpus

> **Document interne de production**<br>
> Arrêté par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Fonction du document

Cet inventaire transforme les candidatures du brief de l’Acte VI en un corpus
exécutable. Il distingue ce qui doit recevoir une fiche, ce qui reste une
relation structurée et ce qui dépend encore d’une preuve documentaire.

Il ne publie aucune entrée. Les noms, slugs et profondeurs ci-dessous sont des
consignes de production pour les Phases 3 à 7 ; seuls les catalogues de
`src/data` ouvrent réellement une Archive.

### Niveaux de profondeur

| Niveau               | Contrat de production attendu                                                           |
| -------------------- | --------------------------------------------------------------------------------------- |
| `fiche complète`     | Identité, faits structurés, récit éditorial, relations et sources propres.              |
| `fiche légère`       | Identité autonome, relations essentielles, courte contextualisation et sources.         |
| `relation seulement` | Mention structurée dans une autre fiche, sans route autonome dans l’Acte VI.            |
| `crédits seulement`  | Personne conservée dans le générique structuré tant qu’aucun récit propre n’est établi. |
| `report`             | Candidature conservée hors corpus, avec motif et condition de reprise.                  |

### États de preuve

- `préexistant` : une fiche publiée et ses sources peuvent être enrichies ;
- `amorce` : le dépôt possède des mentions ou une source directe, sans corpus
  suffisant pour publier la nouvelle entrée ;
- `à constituer` : la matière doit être recherchée au Train 2D puis produite
  dans les Phases 4 ou 6 ;
- `à confirmer` : la profondeur dépend d’un seuil documentaire explicite.
- `constitué` : le Train 2D fournit une matrice suffisante pour préparer la
  production, sans publier encore la fiche.

## Vue d’ensemble arrêtée

| Domaine               | Nouvelles fiches complètes | Fiches légères | Relations/crédits | Enrichissements existants |
| --------------------- | -------------------------: | -------------: | ----------------: | ------------------------: |
| Œuvres Disney         |                          1 |              0 |                 0 |                         1 |
| Œuvres sources        |                          1 |              0 |                 0 |                         0 |
| Chansons              |                          1 |              8 |                 0 |                         0 |
| Personnages           |                          6 |              5 |                 1 |                         0 |
| Créateurs/interprètes |                          6 |              3 |                 1 |                        19 |
| Récompenses           |                          2 |              0 |                 0 |                         0 |
| Époques               |                          0 |              0 |                 0 |                         1 |

Les nombres décrivent le périmètre validé du Train 2C. Les décisions `DEC-003`
à `DEC-006` sont arrêtées par Julien. Le Train 2D confirme ce périmètre, corrige
deux attributions et documente ses preuves dans la
[`matrice-sources.md`](./matrice-sources.md).

## Œuvres et œuvre source

| Entrée                            | Domaine futur  | Profondeur          | Preuve actuelle | Action et limite                                                                                                                                   |
| --------------------------------- | -------------- | ------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| _Pinocchio_ (1940)                | Œuvres Disney  | `fiche complète`    | `constitué`     | Créer l’Archive centrale depuis les trois vues documentaires. La matrice privée ne remplace pas le futur registre public des sources.              |
| _Le avventure di Pinocchio_       | Œuvres sources | `fiche complète`    | `constitué`     | Créer l’entrée interne de l’œuvre de Collodi et la relation d’adaptation vers le film. Aucun index public général n’est ouvert par cette décision. |
| _Snow White and the Seven Dwarfs_ | Œuvres Disney  | enrichissement `R3` | `préexistant`   | Servir d’échantillon principal pour l’identité localisée, les sorties, versions, chansons, relations et données économiques.                       |

Le registre **Œuvres sources** possède le fait littéraire. La recommandation
pour Carlo Collodi est une **double relation justifiée** : une entrée Créateur
documente la personne et son œuvre ; l’entrée Œuvre source documente le livre
et porte la relation d’adaptation. Aucune des deux ne doit recopier l’autre.
Cette recommandation forme `DEC-003`, validée avec un garde-fou documentaire :
si la matrice ne soutient pas une fiche autonome, la personne reste reliée à
l’Œuvre source sans bloquer le registre.

## Chansons

| Chanson de référence                                        | Œuvre d’origine                   | Priorité | Profondeur       | Identité française                 | Action                                                                                                               |
| ----------------------------------------------------------- | --------------------------------- | -------- | ---------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| _Quand on prie la bonne étoile / When You Wish Upon a Star_ | _Pinocchio_                       | P0       | `fiche complète` | Quand on prie la bonne étoile      | Fiche pilote : composition, occurrence, interprétations, versions linguistiques, récompense, réception et réemplois. |
| _Little Wooden Head_                                        | _Pinocchio_                       | P0       | `fiche légère`   | Les Pantins de bois                | Identité, auteurs, occurrence, interprète et principales versions.                                                   |
| _Give a Little Whistle_                                     | _Pinocchio_                       | P0       | `fiche légère`   | Sifflez vite vite                  | Même contrat léger ; approfondir seulement si la réception apporte un récit propre.                                  |
| _Hi-Diddle-Dee-Dee_                                         | _Pinocchio_                       | P0       | `fiche légère`   | Hi-diddle di di                    | Même contrat léger ; conserver la version et l’édition qui attestent chaque identité.                                |
| _I’ve Got No Strings_                                       | _Pinocchio_                       | P0       | `fiche légère`   | Il faut savoir briser ses liens    | Même contrat léger ; conserver séparément occurrence et réemplois.                                                   |
| _Whistle While You Work_                                    | _Snow White and the Seven Dwarfs_ | P1       | `fiche légère`   | Siffler en travaillant             | Noyau rétrospectif de Blanche-Neige.                                                                                 |
| _Heigh-Ho_                                                  | _Snow White and the Seven Dwarfs_ | P1       | `fiche légère`   | Heigh-Ho                           | Noyau rétrospectif de Blanche-Neige.                                                                                 |
| _Someday My Prince Will Come_                               | _Snow White and the Seven Dwarfs_ | P1       | `fiche légère`   | Un jour mon prince viendra         | Noyau rétrospectif de Blanche-Neige.                                                                                 |
| _Who’s Afraid of the Big Bad Wolf?_                         | _Three Little Pigs_               | P1       | `fiche légère`   | Qui craint le grand méchant loup ? | Noyau rétrospectif antérieur au long métrage.                                                                        |

Le corpus initial est donc fermé à **neuf chansons** pour l’Acte VI : cinq de
_Pinocchio_ et quatre rétrospectives. Une fiche légère reste une Archive
autonome et sourcée ; elle ne dispense ni de l’œuvre d’origine ni de
l’occurrence structurée. Les titres français sont désormais documentés, mais
chacun reste lié à la version phonographique qui l’atteste. La Phase 3 devra
empêcher qu’une identité localisée soit antidatée ou transformée sans preuve
en slug canonique.

## Personnages

| Personnage candidat | Priorité | Profondeur recommandée | Identité à vérifier                  | Motif et condition                                                                                                                                    |
| ------------------- | -------- | ---------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pinocchio           | P0       | `fiche complète`       | formes FR, EN et IT                  | Sujet du film, adaptation, conception, animation, voix et vie publique.                                                                               |
| Jiminy Cricket      | P0       | `fiche complète`       | formes FR, EN et IT                  | Co-sujet narratif, voix, chanson, évolution d’adaptation et vie au-delà du film.                                                                      |
| Geppetto            | P0       | `fiche complète`       | formes FR, EN et IT                  | Personnage central, adaptation, conception et interprétation.                                                                                         |
| la Fée Bleue        | P0       | `fiche complète`       | graphie et noms localisés            | Personnage central, modèle filmé, voix et transformation de l’œuvre source.                                                                           |
| Grand Coquin        | P0       | `fiche complète`       | nom original et italien              | Antagoniste majeur, duo avec Gédéon, animation et voix.                                                                                               |
| Gédéon              | P0       | `fiche légère`         | nom original et italien              | Identité autonome et récurrence en duo ; profondeur limitée si les preuves restent surtout relationnelles.                                            |
| Stromboli           | P0       | `fiche complète`       | formes localisées                    | Antagoniste majeur, animation de Bill Tytla, voix et lecture d’adaptation.                                                                            |
| le Cocher           | P0       | `fiche légère`         | formes localisées                    | Fonction narrative forte, mais matière autonome à confirmer.                                                                                          |
| Monstro             | P0       | `fiche légère`         | formes localisées                    | Présence structurante et travail d’animation ; fiche resserrée suffisante.                                                                            |
| Crapule / Lampwick  | P0       | `fiche légère`         | Crapule (FR), Lampwick (EN)          | La Cinémathèque établit `Crapule` pour les doublages français de 1946 et 1975 ; conserver l’identité originale et la version de chaque nom.           |
| Figaro              | P1       | `fiche légère`         | formes localisées                    | Autonomie soutenue par sa vie au-delà du film ; l’extension exacte reste à documenter.                                                                |
| Cléo                | P2       | `relation seulement`   | graphie, accent et formes localisées | Conserver dans la distribution de _Pinocchio_ et sa relation au court _Figaro and Cleo_. Une réapparition seule ne franchit pas le seuil d’autonomie. |

Le seuil d’autonomie retenu exige au moins deux axes documentables parmi :
adaptation, conception/animation, interprétation, fonction narrative et vie
au-delà de l’œuvre. Une simple présence au générique ou dans la distribution
ne suffit pas.

## Créateurs et interprètes

### Nouvelles entrées

| Personne         | Priorité | Recommandation      | État dépôt                                | Action documentaire                                                                                                 |
| ---------------- | -------- | ------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Carlo Collodi    | P0       | `fiche complète`    | absent                                    | La biographie, le texte critique et le registre des traductions franchissent le seuil documentaire de `DEC-003`.    |
| Ben Sharpsteen   | P0       | `fiche complète`    | mention non résolue dans _Clock Cleaners_ | Direction de _Pinocchio_ et parcours Disney à documenter.                                                           |
| Cliff Edwards    | P0       | `fiche complète`    | absent                                    | Jiminy, interprétation et circulation de la chanson pilote.                                                         |
| Dickie Jones     | P0       | `fiche complète`    | absent                                    | Voix de Pinocchio et contexte d’interprétation.                                                                     |
| Ned Washington   | P0       | `fiche complète`    | mentions dans deux fiches de Créateurs    | Paroles, partition et récompenses ; ne pas limiter la page au crédit.                                               |
| Jack Kinney      | P1       | `fiche complète`    | mention non résolue dans _Bone Trouble_   | Son parcours dépasse le générique de _Pinocchio_ et résout une relation existante du Codex.                         |
| T. Hee           | P1       | `fiche légère`      | absent                                    | Réalisation de séquences et travail de référence joué pour Stromboli dépassent la seule ligne de crédit.            |
| Joshua Meador    | P1       | `fiche légère`      | absent                                    | Créditer l’animation sur _Pinocchio_ ; son parcours ultérieur de réalisation et d’effets soutient une fiche bornée. |
| Kenneth Anderson | P1       | `fiche légère`      | absent                                    | Direction artistique de _Pinocchio_ et parcours autonome en animation et Imagineering.                              |
| Evelyn Venable   | P2       | `crédits seulement` | absent                                    | **Voix originale** de la Fée Bleue. Le modèle filmé est Marge Champion ; aucune fiche autonome n’est ouverte.       |

### Entrées existantes à enrichir

| Entrée publiée        | Slug                  | Enrichissement attendu                                                                              |
| --------------------- | --------------------- | --------------------------------------------------------------------------------------------------- |
| Walt Disney           | `walt-disney`         | Production, arbitrages d’adaptation et comparaison avec _Blanche-Neige_.                            |
| David Hand            | `david-hand`          | Rôle comparatif et continuité des méthodes de réalisation, sans lui attribuer un crédit non prouvé. |
| Hamilton Luske        | `hamilton-luske`      | Direction et mise en scène de _Pinocchio_.                                                          |
| Wilfred Jackson       | `wilfred-jackson`     | Direction de séquences et articulation musique/action.                                              |
| Norman Ferguson       | `norman-ferguson`     | Animation de Grand Coquin et Gédéon.                                                                |
| Ward Kimball          | `ward-kimball`        | Conception et animation de Jiminy Cricket.                                                          |
| Fred Moore            | `fred-moore`          | Animation de Lampwick et apport aux personnages.                                                    |
| Milt Kahl             | `milt-kahl`           | Refonte graphique de Pinocchio ; matière déjà amorcée.                                              |
| Frank Thomas          | `frank-thomas`        | Contribution d’animation à qualifier précisément.                                                   |
| Eric Larson           | `eric-larson`         | Contribution d’animation à qualifier précisément.                                                   |
| Ollie Johnston        | `ollie-johnston`      | Contribution d’animation à qualifier précisément.                                                   |
| John Lounsbery        | `john-lounsbery`      | Grand Coquin ; matière déjà amorcée.                                                                |
| Wolfgang Reitherman   | `wolfgang-reitherman` | Poursuite de Monstro ; matière déjà amorcée.                                                        |
| Vladimir “Bill” Tytla | `vladimir-bill-tytla` | Stromboli ; matière déjà amorcée.                                                                   |
| Joe Grant             | `joe-grant`           | Conception des personnages et développement narratif.                                               |
| Gustaf Tenggren       | `gustaf-tenggren`     | Inspiration visuelle et direction artistique ; matière déjà amorcée.                                |
| Leigh Harline         | `leigh-harline`       | Composition, chanson pilote et Oscar ; matière déjà amorcée.                                        |
| Paul J. Smith         | `paul-j-smith`        | Partition et Oscar ; matière déjà amorcée.                                                          |
| Marge Champion        | `marge-champion`      | Modèle filmé de la Fée Bleue ; matière déjà amorcée.                                                |

Les 19 enrichissements n’exigent aucune nouvelle route. Chaque ajout futur
reste soumis à une source et à la vérification du rôle exact. Une personne
candidate reste au générique si le Train 2D ne révèle pas de matière
éditoriale autonome.

## Récompenses et époque

| Entrée                                                                   | Action recommandée  | Destination future                                | Condition                                                                                  |
| ------------------------------------------------------------------------ | ------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Oscar de la meilleure musique originale                                  | créer la récompense | registre Récompenses                              | Édition, catégorie, bénéficiaires, œuvre et sources confirmés.                             |
| Oscar de la meilleure chanson originale pour _When You Wish Upon a Star_ | créer la récompense | registre Récompenses                              | Chanson, auteurs, œuvre et sources confirmés.                                              |
| Le temps des chefs-d’œuvre                                               | enrichir            | fiche Époque existante `temps-des-chefs-d-oeuvre` | Relier _Pinocchio_, sa réception et ses tensions économiques sans recopier la fiche Œuvre. |

Le dépôt possède déjà l’époque appropriée et mentionne _Pinocchio_ dans son
récit. **Aucune nouvelle Époque n’est requise.** Les deux distinctions doivent
rejoindre le registre transversal existant ; elles ne sont pas enfouies dans
la future fiche Œuvre ou Chanson.

## Écarts et dépendances

1. **Matrice privée constituée.** Le registre public actuel ne contient que
   deux notices repérées directement par `Pinocchio`, mais le Train 2D livre
   32 sources qualifiées à intégrer progressivement dans les Phases 4 et 6.
2. **Domaines absents.** Chansons et Œuvres sources n’existent pas encore ;
   leur contrat relève de la Phase 4, leurs surfaces de la Phase 5.
3. **Identités localisées.** Le Train 2D établit les principaux titres et noms,
   mais leur forme structurée, leur version et leur provenance attendent le
   contrat de Phase 3.
4. **Carlo Collodi.** La double relation et la fiche complète sont soutenues
   par une matière autonome ; aucun repli n’est désormais recommandé.
5. **Crapule, Figaro et Cléo.** Les deux fiches légères sont confirmées ; Cléo
   reste une relation faute de deuxième axe documentaire autonome.
6. **Audio et paroles.** La présence d’une chanson dans ce corpus n’autorise
   ni extrait ni paroles ; le Train 2E possède cette décision distincte.

## Critères d’achèvement du corpus

- [x] Les recommandations `DEC-003` à `DEC-006` sont validées par Julien.
- [x] Le Train 2D confirme ou corrige les identités laissées à sourcer.
- [x] Chaque fiche future possède au moins une source d’identité et une source
      adaptée à chacun de ses faits structurants.
- [x] Aucune personne limitée au générique ne reçoit une route autonome par
      défaut.
- [x] Les neuf chansons sont reliées à une œuvre et à une occurrence.
- [x] Les deux récompenses utilisent le registre transversal existant.
- [x] _Pinocchio_ rejoint `temps-des-chefs-d-oeuvre` sans créer d’Époque
      supplémentaire.
- [x] Les créations et enrichissements restent séparés de la migration
      décrite dans [`retroapplication.md`](./retroapplication.md).

## Dernière image

Le corpus ne cherche pas à tout faire entrer au générique. Il donne une place
autonome à ce qui peut soutenir un récit, conserve le reste dans des relations
honnêtes et transmet chaque incertitude au train qui possède sa preuve.
