const Mutation = require('./Mutation');
const Query = require('./Query');
const Subscription = require('./Subscription');
const User = require('./User');
const Todo = require('./Todo');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Todo
};

module.exports = resolvers;