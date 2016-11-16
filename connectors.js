const db = require('mysql-promise')();
const qb = require('queryize');

const {
  videoTransformer,
  userTransformer,
  gameTransformer,
  testTransformer,
  reviewTransformer,
  newsTransformer,
  commentTransformer,
  surveyTransformer,
  guestbookTransformer,
} = require('./transformers');

db.configure({
    host: process.env.MYSQL_HOST || 'localhost',
    database: process.env.MYSQL_DB || 'ja_backup',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || null,
});

const withFirst = (qb) => ({ first }) => {
  if (first) {
    return qb.limit(first);
  }
  return qb;
};

const withLast = (qb) => ({ last }) => {
  if (last) {
    return qb.orderBy('id DESC').limit(last);
  }
  return qb;
};

const withBefore = (qb) => ({ before }) => {
  if (before) {
    return qb.whereInRange('id', null, before);
  }
  return qb;
};

const withAfter = (qb) => ({ after }) => {
  if (after) {
    return qb.whereInRange('id', after);
  }
  return qb;
};

const withIds = (qb) => ({ ids }) => {
  if (Array.isArray(ids)) {
    return ids.length > 0 ? qb.where({id: ids}) : qb.where('id = -1');
  }
  return qb;
};

const withVideoType = (qb) => ({ type }) => {
  if (type === 'TEST') {
    return qb.where('type', 'video_test');
  } else if (type === 'AJVA') {
    return qb.where('type', 'ajva');
  }
  return qb;
}

const compose = (...functions) => (qb) => (filters) => {
  return functions.reduce((result, fn) => fn(result)(filters), qb);
};

const withFilters = compose(
  withFirst,
  withLast,
  withBefore,
  withAfter
);

const withFiltersAndId = compose(
  withFilters,
  withIds
);

const withFiltersIdAndVideoType = compose(
  withFiltersAndId,
  withVideoType
);

const TypeConnector = {
  findAll({ ids }) {
    return [
      'ACTION',
      'SKILL',
      'ARCADE',
      'OTHERS',
      'ADVENTURE',
      'BEAT_EM_UP',
      'WALLBREAKERS',
      'COACHING',
      'FIGHTING',
      'COMPILATION',
      'RACING',
      'EXPLORATION',
      'FLIPPER',
      'FPS',
      'MANAGEMENT',
      'INFILTRATION',
      'CARDS',
      'RPG',
      'BOARD_GAME',
      'EDUCATIONAL',
      'MMO',
      'PARTY_GAME',
      'PLATFORMS',
      'POINT_AND_CLICK',
      'BRAIN_TEASER',
      'PUZZLE_GAME',
      'RYTHM',
      'SHOOT_EM_UP',
      'SIMULATION',
      'SPORT',
      'STRATEGY',
      'SURVIVAL_HORROR',
      'TACTICAL',
      'SHOOTING',
      'WARGAME',
    ].filter((value, index) => ids && ids.indexOf(index) !== -1);
  },
};

function createConnector(table, transformer, withFilters) {
  const applyFilters = withFilters || (qb => filters => qb);
  return {
    findAll(filters) {
      const query = applyFilters(qb.select().from(table))(filters || {});
      return db.query(query.toString())
               .then(([rows]) => rows.map(transformer));
    },
    
    findOne({ id }) {
      return db.query(qb.select().from(table).where('id', id).toString())
               .then(([[row]]) => transformer(row));
    },
  };
}

const connectors = {
  Type: TypeConnector,
  Video: createConnector('videos', videoTransformer, withFiltersIdAndVideoType),
  User: createConnector('membres', userTransformer, withFilters),
  Game: createConnector('jeux', gameTransformer, withFiltersAndId),
  Test: Object.assign({}, createConnector('tests', testTransformer, withFilters), {
    findOneFromGame(id) {
      return db.query('SELECT * from tests WHERE ID_jeu = ?', [id])
               .then(([[test]]) => testTransformer(test));
    },
  }),
  Review: Object.assign({}, createConnector('apercus', reviewTransformer, withFilters), {
    findOneFromGame(id) {
      return db.query('SELECT * from apercus WHERE ID_jeu = ?', [id])
               .then(([[review]]) => reviewTransformer(review));
    },
  }),
  News: createConnector('news', newsTransformer, withFilters),
  Comment: Object.assign({}, createConnector('commentaires', commentTransformer), {
    findAllFromNews(id) {
      return db.query('SELECT * from commentaires WHERE ID_sujet = ?', [id])
               .then(([rows]) => rows.map(commentTransformer));
    },
  }),
  Survey: createConnector('sondages', surveyTransformer),
  Guestbook: createConnector('livre_or', guestbookTransformer),
};

module.exports = connectors;