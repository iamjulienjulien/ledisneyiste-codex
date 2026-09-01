# Intégration au registre et à PixieSymbol

Ce protocole commence seulement lorsque les masters, les transparents HD et
la planche ont été validés. Le contrat détaillé reste celui du
[chapitre 05](../../../agents/05-symboles-registres-et-collections.md).

## 1. Respecter le périmètre demandé

Une validation artistique n’autorise pas automatiquement l’intégration. Une
demande d’intégration n’autorise pas automatiquement le commit.

Avant toute modification du dépôt :

- se placer à sa racine ;
- lire `AGENTS.md` et le chapitre 05 ;
- examiner `git status --short` ;
- identifier les WIP étrangers au chantier ;
- confirmer la collection source et, en cas de refonte, le bon dossier de
  masters ;
- comparer la liste des fichiers validés avec les slugs attendus.

## 2. Produire les dérivés web

Pour chaque transparent HD validé :

- conserver le canevas carré ;
- réduire en haute qualité à `384 × 384 px` ;
- préserver le canal alpha ;
- retirer uniquement le préfixe numérique ;
- ne pas accentuer ou recolorer seulement le dérivé web ;
- écrire le fichier sous :

```text
public/symbols/<registre>/<collection>/<slug>.png
```

Exemple :

```text
Transparents/03-megaphone-promotion.png
        ↓
public/symbols/general/communication/megaphone-promotion.png
```

Lors d’un remplacement, vérifier que le nouveau fichier vient bien de la
refonte validée et non d’un ancien dossier au nom voisin.

## 3. Déclarer les définitions

Les sous-registres vivent dans :

```text
src/registry/symbols/
```

Chaque symbole fournit exactement :

```ts
slug: {
    src: "/symbols/<registre>/<collection>/<slug>.png",
    label: "Libellé humain en français",
    accent: "var(--token-semantique)",
}
```

Règles :

- le slug TypeScript, le chemin et le nom de fichier concordent ;
- le label décrit le signe, sans reprendre mécaniquement le slug ;
- l’accent existe réellement dans `src/registry/colors` ;
- aucune table parallèle n’est créée dans une page ou un composant ;
- le typage est inféré naturellement, sans cast destiné à masquer une clé
  absente.

## 4. Cas d’une collection existante

Pour ajouter ou remplacer des symboles dans une collection déjà connue :

1. écrire les fichiers publics ;
2. ajouter ou mettre à jour les définitions dans le sous-registre concerné ;
3. rechercher les anciennes clés et anciens chemins ;
4. vérifier les usages éditoriaux qui dépendent des slugs ;
5. ouvrir la collection dans le dossier Atelier de `PixieSymbol`.

Ne pas modifier le registre central si la collection y est déjà exposée.

## 5. Cas d’une nouvelle collection ou d’un nouveau registre

Une nouvelle collection exige en plus :

- une frontière sémantique documentée ;
- son exposition dans le sous-registre correspondant ;
- sa présence dans les projections de l’Atelier ;
- l’adaptation des listes de vérification si elles sont explicites.

Un nouveau registre exige en plus :

- un fichier `symbols-<registre>.ts` ;
- son import et son exposition dans `src/registry/symbols/index.ts` ;
- son chargement dans `scripts/verifier-symboles.mjs` ;
- les raccords de types et consommateurs révélés par le compilateur ;
- la documentation de sa frontière et de ses collections.

Ne pas ouvrir un registre pour résoudre un simple problème de rangement.

## 6. Éprouver avec PixieSymbol

L’interface consomme les signes avec `PixieSymbol`. Elle ne recopie pas leur
chemin public.

Contrôler dans l’Atelier :

- la résolution de la clé `registre.collection.slug` ;
- la collection complète ;
- `24 px`, `48 px`, `96 px` et au moins une taille éditoriale ;
- les Lumières sombre et claire ;
- un fond coloré proche de l’accent ;
- l’usage décoratif ;
- l’alternative textuelle si le signe porte une information.

Si le dossier Atelier parcourt déjà le registre dynamiquement, ne pas ajouter
une seconde liste manuelle pour « intégrer à PixieSymbol ».

## 7. Vérifier sans abîmer un WIP

Commencer par le contrôle ciblé :

```bash
pnpm check:symbols
```

Puis examiner le diff et les fichiers publics.

Avant un commit validé, la projection complète attendue est :

```bash
pnpm check
```

Cette commande lance aussi le formatage. Si le dépôt contient des WIP
étrangers, ne pas la lancer aveuglément : signaler le risque, obtenir un
raccord ou isoler le chantier selon les règles du plateau. Après exécution,
vérifier que le formatteur n’a pas embarqué de fichiers hors périmètre.

## 8. Revue mécanique minimale

- [ ] Tous les PNG publics mesurent `384 × 384 px`.
- [ ] Tous possèdent un canal alpha utile.
- [ ] Aucun fichier public n’est orphelin.
- [ ] Aucun chemin du registre ne pointe vers un fichier absent.
- [ ] Les clés utilisées par les blocs éditoriaux existent.
- [ ] Les anciennes clés retirées ne sont plus consommées.
- [ ] La collection apparaît dans l’Atelier.
- [ ] `pnpm check:symbols` réussit.
- [ ] Le diff ne contient aucun WIP étranger.

## 9. Proposition de commit

Avant d’enregistrer :

1. présenter les fichiers ajoutés ou remplacés ;
2. séparer si nécessaire assets, registre et documentation en commits
   cohérents ;
3. proposer le domaine, le message exact et la signature du véritable auteur ;
4. attendre la validation explicite de Julien ;
5. lancer les contrôles convenus ;
6. commiter uniquement le périmètre approuvé.

Pour une transmission procédurale destinée aux futurs agents, le domaine
`📡 Transmission` est généralement le plus juste. La signature reste celle de
l’auteur réel du travail.

## 10. Transmission d’intégration

Remettre :

- les collections et slugs intégrés ;
- les chemins publics et fichiers de registre modifiés ;
- les remplacements effectués ;
- les contrôles visuels et commandes réussies ;
- les vérifications non exécutées et leur raison ;
- le périmètre exact du ou des commits proposés.
