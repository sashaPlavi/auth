// validation
const Joi = require('joi');

const registerValidation = (body) => {
  const shema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const validation = shema.validate(body);

  if (validation.error !== undefined) {
    const { message } = validation.error.details[0];

    return message;
  } else {
    return null;
  }
};
const loginValidation = (body) => {
  const shema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const validation = shema.validate(body);

  if (validation.error !== undefined) {
    const { message } = validation.error.details[0];

    return message;
  } else {
    return null;
  }
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
