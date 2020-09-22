const Card = require('../models/card');

const errorCodes = {
  ValidationError: 400,
  CastError: 404,
};

const handleErrors = (err, res) => {
  console.log({ [err.name]: err });
  const statusCode = errorCodes[err.name] || 500;
  res.status(statusCode).send({ message: 'Error' });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      handleErrors(err, res);
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      handleErrors(err, res);
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      handleErrors(err, res);
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
      handleErrors(err, res);
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
      handleErrors(err, res);
    });
};
