import constants from './constants.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const joiValidationErrorConvertor = (errors) => {
    let error_message = "";
    errors.forEach((element, index) => {
        error_message = element.message;
        return true;
    });
    error_message = error_message.replaceAll("/", " ");
    error_message = error_message.replaceAll("_", " ");
    return error_message;
};

let returnTrueResponse = (req, res, statusCode, message, arr, totalCounts) => {
    return res.status(statusCode).json({
        version: {
            current_version: constants.CONST_APP_VERSION,
            major_update: 0,
            minor_update: 0,
            message: "App is Up to date",
        },
        success: 1,
        message: message,
        data: arr,
        totalCounts: totalCounts,
    });
};

let returnFalseResponse = (req, res, statusCode, message, arr, error_code) => {
    return res.status(statusCode).json({
        version: {
            current_version: constants.CONST_APP_VERSION,
            major_update: 0,
            minor_update: 0,
            message: "App is Up to date",
        },
        success: 0,
        message: message,
        data: arr,
        error_code: error_code,
    });
};

let encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(constants.CONST_GEN_SALT);
    password = await bcrypt.hash(password, salt);
    return password;
};

let passwordCompare = async (password, savedPassword) => {
    return await bcrypt.compare(password, savedPassword);
};

let jwtToken = async (userData) => {
    const secretKey = process.env.JWT_SECRET;
    const user = {
        id: userData._id,
        email: userData.email
    };
    const token = jwt.sign(user, secretKey, { expiresIn: "24hr" });
    return token;
};

let helper = {
    joiValidationErrorConvertor: joiValidationErrorConvertor,
    returnTrueResponse: returnTrueResponse,
    returnFalseResponse: returnFalseResponse,
    encryptPassword: encryptPassword,
    passwordCompare: passwordCompare,
    jwtToken: jwtToken
};

export default helper;