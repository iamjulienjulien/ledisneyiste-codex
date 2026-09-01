# Acte VI · Phase 2 · Périmètre de rétroapplication

> **Document interne de production**<br>
> Préparé par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Fonction du document

La rétroapplication ne signifie plus « enrichir le plus loin possible ». Elle
désigne désormais un futur chantier de **69 entrées mesurables**, décrit par
[`retroapplication.json`](./retroapplication.json) et exécuté seulement en
Phase 5 après les contrats des Phases 3 et 4.

Le manifeste couvre :

- les 23 Œuvres publiées ;
- les 22 Personnages publiés ;
- 19 Créateurs publiés à enrichir ;
- quatre Chansons rétrospectives à créer ;
- l’Époque `temps-des-chefs-d-oeuvre` à enrichir.

Il ne modifie aucune Archive, aucun type et aucune route pendant la Phase 2.

## Contrat de profondeur

### R1 · Structure

L’entrée adopte un nouveau contrat sans recevoir artificiellement une matière
éditoriale absente. Ce niveau existe comme unité de migration, mais aucune
entrée du périmètre minimal ne s’y arrête : le brief exige aussi une identité
localisée sourcée pour toutes les Œuvres et tous les Personnages existants.

### R2 · Identité et relations

L’entrée valide le nouveau contrat, conserve son URL historique, documente sa
forme française et sa forme originale avec provenance, puis reçoit les
relations réellement applicables. **68 entrées** relèvent de ce niveau.

R2 n’exige ni récit long ni remplissage de tous les champs optionnels. Une
absence documentée reste préférable à une précision fabriquée.

### R3 · Échantillon complet

_Snow White and the Seven Dwarfs_ devient la seule entrée R3. Sa fiche doit
éprouver l’ensemble utile du futur modèle : identité localisée, sorties,
versions, chansons, créateurs, personnages, époque, récompenses, sources et,
lorsqu’elles franchissent la future règle de publication, données
économiques.

Cette profondeur sert de contrôle de réalité à _Pinocchio_ ; elle ne transforme
pas automatiquement les 22 autres Œuvres en fiches longues.

## Mesures arrêtées

| Mesure                                            | Cible |
| ------------------------------------------------- | ----: |
| Œuvres existantes migrées                         | 23/23 |
| Personnages existants migrés                      | 22/22 |
| Identités FR/originale sourcées                   | 45/45 |
| Routes historiques de détail préservées           | 45/45 |
| Créateurs existants avec verdict d’enrichissement | 19/19 |
| Chansons rétrospectives publiées                  |   4/4 |
| Époque existante enrichie                         |   1/1 |
| Références vers une entrée inconnue               |     0 |
| Routes canoniques dupliquées                      |     0 |

La cible « 45/45 identités » signifie qu’une entrée possède une forme
française principale, une forme originale et la provenance de chacune. Ces
deux formes peuvent être identiques ; elles ne doivent pas être dupliquées
uniquement pour satisfaire un compteur.

## Profils de migration

### Œuvres existantes · 23 entrées

Chaque Œuvre doit :

1. adopter le contrat d’identité localisable de la Phase 3 ;
2. conserver `/oeuvres/[slug]` comme URL canonique ;
3. documenter titre français principal et titre original ;
4. conserver les autres titres dans la fiche, pas dans la route ;
5. résoudre les liens applicables vers Chansons, Créateurs, Personnages,
   Époque, Récompenses et Sources ;
6. garder les champs progressifs optionnels lorsqu’aucune matière ne les
   justifie.

_Three Little Pigs_ reçoit en plus le raccord vers _Who’s Afraid of the Big
Bad Wolf?_. _Snow White and the Seven Dwarfs_ reçoit le niveau R3 et les trois
chansons rétrospectives.

### Personnages existants · 22 entrées

Chaque Personnage doit :

1. adopter le même principe d’identité localisable ;
2. conserver `/personnages/[slug]` ;
3. documenter nom français principal et nom original ;
4. préserver les alias comme identités documentaires, jamais comme routes
   implicites ;
5. conserver création et première apparition dans leur source de vérité ;
6. ne recevoir que les relations supplémentaires soutenues par les nouvelles
   Archives.

Douze fiches possèdent déjà 14 noms alternatifs. Elles doivent être vérifiées,
pas recréées. Les dix autres exigent une recherche d’identité. L’alias
`Humbert` du Chasseur reste une exception explicite tant que sa langue ou sa
nature exacte n’est pas arrêtée.

### Créateurs existants · 19 entrées

Ces fiches ne subissent pas une migration globale par défaut. Elles reçoivent
un verdict individuel : enrichir, conserver en l’état ou reporter. Une
contribution à _Pinocchio_ n’est ajoutée que si son rôle exact et sa source
sont établis.

La liste canonique et les axes attendus vivent dans
[`corpus.md`](./corpus.md). Le slug `vladimir-bill-tytla` reste la route
canonique même si le brief le nomme « Bill Tytla ».

### Chansons rétrospectives · quatre entrées

Les trois chansons de _Blanche-Neige_ et _Who’s Afraid of the Big Bad Wolf?_
rejoignent le futur index Chansons après création du contrat en Phase 4. Leur
présence est une création rétrospective, pas une migration depuis une fausse
fiche existante.

Chaque entrée doit au minimum porter :

- titre français et titre original sourcés ;
- œuvre et occurrence d’origine ;
- auteurs/compositeurs et interprètes documentés ;
- relations vers les entrées déjà publiées ;
- statut explicite de toute matière audio ou lyrique.

### Époque existante · une entrée

`temps-des-chefs-d-oeuvre` reçoit un enrichissement ciblé. Le rattachement
chronologique de _Pinocchio_ reste dérivé de la date et des bornes de l’Époque.
La fiche peut expliquer le contexte, mais ne recopie ni les sorties, ni les
montants, ni le récit complet de l’Œuvre.

## Ordre d’exécution proposé pour la Phase 5

1. **Geler la référence.** Vérifier que les 45 slugs et routes historiques
   concordent encore avec le manifeste.
2. **Migrer sans enrichir.** Adapter les 23 Œuvres et 22 Personnages au nouveau
   contrat, avec tests de lecture et absence de route cassée.
3. **Projeter les identités.** Ajouter formes françaises et originales avec
   leurs sources, puis étendre la recherche par jointure catalogue/fiche.
4. **Éprouver R3.** Finaliser _Snow White and the Seven Dwarfs_ comme fixture
   réelle avant le traitement en série.
5. **Créer le noyau Chansons.** Publier les quatre entrées rétrospectives et
   relier leurs œuvres.
6. **Enrichir les relations.** Traiter les 19 Créateurs et l’Époque selon leur
   verdict individuel.
7. **Fermer les exceptions.** Résoudre ou reporter explicitement chaque état
   `sourcesState` et chaque `exception` du JSON.
8. **Mesurer la sortie.** Recalculer toutes les cibles, vérifier les routes,
   collisions, références et sources, puis comparer avec le manifeste.

Cet ordre évite de mêler une erreur structurelle à une lacune documentaire :
le contrat fonctionne d’abord, la matière vient ensuite.

## Redirections et routes historiques

La décision `DEC-002` conserve un seul slug canonique stable. En conséquence :

- les 23 routes `/oeuvres/[slug]` et les 22 routes
  `/personnages/[slug]` présentes au relevé doivent toujours résoudre ;
- une nouvelle forme française ne renomme pas automatiquement le slug ;
- aucun alias ne vient d’un titre ou nom alternatif par convention ;
- une redirection n’est créée que pour une ancienne URL réellement publiée ;
- la cible d’une redirection est toujours la route canonique unique.

Le compteur de 45 routes mesure la préservation du périmètre migré. Les routes
des Créateurs sont conservées elles aussi, mais elles ne changent pas de
contrat dans ce manifeste et ne sont donc pas comptées comme migration de
routes.

## Exceptions connues

| Exception                         | Traitement                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| `snow-white-and-the-seven-dwarfs` | Seule fiche R3 ; toute difficulté du modèle doit être résolue avant le traitement en série. |
| `three-little-pigs`               | Reçoit la chanson rétrospective antérieure aux longs métrages.                              |
| `la-reine`                        | Éprouve identité originale et alias distincts.                                              |
| `le-chasseur`                     | `Humbert` ne reçoit pas de langue inventée ; l’identité reste à qualifier.                  |
| `vladimir-bill-tytla`             | Le libellé du brief ne modifie ni le slug ni le nom canonique sans arbitrage séparé.        |
| `david-hand`                      | Une comparaison éditoriale n’autorise pas à inventer un crédit sur _Pinocchio_.             |
| Chansons rétrospectives           | Leur création dépend du contrat de Phase 4 ; audio et paroles restent hors autorisation.    |

## Critères de contrôle futur

Le manifeste pourra être considéré comme achevé lorsque :

- [ ] le JSON contient encore exactement toutes les entrées concernées et
      aucun slug inconnu ;
- [ ] les totaux par famille et profondeur correspondent à `expectedTotals` ;
- [ ] les 45 fiches structurelles valident leur futur schéma ;
- [ ] les 45 URL historiques retournent leur page canonique ;
- [ ] les identités françaises et originales sont présentes, sourcées et sans
      collision normalisée non résolue ;
- [ ] les quatre chansons rétrospectives possèdent une route et une occurrence
      d’origine ;
- [ ] les 19 Créateurs possèdent un verdict et aucune contribution non sourcée ;
- [ ] l’Époque existante absorbe _Pinocchio_ sans nouvelle période ;
- [ ] toutes les exceptions sont fermées ou transmises avec une phase de
      reprise ;
- [ ] les vérificateurs du dépôt et la projection complète sont verts.

## Hors champ

Le manifeste ne demande pas :

- une fiche longue pour chaque Archive existante ;
- la traduction complète du Codex ;
- une route par langue ou territoire ;
- la rétroapplication de tous les futurs domaines Musiques ou Œuvres sources ;
- l’ajout des cinq chansons de _Pinocchio_, qui appartient à la production
  nouvelle de Phase 6 ;
- la publication de médias ou de paroles ;
- le remplissage de champs économiques sans franchir la règle du Train 2E.

## Décision validée

Julien valide `DEC-009` avec le périmètre suivant : **69 entrées, 45
migrations structurelles et linguistiques, 19 enrichissements de Créateurs,
quatre créations rétrospectives de Chansons et un enrichissement d’Époque**.

Toute extension future doit ajouter une ligne au manifeste, un motif, une
profondeur, une source attendue et une phase de reprise. « Le plus loin
possible » n’est plus un critère d’achèvement.

## Dernière image

La rétroapplication possède désormais une première et une dernière bobine.
Elle peut avancer loin sans confondre ambition éditoriale et migration
infinie.
