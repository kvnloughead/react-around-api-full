const Card = require('../models/card');

const errorCodes = {
  ValidationError: 400,
  CastError: 404,
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      const statusCode = errorCodes[err.name] || 500;
      res.status(statusCode).send({ message: 'Error', [err.name]: err });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      const statusCode = errorCodes[err.name] || 500;
      res.status(statusCode).send({ message: 'Error', [err.name]: err });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const statusCode = errorCodes[err.name] || 500;
      res.status(statusCode).send({ message: 'Error', [err.name]: err });
    });
};
