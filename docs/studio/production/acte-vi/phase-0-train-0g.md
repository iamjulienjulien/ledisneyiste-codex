# Acte VI · Phase 0 · Brief du Train 0G

> **Document interne de production**<br>
> Préparé par **🔩 R2-D2**, Lead Dev chez **Guru Éditions**.

## Mission

Mettre le Guidebook en projection dans les coulisses du Codex en assemblant
les trois Écrans désormais stables : `PixieAscii`, `PixieMarkdown` et
`PixieDocs`.

Le Train 0G ouvre des routes Next.js privées. Il ne publie pas la documentation
sur le site de production et ne donne aucun nouveau privilège aux composants
clients.

## Promesse de lecture

```text
route privée
    ↓ choisit une bibliothèque et un slug déclarés
adaptateur serveur
    ↓ autorise, lit, normalise et analyse
GuidebookDocument
    ↓ blocs, ancres, sommaire et liens déjà résolus
PixieMarkdown
    ↓ restitue le document
PixieDocs
    ↓ compose bibliothèque, sommaire et raccords
Guidebook
```

## Routes retenues

- `/guidebook` conduit vers le premier chapitre local ;
- `/guidebook/[slug]` projette les sept documents de `docs/agents/` ;
- `/guidebook/notion` conduit vers la racine Notion déclarée ;
- `/guidebook/notion/[slug]` projette uniquement les onze pages présentes dans
  le manifeste serveur et l’arborescence de projection.

Les segments dynamiques sont fermés par `generateStaticParams` et
`dynamicParams = false`. Un slug absent de la projection n’ouvre aucune route.

## Frontière privée

Le segment `/guidebook` reprend exactement la destination de l’Atelier :

- `notFound()` en production ;
- métadonnées `noindex` et `nofollow` ;
- aucun lien depuis la navigation publique du Codex ;
- navigation interne entre l’Atelier et le Guidebook uniquement ;
- aucune lecture de fichier, aucun appel Notion et aucun identifiant technique
  transmis au navigateur avant l’autorisation serveur.

La protection est répétée au point d’entrée des pages documentaires afin que
la compilation de production n’essaie jamais de charger Notion.

## Montage de la page

Le layout installe :

1. l’eyebrow **Projection privée** ;
2. l’identité **Le Guidebook** ;
3. une courte promesse de transmission ;
4. les accès aux chapitres locaux, aux dossiers Notion et à l’Atelier.

La projection partagée reçoit ensuite :

- l’arborescence déjà résolue avec ses véritables URLs ;
- le document courant ;
- son état, sa source et sa date éventuelle ;
- le sommaire dérivé de la même analyse ;
- les destinations précédente et suivante dans l’ordre déclaré.

Un contrôle propre à la route choisit entre la bibliothèque intégrée et sa
présence flottante. La préférence reste mémorisée pendant la traversée des
chapitres, sans ajouter de responsabilité à `PixieDocs`.

Le premier H1 générique du Markdown est absorbé par l’enveloppe de route.
`PixieDocs` porte alors le titre principal déclaré dans la bibliothèque ; les
titres suivants conservent leur niveau et leur ordre documentaire.

## Bibliothèque locale

La bibliothèque locale est toujours disponible en développement. Les liens
entre chapitres utilisent `/guidebook/[slug]`. Les chemins privés, le code du
dépôt et les ressources absentes du manifeste restent du texte non navigable.

## Bibliothèque Notion

La bibliothèque Notion reste additive :

- avec `NOTION_API_KEY`, la page déclarée est lue par l’adaptateur serveur ;
- sans clé, elle conserve l’état `deferred` ;
- une erreur distante devient un état documentaire, jamais une panne de la
  bibliothèque locale ;
- un lien Notion n’est actif que si sa cible figure dans les deux niveaux
  d’autorisation ;
- aucun appel réseau n’est effectué pendant la compilation de production,
  puisque la route y est fermée avant le chargement documentaire.

## Accessibilité et continuité

- un seul H1 visible nomme le document ;
- la bibliothèque est une navigation de listes imbriquées ;
- le filtre agit uniquement sur les titres déjà transmis ;
- le sommaire pointe vers les ancres réellement rendues ;
- les raccords précédent et suivant conservent des liens natifs ;
- le mode sticky ne recouvre pas le focus ;
- mobile, zoom à 200 %, contenus longs et états sans document restent lisibles ;
- aucune information ne dépend uniquement de la couleur.

Les cartes de service Guru Éditions sont distinguées des diagrammes ASCII au
moment de l’analyse. Leur projection gagne un cadre centré, plus respirant et
légèrement texturé, tandis que leur chaîne, leur copie et leur alternative
accessible demeurent strictement inchangées.

## Garde-fous attendus

`check:guidebook` doit désormais vérifier :

- l’existence des routes locales et Notion ;
- la fermeture explicite de leur segment en production ;
- les métadonnées privées ;
- la fermeture des paramètres dynamiques ;
- l’absence de lien `/guidebook` dans la navigation publique ;
- la présence du raccord interne avec l’Atelier ;
- l’usage des adaptateurs serveur et des trois Écrans promus ;
- l’absence de chemin local, d’identifiant Notion et de secret dans les arbres
  de projection transmis.

La compilation de production complète reste la répétition finale : elle doit
terminer sans requête Notion et laisser `/guidebook` hors projection.

## Hors champ

Ce train ne crée :

- aucune édition de Markdown ou de page Notion ;
- aucune recherche plein texte dans le contenu ;
- aucun cache persistant ou synchronisation Notion ;
- aucune route publique ou entrée dans la navigation du Codex ;
- aucun nouveau composant Pixie ;
- aucune copie de document dans une autre source de vérité.

## Définition de fin

Le Train 0G est terminé lorsque les deux bibliothèques se parcourent en
développement, que leurs états négatifs restent lisibles, que la frontière de
production est vérifiée et que la documentation du dépôt décrit fidèlement la
nouvelle projection privée.

---

**🔩 R2-D2 · Lead Dev @ Guru Éditions**<br>
_Projection privée · Les documents entrent en scène sans ouvrir les coulisses_
