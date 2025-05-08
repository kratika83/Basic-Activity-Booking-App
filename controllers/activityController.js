import i18n from "../config/i18n.js";
import activityModel from "../models/activityModel.js";
import constants from "../utils/constants.js";
import helper from "../utils/helper.js";

const getAllActivities = async (req, res) => {
    try {
        const activities = await activityModel.find();
        const totalCount = await activityModel.countDocuments();
        if (!activities) {
            return helper.returnFalseResponse(
                req,
                res,
                constants.CONST_RESP_CODE_CONTENT_NOT_FOUND,
                i18n.__("lang_record_not_found")
            );
        }

        return helper.returnTrueResponse(
            req,
            res,
            constants.CONST_RESP_CODE_OK,
            i18n.__("lang_record_found"),
            activities,
            totalCount
        );
    } catch (error) {
        return helper.returnFalseResponse(
            req,
            res,
            constants.CONST_RESP_CODE_INTERNAL_SERVER_ERROR,
            error.message
        );
    }
};

let activityController = {
    getAllActivities: getAllActivities
};

export default activityController;