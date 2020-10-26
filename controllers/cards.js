const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => {
      throw new InternalServerError('An error has occured on the server');
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Data validation failed:  card cannot be created.');
      }
    })
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card && req.user._id.toString() === card.owner.toString()) {
        Card.deleteOne(card).then((deletedCard) => {
          res.send({ data: deletedCard });
        });
      } else if (!card) {
        throw new NotFoundError('Card not found.');
      } else {
        throw new UnauthorizedError('Authorization required.  You can only delete your own cards.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Card not found.');
      }
      next(err);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else if (!card) {
        throw new NotFoundError('Card not found.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.statusCode === 404) {
        throw new NotFoundError('Card not found.');
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else if (!card) {
        throw new NotFoundError('Card not found.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.statusCode === 404) {
        throw new NotFoundError('Card not found.');
      }
    })
    .catch(next);
};
