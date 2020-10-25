const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send({ data: card })})
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Data validation failed:  card cannot be created' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'Card not found.' });
      } else {
        res.status(500).send({ message: 'Internal server error' });
      }
    });
};

module.exports.createCard = (req, res) => {
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
        res.status(400).send({ message: 'Data validation failed:  card cannot be created.' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'Card not found.' });
      } else {
        res.status(500).send({ message: 'Internal server error' });
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card && req.user._id.toString() === card.owner.toString()) {
        Card.deleteOne(card).then((deletedCard) => {
          res.send({ data: deletedCard });
        });
      } else if (!card) {
        res.status(404).send({ message: 'Card not found.' });
      } else {
        res.status(401).send({ message: 'Authorization required.  You can only delete your own cards.'});
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Data validation failed:  card cannot be created.' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'Card not found.' });
      } else {
        res.status(500).send({ message: 'Internal server error' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'Card not found.' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Data validation failed:  card cannot be created.Card not found' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'Card not found.' });
      } else {
        res.status(500).send({ message: 'Internal server error' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'Card not found.' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Data validation failed:  card cannot be created.' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'Card not found.' });
      } else {
        res.status(500).send({ message: 'Internal server error' });
      }
    });
};
