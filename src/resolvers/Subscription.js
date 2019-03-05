const todoSubscription = {
  subscribe: async (root, args, context) => {
    return await context.prisma.$subscribe.todo({
      mutation_in: ['CREATED', 'UPDATED', 'DELETED']
    }).node();
  },
  resolve: payload => payload
};

module.exports = {
  todoSubscription
};