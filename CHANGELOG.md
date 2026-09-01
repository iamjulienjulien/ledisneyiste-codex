# Journal de projection

Ce journal retrace les différentes étapes de fabrication du **Codex du Disneyiste**.

Les **Actes** correspondent aux grandes avancées éditoriales du projet. Ils disposent chacun d’un tag Git et d’une Release dédiée.

Les **Entractes** documentent les périodes de relecture, d’expérimentation et de raccord entre deux Actes. Ils disposent d’un tag Git, mais ne font pas l’objet d’une Release.

Les entrées sont présentées de la plus récente à la plus ancienne.

---

## 🎞️ Acte VI · Pinocchio révèle la vie publique des œuvres

**Tag :** `acte-vi` (à venir)\
**Ouverture :** `f784e96`\
**Clôture :**

### La projection

Le rideau se lève sur un nouvel Acte du Codex du Disneyiste.

Avec _Pinocchio_, les œuvres s’apprêtent à quitter le seul cadre de leur fabrication pour révéler leur vie publique : leurs projections, leurs circulations, leurs supports, leurs restaurations et les traces laissées auprès du public. Avant cette traversée, le Guidebook doit rejoindre son propre espace de projection dans les coulisses du Codex.

Cette section sera complétée au fil de l’Acte.

### Phase 0 · Mettre le Guidebook en projection

Avant que _Pinocchio_ n’entre en scène, la documentation transmissible du
studio reçoit sa propre salle de lecture privée.

- déplacement du modèle de carte de studio hors de la racine transmissible et
  fermeture explicite de `docs/studio/` ;
- création du domaine neutre `Guidebook*`, des manifestes fermés et de
  l’analyse Markdown unique côté serveur ;
- ajout d’une passerelle Notion à double autorisation sous la racine déclarée
  **Le Disneyiste** ;
- création, amélioration puis promotion de `PixieAscii`, `PixieMarkdown` et
  `PixieDocs` en version `1.0.0` ;
- ouverture du huitième plateau **Les Écrans** dans l’Atelier ;
- mise en projection des sept chapitres locaux et de onze pages Notion ;
- ouverture des routes privées `/guidebook`, raccordées uniquement à
  l’Atelier et rendues introuvables en production ;
- ajout des bibliothèques intégrée, sticky et flottante, puis d’un contrôle de
  lecture mémorisé dans le Guidebook ;
- reconnaissance et mise en scène des cartes de service Guru Éditions sans
  modifier leur composition monospacée ;
- extension des garde-fous aux chemins résolus, secrets, identifiants, liens,
  routes, composants et modes de navigation ;
- validation de la relecture visuelle et de la répétition générale avant le
  passage à la Phase 1.

### Générique des commits

1. `f784e96` — 🎞️ Acte > Acte VI · Pinocchio ouvre les œuvres sur leur vie publique > 🐭 Julien
2. `49ecabc` — ✍️ Scénario > Le Journal raccorde l’Entracte épique à l’Acte VI > 🔩 R2-D2 🏅
3. `8750c83` — 🩹 Raccord > Le modèle des cartes rejoint les coulisses du studio > 🔩 R2-D2 🏅
4. `4a6b7f7` — 📡 Transmission > Le Guidebook grave son contrat de projection > 🔩 R2-D2 🏅
5. `f005e1d` — 🛡️ Garde-fou > Les documents privés restent hors de la projection > 🔩 R2-D2 🏅
6. `9625672` — 🎬 Scène > PixieDustAscii préserve les cartes du studio caractère par caractère > 🔩 R2-D2 🏅
7. `5f42d8b` — 🎨 Mise en scène > Les Écrans ouvrent leur premier plateau dans l’Atelier > 🔩 R2-D2 🏅
8. `b61bbb0` — 📡 Transmission > Les guides accueillent le nouveau plateau des Écrans > 🔩 R2-D2 🏅
9. `b8d5bd2` — 🎬 Scène > Le Guidebook transforme le Markdown en matière de projection > 🔩 R2-D2 🏅
10. `9d4fc5f` — 🛡️ Garde-fou > Le Guidebook éprouve chaque chapitre avant la projection > 🔩 R2-D2 🏅
11. `a183d93` — 📡 Transmission > Le dépôt raconte la chaîne d’analyse du Guidebook > 🔩 R2-D2 🏅
12. `8a18d4d` — 🎬 Scène > PixieDustMarkdown transforme les blocs du Guidebook en lecture sémantique > 🔩 R2-D2 🏅
13. `c2c6ef4` — 🛡️ Garde-fou > La projection du Markdown protège ses fichiers et ses alternatives > 🔩 R2-D2 🏅
14. `6fa0e60` — 🎨 Mise en scène > PixieDustMarkdown ouvre sa régie sur le plateau des Écrans > 🔩 R2-D2 🏅
15. `b08f2f5` — 📡 Transmission > Le dépôt raconte la première projection Markdown du Guidebook > 🔩 R2-D2 🏅
16. `f1b1260` — ✨ Étincelle > La Chambre 1997 fonde le style illustré du Disneyiste > 🎨 Huyang
17. `12187a3` — 🎬 Scène > PixieDustDocs ouvre la bibliothèque du Guidebook > 🔩 R2-D2 🏅
18. `f9e870b` — 🎨 Mise en scène > L’Atelier éprouve la lecture du Guidebook > 🔩 R2-D2 🏅
19. `acf8165` — 📡 Transmission > Le dépôt consigne la première esquisse de PixieDustDocs > 🔩 R2-D2 🏅
20. `e6fe1b1` — 🔌 Passerelle > Le Guidebook ouvre une bobine déclarée sur Notion > 🔩 R2-D2 🏅
21. `6dbd67f` — 🧪 Répétition > Le Guidebook éprouve sa passerelle Notion hors ligne > 🔩 R2-D2 🏅
22. `0a4aa97` — 🎬 Scène > PixieDustDocs déploie sa bibliothèque en version 0.2.0 > 🔩 R2-D2 🏅
23. `87c5db7` — 🎨 Mise en scène > L’Atelier éprouve PixieDustDocs sur deux bibliothèques > 🔩 R2-D2 🏅
24. `44e7c08` — 📡 Transmission > Le dépôt raconte la double projection du Guidebook > 🔩 R2-D2 🏅
25. `f1ab24c` — 🎬 Scène > PixieDustAscii révèle ses hors-champs en version 0.2.0 > 🔩 R2-D2 🏅
26. `0770a60` — 🎨 Mise en scène > L’Atelier éprouve les limites de PixieDustAscii > 🔩 R2-D2 🏅
27. `c07bcaa` — 📡 Transmission > Le Guidebook consigne la seconde esquisse de PixieDustAscii > 🔩 R2-D2 🏅
28. `5efe390` — 🎬 Scène > PixieAscii entre en projection en version 1.0.0 > 🔩 R2-D2 🏅
29. `3dfae72` — 🎨 Mise en scène > L’Atelier accueille PixieAscii parmi les Écrans > 🔩 R2-D2 🏅
30. `892c928` — 📡 Transmission > Le Guidebook consigne la promotion de PixieAscii > 🔩 R2-D2 🏅
31. `d10b7f5` — 🎬 Scène > PixieDustMarkdown affine la lecture en version 0.2.0 > 🔩 R2-D2 🏅
32. `540094a` — 🎨 Mise en scène > L’Atelier éprouve les nouvelles voix de PixieDustMarkdown > 🔩 R2-D2 🏅
33. `baa8a24` — 📡 Transmission > Le Guidebook consigne la seconde esquisse de PixieDustMarkdown > 🔩 R2-D2 🏅
34. `db026dc` — 🎬 Scène > PixieMarkdown entre en projection en version 1.0.0 > 🔩 R2-D2 🏅
35. `145b23d` — 🎨 Mise en scène > L’Atelier accueille PixieMarkdown parmi les Écrans > 🔩 R2-D2 🏅
36. `bd0bafb` — 📡 Transmission > Le Guidebook consigne la promotion de PixieMarkdown > 🔩 R2-D2 🏅
37. `459014d` — 🩹 Raccord > La bibliothèque intégrée de PixieDustDocs suit le défilement > 🔩 R2-D2 🏅
38. `c767a3c` — 🎨 Mise en scène > L’Atelier éprouve la bibliothèque sticky de PixieDustDocs > 🔩 R2-D2 🏅
39. `f7746fd` — 🎬 Scène > PixieDocs entre en projection en version 1.0.0 > 🔩 R2-D2 🏅
40. `9b2237c` — 🎨 Mise en scène > L’Atelier accueille PixieDocs parmi les Écrans > 🔩 R2-D2 🏅
41. `4054b40` — 📡 Transmission > Le Guidebook consigne la promotion de PixieDocs > 🔩 R2-D2 🏅
42. `63cc436` — 🎬 Scène > Le Guidebook met ses bibliothèques en projection privée > 🔩 R2-D2 🏅
43. `8a4f489` — 🛡️ Garde-fou > La projection du Guidebook reste derrière le rideau > 🔩 R2-D2 🏅
44. `6afffa2` — 📡 Transmission > Le dépôt raconte l’ouverture privée du Guidebook > 🔩 R2-D2 🏅
45. `2f9172e` — 🎨 Mise en scène > Le Guidebook choisit la présence de sa bibliothèque > 🔩 R2-D2 🏅
46. `93a3833` — 🩹 Raccord > Les cartes de service retrouvent leur lumière de studio > 🔩 R2-D2 🏅
47. `7c4d6f5` — 🧪 Répétition > Le Guidebook reconnaît ses cartes et ses cadres de lecture > 🔩 R2-D2 🏅
48. `2babe6b` — 📡 Transmission > Le Guidebook consigne ses derniers raccords de lecture > 🔩 R2-D2 🏅

---

## 🍿 Entracte V · Le Codex invente ses Plans

**Tag :** `entracte-v`\
**Ouverture :** `337ec88`\
**Clôture :** `a369381`\
**Entre :** Acte V et Acte VI

### Le raccord

Le cinquième Entracte donne au Codex une nouvelle grammaire du regard.

L’Atelier devient un véritable studio d’expérimentation : son Conducteur rassemble les réglages, ses dossiers gagnent une navigation continue et treize esquisses Pixie atteignent leur version prête à projeter. À partir des mêmes Archives, cinq Plans apprennent ensuite à suivre un parcours, situer un voisinage, monter le temps, lire un générique et examiner les preuves sans altérer leur matière documentaire.

### Pendant l’Entracte

- refonte de la navigation de l’Atelier avec fiches repliables, languette de fermeture, retour au bon repère et sommaire latéral sticky ;
- réunion des réglages dans un Conducteur commun capable de piloter les playgrounds, leurs Lumières et leur cadre de projection ;
- amélioration des régies larges, des séparateurs, des tableaux techniques, des statuts, des versions et de la coloration syntaxique ;
- promotion de `PixieSelect`, `PixieField`, `PixieInput`, `PixieSearchField`, `PixieSwitch` et `PixieTextarea` pour composer les Dialogues ;
- promotion de `PixieSwitcher`, `PixieSidebar`, `PixieStickyRegion` et `PixieRail` pour compléter les Montages ;
- promotion de `PixieLoader`, `PixieSkeleton` et `PixieToast` pour matérialiser les attentes et les retours du système ;
- ouverture du septième plateau de l’Atelier et formalisation d’une grammaire commune aux cinq Plans ;
- création d’une matière dérivée pure pour les nœuds, liens, événements, crédits et preuves, sans modifier les Archives ;
- ajout de huit Bobines témoins destinées à éprouver les cas vides, denses, incomplets, contradictoires et accessibles ;
- projection du Travelling documentaire, du Plan d’ensemble, du Montage du temps, du Générique vivant et de la Table lumineuse autour de _Blanche-Neige et les Sept Nains_ ;
- création du registre `index`, retrait des anciens registres `blocs` et `codex.index`, puis renouvellement de l’iconographie des index ;
- ajout de douze trophées et ouverture des registres consacrés à la diffusion et aux supports documentaires ;
- consolidation de 432 symboles dans 6 registres et 30 collections vérifiées ;
- création du Guidebook destiné aux agents IA, avec ses chapitres sur l’esprit du projet, l’architecture, l’UI, Pixie, les symboles et les Plans ;
- ouverture du registre d’équipe de Guru Éditions et accueil de R2-D2, Charly-A et Huyang dans le studio ;
- actualisation du README avec les nouveaux Plans, composants, registres, contrôles et documents de transmission.

### Générique des commits

1. `337ec88` — 🍿 Entracte > Le Codex invente une grammaire du regard > 🐭 Julien
2. `58e6a9c` — 🩹 Raccord > Le Journal referme le grand récit de Blanche-Neige > 🐭 Julien
3. `5ec45fe` — 🎨 Mise en scène > Les fiches de l’Atelier se replient sans perdre leur place > 🐭 Julien
4. `0a2a00f` — 🎨 Mise en scène > Le conducteur suit la traversée des plateaux de l’Atelier > 🐭 Julien
5. `7560e9f` — 🩹 Raccord > Les plateaux confient leurs repères au conducteur > 🐭 Julien
6. `3477bbc` — 🩹 Raccord > La Pellicule resserre ses fondations visibles > 🐭 Julien
7. `239897c` — 🎨 Mise en scène > L’Atelier colore le langage de ses extraits de code > 🐭 Julien
8. `3febdb9` — 🩹 Raccord > Les dossiers partagent la même lumière syntaxique > 🐭 Julien
9. `46daade` — 🎨 Mise en scène > La régie reste visible pendant les réglages du plateau > 🐭 Julien
10. `1f7ad23` — 🩹 Raccord > Les playgrounds laissent défiler leurs contrôles sous la régie > 🐭 Julien
11. `065e1fd` — 🎨 Mise en scène > Le conducteur règle tous les plateaux de l’Atelier > 🐭 Julien
12. `620b9ff` — 🩹 Raccord > Le cadre large déroule aperçu, réglages et code > 🐭 Julien
13. `15bb2b0` — 🩹 Raccord > Le Conducteur ouvre chaque fiche au bon repère > 🐭 Julien
14. `fab7617` — 🎨 Mise en scène > La Pellicule confie ses lumières au Conducteur > 🐭 Julien
15. `bec6a3b` — 🎨 Mise en scène > Les six plateaux trouvent un même rythme de projection > 🐭 Julien
16. `fa3e122` — 🩹 Raccord > Les fiches de l’Atelier accordent leur générique technique > 🐭 Julien
17. `f255822` — 🩹 Raccord > PixieDustField relie explicitement ses libellés aux contrôles > 🐭 Julien
18. `388e3e2` — 🎨 Mise en scène > PixieDustSelect ouvre son popover en version 0.2.0 > 🐭 Julien
19. `a8a3de2` — 🎨 Mise en scène > L’Atelier éprouve les deux ouvertures de PixieDustSelect > 🐭 Julien
20. `093e4d3` — 🎨 Mise en scène > PixieSelect est prêt à conduire les choix du Codex > 🐭 Julien
21. `12cee70` — 🩹 Raccord > L’Atelier rejoint PixieSelect dans sa loge définitive > 🐭 Julien
22. `9895703` — ✍️ Scénario > Le README enregistre la promotion de PixieSelect > 🐭 Julien
23. `dfe8911` — 🩹 Raccord > Les régies de l’Atelier confient leurs choix à PixieSelect > 🐭 Julien
24. `4f300e7` — 🎨 Mise en scène > PixieDustSwitcher affine ses changements de plan > 🐭 Julien
25. `725f2b1` — 🎨 Mise en scène > L’Atelier éprouve la version 0.2.0 de PixieDustSwitcher > 🐭 Julien
26. `63e7b95` — 🎨 Mise en scène > PixieSwitcher est prêt à changer les plans du Codex > 🐭 Julien
27. `9029ad5` — 🩹 Raccord > L’Atelier rejoint PixieSwitcher dans sa loge définitive > 🐭 Julien
28. `618854f` — ✍️ Scénario > Le README accueille PixieSwitcher parmi les montages validés > 🐭 Julien
29. `b85769d` — 🎨 Mise en scène > PixieDustSidebar ordonne ses régies et ses contenus > 🐭 Julien
30. `7ee5068` — 🎨 Mise en scène > L’Atelier éprouve la version 0.2.0 de PixieDustSidebar > 🐭 Julien
31. `9837a50` — 🎨 Mise en scène > PixieSidebar est prêt à accompagner les régies du Codex > 🐭 Julien
32. `7cebe5f` — 🩹 Raccord > L’Atelier rejoint PixieSidebar dans sa loge définitive > 🐭 Julien
33. `f32d9e7` — ✍️ Scénario > Le README accueille PixieSidebar parmi les montages validés > 🐭 Julien
34. `2c5bf66` — 🎨 Mise en scène > PixieDustStickyRegion maîtrise les limites de son cadre > 🐭 Julien
35. `5c0c8af` — 🎨 Mise en scène > L’Atelier éprouve la version 0.2.0 de PixieDustStickyRegion > 🐭 Julien
36. `77102ba` — 🎨 Mise en scène > PixieStickyRegion est prêt à maintenir les régies du Codex > 🐭 Julien
37. `cc67292` — 🩹 Raccord > L’Atelier rejoint PixieStickyRegion dans sa loge définitive > 🐭 Julien
38. `df7d5af` — ✍️ Scénario > Le README accueille PixieStickyRegion parmi les montages validés > 🐭 Julien
39. `7d2479e` — 🎨 Mise en scène > PixieDustRail affine le travelling de ses collections > 🐭 Julien
40. `5cbcc17` — 🎨 Mise en scène > L’Atelier éprouve la version 0.2.0 de PixieDustRail > 🐭 Julien
41. `e3154f4` — 🎨 Mise en scène > PixieRail est prêt à dérouler les collections du Codex > 🐭 Julien
42. `3303a0a` — 🩹 Raccord > L’Atelier rejoint PixieRail dans sa loge définitive > 🐭 Julien
43. `0029f00` — ✍️ Scénario > Le README accueille PixieRail parmi les montages validés > 🐭 Julien
44. `fed6e89` — 🎨 Mise en scène > PixieDustField orchestre tous les états du dialogue > 🐭 Julien
45. `9a82627` — 🎨 Mise en scène > L’Atelier éprouve la version 0.2.0 de PixieDustField > 🐭 Julien
46. `bc9f41f` — 🎨 Mise en scène > PixieField est prêt à guider les dialogues du Codex > 🐭 Julien
47. `7b4e9e2` — 🩹 Raccord > L’Atelier rejoint PixieField dans sa loge définitive > 🐭 Julien
48. `ec22c74` — ✍️ Scénario > Le README accueille PixieField parmi les dialogues validés > 🐭 Julien
49. `f2c7b03` — 🎨 Mise en scène > PixieDustInput enrichit les premières lignes de dialogue > 🐭 Julien
50. `3358897` — 🩹 Raccord > PixieDustSearchField suit la nouvelle échelle de saisie > 🐭 Julien
51. `097219f` — 🎨 Mise en scène > L’Atelier éprouve la version 0.2.0 de PixieDustInput > 🐭 Julien
52. `bb722d1` — 🎨 Mise en scène > PixieInput est prêt à recueillir les dialogues du Codex > 🐭 Julien
53. `5eb3599` — 🩹 Raccord > L’Atelier rejoint PixieInput dans sa loge définitive > 🐭 Julien
54. `e772f84` — ✍️ Scénario > Le README accueille PixieInput parmi les dialogues validés > 🐭 Julien
55. `7e651fc` — 🎨 Mise en scène > PixieDustSearchField rassemble les commandes de la recherche > 🐭 Julien
56. `be58f44` — 🎨 Mise en scène > L’Atelier éprouve la version 0.2.0 de PixieDustSearchField > 🐭 Julien
57. `322b529` — 🎨 Mise en scène > PixieSearchField est prêt à guider les recherches du Codex > 🐭 Julien
58. `2ef3c9f` — 🩹 Raccord > L’Atelier rejoint PixieSearchField dans sa loge définitive > 🐭 Julien
59. `c50d949` — ✍️ Scénario > Le README accueille PixieSearchField parmi les dialogues validés > 🐭 Julien
60. `b02545b` — 🎨 Mise en scène > PixieDustLoader déploie ses nouvelles poussières de fée > 🐭 Julien
61. `93c30ef` — 🎨 Mise en scène > L’Atelier éprouve la version 0.2.0 de PixieDustLoader > 🐭 Julien
62. `5597434` — 🎨 Mise en scène > PixieLoader est prêt à faire patienter le Codex > 🐭 Julien
63. `60b0459` — 🩹 Raccord > L’Atelier rejoint PixieLoader dans sa loge définitive > 🐭 Julien
64. `10e8cd9` — ✍️ Scénario > Le README accueille PixieLoader parmi les Effets validés > 🐭 Julien
65. `01d0ee7` — 🎨 Mise en scène > PixieDustSkeleton préserve les formes avant leur apparition > 🐭 Julien
66. `f1cba7d` — 🎨 Mise en scène > L’Atelier éprouve PixieDustSkeleton en version 0.2.0 > 🐭 Julien
67. `2c7bc1a` — 🎨 Mise en scène > PixieSkeleton est prêt à préserver les scènes du Codex > 🐭 Julien
68. `b77f278` — 🩹 Raccord > L’Atelier rejoint PixieSkeleton dans sa loge définitive > 🐭 Julien
69. `d19a038` — ✍️ Scénario > Le README accueille PixieSkeleton parmi les Effets validés > 🐭 Julien
70. `880fe1c` — ✨ Étincelle > Les Plans donnent au Codex une nouvelle grammaire du regard > 🐭 Julien
71. `aedbb97` — 🧪 Répétition > Vérifier que les Plans parlent une grammaire complète > 🐭 Julien
72. `7d63510` — 🏗️ Décor > Ouvrir les dossiers préparatoires des cinq Plans > 🐭 Julien
73. `7aadd52` — 🎨 Mise en scène > Les Plans ouvrent leur septième plateau dans l’Atelier > 🐭 Julien
74. `b060fdc` — ✍️ Scénario > Graver le protocole du septième plateau > 🐭 Julien
75. `feb9126` — 🧹 Coulisses > Préparer la matière que regarderont les cinq Plans > 🐭 Julien
76. `537cc4d` — 🧪 Répétition > Éprouver la matière dérivée des cinq Plans > 🐭 Julien
77. `f6b8a05` — 🧪 Répétition > Les Bobines témoins éprouvent les limites des cinq Plans > 🐭 Julien
78. `4c26146` — ✍️ Scénario > Nommer sans ambiguïté la matière des Bobines témoins > 🐭 Julien
79. `3119a2e` — 🗄️ Archives > Le Travelling documentaire ordonne ses premiers raccords > 🐭 Julien
80. `a056600` — 🩹 Raccord > Donner une vraie profondeur aux Bobines du Travelling > 🐭 Julien
81. `6c40fc2` — 🎨 Mise en scène > Blanche-Neige ouvre le premier Travelling documentaire > 🐭 Julien
82. `c4ec044` — 🗄️ Archives > Le Plan d’ensemble ordonne le voisinage de Blanche-Neige > 🐭 Julien
83. `c5d3e4e` — 🩹 Raccord > Libérer les Plans de la largeur minimale du plateau > 🐭 Julien
84. `6aa5b9d` — 🩹 Raccord > Donner aux relations du Plan d’ensemble leurs deux extrémités > 🐭 Julien
85. `26a6d04` — 🎨 Mise en scène > Blanche-Neige déploie ses constellations dans le Plan d’ensemble > 🐭 Julien
86. `d145928` — 🗄️ Archives > Le Montage du temps ordonne les temporalités de Blanche-Neige > 🐭 Julien
87. `7d5e2ae` — 🎨 Mise en scène > Blanche-Neige déroule ses temporalités sur une même bobine > 🐭 Julien
88. `ed1240a` — 🗄️ Archives > Le Générique vivant rassemble les métiers de Blanche-Neige > 🐭 Julien
89. `ddb4e4f` — 🎨 Mise en scène > Le Générique vivant déroule sa première distribution > 🐭 Julien
90. `dfcf671` — 🧪 Répétition > Éprouver le Générique vivant jusque dans la foule > 🐭 Julien
91. `cd5b996` — 🗄️ Archives > La Table lumineuse ordonne les preuves de Blanche-Neige > 🐭 Julien
92. `0e0d216` — 🎨 Mise en scène > Blanche-Neige place ses preuves sous la lumière > 🐭 Julien
93. `e12ad0f` — 🧪 Répétition > Éprouver la Table lumineuse face aux preuves contrastées > 🐭 Julien
94. `d411767` — 🩹 Raccord > Le tableau de l’Atelier rejoint les cinq Plans projetés > 🐭 Julien
95. `a5606c2` — 🎨 Mise en scène > PixieDustToast donne du mouvement aux retours du Codex > 🐭 Julien
96. `6786ee0` — 🎨 Mise en scène > L’Atelier éprouve PixieDustToast en version 0.2.0 > 🐭 Julien
97. `3bc6fc0` — 🎨 Mise en scène > PixieToast est prêt à signaler les retours du Codex > 🐭 Julien
98. `f175890` — 🩹 Raccord > L’Atelier rejoint PixieToast dans sa loge définitive > 🐭 Julien
99. `79369c1` — ✍️ Scénario > Le README accueille PixieToast parmi les Effets validés > 🐭 Julien
100. `06ab2a7` — 🎨 Mise en scène > PixieDustSwitch fait basculer les préférences sous une nouvelle lumière > 🐭 Julien
101. `3100d94` — 🎨 Mise en scène > L’Atelier éprouve PixieDustSwitch en version 0.2.0 > 🐭 Julien
102. `7646e48` — 🎨 Mise en scène > PixieSwitch est prêt à éclairer les préférences du Codex > 🐭 Julien
103. `2b59ccc` — 🩹 Raccord > L’Atelier rejoint PixieSwitch dans sa loge définitive > 🐭 Julien
104. `c10d065` — ✍️ Scénario > Le README accueille PixieSwitch parmi les Dialogues validés > 🐭 Julien
105. `95c9ed4` — 🎨 Mise en scène > PixieDustTextarea donne de l’espace aux réponses du Codex > 🐭 Julien
106. `f79c6e9` — 🎨 Mise en scène > L’Atelier éprouve PixieDustTextarea en version 0.2.0 > 🐭 Julien
107. `21bfe11` — 🎨 Mise en scène > PixieTextarea est prêt à recueillir les récits du Codex > 🐭 Julien
108. `564a79f` — 🩹 Raccord > L’Atelier ouvre sa régie à PixieTextarea > 🐭 Julien
109. `b20acef` — ✍️ Scénario > Le README accueille PixieTextarea parmi les Dialogues validés > 🐭 Julien
110. `9e0f9d5` — 🗄️ Archives > Le registre Index réunit ses cinq collections > 🐭 Julien
111. `f53c1f6` — 🎨 Mise en scène > Le Codex donne à ses cinq index leur nouvelle iconographie > 🐭 Julien
112. `e17e6ff` — 🧹 Coulisses > Retirer les anciens registres Bloc et Codex.Index > 🐭 Julien
113. `c732f09` — 🗄️ Archives > Douze nouveaux trophées rejoignent le registre des récompenses > 🐭 Julien
114. `dc8323b` — 📡 Transmission > Le Guidebook transmet la magie maintenable du Codex aux agents du studio > 🔩 R2-D2 🏅
115. `e298e54` — 🗄️ Archives > Les cinq vies de la diffusion rejoignent le registre des symboles > 🐭 Julien
116. `f363f86` — 🎨 Mise en scène > PixieSymbol déroule les cinq voies de la diffusion > 🐭 Julien
117. `4b56ba5` — ✍️ Scénario > Le domaine Production rejoint les conventions du studio > 🐭 Julien
118. `fddb638` — 🏢 Production > Le studio prépare l’arrivée de ses futurs employés > 🐭 Julien
119. `1ba1e3b` — 🏢 Production > R2-D2 entre au registre d’équipe de Guru Éditions > 🔩 R2-D2 🏅
120. `feec02a` — 🗄️ Archives > Les quatre matières des sources rejoignent le registre des symboles > 🐭 Julien
121. `ce502d6` — 🎨 Mise en scène > PixieSymbol projette les quatre familles de sources > 🐭 Julien
122. `1175007` — 📡 Transmission > Le Guidebook recense six registres de symboles projetables > 🐭 Julien
123. `dc72274` — 🩹 Raccord > Charly-A retrouve son nom officiel dans les registres du studio > 🐭 Julien
124. `c3b36fd` — 🏢 Production > Le studio prépare l’arrivée de Charly-A > 🐭 Julien
125. `8b4454d` — 🏢 Production > Le studio prépare l’arrivée de Huyang > 🐭 Julien
126. `fbf5f49` — 🏢 Production > Charly-A entre au registre d’équipe de Guru Éditions > 🤖 Charly-A
127. `b7770da` — 🏢 Production > Huyang entre au registre d’équipe de Guru Éditions > 🎨 Huyang
128. `5f2b203` — ✍️ Scénario > Le README raconte les Plans et les nouveaux registres du studio > 🐭 Julien
129. `e1e5989` — ✍️ Scénario > Le Journal raconte comment le Codex a inventé ses Plans > 🐭 Julien
130. `a369381` — 🍿 Entracte > Le Codex a inventé sa grammaire du regard > 🐭 Julien

### Dernière image

**Le Codex a inventé ses Plans.**

Les Archives peuvent désormais être suivies, situées, montées dans le temps, relues par leurs génériques et examinées à la lumière de leurs preuves. L’Atelier possède le langage, les composants et la mémoire nécessaires pour préparer le prochain Acte.

---

## 🎞️ Acte V · Blanche-Neige ouvre le grand récit

**Tag :** `acte-v`\
**Ouverture :** `84213ca`\
**Clôture :** `2f4aa81`

### La projection

Le Codex franchit le seuil du premier long métrage d’animation Disney.

_Blanche-Neige et les Sept Nains_ fait changer d’échelle aux archives : son royaume, ses artistes, ses voix, sa musique, ses techniques et ses distinctions rejoignent un cadre documentaire désormais capable d’accueillir un grand récit. Dans le même mouvement, les composants Pixie quittent l’Atelier pour structurer réellement les index, les fiches et leurs nombreuses séquences.

### À l’écran

- extension du modèle des Œuvres aux longs métrages et à leurs données structurées ;
- documentation de _The Goddess of Spring_ comme laboratoire de l’animation humaine ;
- entrée de _Blanche-Neige et les Sept Nains_ dans les archives ;
- modélisation des changements de nom et de forme des personnages ;
- création des fiches de Blanche-Neige, de la Reine, du Prince, du Chasseur et du Miroir magique ;
- arrivée de Prof, Grincheux, Joyeux, Dormeur, Timide, Atchoum et Simplet ;
- documentation des animateurs, artistes, musiciens, interprètes et techniciens du film ;
- projection du générique, des filiations, des sorties, des repères et des distinctions du long métrage ;
- promotion des six Décors : `PixieCard`, `PixiePanel`, `PixieFrame`, `PixieCallout`, `PixieInset` et `PixieBackdrop` ;
- promotion de `PixieContainer`, `PixieStack`, `PixieCluster`, `PixieSection` et `PixieGrid` ;
- création d’une ossature commune pour les quatre index et leurs collections ;
- entrée des sources dans les chapitres et création d’un cadre commun pour les repères des fiches ;
- unification du montage des sections, des relations, des récompenses et des sources ;
- réunion des familles du Codex sous un même contrat de typage ;
- enrichissement des registres avec les accessoires généraux et les techniques de l’image, de la couleur, du son, des effets et de l’Imagineering ;
- refonte du grand carton de la home, de ses quatre portes, de ses génériques et de la recherche ;
- déploiement des ouvertures, chapitres et repères sur un cadre de lecture plus ample ;
- utilisation de `PixieCard` et des nouveaux symboles dans les détails et les métiers des fiches Œuvres.

### Générique des commits

1. `84213ca` — 🎞️ Acte > Acte V · Blanche-Neige ouvre le grand récit > 🐭 Julien
2. `22b5a62` — ✍️ Scénario > Le long métrage élargit les archives des Œuvres > 🐭 Julien
3. `d3633af` — 🗄️ Archives > The Goddess of Spring prépare le chemin du long métrage > 🐭 Julien
4. `0dff3b5` — 🗄️ Archives > Blanche-Neige ouvre le grand récit du Codex > 🐭 Julien
5. `f0bdc85` — ✍️ Scénario > Les personnages peuvent changer de nom et de forme > 🐭 Julien
6. `7828d28` — 🗄️ Archives > Blanche-Neige et son royaume traversent le miroir du Codex > 🐭 Julien
7. `563f3c3` — 🗄️ Archives > Les Sept Nains trouvent chacun leur place dans le Codex > 🐭 Julien
8. `bafb5f5` — 🗄️ Archives > Les maîtres du mouvement donnent vie au premier long métrage > 🐭 Julien
9. `c29dff1` — 🗄️ Archives > Les artistes de Blanche-Neige donnent forme au premier royaume > 🐭 Julien
10. `ac5aaec` — 🗄️ Archives > La musique de Blanche-Neige accorde le premier grand récit > 🐭 Julien
11. `9a443ce` — 🗄️ Archives > Les voix et les gestes donnent chair au royaume de Blanche-Neige > 🐭 Julien
12. `fb08335` — 🗄️ Archives > Les honneurs de Blanche-Neige rejoignent le palmarès du Codex > 🐭 Julien
13. `45421b9` — 🎬 Scène > Blanche-Neige prend place dans les index du Codex > 🐭 Julien
14. `37df66d` — 🎨 Mise en scène > PixieDustCard enrichit ses surfaces en version 0.2.0 > 🐭 Julien
15. `963c08c` — 🎨 Mise en scène > L’Atelier éprouve les nouveaux rôles de PixieDustCard > 🐭 Julien
16. `4993ec6` — 🎬 Scène > PixieCard est prêt à composer les surfaces du Codex > 🐭 Julien
17. `28f3f17` — 🩹 Raccord > L’Atelier rejoint PixieCard dans sa loge définitive > 🐭 Julien
18. `aab261f` — ✍️ Scénario > Les conventions enregistrent la promotion de PixieCard > 🐭 Julien
19. `24138a4` — 🎨 Mise en scène > PixieDustPanel structure ses surfaces en version 0.2.0 > 🐭 Julien
20. `e1019dc` — 🎨 Mise en scène > L’Atelier éprouve les nouveaux rôles de PixieDustPanel > 🐭 Julien
21. `ed00ee6` — 🎬 Scène > PixiePanel est prêt à structurer les surfaces du Codex > 🐭 Julien
22. `5ee29d4` — 🩹 Raccord > L’Atelier rejoint PixiePanel dans sa loge définitive > 🐭 Julien
23. `0873754` — ✍️ Scénario > Le README enregistre la promotion de PixiePanel > 🐭 Julien
24. `f0866b6` — 🎨 Mise en scène > PixieDustFrame enrichit ses cadrages en version 0.2.0 > 🐭 Julien
25. `e220e6a` — 🎨 Mise en scène > L’Atelier éprouve les nouvelles mises en scène de PixieDustFrame > 🐭 Julien
26. `630b517` — 🎬 Scène > PixieFrame est prêt à mettre les médias en scène > 🐭 Julien
27. `a4b35a3` — 🩹 Raccord > L’Atelier rejoint PixieFrame dans sa loge définitive > 🐭 Julien
28. `ad84af2` — ✍️ Scénario > Le README enregistre la promotion de PixieFrame > 🐭 Julien
29. `a6cb662` — 🎨 Mise en scène > PixieDustCallout affine la lumière de ses annotations > 🐭 Julien
30. `7f76c1f` — 🎨 Mise en scène > L’Atelier éprouve les nouveaux plans de PixieDustCallout > 🐭 Julien
31. `7969a94` — 🎬 Scène > PixieCallout est prêt à éclairer les annotations du Codex > 🐭 Julien
32. `acb65b7` — 🩹 Raccord > L’Atelier rejoint PixieCallout dans sa loge définitive > 🐭 Julien
33. `23ce702` — ✍️ Scénario > Le README enregistre la promotion de PixieCallout > 🐭 Julien
34. `ef4e6aa` — 🎨 Mise en scène > PixieDustInset approfondit ses seconds plans en version 0.2.0 > 🐭 Julien
35. `985f52e` — 🎨 Mise en scène > L’Atelier éprouve les nouvelles profondeurs de PixieDustInset > 🐭 Julien
36. `f05f4f2` — 🎬 Scène > PixieInset est prêt à creuser les seconds plans du Codex > 🐭 Julien
37. `45700e1` — 🩹 Raccord > L’Atelier rejoint PixieInset dans sa loge définitive > 🐭 Julien
38. `e6267dc` — ✍️ Scénario > Le README enregistre la promotion de PixieInset > 🐭 Julien
39. `7635e07` — 🎨 Mise en scène > PixieDustBackdrop enrichit ses atmosphères en version 0.2.0 > 🐭 Julien
40. `44784a0` — 🎨 Mise en scène > L’Atelier éprouve les nouvelles atmosphères de PixieDustBackdrop > 🐭 Julien
41. `480f195` — 🎬 Scène > PixieBackdrop est prêt à installer les atmosphères du Codex > 🐭 Julien
42. `825e04c` — 🩹 Raccord > L’Atelier rejoint PixieBackdrop dans sa loge définitive > 🐭 Julien
43. `2771645` — ✍️ Scénario > Le README enregistre la promotion de PixieBackdrop > 🐭 Julien
44. `37c53a5` — 🎨 Mise en scène > PixieDustContainer fixe ses cadres de lecture en version 0.2.0 > 🐭 Julien
45. `1d1cdcb` — 🎨 Mise en scène > L’Atelier éprouve les nouveaux cadres de PixieDustContainer > 🐭 Julien
46. `00b8f19` — 🎬 Scène > PixieContainer est prêt à cadrer les séquences du Codex > 🐭 Julien
47. `a2e7b99` — 🩹 Raccord > L’Atelier rejoint PixieContainer dans sa loge définitive > 🐭 Julien
48. `3e15dad` — ✍️ Scénario > Le README enregistre la promotion de PixieContainer > 🐭 Julien
49. `d51ba77` — 🎨 Mise en scène > PixieDustStack règle son rythme vertical en version 0.2.0 > 🐭 Julien
50. `f7d63fa` — 🎨 Mise en scène > L’Atelier éprouve les nouvelles séquences de PixieDustStack > 🐭 Julien
51. `521806c` — 🎬 Scène > PixieStack est prêt à rythmer les séquences du Codex > 🐭 Julien
52. `95f77a3` — 🩹 Raccord > L’Atelier rejoint PixieStack dans sa loge définitive > 🐭 Julien
53. `c6cce09` — ✍️ Scénario > Le README enregistre la promotion de PixieStack > 🐭 Julien
54. `5453499` — 🎨 Mise en scène > PixieDustCluster distribue ses plans en version 0.2.0 > 🐭 Julien
55. `e197795` — 🎨 Mise en scène > L’Atelier éprouve la distribution de PixieDustCluster > 🐭 Julien
56. `b4e2532` — 🎬 Scène > PixieCluster est prêt à rassembler les plans du Codex > 🐭 Julien
57. `b6af3bd` — 🩹 Raccord > L’Atelier rejoint PixieCluster dans sa loge définitive > 🐭 Julien
58. `ea4dc35` — ✍️ Scénario > Le README enregistre la promotion de PixieCluster > 🐭 Julien
59. `94e8894` — 🎨 Mise en scène > PixieDustSection règle ses raccords en version 0.2.0 > 🐭 Julien
60. `eb2c55a` — 🎨 Mise en scène > L’Atelier éprouve les nouvelles séquences de PixieDustSection > 🐭 Julien
61. `da654d0` — 🎬 Scène > PixieSection est prêt à composer les séquences du Codex > 🐭 Julien
62. `ad1d8a4` — 🩹 Raccord > L’Atelier rejoint PixieSection dans sa loge définitive > 🐭 Julien
63. `815b793` — ✍️ Scénario > Le README enregistre la promotion de PixieSection > 🐭 Julien
64. `01661bd` — 🎨 Mise en scène > Les quatre index partagent leur cadre de projection > 🐭 Julien
65. `e56c561` — 🎨 Mise en scène > Les cartes métier entrent dans les Décors de Pixie > 🐭 Julien
66. `ea30abf` — 🎨 Mise en scène > PixieDustGrid affine la distribution de ses pistes > 🐭 Julien
67. `f1284f9` — 🎬 Scène > PixieGrid est prêt à distribuer les collections du Codex > 🐭 Julien
68. `7e58ce4` — 🩹 Raccord > L’Atelier rejoint PixieGrid dans sa loge définitive > 🐭 Julien
69. `9c4ea62` — ✍️ Scénario > Le README enregistre la promotion de PixieGrid > 🐭 Julien
70. `b3e15a4` — 🩹 Raccord > Les quatre index confient leurs cartes à PixieGrid > 🐭 Julien
71. `6fb3684` — 🎬 Scène > Les sources entrent dans les chapitres du Codex > 🐭 Julien
72. `26d5704` — 🎬 Scène > Les repères des œuvres retrouvent leurs sources > 🐭 Julien
73. `c91e96a` — 🎨 Mise en scène > Les fiches Œuvres éprouvent leur nouveau carton de repères > 🐭 Julien
74. `e123aa7` — 🩹 Raccord > Les quatre familles confient leurs repères au même cadre > 🐭 Julien
75. `245decf` — 🎨 Mise en scène > Les sections des fiches adoptent le montage de Pixie > 🐭 Julien
76. `4dc3770` — 🩹 Raccord > Relations, récompenses et sources partagent le même rythme > 🐭 Julien
77. `373afdf` — 🧹 Coulisses > Les quatre familles partagent un même contrat de typage > 🐭 Julien
78. `7f84211` — ✍️ Scénario > Le README raconte le montage commun des index et des fiches > 🐭 Julien
79. `4396789` — 🎨 Mise en scène > La page d’accueil ouvre son grand carton de projection > 🐭 Julien
80. `83d1386` — 🎨 Mise en scène > Les quatre portes composent un nouveau hall d’exploration > 🐭 Julien
81. `53d987c` — 🎨 Mise en scène > Le générique de la home prolonge la projection > 🐭 Julien
82. `a0d7546` — 🎨 Mise en scène > Un générique court accompagne les pages du Codex > 🐭 Julien
83. `ff0e3ab` — 🎨 Mise en scène > La table de recherche éclaire mieux les archives > 🐭 Julien
84. `1a8a6c8` — 🩹 Raccord > Laisser respirer le générique au bas des pages > 🐭 Julien
85. `e02ad61` — 🎨 Mise en scène > Déployer les ouvertures des fiches sur tout l’écran > 🐭 Julien
86. `dbdaa84` — 🎨 Mise en scène > Déployer les ouvertures des index sur tout l’écran > 🐭 Julien
87. `9e4f649` — 🎨 Mise en scène > Étendre la table de recherche sur toute la largeur > 🐭 Julien
88. `a95907a` — 🎨 Mise en scène > Donner plus d’ampleur aux chapitres du Codex > 🐭 Julien
89. `0c1796f` — 🗄️ Archives > Les techniques de l’image rejoignent le registre des symboles > 🐭 Julien
90. `ae88dbe` — 🎨 Mise en scène > PixieSymbol expose les techniques de l’image > 🐭 Julien
91. `739edef` — 🗄️ Archives > Les techniques de la couleur rejoignent le registre des symboles > 🐭 Julien
92. `c5d683d` — 🎨 Mise en scène > PixieSymbol expose les techniques de la couleur > 🐭 Julien
93. `61335cd` — 🗄️ Archives > Les techniques du son rejoignent le registre des symboles > 🐭 Julien
94. `cf014f4` — 🎨 Mise en scène > PixieSymbol expose les techniques du son > 🐭 Julien
95. `f663d94` — 🗄️ Archives > Les techniques des effets rejoignent le registre des symboles > 🐭 Julien
96. `db09695` — 🎨 Mise en scène > PixieSymbol expose les techniques des effets > 🐭 Julien
97. `3c2f6f1` — 🗄️ Archives > Les techniques de l’Imagineering rejoignent le registre des symboles > 🐭 Julien
98. `3866c49` — 🎨 Mise en scène > PixieSymbol expose les techniques de l’Imagineering > 🐭 Julien
99. `71ee7e6` — 🗄️ Archives > Les accessoires d’archives rejoignent le registre des symboles > 🐭 Julien
100. `86ca803` — 🎨 Mise en scène > PixieSymbol expose les accessoires d’archives > 🐭 Julien
101. `ff06ab0` — 🗄️ Archives > Les accessoires d’écriture rejoignent le registre des symboles > 🐭 Julien
102. `0010000` — 🎨 Mise en scène > PixieSymbol expose les accessoires d’écriture > 🐭 Julien
103. `b2b2973` — 🗄️ Archives > Les accessoires d’exploration rejoignent le registre des symboles > 🐭 Julien
104. `8d4962b` — 🎨 Mise en scène > PixieSymbol expose les accessoires d’exploration > 🐭 Julien
105. `e475afe` — 🗄️ Archives > Les repères temporels rejoignent le registre des symboles > 🐭 Julien
106. `64290ce` — 🎨 Mise en scène > PixieSymbol expose les repères temporels > 🐭 Julien
107. `f6549d9` — 🗄️ Archives > Les outils de l’atelier rejoignent le registre des symboles > 🐭 Julien
108. `43fefde` — 🎨 Mise en scène > PixieSymbol expose les outils de l’atelier > 🐭 Julien
109. `9b203d7` — 🗄️ Archives > Les accessoires événementiels rejoignent le registre des symboles > 🐭 Julien
110. `ae9696b` — 🎨 Mise en scène > PixieSymbol expose les accessoires événementiels > 🐭 Julien
111. `b5e0006` — 🗄️ Archives > Les outils de communication rejoignent le registre des symboles > 🐭 Julien
112. `089c7e4` — 🎨 Mise en scène > PixieSymbol expose les outils de communication > 🐭 Julien
113. `2a80564` — 🩹 Raccord > Étendre tous les chapitres au cadre des fiches > 🐭 Julien
114. `6f83756` — 🎨 Mise en scène > PixieCard compose les détails des œuvres > 🐭 Julien
115. `1710b32` — 🎨 Mise en scène > Illustrer et déployer les repères des œuvres > 🐭 Julien
116. `06d3b06` — ✍️ Scénario > Donner une voix aux sorties et filiations des œuvres > 🐭 Julien
117. `0d971c3` — 🎨 Mise en scène > Les métiers du générique révèlent leurs outils > 🐭 Julien
118. `abb8680` — 🧪 Répétition > Tous les registres de symboles passent au contrôle de projection > 🐭 Julien
119. `1c889e0` — ✍️ Scénario > Le README raconte la projection achevée de l’Acte V > 🐭 Julien
120. `4c4323c` — ✍️ Scénario > Le Journal retrouve l’Entracte IV et prépare le générique de l’Acte V > 🐭 Julien
121. `2f4aa81` — 🎞️ Acte > Fin de l’Acte V · Blanche-Neige a ouvert le grand récit > 🐭 Julien

### Dernière image

**Blanche-Neige a ouvert le grand récit.**

Le Codex sait désormais accueillir les longs métrages, leurs mondes, leurs personnages et les nombreuses voix qui participent à leur fabrication. Les archives disposent d’un cadre commun pour les raconter, les relier et les projeter.

---

## 🍿 Entracte IV · L’Atelier déploie ses plateaux et inspecte ses raccords

**Tag :** `entracte-iv`\
**Ouverture :** `0d333a1`\
**Clôture :** `9ec3b77`\
**Entre :** Acte IV et Acte V

### Le raccord

Le quatrième Entracte transforme l’Atelier en véritable plateau de fabrication.

Les surfaces, les compositions, les dialogues et les effets y reçoivent leurs premières esquisses. Pendant que le langage Pixie s’élargit, le Codex affine son identité, éclaire ses cartes et consigne les règles qui permettront de retrouver chaque étape de sa projection.

### Pendant l’Entracte

- ajout du logo au registre général et au générique du Codex ;
- resserrement du récit de la page d’accueil et réalignement de ses quatre portes ;
- extension du halo de projecteur aux cartes métier ;
- ouverture des plateaux Décors, Dialogues, Montage et Effets ;
- adoption de cinq voix typographiques pour la marque, les titres, le texte, les repères et le code ;
- création des six premières surfaces PixieDust ;
- création des onze esquisses de composition du Montage ;
- création des six premiers contrôles du plateau des Dialogues ;
- création de Toast, Loader et Skeleton pour le plateau des Effets ;
- ajout des collections de symboles consacrées au cinéma et aux techniques d’animation ;
- formalisation des conventions de tags, de Releases et du Journal de projection ;
- reconstitution des quatre premiers Actes et de leurs Entractes dans le CHANGELOG ;
- actualisation du README avec les nouveaux plateaux de l’Atelier.

### Générique des commits

1. `0d333a1` — 🍿 Entracte > Le temps d’inspecter les raccords commence > 🐭 Julien
2. `35b2575` — 🗄️ Archives > Le logo du Codex rejoint le registre général > 🐭 Julien
3. `6e59ec2` — 🎨 Mise en scène > Le logo prend place au générique du Codex > 🐭 Julien
4. `162bd89` — ✍️ Scénario > La page d’accueil resserre son récit > 🐭 Julien
5. `6668d2a` — 🎨 Mise en scène > Les quatre portes retrouvent leur ligne > 🐭 Julien
6. `4bb518c` — 🎨 Mise en scène > Le projecteur éclaire toutes les cartes du Codex > 🐭 Julien
7. `14637e7` — 🏗️ Décor > L’Atelier ouvre son troisième plateau > 🐭 Julien
8. `1baa75a` — 🏗️ Décor > L’Atelier ouvre le plateau des dialogues > 🐭 Julien
9. `2fab29e` — 🏗️ Décor > L’Atelier ouvre le plateau du montage > 🐭 Julien
10. `b776013` — 🏗️ Décor > L’Atelier ouvre le plateau des effets > 🐭 Julien
11. `af0a224` — 🎨 Mise en scène > Le Codex trouve ses cinq voix > 🐭 Julien
12. `eb0327e` — 🎨 Mise en scène > Le sous-titre prend toute la largeur > 🐭 Julien
13. `1d4398d` — 🎨 Mise en scène > PixieDustCard installe ses premières surfaces > 🐭 Julien
14. `a6378fd` — ✍️ Scénario > Les types de composants trouvent leur dossier > 🐭 Julien
15. `9c27fe4` — 🎨 Mise en scène > PixieDustPanel structure les premières sections > 🐭 Julien
16. `84d71c4` — 🎨 Mise en scène > Créateurs, Œuvres et Époques redessinent leurs symboles > 🐭 Julien
17. `1f83ac2` — 🎨 Mise en scène > PixieDustFrame met les médias dans le cadre > 🐭 Julien
18. `e6de7de` — 🎨 Mise en scène > PixieDustCallout éclaire les annotations du Codex > 🐭 Julien
19. `9da63df` — 🎨 Mise en scène > PixieDustInset creuse ses premières zones secondaires > 🐭 Julien
20. `3ba31bc` — 🎨 Mise en scène > PixieDustBackdrop installe ses premières atmosphères > 🐭 Julien
21. `d858658` — 🎨 Mise en scène > PixieDustContainer cadre sa première séquence > 🐭 Julien
22. `1d9e9c9` — 🎨 Mise en scène > PixieDustStack donne son rythme aux premières séquences > 🐭 Julien
23. `832407f` — 🎨 Mise en scène > PixieDustCluster rassemble les plans sur plusieurs lignes > 🐭 Julien
24. `2c9c1ab` — 🎨 Mise en scène > PixieDustSection compose ses premières séquences éditoriales > 🐭 Julien
25. `2d88f36` — 🎨 Mise en scène > PixieDustGrid distribue les collections sur ses premières pistes > 🐭 Julien
26. `62b8526` — 🎨 Mise en scène > PixieDustSplit compose son premier champ-contrechamp > 🐭 Julien
27. `e49bcb9` — 🎨 Mise en scène > PixieDustSidebar installe sa première régie latérale > 🐭 Julien
28. `01df9b3` — 🎨 Mise en scène > PixieDustSwitcher orchestre ses premiers changements de plan > 🐭 Julien
29. `2429444` — 🎨 Mise en scène > PixieDustRail déroule ses premières archives en travelling > 🐭 Julien
30. `be839db` — 🎨 Mise en scène > PixieDustBleed ouvre ses premières séquences au hors-champ > 🐭 Julien
31. `6bea6f2` — 🎨 Mise en scène > PixieDustStickyRegion maintient ses premières régies dans le cadre > 🐭 Julien
32. `435b357` — 🎨 Mise en scène > PixieDustField relie ses premiers contrôles à leurs indications > 🐭 Julien
33. `c5e67ad` — 🎨 Mise en scène > PixieDustInput recueille ses premières lignes de dialogue > 🐭 Julien
34. `5e27ef5` — 🎨 Mise en scène > PixieDustTextarea recueille ses premières réponses développées > 🐭 Julien
35. `2f84096` — 🎨 Mise en scène > PixieDustSelect ouvre ses premières listes de choix > 🐭 Julien
36. `dd9297a` — 🎨 Mise en scène > PixieDustSwitch actionne ses premières préférences > 🐭 Julien
37. `0453d58` — 🎨 Mise en scène > PixieDustSearchField compose ses premières recherches > 🐭 Julien
38. `b9dff21` — 🎨 Mise en scène > PixieDustToast signale les réactions du Codex > 🐭 Julien
39. `dec6a68` — 🎨 Mise en scène > PixieDustLoader laisse voir la magie à l’œuvre > 🐭 Julien
40. `111b1ef` — 🎨 Mise en scène > PixieDustSkeleton réserve la place de la prochaine image > 🐭 Julien
41. `a894842` — 🗄️ Archives > Cinéma et techniques d’animation enrichissent le registre > 🐭 Julien
42. `699b0fa` — 🎨 Mise en scène > PixieSymbol expose les collections Cinéma et Animation > 🐭 Julien
43. `8fe3f73` — ✍️ Scénario > Les tags et le Journal fixent leurs règles de projection > 🐭 Julien
44. `93f57c6` — ✍️ Scénario > Le Journal retrace les quatre premiers Actes et leurs raccords > 🐭 Julien
45. `a9bb044` — ✍️ Scénario > Le README raconte les nouveaux plateaux de l’Atelier > 🐭 Julien
46. `9ec3b77` — 🍿 Entracte > Les raccords sont inspectés, la projection peut reprendre > 🐭 Julien

### Dernière image

**Les raccords sont inspectés, la projection peut reprendre.**

L’Atelier dispose désormais de six plateaux et d’un premier répertoire d’esquisses pour préparer l’entrée de Blanche-Neige dans le grand récit.

---

## 🎞️ Acte IV · Les origines retrouvent leur lumière

**Tag :** `acte-iv`\
**Ouverture :** `20b05de`\
**Clôture :** `c65b4fa`

### La projection

Le Codex remonte aux premières images de Disney et complète le récit qui précède _Blanche-Neige et les Sept Nains_.

Les personnages, les artistes, les œuvres et les récompenses des origines rejoignent les archives. Dans le même temps, les index gagnent de nouvelles vues, les fiches affirment leur identité et les premiers composants Pixie entrent véritablement en projection.

### À l’écran

- création des premiers registres de métadonnées ;
- extension de la palette de l’Atelier à vingt couleurs ;
- promotion et intégration de `PixieBadge` ;
- création des cartes métier et des vues Liste et Cards ;
- arrivée d’Alice, Roy Disney, Oswald et des premières œuvres de Mickey ;
- documentation des premiers jalons sonores, musicaux et colorés ;
- élargissement du cercle de Mickey ;
- création du registre central des récompenses ;
- documentation des distinctions antérieures à _Blanche-Neige_ ;
- création et intégration des symboles de trophées ;
- thématisation des fiches selon leur famille ;
- promotion de `PixieLink`, `PixieSeparator` et `PixieButton` ;
- ouverture de la première recherche globale ;
- vérification générale des archives, des relations et de l’accessibilité.

### Générique des commits

1. `20b05de` — 🎞️ Acte > Acte IV · Les origines retrouvent leur lumière > 🐭 Julien
2. `a944329` — 🗄️ Archives > Les métadonnées ouvrent leurs premiers registres > 🐭 Julien
3. `c4b810a` — 🗄️ Archives > Les œuvres révèlent leur format de projection > 🐭 Julien
4. `af829bb` — 🎨 Mise en scène > L’Atelier déploie sa boîte de vingt couleurs > 🐭 Julien
5. `76aaee6` — 🎨 Mise en scène > Les couleurs de l’Atelier entrent au registre > 🐭 Julien
6. `082dad9` — 🗄️ Archives > Les registres nomment leurs couleurs > 🐭 Julien
7. `be46202` — 🎬 Scène > PixieDustBadge projette sa version 0.2.0 > 🐭 Julien
8. `678dc80` — 🎨 Mise en scène > L’Atelier éprouve PixieDustBadge en version 0.2.0 > 🐭 Julien
9. `c2198dc` — 🎬 Scène > PixieBadge entre en projection en version 1.0.0 > 🐭 Julien
10. `05bf380` — 🎨 Mise en scène > Les fiches révèlent leurs métadonnées > 🐭 Julien
11. `4327e58` — 🎨 Mise en scène > Les quatre familles composent leurs cartes métier > 🐭 Julien
12. `5bfa158` — 🎬 Scène > Les index alternent entre liste et cartes > 🐭 Julien
13. `436afb3` — 🎨 Mise en scène > Les listes deviennent des registres illustrés > 🐭 Julien
14. `7c81cda` — 🗄️ Archives > Alice emporte Cartoonland jusqu’à Hollywood > 🐭 Julien
15. `a0f2ced` — 🗄️ Archives > Roy donne aux rêves une assise durable > 🐭 Julien
16. `5489f00` — 🗄️ Archives > Oswald apprend au studio à posséder ses créations > 🐭 Julien
17. `60c8af1` — 🗄️ Archives > Trolley Troubles met Oswald sur les rails > 🐭 Julien
18. `5796f10` — 🗄️ Archives > Plane Crazy fait décoller le premier Mickey > 🐭 Julien
19. `bed0dfd` — 🗄️ Archives > The Gallopin’ Gaucho donne à Mickey son premier rôle > 🐭 Julien
20. `aad0ad6` — 🗄️ Archives > The Skeleton Dance libère le dessin par la musique > 🐭 Julien
21. `91c8946` — 🗄️ Archives > Flowers and Trees donne à la couleur un rôle à jouer > 🐭 Julien
22. `c856c27` — 🗄️ Archives > Three Little Pigs donne une personnalité au dessin animé > 🐭 Julien
23. `c1ee3d3` — 🗄️ Archives > Carl Stalling donne le rythme aux premières images sonores > 🐭 Julien
24. `cdc0fa0` — 🗄️ Archives > Wilfred Jackson accorde l’animation à la musique > 🐭 Julien
25. `78576a6` — 🗄️ Archives > The Chain Gang met Pluto sur la piste > 🐭 Julien
26. `4784c52` — 🗄️ Archives > Mickey’s Revue fait entendre Dingo avant de le nommer > 🐭 Julien
27. `1ae1cae` — 🗄️ Archives > Orphans’ Benefit laisse éclater la colère de Donald > 🐭 Julien
28. `3e0358e` — 🗄️ Archives > Pat Hibulaire traverse les séries pour défier Mickey > 🐭 Julien
29. `fa94f0e` — 🗄️ Archives > Clarabelle Cow trouve sa place dans la troupe de Mickey > 🐭 Julien
30. `8c3b0d2` — 🗄️ Archives > Horace Horsecollar met sa polyvalence au service de la troupe > 🐭 Julien
31. `3884733` — 🗄️ Archives > Clarence Nash donne à Donald une voix pour traverser un demi-siècle > 🐭 Julien
32. `0d4e6c6` — 🗄️ Archives > Pinto Colvig fait du rire de Dingo un personnage > 🐭 Julien
33. `b1245da` — 🎬 Scène > Le Codex ouvre son registre des récompenses > 🐭 Julien
34. `0d16a6d` — 🎨 Mise en scène > Les récompenses trouvent leur place sur les fiches > 🐭 Julien
35. `4893f49` — 🗄️ Archives > Walt reçoit un Oscar pour la création de Mickey > 🐭 Julien
36. `699710a` — 🗄️ Archives > Flowers and Trees remporte le premier Oscar du dessin animé > 🐭 Julien
37. `cf7bb5d` — 🗄️ Archives > Three Little Pigs fait entrer un deuxième Oscar au studio > 🐭 Julien
38. `7b8357c` — 🗄️ Archives > The Tortoise and the Hare prolonge la moisson des Oscars > 🐭 Julien
39. `447883a` — 🗄️ Archives > Three Orphan Kittens poursuit la série dorée des Silly Symphonies > 🐭 Julien
40. `625b0a8` — 🗄️ Archives > The Country Cousin offre un cinquième Oscar consécutif à Walt > 🐭 Julien
41. `5b7afb5` — 🗄️ Archives > The Old Mill couronne les profondeurs de la caméra multiplane > 🐭 Julien
42. `6aa8158` — 🗄️ Archives > La caméra multiplane reçoit les honneurs techniques de l’Academy > 🐭 Julien
43. `c68c431` — 🗄️ Archives > Ferdinand the Bull referme le palmarès avant Blanche-Neige > 🐭 Julien
44. `27dbc22` — 🗄️ Archives > La Société des Nations salue le bonheur semé par Mickey > 🐭 Julien
45. `1b42519` — 🗄️ Archives > The Band Concert décroche la médaille d’or de Venise > 🐭 Julien
46. `810ed6d` — 🗄️ Archives > Les trophées rejoignent le registre des symboles > 🐭 Julien
47. `6f0bdc2` — 🎨 Mise en scène > L’Atelier expose les symboles des récompenses > 🐭 Julien
48. `9cda3e5` — 🗄️ Archives > Chaque récompense reçoit la forme de son trophée > 🐭 Julien
49. `ec03bea` — 🎨 Mise en scène > Les trophées prennent place dans le palmarès > 🐭 Julien
50. `4d7e3a3` — 🗄️ Archives > Toby Tortoise garde le cap jusqu’à l’Oscar > 🐭 Julien
51. `be23ef2` — 🗄️ Archives > Trois chatons sèment le désordre jusqu’à l’Oscar > 🐭 Julien
52. `bf6e994` — 🗄️ Archives > Abner découvre que la ville ne dort jamais > 🐭 Julien
53. `5a1054f` — 🗄️ Archives > L’orage donne de la profondeur au vieux moulin > 🐭 Julien
54. `ded2ece` — 🗄️ Archives > Ferdinand préfère les fleurs aux honneurs de l’arène > 🐭 Julien
55. `b90be51` — 🎨 Mise en scène > Les cartes Œuvres affichent leurs trophées > 🐭 Julien
56. `fee434a` — 🎨 Mise en scène > Les fiches héritent de leur identité familiale > 🐭 Julien
57. `96e45d7` — 🎨 Mise en scène > Les accents familiaux traversent les fiches et leurs relations > 🐭 Julien
58. `0918b8a` — 🎨 Mise en scène > PixieDustLink affine ses raccords en couleurs > 🐭 Julien
59. `f21831d` — 🎨 Mise en scène > PixieLink est prêt à guider le Codex > 🐭 Julien
60. `a7199b5` — 🎨 Mise en scène > PixieLink relie les scènes du Codex > 🐭 Julien
61. `94bf2f1` — 🎨 Mise en scène > PixieDustSeparator affine les changements de séquence > 🐭 Julien
62. `3b694e9` — 🎨 Mise en scène > PixieSeparator est prêt à rythmer le Codex > 🐭 Julien
63. `7858508` — 🎨 Mise en scène > PixieSeparator rythme les pages et les fiches du Codex > 🐭 Julien
64. `eddae34` — 🎨 Mise en scène > PixieDustButton prépare ses actions en couleurs > 🐭 Julien
65. `d95f10d` — 🎨 Mise en scène > PixieButton est prêt à déclencher les actions du Codex > 🐭 Julien
66. `c95cb1b` — 🎬 Scène > Le Codex ouvre sa première recherche globale > 🐭 Julien
67. `d5fbdd1` — 🧪 Répétition > La projection générale éprouve les archives du Codex > 🐭 Julien
68. `dbf19db` — ✍️ Scénario > Le README et l’Atelier racontent la fin de l’Acte IV > 🐭 Julien
69. `c65b4fa` — 🎞️ Acte > Fin de l'Acte IV · Les origines brillent désormais sur l’écran > 🐭 Julien

### Dernière image

**Les origines brillent désormais sur l’écran.**

Les premières années de Disney disposent maintenant de leurs personnages, de leurs créateurs, de leurs œuvres et de leur palmarès. Le Codex peut les explorer, les relier et les retrouver sous une lumière commune.

---

## 🍿 Entracte III · Le Codex ouvre son Atelier et façonne son langage visuel

**Tag :** `entracte-iii`\
**Ouverture :** `a25d5cf`\
**Clôture :** `74ac565`\
**Entre :** Acte III et Acte IV

### Le raccord

Le troisième Entracte ouvre les coulisses de la fabrication du Codex.

Un Atelier accueille désormais les esquisses de composants, les palettes et les symboles avant leur entrée dans la projection. Le projet se dote progressivement d’un langage visuel commun, porté par les familles Pixie et PixieDust.

### Pendant l’Entracte

- ajout d’un grain et d’une lumière de projection ;
- ouverture de l’Atelier des composants ;
- création de la première esquisse du Bouton ;
- renforcement des règles de production dans `AGENTS.md` ;
- élargissement du cadre général des pages ;
- création des palettes _Projection Originale_ et _L’Atelier d’animation_ ;
- attribution d’une couleur propre aux quatre index ;
- création du registre central des symboles ;
- intégration des symboles des quatre portes avec `PixieSymbol` ;
- normalisation de l’architecture et du nommage des composants ;
- centralisation des types TypeScript partagés ;
- création des premiers accessoires PixieDust ;
- harmonisation des fiches et des contrôles de l’Atelier ;
- création des registres de symboles pour les blocs éditoriaux ;
- typage des blocs éditoriaux dans les archives ;
- amélioration du passage au clavier dans les index ;
- ajout de contrôles automatisés sur les symboles ;
- mise à jour de l’Atelier et du README.

### Générique des commits

1. `a25d5cf` — 🍿 Entracte > Le temps de relire les archives commence > 🐭 Julien
2. `966e2d8` — 🎨 Mise en scène > Déposer un grain de projection sur le Codex > 🐭 Julien
3. `136c07a` — 🎨 Mise en scène > Allumer le projecteur devant les portes du Codex > 🐭 Julien
4. `8d8e262` — 🏗️ Décor > Ouvrir l’atelier de projection des composants > 🐭 Julien
5. `72afac3` — 🎨 Mise en scène > Le Bouton fait ses premiers essais dans l’Atelier > 🐭 Julien
6. `ef733ba` — ✍️ Scénario > Graver les règles impératives du dépôt > 🐭 Julien
7. `5a35db6` — 🎨 Mise en scène > Élargir le cadre de toutes les pages du Codex > 🐭 Julien
8. `a40b191` — 🎨 Mise en scène > La Pellicule révèle ses deux palettes > 🐭 Julien
9. `53bfb6c` — 🎨 Mise en scène > Les quatre index prennent leurs couleurs d’atelier > 🐭 Julien
10. `6c28d2a` — 🏗️ Décor > Autoriser le nouveau domaine local du Codex > 🐭 Julien
11. `7769c03` — 🗄️ Archives > Le registre des symboles ouvre ses premières collections > 🐭 Julien
12. `79fd932` — 🎨 Mise en scène > Les régies de l’Atelier parlent le même langage > 🐭 Julien
13. `9df0ab7` — 🎨 Mise en scène > Pixie projette les symboles des quatre index > 🐭 Julien
14. `31c7837` — ✍️ Scénario > Les composants reçoivent leurs conventions de plateau > 🐭 Julien
15. `30cd816` — ✍️ Scénario > Les types TypeScript trouvent leur place unique > 🐭 Julien
16. `b4ec66a` — ✍️ Scénario > Les types et l’Atelier fixent leurs règles de production > 🐭 Julien
17. `4616319` — 🧹 Coulisses > Les composants de l’Atelier rejoignent leurs loges > 🐭 Julien
18. `95788bf` — 🧹 Coulisses > Les composants du Codex affichent leur famille > 🐭 Julien
19. `b88f96d` — 🧹 Coulisses > Le bouton rejoint la poussière de Pixie > 🐭 Julien
20. `896d6ac` — 🎨 Mise en scène > L’Atelier adopte son graphite de travail > 🐭 Julien
21. `e261750` — 🎨 Mise en scène > La Pellicule ordonne ses fondations > 🐭 Julien
22. `0d9057b` — 🎨 Mise en scène > Les fiches d’accessoires s’ouvrent sur commande > 🐭 Julien
23. `b93ef7d` — 🎨 Mise en scène > Les fiches d’accessoires règlent leur plateau > 🐭 Julien
24. `56f9e02` — 🎨 Mise en scène > Le générique technique révèle ses types > 🐭 Julien
25. `263776a` — 🎨 Mise en scène > PixieDustLink ouvre ses premiers passages > 🐭 Julien
26. `b641f3d` — 🩹 Raccord > PixieDustButton retrouve son nom dans l’Atelier > 🐭 Julien
27. `1366511` — 🎨 Mise en scène > PixieDustBadge compose ses premiers cartouches > 🐭 Julien
28. `5f819e5` — 🎨 Mise en scène > PixieDustSeparator découpe ses premières séquences > 🐭 Julien
29. `3b79a82` — 🎨 Mise en scène > Les blocs des Personnages entrent dans la Table d’animation > 🐭 Julien
30. `2698e31` — 🎨 Mise en scène > Les outils des Créateurs rejoignent le registre des blocs > 🐭 Julien
31. `a8de1fc` — 🎨 Mise en scène > La pellicule des Œuvres prend vie dans le registre des blocs > 🐭 Julien
32. `198666b` — 🎨 Mise en scène > Le studio des Époques se construit dans le registre des blocs > 🐭 Julien
33. `614e837` — 🎨 Mise en scène > Préparer les blocs éditoriaux à recevoir leurs symboles > 🐭 Julien
34. `0271386` — 🗄️ Archives > Les blocs éditoriaux trouvent leurs symboles > 🐭 Julien
35. `ed604e8` — 🧪 Répétition > Vérifier que chaque bloc retrouve son symbole > 🐭 Julien
36. `6c38404` — 🩹 Raccord > Accorder les index au passage du clavier > 🐭 Julien
37. `ad98ca6` — ✍️ Scénario > Préparer les accessoires pour leur prochaine projection > 🐭 Julien
38. `d333ff5` — 🧹 Coulisses > Ranger l’Atelier avant que les lumières ne baissent > 🐭 Julien
39. `59edfe4` — ✍️ Scénario > Le README raconte le Codex après l’Entracte > 🐭 Julien
40. `74ac565` — 🍿 Entracte > Les archives sont relues, les lumières peuvent baisser > 🐭 Julien

### Dernière image

**Les archives sont relues, les lumières peuvent baisser.**

L’Atelier est ouvert, les premiers accessoires sont prêts et le Codex possède désormais un langage visuel pour accompagner la suite de son récit.

---

## 🎞️ Acte III · Le Codex apprend à raconter le temps

**Tag :** `acte-iii`\
**Ouverture :** `51f19b1`\
**Clôture :** `ed6ea36`

### La projection

Les archives quittent le présent immobile.

Avec l’ouverture des Époques, les personnages, les créateurs et les œuvres trouvent leur place dans une histoire commune. Le Codex peut désormais suivre les générations et raconter le passage des pionniers aux chefs-d’œuvre.

### À l’écran

- ouverture de l’index consacré aux Époques ;
- création du _Temps des pionniers_ et du _Temps des chefs-d’œuvre_ ;
- rattachement automatique des archives à leur époque ;
- apparition des relations temporelles sur les fiches ;
- entrée de Donald, Dingo, Daisy et Pluto dans le Codex ;
- documentation de plusieurs œuvres du cercle de Mickey ;
- arrivée des Nine Old Men ;
- ouverture des fiches aux récits éditoriaux ;
- mise en récit du passage des pionniers aux chefs-d’œuvre.

### Générique des commits

1. `51f19b1` — 🎞️ Acte > Acte III · Le Codex apprend à raconter le temps > 🐭 Julien
2. `0f2a9a0` — 🏗️ Décor > Ouvrir une porte sur le temps dans le Codex > 🐭 Julien
3. `c6593c6` — 🎬 Scène > Inscrire les premières fiches dans leur époque > 🐭 Julien
4. `b1c81f4` — 🎬 Scène > Faire remonter les premières traces du temps dans le Codex > 🐭 Julien
5. `c28857b` — 🎬 Scène > Faire traverser le temps aux premiers créateurs du Codex > 🐭 Julien
6. `35a42a4` — 🗄️ Archives > Ouvrir le temps des chefs-d’œuvre dans le Codex > 🐭 Julien
7. `b6ddc78` — 🩹 Raccord > Clarifier les frontières entre les premières époques > 🐭 Julien
8. `4f4e632` — 🎨 Mise en scène > Ouvrir le Codex sur ses premières époques > 🐭 Julien
9. `753fbda` — 🗄️ Archives > Faire entrer Donald dans le cercle de Mickey > 🐭 Julien
10. `0bc4a68` — 🗄️ Archives > Donald prend son envol avec The Wise Little Hen > 🐭 Julien
11. `d49640d` — 🗄️ Archives > Faire résonner le rire de Dingo dans le Codex > 🐭 Julien
12. `a372131` — 🗄️ Archives > Faire entrer The Band Concert en couleurs dans le Codex > 🐭 Julien
13. `90403f1` — 🗄️ Archives > Remettre Clock Cleaners à l’heure du Codex > 🐭 Julien
14. `454a8ae` — 🗄️ Archives > Daisy prend sa place aux côtés de Donald > 🐭 Julien
15. `d2225e1` — 🗄️ Archives > Mr. Duck Steps Out réunit Donald et Daisy > 🐭 Julien
16. `09b1b77` — 🗄️ Archives > Pluto suit la piste de Mickey jusqu’au Codex > 🐭 Julien
17. `6403507` — 🗄️ Archives > Pluto affronte ses reflets dans Bone Trouble > 🐭 Julien
18. `020d281` — 🗄️ Archives > Les Clark ouvre le cercle des Nine Old Men > 🐭 Julien
19. `3975ca6` — 🗄️ Archives > Eric Larson transmet le mouvement au Codex > 🐭 Julien
20. `fbfa926` — 🗄️ Archives > Wolfgang Reitherman fait entrer l’action dans le Codex > 🐭 Julien
21. `c108885` — 🗄️ Archives > Milt Kahl donne sa ligne au Codex > 🐭 Julien
22. `544fadc` — 🗄️ Archives > Ward Kimball fait dérailler les habitudes du Codex > 🐭 Julien
23. `9f87ff6` — 🗄️ Archives > Frank Thomas donne une âme au mouvement > 🐭 Julien
24. `fb5f44b` — 🗄️ Archives > Ollie Johnston relie les personnages par l’émotion > 🐭 Julien
25. `89b4b4e` — 🗄️ Archives > Marc Davis fait passer les personnages de l’écran aux parcs > 🐭 Julien
26. `1e328a1` — 🗄️ Archives > John Lounsbery complète le cercle des Nine Old Men > 🐭 Julien
27. `0b4509a` — 🎬 Scène > Ouvrir les fiches aux récits éditoriaux > 🐭 Julien
28. `26d297f` — 🗄️ Archives > Raconter comment Donald trouve sa voix et son tempérament > 🐭 Julien
29. `f0dfb48` — 🗄️ Archives > Dingo donne au trio son troisième rythme > 🐭 Julien
30. `18ea4b3` — 🗄️ Archives > Daisy prend son nom et entre dans la danse > 🐭 Julien
31. `2a8280c` — 🗄️ Archives > Pluto trouve son identité sans avoir besoin de parler > 🐭 Julien
32. `035c1af` — 🗄️ Archives > Mickey et Minnie prennent vie au rythme de Steamboat Willie > 🐭 Julien
33. `d6fefbb` — 🗄️ Archives > Walt et Ub transforment une rupture en nouveau départ > 🐭 Julien
34. `d6839be` — 🗄️ Archives > Les Clark et Eric Larson transmettent le mouvement d’une génération à l’autre > 🐭 Julien
35. `3ce03ac` — 🗄️ Archives > Wolfgang Reitherman et Milt Kahl donnent force et forme au mouvement > 🐭 Julien
36. `57a57d7` — 🗄️ Archives > Frank Thomas et Ollie Johnston font de l’émotion un langage à transmettre > 🐭 Julien
37. `82da657` — 🗄️ Archives > Ward Kimball, Marc Davis et John Lounsbery élargissent le terrain de l’animation > 🐭 Julien
38. `4edaf55` — 🗄️ Archives > Raconter le passage des pionniers aux chefs-d’œuvre > 🐭 Julien
39. `ed6ea36` — 🎞️ Acte > Fin de l’Acte III · Le Codex sait raconter le temps > 🐭 Julien

### Dernière image

**Le Codex sait raconter le temps.**

Des pionniers aux chefs-d’œuvre, les archives traversent désormais les époques et font apparaître la continuité de l’histoire Disney.

---

## 🍿 Entracte II · Le Codex harmonise ses récits, ses chemins et ses lumières

**Tag :** `entracte-ii`\
**Ouverture :** `0208c27`\
**Clôture :** `affaed8`\
**Entre :** Acte II et Acte III

### Le raccord

Le deuxième Entracte harmonise la manière dont le Codex se présente et raconte ses premières archives.

Une troisième porte apparaît dans le hall, les fiches adoptent une ouverture commune et les chemins deviennent plus lisibles. Dans la salle, les lumières s’éteignent pour installer une identité plus cinématographique.

### Pendant l’Entracte

- ouverture d’une troisième porte dans le hall du Codex ;
- alignement et harmonisation des portes de navigation ;
- clarification des chemins et repères visibles ;
- création d’une ouverture commune pour les premières fiches ;
- installation de la première Lumière sombre ;
- correction de la hauteur des pages et de la page introuvable ;
- déplacement de l’indicateur de développement Next.js ;
- harmonisation de la voix éditoriale des chemins ;
- francisation des relations et des sources ;
- rédaction des introductions des cinq premières fiches ;
- mise en valeur visuelle des introductions ;
- documentation de l’architecture du Codex ;
- ajout du premier récit des origines sur la page d’accueil ;
- harmonisation du rythme et des marges des composants.

### Générique des commits

1. `0208c27` — 🍿 Entracte > Le projecteur reste chaud entre deux actes > 🐭 Julien
2. `0fe902d` — 🎨 Mise en scène > Ouvrir une troisième porte dans le hall du Codex > 🐭 Julien
3. `246b03d` — 🎨 Mise en scène > Aligner les trois portes du Codex > 🐭 Julien
4. `0a91ce4` — 🎨 Mise en scène > Clarifier les chemins visibles du Codex > 🐭 Julien
5. `43a4b22` — 🎨 Mise en scène > Donner une même ouverture aux premières fiches > 🐭 Julien
6. `44e73ae` — 🎨 Mise en scène > Éteindre les lumières dans la salle du Codex > 🐭 Julien
7. `51a915d` — 🩹 Raccord > Corriger la hauteur des pages et le centrage de la 404 > 🐭 Julien
8. `2db26e7` — 🧹 Coulisses > Déplacer l’indicateur de développement Next.js > 🐭 Julien
9. `7953786` — ✍️ Scénario > Harmoniser la voix des chemins visibles du Codex > 🐭 Julien
10. `f92ae2b` — 🗄️ Archives > Franciser les relations et les sources des fiches > 🐭 Julien
11. `dba0834` — ✍️ Scénario > Donner une voix aux cinq premières fiches du Codex > 🐭 Julien
12. `ee89f3f` — 🎨 Mise en scène > Donner une voix visible aux introductions du Codex > 🐭 Julien
13. `4bf4687` — ✍️ Scénario > Raconter l'architecture du Codex depuis les coulisses > 🐭 Julien
14. `e684ae9` — ✍️ Scénario > Raconter les premières origines depuis le hall du Codex > 🐭 Julien
15. `7560c9f` — 🩹 Raccord > Rendre aux composants le rythme de leurs marges > 🐭 Julien
16. `affaed8` — 🍿 Entracte > La salle est prête pour le prochain acte > 🐭 Julien

### Dernière image

**La salle est prête pour le prochain Acte.**

Les récits parlent désormais d’une même voix, les chemins sont clairement éclairés et le Codex peut commencer à raconter le temps.

---

## 🎞️ Acte II · Autour de Mickey, le réseau se dessine

**Tag :** `acte-ii`\
**Ouverture :** `2b34da3`\
**Clôture :** `4184168`

### La projection

Le Codex dépasse ses premières figures isolées.

Autour de Mickey apparaissent désormais une œuvre, un créateur et les liens qui les réunissent. Avec Ub Iwerks et _Steamboat Willie_, les archives commencent à former un véritable réseau narratif.

### À l’écran

- entrée d’Ub Iwerks dans le cercle de Mickey ;
- création de la première fiche consacrée à une œuvre ;
- documentation de la sortie et de l’importance de _Steamboat Willie_ ;
- rattachement de Mickey à l’œuvre qui le fit entrer en scène ;
- qualification du rôle des liens entre les archives ;
- apparition du premier réseau de relations autour des fiches.

### Générique des commits

1. `2b34da3` — 🎞️ Acte > Acte II · Autour de Mickey, le réseau se dessine > 🐭 Julien
2. `c0552b6` — 🗄️ Archives > Faire entrer Ub Iwerks dans le cercle de Mickey > 🐭 Julien
3. `2919ef6` — 🎬 Scène > Relier Mickey à l'œuvre qui le fit entrer en scène > 🐭 Julien
4. `28ddc67` — 🗄️ Archives > Documenter la première traversée de Steamboat Willie > 🐭 Julien
5. `0277790` — 🗄️ Archives > Donner un rôle aux liens qui entourent Steamboat Willie > 🐭 Julien
6. `27b8b50` — 🎬 Scène > Faire apparaître le réseau autour des premières fiches > 🐭 Julien
7. `4184168` — 🎞️ Acte > Fin de l'Acte II · Le réseau s'est dessiné autour de Mickey > 🐭 Julien

### Dernière image

**Le réseau s’est dessiné autour de Mickey.**

Les archives ne sont plus isolées : leurs histoires commencent désormais à se répondre.

---

## 🍿 Entracte I · Le Codex règle son rythme et allume sa première projection

**Tag :** `entracte-i`\
**Ouverture :** `63a1d95`\
**Clôture :** `26d9a0c`\
**Entre :** Acte I et Acte II

### Le raccord

Le premier Entracte donne au Codex son rythme de fabrication.

Le développement s’organise désormais en Actes et Entractes, avec des conventions narratives dédiées. Pendant que les archives restent en place, les premiers raccords techniques et visuels préparent la suite de la projection.

### Pendant l’Entracte

- organisation du développement en Actes et Entractes ;
- définition d’un rythme narratif propre aux Entractes ;
- regroupement des contrôles qualité sous une commande commune ;
- création d’une porte de sortie pour les pages introuvables ;
- amélioration de l’éclairage général de l’interface ;
- installation des premiers traitements typographiques ;
- amélioration des repères et panneaux de navigation ;
- création d’une première identité pour l’onglet du navigateur ;
- apparition du premier effet de projection sur le Codex.

### Générique des commits

1. `63a1d95` — 🍿 Entracte > Les lumières restent allumées entre deux actes > 🐭 Julien
2. `a0ab0ce` — 🎨 Mise en scène > Donner une porte de sortie aux pages égarées > 🐭 Julien
3. `40088c0` — ✍️ Scénario > Rythmer le développement en actes et entractes > 🐭 Julien
4. `c3b67ad` — 🧹 Coulisses > Réunir les contrôles qualité sous un même clap > 🐭 Julien
5. `104b076` — ✍️ Scénario > Donner son rythme propre à l'Entracte > 🐭 Julien
6. `aa93862` — 🎨 Mise en scène > Rallumer les lumières dans le hall du Codex > 🐭 Julien
7. `5c4cd6d` — 🎨 Mise en scène > Accrocher les premiers titres au fronton du Codex > 🐭 Julien
8. `dd34625` — 🎨 Mise en scène > Installer quelques panneaux dans les couloirs > 🐭 Julien
9. `a84e150` — 🎨 Mise en scène > Allumer une première étincelle dans l'onglet > 🐭 Julien
10. `a631ce9` — 🎨 Mise en scène > Poser la première projection sur le Codex > 🐭 Julien
11. `26d9a0c` — 🍿 Entracte > Les lumières baissent, la suite peut commencer > 🐭 Julien

### Dernière image

**Les lumières baissent, la suite peut commencer.**

Le Codex possède désormais son propre rythme de fabrication et une première lumière pour guider la projection.

---

## 🎞️ Acte I · Walt rencontre Mickey

**Tag :** `acte-i`\
**Ouverture :** `6743106`\
**Clôture :** `ecb23af`

### La projection

Le rideau se lève sur le Codex du Disneyiste.

Ce premier Acte pose les fondations du projet et ouvre son récit avec deux figures essentielles : Walt Disney et Mickey Mouse.

### À l’écran

- naissance de l’identité du Codex ;
- mise en place de sa première structure ;
- ouverture des index consacrés aux personnages et aux créateurs ;
- création des premières fiches de Walt Disney et Mickey Mouse ;
- ajout des premières archives et de leurs sources ;
- apparition des références au pied des fiches ;
- création du premier lien entre un personnage et son créateur.

### Générique des commits

1. `2c79627` — ✨ Étincelle > Il était une fois Le Codex du Disneyiste... > 🐭 Julien
2. `320202a` — 🧹 Coulisses > Nettoyer le plateau avant l'entrée en scène > 🐭 Julien
3. `6743106` — 🎞️ Acte > Acte I · Walt rencontre Mickey > 🐭 Julien
4. `adf6ab0` — 🏗️ Décor > Ouvrir deux portes aux habitants du Codex > 🐭 Julien
5. `9eed087` — 🎬 Scène > Ouvrir les premières fiches du Codex > 🐭 Julien
6. `dc1d0df` — 🗄️ Archives > Donner corps aux premières fiches de Walt et Mickey > 🐭 Julien
7. `d24e1c4` — 🗄️ Archives > Ouvrir les premières sources du Codex > 🐭 Julien
8. `e8178f1` — 🎨 Mise en scène > Faire apparaître les sources au pied des fiches > 🐭 Julien
9. `4464bd9` — 🎬 Scène > Tisser le premier lien entre Mickey et Walt > 🐭 Julien
10. `ecb23af` — 🎞️ Acte > Fin de l'Acte I · Walt a rencontré Mickey > 🐭 Julien

### Dernière image

**Walt a rencontré Mickey.**

Les premières archives sont ouvertes et le Codex peut désormais poursuivre sa projection.
