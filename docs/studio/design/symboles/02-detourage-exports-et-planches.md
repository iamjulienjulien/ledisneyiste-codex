# Détourage, exports et planches des Symboles

Le détourage ne doit pas réinterpréter l’image. Son objectif est de produire
un dérivé fidèle, propre et réutilisable dans les deux Lumières.

## 1. Prérequis

Ne détourer que des masters validés.

Pour chaque collection, la structure attendue du fonds de production est :

```text
Symboles/<Registre>/<Collection>/
├── Masters/
│   ├── 01-slug.png
│   └── …
└── Transparents/
    ├── 01-slug.png
    └── …
```

Le transparent HD conserve :

- le préfixe numérique de classement ;
- le slug du master ;
- le canevas carré `1254 × 1254 px` ;
- la position, l’échelle et les pixels du sujet ;
- un canal alpha réel.

Le fichier public perdra seulement le préfixe numérique lors de l’intégration.

## 2. Pourquoi un simple remplacement de couleur échoue

Remplacer tous les pixels `#FF00FF` par de la transparence provoque souvent :

- un liseré rose dans les pixels anti-crénelés ;
- des franges gris clair sur fond sombre ;
- des trous dans un sujet qui contient du rose ;
- des contours rongés sur les câbles, tissus, cheveux, fumées ou reflets ;
- une ombre opaque découpée comme un second objet.

Le fond doit être identifié depuis les bords du canevas, puis le contour doit
être décontaminé. La couleur seule n’est pas une preuve suffisante.

## 3. Méthode de détourage recommandée

### A · Échantillonner le fond

- lire plusieurs zones propres dans les quatre coins ;
- confirmer que le fond est uniforme ;
- mesurer la couleur réellement produite au lieu de supposer un magenta
  exact ;
- signaler tout gradient, bruit ou ombre qui rejoint le bord.

### B · Isoler l’arrière-plan connecté

- partir des bords extérieurs ;
- sélectionner les pixels proches de la couleur clé qui restent connectés au
  fond ;
- préserver les zones de couleur semblable enfermées à l’intérieur du sujet ;
- employer une tolérance progressive pour l’anti-crénelage.

### C · Construire l’alpha

- rendre le fond lointain totalement transparent ;
- conserver un alpha partiel sur la frontière ;
- éviter les seuils brutaux qui produisent un contour en escalier ;
- ne pas adoucir l’ensemble de l’image pour masquer un mauvais masque.

### D · Décontaminer la frange

- retirer la dominante magenta des pixels semi-transparents ;
- reconstruire leur couleur à partir des pixels opaques voisins ;
- protéger les accents réellement roses ou violets ;
- contrôler séparément le métal clair, le verre et les matières translucides.

### E · Préserver le canevas

- ne pas rogner au contenu ;
- ne pas recentrer automatiquement chaque sujet ;
- ne pas modifier l’échelle relative au master ;
- ne pas ajouter d’ombre ou de halo pendant l’export.

## 4. Contrôle du transparent HD

Examiner chaque fichier à `100 %` puis `200 %` sur au moins :

1. un fond presque noir proche de la Lumière sombre ;
2. un fond papier clair proche de la Lumière claire ;
3. un fond saturé différent de la couleur clé ;
4. un damier de transparence.

Chercher :

- pixels magenta résiduels ;
- halo blanc ou gris ;
- trous transparents dans l’objet ;
- câbles, antennes ou pointes amputés ;
- ombres devenues plaques ;
- verre, fumée et lumières rendus opaques ;
- bord coupé par le canevas ;
- différence de position avec le master.

Un scan automatique peut signaler des pixels suspects. Il ne remplace jamais
la revue visuelle, car un accent rose légitime peut ressembler au fond clé.

## 5. Vérification aux tailles d’usage

Créer des aperçus temporaires à :

- `24 px` pour la lecture micro ;
- `48 px` pour l’interface ;
- `96 px` pour l’éditorial courant ;
- `384 px` pour le dérivé web final.

À petite taille, vérifier d’abord la silhouette et les masses. À grande taille,
vérifier les contours, la matière et la fidélité au master.

Un transparent parfait à `1254 px` peut devenir illisible après réduction si
les détails distinctifs sont trop fins.

## 6. Construire la planche

La planche est un instrument de direction artistique, pas un montage généré.
Elle doit être composée déterministement à partir des transparents validés.

Convention courante :

- PNG horizontal `1536 × 768 px` ;
- fond sombre uni repris d’une planche voisine validée ;
- grille régulière, généralement jusqu’à six colonnes ;
- ordre numérique des masters, de gauche à droite puis de haut en bas ;
- même boîte de placement pour chaque symbole ;
- échelle optique ajustée sans masquer les différences naturelles de forme ;
- aucune étiquette, bordure ou décor ajouté si la série voisine n’en possède
  pas.

Nom courant :

```text
Planche <Registre> - <Collection>.png
```

La planche vit à la racine du fonds `Symboles`, aux côtés des autres planches.

## 7. Revue de planche

### Cohérence

- [ ] La caméra semble appartenir au même studio.
- [ ] Les matières ont un niveau de rendu comparable.
- [ ] La lumière possède une direction et une douceur communes.
- [ ] La densité de détail ne saute pas brutalement d’une case à l’autre.

### Diversité

- [ ] Chaque silhouette se distingue en vision périphérique.
- [ ] La même boîte, le même socle ou le même écran ne structure pas toute la
      série.
- [ ] Les orientations et les masses produisent un rythme sans casser le canon.
- [ ] Chaque symbole apporte un rôle documentaire propre.

### Lisibilité

- [ ] Aucun sujet ne semble beaucoup trop petit ou trop lourd.
- [ ] Les objets fins restent présents.
- [ ] Les détails secondaires ne dominent pas la notion principale.
- [ ] Aucun contour ne révèle le fond de détourage.

## 8. Motifs de reprise

Revenir au master ou au masque si :

- une frange n’apparaît que sur une des deux Lumières ;
- le détourage a supprimé un accent légitime ;
- la série semble cohérente seulement parce que tous les sujets ont été
  réduits excessivement ;
- un symbole devient ambigu à `24 px` ;
- le transparent diffère visiblement du master ;
- la planche révèle un doublon de silhouette ignoré pendant la génération.

Ne jamais corriger ces défauts en peignant directement le fichier public de
`384 px`. Reprendre la source HD, puis régénérer les dérivés.

## 9. Transmission des dérivés

Indiquer :

- le nombre de masters traités ;
- les chemins `Masters`, `Transparents` et de la planche ;
- les dimensions et la présence d’alpha vérifiées ;
- les exceptions de fond clé ;
- les symboles nécessitant encore une reprise ;
- si la collection est prête pour l’intégration ou seulement pour validation.
