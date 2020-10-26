const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createCard,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(8),
  }).unknown(true),
}), getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri({ scheme: ['http', 'https'] }),
    likes: Joi.array().items(Joi.string()),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(8),
  }).unknown(true),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(8),
  }).unknown(true),
}), deleteCardById);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(8),
  }).unknown(true),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(8),
  }).unknown(true),
}), dislikeCard);

module.exports = router;
