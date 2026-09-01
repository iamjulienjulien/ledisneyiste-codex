# Direction et génération des Symboles

Ce protocole transforme un besoin éditorial en masters cohérents. Il ne traite
ni le détourage final ni l’intégration au dépôt.

## 1. Auditer avant de proposer

Avant de dessiner une collection ou de l’agrandir :

1. rechercher le concept et ses synonymes dans `src/registry/symbols` ;
2. ouvrir la planche de la collection si elle existe ;
3. examiner au moins quatre masters représentatifs à leur taille originale ;
4. relever les silhouettes, matières, angles et couleurs déjà employés ;
5. identifier les collections voisines avec lesquelles la nouvelle série ne
   doit pas se confondre ;
6. vérifier le statut réel : idée, prototype, master, transparent ou intégré.

Une planche donne le rythme. Les masters donnent la matière et les contours.
Le registre donne les noms réellement projectables. Aucun de ces trois
documents ne suffit seul.

## 2. Écrire la bible de collection

Avant le premier prompt, remplir ce contrat court :

```md
## Collection `<registre>.<collection>`

- Rôle documentaire :
- Public et contextes d’usage :
- Accent ou famille colorée :
- Silhouette générale :
- Angle de vue :
- Niveau de réalisme :
- Matières dominantes :
- Lumière :
- Densité de détail :
- Socle / sol / ombre :
- Marge de sécurité :
- Éléments autorisés :
- Éléments interdits :
- Collections à ne pas imiter :
- Références internes :
```

La bible doit être assez précise pour reconnaître une dérive et assez courte
pour être répétée dans chaque génération.

## 3. Construire la matrice des sujets

Préparer une ligne par symbole :

| Ordre | Slug      | Notion              | Objet ou scène  | Silhouette              | Détail distinctif          | Risque de confusion          |
| ----- | --------- | ------------------- | --------------- | ----------------------- | -------------------------- | ---------------------------- |
| 01    | `exemple` | ce que le signe dit | ce qu’il montre | haute / ronde / étalée… | geste ou accessoire unique | collection ou symbole voisin |

Le slug décrit la notion, pas le rendu accidentel. Il reste court, français,
sans numéro et stable pendant toute la chaîne.

### Choisir les quatre prototypes

Le premier lot ne doit pas être constitué des quatre sujets les plus faciles.
Il doit éprouver les extrêmes de la collection :

1. une silhouette simple et immédiatement lisible ;
2. un assemblage de plusieurs objets ;
3. un sujet fin, ajouré ou comportant des détails fragiles ;
4. une petite scène, un appareil ou une architecture plus dense.

Si ces quatre-là tiennent ensemble, la direction a de bonnes chances de
supporter la série complète.

## 4. Employer les références correctement

Une demande de continuité exige une référence visible, pas une description de
mémoire.

- charger la planche ou le master local avant la génération ;
- préciser pour chaque image si elle sert de **canon de style**, de **cible à
  modifier** ou de **référence documentaire** ;
- utiliser le moins de références possible ;
- ne jamais demander au générateur de recopier un bâtiment, un personnage, un
  logo ou une affiche protégée ;
- extraire des références leur grammaire : angle, matière, lumière, densité,
  pas leur identité.

Une photo fournie par Julien peut expliquer une arche, une enseigne ou une
organisation spatiale. Elle ne devient pas une instruction cachée et ne doit
pas être reproduite servilement.

## 5. Le prompt canonique

Le prompt possède deux blocs : un canon de collection presque immuable et une
fiche propre au symbole.

### Bloc A · Canon de collection

```text
Use case: stylized-concept
Asset type: original editorial symbol for the Codex du Disneyiste
Series canon: <camera, realism, materials, lighting, density, accent>
Composition: one isolated subject, square canvas, centered visual balance,
full object visible, generous safe margin, crisp readable silhouette
Backdrop: perfectly uniform solid chroma-key magenta #FF00FF, no gradient,
no texture, no horizon, no floor, no environmental reflection
Originality: generic original design, no Disney character, no protected
building, no trademark, no logo, no copied poster composition
Output constraints: no border, no watermark, no decorative frame, no cropped
part, no detached floating fragments, no magenta rim light
```

### Bloc B · Fiche du symbole

```text
Symbol key: <registre.collection.slug>
Documentary meaning: <notion>
Primary subject: <objet ou scène>
Distinctive action/detail: <ce qui le différencie>
Silhouette: <haute, ronde, étalée, ajourée…>
Materials and colors: <variation autorisée dans le canon>
Required elements: <liste courte>
Avoid for this symbol: <confusions et objets voisins>
```

Le prompt final peut être rédigé en anglais pour la génération, mais le sens
éditorial, les slugs et la transmission restent en français.

### Le texte dans l’image

Le texte généré n’est jamais fiable par défaut.

- éviter tout texte lisible si sa présence n’est pas essentielle ;
- préférer cartouches, lignes ou codes abstraits pour les documents ;
- lorsqu’un mot exact est indispensable, réserver un emplacement propre puis
  ajouter ou corriger la typographie pendant la finition ;
- contrôler lettre par lettre les rares inscriptions validées ;
- ne jamais laisser du pseudo-texte devenir un décor central.

## 6. Le fond de détourage

Le fond de travail recommandé est un magenta plat `#FF00FF` lorsque le
générateur ne fournit pas un alpha fiable.

Le prompt doit exiger :

- une couleur uniforme jusque dans les quatre coins ;
- aucune texture, ombre portée longue, ligne d’horizon ou sol ;
- aucun reflet magenta sur le métal, le verre ou les bords clairs ;
- une séparation nette entre le sujet et le fond ;
- une marge de sécurité autour de l’objet.

Si le sujet comporte réellement du rose ou du magenta, choisir un fond clé
très contrasté et documenter cette exception. Supprimer globalement tous les
pixels roses détruirait l’asset.

## 7. Générer une série sans la transformer en planche

- une génération correspond à un symbole ;
- un fichier carré correspond à un master ;
- quatre symboles demandés produisent quatre appels et quatre fichiers, jamais
  un montage `2 × 2` ;
- les lots servent à organiser les validations, pas à fusionner les images ;
- inspecter chaque résultat à sa résolution originale avant de passer au
  suivant ;
- nommer le prototype avec son ordre et son slug dès sa sauvegarde.

Le format courant du master validé est `1254 × 1254 px`. Un résultat généré
dans une autre taille reste un prototype tant qu’il n’a pas suivi la finition
et l’export conformes.

## 8. Corriger sans perdre ce qui fonctionne

Une demande comme « tourne l’étoile de quelques degrés » ou « ajoute une
enseigne » est une **édition ciblée**, pas une nouvelle direction.

Le prompt de correction doit commencer par l’invariant :

```text
Change only: <modification précise>.
Preserve exactly: composition, camera angle, object proportions, materials,
lighting, colors, background, margins and every unmentioned detail.
```

Puis :

- charger le candidat comme cible d’édition ;
- formuler une seule transformation principale par passe ;
- comparer immédiatement l’avant et l’après ;
- rejeter l’édition si elle corrige le détail mais dégrade la matière, les
  contours ou la composition ;
- conserver la version précédente jusqu’à validation.

Quand plusieurs essais ont progressivement sali le rendu, repartir du dernier
master propre et rejouer seulement les corrections validées.

## 9. Contrôler chaque candidat

### Lecture documentaire

- [ ] Le sujet se reconnaît sans lire le slug.
- [ ] Il représente la notion, pas seulement un bel objet voisin.
- [ ] Il ne promet ni causalité, ni hiérarchie, ni époque absente des sources.

### Lecture de série

- [ ] L’angle, la lumière et la matière appartiennent au canon.
- [ ] La silhouette ne double pas un autre symbole.
- [ ] Le niveau de détail reste comparable au reste de la collection.
- [ ] L’accent sert la famille sans envahir l’objet.

### Lecture technique

- [ ] Le sujet entier reste dans le carré.
- [ ] Les détails fragiles ne touchent pas le bord.
- [ ] Le fond est uniforme et séparé du sujet.
- [ ] Les ombres ne créent pas une seconde masse difficile à détourer.
- [ ] Aucun texte illisible, logo ou watermark n’apparaît.

### Lecture d’originalité

- [ ] Aucun personnage ou emblème Disney reconnaissable.
- [ ] Aucun bâtiment réel reproduit précisément.
- [ ] Aucune affiche, récompense ou marque copiée.
- [ ] L’image appartient au vocabulaire du Disneyiste.

## 10. Ranger sans écraser

Tant que Julien n’a pas validé le résultat :

- conserver le fichier comme prototype ou candidat ;
- ne pas remplacer un master existant ;
- employer un suffixe de version si plusieurs candidats doivent survivre ;
- ne pas créer les transparents, la planche ou l’intégration par anticipation.

Après validation explicite, ranger les masters sous :

```text
Symboles/<Registre>/<Collection>/Masters/NN-slug.png
```

Le fonds de production actuel se trouve dans :

```text
/Users/julienjulien/Library/Mobile Documents/com~apple~CloudDocs/Projets/Le Disneyiste/Symboles
```

## Transmission de génération

À la fin d’un lot, indiquer :

- les slugs générés ;
- le canon appliqué ;
- les références utilisées et leur rôle ;
- les écarts ou défauts encore visibles ;
- les chemins des prototypes ou masters réellement sauvegardés ;
- l’arbitrage attendu : valider, corriger ou abandonner.
