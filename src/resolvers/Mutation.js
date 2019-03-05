const { signToken, getUserId, hashPassword, comparePasswords } = require ('../utils/utils');

const signup = async (root, args, context) => {
  const password = hashPassword(args.data.password);
  const user = await context.prisma.createUser({ ...args.data, password });
  const token = signToken(user.id);

  return {
    user,
    token
  };
};

const login = async (root, args, context) => {
  const { data: { email, password } } = args;
  const user = await context.prisma.user({ email: email });
  if (!user) throw new Error('User not found');

  const isPasswordValid = comparePasswords(password, user.password);
  if (!isPasswordValid) throw new Error('Incorrect password!');

  const token = signToken(user.id);

  return {
    user,
    token
  };
};

const updateUser = async (root, args, context) => {
  const { id, data } = args;

  // verify authorization
  const userId = getUserId(context);
  if (userId !== id) throw new Error('You are not authorized to perform this operation');

  let hash;
  if (data.password) hash = hashPassword(data.password);
  
  const updatedUser = await context.prisma.updateUser({
    data: { ...data, password: hash },
    where: { id }
  });
  if (!updatedUser) throw new Error('Unable to update user data');
  
  return updatedUser;
};

const createTodo = async (root, args, context) => {
  const { data } = args;
  const userId = getUserId(context);
  const todo = await context.prisma.createTodo({
    ...data,
    createdBy: {
      connect: { id: userId }
    }
  });
  return todo;
};

const updateTodo = async (root, args, context) => {
  const { id, data } = args;
  const userId = getUserId(context);
  
  const user = await context.prisma.todo({ id }).createdBy();
  if (userId !== user.id) throw new Error('You are not authorized to perform this operation');
  
  const updatedTodo = context.prisma.updateTodo({
    data,
    where: {
      AND: [
        { id: todoId },
        { createdBy: userId }
      ]
    }
  });

  return updatedTodo;
};

const deleteTodo = async(root, args, context) => {};

module.exports = {
  signup,
  login,
  updateUser,
  createTodo,
  updateTodo,
  deleteTodo
};