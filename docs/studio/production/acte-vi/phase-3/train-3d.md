# Acte VI · Phase 3 · Train 3D

> **Document interne de production**<br>
> Établi par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Mission

Le Train 3D sépare définitivement le nom d’une Archive de son chemin public.
Il fige les 79 routes canoniques issues des catalogues, formalise la preuve
exigée par un éventuel alias historique et prépare une redirection permanente
sans inventer d’ancienne URL.

## Inventaire canonique

`scripts/fixtures/routes-codex.json` conserve la photographie de référence du
1er septembre 2026 :

| Famille    | Segment public  | Routes |
| ---------- | --------------- | -----: |
| Personnage | `personnages`   |     22 |
| Créateur   | `contributeurs` |     32 |
| Œuvre      | `oeuvres`       |     23 |
| Époque     | `epoques`       |      2 |
| **Total**  |                 | **79** |

Les catalogues demeurent la source de vérité. L’inventaire est une bobine de
non-régression : une évolution volontaire des routes doit modifier les
catalogues et actualiser explicitement cette photographie ; un changement
accidentel échoue au vérificateur.

`construireRouteCanoniqueCodex` porte les trois dialectes existants sans les
confondre : la famille métier `createurs` continue notamment de produire le
segment public `contributeurs`.

## Contrat d’alias

`AliasNavigationCodex` quitte le contrat d’identité pour rejoindre
`src/types/navigation.ts`. Une projection d’identité peut encore recevoir des
aliases déjà résolus, mais leur structure appartient désormais au domaine de
navigation :

- `chemin` — ancienne URL effectivement publiée ;
- `cible` — route canonique actuelle ;
- `nature` — uniquement `route-historique` ;
- `provenance` — trace durable qui prouve l’existence antérieure du chemin.

Une identité originale, localisée, territoriale ou éditoriale ne remplit
jamais ce contrat par elle-même.

## Préparation des redirections

`preparerRedirectionsNavigationCodex` transforme uniquement une liste
explicite d’aliases en objets compatibles avec `redirects()` de Next.js. La
fonction refuse :

- un chemin ou une cible mal formés ;
- une cible absente de l’inventaire canonique ;
- un alias qui masque une route canonique ;
- un chemin déclaré plusieurs fois ;
- une provenance vide.

Chaque sortie porte `permanent: true`. Dans la convention Next.js 16.3.1
utilisée par le dépôt, cette valeur produit une redirection permanente `308`
qui conserve la méthode de la requête.

## Arbitrage de volume

L’audit ne relève actuellement **aucune ancienne URL publiée** à préserver. Le
Train 3D n’ajoute donc :

- aucun registre de production vide ;
- aucune redirection factice dans `next.config.ts` ;
- aucune route tirée de `Sneezy`, `Snow White`, `The Evil Queen`, `Humbert` ou
  _Blanche-Neige et les Sept Nains_.

Lorsqu’une première URL historique réelle sera établie, une petite liste
explicite pourra être préparée avec le contrat du Train 3D puis remise à
`next.config.ts#redirects`. Un registre serveur ou une autre frontière ne sera
réévalué que si le volume réel dépasse ce cadre borné.

## Bobine témoin

La route privée `/fixture/personnages/reine` éprouve le contrat sans être
publiée. Elle produit une redirection permanente vers
`/personnages/la-reine`, route présente dans l’inventaire.

Le vérificateur refuse en parallèle :

- la même bobine sans provenance ;
- une cible inconnue ;
- une source qui entre en collision avec la route canonique ;
- la déclaration répétée du même alias.

`/personnages/archive-absente` reste hors de l’inventaire. Les quatre pages de
fiche conservent `dynamicParams = false` et leurs paramètres statiques issus
des catalogues : une route absente demeure donc une page introuvable.

## Garde-fou contre les routes déduites

Le contrôle vérifie que le module de navigation ne dépend ni des types ni des
fonctions de résolution des identités documentées. L’inventaire canonique est
reconstruit uniquement depuis les slugs des quatre catalogues et les aliases
publiés restent absents tant qu’aucune ancienne URL n’est prouvée.

Une future URL historique pourra donc ressembler à un ancien nom sans être
refusée arbitrairement : ce sont sa déclaration explicite, sa provenance et sa
cible canonique qui l’autoriseront, jamais la transformation automatique d’une
identité en slug.

## Frontière tenue

Le Train 3D n’a :

- renommé aucun slug ;
- modifié aucune route publique ;
- ajouté aucun préfixe `/fr` ou `/en` ;
- déclaré aucune ancienne URL non prouvée ;
- transformé aucun nom ou titre alternatif en route ;
- commencé aucune migration de la Phase 5.

## Passage au Train 3E

Les routes sont maintenant protégées indépendamment de l’identité projetée.
Les surfaces du Codex peuvent recevoir une forme principale et une forme
originale sans risquer de modifier les liens publics qui les entourent.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Les noms changent de lumière. Les routes, elles, gardent le chemin._
