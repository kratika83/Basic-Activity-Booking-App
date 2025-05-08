import authController from '../controllers/authController.js';
import validators from './../utils/validator.js';
import express from 'express';
const authRouter = express.Router();

authRouter.post(
    "/signup",
    validators.joiSignupValidation,
    authController.signup
);

authRouter.post(
    "/login",
    validators.joiLoginValidation,
    authController.login
);

export default authRouter;