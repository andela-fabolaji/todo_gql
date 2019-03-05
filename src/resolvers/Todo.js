const createdBy = async(root, args, context) => {
  return await context.prisma.todo({ id: root.id }).createdBy();
}

module.exports = {
  createdBy
};