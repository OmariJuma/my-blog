const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql"); // Added GraphQLNonNull import
const Author = require("../models/author"); // Import your Author model
const Article = require("../models/article"); // Import your Article model

const ArticleType = new GraphQLObjectType({
  name: "Article",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    category: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId); // Used findById instead of filter
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    secondName: { type: GraphQLString },
    email: { type: GraphQLString },
    userRole: { type: GraphQLString },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve(parent, args) {
        return Article.find({ authorId: parent.id }); // Used find instead of filter
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    article: {
      type: ArticleType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Article.findById(args.id); // Used findById instead of filter
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id); // Used findById instead of filter
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find(); // Used find instead of directly returning authors
      },
    },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve(parent, args) {
        return Article.find(); // Used find instead of directly returning articles
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        firstName: { type: GraphQLString },
        secondName: { type: GraphQLString },
        email: { type: GraphQLString },
        userRole: { type: GraphQLString },
      },
      resolve(parent, args) {
        const newAuthor = new Author({
          firstName: args.firstName,
          secondName: args.secondName,
          email: args.email,
          userRole: args.userRole,
        });
        return newAuthor.save();
      },
    },
    addArticle: {
      type: ArticleType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const newArticle = new Article({
          title: args.title,
          text: args.text,
          category: args.category,
          authorId: args.authorId,
        });
        return newArticle.save();
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
