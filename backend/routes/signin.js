// Создание экземпляра роутера Express
const router = require('express').Router();

// Импорт модуля celebrate для валидации запросов
const { celebrate, Joi } = require('celebrate');

// Импорт контроллера для обработки запроса на вход пользователя
const { loginUser } = require('../controllers/users');

// Маршрут для входа пользователя
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), loginUser);

// Экспорт роутера для использования в других модулях
module.exports = router;
