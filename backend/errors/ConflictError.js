module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message); // Вызов конструктора базового класса Error с переданным сообщением об ошибке
    this.statusCode = 409; // Установка свойства statusCode в значение 409
  }
};
