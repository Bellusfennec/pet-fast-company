/* eslint-disable indent */
export function validator(data, config) {
  const errors = {};
  function validate(validateMethid, data, config) {
    let statusValidate;
    switch (validateMethid) {
      case "isRequired": {
        statusValidate = data.trim() === "";
        break;
      }
      case "isEmail": {
        const regExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !regExp.test(data);
        break;
      }
      case "isCapitalSymbol": {
        const regExp = /[A-Z]+/g;
        statusValidate = !regExp.test(data);
        break;
      }
      case "isContainDigit": {
        const regExp = /\d+/g;
        statusValidate = !regExp.test(data);
        break;
      }
      case "min": {
        statusValidate = data.length < config.value;
        break;
      }
      default: {
        break;
      }
    }
    return statusValidate && config.message;
  }
  for (const fieldName in data) {
    for (const validateMethid in config[fieldName]) {
      const error = validate(
        validateMethid,
        data[fieldName],
        config[fieldName][validateMethid]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
