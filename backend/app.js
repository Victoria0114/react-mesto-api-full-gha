const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const limiter = require('./middlewares/rateLimiter');
const routeSignup = require('./routes/signup');
const routeSignin = require('./routes/signin');
const auth = require('./middlewares/auth');
const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const URL = 'mongodb://127.0.0.1:27017/mestodb';
const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(URL)
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

app.use(requestLogger); // подключаем логгер запросов
app.use('/', routeSignup);
app.use('/', routeSignin);

app.use(auth);

app.use('/users', routeUsers);
app.use('/cards', routeCards);
app.use(errorLogger); // подключаем логгер ошибок

app.use((req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден.')));
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
