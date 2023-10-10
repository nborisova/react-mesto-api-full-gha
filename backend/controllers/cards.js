const Card = require('../models/cards');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const InternalServerError = require('../errors/internal-server-err');
const Forbidden = require('../errors/forbidden');

const CREATED = 201;

module.exports.doesCardExist = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Такой карточки нет'));
      } else {
        next();
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректно задан id карточки'));
      } else {
        next(new InternalServerError('На сервере произошла ошибка'));
      }
    });
};

module.exports.isCardOwner = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findById(cardId)
    .then((card) => {
      if (card.owner.toString() !== _id) {
        next(new Forbidden('Недостаточно прав'));
      } else {
        next();
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректно задан id карточки'));
      } else {
        next(new InternalServerError('На сервере произошла ошибка'));
      }
    });
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate('owner likes')
    .then((cards) => res.send(cards))
    .catch(() => next(new InternalServerError('На сервере произошла ошибка')));
};

module.exports.createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => {
      card.populate('owner')
        .then((populatedCard) => res.status(CREATED).send(populatedCard))
        .catch(() => next(new InternalServerError('На сервере произошла ошибка')));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(new InternalServerError('На сервере произошла ошибка'));
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then(() => res.send({ message: 'Пост удалён' }))
    .catch(() => next(new InternalServerError('На сервере произошла ошибка')));
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .populate('owner likes')
    .then((card) => res.send(card))
    .catch(() => next(new InternalServerError('На сервере произошла ошибка')));
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .populate('owner likes')
    .then((card) => res.send(card))
    .catch(() => next(new InternalServerError('На сервере произошла ошибка')));
};
