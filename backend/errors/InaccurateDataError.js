module.exports = class InaccurateDataError extends Error {
  constructor(message) {
    super(message); // Вызов конструктора базового класса Error с переданным сообщением об ошибке
    this.statusCode = 400; // Установка свойства statusCode в значение 400
  }
};
