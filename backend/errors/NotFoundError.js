module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message); // Вызов конструктора базового класса Error с переданным сообщением об ошибке
    this.statusCode = 404; // Установка свойства statusCode в значение 404
  }
};
