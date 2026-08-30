# Acte VI · Phase 0 · Transmission du Train 0D

> **Document interne de production**<br>
> Préparé par **🔩 R2-D2**, Lead Dev chez **Guru Éditions**.

## Verdict

Le Guidebook possède son premier Écran de lecture. `PixieDustMarkdown` v0.1.0
reçoit les blocs produits par le Train 0C et les restitue sous une structure
HTML sémantique, sans analyser de Markdown dans l’interface et sans ouvrir la
route `/guidebook`.

Le composant demeure une esquisse confinée à l’Atelier.

## Contrat retenu

Le verbe de l’Écran est **restituer** :

```text
fichier autorisé
→ analyse Guidebook côté serveur
→ blocs + liens + alternatives
→ PixieDustMarkdown
→ document HTML sémantique
```

La primitive ne lit aucun fichier, ne contacte pas Notion, ne connaît aucune
arborescence et ne décide d’aucune route. Elle reçoit uniquement une liste de
`GuidebookBlock`.

## Matière projetée

La v0.1.0 restitue :

- les six niveaux de titres avec décalage borné et ancres préfixables ;
- paragraphes, emphases, renforts, retraits, code en ligne et sauts de ligne ;
- citations ;
- listes ordonnées, non ordonnées, imbriquées et tâches annoncées ;
- tableaux GFM dans un viewport accessible au clavier ;
- code colorisé sans injection HTML ;
- compositions ASCII confiées à `PixieDustAscii` ;
- séparateurs thématiques ;
- blocs inconnus sous un contrechamp textuel neutre ;
- état vide explicite.

## Deux axes visuels

L’API reste volontairement courte :

- `measure` choisit une mesure de lecture, large ou pleine largeur ;
- `density` règle un rythme compact, confortable ou aéré.

Le composant n’impose aucune surface générale, texture ou couleur éditoriale.
Le parent conserve la responsabilité du Décor.

## Liens et frontières

Les destinations déjà résolues sont respectées sans reconstruction :

- liens internes, externes et ancres restent navigables ;
- destinations privées et invalides deviennent du texte non focalisable ;
- un suffixe invisible explique leur indisponibilité aux technologies
  d’assistance ;
- `anchorPrefix` raccorde titres et ancres locales lorsqu’un extrait est
  intégré dans une autre page.

## Code partagé

La coloration syntaxique n’appartient plus exclusivement à
`AtelierCodeBlock`. Un tokenizer neutre vit désormais dans
`src/lib/code-tokens.ts` et fournit des tokens React sûrs aux deux projections.
La chaîne reste échappée : aucun HTML colorisé n’est injecté.

## Alternative ASCII

Le Train 0C reconnaissait déjà les compositions ASCII. L’analyse produit
maintenant aussi leur alternative textuelle en retirant les traits de cadre et
en conservant les lignes signifiantes. `PixieDustMarkdown` peut ainsi utiliser
`PixieDustAscii` sans faire annoncer chaque caractère décoratif.

## Frontière de fichiers renforcée

La première compilation de la fixture réelle a révélé que l’accès dynamique
pouvait entraîner le traçage de tout le dépôt par Turbopack. La racine locale
est désormais exprimée statiquement sous `docs/agents/` et vérifiée contre le
manifeste avant toute lecture.

Le build ne signale plus de traçage global et `docs/studio/` reste hors de la
projection comme du bundle attendu.

## Répétition dans l’Atelier

Le dossier **Écran 002** éprouve :

- un véritable extrait de la salle de briefing chargé côté serveur ;
- une bobine riche couvrant tous les blocs courants ;
- un fragment HTML neutralisé ;
- un document vide ;
- mesure, densité, décalage des titres et ancres ;
- les deux Lumières et les trois cadres de projection.

La régie client reçoit des fixtures déjà analysées. Aucun parseur Markdown ne
rejoint son bundle.

## Hors champ conservé

Ce train ne crée :

- ni sommaire général ;
- ni arborescence de bibliothèque ;
- ni recherche documentaire ;
- ni intégration Notion ;
- ni route `/guidebook` ;
- ni composant stable autorisé dans le Codex public.

Ces responsabilités restent destinées à `PixieDustDocs` et aux trains
suivants.

---

**🔩 R2-D2 · Lead Dev @ Guru Éditions**<br>
_Écran documentaire · La structure avant la lumière_
