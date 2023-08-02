// Создание экземпляра роутера Express
const router = require('express').Router();

// Импорт модуля celebrate для валидации запросов

const { celebrate, Joi } = require('celebrate');

// Импорт регулярного выражения для проверки URL
const { URL_REGEX } = require('../utils/constants');

// Импорт контроллеров для обработки запросов к пользователям
const {
  getUsers,
  getUserId,
  getCurrentUserInfo,
  editProfileUserInfo,
  updateProfileUserAvatar,
} = require('../controllers/users');

// Маршрут для получения списка пользователей
router.get('/', getUsers);

// Маршрут для получения информации о текущем пользователе
router.get('/me', getCurrentUserInfo);

// Маршрут для получения информации о конкретном пользователе по его id
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUserId);

// Маршрут для редактирования данных текущего пользователя
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), editProfileUserInfo);

// Маршрут для обновления аватара текущего пользователя
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(URL_REGEX),
  }),
}), updateProfileUserAvatar);

// Экспорт роутера для использования в других модулях
module.exports = router;
