const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createCard,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri({ scheme: ['http', 'https'] }),
    likes: Joi.array().items(Joi.string()),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum(),
  }),
}), deleteCardById);

router.put('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum(),
  }),
}), likeCard);

router.delete('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum(),
  }),
}), dislikeCard);

module.exports = router;
