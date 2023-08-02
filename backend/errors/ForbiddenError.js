module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message); // Вызов конструктора базового класса Error с переданным сообщением об ошибке
    this.statusCode = 403; // Установка свойства statusCode в значение 403
  }
};
