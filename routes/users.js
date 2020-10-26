const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(8),
  }).unknown(true),
}), getUsers);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(8),
  }).unknown(true),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(8),
  }).unknown(true),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri({ scheme: ['http', 'https'] }),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(8),
  }).unknown(true),
}), updateAvatar);

module.exports = router;
