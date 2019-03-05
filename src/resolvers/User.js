const todos = async (root, args, context) => {
  return await context.prisma.user({ email: root.email }).todos();
};

module.exports = {
  todos
};