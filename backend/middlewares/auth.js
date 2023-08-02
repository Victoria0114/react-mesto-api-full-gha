const jwt = require('jsonwebtoken');
const { SECRET_SIGNING_KEY } = require('../utils/constants');

const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';
  const errorMessage = 'Неправильные почта или пароль';

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError(`${errorMessage}(${authorization})!`));
  }

  const token = authorization.replace(bearer, '');

  let payload;

  try {
    payload = jwt.verify(token, SECRET_SIGNING_KEY);
  } catch (err) {
    return next(new UnauthorizedError(`${errorMessage}!`));
  }

  req.user = payload;

  return next();
};
