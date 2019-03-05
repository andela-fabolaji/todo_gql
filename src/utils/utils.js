require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = process.env.APP_SECRET;

const getUserId = (context) => {
  const token = context.request.get('Authorization').replace('Bearer ', '').trim();
  const decoded = jwt.verify(token, secret);
  if (!decoded) throw new Error('Not Authenticated');

  return decoded.id;
}

const signToken = (userId) => {
  const p = { id: userId };
  return jwt.sign(p, secret, { expiresIn: '24h' });
};

const hashPassword = (payload) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(payload, salt);
};

const comparePasswords = (str, hash) => {
  return bcrypt.compareSync(str, hash);
};

module.exports = {
  signToken,
  hashPassword,
  comparePasswords,
  getUserId
};
