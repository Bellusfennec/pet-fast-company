/* eslint-disable indent */
function generateAuthError(message) {
  switch (message) {
    case "EMAIL_NOT_FOUND": {
      return "Некорректная электронная почта или пароль";
    }
    case "INVALID_PASSWORD": {
      return "Некорректная электронная почта или пароль";
    }
    case "EMAIL_EXISTS": {
      return "Пользователь с такой электронной почтой уже существует";
    }
    case "WEAK_PASSWORD : Password should be at least 6 characters": {
      return "Минимальная длинна 6 символов";
    }
    case "INVALID_EMAIL": {
      return "Проверьте корректность электронной почты";
    }
    default:
      return "Слишком много попыток входа";
  }
}
export default generateAuthError;
