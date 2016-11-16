const videoTransformer = video => (video && {
  id: video.ID,
  title: video.titre,
  type: video.type === 'video_test' ? 'TEST' : 'AJVA',
  embedUrl: video.lien_flash,
  url: video.lien_daily,
  description: video.description,
  author: video.auteur,
});

const userTransformer = user => (user && {
  id: user.ID,
  username: user.pseudo,
  password: user.mot_de_passe,
  email: user.infos_privees !== 'oui' ? user.mail : null,
  identifier: user.identifier,
  isAdmin: user.statut === 'Administrateur',
  isCorrector: user.statut === 'Administrateur' || user.statut === 'Correcteur',
  isPrivate: user.infos_privees === 'oui',
  hasAvatar: user.avatar === 'oui',
  birthdate: user.infos_privees !== 'oui' ? (
    user.date_de_naissance ? new Date(user.date_de_naissance * 1000) : null
  ) : null,
  signature: user.signature !== 'Aucune signature pour le moment' ? user.signature : null,
  newsletter: user.recevoir_newsletter === 'oui',
  gender: user.sexe === 'masculin' && 'MALE' || user.sexe === 'feminin' && 'FEMALE' || 'UNKNOWN',
  createdAt: user.date_inscription,
});

const gameTransformer = game => (game && {
  id: game.ID,
  name: game.nom,
  hasLogo: game.logo === 'oui',
  types: game.type && game.type.split('--').map(id => parseInt(id)) || [],
  description: game.descriptif,
  infos: game.infos,
  download: game.telechargement === "" ? game.telechargement : null,
  platform: game.support,
  releaseAt: game.date_sortie,
  videos: game.videos !== 'non' ? game.videos.split('--').map(id => parseInt(id)) : [],
});

const testTransformer = test => (test && {
  id: test.ID,
  game: test.ID_jeu,
  isDraft: test.statut !== 'online',
  author: test.auteur,
  introduction: test.intro,
  body: test.developpement,
  conclusion: test.conclu,
  graphism: {
    grade: test.note_graph,
    description: test.desc_graph,
  },
  gameplay: {
    grade: test.note_gameplay,
    description: test.desc_gameplay,
  },
  lifetime: {
    grade: test.note_vie,
    description: test.desc_vie,
  },
  audio: {
    grade: test.note_son,
    description: test.desc_son,
  },
  story: {
    grade: test.note_scenario,
    description: test.desc_scenario,
  },
  grade: test.note_finale,
  createdAt: test.date,
});

const reviewTransformer = review => (review && {
  id: review.ID,
  game: review.ID_jeu,
  isDraft: review.statut !== 'online',
  author: review.auteur,
  introduction: review.intro,
  body: review.developpement,
  conclusion: review.conclu,
  grade: review.appreciation,
  createdAt: review.date,
});

const newsTransformer = news => (news && {
  id: news.ID,
  title: news.titre,
  hasCover: news.img === 'oui',
  body: news.contenu,
  linkedGames: news.jeux_associes ? news.jeux_associes.split('--').map(id => parseInt(id)) : [],
  category: news.categorie,
  author: news.auteur,
  createdAt: news.date,
});

const commentTransformer = comment => (comment && {
  id: comment.ID,
  author: comment.ID_membre,
  threadType: comment.sujet,
  thread: comment.ID_sujet,
  body: comment.message,
  hasSignature: comment.signature,
  createdAt: comment.date,
});

const surveyTransformer = survey => (survey && {
  id: survey.ID,
  question: survey.question,
  answers: survey.propositions.split('--'),
  results: survey.resultats.split('--'),
  hasMultipleChoices: survey.choix_multiples === 'oui',
  author: survey.auteur,
  startAt: survey.date_de_post,
  endAt: survey.date_de_fin,
});

const guestbookTransformer = entry => (entry && {
  id: entry.ID,
  author: entry.auteur,
  body: entry.contenu,
  createdAt: new Date(entry.date * 1000),
});

const transformers = {
  videoTransformer,
  userTransformer,
  gameTransformer,
  testTransformer,
  reviewTransformer,
  newsTransformer,
  commentTransformer,
  surveyTransformer,
  guestbookTransformer,
};

module.exports = transformers;