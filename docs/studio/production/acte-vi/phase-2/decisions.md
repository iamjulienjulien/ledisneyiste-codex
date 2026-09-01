# Acte VI · Phase 2 · Registre des décisions

> **Document interne de production**<br>
> Tenu par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Fonction du registre

Ce document sépare les décisions établies des directions encore soumises à
preuve ou à arbitrage. Il ne modifie aucun contrat produit : il prépare les
Phases 3 à 9 en empêchant qu’une recommandation soit prise silencieusement
pour une capacité déjà livrée.

### Statuts

| Statut                  | Signification                                                            |
| ----------------------- | ------------------------------------------------------------------------ |
| `validé`                | La décision ne doit plus être rouverte sans information nouvelle.        |
| `à confirmer par audit` | Une direction existe, mais la preuve documentaire reste incomplète.      |
| `à décider`             | Une autorité ou un choix explicite est requis avant la phase dépendante. |
| `bloqué`                | Une information ou une autorisation extérieure est indispensable.        |

## Vue d’ensemble

| ID        | Décision                                  | Statut                  | Phase dépendante |
| --------- | ----------------------------------------- | ----------------------- | ---------------- |
| `DEC-001` | Italie comme troisième regard             | `à confirmer par audit` | Phases 6 et 7    |
| `DEC-002` | Convention des routes localisées          | `validé`                | Phase 3          |
| `DEC-003` | Statut de Carlo Collodi                   | `à confirmer par audit` | Phases 4 et 6    |
| `DEC-004` | Personnages autonomes                     | `à confirmer par audit` | Phase 6          |
| `DEC-005` | Créateurs à créer ou enrichir             | `à confirmer par audit` | Phase 6          |
| `DEC-006` | Corpus initial Chansons                   | `à confirmer par audit` | Phases 4 à 7     |
| `DEC-007` | Audio et paroles                          | `à confirmer par audit` | Phases 7 et 9    |
| `DEC-008` | Données financières                       | `à confirmer par audit` | Phases 4 et 7    |
| `DEC-009` | Rétroapplication                          | `à confirmer par audit` | Phase 5          |
| `DEC-010` | Responsabilité des identités alternatives | `validé`                | Phase 3          |
| `DEC-011` | Couverture des identités par la recherche | `validé`                | Phase 3          |

Les trois décisions du Train 2B sont validées par Julien et documentées
ci-dessous. Les autres recevront leurs preuves et leur verdict dans les trains
suivants.

## Train 2B · Identités, routes et recherche

### État mesuré des identités

Le catalogue possède l’identité canonique légère : `slug`, `nom`,
`sousTitre` et `type`. Les identités alternatives vivent actuellement dans
les fiches détaillées.

| Famille     | Entrées | Fiches avec identité alternative | Valeurs alternatives |
| ----------- | ------: | -------------------------------: | -------------------: |
| Personnages |      22 |                               12 |                   14 |
| Œuvres      |      23 |                                1 |                    1 |
| Créateurs   |      32 |                                0 |                    0 |
| Époques     |       2 |                                0 |                    0 |

Parmi les 14 noms alternatifs de Personnages :

- 12 sont des noms originaux anglais ;
- `The Evil Queen` et `Humbert` sont des alias ;
- 13 valeurs déclarent la langue `en` ;
- `Humbert` ne porte pas encore de langue ;
- chaque valeur possède au moins une source.

L’unique titre alternatif d’Œuvre est _Blanche-Neige et les Sept Nains_ :
titre de sortie territoriale en français, rattaché à la France et sourcé.

Les types existants distinguent déjà la nature, la langue, le territoire et
les sources. Ils ne portent aucun alias de route.

### État mesuré des routes

Le Codex public francophone expose une route canonique par entrée sous quatre
segments stables :

```text
/personnages/[slug]
/contributeurs/[slug]
/oeuvres/[slug]
/epoques/[slug]
```

Il n’existe actuellement :

- aucun préfixe de langue ;
- aucun segment `[lang]` ;
- aucun registre d’alias ;
- aucune redirection d’ancienne identité ;
- aucune route dérivée d’un nom ou titre alternatif.

Les routes de fiche sont fermées par `generateStaticParams()` et
`dynamicParams = false`. Le `slug` du catalogue est donc à la fois identifiant
de résolution et segment canonique.

La documentation locale de Next.js 16.3.1 distingue deux problèmes :

- une véritable interface multilingue organise toutes les routes sous un
  segment de langue tel que `app/[lang]` ;
- une ancienne URL ou un renommage ponctuel relève d’une redirection 308, via
  la configuration ou une autre frontière serveur adaptée au volume.

La présence de sources, titres ou événements italiens et américains ne rend
pas le produit multilingue. Une langue documentaire décrit la matière ; une
locale de route décrit la langue de toute l’interface.

### État mesuré de la recherche

La recherche indexe uniquement les quatre catalogues :

| Famille     | Champs indexés                                      |
| ----------- | --------------------------------------------------- |
| Personnages | nom, sous-titre, catégories et leurs libellés       |
| Créateurs   | nom, sous-titre, catégories et leurs libellés       |
| Œuvres      | nom, sous-titre, collection, type et leurs libellés |
| Époques     | nom et sous-titre                                   |

Conséquences :

- les 14 noms alternatifs de Personnages ne sont pas indexés comme tels ;
- le titre français documenté de _Snow White and the Seven Dwarfs_ n’est pas
  indexé depuis son champ `titresAlternatifs` ;
- aucun alias de route n’est indexable puisqu’aucun registre n’existe ;
- les index publics conservent l’ordre des catalogues et ne proposent que le
  choix Liste/Cards ;
- la recherche ne possède ni filtre ni tri supplémentaire.

Ce défaut de couverture vient de la frontière de données, pas de la
normalisation : la recherche sait déjà neutraliser casse, diacritiques,
ponctuation, `œ` et `æ`.

## DEC-002 · Convention des routes localisées

### Décision validée

**Conserver pendant l’Acte VI les routes francophones actuelles sans préfixe
de langue et maintenir un seul slug canonique stable par entrée.**

Les titres et noms localisés ne créent pas automatiquement une route. Une
future interface réellement multilingue devra traiter l’ensemble du produit
avec un segment `[lang]`, des dictionnaires et des métadonnées localisées ;
elle ne doit pas naître indirectement de la documentation territoriale de
Pinocchio.

Lorsqu’une ancienne URL doit être conservée, elle rejoint un registre
explicite d’alias de navigation et produit une redirection permanente vers la
route canonique. Un alias n’est jamais déduit automatiquement d’un titre ou
d’un nom alternatif.

### Justification

- le Codex est aujourd’hui rédigé et monté en français ;
- aucun dictionnaire ni aucune route localisée ne couvre l’interface ;
- ajouter seulement `/fr` créerait une promesse d’internationalisation sans
  contrepartie ;
- les 79 URL existantes sont stables et ne présentent aucun conflit ;
- le corpus territorial de l’Acte VI concerne la provenance documentaire,
  pas la langue d’usage du produit ;
- séparer aliases et identités empêche qu’une simple correction éditoriale
  casse une URL.

### Alternatives rejetées

#### Préfixer immédiatement toutes les routes par `/fr`

Rejeté : migration globale coûteuse, aucun second langage projeté,
redirections nécessaires pour toutes les URL existantes et bénéfice nul pour
la Phase 3.

#### Créer une route pour chaque titre localisé

Rejeté : plusieurs URL concurrentes pour une même archive,
explosion combinatoire par territoire et confusion entre identité
documentaire et navigation.

#### Choisir dynamiquement le slug selon le navigateur

Rejeté : URL non déterministe, partage et indexation ambigus,
relation fragile entre liens internes et contenu servi.

### Conséquence pour la Phase 3

La Phase 3 pourra conserver les routes actuelles. Elle n’ajoutera un contrat
d’alias que si l’inventaire des nouvelles identités révèle de véritables URL
historiques à préserver. La stratégie technique — petite liste de redirections
configurées ou registre serveur — sera choisie selon le volume réel, pas avant.

### Validation de direction

**Julien valide cette recommandation le 1er septembre 2026.** Toute évolution
future exige une information nouvelle et un nouvel arbitrage explicite.

## DEC-010 · Responsabilité des identités alternatives

### Décision validée

**Conserver l’identité canonique dans le catalogue et les identités
documentées dans la fiche, puis dériver les projections de recherche et
d’affichage par jointure sur le `slug`.**

Le contrat futur doit distinguer explicitement :

1. le nom ou titre canonique projeté par le Codex ;
2. les noms ou titres documentés, avec nature, langue, territoire et sources ;
3. les alias de navigation, rares et non éditoriaux ;
4. les libellés de recherche supplémentaires, uniquement lorsqu’ils ne sont
   pas déjà une identité documentaire.

### Justification

- le catalogue reste léger et suffit à publier une entrée ;
- la fiche possède déjà les sources et la nuance documentaire ;
- recopier les identités dans le catalogue créerait deux sources de vérité ;
- faire du titre localisé une URL confondrait document et navigation ;
- la jointure catalogue/fiche existe déjà dans les routes et les Cards.

### Alternative rejetée

Déplacer immédiatement toutes les identités dans un nouveau registre central
est disproportionné : le besoin actuel concerne deux familles et les contrats
existants portent déjà la bonne précision. Une extraction ultérieure ne serait
justifiée que si Chansons, Œuvres sources et plusieurs langues démontrent un
vocabulaire transversal réellement partagé.

### Lacunes à traiter en Phase 3

- prévoir des noms alternatifs sourcés pour les Créateurs si le corpus le
  réclame ;
- décider si `Humbert` doit recevoir une langue ou rester un alias sans
  territoire ;
- vérifier les doublons normalisés au sein d’une même fiche ;
- interdire qu’un alias de navigation soit implicitement généré depuis ces
  valeurs.

## DEC-011 · Couverture des identités par la recherche

### Décision validée

**Construire en Phase 3 une projection de recherche côté serveur qui joint
chaque entrée de catalogue à sa fiche et indexe les identités alternatives
sans les recopier.**

La première extension doit rester bornée :

- nom ou titre canonique ;
- sous-titre ;
- métadonnées légères déjà indexées ;
- noms ou titres alternatifs structurés ;
- éventuels libellés de recherche explicitement décidés.

Les paragraphes éditoriaux, sources et relations ne doivent pas rejoindre
l’index initial : ils changeraient la recherche d’identité en recherche plein
texte sans décision produit.

### Scénarios d’acceptation proposés

- `Sneezy` retrouve Atchoum ;
- `Snow White` retrouve Blanche-Neige ;
- `The Evil Queen` retrouve la Reine ;
- `Humbert` retrouve le Chasseur ;
- `Blanche-Neige et les Sept Nains` retrouve _Snow White and the Seven
  Dwarfs_ ;
- les mêmes recherches sans accents ni ponctuation restent valides ;
- chaque résultat conserve une seule URL canonique ;
- une identité alternative n’ajoute aucun doublon de résultat.

### Conséquences techniques futures

- `src/lib/recherche.ts` demeure une dérivation, pas une source de vérité ;
- le chargement des fiches reste côté serveur et n’alourdit pas le JavaScript
  client ;
- un vérificateur mesure la couverture et les collisions normalisées ;
- le contrat de résultat peut rester groupé sur les quatre familles tant que
  les nouveaux domaines ne sont pas publiés.

### Alternative rejetée

Recopier tous les noms et titres alternatifs dans les catalogues uniquement
pour la recherche est rejeté : cette duplication se désynchroniserait des
sources et de la fiche qui possède la nuance documentaire.

## Arbitrage validé par Julien

Le Train 2B recommande un ensemble cohérent :

1. **routes actuelles sans préfixe de langue** pendant l’Acte VI ;
2. **un slug canonique stable** par entrée ;
3. **aucune route dérivée automatiquement** d’un titre localisé ;
4. **aliases de navigation explicites et séparés**, seulement lorsqu’une
   ancienne URL doit être préservée ;
5. **identités alternatives conservées dans les fiches** ;
6. **recherche enrichie par jointure catalogue/fiche** côté serveur.

Julien valide ce montage le 1er septembre 2026. Les décisions `DEC-002`,
`DEC-010` et `DEC-011` passent au statut `validé` et deviennent les contrats
documentaires transmis à la Phase 3.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Routes stables · identités sourcées · recherche dérivée_
