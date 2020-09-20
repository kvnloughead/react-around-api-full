const User = require('../models/user');

const errorCodes = {
  ValidationError: 400,
  CastError: 404,
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const statusCode = errorCodes[err.name] || 500;
      res.status(statusCode).send({ message: 'Error', [err.name]: err });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const statusCode = errorCodes[err.name] || 500;
      res.status(statusCode).send({ message: 'Error', [err.name]: err });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const statusCode = errorCodes[err.name] || 500;
      res.status(statusCode).send({ message: 'Error', [err.name]: err });
    });
};
