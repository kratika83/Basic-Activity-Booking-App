import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import helper from "./helper.js";
import constants from "./constants.js";

const joiPassword = Joi.extend(joiPasswordExtendCore);

const joiSignupValidation = async (req, res, next) => {
  const body = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: joiPassword
      .string()
      .minOfLowercase(1)
      .minOfNumeric(1)
      .minOfUppercase(1)
      .minOfSpecialCharacters(1)
      .noWhiteSpaces()
      .min(8)
      .required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .optional()
      .messages({
        "string.pattern.base": "Phone number must be a 10-digit numeric value.",
      })
  });

  const { error, value } = schema.validate(body, {
    abortEarly: false,
  });
  if (error) {
    const errors = await helper.joiValidationErrorConvertor(error.details);
    await helper.returnFalseResponse(
      req,
      res,
      constants.CONST_RESP_CODE_NOT_ACCEPT,
      errors,
      {}
    );
  } else {
    next();
  }
};

const joiLoginValidation = async (req, res, next) => {
  const body = req.body;
  const schema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: joiPassword
      .string()
      .minOfLowercase(1)
      .minOfNumeric(1)
      .minOfUppercase(1)
      .minOfSpecialCharacters(1)
      .noWhiteSpaces()
      .min(8)
      .required(),
  });

  const { error, value } = schema.validate(body, {
    abortEarly: false,
  });
  if (error) {
    const errors = await helper.joiValidationErrorConvertor(error.details);
    await helper.returnFalseResponse(
      req,
      res,
      constants.CONST_RESP_CODE_NOT_ACCEPT,
      errors,
      {}
    );
  } else {
    next();
  }
};

const joiBookingValidation = async (req, res, next) => {
  const schema = Joi.object({
    activity: Joi.string()
      .length(24)
      .hex()
      .regex(/^[a-fA-F0-9]+$/)
      .required(),
    user: Joi.object().optional()
  });

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = await helper.joiValidationErrorConvertor(error.details);
    await helper.returnFalseResponse(
      req,
      res,
      constants.CONST_RESP_CODE_NOT_ACCEPT,
      errors,
      {}
    );
  } else {
    next();
  }
};

let validators = {
  joiSignupValidation: joiSignupValidation,
  joiLoginValidation: joiLoginValidation,
  joiBookingValidation: joiBookingValidation
};

export default validators;