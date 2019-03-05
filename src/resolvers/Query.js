const allTodos = async (root, args, context) => {
  return await context.prisma.todos();
};

const getTodo = async(root, args, context) => {
  return await context.prisma.todo({ id: args.id });
}

module.exports = {
  allTodos,
  getTodo
};