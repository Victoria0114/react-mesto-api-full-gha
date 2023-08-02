// Создание экземпляра роутера Express
const router = require('express').Router();

// Импорт модуля celebrate для валидации запросов
const { celebrate, Joi } = require('celebrate');

// Импорт регулярного выражения для проверки URL
const { URL_REGEX } = require('../utils/constants');

// Импорт контроллеров для обработки запросов к карточкам
const {
  getInitialCards,
  addNewCard,
  addLike,
  removeLike,
  deleteCard,
} = require('../controllers/cards');

// Маршрут для создания новой карточки
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .pattern(URL_REGEX),
  }),
}), addNewCard);

// Маршрут для получения списка начальных карточек
router.get('/', getInitialCards);

// Маршрут для удаления карточки
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

// Маршрут для добавления лайка к карточке
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), addLike);

// Маршрут для удаления лайка с карточки
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), removeLike);

// Экспорт роутера для использования в других модулях
module.exports = router;
