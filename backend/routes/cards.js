const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  doesCardExist,
  isCardOwner,
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { urlRegex } = require('../utils/constants');

router.get('/', getAllCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlRegex),
  }),
}), createCard);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), doesCardExist);
router.delete('/:cardId', isCardOwner);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), doesCardExist);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), doesCardExist);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
