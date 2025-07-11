import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().min(3).max(255).required(),
  password: Joi.string().min(6).max(255).required(),
  name: Joi.string().min(3).max(255).required(),
});

const loginUserValidation = Joi.object({
  username: Joi.string().max(255).required(),
  password: Joi.string().max(255).required(),
});

const getUserValidation = Joi.string().max(255).required();

const updateUserValidation = Joi.object({
  username: Joi.string().min(3).max(255).required(),
  password: Joi.string().min(6).max(255).optional(),
  name: Joi.string().max(255).optional(),
});

const logoutUserValidation = Joi.string().max(255).required();

export {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
  logoutUserValidation,
};
