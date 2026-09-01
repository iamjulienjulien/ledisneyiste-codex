# Acte VI · Phase 2 · Audio, paroles et droits de projection

> **Document interne de production**<br>
> Préparé par **🔩 R2-D2**, Lead Developer chez **Guru Éditions**.

## Fonction du document

Ce document sépare la **faisabilité technique** d’une projection musicale de
son **autorisation juridique**. Il prépare `DEC-007` sans accorder lui-même
aucun droit de reproduction, de représentation, d’adaptation ou de mise à
disposition.

L’Acte VI peut publier une fiche Chanson complète avec son identité, ses
auteurs, ses interprètes, ses occurrences, ses versions, ses récompenses et
ses sources. **L’absence d’audio ou de paroles ne bloque jamais cette
publication documentaire.**

La règle proposée doit être relue au moment de chaque mise en ligne selon le
territoire, le support, le fournisseur et les preuves alors disponibles. Ce
document est une politique éditoriale et technique interne, pas un avis
juridique.

## Décision proposée en une image

| Matière projetée                       | Direction de l’Acte VI                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------ |
| Métadonnées et relations documentaires | **Publier** lorsqu’elles sont sourcées.                                        |
| Lien simple vers une source officielle | **Publier** avec destination et provenance lisibles.                           |
| Courte citation de paroles             | **Examiner au cas par cas**, avec finalité et proportion justifiables.         |
| Lecteur officiel intégré               | **Reporter par défaut** ; possible seulement après contrôle droits/vie privée. |
| Extrait audio hébergé par le Codex     | **Ne pas publier** sans autorisation écrite couvrant toutes les couches.       |
| Paroles ou traduction intégrales       | **Ne pas publier** sans licence explicite.                                     |

La première projection des Chansons repose donc sur les **métadonnées, les
relations et les liens officiels**. Le Codex ne présume jamais qu’une œuvre de
1940, un enregistrement ancien ou une traduction française sont libres.

## Les couches de droits ne se confondent pas

Un même bouton de lecture peut mobiliser plusieurs objets protégés. La preuve
portant sur l’un ne libère pas automatiquement les autres.

| Couche                          | Question à résoudre avant projection                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------- |
| Composition musicale            | Qui contrôle la musique et pour quels territoires, usages et durées ?                             |
| Paroles originales              | Qui contrôle le texte chanté ?                                                                    |
| Traduction ou adaptation        | La version française possède-t-elle sa propre autorisation et sa propre attribution ?             |
| Enregistrement ou « master »    | Qui contrôle la fixation sonore précise utilisée par le Codex ?                                   |
| Interprétation                  | Les droits des artistes-interprètes couvrent-ils la reproduction et la communication envisagées ? |
| Production phonographique       | Le producteur du phonogramme autorise-t-il cette mise à disposition ?                             |
| Image, pochette et photographie | Les éléments visuels du lecteur ou de l’édition sont-ils eux aussi autorisés ?                    |
| Service tiers                   | Ses conditions permettent-elles l’intégration voulue sans extraction ni altération du lecteur ?   |
| Vie privée                      | Le chargement dépose-t-il des traceurs ou transmet-il des données avant consentement ?            |

En France, la reproduction ou la représentation sans consentement demeure le
principe interdit par l’[article L122-4 du Code de la propriété intellectuelle](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000006278911/2025-01-23).
Les traductions et adaptations reçoivent une protection propre, sans préjudice
des droits de l’œuvre originale, selon l’[article L112-3](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006278879/2026-05-13).
Les autorisations relatives aux artistes-interprètes et aux producteurs de
phonogrammes sont en outre distinctes, notamment aux
[articles L212-3](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032859414/)
et [L213-1](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006279050/2026-05-15).

## Statuts de projection

Chaque future matière audio ou lyrique doit recevoir un statut explicite. Un
champ vide n’est jamais interprété comme une permission.

| Statut                   | Signification opérationnelle                                                         |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `metadata-only`          | Identité et relations publiables ; aucun média ni texte protégé n’est projeté.       |
| `external-link`          | Lien simple vers une page ou un lecteur officiel ; aucun fichier n’est recopié.      |
| `short-quotation-review` | Citation courte proposée, en attente d’une justification et d’une relecture humaine. |
| `embed-review`           | Intégration techniquement possible, mais droits, conditions et traceurs à vérifier.  |
| `licensed`               | Autorisation écrite identifiée, bornée et conservée comme preuve.                    |
| `public-domain-verified` | Domaine public établi pour chaque couche et chaque territoire concerné.              |
| `blocked`                | Une permission, une provenance ou une condition indispensable manque.                |
| `excluded`               | Matière volontairement écartée de la projection.                                     |

`licensed` et `public-domain-verified` ne sont jamais déduits d’une date. Ils
résultent d’un dossier de preuve revu et daté.

## Paroles et traductions

### Texte intégral

Les paroles originales, les traductions et les adaptations intégrales restent
hors projection sans licence explicite. Une page Chanson n’a pas besoin de
reproduire le texte pour établir l’existence, les auteurs, l’occurrence ou la
réception d’une chanson.

### Courte citation

L’[article L122-5](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006278912/)
admet notamment de courtes citations justifiées par une finalité critique,
pédagogique, scientifique ou d’information, avec indication claire de
l’auteur et de la source. Il ne fixe pas un nombre universel de caractères ou
de lignes.

Le Codex ne crée donc **aucun quota automatique**. Une citation lyrique ne
peut entrer en production que si :

1. une analyse éditoriale précise nécessite réellement ces mots ;
2. l’extrait demeure strictement proportionné à cette analyse ;
3. l’auteur, la chanson, la version, la langue et la source sont attribués ;
4. la citation ne remplace ni le texte ni l’écoute de l’œuvre ;
5. une personne responsable valide explicitement son emploi avant publication.

Une traduction publiée par le Codex constituerait elle-même une adaptation :
elle ne doit jamais être improvisée pour contourner l’absence de paroles
autorisées.

## Enregistrements et domaine public

La durée de protection d’une chanson ne se lit pas seulement dans son année
de sortie. Dans l’Union européenne, la composition avec paroles suit notamment
le dernier survivant entre auteur des paroles et compositeur lorsque les deux
contributions ont été créées pour la même composition, conformément à la
[directive 2011/77/UE](https://eur-lex.europa.eu/eli/dir/2011/77).

Les droits voisins des interprètes et producteurs possèdent leurs propres
durées. Aux États-Unis, les enregistrements antérieurs à 1972 suivent en outre
un régime spécifique présenté par l’[U.S. Copyright Office](https://copyright.gov/music-modernization/pre1972-soundrecordings/).
Les œuvres américaines publiées entre 1923 et 1963 peuvent aussi dépendre de
leur renouvellement, selon la
[Circular 22](https://www.copyright.gov/circs/circ22.pdf).

Conséquence : pour chaque territoire de diffusion, l’audit doit vérifier
séparément la composition, les paroles, la traduction, l’enregistrement,
l’interprétation et la production. Une seule couche encore protégée suffit à
interdire l’hébergement direct en l’absence de licence.

## Liens et lecteurs officiels

### Lien externe simple

Le lien simple constitue le repli préféré : il indique la plateforme ou
l’institution, s’ouvre comme une destination identifiable et ne recopie ni le
fichier audio ni le lecteur. La cible doit être officielle, stable et
compatible avec la ligne éditoriale du Codex.

### Lecteur intégré

Une intégration officielle reste techniquement envisageable, mais pas neutre.
Les [Spotify Widget Terms](https://developer.spotify.com/documentation/embeds/terms)
prévoient notamment des obligations relatives aux cookies et aux informations
fournies au public. Les
[YouTube API Services Terms](https://developers.google.com/youtube/terms/developer-policies)
encadrent l’apparence du lecteur, les données et les usages interdits comme
l’extraction, l’isolement audio ou la lecture d’arrière-plan.

La [CNIL](https://www.cnil.fr/fr/questions-reponses-lignes-directrices-modificatives-et-recommandation-cookies-traceurs)
rappelle que les contenus multimédias tiers peuvent déclencher des traceurs et
appeler un consentement. Si une intégration est retenue plus tard, le Codex
doit privilégier un **chargement après action ou consentement**, sans lecture
automatique, et conserver un lien externe accessible lorsque le lecteur est
refusé ou indisponible.

Un lecteur intégré n’autorise jamais à :

- télécharger ou recopier le flux ;
- masquer son origine ou son identité ;
- isoler l’audio de la vidéo ;
- lancer une lecture automatique non sollicitée ;
- rendre la fiche inutilisable sans le fournisseur tiers.

## Dossier de preuve minimal

Avant toute projection dépassant `metadata-only` ou `external-link`, le futur
registre doit conserver au minimum :

| Champ                       | Preuve attendue                                                               |
| --------------------------- | ----------------------------------------------------------------------------- |
| `workId`                    | Chanson et occurrence concernées.                                             |
| `assetId`                   | Enregistrement, texte, traduction ou intégration exacte.                      |
| `version`                   | Langue, interprétation, édition et date de la matière utilisée.               |
| `territories`               | Territoires explicitement couverts.                                           |
| `rightsLayers`              | Composition, paroles, traduction, master, interprètes, producteur et visuels. |
| `basis`                     | Licence, domaine public vérifié, exception examinée ou conditions du service. |
| `holderOrProvider`          | Titulaire, concédant ou plateforme responsable.                               |
| `allowedUses`               | Reproduction, représentation, intégration, extrait, durée et supports admis.  |
| `attribution`               | Mentions obligatoires et emplacement de leur projection.                      |
| `startsAt` / `expiresAt`    | Période de validité ou date de nouvelle vérification.                         |
| `evidence`                  | Contrat, courrier, registre officiel ou URL versionnée conservée.             |
| `privacyReview`             | Traceurs, consentement, transferts et solution de repli.                      |
| `reviewedBy` / `reviewedAt` | Responsable humain et date du dernier contrôle.                               |
| `status`                    | Statut explicite de projection.                                               |

L’interface publique ne reçoit jamais les pièces contractuelles ni les
identifiants confidentiels. Elle ne reçoit que la matière autorisée et son
attribution.

## Règle testable pour l’Acte VI

La projection est conforme lorsque :

- [ ] une fiche Chanson reste complète et intelligible sans média ;
- [ ] aucun fichier audio ni texte intégral n’est livré par défaut ;
- [ ] chaque lien externe expose clairement sa destination ;
- [ ] chaque citation possède finalité, proportion, version, auteur et source ;
- [ ] chaque matière hébergée possède un dossier de preuve couvrant toutes les couches ;
- [ ] chaque intégration tierce a passé le contrôle des conditions et de la vie privée ;
- [ ] le refus des traceurs conserve un accès documentaire et un lien externe ;
- [ ] aucune date ancienne ne produit automatiquement un statut de domaine public ;
- [ ] aucune traduction n’est créée par l’équipe sans autorisation ou source établie ;
- [ ] les tests empêchent un statut `blocked` ou incomplet d’atteindre la projection publique.

## Transmission aux phases suivantes

- **Phase 4** : le contrat Chanson doit fonctionner sans média et pouvoir
  référencer un statut de droits futur sans exposer les preuves privées.
- **Phase 6** : les neuf fiches publient d’abord métadonnées, versions,
  occurrences, auteurs, interprètes, récompenses et sources.
- **Phase 7** : le récit peut citer une parole seulement après le contrôle
  humain décrit ici ; sinon il reformule et source.
- **Phase 9** : aucune expérience média n’est requise pour achever l’Acte VI.
  Un lecteur tiers ou un extrait autorisé constitue un enrichissement séparé.

## Décision `DEC-007`

**Valider une première projection `metadata-first` : liens officiels simples
admis ; citations courtes examinées individuellement ; lecteurs intégrés
reportés par défaut ; audio hébergé, paroles intégrales et traductions
intégrales exclus sans autorisation écrite.**

Julien valide cette règle le 1er septembre 2026. Elle devient le contrat de
publication des matières audio et lyriques pour l’Acte VI ; elle ne vaut
toujours pas autorisation juridique pour une matière particulière.

---

**🔩 R2-D2 · Lead Developer @ Guru Éditions**<br>
_Documenter la chanson sans présumer le droit de la rejouer_
