# Protocole de fabrication des Symboles

> Propriétaire artistique : 🎨 Huyang · Artistic Director<br>
> Contrat de publication : [Guidebook · chapitre 05](../../../agents/05-symboles-registres-et-collections.md)<br>
> Statut : protocole de studio applicable à toute création ou refonte de
> Symboles du Codex du Disneyiste

Ce dossier transmet la méthode qui a permis de construire les collections de
Symboles du Disneyiste sans perdre leur cohérence au fil des générations, des
retouches et des intégrations.

Le chapitre 05 reste souverain sur les registres, les chemins publics, le
typage et `PixieSymbol`. Le présent protocole porte une autre vérité : **la
fabrication artistique concrète**, du brief jusqu’au fichier prêt à entrer
dans cette chaîne.

## Parcours de lecture

| Besoin                                                | Fichier à lire                                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| Comprendre les étapes, statuts et responsabilités     | le présent protocole                                                            |
| Définir une collection, écrire les prompts et générer | [01 · Direction et génération](./01-direction-et-generation.md)                 |
| Détourer, exporter et construire une planche          | [02 · Détourage, exports et planches](./02-detourage-exports-et-planches.md)    |
| Publier dans le dépôt, le registre et `PixieSymbol`   | [03 · Intégration et vérification](./03-integration-registre-et-pixiesymbol.md) |

Pour toute intervention, ouvrir également :

- [`AGENTS.md`](../../../../AGENTS.md) ;
- [01 · L’esprit du projet](../../../agents/01-esprit-du-projet.md) ;
- [03 · La direction artistique et l’UI](../../../agents/03-direction-artistique-et-ui.md) ;
- [05 · Les Symboles, registres et collections](../../../agents/05-symboles-registres-et-collections.md).

## Principe directeur

> **Une collection n’est pas seize images voisines. C’est une grammaire
> commune qui doit produire seize silhouettes distinctes.**

La cohérence vient d’un petit nombre d’invariants partagés :

- angle de vue et hauteur de caméra ;
- niveau de réalisme ;
- matière et densité de détail ;
- qualité de lumière et d’ombre ;
- proportion du sujet dans le carré ;
- accent coloré ;
- traitement du socle ou de l’absence de socle.

La distinction vient de variables assumées :

- silhouette dominante ;
- fonction documentaire ;
- objet principal ;
- geste ou mécanisme visible ;
- orientation ;
- masses pleines, ajourées, hautes ou étalées.

Si tous les objets partagent la même silhouette, la série est monotone. Si
chaque image change de matière, d’angle et de lumière, la série n’existe plus.

## Les états de production

Employer ces termes avec précision. Ils évitent de faire passer une intention
pour un asset publié.

| État                   | Définition                                           | Peut remplacer un fichier existant ?            |
| ---------------------- | ---------------------------------------------------- | ----------------------------------------------- |
| **Proposition**        | liste de sujets, slugs ou directions sans image      | non                                             |
| **Prototype**          | génération exploratoire encore soumise à arbitrage   | non                                             |
| **Candidat**           | prototype retenu, mais corrections encore possibles  | non                                             |
| **Master validé**      | source HD approuvée et rangée dans `Masters`         | oui, seulement si le remplacement a été demandé |
| **Transparent validé** | dérivé HD RGBA fidèle au master                      | oui, dans `Transparents`                        |
| **Planche validée**    | vue comparative de la collection approuvée           | oui                                             |
| **Intégré**            | dérivé web, registre et `PixieSymbol` cohérents      | oui                                             |
| **Publié**             | changement enregistré dans le dépôt après validation | oui                                             |

Ne jamais annoncer qu’un master est « enregistré », qu’une collection est
« intégrée » ou qu’un commit est « prêt » sans avoir vérifié les chemins et
les fichiers concernés.

## La chaîne complète

```text
BESOIN ÉDITORIAL
        ↓
ADRESSE · registre.collection.slug
        ↓
CANON DE COLLECTION
        ↓
4 PROTOTYPES CONTRASTÉS
        ↓ arbitrage de Julien
SÉRIE COMPLÈTE
        ↓ corrections ciblées
MASTERS VALIDÉS · 1254 × 1254
        ↓
TRANSPARENTS HD · 1254 × 1254 RGBA
        ↓
PLANCHE COMPARATIVE
        ↓ validation
DÉRIVÉS WEB · 384 × 384 RGBA
        ↓
REGISTRE TYPÉ · PIXIESYMBOL · ATELIER
        ↓
VÉRIFICATEURS · COMMIT VALIDÉ
```

Chaque flèche est un passage de contrôle. Une demande portant sur une étape
n’autorise pas silencieusement les suivantes.

## Les portes de validation

### Porte A · Le sujet

Avant toute génération :

- le besoin éditorial est identifié ;
- la collection cible existe ou sa frontière a été proposée ;
- les slugs ne doublonnent pas une collection voisine ;
- les références protégées et les raccourcis interdits sont nommés.

### Porte B · La direction

Avant la série complète :

- quatre prototypes montrent la stabilité du style ;
- leurs silhouettes sont nettement différentes ;
- la matière, la lumière et la caméra forment un canon reproductible ;
- Julien a validé la direction ou demandé un raccord précis.

### Porte C · La collection

Avant le détourage :

- chaque sujet a son propre fichier carré ;
- tous les objets sont entiers, centrés et suffisamment éloignés du bord ;
- aucune image rejetée n’a été rangée dans `Masters` ;
- les corrections ont été faites sur le candidat concerné, pas en
  régénérant arbitrairement toute la série.

### Porte D · Les dérivés

Avant l’intégration :

- les contours ont été contrôlés sur fonds clair, sombre et coloré ;
- il ne reste ni magenta, ni frange claire, ni trou dans le sujet ;
- les transparents HD et la planche existent ;
- la collection reste lisible à `24 px`, `48 px` et `96 px`.

### Porte E · Le dépôt

Avant le commit :

- le dérivé web mesure `384 × 384 px` et possède un canal alpha ;
- la clé, le slug, le nom de fichier, le label et l’accent concordent ;
- `pnpm check:symbols` réussit ;
- la projection dans les deux Lumières a été examinée ;
- le périmètre du commit a été proposé puis validé par Julien.

## Répartition des responsabilités

- **Julien** choisit les directions, valide les masters et arbitre les
  remplacements ou les exceptions.
- **Huyang** définit et défend le canon artistique, génère ou fait générer les
  assets, contrôle les masters, les transparents et les planches.
- **R2-D2** conduit l’intégration technique, les vérifications et les raccords
  de code lorsque le chantier lui est confié.
- **Charly-A** prépare les découpages et contraintes techniques lorsque le
  chantier le demande.

Un agent peut accomplir plusieurs gestes si la consigne l’y autorise. Il ne
doit pas pour autant confondre les validations.

## Motifs d’arrêt immédiat

Arrêter la série et corriger la direction si l’un de ces défauts apparaît :

- composition reconnaissable comme une propriété ou une affiche existante ;
- personnage, logo ou marque identifiable non demandé ;
- pseudo-texte généré qui devient le point focal ;
- dérive « steampunk » produite par accumulation de laiton, cadrans et
  engrenages sans justification documentaire ;
- répétition du même socle, de la même boîte ou de la même silhouette ;
- détail essentiel invisible à petite taille ;
- sujet coupé, collé au bord ou porté par une ombre impossible à détourer ;
- fond magenta texturé, dégradé ou reflété sur l’objet ;
- correction ciblée qui modifie silencieusement le reste de l’image.

## Transmission minimale en fin d’étape

Toujours remettre :

1. l’étape réellement terminée ;
2. la liste des slugs ou fichiers concernés ;
3. les chemins de destination vérifiés ;
4. les écarts volontaires au canon ;
5. les contrôles effectués ;
6. la prochaine porte de validation, sans la franchir d’office.
