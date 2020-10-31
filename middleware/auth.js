/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const UnauthorizedError = require('../errors/UnauthorizedError');
const User = require('../models/user');

dotenv.config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authorization Required');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError('Authorization Required');
  }
  debugger;
  req.user = payload;

  User.findOne(req.email)
    .select('+password')
    .then((user) => {
      debugger;
      req.user._id = user._id;
    })
    .then(() => next())
    .catch(next);
  next();
};
