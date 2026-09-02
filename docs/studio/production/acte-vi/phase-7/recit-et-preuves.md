# Acte VI · Phase 7 · Contrat du récit et des preuves

> **Document interne de production**<br>
> Contrat d’implémentation du Train 7A.

## Promesse

Un récit éditorial du Codex doit rester agréable à lire tout en permettant de
retrouver la provenance de ses affirmations importantes. La preuve complète
la lecture ; elle ne la remplace pas et ne la découpe pas jusqu’à la rendre
mécanique.

Le contrat installe trois profondeurs depuis un seul état de vérité :

1. le récit continu ;
2. les citations proches du paragraphe ;
3. la carte synthétique des preuves et des réserves.

## Deux formes compatibles

### Paragraphe historique

```json
{
    "titre": "Un chapitre existant",
    "paragraphes": ["Le texte demeure une chaîne."],
    "sources": ["source-du-chapitre"]
}
```

Cette forme reste valide. Elle conserve les citations groupées au bas du
chapitre et ne reçoit aucune migration forcée.

### Paragraphe structuré

```json
{
    "id": "chapitre-exemple",
    "titre": "Un chapitre vérifiable",
    "question": "Que permet réellement d’établir la matière ?",
    "paragraphes": [
        {
            "id": "chapitre-exemple-affirmation",
            "texte": "Une idée documentaire cohérente.",
            "sources": ["source-qualifiee"],
            "reserve": "Le périmètre connu demeure partiel."
        }
    ]
}
```

Cette forme est celle des huit chapitres de _Pinocchio_. Elle rapproche les
preuves du texte et rend les réserves visibles sans les confondre avec une
erreur système.

## Invariants

### Identifiants

- `bloc.id` identifie le chapitre et devient son ancre publique ;
- `paragraphe.id` identifie l’affirmation cohérente et devient son ancre ;
- les identifiants utilisent le kebab-case et ne sont jamais dérivés du texte
  affiché une fois publiés ;
- les anciens blocs sans identifiant reçoivent uniquement un identifiant de
  dérivation en mémoire, jamais une mutation silencieuse de leurs données.

### Question

`question` est optionnelle pour la compatibilité et obligatoire pour les huit
chapitres de Phase 7. Elle est projetée comme description du header de section.

### Sources

- un paragraphe structuré porte au moins une source centrale ;
- `bloc.sources` reste le contrat historique et peut porter des sources
  générales non attribuées à un paragraphe précis ;
- une source déjà projetée sous un paragraphe n’est pas répétée au bas du
  chapitre ;
- l’agrégateur réunit les deux niveaux pour les résolveurs et les lectures
  dérivées ;
- aucune notice bibliographique n’est copiée dans le bloc.

### Réserve

`reserve` explique une limite documentaire : divergence, périmètre, précision
ou manque connu. Elle :

- reste optionnelle ;
- est reliée au même ensemble de sources que le paragraphe ;
- possède un libellé textuel explicite ;
- ne dépend ni de la couleur ni d’une icône pour être comprise ;
- n’est jamais utilisée pour excuser une affirmation insuffisamment sourcée.

## Carte dérivée

`deriveCartePreuvesEditoriale` produit, pour chaque bloc :

- l’identifiant ;
- le titre et la question ;
- le nombre de paragraphes ;
- l’ensemble dédupliqué des sources du bloc et de ses paragraphes ;
- les réserves et l’identifiant du paragraphe qui les porte.

Cette dérivation est la seule entrée autorisée pour la future carte publique.
Elle évite un manifeste éditorial parallèle qui pourrait diverger du récit.

La Phase 7A n’impose pas encore sa mise en scène finale. Les listes, tableaux
ou composants du Train 7G devront consommer cette dérivation.

## Projection

`CodexFicheBlocsEditoriaux` :

- traite les chaînes comme auparavant ;
- projette un paragraphe structuré dans un conteneur ancré ;
- place ses citations immédiatement après son contenu et sa réserve ;
- conserve les sources générales restantes au bas du chapitre ;
- utilise `PixieCallout` pour la réserve documentaire ;
- reste un composant serveur sans état client.

`CodexFicheSection` accepte l’identifiant du chapitre et le transmet à la
section sémantique. La question rejoint son header existant ; aucun nouveau
niveau de titre n’est inventé.

## Consommateurs

`getFicheSourceIds` parcourait déjà les structures imbriquées et recueille donc
les nouvelles sources sans traitement particulier. Le dérivateur des preuves
des Plans est raccordé à l’agrégateur commun afin qu’un paragraphe structuré ne
disparaisse pas de cette lecture.

## Contrôles

`check:phase-7` refuse :

- un bloc ou un paragraphe vide ;
- un identifiant invalide ou dupliqué dans sa fiche ;
- une source inconnue ou dupliquée ;
- un paragraphe structuré sans preuve ;
- une réserve vide ;
- la disparition de la fixture historique ou structurée ;
- la sortie du contrôle de `check` ou `check:ci`.

`check:oeuvres` contrôle également les sources déclarées dans les paragraphes
structurés des Œuvres. Les règles propres aux huit chapitres, à leur ordre et
aux formulations interdites seront ajoutées à mesure que leur matière entre
dans le dépôt.

## Décision de simplicité

Le contrat s’arrête au paragraphe. Il ne crée ni fragments de phrase, ni notes
inline, ni graphe de claims, ni nouvelle base documentaire. Si un paragraphe
porte deux affirmations qui exigent des preuves ou réserves incompatibles, la
bonne opération est de le scinder éditorialement.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**
