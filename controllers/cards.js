const Card = require('../models/card');

const errorCodes = {
  ValidationError: 400,
  CastError: 404,
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
    likes: [],
  })
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
  Card.findByIdAndRemove(req.params.cardId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const statusCode = errorCodes[err.name] || 500;
      res.status(statusCode).send({ message: 'Error', [err.name]: err });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const statusCode = errorCodes[err.name] || 500;
      res.status(statusCode).send({ message: 'Error', [err.name]: err });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const statusCode = errorCodes[err.name] || 500;
      res.status(statusCode).send({ message: 'Error', [err.name]: err });
    });
};
