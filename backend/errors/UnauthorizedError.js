module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super(message); // Вызов конструктора базового класса Error с переданным сообщением об ошибке
    this.statusCode = 401; // Установка свойства statusCode в значение 401
  }
};
