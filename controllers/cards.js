const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    // .populate('owner')`
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Error', error: err }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    // .populate('owner')
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Error', error: err }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Error', error: err }));
};
