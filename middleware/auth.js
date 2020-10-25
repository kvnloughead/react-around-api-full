/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Authorization Required' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Authorization Required' });
  }
  req.user = payload;

  User.findOne(req.email)
    .then((user) => {
      req.user._id = user._id;
    })
    .then(() => next());
};
