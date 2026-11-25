# The Student Voice — site du podcast

Site vitrine du podcast des élèves, en français. Cinq pages statiques, sans
dépendance ni étape de build :

| Page | Fichier |
| --- | --- |
| Accueil | `index.html` |
| Nos épisodes | `episodes.html` |
| À propos | `about.html` |
| Proposer un sujet | `proposer.html` |
| Contact | `contact.html` |

## Mettre à jour les épisodes

Tout le contenu éditorial (épisodes, catégories, équipe) est dans
**`assets/js/data.js`**. Les pages se construisent à partir de ce fichier :
il suffit de l'éditer pour publier un nouvel épisode.

1. Déposez le fichier audio dans `assets/audio/` (mp3, m4a ou wav).
2. Ouvrez `assets/js/data.js` et copiez un bloc de la liste `episodes`.
3. Placez-le **en haut** de la liste (les épisodes s'affichent du plus récent
   au plus ancien), puis renseignez :
   - `id` : identifiant unique, ex. `ep-07` (sert aussi de lien direct) ;
   - `number` : numéro de l'épisode ;
   - `title`, `excerpt` (accroche courte), `description` (texte complet) ;
   - `date` : format `AAAA-MM-JJ` ;
   - `category` : un des identifiants de `categories`
     (`vie-scolaire`, `culture`, `sciences`, `interviews`, `opinions`) ;
   - `guest` : invité·e, ou « L'équipe du podcast » ;
   - `audio` : chemin du fichier, ex. `assets/audio/ep-07.mp3` ;
   - `featured` : `true` sur **un seul** épisode, celui affiché en une de
     l'accueil.
4. C'est tout : l'accueil, la page « Nos épisodes », les filtres, les
   compteurs et le lecteur se mettent à jour automatiquement.

Pour ajouter une catégorie, ajoutez une entrée dans `categories` et une
classe de couleur `tag--<id>` / `category-card--<id>` dans
`assets/css/styles.css`.

Les membres de l'équipe se modifient dans la liste `team` du même fichier
(photos dans `assets/img/team/`).

## Notes techniques

- **Aucune dépendance, aucun build.** HTML + CSS + modules ES natifs.
- Le rendu des épisodes et de l'équipe se fait côté navigateur à partir de
  `data.js` (les pages sont donc vides sans JavaScript ; un message le
  signale).
- Les pochettes d'épisode sont générées en SVG par `assets/js/site.js` :
  aucune image à produire, la couleur suit la catégorie.
- Le lecteur audio est personnalisé (lecture/pause, avance, durée réelle).
  Un seul épisode se joue à la fois.
- Les formulaires « Proposer un sujet » et « Contact » valident les champs
  côté navigateur, puis préparent un e-mail prérempli vers
  `contact@thestudentvoice.org` (bouton « Envoyer par e-mail »). Pour
  recevoir les réponses sans passer par la messagerie du visiteur, branchez
  un service de formulaire (Formspree, Tally, endpoint maison) dans
  `initForms()` de `assets/js/site.js`.
- Accessibilité : navigation clavier, lien d'évitement, contrastes, animations
  désactivées avec `prefers-reduced-motion`.

## Contenus de démonstration

- **Audio** : les fichiers `assets/audio/ep-*.mp3` sont des extraits de
  lectures du domaine public (LibriVox, enregistrements francophones). Ils
  servent de démonstration et doivent être remplacés par les vrais épisodes.
- **Photos** : images Unsplash (usage démonstratif), dans `assets/img/`.
- Les noms, textes et chiffres sont fictifs.

## Voir le site en local

Le site est servi par l'environnement de développement Base44 (serveur
statique sur le port 3000). Sans cet environnement, n'importe quel serveur
statique fait l'affaire, par exemple :

```sh
python3 -m http.server 3000 --directory site
```
