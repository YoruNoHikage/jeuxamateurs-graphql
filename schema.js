const { buildSchema, GraphQLEnumType } = require('graphql');
const graphqlHTTP = require('express-graphql');
const { addResolveFunctionsToSchema } = require('graphql-tools');

const {
  Type,
  Video,
  User,
  Game,
  Test,
  Review,
  News,
  Comment,
  Survey,
  Guestbook,
} = require('./connectors');

const schema = buildSchema(`
  # A game can have multiple types.
  enum Type {
    ACTION
    SKILL
    ARCADE
    OTHERS
    ADVENTURE
    BEAT_EM_UP
    WALLBREAKERS
    COACHING
    FIGHTING
    COMPILATION
    RACING
    EXPLORATION
    FLIPPER
    FPS
    MANAGEMENT
    INFILTRATION
    CARDS
    RPG
    BOARD_GAME
    EDUCATIONAL
    MMO
    PARTY_GAME
    PLATFORMS
    POINT_AND_CLICK
    BRAIN_TEASER
    PUZZLE_GAME
    RYTHM
    SHOOT_EM_UP
    SIMULATION
    SPORT
    STRATEGY
    SURVIVAL_HORROR
    TACTICAL
    SHOOTING
    WARGAME
  }
  
  # A video is either a AJVA (news video) or a TEST (test video).
  enum VideoType {
    AJVA
    TEST
  }
  
  # Tests and news video
  type Video {
    # The video's id.
    id: ID!
    # The video's title.
    title: String!
    # The video's type.
    type: VideoType!
    # The video's embedUrl. Link to the flash or video you can directly embed.
    embedUrl: String!
    # The video's url. Direct link to the webpage showing the video.
    url: String!
    # The video's description.
    description: String
    # The video's author in the video hosting website.
    author: String!
  }
  
  # User's genders available.
  enum Gender {
    MALE
    FEMALE
    UNKNOWN
  }
  
  # Website's member
  type User {
    # The user's id.
    id: ID!
    # The user's username.
    username: String!
    # The user's email. \`null\` if \`isPrivate\` is \`true\`.
    email: String
    # Wether the user is admin or not.
    isAdmin: Boolean!
    # Wether the user is a corrector or not. \`true\` if the user is admin.
    isCorrector: Boolean!
    # Wether the user has authorized private informations to be displayed. If \`true\`, the email and the birthdate are set to \`null\`.
    isPrivate: Boolean!
    # Wether the user has an avatar or not. Files are not available for now.
    hasAvatar: Boolean!
    # The user's birthdate. \`null\` if \`isPrivate\` is \`true\`.
    birthdate: String
    # The user's signature. Used to be displayed under user's comments.
    signature: String
    # Wether the users is receiving the newsletter or not.
    newsletter: Boolean!
    # The user's gender.
    gender: Gender!
    # The user's creation date.
    createdAt: String!
  }
  
  # Amateur game and some info about it
  type Game {
    # The game's id.
    id: ID!
    # The game's name.
    name: String!
    # Wether the game has a logo or not. Files are not available for now.
    hasLogo: Boolean!
    # The game's types.
    types: [Type]!
    # The game's description.
    description: String
    # The game's informations. For now, it uses an old syntax that looks like: &lt;gras&gt;Information name : &lt;/gras&gt; Information
    infos: String
    # The game's download link.
    download: String
    # The game's platform where it runs. Generally separated with slashes.
    platform: String
    # The game's release date. Could be in the future (in the past, you see what I mean? Because it's an old database...).
    releaseAt: String
    # The game's videos.
    videos: [Video]!
    # The game's review from the team.
    review: Review
    # The game's test from the team.
    test: Test
  }
  
  # Grade and an explanation why we chose it
  type Rating {
    # Rating's grade from 0 to 20.
    grade: Int!
    # The grade's explanation.
    description: String!
  }
  
  # A complete review with rating for every criteria
  type Test {
    # The test's id.
    id: ID!
    # Wether the test is published or not.
    isDraft: Boolean!
    # The test's introduction. It uses an XML syntax to enhance the article.
    introduction: String!
    # The test's body. It uses an XML syntax to enhance the article.
    body: String!
    # The test's conclusion. It uses an XML syntax to enhance the article.
    conclusion: String!
    # The test's author.
    author: User!
    # The game that has been tested.
    game: Game!
    # Rating for graphism.
    graphism: Rating!
    # Rating for gameplay.
    gameplay: Rating!
    # Rating for the lifetime of the game.
    lifetime: Rating!
    # Rating for the audio.
    audio: Rating!
    # Rating for the story.
    story: Rating!
    # Game's grade from 0 to 20.
    grade: Int!
    # The test's creation date.
    createdAt: String!
  }
  
  # A review is a small test made before the game's release
  type Review {
    # The review's id.
    id: ID!
    # Wether the test is published or not.
    isDraft: Boolean!
    # The test's introduction. It uses an XML syntax to enhance the article.
    introduction: String!
    # The test's body. It uses an XML syntax to enhance the article.
    body: String!
    # The test's conclusion. It uses an XML syntax to enhance the article.
    conclusion: String!
    # The test's author.
    author: User!
    # The game that has been reviewed.
    game: Game!
    # Game's grade from 0 to 10.
    grade: Int!
    # The review's creation date.
    createdAt: String!
  }
  
  # Article about amateur video games and related
  type News {
    # The news' id.
    id: ID!
    # The news' title.
    title: String!
    # Wether the news has a cover image or not. Files are not available for now.
    hasCover: Boolean!
    # The news' body. It uses an XML syntax to enhance the article.
    body: String
    # The games related to the news' content.
    linkedGames: [Game]!
    # The news' category.
    category: String
    # The news' author.
    author: User!
    # The news' comments.
    comments: [Comment]!
    # The news' creation date.
    createdAt: String!
  }
  
  # News comment
  type Comment {
    # The comment's id.
    id: ID!
    # The comment's author.
    author: User!
    # The thread's type. The value is always \`news\` since comment module wasn't used anywhere else.
    threadType: String
    # Should be a meta type, but at that time, we only had news
    thread: News!
    # The comment's body. It uses an XML syntax to enhance the article.
    body: String!
    # Wether the user wants to display its signature on the comment or not.
    hasSignature: Boolean!
    # The comment's creation date.
    createdAt: String!
  }
  
  # Weekly (or longer) surveys about the website and what users wanted
  type Survey {
    # The survey's id.
    id: ID!
    # The survey's question.
    question: String!
    # The survey's available answers.
    answers: [String!]!
    # The survey's results.
    results: [Int!]!
    # Wether a visitor can choose multiple answers or not.
    hasMultipleChoices: Boolean!
    # The survey's author.
    author: User!
    # The survey's starting date and time.
    startAt: String!
    # The survey's ending date and time.
    endAt: String!
  }
  
  # Nice words people left about the website
  type GuestbookEntry {
    # The entry's id.
    id: ID!
    # The entry's author. Unrelated to users.
    author: String!
    # The entry's body.
    body: String!
    # The entry's creation date.
    createdAt: String!
  }
  
  type RootQuery {
    # List and filter all of JeuxAmateurs' tests and news (AJVA) videos
    videos(first: Int, last: Int, before: ID, after: ID, type: VideoType): [Video]!
    # Retrieve a video from a given id
    video(id: ID!): Video
    
    # List and filter all of JeuxAmateurs' members
    users(first: Int, last: Int, before: ID, after: ID): [User]!
    # Retrieve a user from a given id
    user(id: ID!): User
    
    # List and filter all of JeuxAmateurs' games
    games(first: Int, last: Int, before: ID, after: ID): [Game]!
    # Retrieve a game from a given id
    game(id: ID!): Game
    
    # List and filter all of JeuxAmateurs' game tests
    tests(first: Int, last: Int, before: ID, after: ID): [Test]!
    # Retrieve a test from a given id
    test(id: ID!): Test
    
    # List and filter all of JeuxAmateurs' game reviews
    reviews(first: Int, last: Int, before: ID, after: ID): [Review]!
    # Retrieve a review from a given id
    review(id: ID!): Review
    
    # List and filter all of JeuxAmateurs' news
    news(first: Int, last: Int, before: ID, after: ID): [News]!
    # Retrieve a news from a given id
    singleNews(id: ID!): News
    
    # List all of JeuxAmateurs' surveys
    surveys: [Survey]!
    # Retrieve a survey from a given id
    survey(id: ID!): Survey
    
    # List all of JeuxAmateurs guestbook
    guestbook: [GuestbookEntry]!
  }
  
  schema {
    query: RootQuery
  }
`);

const resolverMap = {
  Game: {
    types: game => Type.findAll({ ids: game.types }),
    videos: game => Video.findAll({ ids: game.videos }),
    test: ({ id }) => Test.findOneFromGame(id),
    review: ({ id }) => Review.findOneFromGame(id),
  },
  Test: {
    game: test => Game.findOne({ id: test.game }),
    author: test => User.findOne({ id: test.author }),
  },
  Review: {
    game: review => Game.findOne({ id: review.game }),
    author: review => User.findOne({ id: review.author }),
  },
  News: {
    linkedGames: news => Game.findAll({ids: news.linkedGames}),
    author: news => User.findOne({ id: news.author }),
    comments: news => Comment.findAllFromNews(news.id),
  },
  Comment: {
    author: comment => User.findOne({ id: comment.author }),
    thread: comment => News.findOne({ id: comment.thread }),
  },
  Survey: {
    author: survey => User.findOne({ id: survey.author }),
  },
  RootQuery: {
    videos: (_, filters) => Video.findAll(filters),
    video: (_, { id }) => Video.findOne({ id }),
    users: () => User.findAll(),
    user: (_, { id }) => User.findOne({ id }),
    games: (_, filters) => Game.findAll(filters),
    game: (_, { id }) => Game.findOne({ id }),
    tests: (_, filters) => Test.findAll(filters),
    test: (_, { id }) => Test.findOne({ id }),
    reviews: (_, filters) => Review.findAll(filters),
    review: (_, { id }) => Review.findOne({ id }),
    news: (_, filters) => News.findAll(filters),
    singleNews: (_, { id }) => News.findOne({ id }),
    surveys: () => Survey.findAll(),
    survey: (_, { id }) => Survey.findOne({ id }),
    guestbook: () => Guestbook.findAll(),
  },
};

addResolveFunctionsToSchema(schema, resolverMap);

module.exports = (app) => {
  app.use('/',
    graphqlHTTP({
      schema,
      resolverMap,
      graphiql: true,
    })
  );
};