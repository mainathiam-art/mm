/* ==========================================================================
   The Student Voice — données du site
   --------------------------------------------------------------------------
   TOUT LE CONTENU ÉDITORIAL EST ICI.

   POUR AJOUTER UN ÉPISODE :
   1. Déposez le fichier audio dans  assets/audio/  (mp3, m4a ou wav)
   2. Copiez un bloc de la liste ci-dessous et placez-le EN HAUT de la liste
      (les épisodes sont affichés du plus récent au plus ancien)
   3. Renseignez le titre, la description, la date, la catégorie et l'invité
   4. Mettez "featured: true" sur l'épisode à afficher en une de l'accueil
      (un seul épisode à la fois)

   Aucune autre page n'a besoin d'être modifiée : l'accueil, la page
   "Nos épisodes", les filtres et les compteurs se mettent à jour tout seuls.
   ========================================================================== */

export const site = {
  name: "The Student Voice",
  tagline: "Le podcast des élèves",
  season: "Saison 1",
  email: "contact@thestudentvoice.org",
  instagram: "@thestudentvoice.podcast",
  tiktok: "@thestudentvoice",
};

/* Les cinq familles de sujets. L'identifiant sert de filtre dans les URL
   (ex. episodes.html?categorie=culture). */
export const categories = [
  {
    id: "vie-scolaire",
    label: "Vie scolaire",
    icon: "school",
    blurb: "Cours, cantine, révisions, ambiance de classe",
  },
  {
    id: "culture",
    label: "Culture",
    icon: "palette",
    blurb: "Théâtre, musique, cinéma, lectures",
  },
  {
    id: "sciences",
    label: "Sciences",
    icon: "flask",
    blurb: "Climat, technologie, santé, découvertes",
  },
  {
    id: "interviews",
    label: "Interviews",
    icon: "mic",
    blurb: "Celles et ceux qui font vivre le lycée",
  },
  {
    id: "opinions",
    label: "Opinions",
    icon: "chat",
    blurb: "Nos avis, nos débats, nos idées",
  },
];

/* --------------------------------------------------------------------------
   LES ÉPISODES — du plus récent au plus ancien
   -------------------------------------------------------------------------- */
export const episodes = [
  {
    id: "ep-06",
    number: 6,
    title: "Le téléphone au lycée : outil ou tentation ?",
    excerpt:
      "Entre l'outil de travail et la machine à distractions, où se situe vraiment le téléphone dans nos journées de cours ?",
    description:
      "On a interrogé des élèves, une CPE et un professeur de mathématiques pour comprendre ce que change vraiment le portable en classe. Entre règles claires, usages détournés et vraies difficultés, la discussion part vite dans tous les sens — et c'est tant mieux.",
    date: "2026-11-18",
    category: "vie-scolaire",
    guest: "Mme Fall, CPE",
    audio: "assets/audio/ep-06.mp3",
    duration: 95,
    featured: true,
  },
  {
    id: "ep-05",
    number: 5,
    title: "Génération climat : agir à notre échelle",
    excerpt:
      "Tri, potager, mobilité douce : ce que change vraiment le club environnement du lycée.",
    description:
      "Le club Green nous a ouvert ses portes une matinée entière. On parle du potager derrière le gymnase, des ateliers zéro déchet et de la difficulté à faire bouger les habitudes. Un épisode plein d'idées concrètes à copier chez vous.",
    date: "2026-11-04",
    category: "sciences",
    guest: "Le club Green du lycée",
    audio: "assets/audio/ep-05.mp3",
    duration: 90,
    featured: false,
  },
  {
    id: "ep-04",
    number: 4,
    title: "Dans les coulisses du club théâtre",
    excerpt:
      "Trois semaines avant la première, on a suivi les répétitions de la troupe Les Planches.",
    description:
      "Textes appris dans le couloir, trac avant d'entrer en scène, fous rires en coulisses : la troupe Les Planches nous a laissé enregistrer ses répétitions. Un épisode sur la passion, la confiance et le travail collectif.",
    date: "2026-10-21",
    category: "culture",
    guest: "La troupe Les Planches",
    audio: "assets/audio/ep-04.mp3",
    duration: 100,
    featured: false,
  },
  {
    id: "ep-03",
    number: 3,
    title: "Portrait : notre prof de SVT a été chercheuse",
    excerpt:
      "Elle a passé six ans en laboratoire avant de choisir la salle de classe.",
    description:
      "Mme Ndiaye nous raconte ses années de recherche, le moment où elle a changé de voie et ce qu'elle essaie de transmettre à ses élèves. Une conversation franche sur les choix d'orientation et les chemins qui ne sont jamais tout tracés.",
    date: "2026-10-07",
    category: "interviews",
    guest: "Mme Ndiaye, professeure de SVT",
    audio: "assets/audio/ep-03.mp3",
    duration: 95,
    featured: false,
  },
  {
    id: "ep-02",
    number: 2,
    title: "Les notes, ça veut dire quoi ?",
    excerpt:
      "Une note, c'est un chiffre. Mais qu'est-ce qu'on met vraiment derrière ?",
    description:
      "On a tendu le micro dans la cour et demandé à des élèves de seconde ce que leurs notes représentent pour eux. Stress, motivation, sentiment d'injustice, fierté : les réponses sont loin d'être toutes faites.",
    date: "2026-09-23",
    category: "opinions",
    guest: "Des élèves de seconde",
    audio: "assets/audio/ep-02.mp3",
    duration: 90,
    featured: false,
  },
  {
    id: "ep-01",
    number: 1,
    title: "Bienvenue dans The Student Voice",
    excerpt:
      "Le premier épisode : qui on est, pourquoi on lance ce podcast et ce qui vous attend.",
    description:
      "Pour ce tout premier épisode, l'équipe se présente et raconte la naissance du projet : une idée née à la sortie des cours, un micro prêté par le CDI et beaucoup de café. On vous explique aussi comment proposer vos sujets.",
    date: "2026-09-09",
    category: "vie-scolaire",
    guest: "L'équipe du podcast",
    audio: "assets/audio/ep-01.mp3",
    duration: 85,
    featured: false,
  },
];

/* --------------------------------------------------------------------------
   L'ÉQUIPE — affichée sur la page À propos
   -------------------------------------------------------------------------- */
export const team = [
  {
    name: "Aminata Diop",
    role: "Animatrice & co-fondatrice",
    photo: "assets/img/team/aminata.jpg",
    bio: "Voix principale du podcast, elle prépare les interviews et n'a jamais peur de poser la question qui dérange.",
  },
  {
    name: "Moussa Ndiaye",
    role: "Montage & réalisation",
    photo: "assets/img/team/moussa.jpg",
    bio: "C'est lui qui transforme trois heures d'enregistrement en vingt minutes nettes. Toujours un casque sur les oreilles.",
  },
  {
    name: "Léa Moreau",
    role: "Rédaction & interviews",
    photo: "assets/img/team/lea.jpg",
    bio: "Elle écrit les conducteurs d'émission et déniche les invités les plus inattendus du lycée.",
  },
  {
    name: "Youssef Benali",
    role: "Son & technique",
    photo: "assets/img/team/youssef.jpg",
    bio: "Micros, câbles, niveaux : il veille sur le studio mobile et sauve les épisodes enregistrés en pleine cour.",
  },
  {
    name: "Fatou Sarr",
    role: "Réseaux & visuels",
    photo: "assets/img/team/fatou.jpg",
    bio: "Elle imagine les visuels, les extraits et les stories qui donnent envie d'appuyer sur lecture.",
  },
  {
    name: "Noah Petit",
    role: "Programmation musicale",
    photo: "assets/img/team/noah.jpg",
    bio: "Il choisit les musiques de transition et défend bec et ongles sa playlist de fin d'épisode.",
  },
];
