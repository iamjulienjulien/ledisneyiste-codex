# Acte VI · Clôture de la Phase 1

> **Document interne de transmission**<br>
> Établi par **🔩 R2-D2**, Lead Dev chez **Guru Éditions**.

## Verdict

La Phase 1 — **Projeter les composants promus de l’Atelier** — est terminée.
Sa répétition technique et la relecture visuelle de Julien dans les deux
Lumières sont validées.

Le Codex public emploie désormais Pixie partout où sa grammaire apporte un
contrat réel. Les composants sans usage légitime restent disponibles sans être
introduits pour satisfaire un quota. La projection s’accompagne d’une
architecture métier clarifiée et d’un garde-fou automatique contre les
principales régressions observées pendant la phase.

## Ce que la Phase 1 livre

### Quatre territoires Codex

Les composants métier publics sont répartis selon leur responsabilité :

- `CodexIndex` porte les pages, listes, Cards et commandes des collections ;
- `CodexFiche` compose les fiches et leurs sections documentaires ;
- `CodexLayout` installe les frontières partagées des routes publiques ;
- `CodexCommon` conserve les motifs réellement communs à plusieurs
  territoires.

Les 19 composants présents reprennent le préfixe de leur territoire. Les
dépendances vont vers `CodexCommon`, `CodexLayout` et Pixie, sans importer un
territoire de page voisin. Les props React sont colocalisées dans les dossiers
qui les possèdent ; `src/types` reste réservé aux contrats métier transversaux.

### Une projection choisie, pas forcée

Les 29 composants promus pendant l’Entracte V reçoivent tous une décision
explicite :

- **19 composants projetés**, directement ou au travers d’une composition
  Pixie déjà présente ;
- **10 composants conservés**, faute de besoin public correspondant à leur
  rôle actuel.

Les migrations visibles de la phase portent principalement sur :

- `PixieLink`, qui conduit désormais les vues d’index, les références, les
  citations et les autres navigations compatibles ;
- `PixieContainer`, qui unifie les cadres publics de 72 rem et le cadre de
  lecture resserré de la page introuvable ;
- `PixieSearchField`, passé en version `1.1.0`, qui remplace la régie de
  Recherche tout en conservant GET, `q`, l’URL partageable et la soumission
  sans JavaScript ;
- `PixieField`, `PixieInput` et `PixieButton`, projetés par cette composition
  sans duplication locale.

Le lien d’identité du header demeure volontairement un `Link` Next.js. Son
lockup et son survol propres ne correspondent pas aux variantes `inline`,
`action` ou `surface` de `PixieLink` ; cette exception conserve donc mieux le
contrat visuel que l’ajout d’une variante circonstancielle.

### Les absences assumées

La phase n’importe pas artificiellement :

- `PixieSidebar`, `PixieSwitcher`, `PixieRail` ou `PixieStickyRegion` sans
  composition publique correspondante ;
- `PixieTextarea`, `PixieSelect` ou `PixieSwitch` sans dialogue adapté ;
- `PixieLoader`, `PixieSkeleton` ou `PixieToast` sans état asynchrone ou action
  publique qui les réclame.

Ces composants restent prêts à projeter. Leur absence du Codex actuel est une
décision de conception, pas une dette de couverture.

## Le nouveau garde-fou

`pnpm check:pixie` vérifie désormais automatiquement :

- l’existence exclusive des quatre territoires Codex autorisés ;
- le préfixe et les quatre fichiers contractuels de chaque composant ;
- les directions de dépendance entre territoires ;
- l’absence de contrat React abandonné dans `src/types` ;
- l’absence de composant `PixieDust` dans les routes et composants publics ;
- l’absence de contrôle interactif HTML recréé alors qu’une primitive Pixie
  promue existe.

Ce contrôle rejoint `pnpm check` et `pnpm check:ci`. Il protège l’intention de
la Phase 1 au-delà de son commit de clôture.

## État de la répétition finale

L’audit automatique couvre :

- **19 composants Codex** dans quatre territoires ;
- **17 fichiers de types métier partagés** sans dépendance React ;
- **70 fichiers publics** sans esquisse PixieDust ni contrôle interactif
  recréé ;
- les vérificateurs documentaires et métier du dépôt ;
- le lint, TypeScript et la compilation complète des **114 pages**.

La relecture visuelle finale des changements de la Phase 1 a été validée par
Julien.

## Passage préparé

La Phase 2 peut désormais recevoir :

1. une architecture Codex dont les responsabilités sont nommées ;
2. une matrice exhaustive des composants projetés et conservés ;
3. des primitives publiques employées selon leur rôle plutôt que leur simple
   disponibilité ;
4. un garde-fou automatique intégré à chaque répétition générale.

La matrice détaillée demeure la source de suivi de la phase :
[`phase-1-matrice-projection.md`](./phase-1-matrice-projection.md).

---

**🔩 R2-D2 · Lead Dev @ Guru Éditions**<br>
_Phase 1 terminée · Pixie joue désormais son rôle dans le Codex public_
