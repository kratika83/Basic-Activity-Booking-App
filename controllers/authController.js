import i18n from '../config/i18n.js';
import userModel from '../models/userModel.js';
import constants from '../utils/constants.js';
import helper from '../utils/helper.js';

const signup = async (req, res) => {
    try {
        let body = req.body;
        let result = await userModel.findOne({ email: body.email });
        if (result) {
            return helper.returnFalseResponse(
                req,
                res,
                constants.CONST_RESP_CODE_NOT_ACCEPT,
                i18n.__('lang_email_already_exist')
            );
        } else {
            let hashedPassword = await helper.encryptPassword(body.password);
            const newUser = new userModel({
                name: body.name,
                email: body.email,
                password: hashedPassword,
                phone: body.phone
            });
            let newData = await newUser.save();
            return helper.returnTrueResponse(
                req,
                res,
                constants.CONST_RESP_CODE_OK,
                i18n.__("lang_signup_success"),
                newData
            );
        }
    } catch (error) {
        return helper.returnFalseResponse(
            req,
            res,
            constants.CONST_RESP_CODE_INTERNAL_SERVER_ERROR,
            error
        );
    }
};

const login = async (req, res) => {
    try {
        const body = req.body;
        let isExistUser = await userModel.findOne({ email: body.email });
        if (!isExistUser) {
            return helper.returnFalseResponse(
                req,
                res,
                constants.CONST_RESP_CODE_NOT_ACCEPT,
                i18n.__("lang_user_not_found")
            );
        }

        const isPasswordMatch = await helper.passwordCompare(
            body.password,
            isExistUser.password
        );
        if (!isPasswordMatch) {
            return helper.returnFalseResponse(
                req,
                res,
                constants.CONST_RESP_CODE_NOT_FOUND,
                i18n.__("lang_incorrect_password")
            );
        }

        let token = await helper.jwtToken(isExistUser);
        let data = {
            _id: isExistUser._id,
            name: isExistUser.name,
            email: isExistUser.email,
            phone: isExistUser.phone
        };
        return helper.returnTrueResponse(
            req,
            res,
            constants.CONST_RESP_CODE_OK,
            i18n.__("lang_login_success"),
            {
                user: data,
                token: token
            }
        );
    } catch (error) {
        return helper.returnFalseResponse(
            req,
            res,
            constants.CONST_RESP_CODE_INTERNAL_SERVER_ERROR,
            error
        );
    }
};

let authController = {
    signup: signup,
    login: login
};

export default authController;