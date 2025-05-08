import jwt from 'jsonwebtoken';
import constants from '../utils/constants.js';
import i18n from '../config/i18n.js';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return helper.returnFalseResponse(
            req,
            res,
            constants.CONST_RESP_CODE_UNAUTHORIZED,
            i18n.__('lang_access_denied')
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return helper.returnFalseResponse(
            req,
            res,
            constants.CONST_RESP_CODE_BAD_REQUEST,
            i18n.__('lang_invalid_token')
        );
    }
};

export default authMiddleware;